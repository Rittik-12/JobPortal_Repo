let express= require('express');
const User = require('../models/user_DB');
const passport = require('passport');
let router = express.Router();




router.get('/register',function(req,res){
    res.render('register');
});

router.post('/register', async function(req,res){
    let user=new User({
        username:req.body.username
    });
    let registeredUser=await User.register(user,req.body.password);
    req.logIn(registeredUser,function(err){
        if(err)
        console.log('error while registering');
        res.redirect('/jobs');
    });
});

router.get('/login' , function(req,res){
    res.render('login');
});
router.post('/login' ,passport.authenticate('local', {failureRedirect:'/login'}), function(req,res){
    res.redirect('/jobs');
});
router.get('/logout', function(req,res){
    req.logOut(function(err){
        console.log('error while logging out', err);
        res.redirect('/jobs');
    });
    
});
module.exports=router;