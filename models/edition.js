const mongoose = require('mongoose');

const EditionsSchema = new mongoose.Schema({
  
    
edition:{
    type:Array
  },
admission:{
    type:Boolean
}

});

module.exports = mongoose.model('Editions',EditionsSchema) 