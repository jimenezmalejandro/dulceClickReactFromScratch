import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    orderItems: [
        {
            descripcion: {type: String, required: true},
            cantidad: {type: String, required: true},
            imageUrl: {type: String, required: true},
            precio: {type: Number, required: true},
            product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
            },
            
        },

    ],

    direccionEntrega: {
        direccion : { type: String, required: true},
        ciudad : { type: String, required: true},
        codigoPostal: { type: String, required: true}
    },

    metodoPago: {
        type: String,
        required: true,
    },

    resultadoPago: {
        id: {type: String},
        status: {type: String},
        udpate_time: {type: String},
        email_address: {type: String},
    },

    impuestos: {
        type: Number,
        required: true,
        default : 0.0
    },

    costoEnvio: {
        type: Number,
        required: true,
        default : 0.0
    },
    
    precioTotal: {
        type: Number,
        required: true,
        default : 0.0
    },

    estaPagado: {
        type: Boolean,
        required: true,
        default: false
    },

    diaPagado: {
        type: Date
    },

    estaEntregado: {
        type: Boolean,
        required: true,
        default: false
    },

    diaEntregado: {
        type: Date
    },





}, {
    timestamps : true
})

const Order = mongoose.model('Order', orderSchema)

export default Order