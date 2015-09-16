

var AppBox = React.createClass({
  getInitialState: function() {
    return {
      box: 'search',
      politicians: [],
      id: '',
      politician: [],
      profile: '',
      currentVote: 0,
      searching: false,
      retrievingVotes: true,
      votes: [],
      billInfo: [],
      sessionsList: [],
      session: '',
      sessionToggle: false,
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
    else if (this.state.id && (this.state.box == 'profile')) {
      politician = this.getPolitician();
      this.setState({
        politician: politician,
      });
      this.getPoliticianVotes(politician.id);
    }
  },
  onSearchChange: function(event) {
    this.setState({
      searching: true,
      searchValue: event.target.value
    });
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
          default: box = 'search';
        }
        if (urlParameters.length >= 2) {
          id = !isNaN(urlParameters[1]) ? urlParameters[1] : '';
        }
      }
      this.setState({
        box: box,
        id: id,
        votes: [],
      });
      this.changePolitician();
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
    if (object.votequestion_id == this.state.currentVote) {
      this.setState({currentVote: 0,
                    billInfo: [],
      });
    }
    else {
      var url = '/bill/' + object.votequestion_id;
      this.setState({currentVote: object.votequestion_id});
      this.fetchJSON(url, 'bill_info');
    }
  },
  render: function() {
    var politicianList = this.filterPoliticians();
    var sessionVotes = this.getSessionVotes();
    var voteList = this.filterVotes();
    var appClass = 'box ' + this.state.box;
    var politician = this.state.politician;

    return (
      <div className={appClass}>
        <SearchBox 
          box={this.state.box}
          politicians={politicianList} 
          onSearchChange={this.onSearchChange} 
          profile={politician} />

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
          billInfo = {this.state.billInfo} />
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
          this.setState({billInfo: data['results'][0]});
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
      var regex = new RegExp(this.state.searchValue, "i");
      var filteredList = this.state.politicians.filter(function (pol) {
        return pol.name.search(regex) > -1 || pol.party_name.search(regex) > -1 || pol.party_slug.search(regex) > -1 || pol.riding.search(regex) > -1;
      });
      return filteredList.slice(0,25);
    }
    else {
      return this.state.politicians.slice(0,10);
    }
  },
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
        billInfo = {this.props.billInfo} />
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
            onClick = {getBillInfo} />
        );
      }.bind(this));
    }
    else if (this.props.retrievingVotes) {
      var emptyRow = (
          <div className="voteRow row empty">
            <div className="main row">
              <div className="col spacer"></div>
              <div className="col session"></div>
              <div className="col number"></div>
              <div className="col shortname"><span>no result</span></div>
              <div className="col vote"></div>
              <div className="col law"></div>
              <div className="col spacer"></div> 
            </div>
          </div>
        );
      for (var i = 0; i < 15; i++) {
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
              <div className="col spacer"></div>
              <div className="col session">Session</div>
              <div className="col number">Number</div>
              <div className="col shortname">Name</div>
              <div className="col vote">Vote</div>
              <div className="col law">Law</div>
              <div className="col spacer"></div>
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
    voteClass += 'vote col';

    var lawText = this.props.vote.law ? 'passed' : 'failed';
    var lawClass = 'col law ' + lawText;

    if (this.props.vote.short_title_en) {
      var name = this.props.vote.short_title_en;
    }
    else {
      var name = this.props.vote.name_en;
    }

    return (
      <div className="voteRow row" key={this.props.key}>
        <div onClick={this.props.onClick.bind(null,this.props.vote)} className="main row">
          <div className="col spacer"></div>
          <div className="col session"><span className="mobile-only">Session</span>{this.props.vote.session_id}</div>
          <div className="col number"><span className="mobile-only">Number</span>{this.props.vote.number}</div>
          <div className="col shortname">{name}</div>
          <div className={voteClass}>{voteText}</div>
          <div className={lawClass}>{lawText}</div>
          <div className="col spacer"></div> 
        </div>
        <VoteInfoRow
          voteQuestionID = {this.props.vote.votequestion_id}
          currentVote = {this.props.currentVote}
          lawText = {lawText} />
      </div>
    );
  }
});
var VoteInfoRow = React.createClass({
  render: function() {
    var infoClass = "row info";
    if (this.props.voteQuestionID == this.props.currentVote) {
      infoClass += ' current';
      var lawString =  'Law: ' + this.props.lawText;
      var voteInformation = <div className="col billInfo">{lawString}</div>
    }
    else {
      var voteInformation = '';
    }
    return (
      <div className={infoClass}>
          <div className="col spacer"></div>
          {voteInformation}
      </div>
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
            <li onClick={this.props.onSessionSelect.bind(null,'')}><span className="session">any session</span> <span className="sum">{sessionsVotes['sum']}</span></li>
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
    var classes = 'searchBox ' + this.props.box;
    var containerclasses = 'searchBox-noscroll ' + this.props.box;
    return (
      <div className={containerclasses}>
        <div className={classes}>
          <form>
            <input type="search" placeholder="Search..." onChange={this.props.onSearchChange} />
            <button type="submit">Search</button>
          </form>
          <div className="searchContent">
            <SearchStack box={this.props.box} politicians={this.props.politicians} profile={this.props.profile} />
          </div>
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
        var imgURL = "url('http://static.votes.mp/" + object.imgurl + "')";
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
        
        return (
          <a className={classString} href={href} key={i} >
            <div style={{backgroundImage: imgURL}}></div>
            <h3>{object.name}</h3>
            <span className="party">{partyName}</span>
          </a>
        );
      }.bind(this));  
    }
    else {
      var placeHolderNames = ['Sir John A. McPlaceholder', 'Trevor Linden', 'Placeholder Junior, Esquire'];
      for (i = 0; i < 11; i++) {
        var emptyNode = <a className="placeholder" href="/#/"><div></div><h3>{placeHolderNames[i%3]}</h3><span className="party">VAN</span></a>;
        politicianNodes.push(emptyNode);
      }
    }
    return (
      <div className={classString}>
        <h2>Members of Parliament</h2>
        {politicianNodes}
      </div>
    );
  }
});

React.render(
  <AppBox />,
  document.getElementById('content')
);