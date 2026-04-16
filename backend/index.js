import dotenv from 'dotenv'
dotenv.config()

import http from 'http'
import cors from 'cors'
import express from 'express'
import { Server } from 'socket.io'

import connectDB from './config/database.js'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from "./routes/chatRoutes.js"
import projectRoutes from './routes/projectRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import messageRoutes from "./routes/messageRoutes.js"
import communityRoutes from "./routes/communityRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js"

connectDB()
const app = express()

const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

app.use(express.json())
app.use(cors())

app.use("/users", userRoutes)
app.use("/posts", postRoutes)
app.use("/chat", chatRoutes)
app.use("/comments", commentRoutes)
app.use("/projects", projectRoutes)
app.use("/message", messageRoutes)
app.use("/communities", communityRoutes)
app.use("/notifications", notificationRoutes)

io.on("connection", (socket) => {

  // Join personal room
  socket.on("join", (userId) => {
    socket.join(userId)
  })

  // ✅ Join chat room
  socket.on("join_chat", (chatId) => {
    socket.join(chatId)
  })

  // ✅ Send message
  socket.on("send_message", (message) => {
    io.to(message.chat).emit("receive_message", message)
  })

  // Typing start
  socket.on("typing", ({ chatId, user }) => {
    socket.to(chatId).emit("typing", user)
  })

  // Typing stop
  socket.on("stop_typing", (chatId) => {
    socket.to(chatId).emit("stop_typing")
  })

  socket.on("join", (userId) => {
  socket.join(userId)
  console.log("🔥 User joined:", userId)
})

})

const Port = process.env.PORT

server.listen(Port, ()=>{
    console.log("Server is Running")
})