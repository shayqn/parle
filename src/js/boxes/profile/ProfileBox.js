/** @jsx React.DOM */
var BillStack = require('./BillStack.js');
var BillSearch = require('./BillSearch.js');
var ProfileBox = React.createClass({
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
      <div className={classes}>
        <div className="profileHeader">
          <a className="return" href="/#/"><div className ="icon"></div><span>return to MP search</span></a>
          <a className={closeClass} href="/#/"></a>
          <h2 className="name">{this.props.profile.name}</h2>
          <span className="info"><h3 className="riding">{this.props.profile.riding}</h3><h3 className="party">{partyName}</h3></span>
          <BillSearch 
            onBillSearchChange={this.props.onBillSearchChange}
            onSessionSelectToggle={this.props.onSessionSelectToggle}
            onSessionSelect={this.props.onSessionSelect}
            sessionsList={this.props.sessionsList}
            sessionToggle = {this.props.sessionToggle}
            session={this.props.session}
            sessionsVotes = {this.props.sessionsVotes} />
      </div>
      <BillStack 
        votes={this.props.votes} 
        retrievingVotes={this.props.retrievingVotes}
        getBillInfo = {this.props.getBillInfo}
        currentVote = {this.props.currentVote}
        billInfo = {this.props.billInfo}
        getPolitician = {this.props.getPolitician} />
      </div>
    );
  },
});

module.exports = ProfileBox;