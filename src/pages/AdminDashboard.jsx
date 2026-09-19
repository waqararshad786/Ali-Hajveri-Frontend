// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  FaBriefcase,
  FaEnvelope,
  FaArrowRight,
  FaUsers,
  FaClipboardList,
  FaChartLine,
  FaFire,
  FaStar,
  FaCheckCircle,
  FaSync,
  FaDatabase,
  FaUser,
  FaClock,
  FaPlus,
} from "react-icons/fa";
import { jobsApi, applicationsApi, contactApi } from "../api/api";
import { getCurrentUser } from "../data/adminAuth";

const AdminDashboard = () => {
  const { refetchStats } = useOutletContext() || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalJobs: 0,
    urgentJobs: 0,
    featuredJobs: 0,
    totalApplications: 0,
    newApplications: 0,
    totalMessages: 0,
    newMessages: 0,
    repliedMessages: 0,
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    setUser(getCurrentUser());
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [jobsData, appsData, msgsData] = await Promise.all([
        jobsApi.getAll().catch(() => ({ jobs: [] })),
        applicationsApi.getAll().catch(() => ({ applications: [] })),
        contactApi.getAll().catch(() => ({ contacts: [] })),
      ]);

      const jobs = jobsData.jobs || [];
      const applications = appsData.applications || [];
      const messages = msgsData.contacts || [];

      setStats({
        totalJobs: jobs.length,
        urgentJobs: jobs.filter((j) => j.urgent).length,
        featuredJobs: jobs.filter((j) => j.featured).length,
        totalApplications: applications.length,
        newApplications: applications.filter((a) => a.status === "new").length,
        totalMessages: messages.length,
        newMessages: messages.filter((m) => m.status === "new").length,
        repliedMessages: messages.filter((m) => m.status === "replied").length,
      });

      setRecentJobs(jobs.slice(0, 3));
      setRecentMessages(messages.slice(0, 3));

      if (refetchStats) refetchStats();
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5 bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 rounded-full px-3 py-1">
              <FaChartLine className="text-[#29B6F6] text-[9px]" />
              <span className="text-[#0F4C5C] text-[9px] font-bold tracking-widest uppercase">
                Dashboard
              </span>
            </div>
            <h1 className="font-[Plus_Jakarta_Sans] text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F4C5C]">
              Welcome Back,{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite] capitalize">
                {user?.username || "Admin"}
              </span>
            </h1>
            <p className="text-[#0A3A47]/60 text-xs mt-0.5">
              Here's what's happening with your portal
            </p>
          </div>

          <button
            onClick={fetchAll}
            disabled={loading}
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C5C] hover:text-[#29B6F6] border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 px-3 py-2 rounded-full transition-all disabled:opacity-50"
          >
            <FaSync className={`text-[10px] ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Main stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          {
            icon: FaBriefcase,
            value: stats.totalJobs,
            label: "Total Jobs",
            color: "from-[#4FC3F7] to-[#29B6F6]",
            link: "/admin/jobs",
          },
          {
            icon: FaClipboardList,
            value: stats.totalApplications,
            label: "Applications",
            color: "from-[#FFD54F] to-[#FFB300]",
            sub: `${stats.newApplications} new`,
            link: "/admin/applications",
          },
          {
            icon: FaEnvelope,
            value: stats.totalMessages,
            label: "Messages",
            color: "from-[#29B6F6] to-[#4FC3F7]",
            sub: `${stats.newMessages} new`,
            link: "/admin/messages",
          },
          {
            icon: FaCheckCircle,
            value: stats.repliedMessages,
            label: "Replied",
            color: "from-green-400 to-green-600",
            link: "/admin/messages",
          },
        ].map(({ icon: Icon, value, label, color, sub, link }) => (
          <Link
            key={label}
            to={link}
            className="group relative bg-white rounded-2xl border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(79,195,247,0.15)] overflow-hidden"
          >
            <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <div className="flex items-start justify-between mb-2.5">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-[0_8px_20px_rgba(79,195,247,0.35)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
              >
                <Icon className="text-white text-sm" />
              </div>
              <FaArrowRight className="text-[#29B6F6] text-[10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
            </div>

            <p className="font-[Plus_Jakarta_Sans] text-2xl font-extrabold text-[#0F4C5C] leading-none mb-1">
              {loading ? "—" : value}
            </p>
            <p className="text-[10px] font-bold text-[#0A3A47]/60 uppercase tracking-wider">
              {label}
            </p>
            {sub && (
              <p className="text-[10px] font-bold text-[#29B6F6] mt-0.5">
                {sub}
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* Quick action buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          {
            icon: FaPlus,
            title: "Post Job",
            link: "/admin/jobs",
            gradient: "from-[#4FC3F7] to-[#29B6F6]",
          },
          {
            icon: FaEnvelope,
            title: "Messages",
            link: "/admin/messages",
            gradient: "from-[#29B6F6] to-[#4FC3F7]",
          },
          {
            icon: FaClipboardList,
            title: "Applications",
            link: "/admin/applications",
            gradient: "from-[#FFD54F] to-[#FFB300]",
          },
          {
            icon: FaUsers,
            title: "Profile",
            link: "/admin/profile",
            gradient: "from-[#0F4C5C] to-[#0A3A47]",
          },
        ].map(({ icon: Icon, title, link, gradient }) => (
          <Link
            key={title}
            to={link}
            className="group flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(79,195,247,0.15)] transition-all duration-300"
          >
            <span
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-[0_8px_20px_rgba(79,195,247,0.3)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
            >
              <Icon className="text-white text-sm" />
            </span>
            <span className="font-extrabold text-[#0F4C5C] text-xs truncate">
              {title}
            </span>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent Jobs */}
        <div className="relative bg-white rounded-2xl border border-[#4FC3F7]/25 overflow-hidden shadow-[0_14px_40px_rgba(15,76,92,0.06)]">
          <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7]" />

          <div className="flex items-center justify-between p-4 border-b border-[#4FC3F7]/15">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_6px_16px_rgba(79,195,247,0.35)]">
                <FaBriefcase className="text-white text-xs" />
              </span>
              <div>
                <h3 className="font-extrabold text-[#0F4C5C] text-sm">
                  Recent Jobs
                </h3>
                <p className="text-[10px] text-[#0A3A47]/60 font-semibold">
                  Latest postings
                </p>
              </div>
            </div>
            <Link
              to="/admin/jobs"
              className="text-[10px] font-bold text-[#29B6F6] hover:text-[#0F4C5C] flex items-center gap-1 transition-colors"
            >
              View All
              <FaArrowRight className="text-[8px]" />
            </Link>
          </div>

          <div className="p-4 space-y-2">
            {loading ? (
              <div className="flex justify-center py-6">
                <div className="w-7 h-7 rounded-full border-3 border-[#4FC3F7]/30 border-t-[#4FC3F7] animate-spin" />
              </div>
            ) : recentJobs.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-xs text-[#0A3A47]/60 mb-2">
                  No jobs posted yet
                </p>
                <Link
                  to="/admin/jobs"
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#29B6F6] hover:text-[#0F4C5C]"
                >
                  <FaPlus className="text-[9px]" />
                  Post your first job
                </Link>
              </div>
            ) : (
              recentJobs.map((job) => (
                <Link
                  key={job._id}
                  to="/admin/jobs"
                  className="group flex items-center gap-2.5 p-2.5 rounded-xl bg-[#E1F5FE]/40 hover:bg-[#E1F5FE] border border-[#4FC3F7]/15 hover:border-[#4FC3F7]/40 transition-all"
                >
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center flex-shrink-0">
                    <FaBriefcase className="text-white text-[10px]" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0F4C5C] text-xs truncate group-hover:text-[#29B6F6] transition-colors">
                      {job.title}
                    </p>
                    <p className="text-[10px] text-[#0A3A47]/60 font-semibold truncate">
                      {job.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {job.urgent && (
                      <FaFire className="text-[#FFD54F] text-[10px]" />
                    )}
                    {job.featured && (
                      <FaStar className="text-[#FFD54F] text-[10px]" />
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="relative bg-white rounded-2xl border border-[#4FC3F7]/25 overflow-hidden shadow-[0_14px_40px_rgba(15,76,92,0.06)]">
          <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7]" />

          <div className="flex items-center justify-between p-4 border-b border-[#4FC3F7]/15">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_6px_16px_rgba(79,195,247,0.35)]">
                <FaEnvelope className="text-white text-xs" />
              </span>
              <div>
                <h3 className="font-extrabold text-[#0F4C5C] text-sm">
                  Recent Messages
                </h3>
                <p className="text-[10px] text-[#0A3A47]/60 font-semibold">
                  From contact form
                </p>
              </div>
            </div>
            <Link
              to="/admin/messages"
              className="text-[10px] font-bold text-[#29B6F6] hover:text-[#0F4C5C] flex items-center gap-1"
            >
              View All
              <FaArrowRight className="text-[8px]" />
            </Link>
          </div>

          <div className="p-4 space-y-2">
            {loading ? (
              <div className="flex justify-center py-6">
                <div className="w-7 h-7 rounded-full border-3 border-[#4FC3F7]/30 border-t-[#4FC3F7] animate-spin" />
              </div>
            ) : recentMessages.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-xs text-[#0A3A47]/60">No messages yet</p>
              </div>
            ) : (
              recentMessages.map((msg) => (
                <Link
                  key={msg._id}
                  to="/admin/messages"
                  className="group flex items-start gap-2.5 p-2.5 rounded-xl bg-[#E1F5FE]/40 hover:bg-[#E1F5FE] border border-[#4FC3F7]/15 hover:border-[#4FC3F7]/40 transition-all"
                >
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-white text-[10px]" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-[#0F4C5C] text-xs truncate group-hover:text-[#29B6F6] transition-colors">
                        {msg.name}
                      </p>
                      {msg.status === "new" && (
                        <span className="text-[7px] font-extrabold text-white bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] px-1.5 py-0.5 rounded-full uppercase">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#0A3A47]/60 font-semibold truncate">
                      {msg.subject || msg.message}
                    </p>
                  </div>
                  <FaClock className="text-[#29B6F6] text-[10px] flex-shrink-0 mt-1" />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-6 bg-white border border-[#4FC3F7]/20 rounded-2xl p-4">
        <div className="flex items-start gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-[#4FC3F7]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <FaDatabase className="text-[#29B6F6] text-xs" />
          </span>
          <div>
            <h4 className="font-bold text-[#0F4C5C] text-xs mb-0.5">
              Backend Connected
            </h4>
            <p className="text-[#0A3A47]/70 text-[11px] leading-relaxed">
              All changes saved to MongoDB and appear instantly on the public
              careers page.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;