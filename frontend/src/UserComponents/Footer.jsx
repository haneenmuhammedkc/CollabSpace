import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#E5E1DA]/50 border-t border-[#B3C8CF]/30 py-12 px-8 mt-auto relative z-10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">
        <a href="/" className="flex items-center gap-3 group cursor-pointer no-underline">
          <div className="w-8 h-8 bg-gradient-to-br from-[#89A8B2] to-[#B3C8CF] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-[0_4px_10px_rgba(137,168,178,0.3)] group-hover:-rotate-6 transition-all duration-500 ring-1 ring-[#F1F0E8]/50">
            <span className="text-white font-black text-lg leading-none transition-transform duration-500 group-hover:scale-110">C</span>
          </div>
          <span className="text-xl font-black text-slate-700 tracking-tight group-hover:text-[#5e7780] transition-colors duration-300">CollabSpace</span>
        </a>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[15px] text-slate-600 font-bold">
          {['About', 'Contact', 'Privacy Policy', 'Terms of Service'].map((link) => (
            <a key={link} href="#" className="relative group transition-colors duration-300 py-1 hover:text-[#89A8B2]">
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#89A8B2] rounded-full transition-all duration-300 group-hover:w-full opacity-50"></span>
            </a>
          ))}
        </div>

        <div className="text-[14px] font-semibold text-slate-500 hover:text-[#89A8B2] transition-colors duration-300 cursor-pointer">
          © 2026 CollabSpace. Open Source.
        </div>
      </div>
    </footer>
  );
}