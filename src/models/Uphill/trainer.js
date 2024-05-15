const trainerSchema = {
    "jsonSchema" : {
        "bsonType" : "object",
        "required" : ["username","email","hash"],
        "properties" : {
            "username" : {
                "bsonType" : "string"
            },
            "email" : {
                "bsonType" : "string"
            },
            "hash" : {
                "bsonType" : "string"
            }
        }
    }
}

module.exports = trainerSchema