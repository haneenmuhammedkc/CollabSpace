import chatModel from "../models/Chat.js"
import communityModel from "../models/Community.js"
import projectModel from "../models/Project.js"

// ✅ Create or Get Chat (for community or project)
export const getOrCreateChat = async (req, res) => {
  try {
    const { contextType, contextId } = req.body
    const userId = req.user._id

    if (!["community", "project"].includes(contextType)) {
      return res.status(400).json({ message: "Invalid contextType" })
    }

    // 🔍 Check if chat exists
    let chat = await chatModel.findOne({ contextType, contextId })

    if (!chat) {
      let participants = []

      // 👇 Get members based on type
      if (contextType === "community") {
        const community = await communityModel.findById(contextId).select("members")
        if (!community) {
          return res.status(404).json({ message: "Community not found" })
        }
        participants = community.members
      }

      if (contextType === "project") {
        const project = await projectModel.findById(contextId).select("members")
        if (!project) {
          return res.status(404).json({ message: "Project not found" })
        }
        participants = project.members
      }

      // 🆕 Create chat
      chat = await chatModel.create({
        contextType,
        contextId,
        participants,
        isGroup: true,
      })
    }

    // Populate last message
    chat = await chatModel.findById(chat._id)
      .populate("lastMessage")
      .populate("participants", "name avatar")

    res.json(chat)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ✅ Get chats for logged-in user
export const getUserChats = async (req, res) => {
  try {
    const userId = req.user._id

    const chats = await Chat.find({
      participants: userId,
    })
      .populate("lastMessage")
      .populate("participants", "name avatar")
      .sort({ updatedAt: -1 })

    res.json(chats)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}