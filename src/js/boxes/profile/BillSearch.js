/** @jsx React.DOM */

var BillSearch = React.createClass({
  render: function() {
    if (this.props.session == '') {
      var selectText = 'any session';
    }
    else {
      var selectText = this.props.session;
    }
    var sessionsVotes = this.props.sessionsVotes;
    var toggleClass = 'sessionSelect' + (this.props.sessionToggle ? '' : ' collapsed');
    var objectNodes = this.props.sessionsList.map(function (object, i) {
        var sum = sessionsVotes[object.id];
        if (sum) {
          var string = object.id + ' - (' + sum + ')';
          return (
            <li onClick={this.props.onSessionSelect.bind(null,object)} key={i}><span className="session">{object.id}</span> <span className="sum">{sum}</span></li>
          );
        }
    }.bind(this));
    return (
      <div className="billSearch">
        <form>
          <input type="search" placeholder="Search bills by name or number..." onChange={this.props.onBillSearchChange} />  
          <div className={toggleClass}>    
          <span className="select" onClick={this.props.onSessionSelectToggle}>{selectText}</span>  
          <ul>
            <li className="sessionOption" onClick={this.props.onSessionSelect.bind(null,'')}><span className="session">any session</span> <span className="sum">{sessionsVotes['sum']}</span></li>
            {objectNodes}
          </ul>
          </div>
        </form>
      </div>
      
    );
  }
});

module.exports = BillSearch;