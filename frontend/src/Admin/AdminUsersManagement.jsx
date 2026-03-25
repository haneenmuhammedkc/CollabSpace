import React from 'react';
import { IconSearch, IconEye, IconEdit, IconTrash } from './Icons';

export default function AdminUsersManagement() {
  const users = [
    { id: 1, name: 'Sarah Connor', email: 'sarah@example.com', role: 'Developer', status: 'Active', joined: 'Mar 12, 2024' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'Moderator', status: 'Active', joined: 'Feb 28, 2024' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'Inactive', joined: 'Jan 15, 2024' },
    { id: 4, name: 'Mike Ross', email: 'mike@example.com', role: 'Admin', status: 'Active', joined: 'Dec 05, 2023' },
    { id: 5, name: 'Rachel Zane', email: 'rachel@example.com', role: 'Designer', status: 'Pending', joined: 'Mar 20, 2024' },
  ];

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-slate-900 tracking-tight">Users Management</h1>
          <p className="text-slate-500 text-sm md:text-base">Manage platform users, roles, and access controls.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm rounded-lg px-4 py-2 text-sm font-medium transition duration-200">
          + Invite User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden text-sm md:text-base">
        <div className="flex flex-col sm:flex-row justify-between gap-3 p-5 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center bg-white border border-slate-300 rounded-lg px-3 py-2 w-full sm:w-[300px] focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition duration-200">
            <span className="text-slate-400 scale-90"><IconSearch /></span>
            <input type="text" placeholder="Search users by name or email..." className="bg-transparent border-none outline-none w-full px-2 text-slate-800 placeholder-slate-400 text-sm" />
          </div>
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg px-4 py-2 text-sm font-medium transition duration-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filter
          </button>
        </div>
        
        <div className="overflow-x-auto w-full scrollbar-thin">
          <table className="w-full whitespace-nowrap text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Name</th>
                <th className="py-3 px-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Email</th>
                <th className="py-3 px-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Role</th>
                <th className="py-3 px-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="py-3 px-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Joined Date</th>
                <th className="py-3 px-5 text-slate-500 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-slate-600">{u.email}</td>
                  <td className="py-3 px-5 text-slate-600">{u.role}</td>
                  <td className="py-3 px-5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider
                      ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : ''}
                      ${u.status === 'Pending' ? 'bg-amber-100 text-amber-700' : ''}
                      ${u.status === 'Inactive' ? 'bg-rose-100 text-rose-700' : ''}
                    `}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-slate-500 text-sm">{u.joined}</td>
                  <td className="py-3 px-5">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><IconEye /></button>
                      <button className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><IconEdit /></button>
                      <button className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"><IconTrash /></button>
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
