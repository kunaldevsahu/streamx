const { Server } = require("socket.io");
const Room = require("./models/Room.model");

function setupSocket(server) {
  const roomUsers = {}; // { roomCode: [{ socketId, role }] }
  const roomState = {};

  const io = new Server(server, {
    cors: {
      origin: "*", // later restrict
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    socket.on("disconnect", () => {
      for (const roomCode in roomUsers) {
        roomUsers[roomCode] = roomUsers[roomCode].filter(
          (u) => u.socketId !== socket.id
        );

        io.to(roomCode).emit("PARTICIPANTS_UPDATE", roomUsers[roomCode]);
      }
    });
    // CHAT MESSAGE
    socket.on("CHAT_MESSAGE", ({ roomCode, message, user }) => {
      socket.to(roomCode).emit("RECEIVE_CHAT", {
        message,
        user,
        time: Date.now(),
      });
    });
    // EMOJI REACTION
    socket.on("EMOJI_REACT", ({ roomCode, emoji }) => {
      socket.to(roomCode).emit("RECEIVE_EMOJI", {
        emoji,
        time: Date.now(),
      });
    });

    // JOIN ROOM
    socket.on("JOIN_ROOM", ({ roomCode, role }) => {
      socket.join(roomCode);

      if (!roomUsers[roomCode]) {
        roomUsers[roomCode] = [];
      }

      roomUsers[roomCode].push({
        socketId: socket.id,
        role,
      });

      // send participants
      io.to(roomCode).emit("PARTICIPANTS_UPDATE", roomUsers[roomCode]);

      // send latest room state to rejoining user
      if (roomState[roomCode]) {
        socket.emit("RECEIVE_STATE", roomState[roomCode]);
      }
    });

    // SYNC STATE (PLAY / PAUSE / NEXT / PREV)
    socket.on("SYNC_STATE", ({ roomCode, state }) => {
      roomState[roomCode] = state;
      socket.to(roomCode).emit("RECEIVE_STATE", state);
    });

    // SEEK SYNC
    socket.on("SEEK", ({ roomCode, time }) => {
      socket.to(roomCode).emit("RECEIVE_SEEK", { time });
    });

    socket.on("disconnect", () => {
      for (const roomCode in roomUsers) {
        roomUsers[roomCode] = roomUsers[roomCode].filter(
          (u) => u.socketId !== socket.id
        );

        io.to(roomCode).emit("PARTICIPANTS_UPDATE", roomUsers[roomCode]);

        // clean empty rooms
        if (roomUsers[roomCode].length === 0) {
          delete roomUsers[roomCode];
          delete roomState[roomCode];
        }
      }
    });
  });
}

module.exports = setupSocket;
