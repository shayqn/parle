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
    var appState = this.setAppState();
    return {
      app: appState,
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

  setAppState: function(prevState) {
    if (typeof(prevState)==='undefined') prevState = { 
      app: {
        box: 'search',
        nextBox: 'search',
        politicianList: {},
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
          data: {},
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
    var urlHash = window.location.hash.substr(1);
    var newState = prevState;
    var urlParameters = urlHash.split('/').filter(function(n){ return n != '' });
    var box = prevState.app.box;
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
          console.log('server reached, but it did not give data - onSearchChange opennorth request');
        }
      }.bind(this);
      request.onerror = function() {
          console.log('connection problem - onSearchChange opennorth request');
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9Cb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9UZXh0LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU2VhcmNoLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU3RhY2suanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1Byb2ZpbGVCb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1ZvdGVSb3cuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9zZWFyY2gvU2VhcmNoQm94LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvc2VhcmNoL1NlYXJjaFN0YWNrLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvdGV4dC9CaWxsVGV4dC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2JveGVzL3RleHQvVGV4dEJveC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2VsZW1lbnRzL0Fycm93SWNvbi5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL3BhcmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUJBQXFCOztBQUVyQixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDeEMsSUFBSSw2QkFBNkIsdUJBQUE7RUFDL0IsbUJBQW1CLEVBQUUsU0FBUyxTQUFTLEVBQUUsU0FBUyxFQUFFO0lBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMs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b3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgSW5mb1RleHQgPSByZXF1aXJlKCcuL0luZm9UZXh0LmpzJyk7XG52YXIgSW5mb0JveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgY29tcG9uZW50V2lsbFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBpZiAoKG5leHRQcm9wcy5ib3ggPT0gJ2luZm8nKSAmJiAodGhpcy5wcm9wcy5ib3ggIT0gJ3NlYXJjaCcpKSB7XG4gICAgICB0aGlzLmJhY2sgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuYmFjayA9IGZhbHNlO1xuICAgIH1cbiAgfSxcbiAgZ29CYWNrOiBmdW5jdGlvbihlKSB7XG4gICAgaWYgKHRoaXMuYmFjaykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICdpbmZvQm94ICcgKyB0aGlzLnByb3BzLmJveDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9PjxkaXYgY2xhc3NOYW1lPVwiY2xvc2VDb250YWluZXJcIj48YSBocmVmPVwiLyMvXCIgb25DbGljaz17dGhpcy5nb0JhY2t9PjwvYT48L2Rpdj48SW5mb1RleHQgLz48L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbmZvQm94OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgSW5mb1RleHQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJpbmZvVGV4dFwiPlxuICAgICAgPGgyPmFib3V0IHZvdGVzLm1wPC9oMj5cbiAgICAgIDxwPkRlbW9jcmFjaWVzIGFyZSBkZWZpbmVkIGJ5IHRoZSBsYXdzIHRoYXQgdGhleSBwYXNzLCBhbmQgdGhlIGxhd3MgdGhhdCBwYXNzIGFyZSBkZXRlcm1pbmVkIGJ5IHRoZSByZXByZXNlbnRhdGl2ZXMgd2UgZWxlY3QuIEluIG9yZGVyIHRvIGFjY3VyYXRlbHkgZXZhbHVhdGUgd2hldGhlciBvdXIgZWxlY3RlZCBtZW1iZXJzIG9mIHBhcmxpYW1lbnQgYXJlIGFwcHJvcHJpYXRlbHkgcmVwcmVzZW50aW5nIHRoZWlyIGVsZWN0b3JhdGUsIHRoZSBtb3N0IHBlcnRpbmVudCBpbmZvcm1hdGlvbiB3ZSBoYXZlIGlzIHRoZWlyIHZvdGluZyBoaXN0b3J5OiB3aGljaCBiaWxscyBoYXZlIHRoZXkgdm90ZWQgZm9yLCB3aGljaCBoYXZlIHRoZXkgdm90ZWQgYWdhaW5zdCwgYW5kIHdoaWNoIGhhdmUgdGhleSBhYnN0YWluZWQgZnJvbSB2b3Rpbmcgb24uIDwvcD5cbiAgICAgIDxwPldoaWxlIHRoaXMgaW5mb3JtYXRpb24gaXMgbWFkZSBwdWJsaWNseSBhdmFpbGFibGUgdG8gYWxsIENhbmFkaWFucywgd2Ugbm90aWNlZCB0aGF0IGl0IGNhbiBiZSBzbG93IGFuZCBkaWZmaWN1bHQgdG8gcGFyc2UuIEV2ZXJ5IGJpbGwgaXMgdm90ZWQgb24gbXVsdGlwbGUgdGltZXMgLSBzb21ldGltZXMgdG8gcGFzcyBhbWVuZG1lbnRzLCBzb21ldGltZXMgZXZlbiBqdXN0IHRvIHZvdGUgb24gd2hldGhlciBvciBub3QgaXQgd2lsbCBiZSBkaXNjdXNzZWQuIFVubGVzcyB5b3UgYXJlIGFibGUgdG8gZGVkaWNhdGUgc2lnbmlmaWNhbnQgdGltZSBhbmQgZWZmb3J0IGludG8gYmVjb21pbmcgd2VsbC12ZXJzZWQgb24gdGhlIGRldGFpbHMgb2YgZWFjaCBiaWxsLCBhdHRlbXB0aW5nIHRvIGFuYWx5emUgdGhlIHZvdGVzIGEgcG9saXRpY2lhbiBtYWtlcyBjYW4gYmUgbW9yZSBjb25mdXNpbmcgdGhhbiBpbmZvcm1hdGl2ZS48L3A+XG4gICAgICA8cD5BcyBlbmdhZ2VkIGNpdGl6ZW5zIHdobyBhcmUgbm90IGNhcGFibGUgb2YgYmVpbmcgaW50aW1hdGVseSBmYW1pbGlhciB3aXRoIHRoZSBkZXRhaWxzIGFuZCBwcm9ncmVzcyBvZiBldmVyeSBiaWxsLCB3aGF0IHdlIHdhbnRlZCB0byBrbm93IHdhcyB0aGlzOiBhZnRlciBhbGwgdGhlIGFtZW5kbWVudHMgYW5kIGVkaXRzLCBkaWQgdGhlIHBvbGl0aWNpYW4gdm90ZSB0byBtYWtlIHRoZSBmaW5hbCBiaWxsIGEgbGF3IG9yIG5vdD8gPC9wPlxuICAgICAgPHA+VGhhdCBpcyB3aGF0IHRoaXMgd2Vic2l0ZSBwcm92aWRlczogZm9yIGV2ZXJ5IG1lbWJlciBvZiBwYXJsaWFtZW50LCBpdCByZXR1cm5zIG9ubHkgdGhlIHZvdGVzIHRoYXQgY29ycmVzcG9uZCB0byB0aGVpciBmaW5hbCB2b3RlIG9uIGEgYmlsbCBhcyB3ZWxsIGFzIHdoZXRoZXIgb3Igbm90IHRoZSBiaWxsIHdhcyBzdWNjZXNzZnVsbHkgcGFzc2VkIGludG8gbGF3LjwvcD5cbiAgICAgIDxwPldlIGhvcGUgdGhhdCB0aGlzIHByb3ZpZGVzIGFuIGVhc3kgYWRkaXRpb25hbCBhdmVudWUgZm9yIGV2YWx1YXRpbmcgdGhlIHBlcmZvcm1hbmNlIG9mIG91ciBlbGVjdGVkIG1lbWJlcnMgb2YgcGFybGlhbWVudCBhbmQgZGV0ZXJtaW5pbmcgdGhlaXIgZWZmZWN0aXZlbmVzcyBpbiByZXByZXNlbnRpbmcgb3VyIHZpZXdzLjwvcD5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdpdGh1YkxpbmtcIj48YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3NoYXlxbi9wYXJsZVwiPnZpZXcgcHJvamVjdCBvbiBnaXRodWI8L2E+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3JlZGl0V2hlcmVDcmVkaXRzRHVlXCI+c3BlY2lhbCB0aGFua3MgdG8gPGEgaHJlZj1cImh0dHBzOi8vb3BlbnBhcmxpYW1lbnQuY2FcIj5vcGVucGFybGlhbWVudC5jYTwvYT4gZm9yIHByb3ZpZGluZyBhbGwgdGhlIGRhdGE8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBJbmZvVGV4dDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEJpbGxTZWFyY2ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuc2Vzc2lvbiA9PSAnJykge1xuICAgICAgdmFyIHNlbGVjdFRleHQgPSAnYW55IHNlc3Npb24nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBzZWxlY3RUZXh0ID0gdGhpcy5wcm9wcy5zZXNzaW9uO1xuICAgIH1cbiAgICB2YXIgc2Vzc2lvbnNWb3RlcyA9IHRoaXMucHJvcHMuc2Vzc2lvbnNWb3RlcztcbiAgICB2YXIgdG9nZ2xlQ2xhc3MgPSAnc2Vzc2lvblNlbGVjdCcgKyAodGhpcy5wcm9wcy5zZXNzaW9uVG9nZ2xlID8gJycgOiAnIGNvbGxhcHNlZCcpO1xuICAgIHZhciBvYmplY3ROb2RlcyA9IHRoaXMucHJvcHMuc2Vzc2lvbnNMaXN0Lm1hcChmdW5jdGlvbiAob2JqZWN0LCBpKSB7XG4gICAgICAgIHZhciBzdW0gPSBzZXNzaW9uc1ZvdGVzW29iamVjdC5pZF07XG4gICAgICAgIGlmIChzdW0pIHtcbiAgICAgICAgICB2YXIgc3RyaW5nID0gb2JqZWN0LmlkICsgJyAtICgnICsgc3VtICsgJyknO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8bGkgb25DbGljaz17dGhpcy5wcm9wcy5vblNlc3Npb25TZWxlY3QuYmluZChudWxsLG9iamVjdCl9IGtleT17aX0+PHNwYW4gY2xhc3NOYW1lPVwic2Vzc2lvblwiPntvYmplY3QuaWR9PC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJzdW1cIj57c3VtfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJpbGxTZWFyY2hcIj5cbiAgICAgICAgPGZvcm0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBiaWxscyBieSBuYW1lIG9yIG51bWJlci4uLlwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQmlsbFNlYXJjaENoYW5nZX0gLz4gIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0b2dnbGVDbGFzc30+ICAgIFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNlbGVjdFwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0VG9nZ2xlfT57c2VsZWN0VGV4dH08L3NwYW4+ICBcbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwic2Vzc2lvbk9wdGlvblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0LmJpbmQobnVsbCwnJyl9PjxzcGFuIGNsYXNzTmFtZT1cInNlc3Npb25cIj5hbnkgc2Vzc2lvbjwvc3Bhbj4gPHNwYW4gY2xhc3NOYW1lPVwic3VtXCI+e3Nlc3Npb25zVm90ZXNbJ3N1bSddfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICAge29iamVjdE5vZGVzfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmlsbFNlYXJjaDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFZvdGVSb3cgPSByZXF1aXJlKCcuL1ZvdGVSb3cuanMnKTtcbnZhciBCaWxsU3RhY2sgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnRWb3RlID0gdGhpcy5wcm9wcy5jdXJyZW50Vm90ZTtcbiAgICB2YXIgZ2V0QmlsbEluZm8gPSB0aGlzLnByb3BzLmdldEJpbGxJbmZvO1xuICAgIHZhciB2b3RlUm93cyA9IFtdO1xuICAgIHZhciBsb2FkZXIgPSBudWxsO1xuICAgIGlmICh0aGlzLnByb3BzLnZvdGVzLmxlbmd0aCAgPiAwKSB7XG4gICAgICB2YXIgZ2V0QmlsbFRleHQgPSB0aGlzLnByb3BzLmdldEJpbGxUZXh0O1xuICAgICAgdm90ZVJvd3MgPSB0aGlzLnByb3BzLnZvdGVzLm1hcChmdW5jdGlvbiAob2JqZWN0LCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPFZvdGVSb3dcbiAgICAgICAgICAgIGtleSA9IHtpfVxuICAgICAgICAgICAgdm90ZSA9IHtvYmplY3R9XG4gICAgICAgICAgICBjdXJyZW50Vm90ZSA9IHtjdXJyZW50Vm90ZX1cbiAgICAgICAgICAgIG9uQ2xpY2sgPSB7Z2V0QmlsbEluZm99XG4gICAgICAgICAgICBiaWxsSW5mbyA9IHt0aGlzLnByb3BzLmJpbGxJbmZvfVxuICAgICAgICAgICAgZ2V0UG9saXRpY2lhbiA9IHt0aGlzLnByb3BzLmdldFBvbGl0aWNpYW59IC8+XG4gICAgICAgICk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnByb3BzLnJldHJpZXZpbmdWb3Rlcykge1xuICAgICAgXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgdmFyIGVtcHR5Um93ID0gKFxuICAgICAgICAgIDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJ2b3RlUm93IHJvdyBlbXB0eVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWluIHJvd1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgbGVmdFwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzZXNzaW9uXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIG51bWJlclwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCB2b3RlIGZ1bGwtbGF5b3V0XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNob3J0bmFtZVwiPjxzcGFuPm5vIHJlc3VsdDwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgdm90ZSBtb2JpbGUtb25seVwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsYXdcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgZHJvcGRvd25cIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIHJpZ2h0XCI+PC9kaXY+IFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICAgIHZvdGVSb3dzLnB1c2goZW1wdHlSb3cpO1xuICAgICAgfVxuICAgICAgbG9hZGVyID0gPGRpdiBjbGFzc05hbWU9XCJsb2FkZXItY29udGFpbmVyXCI+PGRpdiBjbGFzc05hbWU9XCJsb2FkZXJcIj48L2Rpdj48L2Rpdj47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5vUmVzdWx0c1JvdyA9IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZvdGVSb3cgcm93IG5vcmVzdWx0c1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWluIHJvd1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj48c3Bhbj5ubyByZXN1bHRzIGZvdW5kPC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXJcIj48L2Rpdj4gXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgIHZvdGVSb3dzLnB1c2gobm9SZXN1bHRzUm93KTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSd2b3Rlcyc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiaWxsU3RhY2snPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciBsZWZ0XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNlc3Npb25cIj5TZXNzaW9uPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIG51bWJlclwiPk51bWJlcjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCB2b3RlIGZ1bGwtbGF5b3V0XCI+Vm90ZTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzaG9ydG5hbWVcIj5OYW1lPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHZvdGUgbW9iaWxlLW9ubHlcIj5Wb3RlPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGxhd1wiPkxhdzwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBkcm9wZG93blwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgcmlnaHRcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3ZvdGVSb3dzfVxuICAgICAgICAgICAge2xvYWRlcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApOyAgICAgICAgXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbGxTdGFjazsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBCaWxsU3RhY2sgPSByZXF1aXJlKCcuL0JpbGxTdGFjay5qcycpO1xudmFyIEJpbGxTZWFyY2ggPSByZXF1aXJlKCcuL0JpbGxTZWFyY2guanMnKTtcbnZhciBQcm9maWxlQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjbGFzc2VzID0gJ3Byb2ZpbGVCb3ggJyArIHRoaXMucHJvcHMuYm94O1xuICAgIHZhciBjbG9zZUNsYXNzID0gJ2Nsb3NlICcgKyB0aGlzLnByb3BzLmJveDtcbiAgICBpZiAoIXRoaXMucHJvcHMucHJvZmlsZS5wYXJ0eV9zbHVnKSB7XG4gICAgICB2YXIgcGFydHlOYW1lID0gdGhpcy5wcm9wcy5wcm9maWxlLnBhcnR5X25hbWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHBhcnR5TmFtZSA9IHRoaXMucHJvcHMucHJvZmlsZS5wYXJ0eV9zbHVnO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGVIZWFkZXJcIj5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJyZXR1cm5cIiBocmVmPVwiLyMvXCI+PGRpdiBjbGFzc05hbWUgPVwiaWNvblwiPjwvZGl2PjxzcGFuPnJldHVybiB0byBNUCBzZWFyY2g8L3NwYW4+PC9hPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT17Y2xvc2VDbGFzc30gaHJlZj1cIi8jL1wiPjwvYT5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwibmFtZVwiPnt0aGlzLnByb3BzLnByb2ZpbGUubmFtZX08L2gyPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImluZm9cIj48aDMgY2xhc3NOYW1lPVwicmlkaW5nXCI+e3RoaXMucHJvcHMucHJvZmlsZS5yaWRpbmd9PC9oMz48aDMgY2xhc3NOYW1lPVwicGFydHlcIj57cGFydHlOYW1lfTwvaDM+PC9zcGFuPlxuICAgICAgICAgIDxCaWxsU2VhcmNoIFxuICAgICAgICAgICAgb25CaWxsU2VhcmNoQ2hhbmdlPXt0aGlzLnByb3BzLm9uQmlsbFNlYXJjaENoYW5nZX1cbiAgICAgICAgICAgIG9uU2Vzc2lvblNlbGVjdFRvZ2dsZT17dGhpcy5wcm9wcy5vblNlc3Npb25TZWxlY3RUb2dnbGV9XG4gICAgICAgICAgICBvblNlc3Npb25TZWxlY3Q9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0fVxuICAgICAgICAgICAgc2Vzc2lvbnNMaXN0PXt0aGlzLnByb3BzLnNlc3Npb25zTGlzdH1cbiAgICAgICAgICAgIHNlc3Npb25Ub2dnbGUgPSB7dGhpcy5wcm9wcy5zZXNzaW9uVG9nZ2xlfVxuICAgICAgICAgICAgc2Vzc2lvbj17dGhpcy5wcm9wcy5zZXNzaW9ufVxuICAgICAgICAgICAgc2Vzc2lvbnNWb3RlcyA9IHt0aGlzLnByb3BzLnNlc3Npb25zVm90ZXN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxCaWxsU3RhY2sgXG4gICAgICAgIHZvdGVzPXt0aGlzLnByb3BzLnZvdGVzfSBcbiAgICAgICAgcmV0cmlldmluZ1ZvdGVzPXt0aGlzLnByb3BzLnJldHJpZXZpbmdWb3Rlc31cbiAgICAgICAgZ2V0QmlsbEluZm8gPSB7dGhpcy5wcm9wcy5nZXRCaWxsSW5mb31cbiAgICAgICAgY3VycmVudFZvdGUgPSB7dGhpcy5wcm9wcy5jdXJyZW50Vm90ZX1cbiAgICAgICAgYmlsbEluZm8gPSB7dGhpcy5wcm9wcy5iaWxsSW5mb31cbiAgICAgICAgZ2V0UG9saXRpY2lhbiA9IHt0aGlzLnByb3BzLmdldFBvbGl0aWNpYW59IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvZmlsZUJveDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFZvdGVSb3cgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnZvdGUudm90ZSA9PSAnWScpIHtcbiAgICAgIHZhciB2b3RlQ2xhc3MgPSAneWVzICc7XG4gICAgICB2YXIgdm90ZVRleHQgPSAneWVzJztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5wcm9wcy52b3RlLnZvdGUgPT0gJ04nKSB7XG4gICAgICB2YXIgdm90ZUNsYXNzID0gJ25vICc7XG4gICAgICB2YXIgdm90ZVRleHQgPSAnbm8nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciB2b3RlQ2xhc3MgPSAnJztcbiAgICAgIHZhciB2b3RlVGV4dCA9ICdubyB2b3RlJztcbiAgICB9XG4gICAgdm90ZUNsYXNzICs9ICd2b3RlIGNvbCAnO1xuICAgIHZhciBtb2JpbGVWb3RlQ2xhc3MgPSB2b3RlQ2xhc3MgKyAnbW9iaWxlLW9ubHknO1xuICAgIHZvdGVDbGFzcyArPSAnZnVsbC1sYXlvdXQnXG5cbiAgICB2YXIgbGF3VGV4dCA9IHRoaXMucHJvcHMudm90ZS5sYXcgPyAneWVzJyA6ICdubyc7XG4gICAgdmFyIGxhd0NsYXNzID0gJ2NvbCBsYXcgJyArIGxhd1RleHQ7XG5cbiAgICBpZiAodGhpcy5wcm9wcy52b3RlLnNob3J0X3RpdGxlX2VuKSB7XG4gICAgICB2YXIgbmFtZSA9IHRoaXMucHJvcHMudm90ZS5zaG9ydF90aXRsZV9lbjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgbmFtZSA9IHRoaXMucHJvcHMudm90ZS5uYW1lX2VuO1xuICAgIH1cbiAgICB2YXIgdm90ZVJvd0NsYXNzID0gXCJ2b3RlUm93IHJvd1wiO1xuICAgIGlmICh0aGlzLnByb3BzLnZvdGUudm90ZXF1ZXN0aW9uX2lkID09IHRoaXMucHJvcHMuY3VycmVudFZvdGUpIHtcbiAgICAgIHZvdGVSb3dDbGFzcyArPSBcIiBjdXJyZW50XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt2b3RlUm93Q2xhc3N9IGtleT17dGhpcy5wcm9wcy5rZXl9PlxuICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGljay5iaW5kKG51bGwsIHRoaXMpfSBjbGFzc05hbWU9XCJtYWluIHJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciBsZWZ0XCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc2Vzc2lvblwiPjxzcGFuIGNsYXNzTmFtZT1cImxhYmVsIG1vYmlsZS1vbmx5XCI+U2Vzc2lvbjwvc3Bhbj57dGhpcy5wcm9wcy52b3RlLnNlc3Npb25faWR9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbnVtYmVyXCI+PHNwYW4gY2xhc3NOYW1lPVwibGFiZWwgbW9iaWxlLW9ubHlcIj5OdW1iZXI8L3NwYW4+e3RoaXMucHJvcHMudm90ZS5udW1iZXJ9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3ZvdGVDbGFzc30+PHNwYW4gY2xhc3NOYW1lPVwidm90ZVRleHRcIj57dm90ZVRleHR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNob3J0bmFtZVwiPntuYW1lfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXttb2JpbGVWb3RlQ2xhc3N9PjxzcGFuIGNsYXNzTmFtZT1cImxhYmVsIG1vYmlsZS1vbmx5XCI+Vm90ZTwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJ2b3RlVGV4dFwiPnt2b3RlVGV4dH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2xhd0NsYXNzfT48c3BhbiBjbGFzc05hbWU9XCJsYWJlbCBtb2JpbGUtb25seVwiPkxhdzwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJsYXdUZXh0XCI+e2xhd1RleHR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGRyb3Bkb3duXCI+PHNwYW4+PEFycm93SWNvbiAvPjwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgcmlnaHRcIj48L2Rpdj4gXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Vm90ZUluZm9Sb3cgXG4gICAgICAgICAgdm90ZSA9IHt0aGlzLnByb3BzLnZvdGV9XG4gICAgICAgICAgY3VycmVudFZvdGUgPSB7dGhpcy5wcm9wcy5jdXJyZW50Vm90ZX1cbiAgICAgICAgICB2b3RlUXVlc3Rpb25JRCA9IHt0aGlzLnByb3BzLnZvdGUudm90ZXF1ZXN0aW9uX2lkfVxuICAgICAgICAgIGJpbGxJbmZvID0ge3RoaXMucHJvcHMuYmlsbEluZm99XG4gICAgICAgICAgZ2V0UG9saXRpY2lhbiA9IHt0aGlzLnByb3BzLmdldFBvbGl0aWNpYW59IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbnZhciBWb3RlSW5mb1JvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5mb0NsYXNzID0gXCJyb3cgaW5mb1wiO1xuICAgIHZhciBnZXRQb2xpdGljaWFuID0gdGhpcy5wcm9wcy5nZXRQb2xpdGljaWFuO1xuICAgIHZhciBzcG9uc29yQ29tcG9uZW50ID0gbnVsbDtcbiAgICBpZiAodGhpcy5wcm9wcy52b3RlUXVlc3Rpb25JRCA9PSB0aGlzLnByb3BzLmN1cnJlbnRWb3RlKSB7XG4gICAgICBpbmZvQ2xhc3MgKz0gJyBjdXJyZW50JztcbiAgICAgIHZhciBsYXdTdHJpbmcgPSAgJ0xhdzogJyArIHRoaXMucHJvcHMubGF3VGV4dDtcbiAgICAgIHZhciB2b3RlSW5mb3JtYXRpb24gPSA8ZGl2IGNsYXNzTmFtZT1cImNvbCBiaWxsSW5mb1wiPntsYXdTdHJpbmd9PC9kaXY+XG4gICAgICBpZiAodW5kZWZpbmVkICE9IHRoaXMucHJvcHMuYmlsbEluZm8udm90ZXMpIHtcbiAgICAgICAgdmFyIHBhcnR5Vm90ZU5vZGVzID0gW107XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIG5vZGUgPSAoXG4gICAgICAgICAgPGRpdiBrZXk9ezB9IGNsYXNzTmFtZT1cInBhcnR5Vm90ZUhlYWRlclwiIGtleT17aX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj5QYXJ0eTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ5ZXNcIj5ZRVM8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9cIj5OTzwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnN0YWluXCI+QUJTVEFJTjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgICBwYXJ0eVZvdGVOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICB5ZXNDb3VudCA9IDA7XG4gICAgICAgIG5vQ291bnQgPSAwO1xuICAgICAgICBhYnN0YWluQ291bnQgPSAwO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5wcm9wcy5iaWxsSW5mby52b3Rlcykge1xuICAgICAgICAgIGkrKztcbiAgICAgICAgICB2YXIgcGFydHlOYW1lID0ga2V5O1xuICAgICAgICAgIHZhciB5ZXMgPSB0aGlzLnByb3BzLmJpbGxJbmZvLnZvdGVzW2tleV1bJ1knXTtcbiAgICAgICAgICB2YXIgbm8gPSB0aGlzLnByb3BzLmJpbGxJbmZvLnZvdGVzW2tleV1bJ04nXTtcbiAgICAgICAgICB2YXIgYWJzdGFpbiA9IHRoaXMucHJvcHMuYmlsbEluZm8udm90ZXNba2V5XVsnQSddO1xuICAgICAgICAgIHZhciBub0NsYXNzID0gXCJub1wiO1xuICAgICAgICAgIHZhciB5ZXNDbGFzcyA9IFwieWVzXCI7XG4gICAgICAgICAgdmFyIGFic3RhaW5DbGFzcyA9IFwiYWJzdGFpblwiO1xuICAgICAgICAgIHZhciBwYXJ0eUNsYXNzID0gXCJwYXJ0eVZvdGVcIjtcbiAgICAgICAgICBpZiAoKHllcyA+IGFic3RhaW4pJiYoeWVzID4gbm8pKSB7XG4gICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIHllc1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICgobm8gPiBhYnN0YWluKSAmJiAobm8gPiB5ZXMpKSB7XG4gICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIG5vXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKChhYnN0YWluID4geWVzKSAmJiAoYWJzdGFpbiA+IG5vKSkge1xuICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiBhYnN0YWluXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCh5ZXMgPT0gbm8pKSB7XG4gICAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgdGllIHluXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh5ZXM9PWFic3RhaW4pIHtcbiAgICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiB0aWUgeWFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vPT1hYnN0YWluKSB7XG4gICAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgdGllIG5hXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiB0aWVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgeWVzQ291bnQgKz0geWVzO1xuICAgICAgICAgIG5vQ291bnQgKz0gbm87XG4gICAgICAgICAgYWJzdGFpbkNvdW50ICs9IGFic3RhaW47XG4gICAgICAgICAgdmFyIG5vZGUgPSAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cGFydHlDbGFzc30ga2V5PXtpfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+e3BhcnR5TmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3llc0NsYXNzfT48c3Bhbj57eWVzfTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e25vQ2xhc3N9PjxzcGFuPntub308L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXthYnN0YWluQ2xhc3N9PjxzcGFuPnthYnN0YWlufTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgICAgcGFydHlWb3RlTm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdG90YWxDbGFzcyA9IFwicGFydHlWb3RlIHRvdGFsIFwiO1xuICAgICAgICBpZiAoeWVzQ291bnQgPiBub0NvdW50KSB7XG4gICAgICAgICAgaWYgKHllc0NvdW50ID4gYWJzdGFpbkNvdW50KSB7XG4gICAgICAgICAgICB0b3RhbENsYXNzICs9IFwiIHllc1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRvdGFsQ2xhc3MgKz0gXCIgYWJzdGFpblwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAobm9Db3VudCA+IGFic3RhaW5Db3VudCkge1xuICAgICAgICAgICAgdG90YWxDbGFzcyArPSBcIiBub1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRvdGFsQ2xhc3MgKz0gXCIgYWJzdGFpblwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgdG90YWxSb3cgPSAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0eVZvdGUgdG90YWxcIiBrZXk9XCJ0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj5Ub3RhbDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ5ZXNcIj48c3Bhbj57eWVzQ291bnR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub1wiPjxzcGFuPntub0NvdW50fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzdGFpblwiPjxzcGFuPnthYnN0YWluQ291bnR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgICBwYXJ0eVZvdGVOb2Rlcy5wdXNoKHRvdGFsUm93KTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYmlsbEluZm8uc3BvbnNvcikge1xuICAgICAgICAgIHZhciBzcG9uc29yUHJvZmlsZSA9IGdldFBvbGl0aWNpYW4odW5kZWZpbmVkLCB0aGlzLnByb3BzLmJpbGxJbmZvLnNwb25zb3IpO1xuICAgICAgICAgIHZhciBpbWdVUkwgPSBcInVybCgnL3N0YXRpYy9oZWFkc2hvdHMvXCIgKyBzcG9uc29yUHJvZmlsZS5pbWd1cmwgKyBcIicpXCI7XG4gICAgICAgICAgdmFyIHNwb25zb3JDbGFzc1N0cmluZyA9ICdzcG9uc29yUHJvZmlsZSAnO1xuICAgICAgICAgIHZhciBocmVmID0gJy8jL3Byb2ZpbGUvJyArIHNwb25zb3JQcm9maWxlLmlkO1xuICAgICAgICAgIGlmICghc3BvbnNvclByb2ZpbGUucGFydHlfc2x1Zykge1xuICAgICAgICAgICAgdmFyIHBhcnR5TmFtZSA9IHNwb25zb3JQcm9maWxlLnBhcnR5X25hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3BvbnNvckNsYXNzU3RyaW5nICs9IHNwb25zb3JQcm9maWxlLnBhcnR5X3NsdWc7XG4gICAgICAgICAgICB2YXIgcGFydHlOYW1lID0gc3BvbnNvclByb2ZpbGUucGFydHlfc2x1ZztcbiAgICAgICAgICB9XG4gICAgICAgICAgc3BvbnNvckNvbXBvbmVudCA9IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwb25zb3JcIj5cbiAgICAgICAgICAgICAgPGg0PkJpbGwgU3BvbnNvcjwvaDQ+XG4gICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17c3BvbnNvckNsYXNzU3RyaW5nfSBocmVmPXtocmVmfSA+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2JhY2tncm91bmRJbWFnZTogaW1nVVJMfX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGgzPntzcG9uc29yUHJvZmlsZS5uYW1lfTwvaDM+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmlkaW5nXCI+e3Nwb25zb3JQcm9maWxlLnJpZGluZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicGFydHlcIj57cGFydHlOYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcG9uc29yQ29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBwYXJ0eVZvdGVOb2RlcyA9ICcnO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBwYXJ0eVZvdGVOb2RlcyA9ICcnO1xuICAgIH1cbiAgICB2YXIgb3BlbnBhcmxpYW1lbnRVUkwgPSBcIi8vb3BlbnBhcmxpYW1lbnQuY2EvYmlsbHMvXCIgKyB0aGlzLnByb3BzLnZvdGUuc2Vzc2lvbl9pZCArIFwiL1wiICsgdGhpcy5wcm9wcy52b3RlLm51bWJlciArIFwiL1wiO1xuICAgIHNlc3Npb25OdW1iZXJzID0gdGhpcy5wcm9wcy52b3RlLnNlc3Npb25faWQuc3BsaXQoXCItXCIpO1xuICAgIHZhciBwYXJsVVJMID0gXCJodHRwOi8vd3d3LnBhcmwuZ2MuY2EvTEVHSVNJbmZvL0xBQUcuYXNweD9sYW5ndWFnZT1FJlBhcmw9XCIgKyBzZXNzaW9uTnVtYmVyc1swXSArIFwiJlNlcz1cIiArIHNlc3Npb25OdW1iZXJzWzFdO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17aW5mb0NsYXNzfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgbGVmdFwiPjwvZGl2PlxuICAgICAgICAgIHtzcG9uc29yQ29tcG9uZW50fVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHBhcnR5Vm90ZXNcIj5cbiAgICAgICAgICAgIDxoND5QYXJ0eSBWb3RlczwvaDQ+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnR5Vm90ZXNUYWJsZVwiPlxuICAgICAgICAgICAgICB7cGFydHlWb3RlTm9kZXN9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBtb3JlQmlsbEluZm9cIj5cbiAgICAgICAgICA8aDQ+TW9yZSBJbmZvcm1hdGlvbjwvaDQ+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxhIGhyZWY9e29wZW5wYXJsaWFtZW50VVJMfSB0YXJnZXQ9XCJfYmxhbmtcIj52aWV3IGJpbGwgb24gb3BlbnBhcmxpYW1lbnQuY2EgPEFycm93SWNvbiAvPjwvYT5cbiAgICAgICAgICAgIDxhIGhyZWY9e3BhcmxVUkx9IHRhcmdldD1cIl9ibGFua1wiPnZpZXcgc2Vzc2lvbiBvbiBwYXJsLmdjLmNhIDxBcnJvd0ljb24gLz48L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIHJpZ2h0XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbnZhciBBcnJvd0ljb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzdmcgdmVyc2lvbj1cIjEuMVwiIHg9XCIwcHhcIiB5PVwiMHB4XCJcbiAgICAgICAgIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiPlxuICAgICAgICA8cGF0aCBkPVwiTTE2My41LDMzNC41bC00Ny4xLTQ3LjFsODcuNS04Ny41bC04Ny41LTg3LjVsNDcuMS00Ny4xTDI5OCwyMDBMMTYzLjUsMzM0LjV6XCIvPlxuICAgICAgPC9zdmc+XG4gICAgKTtcbiAgfVxufSk7XG52YXIgQmlsbFNlYXJjaCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZXNzaW9uID09ICcnKSB7XG4gICAgICB2YXIgc2VsZWN0VGV4dCA9ICdhbnkgc2Vzc2lvbic7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHNlbGVjdFRleHQgPSB0aGlzLnByb3BzLnNlc3Npb247XG4gICAgfVxuICAgIHZhciBzZXNzaW9uc1ZvdGVzID0gdGhpcy5wcm9wcy5zZXNzaW9uc1ZvdGVzO1xuICAgIHZhciB0b2dnbGVDbGFzcyA9ICdzZXNzaW9uU2VsZWN0JyArICh0aGlzLnByb3BzLnNlc3Npb25Ub2dnbGUgPyAnJyA6ICcgY29sbGFwc2VkJyk7XG4gICAgdmFyIG9iamVjdE5vZGVzID0gdGhpcy5wcm9wcy5zZXNzaW9uc0xpc3QubWFwKGZ1bmN0aW9uIChvYmplY3QsIGkpIHtcbiAgICAgICAgdmFyIHN1bSA9IHNlc3Npb25zVm90ZXNbb2JqZWN0LmlkXTtcbiAgICAgICAgaWYgKHN1bSkge1xuICAgICAgICAgIHZhciBzdHJpbmcgPSBvYmplY3QuaWQgKyAnIC0gKCcgKyBzdW0gKyAnKSc7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxsaSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2Vzc2lvblNlbGVjdC5iaW5kKG51bGwsb2JqZWN0KX0ga2V5PXtpfT48c3BhbiBjbGFzc05hbWU9XCJzZXNzaW9uXCI+e29iamVjdC5pZH08L3NwYW4+IDxzcGFuIGNsYXNzTmFtZT1cInN1bVwiPntzdW19PC9zcGFuPjwvbGk+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmlsbFNlYXJjaFwiPlxuICAgICAgICA8Zm9ybT5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJpbGxzIGJ5IG5hbWUgb3IgbnVtYmVyLi4uXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25CaWxsU2VhcmNoQ2hhbmdlfSAvPiAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RvZ2dsZUNsYXNzfT4gICAgXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2VsZWN0XCIgb25DbGljaz17dGhpcy5wcm9wcy5vblNlc3Npb25TZWxlY3RUb2dnbGV9PntzZWxlY3RUZXh0fTwvc3Bhbj4gIFxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJzZXNzaW9uT3B0aW9uXCIgb25DbGljaz17dGhpcy5wcm9wcy5vblNlc3Npb25TZWxlY3QuYmluZChudWxsLCcnKX0+PHNwYW4gY2xhc3NOYW1lPVwic2Vzc2lvblwiPmFueSBzZXNzaW9uPC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJzdW1cIj57c2Vzc2lvbnNWb3Rlc1snc3VtJ119PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICB7b2JqZWN0Tm9kZXN9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBWb3RlUm93OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgU2VhcmNoU3RhY2sgPSByZXF1aXJlKCcuL1NlYXJjaFN0YWNrLmpzJyk7XG5TZWFyY2hCb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNsYXNzZXMgPSAnc2VhcmNoQm94ICcgKyB0aGlzLnByb3BzLmJveDsgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9IG9uU2Nyb2xsPXt0aGlzLnByb3BzLm9uU2VhcmNoU2Nyb2xsLmJpbmQobnVsbCwgdGhpcyl9ID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcExpbmtzXCI+PGEgaHJlZj1cIi8jL2luZm9cIiBjbGFzc05hbWU9XCJpbmZvXCI+PC9hPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vc2hheXFuL3BhcmxlXCIgY2xhc3NOYW1lPVwiZ2l0aHViXCI+PC9hPjwvZGl2PlxuICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaC4uLlwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uU2VhcmNoQ2hhbmdlfSAvPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2VhcmNoPC9idXR0b24+XG4gICAgICAgICAgICA8c3Bhbj5ieSBuYW1lLCByaWRpbmcsIG9yIHBvc3RhbCBjb2RlPC9zcGFuPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaENvbnRlbnRcIj5cbiAgICAgICAgICAgIDxTZWFyY2hTdGFjayBcbiAgICAgICAgICAgICAgYm94PXt0aGlzLnByb3BzLmJveH0gXG4gICAgICAgICAgICAgIHBvbGl0aWNpYW5zPXt0aGlzLnByb3BzLnBvbGl0aWNpYW5zfSBcbiAgICAgICAgICAgICAgcHJvZmlsZT17dGhpcy5wcm9wcy5wcm9maWxlfVxuICAgICAgICAgICAgICBzZWFyY2hpbmc9e3RoaXMucHJvcHMuc2VhcmNoaW5nfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbnZhciBTZWFyY2hTdGFjayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICBjbGFzc1N0cmluZyA9IFwic2VhcmNoU3RhY2tcIjtcbiAgICB2YXIgY3VycmVudFByb2ZpbGVJRCA9IHRoaXMucHJvcHMucHJvZmlsZS5pZDtcbiAgICB2YXIgcG9saXRpY2lhbk5vZGVzID0gW107XG4gICAgaWYgKHRoaXMucHJvcHMucG9saXRpY2lhbnMubGVuZ3RoID4gMCkge1xuICAgICAgcG9saXRpY2lhbk5vZGVzID0gdGhpcy5wcm9wcy5wb2xpdGljaWFucy5tYXAoZnVuY3Rpb24gKG9iamVjdCwgaSkge1xuICAgICAgICB2YXIgaW1nVVJMID0gXCJ1cmwoJy9zdGF0aWMvaGVhZHNob3RzL1wiICsgb2JqZWN0LmltZ3VybCArIFwiJylcIjtcbiAgICAgICAgdmFyIGNsYXNzU3RyaW5nID0gJyc7XG4gICAgICAgIGlmIChvYmplY3QuaWQgPT0gY3VycmVudFByb2ZpbGVJRCkge1xuICAgICAgICAgIGNsYXNzU3RyaW5nICs9ICdhY3RpdmUgJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG9iamVjdC5pZCA9PSBjdXJyZW50UHJvZmlsZUlEKSYmKHRoaXMucHJvcHMuYm94ID09ICdwcm9maWxlJykpIHtcbiAgICAgICAgICB2YXIgaHJlZiA9ICcvIy8nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhciBocmVmID0gJy8jL3Byb2ZpbGUvJyArIG9iamVjdC5pZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqZWN0LmFjdGl2ZSkge1xuICAgICAgICAgIGNsYXNzU3RyaW5nICs9ICdjdXJyZW50ICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvYmplY3QucGFydHlfc2x1Zykge1xuICAgICAgICAgIHZhciBwYXJ0eU5hbWUgPSBvYmplY3QucGFydHlfbmFtZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjbGFzc1N0cmluZyArPSBvYmplY3QucGFydHlfc2x1ZztcbiAgICAgICAgICB2YXIgcGFydHlOYW1lID0gb2JqZWN0LnBhcnR5X3NsdWc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iamVjdC5uYW1lLmxlbmd0aD4xOSkge1xuICAgICAgICAgIGlmIChvYmplY3QubmFtZS5sZW5ndGggPiAyMikge1xuICAgICAgICAgICAgY2xhc3NTdHJpbmcgKz0gJyByZWR1Y2UtbGFyZ2UnXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2xhc3NTdHJpbmcgKz0gJyByZWR1Y2UtbWVkaXVtJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8YSBjbGFzc05hbWU9e2NsYXNzU3RyaW5nfSBocmVmPXtocmVmfSBrZXk9e2l9ID5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tiYWNrZ3JvdW5kSW1hZ2U6IGltZ1VSTH19PjwvZGl2PlxuICAgICAgICAgICAgPGgzPntvYmplY3QubmFtZX08L2gzPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicGFydHlcIj57cGFydHlOYW1lfTwvc3Bhbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgICk7XG4gICAgICB9LmJpbmQodGhpcykpOyAgXG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMucHJvcHMuc2VhcmNoaW5nKSB7XG4gICAgICB2YXIgbm9SZXN1bHRzTm9kZSA9IDxhPjxoMz5OTyBSRVNVTFRTPC9oMz48L2E+O1xuICAgICAgcG9saXRpY2lhbk5vZGVzLnB1c2gobm9SZXN1bHRzTm9kZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHBsYWNlSG9sZGVyTmFtZXMgPSBbJ0pvaG4gQS4gTWNUZW1wJywgJ0pvaG4gRmFrZW5iYWtlcicsICdQaWVycmUgVGVtcGRlYXUnXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgIHZhciBlbXB0eU5vZGUgPSA8YSBrZXk9e2l9IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyXCIgaHJlZj1cIi8jL1wiPjxkaXY+PC9kaXY+PGgzPntwbGFjZUhvbGRlck5hbWVzW2klM119PC9oMz48c3BhbiBjbGFzc05hbWU9XCJwYXJ0eVwiPlZBTjwvc3Bhbj48L2E+O1xuICAgICAgICBwb2xpdGljaWFuTm9kZXMucHVzaChlbXB0eU5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzU3RyaW5nfT5cbiAgICAgICAgPGgyPk1lbWJlcnMgb2YgUGFybGlhbWVudDxzcGFuIGNsYXNzTmFtZT1cImxlYWZcIj48L3NwYW4+PC9oMj5cbiAgICAgICAge3BvbGl0aWNpYW5Ob2Rlc31cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBTZWFyY2hCb3g7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBTZWFyY2hTdGFjayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTZWFyY2hTdGFja1wiLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzU3RyaW5nID0gXCJzZWFyY2hTdGFja1wiO1xuICAgIHZhciBjdXJyZW50UHJvZmlsZUlEID0gdGhpcy5wcm9wcy5wcm9maWxlLmlkO1xuICAgIHZhciBwb2xpdGljaWFuTm9kZXMgPSBbXTtcbiAgICBpZiAodGhpcy5wcm9wcy5wb2xpdGljaWFucy5sZW5ndGggPiAwKSB7XG4gICAgICBwb2xpdGljaWFuTm9kZXMgPSB0aGlzLnByb3BzLnBvbGl0aWNpYW5zLm1hcChmdW5jdGlvbiAob2JqZWN0LCBpKSB7XG4gICAgICAgIHZhciBpbWdVUkwgPSBcInVybCgnL3N0YXRpYy9oZWFkc2hvdHMvXCIgKyBvYmplY3QuaW1ndXJsICsgXCInKVwiO1xuICAgICAgICB2YXIgY2xhc3NTdHJpbmcgPSAnJztcbiAgICAgICAgaWYgKG9iamVjdC5pZCA9PSBjdXJyZW50UHJvZmlsZUlEKSB7XG4gICAgICAgICAgY2xhc3NTdHJpbmcgKz0gJ2FjdGl2ZSAnO1xuICAgICAgICB9XG4gICAgICAgIGlmICgob2JqZWN0LmlkID09IGN1cnJlbnRQcm9maWxlSUQpJiYodGhpcy5wcm9wcy5ib3ggPT0gJ3Byb2ZpbGUnKSkge1xuICAgICAgICAgIHZhciBocmVmID0gJy8jLyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdmFyIGhyZWYgPSAnLyMvcHJvZmlsZS8nICsgb2JqZWN0LmlkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmplY3QuYWN0aXZlKSB7XG4gICAgICAgICAgY2xhc3NTdHJpbmcgKz0gJ2N1cnJlbnQgJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9iamVjdC5wYXJ0eV9zbHVnKSB7XG4gICAgICAgICAgdmFyIHBhcnR5TmFtZSA9IG9iamVjdC5wYXJ0eV9uYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNsYXNzU3RyaW5nICs9IG9iamVjdC5wYXJ0eV9zbHVnO1xuICAgICAgICAgIHZhciBwYXJ0eU5hbWUgPSBvYmplY3QucGFydHlfc2x1ZztcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqZWN0Lm5hbWUubGVuZ3RoPjE5KSB7XG4gICAgICAgICAgaWYgKG9iamVjdC5uYW1lLmxlbmd0aCA+IDIyKSB7XG4gICAgICAgICAgICBjbGFzc1N0cmluZyArPSAnIHJlZHVjZS1sYXJnZSdcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjbGFzc1N0cmluZyArPSAnIHJlZHVjZS1tZWRpdW0nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHtjbGFzc05hbWU6IGNsYXNzU3RyaW5nLCBocmVmOiBocmVmLCBrZXk6IGl9LCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiB7YmFja2dyb3VuZEltYWdlOiBpbWdVUkx9fSksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImgzXCIsIG51bGwsIG9iamVjdC5uYW1lKSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcInBhcnR5XCJ9LCBwYXJ0eU5hbWUpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfS5iaW5kKHRoaXMpKTsgIFxuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnByb3BzLnNlYXJjaGluZykge1xuICAgICAgdmFyIG5vUmVzdWx0c05vZGUgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgbnVsbCwgXCJOTyBSRVNVTFRTXCIpKTtcbiAgICAgIHBvbGl0aWNpYW5Ob2Rlcy5wdXNoKG5vUmVzdWx0c05vZGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBwbGFjZUhvbGRlck5hbWVzID0gWydKb2huIEEuIE1jVGVtcCcsICdKb2huIEZha2VuYmFrZXInLCAnUGllcnJlIFRlbXBkZWF1J107XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgMTE7IGkrKykge1xuICAgICAgICB2YXIgZW1wdHlOb2RlID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwge2tleTogaSwgY2xhc3NOYW1lOiBcInBsYWNlaG9sZGVyXCIsIGhyZWY6IFwiLyMvXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgbnVsbCwgcGxhY2VIb2xkZXJOYW1lc1tpJTNdKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJwYXJ0eVwifSwgXCJWQU5cIikpO1xuICAgICAgICBwb2xpdGljaWFuTm9kZXMucHVzaChlbXB0eU5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBjbGFzc1N0cmluZ30sIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgbnVsbCwgXCJNZW1iZXJzIG9mIFBhcmxpYW1lbnRcIiwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJsZWFmXCJ9KSksIFxuICAgICAgICBwb2xpdGljaWFuTm9kZXNcbiAgICAgIClcbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWFyY2hTdGFjazsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEJpbGxUZXh0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBwcmVwVGV4dDogZnVuY3Rpb24odGV4dCkge1xuICAgIHRleHQgPSB0ZXh0LnRyaW0oKTtcbiAgICByZXR1cm4gKHRleHQubGVuZ3RoPjA/JzxwPicrdGV4dC5yZXBsYWNlKC9bXFxyXFxuXSsvLCc8L3A+PHA+JykrJzwvcD4nOm51bGwpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYmlsbFRleHQgPSB0aGlzLnByZXBUZXh0KHRoaXMucHJvcHMuYmlsbFRleHQpO1xuICAgIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiaWxsVGV4dFwiPlxuICAgICAge2JpbGxUZXh0fVxuICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbGxUZXh0OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgQmlsbFRleHQgPSByZXF1aXJlKCcuL0JpbGxUZXh0LmpzJyk7XG52YXIgVGV4dEJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICdiaWxsVGV4dEJveCAnICsgdGhpcy5wcm9wcy5ib3g7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT48ZGl2IGNsYXNzTmFtZT1cImNsb3NlQ29udGFpbmVyXCI+PGEgaHJlZj1cIi8jL1wiPjwvYT48L2Rpdj48QmlsbFRleHQgYmlsbFRleHQ9e3RoaXMucHJvcHMuYmlsbFRleHR9IC8+PC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dEJveDsiLCJ2YXIgQXJyb3dJY29uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c3ZnIHZlcnNpb249XCIxLjFcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG4gICAgICAgICB2aWV3Qm94PVwiMCAwIDQwMCA0MDBcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xNjMuNSwzMzQuNWwtNDcuMS00Ny4xbDg3LjUtODcuNWwtODcuNS04Ny41bDQ3LjEtNDcuMUwyOTgsMjAwTDE2My41LDMzNC41elwiLz5cbiAgICAgIDwvc3ZnPlxuICAgICk7XG4gIH1cbn0pOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG5pZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJykgeyAvLyBmYWlsIGdyYWNlZnVsbHlcbiAgdHJhY2tlciA9IGdhLmNyZWF0ZSgnVUEtNjc4MDQ0NTEtMScsICd2b3Rlcy5tcCcpO1xufVxuZnVuY3Rpb24gZ2FUcmFjayhwYXRoLCB0aXRsZSkge1xuICBpZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJykgeyAvLyBmYWlsIGdyYWNlZnVsbHlcbiAgICBpZiAocGF0aD09XCJcIikge1xuICAgICAgcGF0aCA9IFwiL1wiO1xuICAgIH1cbiAgICBnYSgnc2V0JywgeyBwYWdlOiBwYXRoLCB0aXRsZTogdGl0bGUgfSk7XG4gICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcbiAgfVxufVxuXG4vLyBFbGVtZW50c1xudmFyIEFycm93SWNvbiA9IHJlcXVpcmUoJy4vZWxlbWVudHMvQXJyb3dJY29uLmpzJyk7XG5cbi8vIEJveGVzXG52YXIgU2VhcmNoQm94ID0gcmVxdWlyZSgnLi9ib3hlcy9zZWFyY2gvU2VhcmNoQm94LmpzJyk7XG52YXIgUHJvZmlsZUJveCA9IHJlcXVpcmUoJy4vYm94ZXMvcHJvZmlsZS9Qcm9maWxlQm94LmpzJyk7XG52YXIgSW5mb0JveCA9IHJlcXVpcmUoJy4vYm94ZXMvaW5mby9JbmZvQm94LmpzJyk7XG52YXIgVGV4dEJveCA9IHJlcXVpcmUoJy4vYm94ZXMvdGV4dC9UZXh0Qm94LmpzJyk7XG5cblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXBwU3RhdGUgPSB0aGlzLnNldEFwcFN0YXRlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFwcDogYXBwU3RhdGUsXG4gICAgICBib3g6ICdzZWFyY2gnLFxuICAgICAgcG9saXRpY2lhbnM6IFtdLFxuICAgICAgaWQ6ICcnLFxuICAgICAgcG9saXRpY2lhbjoge30sXG4gICAgICBwcm9maWxlOiAnJyxcbiAgICAgIGN1cnJlbnRWb3RlOiAwLFxuICAgICAgc2VhcmNoaW5nOiBmYWxzZSxcbiAgICAgIHJldHJpZXZpbmdWb3RlczogdHJ1ZSxcbiAgICAgIHZvdGVzOiBbXSxcbiAgICAgIGJpbGxJbmZvOiBbXSxcbiAgICAgIGJpbGxUZXh0OiBcIlwiLFxuICAgICAgc2Vzc2lvbnNMaXN0OiBbXSxcbiAgICAgIHNlc3Npb246ICcnLFxuICAgICAgc2Vzc2lvblRvZ2dsZTogZmFsc2UsXG4gICAgICBtYXg6IDEwLFxuICAgICAgcmlkaW5nOiBcIlwiLFxuICAgIH07XG4gIH0sXG5cbiAgc2V0QXBwU3RhdGU6IGZ1bmN0aW9uKHByZXZTdGF0ZSkge1xuICAgIGlmICh0eXBlb2YocHJldlN0YXRlKT09PSd1bmRlZmluZWQnKSBwcmV2U3RhdGUgPSB7IFxuICAgICAgYXBwOiB7XG4gICAgICAgIGJveDogJ3NlYXJjaCcsXG4gICAgICAgIG5leHRCb3g6ICdzZWFyY2gnLFxuICAgICAgICBwb2xpdGljaWFuTGlzdDoge30sXG4gICAgICAgIHNlc3Npb25zTGlzdDoge30sXG4gICAgICAgIHNlc3Npb25zOiBbJzQyLTInLCAnNDItMSddLFxuICAgICAgICBzZWFyY2g6IHtcbiAgICAgICAgICBpc1NlYXJjaGluZzogZmFsc2UsXG4gICAgICAgICAgc2VhcmNoVmFsdWU6ICcnLFxuICAgICAgICAgIHJpZGluZzogJycsXG4gICAgICAgICAgbWF4OiAxMCxcbiAgICAgICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHByb2ZpbGU6IHtcbiAgICAgICAgICBpZDogMCxcbiAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICB2b3Rlczoge30sXG4gICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgdm90ZToge1xuICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIGJpbGw6IHtcbiAgICAgICAgICBpZDogMCxcbiAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgdXJsSGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcbiAgICB2YXIgbmV3U3RhdGUgPSBwcmV2U3RhdGU7XG4gICAgdmFyIHVybFBhcmFtZXRlcnMgPSB1cmxIYXNoLnNwbGl0KCcvJykuZmlsdGVyKGZ1bmN0aW9uKG4peyByZXR1cm4gbiAhPSAnJyB9KTtcbiAgICB2YXIgYm94ID0gcHJldlN0YXRlLmFwcC5ib3g7XG4gICAgaWYgKHVybFBhcmFtZXRlcnMubGVuZ3RoID49IDIpIHtcbiAgICAgIGlmICgodXJsUGFyYW1ldGVyc1swXSA9PSAncHJvZmlsZScpICYmICFpc05hTih1cmxQYXJhbWV0ZXJzWzFdKSkge1xuICAgICAgICBuZXdTdGF0ZS5hcHAuYm94ID0gJ3Byb2ZpbGUnO1xuICAgICAgICBuZXdTdGF0ZS5hcHAucHJvZmlsZS5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICBuZXdTdGF0ZS5hcHAucHJvZmlsZS5pZCA9IHVybFBhcmFtZXRlcnNbMV07XG4gICAgICB9XG4gICAgICBlbHNlIGlmICgodXJsUGFyYW1ldGVyc1swXSA9PSAnYmlsbCcpICYmICFpc05hTih1cmxQYXJhbWV0ZXJzWzFdKSkge1xuICAgICAgICBuZXdTdGF0ZS5hcHAuYm94ID0gJ2JpbGwnO1xuICAgICAgICBuZXdTdGF0ZS5hcHAuYmlsbC5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICBuZXdTdGF0ZS5hcHAuYmlsbC5pZCA9IHVybFBhcmFtZXRlcnNbMV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh1cmxQYXJhbWV0ZXJzLmxlbmd0aCA+PSA0KSB7XG4gICAgICBpZiAoKHVybFBhcmFtZXRlcnNbMl0gPT0gJ3ZvdGUnKSAmJiAhaXNOYU4odXJsUGFyYW1ldGVyc1szXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2codXJsUGFyYW1ldGVyc1szXSk7XG4gICAgICAgIG5ld1N0YXRlLmFwcC52b3RlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIG5ld1N0YXRlLmFwcC52b3RlLmlkID0gdXJsUGFyYW1ldGVyc1szXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld1N0YXRlLmFwcDtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgdGhpcy5nZXRBcHBTdGF0ZUZyb21VUkwod2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpKTtcbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgdmFyIGluaXRpYWxpemVVUkwgPSAnL2luaXRpYWxpemUnO1xuICAgIHRoaXMuZmV0Y2hKU09OKGluaXRpYWxpemVVUkwsICdwb2xpdGljaWFucycpO1xuXG4gICAgdmFyIHNlc3Npb25zVVJMID0gJy9zZXNzaW9ucyc7XG4gICAgdGhpcy5mZXRjaEpTT04oc2Vzc2lvbnNVUkwsICdzZXNzaW9ucycpO1xuXG4gICAgdGhpcy5nZXRBcHBTdGF0ZUZyb21VUkwod2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpKTtcbiAgfSxcblxuICBjaGFuZ2VQb2xpdGljaWFuOiBmdW5jdGlvbihwb2xpdGljaWFuKSB7XG4gICAgaWYgKHBvbGl0aWNpYW4pIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBwb2xpdGljaWFuOiBwb2xpdGljaWFuLFxuICAgICAgICB2b3RlczogW10sXG4gICAgICAgIGJveDogJ3Byb2ZpbGUnLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmdldFBvbGl0aWNpYW5Wb3Rlcyhwb2xpdGljaWFuLmlkKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5pZCAmJiAoKHRoaXMuc3RhdGUuYm94ID09ICdwcm9maWxlJykgfHwgKHRoaXMuc3RhdGUuYm94ID09ICdpbmZvJykgKSkge1xuICAgICAgcG9saXRpY2lhbiA9IHRoaXMuZ2V0UG9saXRpY2lhbigpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHBvbGl0aWNpYW46IHBvbGl0aWNpYW4sXG4gICAgICB9KTtcbiAgICAgIHRoaXMuZ2V0UG9saXRpY2lhblZvdGVzKHBvbGl0aWNpYW4uaWQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBwb2xpdGljaWFuOiB7fSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBvblNlYXJjaENoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgbWF4ID0gdGhpcy5jaGVja01heCgpO1xuICAgIHZhciBwb3N0YWxSZWdFeCA9IG5ldyBSZWdFeHAoXCJeW0FCQ0VHSEpLTE1OUFJTVFZYWWFiY2VnaGprbG1ucHJzdHZ4eV17MX1cXFxcZHsxfVtBLVphLXpdezF9ICpcXFxcZHsxfVtBLVphLXpdezF9XFxcXGR7MX0kXCIsIFwiaVwiKTtcbiAgICBpZiAocG9zdGFsUmVnRXgudGVzdChldmVudC50YXJnZXQudmFsdWUpKSB7XG4gICAgICB2YXIgc3RyID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL1xccysvZywgJycpO1xuICAgICAgc3RyID0gc3RyLnRvVXBwZXJDYXNlKCk7XG4gICAgICB2YXIgcG9zdGFsVVJMID0gJ2h0dHBzOi8vcmVwcmVzZW50Lm9wZW5ub3J0aC5jYS9wb3N0Y29kZXMvJyArIHN0ciArICcvP3NldHM9ZmVkZXJhbC1lbGVjdG9yYWwtZGlzdHJpY3RzJztcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHBvc3RhbFVSTCwgdHJ1ZSk7XG4gICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgLy8gU3VjY2VzcyFcbiAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIHZhciByaWRpbmcgPSBkYXRhW1wiYm91bmRhcmllc19jb25jb3JkYW5jZVwiXVswXVtcIm5hbWVcIl07XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmlkaW5nOiByaWRpbmd9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyBXZSByZWFjaGVkIG91ciB0YXJnZXQgc2VydmVyLCBidXQgaXQgcmV0dXJuZWQgYW4gZXJyb3JcbiAgICAgICAgICBjb25zb2xlLmxvZygnc2VydmVyIHJlYWNoZWQsIGJ1dCBpdCBkaWQgbm90IGdpdmUgZGF0YSAtIG9uU2VhcmNoQ2hhbmdlIG9wZW5ub3J0aCByZXF1ZXN0Jyk7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKTtcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb25uZWN0aW9uIHByb2JsZW0gLSBvblNlYXJjaENoYW5nZSBvcGVubm9ydGggcmVxdWVzdCcpO1xuICAgICAgICAvLyBUaGVyZSB3YXMgYSBjb25uZWN0aW9uIGVycm9yIG9mIHNvbWUgc29ydFxuICAgICAgfTtcbiAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNlYXJjaGluZzogdHJ1ZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgICAgbWF4OiBtYXhcbiAgICAgIH0pO1xuICAgIH0gXG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2VhcmNoaW5nOiB0cnVlLFxuICAgICAgICBzZWFyY2hWYWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgICBtYXg6IG1heCxcbiAgICAgICAgcmlkaW5nOiBcIlwiXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIG9uQmlsbFNlYXJjaENoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGJpbGxTZWFyY2hpbmc6IHRydWUsXG4gICAgICBiaWxsU2VhcmNoVmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIH0pO1xuICB9LFxuICBvblNlc3Npb25TZWxlY3Q6IGZ1bmN0aW9uKG9iamVjdCwgZXZlbnQpIHtcbiAgICBpZiAob2JqZWN0ICE9JycpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzZXNzaW9uVG9nZ2xlOiBmYWxzZSxcbiAgICAgICAgc2Vzc2lvbjogb2JqZWN0LmlkLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNlc3Npb25Ub2dnbGU6IGZhbHNlLFxuICAgICAgICBzZXNzaW9uOiAnJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgb25TZXNzaW9uU2VsZWN0VG9nZ2xlOiBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGUpe1xuICAgICAgaWYgKChlLnRhcmdldC5jbGFzc05hbWUgIT0gJ3Nlc3Npb25PcHRpb24nKSAmJiAoZS50YXJnZXQucGFyZW50Tm9kZS5jbGFzc05hbWUgIT0gJ3Nlc3Npb25PcHRpb24nKSAmJiAoZS50YXJnZXQuY2xhc3NOYW1lICE9ICdzZWxlY3QnKSAmJiAoZS50YXJnZXQuY2xhc3NOYW1lICE9ICdzZXNzaW9uU2VsZWN0JykpIHsgICBcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgc2Vzc2lvblRvZ2dsZTogIXRoaXMuc3RhdGUuc2Vzc2lvblRvZ2dsZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdGVuZXIpO1xuICAgIH0uYmluZCh0aGlzKTtcbiAgICBpZiAoIXRoaXMuc3RhdGUuc2Vzc2lvblRvZ2dsZSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZXNzaW9uVG9nZ2xlOiAhdGhpcy5zdGF0ZS5zZXNzaW9uVG9nZ2xlLFxuICAgIH0pO1xuICB9LFxuICBnZXRBcHBTdGF0ZUZyb21VUkw6IGZ1bmN0aW9uKHVybEhhc2gpIHtcbiAgICB2YXIgYm94ID0gJ3NlYXJjaCc7XG4gICAgdmFyIGlkID0gJyc7XG4gICAgdmFyIHBvbGl0aWNpYW4gPSB0aGlzLnN0YXRlLnBvbGl0aWNpYW47XG4gICAgdmFyIHVybFBhcmFtZXRlcnMgPSB1cmxIYXNoLnNwbGl0KCcvJykuZmlsdGVyKGZ1bmN0aW9uKG4peyByZXR1cm4gbiAhPSAnJyB9KTtcbiAgICAgIGlmICh1cmxQYXJhbWV0ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYm94ID0gdXJsUGFyYW1ldGVyc1swXTtcbiAgICAgICAgc3dpdGNoIChib3gpIHtcbiAgICAgICAgICBjYXNlICdwcm9maWxlJzogYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYmlsbCc6IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2luZm8nOiBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OiBib3ggPSAnc2VhcmNoJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsUGFyYW1ldGVycy5sZW5ndGggPj0gMikge1xuICAgICAgICAgIGlkID0gIWlzTmFOKHVybFBhcmFtZXRlcnNbMV0pID8gdXJsUGFyYW1ldGVyc1sxXSA6ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYm94ID09ICdzZWFyY2gnKSB7XG4gICAgICAgIGdhVHJhY2sodXJsSGFzaCwgXCJTZWFyY2hcIik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChib3ggPT0gJ3Byb2ZpbGUnKSB7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgIHZhciBuYW1lID0gaWQ7XG4gICAgICAgICAgZm9yICh2YXIgaT0wOyBpIDwgdGhpcy5zdGF0ZS5wb2xpdGljaWFucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucG9saXRpY2lhbnNbaV0uaWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgbmFtZSA9IHRoaXMuc3RhdGUucG9saXRpY2lhbnNbaV0ubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHRpdGxlID0gXCJQcm9maWxlL1wiICsgbmFtZTtcbiAgICAgICAgICBnYVRyYWNrKHVybEhhc2gsIHRpdGxlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB2YXIgdGl0bGUgPSBcIlByb2ZpbGUvXCI7XG4gICAgICAgICAgZ2FUcmFjayh1cmxIYXNoLCB0aXRsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGJveCA9PSAnaW5mbycpIHtcbiAgICAgICAgZ2FUcmFjayh1cmxIYXNoLCBcIkluZm9cIik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZ2FUcmFjayh1cmxIYXNoLCBcIlVua25vd25cIik7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYm94OiBib3gsXG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgdm90ZXM6IFtdLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmNoYW5nZVBvbGl0aWNpYW4oKTtcbiAgfSxcbiAgY2hhbmdlUGFnZVRpdGxlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuYm94ID09ICdzZWFyY2gnKSB7XG4gICAgICBkb2N1bWVudC50aXRsZSA9ICd2b3Rlcy5NUCAtIHNlYXJjaCBDYW5hZGlhbiBNUCB2b3RpbmcgcmVjb3Jkcyc7XG4gICAgfVxuICAgIGVsc2UgaWYgKCh0aGlzLnN0YXRlLmJveCA9PSAncHJvZmlsZScpICYmICh0aGlzLnN0YXRlLnBvbGl0aWNpYW4ubmFtZSkpIHtcbiAgICAgIHZhciB0aXRsZVRleHQgPSB0aGlzLnN0YXRlLnBvbGl0aWNpYW4ubmFtZTtcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gJ3ZvdGVzLk1QIC0gJyArIHRpdGxlVGV4dDtcbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24ocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBpZiAocHJldlN0YXRlLnBvbGl0aWNpYW4gIT0gdGhpcy5zdGF0ZS5wb2xpdGljaWFuKSB7XG4gICAgICB0aGlzLmNoYW5nZVBhZ2VUaXRsZSgpO1xuICAgIH1cbiAgfSxcbiAgZ2V0U2Vzc2lvblZvdGVzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2Vzc2lvblZvdGVzID0ge307XG4gICAgdmFyIHNlc3Npb25TdW0gPSAwO1xuICAgIGZvcih2YXIgaT0wOyBpPHRoaXMuc3RhdGUuc2Vzc2lvbnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgc2Vzc2lvblZvdGVzW3RoaXMuc3RhdGUuc2Vzc2lvbnNMaXN0W2ldLmlkXT0wO1xuICAgIH1cbiAgICBmb3IodmFyIGk9MDsgaTx0aGlzLnN0YXRlLnZvdGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgIHNlc3Npb25TdW0gKz0gMTtcbiAgICAgIHNlc3Npb25Wb3Rlc1t0aGlzLnN0YXRlLnZvdGVzW2ldLnNlc3Npb25faWRdICs9IDE7XG4gICAgfVxuICAgIHNlc3Npb25Wb3Rlc1snc3VtJ10gPSBzZXNzaW9uU3VtO1xuICAgIHJldHVybiBzZXNzaW9uVm90ZXM7XG4gIH0sXG4gIGdldFBvbGl0aWNpYW46IGZ1bmN0aW9uKHBvbGl0aWNpYW5zLCBpZCkge1xuICAgIGlmICh0eXBlb2YocG9saXRpY2lhbnMpPT09J3VuZGVmaW5lZCcpIHBvbGl0aWNpYW5zID0gdGhpcy5zdGF0ZS5wb2xpdGljaWFucztcbiAgICBpZiAodHlwZW9mKGlkKT09PSd1bmRlZmluZWQnKSBpZCA9IHRoaXMuc3RhdGUuaWQ7XG4gICAgaWYgKGlkKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgcG9saXRpY2lhbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHBvbGl0aWNpYW5zW2ldLmlkID09IGlkKSB7XG4gICAgICAgICAgcmV0dXJuIHBvbGl0aWNpYW5zW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfSxcbiAgZ2V0UG9saXRpY2lhblZvdGVzOiBmdW5jdGlvbihpZCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyAncmV0cmlldmluZ1ZvdGVzJyA6IHRydWVcbiAgICB9KTtcbiAgICB2YXIgdXJsID0gJy9wb2wvJyArIGlkO1xuICAgIHRoaXMuZmV0Y2hKU09OKHVybCwgJ3ZvdGVzJyk7XG4gIH0sXG4gIGdldEJpbGxJbmZvOiBmdW5jdGlvbihvYmplY3QsIGV2ZW50KSB7XG4gICAgLy9jb25zb2xlLmxvZyhcImludm9rZWRcIik7IFxuICAgIC8vY29uc29sZS5sb2cob2JqZWN0KTtcbiAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcbiAgICBpZiAob2JqZWN0LnByb3BzLnZvdGUudm90ZXF1ZXN0aW9uX2lkID09IHRoaXMuc3RhdGUuY3VycmVudFZvdGUpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRWb3RlOiAwLFxuICAgICAgICAgICAgICAgICAgICBiaWxsSW5mbzogW10sXG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgdXJsID0gJy9iaWxsLycgKyBvYmplY3QucHJvcHMudm90ZS52b3RlcXVlc3Rpb25faWQ7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3VycmVudFZvdGU6IG9iamVjdC5wcm9wcy52b3RlLnZvdGVxdWVzdGlvbl9pZCxcbiAgICAgICAgYmlsbEluZm86IFtdLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmZldGNoSlNPTih1cmwsICdiaWxsX2luZm8nKTtcbiAgICB9XG4gIH0sXG4gIG9uU2VhcmNoU2Nyb2xsOiBmdW5jdGlvbih0aGluZ29uZSwgdGhpbmd0d28pIHtcbiAgICB2YXIgc2Nyb2xsVG9wID0gdGhpbmdvbmUuZ2V0RE9NTm9kZSgpLnNjcm9sbFRvcDtcbiAgICB2YXIgaGVpZ2h0ID0gdGhpbmdvbmUuZ2V0RE9NTm9kZSgpLnNjcm9sbEhlaWdodDtcbiAgICB2YXIgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBpZiAoKGggKyBzY3JvbGxUb3AgKyAxMDApID4gaGVpZ2h0KSB7XG4gICAgICB2YXIgbnVtID0gdGhpcy5maWx0ZXJQb2xpdGljaWFucygpLmxlbmd0aDtcbiAgICAgIGlmICh0aGlzLnN0YXRlLm1heCA8IG51bSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXggOiB0aGlzLnN0YXRlLm1heCArIDEwXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY2hlY2tNYXg6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZXdNYXggPSB0aGlzLnN0YXRlLm1heDtcbiAgICB2YXIgbnVtID0gdGhpcy5maWx0ZXJQb2xpdGljaWFucygpLmxlbmd0aDtcbiAgICBpZiAobnVtIDwgdGhpcy5zdGF0ZS5tYXgpIHtcbiAgICAgIG5ld01heCA9IG51bTtcbiAgICAgIGlmIChuZXdNYXggPCAxMCkge1xuICAgICAgICBuZXdNYXggPSAxMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld01heDtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcG9saXRpY2lhbkxpc3QgPSB0aGlzLmZpbHRlclBvbGl0aWNpYW5zKCkuc2xpY2UoMCwgdGhpcy5zdGF0ZS5tYXgpO1xuICAgIHZhciBzZXNzaW9uVm90ZXMgPSB0aGlzLmdldFNlc3Npb25Wb3RlcygpO1xuICAgIHZhciB2b3RlTGlzdCA9IHRoaXMuZmlsdGVyVm90ZXMoKTtcbiAgICB2YXIgYXBwQ2xhc3MgPSAnYm94ICcgKyB0aGlzLnN0YXRlLmJveDtcbiAgICB2YXIgcG9saXRpY2lhbiA9IHRoaXMuc3RhdGUucG9saXRpY2lhbjtcbiAgICB2YXIgY29udGFpbmVyY2xhc3NlcyA9ICdzZWFyY2hCb3gtbm9zY3JvbGwgJyArIHRoaXMuc3RhdGUuYm94O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXthcHBDbGFzc30+XG4gICAgICAgIDxJbmZvQm94IGJveD17dGhpcy5zdGF0ZS5ib3h9IC8+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NvbnRhaW5lcmNsYXNzZXN9PlxuICAgICAgICAgIDxTZWFyY2hCb3ggXG4gICAgICAgICAgICBib3g9e3RoaXMuc3RhdGUuYm94fVxuICAgICAgICAgICAgc2VhcmNoaW5nPXt0aGlzLnN0YXRlLnNlYXJjaGluZ31cbiAgICAgICAgICAgIHBvbGl0aWNpYW5zPXtwb2xpdGljaWFuTGlzdH0gXG4gICAgICAgICAgICBvblNlYXJjaENoYW5nZT17dGhpcy5vblNlYXJjaENoYW5nZX0gXG4gICAgICAgICAgICBwcm9maWxlPXtwb2xpdGljaWFufVxuICAgICAgICAgICAgb25TZWFyY2hTY3JvbGwgPSB7dGhpcy5vblNlYXJjaFNjcm9sbH0gLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPFByb2ZpbGVCb3ggXG4gICAgICAgICAgYm94PXt0aGlzLnN0YXRlLmJveH1cbiAgICAgICAgICBwcm9maWxlPXtwb2xpdGljaWFufVxuICAgICAgICAgIHZvdGVzPXt2b3RlTGlzdH0gXG4gICAgICAgICAgb25CaWxsU2VhcmNoQ2hhbmdlPXt0aGlzLm9uQmlsbFNlYXJjaENoYW5nZX0gXG4gICAgICAgICAgb25TZXNzaW9uU2VsZWN0VG9nZ2xlPXt0aGlzLm9uU2Vzc2lvblNlbGVjdFRvZ2dsZX1cbiAgICAgICAgICBvblNlc3Npb25TZWxlY3Q9e3RoaXMub25TZXNzaW9uU2VsZWN0fVxuICAgICAgICAgIHNlc3Npb25zTGlzdCA9IHt0aGlzLnN0YXRlLnNlc3Npb25zTGlzdH1cbiAgICAgICAgICBzZXNzaW9uID0ge3RoaXMuc3RhdGUuc2Vzc2lvbn1cbiAgICAgICAgICBzZXNzaW9uVG9nZ2xlID0ge3RoaXMuc3RhdGUuc2Vzc2lvblRvZ2dsZX1cbiAgICAgICAgICBzZXNzaW9uc1ZvdGVzID0ge3Nlc3Npb25Wb3Rlc31cbiAgICAgICAgICByZXRyaWV2aW5nVm90ZXM9e3RoaXMuc3RhdGUucmV0cmlldmluZ1ZvdGVzfVxuICAgICAgICAgIGdldEJpbGxJbmZvID0ge3RoaXMuZ2V0QmlsbEluZm99XG4gICAgICAgICAgY3VycmVudFZvdGUgPSB7dGhpcy5zdGF0ZS5jdXJyZW50Vm90ZX1cbiAgICAgICAgICBiaWxsSW5mbyA9IHt0aGlzLnN0YXRlLmJpbGxJbmZvfVxuICAgICAgICAgIGdldFBvbGl0aWNpYW4gPSB7dGhpcy5nZXRQb2xpdGljaWFufSAvPlxuXG4gICAgICAgIDxUZXh0Qm94IGJveD17dGhpcy5zdGF0ZS5ib3h9IGJpbGxUZXh0PXt0aGlzLnN0YXRlLmJpbGxUZXh0fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgZmV0Y2hKU09OOiBmdW5jdGlvbihwYXRoLCB0eXBlKSB7XG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHBhdGgsIHRydWUpO1xuICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIC8vIFN1Y2Nlc3MhXG4gICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIGlmICh0eXBlID09ICdwb2xpdGljaWFucycpIHtcbiAgICAgICAgICB2YXIgcG9saXRpY2lhbiA9IHRoaXMuZ2V0UG9saXRpY2lhbihkYXRhWydyZXN1bHRzJ10pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3BvbGl0aWNpYW5zOiBkYXRhWydyZXN1bHRzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xpdGljaWFuOiBwb2xpdGljaWFuLCB9KTtcbiAgICAgICAgICBpZiAocG9saXRpY2lhbi5pZCkge1xuICAgICAgICAgICAgdGhpcy5nZXRQb2xpdGljaWFuVm90ZXMocG9saXRpY2lhbi5pZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ3ZvdGVzJykge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZvdGVzOiBkYXRhWydyZXN1bHRzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHJpZXZpbmdWb3RlczogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ3Nlc3Npb25zJykge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nlc3Npb25zTGlzdDogZGF0YVsncmVzdWx0cyddfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnYmlsbF9pbmZvJykge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2JpbGxJbmZvOiBkYXRhfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnYmlsbF90ZXh0Jykge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2JpbGxUZXh0OiBkYXRhWydyZXN1bHRzJ11bMF19KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygndHlwZSBub3QgcG9saXRpY2lhbiBvciB2b3RlcycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSByZWFjaGVkIG91ciB0YXJnZXQgc2VydmVyLCBidXQgaXQgcmV0dXJuZWQgYW4gZXJyb3JcbiAgICAgICAgY29uc29sZS5sb2coJ3NlcnZlciByZWFjaGVkLCBidXQgaXQgZGlkIG5vdCBnaXZlIGRhdGEgaW4gZmV0Y2hKU09OJyk7XG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpO1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY29ubmVjdGlvbiBwcm9ibGVtIHdpdGggZmV0Y2hKU09OJyk7XG4gICAgICAvLyBUaGVyZSB3YXMgYSBjb25uZWN0aW9uIGVycm9yIG9mIHNvbWUgc29ydFxuICAgIH07XG4gICAgcmVxdWVzdC5zZW5kKCk7XG4gIH0sXG4gIGZpbHRlclZvdGVzOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5iaWxsU2VhcmNoaW5nICYmIHRoaXMuc3RhdGUuYmlsbFNlYXJjaFZhbHVlKSB7XG4gICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKHRoaXMuc3RhdGUuYmlsbFNlYXJjaFZhbHVlLCBcImlcIik7XG4gICAgICB2YXIgdm90ZXMgPSB0aGlzLnN0YXRlLnZvdGVzLmZpbHRlcihmdW5jdGlvbiAodm90ZSkge1xuICAgICAgICByZXR1cm4gdm90ZS5uYW1lX2VuLnNlYXJjaChyZWdleCkgPiAtMSB8fCB2b3RlLm51bWJlci5zZWFyY2gocmVnZXgpID4gLTEgfHwgdm90ZS5zaG9ydF90aXRsZV9lbi5zZWFyY2gocmVnZXgpID4gLTE7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgdm90ZXMgPSB0aGlzLnN0YXRlLnZvdGVzO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdGF0ZS5zZXNzaW9uKSB7XG4gICAgICB2YXIgc2Vzc2lvblJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLnN0YXRlLnNlc3Npb24sIFwiaVwiKTtcbiAgICAgIHZhciBmaWx0ZXJlZFZvdGVzID0gdm90ZXMuZmlsdGVyKGZ1bmN0aW9uICh2b3RlKSB7XG4gICAgICAgIHJldHVybiB2b3RlLnNlc3Npb25faWQuc2VhcmNoKHNlc3Npb25SZWdleCkgPiAtMTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBmaWx0ZXJlZFZvdGVzID0gdm90ZXM7XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXJlZFZvdGVzO1xuICB9LFxuICBmaWx0ZXJQb2xpdGljaWFuczogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VhcmNoaW5nICYmIHRoaXMuc3RhdGUuc2VhcmNoVmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLnJpZGluZyAhPSBcIlwiKSB7XG4gICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAodGhpcy5zdGF0ZS5yaWRpbmcsIFwiaVwiKTtcbiAgICAgICAgdmFyIGZpbHRlcmVkTGlzdCA9IHRoaXMuc3RhdGUucG9saXRpY2lhbnMuZmlsdGVyKGZ1bmN0aW9uIChwb2wpIHtcbiAgICAgICAgICByZXR1cm4gcG9sLnJpZGluZy5zZWFyY2gocmVnZXgpID4gLTE7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmlsdGVyZWRMaXN0O1xuICAgICAgfVxuICAgICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLnN0YXRlLnNlYXJjaFZhbHVlLCBcImlcIik7XG4gICAgICB2YXIgZmlsdGVyZWRMaXN0ID0gdGhpcy5zdGF0ZS5wb2xpdGljaWFucy5maWx0ZXIoZnVuY3Rpb24gKHBvbCkge1xuICAgICAgICByZXR1cm4gcG9sLm5hbWUuc2VhcmNoKHJlZ2V4KSA+IC0xIHx8IHBvbC5wYXJ0eV9uYW1lLnNlYXJjaChyZWdleCkgPiAtMSB8fCBwb2wucGFydHlfc2x1Zy5zZWFyY2gocmVnZXgpID4gLTEgfHwgcG9sLnJpZGluZy5zZWFyY2gocmVnZXgpID4gLTEgIHx8IHBvbC5yaWRpbmcuc2VhcmNoKHJlZ2V4KSA+IC0xO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmlsdGVyZWRMaXN0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlLnBvbGl0aWNpYW5zO1xuICAgIH1cbiAgfSxcbn0pO1xuXG5SZWFjdC5yZW5kZXIoXG4gIDxBcHAgLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jylcbik7Il19
