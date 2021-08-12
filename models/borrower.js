const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    loans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loan",
      },
    ],
  },
  { timestamps: true }
);

const Borrower = mongoose.model("Borrower", borrowerSchema);

module.exports = Borrower;
