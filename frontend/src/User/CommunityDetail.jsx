import React, { useEffect, useState } from "react"
import Navbar from "../UserComponents/Navbar"
import Footer from "../UserComponents/Footer"
import { useParams } from "react-router-dom"
import axios from "axios"
import PostBox from "../UserComponents/PostBox"

const CommunityDetail = () => {
  const { id } = useParams()

  const [image, setImage] = useState("")
  const [link, setLink] = useState("")
  const [code, setCode] = useState("")
  const [posts, setPosts] = useState([])
  const [community, setCommunity] = useState(null)
  const [activeTab, setActiveTab] = useState("feed")
  const [postContent, setPostContent] = useState("")

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/communities/${id}`)
        setCommunity(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/posts/${id}`)
        setPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCommunity()
    fetchPosts()
  }, [id])

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem("token")

      await axios.post(`http://localhost:5000/communities/join/${id}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const res = await axios.get(`http://localhost:5000/communities/${id}`)
      setCommunity(res.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const handleCreatePost = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await axios.post(
        `http://localhost:5000/posts`,
        {
          content: postContent,
          communityId: id,
          image,
          link,
          code
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // Add new post to UI instantly
      setPosts((prev) => [res.data, ...prev])

      // Clear input
      setPostContent("")
    } catch (error) {
      console.log(error)
    }
  }

  const user = JSON.parse(localStorage.getItem("user"))

  const isCreator = community?.createdBy?._id === user?._id
  const isMember = community?.members?.some(m => m._id === user?._id)

  const handleLeave = async () => {
    const token = localStorage.getItem("token")

    await axios.post(`http://localhost:5000/communities/leave/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })

    const res = await axios.get(`http://localhost:5000/communities/${id}`)
    setCommunity(res.data)
  }

  const handleLike = async (postId) => {
    const token = localStorage.getItem("token")

    const res = await axios.post(`http://localhost:5000/posts/like/${postId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setPosts(posts.map(p => p._id === postId ? res.data : p))
  }

  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token")

    await axios.delete(`http://localhost:5000/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setPosts(posts.filter(p => p._id !== postId))
  }

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token")

    const res = await axios.get("http://localhost:5000/notifications", {
      headers: { Authorization: `Bearer ${token}` }
    })

    console.log(res.data)
  }

  if(!community){
    return <div className="text-center py-20">Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-10">
        
        {/* Community Banner */}
        <div className="bg-[#E5E1DA] rounded-3xl border border-[#B3C8CF]/40 shadow-sm overflow-hidden mb-8">
          <div className="h-40 md:h-56 bg-slate-800 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[#89A8B2] opacity-40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1]"></div>

            {/* Community Name & Description */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">
                {" "}
                {community?.name}{" "}
              </h1>
              <p className="text-slate-100 text-lg md:text-xl font-medium max-w-2xl drop-shadow">
                {" "}
                {community?.description}{" "}
              </p>
            </div>
          </div>

          {/* Community Details & Actions */}
          <div className="px-6 md:px-10 py-6 border-b border-[#B3C8CF]/30 bg-[#F1F0E8]/50 flex flex-col md:flex-row
            justify-between items-center gap-6">

            {/* Members count & Projects active */}
            <div className="flex gap-8">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-2xl font-black text-[#89A8B2]">
                  {" "}
                  {community?.members?.length >= 1000
                    ? (community.members.length / 1000).toFixed(1) + "k"
                    : community.members?.length}{" "}
                </span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Members
                </span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-2xl font-black text-[#89A8B2]">342</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Projects Active
                </span>
              </div>
            </div>

            {/* Share, Join & Leave Buttons */}
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none border-2 border-[#B3C8CF] text-slate-700 px-6 py-2.5 rounded-xl font-bold
                hover:border-[#89A8B2] hover:text-[#89A8B2] transition shadow-sm bg-white">
                Share
              </button>
              {!isCreator && !isMember && (
                <button onClick={handleJoin} className="flex-1 md:flex-none bg-[#89A8B2] text-white px-8 py-2.5 rounded-xl
                  font-bold shadow-sm hover:shadow-md hover:bg-[#7896a0] transition active:scale-95">
                  Join Community
                </button>
              )}
              {isMember && !isCreator && (
                <button onClick={handleJoin} className="flex-1 md:flex-none bg-[#89A8B2] text-white px-8 py-2.5 rounded-xl
                  font-bold shadow-sm hover:shadow-md hover:bg-[#7896a0] transition active:scale-95">
                  Leave Community
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex px-4 md:px-10 gap-8 overflow-x-auto scrollbar-none bg-[#E5E1DA]">
            <button onClick={() => setActiveTab("feed")} className={`py-5 font-bold text-base whitespace-nowrap border-b-4 transition-colors
            ${activeTab === "feed" ? "border-[#89A8B2] text-[#89A8B2]" : "border-transparent text-slate-500 hover:text-slate-700"}
            duration-300`} >
              Activity Feed
            </button>
            <button onClick={() => setActiveTab("members")} className={`py-5 font-bold text-base whitespace-nowrap border-b-4
             ${activeTab === "members" ? "border-[#89A8B2] text-[#89A8B2]" : "border-transparent text-slate-500 hover:text-slate-700"}
            transition-colors duration-300`} >
              Members Directory
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {activeTab === "feed" && (
              <div className="flex flex-col gap-6">

                {/* Create Post Input Section */}
                {(isMember || isCreator) && (
                  <div className="bg-[#E5E1DA] p-6 rounded-3xl border border-[#B3C8CF]/40 shadow-sm flex items-start gap-4">
                    <PostBox
                      postContent={postContent}
                      setPostContent={setPostContent}
                      image={image}
                      setImage={setImage}
                      link={link}
                      setLink={setLink}
                      code={code}
                      setCode={setCode}
                      handleCreatePost={handleCreatePost}
                    />
                    
                  </div>
                )}

                {/* Posts */}
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-[#E5E1DA] p-6 rounded-3xl border border-[#B3C8CF]/30 shadow-sm hover:border-[#89A8B2] transition duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-200">
  {post.author?.avatar ? (
    <img
      src={post.author.avatar}
      alt="Avatar"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-white font-bold bg-[#89A8B2]">
      {post.author?.name?.[0]}
    </div>
  )}
</div>
                      <div>
                        <h4 className="font-bold text-slate-800">
                          {post.author?.name}
                          <span className="text-slate-400 font-medium ml-2 text-sm">
                            {new Date(post.createdAt).toLocaleString()}
                          </span>
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
  {post.author?.role || post.author?.about || "Community Member"}
</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {post.title || "Post"}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {post.content}
                    </p>
                    {post.image && (
  <img src={post.image} className="rounded-xl mt-3" />
)}

                    {post.link && (
  <a href={post.link} className="text-blue-500 block mt-2">
    {post.link}
  </a>
)}

                    {post.code && (
  <pre className="bg-black text-green-400 p-3 rounded mt-3 overflow-x-auto">
    {post.code}
  </pre>
)}
                    <div className="flex gap-6 border-t border-[#B3C8CF]/30 pt-4">
                      <button onClick={() => handleLike(post._id)} className="flex items-center gap-2 text-slate-500 hover:text-[#89A8B2] font-semibold text-sm transition cursor-pointer">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          ></path>
                        </svg>{" "}
                        {post.likes?.length || 0}
                      </button>
                      <button className="flex items-center gap-2 text-slate-500 hover:text-[#89A8B2] font-semibold text-sm transition cursor-pointer">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          ></path>
                        </svg>{" "}
                        {post.comments?.length || 0}
                      </button>
                      {(post.author?._id === user._id || community.createdBy === user._id) && (
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="flex items-center gap-2 text-slate-500 hover:text-red-500 font-semibold text-sm transition cursor-pointer"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3m-9 0h12"
                            />
                          </svg>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "members" && (
              <div className="bg-[#E5E1DA] p-6 rounded-3xl border border-[#B3C8CF]/30 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {community.members.map(member => (
  <div key={member._id} className="flex items-center gap-4 ...">
    
    <div className="w-12 h-12 bg-[#89A8B2] text-white rounded-xl flex items-center justify-center">
      {member.name[0]}
    </div>

    <div>
      <h4 className="font-bold">
        {member.name}

        {community.createdBy?._id === member._id && (
          <span className="ml-2 text-xs text-green-600 font-bold">
            Creator
          </span>
        )}
      </h4>
    </div>

  </div>
))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#E5E1DA] rounded-3xl p-6 border border-[#B3C8CF]/30 shadow-sm sticky top-28">
              <h3 className="font-bold text-slate-800 mb-4 border-b border-[#B3C8CF]/30 pb-2">
                Top Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "CSS",
                  "Tailwind",
                  "Figma",
                  "UX/UI",
                  "Animations",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-bold text-[#89A8B2] bg-[#F1F0E8] px-3 py-1.5 rounded-lg border border-[#B3C8CF]/30 cursor-pointer hover:bg-[#89A8B2] hover:text-white transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <h3 className="font-bold text-slate-800 mb-4 border-b border-[#B3C8CF]/30 pb-2 mt-8">
                Rules
              </h3>
              <ol className="text-sm font-medium text-slate-600 space-y-3 list-decimal list-inside marker:text-[#89A8B2] marker:font-bold">
                <li>Be respectful to fellow developers</li>
                <li>Share open source code only</li>
                <li>No spam or self-promotion</li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CommunityDetail