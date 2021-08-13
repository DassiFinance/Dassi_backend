const router = require("express").Router();
const Borrower = require("../models/borrower");

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
