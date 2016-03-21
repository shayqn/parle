from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from lxml import etree
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)


@app.route('/')
def hello_world():
    return 'Hello World!'


class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    first_name = db.Column(db.String(120))
    last_name = db.Column(db.String(120))
    constituency = db.Column(db.String(250))
    province = db.Column(db.String(32))
    caucus = db.Column(db.String(32))


    def __init__(self, first_name, last_name, constituency, province, caucus):
        self.name = first_name + ' ' + last_name
        self.first_name = first_name
        self.last_name = last_name
        self.constituency = constituency
        self.province = province
        self.caucus = caucus

    def __repr__(self):
        return '<Member %r>' % self.name

db.create_all()
response = requests.get('http://www.parl.gc.ca/Parliamentarians/en/members/export?parliament=42&output=XML')
print(response.content)
tree = etree.fromstring(response.content)
for branch in tree:
    first_name = branch.find('PersonOfficialFirstName').text
    last_name = branch.find('PersonOfficialLastName').text
    constituency = branch.find('ConstituencyName').text
    province = branch.find('ConstituencyProvinceTerritoryName').text
    caucus = branch.find('CaucusShortName').text
    db.session.add(Member(first_name, last_name, constituency, province, caucus))
db.session.commit()
print(Member.query.all())

if __name__ == '__main__':
    app.run()
