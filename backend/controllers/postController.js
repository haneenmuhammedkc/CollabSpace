import postModel from "../models/Post.js"
import notificationModel from "../models/Notification.js"
import commentModel from "../models/Comment.js"
import { io } from "../index.js"

export const getPostsByCommunity = async (req, res) => {
  try {
    const posts = await postModel.find({ community: req.params.communityId })
      .populate("author", "name avatar role about")
      .sort({ createdAt: -1 })

      const postsWithCount = await Promise.all(
      posts.map(async (post) => {
        const count = await commentModel.countDocuments({
          post: post._id
        })

        return {
          ...post.toObject(),
          commentsCount: count
        }
      })
    )

    res.json(postsWithCount)
  }
  catch(error){
    res.status(500).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  try {
    const { communityId, title, content, image, link, code } = req.body

    const post = await postModel.create({ community: communityId, author: req.user._id, title, content, 
      images: image ? [image] : [], links: link ? [link] : [], codeSnippet: code || "" })
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

    const alreadyLiked = post.likes.some(
  (id) => id.toString() === req.user._id.toString()
)
    if(alreadyLiked){
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      )
    }
    else{
      post.likes.push(req.user._id)
    }
    if (!alreadyLiked && post.author.toString() !== req.user._id.toString()) {
  await notificationModel.create({
    recipient: post.author,
    sender: req.user._id,
    type: "like",
    post: post._id,
    message: "Someone liked your post"
  })
}

    await post.save()

    io.emit("update_like", {
  postId: post._id,
  likes: post.likes
})

    const updatedPost = await postModel.findById(post._id)
    .populate("author", "name avatar role about")

  res.json(updatedPost)
  }
  catch(error){
    res.status(500).json({ message: error.message })
  }
}

export const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id).populate("community")

    if (!post) return res.status(404).json({ message: "Post not found" })

    const isAuthor = post.author.toString() === req.user._id.toString()
    const isCreator = post.community.createdBy.toString() === req.user._id.toString()

    if (!isAuthor && !isCreator) {
      return res.status(403).json({ message: "Not allowed" })
    }

    await post.deleteOne()

    res.json({ message: "Post deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}