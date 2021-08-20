const Loan = require("../models/loan");
const LoanDetails = require("../models/loanDetails");
const { createBorrowerHelper } = require("../helpers/borrower");

exports.createLoan = async (req, res) => {
  const reqLoanDetails = req.body;
  const newLoanDets = new LoanDetails({
    loanAmount: reqLoanDetails.loanAmount,
    duration: reqLoanDetails.duration,
    description: reqLoanDetails.description,
    repaymentStartDate: reqLoanDetails.repaymentStartDate,
    category: reqLoanDetails.category,
    emiRepetition: reqLoanDetails.emiRepetition,
    photo: req.file.buffer,
  });

  const borrower = await createBorrowerHelper(req.user._id);
  newLoanDets
    .save()
    .then((result) => {
      const newLoan = new Loan({
        borrowerId: borrower._id,
        loanDetails: result._id,
      });
      newLoan
        .save()
        .then((response) => {
          // Pushing the new loans _id into the borrower's loans
          borrower.loans.push(response._id);
          borrower.save();
          // Incrementing the user's loan count
          req.user.numberOfLoansApplied++;
          req.user.save();
          return res.status(200).json(response);
        })
        .catch((error) => {
          return res.send({ error, message: "Could not create loan" });
        });
    })
    .catch((error) => {
      return res.send({ error, message: "Could not create loan" });
    });
};

exports.displayActiveLoans = async (req, res, next) => {
  try {
    Loan.find()
      .populate("loanDetails")
      .then((loans) => res.json(loans));
  } catch (error) {
    res.status(400).json({ error, message: "Could not get active loans" });
  }
};

exports.getLoanPhoto = async (req, res, next) => {
  try {
    const loan = await Loan.findById(req.params.loanId);
    if (!loan || !loan.loanDetails) {
      res.status(404).send({ message: "Could not find loan image" });
    }
    const loanDetails = await LoanDetails.findById(loan.loanDetails);
    if (!loanDetails || !loanDetails.photo) {
      res.status(404).send({ message: "Could not find loan image" });
    }
    res.set("Content-Type", "image/jpg");
    res.send(loanDetails.photo);
  } catch (error) {
    return res
      .status(500)
      .send({ error, message: "Could not find loan image" });
  }
};
