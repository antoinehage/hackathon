"use strict";

module.exports = {
    "theme": {
        "type":"number",
        "required":true,
        "ref": "theme.id"
    },
    "owner": {
        "type": "object",
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
        "required": true
    },
    "medias":{
        "type": "array"
    },
    "checkins":{
        "type": "array"
    }
}
;