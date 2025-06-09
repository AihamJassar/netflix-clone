const axios = require("axios");

// "https://api.themoviedb.org/3/person/popular?language=en-US&page=1"
exports.fetchFromTMDB = async (url) => {
  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    };

    const response = await axios.get(url, options);
    if (response.status !== 200)
      throw new Error(`Failed to fetch data from TMDB ${response.statusText}`);

    return response.data;
  } catch (error) {
    console.error(`Error in fetch movies service: ${error.message}`);
  }
};
