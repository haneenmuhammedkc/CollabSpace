import React, { useState } from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';

export default function ProjectDetail() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    { title: 'Frontend Developer', desc: 'React, Tailwind CSS, Component Architecture', open: true },
    { title: 'Backend Developer', desc: 'Node.js, Express, PostgreSQL design', open: true },
    { title: 'UI/UX Designer', desc: 'Figma prototypes and user flow planning', open: false }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-10">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex gap-2 text-sm font-bold text-slate-500">
          <a href="/projects" className="hover:text-[#89A8B2] transition">Projects</a>
          <span>/</span>
          <span className="text-slate-800">E-Commerce Framework</span>
        </div>

        {/* Header Content */}
        <div className="bg-[#E5E1DA] p-8 md:p-12 rounded-3xl border border-[#B3C8CF]/40 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#B3C8CF]/30 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-2xl">
              <div className="flex gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#89A8B2]/20 text-[#89A8B2] ring-1 ring-[#89A8B2]/30 px-3 py-1 rounded-full">Recruiting</span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#F1F0E8] text-slate-500 border border-[#B3C8CF]/30 px-3 py-1 rounded-full">Open Source</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4 drop-shadow-sm leading-tight">Open-Source E-Commerce Framework</h1>
              <p className="text-lg text-slate-600 font-medium mb-6">A fully headless, API-first commerce engine built for the modern web, running on React and Node.js.</p>
              
              <div className="flex items-center gap-4 border-t border-[#B3C8CF]/30 pt-6 mt-2">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-[#B3C8CF]/50 flex items-center justify-center font-bold text-xl text-[#89A8B2] shrink-0">
                  M
                </div>
                <div>
                   <h4 className="font-bold text-slate-800 text-sm">Created by Mark S.</h4>
                   <p className="text-xs text-slate-500 font-semibold">Posted on Aug 24, 2026</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col gap-4">
               <button 
                 onClick={() => {
                   setSelectedRole(roles[0].title);
                   setIsApplyModalOpen(true);
                 }}
                 className="bg-[#89A8B2] text-white px-8 py-4 rounded-2xl font-bold shadow-md hover:shadow-lg hover:bg-[#7896a0] hover:-translate-y-1 transition active:scale-95 text-center flex justify-center items-center gap-2"
                >
                 Apply for Role
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
               </button>
               <button className="bg-white border-2 border-[#B3C8CF] text-slate-700 px-8 py-3.5 rounded-2xl font-bold hover:border-[#89A8B2] hover:text-[#89A8B2] transition shadow-sm text-center">Save Project</button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#E5E1DA] p-8 rounded-3xl border border-[#B3C8CF]/30 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b border-[#B3C8CF]/30 pb-4">Project Details</h3>
              
              {/* Markdown content simulation */}
              <div className="prose prose-slate prose-headings:text-slate-800 prose-a:text-[#89A8B2] max-w-none text-slate-600 font-medium leading-relaxed">
                <p>We are building a highly decoupled, headless commerce engine. Existing solutions like Shopify or WooCommerce are great, but they are incredibly monolithic and hard to customize without severe vendor lock-in.</p>
                <p><strong>The Goal:</strong> Create a completely open-source, API-first architecture where the storefront is entirely separate from the back-office management.</p>
                <h4>Tech Stack</h4>
                <ul>
                  <li><strong>Frontend Store:</strong> Next.js 16, Tailwind CSS, Radix Primitives</li>
                  <li><strong>Backend API:</strong> Node.js, Express, TypeScript</li>
                  <li><strong>Database:</strong> PostgreSQL with Prisma ORM</li>
                </ul>
                <p>If you're interested in building scalable architectures and have experience with e-commerce constraints (inventory, variations, complex tax calculations), we'd love to have you on board!</p>
              </div>
            </div>

            <div className="bg-[#E5E1DA] p-8 rounded-3xl border border-[#B3C8CF]/30 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-[#B3C8CF]/30 pb-4">Discussion</h3>
              
              <div className="flex gap-4 mb-8">
                 <div className="w-10 h-10 bg-[#89A8B2] rounded-xl text-white flex items-center justify-center font-bold shrink-0 shadow-inner">U</div>
                 <div className="flex-1 flex flex-col gap-2">
                   <textarea rows="2" placeholder="Ask a question or share your thoughts..." className="w-full px-4 py-3 bg-[#F1F0E8] border border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium resize-none"></textarea>
                   <button className="bg-[#89A8B2] text-white px-6 py-2 rounded-xl font-bold shadow-sm hover:bg-[#7896a0] transition self-end">Leave Comment</button>
                 </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-[#B3C8CF]/50 rounded-xl text-[#89A8B2] flex items-center justify-center font-bold shrink-0 shadow-sm">J</div>
                  <div>
                    <div className="bg-[#F1F0E8] p-4 rounded-xl rounded-tl-none border border-[#B3C8CF]/30">
                      <h5 className="font-bold text-slate-800 text-sm mb-1">Jessica K. <span className="font-medium text-slate-400 ml-2 font-normal">1 day ago</span></h5>
                      <p className="text-slate-600 text-sm">Are you planning on supporting multiple payment gateways simultaneously, or just Stripe for the MVP?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-1 space-y-8">
            
            <div className="bg-[#E5E1DA] p-6 rounded-3xl border border-[#B3C8CF]/30 shadow-sm sticky top-28">
              <h3 className="font-bold text-slate-800 mb-4 border-b border-[#B3C8CF]/30 pb-2">Open Roles</h3>
              <div className="flex flex-col gap-4">
                {roles.map((role, i) => (
                  <div key={i} className={`p-4 rounded-2xl border ${role.open ? 'bg-[#F1F0E8] border-[#B3C8CF]/50 hover:border-[#89A8B2] cursor-pointer group' : 'bg-slate-50/50 border-slate-200 opacity-60'}`} onClick={() => {
                    if(role.open) { setSelectedRole(role.title); setIsApplyModalOpen(true); }
                  }}>
                    <div className="flex justify-between items-start mb-2">
                       <h4 className={`font-bold ${role.open ? 'text-slate-800 group-hover:text-[#5e7780] transition' : 'text-slate-500'}`}>{role.title}</h4>
                       {role.open ? <span className="w-2 h-2 rounded-full bg-[#89A8B2] shrink-0 mt-1.5 shadow-[0_0_8px_rgba(137,168,178,0.8)]"></span> : <span className="text-xs bg-slate-200 text-slate-500 px-2 py-0.5 rounded-lg font-bold">Filled</span>}
                    </div>
                    <p className={`text-xs font-medium ${role.open ? 'text-slate-600' : 'text-slate-400'}`}>{role.desc}</p>
                    {role.open && <button className="text-xs font-bold text-[#89A8B2] mt-3 group-hover:underline">Click to apply →</button>}
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-slate-800 mb-4 border-b border-[#B3C8CF]/30 pb-2 mt-8">Project Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'PostgreSQL', 'E-Commerce'].map(tag => (
                   <span key={tag} className="text-[11px] font-bold text-[#89A8B2] bg-[#F1F0E8] px-3 py-1.5 rounded-lg border border-[#B3C8CF]/30">#{tag}</span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Application Modal Overlay */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 bg-[#F1F0E8]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#E5E1DA] w-full max-w-lg rounded-[2rem] border border-[#B3C8CF]/50 shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-8 border-b border-[#B3C8CF]/30 bg-[#F1F0E8]/50 flex justify-between items-start">
               <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">Apply to Join</h2>
                  <p className="text-slate-500 font-semibold text-sm">Role: <span className="text-[#89A8B2]">{selectedRole}</span></p>
               </div>
               <button onClick={() => setIsApplyModalOpen(false)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition shadow-sm border border-[#B3C8CF]/30 font-bold">✕</button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Why are you a good fit?</label>
                <textarea rows="4" placeholder="Briefly describe your relevant experience..." className="px-4 py-3 bg-[#F1F0E8] border border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium resize-none"></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Portfolio / GitHub Link</label>
                <input type="url" placeholder="https://github.com/yourusername" className="px-4 py-3 bg-[#F1F0E8] border border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium" />
              </div>
              <button 
                onClick={() => setIsApplyModalOpen(false)}
                className="w-full bg-[#89A8B2] text-white py-4 rounded-xl font-bold shadow-md hover:bg-[#7896a0] active:scale-[0.98] transition mt-2"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
