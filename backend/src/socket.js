const { Server } = require("socket.io");
const Room = require("./models/Room.model");

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*", // later restrict
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    // CHAT MESSAGE
    socket.on("CHAT_MESSAGE", ({ roomCode, message, user }) => {
      socket.to(roomCode).emit("RECEIVE_CHAT", {
        message,
        user,
        time: Date.now(),
      });
    });

    // JOIN ROOM
    socket.on("JOIN_ROOM", async ({ roomCode }) => {
      socket.join(roomCode);

      const room = await Room.findOne({ roomCode });
      if (room) {
        socket.emit("RECEIVE_STATE", {
          queue: room.queue,
          currentIndex: room.currentIndex,
          isPlaying: room.isPlaying,
        });
      }
    });

    // SYNC STATE (PLAY / PAUSE / NEXT / PREV)
    socket.on("SYNC_STATE", async ({ roomCode, state }) => {
      await Room.findOneAndUpdate(
        { roomCode },
        {
          queue: state.queue,
          currentIndex: state.currentIndex,
          isPlaying: state.isPlaying,
        }
      );

      socket.to(roomCode).emit("RECEIVE_STATE", state);
    });

    // SEEK SYNC
    socket.on("SEEK", ({ roomCode, time }) => {
      socket.to(roomCode).emit("RECEIVE_SEEK", { time });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}

module.exports = setupSocket;
