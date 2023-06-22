// const express = require('express');
// const bookingSchema = require('../../models/schema/booking');
// const bodyParser = require('body-parser');
// const { application } = require('express');
// const router = express();

// router.use(express.static('public'));

// router.use(bodyParser.urlencoded({extended:true}));
// router.use(bodyParser.json());

// router.set('views', './views');
// router.set('view engine', 'ejs')





// // insert data
// router.post('/submit', async(req, res,)=>{
//     // res.json({message: req.body});
//     var data = new bookingSchema({
//         name:req.body.name,
//         age:req.body.age,
//         male:req.body.male,
//         female:req.body.female

//     });
//     console.log(data);
//     data.save().then((result)=>{res.send('Data Added')
// }).catch((err) =>{console.log(err)});
// });


// // delete data

// // router.get('/testgetdata', (req, res)=>{
// //     bookingSchema.find({},function(err, result){
// //         res.render('testgetdata', {booking:result})
// //     });
// // });

// // router.get('/delete/:id', async(req, res)=>{
// //    await bookingSchema.findByIdAndDelete(req.params.id);
// //     res.redirect('/testgetdata');
// // })

// // // update data

// // router.get('/testupdate/:id', (req, res)=>{
// //     bookingSchema.findById(req.params.id, (err, result)=>{
// //      res.render('testupdate', {booking:result});
// //  })
// // });

// // router.post('/edit/:id', async (req,res)=>{
// //    await bookingSchema.findByIdAndUpdate(req.params.id, req.body);
// //     res.redirect('/testgetdata');
// // })
// module.exports = router;
