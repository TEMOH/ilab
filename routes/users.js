const express = require('express');

const User = require('../models/user');
const Users = require('../controllers/users');

const router = express.Router();

router.post('/register', Users.isRegistered);

router.post('/login', Users.isLoggedIn);


  
  module.exports = router;