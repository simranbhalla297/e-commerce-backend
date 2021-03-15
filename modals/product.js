const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
    maxLength: [100, "product name can not  exceed 100 characters "],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    default: 0.0,
    maxLength: [5, "product price can not be exceed 5 "],
  },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    trim: true,
  },
  categoryId: {
    type: String,
    required: true,
    trim: true,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
