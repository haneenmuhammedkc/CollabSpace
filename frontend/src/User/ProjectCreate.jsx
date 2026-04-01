import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';

export default function ProjectCreate() {
  // 🟢 FORM STATE
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    community: "",
    roles: [],
    github: "",
    live: "",
    docs: "",
  });

  // 🟢 ROLE INPUT STATE
  const [roleInput, setRoleInput] = useState({
    title: "",
    description: "",
    count: 1,
  });

  // 🟢 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🟢 HANDLE ROLE INPUT
  const handleRoleChange = (e) => {
    setRoleInput({ ...roleInput, [e.target.name]: e.target.value });
  };

  // 🟢 ADD ROLE
  const addRole = () => {
    if (!roleInput.title) {
      alert("Please enter a role title");
      return;
    }

    setForm({
      ...form,
      // ⚠️ FIX 1: Convert count to Number
      roles: [...form.roles, { ...roleInput, count: Number(roleInput.count) }],
    });

    setRoleInput({
      title: "",
      description: "",
      count: 1,
    });
  };

  // 🟢 SUBMIT PROJECT
  const handleSubmit = async () => {
    // ⚠️ FIX 2: Prevent empty project submission
    if (!form.title.trim() || !form.description.trim()) {
      alert("Title and Description are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/projects",
        {
          title: form.title,
          description: form.description,
          // ⚠️ FIX 3: Prevent empty tags crash & trim whitespace
          tags: form.tags
            ? form.tags.split(",").map(t => t.trim()).filter(Boolean)
            : [],
          community: form.community,
          roles: form.roles,
          links: {
            github: form.github,
            live: form.live,
            docs: form.docs,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Project Created Successfully!");

      // ⚠️ FIX 4: Reset form after success
      setForm({
        title: "",
        description: "",
        tags: "",
        community: "",
        roles: [],
        github: "",
        live: "",
        docs: "",
      });

    } catch (err) {
      console.log(err);
      alert("Error creating project");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-4 drop-shadow-sm">Create New Project</h1>
          <p className="text-lg text-slate-600 font-medium">Have a vision? Pitch your idea, describe the open roles, and start building your team.</p>
        </div>

        <div className="bg-[#E5E1DA] rounded-[2rem] border border-[#B3C8CF]/40 shadow-sm overflow-hidden mb-12">
          <div className="p-8 sm:p-12 space-y-10">
            
            {/* Basic Info */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 border-b border-[#B3C8CF]/30 pb-2">Basic Info</h2>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Project Title <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="E.g. Open-Source E-Commerce Engine..." 
                  className="px-5 py-4 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-bold text-lg" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Project Description <span className="text-rose-500">*</span></label>
                <textarea 
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="6" 
                  placeholder="Describe the problem, your solution, and the architecture you envision..." 
                  className="px-5 py-4 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium resize-none"
                ></textarea>
                <p className="text-xs font-semibold text-slate-500 text-right mt-1">Markdown supported</p>
              </div>
            </section>

            {/* Categorization */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 border-b border-[#B3C8CF]/30 pb-2">Categorization</h2>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Tech Stack & Tags <span className="text-slate-400 font-normal ml-2">(Comma separated)</span></label>
                <input 
                  type="text" 
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="React, Node.js, Hardware, APIs..." 
                  className="px-5 py-4 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Community Hub</label>
                <select 
                  name="community"
                  value={form.community}
                  onChange={handleChange}
                  className="px-5 py-4 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-bold appearance-none cursor-pointer"
                >
                  <option value="">-- Select relevant community (Optional) --</option>
                  <option value="frontend">Frontend Wizards</option>
                  <option value="ai">AI / Machine Learning</option>
                  <option value="opensource">Open Source Contribs</option>
                </select>
              </div>
            </section>

            {/* Project Links Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 border-b border-[#B3C8CF]/30 pb-2">Project Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">GitHub Repository</label>
                  <input 
                    type="text" 
                    name="github"
                    value={form.github}
                    onChange={handleChange}
                    placeholder="https://github.com/..." 
                    className="px-5 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:border-[#89A8B2] transition font-medium" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Live Demo URL</label>
                  <input 
                    type="text" 
                    name="live"
                    value={form.live}
                    onChange={handleChange}
                    placeholder="https://yourapp.com" 
                    className="px-5 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:border-[#89A8B2] transition font-medium" 
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700">Documentation URL</label>
                  <input 
                    type="text" 
                    name="docs"
                    value={form.docs}
                    onChange={handleChange}
                    placeholder="https://docs.yoursite.com" 
                    className="px-5 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:border-[#89A8B2] transition font-medium" 
                  />
                </div>
              </div>
            </section>

            {/* Roles Needed */}
            <section className="space-y-6">
              <div className="flex justify-between items-end border-b border-[#B3C8CF]/30 pb-2">
                <h2 className="text-2xl font-bold text-slate-800">Roles Needed</h2>
                <button 
                  onClick={addRole}
                  type="button"
                  className="text-sm font-bold text-[#89A8B2] hover:bg-[#89A8B2]/10 px-3 py-1.5 rounded-lg transition"
                >
                  + Add Role
                </button>
              </div>

              {/* Added Roles List Preview */}
              {form.roles.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {form.roles.map((r, idx) => (
                    <div key={idx} className="bg-white px-4 py-2 rounded-full border border-[#B3C8CF] text-sm font-bold text-slate-700">
                      {r.title} ({r.count})
                    </div>
                  ))}
                </div>
              )}
              
              <div className="bg-[#F1F0E8]/50 p-6 border-2 border-dashed border-[#B3C8CF]/60 rounded-2xl flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Role Title</label>
                    <input 
                      type="text" 
                      name="title"
                      value={roleInput.title}
                      onChange={handleRoleChange}
                      placeholder="E.g. Backend Engineer" 
                      className="px-4 py-2.5 bg-white border border-[#B3C8CF]/50 rounded-lg text-slate-800 focus:outline-none focus:border-[#89A8B2] transition font-semibold" 
                    />
                  </div>
                  <div className="sm:w-32 flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Count</label>
                    <input 
                      type="number" 
                      name="count"
                      min={1}
                      value={roleInput.count}
                      onChange={handleRoleChange}
                      className="px-4 py-2.5 bg-white border border-[#B3C8CF]/50 rounded-lg text-slate-800 focus:outline-none focus:border-[#89A8B2] transition font-semibold" 
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-xs font-bold text-slate-500 uppercase">Description / Requirements</label>
                   <textarea 
                     name="description"
                     value={roleInput.description}
                     onChange={handleRoleChange}
                     rows="2" 
                     placeholder="Responsibilities and skills needed..." 
                     className="px-4 py-2.5 bg-white border border-[#B3C8CF]/50 rounded-lg text-slate-800 focus:outline-none focus:border-[#89A8B2] transition font-medium resize-none"
                   ></textarea>
                </div>
              </div>
            </section>
          </div>

          <div className="p-8 bg-[#F1F0E8]/50 border-t border-[#B3C8CF]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm font-medium text-slate-500">Your project will be visible to everyone on the platform.</span>
            <div className="flex gap-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white border-2 border-[#B3C8CF] text-slate-700 px-8 py-3.5 rounded-xl font-bold hover:border-[#89A8B2] hover:text-[#89A8B2] transition shadow-sm">Save Draft</button>
              <button 
                onClick={handleSubmit}
                className="w-full sm:w-auto bg-[#89A8B2] text-white px-8 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:bg-[#7896a0] transition active:scale-95"
              >
                Publish Project
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}