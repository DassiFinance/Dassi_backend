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
      .select("-createdAt -updatedAt -__v")
      .populate("loanDetails", "-_id -photo -__v")
      .then((loans) => res.json(loans));
  } catch (error) {
    res.status(400).json({ error, message: "Could not get active loans" });
  }
};

exports.getLoanPhoto = async (req, res, next) => {
  try {
    Loan.findById(req.params.loanId)
      .populate("loanDetails", "photo")
      .then((result) => {
        res.set("Content-Type", "image/jpg");
        return res.send(result.loanDetails.photo);
      })
      .catch((error) => {
        return res.send({ error, message: "Could not find loan image" });
      });
  } catch (error) {
    return res
      .status(404)
      .send({ error, message: "Could not find loan image" });
  }
};
