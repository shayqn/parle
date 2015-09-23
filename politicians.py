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
    return jsonify(results=pol_results)

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
        "SELECT p.id, p.name, p.name_family, p.headshot, c.slug, c.short_name, e.end_date, r.name AS riding_name "
        "FROM core_politician p, core_party c, core_electedmember e, core_riding r "   # table_name abbreviation, ...
        "WHERE p.gender NOT LIKE '' "   # appears to help filter for "real" MPs?
        "AND p.headshot NOT LIKE '' "   # appears to help filter for "real" MPs?
        "AND p.id = e.politician_id "   # joins politician info with elected member rows (multiple if re-elected)
        "AND e.party_id = c.id "        # joins elected member rows with associated party rows
        "AND r.id = e.riding_id "
        "AND e.start_date = "           # we only want their most recent party data, so let's pick that one
        "( "                            # we want (e.start_date = most recent e.start_date)
        "  SELECT start_date "
        "  FROM core_electedmember "    # get all electedmember records associated with each politicians
        "  WHERE politician_id = p.id " # yep, we can still use p.id in here!
        "  ORDER BY start_date "        # sort them by start_date
        "  DESC LIMIT 1 "               # limiting to one only selects the most recent date
        ") "
        "AND (e.end_date > '2006-01-01' OR e.end_date IS NULL) "
        "ORDER BY p.name_family"        # order by last name
    )

    # Fetch results to a dictionary labelled "raw" as there are some evaluations that need to happen
    raw_pol_results = cursor.fetchall()

    # Create a list to store our final result
    pol_results = []

    # Iterate through each result
    for row in raw_pol_results:
        # Add desired data to results in dictionary form
        pol_results.append({
            # 'JSON-KEY' : row['DATABASE-KEY'], JSON-KEY is used in React only
            'id': row['id'],
            'name': row['name'],
            'name_family': row['name_family'],
            'imgurl': row['headshot'].split('/')[-1],   # extracts filename only, no directory data
            'party_slug': row['slug'],
            'party_name': row['short_name'],
            'active': False if row['end_date'] else True,
            'riding' : row['riding_name']})  # boolean: if an end_date exists, they are no longer active

    # Return JSON as well just in case we want to use it with AJAX calls
    return jsonify(results=pol_results)
