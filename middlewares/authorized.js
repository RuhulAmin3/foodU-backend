const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/envConfig");
const authorized = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;
    if (headerToken) {
      const token = headerToken.split(" ")[1];
      const verifiedToken = jwt.verify(token, JWT_SECRET);
      if (verifiedToken) {
        const { fullname, id } = verifiedToken;
        req.fullname = fullname;
        req.userId = id;
        next();
      } else {
        return res.status(400).json("Please add a valid token");
      }
    } else {
      return res.status(400).json({ msg: "Unauthorized User" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};

module.exports = authorized;
