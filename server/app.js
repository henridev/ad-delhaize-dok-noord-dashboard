const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const cors = require("cors");
const express = require("express");

const bodyParser = require("body-parser");

// const cookieParser = require("cookie-parser");

const logger = require("morgan");
// const nocache = require("nocache");

// const app_name = require("./package.json").name;

const app = express();

// app.use(nocache());

// CORS  headers
app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, process.env.NODE_ENV !== "production");
    },
    optionsSuccessStatus: 200,
    credentials: true
  })
);
app.use(logger("dev"));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser())

// Set the public folder to "~/client/build/"
// Example: http://localhost:5000/favicon.ico => Display "~/client/build/favicon.ico"
app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/api/orders", require("./routes/orders.js"));
app.use("/api/sandwiches", require("./routes/sandwiches.js"));
app.use("/api/uploads", require("./routes/upload.js"));
app.use("/api/kasboek", require("./routes/kasboek.js"));

// create an error if we have an api route that does not
// seem to find an route
app.use("/api/*", (req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// we can send our entry html file in any other case
console.log(path.join(__dirname, "../client/build/index.html"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  console.error("----- An error happened -----");
  console.error(err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(err.status || 500);

    // A limited amount of information sent in production
    if (process.env.NODE_ENV === "production") res.json(err);
    else
      res.json(
        JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)))
      );
  }
});

module.exports = app;
