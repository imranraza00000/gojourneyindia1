const mongoose = require('mongoose');
const activitiesSchema = require('../../models/schema/exclusiveActivities')


const mongDbUrl = `mongodb://imranraza00000:hNVFOgxwxM4Ytka6@cluster0-shard-00-00.0nhrj.mongodb.net:27017,cluster0-shard-00-01.0nhrj.mongodb.net:27017,cluster0-shard-00-02.0nhrj.mongodb.net:27017/Gojourneyindia?ssl=true&replicaSet=atlas-zxkkfu-shard-0&authSource=admin&retryWrites=true&w=majority`;

// const mongDbUrl = "mongodb://localhost:27017/gojourneyindia";
const connectionParams = mongoose.connect(mongDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then( ()=>console.log('connection sucssfully')).catch ((err)=>console.log(err));



module.exports = connectionParams
