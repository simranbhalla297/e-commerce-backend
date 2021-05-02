var express = require("express");
var router = express.Router();
const CartItem = require("../modals/CartItem");
const auth = require("../middleware/authMiddleware");
router.post("/cartItem", auth, async (req, res) => {
  const item = {
    productname: req.body.productname,
    quantity: req.body.quantity,
    price: req.body.price,
    userId: req.user.id,
    productid: req.body.productid,
    image: req.body.image,
  };
  console.log(req.user.id);
  var alreadyExist = await CartItem.findOne({
    userId: req.user.id,
    productid: item.productid,
  });
  if (!alreadyExist) {
    const itemsinCart = await CartItem.create(item);
    res.status(201).json({
      success: true,
      data: itemsinCart,
    });
  } else {
    res.status(201).json({
      success: true,
      data: alreadyExist,
    });
    console.log("product already exist");
  }
});

//get all items in cart
router.post("/cartItems", auth, async (req, res) => {
  console.log(req.user.id);
  var cartitems = await CartItem.find({
    userId: req.user.id,
  });
  res.status(201).json({
    success: true,
    cartitems,
  });
});

//update quantity

// @route get api/user
// @desc update user data
// access public
router.post("/qtychange/:id", auth, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    CartItem.findByIdAndUpdate(id, req.body, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        console.log(data);
        return res.send(data);
      }
    });
  } catch (e) {
    console.log(e);
  }
});

router.get("/cartItem/:id", auth, async (req, res) => {
  const cart = await CartItem.findById(req.params.id);
  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "item not found",
    });
  }

  res.status(200).json({
    success: true,
    cart,
  });
});

//delete api

router.get("/cartItems/:id", auth, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    CartItem.deleteOne({ _id: id }).then((data) => {
      res.json(data);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
