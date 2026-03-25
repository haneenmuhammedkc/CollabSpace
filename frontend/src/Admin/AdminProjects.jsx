import React from 'react';

export default function AdminProjects() {
  const projects = [
    { id: 1, title: 'OpenSource AI Assistant', creator: 'AI Enthusiasts', status: 'Approved', stack: 'Python, React' },
    { id: 2, title: 'Crypto Wallet App', creator: 'FinTech Bros', status: 'Pending', stack: 'React Native, Solidity' },
    { id: 3, title: 'Eco-Tracker Dashboard', creator: 'GreenDevs', status: 'Approved', stack: 'Vue, Node.js' },
    { id: 4, title: 'Local Event Finder', creator: 'Community Makers', status: 'Rejected', stack: 'Flutter, Firebase' },
  ];

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-slate-900 tracking-tight">Projects / Ideas</h1>
          <p className="text-slate-500 text-sm md:text-base">Monitor user submitted projects, feature them, or regulate based on guidelines.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto w-full scrollbar-thin">
          <table className="w-full whitespace-nowrap text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Project Title</th>
                <th className="py-3 px-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Creator / Team</th>
                <th className="py-3 px-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Tech Stack</th>
                <th className="py-3 px-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="py-3 px-5 text-slate-500 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-5 text-slate-900 font-semibold text-sm">{p.title}</td>
                  <td className="py-4 px-5 text-slate-600 text-sm">{p.creator}</td>
                  <td className="py-4 px-5 text-slate-500 text-sm">{p.stack}</td>
                  <td className="py-4 px-5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider
                      ${p.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : ''}
                      ${p.status === 'Pending' ? 'bg-amber-100 text-amber-700' : ''}
                      ${p.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : ''}
                    `}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center justify-end gap-2">
                      <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-md px-3 py-1.5 text-xs font-medium transition duration-200">View</button>
                      {p.status === 'Pending' && (
                        <>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1.5 text-xs font-medium transition duration-200">Approve</button>
                          <button className="bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white rounded-md px-3 py-1.5 text-xs font-medium transition duration-200">Reject</button>
                        </>
                      )}
                      {p.status === 'Approved' && (
                        <button className="bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-md px-3 py-1.5 text-xs font-semibold transition duration-200">Feature</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
