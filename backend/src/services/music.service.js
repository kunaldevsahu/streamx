const audius = require("./audius.service");
const youtube = require("./youtube.service");

async function searchMusic({ query, source = "audius", limit = 20 }) {
  if (source === "youtube") {
    return youtube.search(query, limit);
  }

  // default: audius
  return audius.search(query, limit);
}

async function getTrendingMusic({ source = "audius", limit = 20 }) {
  if (source === "youtube") {
    return []; // YouTube trending later if needed
  }

  return audius.trending(limit);
}

module.exports = {
  searchMusic,
  getTrendingMusic,
};
