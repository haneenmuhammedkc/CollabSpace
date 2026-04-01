import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import connectDB from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import postRoutes from "./routes/postRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import communityRoutes from "./routes/communityRoutes.js"


connectDB()
const app = express()

app.use(express.json())
app.use(cors())

app.use("/users", userRoutes)

app.use("/api/projects", projectRoutes)
app.use("/posts", postRoutes)
app.use("/comments", commentRoutes)
app.use("/communities", communityRoutes)


const Port = process.env.PORT

app.listen(Port, ()=>{
    console.log("Server is Running")
})