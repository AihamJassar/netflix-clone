const express = require("express");
const {
  getTrendingTV,
  getTVTrailers,
  getTVDetails,
  getSimilarTVs,
  getTVsByCategory,
} = require("../controllers/tv.controller");

const router = express.Router();

router.get("/trending", getTrendingTV);
router.get("/:tv_id/trailers", getTVTrailers);
router.get("/:tv_id/details", getTVDetails);
router.get("/:tv_id/similar", getSimilarTVs);
router.get("/:category", getTVsByCategory);

module.exports = router;
