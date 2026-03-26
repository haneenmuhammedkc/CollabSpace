import jwt from "jsonwebtoken"
import userModel from "../models/User.js"

// AUTHENTICATION (Protect routes)
export const authMiddleware = async (req, res, next) => {
  try{
    let token

    // Check for Bearer token
    if(req.headers.authorization?.startsWith("Bearer")){
      token = req.headers.authorization.split(" ")[1]
    }

    // No token
    if(!token){ return res.status(401).json({ success: false, message: "Not authorized, no token" })}

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Check if user still exists
    const user = await userModel.findById(decoded.id).select("-password")
    if(!user){ return res.status(401).json({ success: false, message: "User not found" })}

    // Attach user to request
    req.user = user
    next()

  }
  catch(error){
    console.log("Auth Middleware Error:", error)
    return res.status(401).json({ success: false, message: error.name === "TokenExpiredError"
        ? "Token expired"
        : "Invalid token"
    })
  }
}

// AUTHORIZATION (Role-based access)
export const authorize = (...roles) => {
  return (req, res, next) => {

    // Check if user exists and role matches
    if(!req.user || !roles.includes(req.user.role)){
      return res.status(403).json({ success: false, message: "Forbidden: You don't have permission" })
    }

    next()
  }
}