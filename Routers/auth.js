var express = require("express");
var router = express.Router();
const auth = require("../middleware/authMiddleware");
const { body, validaResult } = require("express-validator");
const Users = require("../modals/authModal");
//const Users = require("../modals/authModal");
//const authMiddleware = require("../middleware/authMiddleware");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//login page route

router.post("/login", async (req, res) => {
  var password = req.body.password;
  var email = req.body.email;
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    // Check for existing user
    const user = await Users.findOne({ email });
    if (!user) throw Error("User does not exist");

    //compare password
    var ispassSame = await bcrypt.compare(password, user.password);
    console.log(ispassSame);
    if (!ispassSame) throw Error("Invalid credentials,password not matching");

    const token = jwt.sign({ id: user._id }, "yhgtgyghtghuyghhyhyhygrfgtyhgt", {
      expiresIn: 3600,
    });
    if (!token) throw Error("Couldnt sign the token");

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.firstname,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

//create register post api
router.post("/register", async (req, res) => {
  const userDetail = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    age: req.body.age,
    phone: req.body.phone,
    address: req.body.address,
    password: req.body.password,
    image: req.body.image,
  };
  // Simple validation
  if (!userDetail.firstname || !userDetail.lastname || !userDetail.email) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    //check user already exist or not
    Users.findOne({ email: userDetail.email }, async (err, data) => {
      if (err) {
        console.log("error");
      } else {
        if (data) {
          return res.json({
            success: false,
            message: "some error",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          var encryptedPass = await bcrypt.hash(userDetail.password, salt);
          userDetail.password = encryptedPass;
          Users.create(userDetail, function (err, data) {
            if (err) {
              return res.status(500).send("error");
            } else {
              const accessToken = jwt.sign(
                { id: userDetail._id },
                "yhgtgyghtghuyghhyhyhygrfgtyhgt"
              );
              res.json({
                accessToken: accessToken,
                user: {
                  firstname: userDetail.firstname,
                  lastname: userDetail.lastname,
                  email: userDetail.email,
                },
              });
            }
          });

          //crete jwt token
        }
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

//get users
router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    if (!users) throw Error("No users exist");
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route get api/user
// @desc update user data
// access public
router.post("/profile", auth, async (req, res) => {
  const id = req.user.id;
  console.log(id);
  try {
    Users.findByIdAndUpdate(
      id,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        phone: req.body.phone,
        address: req.body.address,
        image: req.body.image,
      },
      function (err, data) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        } else {
          console.log(data);
          return res.send(data);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

// @route get api/user
// @desc get user data
// @access private

router.get("/user", auth, (req, res) => {
  Users.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});
module.exports = router;
