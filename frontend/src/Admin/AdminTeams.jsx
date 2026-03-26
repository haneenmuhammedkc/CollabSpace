import React from 'react'
import { IconUsers } from '../AdminComponents/AdminSidebarIcons'

export default function AdminTeams() {
  const teams = [
    { id: 1, name: 'Alpha Squad', project: 'OpenSource AI Assistant', size: 5, status: 'Active' },
    { id: 2, name: 'Beta Builders', project: 'Eco-Tracker Dashboard', size: 3, status: 'Active' },
    { id: 3, name: 'Gamma Force', project: 'Crypto Wallet App', size: 4, status: 'Forming' },
  ];

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-slate-900 tracking-tight">Teams</h1>
          <p className="text-slate-500 text-sm md:text-base">Manage the collaborating teams currently active on projects.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teams.map(t => (
          <div className="bg-white rounded-xl p-6 flex flex-col shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200" key={t.id}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">{t.name}</h3>
                <div className="text-slate-500 text-xs">Project: <span className="font-medium text-slate-700">{t.project}</span></div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                ${t.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}
              `}>
                {t.status}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-600 bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm font-medium mb-4">
              <span className="text-blue-600 scale-90"><IconUsers /></span> {t.size} Active Members
            </div>
            
            <div className="mt-auto">
              <button className="w-full justify-center flex items-center bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg px-4 py-2 text-sm font-medium transition duration-200">
                Manage Team
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
