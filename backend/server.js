import { json } from 'body-parser'
import express from 'express'
import dotenv from 'dotenv' 
import connectDB from './config/db.js'
import colors from 'colors'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import zipRoutes from './routes/zipRoutes.js'
import checkoutRoutes from './routes/checkoutRoutes.js'

dotenv.config()

connectDB()  

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('api is running')
})


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/zip', zipRoutes)
app.use('/api/checkout',checkoutRoutes )

app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`.yellow.bold))