const express = require("express");
const app = express();
const port = process.env.port || 5000;
var login = require("./Routers/auth");
var product = require("./Routers/product");
var category = require("./Routers/category");
var review = require("./Routers/review");
var cartItem = require("./Routers/cartItemRouter");
var FavItem = require("./Routers/FavItem");
var banner = require("./Routers/banner");
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
    "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization,x-auth-token"
  );
  next();
});
app.use("/auth", login);
app.use("/product", product);
app.use("/category", category);
app.use("/review", review);
app.use("/cartItem", cartItem);
app.use("/favItem", FavItem);
app.use("/banner", banner);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
