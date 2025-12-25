const {
  searchMusic,
  getTrendingMusic,
} = require("../services/music.service");


async function trending(req, res) {
  try {
    const { source } = req.query;
    const limit = Number(req.query.limit) || 20;

    const data = await getTrendingMusic({ source, limit });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


async function search(req, res) {
  try {
    const { q, source } = req.query;
    const limit = Number(req.query.limit) || 20;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Query parameter 'q' is required",
      });
    }

    const data = await searchMusic({
      query: q,
      source,
      limit,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  trending,
  search,
};
