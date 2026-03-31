import commentModel from "../models/Comment.js"

export const addComment = async (req, res) => {
  try{
    const { postId, text } = req.body
    const newComment = await Comment.create({ post: postId, author: req.user._id, text })
    res.status(201).json(newComment)
  }
  catch(error){
    res.status(500).json({ message: error.message })
  }
}

export const getCommentsByPost = async (req, res) => {
  try{
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "name")
      .sort({ createdAt: -1 })
    res.json(comments)
  }
  catch(error){
    res.status(500).json({ message: error.message })
  }
}