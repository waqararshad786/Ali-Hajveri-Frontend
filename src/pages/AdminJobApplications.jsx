// src/pages/admin/AdminJobApplications.jsx
import React, { useState, useEffect } from "react";
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase,
  FaTrash, FaSync, FaSearch, FaTimes, FaCheckCircle,
  FaExclamationTriangle, FaEye, FaEnvelopeOpen, FaReply,
  FaGraduationCap, FaPassport, FaGlobe, FaWhatsapp, FaFileAlt,
  FaDatabase, FaDownload, FaExternalLinkAlt,
  FaFilePdf, FaFileWord, FaUserCheck, FaPaperPlane, FaSpinner,
} from "react-icons/fa";
import { applicationsApi, API_URL } from "../api/api";

/* ============================================================
   STATUS COLORS
============================================================ */
const STATUS_COLORS = {
  pending: "bg-blue-100 text-blue-700 border-blue-300",
  reviewed: "bg-yellow-100 text-yellow-700 border-yellow-300",
  shortlisted: "bg-green-100 text-green-700 border-green-300",
  rejected: "bg-red-100 text-red-700 border-red-300",
  replied: "bg-purple-100 text-purple-700 border-purple-300",
};

/* ============================================================
   ✅ APPLICATION FILE URL HELPER
============================================================ */
const getAppFileUrl = (app, download = false) => {
  if (!app || !app._id) return "";

  const token = (() => {
    try {
      const raw = sessionStorage.getItem("ahioep_session");
      if (!raw) return "";
      return JSON.parse(raw).token || "";
    } catch {
      return "";
    }
  })();

  const rawPath = app.cvUrl || app.fileUrl || app.filePath;
  if (rawPath && /^https?:\/\//i.test(rawPath)) {
    return rawPath;
  }

  const base = `${API_URL}/applications/${app._id}/file`;
  const params = new URLSearchParams();
  if (token) params.set("token", token);
  if (download) params.set("download", "1");

  const queryString = params.toString();
  return queryString ? `${base}?${queryString}` : base;
};

/* ============================================================
   FILE TYPE CHECK
============================================================ */
const getFileType = (app) => {
  if (!app) return "other";
  const mime = app.cvMimeType || app.mimeType || "";
  const name = (app.cvFileName || app.fileName || "").toLowerCase();

  if (mime.includes("pdf") || name.endsWith(".pdf")) return "pdf";
  if (
    mime.includes("word") ||
    mime.includes("document") ||
    name.endsWith(".doc") ||
    name.endsWith(".docx")
  )
    return "word";
  return "other";
};

/* ============================================================
   INFO TILE HELPER
============================================================ */
const InfoTile = ({ icon: Icon, label, value, link }) => (
  <div className="flex items-center gap-2.5 bg-[#E1F5FE]/50 border border-[#4FC3F7]/20 rounded-xl p-3">
    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center flex-shrink-0">
      <Icon className="text-white text-[10px]" />
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-[9px] font-bold text-[#0A3A47]/60 uppercase tracking-wider">
        {label}
      </p>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-bold text-[#0F4C5C] hover:text-[#29B6F6] truncate block transition-colors"
        >
          {value}
        </a>
      ) : (
        <p className="text-xs font-bold text-[#0F4C5C] truncate">{value}</p>
      )}
    </div>
  </div>
);

