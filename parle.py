import sys
from flask import Flask
from flask import render_template
import psycopg2
from settings import DBHOST, DBNAME, DBUSER, DBPASSWORD
reload(sys)
sys.setdefaultencoding("utf-8")

conn = psycopg2.connect("host=" + DBHOST + " dbname=" + DBNAME + " user=" + DBUSER + " password = " + DBPASSWORD)

# Open a cursor to perform database operations
cur = conn.cursor()

app = Flask(__name__)

cur.execute("SELECT name,id FROM core_politician WHERE gender NOT LIKE '' ORDER BY name_family")
nameID = cur.fetchmany(10)

def getPolInfo(politician_id):
    cur.execute("SELECT votequestion_id \
FROM bills_membervote \
WHERE politician_id = '" + str(politician_id) + "' AND \
votequestion_id IN \
(SELECT id FROM bills_votequestion \
WHERE description_en LIKE ('%Bill be now read a third time and do pass%')) \
ORDER BY votequestion_id")

    memberVoteID = cur.fetchall()
    print memberVoteID
    return memberVoteID

print nameID

@app.route('/')
def def_index():
    return render_template('index.html',nameID = nameID)

@app.route('/<id>')
def politican_page(id):
    memberVoteID = getPolInfo(id)
    return render_template('pol.html',memberVoteID = memberVoteID)

if __name__ == '__main__':
    app.debug = True
    app.run()
