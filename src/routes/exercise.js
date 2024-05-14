const express = require("express")
const router = express.Router()
const {GetMusclesOption, GetEquipmentOption, GetIntensityOption} = require("../controllers/exercise.js")
const axios = require('axios')

router.post("/",async (req,res)=>{

    const {category, element} = req.body
    let options = {}
    console.log({category, element})

    try 
    {
        if(category == "Muscles")
        {
            options = await GetMusclesOption(element)
            console.log(options)
        }
        else if(category == "Equipment")
        {
            options = await GetEquipmentOption(element)
            console.log(options)
        }
        else if(category == "Intensity_Level")
        {
            options = await GetIntensityOption(element)
            console.log(options)
        }

        const response = await axios.request(options)
        console.log(response.data)
        res.send(response.data)
    } 
    catch(error)
    {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router