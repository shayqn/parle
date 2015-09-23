"""
Handles the database connection and cursor creation with the function get_cursor()
We put it in its own module so it can be easily accessed from all others simply using 'from database import get_cursor'

Modules:
    psycopg2: for PostgreSQL interaction
    pyscopg2.extras: for RealDictCursor (to make jsonifying results easier after retrieval)
    settings: for database credentials
"""
import psycopg2
from psycopg2.extras import RealDictCursor
from settings import DBHOST, DBNAME, DBUSER, DBPASSWORD

def get_cursor():
    """
    Creates a database connection using credentials in settings module and opens a cursor.

    :return: a RealDictCursor object for database operations
    """
    # Create our database connection
    # uses the 'keyword arguments' style - see http://initd.org/psycopg/docs/module.html#psycopg2.connect
    db = psycopg2.connect(host=DBHOST, database=DBNAME, user=DBUSER, password=DBPASSWORD)

    # Open a cursor to perform database operations
    # We use the psycopg2.extra RealDictCursor to get results in a Python dictionary instead of tuples
    # This is useful because it preserves a {key1: value2, key2: value2} relationship as opposed to (value1, value2,)
    # see http://initd.org/psycopg/docs/extras.html#real-dictionary-cursor for more information
    return db.cursor(cursor_factory=RealDictCursor)
