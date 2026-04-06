const Report = require('../models/reportModel');

exports.getCustomerProductSummary = async (req, res) => {
  try {
    const summary = await Report.getCustomerProductSummary();
    res.status(200).json(summary);
  } catch (error) {
    console.error('Error in getCustomerProductSummary:', error);
    res.status(500).json({ message: 'Failed to generate report', error: error.message });
  }
};
