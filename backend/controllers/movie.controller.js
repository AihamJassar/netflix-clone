const { fetchFromTMDB } = require("../services/tmdb.service");

exports.getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );

    const randomTrendingMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({ success: true, results: randomTrendingMovie });
  } catch (error) {
    console.error(`Error in get trending movie controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getMovieTrailers = async (req, res) => {
  try {
    const { movie_id } = req.params;
    if (!movie_id) {
      return res
        .status(400)
        .json({ success: false, message: "Movie ID is required" });
    }

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`
    );

    res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.error(`Error in get movie trailers controller: ${error.message}`);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getMovieDetails = async (req, res) => {
  try {
    const { movie_id } = req.params;
    if (!movie_id)
      return res
        .status(400)
        .json({ success: false, message: '"Movie ID is required' });

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`
    );

    res.status(200).json({ success: true, results: data });
  } catch (error) {
    console.error(`Error in get movie details: ${error.message}`);
    if (error.message.includes("404")) res.status(404).send(null);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getSimilarMovies = async (req, res) => {
  try {
    const { movie_id } = req.params;
    if (!movie_id)
      return res
        .status(400)
        .json({ success: false, message: "Movie ID is required" });

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${movie_id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.error(`Error in get similar movies: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category)
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.error(`Error in get movies by category: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
