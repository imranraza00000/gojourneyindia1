const mongoose = require('mongoose');
const addtourSchema = new mongoose.Schema({
    tourname: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tourpice: {
        type: String,
        required: true
    },
    tourimg: {
        data: Buffer,
        type: String,
        required: true
    },
    persone: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },

    session: {
        type: String,
        required: true,
    },
    toptour:{
        type: String,
        required: true,
    },

    central: {
        type: String,
        required: true,
    },

    tourcatogery: {
        type: String,
        required: true,
    },


    tourdescription: {
        type: String,
        required: true
    },

    keywords: {
        type: String,
        required: true
    },

    tourabout:{
        type: String,
        required: true
    },

    inclusion: {
        type: String,
        required: true,
    },

    day: {
        type: String,
        required: true
    },
    hadding: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

},
    {
        timestamps: true
    })
module.exports = mongoose.model('addtour', addtourSchema);