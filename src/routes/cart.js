const express = require("express")
const router = express.Router()
const GetConnectionCartInfo = require("../db/CartInfoConnection")
const sendEmailWithQR = require("../utils/payment.js")
const RazorPay = require("../utils/paymentrazorpay.js")

router.post("/add",async (req,res)=>{
    const {email,products} = req.body
    console.log({email})
    console.log({products})

    try 
    {
        let db = await GetConnectionCartInfo();
        let collection = db.collection("info");
    
        const user = await collection.findOne({ email });
    
        if (!user) 
        {
            const newInfo = {
                email,
                products: products,
            };
            await collection.insertOne(newInfo);
            console.log('Email and products added successfully')
            res.send({ message: 'Email and product ID added successfully' });
        } 
        else 
        {
            products.forEach(async product => {
                await collection.updateOne({ email }, { $push: { products : product} })
            })
        }
    } 
    catch(error) 
    {
        console.error(error);
        res.status(500).send({ message: 'Error adding to cart' });
    }
})

router.post("/remove", async (req, res) => {
    const { email, removeproduct } = req.body
    try {
        const db = await GetConnectionCartInfo()
        const collection = db.collection("info")

        const user = await collection.findOne({ email })

        if (!user) {
            console.log("User has nothing in their cart")
            return res.send("User has nothing in their cart")
        }

        const { modifiedCount } = await collection.updateOne(
            { email },
            { $pull: { products: { _id: removeproduct._id } } } // Use strict object comparison
        )

        if (modifiedCount === 1) {
            console.log('Product removed from cart successfully')
            res.send({ message: 'Product removed from cart successfully' })
        } else {
            console.log('Product not found in cart');
            res.send({ message: 'Product not found in cart' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error removing product from cart' })
    }
})


router.post("/info",async (req,res)=>{
    const {email} = req.body
    console.log({email})

    try 
    {
        let db = await GetConnectionCartInfo();
        let collection = db.collection("info");
    
        const user = await collection.findOne({email});
    
        if (!user) 
        {
            console.log("User as nothing in his cart")
            res.send("User as nothing in his cart")
        } 
        else 
        {
            console.log(user)
            res.send(user) 
        }
    } 
    catch(error) 
    {
        console.error(error);
        res.status(500).send({ message: 'Error reciving user cart info' });
    }
})

// router.post("/checkout",(req,res)=>{
//     const {email, amount} = req.body
//     // const {email, amount} = {email : "khushiprasad49094@gmail.com", amount : 5000}

//     try
//     {
//         console.log("Recived mail : ",email) 
//         sendEmailWithQR(email, amount)
//         res.send("Order Recived")
//     }
//     catch(error)
//     {
//         res.sendStatus(500)
//     }
// })

router.post("/checkout",(req,res)=>{
    const {email, products} = req.body
    let amount = 0

    products.forEach(product =>{
        amount = product.Product_Price + amount
    })

    console.log("Total amount to be paid is : ",amount)

    // try
    // {
    //     RazorPay(amount)
    // }
    // catch(error)
    // {
    //     console.log("Error : ",error)
    // }

    try
    {
        console.log("Recived mail : ",email) 
        sendEmailWithQR(email, amount)
        res.send("Order Recived")
    }
    catch(error)
    {
        res.sendStatus(500)
    }
})

module.exports = router