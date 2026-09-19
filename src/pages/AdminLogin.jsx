// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
  FaExclamationTriangle,
  FaArrowLeft,
} from "react-icons/fa";
import { login } from "../data/adminAuth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ============================================================
     HANDLE SUBMIT
     — Login → Full Page Reload → ProtectedRoute Backend Se Verify Karega
  ============================================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      /* ✅ Full Reload — Taake AuthContext Aur ProtectedRoute Fresh Verify Karein */
      window.location.href = "/admin/dashboard";
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] flex items-center justify-center px-4 pt-8 pb-13">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#4FC3F7 1px, transparent 1px), linear-gradient(90deg, #4FC3F7 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Blobs */}
      <div className="absolute -top-40 -right-40 w-[420px] h-[420px] bg-[#4FC3F7]/20 blur-3xl animate-blob" />
      <div
        className="absolute -bottom-40 -left-40 w-[380px] h-[380px] bg-[#FFD54F]/12 blur-3xl animate-blob"
        style={{ animationDelay: "2s" }}
      />

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#4FC3F7] opacity-50 animate-float"
          style={{
            left: `${8 + i * 11}%`,
            top: `${15 + (i % 4) * 20}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-4 bg-gradient-to-br from-[#4FC3F7]/30 to-[#FFD54F]/20 blur-3xl rounded-full opacity-60" />

        <div className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-[0_30px_80px_rgba(15,76,92,0.4)] border border-[#4FC3F7]/25 overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0A3A47]/60 hover:text-[#29B6F6] mb-4 transition-colors"
          >
            <FaArrowLeft className="text-[9px]" />
            Back To Home
          </Link>

          {/* Icon + Heading Row — Compact */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-shrink-0">
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] blur-md opacity-50 animate-pulse" />
              <span className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_10px_24px_rgba(79,195,247,0.4)]">
                <FaShieldAlt className="text-white text-lg" />
              </span>
            </div>
            <div>
              <h1 className="font-[Plus_Jakarta_Sans] text-xl sm:text-2xl font-extrabold text-[#0F4C5C] leading-tight">
                Admin{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                  Login
                </span>
              </h1>
              <p className="text-[#0A3A47]/60 text-[11px] font-semibold">
                Sign In With Your Email
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold text-[#0F4C5C] mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#29B6F6] text-xs" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                  className="w-full bg-white border border-[#4FC3F7]/30 hover:border-[#4FC3F7]/60 focus:border-[#4FC3F7] focus:ring-2 focus:ring-[#4FC3F7]/30 rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#0F4C5C] placeholder-[#0A3A47]/40 font-medium outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-bold text-[#0F4C5C] mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#29B6F6] text-xs" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter Your Password"
                  autoComplete="current-password"
                  required
                  className="w-full bg-white border border-[#4FC3F7]/30 hover:border-[#4FC3F7]/60 focus:border-[#4FC3F7] focus:ring-2 focus:ring-[#4FC3F7]/30 rounded-lg pl-9 pr-10 py-2.5 text-sm text-[#0F4C5C] placeholder-[#0A3A47]/40 font-medium outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[#0A3A47]/50 hover:text-[#29B6F6] hover:bg-[#4FC3F7]/10 transition-all"
                  aria-label={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-xs" />
                  ) : (
                    <FaEye className="text-xs" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end -mt-1">
              <Link
                to="/admin/forgot-password"
                className="text-[10px] font-bold text-[#29B6F6] hover:text-[#0F4C5C] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 animate-slideUp">
                <FaExclamationTriangle className="text-red-500 text-xs flex-shrink-0" />
                <span className="text-[11px] font-semibold text-red-600">
                  {error}
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 py-3 rounded-lg font-bold shadow-[0_14px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-sm overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ animation: "gradientShift 4s ease infinite" }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">
                {loading ? "Signing In..." : "Sign In"}
              </span>
              {!loading && (
                <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-18px) translateX(8px); }
        }
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blob 9s ease-in-out infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AdminLogin;