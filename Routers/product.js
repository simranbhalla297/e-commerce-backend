var express = require("express");
var router = express.Router();
const Product = require("../modals/product");
const auth = require("../middleware/authMiddleware");
//create new product
//@route post api
//@desc post product
//@access private
router.post("/product", async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//@desc get all products
//@access public
router.post("/products", async (req, res) => {
  var filter = {};
  var sortObj = { [req.body.sortBy]: -1 }; //-1= descending
  console.log(sortObj);
  if (req.body.categoryId) {
    filter.categoryId = req.body.categoryId;
  }
  console.log(req.body);
  console.log(filter);
  try {
    const products = await Product.find(filter).sort(sortObj);
    res.status(201).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send("error ");
  }
});
//get product by id
router.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//product update by id
router.post("/product/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    Product.findByIdAndUpdate(id, req.body, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        console.log(data);
        return res.send(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//delete product
//@route delete api/product/:id
//@desc delete product
//@access private
router.delete("/product/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    Product.deleteOne({ _id: id }).then((data) => {
      res.json(data);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
