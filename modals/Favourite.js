const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var FavouriteItemSchema = new Schema({
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
const FavItem = mongoose.model("FavItem", FavouriteItemSchema);
module.exports = FavItem;
