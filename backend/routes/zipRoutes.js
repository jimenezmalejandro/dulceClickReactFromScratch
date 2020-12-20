import express from 'express'
const router = express.Router()
import {validateZip} from '../controllers/zipcodeController.js'

router.post('/validatezip', validateZip)

export default router