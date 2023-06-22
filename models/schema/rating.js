// const { number } = require('joi')
const mongoose = require('mongoose')
// const {ratings} = require('stars-schema')

const ProductSchema = new mongoose.Schema({
    tour_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addtour'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_ragister'
    },
    star: {
        type:Number,
    },

    review: {
        type:String,
    },
    
},{
    timestamps:true
})
module.exports = mongoose.model('rating', ProductSchema)