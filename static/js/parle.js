

var AppBox = React.createClass({
  getInitialState: function() {
    return {
      politicians: [],
      searchClass: 'full',
      profileClass: 'hide',
      profile: '',
      searching: false,
      votes: [],
      retrievingVotes: false
    };
  },
  changeClass: function(object, event) {
    if (this.state.searchClass == 'full') {
      this.setState({
        searchClass : 'sidebar',
        profileClass : 'show',
        profile : object,
        votes: [],
        retrievingVotes: true
      });
      this.getPoliticianVotes(object.id);
    }
    else if (object.id == this.state.profile.id) {
      this.setState({
        searchClass : 'full',
        profileClass: 'hide',
        profile : '',
        retrievingVotes: true
      });
      this.getPoliticianVotes(object.id);
    }
    else if (object) {
      this.setState({
        profile : object,
        votes: [],
        retrievingVotes: true
      });
      this.getPoliticianVotes(object.id);
    }
    else {
      this.setState({
        searchClass : 'full',
        profileClass: 'hide',
        profile : '',
        retrievingVotes: false
      });
    }
  },
  closeProfile: function(event) {
    this.setState({
        searchClass : 'full',
        profileClass: 'hide',
        profile: '',
        votes: [],
        retrievingVotes: false
      });
  },
  onSearchChange: function(event) {
    this.setState({
      searching: true,
      searchValue: event.target.value
    });
  },
  onBillSearchChange: function(event) {
    this.setState({
      billSearching: true,
      billSearchValue: event.target.value
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
    if (this.state.billSearching && this.state.billSearchValue) {
      var regex = new RegExp(this.state.billSearchValue, "i");
      var filteredList = this.state.votes.filter(function (vote) {
        return vote.name_en.search(regex) > -1 || vote.number.search(regex) > -1 || vote.short_title_en.search(regex) > -1;
      });
      var voteList = filteredList;
    }
    else {
      var voteList = this.state.votes;
    }
    var classes = 'box ' + this.state.searchClass;
    return (
      <div className={classes}>
        <SearchBox searchClass={this.state.searchClass} politicians={politicianList} changeClass={this.changeClass} onSearchChange={this.onSearchChange} profile={this.state.profile} />
        <ProfileBox profileClass={this.state.profileClass} profile={this.state.profile} closeProfile={this.closeProfile} votes={voteList} onBillSearchChange={this.onBillSearchChange} retrievingVotes={this.state.retrievingVotes} />
      </div>
    );
  },
  fetchJSON: function(path, type) {
    var request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        if (type == 'politicians') {
          this.setState({politicians: data['results']});
        }
        else if (type == 'votes') {
          this.setState({votes: data['results'],
                          retrievingVotes: false
                        });
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
    url = '/pol/' + id;
    this.fetchJSON(url, 'votes');
  },
  componentDidMount: function() {
    // temporary measure - is supposed to read from file
    url = '/initialize';
    this.fetchJSON(url, 'politicians');
  },
});
var ProfileBox = React.createClass({
  render: function() {
    var classes = 'profileBox ' + this.props.profileClass;
    var closeClass = 'close ' + this.props.profileClass;
    if (!this.props.profile.party_slug) {
      var partyName = this.props.profile.party_name;
    }
    else {
      var partyName = this.props.profile.party_slug;
    }
    return (
      <div className={classes}>
        <div className="profile">
          <a className={closeClass} onClick={this.props.closeProfile} href="#"></a>
          <h2 className="name">{this.props.profile.name}</h2>
          <span className="info"><h3 className="riding">{this.props.profile.riding}</h3><h3 className="party">{partyName}</h3></span>
          <BillSearch onBillSearchChange={this.props.onBillSearchChange} />
        </div>
        <div className="votes">
          <BillStack votes={this.props.votes} retrievingVotes={this.props.retrievingVotes} />
        </div>
      </div>
    );
  },
});
var BillStack = React.createClass({
  render: function() {
    console.log(this.props.votes == true);
    if (this.props.votes.length  > 0) {
      console.log('truly yours');
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
            <td></td>
            <td className="number">{object.number}</td>
            <td className={voteClass}>{voteText}</td>
            <td className="shortname">{name}</td>
            <td className={lawClass}>{lawText}</td>
            <td></td>
          </tr>
        );
      }.bind(this));
      return (
        <div className='stickyHelper'>
          <table className='billStack'>
            <thead>
              <tr>
                <th></th>
                <th className="number">Number</th>
                <th className="vote">Vote</th>
                <th className="shortname">Name</th>
                <th className="law">Law</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {objectNodes}
            </tbody>
          </table>
        </div>
      );
    }
    else {
      console.log('falsely accused');
      if (this.props.retrievingVotes) {
        var loader = <div className="loader"></div>;
      }
      else {
        var loader = <div className="no-results">No Results</div>;
      }
      return (
        <div className='stickyHelper'>
          <table className='billStack'>
            <thead>
              <tr>
                <th></th>
                <th className="number">Number</th>
                <th className="vote">Vote</th>
                <th className="shortname">Name</th>
                <th className="law">Law</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="empty">
              <td colspan=""></td>
              <td className="number">empty</td>
              <td className="vote">empty</td>
              <td className="shortname">empty</td>
              <td className="law">empty</td>
              <td></td>
            </tr>
            </tbody>
          </table>
          {loader}
        </div>
      );
        
    }
    
  }
});
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
var SearchBox = React.createClass({
  render: function() {
    var classes = 'searchBox ' + this.props.searchClass;
    var containerclasses = 'searchBox-noscroll ' + this.props.searchClass;
    return (
      <div className={containerclasses}>
      <div className={classes}>
        <form>
          <input type="search" placeholder="Search..." onChange={this.props.onSearchChange} />
          <button type="submit">Search</button>
        </form>
        <div className="searchContent">
          <SearchStack changeClass={this.props.changeClass} politicians={this.props.politicians} profile={this.props.profile} />
        </div>
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