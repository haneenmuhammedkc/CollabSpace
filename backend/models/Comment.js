import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  text: String

}, { timestamps: true })

const commentModel = mongoose.model("Comment", commentSchema)

export default commentModel