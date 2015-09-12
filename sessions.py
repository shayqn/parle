"""


Functions:
    get_session_json: for <Bill /> objects

Modules:
    database: for the cursor object
    flask: for jsonify so our results return to React in a nice JSON package
"""
from database import cursor
from flask import jsonify

def get_sessions_json(cursor=cursor):
    """

    Related React.js component: <ProfileBox />

    :param cursor: current database cursor - no need to supply this or change this from the default
    :return: a jsonify'd dictionary with all the desired profile information
    """

    # added new join query to get all the bill/vote info for the table in one go. replaces the above query.
    # bill JSON will be changed to use the bill ID instead
    query = (
        "SELECT id, name "
        "FROM core_session "
        "ORDER BY id DESC "
    )

    # Execute query
    cursor.execute(query)

    # Fetch results
    session_results = cursor.fetchall()

    # return a JSON response to React (includes header, no extra work needed)
    return jsonify(results=session_results)
