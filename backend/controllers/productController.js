import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @description: Fetch all products
// @route GET/api/products
// @access Public
const getProducts =asyncHandler( async (req, res)=>{
    const products = await Product.find({})
    res.json(products)
})


// @description: Fetch single product
// @route GET/api/product/:id
// @access Public
const getProductById =asyncHandler( async (req, res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @description: Fetch products by query string
// @route GET/api/search/:productName
// @access Public
//                  COMPLETE ME!-----------------------
const getProductsBySearch =asyncHandler( async (req, res)=>{
    console.log('req.params is: ' ,req.params.product)
    let prodName = req.params.product
    const productsFound = await Product.find({descripcion: { "$regex" : prodName, "$options" :"i" } }, 
        (error, data)=>{
            if(error){
                console.log(error)
            }else{
                console.log(data)
            }
        })
    if(productsFound){
        console.log('productsFound : ', productsFound)
        res.json(productsFound)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

export{
    getProductById,
    getProducts,
    getProductsBySearch
}