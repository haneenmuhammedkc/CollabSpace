import React from 'react'
import { IconUsers, IconCommunities, IconProjects, IconTeams, IconTrendingUp, IconTrendingDown } from '../AdminComponents/AdminSidebarIcons'

const AdminDashboard = () => {

  return (
    <>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm md:text-base">Monitor platform metrics, user growth, and community engagement.</p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Users', value: '14,239', icon: <IconUsers />, growth: '+12.5%', pos: true },
          { title: 'Active Communities', value: '342', icon: <IconCommunities />, growth: '+5.2%', pos: true },
          { title: 'Projects / Ideas Posted', value: '8,901', icon: <IconProjects />, growth: '+18.1%', pos: true },
          { title: 'Active Teams', value: '1,204', icon: <IconTeams />, growth: '-2.4%', pos: false },
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-xl p-6 flex flex-col gap-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
            
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-[13px] font-semibold uppercase tracking-wide">{m.title}</span>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">{m.icon}</div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{m.value}</div>
            <div className={`text-[13px] flex items-center gap-1.5 font-medium ${m.pos ? 'text-emerald-600' : 'text-rose-600'}`}>
              {m.pos ? <IconTrendingUp /> : <IconTrendingDown />} <span>{m.growth} from last month</span>
            </div>

          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Growth Analytics</h3>
          </div>
          <div className="h-62.5 flex items-end gap-3 sm:gap-6 pb-6 pl-8 border-b border-l border-slate-200 relative mt-4">
            <div className="absolute -left-7 top-0 bottom-6 flex flex-col justify-between text-xs text-slate-400 font-medium">
              <span>4k</span><span>3k</span><span>2k</span><span>1k</span><span>0</span>
            </div>
            <div className="absolute -bottom-6 left-8 right-0 flex justify-between text-xs text-slate-400 font-medium">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
            {[45, 60, 30, 80, 55, 90].map((h, i) => (
              <div className="flex-1 flex items-end justify-center gap-1 sm:gap-2 h-full relative group" key={i}>
                <div className="w-full max-w-6 bg-blue-600 rounded-t-sm transition-all duration-300 group-hover:brightness-110"
                  style={{ height: `${h}%` }}></div>
                <div className="w-full max-w-6 bg-sky-300 rounded-t-sm transition-all duration-300 group-hover:brightness-110"
                  style={{ height: `${h * 0.7}%` }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
          </div>
          <div className="flex flex-col gap-5">
            {[
              { text: <><strong className="text-slate-900">Alex M.</strong> joined the platform</>, time: '2 mins ago', icon: <IconUsers />, bg: 'bg-emerald-100', color: 'text-emerald-600' },
              { text: <>New project <strong className="text-slate-900">React UI Kit</strong> posted</>, time: '1 hour ago', icon: <IconProjects />, bg: 'bg-blue-100', color: 'text-blue-600' },
              { text: <><strong className="text-slate-900">DevOps Masters</strong> community created</>, time: '3 hours ago', icon: <IconCommunities />, bg: 'bg-indigo-100', color: 'text-indigo-600' },
            ].map((activity, i) => (
              <div className="flex gap-4 items-start" key={i}>
                <div className={`w-9 h-9 rounded-full ${activity.bg} ${activity.color} flex items-center justify-center shrink-0`}>
                  {activity.icon}
                </div>
                <div>
                  <p className="m-0 mb-1 text-sm text-slate-700 leading-snug">{activity.text}</p>
                  <span className="text-xs text-slate-500 font-medium">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      
    </>
  )
}

export default AdminDashboard