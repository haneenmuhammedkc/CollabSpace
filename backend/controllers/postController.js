import postModel from "../models/Post.js"

export const getPostsByCommunity = async (req, res) => {
  try {
    const posts = await postModel.find({ community: req.params.communityId })
      .populate("author", "name")
      .sort({ createdAt: -1 })
    res.json(posts)
  }
  catch(error){
    res.status(500).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  try {
    const { communityId, title, content } = req.body

    const post = await postModel.create({ community: communityId, author: req.user._id, title, content })
    res.status(201).json(post)
  }
  catch(error){
    res.status(500).json({ message: error.message })
  }
}

export const toggleLikePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.postId)

    if(!post){
      return res.status(404).json({ message: "Post not found" })
    }

    const alreadyLiked = post.likes.includes(req.user._id)
    if(alreadyLiked){
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      )
    }
    else{
      post.likes.push(req.user._id)
    }

    await post.save()

    res.json({ message: alreadyLiked ? "Unliked" : "Liked" })
  }
  catch(error){
    res.status(500).json({ message: error.message })
  }
}