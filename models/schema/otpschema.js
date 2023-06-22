const mongoose = require('mongoose');

const optSchema = new mongoose.Schema({
    email:{
        type: String,
    },
    code:{
        type:Number
    },
    expireIn:{
        type:Number
    },
     
    
    
})

const otp = mongoose.model('otp', optSchema);
module.exports = otp;