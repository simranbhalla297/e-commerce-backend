var express = require("express");
var router = express.Router();
const Review = require("../modals/reviewModal");
router.post("/review", async (req, res) => {
  const reviews = await Review.create(req.body);
  res.status(201).json({
    success: true,
    reviews,
  });
});
module.exports = router;
