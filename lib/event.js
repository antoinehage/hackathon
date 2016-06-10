'use strict';
var fs = require('fs');

module.exports = {
	"init": function (modelName, cb) {
		var modelPath;

		if (modelName) {
			modelPath = __dirname + "/../model/" + modelName + ".js";
			return requireModel(modelPath, cb);
		}

		modelPath = __dirname + "/../model/memory.js";
		return requireModel(modelPath, cb);

		/**
		 * checks if model file exists, requires it and returns it.
		 * @param filePath
		 * @param cb
		 */
		function requireModel(filePath, cb) {
			//check if file exist. if not return error
			fs.exists(filePath, function (exists) {
				if (!exists) {
					return cb(new Error("Requested Model Not Found!"));
				}

				BL.model = require(filePath);
				return cb(null, BL);
			});
		}
	}
};

function buildResponse(soajs, opts, cb){
	if (opts.error) {
		soajs.log.error(opts.error);
		return cb({"code": opts.code, "msg": opts.config.errors[opts.code]});
	}
	return cb(null, opts.data);
}

var BL = {

	model: null,

	"getEvent": function (config, soajs, cb) {
		BL.model.getEvent(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 401,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	},

	"getEvents": function (config, soajs, cb) {
		BL.model.getEvents(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 402,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	},

	"addEvent": function (config, soajs, cb) {
		BL.model.addEvent(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 404,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	},

	"addMedia": function (config, req, cb) {
		BL.model.addMedia(req, function (error, data) {
			var opts = {
				error: error,
				code: 405,
				config: config,
				data: data
			};
			return buildResponse(req.soajs, opts, cb);
		});
	},

	"getMedia" :  function (config, req, cb) {
		BL.model.getMedia(req, function (error, data) {
			var opts = {
				error: error,
				code: 402,
				config: config,
				data: data
			};
			return buildResponse(req.soajs, opts, cb);
		});
	},

	"checkin": function (config, soajs, cb) {
		BL.model.checkin(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 404,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	},

	"updateEvent": function (config, soajs, cb) {
		BL.model.updateEvent(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 405,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	}
};