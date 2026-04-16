import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../UserComponents/Navbar";
import Footer from "../UserComponents/Footer";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // State Management
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [applyMessage, setApplyMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Note: Replace this with your actual Auth Context/Redux selector
  const user = JSON.parse(localStorage.getItem("user"));
  const currentUserId = user?._id;
  const token = localStorage.getItem("token");

  const fetchProject = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/projects/${id}?t=${Date.now()}`,
      );
      setProject(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load project details. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleApply = async () => {
    if (!applyMessage.trim()) return alert("Please enter a message");

    setIsSubmitting(true);
    try {
      await axios.post(
        `http://localhost:5000/projects/${id}/apply`,
        { role: selectedRole, message: applyMessage },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Application submitted!");
      setIsApplyModalOpen(false);
      setApplyMessage("");
      fetchProject(); // Refresh data
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async () => {
    try {
      // Check members (excluding owner)
      const otherMembers = project.members.filter((m) => {
        const userId = m.user?._id || m.user;
        return userId.toString() !== currentUserId.toString();
      });

      if (otherMembers.length > 0) {
        alert("❌ Cannot delete project with active members");
        return;
      }

      //Check pending applications
      const hasPendingApplications = project.applications?.some(
        (app) => app.status === "Pending",
      );

      if (hasPendingApplications) {
        alert("❌ Cannot delete project with pending applications");
        return;
      }
      // THIS MUST BE HERE (before delete)
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this project?",
      );

      if (!confirmDelete) return;
      await axios.delete(`http://localhost:5000/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Project deleted successfully");
      navigate("/projects");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error deleting project");
    }
  };

  const openApplication = () => {
    const firstOpenRole = project?.roles?.find(
      (r) => r.filled < (r.count || 1),
    );
    if (!firstOpenRole) return alert("No open roles available at this time.");
    setSelectedRole(firstOpenRole.title);
    setIsApplyModalOpen(true);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F0E8] font-bold text-[#89A8B2]">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F0E8] text-rose-500 font-bold">
        {error}
      </div>
    );
  if (!project) return null;

  // safely get creatorId
  const creatorId = project.creator?._id;
  // ensure both sides are strings
  const isOwner = creatorId?.toString() === currentUserId?.toString();

  //  handle both populated and non-populated user
  const alreadyApplied = project.applications?.some(
    (app) =>
      app.user?._id?.toString() === currentUserId?.toString() ||
      app.user?.toString() === currentUserId?.toString(),
  );
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-10">
        <div className="mb-6 flex gap-2 text-sm font-bold text-slate-500">
          <Link to="/projects" className="hover:text-[#89A8B2]">
            Projects
          </Link>
          <span>/</span>
          <span className="text-slate-800">{project.title}</span>
        </div>

        <div className="bg-[#E5E1DA] p-8 md:p-12 rounded-3xl border border-[#B3C8CF]/40 shadow-sm mb-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-2xl">
              <div className="flex gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#89A8B2]/20 text-[#89A8B2] ring-1 ring-[#89A8B2]/30 px-3 py-1 rounded-full">
                  {project.status}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#F1F0E8] text-slate-500 border border-[#B3C8CF]/30 px-3 py-1 rounded-full">
                  {project.applications?.filter(
                    (app) => app.status === "Pending",
                  ).length || 0}{" "}
                  Applicants
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-slate-600 font-medium mb-6">
                {project.description?.substring(0, 160) ||
                  "No description provided."}
                ...
              </p>

              <div className="flex items-center gap-4 border-t border-[#B3C8CF]/30 pt-6">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-[#B3C8CF]/50 flex items-center justify-center font-bold text-[#89A8B2]">
                  {project.creator?.name?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    Created by {project.creator?.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col gap-4 items-stretch">
              {!isOwner && (
                <button
                  disabled={alreadyApplied}
                  onClick={openApplication}
                  className={`px-8 py-4 rounded-2xl font-bold shadow-md transition flex justify-center items-center gap-2 ${alreadyApplied ? "bg-slate-400 cursor-not-allowed" : "bg-[#89A8B2] hover:bg-[#7896a0] text-white hover:-translate-y-1"}`}
                >
                  {alreadyApplied ? "Already Applied" : "Apply for Role"}
                  {!alreadyApplied && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  )}
                </button>
              )}
              {isOwner && (
                <div className="flex gap-3">
                  {/* Edit Button */}
                  <Link to={`/projects/edit/${project._id}`}>
                    <button className="bg-white border-2 border-[#89A8B2] text-[#89A8B2] px-5 py-3.5 rounded-2xl font-bold hover:bg-[#89A8B2] hover:text-white transition">
                      Edit Project
                    </button>
                  </Link>

                  {/* Delete Button (ICON) */}
                  <button
                    onClick={handleDeleteProject}
                    className="bg-red-100 text-red-600 border border-red-300 px-4 py-3.5 rounded-2xl hover:bg-red-300 hover:text-white hover:border-red-300 transition flex items-center justify-center"
                    title="Delete Project"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor "
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-1-3h-4a1 1 0 00-1 1v1h6V5a1 1 0 00-1-1z"
                      />
                    </svg>
                  </button>
                </div>
              )}
              {isOwner && (
                <button
                  onClick={() => navigate(`/projects/${project._id}/applications`)}
                  className="w-full text-center bg-[#89A8B2] text-white px-6 py-3 rounded-2xl font-bold shadow-md hover:bg-[#7896a0] transition"
                >
                  View Applications
                  {project.applications?.filter(
                    (app) => app.status === "Pending"
                  ).length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#B3C8CF] text-slate-800 text-xs font-bold px-2 py-1 rounded-full shadow">
                      {
                        project.applications.filter(
                          (app) => app.status === "Pending"
                        ).length
                      }
                    </span>
                  )}
                </button>
              )}
              {(isOwner ||
                project.members?.some(
                  (m) =>
                    m.user?._id?.toString() === currentUserId ||
                    m.user?.toString() === currentUserId,
                )) && (
                <button
                  onClick={() => navigate(`/workspace/${project._id}`)}
                  className="w-full text-center bg-[#89A8B2] text-white px-6 py-3 rounded-2xl font-bold shadow-md hover:bg-[#7896a0] transition"
                >
                  Open Workspace
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#E5E1DA] p-8 rounded-3xl border border-[#B3C8CF]/30">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b border-[#B3C8CF]/30 pb-4">
                Project Details
              </h3>
              <div className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                {project.description}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="bg-[#E5E1DA] p-6 rounded-3xl border border-[#B3C8CF]/30 sticky top-28">
              <h3 className="font-bold text-slate-800 mb-4 border-b border-[#B3C8CF]/30 pb-2">
                Open Roles
              </h3>
              <div className="flex flex-col gap-4">
                {project.roles?.map((role, i) => {
                  const isAvailable = role.filled < (role.count || 1);
                  return (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl border transition-all ${isAvailable && !isOwner && !alreadyApplied ? "bg-[#F1F0E8] border-[#B3C8CF]/50 hover:border-[#89A8B2] cursor-pointer group" : "bg-slate-50/50 border-slate-200 opacity-60"}`}
                      onClick={() => {
                        if (isAvailable && !isOwner && !alreadyApplied) {
                          setSelectedRole(role.title);
                          setIsApplyModalOpen(true);
                        }
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-800">
                          {role.title}
                        </h4>
                        {isAvailable ? (
                          <span className="w-2 h-2 rounded-full bg-[#89A8B2] mt-1.5 shadow-[0_0_8px_rgba(137,168,178,0.8)]"></span>
                        ) : (
                          <span className="text-xs bg-slate-200 text-slate-500 px-2 py-0.5 rounded-lg font-bold">
                            Filled
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-medium">
                        {role.description}
                      </p>
                      <div className="mt-3 flex justify-between items-center text-[10px] font-bold text-slate-400">
                        <span>
                          {role.filled}/{role.count || 1} filled
                        </span>
                        {isAvailable && !isOwner && !alreadyApplied && (
                          <span className="text-[#89A8B2] group-hover:underline">
                            Click to apply →
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {isApplyModalOpen && (
        <div className="fixed inset-0 bg-[#F1F0E8]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#E5E1DA] w-full max-w-lg rounded-4xl border border-[#B3C8CF]/50 shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-[#B3C8CF]/30 bg-[#F1F0E8]/50 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">
                  Apply to Join
                </h2>
                <p className="text-slate-500 font-semibold text-sm">
                  Role: <span className="text-[#89A8B2]">{selectedRole}</span>
                </p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-slate-400 hover:text-rose-500 transition shadow-sm border border-[#B3C8CF]/30 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">
                  Why are you a good fit?
                </label>
                <textarea
                  rows="4"
                  value={applyMessage}
                  onChange={(e) => setApplyMessage(e.target.value)}
                  placeholder="Describe your relevant experience..."
                  className="px-4 py-3 bg-[#F1F0E8] border border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium resize-none"
                ></textarea>
              </div>
              <button
                onClick={handleApply}
                disabled={isSubmitting}
                className={`w-full bg-[#89A8B2] text-white py-4 rounded-xl font-bold shadow-md transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#7896a0] active:scale-95"}`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetail;
