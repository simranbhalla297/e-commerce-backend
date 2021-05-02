var express = require("express");
var router = express.Router();
const Banner = require("../modals/bannerModal");
//create new bannerlist

router.post("/productbanner", async (req, res) => {
  const banner = await Banner.create(req.body);
  res.status(201).json({
    success: true,
    data: banner,
  });
});
//get all reviews
router.get("/productbanner", async (req, res) => {
  const allBannerImages = await Banner.find();
  res.status(201).json({
    success: true,
    data: allBannerImages,
  });
});

module.exports = router;
