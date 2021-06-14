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
        throw new Error('Usuario o contraseña invalidos')
    }
})

// @description: Reset password
// @route POST/api/users/reset 
// @access Public
const resetPassword = asyncHandler( async (req, res)=>{

    const {email, validation} = req.body

    if(!validation){
        res.status(400)
        throw new Error ('Por favor verifica el ReCaptcha')
    }
 
    //Secret Key
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
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
     const user = await User.findOne({email})

    if(user){
        // res.json({
        //     _id: user._id,
        //     name : user.name,
        //     email : user.email,
        //     isAdmin: user.isAdmin,
        //     token: generateToken(user._id)
        // })
        res.json('Hemos enviado un correo a tu dirección de email registrado')
    }else{
        res.status(401)
        throw new Error('Usuario no existente')
    }
})


// @description: Register a new user
// @route POST/api/users
// @access Public
const registerUser = asyncHandler( async (req, res)=>{
    const {email, password, name, validation} = req.body
    console.log(validation)
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
   //Verify URL
   const verifyUrl =  `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${validation}&remoteip=${req.connection.remoteAddress}`
   //Make request to verify URL
   const verified = 
        await app.get(verifyUrl, (req, res)=>{
            //console.log('request made to verifyUrl')
            body =  JSON.parse(res.body)
            return body.success
    })

    //if Successful 
    if(verified){
        //console.log('request sent to create a new user')
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

// @description: UPDATE user profile
// @route PUT/api/users/profile 
// @access Private
const updateUserProfile = asyncHandler( async (req, res)=>{
    const{email} = req.body

    const user = await User.findById(req.user._id)

    if(user){
       user.name = req.body.name || user.name
       user.email = req.body.email || user.email
       if(req.body.password){
           user.password = req.body.password
       }

       const updatedUser = await user.save()

       res.json({
        _id: updatedUser._id,
        name : updatedUser.name,
        email : updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id)
       })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})  


// @description: UPDATE user ADDRESS
// @route PUT/api/users/address 
// @access Private
const updateUserAddress = asyncHandler( async (req, res)=>{
    const { user, address} = req.body

    const existingUser = await User.findById(user._id)

    if(existingUser){
        existingUser.address.streetAndNumber = address.streetAndNumber
        existingUser.address.postalCode = address.postalCode
        existingUser.address.city = address.city || existingUser.address.city
        existingUser.address.references = address.references || existingUser.address.references
        existingUser.address.neighborhood = address.neighborhood || existingUser.address.neighborhood
        existingUser.address.cellphone = address.cellphone || existingUser.address.cellphone
       if(req.body.password){
           user.password = req.body.password
       }

       const updatedAddress = await existingUser.save()
       
       res.json({updatedAddress})
    }else{
        res.status(404)
        throw new Error('Un error ha ocurrido. Si el problema persiste, por favor contáctanos al correo de sporte')
    }
})  



// @description: GET user profile
// @route PUT/api/users/profile 
// @access Private
const getUserProfile = asyncHandler( async (req, res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name : user.name,
            email : user.email,
            isAdmin: user.isAdmin,
            addressInfo: user.address
        })
        
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})  

//@description: POST payment intent to user's profile
//@route: POST/api/users/pushIntent
//@access: Private
const pushPaymentIntent = asyncHandler(async (req, res)=>{
    console.log('request body:', req.body)
    
    const {paymentIntentData, user} = req.body
    try {
        const existingUser = await User.findById(user._id)

        if(existingUser){
            
            existingUser.paymentIntents = [...existingUser.paymentIntents, paymentIntentData]
            const userData = await existingUser.save()
            res.json({
                userData
            })

        }else{
            res.status(404)
            throw new Error('Un error ha ocurrido. Si el problema persiste, por favor contáctanos al correo de sporte')
        }
    } catch (error) {
        res.status(500)
        res.json('Error interno del servidor. NO SE HAN REALIZADO CARGOS')
    }
})



export {
    authUser, 
    getUserProfile, 
    registerUser, 
    updateUserProfile, 
    resetPassword, 
    updateUserAddress,
    pushPaymentIntent
} 