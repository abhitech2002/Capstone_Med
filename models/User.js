const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function (next) {
    const user = this
    const saltRounds = 10
    bcrypt.genSalt(saltRounds)
    .then((salt) => 
        bcrypt.hash(user.password, salt)
    )
    .then((hashPassword) => 
        user.password = hashPassword,
        next()
    )
    .catch((error) => 
        next(error)
    )
})

module.exports = mongoose.model('User', userSchema)