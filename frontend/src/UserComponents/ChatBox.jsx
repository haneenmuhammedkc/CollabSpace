import React, { useEffect, useState } from "react"
import axios from "axios"
import socket from "../socket"

const ChatBox = ({ chatId }) => {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState(null)

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (!chatId) return

    const fetchMessages = async () => {
      const token = localStorage.getItem("token")

      const res = await axios.get(
        `http://localhost:5000/message/${chatId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setMessages(res.data)
    }

    fetchMessages()

    socket.emit("join_chat", chatId)

    socket.on("receive_message", (msg) => {
      if (msg.chat === chatId) {
        setMessages((prev) => [...prev, msg])
      }
      // 👇 ADD THIS
    socket.on("typing", (user) => {
    setTypingUser(user)
    setIsTyping(true)
    })

    socket.on("stop_typing", () => {
    setIsTyping(false)
    setTypingUser(null)
    })
    })

    return () => {
  socket.off("receive_message")
  socket.off("typing")
  socket.off("stop_typing")
}
  }, [chatId])

  const sendMessage = async () => {
    if (!text.trim()) return

    const token = localStorage.getItem("token")

    const res = await axios.post(
      "http://localhost:5000/message",
      {
        chatId,
        content: text,
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    socket.emit("send_message", res.data)
    setText("")
  }

  return (
    <div className="bg-[#E5E1DA] rounded-3xl border border-[#B3C8CF]/40 shadow-sm flex flex-col h-[550px]">
      
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#B3C8CF]/30 font-bold text-slate-700">
        Community Chat
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m) => {
          const isMe = m.sender._id === user._id

          return (
            <div
              key={m._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div className="flex gap-2 max-w-[75%] min-w-0">
                
                {/* Avatar (left side only) */}
                {!isMe && (
                  <div className="w-8 h-8 rounded-full bg-[#89A8B2] text-white flex items-center justify-center text-xs font-bold">
                    {m.sender.name?.[0]}
                  </div>
                )}

                {/* Message bubble */}
                <div
                className={`px-4 py-2 rounded-2xl text-sm shadow-sm break-words break-all whitespace-pre-wrap w-fit max-w-full ${
                    isMe
                    ? "bg-[#89A8B2] text-white rounded-br-none"
                    : "bg-white text-slate-700 border border-[#B3C8CF]/30 rounded-bl-none"
                }`}
                >
                  {!isMe && (
                    <p className="text-xs font-bold text-[#89A8B2] mb-1">
                      {m.sender.name}
                    </p>
                  )}

                  <p>{m.content}</p>

                  <span className="text-[10px] opacity-70 mt-1 block text-right">
                    {new Date(m.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

        {isTyping && typingUser && (
  <div className="px-4 py-1 text-xs text-gray-500">
    {typingUser.name} is typing...
  </div>
)}
      {/* Input */}
      <div className="p-3 border-t border-[#B3C8CF]/30 flex gap-2">
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value)

            socket.emit("typing", { chatId, user })

            setTimeout(() => {
                socket.emit("stop_typing", chatId)
            }, 1000)
            }}
          placeholder="Type a message..."
          className="flex-1 bg-white border border-[#B3C8CF]/40 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#89A8B2]"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage()
          }}
        />

        <button
          onClick={sendMessage}
          className="bg-[#89A8B2] text-white px-5 rounded-xl font-bold hover:bg-[#7896a0] transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatBox