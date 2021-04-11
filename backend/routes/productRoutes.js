import express from 'express'
const router = express.Router()
import {getProducts, getProductById, getProductsBySearch} from '../controllers/productController.js'

router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

router.route('/search/:product').get(getProductsBySearch)


export default router