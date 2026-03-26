import React, { useState } from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';

export default function UserSettings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-10 flex flex-col md:flex-row gap-8">
        
        {/* Settings Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-[#E5E1DA] p-4 rounded-3xl border border-[#B3C8CF]/40 shadow-sm sticky top-28">
            <h2 className="text-xl font-bold text-slate-800 mb-6 px-4 pt-2">Settings</h2>
            <nav className="flex flex-col gap-2">
              {[
                { id: 'profile', label: 'Public Profile' },
                { id: 'account', label: 'Account Security' },
                { id: 'notifications', label: 'Notifications' },
                { id: 'appearance', label: 'Appearance' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${activeTab === tab.id ? 'bg-[#89A8B2] text-white shadow-sm' : 'text-slate-600 hover:bg-[#F1F0E8] hover:text-[#89A8B2]'}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Settings Content */}
        <section className="flex-1">
          <div className="bg-[#E5E1DA] rounded-3xl border border-[#B3C8CF]/40 shadow-sm overflow-hidden">
            
            <div className="p-8 border-b border-[#B3C8CF]/30 bg-[#F1F0E8]/50">
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight capitalize">{activeTab} Settings</h1>
              <p className="text-slate-500 font-medium mt-1">Manage your {activeTab} information and preferences.</p>
            </div>

            <div className="p-8 space-y-8">
              
              {activeTab === 'profile' && (
                <>
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-8 border-b border-[#B3C8CF]/20">
                    <div className="w-24 h-24 bg-[#89A8B2] rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-inner shrink-0">
                      A
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">Profile Avatar</h4>
                      <div className="flex gap-3">
                        <button className="bg-white border-2 border-[#B3C8CF] text-slate-700 px-4 py-2 font-bold rounded-xl hover:border-[#89A8B2] hover:text-[#89A8B2] transition shadow-sm text-sm">Upload New</button>
                        <button className="text-rose-500 font-bold px-4 py-2 rounded-xl border-2 border-transparent hover:bg-rose-50 transition text-sm">Remove</button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">Full Name</label>
                      <input type="text" defaultValue="Alex Developer" className="px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">Display Role</label>
                      <input type="text" defaultValue="Senior Frontend Engineer" className="px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Bio</label>
                    <textarea rows="4" defaultValue="Passionate UI/UX developer and open-source advocate..." className="px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium resize-none"></textarea>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Skills & Expertise (Comma separated)</label>
                    <input type="text" defaultValue="React, TypeScript, Tailwind CSS, System Design" className="px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium" />
                  </div>
                </>
              )}

              {activeTab === 'account' && (
                <>
                  <div className="flex flex-col gap-6 max-w-xl">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-700">Email Address</label>
                      <input type="email" defaultValue="alex@collabspace.dev" className="px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium" />
                    </div>
                    <div className="pt-4 border-t border-[#B3C8CF]/20">
                      <h4 className="font-bold text-slate-800 mb-4">Change Password</h4>
                      <div className="space-y-4">
                        <input type="password" placeholder="Current Password" className="w-full px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium" />
                        <input type="password" placeholder="New Password" className="w-full px-4 py-3 bg-[#F1F0E8] border-2 border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab !== 'profile' && activeTab !== 'account' && (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-[#B3C8CF]/20 rounded-2xl flex items-center justify-center text-[#89A8B2] mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Coming Soon</h3>
                  <p className="text-slate-500 font-medium max-w-xs">{activeTab} preferences are currently disabled in this environment.</p>
                </div>
              )}

            </div>

            <div className="p-6 bg-[#F1F0E8]/50 border-t border-[#B3C8CF]/30 flex justify-end gap-4">
               <button className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-[#E5E1DA] transition">Cancel</button>
               <button className="px-6 py-2.5 rounded-xl font-bold bg-[#89A8B2] text-white shadow-sm hover:bg-[#7896a0] hover:shadow-md hover:-translate-y-px transition">Save Changes</button>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
