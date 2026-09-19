// src/pages/AdminJobs.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaBriefcase,
  FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaGraduationCap,
  FaExclamationTriangle, FaCheckCircle, FaSearch,
  FaFire, FaStar, FaLayerGroup, FaSync, FaDatabase,
} from "react-icons/fa";
import { jobsApi } from "../api/api";

const EMPTY_FORM = {
  title: "",
  company: "",
  location: "",
  country: "",
  type: "Full Time",
  category: "Technical",
  salary: "",
  experience: "",
  education: "",
  posted: "Just now",
  urgent: false,
  featured: false,
  tags: "",
  description: "",
  requirements: "",
};

const CATEGORIES = ["Technical", "Professional", "General", "Semi-Skilled"];
const TYPES = ["Full Time", "Part Time", "Contract", "Temporary"];

/* ============================================================
   FIELD COMPONENT — With Red Asterisk
============================================================ */
const Field = ({ label, required, children }) => (
  <div>
    <label className="block text-xs font-bold text-[#0F4C5C] mb-1.5">
      {label}{" "}
      {required && <span className="text-red-500 text-sm font-extrabold">*</span>}
    </label>
    {children}
  </div>
);

const inputClass =
  "w-full bg-white border border-[#4FC3F7]/30 hover:border-[#4FC3F7]/60 focus:border-[#4FC3F7] focus:ring-2 focus:ring-[#4FC3F7]/30 rounded-xl px-3.5 py-2.5 text-sm text-[#0F4C5C] placeholder-[#0A3A47]/40 font-medium outline-none transition-all duration-200";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobsApi.getAll();
      setJobs(data.jobs || []);
    } catch (error) {
      showToast(error.message, "error");
    }
    setLoading(false);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEdit = (job) => {
    setForm({
      ...job,
      tags: (job.tags || []).join(", "),
      requirements: (job.requirements || []).join("\n"),
    });
    setEditingId(job._id || job.id);
    setShowForm(true);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setForm(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
  };

  /* ============================================================
     ✅ VALIDATION — Har Field Check
  ============================================================ */
  const validateForm = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Job Title Is Required";
    if (!form.company.trim()) e.company = "Company Name Is Required";
    if (!form.location.trim()) e.location = "Location Is Required";
    if (!form.country.trim()) e.country = "Country Is Required";
    if (!form.type.trim()) e.type = "Job Type Is Required";
    if (!form.category.trim()) e.category = "Category Is Required";
    if (!form.salary.trim()) e.salary = "Salary Range Is Required";
    if (!form.experience.trim()) e.experience = "Experience Is Required";
    if (!form.education.trim()) e.education = "Education Is Required";
    if (!form.description.trim()) e.description = "Description Is Required";
    if (!form.requirements.trim())
      e.requirements = "Requirements Are Required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* ✅ Validation Check */
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast("Please Fill All Required Fields", "error");
      /* Scroll To First Error */
      const firstError = document.querySelector("[data-error='true']");
      if (firstError)
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSaving(true);

    const jobData = {
      title: form.title,
      company: form.company,
      location: form.location,
      country: form.country,
      type: form.type,
      category: form.category,
      salary: form.salary,
      experience: form.experience,
      education: form.education,
      posted: editingId ? form.posted : "Just now",
      urgent: form.urgent,
      featured: form.featured,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      requirements: form.requirements
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      description: form.description,
    };

    try {
      if (editingId) {
        await jobsApi.update(editingId, jobData);
        showToast("Job Updated Successfully");
      } else {
        await jobsApi.create(jobData);
        showToast("Job Posted Successfully");
      }
      await fetchJobs();
      closeForm();
    } catch (error) {
      showToast(error.message || "Something Went Wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await jobsApi.delete(id);
      setConfirmDelete(null);
      showToast("Job Deleted", "error");
      await fetchJobs();
    } catch (error) {
      showToast(error.message || "Failed To Delete", "error");
    }
  };

  const handleSeed = async () => {
    if (
      !window.confirm(
        "This Will Add 3 Default Jobs To The Database. Continue?"
      )
    )
      return;
    setLoading(true);
    try {
      const data = await jobsApi.seed();
      showToast(data.message || "Default Jobs Added");
      await fetchJobs();
    } catch (error) {
      showToast(error.message || "Failed To Seed", "error");
    }
    setLoading(false);
  };

  const filteredJobs = jobs.filter((j) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      j.title?.toLowerCase().includes(term) ||
      j.company?.toLowerCase().includes(term) ||
      j.location?.toLowerCase().includes(term)
    );
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
      `}</style>

      {/* ============ HEADER ============ */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5 bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 rounded-full px-3 py-1">
              <FaDatabase className="text-[#29B6F6] text-[9px]" />
              <span className="text-[#0F4C5C] text-[9px] font-bold tracking-widest uppercase">
                Jobs Manager
              </span>
            </div>
            <h1 className="font-[Plus_Jakarta_Sans] text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F4C5C]">
              Manage{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Jobs
              </span>
            </h1>
            <p className="text-[#0A3A47]/60 text-xs mt-0.5">
              {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"} In Database
            </p>
          </div>

          <button
            onClick={openAdd}
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-4 py-2.5 rounded-full text-sm font-bold shadow-[0_10px_24px_rgba(79,195,247,0.35)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <FaPlus className="relative text-xs" />
            <span className="relative">Post New Job</span>
          </button>
        </div>

        {/* Action row */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button
            onClick={fetchJobs}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C5C] hover:text-[#29B6F6] border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 px-3.5 py-2 rounded-full transition-all disabled:opacity-50"
          >
            <FaSync className={`text-[10px] ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          {jobs.length === 0 && (
            <button
              onClick={handleSeed}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C5C] bg-[#FFD54F]/20 hover:bg-[#FFD54F]/30 border border-[#FFD54F]/50 px-3.5 py-2 rounded-full transition-all duration-300"
            >
              <FaDatabase className="text-[10px]" />
              Seed Default Jobs
            </button>
          )}
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

      {/* ============ SEARCH ============ */}
      {jobs.length > 0 && !showForm && (
        <div className="mb-5">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#29B6F6] text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Jobs..."
              className="w-full bg-white border border-[#4FC3F7]/25 focus:border-[#4FC3F7]/60 focus:ring-2 focus:ring-[#4FC3F7]/30 rounded-full pl-10 pr-4 py-2.5 text-sm text-[#0F4C5C] placeholder-[#0A3A47]/40 font-medium outline-none transition-all"
            />
          </div>
        </div>
      )}

      {/* ============ FORM ============ */}
      {showForm && (
        <div className="relative bg-white rounded-2xl border border-[#4FC3F7]/30 shadow-[0_20px_50px_rgba(15,76,92,0.15)] p-5 sm:p-7 mb-6 overflow-hidden animate-slideUp">
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] rounded-t-2xl" />

          <div className="flex items-center justify-between mb-5">
            <h2 className="font-[Plus_Jakarta_Sans] text-lg sm:text-xl font-extrabold text-[#0F4C5C]">
              {editingId ? "Edit Job" : "Post New Job"}
            </h2>
            <button
              onClick={closeForm}
              className="w-9 h-9 rounded-full bg-[#E1F5FE] flex items-center justify-center text-[#0F4C5C] hover:bg-[#4FC3F7]/20 transition-colors"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1 — Job Title + Company */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div data-error={!!errors.title}>
                <Field label="Job Title" required>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="e.g. Senior Electrician"
                    className={`${inputClass} ${
                      errors.title ? "border-red-400" : ""
                    }`}
                  />
                  {errors.title && (
                    <p className="text-[10px] text-red-500 mt-1 font-semibold">
                      {errors.title}
                    </p>
                  )}
                </Field>
              </div>
              <div data-error={!!errors.company}>
                <Field label="Company" required>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="e.g. Al Faris Contracting LLC"
                    className={`${inputClass} ${
                      errors.company ? "border-red-400" : ""
                    }`}
                  />
                  {errors.company && (
                    <p className="text-[10px] text-red-500 mt-1 font-semibold">
                      {errors.company}
                    </p>
                  )}
                </Field>
              </div>
            </div>

            {/* Row 2 — Location + Country */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div data-error={!!errors.location}>
                <Field label="Location" required>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="e.g. Dubai, UAE"
                    className={`${inputClass} ${
                      errors.location ? "border-red-400" : ""
                    }`}
                  />
                  {errors.location && (
                    <p className="text-[10px] text-red-500 mt-1 font-semibold">
                      {errors.location}
                    </p>
                  )}
                </Field>
              </div>
              <div data-error={!!errors.country}>
                <Field label="Country" required>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    placeholder="e.g. UAE"
                    className={`${inputClass} ${
                      errors.country ? "border-red-400" : ""
                    }`}
                  />
                  {errors.country && (
                    <p className="text-[10px] text-red-500 mt-1 font-semibold">
                      {errors.country}
                    </p>
                  )}
                </Field>
              </div>
            </div>

            {/* Row 3 — Job Type + Category */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Job Type" required>
                <select
                  value={form.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className={inputClass}
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Category" required>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className={inputClass}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Row 4 — Salary + Experience */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div data-error={!!errors.salary}>
                <Field label="Salary Range" required>
                  <input
                    type="text"
                    value={form.salary}
                    onChange={(e) => handleChange("salary", e.target.value)}
                    placeholder="e.g. AED 2,500 – 3,500"
                    className={`${inputClass} ${
                      errors.salary ? "border-red-400" : ""
                    }`}
                  />
                  {errors.salary && (
                    <p className="text-[10px] text-red-500 mt-1 font-semibold">
                      {errors.salary}
                    </p>
                  )}
                </Field>
              </div>
              <div data-error={!!errors.experience}>
                <Field label="Experience" required>
                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                    placeholder="e.g. 3–5 Years"
                    className={`${inputClass} ${
                      errors.experience ? "border-red-400" : ""
                    }`}
                  />
                  {errors.experience && (
                    <p className="text-[10px] text-red-500 mt-1 font-semibold">
                      {errors.experience}
                    </p>
                  )}
                </Field>
              </div>
            </div>

            {/* Row 5 — Education + Tags */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div data-error={!!errors.education}>
                <Field label="Education" required>
                  <input
                    type="text"
                    value={form.education}
                    onChange={(e) => handleChange("education", e.target.value)}
                    placeholder="e.g. Diploma / ITI"
                    className={`${inputClass} ${
                      errors.education ? "border-red-400" : ""
                    }`}
                  />
                  {errors.education && (
                    <p className="text-[10px] text-red-500 mt-1 font-semibold">
                      {errors.education}
                    </p>
                  )}
                </Field>
              </div>
              <Field label="Tags (Comma Separated)">
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                  placeholder="e.g. Electrical, Wiring"
                  className={inputClass}
                />
              </Field>
            </div>

            {/* Urgent / Featured Checkboxes */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.urgent}
                  onChange={(e) => handleChange("urgent", e.target.checked)}
                  className="w-4 h-4 accent-[#4FC3F7] cursor-pointer"
                />
                <span className="text-sm font-semibold text-[#0F4C5C] flex items-center gap-1.5">
                  <FaFire className="text-[#FFD54F] text-xs" />
                  Mark As Urgent
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => handleChange("featured", e.target.checked)}
                  className="w-4 h-4 accent-[#4FC3F7] cursor-pointer"
                />
                <span className="text-sm font-semibold text-[#0F4C5C] flex items-center gap-1.5">
                  <FaStar className="text-[#FFD54F] text-xs" />
                  Mark As Featured
                </span>
              </label>
            </div>

            {/* Row 6 — Description */}
            <div data-error={!!errors.description}>
              <Field label="Short Description" required>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Brief Summary Of The Job..."
                  className={`${inputClass} resize-none ${
                    errors.description ? "border-red-400" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold">
                    {errors.description}
                  </p>
                )}
              </Field>
            </div>

            {/* Row 7 — Requirements */}
            <div data-error={!!errors.requirements}>
              <Field label="Requirements (One Per Line)" required>
                <textarea
                  rows={4}
                  value={form.requirements}
                  onChange={(e) => handleChange("requirements", e.target.value)}
                  placeholder={"3–5 Years Experience\nValid ITI / Diploma\nWilling To Relocate"}
                  className={`${inputClass} resize-none ${
                    errors.requirements ? "border-red-400" : ""
                  }`}
                />
                {errors.requirements && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold">
                    {errors.requirements}
                  </p>
                )}
              </Field>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#4FC3F7]/20">
              <button
                type="button"
                onClick={closeForm}
                className="px-5 py-2.5 rounded-full text-sm font-bold text-[#0A3A47]/70 hover:text-[#0F4C5C] border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_10px_24px_rgba(79,195,247,0.35)] hover:-translate-y-0.5 transition-all overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <FaSave className="relative text-xs" />
                <span className="relative">
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Job"
                    : "Post Job"}
                </span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============ CONFIRM DELETE ============ */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0F4C5C]/50 backdrop-blur-sm p-4 animate-slideUp">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-red-200 p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <FaTrash className="text-red-500 text-lg" />
            </div>
            <h3 className="font-bold text-[#0F4C5C] text-lg mb-2">
              Delete This Job?
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

      {/* ============ JOBS LIST ============ */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 rounded-full border-4 border-[#4FC3F7]/30 border-t-[#4FC3F7] animate-spin" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#4FC3F7]/20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#4FC3F7]/10 flex items-center justify-center">
            <FaLayerGroup className="text-[#29B6F6] text-xl" />
          </div>
          <h3 className="font-bold text-[#0F4C5C] text-lg mb-2">
            No Jobs Posted Yet
          </h3>
          <p className="text-[#0A3A47]/70 text-sm mb-5">
            Post Your First Job Or Seed Default Jobs To Get Started.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={handleSeed}
              className="inline-flex items-center gap-2 bg-[#FFD54F]/20 hover:bg-[#FFD54F]/30 text-[#0F4C5C] border border-[#FFD54F]/50 px-5 py-2.5 rounded-full text-sm font-bold transition-all"
            >
              <FaDatabase className="text-xs" />
              Seed Default Jobs
            </button>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-5 py-2.5 rounded-full text-sm font-bold shadow-[0_10px_24px_rgba(79,195,247,0.35)]"
            >
              <FaPlus className="text-xs" />
              Post New Job
            </button>
          </div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#4FC3F7]/20">
          <FaSearch className="text-[#29B6F6] text-2xl mx-auto mb-3" />
          <p className="text-[#0A3A47]/70 text-sm">
            No Jobs Match "{search}"
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job._id || job.id}
              className="group relative bg-white rounded-2xl border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(79,195,247,0.15)] overflow-hidden"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              <div className="absolute top-4 right-4 flex gap-1.5">
                {job.featured && (
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFD54F] to-[#FFB300] flex items-center justify-center shadow-[0_4px_10px_rgba(255,213,79,0.4)]">
                    <FaStar className="text-white text-[10px]" />
                  </span>
                )}
                {job.urgent && (
                  <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shadow-[0_4px_10px_rgba(239,68,68,0.4)]">
                    <FaFire className="text-white text-[10px]" />
                  </span>
                )}
              </div>

              <h3 className="font-bold text-[#0F4C5C] text-base mb-1 pr-16 leading-tight">
                {job.title}
              </h3>
              <p className="text-xs text-[#0A3A47]/70 font-semibold mb-3">
                {job.company}
              </p>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-[11px] text-[#0A3A47]/75">
                  <FaMapMarkerAlt className="text-[#29B6F6] text-[10px]" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#0A3A47]/75">
                  <FaMoneyBillWave className="text-[#29B6F6] text-[10px]" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#0A3A47]/75">
                  <FaClock className="text-[#29B6F6] text-[10px]" />
                  {job.type}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-[#4FC3F7]/15">
                <button
                  onClick={() => openEdit(job)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#0F4C5C] bg-[#E1F5FE] hover:bg-[#4FC3F7]/20 border border-[#4FC3F7]/30 px-3 py-1.5 rounded-full transition-all"
                >
                  <FaEdit className="text-[9px]" />
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDelete(job._id || job.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-[11px] font-bold text-red-500 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-full transition-all"
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

export default AdminJobs;