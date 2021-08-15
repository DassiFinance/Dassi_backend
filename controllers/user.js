const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtExpiresIn, jwtSecret } = require("../config/keys");

/**
 *  Creates a new User
 */
exports.register = async (req, res, next) => {
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

/**
 *  Login User
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "User email not found.",
        });
      } else {
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            return res.status(401).json({
              message: "User password didn't match.",
            });
          }
          const token = jwt.sign({ _id: user._id }, jwtSecret, {
            expiresIn: jwtExpiresIn,
          });
          return res.status(200).json({
            token: token,
          });
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Auth failed",
    });
  }
};

/**
 * Searches user by Id
 */
exports.userProfile = async (req, res, next) => {
  try {
    User.findById(req.params.id).then((response) => {
      res.send(response);
    });
  } catch (error) {
    res.status(401).send({ error, message: "User not found" });
  }
};
