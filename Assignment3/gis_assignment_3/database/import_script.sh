#!/bin/bash

# we are now inside the linux environment of our PostGIS container
echo "Hi from the import script"

# move into importdata directory
cd /importdata

# download OSM data 
wget https://download.geofabrik.de/europe/germany/baden-wuerttemberg/freiburg-regbez-latest.osm.pbf

# import data into database
osm2pgsql --database ${POSTGRES_DB} --host localhost --port 5432 --username ${POSTGRES_USER} --create --slim --drop --latlong /importdata/freiburg-regbez-latest.osm.pbf

echo "Import script execution completed"