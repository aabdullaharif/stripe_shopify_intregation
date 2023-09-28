const jwt = require('jsonwebtoken');
const asyncHandler = require('../middlewares/asyncHandler');
const UserModel = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;

exports.protectedRoute = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.render('signin');
  }

  const decodedData = jwt.verify(token, JWT_SECRET);
  req.user = await UserModel.findById(decodedData._id);
  next();
});
