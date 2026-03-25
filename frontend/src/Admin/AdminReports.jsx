import React from 'react';
import { IconReports } from './Icons';

export default function AdminReports() {
  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-slate-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-slate-500 text-sm md:text-base">Comprehensive insights, usage data, and data exports.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm rounded-lg px-4 py-2 text-sm font-medium transition duration-200">
            Export CSV
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm rounded-lg px-4 py-2 text-sm font-medium transition duration-200">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">User Acquisition</h3>
          <div className="h-[250px] flex items-end gap-3 sm:gap-6 pb-6 pl-8 border-b border-l border-slate-200 relative">
            <div className="absolute -left-7 top-0 bottom-6 flex flex-col justify-between text-xs text-slate-400 font-medium">
              <span>200</span><span>150</span><span>100</span><span>50</span><span>0</span>
            </div>
            <div className="absolute -bottom-6 left-8 right-0 flex justify-between text-xs text-slate-400 font-medium">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
            {[60, 40, 80, 50, 90, 100, 70].map((h, i) => (
              <div className="flex-1 flex items-end justify-center gap-1 sm:gap-2 h-full relative group" key={i}>
                <div className="w-full max-w-[32px] bg-blue-600 rounded-t-sm transition-all duration-300 group-hover:brightness-110" style={{ height: `${h}%` }}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Platform Engagement</h3>
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Active Time per User</span>
                <span className="text-sm font-bold text-slate-900">45m</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Project Completion Rate</span>
                <span className="text-sm font-bold text-slate-900">62%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Community Interaction</span>
                <span className="text-sm font-bold text-slate-900">89%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900">Scheduled Reports</h3>
        </div>
        <table className="w-full text-left">
          <tbody>
            <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="py-4 px-6 text-slate-900 font-medium text-sm">Weekly Activity Summary</td>
              <td className="py-4 px-6 text-slate-500 text-sm">Every Monday at 8:00 AM</td>
              <td className="py-4 px-6 text-right"><button className="text-blue-600 font-medium text-sm hover:underline">Edit</button></td>
            </tr>
            <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="py-4 px-6 text-slate-900 font-medium text-sm">Monthly Growth Metrics</td>
              <td className="py-4 px-6 text-slate-500 text-sm">1st of every month</td>
              <td className="py-4 px-6 text-right"><button className="text-blue-600 font-medium text-sm hover:underline">Edit</button></td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="py-4 px-6 text-slate-900 font-medium text-sm">Security Audit Log</td>
              <td className="py-4 px-6 text-slate-500 text-sm">Quarterly</td>
              <td className="py-4 px-6 text-right"><button className="text-blue-600 font-medium text-sm hover:underline">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
