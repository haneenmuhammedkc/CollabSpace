import userModel from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body

        // Checks if user is existing 
        const userExists = await userModel.findOne({ email })
        if(userExists){
            res.status(400).json({ message: "User already exist" })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({ name, email, password: hashedPassword })
        res.status(200).json({ message: "User is created", newUser })
    }
    catch(error){
        console.log("There has been a error in register user controller:", error)
    }
}

export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body

        // Checks if user is existing
        const user = await userModel.findOne({ email })
        if(!user){
            return res.status(400).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        console.log("JWT SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        
        res.status(200).json({ message: "Login Successfull", token, user })
    }
    catch(error){
        console.log("🔥 LOGIN ERROR FULL:", error)
        res.status(500).json({ message: "Server error" })
    }
}