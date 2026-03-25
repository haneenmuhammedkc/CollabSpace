import React from 'react';
import { IconBell, IconProjects, IconUsers } from './Icons';

export default function AdminNotifications() {
  const notifications = [
    { id: 1, type: 'alert', title: 'Server Load Warning', desc: 'Database server CPU exceeded 85% for 10 minutes.', time: '10 mins ago', read: false },
    { id: 2, type: 'user', title: 'New Admin Request', desc: 'Mike Ross has requested administrator privileges.', time: '1 hour ago', read: false },
    { id: 3, type: 'project', title: 'Flagged Content', desc: 'A new project "Crypto Wallet App" has been auto-flagged for review.', time: '3 hours ago', read: false },
    { id: 4, type: 'system', title: 'Scheduled Maintenance', desc: 'System update v2.4.1 completed successfully.', time: 'Yesterday', read: true },
    { id: 5, type: 'user', title: 'High Registration Velocity', desc: 'Detected 500+ new signups in the last hour.', time: 'Yesterday', read: true },
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'user': return <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><IconUsers /></div>;
      case 'project': return <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0"><IconProjects /></div>;
      case 'alert': return <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0"><IconBell /></div>;
      default: return <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><IconBell /></div>;
    }
  }

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-slate-900 tracking-tight">Notifications</h1>
          <p className="text-slate-500 text-sm md:text-base">System alerts, moderation requests, and administrative notifications.</p>
        </div>
        <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm rounded-lg px-4 py-2 text-sm font-medium transition duration-200">
          Mark All as Read
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          <button className="px-6 py-4 text-sm font-semibold text-blue-600 border-b-2 border-blue-600">All (5)</button>
          <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-700 transition">Unread (3)</button>
          <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-700 transition">System Alerts</button>
        </div>
        
        <div className="divide-y divide-slate-100">
          {notifications.map(n => (
            <div key={n.id} className={`p-5 flex gap-4 transition duration-150 hover:bg-slate-50 ${!n.read ? 'bg-blue-50/30' : ''}`}>
              {getIcon(n.type)}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-sm ${!n.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                    {n.title}
                  </h4>
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap ml-4">{n.time}</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{n.desc}</p>
                {!n.read && (
                  <div className="flex gap-3">
                    <button className="text-blue-600 text-xs font-semibold hover:underline">Review</button>
                    <button className="text-slate-500 text-xs font-medium hover:underline">Dismiss</button>
                  </div>
                )}
              </div>
              {!n.read && (
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
