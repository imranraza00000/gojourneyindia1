const { number } = require("joi");
const mongoose = require("mongoose");
const user_ragister = require('./userRegister');

const profileSchema = new mongoose.Schema({

    
    userGetid:{
        type:String
    },
    
    gender: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    address_1: {
        type: String,
        required: true,

    },address_2: {
        type: String,
        required: true,
    },
},
{
timestamps: true
});
const userProfileSchema = mongoose.model("profileSchema", profileSchema);
module.exports=userProfileSchema