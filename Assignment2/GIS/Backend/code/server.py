from flask import Flask, escape, request
import psycopg2

app = Flask(__name__)

@app.route('/')
def hello():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'


@app.route('/add')
def add():
    # do something here to retrieve both numbers from the url
    # check above on how to get default values with get()
    number1 = request.args.get("number1", type=int)
    if not(bool(number1)):
        number1 = 0
    number2 = request.args.get("number2", type=int)
    if not(bool(number2)):
        number2 = 0
    return f"{number1 + number2}"


@app.route('/how_many')
def howmany():
    # Don’t change the parameters database and port.
    # You just have to change the dbname, user and password!
    connection = psycopg2.connect(host="database", port=5432,
                                   dbname="posgres_db", user="alex",
                                   password="gis_pass")
    # TODO: if present, get amenity type from URL
    if bool(request.args.get("type")):
        type = request.args.get("type")
        print(f"HERE {type}".format(type))
        query = f"SELECT COUNT(amenity) FROM planet_osm_point WHERE amenity ='{type}'".format(type)
    else:
        query = "SELECT COUNT(amenity) FROM planet_osm_point WHERE amenity is NOT NULL" 
        

    
    # Your query should return only one row
    # Thus fetchone() should be enough
    with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchone()
    #TODO: parse the data in the result variable and return it
    
    howmany = int(result[0])
    
    return f"{howmany}"