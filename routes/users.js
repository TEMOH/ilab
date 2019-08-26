const express = require('express');
const Admin = require('../controllers/Admin');
const Applicants = require('../controllers/users');
const router = express.Router();

  /* ADMIN ROUTES */
router.post('/signup', Admin.isRegistered); // Route for Admin signup
router.post('/login', Admin.isLoggedIn); // Route for Admin login
router.put('/confirm', Admin.isApproved); // Route for Admin approving Applicants
router.put('/rejected', Admin.isRejected); //Route for Admin rejecting Applicants
router.post('/contact', Admin.postContact); //Route for Post Contact messages & Info
router.get('/contacts', Admin.getContact); // Route for getting all contacts for Admin
router.delete('/contact/delete', Admin.deleteContact); //Route for deleting contacts


  /* Applicants Routes */
  
router.post('/register', Applicants.isApplied); // Routes for Applicants registering
  
module.exports = router;