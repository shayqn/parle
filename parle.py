"""
Main controller for app. Defines app, app routes, and related functions.

Functions:
    get_index: loads front-end template, returns main React app
    get_initial: pre-compiles JSON data for React app initial display and search
    get_pol: returns JSON data for politician profiles
    get_bill: returns JSON data for bills

Modules:
    sys: to fix our unicode issues
    flask: flask
    politicians: for all politician/profile related functions
    bills: for all bill related functions
"""
import sys
from flask import Flask, render_template
from politicians import get_initial_json, get_pol_json
from bills import get_bill_json, get_bill_text_json
from sessions import get_sessions_json


# fixes encoding issues with database data (would be nice to know more about why)
reload(sys)
sys.setdefaultencoding("utf-8")


# declare our app
app = Flask(__name__)


# ROUTES
# Top level
@app.route('/')
def get_index():
    return render_template('index.html')

# Initializing of data (used rarely, will want to restrict access to this eventually)
@app.route('/initialize', methods=['GET'])
def get_initial():
    return get_initial_json()

# Route used by React to fetch information for politician profiles
@app.route('/pol/<int:pol_id>')
def get_pol(pol_id):
    return get_pol_json(pol_id)

# Route used by React to fetch information for individual bills
@app.route('/bill/<int:votequestion_id>')
def get_bill(votequestion_id):
    return get_bill_json(votequestion_id)

# Route used by React to fetch information for individual bills
@app.route('/bill/text/<int:bill_id>')
def get_bill_text(bill_id):
    return get_bill_text_json(bill_id)

# Route used by React to fetch information for sessions
@app.route('/sessions')
def get_sessions():
    return get_sessions_json()


# Run
if __name__ == '__main__':
    app.debug = True    # useful for debugging, but remember to remove in production
    app.run()
