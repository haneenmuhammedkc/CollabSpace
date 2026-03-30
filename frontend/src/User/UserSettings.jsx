import axios from "axios"
import Navbar from "../UserComponents/Navbar"
import Footer from "../UserComponents/Footer"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"

const UserSettings = () => {
  const navigate = useNavigate()

  const [cover, setCover] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [coverPreview, setCoverPreview] = useState(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [user, setUser] = useState({ name: "", about: "", skills: "", github: "", website: "", linkedin: "", avatar:"" })

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) {
      setUser({
        ...storedUser,
        about: storedUser.about || "",
        skills: storedUser.skills?.join(", ") || "",
        github: storedUser.github || "",
        website: storedUser.website || "",
        linkedin: storedUser.linkedin || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!user.name.trim()) {
      return alert("Name cannot be empty")
    }

    try {
      setLoading(true)

      const token = localStorage.getItem("token")

      let avatarUrl = user.avatar || ""
      let coverUrl = user.cover || ""

      if (avatar) {
        avatarUrl = await uploadImageToCloudinary(avatar)

        console.log("Uploaded Image URL:", avatarUrl)
        setUser(prev => ({
          ...prev,
          avatar: avatarUrl
        }))
      }

  if (cover) {
    coverUrl = await uploadImageToCloudinary(cover)
  }

      const res = await axios.put(
        "http://localhost:5000/users/update",
        {
          name: user.name,
          about: user.about,
          skills: user.skills
            .split(",")
            .map(s => s.trim())
            .filter(Boolean),
          github: user.github,
          website: user.website,
          linkedin: user.linkedin,
          avatar: avatarUrl,
          cover: coverUrl
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      localStorage.setItem("user", JSON.stringify(res.data))
      navigate(`/profile/${res.data._id}`)

    }
    catch(error){
      console.log("SAVE ERROR:", error.response?.data || error.message)
      alert("Update failed")
    }
    finally{
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
    }
  }

  const handleCoverChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCover(file)
      const previewUrl = URL.createObjectURL(file)
      setCoverPreview(previewUrl)
    }
  }

  const uploadImageToCloudinary = async (file) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "collabspace_upload")

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dptyw2tx5/image/upload",
        formData
      )

      return res.data.secure_url
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message)
      throw error
    }
  }

  const handleRemoveAvatar = async () => {
    const confirmDelete = window.confirm("Are you sure you want to remove your avatar?")
    if (!confirmDelete) return

    try {
      const token = localStorage.getItem("token")

      // 🔥 Call backend to remove avatar
      const res = await axios.put(
        "http://localhost:5000/users/update",
        { avatar: "" },   // 👈 IMPORTANT
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // 🔥 Clear local states
      setAvatar(null)

      if (preview) {
        URL.revokeObjectURL(preview)
        setPreview(null)
      }

      setUser(prev => ({
        ...prev,
        avatar: ""
      }))

      // 🔥 Update localStorage (VERY IMPORTANT)
      localStorage.setItem("user", JSON.stringify(res.data))

    } catch (error) {
      console.log("REMOVE ERROR:", error.response?.data || error.message)
      alert("Failed to remove avatar")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-10 flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-[#E5E1DA] p-4 rounded-3xl border border-[#B3C8CF]/40 shadow-sm sticky top-28">
            <h2 className="text-xl font-bold text-slate-800 mb-6 px-4 pt-2">
              Settings
            </h2>
            <nav className="flex flex-col gap-2">
              {[
                { id: "profile", label: "Public Profile" },
                { id: "account", label: "Account Security" },
                { id: "notifications", label: "Notifications" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-4 py-3 rounded-2xl font-semibold transition-all duration-300 
                  ${activeTab === tab.id ? "bg-[#89A8B2] text-white shadow-sm" : "text-slate-600 hover:bg-[#F1F0E8] hover:text-[#89A8B2]"}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Settings Content */}
        <section className="flex-1">
          <div className="bg-[#E5E1DA] rounded-3xl border border-[#B3C8CF]/40 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-[#B3C8CF]/30 bg-[#F1F0E8]/50">
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight capitalize">
                {activeTab} Settings
              </h1>
              <p className="text-slate-500 font-medium mt-1">
                Manage your {activeTab} information and preferences.
              </p>
            </div>

            <div className="p-8 space-y-8">
              {activeTab === "profile" && (
                <>
                {/* Cover Image */}
                <div className="pb-8 border-b border-[#B3C8CF]/20">
                  <h4 className="font-bold text-slate-800 mb-4">Cover Image</h4>

                  <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-[#B3C8CF]/30">
                    
                    {/* Preview OR existing cover */}
                    {coverPreview ? (
                      <img src={coverPreview} className="w-full h-full object-cover" />
                    ) : user?.cover ? (
                      <img src={user.cover} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-linear-to-r from-[#89A8B2] to-[#B3C8CF]" />
                    )}

                    {/* Upload Button */}
                    <label className="absolute bottom-3 right-3 bg-white px-4 py-1.5 rounded-lg text-sm font-bold shadow cursor-pointer hover:bg-[#F1F0E8]">
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-8 border-b border-[#B3C8CF]/20">
                    <div className="w-24 h-24 bg-[#89A8B2] rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-inner shrink-0">
                      {preview ? (
                        <img src={preview} alt="preview" className="w-full h-full object-cover rounded-2xl" />
                      ) : user?.avatar ? (
                        <img src={user.avatar} alt="avatar" className="w-full h-full object-cover rounded-2xl" />
                      ) : (
                        user?.name?.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">
                        Profile Avatar
                      </h4>
                      <div className="flex gap-3">
                        <label className="bg-white border-2 border-[#B3C8CF] text-slate-700 px-4 py-2 font-bold rounded-xl hover:border-[#89A8B2] hover:text-[#89A8B2] transition shadow-sm text-sm cursor-pointer">
                          Upload New
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        <button type="button" onClick={handleRemoveAvatar} className="text-rose-500 font-bold px-4 py-2 text-sm
                          rounded-xl border-2 border-transparent hover:bg-rose-50 transition">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700"> Full Name </label>
                      <input type="text" name="name" value={user.name} onChange={handleChange}
                        className="px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 font-medium
                        focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700"> Display Role </label>
                      <input type="text" defaultValue="Senior Frontend Engineer"
                        className="px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 font-medium
                        focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition"
                      />
                    </div>
                  </div>

                  {/* About */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700"> About </label>
                    <textarea rows="4" name="about" value={user.about} onChange={handleChange}
                      className="px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 resize-none
                      focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium"
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700"> Skills & Expertise (Comma separated) </label>
                    <input type="text" name="skills" value={user.skills} onChange={handleChange}
                      className="px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800
                      focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium"
                    />
                  </div>

                  {/* Social Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700"> Github's Link </label>
                      <input type="text" name="github" value={user.github} onChange={handleChange}
                        className="px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 font-medium
                        focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700"> Website's Link </label>
                      <input type="text" name="website" value={user.website} onChange={handleChange}
                        className="px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 font-medium
                        focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700"> Linkedin's Link </label>
                      <input type="text" name="linkedin" value={user.linkedin} onChange={handleChange}
                        className="px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 font-medium
                        focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === "account" && (
                <>
                  <div className="flex flex-col gap-6 max-w-xl">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="alex@collabspace.dev"
                        className="px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium"
                      />
                    </div>
                    <div className="pt-4 border-t border-[#B3C8CF]/20">
                      <h4 className="font-bold text-slate-800 mb-4">
                        Change Password
                      </h4>
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "notifications" && (
                <div className="flex items-center justify-between max-w-xl">
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg"> Allow Notifications </h4>
                    <p className="text-slate-500 text-sm"> Receive updates about projects, messages, and activity. </p>
                  </div>

                  {/* Toggle Switch */}
                  <button type="button" onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer ${
                      notificationsEnabled ? "bg-[#89A8B2]" : "bg-gray-300"
                    }`}
                  >
                    <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-all duration-300 ${
                        notificationsEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>

                </div>
              )}
            </div>

            <div className="p-6 bg-[#F1F0E8]/50 border-t border-[#B3C8CF]/30 flex justify-end gap-4">
              <button type="button" onClick={() => navigate(`/profile/${user._id}`)} className="px-6 py-2.5 rounded-xl font-bold
              text-slate-600 hover:bg-[#E5E1DA] transition cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSave} disabled={loading} className="px-6 py-2.5 rounded-xl font-bold bg-[#89A8B2] transition
                text-white shadow-sm hover:bg-[#7896a0] hover:shadow-md hover:-translate-y-px cursor-pointer">
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default UserSettings