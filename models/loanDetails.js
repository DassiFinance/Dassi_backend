const mongoose = require("mongoose");

const loanDetailsSchema = new mongoose.Schema({
  loanAmount: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  emiRepetition: {
    type: String,
    required: true,
  },
  repaymentStartDate: {
    type: Date,
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
