const router = require("express").Router(); // get an instance of the express Router
const controller = require("../controllers/lender");
const asyncHandler = require("express-async-handler");
const { authRequired } = require("../middleware/auth");

router.post("/create", authRequired, asyncHandler(controller.createLender));
router.post("/lend", authRequired, asyncHandler(controller.lendAmount));

module.exports = router;
