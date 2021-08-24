const Loan = require("../models/loan");
const { createBorrowerHelper } = require("../helpers/borrower");

exports.createLoan = async (req, res) => {
  try {
    const reqLoanDetails = req.body;
    const borrower = await createBorrowerHelper(req.user._id);
    const newLoan = new Loan({
      borrowerId: borrower._id,
      loanAmount: reqLoanDetails.loanAmount,
      amountLeft: reqLoanDetails.loanAmount,
      duration: reqLoanDetails.duration,
      description: reqLoanDetails.description,
      repaymentStartDate: reqLoanDetails.repaymentStartDate,
      category: reqLoanDetails.category,
      emiRepetition: reqLoanDetails.emiRepetition,
      photo: req.file.buffer,
    });
    await newLoan.save();

    // Pushing the new loans _id into the borrower's loans
    borrower.loans.push(newLoan._id);
    borrower.save();
    // Incrementing the user's loan count
    req.user.numberOfLoansApplied++;
    req.user.save();

    newLoan.photo = undefined;
    return res.status(200).json(newLoan);
  } catch (error) {
    console.log(error);
    return res.send({ error, message: "Could not create loan" });
  }
};

exports.displayActiveLoans = async (req, res, next) => {
  try {
    Loan.find()
      .select("-photo -createdAt -updatedAt -__v")
      .then((loans) => res.json(loans));
  } catch (error) {
    res.status(400).json({ error, message: "Could not get active loans" });
  }
};

exports.displayActiveLoansWithFilter = async (req, res, next) => {
  try {
    Loan.find(req.params)
      .select("-photo -createdAt -updatedAt -__v")
      .then((loans) => res.json(loans));
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "Could not get active loans" });
  }
};

exports.getLoanPhoto = async (req, res, next) => {
  try {
    Loan.findById(req.params.loanId)
      .then((result) => {
        res.set("Content-Type", "image/jpg");
        return res.send(result.photo);
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
