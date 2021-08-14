const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).send({ message: "User already exists" });
      } else {
        bcrypt.hash(req.body.password, 8).then((hashedPassword) => {
          const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
          });

          const token = jwt.sign(
            { email: req.body.email },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.JWT_EXPIRES_IN,
            }
          );
          newUser
            .save()
            .then((result) => {
              return res.status(201).json({
                token,
                result,
              });
            })
            .catch((e) => {
              console.log(e);
              return res.status(500).json({
                error: e,
              });
            });
        });
      }
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).json({
        error: "Unable to create new User",
      });
    });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "User email not found.",
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res.status(401).json({
                message: "User password didn't match.",
              });
            }
            const token = jwt.sign(
              { email: req.body.email },
              process.env.JWT_SECRET,
              {
                expiresIn: process.env.JWT_EXPIRES_IN,
              }
            );
            return res.status(200).json({
              token: token,
            });
          })
          .catch((e) => {
            console.log(e);
            return res.status(500).json({
              error: e,
            });
          });
      }
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).json({
        error: "Auth failed",
      });
    });
};
exports.getProfile = async (res, req) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => res.status(400).json("Error : " + err));
};
