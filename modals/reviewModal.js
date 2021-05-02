const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
