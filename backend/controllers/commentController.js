import commentModel from "../models/Comment.js";
import postModel from "../models/Post.js";
import notificationModel from "../models/Notification.js";
import { io } from "../index.js";

export const addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    // 1️⃣ Create comment
    const newComment = await commentModel.create({
      post: postId,
      author: req.user._id,
      text,
    });
    const populatedComment = await newComment.populate("author", "name");

    // 🔥 REAL-TIME COMMENT
    io.emit("new_comment", populatedComment)

    // ✅ SEND REAL COMMENT COUNT
    const comments = await commentModel.find({ post: postId })

    io.emit("update_comment_count", {
      postId,
      commentsCount: comments.length
    })

    // 2️⃣ Get post to find owner
    const post = await postModel.findById(postId);

    // 3️⃣ Avoid notifying yourself
    if(post.author.toString() !== req.user._id.toString()){
      // Get sender details
      const senderUser = await commentModel
        .findById(newComment._id)
        .populate("author", "name")

      const notification = await notificationModel.create({
        recipient: post.author,
        sender: req.user._id,
        type: "comment",
        post: post._id,
        community: post.community, 
        comment: newComment._id,
        message: `${senderUser.author.name} commented on your post`,
      })

      // 🔥 IMPORTANT: populate sender before emitting
      const populatedNotification = await notification.populate(
        "sender",
        "name avatar"
      )

      const recipientId = post.author.toString()

      io.to(recipientId).emit("new_notification", populatedNotification)
    }

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await commentModel
      .find({ post: req.params.postId })
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}