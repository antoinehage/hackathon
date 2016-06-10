"use strict";

module.exports = {
    theme: {
        "type":"number",
        "required":true,
        "ref": "theme.id"
    },
    owner: {
        type: "object",
        "properties": {
            "firstName": {
                "required": true,
                "type": "string"
            },
            "lastName": {
                "required": true,
                "type": "string"
            },
            "phone":{

            },
            "emails": {
                "required": true,
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "address": {"type": "string", "format": "email", "required": true},
                        "primary": {"type": "boolean", "required": true}
                    }
                }
            }
        }
    },
    "location": {
        "type": "number",
        "minItems": 1,
        "uniqueItems": true,
        "items": {
            "type": "object",
            "properties": {
                "address1": {
                    "type": "string",
                    "required": true
                }
                ,
                "address2": {
                    "type": "string",
                    "required": false
                }
                ,
                "city": {
                    "type": "string",
                    "required": true
                }
                ,
                "state": {
                    "type": "string",
                    "required": true,
                    "pattern": "[A-Z]{2}"
                }
                ,
                "zip": {
                    "type": "string",
                    "required": true
                }
                ,
                "primary": {
                    "type": "boolean",
                    "required": true
                }
            }
        }
    }
}
;