const mongoose = require('mongoose');
const validator = require('validator');

const registrationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your last name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    birthday: {
      type: Date,
      required: [true, 'Please enter your birthday'],
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Please enter your phone number'],
    },
    address1: {
      type: String,
      required: [true, 'Please enter first address'],
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      required: [true, 'Please enter your city'],
    },
    state: {
      type: String,
      required: [true, 'Please enter your state'],
    },
    zipcode: {
      type: Number,
      required: [true, 'Please enter your zipcode'],
    },
    country: {
      type: String,
    },
    items: {
      firstItemUrl: {
        type: String,
        required: [true, 'Please enter Item Url'],
      },
      secondItemUrl: {
        type: String,
      },
      desiredSize: {
        type: String,
        required: [true, 'Please enter desired size'],
      },
      shippingSpeed: {
        type: String,
        default: 'No',
      },
      packageProtection: {
        type: String,
        default: 'No',
      },
      additionalNotes: {
        type: String,
      },
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RegistrationModel', registrationSchema);
