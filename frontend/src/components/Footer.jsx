import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 px-8 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center group-hover:rotate-12 transition-all duration-300 group-hover:shadow-md">
            <span className="text-white font-bold text-sm leading-none">C</span>
          </div>
          <span className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">CollabSpace</span>
        </div>
        <div className="flex gap-8 text-sm text-slate-500 font-medium">
          {['About', 'Contact', 'Privacy Policy', 'Terms of Service'].map((link) => (
            <a key={link} href="#" className="relative overflow-hidden group">
              <span className="group-hover:text-blue-600 transition-colors duration-300">{link}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          ))}
        </div>
        <div className="text-sm text-slate-400 hover:text-slate-600 transition-colors duration-300">
          © 2026 CollabSpace. Open Source.
        </div>
      </div>
    </footer>
  );
}
