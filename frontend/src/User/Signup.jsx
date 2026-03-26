import React from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />
      
      <main className="flex-1 w-full px-4 sm:px-8 py-16 flex items-center justify-center">
        
        <div className="w-full max-w-md bg-[#E5E1DA] rounded-[2rem] p-8 md:p-10 border border-[#B3C8CF]/50 shadow-lg relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#B3C8CF]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="relative z-10 text-center mb-8">
             <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#89A8B2] to-[#B3C8CF] rounded-2xl flex items-center justify-center shadow-inner mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
             </div>
             <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Create Account</h1>
             <p className="text-slate-500 font-medium">Join the community and start building.</p>
          </div>

          <form className="relative z-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Full Name</label>
              <input type="text" placeholder="Alex Developer" required className="px-5 py-3.5 bg-[#F1F0E8] border border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <input type="email" placeholder="you@collabspace.dev" required className="px-5 py-3.5 bg-[#F1F0E8] border border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <input type="password" placeholder="••••••••" required className="px-5 py-3.5 bg-[#F1F0E8] border border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium font-sans tracking-widest" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Confirm Password</label>
              <input type="password" placeholder="••••••••" required className="px-5 py-3.5 bg-[#F1F0E8] border border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium font-sans tracking-widest" />
            </div>

            <button type="submit" className="w-full bg-[#89A8B2] text-white py-4 rounded-xl font-bold shadow-md hover:bg-[#7896a0] hover:-translate-y-px transition active:scale-[0.98] mt-2">
              Create Account
            </button>
          </form>

          <div className="relative z-10 flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#B3C8CF]/40"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or register with</span>
            <div className="flex-1 h-px bg-[#B3C8CF]/40"></div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4">
             <button type="button" className="flex items-center justify-center gap-3 bg-white border border-[#B3C8CF]/50 text-slate-700 py-3 rounded-xl font-bold hover:bg-[#F1F0E8] transition shadow-sm">
               <svg className="w-5 h-5 text-slate-800" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path></svg>
               GitHub
             </button>
             <button type="button" className="flex items-center justify-center gap-3 bg-white border border-[#B3C8CF]/50 text-slate-700 py-3 rounded-xl font-bold hover:bg-[#F1F0E8] transition shadow-sm">
               <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path><path fill="none" d="M1 1h22v22H1z"></path></svg>
               Google
             </button>
          </div>

          <p className="relative z-10 text-center text-sm font-semibold text-slate-500 mt-8">
            Already have an account? <a href="/login" className="text-[#89A8B2] hover:underline font-bold transition">Sign in</a>
          </p>

        </div>

      </main>

      <Footer />
    </div>
  );
}
