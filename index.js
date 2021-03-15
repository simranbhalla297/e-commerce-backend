const express = require("express");
const app = express();
const port = process.env.port || 5000;
var login = require("./Routers/auth");
var product = require("./Routers/product");
var category = require("./Routers/category");
var review = require("./Routers/review");
const bodyparser = require("body-parser");
require("./src/app.js");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.all("*", (req, res, next) => {
  // CORS headers
  //use * to allow all or can set http://localhost:4200 for testing
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization"
  );
  next();
});
app.use("/auth", login);
app.use("/product", product);
app.use("/category", category);
app.use("/review", review);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
