import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaPaperPlane } from "react-icons/fa";
import { authApi } from "../api/api";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authApi.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] flex items-center justify-center px-4 pt-24 pb-16">
      <div className="absolute -top-40 -right-40 w-[420px] h-[420px] bg-[#4FC3F7]/20 blur-3xl animate-blob" />
      <div className="absolute -bottom-40 -left-40 w-[380px] h-[380px] bg-[#FFD54F]/12 blur-3xl animate-blob" />

      <div className="relative w-full max-w-md">
        <div className="absolute -inset-4 bg-gradient-to-br from-[#4FC3F7]/30 to-[#FFD54F]/20 blur-3xl rounded-full opacity-60" />
        <div className="relative bg-white rounded-3xl p-7 sm:p-9 shadow-[0_30px_80px_rgba(15,76,92,0.4)] border border-[#4FC3F7]/25 overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7]" />

          <Link to="/admin/login" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0A3A47]/60 hover:text-[#29B6F6] mb-5">
            <FaArrowLeft className="text-[9px]" />
            Back to Login
          </Link>

          {success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_12px_28px_rgba(79,195,247,0.45)]">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <h2 className="font-[Plus_Jakarta_Sans] text-xl font-extrabold text-[#0F4C5C] mb-2">
                Check Your Email
              </h2>
              <p className="text-[#0A3A47]/70 text-sm mb-6">
                If <strong>{email}</strong> is registered, we've sent a password reset link.
                It expires in <strong>30 minutes</strong>.
              </p>
              <Link to="/admin/login" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 py-3 rounded-full font-bold text-sm">
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_12px_28px_rgba(79,195,247,0.45)]">
                  <FaPaperPlane className="text-white text-2xl" />
                </div>
              </div>

              <div className="text-center mb-7">
                <h1 className="font-[Plus_Jakarta_Sans] text-2xl font-extrabold text-[#0F4C5C] mb-1.5">
                  Forgot Password?
                </h1>
                <p className="text-[#0A3A47]/70 text-xs sm:text-sm">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#0F4C5C] mb-1.5 uppercase tracking-wider">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#29B6F6] text-xs" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="admin@example.com"
                      required
                      className="w-full bg-white border border-[#4FC3F7]/30 focus:border-[#4FC3F7] focus:ring-2 focus:ring-[#4FC3F7]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-[#0F4C5C] outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                    <FaExclamationTriangle className="text-red-500 text-xs" />
                    <span className="text-xs font-semibold text-red-600">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 py-3.5 rounded-xl font-bold shadow-[0_14px_30px_rgba(79,195,247,0.4)] disabled:opacity-70 text-sm"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blob { 0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; } }
        .animate-blob { animation: blob 9s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AdminForgotPassword;