/* ============================================================
   PAGE
============================================================ */
const AdminJobApplications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  /* ✅ REPLY MODAL STATE */
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await applicationsApi.getAll();
      setApps(data.applications || data || []);
    } catch (err) {
      console.error("❌ Failed To Fetch Applications:", err);
      setError(err.message || "Failed To Load Applications");
      showToast(err.message || "Failed To Load", "error");
    }
    setLoading(false);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await applicationsApi.updateStatus(id, status);
      showToast(`Marked As ${status}`);
      fetchApps();
      if (selected && selected._id === id) {
        setSelected({ ...selected, status });
      }
    } catch (error) {
      showToast(error.message || "Failed To Update", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await applicationsApi.delete(id);
      setConfirmDelete(null);
      setSelected(null);
      showToast("Application Deleted", "error");
      fetchApps();
    } catch (error) {
      showToast(error.message || "Failed To Delete", "error");
    }
  };

  /* ============================================================
     ✅ OPEN REPLY MODAL
  ============================================================ */
  const openReply = (app) => {
    setReplyTo(app);
    setReplyText("");
  };

  const closeReply = () => {
    setReplyTo(null);
    setReplyText("");
  };

  /* ============================================================
     ✅ SEND REPLY — Backend Se Candidate Ko Email
  ============================================================ */
  const handleSendReply = async (e) => {
    e.preventDefault();

    if (!replyText.trim()) {
      showToast("Please Write A Reply Message", "error");
      return;
    }

    /* ✅ Save reply info pehle — replyTo null karne se pehle */
    const currentReplyToId = replyTo._id;
    const currentReplyText = replyText.trim();

    setSendingReply(true);
    try {
      await applicationsApi.reply(currentReplyToId, currentReplyText);
      showToast("Reply Sent Successfully!");

      /* ✅ 1. MODAL BAND karo — SABSE PEHLE */
      setReplyTo(null);
      setReplyText("");

      /* ✅ 2. Detail modal bhi band karo */
      setSelected(null);

      /* ✅ 3. Data Refresh */
      await fetchApps();
    } catch (error) {
      showToast(error.message || "Failed To Send Reply", "error");
    } finally {
      setSendingReply(false);
    }
  };

  const filtered = apps.filter((app) => {
    const term = search.trim().toLowerCase();
    const matchesSearch =
      !term ||
      app.fullName?.toLowerCase().includes(term) ||
      app.email?.toLowerCase().includes(term) ||
      app.phone?.toLowerCase().includes(term) ||
      app.jobTitle?.toLowerCase().includes(term) ||
      app.position?.toLowerCase().includes(term) ||
      app.country?.toLowerCase().includes(term);
    const matchesFilter =
      filter === "all" || (app.status || "pending") === filter;
    return matchesSearch && matchesFilter;
  });

  const counts = {
    all: apps.length,
    pending: apps.filter((a) => (a.status || "pending") === "pending").length,
    reviewed: apps.filter((a) => a.status === "reviewed").length,
    shortlisted: apps.filter((a) => a.status === "shortlisted").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
    replied: apps.filter((a) => a.status === "replied").length,
  };

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.4s ease-out forwards; }
      `}</style>

      {/* ============ HEADER ============ */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-full px-3 py-1">
              <FaUserCheck className="text-[#22C55E] text-[9px]" />
              <span className="text-[#0F4C5C] text-[9px] font-bold tracking-widest uppercase">
                Job Applications
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F4C5C]">
              Careers{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Applications
              </span>
            </h1>
            <p className="text-[#0A3A47]/60 text-xs mt-0.5">
              {apps.length} {apps.length === 1 ? "Application" : "Applications"}{" "}
              From Careers Page
            </p>
          </div>

          <button
            onClick={fetchApps}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C5C] hover:text-[#29B6F6] border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 px-3.5 py-2 rounded-full transition-all disabled:opacity-50"
          >
            <FaSync className={`text-[10px] ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#29B6F6] text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search By Name, Email, Position..."
              className="w-full bg-white border border-[#4FC3F7]/25 focus:border-[#4FC3F7]/60 focus:ring-2 focus:ring-[#4FC3F7]/30 rounded-full pl-10 pr-4 py-2.5 text-sm text-[#0F4C5C] placeholder-[#0A3A47]/40 font-medium outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {["all", "pending", "reviewed", "shortlisted", "rejected", "replied"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all capitalize flex items-center gap-1.5 ${
                  filter === f
                    ? "bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] border-[#4FC3F7]"
                    : "bg-white text-[#0F4C5C] border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60"
                }`}
              >
                {f}
                <span
                  className={`text-[9px] font-extrabold px-1.5 rounded-full ${
                    filter === f ? "bg-[#0F4C5C]/15" : "bg-[#E1F5FE]"
                  }`}
                >
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============ TOAST ============ */}
      {toast && (
        <div
          className={`fixed top-24 right-6 z-[60] flex items-center gap-2 px-4 py-3 rounded-xl shadow-[0_12px_30px_rgba(15,76,92,0.25)] animate-slideUp ${
            toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C]"
          }`}
        >
          {toast.type === "error" ? (
            <FaExclamationTriangle className="text-sm" />
          ) : (
            <FaCheckCircle className="text-sm" />
          )}
          <span className="text-xs sm:text-sm font-bold">{toast.message}</span>
        </div>
      )}

      {/* ============================================================
          ✅ REPLY MODAL — Admin Types Reply Here, Email Sent
      ============================================================ */}
      {replyTo && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-[#0F4C5C]/50 backdrop-blur-sm p-4 sm:p-8">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#4FC3F7]/30 my-8 overflow-hidden animate-slideUp">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7]" />

            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#4FC3F7]/20">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_8px_20px_rgba(79,195,247,0.4)]">
                  <FaReply className="text-white text-base" />
                </span>
                <div>
                  <h3 className="font-extrabold text-[#0F4C5C] text-base">
                    Reply To {replyTo.fullName}
                  </h3>
                  <p className="text-[10px] text-[#0A3A47]/60 font-semibold">
                    {replyTo.email}
                  </p>
                </div>
              </div>
              <button
                onClick={closeReply}
                className="w-9 h-9 rounded-full bg-[#E1F5FE] flex items-center justify-center text-[#0F4C5C] hover:bg-[#4FC3F7]/20 transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            <form onSubmit={handleSendReply} className="p-5 sm:p-6 space-y-4">
              {/* Original Application Preview */}
              <div>
                <p className="text-[10px] font-bold text-[#0A3A47]/60 uppercase tracking-wider mb-2">
                  Applied For: {replyTo.jobTitle || replyTo.position}
                </p>
                <div className="text-xs text-[#0A3A47]/75 leading-relaxed bg-[#F8FAFC] border border-[#4FC3F7]/15 rounded-xl p-3 max-h-32 overflow-y-auto">
                  <p className="mb-1">
                    <strong>Category:</strong> {replyTo.category || "—"}
                  </p>
                  <p className="mb-1">
                    <strong>Experience:</strong> {replyTo.experience || "—"}
                  </p>
                  <p>
                    <strong>Country:</strong> {replyTo.country || "—"}
                  </p>
                  {replyTo.message && (
                    <p className="mt-2 pt-2 border-t border-[#4FC3F7]/15 italic">
                      "{replyTo.message}"
                    </p>
                  )}
                </div>
              </div>

              {/* Reply Textarea */}
              <div>
                <label className="block text-[11px] font-bold text-[#0F4C5C] mb-1.5 uppercase tracking-wider">
                  Your Reply <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Dear ${replyTo.fullName},\n\nWrite Your Response Here...`}
                  rows={6}
                  className="w-full bg-white border-2 border-[#4FC3F7]/30 hover:border-[#4FC3F7]/60 focus:border-[#4FC3F7] focus:ring-2 focus:ring-[#4FC3F7]/30 rounded-xl px-4 py-3 text-sm text-[#0F4C5C] placeholder-[#0A3A47]/40 font-medium outline-none transition-all resize-none"
                  autoFocus
                />
                <p className="text-[10px] text-[#0A3A47]/50 mt-1.5 font-medium">
                  📧 This Reply Will Be Sent Directly To{" "}
                  <strong className="text-[#0F4C5C]">{replyTo.email}</strong>
                </p>
              </div>

              {/* Quick Templates */}
              <div>
                <p className="text-[10px] font-bold text-[#0A3A47]/60 uppercase tracking-wider mb-2">
                  Quick Templates
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setReplyText(
                        `Dear ${replyTo.fullName},\n\nThank You For Your Application For The Position Of "${
                          replyTo.jobTitle || replyTo.position
                        }".\n\nWe Have Received Your CV And Our Team Is Currently Reviewing Your Profile. We Will Get Back To You Shortly Regarding The Next Steps.\n\nBest Regards,\nAli Hajveri International (Pvt.) Ltd.`
                      )
                    }
                    className="text-[10px] font-bold text-[#0F4C5C] bg-[#E1F5FE] hover:bg-[#4FC3F7]/20 border border-[#4FC3F7]/30 px-3 py-1.5 rounded-full transition-all"
                  >
                    📌 Application Received
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setReplyText(
                        `Dear ${replyTo.fullName},\n\nCongratulations! Your Profile Has Been Shortlisted For The Position Of "${
                          replyTo.jobTitle || replyTo.position
                        }".\n\nOur Team Will Contact You Soon To Schedule An Interview. Please Keep Your Documents Ready.\n\nBest Regards,\nAli Hajveri International (Pvt.) Ltd.`
                      )
                    }
                    className="text-[10px] font-bold text-[#0F4C5C] bg-[#E1F5FE] hover:bg-[#4FC3F7]/20 border border-[#4FC3F7]/30 px-3 py-1.5 rounded-full transition-all"
                  >
                    ✅ Shortlisted
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setReplyText(
                        `Dear ${replyTo.fullName},\n\nThank You For Your Interest In The Position Of "${
                          replyTo.jobTitle || replyTo.position
                        }".\n\nAfter Careful Review, We Regret To Inform You That Your Application Has Not Been Shortlisted At This Time. We Will Keep Your CV On File For Future Opportunities.\n\nBest Regards,\nAli Hajveri International (Pvt.) Ltd.`
                      )
                    }
                    className="text-[10px] font-bold text-[#0F4C5C] bg-[#E1F5FE] hover:bg-[#4FC3F7]/20 border border-[#4FC3F7]/30 px-3 py-1.5 rounded-full transition-all"
                  >
                    📌 Not Selected
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-[#4FC3F7]/20">
                <button
                  type="button"
                  onClick={closeReply}
                  className="px-5 py-2.5 rounded-full text-sm font-bold text-[#0A3A47]/70 hover:text-[#0F4C5C] border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingReply || !replyText.trim()}
                  className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_10px_24px_rgba(79,195,247,0.35)] hover:-translate-y-0.5 transition-all overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  {sendingReply ? (
                    <>
                      <FaSpinner className="relative text-xs animate-spin" />
                      <span className="relative">Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="relative text-xs" />
                      <span className="relative">Send Reply</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ CONFIRM DELETE ============ */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0F4C5C]/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-red-200 p-6 text-center animate-slideUp">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <FaTrash className="text-red-500 text-lg" />
            </div>
            <h3 className="font-bold text-[#0F4C5C] text-lg mb-2">
              Delete This Application?
            </h3>
            <p className="text-[#0A3A47]/70 text-sm mb-5">
              This Action Cannot Be Undone.
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-5 py-2.5 rounded-full text-sm font-bold text-[#0A3A47]/70 border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-5 py-2.5 rounded-full text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ VIEW MODAL ============ */}
      {selected && !replyTo && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-[#0F4C5C]/50 backdrop-blur-sm p-4 sm:p-8">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#4FC3F7]/30 my-8 overflow-hidden animate-slideUp">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7]" />

            <div className="flex items-center justify-between p-5 border-b border-[#4FC3F7]/20">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_8px_20px_rgba(79,195,247,0.4)]">
                  <FaUser className="text-white text-base" />
                </span>
                <div>
                  <h3 className="font-extrabold text-[#0F4C5C] text-base">
                    {selected.fullName}
                  </h3>
                  <p className="text-[10px] text-[#0A3A47]/60 font-semibold">
                    Applied For {selected.jobTitle || selected.position}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-9 h-9 rounded-full bg-[#E1F5FE] flex items-center justify-center text-[#0F4C5C] hover:bg-[#4FC3F7]/20"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid sm:grid-cols-2 gap-3">
                <InfoTile
                  icon={FaEnvelope}
                  label="Email"
                  value={selected.email}
                  link={`mailto:${selected.email}`}
                />
                <InfoTile
                  icon={FaPhone}
                  label="Phone"
                  value={selected.phone}
                  link={`tel:${selected.phone}`}
                />
                {selected.whatsapp && (
                  <InfoTile
                    icon={FaWhatsapp}
                    label="WhatsApp"
                    value={selected.whatsapp}
                    link={`https://wa.me/${selected.whatsapp.replace(
                      /\D/g,
                      ""
                    )}`}
                  />
                )}
                <InfoTile
                  icon={FaMapMarkerAlt}
                  label="Location"
                  value={`${selected.city ? selected.city + ", " : ""}${
                    selected.country || ""
                  }`}
                />
                <InfoTile
                  icon={FaBriefcase}
                  label="Position"
                  value={selected.jobTitle || selected.position}
                />
                {selected.category && (
                  <InfoTile
                    icon={FaUser}
                    label="Category"
                    value={selected.category}
                  />
                )}
                {selected.education && (
                  <InfoTile
                    icon={FaGraduationCap}
                    label="Education"
                    value={selected.education}
                  />
                )}
                {selected.experience && (
                  <InfoTile
                    icon={FaBriefcase}
                    label="Experience"
                    value={selected.experience}
                  />
                )}
                {selected.passport && (
                  <InfoTile
                    icon={FaPassport}
                    label="Passport"
                    value={selected.passport}
                  />
                )}
                <InfoTile
                  icon={FaGlobe}
                  label="Applied On"
                  value={
                    selected.createdAt
                      ? new Date(selected.createdAt).toLocaleDateString()
                      : "—"
                  }
                />
              </div>

              {selected.skills && (
                <div>
                  <p className="text-[10px] font-bold text-[#0A3A47]/60 uppercase tracking-wider mb-2">
                    Key Skills
                  </p>
                  <p className="text-sm text-[#0A3A47]/85 bg-[#E1F5FE]/40 border border-[#4FC3F7]/20 rounded-xl p-3">
                    {selected.skills}
                  </p>
                </div>
              )}

              {selected.message && (
                <div>
                  <p className="text-[10px] font-bold text-[#0A3A47]/60 uppercase tracking-wider mb-2">
                    Message
                  </p>
                  <p className="text-sm text-[#0A3A47]/85 bg-[#E1F5FE]/40 border border-[#4FC3F7]/20 rounded-xl p-3 whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>
              )}

              {/* Show Previous Reply If Exists */}
              {selected.replyMessage && (
                <div>
                  <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FaCheckCircle className="text-xs" />
                    Your Previous Reply
                  </p>
                  <p className="text-sm text-[#0A3A47]/85 leading-relaxed whitespace-pre-wrap bg-green-50 border border-green-200 rounded-xl p-4">
                    {selected.replyMessage}
                  </p>
                </div>
              )}

              {/* CV Section */}
              <div>
                <p className="text-[10px] font-bold text-[#0A3A47]/60 uppercase tracking-wider mb-2">
                  Uploaded CV
                </p>

                {(() => {
                  const hasFile =
                    !!selected.cvFileName ||
                    !!selected.fileName ||
                    !!selected.cvUrl ||
                    !!selected.fileUrl ||
                    !!selected.filePath;

                  if (!hasFile) {
                    return (
                      <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                        <FaExclamationTriangle className="text-yellow-600 text-xs flex-shrink-0" />
                        <span className="text-[11px] font-semibold text-yellow-700">
                          No CV File Was Uploaded By The Candidate
                        </span>
                      </div>
                    );
                  }

                  const openUrl = getAppFileUrl(selected, false);
                  const downloadUrl = getAppFileUrl(selected, true);
                  const fileType = getFileType(selected);
                  const fileName =
                    selected.cvFileName || selected.fileName || "Resume";

                  return (
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 rounded-xl p-3">
                        <span
                          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_6px_16px_rgba(79,195,247,0.3)] ${
                            fileType === "pdf"
                              ? "bg-gradient-to-br from-red-500 to-red-600"
                              : fileType === "word"
                              ? "bg-gradient-to-br from-blue-500 to-blue-600"
                              : "bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6]"
                          }`}
                        >
                          {fileType === "pdf" ? (
                            <FaFilePdf className="text-white text-xs" />
                          ) : fileType === "word" ? (
                            <FaFileWord className="text-white text-xs" />
                          ) : (
                            <FaFileAlt className="text-white text-xs" />
                          )}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#0F4C5C] truncate">
                            {fileName}
                          </p>
                          <p className="text-[10px] text-[#0A3A47]/60 font-semibold uppercase">
                            {fileType === "pdf"
                              ? "PDF Document"
                              : fileType === "word"
                              ? "Word Document"
                              : "Document"}
                          </p>
                        </div>

                        <a
                          href={openUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] px-3.5 py-2 rounded-full shadow-[0_6px_16px_rgba(79,195,247,0.4)] hover:-translate-y-0.5 transition-all"
                        >
                          <FaExternalLinkAlt className="text-[9px]" />
                          Open
                        </a>

                        <a
                          href={downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0F4C5C] bg-white border border-[#4FC3F7]/40 px-3.5 py-2 rounded-full hover:bg-[#4FC3F7]/10 hover:-translate-y-0.5 transition-all"
                        >
                          <FaDownload className="text-[9px]" />
                          Download
                        </a>
                      </div>

                      {fileType === "pdf" && (
                        <div className="rounded-xl overflow-hidden border border-[#4FC3F7]/30 bg-[#E1F5FE]/30">
                          <div className="flex items-center justify-between px-3 py-2 bg-[#4FC3F7]/10 border-b border-[#4FC3F7]/20">
                            <span className="text-[10px] font-bold text-[#0F4C5C] uppercase tracking-wider">
                              CV Preview
                            </span>
                            <span className="text-[9px] text-[#0A3A47]/50 font-semibold">
                              Inline PDF Viewer
                            </span>
                          </div>
                          <iframe
                            src={openUrl}
                            title="CV Preview"
                            className="w-full h-[420px] bg-white"
                            style={{ border: "none" }}
                          />
                        </div>
                      )}

                      {fileType === "word" && (
                        <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
                          <FaFileWord className="text-blue-600 text-xs mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-[11px] font-bold text-blue-700">
                              Word Document — Preview Not Available
                            </p>
                            <p className="text-[10px] text-blue-600/80 font-medium mt-0.5">
                              Click "Open" Or "Download" To View The CV
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#4FC3F7]/20">
                {/* ✅ REPLY BUTTON — Opens Reply Modal */}
                <button
                  onClick={() => openReply(selected)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] px-4 py-2 rounded-full shadow-[0_8px_20px_rgba(79,195,247,0.35)] hover:-translate-y-0.5 transition-all"
                >
                  <FaReply className="text-[10px]" />
                  Reply Via Email
                </button>

                {selected.whatsapp && (
                  <a
                    href={`https://wa.me/${selected.whatsapp.replace(
                      /\D/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 rounded-full shadow-[0_8px_20px_rgba(34,197,94,0.35)] hover:-translate-y-0.5 transition-all"
                  >
                    <FaWhatsapp className="text-[10px]" />
                    WhatsApp
                  </a>
                )}

                {(!selected.status || selected.status === "pending") && (
                  <button
                    onClick={() => handleStatusChange(selected._id, "reviewed")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-700 bg-yellow-50 border border-yellow-300 px-4 py-2 rounded-full hover:bg-yellow-100 hover:-translate-y-0.5 transition-all"
                  >
                    <FaEnvelopeOpen className="text-[10px]" />
                    Mark Reviewed
                  </button>
                )}

                <button
                  onClick={() =>
                    selected.status !== "shortlisted" &&
                    handleStatusChange(selected._id, "shortlisted")
                  }
                  disabled={selected.status === "shortlisted"}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all ${
                    selected.status === "shortlisted"
                      ? "bg-green-500 text-white border-2 border-green-600 shadow-[0_8px_20px_rgba(34,197,94,0.4)] cursor-default"
                      : "text-green-700 bg-green-50 border border-green-300 hover:bg-green-100 hover:-translate-y-0.5"
                  }`}
                >
                  <FaCheckCircle className="text-[10px]" />
                  {selected.status === "shortlisted"
                    ? "Shortlisted ✓"
                    : "Shortlist"}
                </button>

                <button
                  onClick={() =>
                    selected.status !== "rejected" &&
                    handleStatusChange(selected._id, "rejected")
                  }
                  disabled={selected.status === "rejected"}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all ${
                    selected.status === "rejected"
                      ? "bg-red-500 text-white border-2 border-red-600 shadow-[0_8px_20px_rgba(239,68,68,0.4)] cursor-default"
                      : "text-red-700 bg-red-50 border border-red-300 hover:bg-red-100 hover:-translate-y-0.5"
                  }`}
                >
                  <FaTimes className="text-[10px]" />
                  {selected.status === "rejected" ? "Rejected ✓" : "Reject"}
                </button>

                <button
                  onClick={() => setConfirmDelete(selected._id)}
                  className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 border border-red-200 px-4 py-2 rounded-full hover:bg-red-100 transition-all"
                >
                  <FaTrash className="text-[10px]" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ LIST ============ */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 rounded-full border-4 border-[#4FC3F7]/30 border-t-[#4FC3F7] animate-spin" />
          <p className="mt-4 text-xs text-[#0A3A47]/60 font-semibold">
            Loading Applications...
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-red-200 animate-slideUp">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <FaExclamationTriangle className="text-red-500 text-xl" />
          </div>
          <h3 className="font-bold text-[#0F4C5C] text-lg mb-2">
            Failed To Load Applications
          </h3>
          <p className="text-[#0A3A47]/70 text-sm mb-5 max-w-md mx-auto">
            {error}
          </p>
          <button
            onClick={fetchApps}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#29B6F6] hover:text-[#0F4C5C] border border-[#4FC3F7]/40 hover:border-[#4FC3F7]/80 px-4 py-2 rounded-full transition-all"
          >
            <FaSync className="text-[10px]" />
            Try Again
          </button>
        </div>
      ) : apps.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#4FC3F7]/20 animate-slideUp">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
            <FaUserCheck className="text-[#22C55E] text-xl" />
          </div>
          <h3 className="font-bold text-[#0F4C5C] text-lg mb-2">
            No Job Applications Yet
          </h3>
          <p className="text-[#0A3A47]/70 text-sm max-w-md mx-auto mb-5">
            Jab Koi Candidate{" "}
            <strong className="text-[#0F4C5C]">Careers Page</strong> Se Job Apply
            Karega, Uska Data Yahan Aayega.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#E1F5FE] border border-[#4FC3F7]/30 rounded-xl px-4 py-2.5">
            <FaCheckCircle className="text-[#29B6F6] text-xs" />
            <span className="text-[11px] font-semibold text-[#0F4C5C]">
              Backend Connected — Waiting For Applications
            </span>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#4FC3F7]/20 animate-slideUp">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#4FC3F7]/10 flex items-center justify-center">
            <FaSearch className="text-[#29B6F6] text-xl" />
          </div>
          <h3 className="font-bold text-[#0F4C5C] text-lg mb-2">
            No Matching Applications
          </h3>
          <p className="text-[#0A3A47]/70 text-sm mb-5">
            Try Adjusting Your Search Or Filter.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setFilter("all");
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#29B6F6] hover:text-[#0F4C5C] border border-[#4FC3F7]/40 hover:border-[#4FC3F7]/80 px-4 py-2 rounded-full transition-all"
          >
            <FaTimes className="text-[10px]" />
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((app) => {
            const status = app.status || "pending";
            return (
              <div
                key={app._id || app.id}
                className="group relative bg-white rounded-2xl border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 p-4 transition-all duration-300 hover:shadow-[0_14px_35px_rgba(79,195,247,0.15)] overflow-hidden animate-slideUp"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center flex-shrink-0 shadow-[0_6px_16px_rgba(79,195,247,0.35)]">
                      <FaUser className="text-white text-sm" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-[#0F4C5C] text-base truncate">
                        {app.fullName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#0A3A47]/70 mt-0.5">
                        <a
                          href={`mailto:${app.email}`}
                          className="flex items-center gap-1 hover:text-[#29B6F6]"
                        >
                          <FaEnvelope className="text-[10px]" />
                          {app.email}
                        </a>
                        <a
                          href={`tel:${app.phone}`}
                          className="flex items-center gap-1 hover:text-[#29B6F6]"
                        >
                          <FaPhone className="text-[10px]" />
                          {app.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        STATUS_COLORS[status] || STATUS_COLORS.pending
                      }`}
                    >
                      {status}
                    </span>
                    <span className="text-[10px] text-[#0A3A47]/50 font-semibold whitespace-nowrap">
                      {app.createdAt
                        ? new Date(app.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-[10px] font-bold text-[#0F4C5C] bg-[#E1F5FE] border border-[#4FC3F7]/30 px-2.5 py-1 rounded-full">
                    {app.jobTitle || app.position}
                  </span>
                  {app.country && (
                    <span className="text-[10px] font-bold text-[#0F4C5C] bg-[#E1F5FE] border border-[#4FC3F7]/30 px-2.5 py-1 rounded-full">
                      {app.country}
                    </span>
                  )}
                  {app.category && (
                    <span className="text-[10px] font-bold text-[#0F4C5C] bg-[#E1F5FE] border border-[#4FC3F7]/30 px-2.5 py-1 rounded-full">
                      {app.category}
                    </span>
                  )}
                  {app.experience && (
                    <span className="text-[10px] font-bold text-[#0F4C5C] bg-[#E1F5FE] border border-[#4FC3F7]/30 px-2.5 py-1 rounded-full">
                      {app.experience}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#4FC3F7]/15">
                  <button
                    onClick={() => setSelected(app)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0F4C5C] bg-[#E1F5FE] hover:bg-[#4FC3F7]/20 border border-[#4FC3F7]/30 px-3 py-1.5 rounded-full transition-all"
                  >
                    <FaEye className="text-[9px]" />
                    View Details
                  </button>

                  {/* ✅ REPLY BUTTON — Opens Reply Modal */}
                  <button
                    onClick={() => openReply(app)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] px-3 py-1.5 rounded-full shadow-[0_6px_16px_rgba(79,195,247,0.3)] hover:-translate-y-0.5 transition-all"
                  >
                    <FaReply className="text-[9px]" />
                    Reply
                  </button>

                  {status === "pending" && (
                    <button
                      onClick={() => handleStatusChange(app._id, "reviewed")}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-yellow-700 bg-yellow-50 border border-yellow-300 px-3 py-1.5 rounded-full transition-all hover:bg-yellow-100"
                    >
                      <FaEnvelopeOpen className="text-[9px]" />
                      Reviewed
                    </button>
                  )}

                  <button
                    onClick={() =>
                      status !== "shortlisted" &&
                      handleStatusChange(app._id, "shortlisted")
                    }
                    disabled={status === "shortlisted"}
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all ${
                      status === "shortlisted"
                        ? "bg-green-500 text-white border-2 border-green-600 shadow-[0_6px_16px_rgba(34,197,94,0.4)] cursor-default"
                        : "text-green-700 bg-green-50 border border-green-300 hover:bg-green-100 hover:-translate-y-0.5"
                    }`}
                  >
                    <FaCheckCircle className="text-[9px]" />
                    {status === "shortlisted" ? "Shortlisted ✓" : "Shortlist"}
                  </button>

                  <button
                    onClick={() =>
                      status !== "rejected" &&
                      handleStatusChange(app._id, "rejected")
                    }
                    disabled={status === "rejected"}
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all ${
                      status === "rejected"
                        ? "bg-red-500 text-white border-2 border-red-600 shadow-[0_6px_16px_rgba(239,68,68,0.4)] cursor-default"
                        : "text-red-700 bg-red-50 border border-red-300 hover:bg-red-100 hover:-translate-y-0.5"
                    }`}
                  >
                    <FaTimes className="text-[9px]" />
                    {status === "rejected" ? "Rejected ✓" : "Reject"}
                  </button>

                  <button
                    onClick={() => setConfirmDelete(app._id)}
                    className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold text-red-500 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full transition-all hover:bg-red-100"
                  >
                    <FaTrash className="text-[9px]" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AdminJobApplications;