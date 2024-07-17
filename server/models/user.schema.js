const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    googleID:{
        type: String,
    },
    avatar:{
        type: String,
    },
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
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
    },
    guide:{
        type: Boolean
    },
    vipro_eeuu:{
        type: Boolean
    },
    vipro_mx:{
        type: Boolean
    },
    vipro_ch:{
        type: Boolean
    },
    vipro_ind:{
        type: Boolean
    },
    vipro_cnd:{
        type: Boolean
    },
    vipro_uk:{
        type: Boolean
    },
    vipro_aus:{
        type: Boolean
    }
})

module.exports = mongoose.model("users", userSchema)