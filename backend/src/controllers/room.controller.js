const Room = require("../models/Room.model");

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

// CREATE ROOM
exports.createRoom = async (req, res) => {
  try {
    const roomCode = generateRoomCode();

    const room = await Room.create({
      roomCode,
      host: req.user.id,
    });

    res.status(201).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// JOIN ROOM
exports.joinRoom = async (req, res) => {
  try {
    const { roomCode } = req.params;

    const room = await Room.findOne({ roomCode });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
