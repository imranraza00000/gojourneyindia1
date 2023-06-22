const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuthSchema = new Schema({
   googleId : {
       type : String,
       required: true 
   } , 
   displayName : {
    type : String,
    required: true
} ,
firstName : {
    type : String,
    required: true
} ,
lastName : {
    type : String,
    required: true
},

email : {
    type : String,
    required: true
},
image : {
    type : String,
    required: true
},
createdAt:{
    type: Date,
    default : Date.now
}    
})

const authGoogleSchema = mongoose.model("googelAuth",AuthSchema );
module.exports = authGoogleSchema;