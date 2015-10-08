/** @jsx React.DOM */
var PureRenderMixin = require('react-addons-pure-render-mixin');
var SearchStack = require('./SearchStack.js');
var SessionSelector = require('./SessionSelector.js');
SearchBox = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    var classes = 'searchBox ' + this.props.box; //temp
    var noscrollClasses = 'searchBox-noscroll ' + this.props.box; //temp
    return (
      <div className={noscrollClasses}>
        <div className={classes} onScroll={this.props.onSearchScroll.bind(null, this)} >
          <div className="topLinks"><a href="/#/info" className="info"></a><a href="https://github.com/shayqn/parle" className="github"></a></div>
          <div className="searchForm">
            <input type="search" placeholder="Search..." onChange={this.props.onSearchChange} />
            <button type="submit">Search</button>
            <span>by name, riding, or postal code</span>
          </div>
          <div className="searchContent">
            <SearchStack 
              box={this.props.box} 
              politicians={this.props.politicianList} 
              currentProfileID={this.props.currentProfileID} 
              searching={this.props.search.isSearching}
              sessionsList={this.props.sessionsList}
              currentSessions={this.props.sessions}
              sessionToggle = {this.props.sessionToggle}
              expandSessions = {this.props.expandSessions}
              expandState = {this.props.expandState}
              getters = {this.props.getters} />
          </div>
        </div>
      </div>
    );
  }
});
module.exports = SearchBox;