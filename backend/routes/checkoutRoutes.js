import express from 'express'
import {ChekcoutSession} from '../controllers/checkoutController.js'
import {protect} from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/session').post(protect, ChekcoutSession)

export default router