# specify base image that we want to extend
FROM postgis/postgis:14-3.3
# set environment variables that we want to change
ENV POSTGRES_USER=alex
ENV POSTGRES_PASSWORD="gis_pass"
ENV POSTGRES_DB=posgres_db

RUN apt-get update
RUN apt-get install -y osm2pgsql

