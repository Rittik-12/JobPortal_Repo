let mongoose=require('mongoose');
let passportlocalmongoose=require('passport-local-mongoose');

let userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportlocalmongoose);

let User=mongoose.model('user',userSchema);
module.exports=User;