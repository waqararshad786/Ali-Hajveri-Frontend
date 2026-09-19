// src/pages/AdminMessages.jsx
import React, { useState, useEffect } from "react";
import {
  FaEnvelope, FaPhone, FaUser, FaTrash, FaSync,
  FaSearch, FaCheckCircle, FaExclamationTriangle, FaEye,
  FaEnvelopeOpen, FaReply, FaTimes, FaPaperPlane, FaSpinner,
} from "react-icons/fa";
import { contactApi } from "../api/api";

const STATUS_COLORS = {
  new: "bg-blue-100 text-blue-700 border-blue-300",
  read: "bg-yellow-100 text-yellow-700 border-yellow-300",
  replied: "bg-green-100 text-green-700 border-green-300",
};

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
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
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await contactApi.getAll();
      setMessages(data.contacts || []);
    } catch (error) {
      showToast(error.message, "error");
    }
    setLoading(false);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await contactApi.updateStatus(id, status);
      showToast("Status Updated");
      fetchMessages();
      if (selected && selected._id === id) {
        setSelected({ ...selected, status });
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await contactApi.delete(id);
      setConfirmDelete(null);
      setSelected(null);
      showToast("Message Deleted", "error");
      fetchMessages();
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  /* ============================================================
     ✅ OPEN REPLY MODAL
  ============================================================ */
  const openReply = (msg) => {
    setReplyTo(msg);
    setReplyText("");
  };

  const closeReply = () => {
    setReplyTo(null);
    setReplyText("");
  };

  /* ============================================================
     ✅ SEND REPLY — Backend Se User Ko Email
  ============================================================ */
  const handleSendReply = async (e) => {
    e.preventDefault();

    if (!replyText.trim()) {
      showToast("Please Write A Reply Message", "error");
      return;
    }

    setSendingReply(true);
    try {
      await contactApi.reply(replyTo._id, replyText.trim());
      showToast("Reply Sent Successfully!");
      closeReply();

      /* Refresh messages */
      fetchMessages();

      /* Update selected if modal is open */
      if (selected && selected._id === replyTo._id) {
        setSelected({
          ...selected,
          status: "replied",
          replyMessage: replyText.trim(),
        });
      }
    } catch (error) {
      showToast(error.message || "Failed To Send Reply", "error");
    } finally {
      setSendingReply(false);
    }
  };

  const filtered = messages.filter((m) => {
    const term = search.trim().toLowerCase();
    const matchesSearch =
      !term ||
      m.name?.toLowerCase().includes(term) ||
      m.email?.toLowerCase().includes(term) ||
      m.subject?.toLowerCase().includes(term) ||
      m.message?.toLowerCase().includes(term);
    const matchesFilter = filter === "all" || m.status === filter;
    return matchesSearch && matchesFilter;
  });

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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* ============ HEADER ============ */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5 bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 rounded-full px-3 py-1">
              <FaEnvelope className="text-[#29B6F6] text-[9px]" />
              <span className="text-[#0F4C5C] text-[9px] font-bold tracking-widest uppercase">
                Contact Messages
              </span>
            </div>
            <h1 className="font-[Plus_Jakarta_Sans] text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F4C5C]">
              Contact{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Messages
              </span>
            </h1>
            <p className="text-[#0A3A47]/60 text-xs mt-0.5">
              {messages.length}{" "}
              {messages.length === 1 ? "Message" : "Messages"} Received
            </p>
          </div>

          <button
            onClick={fetchMessages}
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
              placeholder="Search Messages..."
              className="w-full bg-white border border-[#4FC3F7]/25 focus:border-[#4FC3F7]/60 focus:ring-2 focus:ring-[#4FC3F7]/30 rounded-full pl-10 pr-4 py-2.5 text-sm text-[#0F4C5C] placeholder-[#0A3A47]/40 font-medium outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {["all", "new", "read", "replied"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all ${
                  filter === f
                    ? "bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] border-[#4FC3F7]"
                    : "bg-white text-[#0F4C5C] border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
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

            {/* Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#4FC3F7]/20">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_8px_20px_rgba(79,195,247,0.4)]">
                  <FaReply className="text-white text-base" />
                </span>
                <div>
                  <h3 className="font-extrabold text-[#0F4C5C] text-base">
                    Reply To {replyTo.name}
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
              {/* Original Message Preview */}
              <div>
                <p className="text-[10px] font-bold text-[#0A3A47]/60 uppercase tracking-wider mb-2">
                  Original Message From {replyTo.name}
                </p>
                <p className="text-xs text-[#0A3A47]/75 leading-relaxed whitespace-pre-wrap bg-[#F8FAFC] border border-[#4FC3F7]/15 rounded-xl p-3 max-h-32 overflow-y-auto">
                  {replyTo.message}
                </p>
              </div>

              {/* Reply Textarea */}
              <div>
                <label className="block text-[11px] font-bold text-[#0F4C5C] mb-1.5 uppercase tracking-wider">
                  Your Reply <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Dear ${replyTo.name},\n\nWrite Your Response Here...`}
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
                        `Dear ${replyTo.name},\n\nThank You For Contacting Ali Hajveri International. We Have Received Your Inquiry And Our Team Is Currently Reviewing It.\n\nWe Will Get Back To You With A Detailed Response Within 3–4 Working Days.\n\nBest Regards,\nAli Hajveri International (Pvt.) Ltd.`
                      )
                    }
                    className="text-[10px] font-bold text-[#0F4C5C] bg-[#E1F5FE] hover:bg-[#4FC3F7]/20 border border-[#4FC3F7]/30 px-3 py-1.5 rounded-full transition-all"
                  >
                    📌 Received & Reviewing
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setReplyText(
                        `Dear ${replyTo.name},\n\nThank You For Your Interest In Ali Hajveri International.\n\nYour Query Has Been Forwarded To Our Concerned Department. You Will Receive A Detailed Response Shortly.\n\nBest Regards,\nAli Hajveri International (Pvt.) Ltd.`
                      )
                    }
                    className="text-[10px] font-bold text-[#0F4C5C] bg-[#E1F5FE] hover:bg-[#4FC3F7]/20 border border-[#4FC3F7]/30 px-3 py-1.5 rounded-full transition-all"
                  >
                    📌 Forwarded To Dept
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setReplyText(
                        `Dear ${replyTo.name},\n\nThank You For Contacting Us. For Urgent Matters, Please Call Us Directly At +92 300 1234567.\n\nBest Regards,\nAli Hajveri International (Pvt.) Ltd.`
                      )
                    }
                    className="text-[10px] font-bold text-[#0F4C5C] bg-[#E1F5FE] hover:bg-[#4FC3F7]/20 border border-[#4FC3F7]/30 px-3 py-1.5 rounded-full transition-all"
                  >
                    📌 Urgent — Call Us
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
              Delete This Message?
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
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#4FC3F7]/30 my-8 overflow-hidden animate-slideUp">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7]" />

            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#4FC3F7]/20">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_8px_20px_rgba(79,195,247,0.4)]">
                  <FaEnvelope className="text-white text-base" />
                </span>
                <div>
                  <h3 className="font-extrabold text-[#0F4C5C] text-base">
                    {selected.subject || "Contact Message"}
                  </h3>
                  <p className="text-[10px] text-[#0A3A47]/60 font-semibold">
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-9 h-9 rounded-full bg-[#E1F5FE] flex items-center justify-center text-[#0F4C5C] hover:bg-[#4FC3F7]/20 transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 bg-[#E1F5FE]/50 border border-[#4FC3F7]/20 rounded-xl p-3">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-white text-xs" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-[#0A3A47]/60 uppercase tracking-wider">
                      Name
                    </p>
                    <p className="text-xs font-bold text-[#0F4C5C] truncate">
                      {selected.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#E1F5FE]/50 border border-[#4FC3F7]/20 rounded-xl p-3">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-xs" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-[#0A3A47]/60 uppercase tracking-wider">
                      Email
                    </p>
                    <a
                      href={`mailto:${selected.email}`}
                      className="text-xs font-bold text-[#0F4C5C] hover:text-[#29B6F6] transition-colors truncate block"
                    >
                      {selected.email}
                    </a>
                  </div>
                </div>

                {selected.phone && (
                  <div className="flex items-center gap-3 bg-[#E1F5FE]/50 border border-[#4FC3F7]/20 rounded-xl p-3 sm:col-span-2">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-white text-xs" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold text-[#0A3A47]/60 uppercase tracking-wider">
                        Phone
                      </p>
                      <a
                        href={`tel:${selected.phone}`}
                        className="text-xs font-bold text-[#0F4C5C] hover:text-[#29B6F6] transition-colors"
                      >
                        {selected.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[10px] font-bold text-[#0A3A47]/60 uppercase tracking-wider mb-2">
                  Message
                </p>
                <p className="text-sm text-[#0A3A47]/85 leading-relaxed whitespace-pre-wrap bg-[#E1F5FE]/40 border border-[#4FC3F7]/20 rounded-xl p-4">
                  {selected.message}
                </p>
              </div>

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

              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#4FC3F7]/20">
                {/* ✅ REPLY VIA PANEL — Opens Reply Modal */}
                <button
                  onClick={() => openReply(selected)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] px-4 py-2 rounded-full shadow-[0_8px_20px_rgba(79,195,247,0.35)] hover:-translate-y-0.5 transition-all"
                >
                  <FaReply className="text-[10px]" />
                  Reply Via Email
                </button>

                {selected.status === "new" && (
                  <button
                    onClick={() => handleStatusChange(selected._id, "read")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-700 bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 px-4 py-2 rounded-full transition-all"
                  >
                    <FaEnvelopeOpen className="text-[10px]" />
                    Mark Read
                  </button>
                )}

                {selected.status !== "replied" && (
                  <button
                    onClick={() => handleStatusChange(selected._id, "replied")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 hover:bg-green-100 border border-green-300 px-4 py-2 rounded-full transition-all"
                  >
                    <FaCheckCircle className="text-[10px]" />
                    Mark Replied
                  </button>
                )}

                <button
                  onClick={() => setConfirmDelete(selected._id)}
                  className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-full transition-all"
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
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 rounded-full border-4 border-[#4FC3F7]/30 border-t-[#4FC3F7] animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#4FC3F7]/20 animate-slideUp">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#4FC3F7]/10 flex items-center justify-center">
            <FaEnvelope className="text-[#29B6F6] text-xl" />
          </div>
          <h3 className="font-bold text-[#0F4C5C] text-lg mb-2">
            No Messages Found
          </h3>
          <p className="text-[#0A3A47]/70 text-sm">
            {search || filter !== "all"
              ? "Try Adjusting Your Filters"
              : "Messages From The Contact Form Will Appear Here"}
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((msg) => (
            <div
              key={msg._id}
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
                      {msg.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#0A3A47]/70 mt-0.5">
                      <a
                        href={`mailto:${msg.email}`}
                        className="flex items-center gap-1 hover:text-[#29B6F6] transition-colors"
                      >
                        <FaEnvelope className="text-[10px]" />
                        {msg.email}
                      </a>
                      {msg.phone && (
                        <a
                          href={`tel:${msg.phone}`}
                          className="flex items-center gap-1 hover:text-[#29B6F6] transition-colors"
                        >
                          <FaPhone className="text-[10px]" />
                          {msg.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      STATUS_COLORS[msg.status] || STATUS_COLORS.new
                    }`}
                  >
                    {msg.status}
                  </span>
                  <span className="text-[10px] text-[#0A3A47]/50 font-semibold whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {msg.subject && (
                <p className="text-xs font-bold text-[#0F4C5C] mb-1.5">
                  Subject: {msg.subject}
                </p>
              )}

              <p className="text-sm text-[#0A3A47]/85 leading-relaxed whitespace-pre-wrap line-clamp-3 mb-3">
                {msg.message}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#4FC3F7]/15">
                <button
                  onClick={() => setSelected(msg)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0F4C5C] bg-[#E1F5FE] hover:bg-[#4FC3F7]/20 border border-[#4FC3F7]/30 px-3 py-1.5 rounded-full transition-all"
                >
                  <FaEye className="text-[9px]" />
                  View
                </button>

                {/* ✅ REPLY BUTTON — Opens Reply Modal */}
                <button
                  onClick={() => openReply(msg)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] px-3 py-1.5 rounded-full shadow-[0_6px_16px_rgba(79,195,247,0.3)] hover:-translate-y-0.5 transition-all"
                >
                  <FaReply className="text-[9px]" />
                  Reply
                </button>

                {msg.status === "new" && (
                  <button
                    onClick={() => handleStatusChange(msg._id, "read")}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-yellow-700 bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 px-3 py-1.5 rounded-full transition-all"
                  >
                    <FaEnvelopeOpen className="text-[9px]" />
                    Mark Read
                  </button>
                )}

                {msg.status !== "replied" && (
                  <button
                    onClick={() => handleStatusChange(msg._id, "replied")}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-green-700 bg-green-50 hover:bg-green-100 border border-green-300 px-3 py-1.5 rounded-full transition-all"
                  >
                    <FaCheckCircle className="text-[9px]" />
                    Mark Replied
                  </button>
                )}

                <button
                  onClick={() => setConfirmDelete(msg._id)}
                  className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold text-red-500 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-full transition-all"
                >
                  <FaTrash className="text-[9px]" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminMessages;