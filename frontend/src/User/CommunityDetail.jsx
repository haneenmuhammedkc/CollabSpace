import React, { useEffect, useState } from "react"
import Navbar from "../UserComponents/Navbar"
import Footer from "../UserComponents/Footer"
import { useParams } from "react-router-dom"
import axios from "axios"

const CommunityDetail = () => {
  const { id } = useParams()

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

            {/* Share & Join Buttons */}
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none border-2 border-[#B3C8CF] text-slate-700 px-6 py-2.5 rounded-xl font-bold
                hover:border-[#89A8B2] hover:text-[#89A8B2] transition shadow-sm bg-white">
                Share
              </button>
              <button onClick={handleJoin} className="flex-1 md:flex-none bg-[#89A8B2] text-white px-8 py-2.5 rounded-xl
                font-bold shadow-sm hover:shadow-md hover:bg-[#7896a0] transition active:scale-95">
                Join Community
              </button>
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
                <div className="bg-[#E5E1DA] p-6 rounded-3xl border border-[#B3C8CF]/40 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#89A8B2] text-white rounded-2xl flex items-center justify-center font-bold text-xl shrink-0">
                    A
                  </div>
                  <div className="flex-1">
                    <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)}
                      placeholder="Share an insight, question, or project pitch with the community..."
                      rows="3"
                      className="w-full px-4 py-3 bg-[#F1F0E8] border-2 border-transparent rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium resize-none mb-3"
                    ></textarea>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 text-slate-500">
                        <button className="p-2 hover:bg-[#B3C8CF]/30 rounded-lg transition">
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
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-[#B3C8CF]/30 rounded-lg transition">
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
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <button onClick={handleCreatePost} className="bg-[#89A8B2] text-white px-6 py-2 rounded-xl font-bold shadow-sm hover:bg-[#7896a0] transition">
                        Post
                      </button>
                    </div>
                  </div>
                </div>

                {/* Posts */}
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-[#E5E1DA] p-6 rounded-3xl border border-[#B3C8CF]/30 shadow-sm hover:border-[#89A8B2] transition duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#B3C8CF] to-[#89A8B2] text-white flex items-center justify-center font-bold shadow-inner">
                        D
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">
                          {post.author?.name}
                          <span className="text-slate-400 font-medium ml-2 text-sm">
                            {new Date(post.createdAt).toLocaleString()}
                          </span>
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          UI Motion Designer
                        </p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {post.title || "Post"}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {post.content}
                    </p>
                    <div className="flex gap-6 border-t border-[#B3C8CF]/30 pt-4">
                      <button className="flex items-center gap-2 text-slate-500 hover:text-[#89A8B2] font-semibold text-sm transition">
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
                        24
                      </button>
                      <button className="flex items-center gap-2 text-slate-500 hover:text-[#89A8B2] font-semibold text-sm transition">
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
                        12
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "members" && (
              <div className="bg-[#E5E1DA] p-6 rounded-3xl border border-[#B3C8CF]/30 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-[#F1F0E8] p-4 rounded-2xl border border-[#B3C8CF]/30 hover:border-[#89A8B2] transition group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#89A8B2] text-white flex items-center justify-center font-bold text-xl">
                        U
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 group-hover:text-[#5e7780] transition">
                          Member Name {i}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          Joined Jan 2026
                        </p>
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