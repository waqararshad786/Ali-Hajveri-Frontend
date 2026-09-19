// src/components/admin/AdminSidebar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaBriefcase,
  FaClipboardList,
  FaEnvelope,
  FaUserCircle,
  FaPlus,
  FaHome,
  FaSignOutAlt,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";
import { logout, getCurrentUser } from "../../data/adminAuth";

const AdminSidebar = ({ open, onClose, stats }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/admin/login", { replace: true });
    }
  };

  const navItems = [
    {
      icon: FaChartLine,
      title: "Dashboard",
      link: "/admin/dashboard",
      badge: null,
    },
    {
      icon: FaBriefcase,
      title: "Jobs",
      link: "/admin/jobs",
      badge: stats?.totalJobs,
    },
    {
      icon: FaClipboardList,
      title: "Applications",
      link: "/admin/applications",
      badge: stats?.newApplications,
      badgeColor: "bg-[#FFD54F]",
    },
    {
      icon: FaEnvelope,
      title: "Messages",
      link: "/admin/messages",
      badge: stats?.newMessages,
      badgeColor: "bg-[#4FC3F7]",
    },
    {
      icon: FaUserCircle,
      title: "My Profile",
      link: "/admin/profile",
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-[#0F4C5C]/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar — FIXED from TOP of viewport */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-40
          w-64
          bg-white border-r border-[#4FC3F7]/20
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          overflow-y-auto no-scrollbar
        `}
      >
        {/* Top accent */}
        <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]" />

        {/* Mobile close */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 w-8 h-8 rounded-full bg-[#E1F5FE] flex items-center justify-center text-[#0F4C5C] z-10"
        >
          <FaTimes className="text-xs" />
        </button>

        <div className="p-4">
          {/* User card */}
          <div className="flex items-center gap-2.5 mb-5 p-3 rounded-xl bg-gradient-to-br from-[#E1F5FE] to-white border border-[#4FC3F7]/20">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_8px_20px_rgba(79,195,247,0.35)] flex-shrink-0">
              <FaUserCircle className="text-white text-lg" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold text-[#0A3A47]/50 uppercase tracking-wider">
                Signed In
              </p>
              <p className="text-sm font-extrabold text-[#0F4C5C] truncate capitalize">
                {user?.username || "Admin"}
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.link;

              return (
                <Link
                  key={item.title}
                  to={item.link}
                  onClick={onClose}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-[#4FC3F7]/20 to-transparent text-[#0F4C5C] border-l-2 border-[#4FC3F7]"
                      : "text-[#0A3A47]/70 hover:bg-[#E1F5FE] hover:text-[#0F4C5C]"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] shadow-[0_6px_14px_rgba(79,195,247,0.35)]"
                        : "bg-[#4FC3F7]/10 group-hover:bg-[#4FC3F7]/20"
                    }`}
                  >
                    <Icon
                      className={`text-xs ${
                        isActive ? "text-white" : "text-[#29B6F6]"
                      }`}
                    />
                  </span>
                  <span className="flex-1 truncate">{item.title}</span>
                  {item.badge > 0 && (
                    <span
                      className={`text-[9px] font-extrabold text-[#0F4C5C] px-1.5 py-0.5 rounded-full ${
                        item.badgeColor || "bg-[#4FC3F7]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <FaArrowRight className="text-[#4FC3F7] text-[9px]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#4FC3F7]/20 to-transparent" />

          {/* Quick actions */}
          <div className="space-y-1">
            <Link
              to="/admin/jobs"
              onClick={onClose}
              className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-[#0F4C5C] bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] shadow-[0_8px_18px_rgba(79,195,247,0.3)] hover:shadow-[0_12px_25px_rgba(255,213,79,0.45)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <FaPlus className="relative text-xs" />
              <span className="relative">Post New Job</span>
            </Link>

            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-[#0A3A47]/70 hover:bg-[#E1F5FE] hover:text-[#0F4C5C] transition-all"
            >
              <span className="w-8 h-8 rounded-lg bg-[#4FC3F7]/10 flex items-center justify-center flex-shrink-0">
                <FaHome className="text-[#29B6F6] text-xs" />
              </span>
              <span>View Public Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-all"
            >
              <span className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                <FaSignOutAlt className="text-red-500 text-xs" />
              </span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;