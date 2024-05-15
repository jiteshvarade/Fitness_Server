const express = require("express")
const router = express.Router()
const GetConnectionUserInfo = require("../db/UserInfoConnection")

router.post("/info", async (req,res)=>{
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

router.post("/getStudents",async (req,res)=>{
    const {email} = req.body

    try
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("mentor")

        const user = await collection.findOne({email})

        if(!user)
        {
            console.log("User have no data till now")
            res.send("User have no data till now")
        }
        else
        {
            console.log(user.Students)
            res.send(user.Students)
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({message : "Error reciving user info"})
    }
})

router.post("/getProfileInfo",async (req,res)=>{
    const {email} = req.body

    try
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("mentor")

        const user = await collection.findOne({email})

        if(!user)
        {
            console.log("User have no data till now")
            res.send("User have no data till now")
        }
        else
        {
            console.log(user.Profile_Info)
            res.send(user.Profile_Info)
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({message : "Error reciving user info"})
    }
})

router.post("/getLessons",async (req,res)=>{
    const {email} = req.body

    try
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("mentor")

        const user = await collection.findOne({email})

        if(!user)
        {
            console.log("User have no data till now")
            res.send("User have no data till now")
        }
        else
        {
            console.log(user.Lessons)
            res.send(user.Lessons)
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({message : "Error reciving user info"})
    }
})

router.post("/getTasks",async (req,res)=>{
    const {email} = req.body

    try
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("mentor")

        const user = await collection.findOne({email})

        if(!user)
        {
            console.log("User have no data till now")
            res.send("User have no data till now")
        }
        else
        {
            console.log(user.Tasks)
            res.send(user.Tasks)
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({message : "Error reciving user info"})
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
            const newUser = await collection.insertOne({email, Students:data})
            console.log("Data uploaded successfully")
            res.send("Data uploaded successfully")
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

router.post("/editLessons",async (req,res)=>{
    const {email, data} = req.body

    try 
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("mentor")
    
        const user = await collection.findOne({ email })
    
        if (!user) {
            const newUser = await collection.insertOne({email, Lessons:data})
            console.log("Data uploaded successfully")
            res.send("Data uploaded successfully")
        }
    
    
        const updateResult = await collection.updateOne(
            { email },
            { $set: { Lessons: data } }
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

router.post("/editProfileInfo",async (req,res)=>{
    const {email, data} = req.body

    try 
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("mentor")
    
        const user = await collection.findOne({ email })
    
        if (!user) {
            const newUser = await collection.insertOne({email, Profile_Info:data})
            console.log("Data uploaded successfully")
            res.send("Data uploaded successfully")
        }
    
    
        const updateResult = await collection.updateOne(
            { email },
            { $set: { Profile_Info: data } }
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

router.post("/editTasks",async (req,res)=>{
    const {email, data} = req.body

    try 
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("mentor")
    
        const user = await collection.findOne({ email })
    
        if (!user) {
            const newUser = await collection.insertOne({email, Tasks:data})
            console.log("Data uploaded successfully")
            res.send("Data uploaded successfully")
        }
    
    
        const updateResult = await collection.updateOne(
            { email },
            { $set: { Tasks: data } }
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