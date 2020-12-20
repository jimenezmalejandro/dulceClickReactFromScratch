import mongoose from 'mongoose'

const zipCodeSchema = mongoose.Schema({

    zipcode:{
        type: Number,
        min: 40000,
        max: 49999,
        required: true
    },

    municipio: {
        type: String
    },

    colonias: {
        type: Array
    }

}, {
    timestamps : true
})

const ZipCode = mongoose.model('ZipCode', zipCodeSchema)

export default ZipCode 