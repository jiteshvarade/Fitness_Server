const {instance} = require("../controllers/razorpay.js")

async function RazorPay(amount)
{
    const currency = "INR"

    const options = {
        amount : amount, 
        currency,
        receipt : Math.random(Date.now()).toString(),
    }

    try
    {
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)
    }
    catch(error)
    {
        console.log(error)
    }
}

module.exports = RazorPay