'use strict';

var event = require(__dirname + "/model/schemas/event.js");

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

		"/event/id/:id": {
			"_apiInfo": {
				"l": "Get event by ID",
				"group": "Basic",
				"groupMain": false
			},
			"commonFields": ["id", "model"]
		},

		"/event/all": {
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

		"/event/new": {
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
							"properties": contact
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

		"/event/update/:id": {
			"_apiInfo": {
				"l": "Update contact by ID",
				"group": "Basic",
				"groupMain": false
			},
			"commonFields": ["id", "model"],
			"data":{
				"required": true,
				"source": ["body.data"],
				"validation":{
					"type": "object",
					"properties": event
				}
			}
		}
	}
};