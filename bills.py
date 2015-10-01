"""
All bill-related data functions are contained within this module.

Functions:
    get_bill_json: for <Bill /> objects

Modules:
    database: for the get_cursor function that returns an opened database cursor
    flask for jsonify: so our results return to React in a nice JSON package
"""
from database import get_cursor
from flask import jsonify

def get_bill_json(votequestion_id):

    """
    Returns the JSON data for information on a single specific bill within a politician's profile.
    Is requested as the <Profile /> component is built in React.

    Related React.js component: <Bill />


    :param votequestion_id: votequestion_id that corresponds to the single bill requested

    :return: a jsonify'd dictionary with all the desired bill information
    """
    # get the cursor
    cursor = get_cursor()

    query = (
        "SELECT b.vote, p.name, p.slug, c.politician_id "
        "FROM bills_membervote b, core_electedmember c, core_party p, bills_votequestion v "
        "WHERE b.politician_id = c.politician_id "
        "AND c.party_id = p.id "
        "AND b.votequestion_id = (%s) "
        "AND v.id = b.votequestion_id "
        "AND c.start_date = "           # we only want their most recent party data, so let's pick that one
        "( "                            # we want (e.start_date = most recent e.start_date)
        "  SELECT start_date "
        "  FROM core_electedmember "    # get all electedmember records associated with each politicians
        "  WHERE politician_id = c.politician_id "
        "  AND start_date < v.date "
        "  ORDER BY start_date "        # sort them by start_date
        "  DESC LIMIT 1 "               # limiting to one only selects the most recent date
        ") "
        "ORDER BY c.party_id "
    )

    # If any parameters are used in the above query, insert them in the parameters tuple
    # Insert parameters in the order used in the query unless using %(name)s placeholders
    # see http://initd.org/psycopg/docs/usage.html#passing-parameters-to-sql-queries for more information
    parameters = (votequestion_id,)

    # Execute query
    cursor.execute(query, parameters)

    # Fetch results
    bill_results = cursor.fetchall()

    partyvotes = {}
    for bill in bill_results:
        party_name = bill['name']
        if bill['slug']:
            party_name = bill['slug']
        if party_name not in partyvotes:
            partyvotes[party_name] = {}
            partyvotes[party_name]['Y'] = 0
            partyvotes[party_name]['A'] = 0
            partyvotes[party_name]['N'] = 0
            partyvotes[party_name]['P'] = 0
        partyvotes[party_name][bill['vote']] += 1

    query = (
        "SELECT b.sponsor_politician_id "
        "FROM bills_bill b, bills_votequestion v "
        "WHERE v.id = (%s) "
        "AND b.id = v.bill_id "
    )

    # If any parameters are used in the above query, insert them in the parameters tuple
    # Insert parameters in the order used in the query unless using %(name)s placeholders
    # see http://initd.org/psycopg/docs/usage.html#passing-parameters-to-sql-queries for more information
    parameters = (votequestion_id,)

    # Execute query
    cursor.execute(query, parameters)

    # Fetch results
    sponsor_result = cursor.fetchone()

    # return a JSON response to React (includes header, no extra work needed)
    return jsonify(sponsor=sponsor_result['sponsor_politician_id'], votes=partyvotes)


def get_bill_text_json(bill_id):

    """
    Returns the JSON data for the full text of a single specific bill.

    Related React.js component: <BillText />


    :param bill_id: bill_id that corresponds to the single bill requested

    :return: a jsonify'd dictionary with all the desired bill information
    """
    # get the cursor
    cursor = get_cursor()

    query = (
        "SELECT text_en "
        "FROM bills_billtext "
        "WHERE id = (%s)"
    )

    # If any parameters are used in the above query, insert them in the parameters tuple
    # Insert parameters in the order used in the query unless using %(name)s placeholders
    # see http://initd.org/psycopg/docs/usage.html#passing-parameters-to-sql-queries for more information
    parameters = (bill_id,)

    # Execute query
    cursor.execute(query, parameters)

    # Fetch results
    bill_text_results = cursor.fetchone()

    # return a JSON response to React (includes header, no extra work needed)
    return jsonify(results=bill_text_results)
