const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: String
    },
    male: {
        type: String
    },
    female: {
        type: String
    }
})   

const schemaDb = mongoose.model('booking', bookingSchema)
module.exports = schemaDb;