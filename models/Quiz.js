const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    specification:{
        type: String,
        minlength:1,
    },
   questions:{
        type:Array,
        minlength:1,
    },
});

module.exports = mongoose.model('quiz',QuizSchema) 