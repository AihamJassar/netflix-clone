const express = require("express");
const {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
} = require("../controllers/movie.controller");

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:movie_id/trailers", getMovieTrailers);
router.get("/:movie_id/details", getMovieDetails);
router.get("/:movie_id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);

module.exports = router;
