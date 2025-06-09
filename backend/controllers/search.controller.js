const User = require("../models/user.model");
const { fetchFromTMDB } = require("../services/tmdb.service");

exports.searchPerson = async (req, res) => {
  try {
    const { query } = req.params;
    if (!query)
      return res
        .status(400)
        .json({ success: false, message: "Person name is required" });

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) return res.status(404).send(null);

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: "Person",
          createAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.error(`Error in search person controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.searchMovie = async (req, res) => {
  try {
    const { query } = req.params;
    if (!query)
      return res
        .status(400)
        .json({ success: false, message: "Movie name is required" });

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) return res.status(404).send(null);

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "Movie",
          createAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.error(`Error in search movie controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.searchTV = async (req, res) => {
  try {
    const { query } = req.params;
    if (!query)
      return res
        .status(400)
        .json({ success: false, message: "TV show name is required" });

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) return res.status(404).send(null);

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchType: "TV show",
          createAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.error(`Error in search tv controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ results: req.user.searchHistory });
  } catch (error) {
    console.error(`Error in get search history controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.removeItemFromSearchHistory = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Item id required" });

    id = parseInt(id);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { searchHistory: { id } },
    });

    res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error(
      `Error in remove item from search history controller: ${error.message}`
    );
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
