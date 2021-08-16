const router = require("express").Router(); // get an instance of the express Router
const controller = require("../controllers/borrower");
const asyncHandler = require("express-async-handler");
const { authRequired } = require("../middleware/auth");

// router.post("/create", authRequired, asyncHandler(controller.createBorrower));
// router.post("/userDetails", controller.addUserDetails);

module.exports = router;
