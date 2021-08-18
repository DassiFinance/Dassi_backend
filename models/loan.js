const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    borrowerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    loanDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoanDetails",
    },
    contributors: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: " User",
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
