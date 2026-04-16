import messageModel from "../models/Message.js"
import chatModel from "../models/Chat.js"

// ✅ Send Message
export const sendMessage = async (req, res) => {
  try {
    const { chatId, content, image, file } = req.body
    const userId = req.user._id

    if (!chatId) {
      return res.status(400).json({ message: "chatId required" })
    }

    if (!content && !image && !file) {
      return res.status(400).json({ message: "Message cannot be empty" })
    }

    const message = await messageModel.create({
      chat: chatId,
      sender: userId,
      content,
      image,
      file,
      readBy: [userId],
    })

    // 🔄 Update last message
    await chatModel.findByIdAndUpdate(chatId, {
      lastMessage: message._id,
    })

    const populatedMessage = await messageModel.findById(message._id)
      .populate("sender", "name avatar")

    res.json(populatedMessage)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ✅ Get Messages for a chat
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params

    const messages = await messageModel.find({ chat: chatId })
      .populate("sender", "name avatar")
      .sort({ createdAt: 1 })

    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ✅ Mark message as read
export const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.body
    const userId = req.user._id

    await messageModel.findByIdAndUpdate(messageId, {
      $addToSet: { readBy: userId },
    })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}