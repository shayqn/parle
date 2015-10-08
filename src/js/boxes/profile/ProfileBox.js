/** @jsx React.DOM */
var BillStack = require('./BillStack.js');
var BillSearch = require('./BillSearch.js');
var ProfileBox = React.createClass({
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
      <div className={classes}>
        <div className="profileHeader">
          <a className="return" href="/#/"><div className ="icon"></div><span>return to MP search</span></a>
          <a className={closeClass} href="/#/"></a>
          <h2 className="name">{this.props.profile.name}</h2>
          <span className="info"><h3 className="riding">{ridingName}</h3><h3 className="party">{partyName}</h3></span>
          <BillSearch onBillSearchChange={this.props.onBillSearchChange} />
      </div>
      <BillStack 
        votes={this.props.votes}
        getBillInfo = {this.props.getBillInfo}
        currentVote = {this.props.currentVote}
        billInfo = {this.props.billInfo}
        getPolitician = {this.props.getPolitician} />
      </div>
    );
  },
});

module.exports = ProfileBox;