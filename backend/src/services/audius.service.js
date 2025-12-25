const axios = require("axios");

const DISCOVERY_NODES = [
  "https://discoveryprovider.audius.co",
  "https://audius-discovery-1.cultur3stake.com",
  "https://audius-discovery-2.cultur3stake.com",
];

function getNode() {
  return DISCOVERY_NODES[Math.floor(Math.random() * DISCOVERY_NODES.length)];
}

function normalize(track) {
  const base = getNode();

  return {
    id: track.id,
    title: track.title,
    artist: track.user?.name || "Unknown",
    cover:
      track.artwork?.["480x480"] ||
      track.artwork?.["150x150"] ||
      null,
    duration: Math.floor(track.duration),
    source: "audius",
    stream: {
      type: "audio",
      url: `${base}/v1/tracks/${track.id}/stream`,
    },
  };
}

async function search(query, limit = 20) {
  const base = getNode();
  const res = await axios.get(`${base}/v1/tracks/search`, {
    params: { query, limit },
  });
  return res.data.data.map(normalize);
}

async function trending(limit = 20) {
  const base = getNode();
  const res = await axios.get(`${base}/v1/tracks/trending`, {
    params: { limit, time: "week" },
  });
  return res.data.data.map(normalize);
}

module.exports = { search, trending };
