const mongoose = require("mongoose");

const lenderSchema = new mongoose.Schema(
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
    Cart: [
      {
        loan: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Loan",
        },
        amount: Number,
      },
    ],
  },
  { timestamps: true }
);

const Lender = mongoose.model("Lender", lenderSchema);

module.exports = Lender;
