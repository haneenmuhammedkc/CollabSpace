import React from 'react';
import { IconTrash } from './Icons';

export default function AdminCommunities() {
  const communities = [
    { id: 1, name: 'Frontend Wizards', members: 1245, status: 'Active', desc: 'A place for React, Vue, and Angular enthusiasts to share knowledge and discuss modern frontend architectures.' },
    { id: 2, name: 'Python Data Science', members: 890, status: 'Active', desc: 'Discussions around Pandas, NumPy, Machine Learning algorithms, and data visualization techniques.' },
    { id: 3, name: 'Web3 Builders', members: 432, status: 'Pending', desc: 'New community requesting approval for blockchain developers, smart contract auditors, and crypto enthusiasts.' },
    { id: 4, name: 'UI/UX Innovators', members: 1560, status: 'Active', desc: 'Design systems, Figma plugins, user research, and comprehensive user experience discussions.' },
  ];

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-slate-900 tracking-tight">Communities</h1>
          <p className="text-slate-500 text-sm md:text-base">Review active platforms and approve or moderate new community groups.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2 transition duration-200">
          + Create Community
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {communities.map(c => (
          <div className="bg-white rounded-xl flex flex-col shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200" key={c.id}>
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start mb-3">
                <div className="pr-4">
                  <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">{c.name}</h3>
                  <div className="text-slate-500 text-sm">{c.members.toLocaleString()} members</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                  ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}
                `}>
                  {c.status}
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed m-0 line-clamp-3">{c.desc}</p>
            </div>
            <div className="mt-auto px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center rounded-b-xl">
              <div className="flex gap-2">
                <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-md px-3 py-1.5 text-xs font-medium transition duration-200">Edit</button>
                {c.status === 'Pending' && (
                  <button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm rounded-md px-3 py-1.5 text-xs font-medium transition duration-200">Approve</button>
                )}
              </div>
              <button className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"><IconTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
