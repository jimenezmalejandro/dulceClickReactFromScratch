import asyncHandler from 'express-async-handler'
import express from 'express'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import { json } from 'express'

const app = express()
app.use(express.json())

// @description: Authenticate user & get TOKEN
// @route POST/api/users/login 
// @access Public
const authUser = asyncHandler( async (req, res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})
    
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name : user.name,
            email : user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Usuario o contrasena invalidos')
    }


})


// @description: Register a new user
// @route POST/api/users
// @access Public
const registerUser = asyncHandler( async (req, res)=>{
    const {email, password, name, validation} = req.body

    const userExists = await User.findOne({email})
    
   if(userExists){
       res.status(400)
       throw new Error ('Ya existe este usuario')
   }

   if(!validation){
       res.status(400)
       throw new Error ('Por favor verifica el ReCaptcha')
   }

   //Secret Key
   const secretKey = process.env.RECAPTCHA_SECRET_KEY
   console.log(secretKey)
   //Verify URL
   const verifyUrl =  `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${validation}&remoteip=${req.connection.remoteAddress}`
   //Make request to verify URL
   const verified = 
        await app.get(verifyUrl, (req, res)=>{
            console.log('request made to verifyUrl')
            body =  JSON.parse(res.body)
            return body.success
    })

    //if Successful 
    if(verified){
        console.log('request sent to create a new user')
        const user = await User.create({
            name,
            email, 
            password
        })
        
        if(user){
            res.status(201)
             .json({
             _id: user._id,
             name : user.name,
             email : user.email,
             isAdmin: user.isAdmin,
             token: generateToken(user._id)
            })
        }else {
            res.status(400)
            throw new Error('Datos de usuario son invalidos')
        }
        
    }else{
        res.status(400)
        throw new Error ('Verificacion fallida')
    }

})

// @description: Get user profile
// @route GET/api/users/profile 
// @access Private
const getUserProfile = asyncHandler( async (req, res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name : user.name,
            email : user.email,
            isAdmin: user.isAdmin,
        })
        
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})  

export {authUser, getUserProfile, registerUser} 