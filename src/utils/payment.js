require("dotenv").config()
const nodemailer = require("nodemailer")

async function sendEmailWithQR(email, amount) {
    try 
    {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWD,
            },
        })

        const htmlContent = `
            <p>Dear Customer,</p>
            <p>This email serves as a reminder for your recent order payment.</p>
            <p>The total amount due is <b> ₹${amount}</b>.</p>
            <p>Scan the QR code below or click the product image to access the secure payment portal:</p>
            <img src="cid:uniqueImageId" alt="Payment QR Code" style="width: 300px; height: 500px;text-align : centre" />
            <br />
            <p>Please note: Your order will not be shipped until your payment is received in full.</p>
            <p>Thank you for your business!</p>
            <p>Sincerely,</p>
            <p>The Uphill Fitness Team</p>
        `

        const mailOptions = {
            from: {
                name: "Fitness Website",
                address: process.env.EMAIL,
            },
            to: email,
            subject: "Payment Details",
            html: htmlContent,
            attachments: [
                {
                    filename: 'QR.jpeg',
                    path : "src/assets/QR.jpeg",
                    cid: "uniqueImageId"
                }
            ],
        }

        const info = await transporter.sendMail(mailOptions)
        console.log("Email sent successfully! Message ID:", info.messageId)
    } 
    catch(error)
    {
        console.error("Error sending email:", error)
    }
}

async function buynow(email, product) {
    try 
    {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWD,
            },
        })

        const htmlContent = `
            <p>Dear Customer,</p>
            <p>This email serves as a reminder for your recent order payment via ${product.Phone_No}</p>
            <p>The total amount due is <b> ₹${product.Product_Price} for product ${product.Product_Name}</b>.</p>
            <img src="cid:uniqueOrderID" alt="Product Image" style="width: 300px; height: 500px;text-align : centre" />
            <br />
            <p>Scan the QR code below or click the product image to access the secure payment portal:</p>
            <img src="cid:uniqueImageId" alt="Payment QR Code" style="width: 300px; height: 500px;text-align : centre" />
            <br />
            <p>Please note: Your order will not be shipped until your payment is received in full.</p>
            <p>Order will recived at address ${product.Address}</p>
            <p>Thank you for your business!</p>
            <p>Sincerely,</p>
            <p>The Uphill Fitness Team</p>
        `

        const mailOptions = {
            from: {
                name: "Fitness Website",
                address: process.env.EMAIL,
            },
            to: email,
            subject: "Payment Details",
            html: htmlContent,
            attachments: [
                {
                    filename: 'QR.jpeg',
                    path : "src/assets/QR.jpeg",
                    cid: "uniqueImageId"
                },
                {
                    filename : "Prdouct",
                    path : product.Product_Image,
                    cid : "uniqueOrderID"
                }
            ],
        }

        const info = await transporter.sendMail(mailOptions)
        console.log("Email sent successfully! Message ID:", info.messageId)
    } 
    catch(error)
    {
        console.error("Error sending email:", error)
    }
}

module.exports = {sendEmailWithQR,buynow}
