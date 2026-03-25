import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  IconMenu, IconSearch, IconBell, IconDashboard, IconUsers,
  IconCommunities, IconProjects, IconTeams, IconReports, IconSettings
} from './Icons';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setSidebarOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <IconDashboard /> },
    { name: 'Users Management', path: '/admin/users', icon: <IconUsers /> },
    { name: 'Communities', path: '/admin/communities', icon: <IconCommunities /> },
    { name: 'Projects / Ideas', path: '/admin/projects', icon: <IconProjects /> },
    { name: 'Teams', path: '/admin/teams', icon: <IconTeams /> },
    { name: 'Reports & Analytics', path: '/admin/reports', icon: <IconReports /> },
    { name: 'Notifications', path: '/admin/notifications', icon: <IconBell /> },
    { name: 'Settings', path: '/admin/settings', icon: <IconSettings /> },
  ];

  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 transition-opacity md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`w-[260px] bg-slate-900 text-slate-300 flex flex-col md:relative fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 text-xl font-bold flex items-center gap-3 border-b border-slate-800 text-white tracking-tight">
          <IconDashboard />
          <span>CollabSpace</span>
        </div>
        <nav className="flex-1 py-6 overflow-y-auto flex flex-col px-3 gap-1 scrollbar-thin scrollbar-thumb-slate-700">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 font-medium ${isActive ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-slate-800 hover:text-white group'}`}
              >
                <div className={`transition-opacity duration-200 ${isActive ? 'opacity-100 text-white' : 'opacity-70 text-slate-400 group-hover:opacity-100 group-hover:text-slate-300'}`}>
                  {item.icon}
                </div>
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-[72px] bg-white flex items-center justify-between px-4 md:px-8 border-b border-slate-200 z-10 shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Menu"
            >
              <IconMenu />
            </button>
            <div className="relative hidden sm:block">
              <div className="flex items-center bg-slate-100 border border-transparent rounded-lg px-3 py-2 w-[320px] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition duration-200">
                <span className="text-slate-400 mr-2"><IconSearch /></span>
                <input 
                  type="text" 
                  placeholder="Search modules..." 
                  className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-400 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>

              {isSearchFocused && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 max-h-64 overflow-y-auto">
                  {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                      <div 
                        key={item.name}
                        className="px-4 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-3 transition-colors"
                        onMouseDown={(e) => {
                          e.preventDefault(); // prevent blur
                          navigate(item.path);
                          setSearchQuery('');
                          setIsSearchFocused(false);
                        }}
                      >
                        <span className="text-blue-600 scale-90">{item.icon}</span>
                        <span className="text-sm font-medium text-slate-700">{item.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-slate-500 text-center">
                      No matching modules found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer p-1 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">A</div>
              <div className="hidden md:flex flex-col pr-2">
                <span className="text-sm font-semibold text-slate-900 leading-tight">Admin User</span>
                <span className="text-xs text-slate-500">Superadmin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-slate-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
