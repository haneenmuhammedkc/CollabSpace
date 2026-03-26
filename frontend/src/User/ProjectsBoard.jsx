import React, { useState } from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';
import { useNavigate } from 'react-router-dom';

export default function ProjectsBoard() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    { title: 'Open-Source E-Commerce Framework', author: 'Mark S.', roles: ['Frontend', 'Backend'], tags: ['React', 'Node.js', 'PostgreSQL'], status: 'Recruiting', applicants: 12 },
    { title: 'AI Developer Assistant CLI', author: 'Jenna L.', roles: ['Python Dev', 'DevOps'], tags: ['Python', 'LLM', 'Docker'], status: 'Recruiting', applicants: 8 },
    { title: 'Community Mentorship Platform', author: 'Alex D.', roles: ['UI/UX', 'Full Stack'], tags: ['Figma', 'Next.js', 'Tailwind'], status: 'In Progress', applicants: 0 },
    { title: 'Rust Game Engine', author: 'Chris P.', roles: ['C++ / Rust', 'Game Design'], tags: ['Rust', 'OpenGL', 'WASM'], status: 'Recruiting', applicants: 25 },
    { title: 'Decentralized Note Taking App', author: 'Sarah C.', roles: ['Web3', 'Frontend'], tags: ['React', 'Solidity', 'IPFS'], status: 'Recruiting', applicants: 5 },
    { title: 'Local Business Directory', author: 'Tom H.', roles: ['Backend', 'Database'], tags: ['Django', 'Python', 'MySQL'], status: 'In Progress', applicants: 0 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Projects Board</h1>
            <p className="text-slate-600 font-medium text-lg max-w-2xl">Discover exciting open-source initiatives to join, or pitch your own idea and build your dream team.</p>
          </div>
          <button 
            onClick={() => navigate('/projects/create')}
            className="bg-[#89A8B2] text-white px-8 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:bg-[#7896a0] hover:-translate-y-1 transition active:scale-95 whitespace-nowrap flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
            Create Project
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#E5E1DA] p-4 rounded-2xl border border-[#B3C8CF]/40 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto scrollbar-none pb-2 lg:pb-0">
            {['All', 'Frontend', 'Backend', 'Full Stack', 'Mobile', 'AI/ML'].map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors ${activeFilter === f ? 'bg-[#89A8B2] text-white shadow-sm' : 'bg-transparent text-slate-500 hover:bg-[#B3C8CF]/20 hover:text-slate-700'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-96">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Search by keywords, tags, roles..." 
              className="w-full pl-12 pr-4 py-3 bg-[#F1F0E8] border border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <a href={`/projects/${i}`} key={i} className="flex flex-col bg-[#E5E1DA] p-8 border border-[#B3C8CF]/30 rounded-3xl hover:border-[#89A8B2] hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F1F0E8]/50 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative z-10 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${p.status === 'Recruiting' ? 'bg-[#89A8B2]/20 text-[#384a51] ring-1 ring-[#89A8B2]/30 text-[#89A8B2]' : 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'}`}>
                    {p.status}
                  </span>
                  {p.applicants > 0 && (
                     <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                       <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                       {p.applicants} applicants
                     </span>
                  )}
                </div>

                <h4 className="text-xl font-bold text-slate-800 group-hover:text-[#5e7780] transition-colors duration-300 leading-snug mb-2">{p.title}</h4>
                <p className="text-sm text-slate-500 font-semibold mb-6">Posted by <span className="text-slate-700">{p.author}</span></p>
                
                <div className="mb-6 flex-grow">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Open Roles</h5>
                  <div className="flex flex-wrap gap-2">
                    {p.roles.map((r, idx) => (
                      <span key={idx} className="text-xs font-bold text-[#5e7780] bg-white border border-[#B3C8CF]/40 px-3 py-1 rounded-full shadow-sm">{r}</span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#B3C8CF]/30 pt-4 flex gap-2 w-full overflow-hidden">
                  {p.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-bold text-[#89A8B2] bg-[#F1F0E8] px-2 py-1 rounded-md">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {/* Pagination Setup */}
        <div className="flex justify-center mt-12">
          <div className="flex bg-[#E5E1DA] rounded-xl border border-[#B3C8CF]/30 p-1 shadow-sm">
            <button className="px-4 py-2 text-slate-500 hover:text-slate-800 font-bold transition">Prev</button>
            <button className="px-4 py-2 bg-[#89A8B2] text-white rounded-lg font-bold shadow-sm">1</button>
            <button className="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold transition">2</button>
            <button className="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold transition">3</button>
            <button className="px-4 py-2 text-slate-500 hover:text-slate-800 font-bold transition">Next</button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
