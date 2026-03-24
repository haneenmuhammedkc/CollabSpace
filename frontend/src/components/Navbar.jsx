import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-sm group-hover:shadow-blue-500/30 group-hover:-rotate-6 transition-all duration-300">
            <span className="text-white font-bold text-xl leading-none transition-transform duration-300 group-hover:scale-110">C</span>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">CollabSpace</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-300">Log In</a>
          <a href="/signup" className="text-sm font-medium bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-300">Sign Up</a>
        </div>
      </div>
    </nav>
  );
}
