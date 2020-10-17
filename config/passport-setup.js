const passport =require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user,done) =>{
    done(null,user.id);
});

passport.deserializeUser((id,done) =>{
    User.findById(id).then((user) =>{
        done(null,user.id);
    });
    
});
passport.use(
    new GoogleStrategy({
        //can also use from separate file by importing
        //clientID:keys.google.clientID
        //clientSecret:keys.google.clientSecret
        //options for google strategy
        callbackURL:'/auth/google/redirect',
        clientID:'xxx',
        clientSecret:'yyy'
    }, (accessToken,refreshToken,profile,done) => {
        //passport callback func
        
        //console.log(profile);
        
        //check if user already exists in our db

        User.findOne({googleId:profile.id}).then( () =>{
            if(currentUser){
                //already exists
                console.log('user is:',currentUser);
                done(null,currentUser);
            }else{
                //new user
                new User({
                    username:profile.displayName,
                    googleId:profile.id,
                    thumbnail:profile._json.image.url
                }).save().then((newUser) =>{
                    console.log('new user created:' +newUser);
                    done(null,newUser); 
                });
            }
        });
       
    })
)