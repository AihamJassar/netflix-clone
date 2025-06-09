const express = require("express");

const {
  searchPerson,
  searchMovie,
  searchTV,
  getSearchHistory,
  removeItemFromSearchHistory,
} = require("../controllers/search.controller");

const router = express.Router();

router.get("/person/:query", searchPerson);

router.get("/movie/:query", searchMovie);

router.get("/tv/:query", searchTV);

router.get("/history", getSearchHistory);

router.delete("/history/:id", removeItemFromSearchHistory);

module.exports = router;
