const mongoose = require("mongoose");

const loanDetailsSchema = new mongoose.Schema({
  loanAmount: {
    type: Number,
    required: true,
  },
  timePeriod: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: Buffer,
  },
  category: {
    type: String,
    required: true,
  },
});

const LoanDetails = mongoose.model("LoanDetails", loanDetailsSchema);

module.exports = LoanDetails;
