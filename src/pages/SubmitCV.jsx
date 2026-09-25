// src/pages/SubmitCV.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPassport,
  FaBriefcase,
  FaGraduationCap,
  FaGlobe,
  FaFileUpload,
  FaCheckCircle,
  FaArrowRight,
  FaTimes,
  FaHardHat,
  FaComments,
  FaRocket,
  FaShieldAlt,
  FaStar,
  FaPaperPlane,
  FaCloudUploadAlt,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";
import { cvApi } from "../api/api";

/* ============================================================
   ANIMATED PROGRESS
============================================================ */
const AnimatedProgress = ({ value }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const diff = value - display;
    if (diff === 0) return;
    const step = diff > 0 ? 1 : -1;
    const timer = setTimeout(() => setDisplay(display + step), 20);
    return () => clearTimeout(timer);
  }, [value, display]);
  return <span>{display}%</span>;
};

/* ============================================================
   FLOATING LABEL FIELD
============================================================ */
const Field = ({ label, icon: Icon, required, children, hint, focused, iconColor = "text-[#29B6F6]" }) => (
  <div className="group/field relative">
    <label
      className={`flex items-center gap-2 text-xs sm:text-sm font-bold mb-2 transition-all duration-300 ${
        focused ? "text-[#4FC3F7] translate-x-1" : "text-[#0F4C5C]"
      }`}
    >
      {Icon && (
        <span
          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
            focused
              ? "bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] shadow-[0_4px_12px_rgba(79,195,247,0.5)] scale-110"
              : "bg-[#4FC3F7]/12"
          }`}
        >
          <Icon
            className={`text-[10px] transition-colors duration-300 ${
              focused ? "text-white" : iconColor
            }`}
          />
        </span>
      )}
      {label}
      {required && <span className="text-[#29B6F6] animate-pulse">*</span>}
    </label>
    {children}
    {hint && (
      <p className="text-[10px] sm:text-xs text-[#0A3A47]/60 mt-1.5 font-medium flex items-center gap-1">
        <span className="w-1 h-1 rounded-full bg-[#4FC3F7]" />
        {hint}
      </p>
    )}
  </div>
);

/* ============================================================
   SECTION HEADER
============================================================ */
const SectionHeader = ({ number, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-6">
    <div className="relative flex-shrink-0">
      <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] blur-md opacity-60 animate-pulse" />
      <span className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] text-white flex items-center justify-center font-extrabold text-sm shadow-[0_8px_20px_rgba(79,195,247,0.45)]">
        {number}
      </span>
    </div>
    <div>
      <h2 className="text-lg sm:text-xl font-extrabold text-[#0F4C5C] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[10px] sm:text-xs text-[#0A3A47]/60 font-medium mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

/* ============================================================
   PAGE
============================================================ */
const SubmitCV = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    city: "",
    country: "",
    position: "",
    category: "",
    experience: "",
    education: "",
    passport: "",
    skills: "",
    message: "",
    fileName: "",
  });

  /* ✅ Actual File Object Yahan Store Hoga */
  const [cvFile, setCvFile] = useState(null);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const formRef = useRef(null);

  /* ---------- Progress ---------- */
  useEffect(() => {
    const fields = [
      form.fullName,
      form.email,
      form.phone,
      form.country,
      form.position,
      form.category,
      form.experience,
      form.education,
      form.skills,
      form.fileName,
      form.message,
    ];
    const filled = fields.filter((f) => f && f.toString().trim()).length;
    setProgress(Math.round((filled / fields.length) * 100));
  }, [form]);

  /* ---------- Mouse Glow ---------- */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const update = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.country.trim()) e.country = "Country is required";
    if (!form.position.trim()) e.position = "Position is required";
    if (!form.category) e.category = "Please select a category";
    return e;
  };

  /* ============================================================
     ✅ HANDLE SUBMIT — FormData With Actual File
  ============================================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstError = document.querySelector("[data-error='true']");
      if (firstError)
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);

    try {
      /* ✅ FormData Banao — Backend `cvFile` Field Expect Kar Raha Hai */
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("whatsapp", form.whatsapp);
      formData.append("city", form.city);
      formData.append("country", form.country);
      formData.append("position", form.position);
      formData.append("category", form.category);
      formData.append("experience", form.experience);
      formData.append("education", form.education);
      formData.append("passport", form.passport);
      formData.append("skills", form.skills);
      formData.append("message", form.message);

      /* ✅ ACTUAL FILE — Backend Field Name `cvFile` Match Karna Zaroori Hai */
      if (cvFile) {
        formData.append("cvFile", cvFile);
      }

      await cvApi.submit(formData);

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("CV Submit Error:", error);
      setErrors({
        form: error.message || "Failed To Submit CV. Please Try Again.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  };

  /* ============================================================
     ✅ PROCESS FILE — Actual File Object Store Karta Hai
  ============================================================ */
  const processFile = (file) => {
    if (!file) return;

    /* Size Check — 5 MB Max */
    if (file.size > 5 * 1024 * 1024) {
      alert("File Size Must Be Less Than 5 MB");
      return;
    }

    /* File Type Check */
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.mimetype || file.type)) {
      alert("Only PDF, DOC, DOCX Files Are Allowed");
      return;
    }

    /* ✅ Actual File Object Save Karo */
    setCvFile(file);
    update("fileName", file.name);
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

  const inputBase =
    "w-full bg-white/80 backdrop-blur-sm border-2 rounded-xl px-4 py-3 text-sm text-[#0F4C5C] placeholder-[#0A3A47]/40 font-medium focus:outline-none transition-all duration-300";
  const inputClass = (field) =>
    `${inputBase} ${
      errors[field]
        ? "border-red-400 focus:ring-2 focus:ring-red-300/40 focus:border-red-400"
        : focusedField === field
        ? "border-[#4FC3F7] shadow-[0_0_0_4px_rgba(79,195,247,0.15)] -translate-y-0.5"
        : "border-[#4FC3F7]/25 hover:border-[#4FC3F7]/50 hover:shadow-[0_4px_14px_rgba(79,195,247,0.1)]"
    }`;

  /* ============ SUCCESS SCREEN ============ */
  if (submitted) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] pt-24 sm:pt-28 pb-16 overflow-hidden flex items-center">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#4FC3F7]/20 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#FFD54F]/15 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative w-full sm:w-[80%] max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-[0_24px_80px_rgba(15,76,92,0.45)] border border-[#4FC3F7]/30 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

            <div className="relative w-24 h-24 mx-auto mb-6">
              <span className="absolute inset-0 rounded-full bg-[#22C55E]/30 animate-ping" />
              <span
                className="absolute inset-2 rounded-full bg-[#22C55E]/20 animate-ping"
                style={{ animationDelay: "0.5s" }}
              />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-[0_12px_40px_rgba(34,197,94,0.5)]">
                <FaCheckCircle className="text-white text-4xl" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className="text-[#FFD54F] text-sm animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F4C5C] mb-4">
              CV Submitted{" "}
              <span className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] bg-clip-text text-transparent">
                Successfully!
              </span>
            </h1>

            <p className="text-[#0A3A47] text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
              Thank You For Submitting Your CV. Our Recruitment Team Will
              Review Your Profile And Contact You Within{" "}
              <span className="font-bold text-[#0F4C5C]">
                3–5 Business Days
              </span>{" "}
              If A Suitable Overseas Opportunity Matches Your Qualifications.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/careers"
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-7 py-3.5 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.5)] hover:shadow-[0_16px_40px_rgba(255,213,79,0.6)] hover:-translate-y-1 transition-all duration-300 text-sm overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                Browse Jobs
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#0F4C5C]/30 text-[#0F4C5C] px-7 py-3.5 rounded-full font-bold hover:bg-[#E1F5FE] hover:border-[#4FC3F7]/60 transition-all duration-300 text-sm"
              >
                Back To Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ============ FORM SCREEN ============ */
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative mt-[17px] pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url(/src/assets/submitcv-hero-img.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C5C]/10 via-[#0A3A47]/25 to-[#06303A]/30" />
        <div className="absolute inset-0 bg-[#0F4C5C]/25" />

        <div className="absolute -top-32 -right-32 w-[320px] h-[320px] bg-[#4FC3F7]/20 blur-3xl animate-blob" />
        <div
          className="absolute -bottom-24 -left-24 w-[280px] h-[280px] bg-[#FFD54F]/15 blur-3xl animate-blob"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-[#4FC3F7]/40 rounded-full px-4 py-2 mb-5 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#4FC3F7] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4FC3F7]" />
            </span>
            <span className="text-[#4FC3F7] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              Candidate Registration
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5 [text-shadow:_0_2px_12px_rgba(0,0,0,0.6)]">
            Submit Your{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                CV
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,4 Q25,0 50,4 T100,4"
                  stroke="#FFD54F"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p
            className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            style={{
              textShadow:
                "0 1px 3px rgba(0,0,0,0.75), 0 2px 6px rgba(15,76,92,0.6)",
            }}
          >
            Fill In Your Details Below. Our Recruitment Team Will Review Your
            Profile And Contact You When A Suitable Overseas Opportunity
            Becomes Available.
          </p>
        </div>
      </section>

      {/* ============ FORM ============ */}
      <section className="relative py-10 sm:py-14 bg-gradient-to-b from-[#E1F5FE] via-white to-[#E1F5FE] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-[#4FC3F7]/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#0F4C5C]/8 blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative w-full sm:w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-5 bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-[#4FC3F7]/25 shadow-[0_8px_30px_rgba(15,76,92,0.08)]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FaRocket className="text-[#F97316] text-sm" />
                <span className="text-xs sm:text-sm font-bold text-[#0F4C5C]">
                  Profile Completion
                </span>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-[#0F4C5C]">
                <AnimatedProgress value={progress} />
              </span>
            </div>
            <div className="w-full h-2 bg-[#E1F5FE] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#FFD54F] transition-all duration-500 ease-out shadow-[0_0_12px_rgba(79,195,247,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-[#4FC3F7]/25 shadow-[0_24px_60px_rgba(15,76,92,0.15)] p-5 sm:p-8 md:p-10 overflow-hidden group/form"
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover/form:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79,195,247,0.10), transparent 40%)`,
              }}
            />

            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_4s_linear_infinite]" />

            {/* Form Error */}
            {errors.form && (
              <div className="relative mb-6 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 animate-slideUp">
                <FaExclamationTriangle className="text-red-500 text-sm flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-red-600">
                  {errors.form}
                </span>
              </div>
            )}

            {/* ==== 01 Personal Info ==== */}
            <div className="relative mb-8">
              <SectionHeader
                number="01"
                title="Personal Information"
                subtitle="Let Us Know Who You Are"
              />

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div data-error={!!errors.fullName}>
                  <Field
                    label="Full Name"
                    icon={FaUser}
                    iconColor="text-[#4FC3F7]"
                    required
                    focused={focusedField === "fullName"}
                  >
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      onFocus={() => setFocusedField("fullName")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. Muhammad Ali"
                      className={inputClass("fullName")}
                    />
                    {errors.fullName && (
                      <p className="text-[10px] sm:text-xs text-red-500 mt-1.5 font-semibold animate-slideUp">
                        {errors.fullName}
                      </p>
                    )}
                  </Field>
                </div>

                <div data-error={!!errors.email}>
                  <Field
                    label="Email Address"
                    icon={FaEnvelope}
                    iconColor="text-[#FFB300]"
                    required
                    focused={focusedField === "email"}
                  >
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@example.com"
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <p className="text-[10px] sm:text-xs text-red-500 mt-1.5 font-semibold animate-slideUp">
                        {errors.email}
                      </p>
                    )}
                  </Field>
                </div>

                <div data-error={!!errors.phone}>
                  <Field
                    label="Phone Number"
                    icon={FaPhone}
                    iconColor="text-[#22C55E]"
                    required
                    focused={focusedField === "phone"}
                  >
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="+92 300 1234567"
                      className={inputClass("phone")}
                    />
                    {errors.phone && (
                      <p className="text-[10px] sm:text-xs text-red-500 mt-1.5 font-semibold animate-slideUp">
                        {errors.phone}
                      </p>
                    )}
                  </Field>
                </div>

                <Field
                  label="WhatsApp Number"
                  icon={FaPhone}
                  iconColor="text-[#14B8A6]"
                  focused={focusedField === "whatsapp"}
                  hint="If Different From Phone"
                >
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(e) => update("whatsapp", e.target.value)}
                    onFocus={() => setFocusedField("whatsapp")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="+92 300 1234567"
                    className={inputClass("whatsapp")}
                  />
                </Field>
              </div>
            </div>

            <div className="relative h-px mb-8 bg-gradient-to-r from-transparent via-[#4FC3F7]/30 to-transparent">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#4FC3F7] shadow-[0_0_8px_rgba(79,195,247,0.8)]" />
            </div>

            {/* ==== 02 Location ==== */}
            <div className="relative mb-8">
              <SectionHeader
                number="02"
                title="Location"
                subtitle="Where Are You Based?"
              />

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <Field
                  label="City"
                  icon={FaMapMarkerAlt}
                  iconColor="text-[#F97316]"
                  focused={focusedField === "city"}
                >
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    onFocus={() => setFocusedField("city")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g. Lahore"
                    className={inputClass("city")}
                  />
                </Field>

                <div data-error={!!errors.country}>
                  <Field
                    label="Country Of Residence"
                    icon={FaGlobe}
                    iconColor="text-[#8B5CF6]"
                    required
                    focused={focusedField === "country"}
                  >
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) => update("country", e.target.value)}
                      onFocus={() => setFocusedField("country")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. Pakistan"
                      className={inputClass("country")}
                    />
                    {errors.country && (
                      <p className="text-[10px] sm:text-xs text-red-500 mt-1.5 font-semibold animate-slideUp">
                        {errors.country}
                      </p>
                    )}
                  </Field>
                </div>
              </div>
            </div>

            <div className="relative h-px mb-8 bg-gradient-to-r from-transparent via-[#4FC3F7]/30 to-transparent">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#4FC3F7] shadow-[0_0_8px_rgba(79,195,247,0.8)]" />
            </div>

            {/* ==== 03 Job Preference ==== */}
            <div className="relative mb-8">
              <SectionHeader
                number="03"
                title="Job Preference"
                subtitle="Tell Us What You're Looking For"
              />

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div data-error={!!errors.position}>
                  <Field
                    label="Position Applying For"
                    icon={FaBriefcase}
                    iconColor="text-[#4FC3F7]"
                    required
                    focused={focusedField === "position"}
                  >
                    <input
                      type="text"
                      value={form.position}
                      onChange={(e) => update("position", e.target.value)}
                      onFocus={() => setFocusedField("position")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. Electrician"
                      className={inputClass("position")}
                    />
                    {errors.position && (
                      <p className="text-[10px] sm:text-xs text-red-500 mt-1.5 font-semibold animate-slideUp">
                        {errors.position}
                      </p>
                    )}
                  </Field>
                </div>

                <div data-error={!!errors.category}>
                  <Field
                    label="Worker Category"
                    icon={FaHardHat}
                    iconColor="text-[#F59E0B]"
                    required
                    focused={focusedField === "category"}
                  >
                    <select
                      value={form.category}
                      onChange={(e) => update("category", e.target.value)}
                      onFocus={() => setFocusedField("category")}
                      onBlur={() => setFocusedField(null)}
                      className={inputClass("category")}
                    >
                      <option value="">Select Category</option>
                      <option value="Skilled">Skilled Worker</option>
                      <option value="Semi-Skilled">Semi-Skilled Worker</option>
                      <option value="Unskilled">Unskilled / General</option>
                      <option value="Technical">Technical Staff</option>
                      <option value="Professional">Professional Staff</option>
                    </select>
                    {errors.category && (
                      <p className="text-[10px] sm:text-xs text-red-500 mt-1.5 font-semibold animate-slideUp">
                        {errors.category}
                      </p>
                    )}
                  </Field>
                </div>

                <Field
                  label="Years Of Experience"
                  icon={FaBriefcase}
                  iconColor="text-[#EC4899]"
                  focused={focusedField === "experience"}
                >
                  <select
                    value={form.experience}
                    onChange={(e) => update("experience", e.target.value)}
                    onFocus={() => setFocusedField("experience")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass("experience")}
                  >
                    <option value="">Select Experience</option>
                    <option value="Fresher">Fresher (No Experience)</option>
                    <option value="1-2">1–2 Years</option>
                    <option value="3-5">3–5 Years</option>
                    <option value="5-10">5–10 Years</option>
                    <option value="10+">10+ Years</option>
                  </select>
                </Field>

                <Field
                  label="Highest Education"
                  icon={FaGraduationCap}
                  iconColor="text-[#A78BFA]"
                  focused={focusedField === "education"}
                >
                  <select
                    value={form.education}
                    onChange={(e) => update("education", e.target.value)}
                    onFocus={() => setFocusedField("education")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass("education")}
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

                <Field
                  label="Passport Number"
                  icon={FaPassport}
                  iconColor="text-[#06B6D4]"
                  focused={focusedField === "passport"}
                  hint="Optional — If You Have A Valid Passport"
                >
                  <input
                    type="text"
                    value={form.passport}
                    onChange={(e) => update("passport", e.target.value)}
                    onFocus={() => setFocusedField("passport")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g. AB1234567"
                    className={inputClass("passport")}
                  />
                </Field>

                <Field
                  label="Key Skills"
                  icon={FaHardHat}
                  iconColor="text-[#F97316]"
                  focused={focusedField === "skills"}
                  hint="Comma-Separated, e.g. Welding, Fitting"
                >
                  <input
                    type="text"
                    value={form.skills}
                    onChange={(e) => update("skills", e.target.value)}
                    onFocus={() => setFocusedField("skills")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g. Welding, Wiring, Plumbing"
                    className={inputClass("skills")}
                  />
                </Field>
              </div>
            </div>

            <div className="relative h-px mb-8 bg-gradient-to-r from-transparent via-[#4FC3F7]/30 to-transparent">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#4FC3F7] shadow-[0_0_8px_rgba(79,195,247,0.8)]" />
            </div>

            {/* ==== 04 Upload CV ==== */}
            <div className="relative mb-8">
              <SectionHeader
                number="04"
                title="Upload CV"
                subtitle="PDF, DOC, Or DOCX (Max 5 MB)"
              />

              <label
                htmlFor="cv-file"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`group/upload relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-2xl p-8 cursor-pointer transition-all duration-300 overflow-hidden ${
                  isDragging
                    ? "border-[#4FC3F7] bg-[#4FC3F7]/10 scale-[1.02]"
                    : "border-[#4FC3F7]/40 hover:border-[#4FC3F7]/70 bg-gradient-to-b from-[#E1F5FE]/50 to-white"
                }`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/upload:translate-x-full transition-transform duration-1000" />

                <span
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                    isDragging
                      ? "bg-[#4FC3F7] scale-110"
                      : "bg-[#4FC3F7]/15 group-hover/upload:bg-[#4FC3F7]/25 group-hover/upload:scale-110"
                  }`}
                >
                  <FaCloudUploadAlt
                    className={`text-2xl transition-colors duration-300 ${
                      isDragging ? "text-white" : "text-[#4FC3F7]"
                    }`}
                  />
                </span>

                <span className="relative text-sm font-bold text-[#0F4C5C] mb-1 text-center px-4">
                  {form.fileName
                    ? form.fileName
                    : isDragging
                    ? "Drop Your CV Here"
                    : "Click To Upload Or Drag & Drop"}
                </span>
                <span className="relative text-[10px] sm:text-xs text-[#0A3A47]/60 font-medium">
                  {form.fileName
                    ? "File Ready To Submit"
                    : "PDF, DOC, Or DOCX (Max 5 MB)"}
                </span>

                <input
                  id="cv-file"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFile}
                  className="hidden"
                />
              </label>

              {form.fileName && (
                <div className="mt-3 flex items-center justify-between bg-gradient-to-r from-[#22C55E]/15 to-[#FFD54F]/10 border border-[#22C55E]/40 rounded-xl px-4 py-3 animate-slideUp">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="relative flex-shrink-0">
                      <span className="absolute inset-0 rounded-full bg-[#22C55E] animate-ping opacity-40" />
                      <FaCheckCircle className="relative text-[#22C55E] text-base" />
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-[#0F4C5C] truncate block">
                        {form.fileName}
                      </span>
                      {cvFile && (
                        <span className="text-[10px] text-[#0A3A47]/60 font-medium">
                          {(cvFile.size / 1024).toFixed(1)} KB
                        </span>
                      )}
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

            <div className="relative h-px mb-8 bg-gradient-to-r from-transparent via-[#4FC3F7]/30 to-transparent">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#4FC3F7] shadow-[0_0_8px_rgba(79,195,247,0.8)]" />
            </div>

            {/* ==== 05 Message ==== */}
            <div className="relative mb-8">
              <SectionHeader
                number="05"
                title="Additional Message"
                subtitle="Anything Else We Should Know?"
              />

              <Field
                label="Tell Us Anything Else"
                icon={FaComments}
                iconColor="text-[#8B5CF6]"
                focused={focusedField === "message"}
                hint="Optional — Describe Your Experience, Certifications, Or Preferred Countries"
              >
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. I Have 5 Years Of Welding Experience In UAE And I Am Available For Immediate Deployment..."
                  className={`${inputClass("message")} resize-none`}
                />
              </Field>
            </div>

            {/* Consent + Submit */}
            <div className="relative border-t border-[#4FC3F7]/20 pt-6">
              <div className="flex items-start gap-2 mb-5 p-3 rounded-xl bg-[#22C55E]/5 border border-[#22C55E]/20">
                <FaShieldAlt className="text-[#22C55E] text-sm mt-0.5 flex-shrink-0" />
                <p className="text-[10px] sm:text-xs text-[#0A3A47]/80 leading-relaxed">
                  By Submitting This Form, You Confirm That The Information
                  Provided Is Accurate And Agree To Be Contacted By Ali
                  Hajveri International Regarding Suitable Overseas Employment
                  Opportunities.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group/submit relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-8 py-4 rounded-full font-extrabold shadow-[0_12px_30px_rgba(79,195,247,0.45)] hover:shadow-[0_18px_45px_rgba(255,213,79,0.55)] hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ animation: "gradientShift 4s ease infinite" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/submit:translate-x-full transition-transform duration-700" />
                {submitting ? (
                  <>
                    <FaSpinner className="relative text-xs animate-spin" />
                    <span className="relative">Submitting...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="relative text-xs group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1 transition-transform duration-300" />
                    <span className="relative">Submit CV</span>
                    <FaArrowRight className="relative text-xs group-hover/submit:translate-x-2 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ============ INFO / TRUST STRIP ============ */}
      <section className="relative py-12 sm:py-16 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#29B6F6] mb-2">
              <span className="w-6 h-px bg-[#29B6F6]" />
              Why Choose Us
              <span className="w-6 h-px bg-[#29B6F6]" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F4C5C]">
              Trusted By Thousands Of Workers
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: FaUser,
                title: "Verified Profile",
                desc: "Your Data Is Securely Stored And Reviewed Only By Our Recruitment Team.",
                color: "text-[#4FC3F7]",
                hoverFrom: "group-hover:from-[#4FC3F7]",
                hoverTo: "group-hover:to-[#29B6F6]",
              },
              {
                icon: FaGlobe,
                title: "Overseas Opportunities",
                desc: "Get Considered For Placements Across Gulf, Asia And Other Countries.",
                color: "text-[#22C55E]",
                hoverFrom: "group-hover:from-[#22C55E]",
                hoverTo: "group-hover:to-[#16A34A]",
              },
              {
                icon: FaCheckCircle,
                title: "No Hidden Charges",
                desc: "We Never Ask For Any Payment To Submit Your CV Or To Register.",
                color: "text-[#FFB300]",
                hoverFrom: "group-hover:from-[#FFB300]",
                hoverTo: "group-hover:to-[#F59E0B]",
              },
            ].map(({ icon: Icon, title, desc, color, hoverFrom, hoverTo }, i) => (
              <div
                key={title}
                className="group relative bg-gradient-to-b from-[#E1F5FE] to-white rounded-2xl p-6 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_20px_40px_rgba(79,195,247,0.2)] hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className={`w-12 h-12 rounded-xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center mb-4 group-hover:bg-[#4FC3F7]/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <Icon className={`${color} text-lg`} />
                </div>
                <h3 className="font-bold text-[#0F4C5C] mb-2 text-sm sm:text-base">
                  {title}
                </h3>
                <p className="text-[#0A3A47]/75 text-xs sm:text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SubmitCV;