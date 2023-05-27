let express= require('express');
let router = express.Router();
let Job=require('../models/job_DB');
let Notification=require('../models/notif_DB');
let {isLoggedIn,isAdmin}= require('../middleware/index');

router.get('/',function(req,res){
    res.render('landing.ejs');
});

//REST Conventions
//index   get req
router.get('/jobs',async function(req,res){
    // res.render('index.ejs');
    try {
        let foundJobs= await Job.find({});
        res.render('index.ejs',{foundJobs});
    } catch (error) {
        console.log(error);
    }
});

// new == show new get req
// const isLoggedIn=function(req,res,next){
//     if(req.isAuthenticated()){
//         next();
//     }else{
//         console.log('not logged in');
//         res.redirect('/login');
//     }
// };
// const isAdmin= function(req,res,next){
//     if(req.user.isAdmin){
//         next();
//     }
//     else{
//         console.log('not an admin');
//         res.send('you dont have permission');
//     }
// }
router.get('/jobs/new',isLoggedIn, isAdmin, function(req,res){
    res.render('new');
});
//Create post req
router.post('/jobs',async function(req,res){
    try {
        // res.send(req.body);
        let newJob= new Job({
            name: req.body.name,
            address: req.body.address,
            image: req.body.image,
            package: req.body.package,
            cgpa: req.body.cgpa,
            deadline: req.body.deadline,
            type: req.body.type
        });
        await newJob.save();
        let newNotif= new Notification({
            body:'A new Job has been posted by: ',
            author: newJob.name
        });
        await newNotif.save();
        res.redirect('/jobs');
    } catch (error) {
        console.log(error);
    }
    
});
//show by ID get req

router.get('/jobs/:id',async function(req,res){
    try {
        let id= req.params.id;
        let job=await Job.findById(id);
        res.render('show',{job});

    } catch (error) {
        console.log(error);
    }
});
//Edit form get req
router.get('/jobs/:id/edit',async function(req,res){
    try {
        let id= req.params.id;
        let job=await Job.findById(id);
        res.render('edit',{job});

    } catch (error) {
        console.log('error while fetching a job for edit',error);
    }
});
//Updatee actually Patch request
router.patch('/jobs/:id', async function(req,res){
    
    try {
        let id=req.params.id;
        let updatedJob={
            name:req.body.name,
            address:req.body.address,
            image:req.body.image,
            package: req.body.package,
            cgpa: req.body.cgpa,
            deadline: req.body.deadline,
            type: req.body.type
        };
        await Job.findByIdAndUpdate(id,updatedJob);
        let newNotif= new Notification({
            body:'A Job has been updated by: ',
            author: updatedJob.name
        });
        await newNotif.save();
        res.redirect(`/jobs/${id}`);
    } catch (error) {
        console.log('error while fetching a job for edit',error);
    }
});
//delete  delete req
router.delete('/jobs/:id',async function(req,res){
    // res.send('logic to delete');
    try {
        let id= req.params.id;
        await Job.findByIdAndDelete(id);
        console.log('i was here' ,id);
        res.redirect('/jobs');
    } catch (error) {
        console.log('error while fetching a job for delete',error);
    }
});


module.exports=router;