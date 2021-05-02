var express = require("express");
var router = express.Router();
const Review = require("../modals/reviewModal");
const auth = require("../middleware/authMiddleware");
router.post("/review", auth, async (req, res) => {
  const review = {
    name: req.body.name,
    rating: req.body.rating,
    comment: req.body.comment,
    userId: req.user.id,
    productId: req.body.productId,
  };
  console.log(req.user);
  const reviews = await Review.create(review);
  res.status(201).json({
    success: true,
    reviews,
  });
});

//get all reviews
router.post("/reviews", async (req, res) => {
  var filter = {
    productId: req.body.productId,
  };

  console.log(filter);
  const review = await Review.find(filter);
  if (!review) {
    return res.status(404).json({
      success: false,
      message: "no review",
    });
  }

  res.status(200).json({
    success: true,
    review,
  });
});
module.exports = router;
