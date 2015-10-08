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

//Mixins

// Elements
var ArrowIcon = require('./elements/ArrowIcon.js');

// Boxes
var SearchBox = require('./boxes/search/SearchBox.js');
var ProfileBox = require('./boxes/profile/ProfileBox.js');
var InfoBox = require('./boxes/info/InfoBox.js');
var TextBox = require('./boxes/text/TextBox.js');


var App = React.createClass({

  // ****STATE FUNCTIONS**** //
  getInitialState: function() {
    var appState = this.getAppState();
    return {
      app: appState,
    };
  },

  getAppState: function(prevAppState) {
    // default state on initiation
    var defaultAppState = { 
      box: 'search',
      politicianList: [],
      partiesList: {},
      ridingsList: {},
      sessionsList: {},
      sessions: ['41-2', '41-1'],
      expandState: true,
      search: {
        max: 10,
        isLoading: true,
        isSearching: false,
        searchValue: '',
        riding: '',
      },
      profile: {
        id: 0,
        votes: {},
        isLoading: false,
      },
      vote: {
        id: 0,
        data: {},
        sponsor: 0,
        isLoading: false,
        searchValue: '',
      },
      bill: {
        id: 0,
        data: {},
        isLoading: false,
      }
    };
    if (typeof(prevAppState)==='undefined') prevAppState = defaultAppState;
    // edit state according to URL values
    var urlHash = window.location.hash.substr(1);
    var newAppState = this.cloneAppState(prevAppState);
    var urlParameters = urlHash.split('/').filter(function(n){ return n != '' });
    newAppState.box = 'search';
    // if profile or bill
    if (urlParameters.length >= 2) {
      if ((urlParameters[0] == 'profile') && !isNaN(urlParameters[1])) {
        newAppState.box = 'profile';
        newAppState.profile.isLoading = true;
        newAppState.profile.id = urlParameters[1];
        newAppState.profile.votes = [];
      }
      else if ((urlParameters[0] == 'bill') && !isNaN(urlParameters[1])) {
        newAppState.box = 'bill';
        newAppState.bill.isLoading = true;
        newAppState.bill.id = urlParameters[1];
        newAppState.bill.data = {};
      }
    }
    // if profile and vote specified
    if (urlParameters.length >= 4) {
      if ((urlParameters[2] == 'vote') && !isNaN(urlParameters[3])) {
        newAppState.vote.isLoading = true;
        newAppState.vote.id = urlParameters[3];
        newAppState.vote.data = {};
        newAppState.vote.sponsor = 0;
      }
    }
    return newAppState;
  },

  componentDidMount: function() {
    this.getInitialData();
    if (this.state.app.profile.id) {
      this.getPoliticianVotes(this.state.app.profile.id);
    }
    if (this.state.app.vote.id) {
      this.getVoteInformation(this.state.app.vote.id);
    }

    window.addEventListener('hashchange', function(){
      var currentAppState = this.cloneAppState(this.state.app);
      this.updateAppState(currentAppState);
    }.bind(this));
  },

  cloneAppState: function(appState) {
    return (JSON.parse(JSON.stringify(appState)));
  },

  updateAppState: function(currentAppState) {
    var nextAppState = this.getAppState(currentAppState);
    if (nextAppState.profile.id && (nextAppState.profile.id != currentAppState.profile.id)) {
      this.getPoliticianVotes(nextAppState.profile.id);
    }
    if (nextAppState.vote.id && (nextAppState.vote.id != currentAppState.vote.id)) {
      this.getVoteInformation(nextAppState.vote.id);
    }
    this.setState({app: nextAppState});
  },

  // ****DATA COLLECTION FUNCTIONS**** //

  getInitialData: function() {
    if (typeof(Storage) == "undefined") {
      this.fetchDataFromServer('/initialize', this.setInitialData);
    }
    else {
      //if (typeof(localStorage.initialData) != "undefined") {
      //  this.setInitialData(localStorage.initialData);
      //}
      //else {
        this.fetchDataFromServer('/initialize', this.setInitialData);
      //}
    }
  },

  setInitialData: function(data) {
    if (typeof(Storage) !== "undefined") {
      if (typeof(localStorage.initialData) == "undefined") {
        localStorage.initialData = data;
      }
    }
    var parsedData = JSON.parse(data);
    appState = this.cloneAppState(this.state.app);
      appState.politicianList = parsedData['politicians'];
      appState.ridingsList = parsedData['ridings'];
      appState.partiesList = parsedData['parties'];
      appState.sessionsList = parsedData['sessions'];
      appState.search.isLoading = false;
    this.setState({app: appState});
  },

  getPoliticianVotes: function(id) {
    this.fetchDataFromServer('/votes/' + id, this.setPoliticianVotes);
  },

  setPoliticianVotes: function(data) {
    var parsedData = JSON.parse(data);
    appState = this.cloneAppState(this.state.app);
      appState.profile.votes = parsedData['votes'];
      appState.profile.isLoading = false;
    this.setState({app: appState});
  },

  getVoteInformation: function(id) {
    this.fetchDataFromServer('/vote/' + id, this.setVoteInformation);
  },

  setVoteInformation: function(data) {
    var parsedData = JSON.parse(data);
    appState = this.cloneAppState(this.state.app);
      appState.vote.data = parsedData['votes'];
      appState.vote.data = parsedData['votes'];
      appState.vote.sponsor = parsedData['sponsor'];
      appState.vote.isLoading = false;
    this.setState({app: appState});
  },

  fetchDataFromServer: function(path, setter, willReturn) {
    if (typeof(willReturn)==='undefined') willReturn = false;
    var request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        setter(request.responseText);
      }
      else {
        console.log("error fetching data from server")
      }
    }
    request.onerror = function() {
        console.log("error requesting data from server")
    };
    request.send();
  },

  // ****SEARCH/FILTER FUNCTIONS**** //

  getSearchRiding: function(searchValue) {
    searchValue = searchValue.replace(/\s+/g, '');
    searchValue = searchValue.toUpperCase();
    var postalURL = 'https://represent.opennorth.ca/postcodes/' + searchValue + '/?sets=federal-electoral-districts';
    this.fetchDataFromServer(postalURL, this.setSearchRiding)
  },

  setSearchRiding: function(data) {
    var parsedData = JSON.parse(data);
    appState = this.cloneAppState(this.state.app);
      appState.search.riding = parsedData["boundaries_concordance"][0]["name"];
    this.setState({app: appState});
  },

  onSearchChange: function(event) {
    console.log('search change');
    // check to see if the max is greater than the number of results - if so, reduce it
    var max = this.state.app.search.max;
    var num = this.filterPoliticians().length;
    if (num < max) {
      max = num;
      if (max < 10) {
        max = 10;
      }
    }

    var searchValue = event.target.value;

    // postal code test
    var postalRegEx = new RegExp("^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\\d{1}[A-Za-z]{1} *\\d{1}[A-Za-z]{1}\\d{1}$", "i");
    if (postalRegEx.test(searchValue)) {
      this.getSearchRiding(searchValue);
    }
    // otherwise, normal state change
    else {
      appState = this.cloneAppState(this.state.app);
      if (searchValue == '') {
        appState.search.isSearching = false;
      }
      else {
        appState.search.isSearching = true;
      }
      appState.search.searchValue = searchValue;
      appState.search.max = max;
      appState.search.riding = '';
      this.setState({app: appState});
    }
  },
  onSearchScroll: function(thingone, thingtwo) {
    var scrollTop = thingone.getDOMNode().scrollTop;
    var height = thingone.getDOMNode().scrollHeight;
    var h = window.innerHeight;
    var max = this.state.app.search.max;
    if ((h + scrollTop + 100) > height) {
      var num = this.filterPoliticians().length;
      if (max < num) {
        appState = this.cloneAppState(this.state.app);
          appState.search.max = max + 10;
        this.setState({app : appState});
      }
    }
  },

  onBillSearchChange: function(event) {
    appState = this.cloneAppState(this.state.app);
      appState.vote.searchValue = event.target.value;
    this.setState({app: appState});
  },

  filterPoliticians: function() {
    var filteredList = this.state.app.politicianList.filter(function (pol) {
      for (var i = 0; i < pol.sessions.length; i++) {
        for (var j = 0; j < this.state.app.sessions.length; j++) {
          if (pol.sessions[i] == this.state.app.sessions[j]) {
            return true;
          }
        }
      }
      return false;
    }.bind(this));
    if (this.state.app.search.isSearching && this.state.app.search.searchValue) {
      if (this.state.app.search.riding != '') {
        var searchRiding = this.state.app.search.riding.replace(/\W/g, "");
        var regex = new RegExp(this.state.app.search.riding.replace(/\W/g, ""), "i");
        var filteredList = filteredList.filter(function (pol) {
          pol.riding = this.state.app.ridingsList[pol.ridings[0]].name.replace(/\W/g, "");
          return pol.riding.search(regex) > -1;
        }.bind(this));
      }
      else {
        var regex = new RegExp(this.state.app.search.searchValue, "i");
        var filteredList = filteredList.filter(function (pol) {
          pol.partyName = this.state.app.partiesList[pol.parties[0]].name;
          pol.partySlug = this.state.app.partiesList[pol.parties[0]].slug;
          pol.riding = this.state.app.ridingsList[pol.ridings[0]].name;
          return pol.name.search(regex) > -1 || pol.partyName.search(regex) > -1 || pol.partySlug.search(regex) > -1 || pol.riding.search(regex) > -1  || pol.riding.search(regex) > -1;
        }.bind(this));
      }  
    }
    return filteredList;
  },
  filterVotes: function() {
    if (Object.keys(this.state.app.profile.votes).length > 0) {
      var sessions = this.state.app.sessions;
      var filteredVotesBySession = this.state.app.profile.votes.filter(function (vote) {
        for (var i = 0; i < sessions.length; i++) {
          if (vote.session_id == sessions[i]) {
            return true;
          }
        }
        return false;
      }.bind(this));
      if (this.state.app.vote.searchValue) {
        var regex = new RegExp(this.state.app.vote.searchValue, "i");
        var votes = filteredVotesBySession.filter(function (vote) {
          return vote.name_en.search(regex) > -1 || vote.number.search(regex) > -1 || vote.short_title_en.search(regex) > -1;
        });
      }
      else {
        var votes = filteredVotesBySession;
      }
    }
    else {
      votes = this.state.app.profile.votes;
    }
    
    return votes;
  },

  sessionToggle: function(sessionNumber) {
    var newSessions = [];
    var $inArray = false;
    if (this.state.app.sessions.length == 1) {
      if (this.state.app.sessions[0] == sessionNumber) {
        newSessions = [sessionNumber];
      }
      else {
        newSessions.push(this.state.app.sessions[0]);
        newSessions.push(sessionNumber);
      }
    }
    else {
      for (i=0;i<this.state.app.sessions.length;i++) {
        if (this.state.app.sessions[i]!=sessionNumber) {
          newSessions.push(this.state.app.sessions[i]);
        }
        else {
          $inArray = true;
        }
      }
      if (!$inArray) {
        newSessions.push(sessionNumber);
      }
    }
    appState = this.cloneAppState(this.state.app);
      appState.sessions = newSessions;
    this.setState({app: appState});
  },

  expandSessions: function () {
    appState = this.cloneAppState(this.state.app);
      appState.expandState = !this.state.app.expandState;
    this.setState({app: appState});
  },

  getPoliticianByID: function(id) {
    if (id) {
      for (i=0;i<this.state.app.politicianList.length;i++) {
        if (this.state.app.politicianList[i].id == id) {
          return this.state.app.politicianList[i];
        }
      }
    }
    return false;
  },
  getPartyByID: function(id) {
    if (id) {
      if (this.state.app.partiesList[id].slug) {
        return this.state.app.partiesList[id].slug;
      }
      else {
        return this.state.app.partiesList[id].name;
      }
    }
    return false;
  },
  getRidingByID: function(id) {
    if (id) {
      return this.state.app.ridingsList[id].name;
    }
    return false;
  },

  render: function() {
    console.log('render');
    var loading = (this.state.app.vote.isLoading) ? "loading" : "loaded";
    var filteredPoliticianList = this.filterPoliticians().slice(0, this.state.app.search.max);
    var currentProfile = this.getPoliticianByID(this.state.app.profile.id);
    var getters = [this.getPoliticianByID,this.getPartyByID,this.getRidingByID];
    var votes = this.filterVotes();
    return (
      <div className="box search">
        <SearchBox
          box={this.state.app.box} //temp
          politicianList={filteredPoliticianList}
          partiesList={this.state.app.partiesList}
          ridingsList={this.state.app.ridingsList}
          sessionsList={this.state.app.sessionsList}
          sessions={this.state.app.sessions}
          search={this.state.app.search}
          onSearchScroll={this.onSearchScroll}
          onSearchChange={this.onSearchChange}
          sessionToggle={this.sessionToggle}
          expandSessions={this.expandSessions}
          expandState={this.state.app.expandState}
          getters = {getters}
          currentProfileID = {this.state.app.profile.id} />
        <ProfileBox 
          box={this.state.app.box} //temp
          getters = {getters}
          profile={currentProfile}
          votes={votes} 
          currentVote={this.state.app.vote}
          onBillSearchChange={this.onBillSearchChange} 
          getBillInfo = {this.getBillInfo}
          billInfo = {this.state.app.vote.data}
          getPolitician = {this.getPolitician} />
      </div>
    );
  },

  getBillInfo: function(object, event) {
    if (object.props.vote.votequestion_id == this.state.app.vote.id) {
      appState = this.cloneAppState(this.state.app);
        appState.vote.id = 0;
        appState.vote.votes = {};
      this.setState({app: appState});
    }
    else {
      this.getVoteInformation(object.props.vote.votequestion_id);
      appState = this.cloneAppState(this.state.app);
        appState.vote.id = object.props.vote.votequestion_id;
        appState.vote.data = {};
      this.setState({app: appState});
    }
  },
  getPolitician: function(politicians, id) {
    //if (typeof(politicians)==='undefined') politicians = this.state.politicians;
    //if (typeof(id)==='undefined') id = this.state.id;
    //if (id) {
    //  for (i = 0; i < politicians.length; i++) {
    //    if (politicians[i].id == id) {
    //      return politicians[i];
    //    }
    //  }
    //}
    return [];
  },
  
});

React.render(
  <App />,
  document.getElementById('content')
);