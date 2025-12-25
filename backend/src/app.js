const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");
const roomRoutes = require("./routes/room.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("StreamX API is running");
});


app.use("/api/rooms", roomRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

module.exports = app;

