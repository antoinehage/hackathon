'use strict';
var soajs = require('soajs');
var Grid = require('gridfs-stream');
var formidable = require('formidable');
var Mongo = soajs.mongo;
var mongo;

var dbName = "momento";
var collName = "events";

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

    "getEvent": function (soajs, cb) {
        checkIfMongo(soajs);
        validateId(soajs.inputmaskData.id, function (error, id) {
            if (error) {
                return cb(error);
            }
            mongo.findOne(collName, {"_id": id}, cb);
        });
    },

    "getEvents": function (soajs, cb) {
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

    "addEvent": function (soajs, cb) {
        checkIfMongo(soajs);
        mongo.insert(collName, soajs.inputmaskData.data, function (error) {
            return cb(error, true);
        });
    },

    "addMedia": function (req, cb) {
        if (!req.query.filename) {
            return cb(new Error('Missing required field [filename]'));
        }
        checkIfMongo(req.soajs);
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.keepExtensions = true;
        form.maxFieldSize = 100 * 1024 * 1024;

        var criteria = {
            'filename': req.query.filename,
            'id': req.soajs.inputmaskData.id
        };
        mongo.findOne("fs.files", criteria, function (error, cert) {
            if (error)
                return cb(error);
            mongo.getMongoSkinDB(function (error, db) {
                if (error)
                    return cb(error);
                var gfs = Grid(db, mongo.mongoSkin);
                form.onPart = function (part) {
                    if (!part.filename) return form.handlePart(part);

                    var fileData = {
                        filename: part.filename
                    };

                    var writeStream = gfs.createWriteStream(fileData);

                    part.pipe(writeStream);
                    writeStream.on('error', function (error) {
                        if (error)
                            return cb(error);
                    });
                    writeStream.on('close', function (file) {

                        mongo.update(collName, {"_id": id}, {"$push": {"medias": req.query.filename}}, {"safe": true}, cb);
                        //return cb(null, true);
                    });
                };
                form.parse(req);
            });
        });
    },

    "getMedia": function (req, cb) {
        checkIfMongo(soajs);
        var condition = {
            'filename': req.soajs.inputmaskData.filename,
            'id': req.soajs.inputmaskData.id
        };
        mongo.findOne('fs.files', condition, function (error, fileInfo) {
            if (error)
                return cb(error);
            mongo.getMongoSkinDB(function (error, db) {
                if (error)
                    return cb(error);
                var gfs = Grid(db, mongo.mongoSkin);
                var gs = gfs.mongo.GridStore(db, fileInfo._id, 'r', {
                    root: 'fs',
                    w: 1,
                    fsync: true
                });
                gs.open(function (error, gstore) {
                    if (error)
                        return cb(error);

                    gstore.read(function (error, filedata) {
                        if (error) {
                            return closeAndLeave(error);
                        }
                        else {
                            gstore.close();
                            res.writeHead(200, {'Content-Type': fileInfo.contentType});
                            res.end(filedata);
                        }
                    });

                });
            });
        });
    },

    "checkin": function (soajs, cb) {
        checkIfMongo(soajs);
        validateId(soajs.inputmaskData.id, function (error, id) {
            if (error) {
                return cb(error);
            }
            mongo.count(collName, {"_id": id}, function (error, count) {
                if (error) {
                    return cb(error);
                }

                if (!count) {
                    return cb(new Error("No entry found for id ", id));
                }

                var updateRec = soajs.inputmaskData.data;
                mongo.update(collName, {"_id": id}, {"$push": {"checkins": updateRec}}, {"safe": true}, cb);
            });
        });
    },

    "updateEvent": function (soajs, cb) {
        checkIfMongo(soajs);
        validateId(soajs.inputmaskData.id, function (error, id) {
            if (error) {
                return cb(error);
            }

            mongo.count(collName, {"_id": id}, function (error, count) {
                if (error) {
                    return cb(error);
                }

                if (!count) {
                    return cb(new Error("No entry found for id ", id));
                }

                var updateRec = soajs.inputmaskData.data;
                mongo.update(collName, {"_id": id}, updateRec, {"multi": false, "upsert": false, "safe": true}, cb);
            });
        });
    }
};