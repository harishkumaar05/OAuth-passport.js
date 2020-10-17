const express = require('express');
const authRoutes = require('./routes/auth-routes');
const app = express();
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession =require('cookie-session');
const passport =require('passport');
//set up view engine

app.set('view engine','ejs');

app.unsubscribe(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
    //keys:['afeldielsi']
}))

//initialize the passport
app.use(passport.initialize());
app.use(passport.session());
//connect to mongoDb
mongoose.connect(keys.mongodb.dbURI,() =>{
    console.log('Connnected to mongodb');
});
//set routes
app.use('/auth', authRoutes);
app.unsubscribe('/profile',profileRoutes)
//create home route
app.get('/',(req,res) => {
    res.render('home',{user:req.user});
});

app.listen(3000,() => {
    console.log('app  listening on port 3000');
});