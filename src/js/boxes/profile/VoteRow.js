/** @jsx React.DOM */

var VoteRow = React.createClass({
  render: function () {
    if (this.props.vote.vote == 'Y') {
      var voteClass = 'yes ';
      var voteText = 'yes';
    }
    else if (this.props.vote.vote == 'N') {
      var voteClass = 'no ';
      var voteText = 'no';
    }
    else {
      var voteClass = '';
      var voteText = 'no vote';
    }
    voteClass += 'vote col ';
    var mobileVoteClass = voteClass + 'mobile-only';
    voteClass += 'full-layout'

    var lawText = this.props.vote.law ? 'yes' : 'no';
    var lawClass = 'col law ' + lawText;

    if (this.props.vote.short_title_en) {
      var name = this.props.vote.short_title_en;
    }
    else {
      var name = this.props.vote.name_en;
    }
    var voteRowClass = "voteRow row";
    if (this.props.vote.votequestion_id == this.props.currentVote.id) {
      voteRowClass += " current";
    }
    return (
      <div className={voteRowClass} key={this.props.key}>
        <div onClick={this.props.onClick.bind(null, this)} className="main row">
          <div className="col spacer left"></div>
          <div className="col session"><span className="label mobile-only">Session</span>{this.props.vote.session_id}</div>
          <div className="col number"><span className="label mobile-only">Number</span>{this.props.vote.number}</div>
          <div className={voteClass}><span className="voteText">{voteText}</span></div>
          <div className="col shortname">{name}</div>
          <div className={mobileVoteClass}><span className="label mobile-only">Vote</span><span className="voteText">{voteText}</span></div>
          <div className={lawClass}><span className="label mobile-only">Law</span><span className="lawText">{lawText}</span></div>
          <div className="col dropdown"><span><ArrowIcon /></span></div>
          <div className="col spacer right"></div> 
        </div>
        <VoteInfoRow 
          vote = {this.props.vote}
          currentVote = {this.props.currentVote}
          voteQuestionID = {this.props.vote.votequestion_id}
          billInfo = {this.props.billInfo}
          getPolitician = {this.props.getPolitician} />
      </div>
    );
  }
});
var VoteInfoRow = React.createClass({
  render: function() {
    var infoClass = "row info";
    var getPolitician = this.props.getPolitician;
    var sponsorComponent = null;
    if (this.props.voteQuestionID == this.props.currentVote.id) {
      infoClass += ' current';
      var lawString =  'Law: ' + this.props.lawText;
      var voteInformation = <div className="col billInfo">{lawString}</div>
      if (undefined != this.props.billInfo) {
        var partyVoteNodes = [];
        var i = 0;
        var node = (
          <div key={0} className="partyVoteHeader" key={i}>
            <div className="name">Party</div>
            <div className="yes">YES</div>
            <div className="no">NO</div>
            <div className="abstain">ABSTAIN</div>
          </div>
        );
        partyVoteNodes.push(node);
        yesCount = 0;
        noCount = 0;
        abstainCount = 0;
        for (var key in this.props.billInfo) {
          i++;
          var partyName = key;
          var yes = this.props.billInfo[key]['Y'];
          var no = this.props.billInfo[key]['N'];
          var abstain = this.props.billInfo[key]['A'];
          var noClass = "no";
          var yesClass = "yes";
          var abstainClass = "abstain";
          var partyClass = "partyVote";
          if ((yes > abstain)&&(yes > no)) {
            partyClass += " yes";
          }
          else if ((no > abstain) && (no > yes)) {
            partyClass += " no";
          }
          else if ((abstain > yes) && (abstain > no)) {
            partyClass += " abstain";
          }
          else {
            if ((yes == no)) {
              partyClass += " tie yn";
            }
            else if (yes==abstain) {
              partyClass += " tie ya";
            }
            else if (no==abstain) {
              partyClass += " tie na";
            }
            else {
              partyClass += " tie";
            }
          }
          yesCount += yes;
          noCount += no;
          abstainCount += abstain;
          var node = (
            <div className={partyClass} key={i}>
              <div className="name">{partyName}</div>
              <div className={yesClass}><span>{yes}</span></div>
              <div className={noClass}><span>{no}</span></div>
              <div className={abstainClass}><span>{abstain}</span></div>
            </div>
          );
          partyVoteNodes.push(node);
        }
        var totalClass = "partyVote total ";
        if (yesCount > noCount) {
          if (yesCount > abstainCount) {
            totalClass += " yes";
          }
          else {
            totalClass += " abstain";
          }
        }
        else {
          if (noCount > abstainCount) {
            totalClass += " no";
          }
          else {
            totalClass += " abstain";
          }
        }
        var totalRow = (
          <div className="partyVote total" key="t">
            <div className="name">Total</div>
            <div className="yes"><span>{yesCount}</span></div>
            <div className="no"><span>{noCount}</span></div>
            <div className="abstain"><span>{abstainCount}</span></div>
          </div>
        );
        partyVoteNodes.push(totalRow);
        if (this.props.billInfo.sponsor) {
          var sponsorProfile = getPolitician(undefined, this.props.billInfo.sponsor);
          var imgURL = "url('/static/headshots/" + sponsorProfile.imgurl + "')";
          var sponsorClassString = 'sponsorProfile ';
          var href = '/#/profile/' + sponsorProfile.id;
          if (!sponsorProfile.party_slug) {
            var partyName = sponsorProfile.party_name;
          }
          else {
            sponsorClassString += sponsorProfile.party_slug;
            var partyName = sponsorProfile.party_slug;
          }
          sponsorComponent = (
            <div className="col sponsor">
              <h4>Bill Sponsor</h4>
              <a className={sponsorClassString} href={href} >
                <div style={{backgroundImage: imgURL}}></div>
                <h3>{sponsorProfile.name}</h3>
                <span className="riding">{sponsorProfile.riding}</span>
                <span className="party">{partyName}</span>
              </a>
            </div>
          );
        }
        else {
          sponsorComponent = null;
        }
      }
      else {
        var partyVoteNodes = '';
      }
    }
    else {
      var partyVoteNodes = '';
    }
    var openparliamentURL = "//openparliament.ca/bills/" + this.props.vote.session_id + "/" + this.props.vote.number + "/";
    sessionNumbers = this.props.vote.session_id.split("-");
    var parlURL = "http://www.parl.gc.ca/LEGISInfo/LAAG.aspx?language=E&Parl=" + sessionNumbers[0] + "&Ses=" + sessionNumbers[1];
    return (
      <div className={infoClass}>
          <div className="col spacer left"></div>
          {sponsorComponent}
          <div className="col partyVotes">
            <h4>Party Votes</h4>
            <div className="partyVotesTable">
              {partyVoteNodes}
            </div>
          </div>
          <div className="col moreBillInfo">
          <h4>More Information</h4>
            
            <a href={openparliamentURL} target="_blank">view bill on openparliament.ca <ArrowIcon /></a>
            <a href={parlURL} target="_blank">view session on parl.gc.ca <ArrowIcon /></a>
          </div>
          <div className="col spacer right"></div>
      </div>
    );
  }
});
var ArrowIcon = React.createClass({
  render: function() {
    return (
      <svg version="1.1" x="0px" y="0px"
         viewBox="0 0 400 400">
        <path d="M163.5,334.5l-47.1-47.1l87.5-87.5l-87.5-87.5l47.1-47.1L298,200L163.5,334.5z"/>
      </svg>
    );
  }
});


module.exports = VoteRow;