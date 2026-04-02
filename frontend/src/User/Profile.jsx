import React, { useState, useEffect } from "react";
import Navbar from "../UserComponents/Navbar";
import Footer from "../UserComponents/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [communities, setCommunities] = useState([])
  const [activeTab, setActiveTab] = useState("created");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [])

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        if (!user?._id) return;

        const res = await axios.get(
          `http://localhost:5000/communities/user/${user._id}`
        );

        setCommunities(res.data);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunities();
  }, [user])

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const formatLink = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  const createdProjects = [
    {
      title: "Open UI Component Library",
      role: "Creator",
      tags: ["React", "CSS"],
      date: "Aug 2026",
    },
    {
      title: "Data Viz SDK",
      role: "Lead Developer",
      tags: ["D3.js", "TypeScript"],
      date: "May 2026",
    },
  ];

  const joinedProjects = [
    {
      title: "AI Code Summarizer",
      role: "Contributor",
      tags: ["Python", "LLM"],
      date: "Sep 2026",
    },
  ]
  
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-10">
        {/* Cover & Profile Header */}
        <div className="bg-[#E5E1DA] rounded-3xl border border-[#B3C8CF]/40 shadow-sm overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-48 md:h-64 relative">
            {user?.cover ? (
              <img
                src={user.cover}
                alt="cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-r from-[#89A8B2] to-[#B3C8CF]" />
            )}

            <div className="absolute inset-0 bg-[#F1F0E8]/10 mix-blend-overlay"></div>
          </div>

          <div className="px-6 md:px-10 pb-8 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
              <div className="flex items-end gap-6 -mt-16 md:-mt-20">
                {/* Profile Image */}
                <div
                  className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl p-1.5 shadow-lg border border-[#B3C8CF]/30
                  relative z-10 shrink-0"
                >
                  <div
                    className="w-full h-full bg-[#89A8B2] rounded-2xl flex items-center justify-center text-4xl font-bold
                    text-white shadow-inner"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      user?.name?.charAt(0).toUpperCase()
                    )}
                  </div>
                </div>

                {/* Name, Role */}
                <div className="pb-2 md:pb-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
                      {user?.name || "User Name"}
                    </h1>
                  </div>
                  <p className="text-slate-600 font-semibold text-md">
                    {" "}
                    Developer{" "}
                  </p>
                </div>
              </div>

              {/* Settings / Message Buttons */}
              <div className="mt-6 md:mt-0 pb-4">
                {loggedInUser?._id === user?._id ? (
                  <button
                    onClick={() => navigate("/settings")}
                    className="bg-[#B3C8CF] text-white px-6 py-2.5 rounded-xl font-bold shadow-sm hover:bg-[#89A8B2]
                    hover:-translate-y-0.5 transition active:scale-95 text-sm sm:text-base w-full md:w-auto cursor-pointer"
                  >
                    Settings
                  </button>
                ) : (
                  <button
                    className="bg-[#89A8B2] text-white px-6 py-2.5 rounded-xl font-bold shadow-sm hover:shadow-md cursor-pointer
                    hover:bg-[#7896a0] hover:-translate-y-0.5 transition active:scale-95 text-sm sm:text-base w-full md:w-auto"
                  >
                    Message
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <h3 className="font-bold text-slate-800 text-lg border-b border-[#B3C8CF]/30 pb-2">
                  About
                </h3>
                <p className="text-slate-600 leading-relaxed max-w-2xl">
                  {user?.about}
                </p>

                <h3 className="font-bold text-slate-800 text-lg border-b border-[#B3C8CF]/30 pb-2 mt-6">
                  Expertise
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {user?.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-bold text-[#5e7780] bg-[#F1F0E8] border border-[#B3C8CF]/40 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 hover:border-[#89A8B2] transition cursor-default"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#89A8B2]"></div>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-lg border-b border-[#B3C8CF]/30 pb-2">
                  Links{" "}
                </h3>
                <div className="flex flex-col gap-3">
                  {/* Github Link */}
                  {user?.github && (
                    <a
                      href={formatLink(user.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-600 hover:text-[#89A8B2] font-medium transition group"
                    >
                      <svg
                        className="w-5 h-5 text-[#B3C8CF] group-hover:text-[#89A8B2] transition"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      {user.github}
                    </a>
                  )}

                  {/* Website Link */}
                  {user?.website && (
                    <a
                      href={formatLink(user.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-600 hover:text-[#89A8B2] font-medium transition group"
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
                      {user.website}
                    </a>
                  )}

                  {/* Linkedin Link */}
                  {user?.linkedin && (
                    <a
                      href={formatLink(user.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-600 hover:text-[#89A8B2] font-medium transition group"
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
                      {user.linkedin}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Tabs Section */}
        <div className="bg-[#E5E1DA] rounded-3xl border border-[#B3C8CF]/40 shadow-sm overflow-hidden">
          <div className="flex px-2 sm:px-6 pt-2 border-b border-[#B3C8CF]/30 bg-[#F1F0E8]/50 overflow-x-auto scrollbar-none">
            {[
              {
                id: "created",
                label: "Projects Created",
                count: createdProjects.length,
              },
              {
                id: "joined",
                label: "Projects Joined",
                count: joinedProjects.length,
              },
              {
                id: "communities",
                label: "Communities",
                count: communities.length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-bold text-sm sm:text-base whitespace-nowrap border-b-2 transition-all duration-300 ${activeTab === tab.id ? "border-[#89A8B2] text-[#89A8B2] bg-white rounded-t-xl shadow-sm" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-[#F1F0E8] rounded-t-xl"}`}
              >
                {tab.label}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? "bg-[#89A8B2]/10 text-[#89A8B2]" : "bg-[#E5E1DA] text-slate-500"}`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {activeTab === "created" && (
              <div className="grid md:grid-cols-2 gap-6">
                {createdProjects.map((p, i) => (
                  <a
                    href={`/projects/${i}`}
                    key={i}
                    className="bg-[#F1F0E8] p-6 rounded-2xl border border-[#B3C8CF]/30 shadow-sm hover:shadow-md hover:border-[#89A8B2] transition-all group block"
                  >
                    <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#5e7780] transition">
                      {p.title}
                    </h4>
                    <p className="text-sm text-slate-500 font-semibold mb-6 flex justify-between">
                      <span>Role: {p.role}</span> <span>{p.date}</span>
                    </p>
                    <div className="flex gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-bold text-[#89A8B2] bg-[#B3C8CF]/20 px-3 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            )}

            {activeTab === "joined" && (
              <div className="grid md:grid-cols-2 gap-6">
                {joinedProjects.map((p, i) => (
                  <a
                    href={`/projects/${i}`}
                    key={i}
                    className="bg-[#F1F0E8] p-6 rounded-2xl border border-[#B3C8CF]/30 shadow-sm hover:shadow-md hover:border-[#89A8B2] transition-all group block"
                  >
                    <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#5e7780] transition">
                      {p.title}
                    </h4>
                    <p className="text-sm text-slate-500 font-semibold mb-6 flex justify-between">
                      <span>Joined as: {p.role}</span> <span>{p.date}</span>
                    </p>
                    <div className="flex gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-bold text-[#89A8B2] bg-[#B3C8CF]/20 px-3 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            )}

            {activeTab === "communities" && (
              <div className="flex flex-col gap-4 max-w-4xl">
                {communities.map((c) => (
                  <a
                    href={`/communities/${c._id}`}
                    key={c._id}
                    className="flex items-center justify-between p-4 bg-[#F1F0E8] rounded-2xl border border-[#B3C8CF]/30 hover:border-[#89A8B2] transition group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-[#B3C8CF]/50 flex items-center justify-center font-bold text-2xl text-[#89A8B2]">
                        {c.name?.charAt(0).toUpperCase()}
                      </div>
                      <h4 className="font-bold text-slate-800 group-hover:text-[#5e7780] transition">
                        {c.name}
                      </h4>
                    </div>

                    <button className="text-sm font-bold text-white bg-[#B3C8CF] hover:bg-[#89A8B2] px-4 py-2 rounded-lg transition shadow-sm">
                      View
                    </button>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
