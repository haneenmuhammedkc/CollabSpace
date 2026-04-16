import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../UserComponents/Navbar";
import Footer from "../UserComponents/Footer";
import { FaGithub, FaExternalLinkAlt, FaFileAlt } from "react-icons/fa";

export default function UserWorkspace() {
  const [activeTab, setActiveTab] = useState("kanban");
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load workspace");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const user = JSON.parse(localStorage.getItem("user"));
  const currentUserId = user?._id;

  const isOwner = project?.creator?._id?.toString() === currentUserId;

  const isMember = project?.members?.some(
    (m) =>
      m.user?._id?.toString() === currentUserId ||
      m.user?.toString() === currentUserId,
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#89A8B2] font-bold">
        Loading workspace...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!isOwner && !isMember) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        You are not allowed to access this workspace
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500 overflow-hidden">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex flex-col h-[calc(100vh-80px)]">
        {/* Workspace Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-3">
              {project?.title || "Workspace"}
              <span className="bg-[#89A8B2]/20 text-[#89A8B2] text-xs font-bold px-2 py-1 rounded-lg top-0 relative ring-1 ring-[#89A8B2]/30">
                PRIVATE WORKSPACE
              </span>
            </h1>
            <div className="flex gap-4 text-slate-500 mt-3">

  {/* GitHub (unchanged icon, styled container added) */}
  {project.links?.github && (
    <a
      href={project.links.github}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition  duration-500 transform hover:scale-105"
    >
      <FaGithub size={21} />
    </a>
  )}

  {/* Live */}
  {project.links?.live && (
    <a
      href={project.links.live}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition  duration-500 transform hover:scale-105"
    >
      <FaExternalLinkAlt size={19} />
    </a>
  )}

  {/* Docs */}
  {project.links?.docs && (
    <a
      href={project.links.docs}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition  duration-500 transform hover:scale-105"
    >
      <svg
                        className="w-5 h-5 text-[#B3C8CF] group-hover:text-[#89A8B2] transition"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        ></path>
                      </svg>
    </a>
  )}

</div>
            <p className="text-sm text-slate-500 font-medium">
              Created by {project?.creator?.name}
            </p>

            <div className="relative mt-3">
              {/* Owner / First Member */}
              <div
                onClick={() => setShowMembers(!showMembers)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[#89A8B2] text-white flex items-center justify-center font-bold">
                  {project.members?.[0]?.user?.name?.charAt(0)}
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  {project.members?.[0]?.user?.name}
                </span>

                <span className="text-xs text-slate-400">
                  +{project.members.length - 1} members
                </span>
              </div>

              {/* Dropdown */}
              {showMembers && (
                <div className="absolute top-12 left-0 bg-white border border-[#B3C8CF]/40 rounded-xl shadow-lg p-3 w-56 z-50">
                  {project.members.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F1F0E8]"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#89A8B2] text-white flex items-center justify-center text-xs font-bold">
                        {m.user?.name?.charAt(0)}
                      </div>
                      <div className="text-sm font-medium text-slate-700">
                        {m.user?.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex bg-[#E5E1DA] rounded-xl p-1 border border-[#B3C8CF]/40 shadow-sm w-full md:w-auto">
            <button
              onClick={() => setActiveTab("kanban")}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === "kanban" ? "bg-[#89A8B2] text-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === "chat" ? "bg-[#89A8B2] text-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
            >
              Team Chat
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 bg-[#E5E1DA] rounded-3xl border border-[#B3C8CF]/40 shadow-sm overflow-hidden flex flex-col mb-10">
          {activeTab === "kanban" && (
            <div className="flex-1 p-6 overflow-x-auto flex gap-6 scrollbar-thin scrollbar-thumb-[#B3C8CF] scrollbar-track-transparent">
              {/* TODO: Replace with dynamic tasks */}
              <p className="text-slate-500">No tasks yet</p>
            </div>
          )}

          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col bg-[#F1F0E8] h-full">
              {/* Chat Canvas */}
              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-400 bg-[#E5E1DA] px-3 py-1 rounded-full">
                    Today
                  </span>
                </div>
                {/* TODO: Replace with dynamic chat */}
                <p className="text-slate-500 text-center">No messages yet</p>
              </div>
              {/* Input Box */}
              <div className="p-4 bg-[#E5E1DA] border-t border-[#B3C8CF]/30">
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-[#B3C8CF]/40 focus-within:ring-2 focus-within:ring-[#89A8B2]/20 focus-within:border-[#89A8B2] transition shadow-sm">
                  <button className="p-2 text-[#B3C8CF] hover:text-[#89A8B2] transition">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent border-none outline-none font-medium text-slate-800 placeholder-slate-400"
                  />
                  <button className="bg-[#89A8B2] text-white p-2.5 rounded-xl font-bold shadow-sm hover:bg-[#7896a0] transition active:scale-95">
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
