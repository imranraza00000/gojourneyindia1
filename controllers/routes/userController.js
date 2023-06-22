const env = require('dotenv').config();
const bcrypt = require('bcryptjs'); // password hash 
const nodemailer = require('nodemailer');
const SMTPConnection = require('nodemailer/lib/smtp-connection');
const jwt = require('jsonwebtoken');
const user = require('./userRoutes');
const randomString = require('randomstring');
var mongoose = require('mongoose');
const joi = require('joi');
const fs = require('fs');

// all collection here in mongodb
const userSchema = require('../../models/schema/userRegister');
const profileSchema = require('../../models/schema/userProfile');
const enquirySchema = require('../../models/schema/enquiry');
const ratingSchema = require('../../models/schema/rating')



const signUp = (req, res) => {
    res.render('signUp');
}
const signIn = (req, res) => {
    res.render('signIn');
}

// Data get from database in myprofile
const profiledata = async (req, res) => {

    try {
        const userProfile = await userSchema.findById({ _id: req.session.userId })// this session id finde to collection

        res.render('myprofile', { "user": userProfile });

    } catch (error) {
        console.log(error.message);
    }
}


const sendEmail = async (name, email, user_id) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.PORT,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        const mailOption = {
            from: 'Go Journey India <noreply@gojourneyindia.com>',
            to: email,
            subject: 'Verify your email',
            html: "<p>Hello " + name + ", your account created sucessfully <br> please  <a href='https://gojourneyindia.com/verify?id=" + user_id + "'  >Verify </a>your account</p>",
        }

        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error.message)
            } else {
                console.log('Email has been sent :-', info.response);
            }
        })

    } catch (error) {
        console.log(error.message);

    }
};

const verifyMail = async (req, res) => {
    try {
        const update = await userSchema.updateOne({ _id: req.query.id }, { $set: { is_verified: true } });
        res.render('emailverify');
    } catch (error) {
        console.log(error.message)
    }

}
const sentVerificationlink = async (req, res) => {
    try {
        const getEmail = await userSchema.findById({ _id: req.session.userId })
        if (getEmail.email) {
            sendEmail(getEmail.name, getEmail.email, getEmail._id);

            res.redirect('/myprofile')

        } else {
            res.redirect('/myprofile')
        }


    } catch (error) {
        console.log(error.message)
    }
}


const submit = async (req, res) => {


    var { name, countryCode, mobile, email, password, confirm_password } = req.body;

    try {

        const register = joi.object({
            name: joi.string().min(3).required(),
            mobile: joi.string().min(3).max(15).pattern(/^[0-9]+$/).required(),
            countryCode: joi.string(),
            email: joi.string().min(10).trim().required().email().required(),
            password: joi.string().min(3).max(15).required().label('Password'),
            confirm_password: joi.any().equal(joi.ref('password')).required().label('Confirm password').options({ messages: { 'any.only': '{{#label}} does not match' } })

        })
        let registerValidate = register.validate(req.body)
        if (registerValidate.error) {
            res.render('signUp', { err: registerValidate.error.details[0].message })

        }

        else if (typeof err == "undefined") {
            userSchema.findOne({ email: email }, function (err, data) {
                if (err) throw err
                if (data) {
                    err = "Email allready exist"
                    res.render('signUp', { 'err': err, 'name': name, 'mobile': mobile, 'email': email })
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err;
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err;
                            password = hash
                            userSchema({
                                name, countryCode, mobile, email, password
                            }).save((err, data) => {
                                if (err) throw err
                                sendEmail(req.body.name, req.body.email, data._id); //Email very option
                                req.session.userId = data._id;
                                res.redirect('/myprofile')
                            });
                        })
                    })
                }
            })
        }

    } catch (error) {
        console.log(error)
    }
}


const loginuser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password
        const result = await userSchema.findOne({ email: email })

        var loginerr;
        if (!email || !password) {
            loginerr = "Please fill all the Feilds...";
            res.render('signIn', { "loginerr": loginerr });
        }

        if (result) {

            const pasworrMatch = await bcrypt.compare(password, result.password);
            if (pasworrMatch) {

                req.session.userId = result._id;
                res.redirect('/myprofile');
            }
            else {
                loginerr = "Email or Password incorrect"
                res.render('signIn', { "loginerr": loginerr });
            }
            if (result.password === password && result.email === email) {

            }


        } else {
            loginerr = "Email or Password incorrect"
            res.render('signIn', { "loginerr": loginerr });
        }



    } catch (error) {
        console.log(error)
    }
};

// rating funcationality here sent in database
const rating = async(req, res)=>{
    try {
         const {tour_id, star, review} = req.body;
          const ratingObj = new ratingSchema({
            tour_id : tour_id,
            user_id : req.session.userId,
            star: star,
            review: review
          })
          const ratingSave = await ratingObj.save()
        //   console.log(ratingSave)
          res.redirect('/')
    }catch(error){
        console.log(error)
    }
}


const userLogout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/index');
    } catch (error) {
        console.log(error.message)
    }
}

const forgetPassword = async (req, res) => {
    try {
        res.render('forgetPassword')
    } catch (error) {
        console.log(error.message)
    }
}

