import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community"
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  title: String,
  content: String,

  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ]

}, { timestamps: true })

const postModel = mongoose.model("Post", postSchema)

export default postModel