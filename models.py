from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from lxml import etree
from string import ascii_lowercase
import re
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./test.db'
db = SQLAlchemy(app)


@app.route('/')
def hello_world():
    return 'Hello World!'

def alpha_only(string):
    lower_string = string.lower()
    return "".join(ch for ch in lower_string if ch in ascii_lowercase)


class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(250), unique=True, index=True)
    name = db.Column(db.String(250))
    first_name = db.Column(db.String(120))
    last_name = db.Column(db.String(120))
    url = db.Column(db.String(120))
    pid = db.Column(db.Integer, unique=True)

    constituency_key = db.Column(db.Integer, db.ForeignKey('constituency.id'))
    constituency = db.relationship('Constituency', backref='members')
    caucus_key = db.Column(db.Integer, db.ForeignKey('caucus.id'))
    caucus = db.relationship('Caucus', backref='members')

    def __init__(self, first_name, last_name, constituency, caucus, pid, url):
        self.slug = alpha_only(first_name+last_name+str(pid))
        self.name = first_name + ' ' + last_name
        self.first_name = first_name
        self.last_name = last_name
        self.pid = pid
        self.constituency = constituency
        self.caucus = caucus
        self.url = url

    def __repr__(self):
        return '<Member %r>' % self.name


class Constituency(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(250))
    name = db.Column(db.String(250))

    def __init__(self, name):
        self.slug = alpha_only(name)
        self.name = name


class Caucus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(32))
    abbreviation = db.Column(db.String(32))
    name = db.Column(db.String(120))
    full_name = db.Column(db.String(120))

    def __init__(self, name, abbreviation, full_name):
        self.slug = alpha_only(abbreviation)
        self.name = name
        self.full_name = full_name
        self.abbreviation = abbreviation


class Parliament(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)

    def __init__(self, number):
        self.id = number


class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer)
    parliament_id = db.Column(db.Integer, db.ForeignKey('parliament.id'))
    parliament = db.relationship('Parliament', backref='sessions')

    def __init__(self, parliament, session_id):
        self.session_id = session_id
        self.parliament = parliament

    @property
    def number(self):
        return '%s-%s' % (self.parliament_id, self.id)


class Bill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(10))
    number = db.Column(db.String(10))
    title_en = db.Column(db.Text)
    short_title_en = db.Column(db.String(250))

    session_id = db.Column(db.Integer, db.ForeignKey('session.id'))
    session = db.relationship('Session', backref='bills')
    sponsor_id = db.Column(db.Integer, db.ForeignKey('member.id'))
    sponsor = db.relationship('Member', backref='bills')

    def __init__(self, number, title_en, short_title_en, session, sponsor):
        self.slug = number
        self.number = number
        self.title_en = title_en
        self.short_title_en = short_title_en
        self.session = session
        self.sponsor = sponsor


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text)
    final = db.Column(db.Boolean)
    decision = db.Column(db.String(12))
    date = db.Column(db.String(12))
    number = db.Column(db.Integer)

    bill_id = db.Column(db.Integer, db.ForeignKey('bill.id'))
    bill = db.relationship('Bill', backref='events')
    session_id = db.Column(db.Integer, db.ForeignKey('session.id'))
    session = db.relationship('Session', backref='events')

    def __init__(self, bill, description, decision, date, number, session):
        self.description = description
        self.decision = decision
        self.bill = bill
        self.date = date
        self.number = number
        self.final = '3rd reading' in description
        self.session = session


class Vote(db.Model):
    key = db.Column(db.Integer, primary_key=True)
    vote = db.Column(db.String(10))

    member_id = db.Column(db.Integer, db.ForeignKey('member.id'))
    member = db.relationship('Member', backref='votes')
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'))
    event = db.relationship('Event', backref='votes')
    constituency_id = db.Column(db.Integer, db.ForeignKey('constituency.id'))
    constituency = db.relationship('Constituency', backref='votes')
    caucus_id = db.Column(db.Integer, db.ForeignKey('caucus.id'))
    caucus = db.relationship('Caucus', backref='votes')

    def __init__(self, member, event, vote, constituency, caucus):
        self.vote = vote
        self.member = member
        self.event = event
        self.constituency = constituency
        self.caucus = caucus


