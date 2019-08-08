const express = require('express');

const User = require('../models/user');
const Users = require('../controllers/users');

const router = express.Router();

router.post('/register', Users.isRegistered);

router.post('/login', Users.isLoggedIn);
router.post('/approve', Users.isApproved);


  
  module.exports = router;