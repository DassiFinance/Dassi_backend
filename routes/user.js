const router = require("express").Router(); // get an instance of the express Router
const User = require("../models/user");
const authController = require("../controllers/user");

/**
 *  Creates a new User
 */
// Needs to be changes acc to data from oAuth
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile/:id", authController.getProfile);
router.post("/userDetails", authController.addUserDetails);

router.post("/userInfo", (req, res) => {
  User.create(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.status(409).send({ error, message: "User already exists" });
    });
});

module.exports = router;
