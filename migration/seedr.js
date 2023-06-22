// const mongoose = require('mongoose');
// // const db = require('../config/Database/connectDatabase');
// const acitivitiesSchema = require('../models/schema/exclusiveActivities');
// const seeding = [
//     {
//         acitivitiesName : 'Bike rent',
//         acitivitiesPrice: 1000,
//         typeNumber:1
//     },
//     {
//         acitivitiesName : 'Zip line',
//         acitivitiesPrice: 500,
//         typeNumber:1
       
//     },
//     {
//         acitivitiesName : 'Five star hotel',
//         acitivitiesPrice: 300,
//         typeNumber:0
       
//     },
//     {
//         acitivitiesName : 'non-veg food',
//         acitivitiesPrice: 100,
//         typeNumber:0
//     }
// ];

// const seeDb = async () => {
//     await acitivitiesSchema.deleteMany({})
//     await acitivitiesSchema.insertMany(seeding);
// }

// seeDb().then(()=>{
//     mongoose.connection.close();
// })