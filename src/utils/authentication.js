const JWT = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
  };
  const token = JWT.sign(payload, JWT_SECRET);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
