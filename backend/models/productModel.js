import mongoose from 'mongoose'

const productSchema = mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    },

    id: {
        type: String,
        required: true
    },

    codigo: {
        type: String,
        required: true,
    },

    descripcion: {
        type: String,
        required: true
    },

    piezas: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true,
        default: 999
    },

    existencia: {
        type: Number,
        required: true,
        default: 0
    },

    imageUrl: {
        type: String,
        required: true
    },

    departamento: {
        type: String,
        required: true
    },

    categoria: {
        type: String,
        required: true
    }

}, {
    timestamps : true
})

const Product = mongoose.model('Product', productSchema)

export default Product 