def get_pol_json(politician_id):
    # m.votequestion_id,m.vote,b.number,b.name_en,b.law,b.short_title_en, v.session_id
    member = Member.query.filter_by(id=politician_id).first()
    final_votes = Member.votes.filter(Vote.event.final).all()
    response_array = []
    for vote in final_votes:
        vote_dictionary = dict()
        vote_dictionary['vote'] = vote.vote
        vote_dictionary['number'] = vote.number
        vote_dictionary['name_en'] = vote.event.bill.name_en
        vote_dictionary['short_name_en'] = vote.event.bill.short_name_en
        vote_dictionary['decision'] = vote.event.decision
        vote_dictionary['session'] = vote.event.bill.session.id
        response_array.append(vote_dictionary)


db.create_all()


def get_parties():
    xml = etree.parse('parties.xml')
    tree = xml.getroot()
    for branch in tree:
        name = branch.find('Name').text
        abbreviation = branch.find('Abbreviation').text
        full_name = branch.find('FullName').text
        db.session.add(Caucus(name, abbreviation, full_name))

def get_session():
    parliament = Parliament(42)
    db.session.add(parliament)
    session = Session(parliament, 1)
    db.session.add(session)

def get_members():
    response = requests.get('http://www.parl.gc.ca/Parliamentarians/en/members?view=ListAll&parliament=42')
    tree = etree.HTML(response.content)
    table = tree.findall(".//table[@class]/tbody/tr")
    for row in table:
        last_name = row.findtext("td[@class='personName']/a/span[@class='last-name']")
        first_name = row.findtext("td[@class='personName']/a/span[@class='first-name']")
        caucus_text = row.findtext("td[@class='caucus']/a")
        constituency_name = row.findtext("td[@class='constituency']/a")
        url = row.find("td[@class='personName']/a").get('href')
        id = re.search(r'\((\d+)\)', url).group(1)
        constituency = Constituency(constituency_name)
        db.session.add(constituency)
        caucus = Caucus.query.filter_by(name=caucus_text).first()
        existing = Member.query.filter_by(pid=id).first()
        if existing is None:
            db.session.add(Member(first_name, last_name, constituency, caucus, id, url))
        else:
            existing.first_name = first_name
            existing.last_name = last_name
            existing.constituency = constituency
            existing.caucus = caucus
            existing.url = url
    #result = etree.tostring(tree, pretty_print=True, method="html")
    #print(result)

def get_bills():
    response = requests.get('http://www.parl.gc.ca/LegisInfo/Home.aspx?Mode=1&ParliamentSession=42-1&Language=E&download=xml')
    tree = etree.fromstring(response.content)
    for bill in tree:
        title_en = bill.findtext("BillTitle/Title[@language='en']")
        short_title_en = bill.findtext("ShortTitle/Title[@language='en']")
        number = bill.find("BillNumber").get('prefix') + '-' + str(bill.find("BillNumber").get('number'))
        parliament_number = bill.find("ParliamentSession").get('parliamentNumber')
        session_number = bill.find("ParliamentSession").get('sessionNumber')
        session = Session.query.filter_by(parliament_id=parliament_number, session_id=session_number).first()
        sponsor_id = bill.find("SponsorAffiliation/Person").get('id')
        sponsor = Member.query.filter_by(pid=sponsor_id).first()
        existing = Bill.query.filter_by(number=number, session=session, sponsor=sponsor).first()
        if existing is None:
            db.session.add(Bill(number, title_en, short_title_en, session, sponsor))
        else:
            existing.title_en = title_en
            existing.short_title_en = short_title_en



