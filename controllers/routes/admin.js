const express = require('express');
const app = express();
const adminschema = require('../../models/schema/adminragister');
const bcrypt = require('bcryptjs');
const enquirySchema = require('../../models/schema/enquiry')
const userSchema = require('../../models/schema/userRegister')
const tourList = require('../../models/schema/addtour')
const auth = require('../../middelware/auth')
const tourSchema = require('../../models/schema/addtour')
const multer = require('multer')
const fs = require('fs');
const { json } = require('body-parser');
// var striptags = require('striptags');
const contact = require('../../models/schema/contactus');
const joi = require('joi');


// upload image code here
const storage = multer.diskStorage({
    destination: function (req, file, callback) {

        callback(null, './public/img')// image location save
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

let uplaod = multer({ storage: storage }) //.array('files', 2)

app.get('/admindashboard', auth.isLoginAdmin, async (req, res) => {
    try {
        const enquiry = await enquirySchema.find({}).exec();
        const user = await userSchema.find({}).exec();
        const tourlist = await tourList.find({}).exec();

        res.render('admindashboard', { enquiry: enquiry, user: user, tourlist: tourlist })

    } catch (error) {
        console.log(error.message)
    }

});

app.get('/adminenquirytable', auth.isLoginAdmin, (req, res) => {
    enquirySchema.find({}).sort({ "createdAt": -1 }).exec(function (err, tableData) {

        if (err) throw err
        //     console.log(data)
        res.render('adminenquirytable', { tableData: tableData })
    })
});


app.get('/adminregister', auth.isLoginAdmin, (req, res) => {
    res.render('adminRegister')
});

app.post('/adminregister', async (req, res) => {
    // const {name, email, password} = req.body;
    // try {
    //     const data = new adminschema({
    //             name:name,
    //             email: email,
    //             password:password
    //         })
    //         const result = await data.save();
    //         console.log(data);
    //     res.render('adminRegister')
    // } catch (error) {
    //     console.log(error.message)
    // }
    var { name, email, password, } = req.body;

    if (!name) {
        res.render('adminRegister', { err: "Please fill Name Feilds..." })
    }
    else if (name.length < 3) {
        res.render('adminRegister', { err: "Please more cracter" })
    } else if (!/^[a-zA-Z]*$/g.test(name)) {
        res.render('adminRegister', { err: "Number not allowed" })
    } else if (!email) {
        res.render('adminRegister', { err: "Please fill Email Feilds... " })
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        res.render('adminRegister', { err: "Invalid email..." })

    } else if (password.length < 8) {
        res.render('adminRegister', { err: 'password minium 8 caracter' })
    }
    else if (password.length > 15) {
        res.render('adminRegister', { err: 'password maxium 15 caracter' })
    }

    else if (typeof err == "undefined") {
        adminschema.findOne({ email: email }, function (err, data) {
            if (err) throw err
            if (data) {
                err = "Email allready exist"
                res.redirect('/adminRegister', { 'err': err, 'name': name, 'email': email })
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash
                        adminschema({
                            name, email, password
                        }).save((err, data) => {
                            if (err) throw err
                            // sendEmail(req.body.name, req.body.email, data._id); //Email very option
                            res.render('admin')
                        });
                    })
                })
            }
        })
    }


});

// admin login
app.get('/admin', (req, res) => {
    res.render('adminLogin')
});

app.post('/adminlogin', async (req, res) => {
    const { email, password } = req.body;
    try {

        const data = await adminschema.findOne({ email: email })

        if (data) {

            const pasworrMatch = await bcrypt.compare(password, data.password);
            if (pasworrMatch) {

                req.session.userIdAdmin = data._id;
                res.redirect('/admindashboard');
            }
            else {

                res.render('adminLogin', { loginerr: "Email or Password incorrect" });
            }
            if (data.password === password && data.email === email) {

            }


        } else {
            loginerr = "Email or Password incorrect"
            res.render('adminLogin', { "loginerr": loginerr });
        }
        // console.log(data);
        res.render('adminLogin')
    } catch (error) {
        console.log(error.message)
    }

});

app.get('/logoutadmin', async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/admin');
    } catch (error) {
        console.log(error.message)
    }
})

// tour 
app.get('/addtour', auth.isLoginAdmin, (req, res) => {
    res.render('addtour')
})


app.get('/tourlist', auth.isLoginAdmin, async (req, res) => {
    try {
        tourSchema.find({}).sort({ "createdAt": -1 }).exec(function (err, tableData) {

            if (err) throw err
            //     console.log(data)
            res.render('tourlist', { tableData: tableData })
        })
    } catch (error) {

    }

})


