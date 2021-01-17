import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    address:{

        streetAndNumber : {
            type:String
        },
        postalCode: {
            type:String
        },

        city: {
            type: String
        },
        cellphone: {
            type: Number,
            min: 1000000000,
            max: 9999999999,
            required: false
        },
        references: {
            type: String,
            required: false
        },
        references : {
            type:String,
            required: false
        },
        neighborhood : {
            type: String,
            required: false
        }

    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

}, {
    timestamps : true
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next ()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User 