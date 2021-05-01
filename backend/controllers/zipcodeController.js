import asyncHandler from 'express-async-handler'
import express from 'express'
import  ZipCode from '../models/zipCodeModel.js'
import { json } from 'express'

const app = express()
app.use(express.json())

// @description: Authenticate Zip code
// @route POST/api/zip/validatezip 
// @access Public
const validateZip = asyncHandler( async (req, res)=>{
    const {zipcode} = req.body

    const foundZip = await ZipCode.find({zipcode})
    
    if(foundZip.length !== 0  ){
        // let colonias = foundZip.map(element => element.colonias )
        res.json({
            _id: foundZip[0]._id,
            colonias : foundZip[0].colonias,
            zipcode : foundZip[0].zipcode,
            municipio: foundZip[0].municipio
        })
    }else{
        throw new Error('Lo sentimos, por el momento no hacemos entregas en tu zona (prueba con la de un amig@)')
    }

})


export {validateZip} 
