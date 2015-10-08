(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/braden/parle/node_modules/react-addons-pure-render-mixin/index.js":[function(require,module,exports){
module.exports = require('react/lib/ReactComponentWithPureRenderMixin');
},{"react/lib/ReactComponentWithPureRenderMixin":"/Users/braden/parle/node_modules/react/lib/ReactComponentWithPureRenderMixin.js"}],"/Users/braden/parle/node_modules/react/lib/ReactComponentWithPureRenderMixin.js":[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentWithPureRenderMixin
 */

'use strict';

var shallowCompare = require('./shallowCompare');

/**
 * If your React component's render function is "pure", e.g. it will render the
 * same result given the same props and state, provide this Mixin for a
 * considerable performance boost.
 *
 * Most React components have pure render functions.
 *
 * Example:
 *
 *   var ReactComponentWithPureRenderMixin =
 *     require('ReactComponentWithPureRenderMixin');
 *   React.createClass({
 *     mixins: [ReactComponentWithPureRenderMixin],
 *
 *     render: function() {
 *       return <div className={this.props.className}>foo</div>;
 *     }
 *   });
 *
 * Note: This only checks shallow equality for props and state. If these contain
 * complex data structures this mixin may have false-negatives for deeper
 * differences. Only mixin to components which have simple props and state, or
 * use `forceUpdate()` when you know deep data structures have changed.
 */
var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
};