app.post('/touradd', uplaod.single('tourimg'), async (req, res) => {
    const { tourname, duration, location, tourpice, persone, state, session, toptour, central, tourcatogery, tourdescription, keywords, tourabout, inclusion, day, hadding, description, } = req.body;
    const tourimg = req.file
        try {
        const tourAdd = joi.object({
            tourname: joi.string().min(3).required(),
            duration: joi.string().required(),
            location: joi.string().required(),
            tourpice: joi.string().required(),
            persone: joi.string().required(),
            state: joi.string().required(),
            session: joi.string().required(),
            toptour: joi.string().required(),
            central: joi.string().required(),
            tourcatogery: joi.string().required(),            
            tourdescription: joi.string().min(90).max(150).required(),
            keywords: joi.string().required(),
            tourabout: joi.string().required(),
            inclusion: joi.string().required(),
            day: joi.array().items( joi.string().required()),
            hadding: joi.array().items(joi.string().required()),
            description: joi.array().items(joi.string().required()),
        })
        let tourAddValidate = tourAdd.validate(req.body)
        
        if (tourAddValidate.error) {
            res.render('addtour', { err: tourAddValidate.error.details[0].message })
            return false;
         }
         
          
       
        // // Array of allowed files
        const array_of_allowed_files = ['png', 'jpeg', 'jpg'];
       
       
        const file_extension = tourimg.originalname.lastIndexOf('.')+1;
            const ext = tourimg.originalname.substring(file_extension);
        

        const resultMatch = array_of_allowed_files.includes(ext);
       
        // // Check if the uploaded file is allowed
         if (!tourimg) {
                res.render('addtour', { err: '" tourimg" is required' });
            }
        else if (resultMatch == false) {
            res.render('addtour', { err: "Tour Image only 'jpg, png, and jpeg' " });
            
        }
            // console.log(tourimg.size)

         else if (tourimg.size >= 200000) {
            res.render('addtour', { err: "Tour image max 200kb " });
            
        }
      
        const datatour = new tourSchema({
            tourname: tourname,
            duration: duration,
            location: location,
            persone: persone,
            tourimg: req.file.filename,
            tourpice: tourpice,
            state: state,
            session: session,
            toptour: toptour,
            central: central,
            tourcatogery: tourcatogery,
            tourdescription: tourdescription,
            keywords: keywords,
            tourabout: tourabout,            
            inclusion: inclusion,
            day: JSON.stringify(day),
            hadding: JSON.stringify(hadding),
            description: JSON.stringify(description),


        })
        const result = await datatour.save();
        console.log(result);
        res.render('addtour', { success:"SuccessFull Added your tour Thank you" })
    } catch (error) {
        console.log(error.message)
    }

})



app.get("/delete/:id", auth.isLoginAdmin, async (req, res) => {
    try {
        const Data = await tourSchema.findById({ _id: req.params.id });
        await fs.unlink("./public/img/" + Data.tourimg, (err => {  //delete file from directory
            if (err) console.log(err);
            else {
                console.log("delete file")
            }

        }))
        const tableData = await tourSchema.findByIdAndDelete({ _id: req.params.id });
        res.redirect('/tourlist')


    } catch (error) {

    }

})

// update data
app.get("/edit/:id", auth.isLoginAdmin, async (req, res) => {
    try {
        const tableData = await tourSchema.findById({ _id: req.params.id });
        res.render('tourupdate', { tableData: tableData })

    } catch (error) {

    }

})

app.post("/edit/:id", uplaod.single('tourimg'), async (req, res) => {
    const { tourname, duration, location, tourimg, tourpice, persone, state, session, toptour, central, tourcatogery, tourdescription, keywords, tourabout, inclusion, day, hadding, description, } = req.body;

    try {
        const tableData = await tourSchema.findById({ _id: req.params.id });   
       
        if (req.file) {
            const Data = await tourSchema.findById({ _id: req.params.id });
            await fs.unlink("./public/img/" + Data.tourimg, (err => {  //delete file from directory
                if (err) console.log(err);
                else {
                    console.log("delete file")
                }

            }))
            await tourSchema.findByIdAndUpdate({ _id: req.params.id },
                {

                    $set: {

                        tourname: tourname,
                        duration: duration,
                        location: location,
                        persone: persone,
                        tourimg: req.file.filename,
                        tourpice: tourpice,
                        state: state,
                        session: session,
                        toptour: toptour,
                        central: central,
                        tourcatogery: tourcatogery,
                        tourdescription: tourdescription,
                        keywords: keywords,
                        tourabout: tourabout,
                        inclusion: inclusion,
                        day: JSON.stringify(day),
                        hadding: JSON.stringify(hadding),
                        description: JSON.stringify(description),
                    }
                }
            );

        } else {
            await tourSchema.findByIdAndUpdate({ _id: req.params.id },
                {

                    $set: {

                        tourname: tourname,
                        duration: duration,
                        location: location,
                        persone: persone,
                        // tourimg: req.file.filename,
                        tourpice: tourpice,
                        state: state,
                        session: session,
                        toptour: toptour,
                        central: central,
                        tourcatogery: tourcatogery,
                        tourdescription: tourdescription,
                        keywords: keywords,
                        tourabout: tourabout,
                        inclusion: inclusion,
                        day: JSON.stringify(day),
                        hadding: JSON.stringify(hadding),
                        description: JSON.stringify(description),
                    }
                }
            );
        }


        res.redirect('/tourlist')
    } catch (error) {
        console.log(error.message)
    }

})


// get data mongodb using ajax
app.post("/view/", async (req, res) => {
    const { id } = req.body;
    const tableData = await tourSchema.findById({ _id: id });
    var x = res.render('modal_render', { tableData: tableData });
    res.json(x);
});

// user profile 

app.get("/userprofile", auth.isLoginAdmin, async (req, res) => {
    try {
        const tableData = await userSchema.find({}).exec();
        res.render('userprofile', { tableData: tableData })

    } catch (error) {

    }

})

app.get("/userview/:id", auth.isLoginAdmin, async (req, res) => {
    try {
        const userdata = await userSchema.findById({ _id: req.params.id });
        res.render('userview', { userdata: userdata })

    } catch (error) {
        console.log(error.message)
    }
});

// contact mail

app.get("/contactmsg", auth.isLoginAdmin, async (req, res) => {
    try {
        const tableData = await contact.find({}).sort({ "createdAt": -1 }).exec();
        res.render('contactmsg', { tableData: tableData })

    } catch (error) {

    }

})


module.exports = app;
