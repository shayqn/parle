(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./InfoText.js":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
/** @jsx React.DOM */

var BillSearch = React.createClass({displayName: "BillSearch",
  render: function() {
    return (
      React.createElement("div", {className: "billSearch"}, 
        React.createElement("form", null, 
          React.createElement("input", {type: "search", placeholder: "Search bills by name or number...", onChange: this.props.onBillSearchChange})
        )
      )
      
    );
  }
});

module.exports = BillSearch;

},{}],4:[function(require,module,exports){
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

},{"./VoteRow.js":6}],5:[function(require,module,exports){
/** @jsx React.DOM */
var BillStack = require('./BillStack.js');
var BillSearch = require('./BillSearch.js');
var ProfileBox = React.createClass({displayName: "ProfileBox",
  render: function() {
    var classes = 'profileBox ' + this.props.box;
    var closeClass = 'close ' + this.props.box;
    if (this.props.profile) {
      var partyName = this.props.getters[1](this.props.profile.parties[0]);
      var ridingName = this.props.getters[2](this.props.profile.ridings[0]);
    }
    else {
      var partyName = '';
      var ridingName = '';
    }
    return (
      React.createElement("div", {className: classes}, 
        React.createElement("div", {className: "profileHeader"}, 
          React.createElement("a", {className: "return", href: "/#/"}, React.createElement("div", {className: "icon"}), React.createElement("span", null, "return to MP search")), 
          React.createElement("a", {className: closeClass, href: "/#/"}), 
          React.createElement("h2", {className: "name"}, this.props.profile.name), 
          React.createElement("span", {className: "info"}, React.createElement("h3", {className: "riding"}, ridingName), React.createElement("h3", {className: "party"}, partyName)), 
          React.createElement(BillSearch, {onBillSearchChange: this.props.onBillSearchChange})
      ), 
      React.createElement(BillStack, {
        votes: this.props.votes, 
        getBillInfo: this.props.getBillInfo, 
        currentVote: this.props.currentVote, 
        billInfo: this.props.billInfo, 
        getPolitician: this.props.getPolitician})
      )
    );
  },
});

module.exports = ProfileBox;

},{"./BillSearch.js":3,"./BillStack.js":4}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
/** @jsx React.DOM */

var SearchStack = require('./SearchStack.js');
var SessionSelector = require('./SessionSelector.js');
SearchBox = React.createClass({displayName: "SearchBox",
  render: function() {
    var classes = 'searchBox ' + this.props.box; //temp
    var noscrollClasses = 'searchBox-noscroll ' + this.props.box; //temp
    return (
      React.createElement("div", {className: noscrollClasses}, 
        React.createElement("div", {className: classes, onScroll: this.props.onSearchScroll.bind(null, this)}, 
          React.createElement("div", {className: "topLinks"}, React.createElement("a", {href: "/#/info", className: "info"}), React.createElement("a", {href: "https://github.com/shayqn/parle", className: "github"})), 
          React.createElement("div", {className: "searchForm"}, 
            React.createElement("input", {type: "search", placeholder: "Search...", onChange: this.props.onSearchChange}), 
            React.createElement("button", {type: "submit"}, "Search"), 
            React.createElement("span", null, "by name, riding, or postal code")
          ), 
          React.createElement("div", {className: "searchContent"}, 
            React.createElement(SearchStack, {
              box: this.props.box, 
              politicians: this.props.politicianList, 
              currentProfileID: this.props.currentProfileID, 
              searching: this.props.search.isSearching, 
              sessionsList: this.props.sessionsList, 
              currentSessions: this.props.sessions, 
              sessionToggle: this.props.sessionToggle, 
              expandSessions: this.props.expandSessions, 
              expandState: this.props.expandState, 
              getters: this.props.getters})
          )
        )
      )
    );
  }
});
module.exports = SearchBox;

},{"./SearchStack.js":8,"./SessionSelector.js":10}],8:[function(require,module,exports){
/** @jsx React.DOM */

var SearchStack = React.createClass({displayName: "SearchStack",
  render: function() {
    classString = "searchStack";
    var currentProfileID = this.props.currentProfileID;
    var politicianNodes = [];
    var getPoliticianByID = this.props.getters[0];
    var getPartyByID = this.props.getters[1];
    var getRidingByID = this.props.getters[2];
    if (this.props.politicians.length > 0) {
      politicianNodes = this.props.politicians.map(function (politician, i) {
        var headshot = politician.headshot.split('/').pop();
        var imgURL = "url('/static/headshots/" + headshot + "')";
        var classString = '';
        if (politician.id == currentProfileID) {
          classString += 'active ';
        }
        if ((politician.id == currentProfileID)&&(this.props.box == 'profile')) {
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
          React.createElement("a", {className: classString, href: href, key: i}, 
            React.createElement("div", {style: {backgroundImage: imgURL}}), 
            React.createElement("h3", null, politician.name), 
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
        React.createElement(SessionSelector, {
         sessionsList: this.props.sessionsList, 
         currentSessions: this.props.currentSessions, 
         sessionToggle: this.props.sessionToggle, 
         expandSessions: this.props.expandSessions, 
          expandState: this.props.expandState}), 
        React.createElement("h2", null, "Members of Parliament", React.createElement("span", {className: "leaf"})), 
        politicianNodes
      )
    );
  }
});

module.exports = SearchStack;

},{}],9:[function(require,module,exports){
/** @jsx React.DOM */

SessionButton = React.createClass({displayName: "SessionButton",
	render: function() {
		var className = "sessionButton";
		var sessionNumber = this.props.sessionNumber;
		for (i=0;i<this.props.currentSessions.length;i++) {
			if (sessionNumber == this.props.currentSessions[i]) {
				className += " active";
			}
		}
		return (
			React.createElement("a", {onClick: this.props.sessionToggle.bind(null, sessionNumber)}, 
				React.createElement("div", {className: className, key: this.props.key}, 
					sessionNumber
				)
			)
		);
	}
});
module.exports = SessionButton;

},{}],10:[function(require,module,exports){
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
		var className = "sessionsSelector " + this.props.expandState;
		return (
			React.createElement("div", {className: className}, 
				React.createElement("h2", null, "Sessions"), 
				React.createElement("div", {className: "buttons"}, sessionButtons.reverse()), 
				React.createElement("div", {className: "expandSessions", onClick: this.props.expandSessions})
			)
		);
	}
});
module.exports = SessionSelector;

},{"./SessionButton.js":9}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"./BillText.js":11}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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
  filterVotes: function() {
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
    var loading = (this.state.app.vote.isLoading) ? "loading" : "loaded";
    var filteredPoliticianList = this.filterPoliticians().slice(0, this.state.app.search.max);
    var currentProfile = this.getPoliticianByID(this.state.app.profile.id);
    var getters = [this.getPoliticianByID,this.getPartyByID,this.getRidingByID];
    var votes = this.filterVotes();
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
          sessionToggle: this.sessionToggle, 
          expandSessions: this.expandSessions, 
          expandState: this.state.app.expandState, 
          getters: getters, 
          currentProfileID: this.state.app.profile.id}), 
        React.createElement(ProfileBox, {
          box: this.state.app.box, //temp
          getters: getters, 
          profile: currentProfile, 
          votes: votes, 
          currentVote: this.state.app.vote, 
          onBillSearchChange: this.onBillSearchChange, 
          getBillInfo: this.getBillInfo, 
          billInfo: this.state.billInfo, 
          getPolitician: this.getPolitician})
      )
    );
  },

  getBillInfo: function(object, event) {
    //console.log("invoked"); 
    //console.log(object);
    //console.log(event);
    if (object.props.vote.votequestion_id == this.state.app.vote.id) {
      appState = this.cloneAppState(this.state.app);
        appState.vote.id = 0;
        appState.vote.votes = {};
      this.setState({app: appState});
    }
    else {
      appState = this.cloneAppState(this.state.app);
        appState.vote.id = object.props.vote.votequestion_id;
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
  React.createElement(App, null),
  document.getElementById('content')
);

},{"./boxes/info/InfoBox.js":1,"./boxes/profile/ProfileBox.js":5,"./boxes/search/SearchBox.js":7,"./boxes/text/TextBox.js":12,"./elements/ArrowIcon.js":13}]},{},[14]);
