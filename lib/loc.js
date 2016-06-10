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

	"getLocations": function (config, soajs, cb) {
		BL.model.getLocations(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 402,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	},

	"book": function (config, soajs, cb) {
		BL.model.book(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 404,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	}
};