import React, { useEffect, useState } from 'react';

const NavLink = ({ href, children }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (href === '/') {
      setIsActive(window.location.pathname === '/');
    } else {
      setIsActive(window.location.pathname.startsWith(href));
    }
  }, [href]);

  return (
    <a href={href} className={`relative group text-[15px] font-bold transition-colors duration-300 py-1 ${isActive ? 'text-[#89A8B2]' : 'text-slate-600 hover:text-[#89A8B2]'}`}>
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#89A8B2] rounded-full"></span>
      )}
      {!isActive && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#89A8B2] rounded-full transition-all duration-300 group-hover:w-full opacity-50"></span>
      )}
    </a>
  );
};

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-500 bg-[#F1F0E8]/70 backdrop-blur-lg border-b border-[#B3C8CF]/30 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        <a href="/" className="flex items-center gap-3 group cursor-pointer no-underline w-1/4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#89A8B2] to-[#B3C8CF] rounded-xl flex items-center justify-center shadow-[0_4px_10px_rgba(137,168,178,0.2)] group-hover:shadow-[0_6px_15px_rgba(137,168,178,0.4)] group-hover:-rotate-6 transition-all duration-500 ring-1 ring-[#F1F0E8]/50">
            <span className="text-white font-black text-2xl leading-none transition-transform duration-500 group-hover:scale-110">C</span>
          </div>
          <span className="hidden sm:block text-2xl font-black text-slate-800 tracking-tight group-hover:text-[#5e7780] transition-colors duration-300">CollabSpace</span>
        </a>

        {/* Center Links Section */}
        <div className="hidden md:flex items-center justify-center gap-8 w-2/4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/communities">Communities</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/teams">Teams</NavLink>
        </div>

        {/* Right Auth Section */}
        <div className="flex items-center justify-end gap-5 sm:gap-8 w-3/4 sm:w-1/4">
          <a href="/login" className="text-[15px] font-bold text-slate-600 hover:text-[#89A8B2] hover:-translate-y-0.5 transition-all duration-300">Log In</a>
          <a href="/signup" className="text-[15px] font-bold bg-[#89A8B2] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-[#7896a0] hover:shadow-lg hover:shadow-[#89A8B2]/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 whitespace-nowrap">Sign Up</a>
        </div>
      </div>
    </nav>
  );
}