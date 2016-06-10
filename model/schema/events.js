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
        "type": "string",
        "required": true
    },
    "theme": {
        "type": "number",
        "required": true
    },
    "ownerId": {
        "type": "number",
        "required": true
    },
    "locId": {
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
};