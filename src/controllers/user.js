const UserModel = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const errorMsg = 'Invalid Email or Password';

  if (!email || !password) {
    return res.render('signin', {
      errorMsg: errorMsg,
    });
  }

  const user = await UserModel.findOne({ email }).select('+password');
  if (!user) {
    return res.render('signin', {
      errorMsg: errorMsg,
    });
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res.render('signin', {
      errorMsg: errorMsg,
    });
  }

  const token = user.getJWTToken();

  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  res.cookie('token', token, options).redirect('/');
});

exports.logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.render('signin');
});
