const { number, required } = require("joi");
const mongoose = require("mongoose");
const localStorage = require('./userRegister');

const localStorageSchema = new mongoose.Schema({

    bookingArra: {
        type: String,
        required: true
    },

    adultCount: {
        type: Number,
        required: true
    },
    childCount: {
        type: Number,

    },
    details: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    });
module.exports = mongoose.model("localstorage", localStorageSchema);
