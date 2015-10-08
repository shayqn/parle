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
      voteRows = this.props.votes.map(function (object, key) {
        return (
          <VoteRow
            key = {key}
            vote = {object}
            currentVote = {currentVote}
            onClick = {getBillInfo}
            billInfo = {this.props.billInfo}
            getPolitician = {this.props.getPolitician} />
        );
      }.bind(this));
    }
    else if (this.props.currentProfileIsLoading) {
      loader= (<div className="loader loading"></div>);
      for(i=0;i<20;i++) {
        var EmptyRow = (
            <div key={i} className="voteRow row emptyrow">
              <div className="main row">
                <div className="col"><span>-</span></div>
              </div>
            </div>
        );
        voteRows.push(EmptyRow);
      }
    }
    else {
      var noResultsRow = (
          <div key={0} className="voteRow row noresults">
            <div className="main row">
              <div className="col spacer"></div>
              <div className="col"><span>No matching records have been found. Try changing your selected sessions or search terms.</span></div>
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
            {loader}
            {voteRows}
        </div>
      </div>
    );        
  }
});

module.exports = BillStack;