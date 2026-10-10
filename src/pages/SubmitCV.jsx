// src/pages/SubmitCV.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPassport,
  FaBriefcase,
  FaGraduationCap,
  FaGlobe,
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
   ANIMATED PROGRESS NUMBER
============================================================ */
const AnimatedProgress = ({ value }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const diff = value - display;
    if (diff === 0) return;
    const step = diff > 0 ? 1 : -1;
    const timer = setTimeout(() => setDisplay(display + step), 15);
    return () => clearTimeout(timer);
  }, [value, display]);
  return <span>{display}%</span>;
};

/* ============================================================
   PROGRESS BAR COLOR LOGIC
============================================================ */
const getProgressColor = (progress) => {
  if (progress < 30) return "from-[#94A3B8] to-[#64748B]";
  if (progress < 60) return "from-[#4FC3F7] to-[#29B6F6]";
  if (progress < 90) return "from-[#29B6F6] to-[#FBBF24]";
  return "from-[#22C55E] to-[#16A34A]";
};

const getProgressMessage = (progress) => {
  if (progress === 0) return "Let's Get Started";
  if (progress < 30) return "Keep Going...";
  if (progress < 60) return "Looking Good!";
  if (progress < 90) return "Almost There!";
  if (progress < 100) return "Just A Bit More!";
  return "Ready To Submit!";
};

/* ============================================================
   OPTIONAL PILL
============================================================ */
const OptionalPill = () => (
  <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B] bg-[#E2E8F0] rounded-full">
    Optional
  </span>
);

