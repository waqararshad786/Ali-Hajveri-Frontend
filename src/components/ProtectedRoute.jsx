// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authApi, getToken, removeToken } from "../api/api";

/* ============================================================
   PROTECTED ROUTE
   — Har Route Change Pe Backend Se Verify Karta Hai
   — Token Nahi To Instantly Login Page Pe Bhejta Hai
   — Loading State Dikhata Hai Verification Ke Doran
============================================================ */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [status, setStatus] = useState("checking"); // "checking" | "ok" | "denied"

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      const token = getToken();

      /* ✅ No Token → Instantly Deny */
      if (!token) {
        removeToken();
        if (!cancelled) setStatus("denied");
        return;
      }

      /* ✅ Verify Token With Backend (Real Check) */
      try {
        await authApi.me();
        if (!cancelled) setStatus("ok");
      } catch {
        removeToken();
        if (!cancelled) setStatus("denied");
      }
    };

    verify();

    return () => {
      cancelled = true;
    };
  }, [location.pathname]); // Re-Verify On Every Route Change

  /* ============ LOADING STATE ============ */
  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#4FC3F7]/30 border-t-[#4FC3F7] animate-spin" />
          <p className="text-white/80 text-sm font-semibold">
            Verifying Session…
          </p>
        </div>
      </div>
    );
  }

  /* ============ DENIED — Redirect To Login ============ */
  if (status === "denied") {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  /* ============ OK — Render Children ============ */
  return children;
};

export default ProtectedRoute;