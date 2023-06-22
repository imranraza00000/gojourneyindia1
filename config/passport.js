const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/schema/googleAuth');


module.exports = function(passport){ 
    passport.use(new GoogleStrategy({
        clientID: "789991012519-vnuelc2bg04n6507e4qva34to60vui25.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/google/callback"
      },
      async(accessToken, refreshToken, profile, done)=> {
       console.log(">>>>>>>>>>>>",profile);
       const newUser = {
        googleId : profile.id,
        displayName : profile.displayName,
        firstName : profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image : profile.photos[0].value
      }
      try{
        let user = await User.findOne({googleId : profile.id});

        if(user) {
          done(null,user)
        }
        else {
          user= await User.create(newUser)
          done(null,user);
        }
      }catch(err) {
        console.log(err);
      }
      }
    ));
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}