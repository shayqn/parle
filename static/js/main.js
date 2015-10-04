(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/braden/parle/src/js/boxes/info/InfoBox.js":[function(require,module,exports){
/** @jsx React.DOM */

var InfoText = require('./InfoText.js');
var InfoBox = React.createClass({displayName: "InfoBox",
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
      React.createElement("div", {className: classes}, React.createElement("div", {className: "closeContainer"}, React.createElement("a", {href: "/#/", onClick: this.goBack})), React.createElement(InfoText, null))
    );
  }
});

module.exports = InfoBox;

},{"./InfoText.js":"/Users/braden/parle/src/js/boxes/info/InfoText.js"}],"/Users/braden/parle/src/js/boxes/info/InfoText.js":[function(require,module,exports){
/** @jsx React.DOM */

var InfoText = React.createClass({displayName: "InfoText",
  render: function () {
    return (
    React.createElement("div", {className: "infoText"}, 
      React.createElement("h2", null, "about votes.mp"), 
      React.createElement("p", null, "Democracies are defined by the laws that they pass, and the laws that pass are determined by the representatives we elect. In order to accurately evaluate whether our elected members of parliament are appropriately representing their electorate, the most pertinent information we have is their voting history: which bills have they voted for, which have they voted against, and which have they abstained from voting on. "), 
      React.createElement("p", null, "While this information is made publicly available to all Canadians, we noticed that it can be slow and difficult to parse. Every bill is voted on multiple times - sometimes to pass amendments, sometimes even just to vote on whether or not it will be discussed. Unless you are able to dedicate significant time and effort into becoming well-versed on the details of each bill, attempting to analyze the votes a politician makes can be more confusing than informative."), 
      React.createElement("p", null, "As engaged citizens who are not capable of being intimately familiar with the details and progress of every bill, what we wanted to know was this: after all the amendments and edits, did the politician vote to make the final bill a law or not? "), 
      React.createElement("p", null, "That is what this website provides: for every member of parliament, it returns only the votes that correspond to their final vote on a bill as well as whether or not the bill was successfully passed into law."), 
      React.createElement("p", null, "We hope that this provides an easy additional avenue for evaluating the performance of our elected members of parliament and determining their effectiveness in representing our views."), 
      React.createElement("span", {className: "githubLink"}, React.createElement("a", {href: "https://github.com/shayqn/parle"}, "view project on github")), 
      React.createElement("span", {className: "creditWhereCreditsDue"}, "special thanks to ", React.createElement("a", {href: "https://openparliament.ca"}, "openparliament.ca"), " for providing all the data")
    )
    );
  }
});

  module.exports = InfoText;

},{}],"/Users/braden/parle/src/js/boxes/profile/BillSearch.js":[function(require,module,exports){
/** @jsx React.DOM */

var BillSearch = React.createClass({displayName: "BillSearch",
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
            React.createElement("li", {onClick: this.props.onSessionSelect.bind(null,object), key: i}, React.createElement("span", {className: "session"}, object.id), " ", React.createElement("span", {className: "sum"}, sum))
          );
        }
    }.bind(this));
    return (
      React.createElement("div", {className: "billSearch"}, 
        React.createElement("form", null, 
          React.createElement("input", {type: "search", placeholder: "Search bills by name or number...", onChange: this.props.onBillSearchChange}), 
          React.createElement("div", {className: toggleClass}, 
          React.createElement("span", {className: "select", onClick: this.props.onSessionSelectToggle}, selectText), 
          React.createElement("ul", null, 
            React.createElement("li", {className: "sessionOption", onClick: this.props.onSessionSelect.bind(null,'')}, React.createElement("span", {className: "session"}, "any session"), " ", React.createElement("span", {className: "sum"}, sessionsVotes['sum'])), 
            objectNodes
          )
          )
        )
      )
      
    );
  }
});

module.exports = BillSearch;

},{}],"/Users/braden/parle/src/js/boxes/profile/BillStack.js":[function(require,module,exports){
/** @jsx React.DOM */

var VoteRow = require('./VoteRow.js');
var BillStack = React.createClass({displayName: "BillStack",
  render: function() {
    var currentVote = this.props.currentVote;
    var getBillInfo = this.props.getBillInfo;
    var voteRows = [];
    var loader = null;
    if (this.props.votes.length  > 0) {
      var getBillText = this.props.getBillText;
      voteRows = this.props.votes.map(function (object, i) {
        return (
          React.createElement(VoteRow, {
            key: i, 
            vote: object, 
            currentVote: currentVote, 
            onClick: getBillInfo, 
            billInfo: this.props.billInfo, 
            getPolitician: this.props.getPolitician})
        );
      }.bind(this));
    }
    else if (this.props.retrievingVotes) {
      
      for (var i = 0; i < 15; i++) {
        var emptyRow = (
          React.createElement("div", {key: i, className: "voteRow row empty"}, 
            React.createElement("div", {className: "main row"}, 
              React.createElement("div", {className: "col spacer left"}), 
              React.createElement("div", {className: "col session"}), 
              React.createElement("div", {className: "col number"}), 
              React.createElement("div", {className: "col vote full-layout"}), 
              React.createElement("div", {className: "col shortname"}, React.createElement("span", null, "no result")), 
              React.createElement("div", {className: "col vote mobile-only"}), 
              React.createElement("div", {className: "col law"}), 
              React.createElement("div", {className: "col dropdown"}), 
              React.createElement("div", {className: "col spacer right"})
            )
          )
        );
        voteRows.push(emptyRow);
      }
      loader = React.createElement("div", {className: "loader-container"}, React.createElement("div", {className: "loader"}));
    }
    else {
      var noResultsRow = (
          React.createElement("div", {className: "voteRow row noresults"}, 
            React.createElement("div", {className: "main row"}, 
              React.createElement("div", {className: "col spacer"}), 
              React.createElement("div", {className: "col"}, React.createElement("span", null, "no results found")), 
              React.createElement("div", {className: "col spacer"})
            )
          )
        );
      voteRows.push(noResultsRow);
    }
    return (
      React.createElement("div", {className: "votes"}, 
        React.createElement("div", {className: "billStack"}, 
            React.createElement("div", {className: "row header"}, 
              React.createElement("div", {className: "col spacer left"}), 
              React.createElement("div", {className: "col session"}, "Session"), 
              React.createElement("div", {className: "col number"}, "Number"), 
              React.createElement("div", {className: "col vote full-layout"}, "Vote"), 
              React.createElement("div", {className: "col shortname"}, "Name"), 
              React.createElement("div", {className: "col vote mobile-only"}, "Vote"), 
              React.createElement("div", {className: "col law"}, "Law"), 
              React.createElement("div", {className: "col dropdown"}), 
              React.createElement("div", {className: "col spacer right"})
            ), 
            voteRows, 
            loader
        )
      )
    );        
  }
});

module.exports = BillStack;

},{"./VoteRow.js":"/Users/braden/parle/src/js/boxes/profile/VoteRow.js"}],"/Users/braden/parle/src/js/boxes/profile/ProfileBox.js":[function(require,module,exports){
/** @jsx React.DOM */
var BillStack = require('./BillStack.js');
var BillSearch = require('./BillSearch.js');
var ProfileBox = React.createClass({displayName: "ProfileBox",
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
      React.createElement("div", {className: classes}, 
        React.createElement("div", {className: "profileHeader"}, 
          React.createElement("a", {className: "return", href: "/#/"}, React.createElement("div", {className: "icon"}), React.createElement("span", null, "return to MP search")), 
          React.createElement("a", {className: closeClass, href: "/#/"}), 
          React.createElement("h2", {className: "name"}, this.props.profile.name), 
          React.createElement("span", {className: "info"}, React.createElement("h3", {className: "riding"}, this.props.profile.riding), React.createElement("h3", {className: "party"}, partyName)), 
          React.createElement(BillSearch, {
            onBillSearchChange: this.props.onBillSearchChange, 
            onSessionSelectToggle: this.props.onSessionSelectToggle, 
            onSessionSelect: this.props.onSessionSelect, 
            sessionsList: this.props.sessionsList, 
            sessionToggle: this.props.sessionToggle, 
            session: this.props.session, 
            sessionsVotes: this.props.sessionsVotes})
      ), 
      React.createElement(BillStack, {
        votes: this.props.votes, 
        retrievingVotes: this.props.retrievingVotes, 
        getBillInfo: this.props.getBillInfo, 
        currentVote: this.props.currentVote, 
        billInfo: this.props.billInfo, 
        getPolitician: this.props.getPolitician})
      )
    );
  },
});

module.exports = ProfileBox;

},{"./BillSearch.js":"/Users/braden/parle/src/js/boxes/profile/BillSearch.js","./BillStack.js":"/Users/braden/parle/src/js/boxes/profile/BillStack.js"}],"/Users/braden/parle/src/js/boxes/profile/VoteRow.js":[function(require,module,exports){
/** @jsx React.DOM */

var VoteRow = React.createClass({displayName: "VoteRow",
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
      React.createElement("div", {className: voteRowClass, key: this.props.key}, 
        React.createElement("div", {onClick: this.props.onClick.bind(null, this), className: "main row"}, 
          React.createElement("div", {className: "col spacer left"}), 
          React.createElement("div", {className: "col session"}, React.createElement("span", {className: "label mobile-only"}, "Session"), this.props.vote.session_id), 
          React.createElement("div", {className: "col number"}, React.createElement("span", {className: "label mobile-only"}, "Number"), this.props.vote.number), 
          React.createElement("div", {className: voteClass}, React.createElement("span", {className: "voteText"}, voteText)), 
          React.createElement("div", {className: "col shortname"}, name), 
          React.createElement("div", {className: mobileVoteClass}, React.createElement("span", {className: "label mobile-only"}, "Vote"), React.createElement("span", {className: "voteText"}, voteText)), 
          React.createElement("div", {className: lawClass}, React.createElement("span", {className: "label mobile-only"}, "Law"), React.createElement("span", {className: "lawText"}, lawText)), 
          React.createElement("div", {className: "col dropdown"}, React.createElement("span", null, React.createElement(ArrowIcon, null))), 
          React.createElement("div", {className: "col spacer right"})
        ), 
        React.createElement(VoteInfoRow, {
          vote: this.props.vote, 
          currentVote: this.props.currentVote, 
          voteQuestionID: this.props.vote.votequestion_id, 
          billInfo: this.props.billInfo, 
          getPolitician: this.props.getPolitician})
      )
    );
  }
});
var VoteInfoRow = React.createClass({displayName: "VoteInfoRow",
  render: function() {
    var infoClass = "row info";
    var getPolitician = this.props.getPolitician;
    var sponsorComponent = null;
    if (this.props.voteQuestionID == this.props.currentVote) {
      infoClass += ' current';
      var lawString =  'Law: ' + this.props.lawText;
      var voteInformation = React.createElement("div", {className: "col billInfo"}, lawString)
      if (undefined != this.props.billInfo.votes) {
        var partyVoteNodes = [];
        var i = 0;
        var node = (
          React.createElement("div", {key: 0, className: "partyVoteHeader", key: i}, 
            React.createElement("div", {className: "name"}, "Party"), 
            React.createElement("div", {className: "yes"}, "YES"), 
            React.createElement("div", {className: "no"}, "NO"), 
            React.createElement("div", {className: "abstain"}, "ABSTAIN")
          )
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
            React.createElement("div", {className: partyClass, key: i}, 
              React.createElement("div", {className: "name"}, partyName), 
              React.createElement("div", {className: yesClass}, React.createElement("span", null, yes)), 
              React.createElement("div", {className: noClass}, React.createElement("span", null, no)), 
              React.createElement("div", {className: abstainClass}, React.createElement("span", null, abstain))
            )
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
          React.createElement("div", {className: "partyVote total", key: "t"}, 
            React.createElement("div", {className: "name"}, "Total"), 
            React.createElement("div", {className: "yes"}, React.createElement("span", null, yesCount)), 
            React.createElement("div", {className: "no"}, React.createElement("span", null, noCount)), 
            React.createElement("div", {className: "abstain"}, React.createElement("span", null, abstainCount))
          )
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
            React.createElement("div", {className: "col sponsor"}, 
              React.createElement("h4", null, "Bill Sponsor"), 
              React.createElement("a", {className: sponsorClassString, href: href}, 
                React.createElement("div", {style: {backgroundImage: imgURL}}), 
                React.createElement("h3", null, sponsorProfile.name), 
                React.createElement("span", {className: "riding"}, sponsorProfile.riding), 
                React.createElement("span", {className: "party"}, partyName)
              )
            )
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
      React.createElement("div", {className: infoClass}, 
          React.createElement("div", {className: "col spacer left"}), 
          sponsorComponent, 
          React.createElement("div", {className: "col partyVotes"}, 
            React.createElement("h4", null, "Party Votes"), 
            React.createElement("div", {className: "partyVotesTable"}, 
              partyVoteNodes
            )
          ), 
          React.createElement("div", {className: "col moreBillInfo"}, 
          React.createElement("h4", null, "More Information"), 
            
            React.createElement("a", {href: openparliamentURL, target: "_blank"}, "view bill on openparliament.ca ", React.createElement(ArrowIcon, null)), 
            React.createElement("a", {href: parlURL, target: "_blank"}, "view session on parl.gc.ca ", React.createElement(ArrowIcon, null))
          ), 
          React.createElement("div", {className: "col spacer right"})
      )
    );
  }
});
var ArrowIcon = React.createClass({displayName: "ArrowIcon",
  render: function() {
    return (
      React.createElement("svg", {version: "1.1", x: "0px", y: "0px", 
         viewBox: "0 0 400 400"}, 
        React.createElement("path", {d: "M163.5,334.5l-47.1-47.1l87.5-87.5l-87.5-87.5l47.1-47.1L298,200L163.5,334.5z"})
      )
    );
  }
});
var BillSearch = React.createClass({displayName: "BillSearch",
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
            React.createElement("li", {onClick: this.props.onSessionSelect.bind(null,object), key: i}, React.createElement("span", {className: "session"}, object.id), " ", React.createElement("span", {className: "sum"}, sum))
          );
        }
    }.bind(this));
    return (
      React.createElement("div", {className: "billSearch"}, 
        React.createElement("form", null, 
          React.createElement("input", {type: "search", placeholder: "Search bills by name or number...", onChange: this.props.onBillSearchChange}), 
          React.createElement("div", {className: toggleClass}, 
          React.createElement("span", {className: "select", onClick: this.props.onSessionSelectToggle}, selectText), 
          React.createElement("ul", null, 
            React.createElement("li", {className: "sessionOption", onClick: this.props.onSessionSelect.bind(null,'')}, React.createElement("span", {className: "session"}, "any session"), " ", React.createElement("span", {className: "sum"}, sessionsVotes['sum'])), 
            objectNodes
          )
          )
        )
      )
      
    );
  }
});

