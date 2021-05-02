const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var CartItemSchema = new Schema({
  productname: {
    type: String,
    required: true,
    trim: true,
  },
  productid: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
const CartItem = mongoose.model("CartItem", CartItemSchema);
module.exports = CartItem;
