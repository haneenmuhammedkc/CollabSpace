import React, { useState } from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';

export default function UserWorkspace() {
  const [activeTab, setActiveTab] = useState('kanban');

  const kanbanColumns = [
    { title: 'To Do', items: ['Design Database Schema', 'Setup CI/CD Pipeline', 'Implement Auth Middleware'] },
    { title: 'In Progress', items: ['Build Dashboard Layout', 'Connect Prisma ORM'] },
    { title: 'Review', items: ['API Error Handling', 'Figma Wireframes'] },
    { title: 'Done', items: ['Project Setup', 'Git Repository Init'] }
  ];

  const chatMessages = [
    { author: 'Mark S.', avatar: 'M', text: 'Hey everyone! Let\'s get started on the initial sprints.', time: '10:00 AM', isMe: false },
    { author: 'You', avatar: 'A', text: 'Sounds good. I will start picking up the Dashboard UI tasks today.', time: '10:05 AM', isMe: true },
    { author: 'Sarah C.', avatar: 'S', text: 'I\'ll handle the database schema in the meantime.', time: '10:15 AM', isMe: false }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500 overflow-hidden">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex flex-col h-[calc(100vh-80px)]">
        
        {/* Workspace Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
          <div>
             <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-3">
               Open-Source E-Commerce Framework
               <span className="bg-[#89A8B2]/20 text-[#89A8B2] text-xs font-bold px-2 py-1 rounded-lg top-0 relative ring-1 ring-[#89A8B2]/30">PRIVATE WORKSPACE</span>
             </h1>
             <div className="flex items-center gap-4 text-sm font-semibold text-slate-500">
               <a href="#" className="flex items-center gap-1.5 hover:text-[#89A8B2] transition">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                 github.com/Team/repo
               </a>
               <a href="#" className="flex items-center gap-1.5 hover:text-[#89A8B2] transition">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                 Staging Server
               </a>
             </div>
          </div>
          <div className="flex bg-[#E5E1DA] rounded-xl p-1 border border-[#B3C8CF]/40 shadow-sm w-full md:w-auto">
            <button onClick={() => setActiveTab('kanban')} className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === 'kanban' ? 'bg-[#89A8B2] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Kanban Board</button>
            <button onClick={() => setActiveTab('chat')} className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === 'chat' ? 'bg-[#89A8B2] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Team Chat</button>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 bg-[#E5E1DA] rounded-3xl border border-[#B3C8CF]/40 shadow-sm overflow-hidden flex flex-col mb-10">
          
          {activeTab === 'kanban' && (
            <div className="flex-1 p-6 overflow-x-auto flex gap-6 scrollbar-thin scrollbar-thumb-[#B3C8CF] scrollbar-track-transparent">
              {kanbanColumns.map(col => (
                <div key={col.title} className="w-80 shrink-0 flex flex-col max-h-full">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-slate-800 bg-[#F1F0E8] px-4 py-1.5 rounded-xl border border-[#B3C8CF]/30">{col.title} <span className="text-[#89A8B2] ml-2">{col.items.length}</span></h3>
                     <button className="text-slate-400 hover:text-[#89A8B2]"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg></button>
                  </div>
                  <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-4 scrollbar-none">
                    {col.items.map((item, i) => (
                      <div key={i} className="bg-[#F1F0E8] p-4 rounded-2xl border border-[#B3C8CF]/40 shadow-sm hover:border-[#89A8B2] transition group cursor-grab active:cursor-grabbing">
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] font-bold bg-[#B3C8CF]/20 text-[#89A8B2] px-2 py-0.5 rounded-md">Frontend</span>
                           <span className="w-6 h-6 rounded-full bg-white border border-[#B3C8CF] flex items-center justify-center text-[10px] font-bold text-[#89A8B2]">A</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-[#5e7780] transition">{item}</h4>
                      </div>
                    ))}
                    <button className="w-full py-3 rounded-2xl border-2 border-dashed border-[#B3C8CF]/60 text-slate-500 font-bold hover:bg-[#F1F0E8] hover:border-[#89A8B2] transition text-sm">+ Add Task</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col bg-[#F1F0E8] h-full">
              {/* Chat Canvas */}
              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-400 bg-[#E5E1DA] px-3 py-1 rounded-full">Today</span>
                </div>
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex gap-4 max-w-2xl ${msg.isMe ? 'self-end flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0 shadow-sm ${msg.isMe ? 'bg-[#89A8B2]' : 'bg-[#B3C8CF]'}`}>
                      {msg.avatar}
                    </div>
                    <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-bold text-slate-800 text-sm">{msg.author}</span>
                        <span className="text-xs font-semibold text-slate-400">{msg.time}</span>
                      </div>
                      <div className={`px-5 py-3 rounded-2xl ${msg.isMe ? 'bg-[#89A8B2] text-white rounded-tr-none shadow-md' : 'bg-white border border-[#B3C8CF]/30 text-slate-700 rounded-tl-none shadow-sm'}`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Input Box */}
              <div className="p-4 bg-[#E5E1DA] border-t border-[#B3C8CF]/30">
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-[#B3C8CF]/40 focus-within:ring-2 focus-within:ring-[#89A8B2]/20 focus-within:border-[#89A8B2] transition shadow-sm">
                   <button className="p-2 text-[#B3C8CF] hover:text-[#89A8B2] transition">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                   </button>
                   <input type="text" placeholder="Type your message..." className="flex-1 bg-transparent border-none outline-none font-medium text-slate-800 placeholder-slate-400" />
                   <button className="bg-[#89A8B2] text-white p-2.5 rounded-xl font-bold shadow-sm hover:bg-[#7896a0] transition active:scale-95">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                   </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
