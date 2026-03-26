import React from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';

export default function ProjectCreate() {
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
                <input type="text" placeholder="E.g. Open-Source E-Commerce Engine..." className="px-5 py-4 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-bold text-lg" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Project Description <span className="text-rose-500">*</span></label>
                <textarea rows="6" placeholder="Describe the problem, your solution, and the architecture you envision..." className="px-5 py-4 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium resize-none"></textarea>
                <p className="text-xs font-semibold text-slate-500 text-right mt-1">Markdown supported</p>
              </div>
            </section>

            {/* Categorization */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 border-b border-[#B3C8CF]/30 pb-2">Categorization</h2>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Tech Stack & Tags <span className="text-slate-400 font-normal ml-2">(Comma separated)</span></label>
                <input type="text" placeholder="React, Node.js, Hardware, APIs..." className="px-5 py-4 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Community Hub</label>
                <select className="px-5 py-4 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-bold appearance-none cursor-pointer">
                  <option value="none">-- Select relevant community (Optional) --</option>
                  <option value="frontend">Frontend Wizards</option>
                  <option value="ai">AI / Machine Learning</option>
                  <option value="opensource">Open Source Contribs</option>
                </select>
              </div>
            </section>

            {/* Roles Needed */}
            <section className="space-y-6">
              <div className="flex justify-between items-end border-b border-[#B3C8CF]/30 pb-2">
                <h2 className="text-2xl font-bold text-slate-800">Roles Needed</h2>
                <button className="text-sm font-bold text-[#89A8B2] hover:bg-[#89A8B2]/10 px-3 py-1.5 rounded-lg transition">+ Add Role</button>
              </div>
              
              <div className="bg-[#F1F0E8]/50 p-6 border-2 border-dashed border-[#B3C8CF]/60 rounded-2xl flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Role Title</label>
                    <input type="text" placeholder="E.g. Backend Engineer" className="px-4 py-2.5 bg-white border border-[#B3C8CF]/50 rounded-lg text-slate-800 focus:outline-none focus:border-[#89A8B2] transition font-semibold" />
                  </div>
                  <div className="sm:w-32 flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Count</label>
                    <input type="number" defaultValue={1} min={1} className="px-4 py-2.5 bg-white border border-[#B3C8CF]/50 rounded-lg text-slate-800 focus:outline-none focus:border-[#89A8B2] transition font-semibold" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-xs font-bold text-slate-500 uppercase">Description / Requirements</label>
                   <textarea rows="2" placeholder="Responsibilities and skills needed..." className="px-4 py-2.5 bg-white border border-[#B3C8CF]/50 rounded-lg text-slate-800 focus:outline-none focus:border-[#89A8B2] transition font-medium resize-none"></textarea>
                </div>
              </div>
            </section>

          </div>

          <div className="p-8 bg-[#F1F0E8]/50 border-t border-[#B3C8CF]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm font-medium text-slate-500">Your project will be visible to everyone on the platform.</span>
            <div className="flex gap-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white border-2 border-[#B3C8CF] text-slate-700 px-8 py-3.5 rounded-xl font-bold hover:border-[#89A8B2] hover:text-[#89A8B2] transition shadow-sm">Save Draft</button>
              <button className="w-full sm:w-auto bg-[#89A8B2] text-white px-8 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:bg-[#7896a0] transition active:scale-95">Publish Project</button>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
