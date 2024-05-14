require("dotenv").config()
const { MongoClient } = require("mongodb")
const client = new MongoClient(process.env.URL)

async function GetConnectionFitnessCart()
{
    try
    {
        let result = await client.connect()
        let db = result.db("FitnessCart")
        console.log("Fitness database connected successfully")
        return db
    }
    catch(error)
    {
        console.log("Error connectiog Fitness database : ",error)
    }
}

module.exports = GetConnectionFitnessCart