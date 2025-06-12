const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./db/config");

const authRouter = require("./routes/auth.route");
const movieRouter = require("./routes/movie.route");
const tvRouter = require("./routes/tv.route");
const searchRouter = require("./routes/search.route");

const { protectRoute } = require("./middlewares/protectRoute");

const path = require("path");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movie", protectRoute, movieRouter);
app.use("/api/v1/tv", protectRoute, tvRouter);
app.use("/api/v1/search", protectRoute, searchRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
