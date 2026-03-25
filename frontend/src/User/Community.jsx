import React, { useState } from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';
import CommunityCard from '../UserComponents/CommunityCard';

// Dummy data for communities based on the open-source collaboration focus
const COMMUNITIES = [
    { id: 1, name: "React Developers", members: 12500, category: "Frontend", desc: "A hub for React enthusiasts to share tips, component libraries, and find frontend collaborators.", icon: "⚛️" },
    { id: 2, name: "AI & Machine Learning", members: 8300, category: "AI/ML", desc: "Discuss architectures, share papers, and build the next generation of intelligent open-source tools.", icon: "🤖" },
    { id: 3, name: "UI/UX Innovators", members: 5400, category: "Design", desc: "Where designers and frontend devs bridge the gap. Share Figma files and inspiration for OSS.", icon: "✨" },
    { id: 4, name: "Node.js Core", members: 9100, category: "Backend", desc: "Everything backend. From Express to NestJS, connect with server-side architects here.", icon: "⚙️" },
    { id: 5, name: "Indie Hackers", members: 4200, category: "Startup", desc: "Building SaaS products? Share your progress, get feedback, and find motivated co-founders.", icon: "🚀" },
    { id: 6, name: "Python Scripts & Bots", members: 11000, category: "Backend", desc: "Automate everything. Find teams interested in web scraping, discord bots, and utility scripts.", icon: "🐍" }
];

const CATEGORIES = ["All", "Frontend", "Backend", "AI/ML", "Design", "Startup"]

const Community = () => {
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    // Filter logic
    const filteredCommunities = COMMUNITIES.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeTab === 'All' || c.category === activeTab;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#F1F0E8] font-sans text-slate-800 selection:bg-[#B3C8CF]/50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-36 pb-24 px-8 max-w-7xl mx-auto w-full relative">
                {/* Soft Background Orbs matching Landing Page */}
                <div className="absolute top-20 right-10 w-96 h-96 bg-[#89A8B2] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 pointer-events-none animate-pulse"></div>
                <div className="absolute top-60 left-10 w-80 h-80 bg-[#B3C8CF] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 pointer-events-none animate-pulse delay-700"></div>

                <div className="relative z-10 mb-16 md:text-center max-w-3xl mx-auto flex flex-col items-center">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight mb-6 leading-tight">
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6e8a93] to-[#B3C8CF]">Communities</span>
                    </h1>
                    <p className="text-xl text-slate-600 font-medium">Find your tribe. Connect with developers in specific, topic-based hubs.</p>
                </div>

                {/* Search and Filters Strip */}
                <div className="relative z-10 flex flex-col md:flex-row gap-6 mb-16 items-center justify-between bg-[#E5E1DA]/60 p-4 rounded-3xl border border-[#B3C8CF]/30 backdrop-blur-md shadow-sm ring-1 ring-white/30">
                    <div className="relative w-full md:w-[400px]">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#89A8B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input
                            type="text"
                            placeholder="Search by name or topic..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#F1F0E8]/80 focus:bg-white text-slate-800 placeholder-[#89A8B2]/70 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-[#89A8B2]/50 transition-all font-semibold border border-transparent focus:border-[#B3C8CF] shadow-sm"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 ${activeTab === cat ? 'bg-[#89A8B2] text-white shadow-md shadow-[#89A8B2]/20 scale-105' : 'bg-white/50 text-slate-600 hover:bg-white hover:text-[#89A8B2] border border-[#B3C8CF]/20'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Community Cards Grid */}
                <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCommunities.length > 0 ? (
                        filteredCommunities.map((community, idx) => (
                            <div key={community.id} className="animate-[fade-in-up_0.5s_ease-out_forwards]" style={{ animationDelay: `${idx * 75}ms`, opacity: 0 }}>
                                <CommunityCard community={community} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center animate-[fade-in-up_0.4s_ease-out_forwards]">
                            <div className="w-20 h-20 bg-[#E5E1DA] rounded-3xl mx-auto flex items-center justify-center text-[#89A8B2] mb-5 shadow-sm ring-1 ring-[#B3C8CF]/30">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">No hubs found</h3>
                            <p className="text-slate-600 font-medium">We couldn't find any community matching "{search}".</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            {/* Global Inline Animation Styles */}
            <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default Community;