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
    totalAmountLent: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAmountBorrowed: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfLoansApplied: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfLoansSupported: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
