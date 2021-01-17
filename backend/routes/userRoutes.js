import express from 'express'
const router = express.Router()
import {
    authUser, 
    getUserProfile, 
    registerUser, 
    updateUserProfile, 
    resetPassword,
    updateUserAddress
} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.post('/reset', resetPassword)
router.put('/address', updateUserAddress)

export default router