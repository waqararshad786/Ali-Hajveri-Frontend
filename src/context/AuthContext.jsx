// src/context/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";
import { authApi, getToken, removeToken } from "../api/api";

const AuthContext = createContext(null);

/* ============================================================
   CONFIG
============================================================ */
const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 Minutes Idle Timeout

/* ============================================================
   AUTH PROVIDER
============================================================ */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const idleTimer = useRef(null);
  const location = useLocation();

  /* ---------- Logout ---------- */
  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    if (idleTimer.current) clearTimeout(idleTimer.current);
  }, []);

  /* ---------- Reset Idle Timer ---------- */
  const resetIdle = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (user) {
      idleTimer.current = setTimeout(() => {
        logout();
      }, IDLE_TIMEOUT_MS);
    }
  }, [user, logout]);

  /* ============================================================
     ✅ STRICT ADMIN SESSION
     — Jaise Hi Admin Public Page Pe Jaye, Session Clear Ho Jaye
     — Wapas Aane Pe Dobara Login Karna Pare
  ============================================================ */
  useEffect(() => {
    const isAdminPath = location.pathname.startsWith("/admin");
    const isAdminAuthPath =
      location.pathname === "/admin/login" ||
      location.pathname === "/admin/forgot-password" ||
      location.pathname.startsWith("/admin/reset-password");

    /* Agar Logged In User Admin Area Se Bahar Chala Gaya → Auto Logout */
    if (user && !isAdminPath) {
      logout();
    }

    /* Agar User Login Page Pe Aya Aur Logged In Hai → Session Clear */
    if (user && isAdminAuthPath) {
      logout();
    }
  }, [location.pathname, user, logout]);

  /* ---------- Initial Verify On App Boot ---------- */
  useEffect(() => {
    let cancelled = false;
    const verify = async () => {
      const token = getToken();

      /* ✅ Agar Token Hai Lekin Admin Path Pe Nahi → Clear Kar Do */
      const isAdminPath = window.location.pathname.startsWith("/admin");
      if (token && !isAdminPath) {
        removeToken();
        if (!cancelled) {
          setUser(null);
          setChecking(false);
        }
        return;
      }

      if (!token) {
        if (!cancelled) {
          setUser(null);
          setChecking(false);
        }
        return;
      }

      try {
        const data = await authApi.me();
        if (!cancelled) setUser(data.user);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setChecking(false);
      }
    };
    verify();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------- Idle Timer — Inactivity Pe Auto Logout ---------- */
  useEffect(() => {
    if (!user) return;

    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetIdle));
    resetIdle();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdle));
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [user, resetIdle]);

  /* ---------- Login ---------- */
  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    setUser(data.user);
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        checking,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ============================================================
   HOOK
============================================================ */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth Must Be Used Within AuthProvider");
  return ctx;
};