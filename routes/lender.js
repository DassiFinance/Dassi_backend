const router = require("express").Router();
const Lender = require("../models/lender");

router.post("/create", (req, res) => {
  Lender.create(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send({ error, message: "Lender already exists" });
    });
});
//to be called/executed after payment

module.exports = router;
