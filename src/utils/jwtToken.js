const sendToken = async (user, res) => {
  const token = user.getJWTToken();

  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  const paidCount = await RegistrationModel.countDocuments({
    paid: true,
  });
  const unPaidCount = await RegistrationModel.countDocuments({
    paid: false,
  });
  const allCount = await RegistrationModel.countDocuments();

  res.cookie('token', token, options).render('home', {
    paidCount: paidCount,
    unPaidCount: unPaidCount,
    allCount: allCount,
  });
};

module.exports = sendToken;
