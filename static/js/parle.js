
tracker = ga.create('UA-67804451-1', 'votes.mp');

function gaTrack(path, title) {
  if (path=="") {
    path = "/";
  }
  //console.log("track");
  //console.log(path);
  //console.log(title);
  ga('set', { page: path, title: title });
  ga('send', 'pageview');
}

var AppBox = React.createClass({
  getInitialState: function() {
    return {
      box: 'search',
      politicians: [],
      id: '',
      politician: {},
      profile: '',
      currentVote: 0,
      searching: false,
      retrievingVotes: true,
      votes: [],
      billInfo: [],
      billText: "",
      sessionsList: [],
      session: '',
      sessionToggle: false,
      max: 10,
      riding: "",
    };
  },
  componentDidMount: function() {
    window.addEventListener('hashchange', function(){
      this.getAppStateFromURL(window.location.hash.substr(1));
    }.bind(this));
    var initializeURL = '/initialize';
    this.fetchJSON(initializeURL, 'politicians');
    var sessionsURL = '/sessions';
    this.fetchJSON(sessionsURL, 'sessions');
    this.getAppStateFromURL(window.location.hash.substr(1));
  },
  changePolitician: function(politician) {
    if (politician) {
      this.setState({
        politician: politician,
        votes: [],
        box: 'profile',
      });
      this.getPoliticianVotes(politician.id);
    }
    else if (this.state.id && ((this.state.box == 'profile') || (this.state.box == 'info') )) {
      politician = this.getPolitician();
      this.setState({
        politician: politician,
      });
      this.getPoliticianVotes(politician.id);
    }
    else {
      this.setState({
        politician: {},
      });
    }
  },
  onSearchChange: function(event) {
    var max = this.checkMax();
    var postalRegEx = new RegExp("^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\\d{1}[A-Za-z]{1} *\\d{1}[A-Za-z]{1}\\d{1}$", "i");
    if (postalRegEx.test(event.target.value)) {
      var str = event.target.value;
      str = str.replace(/\s+/g, '');
      str = str.toUpperCase();
      var postalURL = 'https://represent.opennorth.ca/postcodes/' + str + '/?sets=federal-electoral-districts';
      var request = new XMLHttpRequest();
      request.open('GET', postalURL, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var data = JSON.parse(request.responseText);
          var riding = data["boundaries_concordance"][0]["name"];
          this.setState({riding: riding});
        }
        else {
          // We reached our target server, but it returned an error
          console.log('server reached, but it did not give data in onSearchChange opennorth request');
        }
      }.bind(this);
      request.onerror = function() {
          console.log('connection problem with onSearchChange opennorth request');
        // There was a connection error of some sort
      };
      request.send();
      this.setState({
        searching: true,
        searchValue: event.target.value,
        max: max
      });
    } 
    else {
      this.setState({
        searching: true,
        searchValue: event.target.value,
        max: max,
        riding: ""
      });
    }
  },
  onBillSearchChange: function(event) {
    this.setState({
      billSearching: true,
      billSearchValue: event.target.value
    });
  },
  onSessionSelect: function(object, event) {
    if (object !='') {
      this.setState({
        sessionToggle: false,
        session: object.id,
      });
    }
    else {
      this.setState({
        sessionToggle: false,
        session: '',
      });
    }
  },
  onSessionSelectToggle: function(event) {
    var listener = function(e){
      if ((e.target.className != 'sessionOption') && (e.target.parentNode.className != 'sessionOption') && (e.target.className != 'select') && (e.target.className != 'sessionSelect')) {   
        this.setState({
          sessionToggle: !this.state.sessionToggle,
        });
      }
      document.body.removeEventListener('click', listener);
    }.bind(this);
    if (!this.state.sessionToggle) {
      document.body.addEventListener('click', listener);
    }
    this.setState({
      sessionToggle: !this.state.sessionToggle,
    });
  },
  getAppStateFromURL: function(urlHash) {
    var box = 'search';
    var id = '';
    var politician = this.state.politician;
    var urlParameters = urlHash.split('/').filter(function(n){ return n != '' });
      if (urlParameters.length > 0) {
        box = urlParameters[0];
        switch (box) {
          case 'profile': break;
          case 'bill': break;
          case 'info': break;
          default: box = 'search';
        }
        if (urlParameters.length >= 2) {
          id = !isNaN(urlParameters[1]) ? urlParameters[1] : '';
        }
      }
      if (box == 'search') {
        gaTrack(urlHash, "Search");
      }
      else if (box == 'profile') {
        if (id) {
          var name = id;
          for (var i=0; i < this.state.politicians.length; i++) {
            if (this.state.politicians[i].id == id) {
              name = this.state.politicians[i].name;
            }
          }
          var title = "Profile/" + name;
          gaTrack(urlHash, title);
        }
        else {
          var title = "Profile/";
          gaTrack(urlHash, title);
        }
      }
      else if (box == 'info') {
        gaTrack(urlHash, "Info");
      }
      else {
        gaTrack(urlHash, "Unknown");
      }
      this.setState({
        box: box,
        id: id,
        votes: [],
      });
      this.changePolitician();
  },
  changePageTitle: function () {
    if (this.state.box == 'search') {
      document.title = 'votes.MP - search Canadian MP voting records';
    }
    else if ((this.state.box == 'profile') && (this.state.politician.name)) {
      var titleText = this.state.politician.name;
      document.title = 'votes.MP - ' + titleText;
    }
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (prevState.politician != this.state.politician) {
      this.changePageTitle();
    }
  },
  getSessionVotes: function() {
    var sessionVotes = {};
    var sessionSum = 0;
    for(var i=0; i<this.state.sessionsList.length; i++){
        sessionVotes[this.state.sessionsList[i].id]=0;
    }
    for(var i=0; i<this.state.votes.length; i++){
      sessionSum += 1;
      sessionVotes[this.state.votes[i].session_id] += 1;
    }
    sessionVotes['sum'] = sessionSum;
    return sessionVotes;
  },
  getPolitician: function(politicians, id) {
    if (typeof(politicians)==='undefined') politicians = this.state.politicians;
    if (typeof(id)==='undefined') id = this.state.id;
    if (id) {
      for (i = 0; i < politicians.length; i++) {
        if (politicians[i].id == id) {
          return politicians[i];
        }
      }
    }
    return [];
  },
  getPoliticianVotes: function(id) {
    this.setState({ 'retrievingVotes' : true
    });
    var url = '/pol/' + id;
    this.fetchJSON(url, 'votes');
  },
  getBillInfo: function(object, event) {
    //console.log("invoked"); 
    //console.log(object);
    //console.log(event);
    if (object.props.vote.votequestion_id == this.state.currentVote) {
      this.setState({currentVote: 0,
                    billInfo: [],
      });
    }
    else {
      var url = '/bill/' + object.props.vote.votequestion_id;
      this.setState({
        currentVote: object.props.vote.votequestion_id,
        billInfo: [],
      });
      this.fetchJSON(url, 'bill_info');
    }
  },
  onSearchScroll: function(thingone, thingtwo) {
    var scrollTop = thingone.getDOMNode().scrollTop;
    var height = thingone.getDOMNode().scrollHeight;
    var h = window.innerHeight;
    if ((h + scrollTop + 100) > height) {
      var num = this.filterPoliticians().length;
      if (this.state.max < num) {
        this.setState({
          max : this.state.max + 10
        });
      }
    }
  },
  checkMax: function() {
    var newMax = this.state.max;
    var num = this.filterPoliticians().length;
    if (num < this.state.max) {
      newMax = num;
      if (newMax < 10) {
        newMax = 10;
      }
    }
    return newMax;
  },
  render: function() {
    var politicianList = this.filterPoliticians().slice(0, this.state.max);
    var sessionVotes = this.getSessionVotes();
    var voteList = this.filterVotes();
    var appClass = 'box ' + this.state.box;
    var politician = this.state.politician;
    var containerclasses = 'searchBox-noscroll ' + this.state.box;

    return (
      <div className={appClass}>
        <InfoBox box={this.state.box} />

        <div className={containerclasses}>
          <SearchBox 
            box={this.state.box}
            searching={this.state.searching}
            politicians={politicianList} 
            onSearchChange={this.onSearchChange} 
            profile={politician}
            onSearchScroll = {this.onSearchScroll} />
        </div>

        <ProfileBox 
          box={this.state.box}
          profile={politician}
          votes={voteList} 
          onBillSearchChange={this.onBillSearchChange} 
          onSessionSelectToggle={this.onSessionSelectToggle}
          onSessionSelect={this.onSessionSelect}
          sessionsList = {this.state.sessionsList}
          session = {this.state.session}
          sessionToggle = {this.state.sessionToggle}
          sessionsVotes = {sessionVotes}
          retrievingVotes={this.state.retrievingVotes}
          getBillInfo = {this.getBillInfo}
          currentVote = {this.state.currentVote}
          billInfo = {this.state.billInfo}
          getPolitician = {this.getPolitician} />

        <BillTextBox box={this.state.box} billText={this.state.billText} />
      </div>
    );
  },
  fetchJSON: function(path, type) {
    var request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        if (type == 'politicians') {
          var politician = this.getPolitician(data['results']);
          this.setState({politicians: data['results'],
                        politician: politician, });
          if (politician.id) {
            this.getPoliticianVotes(politician.id);
          }
        }
        else if (type == 'votes') {
          this.setState({votes: data['results'],
                          retrievingVotes: false
                        });
        }
        else if (type == 'sessions') {
          this.setState({sessionsList: data['results']});
        }
        else if (type == 'bill_info') {
          this.setState({billInfo: data});
        }
        else if (type == 'bill_text') {
          this.setState({billText: data['results'][0]});
        }
        else {
          console.log('type not politician or votes');
        }
      } else {
        // We reached our target server, but it returned an error
        console.log('server reached, but it did not give data in fetchJSON');
      }
    }.bind(this);
    request.onerror = function() {
        console.log('connection problem with fetchJSON');
      // There was a connection error of some sort
    };
    request.send();
  },
  filterVotes: function() {
    if (this.state.billSearching && this.state.billSearchValue) {
      var regex = new RegExp(this.state.billSearchValue, "i");
      var votes = this.state.votes.filter(function (vote) {
        return vote.name_en.search(regex) > -1 || vote.number.search(regex) > -1 || vote.short_title_en.search(regex) > -1;
      });
    }
    else {
      var votes = this.state.votes;
    }
    if (this.state.session) {
      var sessionRegex = new RegExp(this.state.session, "i");
      var filteredVotes = votes.filter(function (vote) {
        return vote.session_id.search(sessionRegex) > -1;
      });
    }
    else {
      var filteredVotes = votes;
    }
    return filteredVotes;
  },
  filterPoliticians: function() {
    if (this.state.searching && this.state.searchValue) {
      if (this.state.riding != "") {
        var regex = new RegExp(this.state.riding, "i");
        var filteredList = this.state.politicians.filter(function (pol) {
          return pol.riding.search(regex) > -1;
        });
        return filteredList;
      }
      var regex = new RegExp(this.state.searchValue, "i");
      var filteredList = this.state.politicians.filter(function (pol) {
        return pol.name.search(regex) > -1 || pol.party_name.search(regex) > -1 || pol.party_slug.search(regex) > -1 || pol.riding.search(regex) > -1  || pol.riding.search(regex) > -1;
      });
      return filteredList;
    }
    else {
      return this.state.politicians;
    }
  },
});
var BillTextBox = React.createClass({
  render: function() {
    var classes = 'billTextBox ' + this.props.box;
    return (
      <div className={classes}><div className="closeContainer"><a href="/#/"></a></div><BillText billText={this.props.billText} /></div>
    );
  }
});
var BillText = React.createClass({
  prepText: function(text) {
    text = text.trim();
    return (text.length>0?'<p>'+text.replace(/[\r\n]+/,'</p><p>')+'</p>':null);
  },
  render: function () {
    var billText = this.prepText(this.props.billText);
    return (
    <div className="billText">
      {billText}
    </div>
    );
  }
});
var InfoBox = React.createClass({
  componentWillUpdate: function(nextProps, nextState) {
    if ((nextProps.box == 'info') && (this.props.box != 'search')) {
      this.back = true;
    }
    else {
      this.back = false;
    }
  },
  goBack: function(e) {
    if (this.back) {
      e.preventDefault();
      window.history.back();
    }
  },
  render: function() {
    var classes = 'infoBox ' + this.props.box;
    return (
      <div className={classes}><div className="closeContainer"><a href="/#/" onClick={this.goBack}></a></div><InfoText /></div>
    );
  }
});
var InfoText = React.createClass({
  render: function () {
    return (
    <div className="infoText">
      <h2>about votes.mp</h2>
      <p>Democracies are defined by the laws that they pass, and the laws that pass are determined by the representatives we elect. In order to accurately evaluate whether our elected members of parliament are appropriately representing their electorate, the most pertinent information we have is their voting history: which bills have they voted for, which have they voted against, and which have they abstained from voting on. </p>
      <p>While this information is made publicly available to all Canadians, we noticed that it can be slow and difficult to parse. Every bill is voted on multiple times - sometimes to pass amendments, sometimes even just to vote on whether or not it will be discussed. Unless you are able to dedicate significant time and effort into becoming well-versed on the details of each bill, attempting to analyze the votes a politician makes can be more confusing than informative.</p>
      <p>As engaged citizens who are not capable of being intimately familiar with the details and progress of every bill, what we wanted to know was this: after all the amendments and edits, did the politician vote to make the final bill a law or not? </p>
      <p>That is what this website provides: for every member of parliament, it returns only the votes that correspond to their final vote on a bill as well as whether or not the bill was successfully passed into law.</p>
      <p>We hope that this provides an easy additional avenue for evaluating the performance of our elected members of parliament and determining their effectiveness in representing our views.</p>
      <span className="githubLink"><a href="https://github.com/shayqn/parle">view project on github</a></span>
      <span className="creditWhereCreditsDue">special thanks to <a href="https://openparliament.ca">openparliament.ca</a> for providing all the data</span>
    </div>
    );
  }
});
var ProfileBox = React.createClass({
  render: function() {
    var classes = 'profileBox ' + this.props.box;
    var closeClass = 'close ' + this.props.box;
    if (!this.props.profile.party_slug) {
      var partyName = this.props.profile.party_name;
    }
    else {
      var partyName = this.props.profile.party_slug;
    }
    return (
      <div className={classes}>
        <div className="profileHeader">
          <a className="return" href="/#/"><div className ="icon"></div><span>return to MP search</span></a>
          <a className={closeClass} href="/#/"></a>
          <h2 className="name">{this.props.profile.name}</h2>
          <span className="info"><h3 className="riding">{this.props.profile.riding}</h3><h3 className="party">{partyName}</h3></span>
          <BillSearch 
            onBillSearchChange={this.props.onBillSearchChange}
            onSessionSelectToggle={this.props.onSessionSelectToggle}
            onSessionSelect={this.props.onSessionSelect}
            sessionsList={this.props.sessionsList}
            sessionToggle = {this.props.sessionToggle}
            session={this.props.session}
            sessionsVotes = {this.props.sessionsVotes} />
      </div>
      <BillStack 
        votes={this.props.votes} 
        retrievingVotes={this.props.retrievingVotes}
        getBillInfo = {this.props.getBillInfo}
        currentVote = {this.props.currentVote}
        billInfo = {this.props.billInfo}
        getPolitician = {this.props.getPolitician} />
      </div>
    );
  },
});
var BillStack = React.createClass({
  render: function() {
    var currentVote = this.props.currentVote;
    var getBillInfo = this.props.getBillInfo;
    var voteRows = [];
    var loader = null;
    if (this.props.votes.length  > 0) {
      var getBillText = this.props.getBillText;
      voteRows = this.props.votes.map(function (object, i) {
        return (
          <VoteRow
            key = {i}
            vote = {object}
            currentVote = {currentVote}
            onClick = {getBillInfo}
            billInfo = {this.props.billInfo}
            getPolitician = {this.props.getPolitician} />
        );
      }.bind(this));
    }
    else if (this.props.retrievingVotes) {
      
      for (var i = 0; i < 15; i++) {
        var emptyRow = (
          <div key={i} className="voteRow row empty">
            <div className="main row">
              <div className="col spacer left"></div>
              <div className="col session"></div>
              <div className="col number"></div>
              <div className="col vote full-layout"></div>
              <div className="col shortname"><span>no result</span></div>
              <div className="col vote mobile-only"></div>
              <div className="col law"></div>
              <div className="col dropdown"></div>
              <div className="col spacer right"></div> 
            </div>
          </div>
        );
        voteRows.push(emptyRow);
      }
      loader = <div className="loader-container"><div className="loader"></div></div>;
    }
    else {
      var noResultsRow = (
          <div className="voteRow row noresults">
            <div className="main row">
              <div className="col spacer"></div>
              <div className="col"><span>no results found</span></div>
              <div className="col spacer"></div> 
            </div>
          </div>
        );
      voteRows.push(noResultsRow);
    }
    return (
      <div className='votes'>
        <div className='billStack'>
            <div className="row header">
              <div className="col spacer left"></div>
              <div className="col session">Session</div>
              <div className="col number">Number</div>
              <div className="col vote full-layout">Vote</div>
              <div className="col shortname">Name</div>
              <div className="col vote mobile-only">Vote</div>
              <div className="col law">Law</div>
              <div className="col dropdown"></div>
              <div className="col spacer right"></div>
            </div>
            {voteRows}
            {loader}
        </div>
      </div>
    );        
  }
});
var VoteRow = React.createClass({
  render: function () {
    if (this.props.vote.vote == 'Y') {
      var voteClass = 'yes ';
      var voteText = 'yes';
    }
    else if (this.props.vote.vote == 'N') {
      var voteClass = 'no ';
      var voteText = 'no';
    }
    else {
      var voteClass = '';
      var voteText = 'no vote';
    }
    voteClass += 'vote col ';
    var mobileVoteClass = voteClass + 'mobile-only';
    voteClass += 'full-layout'

    var lawText = this.props.vote.law ? 'yes' : 'no';
    var lawClass = 'col law ' + lawText;

    if (this.props.vote.short_title_en) {
      var name = this.props.vote.short_title_en;
    }
    else {
      var name = this.props.vote.name_en;
    }
    var voteRowClass = "voteRow row";
    if (this.props.vote.votequestion_id == this.props.currentVote) {
      voteRowClass += " current";
    }

    return (
      <div className={voteRowClass} key={this.props.key}>
        <div onClick={this.props.onClick.bind(null, this)} className="main row">
          <div className="col spacer left"></div>
          <div className="col session"><span className="label mobile-only">Session</span>{this.props.vote.session_id}</div>
          <div className="col number"><span className="label mobile-only">Number</span>{this.props.vote.number}</div>
          <div className={voteClass}><span>{voteText}</span></div>
          <div className="col shortname">{name}</div>
          <div className={mobileVoteClass}><span className="label mobile-only">Vote</span><span className="voteText">{voteText}</span></div>
          <div className={lawClass}><span className="label mobile-only">Law</span><span className="lawText">{lawText}</span></div>
          <div className="col dropdown"><span><ArrowIcon /></span></div>
          <div className="col spacer right"></div> 
        </div>
        <VoteInfoRow 
          vote = {this.props.vote}
          currentVote = {this.props.currentVote}
          voteQuestionID = {this.props.vote.votequestion_id}
          billInfo = {this.props.billInfo}
          getPolitician = {this.props.getPolitician} />
      </div>
    );
  }
});
var VoteInfoRow = React.createClass({
  render: function() {
    var infoClass = "row info";
    var getPolitician = this.props.getPolitician;
    var sponsorComponent = null;
    if (this.props.voteQuestionID == this.props.currentVote) {
      infoClass += ' current';
      var lawString =  'Law: ' + this.props.lawText;
      var voteInformation = <div className="col billInfo">{lawString}</div>
      if (undefined != this.props.billInfo.votes) {
        var partyVoteNodes = [];
        var i = 0;
        var node = (
          <div key={0} className="partyVoteHeader" key={i}>
            <div className="name">Party</div>
            <div className="yes">YES</div>
            <div className="no">NO</div>
            <div className="abstain">ABSTAIN</div>
          </div>
        );
        partyVoteNodes.push(node);
        yesCount = 0;
        noCount = 0;
        abstainCount = 0;
        for (var key in this.props.billInfo.votes) {
          i++;
          var partyName = key;
          var yes = this.props.billInfo.votes[key]['Y'];
          var no = this.props.billInfo.votes[key]['N'];
          var abstain = this.props.billInfo.votes[key]['A'];
          var noClass = "no";
          var yesClass = "yes";
          var abstainClass = "abstain";
          var partyClass = "partyVote";
          if ((yes > abstain)&&(yes > no)) {
            partyClass += " yes";
          }
          else if ((no > abstain) && (no > yes)) {
            partyClass += " no";
          }
          else if ((abstain > yes) && (abstain > no)) {
            partyClass += " abstain";
          }
          else {
            if ((yes == no)) {
              partyClass += " tie yn";
            }
            else if (yes==abstain) {
              partyClass += " tie ya";
            }
            else if (no==abstain) {
              partyClass += " tie na";
            }
            else {
              partyClass += " tie";
            }
          }
          yesCount += yes;
          noCount += no;
          abstainCount += abstain;
          var node = (
            <div className={partyClass} key={i}>
              <div className="name">{partyName}</div>
              <div className={yesClass}><span>{yes}</span></div>
              <div className={noClass}><span>{no}</span></div>
              <div className={abstainClass}><span>{abstain}</span></div>
            </div>
          );
          partyVoteNodes.push(node);
        }
        var totalClass = "partyVote total ";
        if (yesCount > noCount) {
          if (yesCount > abstainCount) {
            totalClass += " yes";
          }
          else {
            totalClass += " abstain";
          }
        }
        else {
          if (noCount > abstainCount) {
            totalClass += " no";
          }
          else {
            totalClass += " abstain";
          }
        }
        var totalRow = (
          <div className="partyVote total" key="t">
            <div className="name">Total</div>
            <div className="yes"><span>{yesCount}</span></div>
            <div className="no"><span>{noCount}</span></div>
            <div className="abstain"><span>{abstainCount}</span></div>
          </div>
        );
        partyVoteNodes.push(totalRow);
        if (this.props.billInfo.sponsor) {
          var sponsorProfile = getPolitician(undefined, this.props.billInfo.sponsor);
          var imgURL = "url('/static/headshots/" + sponsorProfile.imgurl + "')";
          var sponsorClassString = 'sponsorProfile ';
          var href = '/#/profile/' + sponsorProfile.id;
          if (!sponsorProfile.party_slug) {
            var partyName = sponsorProfile.party_name;
          }
          else {
            sponsorClassString += sponsorProfile.party_slug;
            var partyName = sponsorProfile.party_slug;
          }
          sponsorComponent = (
            <div className="col sponsor">
              <h4>Bill Sponsor</h4>
              <a className={sponsorClassString} href={href} >
                <div style={{backgroundImage: imgURL}}></div>
                <h3>{sponsorProfile.name}</h3>
                <span className="riding">{sponsorProfile.riding}</span>
                <span className="party">{partyName}</span>
              </a>
            </div>
          );
        }
        else {
          sponsorComponent = null;
        }
      }
      else {
        var partyVoteNodes = '';
      }
    }
    else {
      var partyVoteNodes = '';
    }
    var openparliamentURL = "//openparliament.ca/bills/" + this.props.vote.session_id + "/" + this.props.vote.number + "/";
    sessionNumbers = this.props.vote.session_id.split("-");
    var parlURL = "http://www.parl.gc.ca/LEGISInfo/LAAG.aspx?language=E&Parl=" + sessionNumbers[0] + "&Ses=" + sessionNumbers[1];
    return (
      <div className={infoClass}>
          <div className="col spacer left"></div>
          {sponsorComponent}
          <div className="col partyVotes">
            <h4>Party Votes</h4>
            <div className="partyVotesTable">
              {partyVoteNodes}
            </div>
          </div>
          <div className="col moreBillInfo">
          <h4>More Information</h4>
            
            <a href={openparliamentURL} target="_blank">view bill on openparliament.ca <ArrowIcon /></a>
            <a href={parlURL} target="_blank">view session on parl.gc.ca <ArrowIcon /></a>
          </div>
          <div className="col spacer right"></div>
      </div>
    );
  }
});
var ArrowIcon = React.createClass({
  render: function() {
    return (
      <svg version="1.1" x="0px" y="0px"
         viewBox="0 0 400 400">
        <path d="M163.5,334.5l-47.1-47.1l87.5-87.5l-87.5-87.5l47.1-47.1L298,200L163.5,334.5z"/>
      </svg>
    );
  }
});
var BillSearch = React.createClass({
  render: function() {
    if (this.props.session == '') {
      var selectText = 'any session';
    }
    else {
      var selectText = this.props.session;
    }
    var sessionsVotes = this.props.sessionsVotes;
    var toggleClass = 'sessionSelect' + (this.props.sessionToggle ? '' : ' collapsed');
    var objectNodes = this.props.sessionsList.map(function (object, i) {
        var sum = sessionsVotes[object.id];
        if (sum) {
          var string = object.id + ' - (' + sum + ')';
          return (
            <li onClick={this.props.onSessionSelect.bind(null,object)} key={i}><span className="session">{object.id}</span> <span className="sum">{sum}</span></li>
          );
        }
    }.bind(this));
    return (
      <div className="billSearch">
        <form>
          <input type="search" placeholder="Search bills by name or number..." onChange={this.props.onBillSearchChange} />  
          <div className={toggleClass}>    
          <span className="select" onClick={this.props.onSessionSelectToggle}>{selectText}</span>  
          <ul>
            <li className="sessionOption" onClick={this.props.onSessionSelect.bind(null,'')}><span className="session">any session</span> <span className="sum">{sessionsVotes['sum']}</span></li>
            {objectNodes}
          </ul>
          </div>
        </form>
      </div>
      
    );
  }
});
var SearchBox = React.createClass({
  render: function() {
    var classes = 'searchBox ' + this.props.box;    return (
        <div className={classes} onScroll={this.props.onSearchScroll.bind(null, this)} >
          <div className="topLinks"><a href="/#/info" className="info"></a><a href="https://github.com/shayqn/parle" className="github"></a></div>
          <form>
            <input type="search" placeholder="Search..." onChange={this.props.onSearchChange} />
            <button type="submit">Search</button>
            <span>by name, riding, or postal code</span>
          </form>
          <div className="searchContent">
            <SearchStack 
              box={this.props.box} 
              politicians={this.props.politicians} 
              profile={this.props.profile}
              searching={this.props.searching} />
          </div>
        </div>
    );
  }
});
var SearchStack = React.createClass({
  render: function() {
    classString = "searchStack";
    var currentProfileID = this.props.profile.id;
    var politicianNodes = [];
    if (this.props.politicians.length > 0) {
      politicianNodes = this.props.politicians.map(function (object, i) {
        var imgURL = "url('/static/headshots/" + object.imgurl + "')";
        var classString = '';
        if (object.id == currentProfileID) {
          classString += 'active ';
        }
        if ((object.id == currentProfileID)&&(this.props.box == 'profile')) {
          var href = '/#/';
        }
        else {
          var href = '/#/profile/' + object.id;
        }
        if (object.active) {
          classString += 'current ';
        }
        if (!object.party_slug) {
          var partyName = object.party_name;
        }
        else {
          classString += object.party_slug;
          var partyName = object.party_slug;
        }
        if (object.name.length>19) {
          if (object.name.length > 22) {
            classString += ' reduce-large'
          }
          else {
            classString += ' reduce-medium';
          }
        }
        return (
          <a className={classString} href={href} key={i} >
            <div style={{backgroundImage: imgURL}}></div>
            <h3>{object.name}</h3>
            <span className="party">{partyName}</span>
          </a>
        );
      }.bind(this));  
    }
    else if (this.props.searching) {
      var noResultsNode = <a><h3>NO RESULTS</h3></a>;
      politicianNodes.push(noResultsNode);
    }
    else {
      var placeHolderNames = ['John A. McTemp', 'John Fakenbaker', 'Pierre Tempdeau'];
      for (i = 0; i < 11; i++) {
        var emptyNode = <a key={i} className="placeholder" href="/#/"><div></div><h3>{placeHolderNames[i%3]}</h3><span className="party">VAN</span></a>;
        politicianNodes.push(emptyNode);
      }
    }
    return (
      <div className={classString}>
        <h2>Members of Parliament<span className="leaf"></span></h2>
        {politicianNodes}
      </div>
    );
  }
});

React.render(
  <AppBox />,
  document.getElementById('content')
);