const mongoose = require("mongoose");
const { Schema } = mongoose;

var userSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: {
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
    },
    address: {
      city: String,
      state: String,
      country: String,
      pincode: String,
    },
    occupation: {
      type: String,
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
