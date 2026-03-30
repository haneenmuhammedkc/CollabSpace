import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#B3C8CF]/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight mb-6 drop-shadow-sm">Code Alone. <br/><span className="text-[#89A8B2]">Build Together.</span></h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            CollabSpace is the definitive platform for developers to share open-source ideas, recruit passionate peers, and create incredible software as a unified team.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#E5E1DA] p-10 rounded-3xl border border-[#B3C8CF]/40 shadow-sm hover:-translate-y-1 transition duration-500">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#89A8B2] shadow-sm border border-[#B3C8CF]/30 mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed font-medium">To radically simplify the process of open-source collaboration by providing a centralized hub where great ideas can automatically find the exact engineering talent they need to flourish.</p>
          </div>
          <div className="bg-[#E5E1DA] p-10 rounded-3xl border border-[#B3C8CF]/40 shadow-sm hover:-translate-y-1 transition duration-500">
             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#89A8B2] shadow-sm border border-[#B3C8CF]/30 mb-6">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed font-medium">We envision a world where every developer, regardless of geography or background, has instantaneous access to high-quality mentorship, dynamic teams, and groundbreaking projects.</p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-[#E5E1DA] rounded-[2.5rem] p-10 md:p-16 border border-[#B3C8CF]/40 shadow-sm text-center">
           <h2 className="text-3xl font-bold text-slate-800 mb-12">Platform Highlights</h2>
           
           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Project Boards', desc: 'Discover trending open-source architectures.' },
                { title: 'Niche Communities', desc: 'Join specific tech-stack focused hubs.' },
                { title: 'Real-time Workspaces', desc: 'Kanban boards and chat for your teams.' },
                { title: 'Portfolio Building', desc: 'Showcase verified contributions instantly.' }
              ].map((feat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-4xl font-black text-[#89A8B2] mb-4 opacity-50">0{i+1}</span>
                  <h4 className="font-bold text-slate-800 mb-2">{feat.title}</h4>
                  <p className="text-sm text-slate-500 font-medium">{feat.desc}</p>
                </div>
              ))}
           </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default About