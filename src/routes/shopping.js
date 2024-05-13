const express = require("express")
const router = express.Router()
const GetConnectionFitnessCart = require("../db/FitnessConnection")

router.post("/",async (req,res)=>{
    const{search, max, min, maxPrice, minPrice, pageNo} = req.body
    console.log(req.body)
    // const{search, max, min, maxPrice, minPrice, pageNo} = {search : "jumprope",max : false, min : false, maxPrice : 0, minPrice : 0, pageNo : 1}
    skipPages = (pageNo - 1) * 12
    let data = []

    if(search == "null")
    {
        search = "cart"
    }

    let db = await GetConnectionFitnessCart()
    let collection = db.collection(search)

    try
    {
        if(max == true)
        {
            const sortOrder = {Product_Price : -1}
            const cursor = collection.find(
                maxPrice ? { Product_Price: { $lte: maxPrice } } : {},
                {limit: pageNo * 12, skip: skipPages, sort : sortOrder}
            )

            await cursor.forEach(async (doc)=>{
                data.push(doc)
            })

            res.send(data)
        }
        else if(min == true)
        {
            const sortOrder = {Product_Price : 1}
            const cursor = collection.find(
                maxPrice ? { Product_Price: { $lte: maxPrice } } : {},
                {limit: pageNo * 12, skip: skipPages, sort : sortOrder}
            )
            await cursor.forEach(async (doc)=>{
                data.push(doc)
            })

            res.send(data)
        }
        else
        {
            const cursor = collection.find(
                maxPrice ? { Product_Price: { $lte: maxPrice } } : {},
                { limit: 12, skip: skipPages}
            )
            await cursor.forEach(async (doc)=>{
                data.push(doc)
            })

            res.send(data)
        }
    }
    catch(error)
    {
        console.log(error)
        res.send(error)
    }
})

module.exports = router