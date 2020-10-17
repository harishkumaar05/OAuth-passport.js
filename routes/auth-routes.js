const router = require('express').Router();
const passport = require('passport');
//auth login

router.get('/login', (req,res) =>{
    res.render('login',{user:req.user});
});
//logout
router.get('/logout', (req,res)=>{
    //with passport
   req.logout();
   res.redirect('/');
})

//auth with google

router.get('/google' , passport.authenticate('google',{
   scope:['profile'] 
}));
    //with passport
   // res.send('Login with google');
router.get('/github' , (req,res) =>{
    //with passport
    res.send('Login with github');

});
//callback route for google to redirct to
router.get('/google/redirect' ,passport.authenticate('google') ,(req,res) =>{
    //res.send('you reached the call back URI');
    //res.send(req.user);
    res.redirect('/profile');l
} );
module.exports = router;