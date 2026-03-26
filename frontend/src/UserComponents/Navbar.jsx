import React, { useEffect, useState } from 'react';

const NavLink = ({ href, children, mobile = false, setMobileMenuOpen }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (href === '/') {
      setIsActive(window.location.pathname === '/');
    } else {
      setIsActive(window.location.pathname.startsWith(href));
    }
  }, [href]);

  return (
    <a 
      href={href} 
      onClick={() => mobile && setMobileMenuOpen(false)}
      className={`relative group font-bold transition-colors duration-300 py-2 ${mobile ? 'text-2xl text-center' : 'text-[15px]'} ${isActive ? 'text-[#89A8B2]' : 'text-slate-600 hover:text-[#89A8B2]'}`}
    >
      {children}
      {!mobile && isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#89A8B2] rounded-full"></span>
      )}
      {!mobile && !isActive && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#89A8B2] rounded-full transition-all duration-300 group-hover:w-full opacity-50"></span>
      )}
    </a>
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed w-full z-50 top-0 transition-all duration-500 bg-[#F1F0E8]/70 backdrop-blur-lg border-b border-[#B3C8CF]/30 px-6 sm:px-8 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
          <a href="/" className="flex items-center gap-3 group cursor-pointer no-underline w-auto lg:w-1/4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#89A8B2] to-[#B3C8CF] rounded-xl flex items-center justify-center shadow-[0_4px_10px_rgba(137,168,178,0.2)] group-hover:shadow-[0_6px_15px_rgba(137,168,178,0.4)] group-hover:-rotate-6 transition-all duration-500 ring-1 ring-[#F1F0E8]/50 shrink-0">
              <span className="text-white font-black text-2xl leading-none transition-transform duration-500 group-hover:scale-110">C</span>
            </div>
            <span className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight group-hover:text-[#5e7780] transition-colors duration-300">CollabSpace</span>
          </a>

          {/* Desktop Center Links */}
          <div className="hidden lg:flex items-center justify-center gap-8 w-2/4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/communities">Communities</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/teams">Teams</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center justify-end gap-5 sm:gap-8 w-1/4">
            <a href="/login" className="text-[15px] font-bold text-slate-600 hover:text-[#89A8B2] hover:-translate-y-0.5 transition-all duration-300">Log In</a>
            <a href="/signup" className="text-[15px] font-bold bg-[#89A8B2] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-[#7896a0] hover:shadow-lg hover:shadow-[#89A8B2]/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 whitespace-nowrap">Sign Up</a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-[#89A8B2] hover:bg-[#B3C8CF]/20 rounded-lg transition-colors z-50 relative"
            >
              {isMobileMenuOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#F1F0E8]/95 backdrop-blur-md z-40 transition-all duration-300 lg:hidden flex flex-col items-center justify-center gap-6 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-6 w-full px-8 mt-12">
          <NavLink href="/" mobile setMobileMenuOpen={setIsMobileMenuOpen}>Home</NavLink>
          <NavLink href="/dashboard" mobile setMobileMenuOpen={setIsMobileMenuOpen}>Dashboard</NavLink>
          <NavLink href="/communities" mobile setMobileMenuOpen={setIsMobileMenuOpen}>Communities</NavLink>
          <NavLink href="/projects" mobile setMobileMenuOpen={setIsMobileMenuOpen}>Projects</NavLink>
          <NavLink href="/teams" mobile setMobileMenuOpen={setIsMobileMenuOpen}>Teams</NavLink>
          
          <div className="flex flex-col w-full gap-4 mt-8 pt-8 border-t border-[#B3C8CF]/30">
            <a href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center text-xl font-bold border-2 border-[#89A8B2] text-[#89A8B2] rounded-2xl hover:bg-[#89A8B2]/10 transition-colors">Log In</a>
            <a href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center text-xl font-bold bg-[#89A8B2] text-white rounded-2xl shadow-lg shadow-[#89A8B2]/30 active:scale-95 transition-all">Sign Up</a>
          </div>
        </div>
      </div>
    </>
  );
}