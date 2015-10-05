/** @jsx React.DOM */

var SearchStack = require('./SearchStack.js');
SearchBox = React.createClass({
  render: function() {
    var classes = 'searchBox ' + this.props.box; //temp
    return (
      <div className="searchBox-noscroll search">
        <div className={classes} onScroll={this.props.onSearchScroll.bind(null, this)} >
          <div className="topLinks"><a href="/#/info" className="info"></a><a href="https://github.com/shayqn/parle" className="github"></a></div>
          <form>
            <input type="search" placeholder="Search..." onChange={this.props.onSearchChange} />
            <button type="submit">Search</button>
            <span>by name, riding, or postal code</span>
          </form>
          <div className="searchContent">
            <SearchStack 
              box={this.props.box} 
              politicians={this.props.politicianList} 
              profile={[null]}
              searching={this.props.search.isSearching} />
          </div>
        </div>
      </div>
    );
  }
});
module.exports = SearchBox;