const resetPasswordMail = async (name, email, _id, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.PORT,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        const mailOption = {
            from: 'Go Journey India <noreply@gojourneyindia.com>',
            to: email,
            subject: 'Reset Password',
            html: "<p>Hello " + name + ", please click here Reset Password to <a href='https://gojourneyindia.com/reset-password?token=" + token + "'  >" + _id + " / " + token + "</a></p>",
        }

        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error.message)
            } else {
                console.log('Email has been sent :-', info.response);
            }
        })

    } catch (error) {
        console.log(error.message);

    }
};

// send reset password link tom post method

const sendEmailLink = async (req, res) => {
    try {
        const email = req.body.email;
        const data = await userSchema.findOne({ email: email })
        if (data) {
            const token = randomString.generate(500);
            console.log(token)
            const update = await userSchema.updateOne({ email: email }, { $set: { token: token } });
            resetPasswordMail(data.name, data.email, data._id, token);
            res.render('forgetPassword', { success: "Sent reset password in your mail" })
        } else {
            res.render('forgetPassword', { forgetPasswordmsg: 'Please Enter your currect email id' });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const resetPassword = async (req, res) => {
    try {
        const token = req.query.token
        console.log(token);
        const data = await userSchema.findOne({ token: token })

        if (data) {
            res.render('newpass', { userId: data._id })
        } else {
            res.send("token expired")
        }

    } catch (error) {
        console.log(error.message)
    }
}

// passowrd hash
const secure_password = async (password) => {
    const passwordHash = bcrypt.hash(password, 10);
    return passwordHash;
}

// Reset Password change here code
const newpass = async (req, res) => {
    try {
        const { password, confirm_password } = req.body
        if (password !== "" && confirm_password !== "") {
            if (password === confirm_password) {
                if (password.length < 8) {
                    if (password.length > 15) {
                        const password_hash = await secure_password(password);
                        const passwordUpdate = await userSchema.findByIdAndUpdate({ _id: req.body.userId }, { $set: { password: password_hash, token: '' } })
                        res.redirect('/signIn');
                    } else {
                        res.render("newpass", { pasValidate: "Password maximum 15 carcter" });
                    }
                } else {
                    res.render("newpass", { pasValidate: "Password minimum 8 caracter" })
                }
            } else {
                res.render("newpass", { pasValidate: "Password does not match" })
            }
        } else {
            res.render("newpass", { pasValidate: "Password is empty" })
        }

    } catch (error) {
        console.log(error.message)
    }


}

// profile setting page

const profileSetting = async (req, res) => {
    try {
        const data = await userSchema.findById({ _id: req.session.userId })
        res.render('profilesetting', { data: data })
    } catch (error) {
        console.log(error.message)
    }



}

// profile update 

const profileSettingPost = async (req, res) => {
    // const passwordHash = bcrypt.hash(password, 10);
    // return passwordHash;
    var { name, mobile, email, password } = req.body;
    try {

        const data = await userSchema.findById({ _id: req.session.userId })
        const pasworrMatch = await bcrypt.compare(password, data.password);
        console.log(pasworrMatch);
        if (!password) {
            res.render('profilesetting', { err: "Plz.. Enter your password", data: data })
        }
        else if (!pasworrMatch) {
            res.render('profilesetting', { err: "password wrong", data: data })

        } else if (req.file) {
            const dataimg = await userSchema.findById({ _id: req.session.userId })
            await fs.unlink("./public/img/" + dataimg.profile_pic, (err => {  //delete file from directory
                if (err) console.log(err);


            }))
            await userSchema.updateOne({ _id: req.session.userId },
                {
                    $set: {
                        name: name,
                        mobile: mobile,
                        email: email,
                        profile_pic: req.file.filename,
                    }
                }, { new: true, useFindAndModify: false })
        } else {
            await userSchema.updateOne({ _id: req.session.userId },
                {
                    $set: {
                        name: name,
                        mobile: mobile,
                        email: email,
                    }
                }, { new: true, useFindAndModify: false })
        }

        res.redirect('/myprofile')
    } catch (error) {
        console.log(error.message)
    }

}

// get chancge password 
const changepassword = (req, res) => {
    res.render('userchangpassword')
}

// post change password

const changepasswordpost = async (req, res) => {
    const { current_password, newPassword, repeat_password } = req.body
    try {


        const passwordValidat = joi.object({
            newPassword: joi.string().min(8).max(15).required(),
            repeat_password: joi.string().required(),
            current_password: joi.string().required(),

        })

        let resultvalidate = passwordValidat.validate(req.body)
        if (resultvalidate.error) {
            res.render('userchangpassword', { pasValidate: resultvalidate.error.details[0].message })
        } else if (newPassword != repeat_password) {
            res.render('userchangpassword', { pasValidate: " password does not match" })
        }
        const data = await userSchema.findById({ _id: req.session.userId })
        const pasworrMatch = await bcrypt.compare(current_password, data.password);
        const password_hash = await secure_password(newPassword);

        if (pasworrMatch) {

            await userSchema.updateOne({ _id: req.session.userId },
                {
                    $set: {
                        password: password_hash,
                    }
                }, { new: true, useFindAndModify: false })

        } else {
            res.render('userchangpassword', { pasValidate: "Current password wrong" })
        }
        res.render('userchangpassword', { success: "password update succesfully" });

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    signIn, signUp, submit,
    loginuser, rating, userLogout,
    forgetPassword, verifyMail,
    sentVerificationlink,
    profiledata, sendEmailLink,
    resetPassword, newpass,
    // personalinformation, 
    profileSetting, profileSettingPost,
    // deleteUser,
    changepassword,
    changepasswordpost,

}
