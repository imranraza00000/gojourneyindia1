const express = require('express');
const router = express();
const connectionParams = require('../../config/Database/connectDatabase')
const exclusiveAcitvities = require('../../models/schema/exclusiveActivities')
const contactSchema = require('../../models/schema/contactus')
const localStorageSchema = require('../../models/schema/localstorage')
const userSchema = require('../../models/schema/userRegister');
const tourSchema = require('../../models/schema/addtour');
const enquirySchema = require('../../models/schema/enquiry')
const rating = require('../../models/schema/rating')
const joi = require('joi');
const path = require('path');



router.get('/', async (req, res) => {

    try {
        const data = await tourSchema.aggregate([{
            $lookup:
              {
                from: 'ratings',
                localField: '_id',
                foreignField: 'tour_id',
                as: 'rating'   
              },
            
           }])
            res.render('index', { tourData: data });
        
    } catch (error) {
        console.log(error.message)
    }

});


router.get('/index/', (req, res) => {
    res.redirect('/')
});
router.get('/tour/:id', async (req, res) => {
    try {
        var arr = "";
        const data = await tourSchema.findById({ _id: req.params.id });
        const starRating = await rating.find({tour_id: req.params.id});

        res.render('tourenquiry', { data: data, starRating: starRating })
    } catch (error) {
        console.log(error.message)
    }

});

//enquiry code get and post

router.post('/tour/:id', async (req, res) => {

    const { booking_start_date, booking_end_date, name, hiddenname, mobile, email, message } = req.body
    try {
        const tourData = await tourSchema.findById({ _id: req.params.id });
        const enquiry = joi.object({
            booking_start_date: joi.string().required(),
            booking_end_date: joi.string().required(),
            name: joi.string().min(3).max(15).required(),
            hiddenname: joi.string(),
            mobile: joi.string().max(15).pattern(/^[0-9]+$/),
            email: joi.string().min(10).trim().required().email(),
            message: joi.string().min(0),
        })
        let resultvalidate = enquiry.validate(req.body)
        if (resultvalidate.error) {
            res.render('tourenquiry', { err: resultvalidate.error.details[0].message, data: tourData })
            return false;
        }

        const data = new enquirySchema({
            booking_start_date: booking_start_date,
            booking_end_date: booking_end_date,
            name: name,
            hiddenname: hiddenname, // hiddden field 
            mobile: mobile,
            email: email,
            message: message
        })
        const result = await data.save();
        // console.log(data);
        res.render("tourenquiry", { success: "", data: tourData })
    } catch (error) {
        console.log(error.message);
    }

});

router.get('/about', (req, res) => {
    res.render('about')
});

router.get('/faq', (req, res) => {
    res.render('faq')
});

router.get('/contact_us', (req, res) => {
    res.render('contact_us')
});

router.post('/contact', async (req, res) => {
    const { name, mobile, email, message } = req.body;
    try {
        const contact_us = joi.object({
            name: joi.string().min(3).required(),
            mobile: joi.string().min(3).max(15).pattern(/^[0-9]+$/),
            email: joi.string().min(10).trim().required().email(),
            message: joi.string().min(0),
        })
        let resultvalidate = contact_us.validate(req.body)
        if (resultvalidate.error) {
            res.render('contact_us', { err: resultvalidate.error.details[0].message, })
            return false;
        }        
        const data = new contactSchema({
            name: name,
            mobile: mobile,
            email: email,
            message: message
        })
        const result = await data.save();
        res.render('contact_us', { success: 'Thank you for Contact Us' })

    } catch (error) {
        console.log(error.message)
    }


});

router.get('/gallery', (req, res) => {
    res.render('gallery')
});

router.get('/payment', (req, res) => {
    res.render('payment')
});


router.get('/all_tours_list', async(req, res) => {
    try {
        const tourData = await tourSchema.find({}).sort({"createdAt" : -1}).exec(function(err, data){
            if(err)throw err
            res.render('all_tours_list', {data});
        })
    } catch (error) {
        console.log(error);
    }

    
});


module.exports = router;
