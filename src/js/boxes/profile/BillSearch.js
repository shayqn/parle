/** @jsx React.DOM */

var BillSearch = React.createClass({
  render: function() {
    return (
      <div className="billSearch">
        <form>
          <input type="search" placeholder="Search bills by name or number..." onChange={this.props.onBillSearchChange} />  
        </form>
      </div>
      
    );
  }
});

module.exports = BillSearch;