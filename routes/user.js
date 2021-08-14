const router = require("express").Router(); // get an instance of the express Router
const authController = require("../controllers/user");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile/:id", authController.userProfile);

module.exports = router;
