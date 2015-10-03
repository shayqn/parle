/** @jsx React.DOM */

if (typeof ga !== 'undefined') { // fail gracefully
  tracker = ga.create('UA-67804451-1', 'votes.mp');
}
function gaTrack(path, title) {
  if (typeof ga !== 'undefined') { // fail gracefully
    if (path=="") {
      path = "/";
    }
    ga('set', { page: path, title: title });
    ga('send', 'pageview');
  }
}

// Elements
var ArrowIcon = require('./elements/ArrowIcon.js');

// Boxes
var SearchBox = require('./boxes/search/SearchBox.js');
var ProfileBox = require('./boxes/profile/ProfileBox.js');
var InfoBox = require('./boxes/info/InfoBox.js');
var TextBox = require('./boxes/text/TextBox.js');


var App = React.createClass({
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

        <TextBox box={this.state.box} billText={this.state.billText} />
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

React.render(
  <App />,
  document.getElementById('content')
);