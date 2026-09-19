import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import { authApi } from "../api/api";

const AdminResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [verifying, setVerifying] = useState(true);
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        await authApi.verifyResetToken(token);
        setValid(true);
      } catch (err) {
        setValid(false);
        setError(err.message || "Invalid or expired link");
      } finally {
        setVerifying(false);
      }
    };
    if (token) verify();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      await authApi.resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate("/admin/login"), 3000);
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

          {verifying ? (
            <div className="flex flex-col items-center py-12">
              <div className="w-12 h-12 rounded-full border-4 border-[#4FC3F7]/30 border-t-[#4FC3F7] animate-spin" />
              <p className="mt-4 text-[#0A3A47]/70 text-sm">Verifying link...</p>
            </div>
          ) : !valid ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <FaExclamationTriangle className="text-red-500 text-2xl" />
              </div>
              <h2 className="font-bold text-[#0F4C5C] text-lg mb-2">Invalid Link</h2>
              <p className="text-[#0A3A47]/70 text-sm mb-6">{error}</p>
              <Link to="/admin/forgot-password" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 py-3 rounded-full font-bold text-sm">
                Request New Link
              </Link>
            </div>
          ) : success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_12px_28px_rgba(79,195,247,0.45)]">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <h2 className="font-bold text-[#0F4C5C] text-xl mb-2">Password Reset!</h2>
              <p className="text-[#0A3A47]/70 text-sm mb-6">
                Redirecting to login...
              </p>
              <Link to="/admin/login" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 py-3 rounded-full font-bold text-sm">
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_12px_28px_rgba(79,195,247,0.45)]">
                  <FaLock className="text-white text-2xl" />
                </div>
              </div>

              <div className="text-center mb-7">
                <h1 className="font-[Plus_Jakarta_Sans] text-2xl font-extrabold text-[#0F4C5C] mb-1.5">
                  Reset Password
                </h1>
                <p className="text-[#0A3A47]/70 text-xs sm:text-sm">
                  Enter your new password
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#0F4C5C] mb-1.5 uppercase tracking-wider">New Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#29B6F6] text-xs" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      placeholder="Min 6 characters"
                      required
                      className="w-full bg-white border border-[#4FC3F7]/30 focus:border-[#4FC3F7] rounded-xl pl-10 pr-11 py-3 text-sm text-[#0F4C5C] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0A3A47]/50 hover:text-[#29B6F6]"
                    >
                      {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F4C5C] mb-1.5 uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#29B6F6] text-xs" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                      placeholder="Repeat password"
                      required
                      className="w-full bg-white border border-[#4FC3F7]/30 focus:border-[#4FC3F7] rounded-xl pl-10 pr-4 py-3 text-sm text-[#0F4C5C] outline-none"
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
                  {loading ? "Resetting..." : "Reset Password"}
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

export default AdminResetPassword;