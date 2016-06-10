"use strict";

var medias = require("./medias");
var checkins = require("./checkins");

module.exports = {
    "name": {
        "type": "string",
        "required": true
    },
    "description": {
        "type": "string",
        "required": true
    },
    "time": {
        //TODO : what the real type for date???
        "type": "date",
        "required": true
    },
    "theme": {
        "type": "number",
        "required": true,
        "ref": "theme.id"
    },
    "owner": {
        "type": "number",
        "required": true
    },
    "location": {
        "type": "number",
        "required": true
    },
    "medias": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": medias,
            "required": false
        }
    },
    "checkins": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": checkins,
            "required": false
        }
    }
}
;