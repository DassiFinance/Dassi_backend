const mongoose = require("mongoose");
const { Schema } = mongoose;

var userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      city: String,
      state: String,
      country: String,
      pincode: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    walletId: {
      type: String,
    },
    totalAmtLent: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAmtBorrowed: {
      type: Number,
      required: true,
      default: 0,
    },
    noOfLoansApplied: {
      type: Number,
      required: true,
      default: 0,
    },
    noOfLoansSupported: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
