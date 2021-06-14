import asyncHandler from 'express-async-handler'
import express from 'express'
import dotenv from 'dotenv'
import {Stripe} from 'stripe'
import Product from '../models/productModel.js'


dotenv.config()

const app = express()
app.use(express.json())
const apiKey = process.env.STRIPE_SECRET
const stripe = Stripe(apiKey)

//@Description: Create a payment intent from stripe's API
//@route POST/api/payment/intent
//@access Public ?? should this be private ?
const createPaymentIntent = asyncHandler ( async(req, res)=>{

    const itemList = req.body.itemsList
    
    const verifiedItemList = await Promise.all( itemList.map(product =>{
        return  totalItemPrice(product)
    }))

    const totalPesos = Math.abs(verifiedItemList.reduce((accum, price)=> accum + price, 0))
    console.log('total pesos', totalPesos *100)

    if(totalPesos > 0){
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPesos * 100,
            currency: "mxn"
        })

        res.send(
            paymentIntent
        )
    }else{
        res.status(500)
        throw new Error('Ha ocurrido un error interno. -No se ha realizado ningún cargo a tu tarjeta-')
    }
    
})

const totalItemPrice = async (item) =>{
    const part = await Product.findById(item.product)
    return part.precio * item.qty;
}

export {createPaymentIntent}
