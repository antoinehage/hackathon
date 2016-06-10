'use strict';

var event = require(__dirname + "/model/schemas/event.js");
var booking = require(__dirname + "/model/schemas/bookings.js");
var user = require(__dirname + "/model/schemas/users.js");
var media = require(__dirname + "/model/schemas/medias.js");
var checkin = require(__dirname + "/model/schemas/checkins.js");

module.exports = {
    serviceName: "hack",
    serviceVersion: 1,
    servicePort: 4800,
    serviceGroup: "Hackathon",
    extKeyRequired: false,
    type: "service",
    prerequisites: {
        cpu: '',
        memory: ''
    },
    "errors": {
        400: "Error Executing Operations!",
        401: "Entry not found!",
        402: "Error fetching Entries!",
        403: "Error Deleting Entry!",
        404: "Error Adding Entry!",
        405: "Error Updating Entry!",
        406: "Error Matching Criteria!",
        407: "Error Loading Model!"
    },
    "schema": {
        "commonFields": {
            "id": {
                "source": ['params.id'],
                "required": true,
                "validation": {
                    "type": "string"
                }
            },
            "model": {
                "source": ['query.model'],
                "required": false,
                "default": "memory",
                "validation": {
                    "type": "string",
                    "enum": ["memory", "mongo"]
                }
            }
        },

        //Get event by id
        "/g/event/:id": {
            "_apiInfo": {
                "l": "Get event by ID",
                "group": "Basic",
                "groupMain": false
            },
            "commonFields": ["id", "model"]
        },

        //Get all events
        "/g/events": {
            "_apiInfo": {
                "l": "Get all events",
                "group": "Basic",
                "groupMain": true
            },
            "commonFields": ["model"],
            "from": {
                "source": ['query.from', 'body.from'],
                "required": false,
                "default": 0,
                "validation": {
                    "min": 0,
                    "max": 100,
                    "type": "integer"
                }
            },
            "to": {
                "source": ['query.to', 'body.to'],
                "required": false,
                "default": 100,
                "validation": {
                    "min": 0,
                    "max": 100,
                    "type": "integer"
                }
            }
        },

        // post to create a new event
        "/p/events": {
            "_apiInfo": {
                "l": "Add an event to the collection",
                "group": "Basic",
                "groupMain": true
            },
            "commonFields": ["model"],
            "event": {
                "source": ["body.data"],
                "type": "object",
                "properties": event,
                "required": true
            }
        },

        // Post to add a media to an event
        "/event/:id/medias": {
            "_apiInfo": {
                "l": "Adds a media to an event",
                "group": "Basic",
                "groupMain": true
            },
            "commonFields": ["id", "model"],
            "media":{
                "source": ["body.data"],
                "type": "object",
                "properties": media,
                "required": true
            }
        },

        // Post to add a checkin to an event
        "/event/:id/checkin": {
            "_apiInfo": {
                "l": "Checkin to an event",
                "group": "Basic"
            },
            "commonFields": ["id", "model"],
            "name": {
                "source": ["body.data"],
                "type": "object",
                "properties": checkin,
                "required": true
            }
        },
        
        //post to add an event
        "/event/:id": {},

        "/locs": {
            "_apiInfo": {
                "l": "Get a location list",
                "group": "Basic"
            }
        },
        "/events/all": {
            "_apiInfo": {
                "l": "Add new Contact(s)",
                "group": "Basic",
                "groupMain": false
            },
            "commonFields": ["model"],
            "data": {
                "source": ["body.data"],
                "required": true,
                "validation": {
                    "oneOf": [
                        {
                            "type": "object",
                            "properties": "event"
                        },
                        {
                            "type": "array",
                            "minItems": 1,
                            "uniqueItems": true,
                            "items": {
                                "type": "object",
                                "properties": event
                            }
                        }
                    ]
                }
            }
        },

        "/event/:ids": {
            "_apiInfo": {
                "l": "Update contact by ID",
                "group": "Basic",
                "groupMain": false
            },
            "commonFields": ["id", "model"],
            "data": {
                "required": true,
                "source": ["body.data"],
                "validation": {
                    "type": "object",
                    "properties": event
                }
            }
        }
    }
};