module.exports = VoteRow;

},{}],"/Users/braden/parle/src/js/boxes/search/SearchBox.js":[function(require,module,exports){
/** @jsx React.DOM */

var SearchStack = require('./SearchStack.js');
SearchBox = React.createClass({displayName: "SearchBox",
  render: function() {
    var classes = 'searchBox ' + this.props.box;    return (
        React.createElement("div", {className: classes, onScroll: this.props.onSearchScroll.bind(null, this)}, 
          React.createElement("div", {className: "topLinks"}, React.createElement("a", {href: "/#/info", className: "info"}), React.createElement("a", {href: "https://github.com/shayqn/parle", className: "github"})), 
          React.createElement("form", null, 
            React.createElement("input", {type: "search", placeholder: "Search...", onChange: this.props.onSearchChange}), 
            React.createElement("button", {type: "submit"}, "Search"), 
            React.createElement("span", null, "by name, riding, or postal code")
          ), 
          React.createElement("div", {className: "searchContent"}, 
            React.createElement(SearchStack, {
              box: this.props.box, 
              politicians: this.props.politicians, 
              profile: this.props.profile, 
              searching: this.props.searching})
          )
        )
    );
  }
});
var SearchStack = React.createClass({displayName: "SearchStack",
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
          React.createElement("a", {className: classString, href: href, key: i}, 
            React.createElement("div", {style: {backgroundImage: imgURL}}), 
            React.createElement("h3", null, object.name), 
            React.createElement("span", {className: "party"}, partyName)
          )
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
      React.createElement("div", {className: classString}, 
        React.createElement("h2", null, "Members of Parliament", React.createElement("span", {className: "leaf"})), 
        politicianNodes
      )
    );
  }
});
module.exports = SearchBox;

},{"./SearchStack.js":"/Users/braden/parle/src/js/boxes/search/SearchStack.js"}],"/Users/braden/parle/src/js/boxes/search/SearchStack.js":[function(require,module,exports){
/** @jsx React.DOM */

var SearchStack = React.createClass({displayName: "SearchStack",
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
          React.createElement("a", {className: classString, href: href, key: i}, 
            React.createElement("div", {style: {backgroundImage: imgURL}}), 
            React.createElement("h3", null, object.name), 
            React.createElement("span", {className: "party"}, partyName)
          )
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
      React.createElement("div", {className: classString}, 
        React.createElement("h2", null, "Members of Parliament", React.createElement("span", {className: "leaf"})), 
        politicianNodes
      )
    );
  }
});

