var express = require("express");
var router = express.Router();
const FavItem = require("../modals/Favourite");
const auth = require("../middleware/authMiddleware");
//@create post api
//@desc create addatofav

router.post("/add", auth, async (req, res) => {
  console.log("add to fav");
  const favitem = {
    productname: req.body.productname,
    price: req.body.price,
    productid: req.body.productid,
    userId: req.user.id,
    image: req.body.image,
  };
  console.log(req.user);
  const curFavItem = await FavItem.findOne({
    productid: favitem.productid,
    userId: favitem.userId,
  });
  console.log(curFavItem);
  let newCreateditem = null;
  if (req.body.isFav) {
    console.log(" add fav");
    //add to favorites. ignore if already added
    if (!curFavItem) {
      console.log("no added");
      newCreateditem = await FavItem.create(favitem);
    }
  } else {
    console.log("remove fav");
    //remove from favorites . ignore if not added to favorites
    if (curFavItem) {
      console.log("already available deleted");
      await FavItem.deleteOne(favitem);
    }
  }
  res.status(201).json({
    success: true,
    data: newCreateditem,
  });
});

//@desc get all Category
//@access public
router.post("/favItem", auth, async (req, res) => {
  var allFavitems = await FavItem.find({
    userId: req.user.id,
  });
  res.status(201).json({
    success: true,
    allFavitems,
  });
});

router.get("/isFavorite/:id", auth, async (req, res) => {
  console.log("is fav api");
  const id = req.params.id;
  console.log(id);
  try {
    var favItem = await FavItem.findOne({ productid: id, userId: req.user.id });
    console.log(favItem);
    var isFav = false;
    if (favItem) {
      isFav = true;
    }
    console.log("is fav ", isFav);
    return res.status(200).json({
      success: true,
      isFav: isFav,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
    });
  }
});
router.delete("/favItem/:id", auth, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    FavItem.deleteOne({ _id: id }).then((data) => {
      res.json(data);
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
