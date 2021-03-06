/** @jsx React.DOM */

SessionButton = React.createClass({
	render: function() {
		var className = "sessionButton";
		var sessionNumber = this.props.sessionNumber;
		for (i=0;i<this.props.currentSessions.length;i++) {
			if (sessionNumber == this.props.currentSessions[i]) {
				className += " active";
			}
		}
		return (
			<a onClick={this.props.sessionToggle.bind(null, sessionNumber)}>
				<div className={className} key={this.props.key}>
					{sessionNumber}
				</div>
			</a>
		);
	}
});
module.exports = SessionButton;