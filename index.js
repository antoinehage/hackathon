'use strict';
var soajs = require('soajs');
var config = require('./config.js');
var BLModule = require("./lib/index");

var service = new soajs.server.service(config);

function initBLModel(req, res, cb) {
	var modelName = "mongo";
	if(process.env.SOAJS_TEST && req.soajs.inputmaskData.model){
		modelName = req.soajs.inputmaskData.model;
	}
	BLModule.init(modelName, function (error, BL) {
		if (error) {
			req.soajs.log.error(error);
			return res.json(req.soajs.buildResponse({"code": 407, "msg": config.errors[407]}));
		}
		else {
			return cb(BL);
		}
	});
}

service.init(function () {

	/**
	 * Get one event
	 */
	service.get("/event/:id", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.getEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Get all events
	 */
	service.get("/events", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.getEntries(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Add one event
	 */
	service.post("/events", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.addEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Add media to an event
	 */
	service.post("/event/:id/medias", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.addEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Check in to an event
	 */
	service.post("/event/:id/checkin", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.addEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Update one event
	 */
	service.put("/event/:id", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.updateEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Get all locations
	 */
	service.get("/locs", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.updateEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Book a location
	 */
	service.post("/loc/:id/booking", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.updateEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Get all themes
	 */
	service.get("/themes", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.updateEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	service.start();
});