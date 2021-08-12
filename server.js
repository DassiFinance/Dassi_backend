const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("./db/mongoose");

// For accepting cross origin requests
app.use(cors());

//Morgan for logging requests
app.use(morgan("dev"));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importing routes
const borrowerRouter = require("./routes/Borrower");

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use("/api/borrower", borrowerRouter);

// START THE SERVER
const port = process.env.PORT || 8080;
app.listen(port);
console.log("Listening on port " + port);
