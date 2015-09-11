

var AppBox = React.createClass({
  getInitialState: function() {
    return {
      politicians: [],
      searchClass: 'full',
      profileClass: 'hide',
      profile: '',
      searching: false,
      votes: []
    };
  },
  changeClass: function(object, event) {
    if (this.state.searchClass == 'full') {
      console.log("full width");
      this.setState({
        searchClass : 'sidebar',
        profileClass : 'show',
        profile : object
      });
      this.getPoliticianVotes(object.id);
    }
    else if (object.id == this.state.profile.id) {
      console.log("active");
      this.setState({
        searchClass : 'full',
        profileClass: 'hide',
        profile : '',
        votes: []
      });
      this.getPoliticianVotes(object.id);
    }
    else if (object) {
      console.log("object else if");
      this.setState({
        profile : object,
        votes: []
      });
      this.getPoliticianVotes(object.id);
    }
    else {
      console.log("else");
      this.setState({
        searchClass : 'full',
        profileClass: 'hide',
        profile : '',
        votes: []
      });
    }
  },
  closeProfile: function(event) {
    this.setState({
        searchClass : 'full',
        profileClass: 'hide',
        profile: '',
        votes: []
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
        <ProfileBox profileClass={this.state.profileClass} profile={this.state.profile} closeProfile={this.closeProfile} votes={this.state.votes} />
      </div>
    );
  },
  fetchJSON: function(path, type) {
    console.log('fetch JSON')
    var request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        console.log('requestin');
        console.log(data);
        if (type == 'politicians') {
          this.setState({politicians: data['results']});
        }
        else if (type == 'votes') {
          this.setState({votes: data['results']});
        }
        else {
          console.log('type not politician or votes');
        }
      } else {
        // We reached our target server, but it returned an error
        console.log('server reached, but it did not give data in fetchJSON');
      }
    }.bind(this);
    request.onerror = function() {
        console.log('connection problem with fetchJSON');
      // There was a connection error of some sort
    };
    request.send();
  },
  getPoliticianVotes: function(id) {
    console.log("getVotes");
    url = '/pol/' + id;
    this.fetchJSON(url, 'votes');
  },
  componentDidMount: function() {
    // temporary measure - is supposed to read from file
    console.log('did mount');
    url = '/initialize';
    this.fetchJSON(url, 'politicians');
  },
});
var ProfileBox = React.createClass({
  render: function() {
    var classes = 'profileBox ' + this.props.profileClass;
    var closeClass = 'close ' + this.props.profileClass;
    return (
      <div className={classes}>
        <div className="profile">
          <a className={closeClass} onClick={this.props.closeProfile} href="#"></a>
          <h2>{this.props.profile.name}</h2>
          <div>Basic profile info.</div>
          <div>Search interface.</div>
        </div>
        <div className="votes">
          <BillStack votes={this.props.votes} />
        </div>
      </div>
    );
  },
});
var BillStack = React.createClass({
  render: function() {
    var objectNodes = this.props.votes.map(function (object, i) {
      if (object.vote == 'Y') {
        voteClass = voteText = 'yes ';
      }
      else if (object.vote == 'N') {
        voteClass = voteText = 'no ';
      }
      else {
        voteClass = '';
        voteText = 'no vote';
        console.log('no vote');
      }
      voteClass += 'vote';
      var lawText = object.law ? 'passed' : 'failed';
      lawClass = 'law ' + lawText;
      if (object.short_title_en) {
        name = object.short_title_en;
      }
      else {
        name = object.name_en;
      }
      return (
        <tr key={i}>
          <td className="number">{object.number}</td>
          <td className={voteClass}>{voteText}</td>
          <td className="shortname">{name}</td>
          <td className={lawClass}>{lawText}</td>
        </tr>
      );
    }.bind(this));
    return (
      <div className='stickyHelper'>
        <table className='billStack'>
          <thead>
            <tr>
              <th className="number">Number</th>
              <th className="vote">Vote</th>
              <th className="shortname">Name</th>
              <th className="law">Law</th>
            </tr>
          </thead>
          <tbody>
            {objectNodes}
          </tbody>
        </table>
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
    console.log(currentProfileID);
    var boundClick = this.props.changeClass;
    var politicians = this.props.politicians;
      if (currentProfileID) {
        for (var i = 0; i < this.props.politicians.length; i++) {
          if (this.props.politicians[i].id === this.props.profile.id) {
            politicians.splice(0, 0, politicians.splice(i, 1)[0]);
          }
        }
      }      
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
    console.log(objectNodes);
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