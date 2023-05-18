let mongoose= require('mongoose');
let jobSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address:String,
    image:String,
    package:Number,
    description:String,
    cgpa: Number,
    deadline: {
        type:Date,
        default:Date.now
    },
    type:{
        type: String,
        default: 'fulltime'
    }


});
let Job = mongoose.model('jobs',jobSchema);
module.exports=Job;