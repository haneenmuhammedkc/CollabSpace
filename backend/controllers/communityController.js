import communityModel from "../models/Community.js"
import userModel from "../models/User.js"

export const getAllCommunities = async (req, res) => {
  try {
    const communities = await communityModel.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
    res.status(200).json(communities)
  }
  catch(error){
  console.error(error)
  res.status(500).json({ message: error.message })
}
}

export const getSingleCommunity = async (req, res) => {
  try {
    const { id } = req.params
    const community = await communityModel.findById(id)
      .populate("members", "name")

    if(!community){
      return res.status(404).json({ message: "Community not found" })
    }
    res.status(200).json(community)
  }
  catch(error){
  console.error(error)
  res.status(500).json({ message: error.message })
}
}

export const createCommunity = async (req, res) => {
  try {
    const { name, description, category } = req.body
    const newCommunity = await communityModel.create({ name, description, category, createdBy: req.user._id,
        members: [req.user._id] })
    res.status(201).json(newCommunity)
  }
  catch(error){
  console.error(error)
  res.status(500).json({ message: error.message })
}
}

export const joinCommunity = async (req, res) => {
  try{
    const { id } = req.params
    const community = await communityModel.findById(id)
    if(!community){
      return res.status(404).json({ message: "Community not found" })
    }

    if (!community.members.includes(req.user._id)){
      community.members.push(req.user._id)
      await community.save()
    }

    res.status(200).json({ message: "Joined community" })
  }
  catch(error){
  console.error(error)
  res.status(500).json({ message: error.message })
}
}

export const leaveCommunity = async (req, res) => {
  try {
    const { id } = req.params
    const community = await communityModel.findById(id)
    if(!community){
      return res.status(404).json({ message: "Community not found" })
    }

    community.members = community.members.filter(
      (m) => m.toString() !== req.user._id.toString()
    )
    await community.save()
    res.json({ message: "Left community" })
  }
  catch(error){
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}