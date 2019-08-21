var express = require('express');
let path = require('path')
var app = express();
const bodyParser = require('body-parser');
const cors =require('cors')
const mongoose = require('mongoose');
const { getSecrets } = require('./secret');
mongoose.Promise = global.Promise;
mongoose
  .connect(
    getSecrets('dbUrl'),
    { useNewUrlParser: true
    })
  .then(
    () => {
      console.log('Connected to mongoDB');
    },
    (err) => console.log('Error connecting to mongoDB', err)
  );


//sets up the middleware for parsing the bodies and cookies off of the requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())



//other imports
const usersRoute = require('./routes/users');

//other app.use statements
app.use('/', usersRoute);

// app.post('/register', (req,res)=>{
//     res.send({
//        message:`'happy is he!, ${req.body.email,req.body.password}`
//     })
//  })

app.listen(4040, () =>{
    console.log("My app is working at port 3001"+ " " + new Date());
});



