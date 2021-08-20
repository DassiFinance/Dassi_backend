const router = require("express").Router();
const loanController = require("../controllers/loan");
const asyncHandler = require("express-async-handler");
const { authRequired } = require("../middleware/auth");
const { upload } = require("../middleware/multer");

router.post(
  "/create",
  authRequired,
  upload.single("photo"),
  asyncHandler(loanController.createLoan)
);
router.get("/activeLoans", loanController.displayActiveLoans);
router.get("/loanPhoto/:loanId", loanController.getLoanPhoto);

module.exports = router;
