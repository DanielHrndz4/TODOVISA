const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    tel:{
        type: String,
        required: true
    },
    vipro:{
        type: Boolean
    }
})

module.exports = mongoose.model("users", userSchema)