import React, { useState } from "react"

const PostBox = ({
  postContent,
  setPostContent,
  image,
  setImage,
  link,
  setLink,
  code,
  setCode,
  handleCreatePost,
}) => {

  const [showImage, setShowImage] = useState(false)
  const [showLink, setShowLink] = useState(false)
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="flex-1 bg-white rounded-2xl p-5 shadow-sm border border-slate-200">

      {/* Main Input */}
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Share something valuable with your community..."
        rows="3"
        className="w-full px-4 py-3 bg-[#F1F0E8] rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 resize-none font-medium"
      />

      {/* Dynamic Inputs */}
      <div className="mt-4 space-y-3">

        {showImage && (
          <input
            placeholder="Paste image URL..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 rounded-lg text-sm"
          />
        )}

        {showLink && (
          <input
            placeholder="Paste link..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 rounded-lg text-sm"
          />
        )}

        {showCode && (
          <textarea
            placeholder="Paste your code..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows="3"
            className="w-full px-4 py-3 bg-[#1e293b] text-green-400 rounded-lg text-sm font-mono"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">

        <div className="flex gap-2">
          <button onClick={() => setShowImage(!showImage)} className="p-2 hover:bg-[#B3C8CF]/30 rounded-lg">🖼️</button>
          <button onClick={() => setShowLink(!showLink)} className="p-2 hover:bg-[#B3C8CF]/30 rounded-lg">🔗</button>
          <button onClick={() => setShowCode(!showCode)} className="p-2 hover:bg-[#B3C8CF]/30 rounded-lg">💻</button>
        </div>

        <button
          onClick={handleCreatePost}
          className="bg-[#89A8B2] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#7896a0]"
        >
          Post
        </button>
      </div>
    </div>
  )
}

export default PostBox