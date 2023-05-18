let express= require('express');
let mongoose= require('mongoose');
let methodOverride=require('method-override');
let app= express();
let session= require('express-session');
let passport= require('passport');
let localStrategy=require('passport-local');

mongoose.connect('mongodb+srv://admin:admin@jobdb.od1yxdh.mongodb.net/?retryWrites=true&w=majority')
.then(function(){
    console.log('DB working');
})
.catch(function(err){
    console.log(err);
})
app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires: Date.now()+1000*60*60*24,
    },
})
);
let User=require('./models/user_DB');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname+'/public'));
app.use(function(req,res,next){
    res.locals.currentuser=req.user;
    next();
})

// app.get('/',function(req,res){
//     res.render('landing');
// })
//instead
let jobRoutes=require('./routes/jobs');
let notifRoutes=require('./routes/notification');
let authRoutes=require('./routes/auth');

app.use(jobRoutes);
app.use(notifRoutes);
app.use(authRoutes);


app.listen(3000,function(){
    console.log('server started on prt 3000');
})