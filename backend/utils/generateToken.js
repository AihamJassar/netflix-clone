const jwt = require("jsonwebtoken");

exports.generateTokenAndSetCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res.cookie("jwt-netflix", token, {
      maxAge: 15 * 24 * 60 * 60,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
  } catch (error) {
    console.error(`Error in generate token ${error.messages}`);
  }
};
