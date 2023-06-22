const express = require('express');
const user = express();
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const passport = require('passport')
const userController = require('./userController');
const auth = require('../../middelware/auth');

const multer = require('multer');

// profile photo upload
const storage = multer.diskStorage({
  destination: function (req, file, callback) {

    callback(null, './public/img')// image location save
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

let uplaod = multer({ storage: storage })


user.get('/google', passport.authenticate('google', { scope: ['profile'] }));
user.get('/google', passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }));

user.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.render('myprofile')
  }
)

const oneDay = 1000 * 60 * 60 * 24;
user.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));;


user.use(cookieParser())

// Routest get method
user.get('/sign-up', auth.isLogout, userController.signUp);
user.get('/sign-in', auth.isLogout, userController.signIn);
user.get('/myprofile', auth.isLogin, userController.profiledata);
user.get('/logout', auth.isLogin, userController.userLogout);
user.get('/forget-password', auth.isLogout, userController.forgetPassword);
user.get('/verify', userController.verifyMail);
user.get('/reset-password', auth.isLogout, userController.resetPassword);
user.get('/profile_setting', auth.isLogin, userController.profileSetting); // profile setting route
user.get('/change-password', auth.isLogin, userController.changepassword);



//  Routes Post method
user.post('/login', userController.loginuser);
user.post('/submit', userController.submit);
user.post('/myprofile', userController.sentVerificationlink);
user.post('/forget-password', userController.sendEmailLink);
user.post('/reset-password', userController.newpass);
user.post('/profile_setting', uplaod.single('profile_pic'), userController.profileSettingPost);
user.post('/change-password', userController.changepasswordpost);
user.post('/rating', userController.rating); // rating route


module.exports = user;
