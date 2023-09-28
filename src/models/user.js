const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter your Name'],
      maxLength: [40, 'Name should have less than 40 characters'],
      minLength: [4, 'Name should be greater than 4 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please Enter your Email'],
      validate: [validator.isEmail, 'Please Enter a valid Email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please Enter your Password'],
      minLength: [8, 'Password should be have 8 characters'],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Generate JWT
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('UserModel', userSchema);
