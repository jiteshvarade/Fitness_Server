const express = require("express")
const router = express.Router()
const GetConnection = require("../db/UphillConnections")
const GetConnectionUserInfo = require("../db/UserInfoConnection")

router.post("/info", async (req,res)=>{
    const {email} = req.body
    
    try
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")

        const user = await collection.findOne({email})

        if(!user)
        {
            console.log("Not data till now")
            res.send("User have no data yet")
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
        res.status(500).send({message : "Error reciving user info"})
    }
})

router.post("/getfoodpreference",async (req,res)=>{
    const {email} = req.body

    try
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")

        const user = await collection.findOne({email})

        if(!user)
        {
            console.log("User have no data till now")
            res.send("User have no data till now")
        }
        else
        {
            console.log(user.Food_Preference)
            res.send(user.Food_Preference)
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({message : "Error reciving user info"})
    }
})

router.post("/getgoals",async (req,res)=>{
    const {email} = req.body

    try
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")

        const user = await collection.findOne({email})

        if(!user)
        {
            console.log("User have no data till now")
            res.send("User have no data till now")
        }
        else
        {
            console.log(user.Goals)
            res.send(user.Goals)
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({message : "Error reciving user info"})
    }
})

router.post("/getachievements",async (req,res)=>{
    const {email} = req.body

    try
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")

        const user = await collection.findOne({email})

        if(!user)
        {
            console.log("User have no data till now")
            res.send("User have no data till now")
        }
        else
        {
            console.log(user.Achivements)
            res.send(user.Achivements)
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({message : "Error reciving user info"})
    }
})

router.post("/getMentorName",async (req,res)=>{
    const {email} = req.body

    try
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")

        const user = await collection.findOne({email})

        if(!user)
        {
            console.log("User have no data till now")
            res.send("User have no data till now")
        }
        else
        {
            console.log(user.Mentor)
            res.send(user.Mentor)
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({message : "Error reciving user info"})
    }
})  

router.post("/getStreak",async (req,res)=>{
    const {email} = req.body

    try
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")

        const user = await collection.findOne({email})

        if(!user)
        {
            console.log("User have no data till now")
            res.send("User have no data till now")
        }
        else
        {
            console.log(user.Streak)
            res.send(user.Streak)
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({message : "Error reciving user info"})
    }
})  

router.post("/getprofileinfo",async (req,res)=>{
    const {email} = req.body

    try
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")

        let db_user = await GetConnection();
        let collection_user = db_user.collection("User");

        const user = await collection.findOne({email})
        const user_info = await collection_user.findOne({email})

        if(!user)
        {
            console.log("User have no data till now")
            res.send(user_info.username)
        }
        else
        {
            console.log(user.Profile_Info,user_info.username)
            res.send({data : user.Profile_Info,username : user_info.username})
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({message : "Error reciving user info"})
    }
})

router.post("/editmeal",async (req,res)=>{
    const {email, data} = req.body

    try 
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")
    
        const user = await collection.findOne({ email })
    
        if (!user) {
            const newUser = await collection.insertOne({email, Meal:data})
            console.log("Data uploaded successfully")
            res.send("Data uploaded successfully")
        }
    
    
        const updateResult = await collection.updateOne(
            { email },
            { $set: { Meal: data } }
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

router.post("/editgoals",async (req,res)=>{
    const {email, data} = req.body

    try 
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")
    
        const user = await collection.findOne({ email })
    
        if (!user) {
            const newUser = await collection.insertOne({email,Goals: data})
            console.log("Data uploaded successfully")
            res.send("Data uploaded successfully")
        }
    
    
        const updateResult = await collection.updateOne(
            { email },
            { $set: { Goals: data } }
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

router.post("/editachievements",async (req,res)=>{
    const {email, data} = req.body

    try 
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")
    
        const user = await collection.findOne({ email })
    
        if (!user) {
            const newUser = await collection.insertOne({email, Achivements:data})
            console.log("Data uploaded successfully")
            res.send("Data uploaded successfully")
        }
    
    
        const updateResult = await collection.updateOne(
            { email },
            { $set: { Achivements: data } }
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

router.post("/editfoodpreference",async (req,res)=>{
    const {email, data} = req.body

    try 
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")
    
        const user = await collection.findOne({ email })
    
        if (!user) {
            const newUser = await collection.insertOne({email, Food_Preference : data})
            console.log("Data uploaded successfully")
            res.send("Data uploaded successfully")
        }
    
    
        const updateResult = await collection.updateOne(
            { email },
            { $set: { Food_Preference: data } }
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

router.post("/editprofileinfo",async (req,res)=>{
    const {email, data} = req.body

    try 
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")
    
        const user = await collection.findOne({ email })
    
        if (!user) {
            const newUser = await collection.insertOne({email, Profile_Info : data})
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

router.post("/editMentorName",async (req,res)=>{
    const {email, data} = req.body

    try 
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")
    
        const user = await collection.findOne({ email })
    
        if (!user) {
            const newUser = await collection.insertOne({email, Mentor:data})
            console.log("Data uploaded successfully")
            res.send("Data uploaded successfully")
        }
    
    
        const updateResult = await collection.updateOne(
            { email },
            { $set: { Mentor: data } }
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

router.post("/editStreak",async (req,res)=>{
    const {email, days} = req.body

    try 
    {
        let db = await GetConnectionUserInfo()
        let collection = db.collection("info")
    
        const user = await collection.findOne({ email })
    
        if (!user) {
            const newUser = await collection.insertOne({email, Streak:data})
            console.log("Data uploaded successfully")
            res.send("Data uploaded successfully")
        }
    
    
        const updateResult = await collection.updateOne(
            { email },
            { $set: { Streak: days } }
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
