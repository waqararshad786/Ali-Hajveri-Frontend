// src/api/api.js
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/* ============================================================
   API ENDPOINTS
============================================================ */
export const API_ENDPOINTS = {
  AUTH: {
    SEED: "/auth/seed",
    LOGIN: "/auth/login",
    ME: "/auth/me",
    REGISTER: "/auth/register",
    UPDATE_PROFILE: "/auth/profile",
    UPDATE_PASSWORD: "/auth/password",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_RESET_TOKEN: (token) => `/auth/verify-reset-token/${token}`,
    RESET_PASSWORD: (token) => `/auth/reset-password/${token}`,
  },
  JOBS: {
    LIST: "/jobs",
    GET: (id) => `/jobs/${id}`,
    CREATE: "/jobs",
    UPDATE: (id) => `/jobs/${id}`,
    DELETE: (id) => `/jobs/${id}`,
    SEED: "/jobs/seed",
  },
  APPLICATIONS: {
    SUBMIT: "/applications",
    LIST: "/applications",
    UPDATE: (id) => `/applications/${id}`,
    DELETE: (id) => `/applications/${id}`,
    FILE: (id) => `/applications/${id}/file`,
    REPLY: (id) => `/applications/${id}/reply`,
  },
  CONTACT: {
    SUBMIT: "/contact",
    LIST: "/contact",
    UPDATE: (id) => `/contact/${id}`,
    DELETE: (id) => `/contact/${id}`,
    REPLY: (id) => `/contact/${id}/reply`,
  },
  CV: {
    SUBMIT: "/cv",
    LIST: "/cv",
    UPDATE: (id) => `/cv/${id}`,
    DELETE: (id) => `/cv/${id}`,
    FILE: (id) => `/cv/${id}/file`,
    REPLY: (id) => `/cv/${id}/reply`,
  },
};

/* ============================================================
   AUTH STORAGE
============================================================ */
const SESSION_KEY = "ahioep_session";

export const setToken = (token, user = null) => {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token, user }));
  } catch {}
};

export const getToken = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw).token || null;
  } catch {
    return null;
  }
};

export const getUser = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw).user || null;
  } catch {
    return null;
  }
};

export const removeToken = () => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {}
  try {
    localStorage.removeItem("ahioep_token");
    localStorage.removeItem("ahioep_user");
  } catch {}
};

/* ============================================================
   REQUEST WRAPPER
============================================================ */
const request = async (endpoint, options = {}) => {
  const token = getToken();
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(!isFormData ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    removeToken();
    if (
      window.location.pathname.startsWith("/admin") &&
      window.location.pathname !== "/admin/login"
    ) {
      window.location.href = "/admin/login";
    }
    throw new Error(data.message || "Session Expired. Please Login Again.");
  }

  if (!res.ok) throw new Error(data.message || "Something Went Wrong");
  return data;
};

/* ============================================================
   AUTH API
============================================================ */
export const authApi = {
  login: async (email, password) => {
    const data = await request(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (data.token) setToken(data.token, data.user);
    return data;
  },
  me: () => request(API_ENDPOINTS.AUTH.ME),
  updateProfile: (username, email) =>
    request(API_ENDPOINTS.AUTH.UPDATE_PROFILE, {
      method: "PUT",
      body: JSON.stringify({ username, email }),
    }),
  updatePassword: (currentPassword, newPassword) =>
    request(API_ENDPOINTS.AUTH.UPDATE_PASSWORD, {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
  forgotPassword: (email) =>
    request(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
  verifyResetToken: (token) =>
    request(API_ENDPOINTS.AUTH.VERIFY_RESET_TOKEN(token)),
  resetPassword: (token, newPassword) =>
    request(API_ENDPOINTS.AUTH.RESET_PASSWORD(token), {
      method: "POST",
      body: JSON.stringify({ newPassword }),
    }),
  logout: () => removeToken(),
};

/* ============================================================
   JOBS API
============================================================ */
export const jobsApi = {
  getAll: () => request(API_ENDPOINTS.JOBS.LIST),
  getOne: (id) => request(API_ENDPOINTS.JOBS.GET(id)),
  create: (job) =>
    request(API_ENDPOINTS.JOBS.CREATE, {
      method: "POST",
      body: JSON.stringify(job),
    }),
  update: (id, job) =>
    request(API_ENDPOINTS.JOBS.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify(job),
    }),
  delete: (id) => request(API_ENDPOINTS.JOBS.DELETE(id), { method: "DELETE" }),
  seed: () => request(API_ENDPOINTS.JOBS.SEED, { method: "POST" }),
};

/* ============================================================
   APPLICATIONS API
============================================================ */
export const applicationsApi = {
  submit: (payload) => {
    const isFormData = payload instanceof FormData;
    return request(API_ENDPOINTS.APPLICATIONS.SUBMIT, {
      method: "POST",
      body: isFormData ? payload : JSON.stringify(payload),
    });
  },
  getAll: () => request(API_ENDPOINTS.APPLICATIONS.LIST),
  updateStatus: (id, status) =>
    request(API_ENDPOINTS.APPLICATIONS.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
  delete: (id) =>
    request(API_ENDPOINTS.APPLICATIONS.DELETE(id), { method: "DELETE" }),

  /* ✅ Reply To Applicant */
  reply: (id, replyMessage) =>
    request(API_ENDPOINTS.APPLICATIONS.REPLY(id), {
      method: "POST",
      body: JSON.stringify({ replyMessage }),
    }),
};

/* ============================================================
   CONTACT API
============================================================ */
export const contactApi = {
  submit: (contact) =>
    request(API_ENDPOINTS.CONTACT.SUBMIT, {
      method: "POST",
      body: JSON.stringify(contact),
    }),
  getAll: () => request(API_ENDPOINTS.CONTACT.LIST),
  updateStatus: (id, status) =>
    request(API_ENDPOINTS.CONTACT.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
  delete: (id) =>
    request(API_ENDPOINTS.CONTACT.DELETE(id), { method: "DELETE" }),

  /* ✅ Reply To Contact */
  reply: (id, replyMessage) =>
    request(API_ENDPOINTS.CONTACT.REPLY(id), {
      method: "POST",
      body: JSON.stringify({ replyMessage }),
    }),
};

/* ============================================================
   CV API
============================================================ */
export const cvApi = {
  submit: (formData) =>
    request(API_ENDPOINTS.CV.SUBMIT, {
      method: "POST",
      body: formData,
    }),
  getAll: () => request(API_ENDPOINTS.CV.LIST),
  updateStatus: (id, status) =>
    request(API_ENDPOINTS.CV.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
  delete: (id) => request(API_ENDPOINTS.CV.DELETE(id), { method: "DELETE" }),

  /* ✅ Reply To CV Applicant */
  reply: (id, replyMessage) =>
    request(API_ENDPOINTS.CV.REPLY(id), {
      method: "POST",
      body: JSON.stringify({ replyMessage }),
    }),
};