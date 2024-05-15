require("dotenv").config()
const { MongoClient } = require("mongodb")
const client = new MongoClient(process.env.URL)

async function GetConnection()
{
    try
    {
        let result = await client.connect()
        let db = result.db("Uphill")
        console.log("Uphill database connected successfully")
        return db
    }
    catch(error)
    {
        console.log("Error connectiog Uphill database : ",error)
    }
}

module.exports = GetConnection