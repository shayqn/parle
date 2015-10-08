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
    else if (this.props.currentProfileIsLoading) {
      loader= (React.createElement("div", {className: "loader loading"}));
      for(i=0;i<20;i++) {
        var EmptyRow = (
            React.createElement("div", {key: i, className: "voteRow row emptyrow"}, 
              React.createElement("div", {className: "main row"}, 
                React.createElement("div", {className: "col"}, React.createElement("span", null, "-"))
              )
            )
        );
        voteRows.push(EmptyRow);
      }
    }
    else {
      var noResultsRow = (
          React.createElement("div", {key: 0, className: "voteRow row noresults"}, 
            React.createElement("div", {className: "main row"}, 
              React.createElement("div", {className: "col spacer"}), 
              React.createElement("div", {className: "col"}, React.createElement("span", null, "No matching records have been found. Try changing your selected sessions or search terms.")), 
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
            loader, 
            voteRows
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
        getPolitician: this.props.getPolitician, 
        currentProfileIsLoading: this.props.currentProfileIsLoading})
      )
    );
  },
});

module.exports = ProfileBox;

},{"./BillSearch.js":"/Users/braden/parle/src/js/boxes/profile/BillSearch.js","./BillStack.js":"/Users/braden/parle/src/js/boxes/profile/BillStack.js","react-addons-pure-render-mixin":"/Users/braden/parle/node_modules/react-addons-pure-render-mixin/index.js"}],"/Users/braden/parle/src/js/boxes/profile/VoteRow.js":[function(require,module,exports){
/** @jsx React.DOM */

var PureRenderMixin = require('react-addons-pure-render-mixin');
var VoteRow = React.createClass({displayName: "VoteRow",
  mixins: [PureRenderMixin],
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
    var loader = null;
    var balancer = null;
    if (this.props.vote.votequestion_id == this.props.currentVote.id) {
      voteRowClass += " current";
      if (this.props.currentVote.isLoading) {
        loader= (React.createElement("div", {className: "loader loading"}));
        balancer= (React.createElement("div", {className: "balancer"}));
      }
      else {
        loader= (React.createElement("div", {className: "loader complete"}));
        voteRowClass += " loaded";
      }
    }
    return (
      React.createElement("div", {className: voteRowClass, key: this.props.key}, 
        balancer, 
        loader, 
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
    if ((this.props.voteQuestionID == this.props.currentVote.id)&&!this.props.currentVote.isLoading) {
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

},{"react-addons-pure-render-mixin":"/Users/braden/parle/node_modules/react-addons-pure-render-mixin/index.js"}],"/Users/braden/parle/src/js/boxes/search/SearchBox.js":[function(require,module,exports){
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
              currentProfileIsLoading: this.props.currentProfileIsLoading, 
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
    var currentProfileIsLoading = this.props.currentProfileIsLoading;
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
            currentProfileIsLoading: currentProfileIsLoading, 
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
        React.createElement("div", {className: "results"}, 
          politicianNodes
        )
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
    var classString = 'result ';
    var loader = null;
    if (politician.id == this.props.currentProfileID) {
      classString += 'active ';
      if (this.props.currentProfileIsLoading) {
        loader= (React.createElement("div", {className: "loader loading"}));
      }
      else {
        loader= (React.createElement("div", {className: "loader complete"}));
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
      React.createElement("a", {className: classString, href: href, key: this.props.key}, 
        React.createElement("div", {className: "headshot", style: {backgroundImage: imgURL}}), 
        React.createElement("h3", null, politician.name), 
        React.createElement("span", {className: "party"}, partyName), 
        loader
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
      // if profile and vote specified
      if (urlParameters.length >= 4) {
        if ((urlParameters[2] == 'vote') && !isNaN(urlParameters[3])) {
          newAppState.vote.isLoading = true;
          newAppState.vote.id = urlParameters[3];
          newAppState.vote.data = {};
          newAppState.vote.sponsor = 0;
        }
      }
    }
    else {
      newAppState.profile.id = 0;
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
          currentProfileID: this.state.app.profile.id, 
          currentProfileIsLoading: this.state.app.profile.isLoading}), 
        React.createElement(ProfileBox, {
          box: this.state.app.box, //temp
          getters: getters, 
          profile: currentProfile, 
          votes: votes, 
          currentVote: this.state.app.vote, 
          onBillSearchChange: this.onBillSearchChange, 
          getBillInfo: this.getBillInfo, 
          billInfo: this.state.app.vote.data, 
          getPolitician: this.getPolitician, 
          currentProfileIsLoading: this.state.app.profile.isLoading})
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
        appState.vote.isLoading = true;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtYWRkb25zLXB1cmUtcmVuZGVyLW1peGluL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL3NoYWxsb3dDb21wYXJlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L25vZGVfbW9kdWxlcy9mYmpzL2xpYi9zaGFsbG93RXF1YWwuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9Cb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9pbmZvL0luZm9UZXh0LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU2VhcmNoLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvcHJvZmlsZS9CaWxsU3RhY2suanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1Byb2ZpbGVCb3guanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9wcm9maWxlL1ZvdGVSb3cuanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9zZWFyY2gvU2VhcmNoQm94LmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvc2VhcmNoL1NlYXJjaFN0YWNrLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvc2VhcmNoL1Nlc3Npb25CdXR0b24uanMiLCIvVXNlcnMvYnJhZGVuL3BhcmxlL3NyYy9qcy9ib3hlcy9zZWFyY2gvU2Vzc2lvblNlbGVjdG9yLmpzIiwiL1VzZXJzL2JyYWRlbi9wYXJsZS9zcmMvanMvYm94ZXMvdGV4dC9CaWxsVGV4dC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2JveGVzL3RleHQvVGV4dEJveC5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL2VsZW1lbnRzL0Fycm93SWNvbi5qcyIsIi9Vc2Vycy9icmFkZW4vcGFybGUvc3JjL2pzL3BhcmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREEscUJBQXFCOztBQUVyQixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDeEMsSUFBSSw2QkFBNkIsdUJBQUE7RUFDL0IsbUJBQW1CLEVBQUUs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YSxFQUFFLFNBQVMsV0FBVyxFQUFFLEVBQUUsRUFBRTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVJLE9BQU8sRUFBRSxDQUFDO0FBQ2QsR0FBRzs7QUFFSCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxLQUFLLENBQUMsTUFBTTtFQUNWLG9CQUFDLEdBQUcsRUFBQSxJQUFBLENBQUcsQ0FBQTtFQUNQLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO0NBQ25DIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpbicpOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJy4vc2hhbGxvd0NvbXBhcmUnKTtcblxuLyoqXG4gKiBJZiB5b3VyIFJlYWN0IGNvbXBvbmVudCdzIHJlbmRlciBmdW5jdGlvbiBpcyBcInB1cmVcIiwgZS5nLiBpdCB3aWxsIHJlbmRlciB0aGVcbiAqIHNhbWUgcmVzdWx0IGdpdmVuIHRoZSBzYW1lIHByb3BzIGFuZCBzdGF0ZSwgcHJvdmlkZSB0aGlzIE1peGluIGZvciBhXG4gKiBjb25zaWRlcmFibGUgcGVyZm9ybWFuY2UgYm9vc3QuXG4gKlxuICogTW9zdCBSZWFjdCBjb21wb25lbnRzIGhhdmUgcHVyZSByZW5kZXIgZnVuY3Rpb25zLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICB2YXIgUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluID1cbiAqICAgICByZXF1aXJlKCdSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4nKTtcbiAqICAgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIG1peGluczogW1JlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpbl0sXG4gKlxuICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gKiAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfT5mb288L2Rpdj47XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBOb3RlOiBUaGlzIG9ubHkgY2hlY2tzIHNoYWxsb3cgZXF1YWxpdHkgZm9yIHByb3BzIGFuZCBzdGF0ZS4gSWYgdGhlc2UgY29udGFpblxuICogY29tcGxleCBkYXRhIHN0cnVjdHVyZXMgdGhpcyBtaXhpbiBtYXkgaGF2ZSBmYWxzZS1uZWdhdGl2ZXMgZm9yIGRlZXBlclxuICogZGlmZmVyZW5jZXMuIE9ubHkgbWl4aW4gdG8gY29tcG9uZW50cyB3aGljaCBoYXZlIHNpbXBsZSBwcm9wcyBhbmQgc3RhdGUsIG9yXG4gKiB1c2UgYGZvcmNlVXBkYXRlKClgIHdoZW4geW91IGtub3cgZGVlcCBkYXRhIHN0cnVjdHVyZXMgaGF2ZSBjaGFuZ2VkLlxuICovXG52YXIgUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluID0ge1xuICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uIChuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIHJldHVybiBzaGFsbG93Q29tcGFyZSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiogQHByb3ZpZGVzTW9kdWxlIHNoYWxsb3dDb21wYXJlXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzaGFsbG93RXF1YWwgPSByZXF1aXJlKCdmYmpzL2xpYi9zaGFsbG93RXF1YWwnKTtcblxuLyoqXG4gKiBEb2VzIGEgc2hhbGxvdyBjb21wYXJpc29uIGZvciBwcm9wcyBhbmQgc3RhdGUuXG4gKiBTZWUgUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluXG4gKi9cbmZ1bmN0aW9uIHNoYWxsb3dDb21wYXJlKGluc3RhbmNlLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICByZXR1cm4gIXNoYWxsb3dFcXVhbChpbnN0YW5jZS5wcm9wcywgbmV4dFByb3BzKSB8fCAhc2hhbGxvd0VxdWFsKGluc3RhbmNlLnN0YXRlLCBuZXh0U3RhdGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYWxsb3dDb21wYXJlOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBzaGFsbG93RXF1YWxcbiAqIEB0eXBlY2hlY2tzXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogUGVyZm9ybXMgZXF1YWxpdHkgYnkgaXRlcmF0aW5nIHRocm91Z2gga2V5cyBvbiBhbiBvYmplY3QgYW5kIHJldHVybmluZyBmYWxzZVxuICogd2hlbiBhbnkga2V5IGhhcyB2YWx1ZXMgd2hpY2ggYXJlIG5vdCBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSBhcmd1bWVudHMuXG4gKiBSZXR1cm5zIHRydWUgd2hlbiB0aGUgdmFsdWVzIG9mIGFsbCBrZXlzIGFyZSBzdHJpY3RseSBlcXVhbC5cbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0VxdWFsKG9iakEsIG9iakIpIHtcbiAgaWYgKG9iakEgPT09IG9iakIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqQSAhPT0gJ29iamVjdCcgfHwgb2JqQSA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqQiAhPT0gJ29iamVjdCcgfHwgb2JqQiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBrZXlzQSA9IE9iamVjdC5rZXlzKG9iakEpO1xuICB2YXIga2V5c0IgPSBPYmplY3Qua2V5cyhvYmpCKTtcblxuICBpZiAoa2V5c0EubGVuZ3RoICE9PSBrZXlzQi5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBUZXN0IGZvciBBJ3Mga2V5cyBkaWZmZXJlbnQgZnJvbSBCLlxuICB2YXIgYkhhc093blByb3BlcnR5ID0gaGFzT3duUHJvcGVydHkuYmluZChvYmpCKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzQS5sZW5ndGg7IGkrKykge1xuICAgIGlmICghYkhhc093blByb3BlcnR5KGtleXNBW2ldKSB8fCBvYmpBW2tleXNBW2ldXSAhPT0gb2JqQltrZXlzQVtpXV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGFsbG93RXF1YWw7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBJbmZvVGV4dCA9IHJlcXVpcmUoJy4vSW5mb1RleHQuanMnKTtcbnZhciBJbmZvQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBjb21wb25lbnRXaWxsVXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIGlmICgobmV4dFByb3BzLmJveCA9PSAnaW5mbycpICYmICh0aGlzLnByb3BzLmJveCAhPSAnc2VhcmNoJykpIHtcbiAgICAgIHRoaXMuYmFjayA9IHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5iYWNrID0gZmFsc2U7XG4gICAgfVxuICB9LFxuICBnb0JhY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAodGhpcy5iYWNrKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjbGFzc2VzID0gJ2luZm9Cb3ggJyArIHRoaXMucHJvcHMuYm94O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30+PGRpdiBjbGFzc05hbWU9XCJjbG9zZUNvbnRhaW5lclwiPjxhIGhyZWY9XCIvIy9cIiBvbkNsaWNrPXt0aGlzLmdvQmFja30+PC9hPjwvZGl2PjxJbmZvVGV4dCAvPjwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEluZm9Cb3g7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBJbmZvVGV4dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImluZm9UZXh0XCI+XG4gICAgICA8aDI+YWJvdXQgdm90ZXMubXA8L2gyPlxuICAgICAgPHA+RGVtb2NyYWNpZXMgYXJlIGRlZmluZWQgYnkgdGhlIGxhd3MgdGhhdCB0aGV5IHBhc3MsIGFuZCB0aGUgbGF3cyB0aGF0IHBhc3MgYXJlIGRldGVybWluZWQgYnkgdGhlIHJlcHJlc2VudGF0aXZlcyB3ZSBlbGVjdC4gSW4gb3JkZXIgdG8gYWNjdXJhdGVseSBldmFsdWF0ZSB3aGV0aGVyIG91ciBlbGVjdGVkIG1lbWJlcnMgb2YgcGFybGlhbWVudCBhcmUgYXBwcm9wcmlhdGVseSByZXByZXNlbnRpbmcgdGhlaXIgZWxlY3RvcmF0ZSwgdGhlIG1vc3QgcGVydGluZW50IGluZm9ybWF0aW9uIHdlIGhhdmUgaXMgdGhlaXIgdm90aW5nIGhpc3Rvcnk6IHdoaWNoIGJpbGxzIGhhdmUgdGhleSB2b3RlZCBmb3IsIHdoaWNoIGhhdmUgdGhleSB2b3RlZCBhZ2FpbnN0LCBhbmQgd2hpY2ggaGF2ZSB0aGV5IGFic3RhaW5lZCBmcm9tIHZvdGluZyBvbi4gPC9wPlxuICAgICAgPHA+V2hpbGUgdGhpcyBpbmZvcm1hdGlvbiBpcyBtYWRlIHB1YmxpY2x5IGF2YWlsYWJsZSB0byBhbGwgQ2FuYWRpYW5zLCB3ZSBub3RpY2VkIHRoYXQgaXQgY2FuIGJlIHNsb3cgYW5kIGRpZmZpY3VsdCB0byBwYXJzZS4gRXZlcnkgYmlsbCBpcyB2b3RlZCBvbiBtdWx0aXBsZSB0aW1lcyAtIHNvbWV0aW1lcyB0byBwYXNzIGFtZW5kbWVudHMsIHNvbWV0aW1lcyBldmVuIGp1c3QgdG8gdm90ZSBvbiB3aGV0aGVyIG9yIG5vdCBpdCB3aWxsIGJlIGRpc2N1c3NlZC4gVW5sZXNzIHlvdSBhcmUgYWJsZSB0byBkZWRpY2F0ZSBzaWduaWZpY2FudCB0aW1lIGFuZCBlZmZvcnQgaW50byBiZWNvbWluZyB3ZWxsLXZlcnNlZCBvbiB0aGUgZGV0YWlscyBvZiBlYWNoIGJpbGwsIGF0dGVtcHRpbmcgdG8gYW5hbHl6ZSB0aGUgdm90ZXMgYSBwb2xpdGljaWFuIG1ha2VzIGNhbiBiZSBtb3JlIGNvbmZ1c2luZyB0aGFuIGluZm9ybWF0aXZlLjwvcD5cbiAgICAgIDxwPkFzIGVuZ2FnZWQgY2l0aXplbnMgd2hvIGFyZSBub3QgY2FwYWJsZSBvZiBiZWluZyBpbnRpbWF0ZWx5IGZhbWlsaWFyIHdpdGggdGhlIGRldGFpbHMgYW5kIHByb2dyZXNzIG9mIGV2ZXJ5IGJpbGwsIHdoYXQgd2Ugd2FudGVkIHRvIGtub3cgd2FzIHRoaXM6IGFmdGVyIGFsbCB0aGUgYW1lbmRtZW50cyBhbmQgZWRpdHMsIGRpZCB0aGUgcG9saXRpY2lhbiB2b3RlIHRvIG1ha2UgdGhlIGZpbmFsIGJpbGwgYSBsYXcgb3Igbm90PyA8L3A+XG4gICAgICA8cD5UaGF0IGlzIHdoYXQgdGhpcyB3ZWJzaXRlIHByb3ZpZGVzOiBmb3IgZXZlcnkgbWVtYmVyIG9mIHBhcmxpYW1lbnQsIGl0IHJldHVybnMgb25seSB0aGUgdm90ZXMgdGhhdCBjb3JyZXNwb25kIHRvIHRoZWlyIGZpbmFsIHZvdGUgb24gYSBiaWxsIGFzIHdlbGwgYXMgd2hldGhlciBvciBub3QgdGhlIGJpbGwgd2FzIHN1Y2Nlc3NmdWxseSBwYXNzZWQgaW50byBsYXcuPC9wPlxuICAgICAgPHA+V2UgaG9wZSB0aGF0IHRoaXMgcHJvdmlkZXMgYW4gZWFzeSBhZGRpdGlvbmFsIGF2ZW51ZSBmb3IgZXZhbHVhdGluZyB0aGUgcGVyZm9ybWFuY2Ugb2Ygb3VyIGVsZWN0ZWQgbWVtYmVycyBvZiBwYXJsaWFtZW50IGFuZCBkZXRlcm1pbmluZyB0aGVpciBlZmZlY3RpdmVuZXNzIGluIHJlcHJlc2VudGluZyBvdXIgdmlld3MuPC9wPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZ2l0aHViTGlua1wiPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vc2hheXFuL3BhcmxlXCI+dmlldyBwcm9qZWN0IG9uIGdpdGh1YjwvYT48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJjcmVkaXRXaGVyZUNyZWRpdHNEdWVcIj5zcGVjaWFsIHRoYW5rcyB0byA8YSBocmVmPVwiaHR0cHM6Ly9vcGVucGFybGlhbWVudC5jYVwiPm9wZW5wYXJsaWFtZW50LmNhPC9hPiBmb3IgcHJvdmlkaW5nIGFsbCB0aGUgZGF0YTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IEluZm9UZXh0OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgQmlsbFNlYXJjaCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiaWxsU2VhcmNoXCI+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggYmlsbHMgYnkgbmFtZSBvciBudW1iZXIuLi5cIiBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkJpbGxTZWFyY2hDaGFuZ2V9IC8+ICBcbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCaWxsU2VhcmNoOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgVm90ZVJvdyA9IHJlcXVpcmUoJy4vVm90ZVJvdy5qcycpO1xudmFyIEJpbGxTdGFjayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3VycmVudFZvdGUgPSB0aGlzLnByb3BzLmN1cnJlbnRWb3RlO1xuICAgIHZhciBnZXRCaWxsSW5mbyA9IHRoaXMucHJvcHMuZ2V0QmlsbEluZm87XG4gICAgdmFyIHZvdGVSb3dzID0gW107XG4gICAgdmFyIGxvYWRlciA9IG51bGw7XG4gICAgaWYgKHRoaXMucHJvcHMudm90ZXMubGVuZ3RoICA+IDApIHtcbiAgICAgIHZhciBnZXRCaWxsVGV4dCA9IHRoaXMucHJvcHMuZ2V0QmlsbFRleHQ7XG4gICAgICB2b3RlUm93cyA9IHRoaXMucHJvcHMudm90ZXMubWFwKGZ1bmN0aW9uIChvYmplY3QsIGtleSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxWb3RlUm93XG4gICAgICAgICAgICBrZXkgPSB7a2V5fVxuICAgICAgICAgICAgdm90ZSA9IHtvYmplY3R9XG4gICAgICAgICAgICBjdXJyZW50Vm90ZSA9IHtjdXJyZW50Vm90ZX1cbiAgICAgICAgICAgIG9uQ2xpY2sgPSB7Z2V0QmlsbEluZm99XG4gICAgICAgICAgICBiaWxsSW5mbyA9IHt0aGlzLnByb3BzLmJpbGxJbmZvfVxuICAgICAgICAgICAgZ2V0UG9saXRpY2lhbiA9IHt0aGlzLnByb3BzLmdldFBvbGl0aWNpYW59IC8+XG4gICAgICAgICk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnByb3BzLmN1cnJlbnRQcm9maWxlSXNMb2FkaW5nKSB7XG4gICAgICBsb2FkZXI9ICg8ZGl2IGNsYXNzTmFtZT1cImxvYWRlciBsb2FkaW5nXCI+PC9kaXY+KTtcbiAgICAgIGZvcihpPTA7aTwyMDtpKyspIHtcbiAgICAgICAgdmFyIEVtcHR5Um93ID0gKFxuICAgICAgICAgICAgPGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cInZvdGVSb3cgcm93IGVtcHR5cm93XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbiByb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPjxzcGFuPi08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICAgIHZvdGVSb3dzLnB1c2goRW1wdHlSb3cpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBub1Jlc3VsdHNSb3cgPSAoXG4gICAgICAgICAgPGRpdiBrZXk9ezB9IGNsYXNzTmFtZT1cInZvdGVSb3cgcm93IG5vcmVzdWx0c1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWluIHJvd1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj48c3Bhbj5ObyBtYXRjaGluZyByZWNvcmRzIGhhdmUgYmVlbiBmb3VuZC4gVHJ5IGNoYW5naW5nIHlvdXIgc2VsZWN0ZWQgc2Vzc2lvbnMgb3Igc2VhcmNoIHRlcm1zLjwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyXCI+PC9kaXY+IFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB2b3RlUm93cy5wdXNoKG5vUmVzdWx0c1Jvdyk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ndm90ZXMnPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYmlsbFN0YWNrJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IGhlYWRlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgbGVmdFwiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzZXNzaW9uXCI+U2Vzc2lvbjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBudW1iZXJcIj5OdW1iZXI8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgdm90ZSBmdWxsLWxheW91dFwiPlZvdGU8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc2hvcnRuYW1lXCI+TmFtZTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCB2b3RlIG1vYmlsZS1vbmx5XCI+Vm90ZTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsYXdcIj5MYXc8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgZHJvcGRvd25cIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIHJpZ2h0XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtsb2FkZXJ9XG4gICAgICAgICAgICB7dm90ZVJvd3N9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTsgICAgICAgIFxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCaWxsU3RhY2s7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG52YXIgQmlsbFN0YWNrID0gcmVxdWlyZSgnLi9CaWxsU3RhY2suanMnKTtcbnZhciBCaWxsU2VhcmNoID0gcmVxdWlyZSgnLi9CaWxsU2VhcmNoLmpzJyk7XG52YXIgUHVyZVJlbmRlck1peGluID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXB1cmUtcmVuZGVyLW1peGluJyk7XG52YXIgUHJvZmlsZUJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgbWl4aW5zOiBbUHVyZVJlbmRlck1peGluXSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICdwcm9maWxlQm94ICcgKyB0aGlzLnByb3BzLmJveDtcbiAgICB2YXIgY2xvc2VDbGFzcyA9ICdjbG9zZSAnICsgdGhpcy5wcm9wcy5ib3g7XG4gICAgaWYgKHRoaXMucHJvcHMucHJvZmlsZSkge1xuICAgICAgdmFyIHBhcnR5TmFtZSA9IHRoaXMucHJvcHMuZ2V0dGVyc1sxXSh0aGlzLnByb3BzLnByb2ZpbGUucGFydGllc1swXSk7XG4gICAgICB2YXIgcmlkaW5nTmFtZSA9IHRoaXMucHJvcHMuZ2V0dGVyc1syXSh0aGlzLnByb3BzLnByb2ZpbGUucmlkaW5nc1swXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHBhcnR5TmFtZSA9ICcnO1xuICAgICAgdmFyIHJpZGluZ05hbWUgPSAnJztcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlSGVhZGVyXCI+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwicmV0dXJuXCIgaHJlZj1cIi8jL1wiPjxkaXYgY2xhc3NOYW1lID1cImljb25cIj48L2Rpdj48c3Bhbj5yZXR1cm4gdG8gTVAgc2VhcmNoPC9zcGFuPjwvYT5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9e2Nsb3NlQ2xhc3N9IGhyZWY9XCIvIy9cIj48L2E+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cIm5hbWVcIj57dGhpcy5wcm9wcy5wcm9maWxlLm5hbWV9PC9oMj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbmZvXCI+PGgzIGNsYXNzTmFtZT1cInJpZGluZ1wiPntyaWRpbmdOYW1lfTwvaDM+PGgzIGNsYXNzTmFtZT1cInBhcnR5XCI+e3BhcnR5TmFtZX08L2gzPjwvc3Bhbj5cbiAgICAgICAgICA8QmlsbFNlYXJjaCBvbkJpbGxTZWFyY2hDaGFuZ2U9e3RoaXMucHJvcHMub25CaWxsU2VhcmNoQ2hhbmdlfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8QmlsbFN0YWNrIFxuICAgICAgICB2b3Rlcz17dGhpcy5wcm9wcy52b3Rlc31cbiAgICAgICAgZ2V0QmlsbEluZm8gPSB7dGhpcy5wcm9wcy5nZXRCaWxsSW5mb31cbiAgICAgICAgY3VycmVudFZvdGUgPSB7dGhpcy5wcm9wcy5jdXJyZW50Vm90ZX1cbiAgICAgICAgYmlsbEluZm8gPSB7dGhpcy5wcm9wcy5iaWxsSW5mb31cbiAgICAgICAgZ2V0UG9saXRpY2lhbiA9IHt0aGlzLnByb3BzLmdldFBvbGl0aWNpYW59XG4gICAgICAgIGN1cnJlbnRQcm9maWxlSXNMb2FkaW5nPXt0aGlzLnByb3BzLmN1cnJlbnRQcm9maWxlSXNMb2FkaW5nfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2ZpbGVCb3g7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBQdXJlUmVuZGVyTWl4aW4gPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtcHVyZS1yZW5kZXItbWl4aW4nKTtcbnZhciBWb3RlUm93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBtaXhpbnM6IFtQdXJlUmVuZGVyTWl4aW5dLFxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy52b3RlLnZvdGUgPT0gJ1knKSB7XG4gICAgICB2YXIgdm90ZUNsYXNzID0gJ3llcyAnO1xuICAgICAgdmFyIHZvdGVUZXh0ID0gJ3llcyc7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMucHJvcHMudm90ZS52b3RlID09ICdOJykge1xuICAgICAgdmFyIHZvdGVDbGFzcyA9ICdubyAnO1xuICAgICAgdmFyIHZvdGVUZXh0ID0gJ25vJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgdm90ZUNsYXNzID0gJyc7XG4gICAgICB2YXIgdm90ZVRleHQgPSAnbm8gdm90ZSc7XG4gICAgfVxuICAgIHZvdGVDbGFzcyArPSAndm90ZSBjb2wgJztcbiAgICB2YXIgbW9iaWxlVm90ZUNsYXNzID0gdm90ZUNsYXNzICsgJ21vYmlsZS1vbmx5JztcbiAgICB2b3RlQ2xhc3MgKz0gJ2Z1bGwtbGF5b3V0J1xuXG4gICAgdmFyIGxhd1RleHQgPSB0aGlzLnByb3BzLnZvdGUubGF3ID8gJ3llcycgOiAnbm8nO1xuICAgIHZhciBsYXdDbGFzcyA9ICdjb2wgbGF3ICcgKyBsYXdUZXh0O1xuXG4gICAgaWYgKHRoaXMucHJvcHMudm90ZS5zaG9ydF90aXRsZV9lbikge1xuICAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLnZvdGUuc2hvcnRfdGl0bGVfZW47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLnZvdGUubmFtZV9lbjtcbiAgICB9XG4gICAgdmFyIHZvdGVSb3dDbGFzcyA9IFwidm90ZVJvdyByb3dcIjtcbiAgICB2YXIgbG9hZGVyID0gbnVsbDtcbiAgICB2YXIgYmFsYW5jZXIgPSBudWxsO1xuICAgIGlmICh0aGlzLnByb3BzLnZvdGUudm90ZXF1ZXN0aW9uX2lkID09IHRoaXMucHJvcHMuY3VycmVudFZvdGUuaWQpIHtcbiAgICAgIHZvdGVSb3dDbGFzcyArPSBcIiBjdXJyZW50XCI7XG4gICAgICBpZiAodGhpcy5wcm9wcy5jdXJyZW50Vm90ZS5pc0xvYWRpbmcpIHtcbiAgICAgICAgbG9hZGVyPSAoPGRpdiBjbGFzc05hbWU9XCJsb2FkZXIgbG9hZGluZ1wiPjwvZGl2Pik7XG4gICAgICAgIGJhbGFuY2VyPSAoPGRpdiBjbGFzc05hbWU9XCJiYWxhbmNlclwiPjwvZGl2Pik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbG9hZGVyPSAoPGRpdiBjbGFzc05hbWU9XCJsb2FkZXIgY29tcGxldGVcIj48L2Rpdj4pO1xuICAgICAgICB2b3RlUm93Q2xhc3MgKz0gXCIgbG9hZGVkXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17dm90ZVJvd0NsYXNzfSBrZXk9e3RoaXMucHJvcHMua2V5fT5cbiAgICAgICAge2JhbGFuY2VyfVxuICAgICAgICB7bG9hZGVyfVxuICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGljay5iaW5kKG51bGwsIHRoaXMpfSBjbGFzc05hbWU9XCJtYWluIHJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciBsZWZ0XCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc2Vzc2lvblwiPjxzcGFuIGNsYXNzTmFtZT1cImxhYmVsIG1vYmlsZS1vbmx5XCI+U2Vzc2lvbjwvc3Bhbj57dGhpcy5wcm9wcy52b3RlLnNlc3Npb25faWR9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbnVtYmVyXCI+PHNwYW4gY2xhc3NOYW1lPVwibGFiZWwgbW9iaWxlLW9ubHlcIj5OdW1iZXI8L3NwYW4+e3RoaXMucHJvcHMudm90ZS5udW1iZXJ9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3ZvdGVDbGFzc30+PHNwYW4gY2xhc3NOYW1lPVwidm90ZVRleHRcIj57dm90ZVRleHR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNob3J0bmFtZVwiPntuYW1lfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXttb2JpbGVWb3RlQ2xhc3N9PjxzcGFuIGNsYXNzTmFtZT1cImxhYmVsIG1vYmlsZS1vbmx5XCI+Vm90ZTwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJ2b3RlVGV4dFwiPnt2b3RlVGV4dH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2xhd0NsYXNzfT48c3BhbiBjbGFzc05hbWU9XCJsYWJlbCBtb2JpbGUtb25seVwiPkxhdzwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJsYXdUZXh0XCI+e2xhd1RleHR9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIGRyb3Bkb3duXCI+PHNwYW4+PEFycm93SWNvbiAvPjwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcGFjZXIgcmlnaHRcIj48L2Rpdj4gXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Vm90ZUluZm9Sb3cgXG4gICAgICAgICAgdm90ZSA9IHt0aGlzLnByb3BzLnZvdGV9XG4gICAgICAgICAgY3VycmVudFZvdGUgPSB7dGhpcy5wcm9wcy5jdXJyZW50Vm90ZX1cbiAgICAgICAgICB2b3RlUXVlc3Rpb25JRCA9IHt0aGlzLnByb3BzLnZvdGUudm90ZXF1ZXN0aW9uX2lkfVxuICAgICAgICAgIGJpbGxJbmZvID0ge3RoaXMucHJvcHMuYmlsbEluZm99XG4gICAgICAgICAgZ2V0UG9saXRpY2lhbiA9IHt0aGlzLnByb3BzLmdldFBvbGl0aWNpYW59IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbnZhciBWb3RlSW5mb1JvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5mb0NsYXNzID0gXCJyb3cgaW5mb1wiO1xuICAgIHZhciBnZXRQb2xpdGljaWFuID0gdGhpcy5wcm9wcy5nZXRQb2xpdGljaWFuO1xuICAgIHZhciBzcG9uc29yQ29tcG9uZW50ID0gbnVsbDtcbiAgICBpZiAoKHRoaXMucHJvcHMudm90ZVF1ZXN0aW9uSUQgPT0gdGhpcy5wcm9wcy5jdXJyZW50Vm90ZS5pZCkmJiF0aGlzLnByb3BzLmN1cnJlbnRWb3RlLmlzTG9hZGluZykge1xuICAgICAgaW5mb0NsYXNzICs9ICcgY3VycmVudCc7XG4gICAgICB2YXIgbGF3U3RyaW5nID0gICdMYXc6ICcgKyB0aGlzLnByb3BzLmxhd1RleHQ7XG4gICAgICB2YXIgdm90ZUluZm9ybWF0aW9uID0gPGRpdiBjbGFzc05hbWU9XCJjb2wgYmlsbEluZm9cIj57bGF3U3RyaW5nfTwvZGl2PlxuICAgICAgaWYgKHVuZGVmaW5lZCAhPSB0aGlzLnByb3BzLmJpbGxJbmZvKSB7XG4gICAgICAgIHZhciBwYXJ0eVZvdGVOb2RlcyA9IFtdO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBub2RlID0gKFxuICAgICAgICAgIDxkaXYga2V5PXswfSBjbGFzc05hbWU9XCJwYXJ0eVZvdGVIZWFkZXJcIiBrZXk9e2l9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+UGFydHk8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwieWVzXCI+WUVTPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vXCI+Tk88L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzdGFpblwiPkFCU1RBSU48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgICAgcGFydHlWb3RlTm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgeWVzQ291bnQgPSAwO1xuICAgICAgICBub0NvdW50ID0gMDtcbiAgICAgICAgYWJzdGFpbkNvdW50ID0gMDtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMucHJvcHMuYmlsbEluZm8pIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgICAgdmFyIHBhcnR5TmFtZSA9IGtleTtcbiAgICAgICAgICB2YXIgeWVzID0gdGhpcy5wcm9wcy5iaWxsSW5mb1trZXldWydZJ107XG4gICAgICAgICAgdmFyIG5vID0gdGhpcy5wcm9wcy5iaWxsSW5mb1trZXldWydOJ107XG4gICAgICAgICAgdmFyIGFic3RhaW4gPSB0aGlzLnByb3BzLmJpbGxJbmZvW2tleV1bJ0EnXTtcbiAgICAgICAgICB2YXIgbm9DbGFzcyA9IFwibm9cIjtcbiAgICAgICAgICB2YXIgeWVzQ2xhc3MgPSBcInllc1wiO1xuICAgICAgICAgIHZhciBhYnN0YWluQ2xhc3MgPSBcImFic3RhaW5cIjtcbiAgICAgICAgICB2YXIgcGFydHlDbGFzcyA9IFwicGFydHlWb3RlXCI7XG4gICAgICAgICAgaWYgKCh5ZXMgPiBhYnN0YWluKSYmKHllcyA+IG5vKSkge1xuICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiB5ZXNcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoKG5vID4gYWJzdGFpbikgJiYgKG5vID4geWVzKSkge1xuICAgICAgICAgICAgcGFydHlDbGFzcyArPSBcIiBub1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICgoYWJzdGFpbiA+IHllcykgJiYgKGFic3RhaW4gPiBubykpIHtcbiAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgYWJzdGFpblwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICgoeWVzID09IG5vKSkge1xuICAgICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIHRpZSB5blwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoeWVzPT1hYnN0YWluKSB7XG4gICAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgdGllIHlhXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChubz09YWJzdGFpbikge1xuICAgICAgICAgICAgICBwYXJ0eUNsYXNzICs9IFwiIHRpZSBuYVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHBhcnR5Q2xhc3MgKz0gXCIgdGllXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHllc0NvdW50ICs9IHllcztcbiAgICAgICAgICBub0NvdW50ICs9IG5vO1xuICAgICAgICAgIGFic3RhaW5Db3VudCArPSBhYnN0YWluO1xuICAgICAgICAgIHZhciBub2RlID0gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3BhcnR5Q2xhc3N9IGtleT17aX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPntwYXJ0eU5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt5ZXNDbGFzc30+PHNwYW4+e3llc308L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtub0NsYXNzfT48c3Bhbj57bm99PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YWJzdGFpbkNsYXNzfT48c3Bhbj57YWJzdGFpbn08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICAgIHBhcnR5Vm90ZU5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvdGFsQ2xhc3MgPSBcInBhcnR5Vm90ZSB0b3RhbCBcIjtcbiAgICAgICAgaWYgKHllc0NvdW50ID4gbm9Db3VudCkge1xuICAgICAgICAgIGlmICh5ZXNDb3VudCA+IGFic3RhaW5Db3VudCkge1xuICAgICAgICAgICAgdG90YWxDbGFzcyArPSBcIiB5ZXNcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b3RhbENsYXNzICs9IFwiIGFic3RhaW5cIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKG5vQ291bnQgPiBhYnN0YWluQ291bnQpIHtcbiAgICAgICAgICAgIHRvdGFsQ2xhc3MgKz0gXCIgbm9cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b3RhbENsYXNzICs9IFwiIGFic3RhaW5cIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvdGFsUm93ID0gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFydHlWb3RlIHRvdGFsXCIga2V5PVwidFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+VG90YWw8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwieWVzXCI+PHNwYW4+e3llc0NvdW50fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm9cIj48c3Bhbj57bm9Db3VudH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic3RhaW5cIj48c3Bhbj57YWJzdGFpbkNvdW50fTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgICAgcGFydHlWb3RlTm9kZXMucHVzaCh0b3RhbFJvdyk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmJpbGxJbmZvLnNwb25zb3IpIHtcbiAgICAgICAgICB2YXIgc3BvbnNvclByb2ZpbGUgPSBnZXRQb2xpdGljaWFuKHVuZGVmaW5lZCwgdGhpcy5wcm9wcy5iaWxsSW5mby5zcG9uc29yKTtcbiAgICAgICAgICB2YXIgaW1nVVJMID0gXCJ1cmwoJy9zdGF0aWMvaGVhZHNob3RzL1wiICsgc3BvbnNvclByb2ZpbGUuaW1ndXJsICsgXCInKVwiO1xuICAgICAgICAgIHZhciBzcG9uc29yQ2xhc3NTdHJpbmcgPSAnc3BvbnNvclByb2ZpbGUgJztcbiAgICAgICAgICB2YXIgaHJlZiA9ICcvIy9wcm9maWxlLycgKyBzcG9uc29yUHJvZmlsZS5pZDtcbiAgICAgICAgICBpZiAoIXNwb25zb3JQcm9maWxlLnBhcnR5X3NsdWcpIHtcbiAgICAgICAgICAgIHZhciBwYXJ0eU5hbWUgPSBzcG9uc29yUHJvZmlsZS5wYXJ0eV9uYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNwb25zb3JDbGFzc1N0cmluZyArPSBzcG9uc29yUHJvZmlsZS5wYXJ0eV9zbHVnO1xuICAgICAgICAgICAgdmFyIHBhcnR5TmFtZSA9IHNwb25zb3JQcm9maWxlLnBhcnR5X3NsdWc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNwb25zb3JDb21wb25lbnQgPSAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBzcG9uc29yXCI+XG4gICAgICAgICAgICAgIDxoND5CaWxsIFNwb25zb3I8L2g0PlxuICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e3Nwb25zb3JDbGFzc1N0cmluZ30gaHJlZj17aHJlZn0gPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tiYWNrZ3JvdW5kSW1hZ2U6IGltZ1VSTH19PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxoMz57c3BvbnNvclByb2ZpbGUubmFtZX08L2gzPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJpZGluZ1wiPntzcG9uc29yUHJvZmlsZS5yaWRpbmd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBhcnR5XCI+e3BhcnR5TmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BvbnNvckNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgcGFydHlWb3RlTm9kZXMgPSAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgcGFydHlWb3RlTm9kZXMgPSAnJztcbiAgICB9XG4gICAgdmFyIG9wZW5wYXJsaWFtZW50VVJMID0gXCIvL29wZW5wYXJsaWFtZW50LmNhL2JpbGxzL1wiICsgdGhpcy5wcm9wcy52b3RlLnNlc3Npb25faWQgKyBcIi9cIiArIHRoaXMucHJvcHMudm90ZS5udW1iZXIgKyBcIi9cIjtcbiAgICBzZXNzaW9uTnVtYmVycyA9IHRoaXMucHJvcHMudm90ZS5zZXNzaW9uX2lkLnNwbGl0KFwiLVwiKTtcbiAgICB2YXIgcGFybFVSTCA9IFwiaHR0cDovL3d3dy5wYXJsLmdjLmNhL0xFR0lTSW5mby9MQUFHLmFzcHg/bGFuZ3VhZ2U9RSZQYXJsPVwiICsgc2Vzc2lvbk51bWJlcnNbMF0gKyBcIiZTZXM9XCIgKyBzZXNzaW9uTnVtYmVyc1sxXTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2luZm9DbGFzc30+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgc3BhY2VyIGxlZnRcIj48L2Rpdj5cbiAgICAgICAgICB7c3BvbnNvckNvbXBvbmVudH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBwYXJ0eVZvdGVzXCI+XG4gICAgICAgICAgICA8aDQ+UGFydHkgVm90ZXM8L2g0PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJ0eVZvdGVzVGFibGVcIj5cbiAgICAgICAgICAgICAge3BhcnR5Vm90ZU5vZGVzfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wgbW9yZUJpbGxJbmZvXCI+XG4gICAgICAgICAgPGg0Pk1vcmUgSW5mb3JtYXRpb248L2g0PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8YSBocmVmPXtvcGVucGFybGlhbWVudFVSTH0gdGFyZ2V0PVwiX2JsYW5rXCI+dmlldyBiaWxsIG9uIG9wZW5wYXJsaWFtZW50LmNhIDxBcnJvd0ljb24gLz48L2E+XG4gICAgICAgICAgICA8YSBocmVmPXtwYXJsVVJMfSB0YXJnZXQ9XCJfYmxhbmtcIj52aWV3IHNlc3Npb24gb24gcGFybC5nYy5jYSA8QXJyb3dJY29uIC8+PC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHNwYWNlciByaWdodFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG52YXIgQXJyb3dJY29uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c3ZnIHZlcnNpb249XCIxLjFcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG4gICAgICAgICB2aWV3Qm94PVwiMCAwIDQwMCA0MDBcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xNjMuNSwzMzQuNWwtNDcuMS00Ny4xbDg3LjUtODcuNWwtODcuNS04Ny41bDQ3LjEtNDcuMUwyOTgsMjAwTDE2My41LDMzNC41elwiLz5cbiAgICAgIDwvc3ZnPlxuICAgICk7XG4gIH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gVm90ZVJvdzsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbnZhciBQdXJlUmVuZGVyTWl4aW4gPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtcHVyZS1yZW5kZXItbWl4aW4nKTtcbnZhciBTZWFyY2hTdGFjayA9IHJlcXVpcmUoJy4vU2VhcmNoU3RhY2suanMnKTtcbnZhciBTZXNzaW9uU2VsZWN0b3IgPSByZXF1aXJlKCcuL1Nlc3Npb25TZWxlY3Rvci5qcycpO1xuU2VhcmNoQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBtaXhpbnM6IFtQdXJlUmVuZGVyTWl4aW5dLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjbGFzc2VzID0gJ3NlYXJjaEJveCAnICsgdGhpcy5wcm9wcy5ib3g7IC8vdGVtcFxuICAgIHZhciBub3Njcm9sbENsYXNzZXMgPSAnc2VhcmNoQm94LW5vc2Nyb2xsICcgKyB0aGlzLnByb3BzLmJveDsgLy90ZW1wXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtub3Njcm9sbENsYXNzZXN9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30gb25TY3JvbGw9e3RoaXMucHJvcHMub25TZWFyY2hTY3JvbGwuYmluZChudWxsLCB0aGlzKX0gPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wTGlua3NcIj48YSBocmVmPVwiLyMvaW5mb1wiIGNsYXNzTmFtZT1cImluZm9cIj48L2E+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zaGF5cW4vcGFybGVcIiBjbGFzc05hbWU9XCJnaXRodWJcIj48L2E+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hGb3JtXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25TZWFyY2hDaGFuZ2V9IC8+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TZWFyY2g8L2J1dHRvbj5cbiAgICAgICAgICAgIDxzcGFuPmJ5IG5hbWUsIHJpZGluZywgb3IgcG9zdGFsIGNvZGU8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hDb250ZW50XCI+XG4gICAgICAgICAgICA8U2VhcmNoU3RhY2sgXG4gICAgICAgICAgICAgIGJveD17dGhpcy5wcm9wcy5ib3h9IFxuICAgICAgICAgICAgICBwb2xpdGljaWFucz17dGhpcy5wcm9wcy5wb2xpdGljaWFuTGlzdH0gXG4gICAgICAgICAgICAgIGN1cnJlbnRQcm9maWxlSUQ9e3RoaXMucHJvcHMuY3VycmVudFByb2ZpbGVJRH0gXG4gICAgICAgICAgICAgIGN1cnJlbnRQcm9maWxlSXNMb2FkaW5nPXt0aGlzLnByb3BzLmN1cnJlbnRQcm9maWxlSXNMb2FkaW5nfVxuICAgICAgICAgICAgICBzZWFyY2hpbmc9e3RoaXMucHJvcHMuc2VhcmNoLmlzU2VhcmNoaW5nfVxuICAgICAgICAgICAgICBzZXNzaW9uc0xpc3Q9e3RoaXMucHJvcHMuc2Vzc2lvbnNMaXN0fVxuICAgICAgICAgICAgICBjdXJyZW50U2Vzc2lvbnM9e3RoaXMucHJvcHMuc2Vzc2lvbnN9XG4gICAgICAgICAgICAgIHNlc3Npb25Ub2dnbGUgPSB7dGhpcy5wcm9wcy5zZXNzaW9uVG9nZ2xlfVxuICAgICAgICAgICAgICBleHBhbmRTZXNzaW9ucyA9IHt0aGlzLnByb3BzLmV4cGFuZFNlc3Npb25zfVxuICAgICAgICAgICAgICBleHBhbmRTdGF0ZSA9IHt0aGlzLnByb3BzLmV4cGFuZFN0YXRlfVxuICAgICAgICAgICAgICBnZXR0ZXJzID0ge3RoaXMucHJvcHMuZ2V0dGVyc30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gU2VhcmNoQm94OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG5cbnZhciBQdXJlUmVuZGVyTWl4aW4gPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtcHVyZS1yZW5kZXItbWl4aW4nKTtcbnZhciBTZWFyY2hTdGFjayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJTZWFyY2hTdGFja1wiLFxuICBtaXhpbnM6IFtQdXJlUmVuZGVyTWl4aW5dLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzU3RyaW5nID0gXCJzZWFyY2hTdGFja1wiO1xuICAgIHZhciBjdXJyZW50UHJvZmlsZUlEID0gdGhpcy5wcm9wcy5jdXJyZW50UHJvZmlsZUlEO1xuICAgIHZhciBjdXJyZW50UHJvZmlsZUlzTG9hZGluZyA9IHRoaXMucHJvcHMuY3VycmVudFByb2ZpbGVJc0xvYWRpbmc7XG4gICAgdmFyIHBvbGl0aWNpYW5Ob2RlcyA9IFtdO1xuICAgIHZhciBnZXRQb2xpdGljaWFuQnlJRCA9IHRoaXMucHJvcHMuZ2V0dGVyc1swXTtcbiAgICB2YXIgZ2V0UGFydHlCeUlEID0gdGhpcy5wcm9wcy5nZXR0ZXJzWzFdO1xuICAgIHZhciBnZXRSaWRpbmdCeUlEID0gdGhpcy5wcm9wcy5nZXR0ZXJzWzJdO1xuICAgIGlmICh0aGlzLnByb3BzLnBvbGl0aWNpYW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIHBvbGl0aWNpYW5Ob2RlcyA9IHRoaXMucHJvcHMucG9saXRpY2lhbnMubWFwKGZ1bmN0aW9uIChwb2xpdGljaWFuLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8UG9saXRpY2lhblJlc3VsdFxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBwb2xpdGljaWFuPXtwb2xpdGljaWFufVxuICAgICAgICAgICAgY3VycmVudFByb2ZpbGVJRD17Y3VycmVudFByb2ZpbGVJRH1cbiAgICAgICAgICAgIGN1cnJlbnRQcm9maWxlSXNMb2FkaW5nPXtjdXJyZW50UHJvZmlsZUlzTG9hZGluZ31cbiAgICAgICAgICAgIGdldHRlcnM9e3RoaXMucHJvcHMuZ2V0dGVyc31cbiAgICAgICAgICAgIGJveD17dGhpcy5wcm9wcy5ib3h9IC8+XG4gICAgICAgICk7XG4gICAgICB9LmJpbmQodGhpcykpOyAgXG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMucHJvcHMuc2VhcmNoaW5nKSB7XG4gICAgICB2YXIgbm9SZXN1bHRzTm9kZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBudWxsLCBcIk5PIFJFU1VMVFNcIikpO1xuICAgICAgcG9saXRpY2lhbk5vZGVzLnB1c2gobm9SZXN1bHRzTm9kZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHBsYWNlSG9sZGVyTmFtZXMgPSBbJ0pvaG4gQS4gTWNUZW1wJywgJ0pvaG4gRmFrZW5iYWtlcicsICdQaWVycmUgVGVtcGRlYXUnXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgIHZhciBlbXB0eU5vZGUgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7a2V5OiBpLCBjbGFzc05hbWU6IFwicGxhY2Vob2xkZXJcIiwgaHJlZjogXCIvIy9cIn0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBudWxsLCBwbGFjZUhvbGRlck5hbWVzW2klM10pLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcInBhcnR5XCJ9LCBcIlZBTlwiKSk7XG4gICAgICAgIHBvbGl0aWNpYW5Ob2Rlcy5wdXNoKGVtcHR5Tm9kZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NTdHJpbmd9PlxuICAgICAgICA8U2Vzc2lvblNlbGVjdG9yIFxuICAgICAgICAgc2Vzc2lvbnNMaXN0PXt0aGlzLnByb3BzLnNlc3Npb25zTGlzdH1cbiAgICAgICAgIGN1cnJlbnRTZXNzaW9ucz17dGhpcy5wcm9wcy5jdXJyZW50U2Vzc2lvbnN9XG4gICAgICAgICBzZXNzaW9uVG9nZ2xlID0ge3RoaXMucHJvcHMuc2Vzc2lvblRvZ2dsZX1cbiAgICAgICAgIGV4cGFuZFNlc3Npb25zID0ge3RoaXMucHJvcHMuZXhwYW5kU2Vzc2lvbnN9XG4gICAgICAgICAgZXhwYW5kU3RhdGUgPSB7dGhpcy5wcm9wcy5leHBhbmRTdGF0ZX0gLz5cbiAgICAgICAgPGgyPk1lbWJlcnMgb2YgUGFybGlhbWVudDxzcGFuIGNsYXNzTmFtZT1cImxlYWZcIj48L3NwYW4+PC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHRzXCI+XG4gICAgICAgICAge3BvbGl0aWNpYW5Ob2Rlc31cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxudmFyIFBvbGl0aWNpYW5SZXN1bHQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGdldFBhcnR5QnlJRCA9IHRoaXMucHJvcHMuZ2V0dGVyc1sxXTtcbiAgICB2YXIgcG9saXRpY2lhbiA9IHRoaXMucHJvcHMucG9saXRpY2lhbjtcbiAgICB2YXIgaGVhZHNob3QgPSBwb2xpdGljaWFuLmhlYWRzaG90LnNwbGl0KCcvJykucG9wKCk7XG4gICAgdmFyIGltZ1VSTCA9IFwidXJsKCcvc3RhdGljL2hlYWRzaG90cy9cIiArIGhlYWRzaG90ICsgXCInKVwiO1xuICAgIHZhciBjbGFzc1N0cmluZyA9ICdyZXN1bHQgJztcbiAgICB2YXIgbG9hZGVyID0gbnVsbDtcbiAgICBpZiAocG9saXRpY2lhbi5pZCA9PSB0aGlzLnByb3BzLmN1cnJlbnRQcm9maWxlSUQpIHtcbiAgICAgIGNsYXNzU3RyaW5nICs9ICdhY3RpdmUgJztcbiAgICAgIGlmICh0aGlzLnByb3BzLmN1cnJlbnRQcm9maWxlSXNMb2FkaW5nKSB7XG4gICAgICAgIGxvYWRlcj0gKDxkaXYgY2xhc3NOYW1lPVwibG9hZGVyIGxvYWRpbmdcIj48L2Rpdj4pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxvYWRlcj0gKDxkaXYgY2xhc3NOYW1lPVwibG9hZGVyIGNvbXBsZXRlXCI+PC9kaXY+KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKChwb2xpdGljaWFuLmlkID09IHRoaXMucHJvcHMuY3VycmVudFByb2ZpbGVJRCkmJih0aGlzLnByb3BzLmJveCA9PSAncHJvZmlsZScpKSB7XG4gICAgICB2YXIgaHJlZiA9ICcvIy8nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBocmVmID0gJy8jL3Byb2ZpbGUvJyArIHBvbGl0aWNpYW4uaWQ7XG4gICAgfVxuICAgIHZhciBwYXJ0eU5hbWUgPSBnZXRQYXJ0eUJ5SUQocG9saXRpY2lhbi5wYXJ0aWVzWzBdKTtcbiAgICBpZiAocG9saXRpY2lhbi5uYW1lLmxlbmd0aD4xOSkge1xuICAgICAgaWYgKHBvbGl0aWNpYW4ubmFtZS5sZW5ndGggPiAyMikge1xuICAgICAgICBjbGFzc1N0cmluZyArPSAnIHJlZHVjZS1sYXJnZSdcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjbGFzc1N0cmluZyArPSAnIHJlZHVjZS1tZWRpdW0nO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGEgY2xhc3NOYW1lPXtjbGFzc1N0cmluZ30gaHJlZj17aHJlZn0ga2V5PXt0aGlzLnByb3BzLmtleX0gPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRzaG90XCIgc3R5bGU9e3tiYWNrZ3JvdW5kSW1hZ2U6IGltZ1VSTH19PjwvZGl2PlxuICAgICAgICA8aDM+e3BvbGl0aWNpYW4ubmFtZX08L2gzPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwYXJ0eVwiPntwYXJ0eU5hbWV9PC9zcGFuPlxuICAgICAgICB7bG9hZGVyfVxuICAgICAgPC9hPlxuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VhcmNoU3RhY2s7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cblNlc3Npb25CdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNsYXNzTmFtZSA9IFwic2Vzc2lvbkJ1dHRvblwiO1xuXHRcdHZhciBzZXNzaW9uTnVtYmVyID0gdGhpcy5wcm9wcy5zZXNzaW9uTnVtYmVyO1xuXHRcdGZvciAoaT0wO2k8dGhpcy5wcm9wcy5jdXJyZW50U2Vzc2lvbnMubGVuZ3RoO2krKykge1xuXHRcdFx0aWYgKHNlc3Npb25OdW1iZXIgPT0gdGhpcy5wcm9wcy5jdXJyZW50U2Vzc2lvbnNbaV0pIHtcblx0XHRcdFx0Y2xhc3NOYW1lICs9IFwiIGFjdGl2ZVwiO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGEgb25DbGljaz17dGhpcy5wcm9wcy5zZXNzaW9uVG9nZ2xlLmJpbmQobnVsbCwgc2Vzc2lvbk51bWJlcil9PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBrZXk9e3RoaXMucHJvcHMua2V5fT5cblx0XHRcdFx0XHR7c2Vzc2lvbk51bWJlcn1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2E+XG5cdFx0KTtcblx0fVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFNlc3Npb25CdXR0b247IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBTZXNzaW9uQnV0dG9uID0gcmVxdWlyZSgnLi9TZXNzaW9uQnV0dG9uLmpzJyk7XG5TZXNzaW9uU2VsZWN0b3IgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlc3Npb25zTGlzdCA9IHRoaXMucHJvcHMuc2Vzc2lvbnNMaXN0O1xuXHRcdHZhciBjdXJyZW50U2Vzc2lvbnMgPSB0aGlzLnByb3BzLmN1cnJlbnRTZXNzaW9ucztcblx0XHR2YXIgc2Vzc2lvbkJ1dHRvbnMgPSBbXTtcblx0XHR2YXIgc2Vzc2lvblRvZ2dsZSA9IHRoaXMucHJvcHMuc2Vzc2lvblRvZ2dsZTtcblx0XHR2YXIga2V5ID0gMDtcblx0XHRmb3IodmFyIHNlc3Npb25OdW1iZXIgaW4gc2Vzc2lvbnNMaXN0KSB7XG5cdFx0XHR2YXIgc2Vzc2lvbiA9IDxTZXNzaW9uQnV0dG9uIHNlc3Npb25OdW1iZXI9e3Nlc3Npb25OdW1iZXJ9XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRTZXNzaW9ucz17Y3VycmVudFNlc3Npb25zfVxuXHRcdFx0XHRcdFx0XHRzZXNzaW9uVG9nZ2xlPXtzZXNzaW9uVG9nZ2xlfSBcblx0XHRcdFx0XHRcdFx0a2V5PXtrZXl9IC8+XG5cdFx0XHRzZXNzaW9uQnV0dG9ucy5wdXNoKHNlc3Npb24pO1xuXHRcdFx0a2V5Kys7XG5cdFx0fVxuXHRcdHZhciBjbGFzc05hbWUgPSBcInNlc3Npb25zU2VsZWN0b3IgXCIgKyB0aGlzLnByb3BzLmV4cGFuZFN0YXRlO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cblx0XHRcdFx0PGgyPlNlc3Npb25zPC9oMj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+e3Nlc3Npb25CdXR0b25zLnJldmVyc2UoKX08L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJleHBhbmRTZXNzaW9uc1wiIG9uQ2xpY2s9e3RoaXMucHJvcHMuZXhwYW5kU2Vzc2lvbnN9PjwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFNlc3Npb25TZWxlY3RvcjsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxudmFyIEJpbGxUZXh0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBwcmVwVGV4dDogZnVuY3Rpb24odGV4dCkge1xuICAgIHRleHQgPSB0ZXh0LnRyaW0oKTtcbiAgICByZXR1cm4gKHRleHQubGVuZ3RoPjA/JzxwPicrdGV4dC5yZXBsYWNlKC9bXFxyXFxuXSsvLCc8L3A+PHA+JykrJzwvcD4nOm51bGwpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYmlsbFRleHQgPSB0aGlzLnByZXBUZXh0KHRoaXMucHJvcHMuYmlsbFRleHQpO1xuICAgIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiaWxsVGV4dFwiPlxuICAgICAge2JpbGxUZXh0fVxuICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbGxUZXh0OyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG52YXIgQmlsbFRleHQgPSByZXF1aXJlKCcuL0JpbGxUZXh0LmpzJyk7XG52YXIgVGV4dEJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NlcyA9ICdiaWxsVGV4dEJveCAnICsgdGhpcy5wcm9wcy5ib3g7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT48ZGl2IGNsYXNzTmFtZT1cImNsb3NlQ29udGFpbmVyXCI+PGEgaHJlZj1cIi8jL1wiPjwvYT48L2Rpdj48QmlsbFRleHQgYmlsbFRleHQ9e3RoaXMucHJvcHMuYmlsbFRleHR9IC8+PC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dEJveDsiLCJ2YXIgQXJyb3dJY29uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c3ZnIHZlcnNpb249XCIxLjFcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG4gICAgICAgICB2aWV3Qm94PVwiMCAwIDQwMCA0MDBcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xNjMuNSwzMzQuNWwtNDcuMS00Ny4xbDg3LjUtODcuNWwtODcuNS04Ny41bDQ3LjEtNDcuMUwyOTgsMjAwTDE2My41LDMzNC41elwiLz5cbiAgICAgIDwvc3ZnPlxuICAgICk7XG4gIH1cbn0pOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG5pZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJykgeyAvLyBmYWlsIGdyYWNlZnVsbHlcbiAgdHJhY2tlciA9IGdhLmNyZWF0ZSgnVUEtNjc4MDQ0NTEtMScsICd2b3Rlcy5tcCcpO1xufVxuZnVuY3Rpb24gZ2FUcmFjayhwYXRoLCB0aXRsZSkge1xuICBpZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJykgeyAvLyBmYWlsIGdyYWNlZnVsbHlcbiAgICBpZiAocGF0aD09XCJcIikge1xuICAgICAgcGF0aCA9IFwiL1wiO1xuICAgIH1cbiAgICBnYSgnc2V0JywgeyBwYWdlOiBwYXRoLCB0aXRsZTogdGl0bGUgfSk7XG4gICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcbiAgfVxufVxuXG4vL01peGluc1xuXG4vLyBFbGVtZW50c1xudmFyIEFycm93SWNvbiA9IHJlcXVpcmUoJy4vZWxlbWVudHMvQXJyb3dJY29uLmpzJyk7XG5cbi8vIEJveGVzXG52YXIgU2VhcmNoQm94ID0gcmVxdWlyZSgnLi9ib3hlcy9zZWFyY2gvU2VhcmNoQm94LmpzJyk7XG52YXIgUHJvZmlsZUJveCA9IHJlcXVpcmUoJy4vYm94ZXMvcHJvZmlsZS9Qcm9maWxlQm94LmpzJyk7XG52YXIgSW5mb0JveCA9IHJlcXVpcmUoJy4vYm94ZXMvaW5mby9JbmZvQm94LmpzJyk7XG52YXIgVGV4dEJveCA9IHJlcXVpcmUoJy4vYm94ZXMvdGV4dC9UZXh0Qm94LmpzJyk7XG5cblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAvLyAqKioqU1RBVEUgRlVOQ1RJT05TKioqKiAvL1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcHBTdGF0ZSA9IHRoaXMuZ2V0QXBwU3RhdGUoKTtcbiAgICByZXR1cm4ge1xuICAgICAgYXBwOiBhcHBTdGF0ZSxcbiAgICB9O1xuICB9LFxuXG4gIGdldEFwcFN0YXRlOiBmdW5jdGlvbihwcmV2QXBwU3RhdGUpIHtcbiAgICAvLyBkZWZhdWx0IHN0YXRlIG9uIGluaXRpYXRpb25cbiAgICB2YXIgZGVmYXVsdEFwcFN0YXRlID0geyBcbiAgICAgIGJveDogJ3NlYXJjaCcsXG4gICAgICBwb2xpdGljaWFuTGlzdDogW10sXG4gICAgICBwYXJ0aWVzTGlzdDoge30sXG4gICAgICByaWRpbmdzTGlzdDoge30sXG4gICAgICBzZXNzaW9uc0xpc3Q6IHt9LFxuICAgICAgc2Vzc2lvbnM6IFsnNDEtMicsICc0MS0xJ10sXG4gICAgICBleHBhbmRTdGF0ZTogdHJ1ZSxcbiAgICAgIHNlYXJjaDoge1xuICAgICAgICBtYXg6IDEwLFxuICAgICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICAgIGlzU2VhcmNoaW5nOiBmYWxzZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6ICcnLFxuICAgICAgICByaWRpbmc6ICcnLFxuICAgICAgfSxcbiAgICAgIHByb2ZpbGU6IHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHZvdGVzOiB7fSxcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB2b3RlOiB7XG4gICAgICAgIGlkOiAwLFxuICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgc3BvbnNvcjogMCxcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6ICcnLFxuICAgICAgfSxcbiAgICAgIGJpbGw6IHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIGRhdGE6IHt9LFxuICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgfVxuICAgIH07XG4gICAgaWYgKHR5cGVvZihwcmV2QXBwU3RhdGUpPT09J3VuZGVmaW5lZCcpIHByZXZBcHBTdGF0ZSA9IGRlZmF1bHRBcHBTdGF0ZTtcbiAgICAvLyBlZGl0IHN0YXRlIGFjY29yZGluZyB0byBVUkwgdmFsdWVzXG4gICAgdmFyIHVybEhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSk7XG4gICAgdmFyIG5ld0FwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHByZXZBcHBTdGF0ZSk7XG4gICAgdmFyIHVybFBhcmFtZXRlcnMgPSB1cmxIYXNoLnNwbGl0KCcvJykuZmlsdGVyKGZ1bmN0aW9uKG4peyByZXR1cm4gbiAhPSAnJyB9KTtcbiAgICBuZXdBcHBTdGF0ZS5ib3ggPSAnc2VhcmNoJztcbiAgICAvLyBpZiBwcm9maWxlIG9yIGJpbGxcbiAgICBpZiAodXJsUGFyYW1ldGVycy5sZW5ndGggPj0gMikge1xuICAgICAgaWYgKCh1cmxQYXJhbWV0ZXJzWzBdID09ICdwcm9maWxlJykgJiYgIWlzTmFOKHVybFBhcmFtZXRlcnNbMV0pKSB7XG4gICAgICAgIG5ld0FwcFN0YXRlLmJveCA9ICdwcm9maWxlJztcbiAgICAgICAgbmV3QXBwU3RhdGUucHJvZmlsZS5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICBuZXdBcHBTdGF0ZS5wcm9maWxlLmlkID0gdXJsUGFyYW1ldGVyc1sxXTtcbiAgICAgICAgbmV3QXBwU3RhdGUucHJvZmlsZS52b3RlcyA9IFtdO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoKHVybFBhcmFtZXRlcnNbMF0gPT0gJ2JpbGwnKSAmJiAhaXNOYU4odXJsUGFyYW1ldGVyc1sxXSkpIHtcbiAgICAgICAgbmV3QXBwU3RhdGUuYm94ID0gJ2JpbGwnO1xuICAgICAgICBuZXdBcHBTdGF0ZS5iaWxsLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIG5ld0FwcFN0YXRlLmJpbGwuaWQgPSB1cmxQYXJhbWV0ZXJzWzFdO1xuICAgICAgICBuZXdBcHBTdGF0ZS5iaWxsLmRhdGEgPSB7fTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIHByb2ZpbGUgYW5kIHZvdGUgc3BlY2lmaWVkXG4gICAgICBpZiAodXJsUGFyYW1ldGVycy5sZW5ndGggPj0gNCkge1xuICAgICAgICBpZiAoKHVybFBhcmFtZXRlcnNbMl0gPT0gJ3ZvdGUnKSAmJiAhaXNOYU4odXJsUGFyYW1ldGVyc1szXSkpIHtcbiAgICAgICAgICBuZXdBcHBTdGF0ZS52b3RlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgbmV3QXBwU3RhdGUudm90ZS5pZCA9IHVybFBhcmFtZXRlcnNbM107XG4gICAgICAgICAgbmV3QXBwU3RhdGUudm90ZS5kYXRhID0ge307XG4gICAgICAgICAgbmV3QXBwU3RhdGUudm90ZS5zcG9uc29yID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG5ld0FwcFN0YXRlLnByb2ZpbGUuaWQgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gbmV3QXBwU3RhdGU7XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZ2V0SW5pdGlhbERhdGEoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5hcHAucHJvZmlsZS5pZCkge1xuICAgICAgdGhpcy5nZXRQb2xpdGljaWFuVm90ZXModGhpcy5zdGF0ZS5hcHAucHJvZmlsZS5pZCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN0YXRlLmFwcC52b3RlLmlkKSB7XG4gICAgICB0aGlzLmdldFZvdGVJbmZvcm1hdGlvbih0aGlzLnN0YXRlLmFwcC52b3RlLmlkKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgY3VycmVudEFwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHRoaXMuc3RhdGUuYXBwKTtcbiAgICAgIHRoaXMudXBkYXRlQXBwU3RhdGUoY3VycmVudEFwcFN0YXRlKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9LFxuXG4gIGNsb25lQXBwU3RhdGU6IGZ1bmN0aW9uKGFwcFN0YXRlKSB7XG4gICAgcmV0dXJuIChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFwcFN0YXRlKSkpO1xuICB9LFxuXG4gIHVwZGF0ZUFwcFN0YXRlOiBmdW5jdGlvbihjdXJyZW50QXBwU3RhdGUpIHtcbiAgICB2YXIgbmV4dEFwcFN0YXRlID0gdGhpcy5nZXRBcHBTdGF0ZShjdXJyZW50QXBwU3RhdGUpO1xuICAgIGlmIChuZXh0QXBwU3RhdGUucHJvZmlsZS5pZCAmJiAobmV4dEFwcFN0YXRlLnByb2ZpbGUuaWQgIT0gY3VycmVudEFwcFN0YXRlLnByb2ZpbGUuaWQpKSB7XG4gICAgICB0aGlzLmdldFBvbGl0aWNpYW5Wb3RlcyhuZXh0QXBwU3RhdGUucHJvZmlsZS5pZCk7XG4gICAgfVxuICAgIGlmIChuZXh0QXBwU3RhdGUudm90ZS5pZCAmJiAobmV4dEFwcFN0YXRlLnZvdGUuaWQgIT0gY3VycmVudEFwcFN0YXRlLnZvdGUuaWQpKSB7XG4gICAgICB0aGlzLmdldFZvdGVJbmZvcm1hdGlvbihuZXh0QXBwU3RhdGUudm90ZS5pZCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe2FwcDogbmV4dEFwcFN0YXRlfSk7XG4gIH0sXG5cbiAgLy8gKioqKkRBVEEgQ09MTEVDVElPTiBGVU5DVElPTlMqKioqIC8vXG5cbiAgZ2V0SW5pdGlhbERhdGE6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0eXBlb2YoU3RvcmFnZSkgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5mZXRjaERhdGFGcm9tU2VydmVyKCcvaW5pdGlhbGl6ZScsIHRoaXMuc2V0SW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vaWYgKHR5cGVvZihsb2NhbFN0b3JhZ2UuaW5pdGlhbERhdGEpICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIC8vICB0aGlzLnNldEluaXRpYWxEYXRhKGxvY2FsU3RvcmFnZS5pbml0aWFsRGF0YSk7XG4gICAgICAvL31cbiAgICAgIC8vZWxzZSB7XG4gICAgICAgIHRoaXMuZmV0Y2hEYXRhRnJvbVNlcnZlcignL2luaXRpYWxpemUnLCB0aGlzLnNldEluaXRpYWxEYXRhKTtcbiAgICAgIC8vfVxuICAgIH1cbiAgfSxcblxuICBzZXRJbml0aWFsRGF0YTogZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmICh0eXBlb2YoU3RvcmFnZSkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmICh0eXBlb2YobG9jYWxTdG9yYWdlLmluaXRpYWxEYXRhKSA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5pbml0aWFsRGF0YSA9IGRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBwYXJzZWREYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBhcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZSh0aGlzLnN0YXRlLmFwcCk7XG4gICAgICBhcHBTdGF0ZS5wb2xpdGljaWFuTGlzdCA9IHBhcnNlZERhdGFbJ3BvbGl0aWNpYW5zJ107XG4gICAgICBhcHBTdGF0ZS5yaWRpbmdzTGlzdCA9IHBhcnNlZERhdGFbJ3JpZGluZ3MnXTtcbiAgICAgIGFwcFN0YXRlLnBhcnRpZXNMaXN0ID0gcGFyc2VkRGF0YVsncGFydGllcyddO1xuICAgICAgYXBwU3RhdGUuc2Vzc2lvbnNMaXN0ID0gcGFyc2VkRGF0YVsnc2Vzc2lvbnMnXTtcbiAgICAgIGFwcFN0YXRlLnNlYXJjaC5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNldFN0YXRlKHthcHA6IGFwcFN0YXRlfSk7XG4gIH0sXG5cbiAgZ2V0UG9saXRpY2lhblZvdGVzOiBmdW5jdGlvbihpZCkge1xuICAgIHRoaXMuZmV0Y2hEYXRhRnJvbVNlcnZlcignL3ZvdGVzLycgKyBpZCwgdGhpcy5zZXRQb2xpdGljaWFuVm90ZXMpO1xuICB9LFxuXG4gIHNldFBvbGl0aWNpYW5Wb3RlczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBwYXJzZWREYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBhcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZSh0aGlzLnN0YXRlLmFwcCk7XG4gICAgICBhcHBTdGF0ZS5wcm9maWxlLnZvdGVzID0gcGFyc2VkRGF0YVsndm90ZXMnXTtcbiAgICAgIGFwcFN0YXRlLnByb2ZpbGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YXBwOiBhcHBTdGF0ZX0pO1xuICB9LFxuXG4gIGdldFZvdGVJbmZvcm1hdGlvbjogZnVuY3Rpb24oaWQpIHtcbiAgICB0aGlzLmZldGNoRGF0YUZyb21TZXJ2ZXIoJy92b3RlLycgKyBpZCwgdGhpcy5zZXRWb3RlSW5mb3JtYXRpb24pO1xuICB9LFxuXG4gIHNldFZvdGVJbmZvcm1hdGlvbjogZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBwYXJzZWREYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBhcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZSh0aGlzLnN0YXRlLmFwcCk7XG4gICAgICBhcHBTdGF0ZS52b3RlLmRhdGEgPSBwYXJzZWREYXRhWyd2b3RlcyddO1xuICAgICAgYXBwU3RhdGUudm90ZS5kYXRhID0gcGFyc2VkRGF0YVsndm90ZXMnXTtcbiAgICAgIGFwcFN0YXRlLnZvdGUuc3BvbnNvciA9IHBhcnNlZERhdGFbJ3Nwb25zb3InXTtcbiAgICAgIGFwcFN0YXRlLnZvdGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YXBwOiBhcHBTdGF0ZX0pO1xuICB9LFxuXG4gIGZldGNoRGF0YUZyb21TZXJ2ZXI6IGZ1bmN0aW9uKHBhdGgsIHNldHRlciwgd2lsbFJldHVybikge1xuICAgIGlmICh0eXBlb2Yod2lsbFJldHVybik9PT0ndW5kZWZpbmVkJykgd2lsbFJldHVybiA9IGZhbHNlO1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgcmVxdWVzdC5vcGVuKCdHRVQnLCBwYXRoLCB0cnVlKTtcbiAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICBzZXR0ZXIocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgZmV0Y2hpbmcgZGF0YSBmcm9tIHNlcnZlclwiKVxuICAgICAgfVxuICAgIH1cbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciByZXF1ZXN0aW5nIGRhdGEgZnJvbSBzZXJ2ZXJcIilcbiAgICB9O1xuICAgIHJlcXVlc3Quc2VuZCgpO1xuICB9LFxuXG4gIC8vICoqKipTRUFSQ0gvRklMVEVSIEZVTkNUSU9OUyoqKiogLy9cblxuICBnZXRTZWFyY2hSaWRpbmc6IGZ1bmN0aW9uKHNlYXJjaFZhbHVlKSB7XG4gICAgc2VhcmNoVmFsdWUgPSBzZWFyY2hWYWx1ZS5yZXBsYWNlKC9cXHMrL2csICcnKTtcbiAgICBzZWFyY2hWYWx1ZSA9IHNlYXJjaFZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgdmFyIHBvc3RhbFVSTCA9ICdodHRwczovL3JlcHJlc2VudC5vcGVubm9ydGguY2EvcG9zdGNvZGVzLycgKyBzZWFyY2hWYWx1ZSArICcvP3NldHM9ZmVkZXJhbC1lbGVjdG9yYWwtZGlzdHJpY3RzJztcbiAgICB0aGlzLmZldGNoRGF0YUZyb21TZXJ2ZXIocG9zdGFsVVJMLCB0aGlzLnNldFNlYXJjaFJpZGluZylcbiAgfSxcblxuICBzZXRTZWFyY2hSaWRpbmc6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgYXBwU3RhdGUuc2VhcmNoLnJpZGluZyA9IHBhcnNlZERhdGFbXCJib3VuZGFyaWVzX2NvbmNvcmRhbmNlXCJdWzBdW1wibmFtZVwiXTtcbiAgICB0aGlzLnNldFN0YXRlKHthcHA6IGFwcFN0YXRlfSk7XG4gIH0sXG5cbiAgb25TZWFyY2hDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSBtYXggaXMgZ3JlYXRlciB0aGFuIHRoZSBudW1iZXIgb2YgcmVzdWx0cyAtIGlmIHNvLCByZWR1Y2UgaXRcbiAgICB2YXIgbWF4ID0gdGhpcy5zdGF0ZS5hcHAuc2VhcmNoLm1heDtcbiAgICB2YXIgbnVtID0gdGhpcy5maWx0ZXJQb2xpdGljaWFucygpLmxlbmd0aDtcbiAgICBpZiAobnVtIDwgbWF4KSB7XG4gICAgICBtYXggPSBudW07XG4gICAgICBpZiAobWF4IDwgMTApIHtcbiAgICAgICAgbWF4ID0gMTA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNlYXJjaFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuXG4gICAgLy8gcG9zdGFsIGNvZGUgdGVzdFxuICAgIHZhciBwb3N0YWxSZWdFeCA9IG5ldyBSZWdFeHAoXCJeW0FCQ0VHSEpLTE1OUFJTVFZYWWFiY2VnaGprbG1ucHJzdHZ4eV17MX1cXFxcZHsxfVtBLVphLXpdezF9ICpcXFxcZHsxfVtBLVphLXpdezF9XFxcXGR7MX0kXCIsIFwiaVwiKTtcbiAgICBpZiAocG9zdGFsUmVnRXgudGVzdChzZWFyY2hWYWx1ZSkpIHtcbiAgICAgIHRoaXMuZ2V0U2VhcmNoUmlkaW5nKHNlYXJjaFZhbHVlKTtcbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlLCBub3JtYWwgc3RhdGUgY2hhbmdlXG4gICAgZWxzZSB7XG4gICAgICBhcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZSh0aGlzLnN0YXRlLmFwcCk7XG4gICAgICBpZiAoc2VhcmNoVmFsdWUgPT0gJycpIHtcbiAgICAgICAgYXBwU3RhdGUuc2VhcmNoLmlzU2VhcmNoaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXBwU3RhdGUuc2VhcmNoLmlzU2VhcmNoaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGFwcFN0YXRlLnNlYXJjaC5zZWFyY2hWYWx1ZSA9IHNlYXJjaFZhbHVlO1xuICAgICAgYXBwU3RhdGUuc2VhcmNoLm1heCA9IG1heDtcbiAgICAgIGFwcFN0YXRlLnNlYXJjaC5yaWRpbmcgPSAnJztcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2FwcDogYXBwU3RhdGV9KTtcbiAgICB9XG4gIH0sXG4gIG9uU2VhcmNoU2Nyb2xsOiBmdW5jdGlvbih0aGluZ29uZSwgdGhpbmd0d28pIHtcbiAgICB2YXIgc2Nyb2xsVG9wID0gdGhpbmdvbmUuZ2V0RE9NTm9kZSgpLnNjcm9sbFRvcDtcbiAgICB2YXIgaGVpZ2h0ID0gdGhpbmdvbmUuZ2V0RE9NTm9kZSgpLnNjcm9sbEhlaWdodDtcbiAgICB2YXIgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB2YXIgbWF4ID0gdGhpcy5zdGF0ZS5hcHAuc2VhcmNoLm1heDtcbiAgICBpZiAoKGggKyBzY3JvbGxUb3AgKyAxMDApID4gaGVpZ2h0KSB7XG4gICAgICB2YXIgbnVtID0gdGhpcy5maWx0ZXJQb2xpdGljaWFucygpLmxlbmd0aDtcbiAgICAgIGlmIChtYXggPCBudW0pIHtcbiAgICAgICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgICAgIGFwcFN0YXRlLnNlYXJjaC5tYXggPSBtYXggKyAxMDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YXBwIDogYXBwU3RhdGV9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgb25CaWxsU2VhcmNoQ2hhbmdlOiBmdW5jdGlvbihldmVudCkge1xuICAgIGFwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHRoaXMuc3RhdGUuYXBwKTtcbiAgICAgIGFwcFN0YXRlLnZvdGUuc2VhcmNoVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7YXBwOiBhcHBTdGF0ZX0pO1xuICB9LFxuXG4gIGZpbHRlclBvbGl0aWNpYW5zOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZmlsdGVyZWRMaXN0ID0gdGhpcy5zdGF0ZS5hcHAucG9saXRpY2lhbkxpc3QuZmlsdGVyKGZ1bmN0aW9uIChwb2wpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9sLnNlc3Npb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAocG9sLnNlc3Npb25zW2ldID09IHRoaXMuc3RhdGUuYXBwLnNlc3Npb25zW2pdKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIGlmICh0aGlzLnN0YXRlLmFwcC5zZWFyY2guaXNTZWFyY2hpbmcgJiYgdGhpcy5zdGF0ZS5hcHAuc2VhcmNoLnNlYXJjaFZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5hcHAuc2VhcmNoLnJpZGluZyAhPSAnJykge1xuICAgICAgICB2YXIgc2VhcmNoUmlkaW5nID0gdGhpcy5zdGF0ZS5hcHAuc2VhcmNoLnJpZGluZy5yZXBsYWNlKC9cXFcvZywgXCJcIik7XG4gICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAodGhpcy5zdGF0ZS5hcHAuc2VhcmNoLnJpZGluZy5yZXBsYWNlKC9cXFcvZywgXCJcIiksIFwiaVwiKTtcbiAgICAgICAgdmFyIGZpbHRlcmVkTGlzdCA9IGZpbHRlcmVkTGlzdC5maWx0ZXIoZnVuY3Rpb24gKHBvbCkge1xuICAgICAgICAgIHBvbC5yaWRpbmcgPSB0aGlzLnN0YXRlLmFwcC5yaWRpbmdzTGlzdFtwb2wucmlkaW5nc1swXV0ubmFtZS5yZXBsYWNlKC9cXFcvZywgXCJcIik7XG4gICAgICAgICAgcmV0dXJuIHBvbC5yaWRpbmcuc2VhcmNoKHJlZ2V4KSA+IC0xO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAodGhpcy5zdGF0ZS5hcHAuc2VhcmNoLnNlYXJjaFZhbHVlLCBcImlcIik7XG4gICAgICAgIHZhciBmaWx0ZXJlZExpc3QgPSBmaWx0ZXJlZExpc3QuZmlsdGVyKGZ1bmN0aW9uIChwb2wpIHtcbiAgICAgICAgICBwb2wucGFydHlOYW1lID0gdGhpcy5zdGF0ZS5hcHAucGFydGllc0xpc3RbcG9sLnBhcnRpZXNbMF1dLm5hbWU7XG4gICAgICAgICAgcG9sLnBhcnR5U2x1ZyA9IHRoaXMuc3RhdGUuYXBwLnBhcnRpZXNMaXN0W3BvbC5wYXJ0aWVzWzBdXS5zbHVnO1xuICAgICAgICAgIHBvbC5yaWRpbmcgPSB0aGlzLnN0YXRlLmFwcC5yaWRpbmdzTGlzdFtwb2wucmlkaW5nc1swXV0ubmFtZTtcbiAgICAgICAgICByZXR1cm4gcG9sLm5hbWUuc2VhcmNoKHJlZ2V4KSA+IC0xIHx8IHBvbC5wYXJ0eU5hbWUuc2VhcmNoKHJlZ2V4KSA+IC0xIHx8IHBvbC5wYXJ0eVNsdWcuc2VhcmNoKHJlZ2V4KSA+IC0xIHx8IHBvbC5yaWRpbmcuc2VhcmNoKHJlZ2V4KSA+IC0xICB8fCBwb2wucmlkaW5nLnNlYXJjaChyZWdleCkgPiAtMTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgIH0gIFxuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyZWRMaXN0O1xuICB9LFxuICBmaWx0ZXJWb3RlczogZnVuY3Rpb24oKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuc3RhdGUuYXBwLnByb2ZpbGUudm90ZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBzZXNzaW9ucyA9IHRoaXMuc3RhdGUuYXBwLnNlc3Npb25zO1xuICAgICAgdmFyIGZpbHRlcmVkVm90ZXNCeVNlc3Npb24gPSB0aGlzLnN0YXRlLmFwcC5wcm9maWxlLnZvdGVzLmZpbHRlcihmdW5jdGlvbiAodm90ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlc3Npb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHZvdGUuc2Vzc2lvbl9pZCA9PSBzZXNzaW9uc1tpXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5hcHAudm90ZS5zZWFyY2hWYWx1ZSkge1xuICAgICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKHRoaXMuc3RhdGUuYXBwLnZvdGUuc2VhcmNoVmFsdWUsIFwiaVwiKTtcbiAgICAgICAgdmFyIHZvdGVzID0gZmlsdGVyZWRWb3Rlc0J5U2Vzc2lvbi5maWx0ZXIoZnVuY3Rpb24gKHZvdGUpIHtcbiAgICAgICAgICByZXR1cm4gdm90ZS5uYW1lX2VuLnNlYXJjaChyZWdleCkgPiAtMSB8fCB2b3RlLm51bWJlci5zZWFyY2gocmVnZXgpID4gLTEgfHwgdm90ZS5zaG9ydF90aXRsZV9lbi5zZWFyY2gocmVnZXgpID4gLTE7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciB2b3RlcyA9IGZpbHRlcmVkVm90ZXNCeVNlc3Npb247XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdm90ZXMgPSB0aGlzLnN0YXRlLmFwcC5wcm9maWxlLnZvdGVzO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdm90ZXM7XG4gIH0sXG5cbiAgc2Vzc2lvblRvZ2dsZTogZnVuY3Rpb24oc2Vzc2lvbk51bWJlcikge1xuICAgIHZhciBuZXdTZXNzaW9ucyA9IFtdO1xuICAgIHZhciAkaW5BcnJheSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnN0YXRlLmFwcC5zZXNzaW9ucy5sZW5ndGggPT0gMSkge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuYXBwLnNlc3Npb25zWzBdID09IHNlc3Npb25OdW1iZXIpIHtcbiAgICAgICAgbmV3U2Vzc2lvbnMgPSBbc2Vzc2lvbk51bWJlcl07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbmV3U2Vzc2lvbnMucHVzaCh0aGlzLnN0YXRlLmFwcC5zZXNzaW9uc1swXSk7XG4gICAgICAgIG5ld1Nlc3Npb25zLnB1c2goc2Vzc2lvbk51bWJlcik7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZm9yIChpPTA7aTx0aGlzLnN0YXRlLmFwcC5zZXNzaW9ucy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFwcC5zZXNzaW9uc1tpXSE9c2Vzc2lvbk51bWJlcikge1xuICAgICAgICAgIG5ld1Nlc3Npb25zLnB1c2godGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICRpbkFycmF5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCEkaW5BcnJheSkge1xuICAgICAgICBuZXdTZXNzaW9ucy5wdXNoKHNlc3Npb25OdW1iZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICBhcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZSh0aGlzLnN0YXRlLmFwcCk7XG4gICAgICBhcHBTdGF0ZS5zZXNzaW9ucyA9IG5ld1Nlc3Npb25zO1xuICAgIHRoaXMuc2V0U3RhdGUoe2FwcDogYXBwU3RhdGV9KTtcbiAgfSxcblxuICBleHBhbmRTZXNzaW9uczogZnVuY3Rpb24gKCkge1xuICAgIGFwcFN0YXRlID0gdGhpcy5jbG9uZUFwcFN0YXRlKHRoaXMuc3RhdGUuYXBwKTtcbiAgICAgIGFwcFN0YXRlLmV4cGFuZFN0YXRlID0gIXRoaXMuc3RhdGUuYXBwLmV4cGFuZFN0YXRlO1xuICAgIHRoaXMuc2V0U3RhdGUoe2FwcDogYXBwU3RhdGV9KTtcbiAgfSxcblxuICBnZXRQb2xpdGljaWFuQnlJRDogZnVuY3Rpb24oaWQpIHtcbiAgICBpZiAoaWQpIHtcbiAgICAgIGZvciAoaT0wO2k8dGhpcy5zdGF0ZS5hcHAucG9saXRpY2lhbkxpc3QubGVuZ3RoO2krKykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hcHAucG9saXRpY2lhbkxpc3RbaV0uaWQgPT0gaWQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5hcHAucG9saXRpY2lhbkxpc3RbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBnZXRQYXJ0eUJ5SUQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgaWYgKGlkKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5hcHAucGFydGllc0xpc3RbaWRdLnNsdWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYXBwLnBhcnRpZXNMaXN0W2lkXS5zbHVnO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmFwcC5wYXJ0aWVzTGlzdFtpZF0ubmFtZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBnZXRSaWRpbmdCeUlEOiBmdW5jdGlvbihpZCkge1xuICAgIGlmIChpZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYXBwLnJpZGluZ3NMaXN0W2lkXS5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbG9hZGluZyA9ICh0aGlzLnN0YXRlLmFwcC52b3RlLmlzTG9hZGluZykgPyBcImxvYWRpbmdcIiA6IFwibG9hZGVkXCI7XG4gICAgdmFyIGZpbHRlcmVkUG9saXRpY2lhbkxpc3QgPSB0aGlzLmZpbHRlclBvbGl0aWNpYW5zKCkuc2xpY2UoMCwgdGhpcy5zdGF0ZS5hcHAuc2VhcmNoLm1heCk7XG4gICAgdmFyIGN1cnJlbnRQcm9maWxlID0gdGhpcy5nZXRQb2xpdGljaWFuQnlJRCh0aGlzLnN0YXRlLmFwcC5wcm9maWxlLmlkKTtcbiAgICB2YXIgZ2V0dGVycyA9IFt0aGlzLmdldFBvbGl0aWNpYW5CeUlELHRoaXMuZ2V0UGFydHlCeUlELHRoaXMuZ2V0UmlkaW5nQnlJRF07XG4gICAgdmFyIHZvdGVzID0gdGhpcy5maWx0ZXJWb3RlcygpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveCBzZWFyY2hcIj5cbiAgICAgICAgPFNlYXJjaEJveFxuICAgICAgICAgIGJveD17dGhpcy5zdGF0ZS5hcHAuYm94fSAvL3RlbXBcbiAgICAgICAgICBwb2xpdGljaWFuTGlzdD17ZmlsdGVyZWRQb2xpdGljaWFuTGlzdH1cbiAgICAgICAgICBwYXJ0aWVzTGlzdD17dGhpcy5zdGF0ZS5hcHAucGFydGllc0xpc3R9XG4gICAgICAgICAgcmlkaW5nc0xpc3Q9e3RoaXMuc3RhdGUuYXBwLnJpZGluZ3NMaXN0fVxuICAgICAgICAgIHNlc3Npb25zTGlzdD17dGhpcy5zdGF0ZS5hcHAuc2Vzc2lvbnNMaXN0fVxuICAgICAgICAgIHNlc3Npb25zPXt0aGlzLnN0YXRlLmFwcC5zZXNzaW9uc31cbiAgICAgICAgICBzZWFyY2g9e3RoaXMuc3RhdGUuYXBwLnNlYXJjaH1cbiAgICAgICAgICBvblNlYXJjaFNjcm9sbD17dGhpcy5vblNlYXJjaFNjcm9sbH1cbiAgICAgICAgICBvblNlYXJjaENoYW5nZT17dGhpcy5vblNlYXJjaENoYW5nZX1cbiAgICAgICAgICBzZXNzaW9uVG9nZ2xlPXt0aGlzLnNlc3Npb25Ub2dnbGV9XG4gICAgICAgICAgZXhwYW5kU2Vzc2lvbnM9e3RoaXMuZXhwYW5kU2Vzc2lvbnN9XG4gICAgICAgICAgZXhwYW5kU3RhdGU9e3RoaXMuc3RhdGUuYXBwLmV4cGFuZFN0YXRlfVxuICAgICAgICAgIGdldHRlcnMgPSB7Z2V0dGVyc31cbiAgICAgICAgICBjdXJyZW50UHJvZmlsZUlEID0ge3RoaXMuc3RhdGUuYXBwLnByb2ZpbGUuaWR9XG4gICAgICAgICAgY3VycmVudFByb2ZpbGVJc0xvYWRpbmc9e3RoaXMuc3RhdGUuYXBwLnByb2ZpbGUuaXNMb2FkaW5nfSAvPlxuICAgICAgICA8UHJvZmlsZUJveCBcbiAgICAgICAgICBib3g9e3RoaXMuc3RhdGUuYXBwLmJveH0gLy90ZW1wXG4gICAgICAgICAgZ2V0dGVycyA9IHtnZXR0ZXJzfVxuICAgICAgICAgIHByb2ZpbGU9e2N1cnJlbnRQcm9maWxlfVxuICAgICAgICAgIHZvdGVzPXt2b3Rlc30gXG4gICAgICAgICAgY3VycmVudFZvdGU9e3RoaXMuc3RhdGUuYXBwLnZvdGV9XG4gICAgICAgICAgb25CaWxsU2VhcmNoQ2hhbmdlPXt0aGlzLm9uQmlsbFNlYXJjaENoYW5nZX0gXG4gICAgICAgICAgZ2V0QmlsbEluZm8gPSB7dGhpcy5nZXRCaWxsSW5mb31cbiAgICAgICAgICBiaWxsSW5mbyA9IHt0aGlzLnN0YXRlLmFwcC52b3RlLmRhdGF9XG4gICAgICAgICAgZ2V0UG9saXRpY2lhbiA9IHt0aGlzLmdldFBvbGl0aWNpYW59XG4gICAgICAgICAgY3VycmVudFByb2ZpbGVJc0xvYWRpbmc9e3RoaXMuc3RhdGUuYXBwLnByb2ZpbGUuaXNMb2FkaW5nfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuICBnZXRCaWxsSW5mbzogZnVuY3Rpb24ob2JqZWN0LCBldmVudCkge1xuICAgIGlmIChvYmplY3QucHJvcHMudm90ZS52b3RlcXVlc3Rpb25faWQgPT0gdGhpcy5zdGF0ZS5hcHAudm90ZS5pZCkge1xuICAgICAgYXBwU3RhdGUgPSB0aGlzLmNsb25lQXBwU3RhdGUodGhpcy5zdGF0ZS5hcHApO1xuICAgICAgICBhcHBTdGF0ZS52b3RlLmlkID0gMDtcbiAgICAgICAgYXBwU3RhdGUudm90ZS52b3RlcyA9IHt9O1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7YXBwOiBhcHBTdGF0ZX0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZ2V0Vm90ZUluZm9ybWF0aW9uKG9iamVjdC5wcm9wcy52b3RlLnZvdGVxdWVzdGlvbl9pZCk7XG4gICAgICBhcHBTdGF0ZSA9IHRoaXMuY2xvbmVBcHBTdGF0ZSh0aGlzLnN0YXRlLmFwcCk7XG4gICAgICAgIGFwcFN0YXRlLnZvdGUuaWQgPSBvYmplY3QucHJvcHMudm90ZS52b3RlcXVlc3Rpb25faWQ7XG4gICAgICAgIGFwcFN0YXRlLnZvdGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgYXBwU3RhdGUudm90ZS5kYXRhID0ge307XG4gICAgICB0aGlzLnNldFN0YXRlKHthcHA6IGFwcFN0YXRlfSk7XG4gICAgfVxuICB9LFxuICBnZXRQb2xpdGljaWFuOiBmdW5jdGlvbihwb2xpdGljaWFucywgaWQpIHtcbiAgICAvL2lmICh0eXBlb2YocG9saXRpY2lhbnMpPT09J3VuZGVmaW5lZCcpIHBvbGl0aWNpYW5zID0gdGhpcy5zdGF0ZS5wb2xpdGljaWFucztcbiAgICAvL2lmICh0eXBlb2YoaWQpPT09J3VuZGVmaW5lZCcpIGlkID0gdGhpcy5zdGF0ZS5pZDtcbiAgICAvL2lmIChpZCkge1xuICAgIC8vICBmb3IgKGkgPSAwOyBpIDwgcG9saXRpY2lhbnMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgICBpZiAocG9saXRpY2lhbnNbaV0uaWQgPT0gaWQpIHtcbiAgICAvLyAgICAgIHJldHVybiBwb2xpdGljaWFuc1tpXTtcbiAgICAvLyAgICB9XG4gICAgLy8gIH1cbiAgICAvL31cbiAgICByZXR1cm4gW107XG4gIH0sXG4gIFxufSk7XG5cblJlYWN0LnJlbmRlcihcbiAgPEFwcCAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxuKTsiXX0=
