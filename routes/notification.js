let express= require('express');
let router=express.Router();
let Notification=require('../models/notif_DB');


router.get('/notification',async function(req,res){
    // res.render('index.ejs');
    try {
        let notifications= await Notification.find({});
        res.render('notification/index.ejs',{notifications});
    } catch (error) {
        console.log(error);
    }
});

router.get('/notification/new',function(req,res){
    res.render('notification/new');
});

router.post('/notification',async function(req,res){
    try {
        // res.send(req.body);
        let newNotif= new Notification({
            body: req.body.body,
            author: req.body.author
        });
        await newNotif.save();
        res.redirect('/notification');
    } catch (error) {
        console.log(error);
    }
    
});
router.delete('/notifiction/:id',async function(req,res){
    // res.send('logic to delete');
    try {
        let id= req.params.id;
        await Notification.findByIdAndDelete(id);
        // console.log('i was here' ,id);
        res.redirect('/notification');
    } catch (error) {
        console.log('error while fetching a job for delete',error);
    }
});

module.exports=router;