module.exports = SearchStack;

},{}],"/Users/braden/parle/src/js/boxes/text/BillText.js":[function(require,module,exports){
/** @jsx React.DOM */

var BillText = React.createClass({displayName: "BillText",
  prepText: function(text) {
    text = text.trim();
    return (text.length>0?'<p>'+text.replace(/[\r\n]+/,'</p><p>')+'</p>':null);
  },
  render: function () {
    var billText = this.prepText(this.props.billText);
    return (
    React.createElement("div", {className: "billText"}, 
      billText
    )
    );
  }
});

module.exports = BillText;

},{}],"/Users/braden/parle/src/js/boxes/text/TextBox.js":[function(require,module,exports){
/** @jsx React.DOM */

var BillText = require('./BillText.js');
var TextBox = React.createClass({displayName: "TextBox",
  render: function() {
    var classes = 'billTextBox ' + this.props.box;
    return (
      React.createElement("div", {className: classes}, React.createElement("div", {className: "closeContainer"}, React.createElement("a", {href: "/#/"})), React.createElement(BillText, {billText: this.props.billText}))
    );
  }
});

module.exports = TextBox;

},{"./BillText.js":"/Users/braden/parle/src/js/boxes/text/BillText.js"}],"/Users/braden/parle/src/js/elements/ArrowIcon.js":[function(require,module,exports){
var ArrowIcon = React.createClass({displayName: "ArrowIcon",
  render: function() {
    return (
      React.createElement("svg", {version: "1.1", x: "0px", y: "0px", 
         viewBox: "0 0 400 400"}, 
        React.createElement("path", {d: "M163.5,334.5l-47.1-47.1l87.5-87.5l-87.5-87.5l47.1-47.1L298,200L163.5,334.5z"})
      )
    );
  }
});

},{}],"/Users/braden/parle/src/js/parle.js":[function(require,module,exports){
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


var App = React.createClass({displayName: "App",
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
      React.createElement("div", {className: appClass}, 
        React.createElement(InfoBox, {box: this.state.box}), 

        React.createElement("div", {className: containerclasses}, 
          React.createElement(SearchBox, {
            box: this.state.box, 
            searching: this.state.searching, 
            politicians: politicianList, 
            onSearchChange: this.onSearchChange, 
            profile: politician, 
            onSearchScroll: this.onSearchScroll})
        ), 

        React.createElement(ProfileBox, {
          box: this.state.box, 
          profile: politician, 
          votes: voteList, 
          onBillSearchChange: this.onBillSearchChange, 
          onSessionSelectToggle: this.onSessionSelectToggle, 
          onSessionSelect: this.onSessionSelect, 
          sessionsList: this.state.sessionsList, 
          session: this.state.session, 
          sessionToggle: this.state.sessionToggle, 
          sessionsVotes: sessionVotes, 
          retrievingVotes: this.state.retrievingVotes, 
          getBillInfo: this.getBillInfo, 
          currentVote: this.state.currentVote, 
          billInfo: this.state.billInfo, 
          getPolitician: this.getPolitician}), 

        React.createElement(TextBox, {box: this.state.box, billText: this.state.billText})
      )
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
  React.createElement(App, null),
  document.getElementById('content')
);

},{"./boxes/info/InfoBox.js":"/Users/braden/parle/src/js/boxes/info/InfoBox.js","./boxes/profile/ProfileBox.js":"/Users/braden/parle/src/js/boxes/profile/ProfileBox.js","./boxes/search/SearchBox.js":"/Users/braden/parle/src/js/boxes/search/SearchBox.js","./boxes/text/TextBox.js":"/Users/braden/parle/src/js/boxes/text/TextBox.js","./elements/ArrowIcon.js":"/Users/braden/parle/src/js/elements/ArrowIcon.js"}]},{},["/Users/braden/parle/src/js/parle.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9Cb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9UZXh0LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU2VhcmNoLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU3RhY2suanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1Byb2ZpbGVCb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1ZvdGVSb3cuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9zZWFyY2gvU2VhcmNoQm94LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvc2VhcmNoL1NlYXJjaFN0YWNrLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvdGV4dC9CaWxsVGV4dC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2JveGVzL3RleHQvVGV4dEJveC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2VsZW1lbnRzL0Fycm93SWNvbi5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL3BhcmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUJBQXFCOztBQUVyQixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDeEMsSUFBSSw2QkFBNkIsdUJBQUE7RUFDL0IsbUJBQW1CLEVBQUUsU0FBUyxTQUFTLEVBQUUsU0FBUyxFQUFFO0lBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMs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LENBQUM7T0FDckI7TUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztNQUNwRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7UUFDOUQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztPQUNqTCxDQUFDLENBQUM7TUFDSCxPQUFPLFlBQVksQ0FBQztLQUNyQjtTQUNJO01BQ0gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztLQUMvQjtHQUNGO0FBQ0gsQ0FBQyxDQUFDLENBQUM7O0FBRUgsS0FBSyxDQUFDLE1BQU07RUFDVixvQkFBQyxHQUFHLEVBQUEsSUFBQSxDQUFHLENBQUE7RUFDUCxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztDQUNuQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEluZm9UZXh0ID0gcmVxdWlyZSgnLi9JbmZvVGV4dC5qcycpO1xudmFyIEluZm9Cb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGNvbXBvbmVudFdpbGxVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgaWYgKChuZXh0UHJvcHMuYm94ID09ICdpbmZvJykgJiYgKHRoaXMucHJvcHMuYm94ICE9ICdzZWFyY2gnKSkge1xuICAgICAgdGhpcy5iYWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmJhY2sgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIGdvQmFjazogZnVuY3Rpb24oZSkge1xuICAgIGlmICh0aGlzLmJhY2spIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNsYXNzZXMgPSAnaW5mb0JveCAnICsgdGhpcy5wcm9wcy5ib3g7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT48ZGl2IGNsYXNzTmFtZT1cImNsb3NlQ29udGFpbmVyXCI+PGEgaHJlZj1cIi8jL1wiIG9uQ2xpY2s9e3RoaXMuZ29CYWNrfT48L2E+PC9kaXY+PEluZm9UZXh0IC8+PC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW5mb0JveDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEluZm9UZXh0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5mb1RleHRcIj5cbiAgICAgIDxoMj5hYm91dCB2b3Rlcy5tcDwvaDI+XG4gICAgICA8cD5EZW1vY3JhY2llcyBhcmUgZGVmaW5lZCBieSB0aGUgbGF3cyB0aGF0IHRoZXkgcGFzcywgYW5kIHRoZSBsYXdzIHRoYXQgcGFzcyBhcmUgZGV0ZXJtaW5lZCBieSB0aGUgcmVwcmVzZW50YXRpdmVzIHdlIGVsZWN0LiBJbiBvcmRlciB0byBhY2N1cmF0ZWx5IGV2YWx1YXRlIHdoZXRoZXIgb3VyIGVsZWN0ZWQgbWVtYmVycyBvZiBwYXJsaWFtZW50IGFyZSBhcHByb3ByaWF0ZWx5IHJlcHJlc2VudGluZyB0aGVpciBlbGVjdG9yYXRlLCB0aGUgbW9zdCBwZXJ0aW5lbnQgaW5mb3JtYXRpb24gd2UgaGF2ZSBpcyB0aGVpciB2b3RpbmcgaGlzdG9yeTogd2hpY2ggYmlsbHMgaGF2ZSB0aGV5IHZvdGVkIGZvciwgd2hpY2ggaGF2ZSB0aGV5IHZvdGVkIGFnYWluc3QsIGFuZCB3aGljaCBoYXZlIHRoZXkgYWJzdGFpbmVkIGZyb20gdm90aW5nIG9uLiA8L3A+XG4gICAgICA8cD5XaGlsZSB0aGlzIGluZm9ybWF0aW9uIGlzIG1hZGUgcHVibGljbHkgYXZhaWxhYmxlIHRvIGFsbCBDYW5hZGlhbnMsIHdlIG5vdGljZWQgdGhhdCBpdCBjYW4gYmUgc2xvdyBhbmQgZGlmZmljdWx0IHRvIHBhcnNlLiBFdmVyeSBiaWxsIGlzIHZvdGVkIG9uIG11bHRpcGxlIHRpbWVzIC0gc29tZXRpbWVzIHRvIHBhc3MgYW1lbmRtZW50cywgc29tZXRpbWVzIGV2ZW4ganVzdCB0byB2b3RlIG9uIHdoZXRoZXIgb3Igbm90IGl0IHdpbGwgYmUgZGlzY3Vzc2VkLiBVbmxlc3MgeW91IGFyZSBhYmxlIHRvIGRlZGljYXRlIHNpZ25pZmljYW50IHRpbWUgYW5kIGVmZm9ydCBpbnRvIGJlY29taW5nIHdlbGwtdmVyc2VkIG9uIHRoZSBkZXRhaWxzIG9mIGVhY2ggYmlsbCwgYXR0ZW1wdGluZyB0byBhbmFseXplIHRoZSB2b3RlcyBhIHBvbGl0aWNpYW4gbWFrZXMgY2FuIGJlIG1vcmUgY29uZnVzaW5nIHRoYW4gaW5mb3JtYXRpdmUuPC9wPlxuICAgICAgPHA+QXMgZW5nYWdlZCBjaXRpemVucyB3aG8gYXJlIG5vdCBjYXBhYmxlIG9mIGJlaW5nIGludGltYXRlbHkgZmFtaWxpYXIgd2l0aCB0aGUgZGV0YWlscyBhbmQgcHJvZ3Jlc3Mgb2YgZXZlcnkgYmlsbCwgd2hhdCB3ZSB3YW50ZWQgdG8ga25vdyB3YXMgdGhpczogYWZ0ZXIgYWxsIHRoZSBhbWVuZG1lbnRzIGFuZCBlZGl0cywgZGlkIHRoZSBwb2xpdGljaWFuIHZvdGUgdG8gbWFrZSB0aGUgZmluYWwgYmlsbCBhIGxhdyBvciBub3Q/IDwvcD5cbiAgICAgIDxwPlRoYXQgaXMgd2hhdCB0aGlzIHdlYnNpdGUgcHJvdmlkZXM6IGZvciBldmVyeSBtZW1iZXIgb2YgcGFybGlhbWVudCwgaXQgcmV0dXJucyBvbmx5IHRoZSB2b3RlcyB0aGF0IGNvcnJlc3BvbmQgdG8gdGhlaXIgZmluYWwgdm90ZSBvbiBhIGJpbGwgYXMgd2VsbCBhcyB3aGV0aGVyIG9yIG5vdCB0aGUgYmlsbCB3YXMgc3VjY2Vzc2Z1bGx5IHBhc3NlZCBpbnRvIGxhdy48L3A+XG4gICAgICA8cD5XZSBob3BlIHRoYXQgdGhpcyBwcm92aWRlcyBhbiBlYXN5IGFkZGl0aW9uYWwgYXZlbnVlIGZvciBldmFsdWF0aW5nIHRoZSBwZXJmb3JtYW5jZSBvZiBvdXIgZWxlY3RlZCBtZW1iZXJzIG9mIHBhcmxpYW1lbnQgYW5kIGRldGVybWluaW5nIHRoZWlyIGVmZmVjdGl2ZW5lc3MgaW4gcmVwcmVzZW50aW5nIG91ciB2aWV3cy48L3A+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJnaXRodWJMaW5rXCI+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zaGF5cW4vcGFybGVcIj52aWV3IHByb2plY3Qgb24gZ2l0aHViPC9hPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNyZWRpdFdoZXJlQ3JlZGl0c0R1ZVwiPnNwZWNpYWwgdGhhbmtzIHRvIDxhIGhyZWY9XCJodHRwczovL29wZW5wYXJsaWFtZW50LmNhXCI+b3BlbnBhcmxpYW1lbnQuY2E8L2E+IGZvciBwcm92aWRpbmcgYWxsIHRoZSBkYXRhPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gSW5mb1RleHQ7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBCaWxsU2VhcmNoID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnNlc3Npb24gPT0gJycpIHtcbiAgICAgIHZhciBzZWxlY3RUZXh0ID0gJ2FueSBzZXNzaW9uJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgc2VsZWN0VGV4dCA9IHRoaXMucHJvcHMuc2Vzc2lvbjtcbiAgICB9XG4gICAgdmFyIHNlc3Npb25zVm90ZXMgPSB0aGlzLnByb3BzLnNlc3Npb25zVm90ZXM7XG4gICAgdmFyIHRvZ2dsZUNsYXNzID0gJ3Nlc3Npb25TZWxlY3QnICsgKHRoaXMucHJvcHMuc2Vzc2lvblRvZ2dsZSA/ICcnIDogJyBjb2xsYXBzZWQnKTtcbiAgICB2YXIgb2JqZWN0Tm9kZXMgPSB0aGlzLnByb3BzLnNlc3Npb25zTGlzdC5tYXAoZnVuY3Rpb24gKG9iamVjdCwgaSkge1xuICAgICAgICB2YXIgc3VtID0gc2Vzc2lvbnNWb3Rlc1tvYmplY3QuaWRdO1xuICAgICAgICBpZiAoc3VtKSB7XG4gICAgICAgICAgdmFyIHN0cmluZyA9IG9iamVjdC5pZCArICcgLSAoJyArIHN1bSArICcpJztcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxpIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0LmJpbmQobnVsbCxvYmplY3QpfSBrZXk9e2l9PjxzcGFuIGNsYXNzTmFtZT1cInNlc3Npb25cIj57b2JqZWN0LmlkfTwvc3Bhbj4gPHNwYW4gY2xhc3NOYW1lPVwic3VtXCI+e3N1bX08L3NwYW4+PC9saT5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiaWxsU2VhcmNoXCI+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYmlsbHMgYnkgbmFtZSBvciBudW1iZXIuLi5cIiBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkJpbGxTZWFyY2hDaGFuZ2V9IC8+ICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dG9nZ2xlQ2xhc3N9PiAgICBcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzZWxlY3RcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2Vzc2lvblNlbGVjdFRvZ2dsZX0+e3NlbGVjdFRleHR9PC9zcGFuPiAgXG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInNlc3Npb25PcHRpb25cIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2Vzc2lvblNlbGVjdC5iaW5kKG51bGwsJycpfT48c3BhbiBjbGFzc05hbWU9XCJzZXNzaW9uXCI+YW55IHNlc3Npb248L3NwYW4+IDxzcGFuIGNsYXNzTmFtZT1cInN1bVwiPntzZXNzaW9uc1ZvdGVzWydzdW0nXX08L3NwYW4+PC9saT5cbiAgICAgICAgICAgIHtvYmplY3ROb2Rlc31cbiAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbGxTZWFyY2g7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBWb3RlUm93ID0gcmVxdWlyZSgnLi9Wb3RlUm93LmpzJyk7XG52YXIgQmlsbFN0YWNrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50Vm90ZSA9IHRoaXMucHJvcHMuY3VycmVudFZvdGU7XG4gICAgdmFyIGdldEJpbGxJbmZvID0gdGhpcy5wcm9wcy5nZXRCaWxsSW5mbztcbiAgICB2YXIgdm90ZVJvd3MgPSBbXTtcbiAgICB2YXIgbG9hZGVyID0gbnVsbDtcbiAgICBpZiAodGhpcy5wcm9wcy52b3Rlcy5sZW5ndGggID4gMCkge1xuICAgICAgdmFyIGdldEJpbGxUZXh0ID0gdGhpcy5wcm9wcy5nZXRCaWxsVGV4dDtcbiAgICAgIHZvdGVSb3dzID0gdGhpcy5wcm9wcy52b3Rlcy5tYXAoZnVuY3Rpb24gKG9iamVjdCwgaSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxWb3RlUm93XG4gICAgICAgICAgICBrZXkgPSB7aX1cbiAgICAgICAgICAgIHZvdGUgPSB7b2JqZWN0fVxuICAgICAgICAgICAgY3VycmVudFZvdGUgPSB7Y3VycmVudFZvdGV9XG4gICAgICAgICAgICBvbkNsaWNrID0ge2dldEJpbGxJbmZvfVxuICAgICAgICAgICAgYmlsbEluZm8gPSB7dGhpcy5wcm9wcy5iaWxsSW5mb31cbiAgICAgICAgICAgIGdldFBvbGl0aWNpYW4gPSB7dGhpcy5wcm9wcy5nZXRQb2xpdGljaWFufSAvPlxuICAgICAgICApO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5wcm9wcy5yZXRyaWV2aW5nVm90ZXMpIHtcbiAgICAgIFxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gICAgICAgIHZhciBlbXB0eVJvdyA9IChcbiAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwidm90ZVJvdyByb3cgZW1wdHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbiByb3dcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIGxlZnRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc2Vzc2lvblwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBudW1iZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgdm90ZSBmdWxsLWxheW91dFwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzaG9ydG5hbWVcIj48c3Bhbj5ubyByZXN1bHQ8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHZvdGUgbW9iaWxlLW9ubHlcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbGF3XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGRyb3Bkb3duXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciByaWdodFwiPjwvZGl2PiBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgICB2b3RlUm93cy5wdXNoKGVtcHR5Um93KTtcbiAgICAgIH1cbiAgICAgIGxvYWRlciA9IDxkaXYgY2xhc3NOYW1lPVwibG9hZGVyLWNvbnRhaW5lclwiPjxkaXYgY2xhc3NOYW1lPVwibG9hZGVyXCI+PC9kaXY+PC9kaXY+O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBub1Jlc3VsdHNSb3cgPSAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2b3RlUm93IHJvdyBub3Jlc3VsdHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbiByb3dcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+PHNwYW4+bm8gcmVzdWx0cyBmb3VuZDwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyXCI+PC9kaXY+IFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB2b3RlUm93cy5wdXNoKG5vUmVzdWx0c1Jvdyk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ndm90ZXMnPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYmlsbFN0YWNrJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IGhlYWRlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgbGVmdFwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzZXNzaW9uXCI+U2Vzc2lvbjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBudW1iZXJcIj5OdW1iZXI8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgdm90ZSBmdWxsLWxheW91dFwiPlZvdGU8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc2hvcnRuYW1lXCI+TmFtZTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCB2b3RlIG1vYmlsZS1vbmx5XCI+Vm90ZTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsYXdcIj5MYXc8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgZHJvcGRvd25cIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIHJpZ2h0XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt2b3RlUm93c31cbiAgICAgICAgICAgIHtsb2FkZXJ9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTsgICAgICAgIFxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCaWxsU3RhY2s7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgQmlsbFN0YWNrID0gcmVxdWlyZSgnLi9CaWxsU3RhY2suanMnKTtcbnZhciBCaWxsU2VhcmNoID0gcmVxdWlyZSgnLi9CaWxsU2VhcmNoLmpzJyk7XG52YXIgUHJvZmlsZUJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICdwcm9maWxlQm94ICcgKyB0aGlzLnByb3BzLmJveDtcbiAgICB2YXIgY2xvc2VDbGFzcyA9ICdjbG9zZSAnICsgdGhpcy5wcm9wcy5ib3g7XG4gICAgaWYgKCF0aGlzLnByb3BzLnByb2ZpbGUucGFydHlfc2x1Zykge1xuICAgICAgdmFyIHBhcnR5TmFtZSA9IHRoaXMucHJvcHMucHJvZmlsZS5wYXJ0eV9uYW1lO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBwYXJ0eU5hbWUgPSB0aGlzLnByb3BzLnByb2ZpbGUucGFydHlfc2x1ZztcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlSGVhZGVyXCI+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwicmV0dXJuXCIgaHJlZj1cIi8jL1wiPjxkaXYgY2xhc3NOYW1lID1cImljb25cIj48L2Rpdj48c3Bhbj5yZXR1cm4gdG8gTVAgc2VhcmNoPC9zcGFuPjwvYT5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9e2Nsb3NlQ2xhc3N9IGhyZWY9XCIvIy9cIj48L2E+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cIm5hbWVcIj57dGhpcy5wcm9wcy5wcm9maWxlLm5hbWV9PC9oMj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbmZvXCI+PGgzIGNsYXNzTmFtZT1cInJpZGluZ1wiPnt0aGlzLnByb3BzLnByb2ZpbGUucmlkaW5nfTwvaDM+PGgzIGNsYXNzTmFtZT1cInBhcnR5XCI+e3BhcnR5TmFtZX08L2gzPjwvc3Bhbj5cbiAgICAgICAgICA8QmlsbFNlYXJjaCBcbiAgICAgICAgICAgIG9uQmlsbFNlYXJjaENoYW5nZT17dGhpcy5wcm9wcy5vbkJpbGxTZWFyY2hDaGFuZ2V9XG4gICAgICAgICAgICBvblNlc3Npb25TZWxlY3RUb2dnbGU9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0VG9nZ2xlfVxuICAgICAgICAgICAgb25TZXNzaW9uU2VsZWN0PXt0aGlzLnByb3BzLm9uU2Vzc2lvblNlbGVjdH1cbiAgICAgICAgICAgIHNlc3Npb25zTGlzdD17dGhpcy5wcm9wcy5zZXNzaW9uc0xpc3R9XG4gICAgICAgICAgICBzZXNzaW9uVG9nZ2xlID0ge3RoaXMucHJvcHMuc2Vzc2lvblRvZ2dsZX1cbiAgICAgICAgICAgIHNlc3Npb249e3RoaXMucHJvcHMuc2Vzc2lvbn1cbiAgICAgICAgICAgIHNlc3Npb25zVm90ZXMgPSB7dGhpcy5wcm9wcy5zZXNzaW9uc1ZvdGVzfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8QmlsbFN0YWNrIFxuICAgICAgICB2b3Rlcz17dGhpcy5wcm9wcy52b3Rlc30gXG4gICAgICAgIHJldHJpZXZpbmdWb3Rlcz17dGhpcy5wcm9wcy5yZXRyaWV2aW5nVm90ZXN9XG4gICAgICAgIGdldEJpbGxJbmZvID0ge3RoaXMucHJvcHMuZ2V0QmlsbEluZm99XG4gICAgICAgIGN1cnJlbnRWb3RlID0ge3RoaXMucHJvcHMuY3VycmVudFZvdGV9XG4gICAgICAgIGJpbGxJbmZvID0ge3RoaXMucHJvcHMuYmlsbEluZm99XG4gICAgICAgIGdldFBvbGl0aWNpYW4gPSB7dGhpcy5wcm9wcy5nZXRQb2xpdGljaWFufSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2ZpbGVCb3g7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBWb3RlUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy52b3RlLnZvdGUgPT0gJ1knKSB7XG4gICAgICB2YXIgdm90ZUNsYXNzID0gJ3llcyAnO1xuICAgICAgdmFyIHZvdGVUZXh0ID0gJ3llcyc7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMucHJvcHMudm90ZS52b3RlID09ICdOJykge1xuICAgICAgdmFyIHZvdGVDbGFzcyA9ICdubyAnO1xuICAgICAgdmFyIHZvdGVUZXh0ID0gJ25vJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgdm90ZUNsYXNzID0gJyc7XG4gICAgICB2YXIgdm90ZVRleHQgPSAnbm8gdm90ZSc7XG4gICAgfVxuICAgIHZvdGVDbGFzcyArPSAndm90ZSBjb2wgJztcbiAgICB2YXIgbW9iaWxlVm90ZUNsYXNzID0gdm90ZUNsYXNzICsgJ21vYmlsZS1vbmx5JztcbiAgICB2b3RlQ2xhc3MgKz0gJ2Z1bGwtbGF5b3V0J1xuXG4gICAgdmFyIGxhd1RleHQgPSB0aGlzLnByb3BzLnZvdGUubGF3ID8gJ3llcycgOiAnbm8nO1xuICAgIHZhciBsYXdDbGFzcyA9ICdjb2wgbGF3ICcgKyBsYXdUZXh0O1xuXG4gICAgaWYgKHRoaXMucHJvcHMudm90ZS5zaG9ydF90aXRsZV9lbikge1xuICAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLnZvdGUuc2hvcnRfdGl0bGVfZW47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLnZvdGUubmFtZV9lbjtcbiAgICB9XG4gICAgdmFyIHZvdGVSb3dDbGFzcyA9IFwidm90ZVJvdyByb3dcIjtcbiAgICBpZiAodGhpcy5wcm9wcy52b3RlLnZvdGVxdWVzdGlvbl9pZCA9PSB0aGlzLnByb3BzLmN1cnJlbnRWb3RlKSB7XG4gICAgICB2b3RlUm93Q2xhc3MgKz0gXCIgY3VycmVudFwiO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17dm90ZVJvd0NsYXNzfSBrZXk9e3RoaXMucHJvcHMua2V5fT5cbiAgICAgICAgPGRpdiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2suYmluZChudWxsLCB0aGlzKX0gY2xhc3NOYW1lPVwibWFpbiByb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgbGVmdFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNlc3Npb25cIj48c3BhbiBjbGFzc05hbWU9XCJsYWJlbCBtb2JpbGUtb25seVwiPlNlc3Npb248L3NwYW4+e3RoaXMucHJvcHMudm90ZS5zZXNzaW9uX2lkfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIG51bWJlclwiPjxzcGFuIGNsYXNzTmFtZT1cImxhYmVsIG1vYmlsZS1vbmx5XCI+TnVtYmVyPC9zcGFuPnt0aGlzLnByb3BzLnZvdGUubnVtYmVyfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt2b3RlQ2xhc3N9PjxzcGFuIGNsYXNzTmFtZT1cInZvdGVUZXh0XCI+e3ZvdGVUZXh0fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzaG9ydG5hbWVcIj57bmFtZX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17bW9iaWxlVm90ZUNsYXNzfT48c3BhbiBjbGFzc05hbWU9XCJsYWJlbCBtb2JpbGUtb25seVwiPlZvdGU8L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwidm90ZVRleHRcIj57dm90ZVRleHR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtsYXdDbGFzc30+PHNwYW4gY2xhc3NOYW1lPVwibGFiZWwgbW9iaWxlLW9ubHlcIj5MYXc8L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwibGF3VGV4dFwiPntsYXdUZXh0fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBkcm9wZG93blwiPjxzcGFuPjxBcnJvd0ljb24gLz48L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIHJpZ2h0XCI+PC9kaXY+IFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFZvdGVJbmZvUm93IFxuICAgICAgICAgIHZvdGUgPSB7dGhpcy5wcm9wcy52b3RlfVxuICAgICAgICAgIGN1cnJlbnRWb3RlID0ge3RoaXMucHJvcHMuY3VycmVudFZvdGV9XG4gICAgICAgICAgdm90ZVF1ZXN0aW9uSUQgPSB7dGhpcy5wcm9wcy52b3RlLnZvdGVxdWVzdGlvbl9pZH1cbiAgICAgICAgICBiaWxsSW5mbyA9IHt0aGlzLnByb3BzLmJpbGxJbmZvfVxuICAgICAgICAgIGdldFBvbGl0aWNpYW4gPSB7dGhpcy5wcm9wcy5nZXRQb2xpdGljaWFufSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG52YXIgVm90ZUluZm9Sb3cgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGluZm9DbGFzcyA9IFwicm93IGluZm9cIjtcbiAgICB2YXIgZ2V0UG9saXRpY2lhbiA9IHRoaXMucHJvcHMuZ2V0UG9saXRpY2lhbjtcbiAgICB2YXIgc3BvbnNvckNvbXBvbmVudCA9IG51bGw7XG4gICAgaWYgKHRoaXMucHJvcHMudm90ZVF1ZXN0aW9uSUQgPT0gdGhpcy5wcm9wcy5jdXJyZW50Vm90ZSkge1xuICAgICAgaW5mb0NsYXNzICs9ICcgY3VycmVudCc7XG4gICAgICB2YXIgbGF3U3RyaW5nID0gICdMYXc6ICcgKyB0aGlzLnByb3BzLmxhd1RleHQ7XG4gICAgICB2YXIgdm90ZUluZm9ybWF0aW9uID0gPGRpdiBjbGFzc05hbWU9XCJjb2wgYmlsbEluZm9cIj57bGF3U3RyaW5nfTwvZGl2PlxuICAgICAgaWYgKHVuZGVmaW5lZCAhPSB0aGlzLnByb3BzLmJpbGxJbmZvLnZvdGVzKSB7XG4gICAgICAgIHZhciBwYXJ0eVZvdGVOb2RlcyA9IFtdO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBub2RlID0gKFxuICAgICAgICAgIDxkaXYga2V5PXswfSBjbGFzc05hbWU9XCJwYXJ0eVZvdGVIZWFkZXJcIiBrZXk9e2l9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+UGFydHk8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwieWVzXCI+WUVTPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vXCI+Tk88L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzdGFpblwiPkFCU1RBSU48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgICAgcGFydHlWb3RlTm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgeWVzQ291bnQgPSAwO1xuICAgICAgICBub0NvdW50ID0gMDtcbiAgICAgICAgYWJzdGFpbkNvdW50ID0gMDtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMucHJvcHMuYmlsbEluZm8udm90ZXMpIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgICAgdmFyIHBhcnR5TmFtZSA9IGtleTtcbiAgICAgICAgICB2YXIgeWVzID0gdGhpcy5wcm9wcy5iaWxsSW5mby52b3Rlc1trZXldWydZJ107XG4gICAgICAgICAgdmFyIG5vID0gdGhpcy5wcm9wcy5iaWxsSW5mby52b3Rlc1trZXldWydOJ107XG4gICAgICAgICAgdmFyIGFic3RhaW4gPSB0aGlzLnByb3BzLmJpbGxJbmZvLnZvdGVzW2tleV1bJ0EnXTtcbiAgICAgICAgICB2YXIgbm9DbGFzcyA9IFwibm9cIjtcbiAgICAgICAgICB2YXIgeWVzQ2xhc3MgPSBcInllc1wiO1xuICAgICAgICAgIHZhciBhYnN0YWluQ2xhc3MgPSBcImFic3RhaW5cIjtcbiAgICAgICAgICB2YXIgcGFydHlDbGFzcyA9IFwicGFydHlWb3RlXCI7XG4gICAgICAgICAgaWYgKCh5ZXMgPiBhYnN0YWluKSYmKHllcyA+IG5vKSkge1xuICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiB5ZXNcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoKG5vID4gYWJzdGFpbikgJiYgKG5vID4geWVzKSkge1xuICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiBub1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICgoYWJzdGFpbiA+IHllcykgJiYgKGFic3RhaW4gPiBubykpIHtcbiAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgYWJzdGFpblwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICgoeWVzID09IG5vKSkge1xuICAgICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIHRpZSB5blwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoeWVzPT1hYnN0YWluKSB7XG4gICAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgdGllIHlhXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChubz09YWJzdGFpbikge1xuICAgICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIHRpZSBuYVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgdGllXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHllc0NvdW50ICs9IHllcztcbiAgICAgICAgICBub0NvdW50ICs9IG5vO1xuICAgICAgICAgIGFic3RhaW5Db3VudCArPSBhYnN0YWluO1xuICAgICAgICAgIHZhciBub2RlID0gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3BhcnR5Q2xhc3N9IGtleT17aX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPntwYXJ0eU5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt5ZXNDbGFzc30+PHNwYW4+e3llc308L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtub0NsYXNzfT48c3Bhbj57bm99PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YWJzdGFpbkNsYXNzfT48c3Bhbj57YWJzdGFpbn08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICAgIHBhcnR5Vm90ZU5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvdGFsQ2xhc3MgPSBcInBhcnR5Vm90ZSB0b3RhbCBcIjtcbiAgICAgICAgaWYgKHllc0NvdW50ID4gbm9Db3VudCkge1xuICAgICAgICAgIGlmICh5ZXNDb3VudCA+IGFic3RhaW5Db3VudCkge1xuICAgICAgICAgICAgdG90YWxDbGFzcyArPSBcIiB5ZXNcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b3RhbENsYXNzICs9IFwiIGFic3RhaW5cIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKG5vQ291bnQgPiBhYnN0YWluQ291bnQpIHtcbiAgICAgICAgICAgIHRvdGFsQ2xhc3MgKz0gXCIgbm9cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b3RhbENsYXNzICs9IFwiIGFic3RhaW5cIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvdGFsUm93ID0gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydHlWb3RlIHRvdGFsXCIga2V5PVwidFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+VG90YWw8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwieWVzXCI+PHNwYW4+e3llc0NvdW50fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9cIj48c3Bhbj57bm9Db3VudH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic3RhaW5cIj48c3Bhbj57YWJzdGFpbkNvdW50fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgICAgcGFydHlWb3RlTm9kZXMucHVzaCh0b3RhbFJvdyk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmJpbGxJbmZvLnNwb25zb3IpIHtcbiAgICAgICAgICB2YXIgc3BvbnNvclByb2ZpbGUgPSBnZXRQb2xpdGljaWFuKHVuZGVmaW5lZCwgdGhpcy5wcm9wcy5iaWxsSW5mby5zcG9uc29yKTtcbiAgICAgICAgICB2YXIgaW1nVVJMID0gXCJ1cmwoJy9zdGF0aWMvaGVhZHNob3RzL1wiICsgc3BvbnNvclByb2ZpbGUuaW1ndXJsICsgXCInKVwiO1xuICAgICAgICAgIHZhciBzcG9uc29yQ2xhc3NTdHJpbmcgPSAnc3BvbnNvclByb2ZpbGUgJztcbiAgICAgICAgICB2YXIgaHJlZiA9ICcvIy9wcm9maWxlLycgKyBzcG9uc29yUHJvZmlsZS5pZDtcbiAgICAgICAgICBpZiAoIXNwb25zb3JQcm9maWxlLnBhcnR5X3NsdWcpIHtcbiAgICAgICAgICAgIHZhciBwYXJ0eU5hbWUgPSBzcG9uc29yUHJvZmlsZS5wYXJ0eV9uYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNwb25zb3JDbGFzc1N0cmluZyArPSBzcG9uc29yUHJvZmlsZS5wYXJ0eV9zbHVnO1xuICAgICAgICAgICAgdmFyIHBhcnR5TmFtZSA9IHNwb25zb3JQcm9maWxlLnBhcnR5X3NsdWc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNwb25zb3JDb21wb25lbnQgPSAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcG9uc29yXCI+XG4gICAgICAgICAgICAgIDxoND5CaWxsIFNwb25zb3I8L2g0PlxuICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e3Nwb25zb3JDbGFzc1N0cmluZ30gaHJlZj17aHJlZn0gPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tiYWNrZ3JvdW5kSW1hZ2U6IGltZ1VSTH19PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxoMz57c3BvbnNvclByb2ZpbGUubmFtZX08L2gzPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJpZGluZ1wiPntzcG9uc29yUHJvZmlsZS5yaWRpbmd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBhcnR5XCI+e3BhcnR5TmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BvbnNvckNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgcGFydHlWb3RlTm9kZXMgPSAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgcGFydHlWb3RlTm9kZXMgPSAnJztcbiAgICB9XG4gICAgdmFyIG9wZW5wYXJsaWFtZW50VVJMID0gXCIvL29wZW5wYXJsaWFtZW50LmNhL2JpbGxzL1wiICsgdGhpcy5wcm9wcy52b3RlLnNlc3Npb25faWQgKyBcIi9cIiArIHRoaXMucHJvcHMudm90ZS5udW1iZXIgKyBcIi9cIjtcbiAgICBzZXNzaW9uTnVtYmVycyA9IHRoaXMucHJvcHMudm90ZS5zZXNzaW9uX2lkLnNwbGl0KFwiLVwiKTtcbiAgICB2YXIgcGFybFVSTCA9IFwiaHR0cDovL3d3dy5wYXJsLmdjLmNhL0xFR0lTSW5mby9MQUFHLmFzcHg/bGFuZ3VhZ2U9RSZQYXJsPVwiICsgc2Vzc2lvbk51bWJlcnNbMF0gKyBcIiZTZXM9XCIgKyBzZXNzaW9uTnVtYmVyc1sxXTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2luZm9DbGFzc30+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIGxlZnRcIj48L2Rpdj5cbiAgICAgICAgICB7c3BvbnNvckNvbXBvbmVudH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBwYXJ0eVZvdGVzXCI+XG4gICAgICAgICAgICA8aDQ+UGFydHkgVm90ZXM8L2g0PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0eVZvdGVzVGFibGVcIj5cbiAgICAgICAgICAgICAge3BhcnR5Vm90ZU5vZGVzfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbW9yZUJpbGxJbmZvXCI+XG4gICAgICAgICAgPGg0Pk1vcmUgSW5mb3JtYXRpb248L2g0PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8YSBocmVmPXtvcGVucGFybGlhbWVudFVSTH0gdGFyZ2V0PVwiX2JsYW5rXCI+dmlldyBiaWxsIG9uIG9wZW5wYXJsaWFtZW50LmNhIDxBcnJvd0ljb24gLz48L2E+XG4gICAgICAgICAgICA8YSBocmVmPXtwYXJsVVJMfSB0YXJnZXQ9XCJfYmxhbmtcIj52aWV3IHNlc3Npb24gb24gcGFybC5nYy5jYSA8QXJyb3dJY29uIC8+PC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciByaWdodFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG52YXIgQXJyb3dJY29uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c3ZnIHZlcnNpb249XCIxLjFcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG4gICAgICAgICB2aWV3Qm94PVwiMCAwIDQwMCA0MDBcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xNjMuNSwzMzQuNWwtNDcuMS00Ny4xbDg3LjUtODcuNWwtODcuNS04Ny41bDQ3LjEtNDcuMUwyOTgsMjAwTDE2My41LDMzNC41elwiLz5cbiAgICAgIDwvc3ZnPlxuICAgICk7XG4gIH1cbn0pO1xudmFyIEJpbGxTZWFyY2ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2Vzc2lvbiA9PSAnJykge1xuICAgICAgdmFyIHNlbGVjdFRleHQgPSAnYW55IHNlc3Npb24nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBzZWxlY3RUZXh0ID0gdGhpcy5wcm9wcy5zZXNzaW9uO1xuICAgIH1cbiAgICB2YXIgc2Vzc2lvbnNWb3RlcyA9IHRoaXMucHJvcHMuc2Vzc2lvbnNWb3RlcztcbiAgICB2YXIgdG9nZ2xlQ2xhc3MgPSAnc2Vzc2lvblNlbGVjdCcgKyAodGhpcy5wcm9wcy5zZXNzaW9uVG9nZ2xlID8gJycgOiAnIGNvbGxhcHNlZCcpO1xuICAgIHZhciBvYmplY3ROb2RlcyA9IHRoaXMucHJvcHMuc2Vzc2lvbnNMaXN0Lm1hcChmdW5jdGlvbiAob2JqZWN0LCBpKSB7XG4gICAgICAgIHZhciBzdW0gPSBzZXNzaW9uc1ZvdGVzW29iamVjdC5pZF07XG4gICAgICAgIGlmIChzdW0pIHtcbiAgICAgICAgICB2YXIgc3RyaW5nID0gb2JqZWN0LmlkICsgJyAtICgnICsgc3VtICsgJyknO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy5wcm9wcy5vblNlc3Npb25TZWxlY3QuYmluZChudWxsLG9iamVjdCl9IGtleT17aX0+PHNwYW4gY2xhc3NOYW1lPVwic2Vzc2lvblwiPntvYmplY3QuaWR9PC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJzdW1cIj57c3VtfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJpbGxTZWFyY2hcIj5cbiAgICAgICAgPGZvcm0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBiaWxscyBieSBuYW1lIG9yIG51bWJlci4uLlwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQmlsbFNlYXJjaENoYW5nZX0gLz4gIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0b2dnbGVDbGFzc30+ICAgIFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNlbGVjdFwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0VG9nZ2xlfT57c2VsZWN0VGV4dH08L3NwYW4+ICBcbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwic2Vzc2lvbk9wdGlvblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0LmJpbmQobnVsbCwnJyl9PjxzcGFuIGNsYXNzTmFtZT1cInNlc3Npb25cIj5hbnkgc2Vzc2lvbjwvc3Bhbj4gPHNwYW4gY2xhc3NOYW1lPVwic3VtXCI+e3Nlc3Npb25zVm90ZXNbJ3N1bSddfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICAge29iamVjdE5vZGVzfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVm90ZVJvdzsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFNlYXJjaFN0YWNrID0gcmVxdWlyZSgnLi9TZWFyY2hTdGFjay5qcycpO1xuU2VhcmNoQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjbGFzc2VzID0gJ3NlYXJjaEJveCAnICsgdGhpcy5wcm9wcy5ib3g7ICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfSBvblNjcm9sbD17dGhpcy5wcm9wcy5vblNlYXJjaFNjcm9sbC5iaW5kKG51bGwsIHRoaXMpfSA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BMaW5rc1wiPjxhIGhyZWY9XCIvIy9pbmZvXCIgY2xhc3NOYW1lPVwiaW5mb1wiPjwvYT48YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3NoYXlxbi9wYXJsZVwiIGNsYXNzTmFtZT1cImdpdGh1YlwiPjwvYT48L2Rpdj5cbiAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2guLi5cIiBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblNlYXJjaENoYW5nZX0gLz5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNlYXJjaDwvYnV0dG9uPlxuICAgICAgICAgICAgPHNwYW4+YnkgbmFtZSwgcmlkaW5nLCBvciBwb3N0YWwgY29kZTwvc3Bhbj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hDb250ZW50XCI+XG4gICAgICAgICAgICA8U2VhcmNoU3RhY2sgXG4gICAgICAgICAgICAgIGJveD17dGhpcy5wcm9wcy5ib3h9IFxuICAgICAgICAgICAgICBwb2xpdGljaWFucz17dGhpcy5wcm9wcy5wb2xpdGljaWFuc30gXG4gICAgICAgICAgICAgIHByb2ZpbGU9e3RoaXMucHJvcHMucHJvZmlsZX1cbiAgICAgICAgICAgICAgc2VhcmNoaW5nPXt0aGlzLnByb3BzLnNlYXJjaGluZ30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG52YXIgU2VhcmNoU3RhY2sgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgY2xhc3NTdHJpbmcgPSBcInNlYXJjaFN0YWNrXCI7XG4gICAgdmFyIGN1cnJlbnRQcm9maWxlSUQgPSB0aGlzLnByb3BzLnByb2ZpbGUuaWQ7XG4gICAgdmFyIHBvbGl0aWNpYW5Ob2RlcyA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzLnBvbGl0aWNpYW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIHBvbGl0aWNpYW5Ob2RlcyA9IHRoaXMucHJvcHMucG9saXRpY2lhbnMubWFwKGZ1bmN0aW9uIChvYmplY3QsIGkpIHtcbiAgICAgICAgdmFyIGltZ1VSTCA9IFwidXJsKCcvc3RhdGljL2hlYWRzaG90cy9cIiArIG9iamVjdC5pbWd1cmwgKyBcIicpXCI7XG4gICAgICAgIHZhciBjbGFzc1N0cmluZyA9ICcnO1xuICAgICAgICBpZiAob2JqZWN0LmlkID09IGN1cnJlbnRQcm9maWxlSUQpIHtcbiAgICAgICAgICBjbGFzc1N0cmluZyArPSAnYWN0aXZlICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChvYmplY3QuaWQgPT0gY3VycmVudFByb2ZpbGVJRCkmJih0aGlzLnByb3BzLmJveCA9PSAncHJvZmlsZScpKSB7XG4gICAgICAgICAgdmFyIGhyZWYgPSAnLyMvJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB2YXIgaHJlZiA9ICcvIy9wcm9maWxlLycgKyBvYmplY3QuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iamVjdC5hY3RpdmUpIHtcbiAgICAgICAgICBjbGFzc1N0cmluZyArPSAnY3VycmVudCAnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb2JqZWN0LnBhcnR5X3NsdWcpIHtcbiAgICAgICAgICB2YXIgcGFydHlOYW1lID0gb2JqZWN0LnBhcnR5X25hbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY2xhc3NTdHJpbmcgKz0gb2JqZWN0LnBhcnR5X3NsdWc7XG4gICAgICAgICAgdmFyIHBhcnR5TmFtZSA9IG9iamVjdC5wYXJ0eV9zbHVnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmplY3QubmFtZS5sZW5ndGg+MTkpIHtcbiAgICAgICAgICBpZiAob2JqZWN0Lm5hbWUubGVuZ3RoID4gMjIpIHtcbiAgICAgICAgICAgIGNsYXNzU3RyaW5nICs9ICcgcmVkdWNlLWxhcmdlJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNsYXNzU3RyaW5nICs9ICcgcmVkdWNlLW1lZGl1bSc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGEgY2xhc3NOYW1lPXtjbGFzc1N0cmluZ30gaHJlZj17aHJlZn0ga2V5PXtpfSA+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7YmFja2dyb3VuZEltYWdlOiBpbWdVUkx9fT48L2Rpdj5cbiAgICAgICAgICAgIDxoMz57b2JqZWN0Lm5hbWV9PC9oMz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBhcnR5XCI+e3BhcnR5TmFtZX08L3NwYW4+XG4gICAgICAgICAgPC9hPlxuICAgICAgICApO1xuICAgICAgfS5iaW5kKHRoaXMpKTsgIFxuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnByb3BzLnNlYXJjaGluZykge1xuICAgICAgdmFyIG5vUmVzdWx0c05vZGUgPSA8YT48aDM+Tk8gUkVTVUxUUzwvaDM+PC9hPjtcbiAgICAgIHBvbGl0aWNpYW5Ob2Rlcy5wdXNoKG5vUmVzdWx0c05vZGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBwbGFjZUhvbGRlck5hbWVzID0gWydKb2huIEEuIE1jVGVtcCcsICdKb2huIEZha2VuYmFrZXInLCAnUGllcnJlIFRlbXBkZWF1J107XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgMTE7IGkrKykge1xuICAgICAgICB2YXIgZW1wdHlOb2RlID0gPGEga2V5PXtpfSBjbGFzc05hbWU9XCJwbGFjZWhvbGRlclwiIGhyZWY9XCIvIy9cIj48ZGl2PjwvZGl2PjxoMz57cGxhY2VIb2xkZXJOYW1lc1tpJTNdfTwvaDM+PHNwYW4gY2xhc3NOYW1lPVwicGFydHlcIj5WQU48L3NwYW4+PC9hPjtcbiAgICAgICAgcG9saXRpY2lhbk5vZGVzLnB1c2goZW1wdHlOb2RlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc1N0cmluZ30+XG4gICAgICAgIDxoMj5NZW1iZXJzIG9mIFBhcmxpYW1lbnQ8c3BhbiBjbGFzc05hbWU9XCJsZWFmXCI+PC9zcGFuPjwvaDI+XG4gICAgICAgIHtwb2xpdGljaWFuTm9kZXN9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gU2VhcmNoQm94OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgU2VhcmNoU3RhY2sgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiU2VhcmNoU3RhY2tcIixcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICBjbGFzc1N0cmluZyA9IFwic2VhcmNoU3RhY2tcIjtcbiAgICB2YXIgY3VycmVudFByb2ZpbGVJRCA9IHRoaXMucHJvcHMucHJvZmlsZS5pZDtcbiAgICB2YXIgcG9saXRpY2lhbk5vZGVzID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMucG9saXRpY2lhbnMubGVuZ3RoID4gMCkge1xuICAgICAgcG9saXRpY2lhbk5vZGVzID0gdGhpcy5wcm9wcy5wb2xpdGljaWFucy5tYXAoZnVuY3Rpb24gKG9iamVjdCwgaSkge1xuICAgICAgICB2YXIgaW1nVVJMID0gXCJ1cmwoJy9zdGF0aWMvaGVhZHNob3RzL1wiICsgb2JqZWN0LmltZ3VybCArIFwiJylcIjtcbiAgICAgICAgdmFyIGNsYXNzU3RyaW5nID0gJyc7XG4gICAgICAgIGlmIChvYmplY3QuaWQgPT0gY3VycmVudFByb2ZpbGVJRCkge1xuICAgICAgICAgIGNsYXNzU3RyaW5nICs9ICdhY3RpdmUgJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG9iamVjdC5pZCA9PSBjdXJyZW50UHJvZmlsZUlEKSYmKHRoaXMucHJvcHMuYm94ID09ICdwcm9maWxlJykpIHtcbiAgICAgICAgICB2YXIgaHJlZiA9ICcvIy8nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhciBocmVmID0gJy8jL3Byb2ZpbGUvJyArIG9iamVjdC5pZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqZWN0LmFjdGl2ZSkge1xuICAgICAgICAgIGNsYXNzU3RyaW5nICs9ICdjdXJyZW50ICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvYmplY3QucGFydHlfc2x1Zykge1xuICAgICAgICAgIHZhciBwYXJ0eU5hbWUgPSBvYmplY3QucGFydHlfbmFtZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjbGFzc1N0cmluZyArPSBvYmplY3QucGFydHlfc2x1ZztcbiAgICAgICAgICB2YXIgcGFydHlOYW1lID0gb2JqZWN0LnBhcnR5X3NsdWc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iamVjdC5uYW1lLmxlbmd0aD4xOSkge1xuICAgICAgICAgIGlmIChvYmplY3QubmFtZS5sZW5ndGggPiAyMikge1xuICAgICAgICAgICAgY2xhc3NTdHJpbmcgKz0gJyByZWR1Y2UtbGFyZ2UnXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2xhc3NTdHJpbmcgKz0gJyByZWR1Y2UtbWVkaXVtJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7Y2xhc3NOYW1lOiBjbGFzc1N0cmluZywgaHJlZjogaHJlZiwga2V5OiBpfSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZToge2JhY2tncm91bmRJbWFnZTogaW1nVVJMfX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBudWxsLCBvYmplY3QubmFtZSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJwYXJ0eVwifSwgcGFydHlOYW1lKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7ICBcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5wcm9wcy5zZWFyY2hpbmcpIHtcbiAgICAgIHZhciBub1Jlc3VsdHNOb2RlID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgzXCIsIG51bGwsIFwiTk8gUkVTVUxUU1wiKSk7XG4gICAgICBwb2xpdGljaWFuTm9kZXMucHVzaChub1Jlc3VsdHNOb2RlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgcGxhY2VIb2xkZXJOYW1lcyA9IFsnSm9obiBBLiBNY1RlbXAnLCAnSm9obiBGYWtlbmJha2VyJywgJ1BpZXJyZSBUZW1wZGVhdSddO1xuICAgICAgZm9yIChpID0gMDsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgdmFyIGVtcHR5Tm9kZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtrZXk6IGksIGNsYXNzTmFtZTogXCJwbGFjZWhvbGRlclwiLCBocmVmOiBcIi8jL1wifSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgzXCIsIG51bGwsIHBsYWNlSG9sZGVyTmFtZXNbaSUzXSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtjbGFzc05hbWU6IFwicGFydHlcIn0sIFwiVkFOXCIpKTtcbiAgICAgICAgcG9saXRpY2lhbk5vZGVzLnB1c2goZW1wdHlOb2RlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogY2xhc3NTdHJpbmd9LCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImgyXCIsIG51bGwsIFwiTWVtYmVycyBvZiBQYXJsaWFtZW50XCIsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtjbGFzc05hbWU6IFwibGVhZlwifSkpLCBcbiAgICAgICAgcG9saXRpY2lhbk5vZGVzXG4gICAgICApXG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VhcmNoU3RhY2s7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBCaWxsVGV4dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcHJlcFRleHQ6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB0ZXh0ID0gdGV4dC50cmltKCk7XG4gICAgcmV0dXJuICh0ZXh0Lmxlbmd0aD4wPyc8cD4nK3RleHQucmVwbGFjZSgvW1xcclxcbl0rLywnPC9wPjxwPicpKyc8L3A+JzpudWxsKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJpbGxUZXh0ID0gdGhpcy5wcmVwVGV4dCh0aGlzLnByb3BzLmJpbGxUZXh0KTtcbiAgICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYmlsbFRleHRcIj5cbiAgICAgIHtiaWxsVGV4dH1cbiAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCaWxsVGV4dDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEJpbGxUZXh0ID0gcmVxdWlyZSgnLi9CaWxsVGV4dC5qcycpO1xudmFyIFRleHRCb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNsYXNzZXMgPSAnYmlsbFRleHRCb3ggJyArIHRoaXMucHJvcHMuYm94O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30+PGRpdiBjbGFzc05hbWU9XCJjbG9zZUNvbnRhaW5lclwiPjxhIGhyZWY9XCIvIy9cIj48L2E+PC9kaXY+PEJpbGxUZXh0IGJpbGxUZXh0PXt0aGlzLnByb3BzLmJpbGxUZXh0fSAvPjwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRCb3g7IiwidmFyIEFycm93SWNvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuICAgICAgICAgdmlld0JveD1cIjAgMCA0MDAgNDAwXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTYzLjUsMzM0LjVsLTQ3LjEtNDcuMWw4Ny41LTg3LjVsLTg3LjUtODcuNWw0Ny4xLTQ3LjFMMjk4LDIwMEwxNjMuNSwzMzQuNXpcIi8+XG4gICAgICA8L3N2Zz5cbiAgICApO1xuICB9XG59KTsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxuaWYgKHR5cGVvZiBnYSAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gZmFpbCBncmFjZWZ1bGx5XG4gIHRyYWNrZXIgPSBnYS5jcmVhdGUoJ1VBLTY3ODA0NDUxLTEnLCAndm90ZXMubXAnKTtcbn1cbmZ1bmN0aW9uIGdhVHJhY2socGF0aCwgdGl0bGUpIHtcbiAgaWYgKHR5cGVvZiBnYSAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gZmFpbCBncmFjZWZ1bGx5XG4gICAgaWYgKHBhdGg9PVwiXCIpIHtcbiAgICAgIHBhdGggPSBcIi9cIjtcbiAgICB9XG4gICAgZ2EoJ3NldCcsIHsgcGFnZTogcGF0aCwgdGl0bGU6IHRpdGxlIH0pO1xuICAgIGdhKCdzZW5kJywgJ3BhZ2V2aWV3Jyk7XG4gIH1cbn1cblxuLy8gRWxlbWVudHNcbnZhciBBcnJvd0ljb24gPSByZXF1aXJlKCcuL2VsZW1lbnRzL0Fycm93SWNvbi5qcycpO1xuXG4vLyBCb3hlc1xudmFyIFNlYXJjaEJveCA9IHJlcXVpcmUoJy4vYm94ZXMvc2VhcmNoL1NlYXJjaEJveC5qcycpO1xudmFyIFByb2ZpbGVCb3ggPSByZXF1aXJlKCcuL2JveGVzL3Byb2ZpbGUvUHJvZmlsZUJveC5qcycpO1xudmFyIEluZm9Cb3ggPSByZXF1aXJlKCcuL2JveGVzL2luZm8vSW5mb0JveC5qcycpO1xudmFyIFRleHRCb3ggPSByZXF1aXJlKCcuL2JveGVzL3RleHQvVGV4dEJveC5qcycpO1xuXG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJveDogJ3NlYXJjaCcsXG4gICAgICBwb2xpdGljaWFuczogW10sXG4gICAgICBpZDogJycsXG4gICAgICBwb2xpdGljaWFuOiB7fSxcbiAgICAgIHByb2ZpbGU6ICcnLFxuICAgICAgY3VycmVudFZvdGU6IDAsXG4gICAgICBzZWFyY2hpbmc6IGZhbHNlLFxuICAgICAgcmV0cmlldmluZ1ZvdGVzOiB0cnVlLFxuICAgICAgdm90ZXM6IFtdLFxuICAgICAgYmlsbEluZm86IFtdLFxuICAgICAgYmlsbFRleHQ6IFwiXCIsXG4gICAgICBzZXNzaW9uc0xpc3Q6IFtdLFxuICAgICAgc2Vzc2lvbjogJycsXG4gICAgICBzZXNzaW9uVG9nZ2xlOiBmYWxzZSxcbiAgICAgIG1heDogMTAsXG4gICAgICByaWRpbmc6IFwiXCIsXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMuZ2V0QXBwU3RhdGVGcm9tVVJMKHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICB2YXIgaW5pdGlhbGl6ZVVSTCA9ICcvaW5pdGlhbGl6ZSc7XG4gICAgdGhpcy5mZXRjaEpTT04oaW5pdGlhbGl6ZVVSTCwgJ3BvbGl0aWNpYW5zJyk7XG4gICAgdmFyIHNlc3Npb25zVVJMID0gJy9zZXNzaW9ucyc7XG4gICAgdGhpcy5mZXRjaEpTT04oc2Vzc2lvbnNVUkwsICdzZXNzaW9ucycpO1xuICAgIHRoaXMuZ2V0QXBwU3RhdGVGcm9tVVJMKHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKSk7XG4gIH0sXG4gIGNoYW5nZVBvbGl0aWNpYW46IGZ1bmN0aW9uKHBvbGl0aWNpYW4pIHtcbiAgICBpZiAocG9saXRpY2lhbikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHBvbGl0aWNpYW46IHBvbGl0aWNpYW4sXG4gICAgICAgIHZvdGVzOiBbXSxcbiAgICAgICAgYm94OiAncHJvZmlsZScsXG4gICAgICB9KTtcbiAgICAgIHRoaXMuZ2V0UG9saXRpY2lhblZvdGVzKHBvbGl0aWNpYW4uaWQpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmlkICYmICgodGhpcy5zdGF0ZS5ib3ggPT0gJ3Byb2ZpbGUnKSB8fCAodGhpcy5zdGF0ZS5ib3ggPT0gJ2luZm8nKSApKSB7XG4gICAgICBwb2xpdGljaWFuID0gdGhpcy5nZXRQb2xpdGljaWFuKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcG9saXRpY2lhbjogcG9saXRpY2lhbixcbiAgICAgIH0pO1xuICAgICAgdGhpcy5nZXRQb2xpdGljaWFuVm90ZXMocG9saXRpY2lhbi5pZCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHBvbGl0aWNpYW46IHt9LFxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBvblNlYXJjaENoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgbWF4ID0gdGhpcy5jaGVja01heCgpO1xuICAgIHZhciBwb3N0YWxSZWdFeCA9IG5ldyBSZWdFeHAoXCJeW0FCQ0VHSEpLTE1OUFJTVFZYWWFiY2VnaGprbG1ucHJzdHZ4eV17MX1cXFxcZHsxfVtBLVphLXpdezF9ICpcXFxcZHsxfVtBLVphLXpdezF9XFxcXGR7MX0kXCIsIFwiaVwiKTtcbiAgICBpZiAocG9zdGFsUmVnRXgudGVzdChldmVudC50YXJnZXQudmFsdWUpKSB7XG4gICAgICB2YXIgc3RyID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL1xccysvZywgJycpO1xuICAgICAgc3RyID0gc3RyLnRvVXBwZXJDYXNlKCk7XG4gICAgICB2YXIgcG9zdGFsVVJMID0gJ2h0dHBzOi8vcmVwcmVzZW50Lm9wZW5ub3J0aC5jYS9wb3N0Y29kZXMvJyArIHN0ciArICcvP3NldHM9ZmVkZXJhbC1lbGVjdG9yYWwtZGlzdHJpY3RzJztcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHBvc3RhbFVSTCwgdHJ1ZSk7XG4gICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgLy8gU3VjY2VzcyFcbiAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIHZhciByaWRpbmcgPSBkYXRhW1wiYm91bmRhcmllc19jb25jb3JkYW5jZVwiXVswXVtcIm5hbWVcIl07XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmlkaW5nOiByaWRpbmd9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyBXZSByZWFjaGVkIG91ciB0YXJnZXQgc2VydmVyLCBidXQgaXQgcmV0dXJuZWQgYW4gZXJyb3JcbiAgICAgICAgICBjb25zb2xlLmxvZygnc2VydmVyIHJlYWNoZWQsIGJ1dCBpdCBkaWQgbm90IGdpdmUgZGF0YSBpbiBvblNlYXJjaENoYW5nZSBvcGVubm9ydGggcmVxdWVzdCcpO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyk7XG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29ubmVjdGlvbiBwcm9ibGVtIHdpdGggb25TZWFyY2hDaGFuZ2Ugb3Blbm5vcnRoIHJlcXVlc3QnKTtcbiAgICAgICAgLy8gVGhlcmUgd2FzIGEgY29ubmVjdGlvbiBlcnJvciBvZiBzb21lIHNvcnRcbiAgICAgIH07XG4gICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzZWFyY2hpbmc6IHRydWUsXG4gICAgICAgIHNlYXJjaFZhbHVlOiBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICAgIG1heDogbWF4XG4gICAgICB9KTtcbiAgICB9IFxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNlYXJjaGluZzogdHJ1ZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgICAgbWF4OiBtYXgsXG4gICAgICAgIHJpZGluZzogXCJcIlxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBvbkJpbGxTZWFyY2hDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBiaWxsU2VhcmNoaW5nOiB0cnVlLFxuICAgICAgYmlsbFNlYXJjaFZhbHVlOiBldmVudC50YXJnZXQudmFsdWVcbiAgICB9KTtcbiAgfSxcbiAgb25TZXNzaW9uU2VsZWN0OiBmdW5jdGlvbihvYmplY3QsIGV2ZW50KSB7XG4gICAgaWYgKG9iamVjdCAhPScnKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2Vzc2lvblRvZ2dsZTogZmFsc2UsXG4gICAgICAgIHNlc3Npb246IG9iamVjdC5pZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzZXNzaW9uVG9nZ2xlOiBmYWxzZSxcbiAgICAgICAgc2Vzc2lvbjogJycsXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIG9uU2Vzc2lvblNlbGVjdFRvZ2dsZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbihlKXtcbiAgICAgIGlmICgoZS50YXJnZXQuY2xhc3NOYW1lICE9ICdzZXNzaW9uT3B0aW9uJykgJiYgKGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NOYW1lICE9ICdzZXNzaW9uT3B0aW9uJykgJiYgKGUudGFyZ2V0LmNsYXNzTmFtZSAhPSAnc2VsZWN0JykgJiYgKGUudGFyZ2V0LmNsYXNzTmFtZSAhPSAnc2Vzc2lvblNlbGVjdCcpKSB7ICAgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHNlc3Npb25Ub2dnbGU6ICF0aGlzLnN0YXRlLnNlc3Npb25Ub2dnbGUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGxpc3RlbmVyKTtcbiAgICB9LmJpbmQodGhpcyk7XG4gICAgaWYgKCF0aGlzLnN0YXRlLnNlc3Npb25Ub2dnbGUpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2Vzc2lvblRvZ2dsZTogIXRoaXMuc3RhdGUuc2Vzc2lvblRvZ2dsZSxcbiAgICB9KTtcbiAgfSxcbiAgZ2V0QXBwU3RhdGVGcm9tVVJMOiBmdW5jdGlvbih1cmxIYXNoKSB7XG4gICAgdmFyIGJveCA9ICdzZWFyY2gnO1xuICAgIHZhciBpZCA9ICcnO1xuICAgIHZhciBwb2xpdGljaWFuID0gdGhpcy5zdGF0ZS5wb2xpdGljaWFuO1xuICAgIHZhciB1cmxQYXJhbWV0ZXJzID0gdXJsSGFzaC5zcGxpdCgnLycpLmZpbHRlcihmdW5jdGlvbihuKXsgcmV0dXJuIG4gIT0gJycgfSk7XG4gICAgICBpZiAodXJsUGFyYW1ldGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGJveCA9IHVybFBhcmFtZXRlcnNbMF07XG4gICAgICAgIHN3aXRjaCAoYm94KSB7XG4gICAgICAgICAgY2FzZSAncHJvZmlsZSc6IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2JpbGwnOiBicmVhaztcbiAgICAgICAgICBjYXNlICdpbmZvJzogYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDogYm94ID0gJ3NlYXJjaCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybFBhcmFtZXRlcnMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICBpZCA9ICFpc05hTih1cmxQYXJhbWV0ZXJzWzFdKSA/IHVybFBhcmFtZXRlcnNbMV0gOiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGJveCA9PSAnc2VhcmNoJykge1xuICAgICAgICBnYVRyYWNrKHVybEhhc2gsIFwiU2VhcmNoXCIpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoYm94ID09ICdwcm9maWxlJykge1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICB2YXIgbmFtZSA9IGlkO1xuICAgICAgICAgIGZvciAodmFyIGk9MDsgaSA8IHRoaXMuc3RhdGUucG9saXRpY2lhbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnBvbGl0aWNpYW5zW2ldLmlkID09IGlkKSB7XG4gICAgICAgICAgICAgIG5hbWUgPSB0aGlzLnN0YXRlLnBvbGl0aWNpYW5zW2ldLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciB0aXRsZSA9IFwiUHJvZmlsZS9cIiArIG5hbWU7XG4gICAgICAgICAgZ2FUcmFjayh1cmxIYXNoLCB0aXRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdmFyIHRpdGxlID0gXCJQcm9maWxlL1wiO1xuICAgICAgICAgIGdhVHJhY2sodXJsSGFzaCwgdGl0bGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChib3ggPT0gJ2luZm8nKSB7XG4gICAgICAgIGdhVHJhY2sodXJsSGFzaCwgXCJJbmZvXCIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGdhVHJhY2sodXJsSGFzaCwgXCJVbmtub3duXCIpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGJveDogYm94LFxuICAgICAgICBpZDogaWQsXG4gICAgICAgIHZvdGVzOiBbXSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jaGFuZ2VQb2xpdGljaWFuKCk7XG4gIH0sXG4gIGNoYW5nZVBhZ2VUaXRsZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmJveCA9PSAnc2VhcmNoJykge1xuICAgICAgZG9jdW1lbnQudGl0bGUgPSAndm90ZXMuTVAgLSBzZWFyY2ggQ2FuYWRpYW4gTVAgdm90aW5nIHJlY29yZHMnO1xuICAgIH1cbiAgICBlbHNlIGlmICgodGhpcy5zdGF0ZS5ib3ggPT0gJ3Byb2ZpbGUnKSAmJiAodGhpcy5zdGF0ZS5wb2xpdGljaWFuLm5hbWUpKSB7XG4gICAgICB2YXIgdGl0bGVUZXh0ID0gdGhpcy5zdGF0ZS5wb2xpdGljaWFuLm5hbWU7XG4gICAgICBkb2N1bWVudC50aXRsZSA9ICd2b3Rlcy5NUCAtICcgKyB0aXRsZVRleHQ7XG4gICAgfVxuICB9LFxuICBjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgaWYgKHByZXZTdGF0ZS5wb2xpdGljaWFuICE9IHRoaXMuc3RhdGUucG9saXRpY2lhbikge1xuICAgICAgdGhpcy5jaGFuZ2VQYWdlVGl0bGUoKTtcbiAgICB9XG4gIH0sXG4gIGdldFNlc3Npb25Wb3RlczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlc3Npb25Wb3RlcyA9IHt9O1xuICAgIHZhciBzZXNzaW9uU3VtID0gMDtcbiAgICBmb3IodmFyIGk9MDsgaTx0aGlzLnN0YXRlLnNlc3Npb25zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIHNlc3Npb25Wb3Rlc1t0aGlzLnN0YXRlLnNlc3Npb25zTGlzdFtpXS5pZF09MDtcbiAgICB9XG4gICAgZm9yKHZhciBpPTA7IGk8dGhpcy5zdGF0ZS52b3Rlcy5sZW5ndGg7IGkrKyl7XG4gICAgICBzZXNzaW9uU3VtICs9IDE7XG4gICAgICBzZXNzaW9uVm90ZXNbdGhpcy5zdGF0ZS52b3Rlc1tpXS5zZXNzaW9uX2lkXSArPSAxO1xuICAgIH1cbiAgICBzZXNzaW9uVm90ZXNbJ3N1bSddID0gc2Vzc2lvblN1bTtcbiAgICByZXR1cm4gc2Vzc2lvblZvdGVzO1xuICB9LFxuICBnZXRQb2xpdGljaWFuOiBmdW5jdGlvbihwb2xpdGljaWFucywgaWQpIHtcbiAgICBpZiAodHlwZW9mKHBvbGl0aWNpYW5zKT09PSd1bmRlZmluZWQnKSBwb2xpdGljaWFucyA9IHRoaXMuc3RhdGUucG9saXRpY2lhbnM7XG4gICAgaWYgKHR5cGVvZihpZCk9PT0ndW5kZWZpbmVkJykgaWQgPSB0aGlzLnN0YXRlLmlkO1xuICAgIGlmIChpZCkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IHBvbGl0aWNpYW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwb2xpdGljaWFuc1tpXS5pZCA9PSBpZCkge1xuICAgICAgICAgIHJldHVybiBwb2xpdGljaWFuc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGdldFBvbGl0aWNpYW5Wb3RlczogZnVuY3Rpb24oaWQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgJ3JldHJpZXZpbmdWb3RlcycgOiB0cnVlXG4gICAgfSk7XG4gICAgdmFyIHVybCA9ICcvcG9sLycgKyBpZDtcbiAgICB0aGlzLmZldGNoSlNPTih1cmwsICd2b3RlcycpO1xuICB9LFxuICBnZXRCaWxsSW5mbzogZnVuY3Rpb24ob2JqZWN0LCBldmVudCkge1xuICAgIC8vY29uc29sZS5sb2coXCJpbnZva2VkXCIpOyBcbiAgICAvL2NvbnNvbGUubG9nKG9iamVjdCk7XG4gICAgLy9jb25zb2xlLmxvZyhldmVudCk7XG4gICAgaWYgKG9iamVjdC5wcm9wcy52b3RlLnZvdGVxdWVzdGlvbl9pZCA9PSB0aGlzLnN0YXRlLmN1cnJlbnRWb3RlKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtjdXJyZW50Vm90ZTogMCxcbiAgICAgICAgICAgICAgICAgICAgYmlsbEluZm86IFtdLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHVybCA9ICcvYmlsbC8nICsgb2JqZWN0LnByb3BzLnZvdGUudm90ZXF1ZXN0aW9uX2lkO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1cnJlbnRWb3RlOiBvYmplY3QucHJvcHMudm90ZS52b3RlcXVlc3Rpb25faWQsXG4gICAgICAgIGJpbGxJbmZvOiBbXSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5mZXRjaEpTT04odXJsLCAnYmlsbF9pbmZvJyk7XG4gICAgfVxuICB9LFxuICBvblNlYXJjaFNjcm9sbDogZnVuY3Rpb24odGhpbmdvbmUsIHRoaW5ndHdvKSB7XG4gICAgdmFyIHNjcm9sbFRvcCA9IHRoaW5nb25lLmdldERPTU5vZGUoKS5zY3JvbGxUb3A7XG4gICAgdmFyIGhlaWdodCA9IHRoaW5nb25lLmdldERPTU5vZGUoKS5zY3JvbGxIZWlnaHQ7XG4gICAgdmFyIGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgaWYgKChoICsgc2Nyb2xsVG9wICsgMTAwKSA+IGhlaWdodCkge1xuICAgICAgdmFyIG51bSA9IHRoaXMuZmlsdGVyUG9saXRpY2lhbnMoKS5sZW5ndGg7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5tYXggPCBudW0pIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWF4IDogdGhpcy5zdGF0ZS5tYXggKyAxMFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNoZWNrTWF4OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3TWF4ID0gdGhpcy5zdGF0ZS5tYXg7XG4gICAgdmFyIG51bSA9IHRoaXMuZmlsdGVyUG9saXRpY2lhbnMoKS5sZW5ndGg7XG4gICAgaWYgKG51bSA8IHRoaXMuc3RhdGUubWF4KSB7XG4gICAgICBuZXdNYXggPSBudW07XG4gICAgICBpZiAobmV3TWF4IDwgMTApIHtcbiAgICAgICAgbmV3TWF4ID0gMTA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdNYXg7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBvbGl0aWNpYW5MaXN0ID0gdGhpcy5maWx0ZXJQb2xpdGljaWFucygpLnNsaWNlKDAsIHRoaXMuc3RhdGUubWF4KTtcbiAgICB2YXIgc2Vzc2lvblZvdGVzID0gdGhpcy5nZXRTZXNzaW9uVm90ZXMoKTtcbiAgICB2YXIgdm90ZUxpc3QgPSB0aGlzLmZpbHRlclZvdGVzKCk7XG4gICAgdmFyIGFwcENsYXNzID0gJ2JveCAnICsgdGhpcy5zdGF0ZS5ib3g7XG4gICAgdmFyIHBvbGl0aWNpYW4gPSB0aGlzLnN0YXRlLnBvbGl0aWNpYW47XG4gICAgdmFyIGNvbnRhaW5lcmNsYXNzZXMgPSAnc2VhcmNoQm94LW5vc2Nyb2xsICcgKyB0aGlzLnN0YXRlLmJveDtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YXBwQ2xhc3N9PlxuICAgICAgICA8SW5mb0JveCBib3g9e3RoaXMuc3RhdGUuYm94fSAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjb250YWluZXJjbGFzc2VzfT5cbiAgICAgICAgICA8U2VhcmNoQm94IFxuICAgICAgICAgICAgYm94PXt0aGlzLnN0YXRlLmJveH1cbiAgICAgICAgICAgIHNlYXJjaGluZz17dGhpcy5zdGF0ZS5zZWFyY2hpbmd9XG4gICAgICAgICAgICBwb2xpdGljaWFucz17cG9saXRpY2lhbkxpc3R9IFxuICAgICAgICAgICAgb25TZWFyY2hDaGFuZ2U9e3RoaXMub25TZWFyY2hDaGFuZ2V9IFxuICAgICAgICAgICAgcHJvZmlsZT17cG9saXRpY2lhbn1cbiAgICAgICAgICAgIG9uU2VhcmNoU2Nyb2xsID0ge3RoaXMub25TZWFyY2hTY3JvbGx9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxQcm9maWxlQm94IFxuICAgICAgICAgIGJveD17dGhpcy5zdGF0ZS5ib3h9XG4gICAgICAgICAgcHJvZmlsZT17cG9saXRpY2lhbn1cbiAgICAgICAgICB2b3Rlcz17dm90ZUxpc3R9IFxuICAgICAgICAgIG9uQmlsbFNlYXJjaENoYW5nZT17dGhpcy5vbkJpbGxTZWFyY2hDaGFuZ2V9IFxuICAgICAgICAgIG9uU2Vzc2lvblNlbGVjdFRvZ2dsZT17dGhpcy5vblNlc3Npb25TZWxlY3RUb2dnbGV9XG4gICAgICAgICAgb25TZXNzaW9uU2VsZWN0PXt0aGlzLm9uU2Vzc2lvblNlbGVjdH1cbiAgICAgICAgICBzZXNzaW9uc0xpc3QgPSB7dGhpcy5zdGF0ZS5zZXNzaW9uc0xpc3R9XG4gICAgICAgICAgc2Vzc2lvbiA9IHt0aGlzLnN0YXRlLnNlc3Npb259XG4gICAgICAgICAgc2Vzc2lvblRvZ2dsZSA9IHt0aGlzLnN0YXRlLnNlc3Npb25Ub2dnbGV9XG4gICAgICAgICAgc2Vzc2lvbnNWb3RlcyA9IHtzZXNzaW9uVm90ZXN9XG4gICAgICAgICAgcmV0cmlldmluZ1ZvdGVzPXt0aGlzLnN0YXRlLnJldHJpZXZpbmdWb3Rlc31cbiAgICAgICAgICBnZXRCaWxsSW5mbyA9IHt0aGlzLmdldEJpbGxJbmZvfVxuICAgICAgICAgIGN1cnJlbnRWb3RlID0ge3RoaXMuc3RhdGUuY3VycmVudFZvdGV9XG4gICAgICAgICAgYmlsbEluZm8gPSB7dGhpcy5zdGF0ZS5iaWxsSW5mb31cbiAgICAgICAgICBnZXRQb2xpdGljaWFuID0ge3RoaXMuZ2V0UG9saXRpY2lhbn0gLz5cblxuICAgICAgICA8VGV4dEJveCBib3g9e3RoaXMuc3RhdGUuYm94fSBiaWxsVGV4dD17dGhpcy5zdGF0ZS5iaWxsVGV4dH0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIGZldGNoSlNPTjogZnVuY3Rpb24ocGF0aCwgdHlwZSkge1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgcmVxdWVzdC5vcGVuKCdHRVQnLCBwYXRoLCB0cnVlKTtcbiAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAvLyBTdWNjZXNzIVxuICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgICBpZiAodHlwZSA9PSAncG9saXRpY2lhbnMnKSB7XG4gICAgICAgICAgdmFyIHBvbGl0aWNpYW4gPSB0aGlzLmdldFBvbGl0aWNpYW4oZGF0YVsncmVzdWx0cyddKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtwb2xpdGljaWFuczogZGF0YVsncmVzdWx0cyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9saXRpY2lhbjogcG9saXRpY2lhbiwgfSk7XG4gICAgICAgICAgaWYgKHBvbGl0aWNpYW4uaWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UG9saXRpY2lhblZvdGVzKHBvbGl0aWNpYW4uaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICd2b3RlcycpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2b3RlczogZGF0YVsncmVzdWx0cyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXRyaWV2aW5nVm90ZXM6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICdzZXNzaW9ucycpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZXNzaW9uc0xpc3Q6IGRhdGFbJ3Jlc3VsdHMnXX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ2JpbGxfaW5mbycpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtiaWxsSW5mbzogZGF0YX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ2JpbGxfdGV4dCcpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtiaWxsVGV4dDogZGF0YVsncmVzdWx0cyddWzBdfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3R5cGUgbm90IHBvbGl0aWNpYW4gb3Igdm90ZXMnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV2UgcmVhY2hlZCBvdXIgdGFyZ2V0IHNlcnZlciwgYnV0IGl0IHJldHVybmVkIGFuIGVycm9yXG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXJ2ZXIgcmVhY2hlZCwgYnV0IGl0IGRpZCBub3QgZ2l2ZSBkYXRhIGluIGZldGNoSlNPTicpO1xuICAgICAgfVxuICAgIH0uYmluZCh0aGlzKTtcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Nvbm5lY3Rpb24gcHJvYmxlbSB3aXRoIGZldGNoSlNPTicpO1xuICAgICAgLy8gVGhlcmUgd2FzIGEgY29ubmVjdGlvbiBlcnJvciBvZiBzb21lIHNvcnRcbiAgICB9O1xuICAgIHJlcXVlc3Quc2VuZCgpO1xuICB9LFxuICBmaWx0ZXJWb3RlczogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuYmlsbFNlYXJjaGluZyAmJiB0aGlzLnN0YXRlLmJpbGxTZWFyY2hWYWx1ZSkge1xuICAgICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLnN0YXRlLmJpbGxTZWFyY2hWYWx1ZSwgXCJpXCIpO1xuICAgICAgdmFyIHZvdGVzID0gdGhpcy5zdGF0ZS52b3Rlcy5maWx0ZXIoZnVuY3Rpb24gKHZvdGUpIHtcbiAgICAgICAgcmV0dXJuIHZvdGUubmFtZV9lbi5zZWFyY2gocmVnZXgpID4gLTEgfHwgdm90ZS5udW1iZXIuc2VhcmNoKHJlZ2V4KSA+IC0xIHx8IHZvdGUuc2hvcnRfdGl0bGVfZW4uc2VhcmNoKHJlZ2V4KSA+IC0xO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHZvdGVzID0gdGhpcy5zdGF0ZS52b3RlcztcbiAgICB9XG4gICAgaWYgKHRoaXMuc3RhdGUuc2Vzc2lvbikge1xuICAgICAgdmFyIHNlc3Npb25SZWdleCA9IG5ldyBSZWdFeHAodGhpcy5zdGF0ZS5zZXNzaW9uLCBcImlcIik7XG4gICAgICB2YXIgZmlsdGVyZWRWb3RlcyA9IHZvdGVzLmZpbHRlcihmdW5jdGlvbiAodm90ZSkge1xuICAgICAgICByZXR1cm4gdm90ZS5zZXNzaW9uX2lkLnNlYXJjaChzZXNzaW9uUmVnZXgpID4gLTE7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgZmlsdGVyZWRWb3RlcyA9IHZvdGVzO1xuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyZWRWb3RlcztcbiAgfSxcbiAgZmlsdGVyUG9saXRpY2lhbnM6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnNlYXJjaGluZyAmJiB0aGlzLnN0YXRlLnNlYXJjaFZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5yaWRpbmcgIT0gXCJcIikge1xuICAgICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKHRoaXMuc3RhdGUucmlkaW5nLCBcImlcIik7XG4gICAgICAgIHZhciBmaWx0ZXJlZExpc3QgPSB0aGlzLnN0YXRlLnBvbGl0aWNpYW5zLmZpbHRlcihmdW5jdGlvbiAocG9sKSB7XG4gICAgICAgICAgcmV0dXJuIHBvbC5yaWRpbmcuc2VhcmNoKHJlZ2V4KSA+IC0xO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkTGlzdDtcbiAgICAgIH1cbiAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAodGhpcy5zdGF0ZS5zZWFyY2hWYWx1ZSwgXCJpXCIpO1xuICAgICAgdmFyIGZpbHRlcmVkTGlzdCA9IHRoaXMuc3RhdGUucG9saXRpY2lhbnMuZmlsdGVyKGZ1bmN0aW9uIChwb2wpIHtcbiAgICAgICAgcmV0dXJuIHBvbC5uYW1lLnNlYXJjaChyZWdleCkgPiAtMSB8fCBwb2wucGFydHlfbmFtZS5zZWFyY2gocmVnZXgpID4gLTEgfHwgcG9sLnBhcnR5X3NsdWcuc2VhcmNoKHJlZ2V4KSA+IC0xIHx8IHBvbC5yaWRpbmcuc2VhcmNoKHJlZ2V4KSA+IC0xICB8fCBwb2wucmlkaW5nLnNlYXJjaChyZWdleCkgPiAtMTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZpbHRlcmVkTGlzdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGF0ZS5wb2xpdGljaWFucztcbiAgICB9XG4gIH0sXG59KTtcblxuUmVhY3QucmVuZGVyKFxuICA8QXBwIC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpXG4pOyJdfQ==