module.exports = ReactComponentWithPureRenderMixin;
},{"./shallowCompare":"/Users/braden/parle/node_modules/react/lib/shallowCompare.js"}],"/Users/braden/parle/node_modules/react/lib/shallowCompare.js":[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
* @providesModule shallowCompare
*/

'use strict';

var shallowEqual = require('fbjs/lib/shallowEqual');

/**
 * Does a shallow comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 */
function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

module.exports = shallowCompare;
},{"fbjs/lib/shallowEqual":"/Users/braden/parle/node_modules/react/node_modules/fbjs/lib/shallowEqual.js"}],"/Users/braden/parle/node_modules/react/node_modules/fbjs/lib/shallowEqual.js":[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shallowEqual
 * @typechecks
 * 
 */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],"/Users/braden/parle/src/js/boxes/info/InfoBox.js":[function(require,module,exports){
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
      voteRows = this.props.votes.map(function (object, key) {
        return (
          React.createElement(VoteRow, {
            key: key, 
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
          React.createElement("div", {key: 0, className: "voteRow row noresults"}, 
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
var PureRenderMixin = require('react-addons-pure-render-mixin');
var ProfileBox = React.createClass({displayName: "ProfileBox",
  mixins: [PureRenderMixin],
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

},{"./BillSearch.js":"/Users/braden/parle/src/js/boxes/profile/BillSearch.js","./BillStack.js":"/Users/braden/parle/src/js/boxes/profile/BillStack.js","react-addons-pure-render-mixin":"/Users/braden/parle/node_modules/react-addons-pure-render-mixin/index.js"}],"/Users/braden/parle/src/js/boxes/profile/VoteRow.js":[function(require,module,exports){
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
    if (this.props.vote.votequestion_id == this.props.currentVote.id) {
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
    if (this.props.voteQuestionID == this.props.currentVote.id) {
      infoClass += ' current';
      var lawString =  'Law: ' + this.props.lawText;
      var voteInformation = React.createElement("div", {className: "col billInfo"}, lawString)
      if (undefined != this.props.billInfo) {
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
        for (var key in this.props.billInfo) {
          i++;
          var partyName = key;
          var yes = this.props.billInfo[key]['Y'];
          var no = this.props.billInfo[key]['N'];
          var abstain = this.props.billInfo[key]['A'];
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


module.exports = VoteRow;

},{}],"/Users/braden/parle/src/js/boxes/search/SearchBox.js":[function(require,module,exports){
/** @jsx React.DOM */
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SearchStack = require('./SearchStack.js');
var SessionSelector = require('./SessionSelector.js');
SearchBox = React.createClass({displayName: "SearchBox",
  mixins: [PureRenderMixin],
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

},{"./SearchStack.js":"/Users/braden/parle/src/js/boxes/search/SearchStack.js","./SessionSelector.js":"/Users/braden/parle/src/js/boxes/search/SessionSelector.js","react-addons-pure-render-mixin":"/Users/braden/parle/node_modules/react-addons-pure-render-mixin/index.js"}],"/Users/braden/parle/src/js/boxes/search/SearchStack.js":[function(require,module,exports){
/** @jsx React.DOM */


var PureRenderMixin = require('react-addons-pure-render-mixin');
var SearchStack = React.createClass({displayName: "SearchStack",
  mixins: [PureRenderMixin],
  render: function() {
    classString = "searchStack";
    var currentProfileID = this.props.currentProfileID;
    var politicianNodes = [];
    var getPoliticianByID = this.props.getters[0];
    var getPartyByID = this.props.getters[1];
    var getRidingByID = this.props.getters[2];
    if (this.props.politicians.length > 0) {
      politicianNodes = this.props.politicians.map(function (politician, key) {
        return (
          React.createElement(PoliticianResult, {
            key: key, 
            politician: politician, 
            currentProfileID: currentProfileID, 
            getters: this.props.getters, 
            box: this.props.box})
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

var PoliticianResult = React.createClass({displayName: "PoliticianResult",
  mixins: [PureRenderMixin],
  render: function() {
    var getPartyByID = this.props.getters[1];
    var politician = this.props.politician;
    var headshot = politician.headshot.split('/').pop();
    var imgURL = "url('/static/headshots/" + headshot + "')";
    var classString = '';
    if (politician.id == this.props.currentProfileID) {
      classString += 'active ';
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
      React.createElement("a", {className: classString, href: href, key: this.props.key}, 
        React.createElement("div", {style: {backgroundImage: imgURL}}), 
        React.createElement("h3", null, politician.name), 
        React.createElement("span", {className: "party"}, partyName)
      )
    );
  }

});

module.exports = SearchStack;

},{"react-addons-pure-render-mixin":"/Users/braden/parle/node_modules/react-addons-pure-render-mixin/index.js"}],"/Users/braden/parle/src/js/boxes/search/SessionButton.js":[function(require,module,exports){
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

//Mixins

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
          billInfo: this.state.app.vote.data, 
          getPolitician: this.getPolitician})
      )
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
  React.createElement(App, null),
  document.getElementById('content')
);

},{"./boxes/info/InfoBox.js":"/Users/braden/parle/src/js/boxes/info/InfoBox.js","./boxes/profile/ProfileBox.js":"/Users/braden/parle/src/js/boxes/profile/ProfileBox.js","./boxes/search/SearchBox.js":"/Users/braden/parle/src/js/boxes/search/SearchBox.js","./boxes/text/TextBox.js":"/Users/braden/parle/src/js/boxes/text/TextBox.js","./elements/ArrowIcon.js":"/Users/braden/parle/src/js/elements/ArrowIcon.js"}]},{},["/Users/braden/parle/src/js/parle.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtYWRkb25zLXB1cmUtcmVuZGVyLW1peGluL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL3NoYWxsb3dDb21wYXJlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L25vZGVfbW9kdWxlcy9mYmpzL2xpYi9zaGFsbG93RXF1YWwuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9Cb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9UZXh0LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU2VhcmNoLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU3RhY2suanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1Byb2ZpbGVCb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1ZvdGVSb3cuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9zZWFyY2gvU2VhcmNoQm94LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvc2VhcmNoL1NlYXJjaFN0YWNrLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvc2VhcmNoL1Nlc3Npb25CdXR0b24uanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9zZWFyY2gvU2Vzc2lvblNlbGVjdG9yLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvdGV4dC9CaWxsVGV4dC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2JveGVzL3RleHQvVGV4dEJveC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2VsZW1lbnRzL0Fycm93SWNvbi5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL3BhcmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREEscUJBQXFCOztBQUVyQixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDeEMsSUFBSSw2QkFBNkIsdUJBQUE7RUFDL0IsbUJBQW1CLEVBQUUs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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRUksT0FBTyxFQUFFLENBQUM7QUFDZCxHQUFHOztBQUVILENBQUMsQ0FBQyxDQUFDOztBQUVILEtBQUssQ0FBQyxNQUFNO0VBQ1Ysb0JBQUMsR0FBRyxFQUFBLElBQUEsQ0FBRyxDQUFBO0VBQ1AsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7Q0FDbkMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluJyk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHNoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgnLi9zaGFsbG93Q29tcGFyZScpO1xuXG4vKipcbiAqIElmIHlvdXIgUmVhY3QgY29tcG9uZW50J3MgcmVuZGVyIGZ1bmN0aW9uIGlzIFwicHVyZVwiLCBlLmcuIGl0IHdpbGwgcmVuZGVyIHRoZVxuICogc2FtZSByZXN1bHQgZ2l2ZW4gdGhlIHNhbWUgcHJvcHMgYW5kIHN0YXRlLCBwcm92aWRlIHRoaXMgTWl4aW4gZm9yIGFcbiAqIGNvbnNpZGVyYWJsZSBwZXJmb3JtYW5jZSBib29zdC5cbiAqXG4gKiBNb3N0IFJlYWN0IGNvbXBvbmVudHMgaGF2ZSBwdXJlIHJlbmRlciBmdW5jdGlvbnMuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgIHZhciBSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4gPVxuICogICAgIHJlcXVpcmUoJ1JlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpbicpO1xuICogICBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgbWl4aW5zOiBbUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluXSxcbiAqXG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9PmZvbzwvZGl2PjtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIE5vdGU6IFRoaXMgb25seSBjaGVja3Mgc2hhbGxvdyBlcXVhbGl0eSBmb3IgcHJvcHMgYW5kIHN0YXRlLiBJZiB0aGVzZSBjb250YWluXG4gKiBjb21wbGV4IGRhdGEgc3RydWN0dXJlcyB0aGlzIG1peGluIG1heSBoYXZlIGZhbHNlLW5lZ2F0aXZlcyBmb3IgZGVlcGVyXG4gKiBkaWZmZXJlbmNlcy4gT25seSBtaXhpbiB0byBjb21wb25lbnRzIHdoaWNoIGhhdmUgc2ltcGxlIHByb3BzIGFuZCBzdGF0ZSwgb3JcbiAqIHVzZSBgZm9yY2VVcGRhdGUoKWAgd2hlbiB5b3Uga25vdyBkZWVwIGRhdGEgc3RydWN0dXJlcyBoYXZlIGNoYW5nZWQuXG4gKi9cbnZhciBSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4gPSB7XG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24gKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgcmV0dXJuIHNoYWxsb3dDb21wYXJlKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW47IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuKiBAcHJvdmlkZXNNb2R1bGUgc2hhbGxvd0NvbXBhcmVcbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHNoYWxsb3dFcXVhbCA9IHJlcXVpcmUoJ2ZianMvbGliL3NoYWxsb3dFcXVhbCcpO1xuXG4vKipcbiAqIERvZXMgYSBzaGFsbG93IGNvbXBhcmlzb24gZm9yIHByb3BzIGFuZCBzdGF0ZS5cbiAqIFNlZSBSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW5cbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0NvbXBhcmUoaW5zdGFuY2UsIG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gIHJldHVybiAhc2hhbGxvd0VxdWFsKGluc3RhbmNlLnByb3BzLCBuZXh0UHJvcHMpIHx8ICFzaGFsbG93RXF1YWwoaW5zdGFuY2Uuc3RhdGUsIG5leHRTdGF0ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hhbGxvd0NvbXBhcmU7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHNoYWxsb3dFcXVhbFxuICogQHR5cGVjaGVja3NcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBQZXJmb3JtcyBlcXVhbGl0eSBieSBpdGVyYXRpbmcgdGhyb3VnaCBrZXlzIG9uIGFuIG9iamVjdCBhbmQgcmV0dXJuaW5nIGZhbHNlXG4gKiB3aGVuIGFueSBrZXkgaGFzIHZhbHVlcyB3aGljaCBhcmUgbm90IHN0cmljdGx5IGVxdWFsIGJldHdlZW4gdGhlIGFyZ3VtZW50cy5cbiAqIFJldHVybnMgdHJ1ZSB3aGVuIHRoZSB2YWx1ZXMgb2YgYWxsIGtleXMgYXJlIHN0cmljdGx5IGVxdWFsLlxuICovXG5mdW5jdGlvbiBzaGFsbG93RXF1YWwob2JqQSwgb2JqQikge1xuICBpZiAob2JqQSA9PT0gb2JqQikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmpBICE9PSAnb2JqZWN0JyB8fCBvYmpBID09PSBudWxsIHx8IHR5cGVvZiBvYmpCICE9PSAnb2JqZWN0JyB8fCBvYmpCID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMob2JqQSk7XG4gIHZhciBrZXlzQiA9IE9iamVjdC5rZXlzKG9iakIpO1xuXG4gIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXNCLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRlc3QgZm9yIEEncyBrZXlzIGRpZmZlcmVudCBmcm9tIEIuXG4gIHZhciBiSGFzT3duUHJvcGVydHkgPSBoYXNPd25Qcm9wZXJ0eS5iaW5kKG9iakIpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFiSGFzT3duUHJvcGVydHkoa2V5c0FbaV0pIHx8IG9iakFba2V5c0FbaV1dICE9PSBvYmpCW2tleXNBW2ldXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYWxsb3dFcXVhbDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEluZm9UZXh0ID0gcmVxdWlyZSgnLi9JbmZvVGV4dC5qcycpO1xudmFyIEluZm9Cb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGNvbXBvbmVudFdpbGxVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgaWYgKChuZXh0UHJvcHMuYm94ID09ICdpbmZvJykgJiYgKHRoaXMucHJvcHMuYm94ICE9ICdzZWFyY2gnKSkge1xuICAgICAgdGhpcy5iYWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmJhY2sgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIGdvQmFjazogZnVuY3Rpb24oZSkge1xuICAgIGlmICh0aGlzLmJhY2spIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNsYXNzZXMgPSAnaW5mb0JveCAnICsgdGhpcy5wcm9wcy5ib3g7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT48ZGl2IGNsYXNzTmFtZT1cImNsb3NlQ29udGFpbmVyXCI+PGEgaHJlZj1cIi8jL1wiIG9uQ2xpY2s9e3RoaXMuZ29CYWNrfT48L2E+PC9kaXY+PEluZm9UZXh0IC8+PC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW5mb0JveDsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEluZm9UZXh0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5mb1RleHRcIj5cbiAgICAgIDxoMj5hYm91dCB2b3Rlcy5tcDwvaDI+XG4gICAgICA8cD5EZW1vY3JhY2llcyBhcmUgZGVmaW5lZCBieSB0aGUgbGF3cyB0aGF0IHRoZXkgcGFzcywgYW5kIHRoZSBsYXdzIHRoYXQgcGFzcyBhcmUgZGV0ZXJtaW5lZCBieSB0aGUgcmVwcmVzZW50YXRpdmVzIHdlIGVsZWN0LiBJbiBvcmRlciB0byBhY2N1cmF0ZWx5IGV2YWx1YXRlIHdoZXRoZXIgb3VyIGVsZWN0ZWQgbWVtYmVycyBvZiBwYXJsaWFtZW50IGFyZSBhcHByb3ByaWF0ZWx5IHJlcHJlc2VudGluZyB0aGVpciBlbGVjdG9yYXRlLCB0aGUgbW9zdCBwZXJ0aW5lbnQgaW5mb3JtYXRpb24gd2UgaGF2ZSBpcyB0aGVpciB2b3RpbmcgaGlzdG9yeTogd2hpY2ggYmlsbHMgaGF2ZSB0aGV5IHZvdGVkIGZvciwgd2hpY2ggaGF2ZSB0aGV5IHZvdGVkIGFnYWluc3QsIGFuZCB3aGljaCBoYXZlIHRoZXkgYWJzdGFpbmVkIGZyb20gdm90aW5nIG9uLiA8L3A+XG4gICAgICA8cD5XaGlsZSB0aGlzIGluZm9ybWF0aW9uIGlzIG1hZGUgcHVibGljbHkgYXZhaWxhYmxlIHRvIGFsbCBDYW5hZGlhbnMsIHdlIG5vdGljZWQgdGhhdCBpdCBjYW4gYmUgc2xvdyBhbmQgZGlmZmljdWx0IHRvIHBhcnNlLiBFdmVyeSBiaWxsIGlzIHZvdGVkIG9uIG11bHRpcGxlIHRpbWVzIC0gc29tZXRpbWVzIHRvIHBhc3MgYW1lbmRtZW50cywgc29tZXRpbWVzIGV2ZW4ganVzdCB0byB2b3RlIG9uIHdoZXRoZXIgb3Igbm90IGl0IHdpbGwgYmUgZGlzY3Vzc2VkLiBVbmxlc3MgeW91IGFyZSBhYmxlIHRvIGRlZGljYXRlIHNpZ25pZmljYW50IHRpbWUgYW5kIGVmZm9ydCBpbnRvIGJlY29taW5nIHdlbGwtdmVyc2VkIG9uIHRoZSBkZXRhaWxzIG9mIGVhY2ggYmlsbCwgYXR0ZW1wdGluZyB0byBhbmFseXplIHRoZSB2b3RlcyBhIHBvbGl0aWNpYW4gbWFrZXMgY2FuIGJlIG1vcmUgY29uZnVzaW5nIHRoYW4gaW5mb3JtYXRpdmUuPC9wPlxuICAgICAgPHA+QXMgZW5nYWdlZCBjaXRpemVucyB3aG8gYXJlIG5vdCBjYXBhYmxlIG9mIGJlaW5nIGludGltYXRlbHkgZmFtaWxpYXIgd2l0aCB0aGUgZGV0YWlscyBhbmQgcHJvZ3Jlc3Mgb2YgZXZlcnkgYmlsbCwgd2hhdCB3ZSB3YW50ZWQgdG8ga25vdyB3YXMgdGhpczogYWZ0ZXIgYWxsIHRoZSBhbWVuZG1lbnRzIGFuZCBlZGl0cywgZGlkIHRoZSBwb2xpdGljaWFuIHZvdGUgdG8gbWFrZSB0aGUgZmluYWwgYmlsbCBhIGxhdyBvciBub3Q/IDwvcD5cbiAgICAgIDxwPlRoYXQgaXMgd2hhdCB0aGlzIHdlYnNpdGUgcHJvdmlkZXM6IGZvciBldmVyeSBtZW1iZXIgb2YgcGFybGlhbWVudCwgaXQgcmV0dXJucyBvbmx5IHRoZSB2b3RlcyB0aGF0IGNvcnJlc3BvbmQgdG8gdGhlaXIgZmluYWwgdm90ZSBvbiBhIGJpbGwgYXMgd2VsbCBhcyB3aGV0aGVyIG9yIG5vdCB0aGUgYmlsbCB3YXMgc3VjY2Vzc2Z1bGx5IHBhc3NlZCBpbnRvIGxhdy48L3A+XG4gICAgICA8cD5XZSBob3BlIHRoYXQgdGhpcyBwcm92aWRlcyBhbiBlYXN5IGFkZGl0aW9uYWwgYXZlbnVlIGZvciBldmFsdWF0aW5nIHRoZSBwZXJmb3JtYW5jZSBvZiBvdXIgZWxlY3RlZCBtZW1iZXJzIG9mIHBhcmxpYW1lbnQgYW5kIGRldGVybWluaW5nIHRoZWlyIGVmZmVjdGl2ZW5lc3MgaW4gcmVwcmVzZW50aW5nIG91ciB2aWV3cy48L3A+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJnaXRodWJMaW5rXCI+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zaGF5cW4vcGFybGVcIj52aWV3IHByb2plY3Qgb24gZ2l0aHViPC9hPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNyZWRpdFdoZXJlQ3JlZGl0c0R1ZVwiPnNwZWNpYWwgdGhhbmtzIHRvIDxhIGhyZWY9XCJodHRwczovL29wZW5wYXJsaWFtZW50LmNhXCI+b3BlbnBhcmxpYW1lbnQuY2E8L2E+IGZvciBwcm92aWRpbmcgYWxsIHRoZSBkYXRhPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gSW5mb1RleHQ7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBCaWxsU2VhcmNoID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJpbGxTZWFyY2hcIj5cbiAgICAgICAgPGZvcm0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBiaWxscyBieSBuYW1lIG9yIG51bWJlci4uLlwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQmlsbFNlYXJjaENoYW5nZX0gLz4gIFxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbGxTZWFyY2g7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBWb3RlUm93ID0gcmVxdWlyZSgnLi9Wb3RlUm93LmpzJyk7XG52YXIgQmlsbFN0YWNrID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50Vm90ZSA9IHRoaXMucHJvcHMuY3VycmVudFZvdGU7XG4gICAgdmFyIGdldEJpbGxJbmZvID0gdGhpcy5wcm9wcy5nZXRCaWxsSW5mbztcbiAgICB2YXIgdm90ZVJvd3MgPSBbXTtcbiAgICB2YXIgbG9hZGVyID0gbnVsbDtcbiAgICBpZiAodGhpcy5wcm9wcy52b3Rlcy5sZW5ndGggID4gMCkge1xuICAgICAgdmFyIGdldEJpbGxUZXh0ID0gdGhpcy5wcm9wcy5nZXRCaWxsVGV4dDtcbiAgICAgIHZvdGVSb3dzID0gdGhpcy5wcm9wcy52b3Rlcy5tYXAoZnVuY3Rpb24gKG9iamVjdCwga2V5KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPFZvdGVSb3dcbiAgICAgICAgICAgIGtleSA9IHtrZXl9XG4gICAgICAgICAgICB2b3RlID0ge29iamVjdH1cbiAgICAgICAgICAgIGN1cnJlbnRWb3RlID0ge2N1cnJlbnRWb3RlfVxuICAgICAgICAgICAgb25DbGljayA9IHtnZXRCaWxsSW5mb31cbiAgICAgICAgICAgIGJpbGxJbmZvID0ge3RoaXMucHJvcHMuYmlsbEluZm99XG4gICAgICAgICAgICBnZXRQb2xpdGljaWFuID0ge3RoaXMucHJvcHMuZ2V0UG9saXRpY2lhbn0gLz5cbiAgICAgICAgKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5vUmVzdWx0c1JvdyA9IChcbiAgICAgICAgICA8ZGl2IGtleT17MH0gY2xhc3NOYW1lPVwidm90ZVJvdyByb3cgbm9yZXN1bHRzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haW4gcm93XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlclwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPjxzcGFuPm5vIHJlc3VsdHMgZm91bmQ8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlclwiPjwvZGl2PiBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgdm90ZVJvd3MucHVzaChub1Jlc3VsdHNSb3cpO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3ZvdGVzJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JpbGxTdGFjayc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBoZWFkZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIGxlZnRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc2Vzc2lvblwiPlNlc3Npb248L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbnVtYmVyXCI+TnVtYmVyPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHZvdGUgZnVsbC1sYXlvdXRcIj5Wb3RlPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNob3J0bmFtZVwiPk5hbWU8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgdm90ZSBtb2JpbGUtb25seVwiPlZvdGU8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbGF3XCI+TGF3PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGRyb3Bkb3duXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciByaWdodFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dm90ZVJvd3N9XG4gICAgICAgICAgICB7bG9hZGVyfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7ICAgICAgICBcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmlsbFN0YWNrOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIEJpbGxTdGFjayA9IHJlcXVpcmUoJy4vQmlsbFN0YWNrLmpzJyk7XG52YXIgQmlsbFNlYXJjaCA9IHJlcXVpcmUoJy4vQmlsbFNlYXJjaC5qcycpO1xudmFyIFB1cmVSZW5kZXJNaXhpbiA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1wdXJlLXJlbmRlci1taXhpbicpO1xudmFyIFByb2ZpbGVCb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNsYXNzZXMgPSAncHJvZmlsZUJveCAnICsgdGhpcy5wcm9wcy5ib3g7XG4gICAgdmFyIGNsb3NlQ2xhc3MgPSAnY2xvc2UgJyArIHRoaXMucHJvcHMuYm94O1xuICAgIGlmICh0aGlzLnByb3BzLnByb2ZpbGUpIHtcbiAgICAgIHZhciBwYXJ0eU5hbWUgPSB0aGlzLnByb3BzLmdldHRlcnNbMV0odGhpcy5wcm9wcy5wcm9maWxlLnBhcnRpZXNbMF0pO1xuICAgICAgdmFyIHJpZGluZ05hbWUgPSB0aGlzLnByb3BzLmdldHRlcnNbMl0odGhpcy5wcm9wcy5wcm9maWxlLnJpZGluZ3NbMF0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBwYXJ0eU5hbWUgPSAnJztcbiAgICAgIHZhciByaWRpbmdOYW1lID0gJyc7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZUhlYWRlclwiPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInJldHVyblwiIGhyZWY9XCIvIy9cIj48ZGl2IGNsYXNzTmFtZSA9XCJpY29uXCI+PC9kaXY+PHNwYW4+cmV0dXJuIHRvIE1QIHNlYXJjaDwvc3Bhbj48L2E+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPXtjbG9zZUNsYXNzfSBocmVmPVwiLyMvXCI+PC9hPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJuYW1lXCI+e3RoaXMucHJvcHMucHJvZmlsZS5uYW1lfTwvaDI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5mb1wiPjxoMyBjbGFzc05hbWU9XCJyaWRpbmdcIj57cmlkaW5nTmFtZX08L2gzPjxoMyBjbGFzc05hbWU9XCJwYXJ0eVwiPntwYXJ0eU5hbWV9PC9oMz48L3NwYW4+XG4gICAgICAgICAgPEJpbGxTZWFyY2ggb25CaWxsU2VhcmNoQ2hhbmdlPXt0aGlzLnByb3BzLm9uQmlsbFNlYXJjaENoYW5nZX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPEJpbGxTdGFjayBcbiAgICAgICAgdm90ZXM9e3RoaXMucHJvcHMudm90ZXN9XG4gICAgICAgIGdldEJpbGxJbmZvID0ge3RoaXMucHJvcHMuZ2V0QmlsbEluZm99XG4gICAgICAgIGN1cnJlbnRWb3RlID0ge3RoaXMucHJvcHMuY3VycmVudFZvdGV9XG4gICAgICAgIGJpbGxJbmZvID0ge3RoaXMucHJvcHMuYmlsbEluZm99XG4gICAgICAgIGdldFBvbGl0aWNpYW4gPSB7dGhpcy5wcm9wcy5nZXRQb2xpdGljaWFufSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2ZpbGVCb3g7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBWb3RlUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy52b3RlLnZvdGUgPT0gJ1knKSB7XG4gICAgICB2YXIgdm90ZUNsYXNzID0gJ3llcyAnO1xuICAgICAgdmFyIHZvdGVUZXh0ID0gJ3llcyc7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMucHJvcHMudm90ZS52b3RlID09ICdOJykge1xuICAgICAgdmFyIHZvdGVDbGFzcyA9ICdubyAnO1xuICAgICAgdmFyIHZvdGVUZXh0ID0gJ25vJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgdm90ZUNsYXNzID0gJyc7XG4gICAgICB2YXIgdm90ZVRleHQgPSAnbm8gdm90ZSc7XG4gICAgfVxuICAgIHZvdGVDbGFzcyArPSAndm90ZSBjb2wgJztcbiAgICB2YXIgbW9iaWxlVm90ZUNsYXNzID0gdm90ZUNsYXNzICsgJ21vYmlsZS1vbmx5JztcbiAgICB2b3RlQ2xhc3MgKz0gJ2Z1bGwtbGF5b3V0J1xuXG4gICAgdmFyIGxhd1RleHQgPSB0aGlzLnByb3BzLnZvdGUubGF3ID8gJ3llcycgOiAnbm8nO1xuICAgIHZhciBsYXdDbGFzcyA9ICdjb2wgbGF3ICcgKyBsYXdUZXh0O1xuXG4gICAgaWYgKHRoaXMucHJvcHMudm90ZS5zaG9ydF90aXRsZV9lbikge1xuICAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLnZvdGUuc2hvcnRfdGl0bGVfZW47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLnZvdGUubmFtZV9lbjtcbiAgICB9XG4gICAgdmFyIHZvdGVSb3dDbGFzcyA9IFwidm90ZVJvdyByb3dcIjtcbiAgICBpZiAodGhpcy5wcm9wcy52b3RlLnZvdGVxdWVzdGlvbl9pZCA9PSB0aGlzLnByb3BzLmN1cnJlbnRWb3RlLmlkKSB7XG4gICAgICB2b3RlUm93Q2xhc3MgKz0gXCIgY3VycmVudFwiO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3ZvdGVSb3dDbGFzc30ga2V5PXt0aGlzLnByb3BzLmtleX0+XG4gICAgICAgIDxkaXYgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrLmJpbmQobnVsbCwgdGhpcyl9IGNsYXNzTmFtZT1cIm1haW4gcm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIGxlZnRcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzZXNzaW9uXCI+PHNwYW4gY2xhc3NOYW1lPVwibGFiZWwgbW9iaWxlLW9ubHlcIj5TZXNzaW9uPC9zcGFuPnt0aGlzLnByb3BzLnZvdGUuc2Vzc2lvbl9pZH08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBudW1iZXJcIj48c3BhbiBjbGFzc05hbWU9XCJsYWJlbCBtb2JpbGUtb25seVwiPk51bWJlcjwvc3Bhbj57dGhpcy5wcm9wcy52b3RlLm51bWJlcn08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dm90ZUNsYXNzfT48c3BhbiBjbGFzc05hbWU9XCJ2b3RlVGV4dFwiPnt2b3RlVGV4dH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc2hvcnRuYW1lXCI+e25hbWV9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e21vYmlsZVZvdGVDbGFzc30+PHNwYW4gY2xhc3NOYW1lPVwibGFiZWwgbW9iaWxlLW9ubHlcIj5Wb3RlPC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cInZvdGVUZXh0XCI+e3ZvdGVUZXh0fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17bGF3Q2xhc3N9PjxzcGFuIGNsYXNzTmFtZT1cImxhYmVsIG1vYmlsZS1vbmx5XCI+TGF3PC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cImxhd1RleHRcIj57bGF3VGV4dH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgZHJvcGRvd25cIj48c3Bhbj48QXJyb3dJY29uIC8+PC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciByaWdodFwiPjwvZGl2PiBcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxWb3RlSW5mb1JvdyBcbiAgICAgICAgICB2b3RlID0ge3RoaXMucHJvcHMudm90ZX1cbiAgICAgICAgICBjdXJyZW50Vm90ZSA9IHt0aGlzLnByb3BzLmN1cnJlbnRWb3RlfVxuICAgICAgICAgIHZvdGVRdWVzdGlvbklEID0ge3RoaXMucHJvcHMudm90ZS52b3RlcXVlc3Rpb25faWR9XG4gICAgICAgICAgYmlsbEluZm8gPSB7dGhpcy5wcm9wcy5iaWxsSW5mb31cbiAgICAgICAgICBnZXRQb2xpdGljaWFuID0ge3RoaXMucHJvcHMuZ2V0UG9saXRpY2lhbn0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xudmFyIFZvdGVJbmZvUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbmZvQ2xhc3MgPSBcInJvdyBpbmZvXCI7XG4gICAgdmFyIGdldFBvbGl0aWNpYW4gPSB0aGlzLnByb3BzLmdldFBvbGl0aWNpYW47XG4gICAgdmFyIHNwb25zb3JDb21wb25lbnQgPSBudWxsO1xuICAgIGlmICh0aGlzLnByb3BzLnZvdGVRdWVzdGlvbklEID09IHRoaXMucHJvcHMuY3VycmVudFZvdGUuaWQpIHtcbiAgICAgIGluZm9DbGFzcyArPSAnIGN1cnJlbnQnO1xuICAgICAgdmFyIGxhd1N0cmluZyA9ICAnTGF3OiAnICsgdGhpcy5wcm9wcy5sYXdUZXh0O1xuICAgICAgdmFyIHZvdGVJbmZvcm1hdGlvbiA9IDxkaXYgY2xhc3NOYW1lPVwiY29sIGJpbGxJbmZvXCI+e2xhd1N0cmluZ308L2Rpdj5cbiAgICAgIGlmICh1bmRlZmluZWQgIT0gdGhpcy5wcm9wcy5iaWxsSW5mbykge1xuICAgICAgICB2YXIgcGFydHlWb3RlTm9kZXMgPSBbXTtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgbm9kZSA9IChcbiAgICAgICAgICA8ZGl2IGtleT17MH0gY2xhc3NOYW1lPVwicGFydHlWb3RlSGVhZGVyXCIga2V5PXtpfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPlBhcnR5PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInllc1wiPllFUzwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub1wiPk5PPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic3RhaW5cIj5BQlNUQUlOPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICAgIHBhcnR5Vm90ZU5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIHllc0NvdW50ID0gMDtcbiAgICAgICAgbm9Db3VudCA9IDA7XG4gICAgICAgIGFic3RhaW5Db3VudCA9IDA7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnByb3BzLmJpbGxJbmZvKSB7XG4gICAgICAgICAgaSsrO1xuICAgICAgICAgIHZhciBwYXJ0eU5hbWUgPSBrZXk7XG4gICAgICAgICAgdmFyIHllcyA9IHRoaXMucHJvcHMuYmlsbEluZm9ba2V5XVsnWSddO1xuICAgICAgICAgIHZhciBubyA9IHRoaXMucHJvcHMuYmlsbEluZm9ba2V5XVsnTiddO1xuICAgICAgICAgIHZhciBhYnN0YWluID0gdGhpcy5wcm9wcy5iaWxsSW5mb1trZXldWydBJ107XG4gICAgICAgICAgdmFyIG5vQ2xhc3MgPSBcIm5vXCI7XG4gICAgICAgICAgdmFyIHllc0NsYXNzID0gXCJ5ZXNcIjtcbiAgICAgICAgICB2YXIgYWJzdGFpbkNsYXNzID0gXCJhYnN0YWluXCI7XG4gICAgICAgICAgdmFyIHBhcnR5Q2xhc3MgPSBcInBhcnR5Vm90ZVwiO1xuICAgICAgICAgIGlmICgoeWVzID4gYWJzdGFpbikmJih5ZXMgPiBubykpIHtcbiAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgeWVzXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKChubyA+IGFic3RhaW4pICYmIChubyA+IHllcykpIHtcbiAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgbm9cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoKGFic3RhaW4gPiB5ZXMpICYmIChhYnN0YWluID4gbm8pKSB7XG4gICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIGFic3RhaW5cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoKHllcyA9PSBubykpIHtcbiAgICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiB0aWUgeW5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHllcz09YWJzdGFpbikge1xuICAgICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIHRpZSB5YVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobm89PWFic3RhaW4pIHtcbiAgICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiB0aWUgbmFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIHRpZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB5ZXNDb3VudCArPSB5ZXM7XG4gICAgICAgICAgbm9Db3VudCArPSBubztcbiAgICAgICAgICBhYnN0YWluQ291bnQgKz0gYWJzdGFpbjtcbiAgICAgICAgICB2YXIgbm9kZSA9IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtwYXJ0eUNsYXNzfSBrZXk9e2l9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj57cGFydHlOYW1lfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17eWVzQ2xhc3N9PjxzcGFuPnt5ZXN9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17bm9DbGFzc30+PHNwYW4+e25vfTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Fic3RhaW5DbGFzc30+PHNwYW4+e2Fic3RhaW59PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgICBwYXJ0eVZvdGVOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0b3RhbENsYXNzID0gXCJwYXJ0eVZvdGUgdG90YWwgXCI7XG4gICAgICAgIGlmICh5ZXNDb3VudCA+IG5vQ291bnQpIHtcbiAgICAgICAgICBpZiAoeWVzQ291bnQgPiBhYnN0YWluQ291bnQpIHtcbiAgICAgICAgICAgIHRvdGFsQ2xhc3MgKz0gXCIgeWVzXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG90YWxDbGFzcyArPSBcIiBhYnN0YWluXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChub0NvdW50ID4gYWJzdGFpbkNvdW50KSB7XG4gICAgICAgICAgICB0b3RhbENsYXNzICs9IFwiIG5vXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG90YWxDbGFzcyArPSBcIiBhYnN0YWluXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB0b3RhbFJvdyA9IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcnR5Vm90ZSB0b3RhbFwiIGtleT1cInRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPlRvdGFsPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInllc1wiPjxzcGFuPnt5ZXNDb3VudH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vXCI+PHNwYW4+e25vQ291bnR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnN0YWluXCI+PHNwYW4+e2Fic3RhaW5Db3VudH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICAgIHBhcnR5Vm90ZU5vZGVzLnB1c2godG90YWxSb3cpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5iaWxsSW5mby5zcG9uc29yKSB7XG4gICAgICAgICAgdmFyIHNwb25zb3JQcm9maWxlID0gZ2V0UG9saXRpY2lhbih1bmRlZmluZWQsIHRoaXMucHJvcHMuYmlsbEluZm8uc3BvbnNvcik7XG4gICAgICAgICAgdmFyIGltZ1VSTCA9IFwidXJsKCcvc3RhdGljL2hlYWRzaG90cy9cIiArIHNwb25zb3JQcm9maWxlLmltZ3VybCArIFwiJylcIjtcbiAgICAgICAgICB2YXIgc3BvbnNvckNsYXNzU3RyaW5nID0gJ3Nwb25zb3JQcm9maWxlICc7XG4gICAgICAgICAgdmFyIGhyZWYgPSAnLyMvcHJvZmlsZS8nICsgc3BvbnNvclByb2ZpbGUuaWQ7XG4gICAgICAgICAgaWYgKCFzcG9uc29yUHJvZmlsZS5wYXJ0eV9zbHVnKSB7XG4gICAgICAgICAgICB2YXIgcGFydHlOYW1lID0gc3BvbnNvclByb2ZpbGUucGFydHlfbmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzcG9uc29yQ2xhc3NTdHJpbmcgKz0gc3BvbnNvclByb2ZpbGUucGFydHlfc2x1ZztcbiAgICAgICAgICAgIHZhciBwYXJ0eU5hbWUgPSBzcG9uc29yUHJvZmlsZS5wYXJ0eV9zbHVnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzcG9uc29yQ29tcG9uZW50ID0gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BvbnNvclwiPlxuICAgICAgICAgICAgICA8aDQ+QmlsbCBTcG9uc29yPC9oND5cbiAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtzcG9uc29yQ2xhc3NTdHJpbmd9IGhyZWY9e2hyZWZ9ID5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7YmFja2dyb3VuZEltYWdlOiBpbWdVUkx9fT48L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDM+e3Nwb25zb3JQcm9maWxlLm5hbWV9PC9oMz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyaWRpbmdcIj57c3BvbnNvclByb2ZpbGUucmlkaW5nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwYXJ0eVwiPntwYXJ0eU5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwb25zb3JDb21wb25lbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIHBhcnR5Vm90ZU5vZGVzID0gJyc7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHBhcnR5Vm90ZU5vZGVzID0gJyc7XG4gICAgfVxuICAgIHZhciBvcGVucGFybGlhbWVudFVSTCA9IFwiLy9vcGVucGFybGlhbWVudC5jYS9iaWxscy9cIiArIHRoaXMucHJvcHMudm90ZS5zZXNzaW9uX2lkICsgXCIvXCIgKyB0aGlzLnByb3BzLnZvdGUubnVtYmVyICsgXCIvXCI7XG4gICAgc2Vzc2lvbk51bWJlcnMgPSB0aGlzLnByb3BzLnZvdGUuc2Vzc2lvbl9pZC5zcGxpdChcIi1cIik7XG4gICAgdmFyIHBhcmxVUkwgPSBcImh0dHA6Ly93d3cucGFybC5nYy5jYS9MRUdJU0luZm8vTEFBRy5hc3B4P2xhbmd1YWdlPUUmUGFybD1cIiArIHNlc3Npb25OdW1iZXJzWzBdICsgXCImU2VzPVwiICsgc2Vzc2lvbk51bWJlcnNbMV07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtpbmZvQ2xhc3N9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciBsZWZ0XCI+PC9kaXY+XG4gICAgICAgICAge3Nwb25zb3JDb21wb25lbnR9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgcGFydHlWb3Rlc1wiPlxuICAgICAgICAgICAgPGg0PlBhcnR5IFZvdGVzPC9oND5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydHlWb3Rlc1RhYmxlXCI+XG4gICAgICAgICAgICAgIHtwYXJ0eVZvdGVOb2Rlc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIG1vcmVCaWxsSW5mb1wiPlxuICAgICAgICAgIDxoND5Nb3JlIEluZm9ybWF0aW9uPC9oND5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGEgaHJlZj17b3BlbnBhcmxpYW1lbnRVUkx9IHRhcmdldD1cIl9ibGFua1wiPnZpZXcgYmlsbCBvbiBvcGVucGFybGlhbWVudC5jYSA8QXJyb3dJY29uIC8+PC9hPlxuICAgICAgICAgICAgPGEgaHJlZj17cGFybFVSTH0gdGFyZ2V0PVwiX2JsYW5rXCI+dmlldyBzZXNzaW9uIG9uIHBhcmwuZ2MuY2EgPEFycm93SWNvbiAvPjwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgcmlnaHRcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xudmFyIEFycm93SWNvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuICAgICAgICAgdmlld0JveD1cIjAgMCA0MDAgNDAwXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTYzLjUsMzM0LjVsLTQ3LjEtNDcuMWw4Ny41LTg3LjVsLTg3LjUtODcuNWw0Ny4xLTQ3LjFMMjk4LDIwMEwxNjMuNSwzMzQuNXpcIi8+XG4gICAgICA8L3N2Zz5cbiAgICApO1xuICB9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFZvdGVSb3c7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgUHVyZVJlbmRlck1peGluID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXB1cmUtcmVuZGVyLW1peGluJyk7XG52YXIgU2VhcmNoU3RhY2sgPSByZXF1aXJlKCcuL1NlYXJjaFN0YWNrLmpzJyk7XG52YXIgU2Vzc2lvblNlbGVjdG9yID0gcmVxdWlyZSgnLi9TZXNzaW9uU2VsZWN0b3IuanMnKTtcblNlYXJjaEJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgbWl4aW5zOiBbUHVyZVJlbmRlck1peGluXSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICdzZWFyY2hCb3ggJyArIHRoaXMucHJvcHMuYm94OyAvL3RlbXBcbiAgICB2YXIgbm9zY3JvbGxDbGFzc2VzID0gJ3NlYXJjaEJveC1ub3Njcm9sbCAnICsgdGhpcy5wcm9wcy5ib3g7IC8vdGVtcFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17bm9zY3JvbGxDbGFzc2VzfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9IG9uU2Nyb2xsPXt0aGlzLnByb3BzLm9uU2VhcmNoU2Nyb2xsLmJpbmQobnVsbCwgdGhpcyl9ID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcExpbmtzXCI+PGEgaHJlZj1cIi8jL2luZm9cIiBjbGFzc05hbWU9XCJpbmZvXCI+PC9hPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vc2hheXFuL3BhcmxlXCIgY2xhc3NOYW1lPVwiZ2l0aHViXCI+PC9hPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoRm9ybVwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaC4uLlwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uU2VhcmNoQ2hhbmdlfSAvPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2VhcmNoPC9idXR0b24+XG4gICAgICAgICAgICA8c3Bhbj5ieSBuYW1lLCByaWRpbmcsIG9yIHBvc3RhbCBjb2RlPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoQ29udGVudFwiPlxuICAgICAgICAgICAgPFNlYXJjaFN0YWNrIFxuICAgICAgICAgICAgICBib3g9e3RoaXMucHJvcHMuYm94fSBcbiAgICAgICAgICAgICAgcG9saXRpY2lhbnM9e3RoaXMucHJvcHMucG9saXRpY2lhbkxpc3R9IFxuICAgICAgICAgICAgICBjdXJyZW50UHJvZmlsZUlEPXt0aGlzLnByb3BzLmN1cnJlbnRQcm9maWxlSUR9IFxuICAgICAgICAgICAgICBzZWFyY2hpbmc9e3RoaXMucHJvcHMuc2VhcmNoLmlzU2VhcmNoaW5nfVxuICAgICAgICAgICAgICBzZXNzaW9uc0xpc3Q9e3RoaXMucHJvcHMuc2Vzc2lvbnNMaXN0fVxuICAgICAgICAgICAgICBjdXJyZW50U2Vzc2lvbnM9e3RoaXMucHJvcHMuc2Vzc2lvbnN9XG4gICAgICAgICAgICAgIHNlc3Npb25Ub2dnbGUgPSB7dGhpcy5wcm9wcy5zZXNzaW9uVG9nZ2xlfVxuICAgICAgICAgICAgICBleHBhbmRTZXNzaW9ucyA9IHt0aGlzLnByb3BzLmV4cGFuZFNlc3Npb25zfVxuICAgICAgICAgICAgICBleHBhbmRTdGF0ZSA9IHt0aGlzLnByb3BzLmV4cGFuZFN0YXRlfVxuICAgICAgICAgICAgICBnZXR0ZXJzID0ge3RoaXMucHJvcHMuZ2V0dGVyc30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gU2VhcmNoQm94OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG5cbnZhciBQdXJlUmVuZGVyTWl4aW4gPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtcHVyZS1yZW5kZXItbWl4aW4nKTtcbnZhciBTZWFyY2hTdGFjayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTZWFyY2hTdGFja1wiLFxuICBtaXhpbnM6IFtQdXJlUmVuZGVyTWl4aW5dLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzU3RyaW5nID0gXCJzZWFyY2hTdGFja1wiO1xuICAgIHZhciBjdXJyZW50UHJvZmlsZUlEID0gdGhpcy5wcm9wcy5jdXJyZW50UHJvZmlsZUlEO1xuICAgIHZhciBwb2xpdGljaWFuTm9kZXMgPSBbXTtcbiAgICB2YXIgZ2V0UG9saXRpY2lhbkJ5SUQgPSB0aGlzLnByb3BzLmdldHRlcnNbMF07XG4gICAgdmFyIGdldFBhcnR5QnlJRCA9IHRoaXMucHJvcHMuZ2V0dGVyc1sxXTtcbiAgICB2YXIgZ2V0UmlkaW5nQnlJRCA9IHRoaXMucHJvcHMuZ2V0dGVyc1syXTtcbiAgICBpZiAodGhpcy5wcm9wcy5wb2xpdGljaWFucy5sZW5ndGggPiAwKSB7XG4gICAgICBwb2xpdGljaWFuTm9kZXMgPSB0aGlzLnByb3BzLnBvbGl0aWNpYW5zLm1hcChmdW5jdGlvbiAocG9saXRpY2lhbiwga2V5KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPFBvbGl0aWNpYW5SZXN1bHRcbiAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgcG9saXRpY2lhbj17cG9saXRpY2lhbn1cbiAgICAgICAgICAgIGN1cnJlbnRQcm9maWxlSUQ9e2N1cnJlbnRQcm9maWxlSUR9XG4gICAgICAgICAgICBnZXR0ZXJzPXt0aGlzLnByb3BzLmdldHRlcnN9XG4gICAgICAgICAgICBib3g9e3RoaXMucHJvcHMuYm94fSAvPlxuICAgICAgICApO1xuICAgICAgfS5iaW5kKHRoaXMpKTsgIFxuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnByb3BzLnNlYXJjaGluZykge1xuICAgICAgdmFyIG5vUmVzdWx0c05vZGUgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCBudWxsLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgbnVsbCwgXCJOTyBSRVNVTFRTXCIpKTtcbiAgICAgIHBvbGl0aWNpYW5Ob2Rlcy5wdXNoKG5vUmVzdWx0c05vZGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBwbGFjZUhvbGRlck5hbWVzID0gWydKb2huIEEuIE1jVGVtcCcsICdKb2huIEZha2VuYmFrZXInLCAnUGllcnJlIFRlbXBkZWF1J107XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgMTE7IGkrKykge1xuICAgICAgICB2YXIgZW1wdHlOb2RlID0gUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwge2tleTogaSwgY2xhc3NOYW1lOiBcInBsYWNlaG9sZGVyXCIsIGhyZWY6IFwiLyMvXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgbnVsbCwgcGxhY2VIb2xkZXJOYW1lc1tpJTNdKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJwYXJ0eVwifSwgXCJWQU5cIikpO1xuICAgICAgICBwb2xpdGljaWFuTm9kZXMucHVzaChlbXB0eU5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzU3RyaW5nfT5cbiAgICAgICAgPFNlc3Npb25TZWxlY3RvciBcbiAgICAgICAgIHNlc3Npb25zTGlzdD17dGhpcy5wcm9wcy5zZXNzaW9uc0xpc3R9XG4gICAgICAgICBjdXJyZW50U2Vzc2lvbnM9e3RoaXMucHJvcHMuY3VycmVudFNlc3Npb25zfVxuICAgICAgICAgc2Vzc2lvblRvZ2dsZSA9IHt0aGlzLnByb3BzLnNlc3Npb25Ub2dnbGV9XG4gICAgICAgICBleHBhbmRTZXNzaW9ucyA9IHt0aGlzLnByb3BzLmV4cGFuZFNlc3Npb25zfVxuICAgICAgICAgIGV4cGFuZFN0YXRlID0ge3RoaXMucHJvcHMuZXhwYW5kU3RhdGV9IC8+XG4gICAgICAgIDxoMj5NZW1iZXJzIG9mIFBhcmxpYW1lbnQ8c3BhbiBjbGFzc05hbWU9XCJsZWFmXCI+PC9zcGFuPjwvaDI+XG4gICAgICAgIHtwb2xpdGljaWFuTm9kZXN9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxudmFyIFBvbGl0aWNpYW5SZXN1bHQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGdldFBhcnR5QnlJRCA9IHRoaXMucHJvcHMuZ2V0dGVyc1sxXTtcbiAgICB2YXIgcG9saXRpY2lhbiA9IHRoaXMucHJvcHMucG9saXRpY2lhbjtcbiAgICB2YXIgaGVhZHNob3QgPSBwb2xpdGljaWFuLmhlYWRzaG90LnNwbGl0KCcvJykucG9wKCk7XG4gICAgdmFyIGltZ1VSTCA9IFwidXJsKCcvc3RhdGljL2hlYWRzaG90cy9cIiArIGhlYWRzaG90ICsgXCInKVwiO1xuICAgIHZhciBjbGFzc1N0cmluZyA9ICcnO1xuICAgIGlmIChwb2xpdGljaWFuLmlkID09IHRoaXMucHJvcHMuY3VycmVudFByb2ZpbGVJRCkge1xuICAgICAgY2xhc3NTdHJpbmcgKz0gJ2FjdGl2ZSAnO1xuICAgIH1cbiAgICBpZiAoKHBvbGl0aWNpYW4uaWQgPT0gdGhpcy5wcm9wcy5jdXJyZW50UHJvZmlsZUlEKSYmKHRoaXMucHJvcHMuYm94ID09ICdwcm9maWxlJykpIHtcbiAgICAgIHZhciBocmVmID0gJy8jLyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIGhyZWYgPSAnLyMvcHJvZmlsZS8nICsgcG9saXRpY2lhbi5pZDtcbiAgICB9XG4gICAgdmFyIHBhcnR5TmFtZSA9IGdldFBhcnR5QnlJRChwb2xpdGljaWFuLnBhcnRpZXNbMF0pO1xuICAgIGlmIChwb2xpdGljaWFuLm5hbWUubGVuZ3RoPjE5KSB7XG4gICAgICBpZiAocG9saXRpY2lhbi5uYW1lLmxlbmd0aCA+IDIyKSB7XG4gICAgICAgIGNsYXNzU3RyaW5nICs9ICcgcmVkdWNlLWxhcmdlJ1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNsYXNzU3RyaW5nICs9ICcgcmVkdWNlLW1lZGl1bSc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8YSBjbGFzc05hbWU9e2NsYXNzU3RyaW5nfSBocmVmPXtocmVmfSBrZXk9e3RoaXMucHJvcHMua2V5fSA+XG4gICAgICAgIDxkaXYgc3R5bGU9e3tiYWNrZ3JvdW5kSW1hZ2U6IGltZ1VSTH19PjwvZGl2PlxuICAgICAgICA8aDM+e3BvbGl0aWNpYW4ubmFtZX08L2gzPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwYXJ0eVwiPntwYXJ0eU5hbWV9PC9zcGFuPlxuICAgICAgPC9hPlxuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VhcmNoU3RhY2s7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cblNlc3Npb25CdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNsYXNzTmFtZSA9IFwic2Vzc2lvbkJ1dHRvblwiO1xuXHRcdHZhciBzZXNzaW9uTnVtYmVyID0gdGhpcy5wcm9wcy5zZXNzaW9uTnVtYmVyO1xuXHRcdGZvciAoaT0wO2k8dGhpcy5wcm9wcy5jdXJyZW50U2Vzc2lvbnMubGVuZ3RoO2krKykge1xuXHRcdFx0aWYgKHNlc3Npb25OdW1iZXIgPT0gdGhpcy5wcm9wcy5jdXJyZW50U2Vzc2lvbnNbaV0pIHtcblx0XHRcdFx0Y2xhc3NOYW1lICs9IFwiIGFjdGl2ZVwiO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGEgb25DbGljaz17dGhpcy5wcm9wcy5zZXNzaW9uVG9nZ2xlLmJpbmQobnVsbCwgc2Vzc2lvbk51bWJlcil9PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBrZXk9e3RoaXMucHJvcHMua2V5fT5cblx0XHRcdFx0XHR7c2Vzc2lvbk51bWJlcn1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2E+XG5cdFx0KTtcblx0fVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFNlc3Npb25CdXR0b247IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBTZXNzaW9uQnV0dG9uID0gcmVxdWlyZSgnLi9TZXNzaW9uQnV0dG9uLmpzJyk7XG5TZXNzaW9uU2VsZWN0b3IgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlc3Npb25zTGlzdCA9IHRoaXMucHJvcHMuc2Vzc2lvbnNMaXN0O1xuXHRcdHZhciBjdXJyZW50U2Vzc2lvbnMgPSB0aGlzLnByb3BzLmN1cnJlbnRTZXNzaW9ucztcblx0XHR2YXIgc2Vzc2lvbkJ1dHRvbnMgPSBbXTtcblx0XHR2YXIgc2Vzc2lvblRvZ2dsZSA9IHRoaXMucHJvcHMuc2Vzc2lvblRvZ2dsZTtcblx0XHR2YXIga2V5ID0gMDtcblx0XHRmb3IodmFyIHNlc3Npb25OdW1iZXIgaW4gc2Vzc2lvbnNMaXN0KSB7XG5cdFx0XHR2YXIgc2Vzc2lvbiA9IDxTZXNzaW9uQnV0dG9uIHNlc3Npb25OdW1iZXI9e3Nlc3Npb25OdW1iZXJ9XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRTZXNzaW9ucz17Y3VycmVudFNlc3Npb25zfVxuXHRcdFx0XHRcdFx0XHRzZXNzaW9uVG9nZ2xlPXtzZXNzaW9uVG9nZ2xlfSBcblx0XHRcdFx0XHRcdFx0a2V5PXtrZXl9IC8+XG5cdFx0XHRzZXNzaW9uQnV0dG9ucy5wdXNoKHNlc3Npb24pO1xuXHRcdFx0a2V5Kys7XG5cdFx0fVxuXHRcdHZhciBjbGFzc05hbWUgPSBcInNlc3Npb25zU2VsZWN0b3IgXCIgKyB0aGlzLnByb3BzLmV4cGFuZFN0YXRlO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cblx0XHRcdFx0PGgyPlNlc3Npb25zPC9oMj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+e3Nlc3Npb25CdXR0b25zLnJldmVyc2UoKX08L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJleHBhbmRTZXNzaW9uc1wiIG9uQ2xpY2s9e3RoaXMucHJvcHMuZXhwYW5kU2Vzc2lvbnN9PjwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFNlc3Npb25TZWxlY3RvcjsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEJpbGxUZXh0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBwcmVwVGV4dDogZnVuY3Rpb24odGV4dCkge1xuICAgIHRleHQgPSB0ZXh0LnRyaW0oKTtcbiAgICByZXR1cm4gKHRleHQubGVuZ3RoPjA/JzxwPicrdGV4dC5yZXBsYWNlKC9bXFxyXFxuXSsvLCc8L3A+PHA+JykrJzwvcD4nOm51bGwpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYmlsbFRleHQgPSB0aGlzLnByZXBUZXh0KHRoaXMucHJvcHMuYmlsbFRleHQpO1xuICAgIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiaWxsVGV4dFwiPlxuICAgICAge2JpbGxUZXh0fVxuICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbGxUZXh0OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgQmlsbFRleHQgPSByZXF1aXJlKCcuL0JpbGxUZXh0LmpzJyk7XG52YXIgVGV4dEJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICdiaWxsVGV4dEJveCAnICsgdGhpcy5wcm9wcy5ib3g7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT48ZGl2IGNsYXNzTmFtZT1cImNsb3NlQ29udGFpbmVyXCI+PGEgaHJlZj1cIi8jL1wiPjwvYT48L2Rpdj48QmlsbFRleHQgYmlsbFRleHQ9e3RoaXMucHJvcHMuYmlsbFRleHR9IC8+PC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dEJveDsiLCJ2YXIgQXJyb3dJY29uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c3ZnIHZlcnNpb249XCIxLjFcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG4gICAgICAgICB2aWV3Qm94PVwiMCAwIDQwMCA0MDBcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xNjMuNSwzMzQuNWwtNDcuMS00Ny4xbDg3LjUtODcuNWwtODcuNS04Ny41bDQ3LjEtNDcuMUwyOTgsMjAwTDE2My41LDMzNC41elwiLz5cbiAgICAgIDwvc3ZnPlxuICAgICk7XG4gIH1cbn0pOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG5pZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJykgeyAvLyBmYWlsIGdyYWNlZnVsbHlcbiAgdHJhY2tlciA9IGdhLmNyZWF0ZSgnVUEtNjc4MDQ0NTEtMScsICd2b3Rlcy5tcCcpO1xufVxuZnVuY3Rpb24gZ2FUcmFjayhwYXRoLCB0aXRsZSkge1xuICBpZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJykgeyAvLyBmYWlsIGdyYWNlZnVsbHlcbiAgICBpZiAocGF0aD09XCJcIikge1xuICAgICAgcGF0aCA9IFwiL1wiO1xuICAgIH1cbiAgICBnYSgnc2V0JywgeyBwYWdlOiBwYXRoLCB0aXRsZTogdGl0bGUgfSk7XG4gICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcbiAgfVxufVxuXG4vL01peGluc1xuXG4vLyBFbGVtZW50c1xudmFyIEFycm93SWNvbiA9IHJlcXVpcmUoJy4vZWxlbWVudHMvQXJyb3dJY29uLmpzJyk7XG5cbi8vIEJveGVzXG52YXIgU2VhcmNoQm94ID0gcmVxdWlyZSgnLi9ib3hlcy9zZWFyY2gvU2VhcmNoQm94LmpzJyk7XG52YXIgUHJvZmlsZUJveCA9IHJlcXVpcmUoJy4vYm94ZXMvcHJvZmlsZS9Qcm9maWxlQm94LmpzJyk7XG52YXIgSW5mb0JveCA9IHJlcXVpcmUoJy4vYm94ZXMvaW5mby9JbmZvQm94LmpzJyk7XG52YXIgVGV4dEJveCA9IHJlcXVpcmUoJy4vYm94ZXMvdGV4dC9UZXh0Qm94LmpzJyk7XG5cblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAvLyAqKioqU1RBVEUgRlVOQ1RJT05TKioqKiAvL1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcHBTdGF0ZSA9IHRoaXMuZ2V0QXBwU3RhdGUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgYXBwOiBhcHBTdGF0ZSxcbiAgICB9O1xuICB9LFxuXG4gIGdldEFwcFN0YXRlOiBmdW5jdGlvbihwcmV2QXBwU3RhdGUpIHtcbiAgICAvLyBkZWZhdWx0IHN0YXRlIG9uIGluaXRpYXRpb25cbiAgICB2YXIgZGVmYXVsdEFwcFN0YXRlID0geyBcbiAgICAgIGJveDogJ3NlYXJjaCcsXG4gICAgICBwb2xpdGljaWFuTGlzdDogW10sXG4gICAgICBwYXJ0aWVzTGlzdDoge30sXG4gICAgICByaWRpbmdzTGlzdDoge30sXG4gICAgICBzZXNzaW9uc0xpc3Q6IHt9LFxuICAgICAgc2Vzc2lvbnM6IFsnNDEtMicsICc0MS0xJ10sXG4gICAgICBleHBhbmRTdGF0ZTogdHJ1ZSxcbiAgICAgIHNlYXJjaDoge1xuICAgICAgICBtYXg6IDEwLFxuICAgICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICAgIGlzU2VhcmNoaW5nOiBmYWxzZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6ICcnLFxuICAgICAgICByaWRpbmc6ICcnLFxuICAgICAgfSxcbiAgICAgIHByb2ZpbGU6IHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHZvdGVzOiB7fSxcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB2b3RlOiB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgc3BvbnNvcjogMCxcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6ICcnLFxuICAgICAgfSxcbiAgICAgIGJpbGw6IHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIGRhdGE6IHt9LFxuICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgfVxuICAgIH07XG4gICAgaWYgKHR5cGVvZihwcmV2QXBwU3RhdGUpPT09J3VuZGVmaW5lZCcpIHByZXZBcHBTdGF0ZSA9IGRlZmF1bHRBcHBTdGF0ZTtcbiAgICAvLyBlZGl0IHN0YXRlIGFjY29yZGluZyB0byBVUkwgdmFsdWVzXG4gICAgdmFyIHVybEhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSk7XG4gICAgdmFyIG5ld0FwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHByZXZBcHBTdGF0ZSk7XG4gICAgdmFyIHVybFBhcmFtZXRlcnMgPSB1cmxIYXNoLnNwbGl0KCcvJykuZmlsdGVyKGZ1bmN0aW9uKG4peyByZXR1cm4gbiAhPSAnJyB9KTtcbiAgICBuZXdBcHBTdGF0ZS5ib3ggPSAnc2VhcmNoJztcbiAgICAvLyBpZiBwcm9maWxlIG9yIGJpbGxcbiAgICBpZiAodXJsUGFyYW1ldGVycy5sZW5ndGggPj0gMikge1xuICAgICAgaWYgKCh1cmxQYXJhbWV0ZXJzWzBdID09ICdwcm9maWxlJykgJiYgIWlzTmFOKHVybFBhcmFtZXRlcnNbMV0pKSB7XG4gICAgICAgIG5ld0FwcFN0YXRlLmJveCA9ICdwcm9maWxlJztcbiAgICAgICAgbmV3QXBwU3RhdGUucHJvZmlsZS5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICBuZXdBcHBTdGF0ZS5wcm9maWxlLmlkID0gdXJsUGFyYW1ldGVyc1sxXTtcbiAgICAgICAgbmV3QXBwU3RhdGUucHJvZmlsZS52b3RlcyA9IFtdO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoKHVybFBhcmFtZXRlcnNbMF0gPT0gJ2JpbGwnKSAmJiAhaXNOYU4odXJsUGFyYW1ldGVyc1sxXSkpIHtcbiAgICAgICAgbmV3QXBwU3RhdGUuYm94ID0gJ2JpbGwnO1xuICAgICAgICBuZXdBcHBTdGF0ZS5iaWxsLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIG5ld0FwcFN0YXRlLmJpbGwuaWQgPSB1cmxQYXJhbWV0ZXJzWzFdO1xuICAgICAgICBuZXdBcHBTdGF0ZS5iaWxsLmRhdGEgPSB7fTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYgcHJvZmlsZSBhbmQgdm90ZSBzcGVjaWZpZWRcbiAgICBpZiAodXJsUGFyYW1ldGVycy5sZW5ndGggPj0gNCkge1xuICAgICAgaWYgKCh1cmxQYXJhbWV0ZXJzWzJdID09ICd2b3RlJykgJiYgIWlzTmFOKHVybFBhcmFtZXRlcnNbM10pKSB7XG4gICAgICAgIG5ld0FwcFN0YXRlLnZvdGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgbmV3QXBwU3RhdGUudm90ZS5pZCA9IHVybFBhcmFtZXRlcnNbM107XG4gICAgICAgIG5ld0FwcFN0YXRlLnZvdGUuZGF0YSA9IHt9O1xuICAgICAgICBuZXdBcHBTdGF0ZS52b3RlLnNwb25zb3IgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3QXBwU3RhdGU7XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZ2V0SW5pdGlhbERhdGEoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5hcHAucHJvZmlsZS5pZCkge1xuICAgICAgdGhpcy5nZXRQb2xpdGljaWFuVm90ZXModGhpcy5zdGF0ZS5hcHAucHJvZmlsZS5pZCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN0YXRlLmFwcC52b3RlLmlkKSB7XG4gICAgICB0aGlzLmdldFZvdGVJbmZvcm1hdGlvbih0aGlzLnN0YXRlLmFwcC52b3RlLmlkKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgY3VycmVudEFwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHRoaXMuc3RhdGUuYXBwKTtcbiAgICAgIHRoaXMudXBkYXRlQXBwU3RhdGUoY3VycmVudEFwcFN0YXRlKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9LFxuXG4gIGNsb25lQXBwU3RhdGU6IGZ1bmN0aW9uKGFwcFN0YXRlKSB7XG4gICAgcmV0dXJuIChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFwcFN0YXRlKSkpO1xuICB9LFxuXG4gIHVwZGF0ZUFwcFN0YXRlOiBmdW5jdGlvbihjdXJyZW50QXBwU3RhdGUpIHtcbiAgICB2YXIgbmV4dEFwcFN0YXRlID0gdGhpcy5nZXRBcHBTdGF0ZShjdXJyZW50QXBwU3RhdGUpO1xuICAgIGlmIChuZXh0QXBwU3RhdGUucHJvZmlsZS5pZCAmJiAobmV4dEFwcFN0YXRlLnByb2ZpbGUuaWQgIT0gY3VycmVudEFwcFN0YXRlLnByb2ZpbGUuaWQpKSB7XG4gICAgICB0aGlzLmdldFBvbGl0aWNpYW5Wb3RlcyhuZXh0QXBwU3RhdGUucHJvZmlsZS5pZCk7XG4gICAgfVxuICAgIGlmIChuZXh0QXBwU3RhdGUudm90ZS5pZCAmJiAobmV4dEFwcFN0YXRlLnZvdGUuaWQgIT0gY3VycmVudEFwcFN0YXRlLnZvdGUuaWQpKSB7XG4gICAgICB0aGlzLmdldFZvdGVJbmZvcm1hdGlvbihuZXh0QXBwU3RhdGUudm90ZS5pZCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe2FwcDogbmV4dEFwcFN0YXRlfSk7XG4gIH0sXG5cbiAgLy8gKioqKkRBVEEgQ09MTEVDVElPTiBGVU5DVElPTlMqKioqIC8vXG5cbiAgZ2V0SW5pdGlhbERhdGE6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0eXBlb2YoU3RvcmFnZSkgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5mZXRjaERhdGFGcm9tU2VydmVyKCcvaW5pdGlhbGl6ZScsIHRoaXMuc2V0SW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vaWYgKHR5cGVvZihsb2NhbFN0b3JhZ2UuaW5pdGlhbERhdGEpICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIC8vICB0aGlzLnNldEluaXRpYWxEYXRhKGxvY2FsU3RvcmFnZS5pbml0aWFsRGF0YSk7XG4gICAgICAvL31cbiAgICAgIC8vZWxzZSB7XG4gICAgICAgIHRoaXMuZmV0Y2hEYXRhRnJvbVNlcnZlcignL2luaXRpYWxpemUnLCB0aGlzLnNldEluaXRpYWxEYXRhKTtcbiAgICAgIC8vfVxuICAgIH1cbiAgfSxcblxuICBzZXRJbml0aWFsRGF0YTogZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmICh0eXBlb2YoU3RvcmFnZSkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmICh0eXBlb2YobG9jYWxTdG9yYWdlLmluaXRpYWxEYXRhKSA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5pbml0aWFsRGF0YSA9IGRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBwYXJzZWREYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBhcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZSh0aGlzLnN0YXRlLmFwcCk7XG4gICAgICBhcHBTdGF0ZS5wb2xpdGljaWFuTGlzdCA9IHBhcnNlZERhdGFbJ3BvbGl0aWNpYW5zJ107XG4gICAgICBhcHBTdGF0ZS5yaWRpbmdzTGlzdCA9IHBhcnNlZERhdGFbJ3JpZGluZ3MnXTtcbiAgICAgIGFwcFN0YXRlLnBhcnRpZXNMaXN0ID0gcGFyc2VkRGF0YVsncGFydGllcyddO1xuICAgICAgYXBwU3RhdGUuc2Vzc2lvbnNMaXN0ID0gcGFyc2VkRGF0YVsnc2Vzc2lvbnMnXTtcbiAgICAgIGFwcFN0YXRlLnNlYXJjaC5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNldFN0YXRlKHthcHA6IGFwcFN0YXRlfSk7XG4gIH0sXG5cbiAgZ2V0UG9saXRpY2lhblZvdGVzOiBmdW5jdGlvbihpZCkge1xuICAgIHRoaXMuZmV0Y2hEYXRhRnJvbVNlcnZlcignL3ZvdGVzLycgKyBpZCwgdGhpcy5zZXRQb2xpdGljaWFuVm90ZXMpO1xuICB9LFxuXG4gIHNldFBvbGl0aWNpYW5Wb3RlczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBwYXJzZWREYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBhcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZSh0aGlzLnN0YXRlLmFwcCk7XG4gICAgICBhcHBTdGF0ZS5wcm9maWxlLnZvdGVzID0gcGFyc2VkRGF0YVsndm90ZXMnXTtcbiAgICAgIGFwcFN0YXRlLnByb2ZpbGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YXBwOiBhcHBTdGF0ZX0pO1xuICB9LFxuXG4gIGdldFZvdGVJbmZvcm1hdGlvbjogZnVuY3Rpb24oaWQpIHtcbiAgICB0aGlzLmZldGNoRGF0YUZyb21TZXJ2ZXIoJy92b3RlLycgKyBpZCwgdGhpcy5zZXRWb3RlSW5mb3JtYXRpb24pO1xuICB9LFxuXG4gIHNldFZvdGVJbmZvcm1hdGlvbjogZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBwYXJzZWREYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBhcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZSh0aGlzLnN0YXRlLmFwcCk7XG4gICAgICBhcHBTdGF0ZS52b3RlLmRhdGEgPSBwYXJzZWREYXRhWyd2b3RlcyddO1xuICAgICAgYXBwU3RhdGUudm90ZS5kYXRhID0gcGFyc2VkRGF0YVsndm90ZXMnXTtcbiAgICAgIGFwcFN0YXRlLnZvdGUuc3BvbnNvciA9IHBhcnNlZERhdGFbJ3Nwb25zb3InXTtcbiAgICAgIGFwcFN0YXRlLnZvdGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YXBwOiBhcHBTdGF0ZX0pO1xuICB9LFxuXG4gIGZldGNoRGF0YUZyb21TZXJ2ZXI6IGZ1bmN0aW9uKHBhdGgsIHNldHRlciwgd2lsbFJldHVybikge1xuICAgIGlmICh0eXBlb2Yod2lsbFJldHVybik9PT0ndW5kZWZpbmVkJykgd2lsbFJldHVybiA9IGZhbHNlO1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgcmVxdWVzdC5vcGVuKCdHRVQnLCBwYXRoLCB0cnVlKTtcbiAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICBzZXR0ZXIocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgZmV0Y2hpbmcgZGF0YSBmcm9tIHNlcnZlclwiKVxuICAgICAgfVxuICAgIH1cbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciByZXF1ZXN0aW5nIGRhdGEgZnJvbSBzZXJ2ZXJcIilcbiAgICB9O1xuICAgIHJlcXVlc3Quc2VuZCgpO1xuICB9LFxuXG4gIC8vICoqKipTRUFSQ0gvRklMVEVSIEZVTkNUSU9OUyoqKiogLy9cblxuICBnZXRTZWFyY2hSaWRpbmc6IGZ1bmN0aW9uKHNlYXJjaFZhbHVlKSB7XG4gICAgc2VhcmNoVmFsdWUgPSBzZWFyY2hWYWx1ZS5yZXBsYWNlKC9cXHMrL2csICcnKTtcbiAgICBzZWFyY2hWYWx1ZSA9IHNlYXJjaFZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgdmFyIHBvc3RhbFVSTCA9ICdodHRwczovL3JlcHJlc2VudC5vcGVubm9ydGguY2EvcG9zdGNvZGVzLycgKyBzZWFyY2hWYWx1ZSArICcvP3NldHM9ZmVkZXJhbC1lbGVjdG9yYWwtZGlzdHJpY3RzJztcbiAgICB0aGlzLmZldGNoRGF0YUZyb21TZXJ2ZXIocG9zdGFsVVJMLCB0aGlzLnNldFNlYXJjaFJpZGluZylcbiAgfSxcblxuICBzZXRTZWFyY2hSaWRpbmc6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgYXBwU3RhdGUuc2VhcmNoLnJpZGluZyA9IHBhcnNlZERhdGFbXCJib3VuZGFyaWVzX2NvbmNvcmRhbmNlXCJdWzBdW1wibmFtZVwiXTtcbiAgICB0aGlzLnNldFN0YXRlKHthcHA6IGFwcFN0YXRlfSk7XG4gIH0sXG5cbiAgb25TZWFyY2hDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ3NlYXJjaCBjaGFuZ2UnKTtcbiAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIG1heCBpcyBncmVhdGVyIHRoYW4gdGhlIG51bWJlciBvZiByZXN1bHRzIC0gaWYgc28sIHJlZHVjZSBpdFxuICAgIHZhciBtYXggPSB0aGlzLnN0YXRlLmFwcC5zZWFyY2gubWF4O1xuICAgIHZhciBudW0gPSB0aGlzLmZpbHRlclBvbGl0aWNpYW5zKCkubGVuZ3RoO1xuICAgIGlmIChudW0gPCBtYXgpIHtcbiAgICAgIG1heCA9IG51bTtcbiAgICAgIGlmIChtYXggPCAxMCkge1xuICAgICAgICBtYXggPSAxMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2VhcmNoVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG5cbiAgICAvLyBwb3N0YWwgY29kZSB0ZXN0XG4gICAgdmFyIHBvc3RhbFJlZ0V4ID0gbmV3IFJlZ0V4cChcIl5bQUJDRUdISktMTU5QUlNUVlhZYWJjZWdoamtsbW5wcnN0dnh5XXsxfVxcXFxkezF9W0EtWmEtel17MX0gKlxcXFxkezF9W0EtWmEtel17MX1cXFxcZHsxfSRcIiwgXCJpXCIpO1xuICAgIGlmIChwb3N0YWxSZWdFeC50ZXN0KHNlYXJjaFZhbHVlKSkge1xuICAgICAgdGhpcy5nZXRTZWFyY2hSaWRpbmcoc2VhcmNoVmFsdWUpO1xuICAgIH1cbiAgICAvLyBvdGhlcndpc2UsIG5vcm1hbCBzdGF0ZSBjaGFuZ2VcbiAgICBlbHNlIHtcbiAgICAgIGFwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHRoaXMuc3RhdGUuYXBwKTtcbiAgICAgIGlmIChzZWFyY2hWYWx1ZSA9PSAnJykge1xuICAgICAgICBhcHBTdGF0ZS5zZWFyY2guaXNTZWFyY2hpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhcHBTdGF0ZS5zZWFyY2guaXNTZWFyY2hpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgICAgYXBwU3RhdGUuc2VhcmNoLnNlYXJjaFZhbHVlID0gc2VhcmNoVmFsdWU7XG4gICAgICBhcHBTdGF0ZS5zZWFyY2gubWF4ID0gbWF4O1xuICAgICAgYXBwU3RhdGUuc2VhcmNoLnJpZGluZyA9ICcnO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7YXBwOiBhcHBTdGF0ZX0pO1xuICAgIH1cbiAgfSxcbiAgb25TZWFyY2hTY3JvbGw6IGZ1bmN0aW9uKHRoaW5nb25lLCB0aGluZ3R3bykge1xuICAgIHZhciBzY3JvbGxUb3AgPSB0aGluZ29uZS5nZXRET01Ob2RlKCkuc2Nyb2xsVG9wO1xuICAgIHZhciBoZWlnaHQgPSB0aGluZ29uZS5nZXRET01Ob2RlKCkuc2Nyb2xsSGVpZ2h0O1xuICAgIHZhciBoID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIHZhciBtYXggPSB0aGlzLnN0YXRlLmFwcC5zZWFyY2gubWF4O1xuICAgIGlmICgoaCArIHNjcm9sbFRvcCArIDEwMCkgPiBoZWlnaHQpIHtcbiAgICAgIHZhciBudW0gPSB0aGlzLmZpbHRlclBvbGl0aWNpYW5zKCkubGVuZ3RoO1xuICAgICAgaWYgKG1heCA8IG51bSkge1xuICAgICAgICBhcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZSh0aGlzLnN0YXRlLmFwcCk7XG4gICAgICAgICAgYXBwU3RhdGUuc2VhcmNoLm1heCA9IG1heCArIDEwO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthcHAgOiBhcHBTdGF0ZX0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBvbkJpbGxTZWFyY2hDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgYXBwU3RhdGUudm90ZS5zZWFyY2hWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHthcHA6IGFwcFN0YXRlfSk7XG4gIH0sXG5cbiAgZmlsdGVyUG9saXRpY2lhbnM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmaWx0ZXJlZExpc3QgPSB0aGlzLnN0YXRlLmFwcC5wb2xpdGljaWFuTGlzdC5maWx0ZXIoZnVuY3Rpb24gKHBvbCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2wuc2Vzc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnN0YXRlLmFwcC5zZXNzaW9ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChwb2wuc2Vzc2lvbnNbaV0gPT0gdGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnNbal0pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgaWYgKHRoaXMuc3RhdGUuYXBwLnNlYXJjaC5pc1NlYXJjaGluZyAmJiB0aGlzLnN0YXRlLmFwcC5zZWFyY2guc2VhcmNoVmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmFwcC5zZWFyY2gucmlkaW5nICE9ICcnKSB7XG4gICAgICAgIHZhciBzZWFyY2hSaWRpbmcgPSB0aGlzLnN0YXRlLmFwcC5zZWFyY2gucmlkaW5nLnJlcGxhY2UoL1xcVy9nLCBcIlwiKTtcbiAgICAgICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLnN0YXRlLmFwcC5zZWFyY2gucmlkaW5nLnJlcGxhY2UoL1xcVy9nLCBcIlwiKSwgXCJpXCIpO1xuICAgICAgICB2YXIgZmlsdGVyZWRMaXN0ID0gZmlsdGVyZWRMaXN0LmZpbHRlcihmdW5jdGlvbiAocG9sKSB7XG4gICAgICAgICAgcG9sLnJpZGluZyA9IHRoaXMuc3RhdGUuYXBwLnJpZGluZ3NMaXN0W3BvbC5yaWRpbmdzWzBdXS5uYW1lLnJlcGxhY2UoL1xcVy9nLCBcIlwiKTtcbiAgICAgICAgICByZXR1cm4gcG9sLnJpZGluZy5zZWFyY2gocmVnZXgpID4gLTE7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLnN0YXRlLmFwcC5zZWFyY2guc2VhcmNoVmFsdWUsIFwiaVwiKTtcbiAgICAgICAgdmFyIGZpbHRlcmVkTGlzdCA9IGZpbHRlcmVkTGlzdC5maWx0ZXIoZnVuY3Rpb24gKHBvbCkge1xuICAgICAgICAgIHBvbC5wYXJ0eU5hbWUgPSB0aGlzLnN0YXRlLmFwcC5wYXJ0aWVzTGlzdFtwb2wucGFydGllc1swXV0ubmFtZTtcbiAgICAgICAgICBwb2wucGFydHlTbHVnID0gdGhpcy5zdGF0ZS5hcHAucGFydGllc0xpc3RbcG9sLnBhcnRpZXNbMF1dLnNsdWc7XG4gICAgICAgICAgcG9sLnJpZGluZyA9IHRoaXMuc3RhdGUuYXBwLnJpZGluZ3NMaXN0W3BvbC5yaWRpbmdzWzBdXS5uYW1lO1xuICAgICAgICAgIHJldHVybiBwb2wubmFtZS5zZWFyY2gocmVnZXgpID4gLTEgfHwgcG9sLnBhcnR5TmFtZS5zZWFyY2gocmVnZXgpID4gLTEgfHwgcG9sLnBhcnR5U2x1Zy5zZWFyY2gocmVnZXgpID4gLTEgfHwgcG9sLnJpZGluZy5zZWFyY2gocmVnZXgpID4gLTEgIHx8IHBvbC5yaWRpbmcuc2VhcmNoKHJlZ2V4KSA+IC0xO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgfSAgXG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXJlZExpc3Q7XG4gIH0sXG4gIGZpbHRlclZvdGVzOiBmdW5jdGlvbigpIHtcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5zdGF0ZS5hcHAucHJvZmlsZS52b3RlcykubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHNlc3Npb25zID0gdGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnM7XG4gICAgICB2YXIgZmlsdGVyZWRWb3Rlc0J5U2Vzc2lvbiA9IHRoaXMuc3RhdGUuYXBwLnByb2ZpbGUudm90ZXMuZmlsdGVyKGZ1bmN0aW9uICh2b3RlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2Vzc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodm90ZS5zZXNzaW9uX2lkID09IHNlc3Npb25zW2ldKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmFwcC52b3RlLnNlYXJjaFZhbHVlKSB7XG4gICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAodGhpcy5zdGF0ZS5hcHAudm90ZS5zZWFyY2hWYWx1ZSwgXCJpXCIpO1xuICAgICAgICB2YXIgdm90ZXMgPSBmaWx0ZXJlZFZvdGVzQnlTZXNzaW9uLmZpbHRlcihmdW5jdGlvbiAodm90ZSkge1xuICAgICAgICAgIHJldHVybiB2b3RlLm5hbWVfZW4uc2VhcmNoKHJlZ2V4KSA+IC0xIHx8IHZvdGUubnVtYmVyLnNlYXJjaChyZWdleCkgPiAtMSB8fCB2b3RlLnNob3J0X3RpdGxlX2VuLnNlYXJjaChyZWdleCkgPiAtMTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIHZvdGVzID0gZmlsdGVyZWRWb3Rlc0J5U2Vzc2lvbjtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2b3RlcyA9IHRoaXMuc3RhdGUuYXBwLnByb2ZpbGUudm90ZXM7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB2b3RlcztcbiAgfSxcblxuICBzZXNzaW9uVG9nZ2xlOiBmdW5jdGlvbihzZXNzaW9uTnVtYmVyKSB7XG4gICAgdmFyIG5ld1Nlc3Npb25zID0gW107XG4gICAgdmFyICRpbkFycmF5ID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuc3RhdGUuYXBwLnNlc3Npb25zLmxlbmd0aCA9PSAxKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnNbMF0gPT0gc2Vzc2lvbk51bWJlcikge1xuICAgICAgICBuZXdTZXNzaW9ucyA9IFtzZXNzaW9uTnVtYmVyXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBuZXdTZXNzaW9ucy5wdXNoKHRoaXMuc3RhdGUuYXBwLnNlc3Npb25zWzBdKTtcbiAgICAgICAgbmV3U2Vzc2lvbnMucHVzaChzZXNzaW9uTnVtYmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBmb3IgKGk9MDtpPHRoaXMuc3RhdGUuYXBwLnNlc3Npb25zLmxlbmd0aDtpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYXBwLnNlc3Npb25zW2ldIT1zZXNzaW9uTnVtYmVyKSB7XG4gICAgICAgICAgbmV3U2Vzc2lvbnMucHVzaCh0aGlzLnN0YXRlLmFwcC5zZXNzaW9uc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJGluQXJyYXkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoISRpbkFycmF5KSB7XG4gICAgICAgIG5ld1Nlc3Npb25zLnB1c2goc2Vzc2lvbk51bWJlcik7XG4gICAgICB9XG4gICAgfVxuICAgIGFwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHRoaXMuc3RhdGUuYXBwKTtcbiAgICAgIGFwcFN0YXRlLnNlc3Npb25zID0gbmV3U2Vzc2lvbnM7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YXBwOiBhcHBTdGF0ZX0pO1xuICB9LFxuXG4gIGV4cGFuZFNlc3Npb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgYXBwU3RhdGUuZXhwYW5kU3RhdGUgPSAhdGhpcy5zdGF0ZS5hcHAuZXhwYW5kU3RhdGU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YXBwOiBhcHBTdGF0ZX0pO1xuICB9LFxuXG4gIGdldFBvbGl0aWNpYW5CeUlEOiBmdW5jdGlvbihpZCkge1xuICAgIGlmIChpZCkge1xuICAgICAgZm9yIChpPTA7aTx0aGlzLnN0YXRlLmFwcC5wb2xpdGljaWFuTGlzdC5sZW5ndGg7aSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFwcC5wb2xpdGljaWFuTGlzdFtpXS5pZCA9PSBpZCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFwcC5wb2xpdGljaWFuTGlzdFtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIGdldFBhcnR5QnlJRDogZnVuY3Rpb24oaWQpIHtcbiAgICBpZiAoaWQpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmFwcC5wYXJ0aWVzTGlzdFtpZF0uc2x1Zykge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5hcHAucGFydGllc0xpc3RbaWRdLnNsdWc7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYXBwLnBhcnRpZXNMaXN0W2lkXS5uYW1lO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIGdldFJpZGluZ0J5SUQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgaWYgKGlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGF0ZS5hcHAucmlkaW5nc0xpc3RbaWRdLm5hbWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXInKTtcbiAgICB2YXIgbG9hZGluZyA9ICh0aGlzLnN0YXRlLmFwcC52b3RlLmlzTG9hZGluZykgPyBcImxvYWRpbmdcIiA6IFwibG9hZGVkXCI7XG4gICAgdmFyIGZpbHRlcmVkUG9saXRpY2lhbkxpc3QgPSB0aGlzLmZpbHRlclBvbGl0aWNpYW5zKCkuc2xpY2UoMCwgdGhpcy5zdGF0ZS5hcHAuc2VhcmNoLm1heCk7XG4gICAgdmFyIGN1cnJlbnRQcm9maWxlID0gdGhpcy5nZXRQb2xpdGljaWFuQnlJRCh0aGlzLnN0YXRlLmFwcC5wcm9maWxlLmlkKTtcbiAgICB2YXIgZ2V0dGVycyA9IFt0aGlzLmdldFBvbGl0aWNpYW5CeUlELHRoaXMuZ2V0UGFydHlCeUlELHRoaXMuZ2V0UmlkaW5nQnlJRF07XG4gICAgdmFyIHZvdGVzID0gdGhpcy5maWx0ZXJWb3RlcygpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveCBzZWFyY2hcIj5cbiAgICAgICAgPFNlYXJjaEJveFxuICAgICAgICAgIGJveD17dGhpcy5zdGF0ZS5hcHAuYm94fSAvL3RlbXBcbiAgICAgICAgICBwb2xpdGljaWFuTGlzdD17ZmlsdGVyZWRQb2xpdGljaWFuTGlzdH1cbiAgICAgICAgICBwYXJ0aWVzTGlzdD17dGhpcy5zdGF0ZS5hcHAucGFydGllc0xpc3R9XG4gICAgICAgICAgcmlkaW5nc0xpc3Q9e3RoaXMuc3RhdGUuYXBwLnJpZGluZ3NMaXN0fVxuICAgICAgICAgIHNlc3Npb25zTGlzdD17dGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnNMaXN0fVxuICAgICAgICAgIHNlc3Npb25zPXt0aGlzLnN0YXRlLmFwcC5zZXNzaW9uc31cbiAgICAgICAgICBzZWFyY2g9e3RoaXMuc3RhdGUuYXBwLnNlYXJjaH1cbiAgICAgICAgICBvblNlYXJjaFNjcm9sbD17dGhpcy5vblNlYXJjaFNjcm9sbH1cbiAgICAgICAgICBvblNlYXJjaENoYW5nZT17dGhpcy5vblNlYXJjaENoYW5nZX1cbiAgICAgICAgICBzZXNzaW9uVG9nZ2xlPXt0aGlzLnNlc3Npb25Ub2dnbGV9XG4gICAgICAgICAgZXhwYW5kU2Vzc2lvbnM9e3RoaXMuZXhwYW5kU2Vzc2lvbnN9XG4gICAgICAgICAgZXhwYW5kU3RhdGU9e3RoaXMuc3RhdGUuYXBwLmV4cGFuZFN0YXRlfVxuICAgICAgICAgIGdldHRlcnMgPSB7Z2V0dGVyc31cbiAgICAgICAgICBjdXJyZW50UHJvZmlsZUlEID0ge3RoaXMuc3RhdGUuYXBwLnByb2ZpbGUuaWR9IC8+XG4gICAgICAgIDxQcm9maWxlQm94IFxuICAgICAgICAgIGJveD17dGhpcy5zdGF0ZS5hcHAuYm94fSAvL3RlbXBcbiAgICAgICAgICBnZXR0ZXJzID0ge2dldHRlcnN9XG4gICAgICAgICAgcHJvZmlsZT17Y3VycmVudFByb2ZpbGV9XG4gICAgICAgICAgdm90ZXM9e3ZvdGVzfSBcbiAgICAgICAgICBjdXJyZW50Vm90ZT17dGhpcy5zdGF0ZS5hcHAudm90ZX1cbiAgICAgICAgICBvbkJpbGxTZWFyY2hDaGFuZ2U9e3RoaXMub25CaWxsU2VhcmNoQ2hhbmdlfSBcbiAgICAgICAgICBnZXRCaWxsSW5mbyA9IHt0aGlzLmdldEJpbGxJbmZvfVxuICAgICAgICAgIGJpbGxJbmZvID0ge3RoaXMuc3RhdGUuYXBwLnZvdGUuZGF0YX1cbiAgICAgICAgICBnZXRQb2xpdGljaWFuID0ge3RoaXMuZ2V0UG9saXRpY2lhbn0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cbiAgZ2V0QmlsbEluZm86IGZ1bmN0aW9uKG9iamVjdCwgZXZlbnQpIHtcbiAgICBpZiAob2JqZWN0LnByb3BzLnZvdGUudm90ZXF1ZXN0aW9uX2lkID09IHRoaXMuc3RhdGUuYXBwLnZvdGUuaWQpIHtcbiAgICAgIGFwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHRoaXMuc3RhdGUuYXBwKTtcbiAgICAgICAgYXBwU3RhdGUudm90ZS5pZCA9IDA7XG4gICAgICAgIGFwcFN0YXRlLnZvdGUudm90ZXMgPSB7fTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2FwcDogYXBwU3RhdGV9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmdldFZvdGVJbmZvcm1hdGlvbihvYmplY3QucHJvcHMudm90ZS52b3RlcXVlc3Rpb25faWQpO1xuICAgICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgICBhcHBTdGF0ZS52b3RlLmlkID0gb2JqZWN0LnByb3BzLnZvdGUudm90ZXF1ZXN0aW9uX2lkO1xuICAgICAgICBhcHBTdGF0ZS52b3RlLmRhdGEgPSB7fTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2FwcDogYXBwU3RhdGV9KTtcbiAgICB9XG4gIH0sXG4gIGdldFBvbGl0aWNpYW46IGZ1bmN0aW9uKHBvbGl0aWNpYW5zLCBpZCkge1xuICAgIC8vaWYgKHR5cGVvZihwb2xpdGljaWFucyk9PT0ndW5kZWZpbmVkJykgcG9saXRpY2lhbnMgPSB0aGlzLnN0YXRlLnBvbGl0aWNpYW5zO1xuICAgIC8vaWYgKHR5cGVvZihpZCk9PT0ndW5kZWZpbmVkJykgaWQgPSB0aGlzLnN0YXRlLmlkO1xuICAgIC8vaWYgKGlkKSB7XG4gICAgLy8gIGZvciAoaSA9IDA7IGkgPCBwb2xpdGljaWFucy5sZW5ndGg7IGkrKykge1xuICAgIC8vICAgIGlmIChwb2xpdGljaWFuc1tpXS5pZCA9PSBpZCkge1xuICAgIC8vICAgICAgcmV0dXJuIHBvbGl0aWNpYW5zW2ldO1xuICAgIC8vICAgIH1cbiAgICAvLyAgfVxuICAgIC8vfVxuICAgIHJldHVybiBbXTtcbiAgfSxcbiAgXG59KTtcblxuUmVhY3QucmVuZGVyKFxuICA8QXBwIC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpXG4pOyJdfQ==
