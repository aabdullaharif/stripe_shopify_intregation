const express = require('express');
const { loginUser, logoutUser } = require('../controllers/user');
const upload = require('../middlewares/upload');
const router = express.Router();

// router.route('/createUser').post(registerUser);
router.route('/login').post(upload.none(), loginUser);
router.route('/logout').post(logoutUser);

module.exports = router;
