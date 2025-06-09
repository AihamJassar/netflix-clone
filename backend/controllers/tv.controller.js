const { fetchFromTMDB } = require("../services/tmdb.service");

exports.getTrendingTV = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );

    const randomTrendingTV =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({ success: true, results: randomTrendingTV });
  } catch (error) {
    console.error(`Error in get trending tv controller: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getTVTrailers = async (req, res) => {
  try {
    const { tv_id } = req.params;
    if (!tv_id) {
      return res
        .status(400)
        .json({ success: false, message: "TV ID is required" });
    }

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${tv_id}/videos?language=en-US`
    );

    res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.error(`Error in get tv trailers controller: ${error.message}`);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getTVDetails = async (req, res) => {
  try {
    const { tv_id } = req.params;
    if (!tv_id)
      return res
        .status(400)
        .json({ success: false, message: '"TV ID is required' });

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${tv_id}?language=en-US`
    );

    res.status(200).json({ success: true, results: data });
  } catch (error) {
    console.error(`Error in get tv details: ${error.message}`);
    if (error.message.includes("404")) res.status(404).send(null);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getSimilarTVs = async (req, res) => {
  try {
    const { tv_id } = req.params;
    if (!tv_id)
      return res
        .status(400)
        .json({ success: false, message: "TV ID is required" });

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${tv_id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.error(`Error in get similar tvs: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getTVsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category)
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.error(`Error in get tvs by category: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};