/* ============================================================
   FIELD
============================================================ */
const Field = ({
  label,
  icon: Icon,
  required,
  optional,
  children,
  hint,
  focused,
  iconColor = "text-[#29B6F6]",
}) => (
  <div className="group/field relative">
    <label
      className={`flex items-center gap-2 text-xs sm:text-sm font-bold mb-1 transition-all duration-300 ${
        focused ? "text-[#4FC3F7]" : "text-[#0F4C5C]"
      }`}
    >
      {Icon && (
        <span
          className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-300 ${
            focused
              ? "bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] shadow-[0_4px_12px_rgba(79,195,247,0.5)] scale-110"
              : "bg-[#4FC3F7]/12"
          }`}
        >
          <Icon
            className={`text-[9px] transition-colors duration-300 ${
              focused ? "text-white" : iconColor
            }`}
          />
        </span>
      )}
      <span className="flex items-center">
        {label}
        {required && <span className="text-[#EF4444] ml-1">*</span>}
        {optional && <OptionalPill />}
      </span>
    </label>
    {children}
    {hint && (
      <p className="text-xs text-[#64748B] mt-1 font-medium flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-[#4FC3F7] flex-shrink-0" />
        {hint}
      </p>
    )}
  </div>
);

/* ============================================================
   SECTION CARD
============================================================ */
const SectionCard = ({ number, title, subtitle, children }) => (
  <div className="relative bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,76,92,0.06)] hover:shadow-[0_8px_30px_rgba(15,76,92,0.10)] transition-all duration-300 p-4 sm:p-5 mb-3">
    <div className="flex items-start gap-3 mb-3 pb-3 border-b border-[#E2E8F0]">
      <div className="relative flex-shrink-0">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] blur-md opacity-50" />
        <span className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] text-white flex items-center justify-center font-extrabold text-xs shadow-[0_8px_20px_rgba(79,195,247,0.35)]">
          {number}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-base sm:text-lg font-extrabold text-[#0F4C5C] leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-[#64748B] font-medium mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
    {children}
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

  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showStickyProgress, setShowStickyProgress] = useState(false);
  const formRef = useRef(null);
  const progressRef = useRef(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (progressRef.current) {
        const rect = progressRef.current.getBoundingClientRect();
        setShowStickyProgress(rect.top < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const update = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full Name Is Required";
    if (!form.email.trim()) e.email = "Email Is Required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter A Valid Email";
    if (!form.phone.trim()) e.phone = "Phone Number Is Required";
    if (!form.country.trim()) e.country = "Country Is Required";
    if (!form.position.trim()) e.position = "Position Is Required";
    if (!form.category) e.category = "Please Select A Category";
    return e;
  };

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
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key !== "fileName") formData.append(key, value);
      });
      if (cvFile) formData.append("cvFile", cvFile);

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

  const processFile = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File Size Must Be Less Than 5 MB");
      return;
    }
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.mimetype || file.type)) {
      alert("Only PDF, DOC, DOCX Files Are Allowed");
      return;
    }
    setCvFile(file);
    update("fileName", file.name);
  };

  const handleFile = (e) => processFile(e.target.files?.[0]);
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
    "w-full bg-[#F8FAFC] border-2 rounded-xl px-3.5 py-2.5 text-sm text-[#0F4C5C] placeholder-[#94A3B8] font-medium focus:outline-none transition-all duration-300";
  const inputClass = (field) =>
    `${inputBase} ${
      errors[field]
        ? "border-red-400 focus:ring-2 focus:ring-red-300/40 focus:border-red-400 bg-red-50/30"
        : focusedField === field
        ? "border-[#4FC3F7] bg-white shadow-[0_0_0_4px_rgba(79,195,247,0.12)]"
        : "border-[#E2E8F0] hover:border-[#4FC3F7]/50"
    }`;

  /* ============ SUCCESS SCREEN ============ */
  if (submitted) {
    return (
      <>
        <Helmet>
          <title>CV Submitted Successfully | Ali Hajveri International</title>
          <meta name="robots" content="noindex, follow" />
          <link rel="canonical" href="https://ahioep.com/submit-cv" />
        </Helmet>

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
                  <FaCheckCircle className="text-white text-4xl" aria-hidden="true" />
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-[#FFD54F] text-sm animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s` }}
                    aria-hidden="true"
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
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
      </>
    );
  }

  /* ============ FORM SCREEN ============ */
  return (
    <>
      {/* ============ SEO META TAGS ============ */}
      <Helmet>
        <title>Submit CV For Overseas Jobs | Free Registration | Ali Hajveri International</title>
        <meta
          name="description"
          content="Submit your CV for overseas jobs in Gulf, Asia, and Europe. Free registration with Ali Hajveri International - licensed overseas employment promoter in Pakistan. No hidden charges for candidates."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ahioep.com/submit-cv" />
        <meta property="og:title" content="Submit CV For Overseas Jobs | Ali Hajveri International" />
        <meta property="og:description" content="Free CV submission for skilled, semi-skilled, and professional Pakistani workers seeking overseas employment opportunities." />
        <meta property="og:url" content="https://ahioep.com/submit-cv" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ============ SEO CONTENT (Visually Hidden, Sirf Google Ke Liye) ============ */}
      <div className="sr-only" aria-hidden="true">
        <h1>Submit CV For Overseas Jobs - Free Registration By Ali Hajveri International</h1>
        <p>
          Submit Your CV Through Ali Hajveri International (Pvt.) Limited For
          Overseas Job Opportunities In Gulf Countries, Central Asia, Europe,
          And East Asia. Our Free Registration Process Allows Skilled,
          Semi-Skilled, And Professional Pakistani Workers To Be Considered For
          International Employment Opportunities.
        </p>

        <h2>Free CV Submission For Pakistani Workers</h2>
        <p>
          We Never Charge Candidates For Submitting CV Or For Job Placement.
          Our Registration Is Completely Free For All Pakistani Workers Seeking
          Overseas Employment. Simply Fill In Your Details, Upload Your CV, And
          Our Recruitment Team Will Contact You When A Suitable Opportunity
          Becomes Available.
        </p>

        <h2>Who Can Submit CV</h2>
        <ul>
          <li>Skilled Workers - Engineers, Technicians, Welders, Electricians</li>
          <li>Semi-Skilled Workers - Machine Operators, Drivers, Helpers</li>
          <li>Unskilled Workers - General Labour, Loaders, Cleaners</li>
          <li>Technical Staff - Supervisors, Draftsmen, Quality Control</li>
          <li>Professional Staff - Accountants, IT Professionals, Nurses</li>
        </ul>

        <h2>What Information You Need</h2>
        <ul>
          <li>Full Name And Contact Details</li>
          <li>Email Address And Phone Number</li>
          <li>City And Country Of Residence</li>
          <li>Position Or Trade You Are Applying For</li>
          <li>Worker Category (Skilled, Semi-Skilled, Unskilled)</li>
          <li>Years Of Experience And Education</li>
          <li>Passport Number (If Available)</li>
          <li>Key Skills And Certifications</li>
          <li>Updated CV In PDF, DOC, Or DOCX Format (Max 5 MB)</li>
        </ul>

        <h2>Overseas Job Opportunities We Offer</h2>
        <p>
          Through Our Licensed Overseas Employment Promoter Operations, We
          Place Pakistani Workers In Various Industries And Countries Including
          Saudi Arabia, UAE, Qatar, Oman, Kuwait, Bahrain, Tajikistan,
          Kazakhstan, Kyrgyzstan, Uzbekistan, Turkmenistan, Romania, China, And
          Other International Markets.
        </p>

        <h2>What Happens After You Submit CV</h2>
        <ol>
          <li>Our Team Reviews Your CV And Profile</li>
          <li>We Match Your Skills With Available Job Opportunities</li>
          <li>We Contact You If A Suitable Position Is Available</li>
          <li>You Attend Interview Or Trade Test If Shortlisted</li>
          <li>Upon Selection, We Handle Documentation And Deployment</li>
        </ol>

        <h2>Our Commitment To Candidates</h2>
        <ul>
          <li>Free Registration And CV Submission</li>
          <li>No Hidden Charges At Any Stage</li>
          <li>Transparent Communication Throughout The Process</li>
          <li>Complete Support From Selection To Deployment</li>
          <li>Post-Deployment Support For Deployed Workers</li>
          <li>Full Compliance With BEOE Regulations</li>
        </ul>

        <h2>Trusted By 5,000+ Pakistani Workers</h2>
        <p>
          Ali Hajveri International Has Successfully Placed Over 5,000
          Pakistani Workers In International Employment Across 25+ Countries.
          Our OEP License Number OP&HRD/5224/LHR/2026 Confirms Our Government
          Authorization To Recruit Pakistani Workers For Overseas Employment.
        </p>

        <h2>Contact Ali Hajveri International</h2>
        <p>
          For More Information About CV Submission Or Overseas Job
          Opportunities, Contact Ali Hajveri International (Pvt.) Limited.
          Website: ahioep.com | Email: ahioep.com@gmail.com | Phone: +92 300
          8578764
        </p>

        <h2>Internal Links</h2>
        <nav>
          <Link to="/careers">Browse Jobs</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/process">Recruitment Process</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/legal-status">Legal Status</Link>
        </nav>
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
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0% { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(220%) skewX(-20deg); }
        }
        @keyframes pingSlow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.5; }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
        .animate-ping-slow { animation: pingSlow 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
        .animate-gentle-float { animation: gentleFloat 5s ease-in-out infinite; }
        .animate-gentle-float-slow { animation: gentleFloat 7s ease-in-out infinite; }

        .btn-shine { position: relative; overflow: hidden; isolation: isolate; }
        .btn-shine::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent); transform: translateX(-120%) skewX(-20deg); pointer-events: none; z-index: 1; }
        .btn-shine:hover::after { animation: shine 0.9s ease-out; }

        .img-shine { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 2; }
        .img-shine::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent); transform: translateX(-120%) skewX(-20deg); }
        .group:hover .img-shine::after { animation: shine 1s ease-out; }

        .sr-only {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative mt-[-6rem] pt-44 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-white via-[#E1F5FE] to-white">
        <div className="absolute -top-32 -right-40 w-[280px] sm:w-[380px] md:w-[480px] h-[280px] sm:h-[380px] md:h-[480px] rounded-full bg-[#4FC3F7]/10 blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 -left-40 w-[220px] sm:w-[300px] md:w-[380px] h-[220px] sm:h-[300px] md:h-[380px] rounded-full bg-[#FFD54F]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[180px] sm:w-[220px] md:w-[260px] h-[180px] sm:h-[220px] md:h-[260px] rounded-full bg-[#4FC3F7]/8 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">

            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 bg-white/95 backdrop-blur-sm border border-[#4FC3F7]/40 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-[0_4px_14px_rgba(15,76,92,0.12)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-ping-slow" />
                <span
                  className="text-[#0F4C5C] text-xs sm:text-sm font-bold"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  Candidate Registration
                </span>
              </div>

              <h1
                className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold text-[#0F4C5C] leading-[1.15] mb-4 sm:mb-5"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Submit Your{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                    CV
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="10"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,5 Q25,0 50,5 T100,5"
                      stroke="#4FC3F7"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <div
                className="text-sm sm:text-base md:text-lg text-[#0A3A47] mb-4 min-h-[24px] sm:h-7 font-semibold"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Verified{" "}
                <span className="text-[#29B6F6] font-semibold">
                  Overseas Opportunities
                </span>
              </div>

              <div className="flex justify-center lg:justify-start mb-6 sm:mb-8">
                <div className="max-w-2xl">
                  <p
                    className="text-[#0A3A47] text-sm sm:text-base md:text-lg leading-relaxed font-medium"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    Fill In Your Details Below. Our Recruitment Team Will
                    Review Your Profile And Contact You When A Suitable
                    Overseas Opportunity Becomes Available.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10">
                <Link
                  to="/careers"
                  className="btn-shine group inline-flex items-center justify-center gap-2 bg-white border-2 border-[#0F4C5C]/30 text-[#0F4C5C] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:border-[#4FC3F7] hover:bg-[#E1F5FE] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
                >
                  Browse Jobs
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="btn-shine group inline-flex items-center justify-center gap-2 bg-white border-2 border-[#0F4C5C]/30 text-[#0F4C5C] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:border-[#4FC3F7] hover:bg-[#E1F5FE] transition-all duration-300 text-sm sm:text-base"
                >
                  Contact Us
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 md:gap-14">
                {[
                  { value: "5000+", label: "Workers Placed" },
                  { value: "50+", label: "Global Employers" },
                  { value: "100%", label: "Free Registration" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <p
                      className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F4C5C] tabular-nums"
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-xs sm:text-sm text-[#0F4C5C] font-bold mt-1"
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative reveal-up group order-first lg:order-last lg:mt-[52px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/20 to-transparent rounded-3xl rotate-3 scale-[1.02] hidden sm:block" />

              <div className="relative h-[280px] sm:h-[340px] lg:h-[440px] rounded-3xl overflow-hidden border border-[#4FC3F7]/20 shadow-[0_20px_50px_rgba(15,76,92,0.15)]">
                <img
                  src="/assets/submitcv-hero-img.png"
                  alt="Submit CV For Overseas Job Opportunities In Gulf, Asia, And Europe"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <span className="img-shine" />
              </div>

              <div className="animate-gentle-float absolute bottom-3 left-3 bg-white rounded-2xl shadow-[0_16px_36px_rgba(15,76,92,0.12)] border border-[#4FC3F7]/25 px-4 py-3 max-w-[170px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#4FC3F7]/12 flex items-center justify-center">
                    <FaCheckCircle className="text-[#22C55E] text-xs" aria-hidden="true" />
                  </span>
                  <p
                    className="text-[#0F4C5C] font-bold text-xs"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    Free To Apply
                  </p>
                </div>
                <p
                  className="text-[#0A3A47] text-xs leading-relaxed"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  No Registration Fee
                </p>
              </div>

              <div className="animate-gentle-float-slow absolute top-3 right-3 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] rounded-2xl shadow-[0_12px_30px_rgba(79,195,247,0.35)] px-3.5 py-2.5 hidden md:block">
                <p
                  className="text-xs uppercase tracking-wider opacity-90 font-semibold"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  Reviewed By
                </p>
                <p
                  className="text-sm font-extrabold"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  Our Team
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ STICKY PROGRESS BAR ============ */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showStickyProgress
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-lg border-b border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,76,92,0.08)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <FaRocket className="text-[#F97316] text-sm" aria-hidden="true" />
                <span className="text-xs font-bold text-[#0F4C5C] hidden sm:inline">
                  {getProgressMessage(progress)}
                </span>
              </div>
              <div className="flex-1 h-3 bg-[#E2E8F0] rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(
                    progress
                  )} transition-all duration-500 ease-out shadow-[0_0_10px_rgba(79,195,247,0.35)]`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-extrabold text-[#29B6F6] tabular-nums flex-shrink-0">
                <AnimatedProgress value={progress} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============ FORM ============ */}
      <section className="relative py-5 sm:py-7 bg-gradient-to-b from-[#E1F5FE] via-white to-[#E1F5FE] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative w-[95%] sm:w-[92%] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={progressRef}
            className="mb-3 bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,76,92,0.06)]"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FaRocket className="text-[#F97316] text-sm" aria-hidden="true" />
                <span className="text-sm font-bold text-[#0F4C5C]">
                  Profile Completion
                </span>
              </div>
              <span className="text-sm sm:text-base font-extrabold text-[#29B6F6] tabular-nums">
                <AnimatedProgress value={progress} />
              </span>
            </div>
            <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(
                  progress
                )} transition-all duration-500 ease-out shadow-[0_0_10px_rgba(79,195,247,0.35)]`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-[#64748B] font-medium mt-1.5">
              {getProgressMessage(progress)}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {errors.form && (
              <div className="relative mb-3 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 animate-slideUp">
                <FaExclamationTriangle className="text-red-500 text-sm flex-shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-semibold text-red-600">
                  {errors.form}
                </span>
              </div>
            )}

            <SectionCard
              number="01"
              title="Personal Information"
              subtitle="Let Us Know Who You Are"
            >
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-3.5">
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
                      <p className="text-xs text-red-500 mt-1 font-semibold animate-slideUp">
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
                      <p className="text-xs text-red-500 mt-1 font-semibold animate-slideUp">
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
                      <p className="text-xs text-red-500 mt-1 font-semibold animate-slideUp">
                        {errors.phone}
                      </p>
                    )}
                  </Field>
                </div>

                <Field
                  label="WhatsApp Number"
                  icon={FaPhone}
                  iconColor="text-[#14B8A6]"
                  optional
                  focused={focusedField === "whatsapp"}
                  hint="If Different From Your Phone Number"
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
            </SectionCard>

            <SectionCard
              number="02"
              title="Location"
              subtitle="Where Are You Based?"
            >
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-3.5">
                <Field
                  label="City"
                  icon={FaMapMarkerAlt}
                  iconColor="text-[#F97316]"
                  optional
                  focused={focusedField === "city"}
                  hint="Your Current City"
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
                      <p className="text-xs text-red-500 mt-1 font-semibold animate-slideUp">
                        {errors.country}
                      </p>
                    )}
                  </Field>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              number="03"
              title="Job Preference"
              subtitle="Tell Us What You're Looking For"
            >
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-3.5">
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
                      <p className="text-xs text-red-500 mt-1 font-semibold animate-slideUp">
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
                      <option value="Semi-Skilled">
                        Semi-Skilled Worker
                      </option>
                      <option value="Unskilled">Unskilled / General</option>
                      <option value="Technical">Technical Staff</option>
                      <option value="Professional">Professional Staff</option>
                    </select>
                    {errors.category && (
                      <p className="text-xs text-red-500 mt-1 font-semibold animate-slideUp">
                        {errors.category}
                      </p>
                    )}
                  </Field>
                </div>

                <Field
                  label="Years Of Experience"
                  icon={FaBriefcase}
                  iconColor="text-[#EC4899]"
                  optional
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
                  optional
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
                  optional
                  focused={focusedField === "passport"}
                  hint="Only If You Have A Valid Passport"
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
                  optional
                  focused={focusedField === "skills"}
                  hint="Separate With Commas — e.g. Welding, Fitting"
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
            </SectionCard>

            <SectionCard
              number="04"
              title="Upload CV"
              subtitle="PDF, DOC, Or DOCX (Max 5 MB)"
            >
              <label
                htmlFor="cv-file"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`group/upload relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-2xl px-5 py-8 sm:py-10 cursor-pointer transition-all duration-300 overflow-hidden ${
                  isDragging
                    ? "border-[#4FC3F7] bg-[#4FC3F7]/10 scale-[1.02]"
                    : "border-[#4FC3F7]/40 hover:border-[#4FC3F7]/70 bg-[#F8FAFC]"
                }`}
              >
                <span
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    isDragging
                      ? "bg-[#4FC3F7] scale-110"
                      : "bg-[#4FC3F7]/15 group-hover/upload:bg-[#4FC3F7]/25 group-hover/upload:scale-110"
                  }`}
                >
                  <FaCloudUploadAlt
                    className={`text-3xl sm:text-4xl transition-colors duration-300 ${
                      isDragging ? "text-white" : "text-[#4FC3F7]"
                    }`}
                    aria-hidden="true"
                  />
                </span>

                <span className="relative text-base sm:text-lg font-extrabold text-[#0F4C5C] mb-1.5 text-center px-4 leading-snug">
                  {form.fileName
                    ? form.fileName
                    : isDragging
                    ? "Drop Your CV Here"
                    : "Click To Upload Or Drag & Drop"}
                </span>
                <span className="relative text-xs sm:text-sm text-[#64748B] font-medium">
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
                <div className="mt-2.5 flex items-center justify-between bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl px-3.5 py-2.5 animate-slideUp">
                  <div className="flex items-center gap-3 min-w-0">
                    <FaCheckCircle className="text-[#22C55E] text-base flex-shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-[#0F4C5C] truncate block">
                        {form.fileName}
                      </span>
                      {cvFile && (
                        <span className="text-[10px] text-[#64748B] font-medium">
                          {(cvFile.size / 1024).toFixed(1)} KB
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-[#64748B] hover:text-red-500 transition-colors flex-shrink-0 p-1"
                    aria-label="Remove File"
                  >
                    <FaTimes className="text-sm" aria-hidden="true" />
                  </button>
                </div>
              )}
            </SectionCard>

            <SectionCard
              number="05"
              title="Additional Message"
              subtitle="Anything Else We Should Know?"
            >
              <Field
                label="Tell Us Anything Else"
                icon={FaComments}
                iconColor="text-[#8B5CF6]"
                optional
                focused={focusedField === "message"}
                hint="Describe Your Experience, Certifications, Or Preferred Countries"
              >
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. I Have 5 Years Of Welding Experience In UAE And I Am Available For Immediate Deployment..."
                  className={`${inputClass("message")} resize-none`}
                />
              </Field>
            </SectionCard>

            <div className="mt-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,76,92,0.06)] p-4 sm:p-5">
              <div className="flex items-start gap-2 mb-3 p-3 rounded-xl bg-[#22C55E]/5 border border-[#22C55E]/20">
                <FaShieldAlt className="text-[#22C55E] text-sm mt-0.5 flex-shrink-0" aria-hidden="true" />
                <p className="text-xs text-[#0A3A47]/80 leading-relaxed">
                  By Submitting This Form, You Confirm That The Information
                  Provided Is Accurate And Agree To Be Contacted By Ali
                  Hajveri International Regarding Suitable Overseas Employment
                  Opportunities.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group/submit relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-8 py-3.5 rounded-full font-extrabold shadow-[0_12px_30px_rgba(79,195,247,0.45)] hover:shadow-[0_18px_45px_rgba(255,213,79,0.55)] hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ animation: "gradientShift 4s ease infinite" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/submit:translate-x-full transition-transform duration-700" />
                {submitting ? (
                  <>
                    <FaSpinner className="relative text-xs animate-spin" aria-hidden="true" />
                    <span className="relative">Submitting...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="relative text-xs" aria-hidden="true" />
                    <span className="relative">Submit CV</span>
                    <FaArrowRight className="relative text-xs group-hover/submit:translate-x-2 transition-transform duration-300" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ============ TRUST SECTION ============ */}
      <section className="relative py-7 sm:py-10 bg-gradient-to-b from-white to-[#E1F5FE] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-5 sm:mb-7">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#4FC3F7] mb-2">
              <span className="w-8 h-px bg-[#4FC3F7]" />
              Why Choose Us
              <span className="w-8 h-px bg-[#4FC3F7]" />
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-3">
              Trusted By{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                5,000+ Workers
              </span>
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base max-w-xl mx-auto">
              Join Thousands Of Candidates Who Have Successfully Launched
              Their Overseas Careers Through Our Platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: FaUser,
                title: "Verified Profile",
                desc: "Your Data Is Securely Stored And Reviewed Only By Our Recruitment Team.",
                color: "from-[#4FC3F7] to-[#29B6F6]",
              },
              {
                icon: FaGlobe,
                title: "Overseas Opportunities",
                desc: "Get Considered For Placements Across Gulf, Asia, And Other Countries.",
                color: "from-[#22C55E] to-[#16A34A]",
              },
              {
                icon: FaCheckCircle,
                title: "No Hidden Charges",
                desc: "We Never Ask For Any Payment To Submit Your CV Or To Register.",
                color: "from-[#FFB300] to-[#F59E0B]",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="group relative bg-white rounded-2xl p-5 border border-[#E2E8F0] hover:border-[#4FC3F7]/50 hover:shadow-[0_20px_40px_rgba(79,195,247,0.15)] hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                >
                  <Icon className="text-white text-lg" aria-hidden="true" />
                </div>
                <h3 className="font-extrabold text-[#0F4C5C] mb-2 text-base">
                  {title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
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