const express = require("express")
const router = express.Router()
const GetConnectionUserInfo = require("../db/UserInfoConnection")

router.get("/info", async (req,res)=>{
    const {email} = req.body
    
    try
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("mentor")

        const user = await collection.findOne({email})

        if(!user)
        {
            console.log("Not data till now")
            res.send("Mentor have no data yet")
        }
        else
        {
            console.log(user)
            res.send(user)
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({message : "Error reciving Mentor info"})
    }
})

router.post("/editStudents",async (req,res)=>{
    const {email, data} = req.body

    try 
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("mentor")
    
        const user = await collection.findOne({ email })
    
        if (!user) {
             return res.status(404).send({ message: "Mentor have no data!" })
        }
    
    
        const updateResult = await collection.updateOne(
            { email },
            { $set: { Students: data } }
        )
    
        if(updateResult.modifiedCount === 1)
        {
            res.send({ message: 'Data updated successfully' })
        }
        else
        {
            console.error('Error updating data in database')
             res.status(500).send({ message: 'Error updating data' })
        }
    }
    catch(error)
    {
        console.error(error)
        res.status(500).send({ message: 'Error updating data' })
    }
})

module.exports = router