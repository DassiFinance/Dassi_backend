const router = require("express").Router();
const Loan = require("../models/loan");
const loanController = require("../controllers/loan");

router.post("/create", loanController.createLoan);
module.exports = router;
