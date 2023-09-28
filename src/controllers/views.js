const RegistrationModel = require('../models/registration');
const ApiFeatures = require('../utils/apiFeatures');

exports.homePage = async (req, res) => {
  try {
    const paidCount = await RegistrationModel.countDocuments({
      paid: true,
    });
    const unPaidCount = await RegistrationModel.countDocuments({
      paid: false,
    });
    const allCount = await RegistrationModel.countDocuments();

    res.render('home', {
      paidCount: paidCount,
      unPaidCount: unPaidCount,
      allCount: allCount,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.paidResponses = async (req, res) => {
  try {
    const resultPerPage = 20;
    const totalPaidResponses = await RegistrationModel.countDocuments({
      paid: true,
    });
    const totalPages = Math.ceil(totalPaidResponses / resultPerPage);
    const currentPage = Number(req.query.page) || 1;

    const apiFeature = new ApiFeatures(
      RegistrationModel.find({ paid: true }),
      req.query
    ).pagination(resultPerPage);

    const paidResponses = await apiFeature.query;

    res.render('paid', {
      paidResponses: paidResponses,
      totalPages: totalPages,
      currentPage: currentPage,
      paid: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.unpaidResponses = async (req, res) => {
  try {
    const resultPerPage = 20;

    const totalUnPaidResponses = await RegistrationModel.countDocuments({
      paid: false,
    });
    const totalPages = Math.ceil(totalUnPaidResponses / resultPerPage);
    const currentPage = Number(req.query.page) || 1;

    const apiFeature = new ApiFeatures(
      RegistrationModel.find({ paid: false }),
      req.query
    ).pagination(resultPerPage);

    const unpaidResponses = await apiFeature.query;

    res.render('unpaid', {
      unpaidResponses: unpaidResponses,
      totalPages: totalPages,
      currentPage: currentPage,
      paid: false,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getResponse = async (req, res) => {
  try {
    const response = await RegistrationModel.findById(req.params.id);

    if (!response) {
      return res.status(404).json({ error: 'Response Not Found' });
    }

    res.render('response', {
      response: response,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteResponse = async (req, res) => {
  try {
    const deletedResponse = await RegistrationModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedResponse) {
      return res.status(404).json({ error: 'Response Not Found' });
    }
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
