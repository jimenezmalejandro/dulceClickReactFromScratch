import express from 'express'
const router = express.Router()

import {createPaymentIntent} from '../controllers/paymentController.js'

router.route('/intent').post(createPaymentIntent)

export default router