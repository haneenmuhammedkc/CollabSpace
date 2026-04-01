import axios from "axios"
import React, { useState } from "react"
import Navbar from "../UserComponents/Navbar"
import Footer from "../UserComponents/Footer"
import { useNavigate } from "react-router-dom"

const CreateCommunity = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", description: "", category: "" })

  const handleChange = (e) => {
    setForm({ ...form,
        [e.target.name]: e.target.value
    })
  }

  const handleCreate = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await axios.post(
        "http://localhost:5000/communities",
        form,
        {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
        );

        navigate(`/communities/${res.data._id}`);
    } catch (error) {
        console.log(error);
    }
    };

  return (
    <div className="min-h-screen bg-[#F1F0E8] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-20 relative">

        {/* Background Orbs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#89A8B2] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#B3C8CF] rounded-full blur-[120px] opacity-30"></div>

        {/* Card */}
        <div className="relative z-10 w-full max-w-2xl bg-[#E5E1DA]/70 backdrop-blur-xl border border-[#B3C8CF]/30 rounded-3xl shadow-xl p-8 md:p-10">

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black text-slate-800 mb-3">
              Create a <span className="text-[#89A8B2]">Community</span>
            </h1>
            <p className="text-slate-600 font-medium">
              Start a space where developers collaborate and grow together.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6">

            {/* Name */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 block">
                Community Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. React Masters"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#F1F0E8] border border-transparent focus:border-[#89A8B2] focus:ring-4 focus:ring-[#89A8B2]/20 outline-none transition font-medium"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 block">
                Description
              </label>
              <textarea
                name="description"
                placeholder="What is this community about?"
                rows="4"
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#F1F0E8] border border-transparent focus:border-[#89A8B2] focus:ring-4 focus:ring-[#89A8B2]/20 outline-none transition font-medium resize-none"
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 block">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#F1F0E8] border border-transparent focus:border-[#89A8B2] focus:ring-4 focus:ring-[#89A8B2]/20 outline-none transition font-medium"
              >
                <option value="">Select category</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Design">Design</option>
                <option value="Startup">Startup</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 border border-[#B3C8CF] text-slate-700 py-3 rounded-xl font-bold hover:border-[#89A8B2] hover:text-[#89A8B2] transition"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="flex-1 bg-[#89A8B2] text-white py-3 rounded-xl font-bold shadow-md hover:bg-[#7896a0] transition active:scale-95"
              >
                Create Community
              </button>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CreateCommunity