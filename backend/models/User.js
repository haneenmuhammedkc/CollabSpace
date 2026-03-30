import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    about: { type: String, default: "" },
    avatar: { type: String, default: "" },
    cover: { type: String, default: "" },
    skills: [{ type: String }],
    github: String,
    website: String,
    linkedin: String,
    createdProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    joinedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const userModel = mongoose.model("user", userSchema)

export default userModel