var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { getSecrets } = require('./secrets');
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


//sets up the middleware for parsing the bodies off of the requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// module.exports = { app };
//other imports
const usersRoute = require('./routes/users');

//other app.use statements
app.use('/', usersRoute);



app.listen(3001, () =>{
    console.log("My app is working at port 3001" + new Date());
});
