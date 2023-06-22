const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enqurySchema = new Schema({

    booking_start_date: {
        type: String,
        required: true,

    },
    booking_end_date: {
        type: String,
        required: true,

    }, name: {
        type: String,
        required: true,
        
    },

    hiddenname: {
        type: String,
    },

    mobile: {
        type: Number,
        required: true,
    },
       email: {
        type: String,
        required: true,
    },
       message: {
           type: String,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('enquiry', enqurySchema);