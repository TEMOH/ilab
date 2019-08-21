const mongoose = require('mongoose');

const EditionsSchema = new mongoose.Schema({
  
    
name:{
    type:String,
    required:true,
    minlength:5
  },
email:{
    type:String,
    required:true
},
message:{
    type:String,
    minlength:20,
    maxlength:500
}

});

module.exports = mongoose.model('Messages',EditionsSchema) 