import React, { useState } from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';

export default function ApplicationManagement() {
  const [activeTab, setActiveTab] = useState('applicants');

  const applicants = [
    { id: 1, name: 'Alice Frontend', avatar: 'A', role: 'Frontend Developer', github: 'alice-dev', exp: 'React, Tailwind, Zustand', applied: '2 hours ago', status: 'pending' },
    { id: 2, name: 'Bob Server', avatar: 'B', role: 'Backend Developer', github: 'bobby-nodes', exp: 'Node.js, Express, Postgres', applied: '1 day ago', status: 'pending' }
  ];

  const roster = [
    { id: 1, name: 'Mark S.', avatar: 'M', role: 'Project Lead', joined: 'Creator' },
    { id: 2, name: 'Sarah C.', avatar: 'S', role: 'UI/UX Designer', joined: 'Aug 24, 2026' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-10">
        
        <div className="mb-6 flex gap-2 text-sm font-bold text-slate-500">
          <a href="/projects" className="hover:text-[#89A8B2] transition">Projects</a>
          <span>/</span>
          <a href="/projects/0" className="hover:text-[#89A8B2] transition">E-Commerce Framework</a>
          <span>/</span>
          <span className="text-slate-800">Applications</span>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Team Management</h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl">Review incoming applications, accept or reject candidates, and view your current active roster.</p>
        </div>

        <div className="bg-[#E5E1DA] rounded-3xl border border-[#B3C8CF]/40 shadow-sm overflow-hidden mb-12">
          
          {/* Tabs */}
          <div className="flex px-4 md:px-10 gap-8 border-b border-[#B3C8CF]/30 bg-[#F1F0E8]/50 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('applicants')}
              className={`py-5 font-bold text-base whitespace-nowrap border-b-4 transition-colors duration-300 flex items-center gap-2 ${activeTab === 'applicants' ? 'border-[#89A8B2] text-[#89A8B2]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              Pending Applicants <span className="text-xs font-bold bg-white border border-[#B3C8CF]/50 px-2 py-0.5 rounded-full">{applicants.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('roster')}
              className={`py-5 font-bold text-base whitespace-nowrap border-b-4 transition-colors duration-300 flex items-center gap-2 ${activeTab === 'roster' ? 'border-[#89A8B2] text-[#89A8B2]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              Current Roster <span className="text-xs font-bold bg-white border border-[#B3C8CF]/50 px-2 py-0.5 rounded-full">{roster.length}</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10 min-h-[400px]">
            
            {activeTab === 'applicants' && (
              <div className="space-y-6">
                {applicants.map(app => (
                  <div key={app.id} className="bg-[#F1F0E8] p-6 rounded-2xl border border-[#B3C8CF]/40 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex gap-4 items-start w-full">
                      <div className="w-14 h-14 bg-[#B3C8CF]/40 rounded-xl text-[#89A8B2] flex items-center justify-center font-bold text-2xl shrink-0 border border-[#B3C8CF]/50 shadow-inner">
                        {app.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                          <h4 className="text-lg font-bold text-slate-800">{app.name}</h4>
                          <span className="text-sm font-semibold text-slate-500">Applied {app.applied} for <strong className="text-[#89A8B2]">{app.role}</strong></span>
                        </div>
                        <p className="text-sm font-medium text-slate-700 mb-2"><strong>Experience:</strong> {app.exp}</p>
                        <a href={`https://github.com/${app.github}`} className="text-sm font-bold text-[#89A8B2] hover:underline flex items-center gap-1 group">
                           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                           {app.github}
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                      <button className="flex-1 md:flex-none border-2 border-rose-200 text-rose-600 bg-rose-50 px-6 py-2.5 rounded-xl font-bold hover:bg-rose-100 hover:border-rose-300 transition shadow-sm">Reject</button>
                      <button className="flex-1 md:flex-none bg-[#89A8B2] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#7896a0] transition shadow-md active:scale-95">Accept & Join</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'roster' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roster.map(member => (
                  <div key={member.id} className="bg-[#F1F0E8] p-6 rounded-2xl border border-[#B3C8CF]/40 shadow-sm flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-[#89A8B2] rounded-xl text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-inner">
                      {member.avatar}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 group-hover:text-[#5e7780] transition">{member.name}</h4>
                      <p className="text-sm font-semibold text-[#89A8B2] mb-1">{member.role}</p>
                      <p className="text-xs font-bold text-slate-500 bg-[#E5E1DA] px-2 py-0.5 rounded-md inline-block">Joined: {member.joined}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
