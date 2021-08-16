const router = require("express").Router();
const Borrower = require("../models/borrower");

/**
 *  Creates a new Borrower
 */
exports.createBorrower = async (req, res, next) => {
  try {
    const { email } = req.body;
    User.findOne({ email }).then((user) => {
      if (user) {
        return res.status(400).send({ message: "User already exists" });
      } else {
        bcrypt.hash(req.body.password, 8).then((hashedPassword) => {
          const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
          });

          const token = jwt.sign({ _id: newUser._id }, jwtSecret, {
            expiresIn: jwtExpiresIn,
          });
          newUser.save().then((result) => {
            return res.status(201).json({
              message: "New User Created",
              token,
              user: result,
            });
          });
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Unable to create new User",
    });
  }
};

router.post("/create", (req, res) => {
  Borrower.create(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send({ error, message: "Borrower already exists" });
    });
});

module.exports = router;
