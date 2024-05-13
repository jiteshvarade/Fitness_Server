require("dotenv").config()
const { MongoClient } = require("mongodb")
const client = new MongoClient(process.env.URL)

async function GetConnectionUserInfo()
{
    try
    {
        let result = await client.connect()
        let db = result.db("UserInfo")
        console.log("UserInfo database connected successfully")
        return db
    }
    catch(error)
    {
        console.log("Error connectiog Uphill database : ",error)
    }
}

module.exports = GetConnectionUserInfo