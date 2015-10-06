"""
All politician and politician profile-related data functions are contained within this module.

Functions:
    get_pol_json: for <Bill /> objects
    get_initial_json: for generating the initial politician list data

Modules:
    database: for the get_cursor function that returns an opened database cursor
    flask: for jsonify so our results return to React in a nice JSON package
"""
from database import get_cursor
from flask import jsonify

def get_pol_json(politician_id):
    """
    Returns all the data related to a single specific politician when a user requests their profile.
    Anything we want in the profile has to be sent from here in JSON, so this is where all the magic happens.

    Related React.js component: <ProfileBox />

    :param politician_id: id of the single politician requested
    :return: a jsonify'd dictionary with all the desired profile information
    """
    # Get the cursor
    cursor = get_cursor()

    # Build our select query using data from bills_membervote, bills_votequestion, and bills_bill
    # We are currently only interested in the final vote, so the bill description is used to identify those
    # Add any parameters using (%s) or (%(name)s). More information below.
    query = (
        "SELECT m.votequestion_id,m.vote,b.number,b.name_en,b.law,b.short_title_en, v.session_id "
        "FROM bills_membervote m, bills_votequestion v, bills_bill b "
        "WHERE m.politician_id = (%s) "
        "AND v.id = m.votequestion_id "
        "AND v.description_en LIKE (\'%%Bill be now read a third time and do pass%%\') "
        "AND b.id = v.bill_id "
        "ORDER BY v.date DESC"
    )
    # If any parameters are used in the above query, insert them in the parameters tuple
    # Insert parameters in the order used in the query unless using %(name)s placeholders
    # see http://initd.org/psycopg/docs/usage.html#passing-parameters-to-sql-queries for more information
    parameters = (politician_id,)

    # Execute query
    cursor.execute(query, parameters)

    # Fetch results
    pol_results = cursor.fetchall()

    # return a JSON response to React (includes header, no extra work needed)
    return jsonify(votes=pol_results)

def get_initial_json():
    """
    Returns the basic politician information (id, name, last name, headshot, party slug, party name, currently active)
    in JSON format.

    Related React.js component: <SearchBox />

    :return: a jsonify'd dictionary of all the basic elements needed for the initial search/render
    """

    # Get the cursor
    cursor = get_cursor()

    # Create and execute the query for the initial data needed to load the React app
    # We're not picking anything specific for this, so no parameters needed, just execute it directly
    cursor.execute(
        "SELECT p.id, p.name, p.headshot, json_agg(s.session_id ORDER BY s.session_id DESC) as sessions, json_agg(c.id ORDER BY s.session_id DESC) as parties, json_agg(r.id ORDER BY s.session_id DESC) as ridings "
        "FROM core_politician p, core_party c, core_electedmember e, core_riding r, core_electedmember_sessions s "   # table_name abbreviation, ...
        "WHERE p.gender NOT LIKE '' "   # appears to help filter for "real" MPs?
        "AND p.headshot NOT LIKE '' "   # appears to help filter for "real" MPs?
        "AND p.id = e.politician_id "   # joins politician info with elected member rows (multiple if re-elected)
        "AND s.electedmember_id = e.id "
        "AND e.party_id = c.id "        # joins elected member rows with associated party rows
        "AND r.id = e.riding_id "
        "GROUP BY p.id, p.name "
        "ORDER BY p.name_family "        # order by last name
    )

    # Fetch results to a dictionary labelled "raw" as there are some evaluations that need to happen
    pol_results = cursor.fetchall()

    cursor.execute(
        "SELECT id, slug, short_name "
        "FROM core_party "
    )

    raw_party_results = cursor.fetchall()

    party_results = {}
    for party in raw_party_results:
        party_results[party['id']] = {"name": party['short_name'], "slug": party['slug']}

    cursor.execute(
        "SELECT id, name, slug "
        "FROM core_riding "
    )

    raw_riding_results = cursor.fetchall()

    riding_results = {}
    for riding in raw_riding_results:
        riding_results[riding['id']] = {"name": riding['name'], "slug": riding['slug']}

    # Select the name and id of all existing sessions
    cursor.execute(
        "SELECT c.id, c.start, c.end "
        "FROM core_session c "
        "WHERE c.start > '2006-01-01'"
    )

    raw_session_results = cursor.fetchall()
    session_results = {}
    for session in raw_session_results:
        session_results[session['id']] = {"start": str(session['start']), "end": str(session['end'])}

    # Return JSON as well just in case we want to use it with AJAX calls
    return jsonify(politicians=pol_results, parties=party_results, ridings=riding_results, sessions=session_results)
