const Borrower = require("../models/borrower");

/**
 *  Creates a new Borrower or returns existing borrower
 */
exports.createBorrower = async (req, res, next) => {
  try {
    await Borrower.findOne({ userId: req.user._id })
      .then((response) => {
        if (response) {
          return res.send(response);
        } else {
          Borrower.create({ userId: req.user._id })
            .then((response) => {
              return res.send(response);
            })
            .catch((error) => {
              return res.send({ error, message: "Failed to create borrower" });
            });
        }
      })
      .catch((error) => {
        return res.send("Yoo");
      });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Unable to create new User",
    });
  }
};
