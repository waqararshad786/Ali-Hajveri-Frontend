// src/data/adminAuth.js
import { authApi, getToken, getUser, removeToken } from "../api/api";

export { removeToken };

/* ============================================================
   LOGIN
============================================================ */
export const login = async (email, password) => {
  try {
    const data = await authApi.login(email, password);
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

/* ============================================================
   LOGOUT
============================================================ */
export const logout = () => {
  authApi.logout();
};

/* ============================================================
   HAS TOKEN — Quick JWT Check
============================================================ */
export const hasToken = () => {
  const token = getToken();
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < now) {
      removeToken();
      return false;
    }
    return true;
  } catch {
    removeToken();
    return false;
  }
};

/* ============================================================
   ✅ ALIAS — Backward Compatibility
   — AdminLayout.jsx, Sidebar, etc. jo `isAuthenticated` import karte hain
============================================================ */
export const isAuthenticated = hasToken;

/* ============================================================
   GET CURRENT USER
============================================================ */
export const getCurrentUser = () => getUser();