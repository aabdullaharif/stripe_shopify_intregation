const express = require('express');
const { registration } = require('../controllers/registration');
const router = express.Router();

router.route('/register').post(registration);

module.exports = router;
