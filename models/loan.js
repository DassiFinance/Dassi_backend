const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    borrowerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contributors: [
      {
        userId: {
          unique: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: " User",
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    category: {
      required: true,
      type: String,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    amountLeft: {
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
      required: true,
    },
    repaid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
