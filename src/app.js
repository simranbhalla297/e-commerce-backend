const mongoose = require("mongoose");
//create connection
mongoose
  .connect("mongodb+srv://simran:simran0297@cluster0.l5biu.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));
