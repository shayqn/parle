/** @jsx React.DOM */

var BillText = React.createClass({
  prepText: function(text) {
    text = text.trim();
    return (text.length>0?'<p>'+text.replace(/[\r\n]+/,'</p><p>')+'</p>':null);
  },
  render: function () {
    var billText = this.prepText(this.props.billText);
    return (
    <div className="billText">
      {billText}
    </div>
    );
  }
});

module.exports = BillText;