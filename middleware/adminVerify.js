const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req, res, next) {
  // Get role 
  const token = req.header("token");

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
 
    const verify = jwt.verify(token, process.env.SECRET);
    console.log(verify);
    if(verify.user.role === true){
        next();
    }
    else {
    res.status(401).json({ msg: "You dont have access!" });
  }
};