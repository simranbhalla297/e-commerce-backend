const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var BannerImageSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
const Banner = mongoose.model("Banner", BannerImageSchema);
module.exports = Banner;
