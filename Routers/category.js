var express = require("express");
var router = express.Router();
const Category = require("../modals/CategoryModal");

//@create post api
//@desc create category
//@acess private

router.post("/category", async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    success: true,
    category,
  });
});

//@desc get all Category
//@access public
router.get("/category", async (req, res) => {
  var allCategory = await Category.find();
  res.status(201).json({
    success: true,
    allCategory,
  });
});

module.exports = router;
