import React, { useState, useEffect } from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ApplicationManagement() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applicants');

  const token = localStorage.getItem("token");

  const fetchProject = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/projects/${id}`
    );
    setProject(res.data);
  } catch (err) {
    console.error("Error fetching project:", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleAction = async (applicationId, action) => {
  try {
    await axios.patch(
      `http://localhost:5000/projects/${id}/${action}`,
      { applicationId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchProject();
  } catch (err) {
    console.error(err);
    alert(`Error trying to ${action} application`);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F0E8]">
        <div className="animate-pulse font-bold text-slate-500">Loading Project Data...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F0E8]">
        <div className="text-slate-500">Project not found.</div>
      </div>
    );
  }

  const applicants = project?.applications?.filter((app) => app.status === "Pending") || [];
  const roster = project?.members || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-10">
        
        {/* Breadcrumbs - Now Dynamic */}
        <div className="mb-6 flex gap-2 text-sm font-bold text-slate-500">
          <Link to="/projects" className="hover:text-[#89A8B2] transition">Projects</Link>
          <span>/</span>
          <Link to={`/projects/${id}`} className="hover:text-[#89A8B2] transition">
            {project.title}
          </Link>
          <span>/</span>
          <span className="text-slate-800">Applications</span>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Team Management</h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl">
            Review incoming applications for <span className="text-[#89A8B2]">{project.title}</span>.
          </p>
        </div>

        <div className="bg-[#E5E1DA] rounded-3xl border border-[#B3C8CF]/40 shadow-sm overflow-hidden mb-12">
          
          {/* Tabs */}
          <div className="flex px-4 md:px-10 gap-8 border-b border-[#B3C8CF]/30 bg-[#F1F0E8]/50 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('applicants')}
              className={`py-5 font-bold text-base whitespace-nowrap border-b-4 transition-colors duration-300 flex items-center gap-2 ${activeTab === 'applicants' ? 'border-[#89A8B2] text-[#89A8B2]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              Pending Applicants <span className="text-xs font-bold bg-white border border-[#B3C8CF]/50 px-2 py-0.5 rounded-full">{applicants.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('roster')}
              className={`py-5 font-bold text-base whitespace-nowrap border-b-4 transition-colors duration-300 flex items-center gap-2 ${activeTab === 'roster' ? 'border-[#89A8B2] text-[#89A8B2]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              Current Members <span className="text-xs font-bold bg-white border border-[#B3C8CF]/50 px-2 py-0.5 rounded-full">{roster.length}</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10 min-h-[400px]">
            
            {activeTab === 'applicants' && (
              <div className="space-y-6">
                {applicants.length > 0 ? (
                  applicants.map(app => (
                    <div key={app._id} className="bg-[#F1F0E8] p-6 rounded-2xl border border-[#B3C8CF]/40 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex gap-4 items-start w-full">
                        <div className="w-14 h-14 bg-[#B3C8CF]/40 rounded-xl text-[#89A8B2] flex items-center justify-center font-bold text-2xl shrink-0 border border-[#B3C8CF]/50 shadow-inner">
                          {app.user?.name?.charAt(0) || "?"}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                            <h4 className="text-lg font-bold text-slate-800">{app.user?.name}</h4>
                            <span className="text-sm font-semibold text-slate-500">
                              Applied {new Date(app.appliedAt).toLocaleDateString()} for <strong className="text-[#89A8B2]">{app.role}</strong>
                            </span>
                          </div>
                          <p className="text-sm font-medium text-slate-700 mb-2"><strong>Message:</strong> {app.message}</p>
                          
                          {app.user?.github && (
                            <a href={`https://github.com/${app.user.github}`} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#89A8B2] hover:underline flex items-center gap-1 group">
                               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                               {app.user.github}
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                        <button
                          onClick={() => handleAction(app._id, "reject")}
                          className="flex-1 md:flex-none border-2 border-rose-200 text-rose-600 bg-rose-50 px-6 py-2.5 rounded-xl font-bold hover:bg-rose-100 transition shadow-sm"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleAction(app._id, "accept")}
                          className="flex-1 md:flex-none bg-[#89A8B2] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#7896a0] transition shadow-md"
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-500 font-medium">No pending applications found.</div>
                )}
              </div>
            )}

            {activeTab === 'roster' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roster.length > 0 ? (
                  roster.map(member => (
                    <div key={member.user?._id || member._id} className="bg-[#F1F0E8] p-6 rounded-2xl border border-[#B3C8CF]/40 shadow-sm flex items-center gap-4 group">
                      <div className="w-14 h-14 bg-[#89A8B2] rounded-xl text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-inner">
                        {member.user?.name?.charAt(0) || "?"}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-800 group-hover:text-[#5e7780] transition">{member.user?.name}</h4>
                        <p className="text-sm font-semibold text-[#89A8B2] mb-1">{member.role}</p>
                        <p className="text-xs font-bold text-slate-500 bg-[#E5E1DA] px-2 py-0.5 rounded-md inline-block">
                          Joined: {new Date(member.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10 text-slate-500 font-medium">No team members yet.</div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}