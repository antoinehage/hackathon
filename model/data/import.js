var Db = db.getSiblingDB('momento');

load ("locations.js")
Db.locations.insert(locations);


load ("themes.js")
Db.themes.insert(themes);