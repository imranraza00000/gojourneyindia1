const mongoose = require('mongoose');

const exclisiveActivitiesSchema = new mongoose.Schema({
    acitivitiesName: {
        type:String
    },

acitivitiesPrice:{
    type:Number
}, 

typeNumber:{
    type:Number
},


},{
    timestamps: true
});

const exclusiveActivities = mongoose.model("exclusiveActivities", exclisiveActivitiesSchema);
module.exports = exclusiveActivities