def get_events():
    response = requests.get('http://www.parl.gc.ca/HouseChamberBusiness/Chambervotelist.aspx?Language=E&Mode=1&Parl=42&Ses=1&FltrParl=42&FltrSes=1&xml=True&SchemaVersion=1.0')
    tree = etree.fromstring(response.content)
    for event in tree:
        description = event.findtext("Description")
        parliament_number = event.get('parliament')
        session_number = event.get('session')
        session = Session.query.filter_by(parliament_id=parliament_number, session_id=session_number).first()
        bill_node = event.find("RelatedBill")
        if bill_node is not None:
            bill_number = bill_node.get('number')
            bill = Bill.query.filter_by(number=bill_number, session_id=session.id).first()
        else:
            bill = None
        decision = event.findtext("Decision")
        date = event.get('date')
        number = event.get('number')
        existing = Event.query.filter_by(number=number, session=session).first()
        if existing is None:
            db.session.add(Event(bill, description, decision, date, number, session))
        else:
            existing.bill = bill
            existing.description = description
            existing.decision = decision
            existing.date = date



def get_votes():
    members = Member.query.all()
    for member in members:
        url = 'http://www.parl.gc.ca' + member.url + '/ExportVotes?sessionId=152&output=XML'
        response = requests.get(url)
        tree = etree.fromstring(response.content)
        for branch in tree:
            parliament_number = branch.findtext("ParliamentNumber")
            session_number = branch.findtext("SessionNumber")
            if (parliament_number == '42') and (session_number == '1'):
                event_number = branch.findtext("DecisionDivisionNumber")
                session = Session.query.filter_by(parliament_id=parliament_number, session_id=session_number).first()
                event = Event.query.filter_by(session_id=session.id, number=int(event_number)).first()
                vote = branch.findtext("VoteValueName")
                constituency_name = branch.findtext("ConstituencyName")
                constituency = Constituency.query.filter_by(slug=alpha_only(constituency_name)).first()
                existing = Vote.query.filter_by(member=member, event=event).first()
                if existing is None:
                    db.session.add(Vote(member, event, vote, constituency, member.caucus))
                else:
                    existing.vote = vote
                    existing.constituency = constituency
                    existing.caucus = member.caucus

    # events = Event.query.all()
    # for event in events:
    #     number = event.number
    #     response = requests.get('http://www.parl.gc.ca/HouseChamberBusiness/Chambervotedetail.aspx?Language=E&Mode=1&Parl=42&Ses=1&FltrParl=42&FltrSes=1&vote=' + str(number) + '&xml=True')
    #     tree = etree.fromstring(response.content)
    #     for branch in tree:
    #         if branch.tag == 'Participant':
    #             first_name = branch.findtext("FirstName")
    #             last_name = branch.findtext("LastName")
    #             constituency = branch.findtext("Constituency")
    #             party = branch.findtext("Party")
    #             if branch.findtext("RecordedVote/Yea") == '1':
    #                 vote = 'Yea'
    #             elif branch.findtext("RecordedVote/Nay") == '1':
    #                 vote = 'Nea'
    #             else:
    #                 vote = None
    #             constituency = Constituency.query.filter_by(slug=alpha_only(constituency)).first()
    #             caucus = Caucus.query.filter_by(name=party).first()
    #             member = Member.query.filter_by(first_name=first_name, last_name=last_name).first()
    #             db.session.add(Vote(member, event, vote, constituency, caucus))

get_session()
get_parties()
get_members()
get_bills()
get_events()
get_votes()
db.session.commit()

# response = requests.get('http://www.parl.gc.ca/Parliamentarians/en/members/export?parliament=42&output=XML')
# print(response.content)
# tree = etree.fromstring(response.content)
#
# for branch in tree:
#     first_name = branch.find('PersonOfficialFirstName').text
#     last_name = branch.find('PersonOfficialLastName').text
#     constituency = branch.find('ConstituencyName').text
#     province = branch.find('ConstituencyProvinceTerritoryName').text
#     caucus = branch.find('CaucusShortName').text
#     db.session.add(Member(first_name, last_name, constituency, province, caucus))
# db.session.commit()
# print(Member.query.all())

if __name__ == '__main__':
    app.run()
