const router = require("express").Router(); // get an instance of the express Router
const User = require("../models/user");
const authController = require("../controllers/user");

/**
 *  Creates a new User
 */
// Needs to be changes acc to data from oAuth
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/userInfo", (req, res) => {
  User.create(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.status(409).send({ error, message: "User already exists" });
    });
});

/**
 * Get user by Id
 */
router.get("/profile/:id", (req, res) => {
  User.findById(req.params.id)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.status(401).send({ error, message: "User not found" });
    });
});

module.exports = router;
