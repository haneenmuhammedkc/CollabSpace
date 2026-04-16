import notificationModel from "../models/Notification.js"

// 📥 Get all notifications for logged-in user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel
      .find({ recipient: req.user._id })
      .populate("sender", "name avatar")
      .populate("post", "_id community")
.populate("comment", "_id")
      .sort({ createdAt: -1 })

    res.status(200).json(notifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// 🔴 Get unread notification count
export const getUnreadCount = async (req, res) => {
  try {
    const count = await notificationModel.countDocuments({
      recipient: req.user._id,
      read: false
    })

    res.status(200).json({ count })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// ✅ Mark single notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await notificationModel.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    )

    res.status(200).json(notification)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// ✅ Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    await notificationModel.updateMany(
      { recipient: req.user._id, read: false },
      { read: true }
    )

    res.status(200).json({ message: "All notifications marked as read" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// 🧹 Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    await notificationModel.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: "Notification deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}