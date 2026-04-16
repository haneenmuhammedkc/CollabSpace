import { useState, useEffect, useRef } from "react"
import axios from "axios"
import socket from "../socket"
import { useNavigate } from "react-router-dom"

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)
  const [unread, setUnread] = useState(0)

  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const dropdownRef = useRef()

  // 🔔 Bell Icon
  const BellIcon = ({ size = 22 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`transition duration-300 ${
        unread > 0
          ? "text-[#89A8B2] animate-pulse"
          : "text-slate-500 hover:text-[#89A8B2]"
      }`}
    >
      <path
        d="M12 3C9.5 3 7.5 5 7.5 7.5V10.2C7.5 11 7.2 11.8 6.7 12.4L5.8 13.5C5.2 14.2 5.6 15.3 6.6 15.3H17.4C18.4 15.3 18.8 14.2 18.2 13.5L17.3 12.4C16.8 11.8 16.5 11 16.5 10.2V7.5C16.5 5 14.5 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9.5 17C9.8 18.2 10.8 19 12 19C13.2 19 14.2 18.2 14.5 17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )

  // 📥 Fetch
  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await axios.get("http://localhost:5000/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      })

      setNotifications(res.data)
      setUnread(res.data.filter(n => !n.read).length)
    }

    fetchNotifications()
  }, [])

  // ⚡ Real-time
  useEffect(() => {
    socket.on("new_notification", (data) => {
      setNotifications(prev => [data, ...prev])
      setUnread(prev => prev + 1)
    })

    return () => socket.off("new_notification")
  }, [])

  // ❌ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"))

  if (user?._id) {
    socket.emit("join", user._id)
  }
}, [])

  // 🖱️ Click notification
  const handleClick = async (n) => {
    await axios.put(
      `http://localhost:5000/notifications/${n._id}/read`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )

    setNotifications(prev =>
      prev.map(item =>
        item._id === n._id ? { ...item, read: true } : item
      )
    )

    setUnread(prev => (prev > 0 ? prev - 1 : 0))

    // 🔀 Handle navigation based on type
if (n.post && n.community) {
  navigate(`/communities/${n.community}`, {
    state: {
      postId: String(n.post),
      commentId: n.comment ? String(n.comment) : null
    }
  })
} else {
  console.log("⚠️ Missing navigation data:", n)
}

        navigate(`/communities/${n.community}`, {
        state: {
            postId: String(n.post),
            commentId: String(n.comment)
        }
        })

    setOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 🔔 Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-[#E5E1DA] transition"
      >
        <BellIcon />

        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#89A8B2] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow">
            {unread}
          </span>
        )}
      </button>

      {/* ✨ Premium Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 w-80 backdrop-blur-xl bg-white/80 border border-white/40 rounded-2xl shadow-2xl p-3 z-9999 animate-[fadeIn_0.2s_ease]">
          
          {/* Header */}
          <div className="flex justify-between items-center px-2 pb-2">
            <h3 className="text-sm font-semibold text-slate-700">
              Notifications
            </h3>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto space-y-2 pr-1">

            {notifications.length === 0 && (
              <p className="text-center text-sm text-slate-400 py-6">
                You're all caught up ✨
              </p>
            )}

            {notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => handleClick(n)}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition 
                ${
                  n.read
                    ? "bg-white hover:bg-[#F1F0E8]"
                    : "bg-[#EEF5F7] hover:bg-[#e2eff3]"
                }`}
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-[#89A8B2] text-white flex items-center justify-center text-sm font-bold">
                  {n.sender?.name?.[0] || "U"}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-snug">
                    <span className="font-semibold">
  {n.sender?.name || "Someone"}
</span>{" "}
{n.type === "like" && "liked your post"}
{n.type === "comment" && "commented on your post"}
                  </p>

                  <span className="text-[11px] text-slate-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell