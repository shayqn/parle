/** @jsx React.DOM */

var InfoText = require('./InfoText.js');
var InfoBox = React.createClass({
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
      <div className={classes}><div className="closeContainer"><a href="/#/" onClick={this.goBack}></a></div><InfoText /></div>
    );
  }
});

module.exports = InfoBox;