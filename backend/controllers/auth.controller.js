const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const { generateTokenAndSetCookie } = require("../utils/generateToken");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ success: false, message: "Invalid email" });

    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });

    let user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username is already taken" });

    user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Email is already taken" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);

    res
      .status(201)
      .json({ success: true, user: { ...newUser._doc, password: "" } });
  } catch (error) {
    console.error(`Error in signup controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res
        .status(400)
        .json({ success: false, message: "email or password incorrect" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ success: false, message: "email or password incorrect" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "email or password incorrect" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "email or password incorrect" });

    generateTokenAndSetCookie(user.id, res);

    const userObj = user.toObject();
    delete userObj.password;
    res.status(200).json({ success: true, user: userObj });
  } catch (error) {
    console.error(`Error in login controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error(`Error in logout controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(`Error in get me controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
