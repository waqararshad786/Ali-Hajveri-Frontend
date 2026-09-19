// src/pages/AdminProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaLock, FaCheckCircle, FaExclamationTriangle,
  FaSave, FaUserCircle, FaShieldAlt,
} from "react-icons/fa";
import { authApi } from "../api/api";
import { getCurrentUser, logout } from "../data/adminAuth";

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    setUsername(u?.username || "");
    setEmail(u?.email || "");
  }, []);

  /* ============================================================
     ✅ UPDATE PROFILE — Username + Email Dono
  ============================================================ */
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMsg(null);

    if (!username.trim()) {
      return setProfileMsg({ type: "error", text: "Username Cannot Be Empty" });
    }
    if (!email.trim()) {
      return setProfileMsg({ type: "error", text: "Email Cannot Be Empty" });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setProfileMsg({ type: "error", text: "Enter A Valid Email" });
    }

    setProfileLoading(true);
    try {
      const data = await authApi.updateProfile(username, email);

      /* ✅ Session Storage Bhi Update Karo */
      try {
        const raw = sessionStorage.getItem("ahioep_session");
        if (raw) {
          const parsed = JSON.parse(raw);
          parsed.user = data.user;
          sessionStorage.setItem("ahioep_session", JSON.stringify(parsed));
        }
      } catch {}

      setUser(data.user);
      setProfileMsg({
        type: "success",
        text: "Profile Updated Successfully!",
      });
    } catch (err) {
      setProfileMsg({ type: "error", text: err.message });
    } finally {
      setProfileLoading(false);
    }
  };

  /* ============================================================
     UPDATE PASSWORD
  ============================================================ */
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 6) {
      return setPasswordMsg({
        type: "error",
        text: "Password Must Be At Least 6 Characters",
      });
    }
    if (newPassword !== confirmPassword) {
      return setPasswordMsg({
        type: "error",
        text: "Passwords Do Not Match",
      });
    }

    setPasswordLoading(true);
    try {
      await authApi.updatePassword(currentPassword, newPassword);
      setPasswordMsg({
        type: "success",
        text: "Password Updated! Logging You Out...",
      });

      setTimeout(() => {
        logout();
        navigate("/admin/login", { replace: true });
      }, 1500);
    } catch (err) {
      setPasswordMsg({ type: "error", text: err.message });
      setPasswordLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-[#4FC3F7]/30 hover:border-[#4FC3F7]/60 focus:border-[#4FC3F7] focus:ring-2 focus:ring-[#4FC3F7]/30 rounded-xl px-4 py-2.5 text-sm text-[#0F4C5C] placeholder-[#0A3A47]/40 font-medium outline-none transition-all";

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 mb-1.5 bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 rounded-full px-3 py-1">
          <FaUserCircle className="text-[#29B6F6] text-[9px]" />
          <span className="text-[#0F4C5C] text-[9px] font-bold tracking-widest uppercase">
            Account Settings
          </span>
        </div>
        <h1 className="font-[Plus_Jakarta_Sans] text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F4C5C]">
          My{" "}
          <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
            Profile
          </span>
        </h1>
        <p className="text-[#0A3A47]/60 text-xs mt-0.5">
          Update Your Username, Email, And Password
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* ===== Profile Card ===== */}
        <div className="relative bg-white rounded-2xl border border-[#4FC3F7]/25 p-5 sm:p-6 shadow-[0_14px_40px_rgba(15,76,92,0.08)] overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7]" />

          <div className="flex items-center gap-3 mb-5">
            <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_8px_20px_rgba(79,195,247,0.4)]">
              <FaUser className="text-white text-base" />
            </span>
            <div>
              <h2 className="font-extrabold text-[#0F4C5C] text-base">
                Update Profile
              </h2>
              <p className="text-[10px] text-[#0A3A47]/60 font-semibold">
                Change Your Username And Email
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#0F4C5C] mb-1.5 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#29B6F6] text-xs" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setProfileMsg(null);
                  }}
                  placeholder="Enter Username"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#0F4C5C] mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#29B6F6] text-xs" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setProfileMsg(null);
                  }}
                  placeholder="admin@example.com"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {profileMsg && (
              <div
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 ${
                  profileMsg.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {profileMsg.type === "success" ? (
                  <FaCheckCircle className="text-green-500 text-xs" />
                ) : (
                  <FaExclamationTriangle className="text-red-500 text-xs" />
                )}
                <span
                  className={`text-xs font-semibold ${
                    profileMsg.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {profileMsg.text}
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={profileLoading}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 py-3 rounded-xl font-bold shadow-[0_10px_24px_rgba(79,195,247,0.35)] disabled:opacity-70 text-sm hover:-translate-y-0.5 transition-all"
            >
              <FaSave className="text-xs" />
              {profileLoading ? "Saving..." : "Update Profile"}
            </button>
          </form>
        </div>

        {/* ===== Password Card ===== */}
        <div className="relative bg-white rounded-2xl border border-[#4FC3F7]/25 p-5 sm:p-6 shadow-[0_14px_40px_rgba(15,76,92,0.08)] overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7]" />

          <div className="flex items-center gap-3 mb-5">
            <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_8px_20px_rgba(79,195,247,0.4)]">
              <FaLock className="text-white text-base" />
            </span>
            <div>
              <h2 className="font-extrabold text-[#0F4C5C] text-base">
                Change Password
              </h2>
              <p className="text-[10px] text-[#0A3A47]/60 font-semibold">
                You'll Be Logged Out After Change
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#0F4C5C] mb-1.5 uppercase tracking-wider">
                Current Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#29B6F6] text-xs" />
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setPasswordMsg(null);
                  }}
                  placeholder="Enter Current Password"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#0F4C5C] mb-1.5 uppercase tracking-wider">
                New Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#29B6F6] text-xs" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPasswordMsg(null);
                  }}
                  placeholder="Min 6 Characters"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#0F4C5C] mb-1.5 uppercase tracking-wider">
                Confirm New Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#29B6F6] text-xs" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordMsg(null);
                  }}
                  placeholder="Repeat New Password"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {passwordMsg && (
              <div
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 ${
                  passwordMsg.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {passwordMsg.type === "success" ? (
                  <FaCheckCircle className="text-green-500 text-xs" />
                ) : (
                  <FaExclamationTriangle className="text-red-500 text-xs" />
                )}
                <span
                  className={`text-xs font-semibold ${
                    passwordMsg.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {passwordMsg.text}
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 py-3 rounded-xl font-bold shadow-[0_10px_24px_rgba(79,195,247,0.35)] disabled:opacity-70 text-sm hover:-translate-y-0.5 transition-all"
            >
              <FaSave className="text-xs" />
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>

      {/* Info */}
      <div className="mt-5 bg-white border border-[#4FC3F7]/20 rounded-2xl p-4">
        <div className="flex items-start gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-[#4FC3F7]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <FaShieldAlt className="text-[#29B6F6] text-xs" />
          </span>
          <div>
            <h4 className="font-bold text-[#0F4C5C] text-xs mb-0.5">
              Secure Account
            </h4>
            <p className="text-[#0A3A47]/70 text-[11px] leading-relaxed">
              Your Username, Email, And Password Changes Are Saved Securely.
              Password Changes Will Log You Out For Security.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;