import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { IconBell, IconDashboard, IconUsers, IconCommunities, IconProjects, IconTeams, IconReports, IconSettings } from './AdminSidebarIcons'

const AdminSidebar = () => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => setSidebarOpen(false), [location.pathname])

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <IconDashboard /> },
    { name: 'Users Management', path: '/admin/users', icon: <IconUsers /> },
    { name: 'Communities', path: '/admin/communities', icon: <IconCommunities /> },
    { name: 'Projects', path: '/admin/projects', icon: <IconProjects /> },
    { name: 'Teams', path: '/admin/teams', icon: <IconTeams /> },
    { name: 'Reports', path: '/admin/reports', icon: <IconReports /> },
    { name: 'Notifications', path: '/admin/notifications', icon: <IconBell /> },
    { name: 'Settings', path: '/admin/settings', icon: <IconSettings /> },
  ]

  const isActive = (path) =>
    location.pathname === path ||
    (path !== '/admin' && location.pathname.startsWith(path))

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">

      {sidebarOpen && ( <div className="fixed inset-0 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} /> )}

      <aside className={`w-64 bg-slate-900 text-slate-300 fixed md:relative h-full transform transition
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

        <div className="p-5 text-white font-bold border-b border-slate-800"> COLLABSPACE </div>

        <nav className="p-3 space-y-1">
          {menuItems.map(item => (
            <Link key={item.name} to={item.path} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
              isActive(item.path) ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'
            }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1">
        <div className="p-4 md:p-6 overflow-y-auto"> <Outlet /> </div>
      </main>
    </div>
  )
}

export default AdminSidebar