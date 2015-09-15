

var AppBox = React.createClass({
  getInitialState: function() {
    return {
      politicians: [],
      searchClass: 'full',
      profileClass: 'hide',
      profile: '',
      searching: false,
      votes: [],
      retrievingVotes: false,
      session: '',
      sessionsList: [],
      sessionToggle: false,
      billInfo: [],
      billText: [],
      currentVote: 0,
      billText: '',
      box: 'search',
      id: '',
      politician: [],
      billID: '',
    };
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
      politician = this.fetchPolitician();
      this.setState({
        politician: politician,
      });
      this.getPoliticianVotes(politician.id);
    }
  },
  closeProfile: function(event) {
    this.setState({
        searchClass : 'full',
        profileClass: 'hide',
        profile: '',
        votes: [],
        retrievingVotes: false,
        session: ''
      });
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
  onSessionSelectToggle: function(event) {
    this.setState({
      sessionToggle: !this.state.sessionToggle,
    });
  },
  onSessionSelect: function(object, event) {
    console.log(object);
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
      console.log(this.state.billInfo);
    }
  },
  filterPoliticians: function() {
    if (this.state.searching && this.state.searchValue) {
      var regex = new RegExp(this.state.searchValue, "i");
      var filteredList = this.state.politicians.filter(function (pol) {
        return pol.name.search(regex) > -1 || pol.party_name.search(regex) > -1 || pol.party_slug.search(regex) > -1 || pol.riding.search(regex) > -1;
      });
      if (this.state.searchClass == 'full') {
        var max = 50;
      }
      else {
        var max = 10;
      }
      return filteredList.slice(0,max);
    }
    else {
      return this.state.politicians.slice(0,10);
    }
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
  fetchPolitician: function(politicians, id) {
    if (typeof(politicians)==='undefined') politicians = this.state.politicians;
    if (typeof(id)==='undefined') id = this.state.id;
    if (id) {
      console.log(politicians);
      for (i = 0; i < politicians.length; i++) {
        if (politicians[i].id == id) {
          console.log('win the belly');
          console.log(politicians[i]);
          return politicians[i];
        }
      }
    }
    return this.state.politician;
  },
  getAppStateFromURL: function(urlHash) {
    console.log('get state: ' + urlHash);
    var box = 'search';
    var id = '';
    var billID = '';
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
      console.log('box is: ' + box);
      console.log('id is: ' + id);
    console.log(this.state.billID); 
      this.setState({
        box: box,
        id: id,
        votes: [],
        billID: billID,
      });
    console.log(this.state.billID); 
      this.changePolitician();
  },
  getIdArray: function() {
    var idArray = {};
    if (this.state.box == 'bill') {
      idArray['bill'] =  this.state.id;
      idArray['politician'] =  '';
    }
    else {
      idArray['politician'] = this.state.id;
      idArray['bill'] =  '';
    }
    return idArray;
  },
  render: function() {
    var politicianList = this.filterPoliticians();
    var sessionVotes = this.getSessionVotes();
    var voteList = this.filterVotes();
    var appClass = 'box ' + this.state.box;
    var idArray = this.getIdArray();
    var politician = this.state.politician;

    return (
      <div className={appClass}>
        <SearchBox 
          box={this.state.box}
          politicians={politicianList} 
          changePolitician={this.changePolitician} 
          onSearchChange={this.onSearchChange} 
          profile={politician} />

        <ProfileBox 
          box={this.state.box}
          id = {this.state.id}
          profileClass={this.state.profileClass} 
          profile={politician} 
          closeProfile={this.closeProfile} 
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
          var politician = this.fetchPolitician(data['results']);
          console.log('muppers');
          console.log(politician);
          this.setState({politicians: data['results'],
                        politician: politician, });
          console.log(politician);
          console.log(0 < politician.length);
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
        else if (type == 'bill_text') {
        console.log('set bill text');
          this.setState({billText: data['results']['text_en']});
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
  getPoliticianVotes: function(id) {
    var url = '/pol/' + id;
    this.fetchJSON(url, 'votes');
  },
  componentDidMount: function() {
    // temporary measure - is supposed to read from file
    window.addEventListener('hashchange', function(){
      this.getAppStateFromURL(window.location.hash.substr(1));
    }.bind(this));
    var initializeURL = '/initialize';
    this.fetchJSON(initializeURL, 'politicians');
    var sessionsURL = '/sessions';
    this.fetchJSON(sessionsURL, 'sessions');
    this.getAppStateFromURL(window.location.hash.substr(1));
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
        <div className="profile">
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
        <div className="votes">
          <BillStack 
            id={this.props.id}
            votes={this.props.votes} 
            retrievingVotes={this.props.retrievingVotes}
            getBillInfo = {this.props.getBillInfo}
            currentVote = {this.props.currentVote}
            billInfo = {this.props.billInfo} />
        </div>
      </div>
    );
  },
});
var BillStack = React.createClass({
  render: function() {
    var currentVote = this.props.currentVote;
    var billInfo = this.props.billInfo;
    if (this.props.votes.length  > 0) {
      var getBillText = this.props.getBillText;
      var objectNodes = this.props.votes.map(function (object, i) {
        if (object.vote == 'Y') {
          var voteClass = voteText = 'yes ';
        }
        else if (object.vote == 'N') {
          var voteClass = voteText = 'no ';
        }
        else {
          var voteClass = '';
          var voteText = 'no vote';
        }
        voteClass += 'vote col';
        var lawText = object.law ? 'passed' : 'failed';
        var lawClass = 'col law ' + lawText;
        if (object.short_title_en) {
          var name = object.short_title_en;
        }
        else {
          var name = object.name_en;
        }
        var infoClass = "row info";
        var infoText = '';
        if (object.votequestion_id == currentVote) {
          infoClass += ' current';
          infoText = billInfo['name_en'];
          var titleString = 'Full title: ' + infoText;
          var lawString =  'Law: ' + lawText;
          var statusString = 'Status: ' + billInfo['status_code'];
          var voteInformation = 
              <div className={infoClass}>
                <div className="col spacer"></div>
                <div className="col billInfo">{titleString}{lawString}{statusString}</div>
              </div>;
        }
        else {
          var voteInformation =
              <div className={infoClass}>
              </div>;
        }
        return (
          <div className="voteRow row" key={i}>
            <div onClick={this.props.getBillInfo.bind(null,object)} className="main row" key={i}>
              <div className="col spacer"></div>
              <div className="col session">{object.session_id}</div>
              <div className="col number">{object.number}</div>
              <div className={voteClass}>{voteText}</div>
              <div className="col shortname">{name}</div>
              <div className={lawClass}>{lawText}</div>
              <div className="col spacer"></div> 
            </div>
            {voteInformation}
          </div>
        );
      }.bind(this));
      return (
        <div className='stickyHelper'>
          <div className='billStack'>
              <div className="row header">
                <div className="col spacer"></div>
                <div className="col session">Session</div>
                <div className="col number">Number</div>
                <div className="col vote">Vote</div>
                <div className="col shortname">Name</div>
                <div className="col law">Law</div>
                <div className="col spacer"></div>
              </div>
              {objectNodes}
          </div>
        </div>
      );
    }
    else {
      if (this.props.retrievingVotes) {
        var loader = <div className="loader"></div>;
      }
      else {
        var loader = <div className="no-results">No Results</div>;
      }
      return (
        <div className='stickyHelper'>
          <div className='billStack'>
              <div className="row header">
                <div className="col spacer"></div>
                <div className="col session">Session</div>
                <div className="col number">Number</div>
                <div className="col vote">Vote</div>
                <div className="col shortname">Name</div>
                <div className="col law">Law</div>
                <div className="col spacer"></div>
              </div>
              <div className="row empty">
                <div className="col"></div>
            </div>
          </div>
          {loader}
        </div>
      );
        
    }
    
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
          <SearchStack changePolitician={this.props.changePolitician} politicians={this.props.politicians} profile={this.props.profile} />
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
    var changePolitician = this.props.changePolitician;   
    var objectNodes = this.props.politicians.map(function (object, i) {
      var imgURL = "url('http://104.236.172.89/static/images/" + object.imgurl + "')";
      var classString = '';
      if (object.id == currentProfileID) {
        classString = 'active ';
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
      var href = '/#/profile/' + object.id;
      return (
        <a className={classString} href={href} key={i} >
          <div style={{backgroundImage: imgURL}}></div>
          <h3>{object.name}</h3>
          <span className="party">{partyName}</span>
        </a>
      );
    }.bind(this));
    return (
      <div className={classString}>
        <h2>Members of Parliament</h2>
        {objectNodes}
      </div>
    );
  }
});

React.render(
  <AppBox />,
  document.getElementById('content')
);