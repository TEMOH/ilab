const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true,
        minlength:1,
    },
    lastname:{
        type:String,
        required:true,
        minlength:1,
    },
    phonenumber:{
        type:String,
        required:true,
        minlength:11,
    },
    // picture:{
    //     type:String,
    //     required:true,
    // },
    // cv:{
    //     type:String,
    //     required:true,
    // },
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
    },
    edition:{
        type:String,
    },
    status:{
        type:String,
    },
    email:{
        type:String,
        required:true
    }
    // Date:{
    //     type:new Date(),
    // }
});

module.exports = mongoose.model('Applicants',ApplicantSchema) 