const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  const token = req.header("x-auth-token");

  //check for token
  if (!token) {
    res.status(401).json({ msg: "no token,authorization denied" });
  }

  try {
    //verify token
    const decoded = jwt.verify(token, "yhgtgyghtghuyghhyhyhygrfgtyhgt");

    //add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "token is not valid" });
  }
}

module.exports = authMiddleware;
