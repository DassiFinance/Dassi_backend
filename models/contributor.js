const mongoose = require("mongoose");

const contributorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    loan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Contributor = mongoose.model("Contributor", contributorSchema);

module.exports = Contributor;
