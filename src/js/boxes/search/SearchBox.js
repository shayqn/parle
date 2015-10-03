/** @jsx React.DOM */

var SearchStack = require('./SearchStack.js');
SearchBox = React.createClass({
  render: function() {
    var classes = 'searchBox ' + this.props.box;    return (
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
              politicians={this.props.politicians} 
              profile={this.props.profile}
              searching={this.props.searching} />
          </div>
        </div>
    );
  }
});
var SearchStack = React.createClass({
  render: function() {
    classString = "searchStack";
    var currentProfileID = this.props.profile.id;
    var politicianNodes = [];
    if (this.props.politicians.length > 0) {
      politicianNodes = this.props.politicians.map(function (object, i) {
        var imgURL = "url('/static/headshots/" + object.imgurl + "')";
        var classString = '';
        if (object.id == currentProfileID) {
          classString += 'active ';
        }
        if ((object.id == currentProfileID)&&(this.props.box == 'profile')) {
          var href = '/#/';
        }
        else {
          var href = '/#/profile/' + object.id;
        }
        if (object.active) {
          classString += 'current ';
        }
        if (!object.party_slug) {
          var partyName = object.party_name;
        }
        else {
          classString += object.party_slug;
          var partyName = object.party_slug;
        }
        if (object.name.length>19) {
          if (object.name.length > 22) {
            classString += ' reduce-large'
          }
          else {
            classString += ' reduce-medium';
          }
        }
        return (
          <a className={classString} href={href} key={i} >
            <div style={{backgroundImage: imgURL}}></div>
            <h3>{object.name}</h3>
            <span className="party">{partyName}</span>
          </a>
        );
      }.bind(this));  
    }
    else if (this.props.searching) {
      var noResultsNode = <a><h3>NO RESULTS</h3></a>;
      politicianNodes.push(noResultsNode);
    }
    else {
      var placeHolderNames = ['John A. McTemp', 'John Fakenbaker', 'Pierre Tempdeau'];
      for (i = 0; i < 11; i++) {
        var emptyNode = <a key={i} className="placeholder" href="/#/"><div></div><h3>{placeHolderNames[i%3]}</h3><span className="party">VAN</span></a>;
        politicianNodes.push(emptyNode);
      }
    }
    return (
      <div className={classString}>
        <h2>Members of Parliament<span className="leaf"></span></h2>
        {politicianNodes}
      </div>
    );
  }
});
module.exports = SearchBox;