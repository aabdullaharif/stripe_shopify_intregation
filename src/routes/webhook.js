const express = require('express');
const { handleWebhook } = require('../controllers/registration');
const router = express.Router();

router
  .route('/stripe/webhook')
  .post(express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;
