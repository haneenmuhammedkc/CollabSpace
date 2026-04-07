import dotenv from 'dotenv'
dotenv.config()

import http from 'http'
import cors from 'cors'
import express from 'express'
import { Server } from 'socket.io'

import connectDB from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import postRoutes from "./routes/postRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
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
app.use("/projects", projectRoutes)
app.use("/posts", postRoutes)
app.use("/comments", commentRoutes)
app.use("/communities", communityRoutes)
app.use("/notifications", notificationRoutes)

io.on("connection", (socket) => {

  // Join personal room
  socket.on("join", (userId) => {
    socket.join(userId)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})

const Port = process.env.PORT

server.listen(Port, ()=>{
    console.log("Server is Running")
})