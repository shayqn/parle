/** @jsx React.DOM */


var PureRenderMixin = require('react-addons-pure-render-mixin');
var SearchStack = React.createClass({displayName: "SearchStack",
  mixins: [PureRenderMixin],
  render: function() {
    classString = "searchStack";
    var currentProfileID = this.props.currentProfileID;
    var currentProfileIsLoading = this.props.currentProfileIsLoading;
    var politicianNodes = [];
    var getPoliticianByID = this.props.getters[0];
    var getPartyByID = this.props.getters[1];
    var getRidingByID = this.props.getters[2];
    if (this.props.politicians.length > 0) {
      politicianNodes = this.props.politicians.map(function (politician, key) {
        return (
          <PoliticianResult
            key={key}
            politician={politician}
            currentProfileID={currentProfileID}
            currentProfileIsLoading={currentProfileIsLoading}
            getters={this.props.getters}
            box={this.props.box} />
        );
      }.bind(this));  
    }
    else if (this.props.searching) {
      var noResultsNode = React.createElement("a", null, React.createElement("h3", null, "NO RESULTS"));
      politicianNodes.push(noResultsNode);
    }
    else {
      var placeHolderNames = ['John A. McTemp', 'John Fakenbaker', 'Pierre Tempdeau'];
      for (i = 0; i < 11; i++) {
        var emptyNode = React.createElement("a", {key: i, className: "placeholder", href: "/#/"}, React.createElement("div", null), React.createElement("h3", null, placeHolderNames[i%3]), React.createElement("span", {className: "party"}, "VAN"));
        politicianNodes.push(emptyNode);
      }
    }
    return (
      <div className={classString}>
        <SessionSelector 
         sessionsList={this.props.sessionsList}
         currentSessions={this.props.currentSessions}
         sessionToggle = {this.props.sessionToggle}
         expandSessions = {this.props.expandSessions}
          expandState = {this.props.expandState} />
        <h2>Members of Parliament<span className="leaf"></span></h2>
        <div className="results">
          {politicianNodes}
        </div>
      </div>
    );
  }
});

var PoliticianResult = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    var getPartyByID = this.props.getters[1];
    var politician = this.props.politician;
    var headshot = politician.headshot.split('/').pop();
    var imgURL = "url('/static/headshots/" + headshot + "')";
    var classString = 'result ';
    var loader = null;
    if (politician.id == this.props.currentProfileID) {
      classString += 'active ';
      if (this.props.currentProfileIsLoading) {
        loader= (<div className="loader loading"></div>);
      }
      else {
        loader= (<div className="loader complete"></div>);
      }
    }
    if ((politician.id == this.props.currentProfileID)&&(this.props.box == 'profile')) {
      var href = '/#/';
    }
    else {
      var href = '/#/profile/' + politician.id;
    }
    var partyName = getPartyByID(politician.parties[0]);
    if (politician.name.length>19) {
      if (politician.name.length > 22) {
        classString += ' reduce-large'
      }
      else {
        classString += ' reduce-medium';
      }
    }
    return (
      <a className={classString} href={href} key={this.props.key} >
        <div className="headshot" style={{backgroundImage: imgURL}}></div>
        <h3>{politician.name}</h3>
        <span className="party">{partyName}</span>
        {loader}
      </a>
    );
  }

});

module.exports = SearchStack;