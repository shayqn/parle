/** @jsx React.DOM */

var BillText = require('./BillText.js');
var TextBox = React.createClass({
  render: function() {
    var classes = 'billTextBox ' + this.props.box;
    return (
      <div className={classes}><div className="closeContainer"><a href="/#/"></a></div><BillText billText={this.props.billText} /></div>
    );
  }
});

module.exports = TextBox;