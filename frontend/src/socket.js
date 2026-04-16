import { io } from "socket.io-client"

const socket = io("http://localhost:5000", {
  autoConnect: false,   // 🔥 IMPORTANT
  reconnection: true
})

// 🔥 CONNECT FIRST, THEN JOIN
export const connectSocket = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user?._id) return

  socket.connect()

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id)

    socket.emit("join", user._id)
    console.log("✅ Joined room:", user._id)
  })
}

export default socket