const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./db/config");

const authRouter = require("./routes/auth.route");
const movieRouter = require("./routes/movie.route");
const tvRouter = require("./routes/tv.route");
const searchRouter = require("./routes/search.route");

const { protectRoute } = require("./middlewares/protectRoute");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movie", protectRoute, movieRouter);
app.use("/api/v1/tv", protectRoute, tvRouter);
app.use("/api/v1/search", protectRoute, searchRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
