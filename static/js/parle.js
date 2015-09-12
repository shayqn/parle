

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
      route: window.location.hash.substr(1),
    };
  },
  changeClass: function(object, event) {
    if (this.state.searchClass == 'full') {
      this.setState({
        searchClass : 'sidebar',
        profileClass : 'show',
        profile : object,
        votes: [],
        retrievingVotes: true,
        session: ''
      });
      this.getPoliticianVotes(object.id);
    }
    else if (object.id == this.state.profile.id) {
      this.setState({
        searchClass : 'full',
        profileClass: 'hide',
        profile : '',
        retrievingVotes: true,
        session: ''
      });
      this.getPoliticianVotes(object.id);
    }
    else if (object) {
      this.setState({
        profile : object,
        votes: [],
        retrievingVotes: true,
        session: ''
      });
      this.getPoliticianVotes(object.id);
    }
    else {
      this.setState({
        searchClass : 'full',
        profileClass: 'hide',
        profile : '',
        retrievingVotes: false,
        session: ''
      });
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
                    billText: [],
                    });
    }
    else {
      var url = '/bill/' + object.votequestion_id;
      this.setState({currentVote: object.votequestion_id});
      this.fetchJSON(url, 'bill_info');
      console.log(this.state.billInfo);
    }
  },
  getBillText: function(object, event) {
    var url = '/bill/text/' + 1;
    this.fetchJSON(url, 'bill_text');
  },
  render: function() {
    var urlParameters = this.state.route.split('/').filter(function(n){ return n != '' });
    if (!urlParameters) {
      var box = 'search';
      var id = '';
    }
    else {
      var box = urlParameters[0];
      switch (box) {
        case 'profile': break;
        case 'bill': break;
        default: 'search';
      }
      if (urlParameters.length >= 2) {
        var id = !isNaN(urlParameters[1]) ? urlParameters[1] : '';
      }
      else {
        var id = '';
      }
    }
    console.log('box is: ' + box);
    console.log('id is: ' + id);

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
      var politicianList = filteredList.slice(0,max);
    }
    else {
      var politicianList = this.state.politicians.slice(0,10);
    }
    if (this.state.billSearching && this.state.billSearchValue) {
      var regex = new RegExp(this.state.billSearchValue, "i");
      var filteredList = this.state.votes.filter(function (vote) {
        return vote.name_en.search(regex) > -1 || vote.number.search(regex) > -1 || vote.short_title_en.search(regex) > -1;
      });
      var voteList = filteredList;
    }
    else {
      var voteList = this.state.votes;
    }
    var sessionsVotes = {};
    var sessionsSum = 0;
    for(var i=0; i<this.state.sessionsList.length; i++){
        sessionsVotes[this.state.sessionsList[i].id]=0;
    }
    for(var i=0; i<this.state.votes.length; i++){
      sessionsSum += 1;
      sessionsVotes[this.state.votes[i].session_id] += 1;
    }
    sessionsVotes['sum'] = sessionsSum;
    if (this.state.session) {
      var sessionRegex = new RegExp(this.state.session, "i");
      var voteList = voteList.filter(function (vote) {
        return vote.session_id.search(sessionRegex) > -1;
      });
    }
    var classes = 'box ' + this.state.searchClass;
    return (
      <div className={classes}>

        <SearchBox 
          searchClass={this.state.searchClass} 
          politicians={politicianList} 
          changeClass={this.changeClass} 
          onSearchChange={this.onSearchChange} 
          profile={this.state.profile} />

        <ProfileBox 
          profileClass={this.state.profileClass} 
          profile={this.state.profile} 
          closeProfile={this.closeProfile} 
          votes={voteList} 
          onBillSearchChange={this.onBillSearchChange} 
          onSessionSelectToggle={this.onSessionSelectToggle}
          onSessionSelect={this.onSessionSelect}
          sessionsList = {this.state.sessionsList}
          session = {this.state.session}
          sessionToggle = {this.state.sessionToggle}
          sessionsVotes = {sessionsVotes}
          retrievingVotes={this.state.retrievingVotes}
          getBillInfo = {this.getBillInfo}
          getBillText = {this.getBillText}
          currentVote = {this.state.currentVote}
          billInfo = {this.state.billInfo} />

          <BillTextBox billText={this.state.BillText} />

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
          this.setState({politicians: data['results']});
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
          this.setState({billText: data['results']});
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
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1)
      })
    })
    var initializeURL = '/initialize';
    this.fetchJSON(initializeURL, 'politicians');
    var sessionsURL = '/sessions';
    this.fetchJSON(sessionsURL, 'sessions');
  },
});
var ProfileBox = React.createClass({
  render: function() {
    var classes = 'profileBox ' + this.props.profileClass;
    var closeClass = 'close ' + this.props.profileClass;
    if (!this.props.profile.party_slug) {
      var partyName = this.props.profile.party_name;
    }
    else {
      var partyName = this.props.profile.party_slug;
    }
    
    return (
      <div className={classes}>
        <div className="profile">
          <a className={closeClass} onClick={this.props.closeProfile} href="#"></a>
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
            votes={this.props.votes} 
            retrievingVotes={this.props.retrievingVotes}
            getBillInfo = {this.props.getBillInfo}
            getBillText = {this.props.getBillText}
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
          console.log(billInfo);
        }
        var titleString = 'Full title: ' + infoText;
        var lawString =  'Law: ' + lawText;
        var statusString = 'Status: ' + billInfo['status_code'];
        var billInfo_output = <div className="col billInfo">{titleString}{lawString}{statusString}</div>;
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
            <div className={infoClass}>
                <div className="col spacer"></div>
                {billInfo_output}
                <div className="col goToBillText">
                  <span>full text</span>
                  <ArrowButton />
                </div>
                <div className="col spacer"></div>
            </div>
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
var ArrowButton = React.createClass({
  render: function () {
    return (
      <button class="arrow right">
        <svg width="60px" height="80px" viewBox="0 0 50 80">
          <polyline fill="none" stroke="#FFFFFF" strokeWidth="1" stroke-linecap="round" strokeLinejoin="round" points="
        0.375,0.375 45.63,38.087 0.375,75.8 "/>
        </svg>
      </button>
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
        var string = object.id + ' - (' + sum + ')';
        return (
          <li onClick={this.props.onSessionSelect.bind(null,object)} key={i}><span className="session">{object.id}</span> <span className="sum">{sum}</span></li>
        );
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
    var classes = 'searchBox ' + this.props.searchClass;
    var containerclasses = 'searchBox-noscroll ' + this.props.searchClass;
    return (
      <div className={containerclasses}>
      <div className={classes}>
        <form>
          <input type="search" placeholder="Search..." onChange={this.props.onSearchChange} />
          <button type="submit">Search</button>
        </form>
        <div className="searchContent">
          <SearchStack changeClass={this.props.changeClass} politicians={this.props.politicians} profile={this.props.profile} />
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
    var boundClick = this.props.changeClass;   
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
      return (
        <a className={classString} onClick={boundClick.bind(null,object)} href="#" key={i}>
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
var BillTextBox = React.createClass({
  render: function() {
    return (
      <div className="billTextBox">
        <div className="billText">{this.props.billText}</div>
      </div>
    );
  }
});

React.render(
  <AppBox />,
  document.getElementById('content')
);