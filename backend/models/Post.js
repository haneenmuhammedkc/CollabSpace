import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  content: String,
  images: [String],
  links: [String],
  codeSnippet: String,
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }],
  isPinned: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const postModel = mongoose.model("Post", postSchema)

export default postModel