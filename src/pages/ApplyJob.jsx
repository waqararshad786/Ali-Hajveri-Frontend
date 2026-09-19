// src/pages/ApplyJob.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase,
  FaGraduationCap, FaGlobe, FaCheckCircle, FaArrowLeft,
  FaPaperPlane, FaExclamationTriangle, FaSpinner, FaBuilding,
  FaMoneyBillWave, FaClock, FaCloudUploadAlt, FaTimes,
  FaFileAlt,
} from "react-icons/fa";
import { jobsApi, applicationsApi } from "../api/api";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    experience: "",
    education: "",
    skills: "",
    message: "",
    fileName: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const data = await jobsApi.getOne(id);
        setJob(data.job);
      } catch (err) {
        setNotFound(true);
      }
      setLoading(false);
    };
    if (id) fetchJob();
  }, [id]);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (error) setError("");
  };

  /* ============================================================
     ✅ FILE PROCESSING — Validation + Store
  ============================================================ */
  const processFile = (file) => {
    if (!file) return;

    /* Size Check — 5 MB Max */
    if (file.size > 5 * 1024 * 1024) {
      setError("File Size Must Be Less Than 5 MB");
      return;
    }

    /* Type Check */
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const fileType = file.type || "";
    if (!allowed.includes(fileType) && !/\.(pdf|doc|docx)$/i.test(file.name)) {
      setError("Only PDF, DOC, Or DOCX Files Are Allowed");
      return;
    }

    setCvFile(file);
    update("fileName", file.name);
    setError("");
  };

  const handleFile = (e) => {
    processFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  const removeFile = () => {
    setCvFile(null);
    update("fileName", "");
  };

  /* ============================================================
     ✅ SUBMIT — FormData With Actual File
  ============================================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName.trim()) return setError("Full Name Is Required");
    if (!form.email.trim()) return setError("Email Is Required");
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return setError("Enter A Valid Email");
    if (!form.phone.trim()) return setError("Phone Number Is Required");
    if (!form.country.trim()) return setError("Country Is Required");
    if (!form.experience) return setError("Experience Is Required");
    if (!form.education) return setError("Education Is Required");

    setSubmitting(true);

    try {
      /* ✅ FormData Banao */
      const formData = new FormData();
      formData.append("jobId", job._id || job.id);
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("country", form.country);
      formData.append("city", form.city);
      formData.append("experience", form.experience);
      formData.append("education", form.education);
      formData.append("skills", form.skills);
      formData.append("message", form.message);

      /* ✅ Actual File — Backend Field Name `cvFile` */
      if (cvFile) {
        formData.append("cvFile", cvFile);
      }

      await applicationsApi.submit(formData);

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message || "Failed To Submit. Please Try Again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-[#4FC3F7]/30 hover:border-[#4FC3F7]/60 focus:border-[#4FC3F7] focus:ring-2 focus:ring-[#4FC3F7]/30 rounded-xl px-4 py-3 text-sm text-[#0F4C5C] placeholder-[#0A3A47]/40 font-medium outline-none transition-all duration-200";

  /* ============ SUCCESS ============ */
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] flex items-center justify-center px-4 pt-24 pb-16">
        <div className="relative w-full max-w-lg">
          <div className="absolute -inset-4 bg-gradient-to-br from-[#4FC3F7]/30 to-[#FFD54F]/20 blur-3xl rounded-full opacity-60" />
          <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-[0_30px_80px_rgba(15,76,92,0.4)] text-center">
            <div className="relative w-20 h-20 mx-auto mb-5">
              <span className="absolute inset-0 rounded-full bg-[#4FC3F7]/30 animate-ping" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_12px_30px_rgba(79,195,247,0.5)]">
                <FaCheckCircle className="text-white text-3xl" />
              </div>
            </div>

            <h1 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl font-extrabold text-[#0F4C5C] mb-3">
              Application{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] bg-clip-text text-transparent">
                Submitted!
              </span>
            </h1>

            <p className="text-[#0A3A47]/75 text-sm leading-relaxed mb-3">
              Thank You, <strong>{form.fullName}</strong>! Your Application For{" "}
              <strong>{job?.title}</strong> Has Been Received.
            </p>

            <div className="bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 rounded-xl p-3 mb-6">
              <p className="text-[11px] text-[#0A3A47]/80 leading-relaxed">
                📧 A Confirmation Email Has Been Sent To{" "}
                <strong className="text-[#0F4C5C]">{form.email}</strong>.
                <br />
                Our Team Will Review Your Application And Contact You Within{" "}
                <strong className="text-[#0F4C5C]">3–4 Working Days</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/careers"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:-translate-y-0.5 transition-all text-sm"
              >
                Browse More Jobs
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#0F4C5C]/30 text-[#0F4C5C] px-6 py-3 rounded-full font-bold hover:bg-[#E1F5FE] transition-all text-sm"
              >
                Back To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ============ LOADING ============ */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F4C5C] to-[#06303A]">
        <div className="w-12 h-12 rounded-full border-4 border-[#4FC3F7]/30 border-t-[#4FC3F7] animate-spin" />
      </div>
    );
  }

  /* ============ NOT FOUND ============ */
  if (notFound || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E1F5FE] to-white px-4 pt-24 pb-16">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <FaExclamationTriangle className="text-red-500 text-xl" />
          </div>
          <h2 className="text-xl font-bold text-[#0F4C5C] mb-2">Job Not Found</h2>
          <p className="text-[#0A3A47]/70 text-sm mb-5">
            This Job May Have Been Removed Or Expired.
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 py-3 rounded-full font-bold text-sm"
          >
            <FaArrowLeft className="text-xs" />
            Back To Careers
          </Link>
        </div>
      </div>
    );
  }

  /* ============ MAIN FORM ============ */
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E1F5FE] via-white to-[#E1F5FE] pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0A3A47]/70 hover:text-[#29B6F6] mb-5 transition-colors"
        >
          <FaArrowLeft className="text-[10px]" />
          Back
        </button>

        {/* Job Summary */}
        <div className="relative bg-white rounded-2xl border border-[#4FC3F7]/25 p-5 mb-6 overflow-hidden shadow-[0_10px_30px_rgba(15,76,92,0.08)]">
          <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7]" />
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center flex-shrink-0 shadow-[0_8px_20px_rgba(79,195,247,0.4)]">
              <FaBriefcase className="text-white text-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-extrabold text-[#29B6F6] bg-[#4FC3F7]/10 px-2 py-0.5 rounded-full tracking-wider uppercase">
                Applying For
              </span>
              <h1 className="font-[Plus_Jakarta_Sans] text-lg sm:text-xl font-extrabold text-[#0F4C5C] mt-1.5 leading-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-[#0A3A47]/70 font-semibold">
                <span className="flex items-center gap-1.5">
                  <FaBuilding className="text-[#29B6F6] text-[10px]" />
                  {job.company}
                </span>
                <span className="flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-[#29B6F6] text-[10px]" />
                  {job.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="relative bg-white rounded-2xl border border-[#4FC3F7]/25 p-6 sm:p-8 shadow-[0_14px_40px_rgba(15,76,92,0.10)] overflow-hidden"
        >
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

          <h2 className="font-[Plus_Jakarta_Sans] text-lg sm:text-xl font-extrabold text-[#0F4C5C] mb-5">
            Fill Your Application
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name" required icon={FaUser}>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="e.g. Muhammad Ali"
                className={inputClass}
              />
            </Field>

            <Field label="Email Address" required icon={FaEnvelope}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>

            <Field label="Phone Number" required icon={FaPhone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+92 300 1234567"
                className={inputClass}
              />
            </Field>

            <Field label="Country" required icon={FaGlobe}>
              <input
                type="text"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                placeholder="e.g. Pakistan"
                className={inputClass}
              />
            </Field>

            <Field label="City" icon={FaMapMarkerAlt}>
              <input
                type="text"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="e.g. Lahore"
                className={inputClass}
              />
            </Field>

            <Field label="Years Of Experience" required icon={FaBriefcase}>
              <select
                value={form.experience}
                onChange={(e) => update("experience", e.target.value)}
                className={inputClass}
              >
                <option value="">Select Experience</option>
                <option value="Fresher">Fresher (No Experience)</option>
                <option value="1-2">1–2 Years</option>
                <option value="3-5">3–5 Years</option>
                <option value="5-10">5–10 Years</option>
                <option value="10+">10+ Years</option>
              </select>
            </Field>

            <Field label="Highest Education" required icon={FaGraduationCap}>
              <select
                value={form.education}
                onChange={(e) => update("education", e.target.value)}
                className={inputClass}
              >
                <option value="">Select Education</option>
                <option value="Primary">Primary</option>
                <option value="Matric">Matric / 10th</option>
                <option value="Intermediate">Intermediate / 12th</option>
                <option value="Bachelor">Bachelor's Degree</option>
                <option value="Master">Master's Degree</option>
                <option value="Diploma">Diploma / Technical</option>
              </select>
            </Field>

            <Field label="Key Skills" icon={FaBriefcase}>
              <input
                type="text"
                value={form.skills}
                onChange={(e) => update("skills", e.target.value)}
                placeholder="e.g. Welding, Wiring, AutoCAD"
                className={inputClass}
              />
            </Field>
          </div>

          {/* ============================================================
              ✅ CV UPLOAD SECTION
          ============================================================ */}
          <div className="mt-5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-[#0F4C5C] mb-2">
              <FaFileAlt className="text-[#29B6F6] text-[10px]" />
              Upload Your CV
              <span className="text-[#0A3A47]/50 font-medium ml-1">
                (PDF, DOC, DOCX — Max 5 MB)
              </span>
            </label>

            <label
              htmlFor="apply-cv-file"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`group/upload relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-300 overflow-hidden ${
                isDragging
                  ? "border-[#4FC3F7] bg-[#4FC3F7]/10 scale-[1.01]"
                  : "border-[#4FC3F7]/40 hover:border-[#4FC3F7]/70 bg-gradient-to-b from-[#E1F5FE]/50 to-white"
              }`}
            >
              <span
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2.5 transition-all duration-300 ${
                  isDragging
                    ? "bg-[#4FC3F7] scale-110"
                    : "bg-[#4FC3F7]/15 group-hover/upload:bg-[#4FC3F7]/25 group-hover/upload:scale-110"
                }`}
              >
                <FaCloudUploadAlt
                  className={`text-xl transition-colors duration-300 ${
                    isDragging ? "text-white" : "text-[#29B6F6]"
                  }`}
                />
              </span>

              <span className="text-xs font-bold text-[#0F4C5C] mb-0.5 text-center">
                {form.fileName
                  ? form.fileName
                  : isDragging
                  ? "Drop Your CV Here"
                  : "Click To Upload Or Drag & Drop"}
              </span>
              <span className="text-[10px] text-[#0A3A47]/60 font-medium">
                {form.fileName
                  ? "File Ready To Submit"
                  : "PDF, DOC, Or DOCX (Max 5 MB)"}
              </span>

              <input
                id="apply-cv-file"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFile}
                className="hidden"
              />
            </label>

            {form.fileName && cvFile && (
              <div className="mt-2.5 flex items-center justify-between bg-gradient-to-r from-[#4FC3F7]/15 to-[#FFD54F]/10 border border-[#4FC3F7]/40 rounded-xl px-3.5 py-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FaCheckCircle className="text-[#29B6F6] text-sm flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-[#0F4C5C] truncate block">
                      {form.fileName}
                    </span>
                    <span className="text-[10px] text-[#0A3A47]/60 font-medium">
                      {(cvFile.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-[#0A3A47]/60 hover:text-red-500 hover:rotate-90 transition-all duration-300 flex-shrink-0"
                  aria-label="Remove File"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-5">
            <Field label="Message (Optional)" icon={FaPaperPlane}>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell Us About Your Experience, Certifications, Or Availability..."
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>

          {error && (
            <div className="mt-5 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3.5 py-3">
              <FaExclamationTriangle className="text-red-500 text-xs flex-shrink-0" />
              <span className="text-xs font-semibold text-red-600">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="group relative mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 py-3.5 rounded-full font-bold shadow-[0_14px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ animation: "gradientShift 4s ease infinite" }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            {submitting ? (
              <>
                <FaSpinner className="relative text-sm animate-spin" />
                <span className="relative">Sending Application...</span>
              </>
            ) : (
              <>
                <FaPaperPlane className="relative text-sm" />
                <span className="relative">Submit Application</span>
              </>
            )}
          </button>

          <p className="text-center text-[10px] sm:text-xs text-[#0A3A47]/60 mt-4">
            By Submitting, You Agree To Be Contacted By Our Recruitment Team.
          </p>
        </form>
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
      `}</style>
    </div>
  );
};

const Field = ({ label, required, icon: Icon, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-xs font-bold text-[#0F4C5C] mb-1.5">
      {Icon && <Icon className="text-[#29B6F6] text-[10px]" />}
      {label}
      {required && <span className="text-[#29B6F6]">*</span>}
    </label>
    {children}
  </div>
);

export default ApplyJob;