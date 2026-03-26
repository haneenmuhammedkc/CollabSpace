import React, { useState } from 'react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 text-sm md:text-base">Configure global platform parameters, security, and integrations.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
            {[
              { id: 'general', label: 'General Configuration' },
              { id: 'security', label: 'Security & Auth' },
              { id: 'email', label: 'Email Templates' },
              { id: 'billing', label: 'Billing & Plans' },
              { id: 'api', label: 'API Integrations' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                    : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Platform Details</h3>
                <p className="text-slate-500 text-sm mt-1">Update your platform's public information and basic config.</p>
              </div>
              <div className="p-6 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Platform Name</label>
                    <input type="text" defaultValue="CollabSpace" className="px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">Support Email</label>
                    <input type="email" defaultValue="support@collabspace.com" className="px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Platform Description</label>
                  <textarea rows="3" defaultValue="The premier destination for developers to collaborate, share projects, and build teams." className="px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"></textarea>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">Maintenance Mode</span>
                    <span className="text-xs text-slate-500">Disable access for all non-admin users.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">Auto-Approve Projects</span>
                    <span className="text-xs text-slate-500">Automatically approve community project submissions.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 rounded-b-xl flex justify-end gap-3">
                <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition">Cancel</button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 transition">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab !== 'general' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h3>
              <p className="text-slate-500 text-sm max-w-sm">This configuration panel is currently locked or under active development.</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
