require("dotenv").config()
const { MongoClient } = require("mongodb")
const client = new MongoClient(process.env.URL)

async function GetConnectionCartInfo()
{
    try
    {
        let result = await client.connect()
        let db = result.db("CartInfo")
        console.log("CartInfo database connected successfully")
        return db
    }
    catch(error)
    {
        console.log("Error connectiog Uphill database : ",error)
    }
}

module.exports = GetConnectionCartInfo