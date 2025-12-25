const axios = require("axios");


const DISCOVERY_NODES = [
  "https://discoveryprovider.audius.co",
  "https://audius-discovery-1.cultur3stake.com",
  "https://audius-discovery-2.cultur3stake.com",
];


function getDiscoveryNode() {
  return DISCOVERY_NODES[Math.floor(Math.random() * DISCOVERY_NODES.length)];
}

// normalize Audius track 
function normalizeTrack(track) {
  return {
    id: track.id,
    title: track.title,
    artist: track.user?.name || "Unknown Artist",
    audioUrl: `${getDiscoveryNode()}/v1/tracks/${track.id}/stream`,
    duration: Math.floor(track.duration),
    cover:
      track.artwork?.["480x480"] ||
      track.artwork?.["150x150"] ||
      null,
  };
}


// Get trending tracks

async function getTrendingTracks(limit = 20) {
  try {
    const baseUrl = getDiscoveryNode();

    const response = await axios.get(
      `${baseUrl}/v1/tracks/trending`,
      {
        params: {
          limit,
          time: "week",
        },
      }
    );

    return response.data.data.map(normalizeTrack);
  } catch (error) {
    console.error("Audius trending error:", error.message);
    return [];
  }
}


//  Search tracks by query

async function searchTracks(query, limit = 20) {
  try {
    const baseUrl = getDiscoveryNode();

    const response = await axios.get(
      `${baseUrl}/v1/tracks/search`,
      {
        params: {
          query,
          limit,
        },
      }
    );

    return response.data.data.map(normalizeTrack);
  } catch (error) {
    console.error("Audius search error:", error.message);
    return [];
  }
}


//  * Simple recommendations (Phase-1)
//  * Currently returns trending tracks shuffled

async function getRecommendations(limit = 20) {
  const tracks = await getTrendingTracks(limit * 2);

  // shuffle tracks
  const shuffled = tracks.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, limit);
}

module.exports = {
  getTrendingTracks,
  searchTracks,
  getRecommendations,
};
