'use strict';

module.exports = {
    "id": {
        "type": "number",
        "required": false
    },
    "firstName": {
        "required": true,
        "type": "string"
    },
    "lastName": {
        "required": true,
        "type": "string"
    },
    "phone": {
        "type":"string",
        "required":false
    },
    "emails": {
        "required": false,
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "address": {"type": "string", "format": "email", "required": true},
                "primary": {"type": "boolean", "required": true}
            }
        }
    }
};