/** @jsx React.DOM */

var SessionButton = require('./SessionButton.js');
SessionSelector = React.createClass({
	render: function() {
		var sessionsList = this.props.sessionsList;
		var currentSessions = this.props.currentSessions;
		var sessionButtons = [];
		var sessionToggle = this.props.sessionToggle;
		var key = 0;
		for(var sessionNumber in sessionsList) {
			var session = <SessionButton sessionNumber={sessionNumber}
							currentSessions={currentSessions}
							sessionToggle={sessionToggle} 
							key={key} />
			sessionButtons.push(session);
			key++;
		}
		return (
			<div className="sessionsSelector">
				<div className="title"><h2>Sessions</h2></div>
				<div className="buttons">{sessionButtons.reverse()}</div>
			</div>
		);
	}
});
module.exports = SessionSelector;