const express = require("express");
const router = express.Router();
const {
  createRoom,
  joinRoom,
} = require("../controllers/room.controller");

const auth = require("../middleware/auth.middleware");

router.post("/create", auth, createRoom);
router.get("/join/:roomCode", auth, joinRoom);

module.exports = router;
