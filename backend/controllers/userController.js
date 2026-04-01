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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        
        res.status(200).json({ message: "Login Successfull", token, user })
    }
    catch(error){
        console.log("LOGIN ERROR FULL:", error)
        res.status(500).json({ message: "Server error" })
    }
}

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id
    const { name, username, about, skills, github, website, linkedin, avatar, cover } = req.body
    const user = await userModel.findById(userId)

    if(!user){
      return res.status(404).json({ message: "User not found" })
    }

    if(name && name.trim().length === 0){
      return res.status(400).json({ message: "Name cannot be empty" })
    }

    if(skills && !Array.isArray(skills)){
      return res.status(400).json({ message: "Skills must be an array" })
    }

    if (name) user.name = name.trim()
    if (about !== undefined) user.about = about.trim()
    if (skills) user.skills = skills
    if (github !== undefined) user.github = github.trim()
    if (website !== undefined) user.website = website.trim()
    if (linkedin !== undefined) user.linkedin = linkedin.trim()
    if (avatar !== undefined) user.avatar = avatar
    if (cover !== undefined) user.cover = cover
    await user.save()

    const updatedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      about: user.about,
      skills: user.skills,
      role: user.role,
      github: user.github,
      website: user.website,
      linkedin: user.linkedin,
      avatar: user.avatar,
      cover: user.cover
    }
    res.status(200).json(updatedUser)
  }
  catch(error){
    console.error("Update Profile Error:", error)
    res.status(500).json({ message: error.message })
  }
}