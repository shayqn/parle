"""
Contains the function for returning the list of existing sessions of parliament within the database.

Functions:
    get_session_json: returns parliament sessions JSON

Modules:
    database: for the get_cursor function that returns an opened database cursor
    flask: for jsonify so our results return to React in a nice JSON package
"""
from database import get_cursor
from flask import jsonify

def get_sessions_json():
    """
    Returns all sessions of parliament with their name and id in JSON.

    Related React.js component: <BillSearch />

    :return: a jsonify'd dictionary with all the desired profile information
    """
    # Get the cursor
    cursor = get_cursor()

    # Select the name and id of all existing sessions
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
