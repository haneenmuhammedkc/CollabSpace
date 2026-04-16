import mongoose from "mongoose"

const chatSchema = new mongoose.Schema(
  {
    contextType: { type: String, enum: ["community", "project"], required: true },
    contextId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "contextType" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isGroup: { type: Boolean, default: true },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }
  },
  { timestamps: true }
)

const chatModel = mongoose.model("Chat", chatSchema)

export default chatModel