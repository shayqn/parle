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
      React.createElement("div", null, 
        loading
      )
    );
  },
  
});

React.render(
  React.createElement(App, null),
  document.getElementById('content')
);

},{"./boxes/info/InfoBox.js":"/Users/braden/parle/src/js/boxes/info/InfoBox.js","./boxes/profile/ProfileBox.js":"/Users/braden/parle/src/js/boxes/profile/ProfileBox.js","./boxes/search/SearchBox.js":"/Users/braden/parle/src/js/boxes/search/SearchBox.js","./boxes/text/TextBox.js":"/Users/braden/parle/src/js/boxes/text/TextBox.js","./elements/ArrowIcon.js":"/Users/braden/parle/src/js/elements/ArrowIcon.js"}]},{},["/Users/braden/parle/src/js/parle.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9Cb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9UZXh0LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU2VhcmNoLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU3RhY2suanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1Byb2ZpbGVCb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1ZvdGVSb3cuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9zZWFyY2gvU2VhcmNoQm94LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvc2VhcmNoL1NlYXJjaFN0YWNrLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvdGV4dC9CaWxsVGV4dC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2JveGVzL3RleHQvVGV4dEJveC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2VsZW1lbnRzL0Fycm93SWNvbi5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL3BhcmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUJBQXFCOztBQUVyQixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDeEMsSUFBSSw2QkFBNkIsdUJBQUE7RUFDL0IsbUJBQW1CLEVBQUUsU0FBUyxTQUFTLEVBQUUsU0FBUyxFQUFFO0lBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMs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QU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUM7O0tBRW5ELENBQUM7SUFDRixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbkIsR0FBRztBQUNIOztFQUVFLE1BQU0sRUFBRSxXQUFXO0lBQ2pCLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQ3ZFO01BQ0Usb0JBQUEsS0FBSSxFQUFBLElBQUMsRUFBQTtRQUNGLE9BQVE7TUFDTCxDQUFBO01BQ047QUFDTixHQUFHOztBQUVILENBQUMsQ0FBQyxDQUFDOztBQUVILEtBQUssQ0FBQyxNQUFNO0VBQ1Ysb0JBQUMsR0FBRyxFQUFBLElBQUEsQ0FBRyxDQUFBO0VBQ1AsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7Q0FDbkMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBJbmZvVGV4dCA9IHJlcXVpcmUoJy4vSW5mb1RleHQuanMnKTtcbnZhciBJbmZvQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBjb21wb25lbnRXaWxsVXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIGlmICgobmV4dFByb3BzLmJveCA9PSAnaW5mbycpICYmICh0aGlzLnByb3BzLmJveCAhPSAnc2VhcmNoJykpIHtcbiAgICAgIHRoaXMuYmFjayA9IHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5iYWNrID0gZmFsc2U7XG4gICAgfVxuICB9LFxuICBnb0JhY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAodGhpcy5iYWNrKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjbGFzc2VzID0gJ2luZm9Cb3ggJyArIHRoaXMucHJvcHMuYm94O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30+PGRpdiBjbGFzc05hbWU9XCJjbG9zZUNvbnRhaW5lclwiPjxhIGhyZWY9XCIvIy9cIiBvbkNsaWNrPXt0aGlzLmdvQmFja30+PC9hPjwvZGl2PjxJbmZvVGV4dCAvPjwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEluZm9Cb3g7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBJbmZvVGV4dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImluZm9UZXh0XCI+XG4gICAgICA8aDI+YWJvdXQgdm90ZXMubXA8L2gyPlxuICAgICAgPHA+RGVtb2NyYWNpZXMgYXJlIGRlZmluZWQgYnkgdGhlIGxhd3MgdGhhdCB0aGV5IHBhc3MsIGFuZCB0aGUgbGF3cyB0aGF0IHBhc3MgYXJlIGRldGVybWluZWQgYnkgdGhlIHJlcHJlc2VudGF0aXZlcyB3ZSBlbGVjdC4gSW4gb3JkZXIgdG8gYWNjdXJhdGVseSBldmFsdWF0ZSB3aGV0aGVyIG91ciBlbGVjdGVkIG1lbWJlcnMgb2YgcGFybGlhbWVudCBhcmUgYXBwcm9wcmlhdGVseSByZXByZXNlbnRpbmcgdGhlaXIgZWxlY3RvcmF0ZSwgdGhlIG1vc3QgcGVydGluZW50IGluZm9ybWF0aW9uIHdlIGhhdmUgaXMgdGhlaXIgdm90aW5nIGhpc3Rvcnk6IHdoaWNoIGJpbGxzIGhhdmUgdGhleSB2b3RlZCBmb3IsIHdoaWNoIGhhdmUgdGhleSB2b3RlZCBhZ2FpbnN0LCBhbmQgd2hpY2ggaGF2ZSB0aGV5IGFic3RhaW5lZCBmcm9tIHZvdGluZyBvbi4gPC9wPlxuICAgICAgPHA+V2hpbGUgdGhpcyBpbmZvcm1hdGlvbiBpcyBtYWRlIHB1YmxpY2x5IGF2YWlsYWJsZSB0byBhbGwgQ2FuYWRpYW5zLCB3ZSBub3RpY2VkIHRoYXQgaXQgY2FuIGJlIHNsb3cgYW5kIGRpZmZpY3VsdCB0byBwYXJzZS4gRXZlcnkgYmlsbCBpcyB2b3RlZCBvbiBtdWx0aXBsZSB0aW1lcyAtIHNvbWV0aW1lcyB0byBwYXNzIGFtZW5kbWVudHMsIHNvbWV0aW1lcyBldmVuIGp1c3QgdG8gdm90ZSBvbiB3aGV0aGVyIG9yIG5vdCBpdCB3aWxsIGJlIGRpc2N1c3NlZC4gVW5sZXNzIHlvdSBhcmUgYWJsZSB0byBkZWRpY2F0ZSBzaWduaWZpY2FudCB0aW1lIGFuZCBlZmZvcnQgaW50byBiZWNvbWluZyB3ZWxsLXZlcnNlZCBvbiB0aGUgZGV0YWlscyBvZiBlYWNoIGJpbGwsIGF0dGVtcHRpbmcgdG8gYW5hbHl6ZSB0aGUgdm90ZXMgYSBwb2xpdGljaWFuIG1ha2VzIGNhbiBiZSBtb3JlIGNvbmZ1c2luZyB0aGFuIGluZm9ybWF0aXZlLjwvcD5cbiAgICAgIDxwPkFzIGVuZ2FnZWQgY2l0aXplbnMgd2hvIGFyZSBub3QgY2FwYWJsZSBvZiBiZWluZyBpbnRpbWF0ZWx5IGZhbWlsaWFyIHdpdGggdGhlIGRldGFpbHMgYW5kIHByb2dyZXNzIG9mIGV2ZXJ5IGJpbGwsIHdoYXQgd2Ugd2FudGVkIHRvIGtub3cgd2FzIHRoaXM6IGFmdGVyIGFsbCB0aGUgYW1lbmRtZW50cyBhbmQgZWRpdHMsIGRpZCB0aGUgcG9saXRpY2lhbiB2b3RlIHRvIG1ha2UgdGhlIGZpbmFsIGJpbGwgYSBsYXcgb3Igbm90PyA8L3A+XG4gICAgICA8cD5UaGF0IGlzIHdoYXQgdGhpcyB3ZWJzaXRlIHByb3ZpZGVzOiBmb3IgZXZlcnkgbWVtYmVyIG9mIHBhcmxpYW1lbnQsIGl0IHJldHVybnMgb25seSB0aGUgdm90ZXMgdGhhdCBjb3JyZXNwb25kIHRvIHRoZWlyIGZpbmFsIHZvdGUgb24gYSBiaWxsIGFzIHdlbGwgYXMgd2hldGhlciBvciBub3QgdGhlIGJpbGwgd2FzIHN1Y2Nlc3NmdWxseSBwYXNzZWQgaW50byBsYXcuPC9wPlxuICAgICAgPHA+V2UgaG9wZSB0aGF0IHRoaXMgcHJvdmlkZXMgYW4gZWFzeSBhZGRpdGlvbmFsIGF2ZW51ZSBmb3IgZXZhbHVhdGluZyB0aGUgcGVyZm9ybWFuY2Ugb2Ygb3VyIGVsZWN0ZWQgbWVtYmVycyBvZiBwYXJsaWFtZW50IGFuZCBkZXRlcm1pbmluZyB0aGVpciBlZmZlY3RpdmVuZXNzIGluIHJlcHJlc2VudGluZyBvdXIgdmlld3MuPC9wPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZ2l0aHViTGlua1wiPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vc2hheXFuL3BhcmxlXCI+dmlldyBwcm9qZWN0IG9uIGdpdGh1YjwvYT48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJjcmVkaXRXaGVyZUNyZWRpdHNEdWVcIj5zcGVjaWFsIHRoYW5rcyB0byA8YSBocmVmPVwiaHR0cHM6Ly9vcGVucGFybGlhbWVudC5jYVwiPm9wZW5wYXJsaWFtZW50LmNhPC9hPiBmb3IgcHJvdmlkaW5nIGFsbCB0aGUgZGF0YTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IEluZm9UZXh0OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgQmlsbFNlYXJjaCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5zZXNzaW9uID09ICcnKSB7XG4gICAgICB2YXIgc2VsZWN0VGV4dCA9ICdhbnkgc2Vzc2lvbic7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHNlbGVjdFRleHQgPSB0aGlzLnByb3BzLnNlc3Npb247XG4gICAgfVxuICAgIHZhciBzZXNzaW9uc1ZvdGVzID0gdGhpcy5wcm9wcy5zZXNzaW9uc1ZvdGVzO1xuICAgIHZhciB0b2dnbGVDbGFzcyA9ICdzZXNzaW9uU2VsZWN0JyArICh0aGlzLnByb3BzLnNlc3Npb25Ub2dnbGUgPyAnJyA6ICcgY29sbGFwc2VkJyk7XG4gICAgdmFyIG9iamVjdE5vZGVzID0gdGhpcy5wcm9wcy5zZXNzaW9uc0xpc3QubWFwKGZ1bmN0aW9uIChvYmplY3QsIGkpIHtcbiAgICAgICAgdmFyIHN1bSA9IHNlc3Npb25zVm90ZXNbb2JqZWN0LmlkXTtcbiAgICAgICAgaWYgKHN1bSkge1xuICAgICAgICAgIHZhciBzdHJpbmcgPSBvYmplY3QuaWQgKyAnIC0gKCcgKyBzdW0gKyAnKSc7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxsaSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2Vzc2lvblNlbGVjdC5iaW5kKG51bGwsb2JqZWN0KX0ga2V5PXtpfT48c3BhbiBjbGFzc05hbWU9XCJzZXNzaW9uXCI+e29iamVjdC5pZH08L3NwYW4+IDxzcGFuIGNsYXNzTmFtZT1cInN1bVwiPntzdW19PC9zcGFuPjwvbGk+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmlsbFNlYXJjaFwiPlxuICAgICAgICA8Zm9ybT5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJpbGxzIGJ5IG5hbWUgb3IgbnVtYmVyLi4uXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25CaWxsU2VhcmNoQ2hhbmdlfSAvPiAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RvZ2dsZUNsYXNzfT4gICAgXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2VsZWN0XCIgb25DbGljaz17dGhpcy5wcm9wcy5vblNlc3Npb25TZWxlY3RUb2dnbGV9PntzZWxlY3RUZXh0fTwvc3Bhbj4gIFxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJzZXNzaW9uT3B0aW9uXCIgb25DbGljaz17dGhpcy5wcm9wcy5vblNlc3Npb25TZWxlY3QuYmluZChudWxsLCcnKX0+PHNwYW4gY2xhc3NOYW1lPVwic2Vzc2lvblwiPmFueSBzZXNzaW9uPC9zcGFuPiA8c3BhbiBjbGFzc05hbWU9XCJzdW1cIj57c2Vzc2lvbnNWb3Rlc1snc3VtJ119PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICB7b2JqZWN0Tm9kZXN9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCaWxsU2VhcmNoOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgVm90ZVJvdyA9IHJlcXVpcmUoJy4vVm90ZVJvdy5qcycpO1xudmFyIEJpbGxTdGFjayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3VycmVudFZvdGUgPSB0aGlzLnByb3BzLmN1cnJlbnRWb3RlO1xuICAgIHZhciBnZXRCaWxsSW5mbyA9IHRoaXMucHJvcHMuZ2V0QmlsbEluZm87XG4gICAgdmFyIHZvdGVSb3dzID0gW107XG4gICAgdmFyIGxvYWRlciA9IG51bGw7XG4gICAgaWYgKHRoaXMucHJvcHMudm90ZXMubGVuZ3RoICA+IDApIHtcbiAgICAgIHZhciBnZXRCaWxsVGV4dCA9IHRoaXMucHJvcHMuZ2V0QmlsbFRleHQ7XG4gICAgICB2b3RlUm93cyA9IHRoaXMucHJvcHMudm90ZXMubWFwKGZ1bmN0aW9uIChvYmplY3QsIGkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Vm90ZVJvd1xuICAgICAgICAgICAga2V5ID0ge2l9XG4gICAgICAgICAgICB2b3RlID0ge29iamVjdH1cbiAgICAgICAgICAgIGN1cnJlbnRWb3RlID0ge2N1cnJlbnRWb3RlfVxuICAgICAgICAgICAgb25DbGljayA9IHtnZXRCaWxsSW5mb31cbiAgICAgICAgICAgIGJpbGxJbmZvID0ge3RoaXMucHJvcHMuYmlsbEluZm99XG4gICAgICAgICAgICBnZXRQb2xpdGljaWFuID0ge3RoaXMucHJvcHMuZ2V0UG9saXRpY2lhbn0gLz5cbiAgICAgICAgKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMucHJvcHMucmV0cmlldmluZ1ZvdGVzKSB7XG4gICAgICBcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTU7IGkrKykge1xuICAgICAgICB2YXIgZW1wdHlSb3cgPSAoXG4gICAgICAgICAgPGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cInZvdGVSb3cgcm93IGVtcHR5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haW4gcm93XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciBsZWZ0XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNlc3Npb25cIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbnVtYmVyXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHZvdGUgZnVsbC1sYXlvdXRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc2hvcnRuYW1lXCI+PHNwYW4+bm8gcmVzdWx0PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCB2b3RlIG1vYmlsZS1vbmx5XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGxhd1wiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBkcm9wZG93blwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgcmlnaHRcIj48L2Rpdj4gXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgICAgdm90ZVJvd3MucHVzaChlbXB0eVJvdyk7XG4gICAgICB9XG4gICAgICBsb2FkZXIgPSA8ZGl2IGNsYXNzTmFtZT1cImxvYWRlci1jb250YWluZXJcIj48ZGl2IGNsYXNzTmFtZT1cImxvYWRlclwiPjwvZGl2PjwvZGl2PjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgbm9SZXN1bHRzUm93ID0gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidm90ZVJvdyByb3cgbm9yZXN1bHRzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haW4gcm93XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlclwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPjxzcGFuPm5vIHJlc3VsdHMgZm91bmQ8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlclwiPjwvZGl2PiBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgdm90ZVJvd3MucHVzaChub1Jlc3VsdHNSb3cpO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3ZvdGVzJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JpbGxTdGFjayc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBoZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIGxlZnRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc2Vzc2lvblwiPlNlc3Npb248L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbnVtYmVyXCI+TnVtYmVyPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHZvdGUgZnVsbC1sYXlvdXRcIj5Wb3RlPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNob3J0bmFtZVwiPk5hbWU8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgdm90ZSBtb2JpbGUtb25seVwiPlZvdGU8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbGF3XCI+TGF3PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGRyb3Bkb3duXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciByaWdodFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dm90ZVJvd3N9XG4gICAgICAgICAgICB7bG9hZGVyfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7ICAgICAgICBcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmlsbFN0YWNrOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIEJpbGxTdGFjayA9IHJlcXVpcmUoJy4vQmlsbFN0YWNrLmpzJyk7XG52YXIgQmlsbFNlYXJjaCA9IHJlcXVpcmUoJy4vQmlsbFNlYXJjaC5qcycpO1xudmFyIFByb2ZpbGVCb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNsYXNzZXMgPSAncHJvZmlsZUJveCAnICsgdGhpcy5wcm9wcy5ib3g7XG4gICAgdmFyIGNsb3NlQ2xhc3MgPSAnY2xvc2UgJyArIHRoaXMucHJvcHMuYm94O1xuICAgIGlmICghdGhpcy5wcm9wcy5wcm9maWxlLnBhcnR5X3NsdWcpIHtcbiAgICAgIHZhciBwYXJ0eU5hbWUgPSB0aGlzLnByb3BzLnByb2ZpbGUucGFydHlfbmFtZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgcGFydHlOYW1lID0gdGhpcy5wcm9wcy5wcm9maWxlLnBhcnR5X3NsdWc7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZUhlYWRlclwiPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInJldHVyblwiIGhyZWY9XCIvIy9cIj48ZGl2IGNsYXNzTmFtZSA9XCJpY29uXCI+PC9kaXY+PHNwYW4+cmV0dXJuIHRvIE1QIHNlYXJjaDwvc3Bhbj48L2E+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPXtjbG9zZUNsYXNzfSBocmVmPVwiLyMvXCI+PC9hPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJuYW1lXCI+e3RoaXMucHJvcHMucHJvZmlsZS5uYW1lfTwvaDI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5mb1wiPjxoMyBjbGFzc05hbWU9XCJyaWRpbmdcIj57dGhpcy5wcm9wcy5wcm9maWxlLnJpZGluZ308L2gzPjxoMyBjbGFzc05hbWU9XCJwYXJ0eVwiPntwYXJ0eU5hbWV9PC9oMz48L3NwYW4+XG4gICAgICAgICAgPEJpbGxTZWFyY2ggXG4gICAgICAgICAgICBvbkJpbGxTZWFyY2hDaGFuZ2U9e3RoaXMucHJvcHMub25CaWxsU2VhcmNoQ2hhbmdlfVxuICAgICAgICAgICAgb25TZXNzaW9uU2VsZWN0VG9nZ2xlPXt0aGlzLnByb3BzLm9uU2Vzc2lvblNlbGVjdFRvZ2dsZX1cbiAgICAgICAgICAgIG9uU2Vzc2lvblNlbGVjdD17dGhpcy5wcm9wcy5vblNlc3Npb25TZWxlY3R9XG4gICAgICAgICAgICBzZXNzaW9uc0xpc3Q9e3RoaXMucHJvcHMuc2Vzc2lvbnNMaXN0fVxuICAgICAgICAgICAgc2Vzc2lvblRvZ2dsZSA9IHt0aGlzLnByb3BzLnNlc3Npb25Ub2dnbGV9XG4gICAgICAgICAgICBzZXNzaW9uPXt0aGlzLnByb3BzLnNlc3Npb259XG4gICAgICAgICAgICBzZXNzaW9uc1ZvdGVzID0ge3RoaXMucHJvcHMuc2Vzc2lvbnNWb3Rlc30gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPEJpbGxTdGFjayBcbiAgICAgICAgdm90ZXM9e3RoaXMucHJvcHMudm90ZXN9IFxuICAgICAgICByZXRyaWV2aW5nVm90ZXM9e3RoaXMucHJvcHMucmV0cmlldmluZ1ZvdGVzfVxuICAgICAgICBnZXRCaWxsSW5mbyA9IHt0aGlzLnByb3BzLmdldEJpbGxJbmZvfVxuICAgICAgICBjdXJyZW50Vm90ZSA9IHt0aGlzLnByb3BzLmN1cnJlbnRWb3RlfVxuICAgICAgICBiaWxsSW5mbyA9IHt0aGlzLnByb3BzLmJpbGxJbmZvfVxuICAgICAgICBnZXRQb2xpdGljaWFuID0ge3RoaXMucHJvcHMuZ2V0UG9saXRpY2lhbn0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9maWxlQm94OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgVm90ZVJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudm90ZS52b3RlID09ICdZJykge1xuICAgICAgdmFyIHZvdGVDbGFzcyA9ICd5ZXMgJztcbiAgICAgIHZhciB2b3RlVGV4dCA9ICd5ZXMnO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnByb3BzLnZvdGUudm90ZSA9PSAnTicpIHtcbiAgICAgIHZhciB2b3RlQ2xhc3MgPSAnbm8gJztcbiAgICAgIHZhciB2b3RlVGV4dCA9ICdubyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHZvdGVDbGFzcyA9ICcnO1xuICAgICAgdmFyIHZvdGVUZXh0ID0gJ25vIHZvdGUnO1xuICAgIH1cbiAgICB2b3RlQ2xhc3MgKz0gJ3ZvdGUgY29sICc7XG4gICAgdmFyIG1vYmlsZVZvdGVDbGFzcyA9IHZvdGVDbGFzcyArICdtb2JpbGUtb25seSc7XG4gICAgdm90ZUNsYXNzICs9ICdmdWxsLWxheW91dCdcblxuICAgIHZhciBsYXdUZXh0ID0gdGhpcy5wcm9wcy52b3RlLmxhdyA/ICd5ZXMnIDogJ25vJztcbiAgICB2YXIgbGF3Q2xhc3MgPSAnY29sIGxhdyAnICsgbGF3VGV4dDtcblxuICAgIGlmICh0aGlzLnByb3BzLnZvdGUuc2hvcnRfdGl0bGVfZW4pIHtcbiAgICAgIHZhciBuYW1lID0gdGhpcy5wcm9wcy52b3RlLnNob3J0X3RpdGxlX2VuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBuYW1lID0gdGhpcy5wcm9wcy52b3RlLm5hbWVfZW47XG4gICAgfVxuICAgIHZhciB2b3RlUm93Q2xhc3MgPSBcInZvdGVSb3cgcm93XCI7XG4gICAgaWYgKHRoaXMucHJvcHMudm90ZS52b3RlcXVlc3Rpb25faWQgPT0gdGhpcy5wcm9wcy5jdXJyZW50Vm90ZSkge1xuICAgICAgdm90ZVJvd0NsYXNzICs9IFwiIGN1cnJlbnRcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3ZvdGVSb3dDbGFzc30ga2V5PXt0aGlzLnByb3BzLmtleX0+XG4gICAgICAgIDxkaXYgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrLmJpbmQobnVsbCwgdGhpcyl9IGNsYXNzTmFtZT1cIm1haW4gcm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIGxlZnRcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzZXNzaW9uXCI+PHNwYW4gY2xhc3NOYW1lPVwibGFiZWwgbW9iaWxlLW9ubHlcIj5TZXNzaW9uPC9zcGFuPnt0aGlzLnByb3BzLnZvdGUuc2Vzc2lvbl9pZH08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBudW1iZXJcIj48c3BhbiBjbGFzc05hbWU9XCJsYWJlbCBtb2JpbGUtb25seVwiPk51bWJlcjwvc3Bhbj57dGhpcy5wcm9wcy52b3RlLm51bWJlcn08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dm90ZUNsYXNzfT48c3BhbiBjbGFzc05hbWU9XCJ2b3RlVGV4dFwiPnt2b3RlVGV4dH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc2hvcnRuYW1lXCI+e25hbWV9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e21vYmlsZVZvdGVDbGFzc30+PHNwYW4gY2xhc3NOYW1lPVwibGFiZWwgbW9iaWxlLW9ubHlcIj5Wb3RlPC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cInZvdGVUZXh0XCI+e3ZvdGVUZXh0fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17bGF3Q2xhc3N9PjxzcGFuIGNsYXNzTmFtZT1cImxhYmVsIG1vYmlsZS1vbmx5XCI+TGF3PC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cImxhd1RleHRcIj57bGF3VGV4dH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgZHJvcGRvd25cIj48c3Bhbj48QXJyb3dJY29uIC8+PC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciByaWdodFwiPjwvZGl2PiBcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxWb3RlSW5mb1JvdyBcbiAgICAgICAgICB2b3RlID0ge3RoaXMucHJvcHMudm90ZX1cbiAgICAgICAgICBjdXJyZW50Vm90ZSA9IHt0aGlzLnByb3BzLmN1cnJlbnRWb3RlfVxuICAgICAgICAgIHZvdGVRdWVzdGlvbklEID0ge3RoaXMucHJvcHMudm90ZS52b3RlcXVlc3Rpb25faWR9XG4gICAgICAgICAgYmlsbEluZm8gPSB7dGhpcy5wcm9wcy5iaWxsSW5mb31cbiAgICAgICAgICBnZXRQb2xpdGljaWFuID0ge3RoaXMucHJvcHMuZ2V0UG9saXRpY2lhbn0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xudmFyIFZvdGVJbmZvUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbmZvQ2xhc3MgPSBcInJvdyBpbmZvXCI7XG4gICAgdmFyIGdldFBvbGl0aWNpYW4gPSB0aGlzLnByb3BzLmdldFBvbGl0aWNpYW47XG4gICAgdmFyIHNwb25zb3JDb21wb25lbnQgPSBudWxsO1xuICAgIGlmICh0aGlzLnByb3BzLnZvdGVRdWVzdGlvbklEID09IHRoaXMucHJvcHMuY3VycmVudFZvdGUpIHtcbiAgICAgIGluZm9DbGFzcyArPSAnIGN1cnJlbnQnO1xuICAgICAgdmFyIGxhd1N0cmluZyA9ICAnTGF3OiAnICsgdGhpcy5wcm9wcy5sYXdUZXh0O1xuICAgICAgdmFyIHZvdGVJbmZvcm1hdGlvbiA9IDxkaXYgY2xhc3NOYW1lPVwiY29sIGJpbGxJbmZvXCI+e2xhd1N0cmluZ308L2Rpdj5cbiAgICAgIGlmICh1bmRlZmluZWQgIT0gdGhpcy5wcm9wcy5iaWxsSW5mby52b3Rlcykge1xuICAgICAgICB2YXIgcGFydHlWb3RlTm9kZXMgPSBbXTtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgbm9kZSA9IChcbiAgICAgICAgICA8ZGl2IGtleT17MH0gY2xhc3NOYW1lPVwicGFydHlWb3RlSGVhZGVyXCIga2V5PXtpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPlBhcnR5PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInllc1wiPllFUzwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub1wiPk5PPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic3RhaW5cIj5BQlNUQUlOPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICAgIHBhcnR5Vm90ZU5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIHllc0NvdW50ID0gMDtcbiAgICAgICAgbm9Db3VudCA9IDA7XG4gICAgICAgIGFic3RhaW5Db3VudCA9IDA7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnByb3BzLmJpbGxJbmZvLnZvdGVzKSB7XG4gICAgICAgICAgaSsrO1xuICAgICAgICAgIHZhciBwYXJ0eU5hbWUgPSBrZXk7XG4gICAgICAgICAgdmFyIHllcyA9IHRoaXMucHJvcHMuYmlsbEluZm8udm90ZXNba2V5XVsnWSddO1xuICAgICAgICAgIHZhciBubyA9IHRoaXMucHJvcHMuYmlsbEluZm8udm90ZXNba2V5XVsnTiddO1xuICAgICAgICAgIHZhciBhYnN0YWluID0gdGhpcy5wcm9wcy5iaWxsSW5mby52b3Rlc1trZXldWydBJ107XG4gICAgICAgICAgdmFyIG5vQ2xhc3MgPSBcIm5vXCI7XG4gICAgICAgICAgdmFyIHllc0NsYXNzID0gXCJ5ZXNcIjtcbiAgICAgICAgICB2YXIgYWJzdGFpbkNsYXNzID0gXCJhYnN0YWluXCI7XG4gICAgICAgICAgdmFyIHBhcnR5Q2xhc3MgPSBcInBhcnR5Vm90ZVwiO1xuICAgICAgICAgIGlmICgoeWVzID4gYWJzdGFpbikmJih5ZXMgPiBubykpIHtcbiAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgeWVzXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKChubyA+IGFic3RhaW4pICYmIChubyA+IHllcykpIHtcbiAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgbm9cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoKGFic3RhaW4gPiB5ZXMpICYmIChhYnN0YWluID4gbm8pKSB7XG4gICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIGFic3RhaW5cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoKHllcyA9PSBubykpIHtcbiAgICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiB0aWUgeW5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHllcz09YWJzdGFpbikge1xuICAgICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIHRpZSB5YVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobm89PWFic3RhaW4pIHtcbiAgICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiB0aWUgbmFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIHRpZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB5ZXNDb3VudCArPSB5ZXM7XG4gICAgICAgICAgbm9Db3VudCArPSBubztcbiAgICAgICAgICBhYnN0YWluQ291bnQgKz0gYWJzdGFpbjtcbiAgICAgICAgICB2YXIgbm9kZSA9IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtwYXJ0eUNsYXNzfSBrZXk9e2l9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj57cGFydHlOYW1lfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17eWVzQ2xhc3N9PjxzcGFuPnt5ZXN9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17bm9DbGFzc30+PHNwYW4+e25vfTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Fic3RhaW5DbGFzc30+PHNwYW4+e2Fic3RhaW59PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgICBwYXJ0eVZvdGVOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0b3RhbENsYXNzID0gXCJwYXJ0eVZvdGUgdG90YWwgXCI7XG4gICAgICAgIGlmICh5ZXNDb3VudCA+IG5vQ291bnQpIHtcbiAgICAgICAgICBpZiAoeWVzQ291bnQgPiBhYnN0YWluQ291bnQpIHtcbiAgICAgICAgICAgIHRvdGFsQ2xhc3MgKz0gXCIgeWVzXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG90YWxDbGFzcyArPSBcIiBhYnN0YWluXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChub0NvdW50ID4gYWJzdGFpbkNvdW50KSB7XG4gICAgICAgICAgICB0b3RhbENsYXNzICs9IFwiIG5vXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG90YWxDbGFzcyArPSBcIiBhYnN0YWluXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB0b3RhbFJvdyA9IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnR5Vm90ZSB0b3RhbFwiIGtleT1cInRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPlRvdGFsPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInllc1wiPjxzcGFuPnt5ZXNDb3VudH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vXCI+PHNwYW4+e25vQ291bnR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnN0YWluXCI+PHNwYW4+e2Fic3RhaW5Db3VudH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICAgIHBhcnR5Vm90ZU5vZGVzLnB1c2godG90YWxSb3cpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5iaWxsSW5mby5zcG9uc29yKSB7XG4gICAgICAgICAgdmFyIHNwb25zb3JQcm9maWxlID0gZ2V0UG9saXRpY2lhbih1bmRlZmluZWQsIHRoaXMucHJvcHMuYmlsbEluZm8uc3BvbnNvcik7XG4gICAgICAgICAgdmFyIGltZ1VSTCA9IFwidXJsKCcvc3RhdGljL2hlYWRzaG90cy9cIiArIHNwb25zb3JQcm9maWxlLmltZ3VybCArIFwiJylcIjtcbiAgICAgICAgICB2YXIgc3BvbnNvckNsYXNzU3RyaW5nID0gJ3Nwb25zb3JQcm9maWxlICc7XG4gICAgICAgICAgdmFyIGhyZWYgPSAnLyMvcHJvZmlsZS8nICsgc3BvbnNvclByb2ZpbGUuaWQ7XG4gICAgICAgICAgaWYgKCFzcG9uc29yUHJvZmlsZS5wYXJ0eV9zbHVnKSB7XG4gICAgICAgICAgICB2YXIgcGFydHlOYW1lID0gc3BvbnNvclByb2ZpbGUucGFydHlfbmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzcG9uc29yQ2xhc3NTdHJpbmcgKz0gc3BvbnNvclByb2ZpbGUucGFydHlfc2x1ZztcbiAgICAgICAgICAgIHZhciBwYXJ0eU5hbWUgPSBzcG9uc29yUHJvZmlsZS5wYXJ0eV9zbHVnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzcG9uc29yQ29tcG9uZW50ID0gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BvbnNvclwiPlxuICAgICAgICAgICAgICA8aDQ+QmlsbCBTcG9uc29yPC9oND5cbiAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtzcG9uc29yQ2xhc3NTdHJpbmd9IGhyZWY9e2hyZWZ9ID5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7YmFja2dyb3VuZEltYWdlOiBpbWdVUkx9fT48L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDM+e3Nwb25zb3JQcm9maWxlLm5hbWV9PC9oMz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyaWRpbmdcIj57c3BvbnNvclByb2ZpbGUucmlkaW5nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwYXJ0eVwiPntwYXJ0eU5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwb25zb3JDb21wb25lbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIHBhcnR5Vm90ZU5vZGVzID0gJyc7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHBhcnR5Vm90ZU5vZGVzID0gJyc7XG4gICAgfVxuICAgIHZhciBvcGVucGFybGlhbWVudFVSTCA9IFwiLy9vcGVucGFybGlhbWVudC5jYS9iaWxscy9cIiArIHRoaXMucHJvcHMudm90ZS5zZXNzaW9uX2lkICsgXCIvXCIgKyB0aGlzLnByb3BzLnZvdGUubnVtYmVyICsgXCIvXCI7XG4gICAgc2Vzc2lvbk51bWJlcnMgPSB0aGlzLnByb3BzLnZvdGUuc2Vzc2lvbl9pZC5zcGxpdChcIi1cIik7XG4gICAgdmFyIHBhcmxVUkwgPSBcImh0dHA6Ly93d3cucGFybC5nYy5jYS9MRUdJU0luZm8vTEFBRy5hc3B4P2xhbmd1YWdlPUUmUGFybD1cIiArIHNlc3Npb25OdW1iZXJzWzBdICsgXCImU2VzPVwiICsgc2Vzc2lvbk51bWJlcnNbMV07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtpbmZvQ2xhc3N9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciBsZWZ0XCI+PC9kaXY+XG4gICAgICAgICAge3Nwb25zb3JDb21wb25lbnR9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgcGFydHlWb3Rlc1wiPlxuICAgICAgICAgICAgPGg0PlBhcnR5IFZvdGVzPC9oND5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydHlWb3Rlc1RhYmxlXCI+XG4gICAgICAgICAgICAgIHtwYXJ0eVZvdGVOb2Rlc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIG1vcmVCaWxsSW5mb1wiPlxuICAgICAgICAgIDxoND5Nb3JlIEluZm9ybWF0aW9uPC9oND5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGEgaHJlZj17b3BlbnBhcmxpYW1lbnRVUkx9IHRhcmdldD1cIl9ibGFua1wiPnZpZXcgYmlsbCBvbiBvcGVucGFybGlhbWVudC5jYSA8QXJyb3dJY29uIC8+PC9hPlxuICAgICAgICAgICAgPGEgaHJlZj17cGFybFVSTH0gdGFyZ2V0PVwiX2JsYW5rXCI+dmlldyBzZXNzaW9uIG9uIHBhcmwuZ2MuY2EgPEFycm93SWNvbiAvPjwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgcmlnaHRcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xudmFyIEFycm93SWNvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuICAgICAgICAgdmlld0JveD1cIjAgMCA0MDAgNDAwXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTYzLjUsMzM0LjVsLTQ3LjEtNDcuMWw4Ny41LTg3LjVsLTg3LjUtODcuNWw0Ny4xLTQ3LjFMMjk4LDIwMEwxNjMuNSwzMzQuNXpcIi8+XG4gICAgICA8L3N2Zz5cbiAgICApO1xuICB9XG59KTtcbnZhciBCaWxsU2VhcmNoID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnNlc3Npb24gPT0gJycpIHtcbiAgICAgIHZhciBzZWxlY3RUZXh0ID0gJ2FueSBzZXNzaW9uJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgc2VsZWN0VGV4dCA9IHRoaXMucHJvcHMuc2Vzc2lvbjtcbiAgICB9XG4gICAgdmFyIHNlc3Npb25zVm90ZXMgPSB0aGlzLnByb3BzLnNlc3Npb25zVm90ZXM7XG4gICAgdmFyIHRvZ2dsZUNsYXNzID0gJ3Nlc3Npb25TZWxlY3QnICsgKHRoaXMucHJvcHMuc2Vzc2lvblRvZ2dsZSA/ICcnIDogJyBjb2xsYXBzZWQnKTtcbiAgICB2YXIgb2JqZWN0Tm9kZXMgPSB0aGlzLnByb3BzLnNlc3Npb25zTGlzdC5tYXAoZnVuY3Rpb24gKG9iamVjdCwgaSkge1xuICAgICAgICB2YXIgc3VtID0gc2Vzc2lvbnNWb3Rlc1tvYmplY3QuaWRdO1xuICAgICAgICBpZiAoc3VtKSB7XG4gICAgICAgICAgdmFyIHN0cmluZyA9IG9iamVjdC5pZCArICcgLSAoJyArIHN1bSArICcpJztcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxpIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZXNzaW9uU2VsZWN0LmJpbmQobnVsbCxvYmplY3QpfSBrZXk9e2l9PjxzcGFuIGNsYXNzTmFtZT1cInNlc3Npb25cIj57b2JqZWN0LmlkfTwvc3Bhbj4gPHNwYW4gY2xhc3NOYW1lPVwic3VtXCI+e3N1bX08L3NwYW4+PC9saT5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiaWxsU2VhcmNoXCI+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYmlsbHMgYnkgbmFtZSBvciBudW1iZXIuLi5cIiBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkJpbGxTZWFyY2hDaGFuZ2V9IC8+ICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dG9nZ2xlQ2xhc3N9PiAgICBcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzZWxlY3RcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2Vzc2lvblNlbGVjdFRvZ2dsZX0+e3NlbGVjdFRleHR9PC9zcGFuPiAgXG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInNlc3Npb25PcHRpb25cIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2Vzc2lvblNlbGVjdC5iaW5kKG51bGwsJycpfT48c3BhbiBjbGFzc05hbWU9XCJzZXNzaW9uXCI+YW55IHNlc3Npb248L3NwYW4+IDxzcGFuIGNsYXNzTmFtZT1cInN1bVwiPntzZXNzaW9uc1ZvdGVzWydzdW0nXX08L3NwYW4+PC9saT5cbiAgICAgICAgICAgIHtvYmplY3ROb2Rlc31cbiAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZvdGVSb3c7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBTZWFyY2hTdGFjayA9IHJlcXVpcmUoJy4vU2VhcmNoU3RhY2suanMnKTtcblNlYXJjaEJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICdzZWFyY2hCb3ggJyArIHRoaXMucHJvcHMuYm94OyAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30gb25TY3JvbGw9e3RoaXMucHJvcHMub25TZWFyY2hTY3JvbGwuYmluZChudWxsLCB0aGlzKX0gPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wTGlua3NcIj48YSBocmVmPVwiLyMvaW5mb1wiIGNsYXNzTmFtZT1cImluZm9cIj48L2E+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zaGF5cW4vcGFybGVcIiBjbGFzc05hbWU9XCJnaXRodWJcIj48L2E+PC9kaXY+XG4gICAgICAgICAgPGZvcm0+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25TZWFyY2hDaGFuZ2V9IC8+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TZWFyY2g8L2J1dHRvbj5cbiAgICAgICAgICAgIDxzcGFuPmJ5IG5hbWUsIHJpZGluZywgb3IgcG9zdGFsIGNvZGU8L3NwYW4+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoQ29udGVudFwiPlxuICAgICAgICAgICAgPFNlYXJjaFN0YWNrIFxuICAgICAgICAgICAgICBib3g9e3RoaXMucHJvcHMuYm94fSBcbiAgICAgICAgICAgICAgcG9saXRpY2lhbnM9e3RoaXMucHJvcHMucG9saXRpY2lhbnN9IFxuICAgICAgICAgICAgICBwcm9maWxlPXt0aGlzLnByb3BzLnByb2ZpbGV9XG4gICAgICAgICAgICAgIHNlYXJjaGluZz17dGhpcy5wcm9wcy5zZWFyY2hpbmd9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xudmFyIFNlYXJjaFN0YWNrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzU3RyaW5nID0gXCJzZWFyY2hTdGFja1wiO1xuICAgIHZhciBjdXJyZW50UHJvZmlsZUlEID0gdGhpcy5wcm9wcy5wcm9maWxlLmlkO1xuICAgIHZhciBwb2xpdGljaWFuTm9kZXMgPSBbXTtcbiAgICBpZiAodGhpcy5wcm9wcy5wb2xpdGljaWFucy5sZW5ndGggPiAwKSB7XG4gICAgICBwb2xpdGljaWFuTm9kZXMgPSB0aGlzLnByb3BzLnBvbGl0aWNpYW5zLm1hcChmdW5jdGlvbiAob2JqZWN0LCBpKSB7XG4gICAgICAgIHZhciBpbWdVUkwgPSBcInVybCgnL3N0YXRpYy9oZWFkc2hvdHMvXCIgKyBvYmplY3QuaW1ndXJsICsgXCInKVwiO1xuICAgICAgICB2YXIgY2xhc3NTdHJpbmcgPSAnJztcbiAgICAgICAgaWYgKG9iamVjdC5pZCA9PSBjdXJyZW50UHJvZmlsZUlEKSB7XG4gICAgICAgICAgY2xhc3NTdHJpbmcgKz0gJ2FjdGl2ZSAnO1xuICAgICAgICB9XG4gICAgICAgIGlmICgob2JqZWN0LmlkID09IGN1cnJlbnRQcm9maWxlSUQpJiYodGhpcy5wcm9wcy5ib3ggPT0gJ3Byb2ZpbGUnKSkge1xuICAgICAgICAgIHZhciBocmVmID0gJy8jLyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdmFyIGhyZWYgPSAnLyMvcHJvZmlsZS8nICsgb2JqZWN0LmlkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmplY3QuYWN0aXZlKSB7XG4gICAgICAgICAgY2xhc3NTdHJpbmcgKz0gJ2N1cnJlbnQgJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9iamVjdC5wYXJ0eV9zbHVnKSB7XG4gICAgICAgICAgdmFyIHBhcnR5TmFtZSA9IG9iamVjdC5wYXJ0eV9uYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNsYXNzU3RyaW5nICs9IG9iamVjdC5wYXJ0eV9zbHVnO1xuICAgICAgICAgIHZhciBwYXJ0eU5hbWUgPSBvYmplY3QucGFydHlfc2x1ZztcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqZWN0Lm5hbWUubGVuZ3RoPjE5KSB7XG4gICAgICAgICAgaWYgKG9iamVjdC5uYW1lLmxlbmd0aCA+IDIyKSB7XG4gICAgICAgICAgICBjbGFzc1N0cmluZyArPSAnIHJlZHVjZS1sYXJnZSdcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjbGFzc1N0cmluZyArPSAnIHJlZHVjZS1tZWRpdW0nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxhIGNsYXNzTmFtZT17Y2xhc3NTdHJpbmd9IGhyZWY9e2hyZWZ9IGtleT17aX0gPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e2JhY2tncm91bmRJbWFnZTogaW1nVVJMfX0+PC9kaXY+XG4gICAgICAgICAgICA8aDM+e29iamVjdC5uYW1lfTwvaDM+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwYXJ0eVwiPntwYXJ0eU5hbWV9PC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7ICBcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5wcm9wcy5zZWFyY2hpbmcpIHtcbiAgICAgIHZhciBub1Jlc3VsdHNOb2RlID0gPGE+PGgzPk5PIFJFU1VMVFM8L2gzPjwvYT47XG4gICAgICBwb2xpdGljaWFuTm9kZXMucHVzaChub1Jlc3VsdHNOb2RlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgcGxhY2VIb2xkZXJOYW1lcyA9IFsnSm9obiBBLiBNY1RlbXAnLCAnSm9obiBGYWtlbmJha2VyJywgJ1BpZXJyZSBUZW1wZGVhdSddO1xuICAgICAgZm9yIChpID0gMDsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgdmFyIGVtcHR5Tm9kZSA9IDxhIGtleT17aX0gY2xhc3NOYW1lPVwicGxhY2Vob2xkZXJcIiBocmVmPVwiLyMvXCI+PGRpdj48L2Rpdj48aDM+e3BsYWNlSG9sZGVyTmFtZXNbaSUzXX08L2gzPjxzcGFuIGNsYXNzTmFtZT1cInBhcnR5XCI+VkFOPC9zcGFuPjwvYT47XG4gICAgICAgIHBvbGl0aWNpYW5Ob2Rlcy5wdXNoKGVtcHR5Tm9kZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NTdHJpbmd9PlxuICAgICAgICA8aDI+TWVtYmVycyBvZiBQYXJsaWFtZW50PHNwYW4gY2xhc3NOYW1lPVwibGVhZlwiPjwvc3Bhbj48L2gyPlxuICAgICAgICB7cG9saXRpY2lhbk5vZGVzfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFNlYXJjaEJveDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIFNlYXJjaFN0YWNrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlNlYXJjaFN0YWNrXCIsXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgY2xhc3NTdHJpbmcgPSBcInNlYXJjaFN0YWNrXCI7XG4gICAgdmFyIGN1cnJlbnRQcm9maWxlSUQgPSB0aGlzLnByb3BzLnByb2ZpbGUuaWQ7XG4gICAgdmFyIHBvbGl0aWNpYW5Ob2RlcyA9IFtdO1xuICAgIGlmICh0aGlzLnByb3BzLnBvbGl0aWNpYW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIHBvbGl0aWNpYW5Ob2RlcyA9IHRoaXMucHJvcHMucG9saXRpY2lhbnMubWFwKGZ1bmN0aW9uIChvYmplY3QsIGkpIHtcbiAgICAgICAgdmFyIGltZ1VSTCA9IFwidXJsKCcvc3RhdGljL2hlYWRzaG90cy9cIiArIG9iamVjdC5pbWd1cmwgKyBcIicpXCI7XG4gICAgICAgIHZhciBjbGFzc1N0cmluZyA9ICcnO1xuICAgICAgICBpZiAob2JqZWN0LmlkID09IGN1cnJlbnRQcm9maWxlSUQpIHtcbiAgICAgICAgICBjbGFzc1N0cmluZyArPSAnYWN0aXZlICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChvYmplY3QuaWQgPT0gY3VycmVudFByb2ZpbGVJRCkmJih0aGlzLnByb3BzLmJveCA9PSAncHJvZmlsZScpKSB7XG4gICAgICAgICAgdmFyIGhyZWYgPSAnLyMvJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB2YXIgaHJlZiA9ICcvIy9wcm9maWxlLycgKyBvYmplY3QuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iamVjdC5hY3RpdmUpIHtcbiAgICAgICAgICBjbGFzc1N0cmluZyArPSAnY3VycmVudCAnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb2JqZWN0LnBhcnR5X3NsdWcpIHtcbiAgICAgICAgICB2YXIgcGFydHlOYW1lID0gb2JqZWN0LnBhcnR5X25hbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY2xhc3NTdHJpbmcgKz0gb2JqZWN0LnBhcnR5X3NsdWc7XG4gICAgICAgICAgdmFyIHBhcnR5TmFtZSA9IG9iamVjdC5wYXJ0eV9zbHVnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmplY3QubmFtZS5sZW5ndGg+MTkpIHtcbiAgICAgICAgICBpZiAob2JqZWN0Lm5hbWUubGVuZ3RoID4gMjIpIHtcbiAgICAgICAgICAgIGNsYXNzU3RyaW5nICs9ICcgcmVkdWNlLWxhcmdlJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNsYXNzU3RyaW5nICs9ICcgcmVkdWNlLW1lZGl1bSc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwge2NsYXNzTmFtZTogY2xhc3NTdHJpbmcsIGhyZWY6IGhyZWYsIGtleTogaX0sIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IHtiYWNrZ3JvdW5kSW1hZ2U6IGltZ1VSTH19KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgbnVsbCwgb2JqZWN0Lm5hbWUpLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtjbGFzc05hbWU6IFwicGFydHlcIn0sIHBhcnR5TmFtZSlcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9LmJpbmQodGhpcykpOyAgXG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMucHJvcHMuc2VhcmNoaW5nKSB7XG4gICAgICB2YXIgbm9SZXN1bHRzTm9kZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBudWxsLCBcIk5PIFJFU1VMVFNcIikpO1xuICAgICAgcG9saXRpY2lhbk5vZGVzLnB1c2gobm9SZXN1bHRzTm9kZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHBsYWNlSG9sZGVyTmFtZXMgPSBbJ0pvaG4gQS4gTWNUZW1wJywgJ0pvaG4gRmFrZW5iYWtlcicsICdQaWVycmUgVGVtcGRlYXUnXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgIHZhciBlbXB0eU5vZGUgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7a2V5OiBpLCBjbGFzc05hbWU6IFwicGxhY2Vob2xkZXJcIiwgaHJlZjogXCIvIy9cIn0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBudWxsLCBwbGFjZUhvbGRlck5hbWVzW2klM10pLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcInBhcnR5XCJ9LCBcIlZBTlwiKSk7XG4gICAgICAgIHBvbGl0aWNpYW5Ob2Rlcy5wdXNoKGVtcHR5Tm9kZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IGNsYXNzU3RyaW5nfSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCBcIk1lbWJlcnMgb2YgUGFybGlhbWVudFwiLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcImxlYWZcIn0pKSwgXG4gICAgICAgIHBvbGl0aWNpYW5Ob2Rlc1xuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlYXJjaFN0YWNrOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgQmlsbFRleHQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHByZXBUZXh0OiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdGV4dCA9IHRleHQudHJpbSgpO1xuICAgIHJldHVybiAodGV4dC5sZW5ndGg+MD8nPHA+Jyt0ZXh0LnJlcGxhY2UoL1tcXHJcXG5dKy8sJzwvcD48cD4nKSsnPC9wPic6bnVsbCk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBiaWxsVGV4dCA9IHRoaXMucHJlcFRleHQodGhpcy5wcm9wcy5iaWxsVGV4dCk7XG4gICAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJpbGxUZXh0XCI+XG4gICAgICB7YmlsbFRleHR9XG4gICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmlsbFRleHQ7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBCaWxsVGV4dCA9IHJlcXVpcmUoJy4vQmlsbFRleHQuanMnKTtcbnZhciBUZXh0Qm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjbGFzc2VzID0gJ2JpbGxUZXh0Qm94ICcgKyB0aGlzLnByb3BzLmJveDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9PjxkaXYgY2xhc3NOYW1lPVwiY2xvc2VDb250YWluZXJcIj48YSBocmVmPVwiLyMvXCI+PC9hPjwvZGl2PjxCaWxsVGV4dCBiaWxsVGV4dD17dGhpcy5wcm9wcy5iaWxsVGV4dH0gLz48L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0Qm94OyIsInZhciBBcnJvd0ljb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzdmcgdmVyc2lvbj1cIjEuMVwiIHg9XCIwcHhcIiB5PVwiMHB4XCJcbiAgICAgICAgIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiPlxuICAgICAgICA8cGF0aCBkPVwiTTE2My41LDMzNC41bC00Ny4xLTQ3LjFsODcuNS04Ny41bC04Ny41LTg3LjVsNDcuMS00Ny4xTDI5OCwyMDBMMTYzLjUsMzM0LjV6XCIvPlxuICAgICAgPC9zdmc+XG4gICAgKTtcbiAgfVxufSk7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbmlmICh0eXBlb2YgZ2EgIT09ICd1bmRlZmluZWQnKSB7IC8vIGZhaWwgZ3JhY2VmdWxseVxuICB0cmFja2VyID0gZ2EuY3JlYXRlKCdVQS02NzgwNDQ1MS0xJywgJ3ZvdGVzLm1wJyk7XG59XG5mdW5jdGlvbiBnYVRyYWNrKHBhdGgsIHRpdGxlKSB7XG4gIGlmICh0eXBlb2YgZ2EgIT09ICd1bmRlZmluZWQnKSB7IC8vIGZhaWwgZ3JhY2VmdWxseVxuICAgIGlmIChwYXRoPT1cIlwiKSB7XG4gICAgICBwYXRoID0gXCIvXCI7XG4gICAgfVxuICAgIGdhKCdzZXQnLCB7IHBhZ2U6IHBhdGgsIHRpdGxlOiB0aXRsZSB9KTtcbiAgICBnYSgnc2VuZCcsICdwYWdldmlldycpO1xuICB9XG59XG5cbi8vIEVsZW1lbnRzXG52YXIgQXJyb3dJY29uID0gcmVxdWlyZSgnLi9lbGVtZW50cy9BcnJvd0ljb24uanMnKTtcblxuLy8gQm94ZXNcbnZhciBTZWFyY2hCb3ggPSByZXF1aXJlKCcuL2JveGVzL3NlYXJjaC9TZWFyY2hCb3guanMnKTtcbnZhciBQcm9maWxlQm94ID0gcmVxdWlyZSgnLi9ib3hlcy9wcm9maWxlL1Byb2ZpbGVCb3guanMnKTtcbnZhciBJbmZvQm94ID0gcmVxdWlyZSgnLi9ib3hlcy9pbmZvL0luZm9Cb3guanMnKTtcbnZhciBUZXh0Qm94ID0gcmVxdWlyZSgnLi9ib3hlcy90ZXh0L1RleHRCb3guanMnKTtcblxuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcHBTdGF0ZSA9IHRoaXMuc2V0QXBwU3RhdGUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgYXBwOiBhcHBTdGF0ZSxcbiAgICB9O1xuICB9LFxuXG4gIHNldEFwcFN0YXRlOiBmdW5jdGlvbihwcmV2U3RhdGUpIHtcbiAgICAvLyBkZWZhdWx0IHN0YXRlIG9uIGluaXRpYXRpb25cbiAgICBpZiAodHlwZW9mKHByZXZTdGF0ZSk9PT0ndW5kZWZpbmVkJykgcHJldlN0YXRlID0geyBcbiAgICAgIGFwcDoge1xuICAgICAgICBib3g6ICdzZWFyY2gnLFxuICAgICAgICBwb2xpdGljaWFuTGlzdDoge30sXG4gICAgICAgIHBhcnRpZXNMaXN0OiB7fSxcbiAgICAgICAgcmlkaW5nc0xpc3Q6IHt9LFxuICAgICAgICBzZXNzaW9uc0xpc3Q6IHt9LFxuICAgICAgICBzZXNzaW9uczogWyc0Mi0yJywgJzQyLTEnXSxcbiAgICAgICAgc2VhcmNoOiB7XG4gICAgICAgICAgaXNTZWFyY2hpbmc6IGZhbHNlLFxuICAgICAgICAgIHNlYXJjaFZhbHVlOiAnJyxcbiAgICAgICAgICByaWRpbmc6ICcnLFxuICAgICAgICAgIG1heDogMTAsXG4gICAgICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBwcm9maWxlOiB7XG4gICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgdm90ZXM6IHt9LFxuICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHZvdGU6IHtcbiAgICAgICAgICBpZDogMCxcbiAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBiaWxsOiB7XG4gICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgLy8gZWRpdCBzdGF0ZSBhY2NvcmRpbmcgdG8gVVJMIHZhbHVlc1xuICAgIHZhciB1cmxIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpO1xuICAgIHZhciBuZXdTdGF0ZSA9IHByZXZTdGF0ZTtcbiAgICB2YXIgdXJsUGFyYW1ldGVycyA9IHVybEhhc2guc3BsaXQoJy8nKS5maWx0ZXIoZnVuY3Rpb24obil7IHJldHVybiBuICE9ICcnIH0pO1xuICAgIHZhciBib3ggPSBwcmV2U3RhdGUuYXBwLmJveDtcbiAgICAvLyBpZiBwcm9maWxlIG9yIGJpbGxcbiAgICBpZiAodXJsUGFyYW1ldGVycy5sZW5ndGggPj0gMikge1xuICAgICAgaWYgKCh1cmxQYXJhbWV0ZXJzWzBdID09ICdwcm9maWxlJykgJiYgIWlzTmFOKHVybFBhcmFtZXRlcnNbMV0pKSB7XG4gICAgICAgIG5ld1N0YXRlLmFwcC5ib3ggPSAncHJvZmlsZSc7XG4gICAgICAgIG5ld1N0YXRlLmFwcC5wcm9maWxlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIG5ld1N0YXRlLmFwcC5wcm9maWxlLmlkID0gdXJsUGFyYW1ldGVyc1sxXTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCh1cmxQYXJhbWV0ZXJzWzBdID09ICdiaWxsJykgJiYgIWlzTmFOKHVybFBhcmFtZXRlcnNbMV0pKSB7XG4gICAgICAgIG5ld1N0YXRlLmFwcC5ib3ggPSAnYmlsbCc7XG4gICAgICAgIG5ld1N0YXRlLmFwcC5iaWxsLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIG5ld1N0YXRlLmFwcC5iaWxsLmlkID0gdXJsUGFyYW1ldGVyc1sxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYgcHJvZmlsZSBhbmQgdm90ZSBzcGVjaWZpZWRcbiAgICBpZiAodXJsUGFyYW1ldGVycy5sZW5ndGggPj0gNCkge1xuICAgICAgaWYgKCh1cmxQYXJhbWV0ZXJzWzJdID09ICd2b3RlJykgJiYgIWlzTmFOKHVybFBhcmFtZXRlcnNbM10pKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHVybFBhcmFtZXRlcnNbM10pO1xuICAgICAgICBuZXdTdGF0ZS5hcHAudm90ZS5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICBuZXdTdGF0ZS5hcHAudm90ZS5pZCA9IHVybFBhcmFtZXRlcnNbM107XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdTdGF0ZS5hcHA7XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZ2V0SW5pdGlhbERhdGEoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5hcHAuYm94ID09PSAncHJvZmlsZScpIHtcbiAgICAgIHRoaXMuZ2V0UG9saXRpY2lhblZvdGVzKHRoaXMuc3RhdGUuYXBwLnByb2ZpbGUuaWQpO1xuICAgIH1cbiAgfSxcblxuICBnZXRQb2xpdGljaWFuVm90ZXM6IGZ1bmN0aW9uKGlkKSB7XG4gICAgdGhpcy5mZXRjaERhdGFGcm9tU2VydmVyKCcvdm90ZXMvJyArIGlkLCB0aGlzLnNldFBvbGl0aWNpYW4pO1xuICB9LFxuXG4gIHNldFBvbGl0aWNpYW46IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgYXBwU3RhdGUgPSB0aGlzLnN0YXRlLmFwcDtcbiAgICAgIGFwcFN0YXRlLnByb2ZpbGUudm90ZXMgPSBwYXJzZWREYXRhWyd2b3RlcyddO1xuICAgICAgYXBwU3RhdGUucHJvZmlsZS5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNldFN0YXRlKHthcHA6IGFwcFN0YXRlfSk7XG4gIH0sXG5cbiAgZ2V0SW5pdGlhbERhdGE6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdpIGdvdCBjYWxsZWQnKTtcbiAgICBpZiAodHlwZW9mKFN0b3JhZ2UpID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzdG9yYWdlIGlzIHVuZGVmaW5lZCcpO1xuICAgICAgdGhpcy5mZXRjaERhdGFGcm9tU2VydmVyKCcvaW5pdGlhbGl6ZScsIHRoaXMuc2V0SW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzdG9yYWdlIGlzIGRlZmluZWQnKTtcbiAgICAgIGNvbnNvbGUubG9nKHR5cGVvZihsb2NhbFN0b3JhZ2UuaW5pdGlhbF9kYXRhKSAhPSBcInVuZGVmaW5lZFwiKTtcbiAgICAgIGlmICh0eXBlb2YobG9jYWxTdG9yYWdlLmluaXRpYWxfZGF0YSkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBjb25zb2xlLmxvZygnaW5pdGlhbCBkYXRhIGlzIGRlZmluZWQnKTtcbiAgICAgICAgdGhpcy5zZXRJbml0aWFsRGF0YShsb2NhbFN0b3JhZ2UuaW5pdGlhbF9kYXRhKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnaW5pdGlhbCBkYXRhIGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICB0aGlzLmZldGNoRGF0YUZyb21TZXJ2ZXIoJy9pbml0aWFsaXplJywgdGhpcy5zZXRJbml0aWFsRGF0YSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHNldEluaXRpYWxEYXRhOiBmdW5jdGlvbihpbml0aWFsRGF0YSkge1xuICAgIGNvbnNvbGUubG9nKCdnb3QgdGhpcyBmYXInKTtcbiAgICBpZiAodHlwZW9mKFN0b3JhZ2UpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBpZiAodHlwZW9mKGxvY2FsU3RvcmFnZS5pbml0aWFsX2RhdGEpID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dvdCB0aGlzIGZhcicpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UuaW5pdGlhbF9kYXRhID0gaW5pdGlhbERhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBwYXJzZWREYXRhID0gSlNPTi5wYXJzZShpbml0aWFsRGF0YSk7XG4gICAgYXBwU3RhdGUgPSB0aGlzLnN0YXRlLmFwcDtcbiAgICAgIGFwcFN0YXRlLnBvbGl0aWNpYW5MaXN0ID0gcGFyc2VkRGF0YVsncG9saXRpY2lhbnMnXTtcbiAgICAgIGFwcFN0YXRlLnJpZGluZ3NMaXN0ID0gcGFyc2VkRGF0YVsncmlkaW5ncyddO1xuICAgICAgYXBwU3RhdGUucGFydGllc0xpc3QgPSBwYXJzZWREYXRhWydwYXJ0aWVzJ107XG4gICAgICBhcHBTdGF0ZS5zZXNzaW9uc0xpc3QgPSBwYXJzZWREYXRhWydzZXNzaW9ucyddO1xuICAgICAgYXBwU3RhdGUuc2VhcmNoLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuc2V0U3RhdGUoe2FwcDogYXBwU3RhdGV9KTtcbiAgICBjb25zb2xlLmxvZygnYW5kIHRoaXMgZmFyJyk7XG4gIH0sXG5cbiAgZmV0Y2hEYXRhRnJvbVNlcnZlcjogZnVuY3Rpb24ocGF0aCwgc2V0dGVyLCB3aWxsUmV0dXJuKSB7XG4gICAgY29uc29sZS5sb2coJ2kgZ290IGFjdGl2YXRlZCcpO1xuICAgIGlmICh0eXBlb2Yod2lsbFJldHVybik9PT0ndW5kZWZpbmVkJykgd2lsbFJldHVybiA9IGZhbHNlO1xuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHBhdGgsIHRydWUpO1xuICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBzdWNjZXNzXG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIHNldHRlcihyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBmZXRjaGluZyBkYXRhIGZyb20gc2VydmVyXCIpXG4gICAgICB9XG4gICAgfVxuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHJlcXVlc3RpbmcgZGF0YSBmcm9tIHNlcnZlclwiKVxuICAgICAgLy8gVGhlcmUgd2FzIGEgY29ubmVjdGlvbiBlcnJvciBvZiBzb21lIHNvcnRcbiAgICB9O1xuICAgIHJlcXVlc3Quc2VuZCgpO1xuICB9LFxuXG4gIFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsb2FkaW5nID0gKHRoaXMuc3RhdGUuYXBwLnNlYXJjaC5pc0xvYWRpbmcpID8gXCJsb2FkaW5nXCIgOiBcImxvYWRlZFwiO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7bG9hZGluZ31cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIFxufSk7XG5cblJlYWN0LnJlbmRlcihcbiAgPEFwcCAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxuKTsiXX0=
