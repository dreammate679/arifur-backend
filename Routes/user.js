const express = require('express');
const router = express.Router();
const { signup, login, logout, getUserProfile } = require('../Controller/userController');
const { isAuthenticatedMember } = require('../Middleware/checkAuth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me',isAuthenticatedMember, getUserProfile);



module.exports = router;