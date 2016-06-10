'use strict';
var soajs = require('soajs');
var config = require('./config.js');
var EBLModule = require("./lib/event.js");
var LBLModule = require("./lib/loc.js");
var TBLModule = require("./lib/theme.js");
var PBLModule = require("./lib/products.js");

var service = new soajs.server.service(config);

function initEBLModel(req, res, cb) {
	var modelName = "event";
	if(process.env.SOAJS_TEST && req.soajs.inputmaskData.model){
		modelName = req.soajs.inputmaskData.model;
	}
	EBLModule.init(modelName, function (error, BL) {
		if (error) {
			req.soajs.log.error(error);
			return res.json(req.soajs.buildResponse({"code": 407, "msg": config.errors[407]}));
		}
		else {
			return cb(BL);
		}
	});
}
function initLBLModel(req, res, cb) {
	var modelName = "loc";
	if(process.env.SOAJS_TEST && req.soajs.inputmaskData.model){
		modelName = req.soajs.inputmaskData.model;
	}
	LBLModule.init(modelName, function (error, BL) {
		if (error) {
			req.soajs.log.error(error);
			return res.json(req.soajs.buildResponse({"code": 407, "msg": config.errors[407]}));
		}
		else {
			return cb(BL);
		}
	});
}
function initTBLModel(req, res, cb) {
	var modelName = "theme";
	if(process.env.SOAJS_TEST && req.soajs.inputmaskData.model){
		modelName = req.soajs.inputmaskData.model;
	}
	TBLModule.init(modelName, function (error, BL) {
		if (error) {
			req.soajs.log.error(error);
			return res.json(req.soajs.buildResponse({"code": 407, "msg": config.errors[407]}));
		}
		else {
			return cb(BL);
		}
	});
}
function initPBLModel(req, res, cb) {
	var modelName = "product";
	if(process.env.SOAJS_TEST && req.soajs.inputmaskData.model){
		modelName = req.soajs.inputmaskData.model;
	}
	PBLModule.init(modelName, function (error, BL) {
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
	service.get("/g/event/:id", function (req, res) {
		initEBLModel(req, res, function (BL) {
			BL.getEvent(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Get all events
	 */
	service.get("/g/events", function (req, res) {
		initEBLModel(req, res, function (BL) {
			BL.getEvents(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Add one event
	 */
	service.post("/p/events", function (req, res) {
		initEBLModel(req, res, function (BL) {
			BL.addEvent(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Add media to an event
	 */
	service.post("/event/:id/medias", function (req, res) {
		initEBLModel(req, res, function (BL) {
			BL.addMedia(config, req, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Check in to an event
	 */
	service.post("/event/:id/checkin", function (req, res) {
		initEBLModel(req, res, function (BL) {
			BL.checkin(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Update one event
	 */
	service.put("/event/:id", function (req, res) {
		initEBLModel(req, res, function (BL) {
			BL.updateEvent(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Get all locations
	 */
	service.get("/locs", function (req, res) {
		initLBLModel(req, res, function (BL) {
			BL.getLocations(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Book a location
	 */
	service.post("/loc/:id/booking", function (req, res) {
		initLBLModel(req, res, function (BL) {
			BL.book(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Get all themes
	 */
	service.get("/themes", function (req, res) {
		initTBLModel(req, res, function (BL) {
			BL.getThemes(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Get all products
	 */
	service.get("/products", function (req, res) {
		initPBLModel(req, res, function (BL) {
			BL.getProducts(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	service.start();
});