/** @jsx React.DOM */

SessionButton = React.createClass({
	render: function() {
		className = "sessionButton";
		var sessionNumber = this.props.sessionNumber;
		for (i=0;i<this.props.currentSessions.length;i++) {
			if (sessionNumber == this.props.currentSessions[i]) {
				className += " active";
			}
		}
		return (
			<div className={className} key={this.props.key}>
				<a onClick={this.props.sessionToggle.bind(null, sessionNumber)}>{sessionNumber}</a>
			</div>
		);
	}
});
module.exports = SessionButton;