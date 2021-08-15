const Loan = require("../models/loan");
const LoanDetails = require("../models/loanDetails");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.createLoan = async (req, res) => {
  const reqLoanDetails = req.body.loanDetails;
  const newLoanDets = new LoanDetails({
    loanAmount: reqLoanDetails.loanAmount,
    timePeriod: reqLoanDetails.timePeriod,
    description: reqLoanDetails.description,
    photoUrl: reqLoanDetails.photoUrl,
    category: reqLoanDetails.category,
  });
  newLoanDets
    .save()
    .then((result) => {
      const newLoan = new Loan({
        borrowerId: req.body.borrowerId,
        loanDetails: result._id,
      });
      newLoan
        .save()
        .then((response) => {
          return res.status(200).json({
            Message: "Loan registered successfully",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
