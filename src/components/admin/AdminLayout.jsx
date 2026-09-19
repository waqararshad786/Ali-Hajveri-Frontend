// src/components/admin/AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaSync } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { jobsApi, applicationsApi, contactApi, cvApi } from "../../api/api";
import { isAuthenticated } from "../../data/adminAuth";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    newApplications: 0,
    newMessages: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login", { replace: true });
      return;
    }
    setChecking(false);
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const [jobsData, cvData, msgsData] = await Promise.all([
        jobsApi.getAll().catch(() => ({ jobs: [] })),
        cvApi.getAll().catch(() => ({ cvs: [] })),
        contactApi.getAll().catch(() => ({ contacts: [] })),
      ]);

      setStats({
        totalJobs: (jobsData.jobs || []).length,
        newApplications: (cvData.cvs || []).filter(
          (a) => a.status === "new"
        ).length,
        newMessages: (msgsData.contacts || []).filter(
          (m) => m.status === "new"
        ).length,
      });
    } catch (err) {
      console.error("Stats load error:", err);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F4C5C] to-[#06303A]">
        <div className="w-12 h-12 rounded-full border-4 border-[#4FC3F7]/30 border-t-[#4FC3F7] animate-spin" />
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-b from-[#E1F5FE] via-white to-[#E1F5FE]">
        {/* Sidebar — now attached to TOP of viewport (no navbar) */}
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          stats={stats}
        />

        {/* Main Content — offset by sidebar width only */}
        <main className="lg:ml-64">
          {/* Mobile top bar */}
          <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[#4FC3F7]/15 bg-white/80 backdrop-blur-md sticky top-0 z-20">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 bg-white border border-[#4FC3F7]/25 rounded-xl px-3 py-2 shadow-[0_4px_14px_rgba(15,76,92,0.08)]"
            >
              <FaBars className="text-[#0F4C5C] text-sm" />
              <span className="text-xs font-bold text-[#0F4C5C]">Menu</span>
            </button>
            <button
              onClick={fetchStats}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C5C] border border-[#4FC3F7]/25 px-3 py-2 rounded-xl"
            >
              <FaSync className="text-[10px]" />
            </button>
          </div>

          {/* Page content */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet context={{ stats, refetchStats: fetchStats }} />
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminLayout;