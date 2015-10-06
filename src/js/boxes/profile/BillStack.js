/** @jsx React.DOM */

var VoteRow = require('./VoteRow.js');
var BillStack = React.createClass({
  render: function() {
    var currentVote = this.props.currentVote;
    var getBillInfo = this.props.getBillInfo;
    var voteRows = [];
    var loader = null;
    if (this.props.votes.length  > 0) {
      var getBillText = this.props.getBillText;
      voteRows = this.props.votes.map(function (object, i) {
        return (
          <VoteRow
            key = {i}
            vote = {object}
            currentVote = {currentVote}
            onClick = {getBillInfo}
            billInfo = {this.props.billInfo}
            getPolitician = {this.props.getPolitician} />
        );
      }.bind(this));
    }
    else if (this.props.retrievingVotes) {
      
      for (var i = 0; i < 15; i++) {
        var emptyRow = (
          <div key={i} className="voteRow row empty">
            <div className="main row">
              <div className="col spacer left"></div>
              <div className="col session"></div>
              <div className="col number"></div>
              <div className="col vote full-layout"></div>
              <div className="col shortname"><span>no result</span></div>
              <div className="col vote mobile-only"></div>
              <div className="col law"></div>
              <div className="col dropdown"></div>
              <div className="col spacer right"></div> 
            </div>
          </div>
        );
        voteRows.push(emptyRow);
      }
      loader = <div className="loader-container"><div className="loader"></div></div>;
    }
    else {
      var noResultsRow = (
          <div className="voteRow row noresults">
            <div className="main row">
              <div className="col spacer"></div>
              <div className="col"><span>no results found</span></div>
              <div className="col spacer"></div> 
            </div>
          </div>
        );
      voteRows.push(noResultsRow);
    }
    return (
      <div className='votes'>
        <div className='billStack'>
            <div className="row header">
              <div className="col spacer left"></div>
              <div className="col session">Session</div>
              <div className="col number">Number</div>
              <div className="col vote full-layout">Vote</div>
              <div className="col shortname">Name</div>
              <div className="col vote mobile-only">Vote</div>
              <div className="col law">Law</div>
              <div className="col dropdown"></div>
              <div className="col spacer right"></div>
            </div>
            {voteRows}
            {loader}
        </div>
      </div>
    );        
  }
});

module.exports = BillStack;