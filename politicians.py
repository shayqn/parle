"""
All politician and politician profile-related data functions are contained within this module.

Functions:
    get_pol_json: for <Bill /> objects
    get_initial_json: for generating the initial politician list data

Modules:
    database: for the cursor object
    flask: for jsonify so our results return to React in a nice JSON package
    json: for dump, which allows us to export the JSON into a file instead
"""
from database import cursor
from flask import jsonify
from json import dump

# <SHAY> THIS IS THE MAIN FUNCTION TO WORRY ABOUT
# feel free to make additional helper functions in this file
def get_pol_json(politician_id, cursor=cursor):
    """
    Returns all the data related to a single specific politician when a user requests their profile.
    Anything we want in the profile has to be sent from here in JSON, so this is where all the magic happens.

    Related React.js component: <ProfileBox />

    :param politician_id: id of the single politician requested
    :param cursor: current database cursor - no need to supply this or change this from the default
    :return: a jsonify'd dictionary with all the desired profile information
    """
    # <SHAY> BUILD THIS QUERY
    # Build our query with all the desired relevant info we want to display about the politician.
    # Add any parameters using (%s) or (%(name)s). More information below.
    query = (
        "SELECT votequestion_id "
        "FROM bills_membervote "
        "WHERE politician_id = (%s)"
        "AND votequestion_id IN "
        "( "
        "  SELECT id "
        "  FROM bills_votequestion "
        "  WHERE description_en "
        "  LIKE (\'%%Bill be now read a third time and do pass%%\')"
        ") "
        "ORDER BY votequestion_id"
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

def get_initial_json(cursor=cursor):
    """
    Returns the basic information (id, name, last name, headshot, party slug, party name, currently active/elected)
    as well as writes it to a local JSON file. The purpose of this function is to somewhat decrease loading time by
    giving React a static file to read instead of making repeated database requests, as this information rarely changes.
    The function only needs to be run when it is expected that the underlying data has been updated.

    Related React.js component: <SearchBox />

    :param cursor: current database cursor - no need to supply this or change this from the default
    :return: a jsonify'd dictionary of all the basic elements needed for the initial search/render
    """

    # This is a somewhat different looking SQL statement as it's doing inner joins across three tables.
    # The three tables are all given notations (p, c, e) so their fields can be distinguished.
    cursor.execute(
        "SELECT p.id, p.name, p.name_family, p.headshot, c.slug, c.short_name, e.end_date "
        "FROM core_politician p, core_party c, core_electedmember e "   # table_name abbreviation, ...
        "WHERE p.gender NOT LIKE '' "   # appears to help filter for "real" MPs?
        "AND p.headshot NOT LIKE '' "   # appears to help filter for "real" MPs?
        "AND p.id = e.politician_id "   # joins politician info with elected member rows (multiple if re-elected)
        "AND e.party_id = c.id "        # joins elected member rows with associated party rows
        "AND e.start_date = "           # we only want their most recent party data, so let's pick that one
        "( "                            # we want (e.start_date = most recent e.start_date)
        "  SELECT start_date "
        "  FROM core_electedmember "    # get all electedmember records associated with each politicians
        "  WHERE politician_id = p.id " # yep, we can still use p.id in here!
        "  ORDER BY start_date "        # sort them by start_date
        "  DESC LIMIT 1 "               # limiting to one only selects the most recent date
        ") "
        "ORDER BY p.name_family"        # order by last name
    )
    # we're not picking anything specific for this, so no parameters needed, just execute it directly

    # Fetch results to a dictionary labelled "raw" as there are some evaluations that need to happen
    raw_pol_results = cursor.fetchall()

    # Create a list to store our final result
    pol_results = []

    # Iterate through each result
    for row in raw_pol_results:
        # add desired data to results in dictionary form
        pol_results.append({
            # 'JSON-KEY' : row['DATABASE-KEY'], JSON-KEY is used in React only
            'id': row['id'],
            'name': row['name'],
            'name_family': row['name_family'],
            'imgurl': row['headshot'].split('/')[-1],   # extracts filename only, no directory data
            'party_slug': row['slug'],
            'party_name': row['short_name'],
            'active': False if row['end_date'] else True})  # boolean: if an end_date exists, they are no longer active

    # Write data to file initial.json for React to access
    with open('initial.json', 'w') as outfile:
        # dump is better for converting JSON for a file
        # but we still need to wrap our output in {'results': pol_results} to match jsonify's style
        dump({'results': pol_results}, outfile)

    # Return JSON as well just in case we want to use it with AJAX calls
    return jsonify(results=pol_results)
