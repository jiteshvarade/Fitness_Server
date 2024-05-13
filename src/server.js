require("dotenv").config({path : "./env"})
const express = require("express")
const cors = require("cors")

const authMiddleware = require("./middlewares/auth.js")
const userCartRouter = require("./routes/cart.js")
const exerciseRouter = require("./routes/exercise.js")
const dashboardRouter = require("./routes/userDashboard.js")
const mentorDashboard = require("./routes/mentorDashboard.js")
const shoppingRouter = require("./routes/shopping.js")

if(require.main === module)
{
    const app = express()
    app.use(express.json())
    app.use(cors({origin : true}))

    app.listen(process.env.PORT, ()=>{
        console.log("Server started successfully at port : ",process.env.PORT)
        let weburl = "http://localhost:"+process.env.PORT
        console.log("URL : ",weburl)
    })

    app.get("/",(req,res)=>{
        res.send("Welcome to Jitesh's Uphill Server")
    })

    app.use("/user",authMiddleware)
    app.use("/cart",userCartRouter)
    app.use("/exercise",exerciseRouter)
    app.use("/userDashboard",dashboardRouter)
    app.use("/mentorDashboard",mentorDashboard)
    app.use("/shopping",shoppingRouter)
}