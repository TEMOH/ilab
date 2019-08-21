const express = require('express');
const User = require('../controllers/users');
const Admin = require('../controllers/admin');
const policy = require('../policy/checkRegistration');

const router = express.Router();
// client side routes 
router.post('/quiz', User.isQuiz);
router.get('/edition', User.getEdition);
router.post('/message', User.isMessage);
router.post('/register', policy.register, User.isApplied);

//severside routes
router.post('/admin/quiz',Admin.setQuiz);
router.get('/admin/search', Admin.isSelect);
router.get('/admin/message', Admin.isMessage);
router.post('/admin/login', Admin.isLoggedIn);
router.post('/admin/edition', Admin.isEdition);
router.get('/admin/find-edition', Admin.getEdition);
router.post('/admin/find-quiz', Admin.findQuiz);
router.post('/admin/reject', Admin.isReject);
router.post('/admin/delete-quiz', Admin.delQuiz);
router.post('/admin/delete-edition', Admin.delEdition);
router.post('/admin/edited-edition', Admin.editedEdition);
router.post('/admin/edited-quiz', Admin.editedQuiz);
router.post('/admin/register', Admin.isRegistered);
router.get('/admin/applicants', Admin.isApplicants);

  
module.exports = router;