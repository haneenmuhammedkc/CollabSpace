import React from 'react';

const CommunityCard = ({ community }) => (
    <div className="bg-[#E5E1DA] p-8 border border-[#B3C8CF]/40 rounded-[2rem] hover:border-[#89A8B2] hover:shadow-[0_10px_30px_rgba(137,168,178,0.15)] hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#F1F0E8]/70 to-transparent rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-[#F1F0E8] rounded-2xl flex items-center justify-center text-3xl shadow-sm ring-1 ring-[#B3C8CF]/50 group-hover:ring-0 group-hover:bg-gradient-to-br group-hover:from-[#89A8B2] group-hover:to-[#B3C8CF] transition-all duration-500">
                    <span className="group-hover:scale-110 transition-transform duration-300">{community.icon}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-[#5e7780] bg-[#B3C8CF]/30 px-3 py-1.5 rounded-full mb-2">{community.category}</span>
                    <span className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#89A8B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        {(community.members / 1000).toFixed(1)}k
                    </span>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-[#6e8a93] transition-colors">{community.name}</h3>
            <p className="text-slate-600 leading-relaxed mb-8 flex-grow">{community.desc}</p>

            <button className="w-full py-3.5 rounded-xl font-bold text-white bg-[#89A8B2] hover:bg-[#7896a0] hover:shadow-lg hover:shadow-[#89A8B2]/30 active:scale-95 transition-all duration-300 mt-auto cursor-pointer">
                Join Hub
            </button>
        </div>
    </div>
);

export default CommunityCard;