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

},{"./VoteRow.js":6}],5:[function(require,module,exports){
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

},{"./SearchStack.js":8}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"./BillText.js":9}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"./boxes/info/InfoBox.js":1,"./boxes/profile/ProfileBox.js":5,"./boxes/search/SearchBox.js":7,"./boxes/text/TextBox.js":10,"./elements/ArrowIcon.js":11}]},{},[12]);
