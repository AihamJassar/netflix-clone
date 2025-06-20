const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protectRoute = async (req, res, next) => {
  try {
    const token = await req.cookies["jwt-netflix"];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error(`Error in protect route middleware: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
