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

    var newSessions = [];
    var $inArray = false;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9Cb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9UZXh0LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU2VhcmNoLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU3RhY2suanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1Byb2ZpbGVCb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1ZvdGVSb3cuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9zZWFyY2gvU2VhcmNoQm94LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvc2VhcmNoL1NlYXJjaFN0YWNrLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvc2VhcmNoL1Nlc3Npb25CdXR0b24uanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9zZWFyY2gvU2Vzc2lvblNlbGVjdG9yLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvdGV4dC9CaWxsVGV4dC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2JveGVzL3RleHQvVGV4dEJveC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2VsZW1lbnRzL0Fycm93SWNvbi5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL3BhcmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUJBQXFCOztBQUVyQixJQUFJLFFBQVEsR0FB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R0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNoRSxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzdELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7T0FDL0ssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUNmO0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDeEIsR0FBRzs7RUFFRCxhQUFhLEVBQUUsU0FBUyxhQUFhLEVBQUU7SUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7O0lBRTNCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUNyQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDckIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFO01BQzdDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRTtRQUM3QyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQzlDO1dBQ0k7UUFDSCxRQUFRLEdBQUcsSUFBSSxDQUFDO09BQ2pCO0tBQ0Y7SUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFO01BQ2IsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUNqQztJQUNELFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDNUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7SUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ25DLEdBQUc7O0VBRUQsTUFBTSxFQUFFLFdBQVc7SUFDakIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDckUsSUFBSSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxRjtNQUNFLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsWUFBYSxDQUFBLEVBQUE7UUFDMUIsb0JBQUMsU0FBUyxFQUFBLENBQUE7VUFDUixHQUFBLEVBQUcsQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUM7VUFDeEIsY0FBQSxFQUFjLENBQUUsc0JBQXNCLEVBQUM7VUFDdkMsV0FBQSxFQUFXLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFDO1VBQ3hDLFdBQUEsRUFBVyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBQztVQUN4QyxZQUFBLEVBQVksQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUM7VUFDMUMsUUFBQSxFQUFRLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDO1VBQ2xDLE1BQUEsRUFBTSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBQztVQUM5QixjQUFBLEVBQWMsQ0FBRSxJQUFJLENBQUMsY0FBYyxFQUFDO1VBQ3BDLGNBQUEsRUFBYyxDQUFFLElBQUksQ0FBQyxjQUFjLEVBQUM7VUFDcEMsYUFBQSxFQUFhLENBQUUsSUFBSSxDQUFDLGFBQWMsQ0FBQSxDQUFHLENBQUE7TUFDbkMsQ0FBQTtNQUNOO0FBQ04sR0FBRzs7QUFFSCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxLQUFLLENBQUMsTUFBTTtFQUNWLG9CQUFDLEdBQUcsRUFBQSxJQUFBLENBQUcsQ0FBQTtFQUNQLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO0NBQ25DIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgSW5mb1RleHQgPSByZXF1aXJlKCcuL0luZm9UZXh0LmpzJyk7XG52YXIgSW5mb0JveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgY29tcG9uZW50V2lsbFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBpZiAoKG5leHRQcm9wcy5ib3ggPT0gJ2luZm8nKSAmJiAodGhpcy5wcm9wcy5ib3ggIT0gJ3NlYXJjaCcpKSB7XG4gICAgICB0aGlzLmJhY2sgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuYmFjayA9IGZhbHNlO1xuICAgIH1cbiAgfSxcbiAgZ29CYWNrOiBmdW5jdGlvbihlKSB7XG4gICAgaWYgKHRoaXMuYmFjaykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICdpbmZvQm94ICcgKyB0aGlzLnByb3BzLmJveDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9PjxkaXYgY2xhc3NOYW1lPVwiY2xvc2VDb250YWluZXJcIj48YSBocmVmPVwiLyMvXCIgb25DbGljaz17dGhpcy5nb0JhY2t9PjwvYT48L2Rpdj48SW5mb1RleHQgLz48L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbmZvQm94OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgSW5mb1RleHQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJpbmZvVGV4dFwiPlxuICAgICAgPGgyPmFib3V0IHZvdGVzLm1wPC9oMj5cbiAgICAgIDxwPkRlbW9jcmFjaWVzIGFyZSBkZWZpbmVkIGJ5IHRoZSBsYXdzIHRoYXQgdGhleSBwYXNzLCBhbmQgdGhlIGxhd3MgdGhhdCBwYXNzIGFyZSBkZXRlcm1pbmVkIGJ5IHRoZSByZXByZXNlbnRhdGl2ZXMgd2UgZWxlY3QuIEluIG9yZGVyIHRvIGFjY3VyYXRlbHkgZXZhbHVhdGUgd2hldGhlciBvdXIgZWxlY3RlZCBtZW1iZXJzIG9mIHBhcmxpYW1lbnQgYXJlIGFwcHJvcHJpYXRlbHkgcmVwcmVzZW50aW5nIHRoZWlyIGVsZWN0b3JhdGUsIHRoZSBtb3N0IHBlcnRpbmVudCBpbmZvcm1hdGlvbiB3ZSBoYXZlIGlzIHRoZWlyIHZvdGluZyBoaXN0b3J5OiB3aGljaCBiaWxscyBoYXZlIHRoZXkgdm90ZWQgZm9yLCB3aGljaCBoYXZlIHRoZXkgdm90ZWQgYWdhaW5zdCwgYW5kIHdoaWNoIGhhdmUgdGhleSBhYnN0YWluZWQgZnJvbSB2b3Rpbmcgb24uIDwvcD5cbiAgICAgIDxwPldoaWxlIHRoaXMgaW5mb3JtYXRpb24gaXMgbWFkZSBwdWJsaWNseSBhdmFpbGFibGUgdG8gYWxsIENhbmFkaWFucywgd2Ugbm90aWNlZCB0aGF0IGl0IGNhbiBiZSBzbG93IGFuZCBkaWZmaWN1bHQgdG8gcGFyc2UuIEV2ZXJ5IGJpbGwgaXMgdm90ZWQgb24gbXVsdGlwbGUgdGltZXMgLSBzb21ldGltZXMgdG8gcGFzcyBhbWVuZG1lbnRzLCBzb21ldGltZXMgZXZlbiBqdXN0IHRvIHZvdGUgb24gd2hldGhlciBvciBub3QgaXQgd2lsbCBiZSBkaXNjdXNzZWQuIFVubGVzcyB5b3UgYXJlIGFibGUgdG8gZGVkaWNhdGUgc2lnbmlmaWNhbnQgdGltZSBhbmQgZWZmb3J0IGludG8gYmVjb21pbmcgd2VsbC12ZXJzZWQgb24gdGhlIGRldGFpbHMgb2YgZWFjaCBiaWxsLCBhdHRlbXB0aW5nIHRvIGFuYWx5emUgdGhlIHZvdGVzIGEgcG9saXRpY2lhbiBtYWtlcyBjYW4gYmUgbW9yZSBjb25mdXNpbmcgdGhhbiBpbmZvcm1hdGl2ZS48L3A+XG4gICAgICA8cD5BcyBlbmdhZ2VkIGNpdGl6ZW5zIHdobyBhcmUgbm90IGNhcGFibGUgb2YgYmVpbmcgaW50aW1hdGVseSBmYW1pbGlhciB3aXRoIHRoZSBkZXRhaWxzIGFuZCBwcm9ncmVzcyBvZiBldmVyeSBiaWxsLCB3aGF0IHdlIHdhbnRlZCB0byBrbm93IHdhcyB0aGlzOiBhZnRlciBhbGwgdGhlIGFtZW5kbWVudHMgYW5kIGVkaXRzLCBkaWQgdGhlIHBvbGl0aWNpYW4gdm90ZSB0byBtYWtlIHRoZSBmaW5hbCBiaWxsIGEgbGF3IG9yIG5vdD8gPC9wPlxuICAgICAgPHA+VGhhdCBpcyB3aGF0IHRoaXMgd2Vic2l0ZSBwcm92aWRlczogZm9yIGV2ZXJ5IG1lbWJlciBvZiBwYXJsaWFtZW50LCBpdCByZXR1cm5zIG9ubHkgdGhlIHZvdGVzIHRoYXQgY29ycmVzcG9uZCB0byB0aGVpciBmaW5hbCB2b3RlIG9uIGEgYmlsbCBhcyB3ZWxsIGFzIHdoZXRoZXIgb3Igbm90IHRoZSBiaWxsIHdhcyBzdWNjZXNzZnVsbHkgcGFzc2VkIGludG8gbGF3LjwvcD5cbiAgICAgIDxwPldlIGhvcGUgdGhhdCB0aGlzIHByb3ZpZGVzIGFuIGVhc3kgYWRkaXRpb25hbCBhdmVudWUgZm9yIGV2YWx1YXRpbmcgdGhlIHBlcmZvcm1hbmNlIG9mIG91ciBlbGVjdGVkIG1lbWJlcnMgb2YgcGFybGlhbWVudCBhbmQgZGV0ZXJtaW5pbmcgdGhlaXIgZWZmZWN0aXZlbmVzcyBpbiByZXByZXNlbnRpbmcgb3VyIHZpZXdzLjwvcD5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdpdGh1YkxpbmtcIj48YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3NoYXlxbi9wYXJsZVwiPnZpZXcgcHJvamVjdCBvbiBnaXRodWI8L2E+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3JlZGl0V2hlcmVDcmVkaXRzRHVlXCI+c3BlY2lhbCB0aGFua3MgdG8gPGEgaHJlZj1cImh0dHBzOi8vb3BlbnBhcmxpYW1lbnQuY2FcIj5vcGVucGFybGlhbWVudC5jYTwvYT4gZm9yIHByb3ZpZGluZyBhbGwgdGhlIGRhdGE8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBJbmZvVGV4dDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEJpbGxTZWFyY2ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2Vzc2lvbiA9PSAnJykge1xuICAgICAgdmFyIHNlbGVjdFRleHQgPSAnYW55IHNlc3Npb24nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBzZWxlY3RUZXh0ID0gdGhpcy5wcm9wcy5zZXNzaW9uO1xuICAgIH1cbiAgICB2YXIgc2Vzc2lvbnNWb3RlcyA9IHRoaXMucHJvcHMuc2Vzc2lvbnNWb3RlcztcbiAgICB2YXIgdG9nZ2xlQ2xhc3MgPSAnc2Vzc2lvblNlbGVjdCcgKyAodGhpcy5wcm9wcy5zZXNzaW9uVG9nZ2xlID8gJycgOiAnIGNvbGxhcHNlZCcpO1xuICAgIHZhciBvYmplY3ROb2RlcyA9IHRoaXMucHJvcHMuc2Vzc2lvbnNMaXN0Lm1hcChmdW5jdGlvbiAob2JqZWN0LCBpKSB7XG4gICAgICAgIHZhciBzdW0gPSBzZXNzaW9uc1ZvdGVzW29iamVjdC5pZF07XG4gICAgICAgIGlmIChzdW0pIHtcbiAgICAgICAgICB2YXIgc3RyaW5nID0gb2JqZWN0LmlkICsgJyAtICgnICsgc3VtICsgJyknO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy5wcm9wcy5vblNlc3Npb25TZWxlY3QuYmluZChudWxsLG9iamVjdCl9IGtleT17aX0+PHNwYW4gY2xhc3NOYW1lPVwic2Vzc2lvblwiPntvYmplY3QuaWR9PC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJzdW1cIj57c3VtfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJpbGxTZWFyY2hcIj5cbiAgICAgICAgPGZvcm0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBiaWxscyBieSBuYW1lIG9yIG51bWJlci4uLlwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQmlsbFNlYXJjaENoYW5nZX0gLz4gIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0b2dnbGVDbGFzc30+ICAgIFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNlbGVjdFwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0VG9nZ2xlfT57c2VsZWN0VGV4dH08L3NwYW4+ICBcbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwic2Vzc2lvbk9wdGlvblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0LmJpbmQobnVsbCwnJyl9PjxzcGFuIGNsYXNzTmFtZT1cInNlc3Npb25cIj5hbnkgc2Vzc2lvbjwvc3Bhbj4gPHNwYW4gY2xhc3NOYW1lPVwic3VtXCI+e3Nlc3Npb25zVm90ZXNbJ3N1bSddfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICAge29iamVjdE5vZGVzfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmlsbFNlYXJjaDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFZvdGVSb3cgPSByZXF1aXJlKCcuL1ZvdGVSb3cuanMnKTtcbnZhciBCaWxsU3RhY2sgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnRWb3RlID0gdGhpcy5wcm9wcy5jdXJyZW50Vm90ZTtcbiAgICB2YXIgZ2V0QmlsbEluZm8gPSB0aGlzLnByb3BzLmdldEJpbGxJbmZvO1xuICAgIHZhciB2b3RlUm93cyA9IFtdO1xuICAgIHZhciBsb2FkZXIgPSBudWxsO1xuICAgIGlmICh0aGlzLnByb3BzLnZvdGVzLmxlbmd0aCAgPiAwKSB7XG4gICAgICB2YXIgZ2V0QmlsbFRleHQgPSB0aGlzLnByb3BzLmdldEJpbGxUZXh0O1xuICAgICAgdm90ZVJvd3MgPSB0aGlzLnByb3BzLnZvdGVzLm1hcChmdW5jdGlvbiAob2JqZWN0LCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPFZvdGVSb3dcbiAgICAgICAgICAgIGtleSA9IHtpfVxuICAgICAgICAgICAgdm90ZSA9IHtvYmplY3R9XG4gICAgICAgICAgICBjdXJyZW50Vm90ZSA9IHtjdXJyZW50Vm90ZX1cbiAgICAgICAgICAgIG9uQ2xpY2sgPSB7Z2V0QmlsbEluZm99XG4gICAgICAgICAgICBiaWxsSW5mbyA9IHt0aGlzLnByb3BzLmJpbGxJbmZvfVxuICAgICAgICAgICAgZ2V0UG9saXRpY2lhbiA9IHt0aGlzLnByb3BzLmdldFBvbGl0aWNpYW59IC8+XG4gICAgICAgICk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnByb3BzLnJldHJpZXZpbmdWb3Rlcykge1xuICAgICAgXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgdmFyIGVtcHR5Um93ID0gKFxuICAgICAgICAgIDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJ2b3RlUm93IHJvdyBlbXB0eVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWluIHJvd1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgbGVmdFwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzZXNzaW9uXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIG51bWJlclwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCB2b3RlIGZ1bGwtbGF5b3V0XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNob3J0bmFtZVwiPjxzcGFuPm5vIHJlc3VsdDwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgdm90ZSBtb2JpbGUtb25seVwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsYXdcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgZHJvcGRvd25cIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIHJpZ2h0XCI+PC9kaXY+IFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICAgIHZvdGVSb3dzLnB1c2goZW1wdHlSb3cpO1xuICAgICAgfVxuICAgICAgbG9hZGVyID0gPGRpdiBjbGFzc05hbWU9XCJsb2FkZXItY29udGFpbmVyXCI+PGRpdiBjbGFzc05hbWU9XCJsb2FkZXJcIj48L2Rpdj48L2Rpdj47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5vUmVzdWx0c1JvdyA9IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZvdGVSb3cgcm93IG5vcmVzdWx0c1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWluIHJvd1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj48c3Bhbj5ubyByZXN1bHRzIGZvdW5kPC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXJcIj48L2Rpdj4gXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgIHZvdGVSb3dzLnB1c2gobm9SZXN1bHRzUm93KTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSd2b3Rlcyc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiaWxsU3RhY2snPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciBsZWZ0XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNlc3Npb25cIj5TZXNzaW9uPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIG51bWJlclwiPk51bWJlcjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCB2b3RlIGZ1bGwtbGF5b3V0XCI+Vm90ZTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzaG9ydG5hbWVcIj5OYW1lPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHZvdGUgbW9iaWxlLW9ubHlcIj5Wb3RlPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGxhd1wiPkxhdzwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBkcm9wZG93blwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgcmlnaHRcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3ZvdGVSb3dzfVxuICAgICAgICAgICAge2xvYWRlcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApOyAgICAgICAgXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbGxTdGFjazsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBCaWxsU3RhY2sgPSByZXF1aXJlKCcuL0JpbGxTdGFjay5qcycpO1xudmFyIEJpbGxTZWFyY2ggPSByZXF1aXJlKCcuL0JpbGxTZWFyY2guanMnKTtcbnZhciBQcm9maWxlQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjbGFzc2VzID0gJ3Byb2ZpbGVCb3ggJyArIHRoaXMucHJvcHMuYm94O1xuICAgIHZhciBjbG9zZUNsYXNzID0gJ2Nsb3NlICcgKyB0aGlzLnByb3BzLmJveDtcbiAgICBpZiAoIXRoaXMucHJvcHMucHJvZmlsZS5wYXJ0eV9zbHVnKSB7XG4gICAgICB2YXIgcGFydHlOYW1lID0gdGhpcy5wcm9wcy5wcm9maWxlLnBhcnR5X25hbWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHBhcnR5TmFtZSA9IHRoaXMucHJvcHMucHJvZmlsZS5wYXJ0eV9zbHVnO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGVIZWFkZXJcIj5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJyZXR1cm5cIiBocmVmPVwiLyMvXCI+PGRpdiBjbGFzc05hbWUgPVwiaWNvblwiPjwvZGl2PjxzcGFuPnJldHVybiB0byBNUCBzZWFyY2g8L3NwYW4+PC9hPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT17Y2xvc2VDbGFzc30gaHJlZj1cIi8jL1wiPjwvYT5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwibmFtZVwiPnt0aGlzLnByb3BzLnByb2ZpbGUubmFtZX08L2gyPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImluZm9cIj48aDMgY2xhc3NOYW1lPVwicmlkaW5nXCI+e3RoaXMucHJvcHMucHJvZmlsZS5yaWRpbmd9PC9oMz48aDMgY2xhc3NOYW1lPVwicGFydHlcIj57cGFydHlOYW1lfTwvaDM+PC9zcGFuPlxuICAgICAgICAgIDxCaWxsU2VhcmNoIFxuICAgICAgICAgICAgb25CaWxsU2VhcmNoQ2hhbmdlPXt0aGlzLnByb3BzLm9uQmlsbFNlYXJjaENoYW5nZX1cbiAgICAgICAgICAgIG9uU2Vzc2lvblNlbGVjdFRvZ2dsZT17dGhpcy5wcm9wcy5vblNlc3Npb25TZWxlY3RUb2dnbGV9XG4gICAgICAgICAgICBvblNlc3Npb25TZWxlY3Q9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0fVxuICAgICAgICAgICAgc2Vzc2lvbnNMaXN0PXt0aGlzLnByb3BzLnNlc3Npb25zTGlzdH1cbiAgICAgICAgICAgIHNlc3Npb25Ub2dnbGUgPSB7dGhpcy5wcm9wcy5zZXNzaW9uVG9nZ2xlfVxuICAgICAgICAgICAgc2Vzc2lvbj17dGhpcy5wcm9wcy5zZXNzaW9ufVxuICAgICAgICAgICAgc2Vzc2lvbnNWb3RlcyA9IHt0aGlzLnByb3BzLnNlc3Npb25zVm90ZXN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxCaWxsU3RhY2sgXG4gICAgICAgIHZvdGVzPXt0aGlzLnByb3BzLnZvdGVzfSBcbiAgICAgICAgcmV0cmlldmluZ1ZvdGVzPXt0aGlzLnByb3BzLnJldHJpZXZpbmdWb3Rlc31cbiAgICAgICAgZ2V0QmlsbEluZm8gPSB7dGhpcy5wcm9wcy5nZXRCaWxsSW5mb31cbiAgICAgICAgY3VycmVudFZvdGUgPSB7dGhpcy5wcm9wcy5jdXJyZW50Vm90ZX1cbiAgICAgICAgYmlsbEluZm8gPSB7dGhpcy5wcm9wcy5iaWxsSW5mb31cbiAgICAgICAgZ2V0UG9saXRpY2lhbiA9IHt0aGlzLnByb3BzLmdldFBvbGl0aWNpYW59IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvZmlsZUJveDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFZvdGVSb3cgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnZvdGUudm90ZSA9PSAnWScpIHtcbiAgICAgIHZhciB2b3RlQ2xhc3MgPSAneWVzICc7XG4gICAgICB2YXIgdm90ZVRleHQgPSAneWVzJztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5wcm9wcy52b3RlLnZvdGUgPT0gJ04nKSB7XG4gICAgICB2YXIgdm90ZUNsYXNzID0gJ25vICc7XG4gICAgICB2YXIgdm90ZVRleHQgPSAnbm8nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciB2b3RlQ2xhc3MgPSAnJztcbiAgICAgIHZhciB2b3RlVGV4dCA9ICdubyB2b3RlJztcbiAgICB9XG4gICAgdm90ZUNsYXNzICs9ICd2b3RlIGNvbCAnO1xuICAgIHZhciBtb2JpbGVWb3RlQ2xhc3MgPSB2b3RlQ2xhc3MgKyAnbW9iaWxlLW9ubHknO1xuICAgIHZvdGVDbGFzcyArPSAnZnVsbC1sYXlvdXQnXG5cbiAgICB2YXIgbGF3VGV4dCA9IHRoaXMucHJvcHMudm90ZS5sYXcgPyAneWVzJyA6ICdubyc7XG4gICAgdmFyIGxhd0NsYXNzID0gJ2NvbCBsYXcgJyArIGxhd1RleHQ7XG5cbiAgICBpZiAodGhpcy5wcm9wcy52b3RlLnNob3J0X3RpdGxlX2VuKSB7XG4gICAgICB2YXIgbmFtZSA9IHRoaXMucHJvcHMudm90ZS5zaG9ydF90aXRsZV9lbjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgbmFtZSA9IHRoaXMucHJvcHMudm90ZS5uYW1lX2VuO1xuICAgIH1cbiAgICB2YXIgdm90ZVJvd0NsYXNzID0gXCJ2b3RlUm93IHJvd1wiO1xuICAgIGlmICh0aGlzLnByb3BzLnZvdGUudm90ZXF1ZXN0aW9uX2lkID09IHRoaXMucHJvcHMuY3VycmVudFZvdGUpIHtcbiAgICAgIHZvdGVSb3dDbGFzcyArPSBcIiBjdXJyZW50XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt2b3RlUm93Q2xhc3N9IGtleT17dGhpcy5wcm9wcy5rZXl9PlxuICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGljay5iaW5kKG51bGwsIHRoaXMpfSBjbGFzc05hbWU9XCJtYWluIHJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciBsZWZ0XCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc2Vzc2lvblwiPjxzcGFuIGNsYXNzTmFtZT1cImxhYmVsIG1vYmlsZS1vbmx5XCI+U2Vzc2lvbjwvc3Bhbj57dGhpcy5wcm9wcy52b3RlLnNlc3Npb25faWR9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbnVtYmVyXCI+PHNwYW4gY2xhc3NOYW1lPVwibGFiZWwgbW9iaWxlLW9ubHlcIj5OdW1iZXI8L3NwYW4+e3RoaXMucHJvcHMudm90ZS5udW1iZXJ9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3ZvdGVDbGFzc30+PHNwYW4gY2xhc3NOYW1lPVwidm90ZVRleHRcIj57dm90ZVRleHR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNob3J0bmFtZVwiPntuYW1lfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXttb2JpbGVWb3RlQ2xhc3N9PjxzcGFuIGNsYXNzTmFtZT1cImxhYmVsIG1vYmlsZS1vbmx5XCI+Vm90ZTwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJ2b3RlVGV4dFwiPnt2b3RlVGV4dH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2xhd0NsYXNzfT48c3BhbiBjbGFzc05hbWU9XCJsYWJlbCBtb2JpbGUtb25seVwiPkxhdzwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJsYXdUZXh0XCI+e2xhd1RleHR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGRyb3Bkb3duXCI+PHNwYW4+PEFycm93SWNvbiAvPjwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgcmlnaHRcIj48L2Rpdj4gXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Vm90ZUluZm9Sb3cgXG4gICAgICAgICAgdm90ZSA9IHt0aGlzLnByb3BzLnZvdGV9XG4gICAgICAgICAgY3VycmVudFZvdGUgPSB7dGhpcy5wcm9wcy5jdXJyZW50Vm90ZX1cbiAgICAgICAgICB2b3RlUXVlc3Rpb25JRCA9IHt0aGlzLnByb3BzLnZvdGUudm90ZXF1ZXN0aW9uX2lkfVxuICAgICAgICAgIGJpbGxJbmZvID0ge3RoaXMucHJvcHMuYmlsbEluZm99XG4gICAgICAgICAgZ2V0UG9saXRpY2lhbiA9IHt0aGlzLnByb3BzLmdldFBvbGl0aWNpYW59IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbnZhciBWb3RlSW5mb1JvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5mb0NsYXNzID0gXCJyb3cgaW5mb1wiO1xuICAgIHZhciBnZXRQb2xpdGljaWFuID0gdGhpcy5wcm9wcy5nZXRQb2xpdGljaWFuO1xuICAgIHZhciBzcG9uc29yQ29tcG9uZW50ID0gbnVsbDtcbiAgICBpZiAodGhpcy5wcm9wcy52b3RlUXVlc3Rpb25JRCA9PSB0aGlzLnByb3BzLmN1cnJlbnRWb3RlKSB7XG4gICAgICBpbmZvQ2xhc3MgKz0gJyBjdXJyZW50JztcbiAgICAgIHZhciBsYXdTdHJpbmcgPSAgJ0xhdzogJyArIHRoaXMucHJvcHMubGF3VGV4dDtcbiAgICAgIHZhciB2b3RlSW5mb3JtYXRpb24gPSA8ZGl2IGNsYXNzTmFtZT1cImNvbCBiaWxsSW5mb1wiPntsYXdTdHJpbmd9PC9kaXY+XG4gICAgICBpZiAodW5kZWZpbmVkICE9IHRoaXMucHJvcHMuYmlsbEluZm8udm90ZXMpIHtcbiAgICAgICAgdmFyIHBhcnR5Vm90ZU5vZGVzID0gW107XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIG5vZGUgPSAoXG4gICAgICAgICAgPGRpdiBrZXk9ezB9IGNsYXNzTmFtZT1cInBhcnR5Vm90ZUhlYWRlclwiIGtleT17aX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj5QYXJ0eTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ5ZXNcIj5ZRVM8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9cIj5OTzwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnN0YWluXCI+QUJTVEFJTjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgICBwYXJ0eVZvdGVOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICB5ZXNDb3VudCA9IDA7XG4gICAgICAgIG5vQ291bnQgPSAwO1xuICAgICAgICBhYnN0YWluQ291bnQgPSAwO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5wcm9wcy5iaWxsSW5mby52b3Rlcykge1xuICAgICAgICAgIGkrKztcbiAgICAgICAgICB2YXIgcGFydHlOYW1lID0ga2V5O1xuICAgICAgICAgIHZhciB5ZXMgPSB0aGlzLnByb3BzLmJpbGxJbmZvLnZvdGVzW2tleV1bJ1knXTtcbiAgICAgICAgICB2YXIgbm8gPSB0aGlzLnByb3BzLmJpbGxJbmZvLnZvdGVzW2tleV1bJ04nXTtcbiAgICAgICAgICB2YXIgYWJzdGFpbiA9IHRoaXMucHJvcHMuYmlsbEluZm8udm90ZXNba2V5XVsnQSddO1xuICAgICAgICAgIHZhciBub0NsYXNzID0gXCJub1wiO1xuICAgICAgICAgIHZhciB5ZXNDbGFzcyA9IFwieWVzXCI7XG4gICAgICAgICAgdmFyIGFic3RhaW5DbGFzcyA9IFwiYWJzdGFpblwiO1xuICAgICAgICAgIHZhciBwYXJ0eUNsYXNzID0gXCJwYXJ0eVZvdGVcIjtcbiAgICAgICAgICBpZiAoKHllcyA+IGFic3RhaW4pJiYoeWVzID4gbm8pKSB7XG4gICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIHllc1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICgobm8gPiBhYnN0YWluKSAmJiAobm8gPiB5ZXMpKSB7XG4gICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIG5vXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKChhYnN0YWluID4geWVzKSAmJiAoYWJzdGFpbiA+IG5vKSkge1xuICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiBhYnN0YWluXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCh5ZXMgPT0gbm8pKSB7XG4gICAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgdGllIHluXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh5ZXM9PWFic3RhaW4pIHtcbiAgICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiB0aWUgeWFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vPT1hYnN0YWluKSB7XG4gICAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgdGllIG5hXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiB0aWVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgeWVzQ291bnQgKz0geWVzO1xuICAgICAgICAgIG5vQ291bnQgKz0gbm87XG4gICAgICAgICAgYWJzdGFpbkNvdW50ICs9IGFic3RhaW47XG4gICAgICAgICAgdmFyIG5vZGUgPSAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cGFydHlDbGFzc30ga2V5PXtpfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+e3BhcnR5TmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3llc0NsYXNzfT48c3Bhbj57eWVzfTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e25vQ2xhc3N9PjxzcGFuPntub308L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXthYnN0YWluQ2xhc3N9PjxzcGFuPnthYnN0YWlufTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgICAgcGFydHlWb3RlTm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdG90YWxDbGFzcyA9IFwicGFydHlWb3RlIHRvdGFsIFwiO1xuICAgICAgICBpZiAoeWVzQ291bnQgPiBub0NvdW50KSB7XG4gICAgICAgICAgaWYgKHllc0NvdW50ID4gYWJzdGFpbkNvdW50KSB7XG4gICAgICAgICAgICB0b3RhbENsYXNzICs9IFwiIHllc1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRvdGFsQ2xhc3MgKz0gXCIgYWJzdGFpblwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAobm9Db3VudCA+IGFic3RhaW5Db3VudCkge1xuICAgICAgICAgICAgdG90YWxDbGFzcyArPSBcIiBub1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRvdGFsQ2xhc3MgKz0gXCIgYWJzdGFpblwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgdG90YWxSb3cgPSAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0eVZvdGUgdG90YWxcIiBrZXk9XCJ0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj5Ub3RhbDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ5ZXNcIj48c3Bhbj57eWVzQ291bnR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub1wiPjxzcGFuPntub0NvdW50fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzdGFpblwiPjxzcGFuPnthYnN0YWluQ291bnR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgICBwYXJ0eVZvdGVOb2Rlcy5wdXNoKHRvdGFsUm93KTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYmlsbEluZm8uc3BvbnNvcikge1xuICAgICAgICAgIHZhciBzcG9uc29yUHJvZmlsZSA9IGdldFBvbGl0aWNpYW4odW5kZWZpbmVkLCB0aGlzLnByb3BzLmJpbGxJbmZvLnNwb25zb3IpO1xuICAgICAgICAgIHZhciBpbWdVUkwgPSBcInVybCgnL3N0YXRpYy9oZWFkc2hvdHMvXCIgKyBzcG9uc29yUHJvZmlsZS5pbWd1cmwgKyBcIicpXCI7XG4gICAgICAgICAgdmFyIHNwb25zb3JDbGFzc1N0cmluZyA9ICdzcG9uc29yUHJvZmlsZSAnO1xuICAgICAgICAgIHZhciBocmVmID0gJy8jL3Byb2ZpbGUvJyArIHNwb25zb3JQcm9maWxlLmlkO1xuICAgICAgICAgIGlmICghc3BvbnNvclByb2ZpbGUucGFydHlfc2x1Zykge1xuICAgICAgICAgICAgdmFyIHBhcnR5TmFtZSA9IHNwb25zb3JQcm9maWxlLnBhcnR5X25hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3BvbnNvckNsYXNzU3RyaW5nICs9IHNwb25zb3JQcm9maWxlLnBhcnR5X3NsdWc7XG4gICAgICAgICAgICB2YXIgcGFydHlOYW1lID0gc3BvbnNvclByb2ZpbGUucGFydHlfc2x1ZztcbiAgICAgICAgICB9XG4gICAgICAgICAgc3BvbnNvckNvbXBvbmVudCA9IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwb25zb3JcIj5cbiAgICAgICAgICAgICAgPGg0PkJpbGwgU3BvbnNvcjwvaDQ+XG4gICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17c3BvbnNvckNsYXNzU3RyaW5nfSBocmVmPXtocmVmfSA+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2JhY2tncm91bmRJbWFnZTogaW1nVVJMfX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGgzPntzcG9uc29yUHJvZmlsZS5uYW1lfTwvaDM+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmlkaW5nXCI+e3Nwb25zb3JQcm9maWxlLnJpZGluZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicGFydHlcIj57cGFydHlOYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcG9uc29yQ29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBwYXJ0eVZvdGVOb2RlcyA9ICcnO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBwYXJ0eVZvdGVOb2RlcyA9ICcnO1xuICAgIH1cbiAgICB2YXIgb3BlbnBhcmxpYW1lbnRVUkwgPSBcIi8vb3BlbnBhcmxpYW1lbnQuY2EvYmlsbHMvXCIgKyB0aGlzLnByb3BzLnZvdGUuc2Vzc2lvbl9pZCArIFwiL1wiICsgdGhpcy5wcm9wcy52b3RlLm51bWJlciArIFwiL1wiO1xuICAgIHNlc3Npb25OdW1iZXJzID0gdGhpcy5wcm9wcy52b3RlLnNlc3Npb25faWQuc3BsaXQoXCItXCIpO1xuICAgIHZhciBwYXJsVVJMID0gXCJodHRwOi8vd3d3LnBhcmwuZ2MuY2EvTEVHSVNJbmZvL0xBQUcuYXNweD9sYW5ndWFnZT1FJlBhcmw9XCIgKyBzZXNzaW9uTnVtYmVyc1swXSArIFwiJlNlcz1cIiArIHNlc3Npb25OdW1iZXJzWzFdO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17aW5mb0NsYXNzfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgbGVmdFwiPjwvZGl2PlxuICAgICAgICAgIHtzcG9uc29yQ29tcG9uZW50fVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHBhcnR5Vm90ZXNcIj5cbiAgICAgICAgICAgIDxoND5QYXJ0eSBWb3RlczwvaDQ+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnR5Vm90ZXNUYWJsZVwiPlxuICAgICAgICAgICAgICB7cGFydHlWb3RlTm9kZXN9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBtb3JlQmlsbEluZm9cIj5cbiAgICAgICAgICA8aDQ+TW9yZSBJbmZvcm1hdGlvbjwvaDQ+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxhIGhyZWY9e29wZW5wYXJsaWFtZW50VVJMfSB0YXJnZXQ9XCJfYmxhbmtcIj52aWV3IGJpbGwgb24gb3BlbnBhcmxpYW1lbnQuY2EgPEFycm93SWNvbiAvPjwvYT5cbiAgICAgICAgICAgIDxhIGhyZWY9e3BhcmxVUkx9IHRhcmdldD1cIl9ibGFua1wiPnZpZXcgc2Vzc2lvbiBvbiBwYXJsLmdjLmNhIDxBcnJvd0ljb24gLz48L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIHJpZ2h0XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbnZhciBBcnJvd0ljb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzdmcgdmVyc2lvbj1cIjEuMVwiIHg9XCIwcHhcIiB5PVwiMHB4XCJcbiAgICAgICAgIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiPlxuICAgICAgICA8cGF0aCBkPVwiTTE2My41LDMzNC41bC00Ny4xLTQ3LjFsODcuNS04Ny41bC04Ny41LTg3LjVsNDcuMS00Ny4xTDI5OCwyMDBMMTYzLjUsMzM0LjV6XCIvPlxuICAgICAgPC9zdmc+XG4gICAgKTtcbiAgfVxufSk7XG52YXIgQmlsbFNlYXJjaCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZXNzaW9uID09ICcnKSB7XG4gICAgICB2YXIgc2VsZWN0VGV4dCA9ICdhbnkgc2Vzc2lvbic7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHNlbGVjdFRleHQgPSB0aGlzLnByb3BzLnNlc3Npb247XG4gICAgfVxuICAgIHZhciBzZXNzaW9uc1ZvdGVzID0gdGhpcy5wcm9wcy5zZXNzaW9uc1ZvdGVzO1xuICAgIHZhciB0b2dnbGVDbGFzcyA9ICdzZXNzaW9uU2VsZWN0JyArICh0aGlzLnByb3BzLnNlc3Npb25Ub2dnbGUgPyAnJyA6ICcgY29sbGFwc2VkJyk7XG4gICAgdmFyIG9iamVjdE5vZGVzID0gdGhpcy5wcm9wcy5zZXNzaW9uc0xpc3QubWFwKGZ1bmN0aW9uIChvYmplY3QsIGkpIHtcbiAgICAgICAgdmFyIHN1bSA9IHNlc3Npb25zVm90ZXNbb2JqZWN0LmlkXTtcbiAgICAgICAgaWYgKHN1bSkge1xuICAgICAgICAgIHZhciBzdHJpbmcgPSBvYmplY3QuaWQgKyAnIC0gKCcgKyBzdW0gKyAnKSc7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxsaSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2Vzc2lvblNlbGVjdC5iaW5kKG51bGwsb2JqZWN0KX0ga2V5PXtpfT48c3BhbiBjbGFzc05hbWU9XCJzZXNzaW9uXCI+e29iamVjdC5pZH08L3NwYW4+IDxzcGFuIGNsYXNzTmFtZT1cInN1bVwiPntzdW19PC9zcGFuPjwvbGk+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmlsbFNlYXJjaFwiPlxuICAgICAgICA8Zm9ybT5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJpbGxzIGJ5IG5hbWUgb3IgbnVtYmVyLi4uXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25CaWxsU2VhcmNoQ2hhbmdlfSAvPiAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RvZ2dsZUNsYXNzfT4gICAgXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2VsZWN0XCIgb25DbGljaz17dGhpcy5wcm9wcy5vblNlc3Npb25TZWxlY3RUb2dnbGV9PntzZWxlY3RUZXh0fTwvc3Bhbj4gIFxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJzZXNzaW9uT3B0aW9uXCIgb25DbGljaz17dGhpcy5wcm9wcy5vblNlc3Npb25TZWxlY3QuYmluZChudWxsLCcnKX0+PHNwYW4gY2xhc3NOYW1lPVwic2Vzc2lvblwiPmFueSBzZXNzaW9uPC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJzdW1cIj57c2Vzc2lvbnNWb3Rlc1snc3VtJ119PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICB7b2JqZWN0Tm9kZXN9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBWb3RlUm93OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgU2VhcmNoU3RhY2sgPSByZXF1aXJlKCcuL1NlYXJjaFN0YWNrLmpzJyk7XG52YXIgU2Vzc2lvblNlbGVjdG9yID0gcmVxdWlyZSgnLi9TZXNzaW9uU2VsZWN0b3IuanMnKTtcblNlYXJjaEJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICdzZWFyY2hCb3ggJyArIHRoaXMucHJvcHMuYm94OyAvL3RlbXBcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hCb3gtbm9zY3JvbGwgc2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfSBvblNjcm9sbD17dGhpcy5wcm9wcy5vblNlYXJjaFNjcm9sbC5iaW5kKG51bGwsIHRoaXMpfSA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BMaW5rc1wiPjxhIGhyZWY9XCIvIy9pbmZvXCIgY2xhc3NOYW1lPVwiaW5mb1wiPjwvYT48YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3NoYXlxbi9wYXJsZVwiIGNsYXNzTmFtZT1cImdpdGh1YlwiPjwvYT48L2Rpdj5cbiAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2guLi5cIiBvbkNoYW5nZT17dGhpcy5wcm9wcy5vblNlYXJjaENoYW5nZX0gLz5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNlYXJjaDwvYnV0dG9uPlxuICAgICAgICAgICAgPHNwYW4+YnkgbmFtZSwgcmlkaW5nLCBvciBwb3N0YWwgY29kZTwvc3Bhbj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXNzaW9uU2VsZWN0b3JDb250YWluZXJcIj5cbiAgICAgICAgICAgIDxTZXNzaW9uU2VsZWN0b3IgXG4gICAgICAgICAgICAgc2Vzc2lvbnNMaXN0PXt0aGlzLnByb3BzLnNlc3Npb25zTGlzdH1cbiAgICAgICAgICAgICBjdXJyZW50U2Vzc2lvbnM9e3RoaXMucHJvcHMuc2Vzc2lvbnN9XG4gICAgICAgICAgICAgc2Vzc2lvblRvZ2dsZSA9IHt0aGlzLnByb3BzLnNlc3Npb25Ub2dnbGV9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hDb250ZW50XCI+XG4gICAgICAgICAgICA8U2VhcmNoU3RhY2sgXG4gICAgICAgICAgICAgIGJveD17dGhpcy5wcm9wcy5ib3h9IFxuICAgICAgICAgICAgICBwb2xpdGljaWFucz17dGhpcy5wcm9wcy5wb2xpdGljaWFuTGlzdH0gXG4gICAgICAgICAgICAgIHByb2ZpbGU9e1tudWxsXX1cbiAgICAgICAgICAgICAgc2VhcmNoaW5nPXt0aGlzLnByb3BzLnNlYXJjaC5pc1NlYXJjaGluZ30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gU2VhcmNoQm94OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgU2VhcmNoU3RhY2sgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiU2VhcmNoU3RhY2tcIixcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICBjbGFzc1N0cmluZyA9IFwic2VhcmNoU3RhY2tcIjtcbiAgICB2YXIgY3VycmVudFByb2ZpbGVJRCA9IHRoaXMucHJvcHMucHJvZmlsZS5pZDtcbiAgICB2YXIgcG9saXRpY2lhbk5vZGVzID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMucG9saXRpY2lhbnMubGVuZ3RoID4gMCkge1xuICAgICAgcG9saXRpY2lhbk5vZGVzID0gdGhpcy5wcm9wcy5wb2xpdGljaWFucy5tYXAoZnVuY3Rpb24gKG9iamVjdCwgaSkge1xuICAgICAgICB2YXIgaGVhZHNob3QgPSBvYmplY3QuaGVhZHNob3Quc3BsaXQoJy8nKS5wb3AoKTtcbiAgICAgICAgdmFyIGltZ1VSTCA9IFwidXJsKCcvc3RhdGljL2hlYWRzaG90cy9cIiArIGhlYWRzaG90ICsgXCInKVwiO1xuICAgICAgICB2YXIgY2xhc3NTdHJpbmcgPSAnJztcbiAgICAgICAgaWYgKG9iamVjdC5pZCA9PSBjdXJyZW50UHJvZmlsZUlEKSB7XG4gICAgICAgICAgY2xhc3NTdHJpbmcgKz0gJ2FjdGl2ZSAnO1xuICAgICAgICB9XG4gICAgICAgIGlmICgob2JqZWN0LmlkID09IGN1cnJlbnRQcm9maWxlSUQpJiYodGhpcy5wcm9wcy5ib3ggPT0gJ3Byb2ZpbGUnKSkge1xuICAgICAgICAgIHZhciBocmVmID0gJy8jLyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdmFyIGhyZWYgPSAnLyMvcHJvZmlsZS8nICsgb2JqZWN0LmlkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmplY3QuYWN0aXZlKSB7XG4gICAgICAgICAgY2xhc3NTdHJpbmcgKz0gJ2N1cnJlbnQgJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9iamVjdC5wYXJ0eV9zbHVnKSB7XG4gICAgICAgICAgdmFyIHBhcnR5TmFtZSA9IG9iamVjdC5wYXJ0eV9uYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNsYXNzU3RyaW5nICs9IG9iamVjdC5wYXJ0eV9zbHVnO1xuICAgICAgICAgIHZhciBwYXJ0eU5hbWUgPSBvYmplY3QucGFydHlfc2x1ZztcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqZWN0Lm5hbWUubGVuZ3RoPjE5KSB7XG4gICAgICAgICAgaWYgKG9iamVjdC5uYW1lLmxlbmd0aCA+IDIyKSB7XG4gICAgICAgICAgICBjbGFzc1N0cmluZyArPSAnIHJlZHVjZS1sYXJnZSdcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjbGFzc1N0cmluZyArPSAnIHJlZHVjZS1tZWRpdW0nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtjbGFzc05hbWU6IGNsYXNzU3RyaW5nLCBocmVmOiBocmVmLCBrZXk6IGl9LCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB7YmFja2dyb3VuZEltYWdlOiBpbWdVUkx9fSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImgzXCIsIG51bGwsIG9iamVjdC5uYW1lKSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcInBhcnR5XCJ9LCBwYXJ0eU5hbWUpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfS5iaW5kKHRoaXMpKTsgIFxuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnByb3BzLnNlYXJjaGluZykge1xuICAgICAgdmFyIG5vUmVzdWx0c05vZGUgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgbnVsbCwgXCJOTyBSRVNVTFRTXCIpKTtcbiAgICAgIHBvbGl0aWNpYW5Ob2Rlcy5wdXNoKG5vUmVzdWx0c05vZGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBwbGFjZUhvbGRlck5hbWVzID0gWydKb2huIEEuIE1jVGVtcCcsICdKb2huIEZha2VuYmFrZXInLCAnUGllcnJlIFRlbXBkZWF1J107XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgMTE7IGkrKykge1xuICAgICAgICB2YXIgZW1wdHlOb2RlID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwge2tleTogaSwgY2xhc3NOYW1lOiBcInBsYWNlaG9sZGVyXCIsIGhyZWY6IFwiLyMvXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgbnVsbCwgcGxhY2VIb2xkZXJOYW1lc1tpJTNdKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJwYXJ0eVwifSwgXCJWQU5cIikpO1xuICAgICAgICBwb2xpdGljaWFuTm9kZXMucHVzaChlbXB0eU5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBjbGFzc1N0cmluZ30sIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgbnVsbCwgXCJNZW1iZXJzIG9mIFBhcmxpYW1lbnRcIiwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJsZWFmXCJ9KSksIFxuICAgICAgICBwb2xpdGljaWFuTm9kZXNcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWFyY2hTdGFjazsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxuU2Vzc2lvbkJ1dHRvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRjbGFzc05hbWUgPSBcInNlc3Npb25CdXR0b25cIjtcblx0XHR2YXIgc2Vzc2lvbk51bWJlciA9IHRoaXMucHJvcHMuc2Vzc2lvbk51bWJlcjtcblx0XHRmb3IgKGk9MDtpPHRoaXMucHJvcHMuY3VycmVudFNlc3Npb25zLmxlbmd0aDtpKyspIHtcblx0XHRcdGlmIChzZXNzaW9uTnVtYmVyID09IHRoaXMucHJvcHMuY3VycmVudFNlc3Npb25zW2ldKSB7XG5cdFx0XHRcdGNsYXNzTmFtZSArPSBcIiBhY3RpdmVcIjtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IGtleT17dGhpcy5wcm9wcy5rZXl9PlxuXHRcdFx0XHQ8YSBvbkNsaWNrPXt0aGlzLnByb3BzLnNlc3Npb25Ub2dnbGUuYmluZChudWxsLCBzZXNzaW9uTnVtYmVyKX0+e3Nlc3Npb25OdW1iZXJ9PC9hPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFNlc3Npb25CdXR0b247IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBTZXNzaW9uQnV0dG9uID0gcmVxdWlyZSgnLi9TZXNzaW9uQnV0dG9uLmpzJyk7XG5TZXNzaW9uU2VsZWN0b3IgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlc3Npb25zTGlzdCA9IHRoaXMucHJvcHMuc2Vzc2lvbnNMaXN0O1xuXHRcdHZhciBjdXJyZW50U2Vzc2lvbnMgPSB0aGlzLnByb3BzLmN1cnJlbnRTZXNzaW9ucztcblx0XHR2YXIgc2Vzc2lvbkJ1dHRvbnMgPSBbXTtcblx0XHR2YXIgc2Vzc2lvblRvZ2dsZSA9IHRoaXMucHJvcHMuc2Vzc2lvblRvZ2dsZTtcblx0XHR2YXIga2V5ID0gMDtcblx0XHRmb3IodmFyIHNlc3Npb25OdW1iZXIgaW4gc2Vzc2lvbnNMaXN0KSB7XG5cdFx0XHR2YXIgc2Vzc2lvbiA9IDxTZXNzaW9uQnV0dG9uIHNlc3Npb25OdW1iZXI9e3Nlc3Npb25OdW1iZXJ9XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRTZXNzaW9ucz17Y3VycmVudFNlc3Npb25zfVxuXHRcdFx0XHRcdFx0XHRzZXNzaW9uVG9nZ2xlPXtzZXNzaW9uVG9nZ2xlfSBcblx0XHRcdFx0XHRcdFx0a2V5PXtrZXl9IC8+XG5cdFx0XHRzZXNzaW9uQnV0dG9ucy5wdXNoKHNlc3Npb24pO1xuXHRcdFx0a2V5Kys7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlc3Npb25zU2VsZWN0b3JcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPjxoMj5TZXNzaW9uczwvaDI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uc1wiPntzZXNzaW9uQnV0dG9ucy5yZXZlcnNlKCl9PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gU2Vzc2lvblNlbGVjdG9yOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgQmlsbFRleHQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHByZXBUZXh0OiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdGV4dCA9IHRleHQudHJpbSgpO1xuICAgIHJldHVybiAodGV4dC5sZW5ndGg+MD8nPHA+Jyt0ZXh0LnJlcGxhY2UoL1tcXHJcXG5dKy8sJzwvcD48cD4nKSsnPC9wPic6bnVsbCk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBiaWxsVGV4dCA9IHRoaXMucHJlcFRleHQodGhpcy5wcm9wcy5iaWxsVGV4dCk7XG4gICAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJpbGxUZXh0XCI+XG4gICAgICB7YmlsbFRleHR9XG4gICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmlsbFRleHQ7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBCaWxsVGV4dCA9IHJlcXVpcmUoJy4vQmlsbFRleHQuanMnKTtcbnZhciBUZXh0Qm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjbGFzc2VzID0gJ2JpbGxUZXh0Qm94ICcgKyB0aGlzLnByb3BzLmJveDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9PjxkaXYgY2xhc3NOYW1lPVwiY2xvc2VDb250YWluZXJcIj48YSBocmVmPVwiLyMvXCI+PC9hPjwvZGl2PjxCaWxsVGV4dCBiaWxsVGV4dD17dGhpcy5wcm9wcy5iaWxsVGV4dH0gLz48L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0Qm94OyIsInZhciBBcnJvd0ljb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzdmcgdmVyc2lvbj1cIjEuMVwiIHg9XCIwcHhcIiB5PVwiMHB4XCJcbiAgICAgICAgIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiPlxuICAgICAgICA8cGF0aCBkPVwiTTE2My41LDMzNC41bC00Ny4xLTQ3LjFsODcuNS04Ny41bC04Ny41LTg3LjVsNDcuMS00Ny4xTDI5OCwyMDBMMTYzLjUsMzM0LjV6XCIvPlxuICAgICAgPC9zdmc+XG4gICAgKTtcbiAgfVxufSk7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbmlmICh0eXBlb2YgZ2EgIT09ICd1bmRlZmluZWQnKSB7IC8vIGZhaWwgZ3JhY2VmdWxseVxuICB0cmFja2VyID0gZ2EuY3JlYXRlKCdVQS02NzgwNDQ1MS0xJywgJ3ZvdGVzLm1wJyk7XG59XG5mdW5jdGlvbiBnYVRyYWNrKHBhdGgsIHRpdGxlKSB7XG4gIGlmICh0eXBlb2YgZ2EgIT09ICd1bmRlZmluZWQnKSB7IC8vIGZhaWwgZ3JhY2VmdWxseVxuICAgIGlmIChwYXRoPT1cIlwiKSB7XG4gICAgICBwYXRoID0gXCIvXCI7XG4gICAgfVxuICAgIGdhKCdzZXQnLCB7IHBhZ2U6IHBhdGgsIHRpdGxlOiB0aXRsZSB9KTtcbiAgICBnYSgnc2VuZCcsICdwYWdldmlldycpO1xuICB9XG59XG5cbi8vIEVsZW1lbnRzXG52YXIgQXJyb3dJY29uID0gcmVxdWlyZSgnLi9lbGVtZW50cy9BcnJvd0ljb24uanMnKTtcblxuLy8gQm94ZXNcbnZhciBTZWFyY2hCb3ggPSByZXF1aXJlKCcuL2JveGVzL3NlYXJjaC9TZWFyY2hCb3guanMnKTtcbnZhciBQcm9maWxlQm94ID0gcmVxdWlyZSgnLi9ib3hlcy9wcm9maWxlL1Byb2ZpbGVCb3guanMnKTtcbnZhciBJbmZvQm94ID0gcmVxdWlyZSgnLi9ib3hlcy9pbmZvL0luZm9Cb3guanMnKTtcbnZhciBUZXh0Qm94ID0gcmVxdWlyZSgnLi9ib3hlcy90ZXh0L1RleHRCb3guanMnKTtcblxuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIC8vICoqKipTVEFURSBGVU5DVElPTlMqKioqIC8vXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFwcFN0YXRlID0gdGhpcy5nZXRBcHBTdGF0ZSgpO1xuICAgIHJldHVybiB7XG4gICAgICBhcHA6IGFwcFN0YXRlLFxuICAgIH07XG4gIH0sXG5cbiAgZ2V0QXBwU3RhdGU6IGZ1bmN0aW9uKHByZXZBcHBTdGF0ZSkge1xuICAgIC8vIGRlZmF1bHQgc3RhdGUgb24gaW5pdGlhdGlvblxuICAgIHZhciBkZWZhdWx0QXBwU3RhdGUgPSB7IFxuICAgICAgYm94OiAnc2VhcmNoJyxcbiAgICAgIHBvbGl0aWNpYW5MaXN0OiBbXSxcbiAgICAgIHBhcnRpZXNMaXN0OiB7fSxcbiAgICAgIHJpZGluZ3NMaXN0OiB7fSxcbiAgICAgIHNlc3Npb25zTGlzdDoge30sXG4gICAgICBzZXNzaW9uczogWyc0MS0yJywgJzQxLTEnXSxcbiAgICAgIHNlYXJjaDoge1xuICAgICAgICBpc1NlYXJjaGluZzogZmFsc2UsXG4gICAgICAgIHNlYXJjaFZhbHVlOiAnJyxcbiAgICAgICAgcmlkaW5nOiAnJyxcbiAgICAgICAgbWF4OiAxMCxcbiAgICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHByb2ZpbGU6IHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHZvdGVzOiB7fSxcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB2b3RlOiB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgc3BvbnNvcjogMCxcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBiaWxsOiB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmICh0eXBlb2YocHJldkFwcFN0YXRlKT09PSd1bmRlZmluZWQnKSBwcmV2QXBwU3RhdGUgPSBkZWZhdWx0QXBwU3RhdGU7XG4gICAgLy8gZWRpdCBzdGF0ZSBhY2NvcmRpbmcgdG8gVVJMIHZhbHVlc1xuICAgIHZhciB1cmxIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpO1xuICAgIHZhciBuZXdBcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZShwcmV2QXBwU3RhdGUpO1xuICAgIHZhciB1cmxQYXJhbWV0ZXJzID0gdXJsSGFzaC5zcGxpdCgnLycpLmZpbHRlcihmdW5jdGlvbihuKXsgcmV0dXJuIG4gIT0gJycgfSk7XG4gICAgbmV3QXBwU3RhdGUuYm94ID0gJ3NlYXJjaCc7XG4gICAgLy8gaWYgcHJvZmlsZSBvciBiaWxsXG4gICAgaWYgKHVybFBhcmFtZXRlcnMubGVuZ3RoID49IDIpIHtcbiAgICAgIGlmICgodXJsUGFyYW1ldGVyc1swXSA9PSAncHJvZmlsZScpICYmICFpc05hTih1cmxQYXJhbWV0ZXJzWzFdKSkge1xuICAgICAgICBuZXdBcHBTdGF0ZS5ib3ggPSAncHJvZmlsZSc7XG4gICAgICAgIG5ld0FwcFN0YXRlLnByb2ZpbGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgbmV3QXBwU3RhdGUucHJvZmlsZS5pZCA9IHVybFBhcmFtZXRlcnNbMV07XG4gICAgICAgIG5ld0FwcFN0YXRlLnByb2ZpbGUudm90ZXMgPSB7fTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCh1cmxQYXJhbWV0ZXJzWzBdID09ICdiaWxsJykgJiYgIWlzTmFOKHVybFBhcmFtZXRlcnNbMV0pKSB7XG4gICAgICAgIG5ld0FwcFN0YXRlLmJveCA9ICdiaWxsJztcbiAgICAgICAgbmV3QXBwU3RhdGUuYmlsbC5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICBuZXdBcHBTdGF0ZS5iaWxsLmlkID0gdXJsUGFyYW1ldGVyc1sxXTtcbiAgICAgICAgbmV3QXBwU3RhdGUuYmlsbC5kYXRhID0ge307XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGlmIHByb2ZpbGUgYW5kIHZvdGUgc3BlY2lmaWVkXG4gICAgaWYgKHVybFBhcmFtZXRlcnMubGVuZ3RoID49IDQpIHtcbiAgICAgIGlmICgodXJsUGFyYW1ldGVyc1syXSA9PSAndm90ZScpICYmICFpc05hTih1cmxQYXJhbWV0ZXJzWzNdKSkge1xuICAgICAgICBuZXdBcHBTdGF0ZS52b3RlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIG5ld0FwcFN0YXRlLnZvdGUuaWQgPSB1cmxQYXJhbWV0ZXJzWzNdO1xuICAgICAgICBuZXdBcHBTdGF0ZS52b3RlLmRhdGEgPSB7fTtcbiAgICAgICAgbmV3QXBwU3RhdGUudm90ZS5zcG9uc29yID0gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld0FwcFN0YXRlO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmdldEluaXRpYWxEYXRhKCk7XG4gICAgaWYgKHRoaXMuc3RhdGUuYXBwLnByb2ZpbGUuaWQpIHtcbiAgICAgIHRoaXMuZ2V0UG9saXRpY2lhblZvdGVzKHRoaXMuc3RhdGUuYXBwLnByb2ZpbGUuaWQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdGF0ZS5hcHAudm90ZS5pZCkge1xuICAgICAgdGhpcy5nZXRWb3RlSW5mb3JtYXRpb24odGhpcy5zdGF0ZS5hcHAudm90ZS5pZCk7XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIGN1cnJlbnRBcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZSh0aGlzLnN0YXRlLmFwcCk7XG4gICAgICB0aGlzLnVwZGF0ZUFwcFN0YXRlKGN1cnJlbnRBcHBTdGF0ZSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfSxcblxuICBjbG9uZUFwcFN0YXRlOiBmdW5jdGlvbihhcHBTdGF0ZSkge1xuICAgIHJldHVybiAoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcHBTdGF0ZSkpKTtcbiAgfSxcblxuICB1cGRhdGVBcHBTdGF0ZTogZnVuY3Rpb24oY3VycmVudEFwcFN0YXRlKSB7XG4gICAgdmFyIG5leHRBcHBTdGF0ZSA9IHRoaXMuZ2V0QXBwU3RhdGUoY3VycmVudEFwcFN0YXRlKTtcbiAgICBpZiAobmV4dEFwcFN0YXRlLnByb2ZpbGUuaWQgJiYgKG5leHRBcHBTdGF0ZS5wcm9maWxlLmlkICE9IGN1cnJlbnRBcHBTdGF0ZS5wcm9maWxlLmlkKSkge1xuICAgICAgdGhpcy5nZXRQb2xpdGljaWFuVm90ZXMobmV4dEFwcFN0YXRlLnByb2ZpbGUuaWQpO1xuICAgIH1cbiAgICBpZiAobmV4dEFwcFN0YXRlLnZvdGUuaWQgJiYgKG5leHRBcHBTdGF0ZS52b3RlLmlkICE9IGN1cnJlbnRBcHBTdGF0ZS52b3RlLmlkKSkge1xuICAgICAgdGhpcy5nZXRWb3RlSW5mb3JtYXRpb24obmV4dEFwcFN0YXRlLnZvdGUuaWQpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHthcHA6IG5leHRBcHBTdGF0ZX0pO1xuICB9LFxuXG4gIC8vICoqKipEQVRBIENPTExFQ1RJT04gRlVOQ1RJT05TKioqKiAvL1xuXG4gIGdldEluaXRpYWxEYXRhOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodHlwZW9mKFN0b3JhZ2UpID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuZmV0Y2hEYXRhRnJvbVNlcnZlcignL2luaXRpYWxpemUnLCB0aGlzLnNldEluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvL2lmICh0eXBlb2YobG9jYWxTdG9yYWdlLmluaXRpYWxEYXRhKSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAvLyAgdGhpcy5zZXRJbml0aWFsRGF0YShsb2NhbFN0b3JhZ2UuaW5pdGlhbERhdGEpO1xuICAgICAgLy99XG4gICAgICAvL2Vsc2Uge1xuICAgICAgICB0aGlzLmZldGNoRGF0YUZyb21TZXJ2ZXIoJy9pbml0aWFsaXplJywgdGhpcy5zZXRJbml0aWFsRGF0YSk7XG4gICAgICAvL31cbiAgICB9XG4gIH0sXG5cbiAgc2V0SW5pdGlhbERhdGE6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAodHlwZW9mKFN0b3JhZ2UpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBpZiAodHlwZW9mKGxvY2FsU3RvcmFnZS5pbml0aWFsRGF0YSkgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBsb2NhbFN0b3JhZ2UuaW5pdGlhbERhdGEgPSBkYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgYXBwU3RhdGUucG9saXRpY2lhbkxpc3QgPSBwYXJzZWREYXRhWydwb2xpdGljaWFucyddO1xuICAgICAgYXBwU3RhdGUucmlkaW5nc0xpc3QgPSBwYXJzZWREYXRhWydyaWRpbmdzJ107XG4gICAgICBhcHBTdGF0ZS5wYXJ0aWVzTGlzdCA9IHBhcnNlZERhdGFbJ3BhcnRpZXMnXTtcbiAgICAgIGFwcFN0YXRlLnNlc3Npb25zTGlzdCA9IHBhcnNlZERhdGFbJ3Nlc3Npb25zJ107XG4gICAgICBhcHBTdGF0ZS5zZWFyY2guaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YXBwOiBhcHBTdGF0ZX0pO1xuICB9LFxuXG4gIGdldFBvbGl0aWNpYW5Wb3RlczogZnVuY3Rpb24oaWQpIHtcbiAgICB0aGlzLmZldGNoRGF0YUZyb21TZXJ2ZXIoJy92b3Rlcy8nICsgaWQsIHRoaXMuc2V0UG9saXRpY2lhblZvdGVzKTtcbiAgfSxcblxuICBzZXRQb2xpdGljaWFuVm90ZXM6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgYXBwU3RhdGUucHJvZmlsZS52b3RlcyA9IHBhcnNlZERhdGFbJ3ZvdGVzJ107XG4gICAgICBhcHBTdGF0ZS5wcm9maWxlLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuc2V0U3RhdGUoe2FwcDogYXBwU3RhdGV9KTtcbiAgfSxcblxuICBnZXRWb3RlSW5mb3JtYXRpb246IGZ1bmN0aW9uKGlkKSB7XG4gICAgdGhpcy5mZXRjaERhdGFGcm9tU2VydmVyKCcvdm90ZS8nICsgaWQsIHRoaXMuc2V0Vm90ZUluZm9ybWF0aW9uKTtcbiAgfSxcblxuICBzZXRWb3RlSW5mb3JtYXRpb246IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgYXBwU3RhdGUudm90ZS5kYXRhID0gcGFyc2VkRGF0YVsndm90ZXMnXTtcbiAgICAgIGFwcFN0YXRlLnZvdGUuc3BvbnNvciA9IHBhcnNlZERhdGFbJ3Nwb25zb3InXTtcbiAgICAgIGFwcFN0YXRlLnZvdGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YXBwOiBhcHBTdGF0ZX0pO1xuICB9LFxuXG4gIGZldGNoRGF0YUZyb21TZXJ2ZXI6IGZ1bmN0aW9uKHBhdGgsIHNldHRlciwgd2lsbFJldHVybikge1xuICAgIGlmICh0eXBlb2Yod2lsbFJldHVybik9PT0ndW5kZWZpbmVkJykgd2lsbFJldHVybiA9IGZhbHNlO1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgcmVxdWVzdC5vcGVuKCdHRVQnLCBwYXRoLCB0cnVlKTtcbiAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICBzZXR0ZXIocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgZmV0Y2hpbmcgZGF0YSBmcm9tIHNlcnZlclwiKVxuICAgICAgfVxuICAgIH1cbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciByZXF1ZXN0aW5nIGRhdGEgZnJvbSBzZXJ2ZXJcIilcbiAgICB9O1xuICAgIHJlcXVlc3Quc2VuZCgpO1xuICB9LFxuXG4gIC8vICoqKipTRUFSQ0gvRklMVEVSIEZVTkNUSU9OUyoqKiogLy9cblxuICBnZXRTZWFyY2hSaWRpbmc6IGZ1bmN0aW9uKHNlYXJjaFZhbHVlKSB7XG4gICAgc2VhcmNoVmFsdWUgPSBzZWFyY2hWYWx1ZS5yZXBsYWNlKC9cXHMrL2csICcnKTtcbiAgICBzZWFyY2hWYWx1ZSA9IHNlYXJjaFZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgdmFyIHBvc3RhbFVSTCA9ICdodHRwczovL3JlcHJlc2VudC5vcGVubm9ydGguY2EvcG9zdGNvZGVzLycgKyBzZWFyY2hWYWx1ZSArICcvP3NldHM9ZmVkZXJhbC1lbGVjdG9yYWwtZGlzdHJpY3RzJztcbiAgICB0aGlzLmZldGNoRGF0YUZyb21TZXJ2ZXIocG9zdGFsVVJMLCB0aGlzLnNldFNlYXJjaFJpZGluZylcbiAgfSxcblxuICBzZXRTZWFyY2hSaWRpbmc6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgYXBwU3RhdGUuc2VhcmNoLnJpZGluZyA9IHBhcnNlZERhdGFbXCJib3VuZGFyaWVzX2NvbmNvcmRhbmNlXCJdWzBdW1wibmFtZVwiXTtcbiAgICB0aGlzLnNldFN0YXRlKHthcHA6IGFwcFN0YXRlfSk7XG4gIH0sXG5cbiAgb25TZWFyY2hDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSBtYXggaXMgZ3JlYXRlciB0aGFuIHRoZSBudW1iZXIgb2YgcmVzdWx0cyAtIGlmIHNvLCByZWR1Y2UgaXRcbiAgICB2YXIgbWF4ID0gdGhpcy5zdGF0ZS5hcHAuc2VhcmNoLm1heDtcbiAgICB2YXIgbnVtID0gdGhpcy5maWx0ZXJQb2xpdGljaWFucygpLmxlbmd0aDtcbiAgICBpZiAobnVtIDwgbWF4KSB7XG4gICAgICBtYXggPSBudW07XG4gICAgICBpZiAobWF4IDwgMTApIHtcbiAgICAgICAgbWF4ID0gMTA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNlYXJjaFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuXG4gICAgLy8gcG9zdGFsIGNvZGUgdGVzdFxuICAgIHZhciBwb3N0YWxSZWdFeCA9IG5ldyBSZWdFeHAoXCJeW0FCQ0VHSEpLTE1OUFJTVFZYWWFiY2VnaGprbG1ucHJzdHZ4eV17MX1cXFxcZHsxfVtBLVphLXpdezF9ICpcXFxcZHsxfVtBLVphLXpdezF9XFxcXGR7MX0kXCIsIFwiaVwiKTtcbiAgICBpZiAocG9zdGFsUmVnRXgudGVzdChzZWFyY2hWYWx1ZSkpIHtcbiAgICAgIHRoaXMuZ2V0U2VhcmNoUmlkaW5nKHNlYXJjaFZhbHVlKTtcbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlLCBub3JtYWwgc3RhdGUgY2hhbmdlXG4gICAgZWxzZSB7XG4gICAgICBhcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZSh0aGlzLnN0YXRlLmFwcCk7XG4gICAgICBpZiAoc2VhcmNoVmFsdWUgPT0gJycpIHtcbiAgICAgICAgYXBwU3RhdGUuc2VhcmNoLmlzU2VhcmNoaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXBwU3RhdGUuc2VhcmNoLmlzU2VhcmNoaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGFwcFN0YXRlLnNlYXJjaC5zZWFyY2hWYWx1ZSA9IHNlYXJjaFZhbHVlO1xuICAgICAgYXBwU3RhdGUuc2VhcmNoLm1heCA9IG1heDtcbiAgICAgIGFwcFN0YXRlLnNlYXJjaC5yaWRpbmcgPSAnJztcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2FwcDogYXBwU3RhdGV9KTtcbiAgICB9XG4gIH0sXG4gIG9uU2VhcmNoU2Nyb2xsOiBmdW5jdGlvbih0aGluZ29uZSwgdGhpbmd0d28pIHtcbiAgICB2YXIgc2Nyb2xsVG9wID0gdGhpbmdvbmUuZ2V0RE9NTm9kZSgpLnNjcm9sbFRvcDtcbiAgICB2YXIgaGVpZ2h0ID0gdGhpbmdvbmUuZ2V0RE9NTm9kZSgpLnNjcm9sbEhlaWdodDtcbiAgICB2YXIgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB2YXIgbWF4ID0gdGhpcy5zdGF0ZS5hcHAuc2VhcmNoLm1heDtcbiAgICBpZiAoKGggKyBzY3JvbGxUb3AgKyAxMDApID4gaGVpZ2h0KSB7XG4gICAgICB2YXIgbnVtID0gdGhpcy5maWx0ZXJQb2xpdGljaWFucygpLmxlbmd0aDtcbiAgICAgIGlmIChtYXggPCBudW0pIHtcbiAgICAgICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgICAgIGFwcFN0YXRlLnNlYXJjaC5tYXggPSBtYXggKyAxMDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YXBwIDogYXBwU3RhdGV9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZmlsdGVyUG9saXRpY2lhbnM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmaWx0ZXJlZExpc3QgPSB0aGlzLnN0YXRlLmFwcC5wb2xpdGljaWFuTGlzdC5maWx0ZXIoZnVuY3Rpb24gKHBvbCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2wuc2Vzc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnN0YXRlLmFwcC5zZXNzaW9ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChwb2wuc2Vzc2lvbnNbaV0gPT0gdGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnNbal0pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgaWYgKHRoaXMuc3RhdGUuYXBwLnNlYXJjaC5pc1NlYXJjaGluZyAmJiB0aGlzLnN0YXRlLmFwcC5zZWFyY2guc2VhcmNoVmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmFwcC5zZWFyY2gucmlkaW5nICE9ICcnKSB7XG4gICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAodGhpcy5zdGF0ZS5hcHAuc2VhcmNoLnJpZGluZywgXCJpXCIpO1xuICAgICAgICB2YXIgZmlsdGVyZWRMaXN0ID0gZmlsdGVyZWRMaXN0LmZpbHRlcihmdW5jdGlvbiAocG9sKSB7XG4gICAgICAgICAgcG9sLnJpZGluZyA9IHRoaXMuc3RhdGUuYXBwLnJpZGluZ3NMaXN0W3BvbC5yaWRpbmdzWzBdXS5uYW1lO1xuICAgICAgICAgIHJldHVybiBwb2wucmlkaW5nLnNlYXJjaChyZWdleCkgPiAtMTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgIH1cbiAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAodGhpcy5zdGF0ZS5hcHAuc2VhcmNoLnNlYXJjaFZhbHVlLCBcImlcIik7XG4gICAgICB2YXIgZmlsdGVyZWRMaXN0ID0gZmlsdGVyZWRMaXN0LmZpbHRlcihmdW5jdGlvbiAocG9sKSB7XG4gICAgICAgIHBvbC5wYXJ0eU5hbWUgPSB0aGlzLnN0YXRlLmFwcC5wYXJ0aWVzTGlzdFtwb2wucGFydGllc1swXV0ubmFtZTtcbiAgICAgICAgcG9sLnBhcnR5U2x1ZyA9IHRoaXMuc3RhdGUuYXBwLnBhcnRpZXNMaXN0W3BvbC5wYXJ0aWVzWzBdXS5zbHVnO1xuICAgICAgICBwb2wucmlkaW5nID0gdGhpcy5zdGF0ZS5hcHAucmlkaW5nc0xpc3RbcG9sLnJpZGluZ3NbMF1dLm5hbWU7XG4gICAgICAgIHJldHVybiBwb2wubmFtZS5zZWFyY2gocmVnZXgpID4gLTEgfHwgcG9sLnBhcnR5TmFtZS5zZWFyY2gocmVnZXgpID4gLTEgfHwgcG9sLnBhcnR5U2x1Zy5zZWFyY2gocmVnZXgpID4gLTEgfHwgcG9sLnJpZGluZy5zZWFyY2gocmVnZXgpID4gLTEgIHx8IHBvbC5yaWRpbmcuc2VhcmNoKHJlZ2V4KSA+IC0xO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlcmVkTGlzdDtcbiAgfSxcblxuICBzZXNzaW9uVG9nZ2xlOiBmdW5jdGlvbihzZXNzaW9uTnVtYmVyKSB7XG4gICAgY29uc29sZS5sb2coJ3RvZ2dsZWQnKTtcbiAgICBjb25zb2xlLmxvZyhzZXNzaW9uTnVtYmVyKTtcblxuICAgIHZhciBuZXdTZXNzaW9ucyA9IFtdO1xuICAgIHZhciAkaW5BcnJheSA9IGZhbHNlO1xuICAgIGZvciAoaT0wO2k8dGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnMubGVuZ3RoO2krKykge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuYXBwLnNlc3Npb25zW2ldIT1zZXNzaW9uTnVtYmVyKSB7XG4gICAgICAgIG5ld1Nlc3Npb25zLnB1c2godGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnNbaV0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICRpbkFycmF5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCEkaW5BcnJheSkge1xuICAgICAgbmV3U2Vzc2lvbnMucHVzaChzZXNzaW9uTnVtYmVyKTtcbiAgICB9XG4gICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgYXBwU3RhdGUuc2Vzc2lvbnMgPSBuZXdTZXNzaW9ucztcbiAgICB0aGlzLnNldFN0YXRlKHthcHA6IGFwcFN0YXRlfSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbG9hZGluZyA9ICh0aGlzLnN0YXRlLmFwcC52b3RlLmlzTG9hZGluZykgPyBcImxvYWRpbmdcIiA6IFwibG9hZGVkXCI7XG4gICAgdmFyIGZpbHRlcmVkUG9saXRpY2lhbkxpc3QgPSB0aGlzLmZpbHRlclBvbGl0aWNpYW5zKCkuc2xpY2UoMCwgdGhpcy5zdGF0ZS5hcHAuc2VhcmNoLm1heCk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm94IHNlYXJjaFwiPlxuICAgICAgICA8U2VhcmNoQm94XG4gICAgICAgICAgYm94PXt0aGlzLnN0YXRlLmFwcC5ib3h9IC8vdGVtcFxuICAgICAgICAgIHBvbGl0aWNpYW5MaXN0PXtmaWx0ZXJlZFBvbGl0aWNpYW5MaXN0fVxuICAgICAgICAgIHBhcnRpZXNMaXN0PXt0aGlzLnN0YXRlLmFwcC5wYXJ0aWVzTGlzdH1cbiAgICAgICAgICByaWRpbmdzTGlzdD17dGhpcy5zdGF0ZS5hcHAucmlkaW5nc0xpc3R9XG4gICAgICAgICAgc2Vzc2lvbnNMaXN0PXt0aGlzLnN0YXRlLmFwcC5zZXNzaW9uc0xpc3R9XG4gICAgICAgICAgc2Vzc2lvbnM9e3RoaXMuc3RhdGUuYXBwLnNlc3Npb25zfVxuICAgICAgICAgIHNlYXJjaD17dGhpcy5zdGF0ZS5hcHAuc2VhcmNofVxuICAgICAgICAgIG9uU2VhcmNoU2Nyb2xsPXt0aGlzLm9uU2VhcmNoU2Nyb2xsfVxuICAgICAgICAgIG9uU2VhcmNoQ2hhbmdlPXt0aGlzLm9uU2VhcmNoQ2hhbmdlfVxuICAgICAgICAgIHNlc3Npb25Ub2dnbGU9e3RoaXMuc2Vzc2lvblRvZ2dsZX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIFxufSk7XG5cblJlYWN0LnJlbmRlcihcbiAgPEFwcCAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxuKTsiXX0=
