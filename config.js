'use strict';

var event = require(__dirname + "/model/schema/events.js");
var booking = require(__dirname + "/model/schema/bookings.js");
var media = require(__dirname + "/model/schema/medias.js");
var checkin = require(__dirname + "/model/schema/checkins.js");

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
            }
        },

        //Get event by id
        "_get": {
            "/event/:id": {
                "_apiInfo": {
                    "l": "Get event by ID",
                    "group": "Basic",
                    "groupMain": false
                },
                "commonFields": ["id"]
            },

            //Get all events
            "/events": {
                "_apiInfo": {
                    "l": "Get all events",
                    "group": "Basic",
                    "groupMain": true
                },
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
            // Get media of an event
            "/event/:id/media/:filename": {
                "_apiInfo": {
                    "l": "Get media to an event",
                    "group": "Basic"
                },
                "commonFields": ["id"],
                "fileName": {
                    "source": ["params.fileName"],
                    "required": true,
                    "validation": {
                        "type": "string"
                    }
                }
            }
        },
        // post to create a new event
        "_post": {
            "/events": {
                "_apiInfo": {
                    "l": "Add an event to the collection",
                    "group": "Basic",
                    "groupMain": true
                },
                "data": {
                    "required": true,
                    "source": ["body.data"],
                    "validation": {
                        "type": "object",
                        "properties": event
                    }
                }
            },

            // Post to add a media to an event
            "/event/:id/medias": {
                "_apiInfo": {
                    "l": "Add a media to an event",
                    "group": "Basic",
                    "groupMain": true
                },
                "commonFields": ["id"],

                "data": {
                    "required": true,
                    "source": ["body.data"],
                    "validation": {
                        "type": "object",
                        "properties": media
                    }
                }
            },

            // Post to add a checkin to an event
            "/event/:id/checkin": {
                "_apiInfo": {
                    "l": "Checkin to an event",
                    "group": "Basic"
                },
                "commonFields": ["id"],

                "data": {
                    "required": true,
                    "source": ["body.data"],
                    "validation": {
                        "type": "object",
                        "properties": checkin
                    }
                }
            }
        },

        //put to modify an event
        "/event/:id": {
            "_apiInfo": {
                "l": "Modify an event",
                "group": "Basic"
            },
            "commonFields": ["id"],

            "data": {
                "required": true,
                "source": ["body.data"],
                "validation": {
                    "type": "object",
                    "properties": event
                }
            }
        },

        //Get to retrieve all the locations
        "/locs": {
            "_apiInfo": {
                "l": "Get a list of possible location for an event",
                "group": "Basic"
            },
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

        "/loc/:id/booking": {
            "_apiInfo": {
                "l": "Book a location for an event",
                "group": "Basic"
            },
            "commonFields": ["id"],
            "data": {
                "required": true,
                "source": ["body.data"],
                "validation": {
                    "type": "object",
                    "properties": booking
                }
            }
        },
        "/themes": {
            "_apiInfo": {
                "l": "Get a List of supported event theme",
                "group": "Basic"
            },
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
        "/products": {
            "_apiInfo": {
                "l": "Get a List of products",
                "group": "Basic"
            },
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
        }


    }
};