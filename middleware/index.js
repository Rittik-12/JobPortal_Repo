const isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        console.log('not logged in');
        res.redirect('/login');
    }
};
const isAdmin= function(req,res,next){
    if(req.user.isAdmin){
        next();
    }
    else{
        console.log('not an admin');
        res.send('you dont have permission');
    }
}
module.exports={
    isLoggedIn,
    isAdmin
};