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
    var appState = this.setAppState();
    return {
      app: appState,
    };
  },

  setAppState: function(prevState) {
    // default state on initiation
    if (typeof(prevState)==='undefined') prevState = { 
      app: {
        box: 'search',
        politicianList: {},
        partiesList: {},
        ridingsList: {},
        sessionsList: {},
        sessions: ['42-2', '42-1'],
        search: {
          isSearching: false,
          searchValue: '',
          riding: '',
          max: 10,
          isLoading: true,
        },
        profile: {
          id: 0,
          votes: {},
          isLoading: false,
        },
        vote: {
          id: 0,
          data: {},
          isLoading: false,
        },
        bill: {
          id: 0,
          data: {},
          isLoading: false,
        }
      }
    };
    // edit state according to URL values
    var urlHash = window.location.hash.substr(1);
    var newState = prevState;
    var urlParameters = urlHash.split('/').filter(function(n){ return n != '' });
    var box = prevState.app.box;
    // if profile or bill
    if (urlParameters.length >= 2) {
      if ((urlParameters[0] == 'profile') && !isNaN(urlParameters[1])) {
        newState.app.box = 'profile';
        newState.app.profile.isLoading = true;
        newState.app.profile.id = urlParameters[1];
      }
      else if ((urlParameters[0] == 'bill') && !isNaN(urlParameters[1])) {
        newState.app.box = 'bill';
        newState.app.bill.isLoading = true;
        newState.app.bill.id = urlParameters[1];
      }
    }
    // if profile and vote specified
    if (urlParameters.length >= 4) {
      if ((urlParameters[2] == 'vote') && !isNaN(urlParameters[3])) {
        console.log(urlParameters[3]);
        newState.app.vote.isLoading = true;
        newState.app.vote.id = urlParameters[3];
      }
    }
    return newState.app;
  },

  componentDidMount: function() {
    this.getInitialData();
    if (this.state.app.box === 'profile') {
      this.getPoliticianVotes(this.state.app.profile.id);
    }
  },

  getPoliticianVotes: function(id) {
    this.fetchDataFromServer('/votes/' + id, this.setPolitician);
  },

  setPolitician: function(data) {
    var parsedData = JSON.parse(data);
    appState = this.state.app;
      appState.profile.votes = parsedData['votes'];
      appState.profile.isLoading = false;
    this.setState({app: appState});
  },

  getInitialData: function() {
    console.log('i got called');
    if (typeof(Storage) == "undefined") {
      console.log('storage is undefined');
      this.fetchDataFromServer('/initialize', this.setInitialData);
    }
    else {
      console.log('storage is defined');
      console.log(typeof(localStorage.initial_data) != "undefined");
      if (typeof(localStorage.initial_data) != "undefined") {
        console.log('initial data is defined');
        this.setInitialData(localStorage.initial_data);
      }
      else {
        console.log('initial data is undefined');
        this.fetchDataFromServer('/initialize', this.setInitialData);
      }
    }
  },

  setInitialData: function(initialData) {
    console.log('got this far');
    if (typeof(Storage) !== "undefined") {
      if (typeof(localStorage.initial_data) == "undefined") {
        console.log('got this far');
        localStorage.initial_data = initialData;
      }
    }
    var parsedData = JSON.parse(initialData);
    appState = this.state.app;
      appState.politicianList = parsedData['politicians'];
      appState.ridingsList = parsedData['ridings'];
      appState.partiesList = parsedData['parties'];
      appState.sessionsList = parsedData['sessions'];
      appState.search.isLoading = false;
    this.setState({app: appState});
    console.log('and this far');
  },

  fetchDataFromServer: function(path, setter, willReturn) {
    console.log('i got activated');
    if (typeof(willReturn)==='undefined') willReturn = false;

    var request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.onload = function() {
      // success
      if (request.status >= 200 && request.status < 400) {
        setter(request.responseText);
      }
      else {
        console.log("error fetching data from server")
      }
    }
    request.onerror = function() {
        console.log("error requesting data from server")
      // There was a connection error of some sort
    };
    request.send();
  },

  
  render: function() {
    var loading = (this.state.app.search.isLoading) ? "loading" : "loaded";
    return (
      <div>
        {loading}
      </div>
    );
  },
  
});

React.render(
  <App />,
  document.getElementById('content')
);