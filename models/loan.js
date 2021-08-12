const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    borrowerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    loanDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: " LoanDetails",
    },
    contributors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contributor",
      },
    ],
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
