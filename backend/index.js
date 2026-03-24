import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import connectDB from './config/database.js'

connectDB()
const app = express()

app.use(express.json())
app.use(cors())

const Port = process.env.PORT

app.listen(Port, ()=>{
    console.log("Server is Running")
})