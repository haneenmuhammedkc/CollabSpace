import mongoose from "mongoose"

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  banner: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
},
{ timestamps: true })

const communityModel = mongoose.model("Community", communitySchema)

export default communityModel