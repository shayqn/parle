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
var SessionSelector = require('./SessionSelector.js');
SearchBox = React.createClass({displayName: "SearchBox",
  render: function() {
    var classes = 'searchBox ' + this.props.box; //temp
    return (
      React.createElement("div", {className: "searchBox-noscroll search"}, 
        React.createElement("div", {className: classes, onScroll: this.props.onSearchScroll.bind(null, this)}, 
          React.createElement("div", {className: "topLinks"}, React.createElement("a", {href: "/#/info", className: "info"}), React.createElement("a", {href: "https://github.com/shayqn/parle", className: "github"})), 
          React.createElement("form", null, 
            React.createElement("input", {type: "search", placeholder: "Search...", onChange: this.props.onSearchChange}), 
            React.createElement("button", {type: "submit"}, "Search"), 
            React.createElement("span", null, "by name, riding, or postal code")
          ), 
          React.createElement("div", {className: "sessionSelectorContainer"}, 
            React.createElement(SessionSelector, {
             sessionsList: this.props.sessionsList, 
             currentSessions: this.props.sessions, 
             sessionToggle: this.props.sessionToggle})
          ), 
          React.createElement("div", {className: "searchContent"}, 
            React.createElement(SearchStack, {
              box: this.props.box, 
              politicians: this.props.politicianList, 
              profile: [null], 
              searching: this.props.search.isSearching})
          )
        )
      )
    );
  }
});
module.exports = SearchBox;

},{"./SearchStack.js":"/Users/braden/parle/src/js/boxes/search/SearchStack.js","./SessionSelector.js":"/Users/braden/parle/src/js/boxes/search/SessionSelector.js"}],"/Users/braden/parle/src/js/boxes/search/SearchStack.js":[function(require,module,exports){
/** @jsx React.DOM */

var SearchStack = React.createClass({displayName: "SearchStack",
  render: function() {
    classString = "searchStack";
    var currentProfileID = this.props.profile.id;
    var politicianNodes = [];
    if (this.props.politicians.length > 0) {
      politicianNodes = this.props.politicians.map(function (object, i) {
        var headshot = object.headshot.split('/').pop();
        var imgURL = "url('/static/headshots/" + headshot + "')";
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

},{}],"/Users/braden/parle/src/js/boxes/search/SessionButton.js":[function(require,module,exports){
/** @jsx React.DOM */

SessionButton = React.createClass({displayName: "SessionButton",
	render: function() {
		className = "sessionButton";
		var sessionNumber = this.props.sessionNumber;
		for (i=0;i<this.props.currentSessions.length;i++) {
			if (sessionNumber == this.props.currentSessions[i]) {
				className += " active";
			}
		}
		return (
			React.createElement("div", {className: className, key: this.props.key}, 
				React.createElement("a", {onClick: this.props.sessionToggle.bind(null, sessionNumber)}, sessionNumber)
			)
		);
	}
});
module.exports = SessionButton;

},{}],"/Users/braden/parle/src/js/boxes/search/SessionSelector.js":[function(require,module,exports){
/** @jsx React.DOM */

var SessionButton = require('./SessionButton.js');
SessionSelector = React.createClass({displayName: "SessionSelector",
	render: function() {
		var sessionsList = this.props.sessionsList;
		var currentSessions = this.props.currentSessions;
		var sessionButtons = [];
		var sessionToggle = this.props.sessionToggle;
		var key = 0;
		for(var sessionNumber in sessionsList) {
			var session = React.createElement(SessionButton, {sessionNumber: sessionNumber, 
							currentSessions: currentSessions, 
							sessionToggle: sessionToggle, 
							key: key})
			sessionButtons.push(session);
			key++;
		}
		return (
			React.createElement("div", {className: "sessionsSelector"}, 
				React.createElement("div", {className: "title"}, React.createElement("h2", null, "Sessions")), 
				React.createElement("div", {className: "buttons"}, sessionButtons.reverse())
			)
		);
	}
});
module.exports = SessionSelector;

},{"./SessionButton.js":"/Users/braden/parle/src/js/boxes/search/SessionButton.js"}],"/Users/braden/parle/src/js/boxes/text/BillText.js":[function(require,module,exports){
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
        sponsor: 0,
        isLoading: false,
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
        newAppState.profile.votes = {};
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
        var regex = new RegExp(this.state.app.search.riding, "i");
        var filteredList = filteredList.filter(function (pol) {
          pol.riding = this.state.app.ridingsList[pol.ridings[0]].name;
          return pol.riding.search(regex) > -1;
        }.bind(this));
      }
      var regex = new RegExp(this.state.app.search.searchValue, "i");
      var filteredList = filteredList.filter(function (pol) {
        pol.partyName = this.state.app.partiesList[pol.parties[0]].name;
        pol.partySlug = this.state.app.partiesList[pol.parties[0]].slug;
        pol.riding = this.state.app.ridingsList[pol.ridings[0]].name;
        return pol.name.search(regex) > -1 || pol.partyName.search(regex) > -1 || pol.partySlug.search(regex) > -1 || pol.riding.search(regex) > -1  || pol.riding.search(regex) > -1;
      }.bind(this));
    }
    return filteredList;
  },

  sessionToggle: function(sessionNumber) {
    console.log('toggled');
    console.log(sessionNumber);
    console.log(this.state.app.sessions.length);

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

  render: function() {
    var loading = (this.state.app.vote.isLoading) ? "loading" : "loaded";
    var filteredPoliticianList = this.filterPoliticians().slice(0, this.state.app.search.max);
    return (
      React.createElement("div", {className: "box search"}, 
        React.createElement(SearchBox, {
          box: this.state.app.box, //temp
          politicianList: filteredPoliticianList, 
          partiesList: this.state.app.partiesList, 
          ridingsList: this.state.app.ridingsList, 
          sessionsList: this.state.app.sessionsList, 
          sessions: this.state.app.sessions, 
          search: this.state.app.search, 
          onSearchScroll: this.onSearchScroll, 
          onSearchChange: this.onSearchChange, 
          sessionToggle: this.sessionToggle})
      )
    );
  },
  
});

React.render(
  React.createElement(App, null),
  document.getElementById('content')
);

},{"./boxes/info/InfoBox.js":"/Users/braden/parle/src/js/boxes/info/InfoBox.js","./boxes/profile/ProfileBox.js":"/Users/braden/parle/src/js/boxes/profile/ProfileBox.js","./boxes/search/SearchBox.js":"/Users/braden/parle/src/js/boxes/search/SearchBox.js","./boxes/text/TextBox.js":"/Users/braden/parle/src/js/boxes/text/TextBox.js","./elements/ArrowIcon.js":"/Users/braden/parle/src/js/elements/ArrowIcon.js"}]},{},["/Users/braden/parle/src/js/parle.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9Cb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9UZXh0LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU2VhcmNoLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU3RhY2suanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1Byb2ZpbGVCb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1ZvdGVSb3cuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9zZWFyY2gvU2VhcmNoQm94LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvc2VhcmNoL1NlYXJjaFN0YWNrLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvc2VhcmNoL1Nlc3Npb25CdXR0b24uanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9zZWFyY2gvU2Vzc2lvblNlbGVjdG9yLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvdGV4dC9CaWxsVGV4dC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2JveGVzL3RleHQvVGV4dEJveC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2VsZW1lbnRzL0Fycm93SWNvbi5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL3BhcmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUJBQXFCOztBQUVyQixJQUFJLFFBQVEsR0FB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LENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztDQUNuQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEluZm9UZXh0ID0gcmVxdWlyZSgnLi9JbmZvVGV4dC5qcycpO1xudmFyIEluZm9Cb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGNvbXBvbmVudFdpbGxVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgaWYgKChuZXh0UHJvcHMuYm94ID09ICdpbmZvJykgJiYgKHRoaXMucHJvcHMuYm94ICE9ICdzZWFyY2gnKSkge1xuICAgICAgdGhpcy5iYWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmJhY2sgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIGdvQmFjazogZnVuY3Rpb24oZSkge1xuICAgIGlmICh0aGlzLmJhY2spIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNsYXNzZXMgPSAnaW5mb0JveCAnICsgdGhpcy5wcm9wcy5ib3g7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT48ZGl2IGNsYXNzTmFtZT1cImNsb3NlQ29udGFpbmVyXCI+PGEgaHJlZj1cIi8jL1wiIG9uQ2xpY2s9e3RoaXMuZ29CYWNrfT48L2E+PC9kaXY+PEluZm9UZXh0IC8+PC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW5mb0JveDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEluZm9UZXh0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5mb1RleHRcIj5cbiAgICAgIDxoMj5hYm91dCB2b3Rlcy5tcDwvaDI+XG4gICAgICA8cD5EZW1vY3JhY2llcyBhcmUgZGVmaW5lZCBieSB0aGUgbGF3cyB0aGF0IHRoZXkgcGFzcywgYW5kIHRoZSBsYXdzIHRoYXQgcGFzcyBhcmUgZGV0ZXJtaW5lZCBieSB0aGUgcmVwcmVzZW50YXRpdmVzIHdlIGVsZWN0LiBJbiBvcmRlciB0byBhY2N1cmF0ZWx5IGV2YWx1YXRlIHdoZXRoZXIgb3VyIGVsZWN0ZWQgbWVtYmVycyBvZiBwYXJsaWFtZW50IGFyZSBhcHByb3ByaWF0ZWx5IHJlcHJlc2VudGluZyB0aGVpciBlbGVjdG9yYXRlLCB0aGUgbW9zdCBwZXJ0aW5lbnQgaW5mb3JtYXRpb24gd2UgaGF2ZSBpcyB0aGVpciB2b3RpbmcgaGlzdG9yeTogd2hpY2ggYmlsbHMgaGF2ZSB0aGV5IHZvdGVkIGZvciwgd2hpY2ggaGF2ZSB0aGV5IHZvdGVkIGFnYWluc3QsIGFuZCB3aGljaCBoYXZlIHRoZXkgYWJzdGFpbmVkIGZyb20gdm90aW5nIG9uLiA8L3A+XG4gICAgICA8cD5XaGlsZSB0aGlzIGluZm9ybWF0aW9uIGlzIG1hZGUgcHVibGljbHkgYXZhaWxhYmxlIHRvIGFsbCBDYW5hZGlhbnMsIHdlIG5vdGljZWQgdGhhdCBpdCBjYW4gYmUgc2xvdyBhbmQgZGlmZmljdWx0IHRvIHBhcnNlLiBFdmVyeSBiaWxsIGlzIHZvdGVkIG9uIG11bHRpcGxlIHRpbWVzIC0gc29tZXRpbWVzIHRvIHBhc3MgYW1lbmRtZW50cywgc29tZXRpbWVzIGV2ZW4ganVzdCB0byB2b3RlIG9uIHdoZXRoZXIgb3Igbm90IGl0IHdpbGwgYmUgZGlzY3Vzc2VkLiBVbmxlc3MgeW91IGFyZSBhYmxlIHRvIGRlZGljYXRlIHNpZ25pZmljYW50IHRpbWUgYW5kIGVmZm9ydCBpbnRvIGJlY29taW5nIHdlbGwtdmVyc2VkIG9uIHRoZSBkZXRhaWxzIG9mIGVhY2ggYmlsbCwgYXR0ZW1wdGluZyB0byBhbmFseXplIHRoZSB2b3RlcyBhIHBvbGl0aWNpYW4gbWFrZXMgY2FuIGJlIG1vcmUgY29uZnVzaW5nIHRoYW4gaW5mb3JtYXRpdmUuPC9wPlxuICAgICAgPHA+QXMgZW5nYWdlZCBjaXRpemVucyB3aG8gYXJlIG5vdCBjYXBhYmxlIG9mIGJlaW5nIGludGltYXRlbHkgZmFtaWxpYXIgd2l0aCB0aGUgZGV0YWlscyBhbmQgcHJvZ3Jlc3Mgb2YgZXZlcnkgYmlsbCwgd2hhdCB3ZSB3YW50ZWQgdG8ga25vdyB3YXMgdGhpczogYWZ0ZXIgYWxsIHRoZSBhbWVuZG1lbnRzIGFuZCBlZGl0cywgZGlkIHRoZSBwb2xpdGljaWFuIHZvdGUgdG8gbWFrZSB0aGUgZmluYWwgYmlsbCBhIGxhdyBvciBub3Q/IDwvcD5cbiAgICAgIDxwPlRoYXQgaXMgd2hhdCB0aGlzIHdlYnNpdGUgcHJvdmlkZXM6IGZvciBldmVyeSBtZW1iZXIgb2YgcGFybGlhbWVudCwgaXQgcmV0dXJucyBvbmx5IHRoZSB2b3RlcyB0aGF0IGNvcnJlc3BvbmQgdG8gdGhlaXIgZmluYWwgdm90ZSBvbiBhIGJpbGwgYXMgd2VsbCBhcyB3aGV0aGVyIG9yIG5vdCB0aGUgYmlsbCB3YXMgc3VjY2Vzc2Z1bGx5IHBhc3NlZCBpbnRvIGxhdy48L3A+XG4gICAgICA8cD5XZSBob3BlIHRoYXQgdGhpcyBwcm92aWRlcyBhbiBlYXN5IGFkZGl0aW9uYWwgYXZlbnVlIGZvciBldmFsdWF0aW5nIHRoZSBwZXJmb3JtYW5jZSBvZiBvdXIgZWxlY3RlZCBtZW1iZXJzIG9mIHBhcmxpYW1lbnQgYW5kIGRldGVybWluaW5nIHRoZWlyIGVmZmVjdGl2ZW5lc3MgaW4gcmVwcmVzZW50aW5nIG91ciB2aWV3cy48L3A+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJnaXRodWJMaW5rXCI+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zaGF5cW4vcGFybGVcIj52aWV3IHByb2plY3Qgb24gZ2l0aHViPC9hPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNyZWRpdFdoZXJlQ3JlZGl0c0R1ZVwiPnNwZWNpYWwgdGhhbmtzIHRvIDxhIGhyZWY9XCJodHRwczovL29wZW5wYXJsaWFtZW50LmNhXCI+b3BlbnBhcmxpYW1lbnQuY2E8L2E+IGZvciBwcm92aWRpbmcgYWxsIHRoZSBkYXRhPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gSW5mb1RleHQ7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBCaWxsU2VhcmNoID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnNlc3Npb24gPT0gJycpIHtcbiAgICAgIHZhciBzZWxlY3RUZXh0ID0gJ2FueSBzZXNzaW9uJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgc2VsZWN0VGV4dCA9IHRoaXMucHJvcHMuc2Vzc2lvbjtcbiAgICB9XG4gICAgdmFyIHNlc3Npb25zVm90ZXMgPSB0aGlzLnByb3BzLnNlc3Npb25zVm90ZXM7XG4gICAgdmFyIHRvZ2dsZUNsYXNzID0gJ3Nlc3Npb25TZWxlY3QnICsgKHRoaXMucHJvcHMuc2Vzc2lvblRvZ2dsZSA/ICcnIDogJyBjb2xsYXBzZWQnKTtcbiAgICB2YXIgb2JqZWN0Tm9kZXMgPSB0aGlzLnByb3BzLnNlc3Npb25zTGlzdC5tYXAoZnVuY3Rpb24gKG9iamVjdCwgaSkge1xuICAgICAgICB2YXIgc3VtID0gc2Vzc2lvbnNWb3Rlc1tvYmplY3QuaWRdO1xuICAgICAgICBpZiAoc3VtKSB7XG4gICAgICAgICAgdmFyIHN0cmluZyA9IG9iamVjdC5pZCArICcgLSAoJyArIHN1bSArICcpJztcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxpIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0LmJpbmQobnVsbCxvYmplY3QpfSBrZXk9e2l9PjxzcGFuIGNsYXNzTmFtZT1cInNlc3Npb25cIj57b2JqZWN0LmlkfTwvc3Bhbj4gPHNwYW4gY2xhc3NOYW1lPVwic3VtXCI+e3N1bX08L3NwYW4+PC9saT5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiaWxsU2VhcmNoXCI+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYmlsbHMgYnkgbmFtZSBvciBudW1iZXIuLi5cIiBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkJpbGxTZWFyY2hDaGFuZ2V9IC8+ICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dG9nZ2xlQ2xhc3N9PiAgICBcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzZWxlY3RcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2Vzc2lvblNlbGVjdFRvZ2dsZX0+e3NlbGVjdFRleHR9PC9zcGFuPiAgXG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInNlc3Npb25PcHRpb25cIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2Vzc2lvblNlbGVjdC5iaW5kKG51bGwsJycpfT48c3BhbiBjbGFzc05hbWU9XCJzZXNzaW9uXCI+YW55IHNlc3Npb248L3NwYW4+IDxzcGFuIGNsYXNzTmFtZT1cInN1bVwiPntzZXNzaW9uc1ZvdGVzWydzdW0nXX08L3NwYW4+PC9saT5cbiAgICAgICAgICAgIHtvYmplY3ROb2Rlc31cbiAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbGxTZWFyY2g7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBWb3RlUm93ID0gcmVxdWlyZSgnLi9Wb3RlUm93LmpzJyk7XG52YXIgQmlsbFN0YWNrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50Vm90ZSA9IHRoaXMucHJvcHMuY3VycmVudFZvdGU7XG4gICAgdmFyIGdldEJpbGxJbmZvID0gdGhpcy5wcm9wcy5nZXRCaWxsSW5mbztcbiAgICB2YXIgdm90ZVJvd3MgPSBbXTtcbiAgICB2YXIgbG9hZGVyID0gbnVsbDtcbiAgICBpZiAodGhpcy5wcm9wcy52b3Rlcy5sZW5ndGggID4gMCkge1xuICAgICAgdmFyIGdldEJpbGxUZXh0ID0gdGhpcy5wcm9wcy5nZXRCaWxsVGV4dDtcbiAgICAgIHZvdGVSb3dzID0gdGhpcy5wcm9wcy52b3Rlcy5tYXAoZnVuY3Rpb24gKG9iamVjdCwgaSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxWb3RlUm93XG4gICAgICAgICAgICBrZXkgPSB7aX1cbiAgICAgICAgICAgIHZvdGUgPSB7b2JqZWN0fVxuICAgICAgICAgICAgY3VycmVudFZvdGUgPSB7Y3VycmVudFZvdGV9XG4gICAgICAgICAgICBvbkNsaWNrID0ge2dldEJpbGxJbmZvfVxuICAgICAgICAgICAgYmlsbEluZm8gPSB7dGhpcy5wcm9wcy5iaWxsSW5mb31cbiAgICAgICAgICAgIGdldFBvbGl0aWNpYW4gPSB7dGhpcy5wcm9wcy5nZXRQb2xpdGljaWFufSAvPlxuICAgICAgICApO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5wcm9wcy5yZXRyaWV2aW5nVm90ZXMpIHtcbiAgICAgIFxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gICAgICAgIHZhciBlbXB0eVJvdyA9IChcbiAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwidm90ZVJvdyByb3cgZW1wdHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbiByb3dcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIGxlZnRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc2Vzc2lvblwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBudW1iZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgdm90ZSBmdWxsLWxheW91dFwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzaG9ydG5hbWVcIj48c3Bhbj5ubyByZXN1bHQ8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHZvdGUgbW9iaWxlLW9ubHlcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbGF3XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGRyb3Bkb3duXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciByaWdodFwiPjwvZGl2PiBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgICB2b3RlUm93cy5wdXNoKGVtcHR5Um93KTtcbiAgICAgIH1cbiAgICAgIGxvYWRlciA9IDxkaXYgY2xhc3NOYW1lPVwibG9hZGVyLWNvbnRhaW5lclwiPjxkaXYgY2xhc3NOYW1lPVwibG9hZGVyXCI+PC9kaXY+PC9kaXY+O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBub1Jlc3VsdHNSb3cgPSAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2b3RlUm93IHJvdyBub3Jlc3VsdHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbiByb3dcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+PHNwYW4+bm8gcmVzdWx0cyBmb3VuZDwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyXCI+PC9kaXY+IFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB2b3RlUm93cy5wdXNoKG5vUmVzdWx0c1Jvdyk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ndm90ZXMnPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYmlsbFN0YWNrJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IGhlYWRlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgbGVmdFwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzZXNzaW9uXCI+U2Vzc2lvbjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBudW1iZXJcIj5OdW1iZXI8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgdm90ZSBmdWxsLWxheW91dFwiPlZvdGU8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc2hvcnRuYW1lXCI+TmFtZTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCB2b3RlIG1vYmlsZS1vbmx5XCI+Vm90ZTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsYXdcIj5MYXc8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgZHJvcGRvd25cIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIHJpZ2h0XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt2b3RlUm93c31cbiAgICAgICAgICAgIHtsb2FkZXJ9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTsgICAgICAgIFxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCaWxsU3RhY2s7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgQmlsbFN0YWNrID0gcmVxdWlyZSgnLi9CaWxsU3RhY2suanMnKTtcbnZhciBCaWxsU2VhcmNoID0gcmVxdWlyZSgnLi9CaWxsU2VhcmNoLmpzJyk7XG52YXIgUHJvZmlsZUJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICdwcm9maWxlQm94ICcgKyB0aGlzLnByb3BzLmJveDtcbiAgICB2YXIgY2xvc2VDbGFzcyA9ICdjbG9zZSAnICsgdGhpcy5wcm9wcy5ib3g7XG4gICAgaWYgKCF0aGlzLnByb3BzLnByb2ZpbGUucGFydHlfc2x1Zykge1xuICAgICAgdmFyIHBhcnR5TmFtZSA9IHRoaXMucHJvcHMucHJvZmlsZS5wYXJ0eV9uYW1lO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBwYXJ0eU5hbWUgPSB0aGlzLnByb3BzLnByb2ZpbGUucGFydHlfc2x1ZztcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlSGVhZGVyXCI+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwicmV0dXJuXCIgaHJlZj1cIi8jL1wiPjxkaXYgY2xhc3NOYW1lID1cImljb25cIj48L2Rpdj48c3Bhbj5yZXR1cm4gdG8gTVAgc2VhcmNoPC9zcGFuPjwvYT5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9e2Nsb3NlQ2xhc3N9IGhyZWY9XCIvIy9cIj48L2E+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cIm5hbWVcIj57dGhpcy5wcm9wcy5wcm9maWxlLm5hbWV9PC9oMj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbmZvXCI+PGgzIGNsYXNzTmFtZT1cInJpZGluZ1wiPnt0aGlzLnByb3BzLnByb2ZpbGUucmlkaW5nfTwvaDM+PGgzIGNsYXNzTmFtZT1cInBhcnR5XCI+e3BhcnR5TmFtZX08L2gzPjwvc3Bhbj5cbiAgICAgICAgICA8QmlsbFNlYXJjaCBcbiAgICAgICAgICAgIG9uQmlsbFNlYXJjaENoYW5nZT17dGhpcy5wcm9wcy5vbkJpbGxTZWFyY2hDaGFuZ2V9XG4gICAgICAgICAgICBvblNlc3Npb25TZWxlY3RUb2dnbGU9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0VG9nZ2xlfVxuICAgICAgICAgICAgb25TZXNzaW9uU2VsZWN0PXt0aGlzLnByb3BzLm9uU2Vzc2lvblNlbGVjdH1cbiAgICAgICAgICAgIHNlc3Npb25zTGlzdD17dGhpcy5wcm9wcy5zZXNzaW9uc0xpc3R9XG4gICAgICAgICAgICBzZXNzaW9uVG9nZ2xlID0ge3RoaXMucHJvcHMuc2Vzc2lvblRvZ2dsZX1cbiAgICAgICAgICAgIHNlc3Npb249e3RoaXMucHJvcHMuc2Vzc2lvbn1cbiAgICAgICAgICAgIHNlc3Npb25zVm90ZXMgPSB7dGhpcy5wcm9wcy5zZXNzaW9uc1ZvdGVzfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8QmlsbFN0YWNrIFxuICAgICAgICB2b3Rlcz17dGhpcy5wcm9wcy52b3Rlc30gXG4gICAgICAgIHJldHJpZXZpbmdWb3Rlcz17dGhpcy5wcm9wcy5yZXRyaWV2aW5nVm90ZXN9XG4gICAgICAgIGdldEJpbGxJbmZvID0ge3RoaXMucHJvcHMuZ2V0QmlsbEluZm99XG4gICAgICAgIGN1cnJlbnRWb3RlID0ge3RoaXMucHJvcHMuY3VycmVudFZvdGV9XG4gICAgICAgIGJpbGxJbmZvID0ge3RoaXMucHJvcHMuYmlsbEluZm99XG4gICAgICAgIGdldFBvbGl0aWNpYW4gPSB7dGhpcy5wcm9wcy5nZXRQb2xpdGljaWFufSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2ZpbGVCb3g7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBWb3RlUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy52b3RlLnZvdGUgPT0gJ1knKSB7XG4gICAgICB2YXIgdm90ZUNsYXNzID0gJ3llcyAnO1xuICAgICAgdmFyIHZvdGVUZXh0ID0gJ3llcyc7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMucHJvcHMudm90ZS52b3RlID09ICdOJykge1xuICAgICAgdmFyIHZvdGVDbGFzcyA9ICdubyAnO1xuICAgICAgdmFyIHZvdGVUZXh0ID0gJ25vJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgdm90ZUNsYXNzID0gJyc7XG4gICAgICB2YXIgdm90ZVRleHQgPSAnbm8gdm90ZSc7XG4gICAgfVxuICAgIHZvdGVDbGFzcyArPSAndm90ZSBjb2wgJztcbiAgICB2YXIgbW9iaWxlVm90ZUNsYXNzID0gdm90ZUNsYXNzICsgJ21vYmlsZS1vbmx5JztcbiAgICB2b3RlQ2xhc3MgKz0gJ2Z1bGwtbGF5b3V0J1xuXG4gICAgdmFyIGxhd1RleHQgPSB0aGlzLnByb3BzLnZvdGUubGF3ID8gJ3llcycgOiAnbm8nO1xuICAgIHZhciBsYXdDbGFzcyA9ICdjb2wgbGF3ICcgKyBsYXdUZXh0O1xuXG4gICAgaWYgKHRoaXMucHJvcHMudm90ZS5zaG9ydF90aXRsZV9lbikge1xuICAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLnZvdGUuc2hvcnRfdGl0bGVfZW47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLnZvdGUubmFtZV9lbjtcbiAgICB9XG4gICAgdmFyIHZvdGVSb3dDbGFzcyA9IFwidm90ZVJvdyByb3dcIjtcbiAgICBpZiAodGhpcy5wcm9wcy52b3RlLnZvdGVxdWVzdGlvbl9pZCA9PSB0aGlzLnByb3BzLmN1cnJlbnRWb3RlKSB7XG4gICAgICB2b3RlUm93Q2xhc3MgKz0gXCIgY3VycmVudFwiO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17dm90ZVJvd0NsYXNzfSBrZXk9e3RoaXMucHJvcHMua2V5fT5cbiAgICAgICAgPGRpdiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2suYmluZChudWxsLCB0aGlzKX0gY2xhc3NOYW1lPVwibWFpbiByb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgbGVmdFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNlc3Npb25cIj48c3BhbiBjbGFzc05hbWU9XCJsYWJlbCBtb2JpbGUtb25seVwiPlNlc3Npb248L3NwYW4+e3RoaXMucHJvcHMudm90ZS5zZXNzaW9uX2lkfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIG51bWJlclwiPjxzcGFuIGNsYXNzTmFtZT1cImxhYmVsIG1vYmlsZS1vbmx5XCI+TnVtYmVyPC9zcGFuPnt0aGlzLnByb3BzLnZvdGUubnVtYmVyfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt2b3RlQ2xhc3N9PjxzcGFuIGNsYXNzTmFtZT1cInZvdGVUZXh0XCI+e3ZvdGVUZXh0fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzaG9ydG5hbWVcIj57bmFtZX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17bW9iaWxlVm90ZUNsYXNzfT48c3BhbiBjbGFzc05hbWU9XCJsYWJlbCBtb2JpbGUtb25seVwiPlZvdGU8L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwidm90ZVRleHRcIj57dm90ZVRleHR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtsYXdDbGFzc30+PHNwYW4gY2xhc3NOYW1lPVwibGFiZWwgbW9iaWxlLW9ubHlcIj5MYXc8L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwibGF3VGV4dFwiPntsYXdUZXh0fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBkcm9wZG93blwiPjxzcGFuPjxBcnJvd0ljb24gLz48L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIHJpZ2h0XCI+PC9kaXY+IFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFZvdGVJbmZvUm93IFxuICAgICAgICAgIHZvdGUgPSB7dGhpcy5wcm9wcy52b3RlfVxuICAgICAgICAgIGN1cnJlbnRWb3RlID0ge3RoaXMucHJvcHMuY3VycmVudFZvdGV9XG4gICAgICAgICAgdm90ZVF1ZXN0aW9uSUQgPSB7dGhpcy5wcm9wcy52b3RlLnZvdGVxdWVzdGlvbl9pZH1cbiAgICAgICAgICBiaWxsSW5mbyA9IHt0aGlzLnByb3BzLmJpbGxJbmZvfVxuICAgICAgICAgIGdldFBvbGl0aWNpYW4gPSB7dGhpcy5wcm9wcy5nZXRQb2xpdGljaWFufSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG52YXIgVm90ZUluZm9Sb3cgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGluZm9DbGFzcyA9IFwicm93IGluZm9cIjtcbiAgICB2YXIgZ2V0UG9saXRpY2lhbiA9IHRoaXMucHJvcHMuZ2V0UG9saXRpY2lhbjtcbiAgICB2YXIgc3BvbnNvckNvbXBvbmVudCA9IG51bGw7XG4gICAgaWYgKHRoaXMucHJvcHMudm90ZVF1ZXN0aW9uSUQgPT0gdGhpcy5wcm9wcy5jdXJyZW50Vm90ZSkge1xuICAgICAgaW5mb0NsYXNzICs9ICcgY3VycmVudCc7XG4gICAgICB2YXIgbGF3U3RyaW5nID0gICdMYXc6ICcgKyB0aGlzLnByb3BzLmxhd1RleHQ7XG4gICAgICB2YXIgdm90ZUluZm9ybWF0aW9uID0gPGRpdiBjbGFzc05hbWU9XCJjb2wgYmlsbEluZm9cIj57bGF3U3RyaW5nfTwvZGl2PlxuICAgICAgaWYgKHVuZGVmaW5lZCAhPSB0aGlzLnByb3BzLmJpbGxJbmZvLnZvdGVzKSB7XG4gICAgICAgIHZhciBwYXJ0eVZvdGVOb2RlcyA9IFtdO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBub2RlID0gKFxuICAgICAgICAgIDxkaXYga2V5PXswfSBjbGFzc05hbWU9XCJwYXJ0eVZvdGVIZWFkZXJcIiBrZXk9e2l9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+UGFydHk8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwieWVzXCI+WUVTPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vXCI+Tk88L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzdGFpblwiPkFCU1RBSU48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgICAgcGFydHlWb3RlTm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgeWVzQ291bnQgPSAwO1xuICAgICAgICBub0NvdW50ID0gMDtcbiAgICAgICAgYWJzdGFpbkNvdW50ID0gMDtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMucHJvcHMuYmlsbEluZm8udm90ZXMpIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgICAgdmFyIHBhcnR5TmFtZSA9IGtleTtcbiAgICAgICAgICB2YXIgeWVzID0gdGhpcy5wcm9wcy5iaWxsSW5mby52b3Rlc1trZXldWydZJ107XG4gICAgICAgICAgdmFyIG5vID0gdGhpcy5wcm9wcy5iaWxsSW5mby52b3Rlc1trZXldWydOJ107XG4gICAgICAgICAgdmFyIGFic3RhaW4gPSB0aGlzLnByb3BzLmJpbGxJbmZvLnZvdGVzW2tleV1bJ0EnXTtcbiAgICAgICAgICB2YXIgbm9DbGFzcyA9IFwibm9cIjtcbiAgICAgICAgICB2YXIgeWVzQ2xhc3MgPSBcInllc1wiO1xuICAgICAgICAgIHZhciBhYnN0YWluQ2xhc3MgPSBcImFic3RhaW5cIjtcbiAgICAgICAgICB2YXIgcGFydHlDbGFzcyA9IFwicGFydHlWb3RlXCI7XG4gICAgICAgICAgaWYgKCh5ZXMgPiBhYnN0YWluKSYmKHllcyA+IG5vKSkge1xuICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiB5ZXNcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoKG5vID4gYWJzdGFpbikgJiYgKG5vID4geWVzKSkge1xuICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiBub1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICgoYWJzdGFpbiA+IHllcykgJiYgKGFic3RhaW4gPiBubykpIHtcbiAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgYWJzdGFpblwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICgoeWVzID09IG5vKSkge1xuICAgICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIHRpZSB5blwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoeWVzPT1hYnN0YWluKSB7XG4gICAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgdGllIHlhXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChubz09YWJzdGFpbikge1xuICAgICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIHRpZSBuYVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgdGllXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHllc0NvdW50ICs9IHllcztcbiAgICAgICAgICBub0NvdW50ICs9IG5vO1xuICAgICAgICAgIGFic3RhaW5Db3VudCArPSBhYnN0YWluO1xuICAgICAgICAgIHZhciBub2RlID0gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3BhcnR5Q2xhc3N9IGtleT17aX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPntwYXJ0eU5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt5ZXNDbGFzc30+PHNwYW4+e3llc308L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtub0NsYXNzfT48c3Bhbj57bm99PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YWJzdGFpbkNsYXNzfT48c3Bhbj57YWJzdGFpbn08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICAgIHBhcnR5Vm90ZU5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvdGFsQ2xhc3MgPSBcInBhcnR5Vm90ZSB0b3RhbCBcIjtcbiAgICAgICAgaWYgKHllc0NvdW50ID4gbm9Db3VudCkge1xuICAgICAgICAgIGlmICh5ZXNDb3VudCA+IGFic3RhaW5Db3VudCkge1xuICAgICAgICAgICAgdG90YWxDbGFzcyArPSBcIiB5ZXNcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b3RhbENsYXNzICs9IFwiIGFic3RhaW5cIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKG5vQ291bnQgPiBhYnN0YWluQ291bnQpIHtcbiAgICAgICAgICAgIHRvdGFsQ2xhc3MgKz0gXCIgbm9cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b3RhbENsYXNzICs9IFwiIGFic3RhaW5cIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvdGFsUm93ID0gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydHlWb3RlIHRvdGFsXCIga2V5PVwidFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+VG90YWw8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwieWVzXCI+PHNwYW4+e3llc0NvdW50fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9cIj48c3Bhbj57bm9Db3VudH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic3RhaW5cIj48c3Bhbj57YWJzdGFpbkNvdW50fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgICAgcGFydHlWb3RlTm9kZXMucHVzaCh0b3RhbFJvdyk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmJpbGxJbmZvLnNwb25zb3IpIHtcbiAgICAgICAgICB2YXIgc3BvbnNvclByb2ZpbGUgPSBnZXRQb2xpdGljaWFuKHVuZGVmaW5lZCwgdGhpcy5wcm9wcy5iaWxsSW5mby5zcG9uc29yKTtcbiAgICAgICAgICB2YXIgaW1nVVJMID0gXCJ1cmwoJy9zdGF0aWMvaGVhZHNob3RzL1wiICsgc3BvbnNvclByb2ZpbGUuaW1ndXJsICsgXCInKVwiO1xuICAgICAgICAgIHZhciBzcG9uc29yQ2xhc3NTdHJpbmcgPSAnc3BvbnNvclByb2ZpbGUgJztcbiAgICAgICAgICB2YXIgaHJlZiA9ICcvIy9wcm9maWxlLycgKyBzcG9uc29yUHJvZmlsZS5pZDtcbiAgICAgICAgICBpZiAoIXNwb25zb3JQcm9maWxlLnBhcnR5X3NsdWcpIHtcbiAgICAgICAgICAgIHZhciBwYXJ0eU5hbWUgPSBzcG9uc29yUHJvZmlsZS5wYXJ0eV9uYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNwb25zb3JDbGFzc1N0cmluZyArPSBzcG9uc29yUHJvZmlsZS5wYXJ0eV9zbHVnO1xuICAgICAgICAgICAgdmFyIHBhcnR5TmFtZSA9IHNwb25zb3JQcm9maWxlLnBhcnR5X3NsdWc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNwb25zb3JDb21wb25lbnQgPSAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcG9uc29yXCI+XG4gICAgICAgICAgICAgIDxoND5CaWxsIFNwb25zb3I8L2g0PlxuICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e3Nwb25zb3JDbGFzc1N0cmluZ30gaHJlZj17aHJlZn0gPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tiYWNrZ3JvdW5kSW1hZ2U6IGltZ1VSTH19PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxoMz57c3BvbnNvclByb2ZpbGUubmFtZX08L2gzPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJpZGluZ1wiPntzcG9uc29yUHJvZmlsZS5yaWRpbmd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBhcnR5XCI+e3BhcnR5TmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BvbnNvckNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgcGFydHlWb3RlTm9kZXMgPSAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgcGFydHlWb3RlTm9kZXMgPSAnJztcbiAgICB9XG4gICAgdmFyIG9wZW5wYXJsaWFtZW50VVJMID0gXCIvL29wZW5wYXJsaWFtZW50LmNhL2JpbGxzL1wiICsgdGhpcy5wcm9wcy52b3RlLnNlc3Npb25faWQgKyBcIi9cIiArIHRoaXMucHJvcHMudm90ZS5udW1iZXIgKyBcIi9cIjtcbiAgICBzZXNzaW9uTnVtYmVycyA9IHRoaXMucHJvcHMudm90ZS5zZXNzaW9uX2lkLnNwbGl0KFwiLVwiKTtcbiAgICB2YXIgcGFybFVSTCA9IFwiaHR0cDovL3d3dy5wYXJsLmdjLmNhL0xFR0lTSW5mby9MQUFHLmFzcHg/bGFuZ3VhZ2U9RSZQYXJsPVwiICsgc2Vzc2lvbk51bWJlcnNbMF0gKyBcIiZTZXM9XCIgKyBzZXNzaW9uTnVtYmVyc1sxXTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2luZm9DbGFzc30+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIGxlZnRcIj48L2Rpdj5cbiAgICAgICAgICB7c3BvbnNvckNvbXBvbmVudH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBwYXJ0eVZvdGVzXCI+XG4gICAgICAgICAgICA8aDQ+UGFydHkgVm90ZXM8L2g0PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0eVZvdGVzVGFibGVcIj5cbiAgICAgICAgICAgICAge3BhcnR5Vm90ZU5vZGVzfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbW9yZUJpbGxJbmZvXCI+XG4gICAgICAgICAgPGg0Pk1vcmUgSW5mb3JtYXRpb248L2g0PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8YSBocmVmPXtvcGVucGFybGlhbWVudFVSTH0gdGFyZ2V0PVwiX2JsYW5rXCI+dmlldyBiaWxsIG9uIG9wZW5wYXJsaWFtZW50LmNhIDxBcnJvd0ljb24gLz48L2E+XG4gICAgICAgICAgICA8YSBocmVmPXtwYXJsVVJMfSB0YXJnZXQ9XCJfYmxhbmtcIj52aWV3IHNlc3Npb24gb24gcGFybC5nYy5jYSA8QXJyb3dJY29uIC8+PC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciByaWdodFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG52YXIgQXJyb3dJY29uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c3ZnIHZlcnNpb249XCIxLjFcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG4gICAgICAgICB2aWV3Qm94PVwiMCAwIDQwMCA0MDBcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xNjMuNSwzMzQuNWwtNDcuMS00Ny4xbDg3LjUtODcuNWwtODcuNS04Ny41bDQ3LjEtNDcuMUwyOTgsMjAwTDE2My41LDMzNC41elwiLz5cbiAgICAgIDwvc3ZnPlxuICAgICk7XG4gIH1cbn0pO1xudmFyIEJpbGxTZWFyY2ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2Vzc2lvbiA9PSAnJykge1xuICAgICAgdmFyIHNlbGVjdFRleHQgPSAnYW55IHNlc3Npb24nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBzZWxlY3RUZXh0ID0gdGhpcy5wcm9wcy5zZXNzaW9uO1xuICAgIH1cbiAgICB2YXIgc2Vzc2lvbnNWb3RlcyA9IHRoaXMucHJvcHMuc2Vzc2lvbnNWb3RlcztcbiAgICB2YXIgdG9nZ2xlQ2xhc3MgPSAnc2Vzc2lvblNlbGVjdCcgKyAodGhpcy5wcm9wcy5zZXNzaW9uVG9nZ2xlID8gJycgOiAnIGNvbGxhcHNlZCcpO1xuICAgIHZhciBvYmplY3ROb2RlcyA9IHRoaXMucHJvcHMuc2Vzc2lvbnNMaXN0Lm1hcChmdW5jdGlvbiAob2JqZWN0LCBpKSB7XG4gICAgICAgIHZhciBzdW0gPSBzZXNzaW9uc1ZvdGVzW29iamVjdC5pZF07XG4gICAgICAgIGlmIChzdW0pIHtcbiAgICAgICAgICB2YXIgc3RyaW5nID0gb2JqZWN0LmlkICsgJyAtICgnICsgc3VtICsgJyknO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy5wcm9wcy5vblNlc3Npb25TZWxlY3QuYmluZChudWxsLG9iamVjdCl9IGtleT17aX0+PHNwYW4gY2xhc3NOYW1lPVwic2Vzc2lvblwiPntvYmplY3QuaWR9PC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJzdW1cIj57c3VtfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJpbGxTZWFyY2hcIj5cbiAgICAgICAgPGZvcm0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBiaWxscyBieSBuYW1lIG9yIG51bWJlci4uLlwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQmlsbFNlYXJjaENoYW5nZX0gLz4gIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0b2dnbGVDbGFzc30+ICAgIFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNlbGVjdFwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0VG9nZ2xlfT57c2VsZWN0VGV4dH08L3NwYW4+ICBcbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwic2Vzc2lvbk9wdGlvblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0LmJpbmQobnVsbCwnJyl9PjxzcGFuIGNsYXNzTmFtZT1cInNlc3Npb25cIj5hbnkgc2Vzc2lvbjwvc3Bhbj4gPHNwYW4gY2xhc3NOYW1lPVwic3VtXCI+e3Nlc3Npb25zVm90ZXNbJ3N1bSddfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICAge29iamVjdE5vZGVzfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVm90ZVJvdzsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFNlYXJjaFN0YWNrID0gcmVxdWlyZSgnLi9TZWFyY2hTdGFjay5qcycpO1xudmFyIFNlc3Npb25TZWxlY3RvciA9IHJlcXVpcmUoJy4vU2Vzc2lvblNlbGVjdG9yLmpzJyk7XG5TZWFyY2hCb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNsYXNzZXMgPSAnc2VhcmNoQm94ICcgKyB0aGlzLnByb3BzLmJveDsgLy90ZW1wXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoQm94LW5vc2Nyb2xsIHNlYXJjaFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30gb25TY3JvbGw9e3RoaXMucHJvcHMub25TZWFyY2hTY3JvbGwuYmluZChudWxsLCB0aGlzKX0gPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wTGlua3NcIj48YSBocmVmPVwiLyMvaW5mb1wiIGNsYXNzTmFtZT1cImluZm9cIj48L2E+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zaGF5cW4vcGFybGVcIiBjbGFzc05hbWU9XCJnaXRodWJcIj48L2E+PC9kaXY+XG4gICAgICAgICAgPGZvcm0+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25TZWFyY2hDaGFuZ2V9IC8+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TZWFyY2g8L2J1dHRvbj5cbiAgICAgICAgICAgIDxzcGFuPmJ5IG5hbWUsIHJpZGluZywgb3IgcG9zdGFsIGNvZGU8L3NwYW4+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2Vzc2lvblNlbGVjdG9yQ29udGFpbmVyXCI+XG4gICAgICAgICAgICA8U2Vzc2lvblNlbGVjdG9yIFxuICAgICAgICAgICAgIHNlc3Npb25zTGlzdD17dGhpcy5wcm9wcy5zZXNzaW9uc0xpc3R9XG4gICAgICAgICAgICAgY3VycmVudFNlc3Npb25zPXt0aGlzLnByb3BzLnNlc3Npb25zfVxuICAgICAgICAgICAgIHNlc3Npb25Ub2dnbGUgPSB7dGhpcy5wcm9wcy5zZXNzaW9uVG9nZ2xlfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoQ29udGVudFwiPlxuICAgICAgICAgICAgPFNlYXJjaFN0YWNrIFxuICAgICAgICAgICAgICBib3g9e3RoaXMucHJvcHMuYm94fSBcbiAgICAgICAgICAgICAgcG9saXRpY2lhbnM9e3RoaXMucHJvcHMucG9saXRpY2lhbkxpc3R9IFxuICAgICAgICAgICAgICBwcm9maWxlPXtbbnVsbF19XG4gICAgICAgICAgICAgIHNlYXJjaGluZz17dGhpcy5wcm9wcy5zZWFyY2guaXNTZWFyY2hpbmd9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFNlYXJjaEJveDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFNlYXJjaFN0YWNrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNlYXJjaFN0YWNrXCIsXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgY2xhc3NTdHJpbmcgPSBcInNlYXJjaFN0YWNrXCI7XG4gICAgdmFyIGN1cnJlbnRQcm9maWxlSUQgPSB0aGlzLnByb3BzLnByb2ZpbGUuaWQ7XG4gICAgdmFyIHBvbGl0aWNpYW5Ob2RlcyA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzLnBvbGl0aWNpYW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIHBvbGl0aWNpYW5Ob2RlcyA9IHRoaXMucHJvcHMucG9saXRpY2lhbnMubWFwKGZ1bmN0aW9uIChvYmplY3QsIGkpIHtcbiAgICAgICAgdmFyIGhlYWRzaG90ID0gb2JqZWN0LmhlYWRzaG90LnNwbGl0KCcvJykucG9wKCk7XG4gICAgICAgIHZhciBpbWdVUkwgPSBcInVybCgnL3N0YXRpYy9oZWFkc2hvdHMvXCIgKyBoZWFkc2hvdCArIFwiJylcIjtcbiAgICAgICAgdmFyIGNsYXNzU3RyaW5nID0gJyc7XG4gICAgICAgIGlmIChvYmplY3QuaWQgPT0gY3VycmVudFByb2ZpbGVJRCkge1xuICAgICAgICAgIGNsYXNzU3RyaW5nICs9ICdhY3RpdmUgJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG9iamVjdC5pZCA9PSBjdXJyZW50UHJvZmlsZUlEKSYmKHRoaXMucHJvcHMuYm94ID09ICdwcm9maWxlJykpIHtcbiAgICAgICAgICB2YXIgaHJlZiA9ICcvIy8nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhciBocmVmID0gJy8jL3Byb2ZpbGUvJyArIG9iamVjdC5pZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqZWN0LmFjdGl2ZSkge1xuICAgICAgICAgIGNsYXNzU3RyaW5nICs9ICdjdXJyZW50ICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvYmplY3QucGFydHlfc2x1Zykge1xuICAgICAgICAgIHZhciBwYXJ0eU5hbWUgPSBvYmplY3QucGFydHlfbmFtZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjbGFzc1N0cmluZyArPSBvYmplY3QucGFydHlfc2x1ZztcbiAgICAgICAgICB2YXIgcGFydHlOYW1lID0gb2JqZWN0LnBhcnR5X3NsdWc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iamVjdC5uYW1lLmxlbmd0aD4xOSkge1xuICAgICAgICAgIGlmIChvYmplY3QubmFtZS5sZW5ndGggPiAyMikge1xuICAgICAgICAgICAgY2xhc3NTdHJpbmcgKz0gJyByZWR1Y2UtbGFyZ2UnXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2xhc3NTdHJpbmcgKz0gJyByZWR1Y2UtbWVkaXVtJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7Y2xhc3NOYW1lOiBjbGFzc1N0cmluZywgaHJlZjogaHJlZiwga2V5OiBpfSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZToge2JhY2tncm91bmRJbWFnZTogaW1nVVJMfX0pLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBudWxsLCBvYmplY3QubmFtZSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJwYXJ0eVwifSwgcGFydHlOYW1lKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7ICBcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5wcm9wcy5zZWFyY2hpbmcpIHtcbiAgICAgIHZhciBub1Jlc3VsdHNOb2RlID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgzXCIsIG51bGwsIFwiTk8gUkVTVUxUU1wiKSk7XG4gICAgICBwb2xpdGljaWFuTm9kZXMucHVzaChub1Jlc3VsdHNOb2RlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgcGxhY2VIb2xkZXJOYW1lcyA9IFsnSm9obiBBLiBNY1RlbXAnLCAnSm9obiBGYWtlbmJha2VyJywgJ1BpZXJyZSBUZW1wZGVhdSddO1xuICAgICAgZm9yIChpID0gMDsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgdmFyIGVtcHR5Tm9kZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtrZXk6IGksIGNsYXNzTmFtZTogXCJwbGFjZWhvbGRlclwiLCBocmVmOiBcIi8jL1wifSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgzXCIsIG51bGwsIHBsYWNlSG9sZGVyTmFtZXNbaSUzXSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtjbGFzc05hbWU6IFwicGFydHlcIn0sIFwiVkFOXCIpKTtcbiAgICAgICAgcG9saXRpY2lhbk5vZGVzLnB1c2goZW1wdHlOb2RlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogY2xhc3NTdHJpbmd9LCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImgyXCIsIG51bGwsIFwiTWVtYmVycyBvZiBQYXJsaWFtZW50XCIsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtjbGFzc05hbWU6IFwibGVhZlwifSkpLCBcbiAgICAgICAgcG9saXRpY2lhbk5vZGVzXG4gICAgICApXG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VhcmNoU3RhY2s7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cblNlc3Npb25CdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0Y2xhc3NOYW1lID0gXCJzZXNzaW9uQnV0dG9uXCI7XG5cdFx0dmFyIHNlc3Npb25OdW1iZXIgPSB0aGlzLnByb3BzLnNlc3Npb25OdW1iZXI7XG5cdFx0Zm9yIChpPTA7aTx0aGlzLnByb3BzLmN1cnJlbnRTZXNzaW9ucy5sZW5ndGg7aSsrKSB7XG5cdFx0XHRpZiAoc2Vzc2lvbk51bWJlciA9PSB0aGlzLnByb3BzLmN1cnJlbnRTZXNzaW9uc1tpXSkge1xuXHRcdFx0XHRjbGFzc05hbWUgKz0gXCIgYWN0aXZlXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBrZXk9e3RoaXMucHJvcHMua2V5fT5cblx0XHRcdFx0PGEgb25DbGljaz17dGhpcy5wcm9wcy5zZXNzaW9uVG9nZ2xlLmJpbmQobnVsbCwgc2Vzc2lvbk51bWJlcil9PntzZXNzaW9uTnVtYmVyfTwvYT5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBTZXNzaW9uQnV0dG9uOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgU2Vzc2lvbkJ1dHRvbiA9IHJlcXVpcmUoJy4vU2Vzc2lvbkJ1dHRvbi5qcycpO1xuU2Vzc2lvblNlbGVjdG9yID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBzZXNzaW9uc0xpc3QgPSB0aGlzLnByb3BzLnNlc3Npb25zTGlzdDtcblx0XHR2YXIgY3VycmVudFNlc3Npb25zID0gdGhpcy5wcm9wcy5jdXJyZW50U2Vzc2lvbnM7XG5cdFx0dmFyIHNlc3Npb25CdXR0b25zID0gW107XG5cdFx0dmFyIHNlc3Npb25Ub2dnbGUgPSB0aGlzLnByb3BzLnNlc3Npb25Ub2dnbGU7XG5cdFx0dmFyIGtleSA9IDA7XG5cdFx0Zm9yKHZhciBzZXNzaW9uTnVtYmVyIGluIHNlc3Npb25zTGlzdCkge1xuXHRcdFx0dmFyIHNlc3Npb24gPSA8U2Vzc2lvbkJ1dHRvbiBzZXNzaW9uTnVtYmVyPXtzZXNzaW9uTnVtYmVyfVxuXHRcdFx0XHRcdFx0XHRjdXJyZW50U2Vzc2lvbnM9e2N1cnJlbnRTZXNzaW9uc31cblx0XHRcdFx0XHRcdFx0c2Vzc2lvblRvZ2dsZT17c2Vzc2lvblRvZ2dsZX0gXG5cdFx0XHRcdFx0XHRcdGtleT17a2V5fSAvPlxuXHRcdFx0c2Vzc2lvbkJ1dHRvbnMucHVzaChzZXNzaW9uKTtcblx0XHRcdGtleSsrO1xuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZXNzaW9uc1NlbGVjdG9yXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj48aDI+U2Vzc2lvbnM8L2gyPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbnNcIj57c2Vzc2lvbkJ1dHRvbnMucmV2ZXJzZSgpfTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFNlc3Npb25TZWxlY3RvcjsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEJpbGxUZXh0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBwcmVwVGV4dDogZnVuY3Rpb24odGV4dCkge1xuICAgIHRleHQgPSB0ZXh0LnRyaW0oKTtcbiAgICByZXR1cm4gKHRleHQubGVuZ3RoPjA/JzxwPicrdGV4dC5yZXBsYWNlKC9bXFxyXFxuXSsvLCc8L3A+PHA+JykrJzwvcD4nOm51bGwpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYmlsbFRleHQgPSB0aGlzLnByZXBUZXh0KHRoaXMucHJvcHMuYmlsbFRleHQpO1xuICAgIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiaWxsVGV4dFwiPlxuICAgICAge2JpbGxUZXh0fVxuICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbGxUZXh0OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgQmlsbFRleHQgPSByZXF1aXJlKCcuL0JpbGxUZXh0LmpzJyk7XG52YXIgVGV4dEJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICdiaWxsVGV4dEJveCAnICsgdGhpcy5wcm9wcy5ib3g7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT48ZGl2IGNsYXNzTmFtZT1cImNsb3NlQ29udGFpbmVyXCI+PGEgaHJlZj1cIi8jL1wiPjwvYT48L2Rpdj48QmlsbFRleHQgYmlsbFRleHQ9e3RoaXMucHJvcHMuYmlsbFRleHR9IC8+PC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dEJveDsiLCJ2YXIgQXJyb3dJY29uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c3ZnIHZlcnNpb249XCIxLjFcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG4gICAgICAgICB2aWV3Qm94PVwiMCAwIDQwMCA0MDBcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xNjMuNSwzMzQuNWwtNDcuMS00Ny4xbDg3LjUtODcuNWwtODcuNS04Ny41bDQ3LjEtNDcuMUwyOTgsMjAwTDE2My41LDMzNC41elwiLz5cbiAgICAgIDwvc3ZnPlxuICAgICk7XG4gIH1cbn0pOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG5pZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJykgeyAvLyBmYWlsIGdyYWNlZnVsbHlcbiAgdHJhY2tlciA9IGdhLmNyZWF0ZSgnVUEtNjc4MDQ0NTEtMScsICd2b3Rlcy5tcCcpO1xufVxuZnVuY3Rpb24gZ2FUcmFjayhwYXRoLCB0aXRsZSkge1xuICBpZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJykgeyAvLyBmYWlsIGdyYWNlZnVsbHlcbiAgICBpZiAocGF0aD09XCJcIikge1xuICAgICAgcGF0aCA9IFwiL1wiO1xuICAgIH1cbiAgICBnYSgnc2V0JywgeyBwYWdlOiBwYXRoLCB0aXRsZTogdGl0bGUgfSk7XG4gICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcbiAgfVxufVxuXG4vLyBFbGVtZW50c1xudmFyIEFycm93SWNvbiA9IHJlcXVpcmUoJy4vZWxlbWVudHMvQXJyb3dJY29uLmpzJyk7XG5cbi8vIEJveGVzXG52YXIgU2VhcmNoQm94ID0gcmVxdWlyZSgnLi9ib3hlcy9zZWFyY2gvU2VhcmNoQm94LmpzJyk7XG52YXIgUHJvZmlsZUJveCA9IHJlcXVpcmUoJy4vYm94ZXMvcHJvZmlsZS9Qcm9maWxlQm94LmpzJyk7XG52YXIgSW5mb0JveCA9IHJlcXVpcmUoJy4vYm94ZXMvaW5mby9JbmZvQm94LmpzJyk7XG52YXIgVGV4dEJveCA9IHJlcXVpcmUoJy4vYm94ZXMvdGV4dC9UZXh0Qm94LmpzJyk7XG5cblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAvLyAqKioqU1RBVEUgRlVOQ1RJT05TKioqKiAvL1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcHBTdGF0ZSA9IHRoaXMuZ2V0QXBwU3RhdGUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgYXBwOiBhcHBTdGF0ZSxcbiAgICB9O1xuICB9LFxuXG4gIGdldEFwcFN0YXRlOiBmdW5jdGlvbihwcmV2QXBwU3RhdGUpIHtcbiAgICAvLyBkZWZhdWx0IHN0YXRlIG9uIGluaXRpYXRpb25cbiAgICB2YXIgZGVmYXVsdEFwcFN0YXRlID0geyBcbiAgICAgIGJveDogJ3NlYXJjaCcsXG4gICAgICBwb2xpdGljaWFuTGlzdDogW10sXG4gICAgICBwYXJ0aWVzTGlzdDoge30sXG4gICAgICByaWRpbmdzTGlzdDoge30sXG4gICAgICBzZXNzaW9uc0xpc3Q6IHt9LFxuICAgICAgc2Vzc2lvbnM6IFsnNDEtMicsICc0MS0xJ10sXG4gICAgICBzZWFyY2g6IHtcbiAgICAgICAgaXNTZWFyY2hpbmc6IGZhbHNlLFxuICAgICAgICBzZWFyY2hWYWx1ZTogJycsXG4gICAgICAgIHJpZGluZzogJycsXG4gICAgICAgIG1heDogMTAsXG4gICAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBwcm9maWxlOiB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICB2b3Rlczoge30sXG4gICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdm90ZToge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgZGF0YToge30sXG4gICAgICAgIHNwb25zb3I6IDAsXG4gICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICB9LFxuICAgICAgYmlsbDoge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgZGF0YToge30sXG4gICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAodHlwZW9mKHByZXZBcHBTdGF0ZSk9PT0ndW5kZWZpbmVkJykgcHJldkFwcFN0YXRlID0gZGVmYXVsdEFwcFN0YXRlO1xuICAgIC8vIGVkaXQgc3RhdGUgYWNjb3JkaW5nIHRvIFVSTCB2YWx1ZXNcbiAgICB2YXIgdXJsSGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcbiAgICB2YXIgbmV3QXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUocHJldkFwcFN0YXRlKTtcbiAgICB2YXIgdXJsUGFyYW1ldGVycyA9IHVybEhhc2guc3BsaXQoJy8nKS5maWx0ZXIoZnVuY3Rpb24obil7IHJldHVybiBuICE9ICcnIH0pO1xuICAgIG5ld0FwcFN0YXRlLmJveCA9ICdzZWFyY2gnO1xuICAgIC8vIGlmIHByb2ZpbGUgb3IgYmlsbFxuICAgIGlmICh1cmxQYXJhbWV0ZXJzLmxlbmd0aCA+PSAyKSB7XG4gICAgICBpZiAoKHVybFBhcmFtZXRlcnNbMF0gPT0gJ3Byb2ZpbGUnKSAmJiAhaXNOYU4odXJsUGFyYW1ldGVyc1sxXSkpIHtcbiAgICAgICAgbmV3QXBwU3RhdGUuYm94ID0gJ3Byb2ZpbGUnO1xuICAgICAgICBuZXdBcHBTdGF0ZS5wcm9maWxlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIG5ld0FwcFN0YXRlLnByb2ZpbGUuaWQgPSB1cmxQYXJhbWV0ZXJzWzFdO1xuICAgICAgICBuZXdBcHBTdGF0ZS5wcm9maWxlLnZvdGVzID0ge307XG4gICAgICB9XG4gICAgICBlbHNlIGlmICgodXJsUGFyYW1ldGVyc1swXSA9PSAnYmlsbCcpICYmICFpc05hTih1cmxQYXJhbWV0ZXJzWzFdKSkge1xuICAgICAgICBuZXdBcHBTdGF0ZS5ib3ggPSAnYmlsbCc7XG4gICAgICAgIG5ld0FwcFN0YXRlLmJpbGwuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgbmV3QXBwU3RhdGUuYmlsbC5pZCA9IHVybFBhcmFtZXRlcnNbMV07XG4gICAgICAgIG5ld0FwcFN0YXRlLmJpbGwuZGF0YSA9IHt9O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBpZiBwcm9maWxlIGFuZCB2b3RlIHNwZWNpZmllZFxuICAgIGlmICh1cmxQYXJhbWV0ZXJzLmxlbmd0aCA+PSA0KSB7XG4gICAgICBpZiAoKHVybFBhcmFtZXRlcnNbMl0gPT0gJ3ZvdGUnKSAmJiAhaXNOYU4odXJsUGFyYW1ldGVyc1szXSkpIHtcbiAgICAgICAgbmV3QXBwU3RhdGUudm90ZS5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICBuZXdBcHBTdGF0ZS52b3RlLmlkID0gdXJsUGFyYW1ldGVyc1szXTtcbiAgICAgICAgbmV3QXBwU3RhdGUudm90ZS5kYXRhID0ge307XG4gICAgICAgIG5ld0FwcFN0YXRlLnZvdGUuc3BvbnNvciA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdBcHBTdGF0ZTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5nZXRJbml0aWFsRGF0YSgpO1xuICAgIGlmICh0aGlzLnN0YXRlLmFwcC5wcm9maWxlLmlkKSB7XG4gICAgICB0aGlzLmdldFBvbGl0aWNpYW5Wb3Rlcyh0aGlzLnN0YXRlLmFwcC5wcm9maWxlLmlkKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3RhdGUuYXBwLnZvdGUuaWQpIHtcbiAgICAgIHRoaXMuZ2V0Vm90ZUluZm9ybWF0aW9uKHRoaXMuc3RhdGUuYXBwLnZvdGUuaWQpO1xuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBjdXJyZW50QXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgdGhpcy51cGRhdGVBcHBTdGF0ZShjdXJyZW50QXBwU3RhdGUpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgY2xvbmVBcHBTdGF0ZTogZnVuY3Rpb24oYXBwU3RhdGUpIHtcbiAgICByZXR1cm4gKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXBwU3RhdGUpKSk7XG4gIH0sXG5cbiAgdXBkYXRlQXBwU3RhdGU6IGZ1bmN0aW9uKGN1cnJlbnRBcHBTdGF0ZSkge1xuICAgIHZhciBuZXh0QXBwU3RhdGUgPSB0aGlzLmdldEFwcFN0YXRlKGN1cnJlbnRBcHBTdGF0ZSk7XG4gICAgaWYgKG5leHRBcHBTdGF0ZS5wcm9maWxlLmlkICYmIChuZXh0QXBwU3RhdGUucHJvZmlsZS5pZCAhPSBjdXJyZW50QXBwU3RhdGUucHJvZmlsZS5pZCkpIHtcbiAgICAgIHRoaXMuZ2V0UG9saXRpY2lhblZvdGVzKG5leHRBcHBTdGF0ZS5wcm9maWxlLmlkKTtcbiAgICB9XG4gICAgaWYgKG5leHRBcHBTdGF0ZS52b3RlLmlkICYmIChuZXh0QXBwU3RhdGUudm90ZS5pZCAhPSBjdXJyZW50QXBwU3RhdGUudm90ZS5pZCkpIHtcbiAgICAgIHRoaXMuZ2V0Vm90ZUluZm9ybWF0aW9uKG5leHRBcHBTdGF0ZS52b3RlLmlkKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7YXBwOiBuZXh0QXBwU3RhdGV9KTtcbiAgfSxcblxuICAvLyAqKioqREFUQSBDT0xMRUNUSU9OIEZVTkNUSU9OUyoqKiogLy9cblxuICBnZXRJbml0aWFsRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZihTdG9yYWdlKSA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmZldGNoRGF0YUZyb21TZXJ2ZXIoJy9pbml0aWFsaXplJywgdGhpcy5zZXRJbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy9pZiAodHlwZW9mKGxvY2FsU3RvcmFnZS5pbml0aWFsRGF0YSkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgLy8gIHRoaXMuc2V0SW5pdGlhbERhdGEobG9jYWxTdG9yYWdlLmluaXRpYWxEYXRhKTtcbiAgICAgIC8vfVxuICAgICAgLy9lbHNlIHtcbiAgICAgICAgdGhpcy5mZXRjaERhdGFGcm9tU2VydmVyKCcvaW5pdGlhbGl6ZScsIHRoaXMuc2V0SW5pdGlhbERhdGEpO1xuICAgICAgLy99XG4gICAgfVxuICB9LFxuXG4gIHNldEluaXRpYWxEYXRhOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgaWYgKHR5cGVvZihTdG9yYWdlKSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKHR5cGVvZihsb2NhbFN0b3JhZ2UuaW5pdGlhbERhdGEpID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmluaXRpYWxEYXRhID0gZGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHBhcnNlZERhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgIGFwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHRoaXMuc3RhdGUuYXBwKTtcbiAgICAgIGFwcFN0YXRlLnBvbGl0aWNpYW5MaXN0ID0gcGFyc2VkRGF0YVsncG9saXRpY2lhbnMnXTtcbiAgICAgIGFwcFN0YXRlLnJpZGluZ3NMaXN0ID0gcGFyc2VkRGF0YVsncmlkaW5ncyddO1xuICAgICAgYXBwU3RhdGUucGFydGllc0xpc3QgPSBwYXJzZWREYXRhWydwYXJ0aWVzJ107XG4gICAgICBhcHBTdGF0ZS5zZXNzaW9uc0xpc3QgPSBwYXJzZWREYXRhWydzZXNzaW9ucyddO1xuICAgICAgYXBwU3RhdGUuc2VhcmNoLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuc2V0U3RhdGUoe2FwcDogYXBwU3RhdGV9KTtcbiAgfSxcblxuICBnZXRQb2xpdGljaWFuVm90ZXM6IGZ1bmN0aW9uKGlkKSB7XG4gICAgdGhpcy5mZXRjaERhdGFGcm9tU2VydmVyKCcvdm90ZXMvJyArIGlkLCB0aGlzLnNldFBvbGl0aWNpYW5Wb3Rlcyk7XG4gIH0sXG5cbiAgc2V0UG9saXRpY2lhblZvdGVzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIHBhcnNlZERhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgIGFwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHRoaXMuc3RhdGUuYXBwKTtcbiAgICAgIGFwcFN0YXRlLnByb2ZpbGUudm90ZXMgPSBwYXJzZWREYXRhWyd2b3RlcyddO1xuICAgICAgYXBwU3RhdGUucHJvZmlsZS5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNldFN0YXRlKHthcHA6IGFwcFN0YXRlfSk7XG4gIH0sXG5cbiAgZ2V0Vm90ZUluZm9ybWF0aW9uOiBmdW5jdGlvbihpZCkge1xuICAgIHRoaXMuZmV0Y2hEYXRhRnJvbVNlcnZlcignL3ZvdGUvJyArIGlkLCB0aGlzLnNldFZvdGVJbmZvcm1hdGlvbik7XG4gIH0sXG5cbiAgc2V0Vm90ZUluZm9ybWF0aW9uOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIHBhcnNlZERhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgIGFwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHRoaXMuc3RhdGUuYXBwKTtcbiAgICAgIGFwcFN0YXRlLnZvdGUuZGF0YSA9IHBhcnNlZERhdGFbJ3ZvdGVzJ107XG4gICAgICBhcHBTdGF0ZS52b3RlLnNwb25zb3IgPSBwYXJzZWREYXRhWydzcG9uc29yJ107XG4gICAgICBhcHBTdGF0ZS52b3RlLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuc2V0U3RhdGUoe2FwcDogYXBwU3RhdGV9KTtcbiAgfSxcblxuICBmZXRjaERhdGFGcm9tU2VydmVyOiBmdW5jdGlvbihwYXRoLCBzZXR0ZXIsIHdpbGxSZXR1cm4pIHtcbiAgICBpZiAodHlwZW9mKHdpbGxSZXR1cm4pPT09J3VuZGVmaW5lZCcpIHdpbGxSZXR1cm4gPSBmYWxzZTtcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcXVlc3Qub3BlbignR0VUJywgcGF0aCwgdHJ1ZSk7XG4gICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgc2V0dGVyKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIGZldGNoaW5nIGRhdGEgZnJvbSBzZXJ2ZXJcIilcbiAgICAgIH1cbiAgICB9XG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgcmVxdWVzdGluZyBkYXRhIGZyb20gc2VydmVyXCIpXG4gICAgfTtcbiAgICByZXF1ZXN0LnNlbmQoKTtcbiAgfSxcblxuICAvLyAqKioqU0VBUkNIL0ZJTFRFUiBGVU5DVElPTlMqKioqIC8vXG5cbiAgZ2V0U2VhcmNoUmlkaW5nOiBmdW5jdGlvbihzZWFyY2hWYWx1ZSkge1xuICAgIHNlYXJjaFZhbHVlID0gc2VhcmNoVmFsdWUucmVwbGFjZSgvXFxzKy9nLCAnJyk7XG4gICAgc2VhcmNoVmFsdWUgPSBzZWFyY2hWYWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgIHZhciBwb3N0YWxVUkwgPSAnaHR0cHM6Ly9yZXByZXNlbnQub3Blbm5vcnRoLmNhL3Bvc3Rjb2Rlcy8nICsgc2VhcmNoVmFsdWUgKyAnLz9zZXRzPWZlZGVyYWwtZWxlY3RvcmFsLWRpc3RyaWN0cyc7XG4gICAgdGhpcy5mZXRjaERhdGFGcm9tU2VydmVyKHBvc3RhbFVSTCwgdGhpcy5zZXRTZWFyY2hSaWRpbmcpXG4gIH0sXG5cbiAgc2V0U2VhcmNoUmlkaW5nOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIHBhcnNlZERhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgIGFwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHRoaXMuc3RhdGUuYXBwKTtcbiAgICAgIGFwcFN0YXRlLnNlYXJjaC5yaWRpbmcgPSBwYXJzZWREYXRhW1wiYm91bmRhcmllc19jb25jb3JkYW5jZVwiXVswXVtcIm5hbWVcIl07XG4gICAgdGhpcy5zZXRTdGF0ZSh7YXBwOiBhcHBTdGF0ZX0pO1xuICB9LFxuXG4gIG9uU2VhcmNoQ2hhbmdlOiBmdW5jdGlvbihldmVudCkge1xuICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB0aGUgbWF4IGlzIGdyZWF0ZXIgdGhhbiB0aGUgbnVtYmVyIG9mIHJlc3VsdHMgLSBpZiBzbywgcmVkdWNlIGl0XG4gICAgdmFyIG1heCA9IHRoaXMuc3RhdGUuYXBwLnNlYXJjaC5tYXg7XG4gICAgdmFyIG51bSA9IHRoaXMuZmlsdGVyUG9saXRpY2lhbnMoKS5sZW5ndGg7XG4gICAgaWYgKG51bSA8IG1heCkge1xuICAgICAgbWF4ID0gbnVtO1xuICAgICAgaWYgKG1heCA8IDEwKSB7XG4gICAgICAgIG1heCA9IDEwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzZWFyY2hWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblxuICAgIC8vIHBvc3RhbCBjb2RlIHRlc3RcbiAgICB2YXIgcG9zdGFsUmVnRXggPSBuZXcgUmVnRXhwKFwiXltBQkNFR0hKS0xNTlBSU1RWWFlhYmNlZ2hqa2xtbnByc3R2eHldezF9XFxcXGR7MX1bQS1aYS16XXsxfSAqXFxcXGR7MX1bQS1aYS16XXsxfVxcXFxkezF9JFwiLCBcImlcIik7XG4gICAgaWYgKHBvc3RhbFJlZ0V4LnRlc3Qoc2VhcmNoVmFsdWUpKSB7XG4gICAgICB0aGlzLmdldFNlYXJjaFJpZGluZyhzZWFyY2hWYWx1ZSk7XG4gICAgfVxuICAgIC8vIG90aGVyd2lzZSwgbm9ybWFsIHN0YXRlIGNoYW5nZVxuICAgIGVsc2Uge1xuICAgICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgaWYgKHNlYXJjaFZhbHVlID09ICcnKSB7XG4gICAgICAgIGFwcFN0YXRlLnNlYXJjaC5pc1NlYXJjaGluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFwcFN0YXRlLnNlYXJjaC5pc1NlYXJjaGluZyA9IHRydWU7XG4gICAgICB9XG4gICAgICBhcHBTdGF0ZS5zZWFyY2guc2VhcmNoVmFsdWUgPSBzZWFyY2hWYWx1ZTtcbiAgICAgIGFwcFN0YXRlLnNlYXJjaC5tYXggPSBtYXg7XG4gICAgICBhcHBTdGF0ZS5zZWFyY2gucmlkaW5nID0gJyc7XG4gICAgICB0aGlzLnNldFN0YXRlKHthcHA6IGFwcFN0YXRlfSk7XG4gICAgfVxuICB9LFxuICBvblNlYXJjaFNjcm9sbDogZnVuY3Rpb24odGhpbmdvbmUsIHRoaW5ndHdvKSB7XG4gICAgdmFyIHNjcm9sbFRvcCA9IHRoaW5nb25lLmdldERPTU5vZGUoKS5zY3JvbGxUb3A7XG4gICAgdmFyIGhlaWdodCA9IHRoaW5nb25lLmdldERPTU5vZGUoKS5zY3JvbGxIZWlnaHQ7XG4gICAgdmFyIGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdmFyIG1heCA9IHRoaXMuc3RhdGUuYXBwLnNlYXJjaC5tYXg7XG4gICAgaWYgKChoICsgc2Nyb2xsVG9wICsgMTAwKSA+IGhlaWdodCkge1xuICAgICAgdmFyIG51bSA9IHRoaXMuZmlsdGVyUG9saXRpY2lhbnMoKS5sZW5ndGg7XG4gICAgICBpZiAobWF4IDwgbnVtKSB7XG4gICAgICAgIGFwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHRoaXMuc3RhdGUuYXBwKTtcbiAgICAgICAgICBhcHBTdGF0ZS5zZWFyY2gubWF4ID0gbWF4ICsgMTA7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FwcCA6IGFwcFN0YXRlfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGZpbHRlclBvbGl0aWNpYW5zOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZmlsdGVyZWRMaXN0ID0gdGhpcy5zdGF0ZS5hcHAucG9saXRpY2lhbkxpc3QuZmlsdGVyKGZ1bmN0aW9uIChwb2wpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9sLnNlc3Npb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAocG9sLnNlc3Npb25zW2ldID09IHRoaXMuc3RhdGUuYXBwLnNlc3Npb25zW2pdKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIGlmICh0aGlzLnN0YXRlLmFwcC5zZWFyY2guaXNTZWFyY2hpbmcgJiYgdGhpcy5zdGF0ZS5hcHAuc2VhcmNoLnNlYXJjaFZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5hcHAuc2VhcmNoLnJpZGluZyAhPSAnJykge1xuICAgICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKHRoaXMuc3RhdGUuYXBwLnNlYXJjaC5yaWRpbmcsIFwiaVwiKTtcbiAgICAgICAgdmFyIGZpbHRlcmVkTGlzdCA9IGZpbHRlcmVkTGlzdC5maWx0ZXIoZnVuY3Rpb24gKHBvbCkge1xuICAgICAgICAgIHBvbC5yaWRpbmcgPSB0aGlzLnN0YXRlLmFwcC5yaWRpbmdzTGlzdFtwb2wucmlkaW5nc1swXV0ubmFtZTtcbiAgICAgICAgICByZXR1cm4gcG9sLnJpZGluZy5zZWFyY2gocmVnZXgpID4gLTE7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICB9XG4gICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKHRoaXMuc3RhdGUuYXBwLnNlYXJjaC5zZWFyY2hWYWx1ZSwgXCJpXCIpO1xuICAgICAgdmFyIGZpbHRlcmVkTGlzdCA9IGZpbHRlcmVkTGlzdC5maWx0ZXIoZnVuY3Rpb24gKHBvbCkge1xuICAgICAgICBwb2wucGFydHlOYW1lID0gdGhpcy5zdGF0ZS5hcHAucGFydGllc0xpc3RbcG9sLnBhcnRpZXNbMF1dLm5hbWU7XG4gICAgICAgIHBvbC5wYXJ0eVNsdWcgPSB0aGlzLnN0YXRlLmFwcC5wYXJ0aWVzTGlzdFtwb2wucGFydGllc1swXV0uc2x1ZztcbiAgICAgICAgcG9sLnJpZGluZyA9IHRoaXMuc3RhdGUuYXBwLnJpZGluZ3NMaXN0W3BvbC5yaWRpbmdzWzBdXS5uYW1lO1xuICAgICAgICByZXR1cm4gcG9sLm5hbWUuc2VhcmNoKHJlZ2V4KSA+IC0xIHx8IHBvbC5wYXJ0eU5hbWUuc2VhcmNoKHJlZ2V4KSA+IC0xIHx8IHBvbC5wYXJ0eVNsdWcuc2VhcmNoKHJlZ2V4KSA+IC0xIHx8IHBvbC5yaWRpbmcuc2VhcmNoKHJlZ2V4KSA+IC0xICB8fCBwb2wucmlkaW5nLnNlYXJjaChyZWdleCkgPiAtMTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXJlZExpc3Q7XG4gIH0sXG5cbiAgc2Vzc2lvblRvZ2dsZTogZnVuY3Rpb24oc2Vzc2lvbk51bWJlcikge1xuICAgIGNvbnNvbGUubG9nKCd0b2dnbGVkJyk7XG4gICAgY29uc29sZS5sb2coc2Vzc2lvbk51bWJlcik7XG4gICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnMubGVuZ3RoKTtcblxuICAgIHZhciBuZXdTZXNzaW9ucyA9IFtdO1xuICAgIHZhciAkaW5BcnJheSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnN0YXRlLmFwcC5zZXNzaW9ucy5sZW5ndGggPT0gMSkge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuYXBwLnNlc3Npb25zWzBdID09IHNlc3Npb25OdW1iZXIpIHtcbiAgICAgICAgbmV3U2Vzc2lvbnMgPSBbc2Vzc2lvbk51bWJlcl07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbmV3U2Vzc2lvbnMucHVzaCh0aGlzLnN0YXRlLmFwcC5zZXNzaW9uc1swXSk7XG4gICAgICAgIG5ld1Nlc3Npb25zLnB1c2goc2Vzc2lvbk51bWJlcik7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZm9yIChpPTA7aTx0aGlzLnN0YXRlLmFwcC5zZXNzaW9ucy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFwcC5zZXNzaW9uc1tpXSE9c2Vzc2lvbk51bWJlcikge1xuICAgICAgICAgIG5ld1Nlc3Npb25zLnB1c2godGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICRpbkFycmF5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCEkaW5BcnJheSkge1xuICAgICAgICBuZXdTZXNzaW9ucy5wdXNoKHNlc3Npb25OdW1iZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICBhcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZSh0aGlzLnN0YXRlLmFwcCk7XG4gICAgICBhcHBTdGF0ZS5zZXNzaW9ucyA9IG5ld1Nlc3Npb25zO1xuICAgIHRoaXMuc2V0U3RhdGUoe2FwcDogYXBwU3RhdGV9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsb2FkaW5nID0gKHRoaXMuc3RhdGUuYXBwLnZvdGUuaXNMb2FkaW5nKSA/IFwibG9hZGluZ1wiIDogXCJsb2FkZWRcIjtcbiAgICB2YXIgZmlsdGVyZWRQb2xpdGljaWFuTGlzdCA9IHRoaXMuZmlsdGVyUG9saXRpY2lhbnMoKS5zbGljZSgwLCB0aGlzLnN0YXRlLmFwcC5zZWFyY2gubWF4KTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3ggc2VhcmNoXCI+XG4gICAgICAgIDxTZWFyY2hCb3hcbiAgICAgICAgICBib3g9e3RoaXMuc3RhdGUuYXBwLmJveH0gLy90ZW1wXG4gICAgICAgICAgcG9saXRpY2lhbkxpc3Q9e2ZpbHRlcmVkUG9saXRpY2lhbkxpc3R9XG4gICAgICAgICAgcGFydGllc0xpc3Q9e3RoaXMuc3RhdGUuYXBwLnBhcnRpZXNMaXN0fVxuICAgICAgICAgIHJpZGluZ3NMaXN0PXt0aGlzLnN0YXRlLmFwcC5yaWRpbmdzTGlzdH1cbiAgICAgICAgICBzZXNzaW9uc0xpc3Q9e3RoaXMuc3RhdGUuYXBwLnNlc3Npb25zTGlzdH1cbiAgICAgICAgICBzZXNzaW9ucz17dGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnN9XG4gICAgICAgICAgc2VhcmNoPXt0aGlzLnN0YXRlLmFwcC5zZWFyY2h9XG4gICAgICAgICAgb25TZWFyY2hTY3JvbGw9e3RoaXMub25TZWFyY2hTY3JvbGx9XG4gICAgICAgICAgb25TZWFyY2hDaGFuZ2U9e3RoaXMub25TZWFyY2hDaGFuZ2V9XG4gICAgICAgICAgc2Vzc2lvblRvZ2dsZT17dGhpcy5zZXNzaW9uVG9nZ2xlfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgXG59KTtcblxuUmVhY3QucmVuZGVyKFxuICA8QXBwIC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpXG4pOyJdfQ==
