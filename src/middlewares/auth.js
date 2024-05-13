const express = require("express")
const router = express.Router()
const OTPGenerator = require("../controllers/user.js")
const sendEmail = require("../utils/gmail.js")
const GetConnection = require("../db/UphillConnections.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/trainee",async (req,res)=>{
    const {fname, lname, e_mail, password} = req.body
    console.log("Received data : ",{fname,lname,e_mail,password})
    const name = fname +" "+ lname
    const {username, email, passwd} = {username : name , email : e_mail, passwd : password}
    console.log("Received data : ",{username,email,passwd})

    const db = await GetConnection()
    const collection = db.collection("User")
    

    const user = await collection.findOne({username})
    const user_email = await collection.findOne({email})
    if(!user && !user_email)
    {
        bcrypt.hash(passwd,10,async (err, hash)=>{
            if(err)
            {
                console.log("Error hashing passwd : ",err)
            }
            else
            {
                console.log("Hashed password : ",hash);

                try
                {
                    const newUser = {username,email,hash}
                    const result = await collection.insertOne(newUser)
                    if(result)
                    {
                        res.send("Account created successfully")
                    }
                }
                catch(err)
                {
                    console.log(err)
                }
            }
        })
    }
    else
    {
        console.log("username or email already exits")
        return res.send("Username or email already exits")
    }
})

router.post("/trainer",async (req,res)=>{
    const {fname, lname, e_mail, password} = req.body
    const name = fname +" "+ lname
    const {trainer, email, passwd} = {trainer : name , email : e_mail, passwd : password}
    console.log("Received data : ",{trainer,email,passwd})

    let db = await GetConnection()
    let collection = db.collection("Trainer")

    const trainer_name = await collection.findOne({trainer})
    const trainer_email = await collection.findOne({email})
    if(!trainer_name && !trainer_email)
    {
        bcrypt.hash(passwd,10,async (err, hash)=>{
            if(err)
            {
                console.log("Error hashing passwd : ",err)
            }
            else
            {
                console.log("Hashed password : ",hash);

                try
                {
                    const newtrainer = {trainer,email,hash}
                    const result = await collection.insertOne(newtrainer)
                }
                catch(err)
                {
                    console.log(err)
                }
            }
        })
    }
    else
    {
        console.log("username or email already exits")
        return res.send("Username or email already exits")
    }
})

router.post("/login", async (req, res) => {
  const { email, passwd } = req.body;
  const normalizedEmail = email.trim().toLowerCase(); 

  try {
    let db = await GetConnection();
    let collection_user = db.collection("User");
    let collection_trainer = db.collection("Trainer");

    const user = await collection_user.findOne({ email: normalizedEmail });
    const trainer = await collection_trainer.findOne({ email: normalizedEmail });

    const account = user || trainer;

    if (account) {
      const passwordMatch = await bcrypt.compare(passwd, account.hash);
      if (passwordMatch) {
        const payload = { id: account.email };
        const token = jwt.sign(payload, process.env.TOKEN, { expiresIn: "23h" });
        res.json({ message: "Login successfully", token });
      } else {
        return res.status(401).send({ message: "Invalid password" });
      }
    } else {
      return res.status(404).send({ message: "Email not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error processing login" });
  }
});

router.post("/forgotpassword", (req,res)=>{
    const {email} = req.body
    
    try
    {
        const OTP = OTPGenerator();
        console.log("Recived mail : ",email)
        const subject = "Reset Password"
        const text = "Your Otp to rest password is "+OTP
        sendEmail(email, subject, text)
        res.json({otp : OTP})
    }
    catch(error)
    {
        res.sendStatus(500)
    }
})

router.post("/forgotpassword/user/update",async (req,res)=>{
    const {email, passwd} = req.body
    console.log("Recived data : ",{email, passwd})

    try 
    {
        let db = await GetConnection()
        let collection = db.collection("User")
    
        const user = await collection.findOne({ email })
    
        if (!user) {
          return res.status(404).send({ message: "Email not found" })
        }
    
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(passwd, saltRounds)
        console.log(hashedPassword)
    
        const updateResult = await collection.updateOne(
          { email },
          { $set: { hash: hashedPassword } }
        )
    
        if(updateResult.modifiedCount === 1)
        {
          res.send({ message: 'Password updated successfully' })
        }
        else
        {
          console.error('Error updating password in database')
          res.status(500).send({ message: 'Error updating password' })
        }
    }catch(error)
    {
        console.error(error)
        res.status(500).send({ message: 'Error updating password' })
    }
})

router.post("/forgotpassword/trainer/update",async (req,res)=>{
    const {email, passwd} = req.body
    console.log("Recived data : ",{email, passwd})

    try 
    {
        let db = await GetConnection()
        let collection = db.collection("Trainer")
    
        const user = await collection.findOne({ email })
    
        if (!user) {
          return res.status(404).send({ message: "Email not found" })
        }
    
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(passwd, saltRounds)
        console.log(hashedPassword)
    
        const updateResult = await collection.updateOne(
          { email },
          { $set: { hash: hashedPassword } }
        )
    
        if(updateResult.modifiedCount === 1)
        {
          res.send({ message: 'Password updated successfully' })
        }
        else
        {
          console.error('Error updating password in database')
          res.status(500).send({ message: 'Error updating password' })
        }
    }catch(error)
    {
        console.error(error)
        res.status(500).send({ message: 'Error updating password' })
    }
})

module.exports = router
