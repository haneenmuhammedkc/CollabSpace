import React from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';

export default function UserDashboard() {
  const stats = [
    { label: 'Projects Joined', value: '3' },
    { label: 'Communities', value: '5' },
    { label: 'Network Reach', value: '142' },
  ];

  const feedItems = [
    {
      id: 1,
      type: 'project',
      author: 'Alex M.',
      authorAvatar: 'A',
      title: 'React Native E-commerce Template',
      desc: 'Looking for a UI designer to help finalize the component structures for this open source React Native kit. We have 3 contributors already!',
      tags: ['React Native', 'UI/UX', 'Mobile'],
      time: '2 hours ago',
      likes: 14,
      comments: 3
    },
    {
      id: 2,
      type: 'post',
      community: 'Frontend Wizards',
      author: 'Sarah Connor',
      authorAvatar: 'S',
      title: 'What state management are you using in 2026?',
      desc: 'With Context API getting better and Zustand/Zotai being so minimal, is anyone still defaulting to Redux Toolkit for medium sized apps?',
      time: '5 hours ago',
      likes: 32,
      comments: 18
    },
    {
      id: 3,
      type: 'project',
      author: 'DevOps Master',
      authorAvatar: 'D',
      title: 'Automated K8s Deployment Script',
      desc: 'Just published a robust script for zero-downtime node deployments on Kubernetes. Seeking testers and maintainers.',
      tags: ['DevOps', 'Kubernetes', 'Bash'],
      time: '1 day ago',
      likes: 45,
      comments: 8
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-24 transition-colors duration-500">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Feed Column */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Welcome & Stats */}
          <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center bg-[#E5E1DA] p-6 md:p-8 rounded-3xl border border-[#B3C8CF]/40 shadow-sm relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#B3C8CF]/30 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Welcome back, Developer!</h1>
              <p className="text-slate-600 font-medium">Ready to build something amazing today?</p>
            </div>
            <div className="flex gap-4 w-full sm:w-auto relative z-10">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center bg-[#F1F0E8]/80 backdrop-blur-sm px-4 py-3 rounded-2xl flex-1 sm:flex-auto border border-[#B3C8CF]/20">
                  <span className="text-2xl font-black text-[#89A8B2]">{stat.value}</span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feed Header */}
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-bold text-slate-800">Your Activity Feed</h2>
            <div className="flex gap-2">
              <button className="text-sm font-semibold bg-[#B3C8CF]/30 text-[#4c626a] px-4 py-1.5 rounded-full hover:bg-[#89A8B2] hover:text-white transition">All</button>
              <button className="text-sm font-semibold text-slate-500 hover:text-[#89A8B2] px-4 py-1.5 transition">Projects</button>
            </div>
          </div>

          {/* Feed List */}
          <div className="flex flex-col gap-6">
            {feedItems.map(item => (
              <div key={item.id} className="bg-[#E5E1DA] p-6 sm:p-8 rounded-3xl border border-[#B3C8CF]/30 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#89A8B2] text-white flex items-center justify-center font-bold text-xl shadow-inner">
                    {item.authorAvatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      {item.author} 
                      {item.type === 'post' && <span className="text-xs font-semibold text-[#89A8B2] bg-[#89A8B2]/10 px-2 py-0.5 rounded-full">in {item.community}</span>}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">{item.time}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#5e7780] transition-colors">{item.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{item.desc}</p>
                
                {item.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold text-[#5e7780] bg-[#F1F0E8] border border-[#B3C8CF]/40 px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                )}

                <div className="flex gap-6 border-t border-[#B3C8CF]/30 pt-4">
                  <button className="flex items-center gap-2 text-slate-500 hover:text-[#89A8B2] font-semibold text-sm transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                    {item.likes}
                  </button>
                  <button className="flex items-center gap-2 text-slate-500 hover:text-[#89A8B2] font-semibold text-sm transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    {item.comments}
                  </button>
                  <div className="flex-1"></div>
                  {item.type === 'project' && (
                    <button className="text-sm font-bold bg-[#89A8B2] text-white px-4 py-1.5 rounded-xl hover:bg-[#7896a0] hover:-translate-y-px transition shadow-sm">View Roles</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          <div className="bg-[#E5E1DA] rounded-3xl p-6 border border-[#B3C8CF]/30 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#89A8B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              Trending Communities
            </h3>
            <div className="flex flex-col gap-4">
              {['Frontend Wizards', 'AI / Machine Learning', 'UI/UX Innovators'].map((c, i) => (
                <a href={`/communities/${i}`} key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F1F0E8] border border-[#B3C8CF]/50 flex items-center justify-center font-bold text-[#89A8B2] group-hover:bg-[#89A8B2] group-hover:text-white transition">
                      #
                    </div>
                    <span className="font-semibold text-slate-700 group-hover:text-[#5e7780] transition">{c}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-[#F1F0E8] px-2 py-1 rounded-lg">Join</span>
                </a>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 rounded-xl border-2 border-[#B3C8CF]/50 text-[#5e7780] font-bold hover:bg-[#B3C8CF]/20 hover:border-[#89A8B2] transition">Explore more</button>
          </div>

          <div className="bg-[#E5E1DA] rounded-3xl p-6 border border-[#B3C8CF]/30 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#89A8B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
              Suggested Projects
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { title: 'Local Event Finder', roles: 'Frontend, UI', tags: ['React', 'Tailwind'] },
                { title: 'Markdown Note App', roles: 'Backend, QA', tags: ['Node', 'Express'] }
              ].map((p, i) => (
                <a href={`/projects/${i}`} key={i} className="flex flex-col p-4 rounded-2xl bg-[#F1F0E8] border border-[#B3C8CF]/30 hover:border-[#89A8B2] hover:shadow-md transition-all group">
                  <h4 className="font-bold text-slate-800 group-hover:text-[#5e7780] mb-1">{p.title}</h4>
                  <p className="text-xs text-slate-500 font-medium mb-3">Needed: {p.roles}</p>
                  <div className="flex gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="text-[10px] font-bold text-[#89A8B2] bg-[#B3C8CF]/20 px-2 py-0.5 rounded-md">{t}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 rounded-xl bg-[#89A8B2] text-white font-bold hover:bg-[#7896a0] hover:shadow-lg transition">View all projects</button>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
