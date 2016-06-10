'use strict';
var soajs = require('soajs');
var Mongo = soajs.mongo;
var mongo;

var dbName = "momento";
var collName = "locations";
var BookingCollName = "booking";

function checkIfMongo(soajs) {
	if (!mongo) {
		mongo = new Mongo(soajs.registry.coreDB[dbName]);
	}
}

function validateId(id, cb) {
	try {
		return cb(null, mongo.ObjectId(id));
	}
	catch (e) {
		return cb(e);
	}
}

module.exports = {

	"getLocations": function (soajs, cb) {
		checkIfMongo(soajs);
		var options = {};
		if (soajs.inputmaskData.from && soajs.inputmaskData.to) {
			options = {
				start: soajs.inputmaskData.from,
				limit: soajs.inputmaskData.to
			};
		}
		mongo.find(collName, {}, options, cb);
	},

	"book": function (soajs, cb) {
		checkIfMongo(soajs);
		var rec = soajs.inputmaskData.data;
		rec.location = soajs.inputmaskData.id;
		mongo.insert(BookingCollName, rec, function(error){
			return cb(error, true);
		});
	}
};