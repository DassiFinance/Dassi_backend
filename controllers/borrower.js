const { createBorrowerHelper } = require("../helpers/borrower");

/**
 *  Creates a new Borrower or returns existing borrower
 */
exports.createBorrower = async (req, res, next) => {
  try {
    await createBorrowerHelper(req.user._id)
      .then((borrower) => {
        return res.send(borrower);
      })
      .catch((error) => {
        return res
          .status(401)
          .send({ error, message: "Could not create borrower" });
      });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Unable to create new Borrower",
    });
  }
};
