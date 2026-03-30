import React, { useState, useEffect } from 'react'
import Navbar from "../UserComponents/Navbar"
import Footer from "../UserComponents/Footer"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const EditProfile = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState({ name: "",  about: "", skills: "", github: "", website: "", linkedin: "" })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null")
    if (storedUser) {
      setUser({
        ...storedUser,
        about: storedUser.about || "",
        skills: storedUser.skills?.join(", ") || "",
        github: storedUser.github || "",
        website: storedUser.website || "",
        linkedin: storedUser.linkedin || ""
      })
    }
  }, [])

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    if (!user.name.trim()) {
      return alert("Name cannot be empty")
    }

    try {
      setLoading(true)
      const token = localStorage.getItem("token")
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
          linkedin: user.linkedin
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
    catch(err){
      console.log(err)
      alert("Update failed")
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F1F0E8] pt-20 text-slate-800">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-[#E5E1DA] rounded-3xl border border-[#B3C8CF]/40 shadow-sm p-8">

          <h2 className="text-3xl font-extrabold mb-6">Edit Profile</h2>

          {/* Avatar */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-[#89A8B2] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-sm text-slate-500">@{user.username || "username"}</p>
            </div>
          </div>

          {/* Form */}
          <div className="grid gap-6">

            {/* Name */}
            <div>
              <label className="font-semibold text-sm">Full Name</label>
              <input type="text" name="name" value={user.name} onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#B3C8CF]/40 bg-[#F1F0E8] focus:outline-none
                focus:border-[#89A8B2]" />
            </div>

            {/* About */}
            <div>
              <label className="font-semibold text-sm">About</label>
              <textarea name="about" value={user.about} onChange={handleChange} rows="4"
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#B3C8CF]/40 bg-[#F1F0E8] focus:outline-none
                focus:border-[#89A8B2]" />
            </div>

            {/* Skills */}
            <div>
              <label className="font-semibold text-sm">Skills (comma separated)</label>
              <input type="text" name="skills" value={user.skills} onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#B3C8CF]/40 bg-[#F1F0E8] focus:outline-none
                focus:border-[#89A8B2]" />
            </div>

            {/* Github Link Input */}
            <div>
              <label className="font-semibold text-sm">Github's Link</label>
              <input type="text" name="github" value={user.github} onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#B3C8CF]/40 bg-[#F1F0E8] focus:outline-none
                focus:border-[#89A8B2]" />
            </div>

            {/* Website Link Input */}
            <div>
              <label className="font-semibold text-sm">Website's Link</label>
              <input type="text" name="website" value={user.website} onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#B3C8CF]/40 bg-[#F1F0E8] focus:outline-none
                focus:border-[#89A8B2]" />
            </div>

            {/* Linkedin Link Input */}
            <div>
              <label className="font-semibold text-sm">Linkedin's Link</label>
              <input type="text" name="linkedin" value={user.linkedin} onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-[#B3C8CF]/40 bg-[#F1F0E8] focus:outline-none
                focus:border-[#89A8B2]" />
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button onClick={handleSave} disabled={loading}
                className="bg-[#89A8B2] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#7896a0] hover:shadow-lg
                  transition disabled:opacity-50">
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default EditProfile