import asyncHandler from 'express-async-handler'
import express from 'express'
import stripe from 'stripe'
import Product from '../models/productModel.js'

const app = express()
app.use(express.json())


//@Description: Create a checkout session (order amt, products, payment method...)
//@route POST/api/checkout/session
const ChekcoutSession = asyncHandler (  async (req, res)=>{
    
    const cartItems = req.body.cartItems
    let verifiedItems = await Promise.all(cartItems.map( async product => {
      return  getProductInfo(product._id)
    }))
    if(verifiedItems){
        console.log(verifiedItems)
    }

    if(verifiedItems){
        res.json(verifiedItems)
    }else{
        res.status(400)
        throw new Error('Not found')
    }
    
})

const getProductInfo = asyncHandler(async (productId)=>{
    const product = await Product.findById(productId)
    console.log('PRODUCT ', product)
    return product
})

export {ChekcoutSession}

