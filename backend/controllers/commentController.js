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
    io.emit("new_comment", populatedComment);

    io.emit("test_event", { message: "hello" });

    // 2️⃣ Get post to find owner
    const post = await postModel.findById(postId);

    // 3️⃣ Avoid notifying yourself
    if (post.author.toString() !== req.user._id.toString()) {
      const notification = await notificationModel.create({
        recipient: post.author,
        sender: req.user._id,
        type: "comment",
        post: post._id,
        message: "commented on your post",
      });

      // 4️⃣ 🔥 Real-time emit
      const recipientId = post.author._id
        ? post.author._id.toString()
        : post.author.toString();

      io.to(recipientId).emit("new_notification", notification);
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