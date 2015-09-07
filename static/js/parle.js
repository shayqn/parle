var AppBox = React.createClass({
  getInitialState: function() {
    return {
      politicians: [],
      searchClass: 'full',
      profileClass: 'hide',
      profile: '',
      searching: false
    };
  },
  changeClass: function(object, event) {
    if (this.state.searchClass == 'full') {
      console.log("full");
      this.setState({
        searchClass : 'sidebar',
        profileClass : 'show',
        profile : object
      });
    }
    else if (object.id == this.state.profile.id) {
      console.log("active");
      this.setState({
        searchClass : 'full',
        profileClass: 'hide',
        profile : ''
      });
    }
    else if (object) {
      console.log("object");
      this.setState({
        profile : object
      });
    }
    else {
      console.log("else");
      this.setState({
        searchClass : 'full',
        profileClass: 'hide',
        profile : ''
      });
    }
  },
  closeProfile: function(event) {
    this.setState({
        searchClass : 'full',
        profileClass: 'hide',
        profile: ''
      });
  },
  onSearchChange: function(event) {
    this.setState({
      searching: true,
      searchValue: event.target.value
    });
  },
  render: function() {
    if (this.state.searching && this.state.searchValue) {
      var regex = new RegExp(this.state.searchValue, "i");
      var filteredList = this.state.politicians.filter(function (pol) {
        return pol.name.search(regex) > -1 || pol.party_name.search(regex) > -1 || pol.party_slug.search(regex) > -1;
      });
      if (this.state.searchClass == 'full') {
        var max = 50;
      }
      else {
        var max = 10;
      }
      var politicianList = filteredList.slice(0,max);
    }
    else {
      var politicianList = this.state.politicians.slice(0,10);
    }
    return (
      <div className="box">
        <SearchBox searchClass={this.state.searchClass} politicians={politicianList} changeClass={this.changeClass} onSearchChange={this.onSearchChange} profile={this.state.profile} />
        <ProfileBox profileClass={this.state.profileClass} profile={this.state.profile} closeProfile={this.closeProfile} />
      </div>
    );
  },
  componentDidMount: function() {
    // temporary measure - is supposed to read from file
    url = '/initialize';
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({politicians: data['results']});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
});
var ProfileBox = React.createClass({
  render: function() {
    var classes = 'profileBox ' + this.props.profileClass;
    var closeClass = 'close ' + this.props.profileClass;
    return (
      <div className={classes}>
        <a className={closeClass} onClick={this.props.closeProfile} href="#"></a>
        <h2>{this.props.profile.name}</h2>
      </div>
    );
  }
});
var SearchBox = React.createClass({
  render: function() {
    var classes = 'searchBox ' + this.props.searchClass;
    return (
      <div className={classes}>
        <form>
          <input type="search" placeholder="Search..." onChange={this.props.onSearchChange} />
          <button type="submit">Search</button>
        </form>
        <div className="searchContent">
          <SearchStack changeClass={this.props.changeClass} politicians={this.props.politicians} profile={this.props.profile} />
        </div>
      </div>
    );
  }
});
var SearchStack = React.createClass({
  render: function() {
    classString = "searchStack";
    var currentProfileID = this.props.profile.id;
    var boundClick = this.props.changeClass;
    var objectNodes = this.props.politicians.map(function (object, i) {
      var imgURL = "url('http://104.236.172.89/static/images/" + object.imgurl + "')";
      var classString = '';
      if (object.id == currentProfileID) {
        classString = 'active ';
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
      return (
        <a className={classString} onClick={boundClick.bind(null,object)} href="#" key={i}>
          <div style={{backgroundImage: imgURL}}></div>
          <h3>{object.name}</h3>
          <span className="party">{partyName}</span>
        </a>
      );
    }.bind(this));
    return (
      <div className={classString}>
        <h2>Members of Parliament</h2>
        {objectNodes}
      </div>
    );
  }
});

React.render(
  <AppBox />,
  document.getElementById('content')
);