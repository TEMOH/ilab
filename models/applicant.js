const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
    firstname:{
        type: String,
        // required: 'Please enter your name',
        // minlength:1,
    },
    lastname:{
        type:String,
        required:'Please enter your name',
        minlength:1,
    },
    phonenumber:{
        type:Number,
        // required:true,
        minlength:11,
    },
    email:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true,
    },
    cv:{
        type:Object,
        required:true,
    },
    stage:{
        type:String,
        required:true,
    },
    specification:{
        type:String,
        required:true,
    },
    reason:{
        type:String,
        required:true,
    },
    edition:{
        type:String,
        // required:true
    },
    // date:{
    //     type: Date
    // }
});

module.exports = mongoose.model('Applicants',ApplicantSchema) 