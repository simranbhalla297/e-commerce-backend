const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create a schema for login page

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
    trim: true,
  },
});
//generate token

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
