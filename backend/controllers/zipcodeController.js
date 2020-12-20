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

    const foundZip = await ZipCode.findOne({zipcode})
    
    if(foundZip){
        res.json({
            _id: foundZip._id,
            colonias : foundZip.colonias,
            zipcode : foundZip.zipcode,
            municipio: foundZip.municipio
        })
    }else{
        res.status(401)
        throw new Error('Lo sentimos, por el momento no hacemos entregas en tu zona (prueba con la de un amig@)')
    }

})


export {validateZip} 
