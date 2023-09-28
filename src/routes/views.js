const express = require('express');
const {
  homePage,
  paidResponses,
  unpaidResponses,
  getResponse,
  deleteResponse,
} = require('../controllers/views');
const { protectedRoute } = require('../middlewares/auth');
const router = express.Router();

router.route('/').get(protectedRoute, homePage);
router.route('/page/paid').get(protectedRoute, paidResponses);
router.route('/page/unpaid').get(protectedRoute, unpaidResponses);

router
  .route('/page/response/:id')
  .get(protectedRoute, getResponse)
  .delete(protectedRoute, deleteResponse);

module.exports = router;
