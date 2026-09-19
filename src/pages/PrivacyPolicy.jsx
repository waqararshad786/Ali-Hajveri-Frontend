// src/pages/PrivacyPolicy.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { COMPANY_INFO } from "../utilis/constants";
import {
  FaShieldAlt,
  FaLock,
  FaDatabase,
  FaEye,
  FaArrowRight,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGlobe,
  FaFileUpload,
  FaCookieBite,
  FaUserShield,
  FaSyncAlt,
  FaGavel,
  FaCheckCircle,
  FaChevronRight,
  FaBars,
  FaTimes,
} from "react-icons/fa";

/* ============================================================
   SECTIONS DATA
============================================================ */
const SECTIONS = [
  {
    id: "collect",
    icon: FaLock,
    title: "Information We Collect",
    color: "text-[#4FC3F7]",
    bgFrom: "from-[#4FC3F7]",
    bgTo: "to-[#29B6F6]",
    shadow: "shadow-[0_10px_24px_rgba(79,195,247,0.4)]",
    hoverBorder: "hover:border-[#4FC3F7]/50",
    content: (
      <>
        <p className="text-[#0A3A47]/85 mb-4 text-xs sm:text-sm">
          When you interact with our website — especially when submitting your
          CV or contacting us — we may collect the following information:
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-[#0F4C5C] text-sm sm:text-base mb-2 flex items-center gap-2">
              <FaUser className="text-[#4FC3F7] text-xs" />
              Personal Information
            </h4>
            <div className="grid sm:grid-cols-2 gap-1.5">
              {[
                "Full name",
                "Email address",
                "Phone & WhatsApp number",
                "City and country of residence",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-[#0A3A47]/85 text-xs sm:text-sm"
                >
                  <FaCheckCircle className="text-[#22C55E] text-[10px] flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#0F4C5C] text-sm sm:text-base mb-2 flex items-center gap-2">
              <FaBriefcase className="text-[#FFB300] text-xs" />
              Professional &amp; Employment Information
            </h4>
            <div className="grid sm:grid-cols-2 gap-1.5">
              {[
                "Position applying for",
                "Worker category",
                "Years of experience",
                "Highest education level",
                "Key skills & competencies",
                "Passport number (if provided)",
                "Any additional details in your message",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-[#0A3A47]/85 text-xs sm:text-sm"
                >
                  <FaCheckCircle className="text-[#22C55E] text-[10px] flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#0F4C5C] text-sm sm:text-base mb-2 flex items-center gap-2">
              <FaFileUpload className="text-[#8B5CF6] text-xs" />
              Uploaded Documents
            </h4>
            <div className="grid sm:grid-cols-2 gap-1.5">
              {[
                "Your CV / Resume (PDF, DOC, DOCX)",
                "Additional documents you share voluntarily",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-[#0A3A47]/85 text-xs sm:text-sm"
                >
                  <FaCheckCircle className="text-[#22C55E] text-[10px] flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#0F4C5C] text-sm sm:text-base mb-2 flex items-center gap-2">
              <FaDatabase className="text-[#22C55E] text-xs" />
              Technical &amp; Usage Data
            </h4>
            <div className="grid sm:grid-cols-2 gap-1.5">
              {[
                "IP address and browser type",
                "Pages visited and time spent",
                "Device and approximate location",
                "Cookies & tracking technologies",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-[#0A3A47]/85 text-xs sm:text-sm"
                >
                  <FaCheckCircle className="text-[#22C55E] text-[10px] flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "use",
    icon: FaDatabase,
    title: "How We Use Your Information",
    color: "text-[#22C55E]",
    bgFrom: "from-[#22C55E]",
    bgTo: "to-[#16A34A]",
    shadow: "shadow-[0_10px_24px_rgba(34,197,94,0.4)]",
    hoverBorder: "hover:border-[#22C55E]/50",
    content: (
      <div className="space-y-2.5">
        {[
          "To review your CV and match your profile with suitable overseas job opportunities.",
          "To contact you about shortlisting, interviews, trade tests, or documentation.",
          "To respond to your inquiries and provide manpower recruitment support.",
          "To verify qualifications, experience, and identity during the recruitment process.",
          "To process visa applications, medical checks, and pre-departure arrangements (where applicable).",
          "To share relevant candidate information with overseas employers you consent to be considered by.",
          "To improve our website, services, and user experience.",
          "To send occasional updates about new opportunities (with easy opt-out).",
        ].map((text) => (
          <div
            key={text}
            className="flex items-start gap-2.5 text-[#0A3A47]/85 text-xs sm:text-sm"
          >
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22C55E]/15 flex items-center justify-center mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            </span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "share",
    icon: FaUserShield,
    title: "When We Share Your Information",
    color: "text-[#8B5CF6]",
    bgFrom: "from-[#8B5CF6]",
    bgTo: "to-[#7C3AED]",
    shadow: "shadow-[0_10px_24px_rgba(139,92,246,0.4)]",
    hoverBorder: "hover:border-[#8B5CF6]/50",
    content: (
      <>
        <p className="text-[#0A3A47]/85 mb-4 text-xs sm:text-sm">
          We <strong className="text-[#0F4C5C]">never sell</strong> your
          personal data. We only share your information in the following
          limited circumstances:
        </p>
        <div className="space-y-2.5">
          {[
            "With overseas employers — only for vacancies you have applied for or consented to.",
            "With government authorities (BEOE, immigration, embassy) — only as required for visa compliance.",
            "With medical centers or trade-testing bodies — only when required for your application.",
            "With our internal recruitment team — for reviewing and processing your application.",
            "With legal authorities — if required by law or to protect our legal rights.",
          ].map((text) => (
            <div
              key={text}
              className="flex items-start gap-2.5 text-[#0A3A47]/85 text-xs sm:text-sm"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#8B5CF6]/15 flex items-center justify-center mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "security",
    icon: FaEye,
    title: "Data Security",
    color: "text-[#FFB300]",
    bgFrom: "from-[#FFB300]",
    bgTo: "to-[#F59E0B]",
    shadow: "shadow-[0_10px_24px_rgba(255,179,0,0.4)]",
    hoverBorder: "hover:border-[#FFB300]/50",
    content: (
      <p className="text-[#0A3A47]/85 text-xs sm:text-sm leading-relaxed">
        We implement industry-standard administrative, technical, and physical
        safeguards to protect your personal information from unauthorized
        access, alteration, or disclosure. Access is limited to authorized
        personnel only. However, no online transmission or storage method is
        100% secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "retention",
    icon: FaSyncAlt,
    title: "Data Retention",
    color: "text-[#06B6D4]",
    bgFrom: "from-[#06B6D4]",
    bgTo: "to-[#0891B2]",
    shadow: "shadow-[0_10px_24px_rgba(6,182,212,0.4)]",
    hoverBorder: "hover:border-[#06B6D4]/50",
    content: (
      <p className="text-[#0A3A47]/85 text-xs sm:text-sm leading-relaxed">
        We retain your CV and application details for as long as your profile
        remains relevant for overseas recruitment opportunities. If you wish to
        have your data removed, you may request deletion at any time by
        contacting us at{" "}
        <strong className="text-[#0F4C5C]">{COMPANY_INFO.email}</strong>.
      </p>
    ),
  },
  {
    id: "cookies",
    icon: FaCookieBite,
    title: "Cookies & Tracking",
    color: "text-[#F97316]",
    bgFrom: "from-[#F97316]",
    bgTo: "to-[#EA580C]",
    shadow: "shadow-[0_10px_24px_rgba(249,115,22,0.4)]",
    hoverBorder: "hover:border-[#F97316]/50",
    content: (
      <p className="text-[#0A3A47]/85 text-xs sm:text-sm leading-relaxed">
        We use cookies and similar technologies to enhance website
        functionality, remember your preferences, and analyze traffic patterns.
        You can disable cookies in your browser settings at any time — though
        some features of the website may not function properly as a result.
      </p>
    ),
  },
  {
    id: "thirdparty",
    icon: FaGlobe,
    title: "Third-Party Links",
    color: "text-[#EC4899]",
    bgFrom: "from-[#EC4899]",
    bgTo: "to-[#DB2777]",
    shadow: "shadow-[0_10px_24px_rgba(236,72,153,0.4)]",
    hoverBorder: "hover:border-[#EC4899]/50",
    content: (
      <p className="text-[#0A3A47]/85 text-xs sm:text-sm leading-relaxed">
        Our website may contain links to external sites (such as employer
        websites, government portals, or partner organizations). We are not
        responsible for the privacy practices of those sites. We encourage you
        to review their privacy policies before providing any personal
        information.
      </p>
    ),
  },
  {
    id: "rights",
    icon: FaGavel,
    title: "Your Rights",
    color: "text-[#6366F1]",
    bgFrom: "from-[#6366F1]",
    bgTo: "to-[#4F46E5]",
    shadow: "shadow-[0_10px_24px_rgba(99,102,241,0.4)]",
    hoverBorder: "hover:border-[#6366F1]/50",
    content: (
      <>
        <p className="text-[#0A3A47]/85 mb-4 text-xs sm:text-sm">
          You have the right to:
        </p>
        <div className="space-y-2.5 mb-4">
          {[
            "Access the personal data we hold about you.",
            "Request corrections to inaccurate or incomplete data.",
            "Request deletion of your CV and personal information.",
            "Withdraw consent for certain processing activities.",
            "Opt out of promotional or update emails at any time.",
          ].map((text) => (
            <div
              key={text}
              className="flex items-start gap-2.5 text-[#0A3A47]/85 text-xs sm:text-sm"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#6366F1]/15 flex items-center justify-center mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>
        <p className="text-[#0A3A47]/85 text-xs sm:text-sm">
          To exercise any of these rights, contact us at{" "}
          <strong className="text-[#0F4C5C]">{COMPANY_INFO.email}</strong>.
        </p>
      </>
    ),
  },
  {
    id: "children",
    icon: FaUserShield,
    title: "Children's Privacy",
    color: "text-[#14B8A6]",
    bgFrom: "from-[#14B8A6]",
    bgTo: "to-[#0D9488]",
    shadow: "shadow-[0_10px_24px_rgba(20,184,166,0.4)]",
    hoverBorder: "hover:border-[#14B8A6]/50",
    content: (
      <p className="text-[#0A3A47]/85 text-xs sm:text-sm leading-relaxed">
        Our services are intended for adults seeking overseas employment. We do
        not knowingly collect personal information from individuals under the
        age of 18. If we become aware that we have inadvertently collected such
        data, we will delete it promptly.
      </p>
    ),
  },
  {
    id: "changes",
    icon: FaSyncAlt,
    title: "Changes To This Policy",
    color: "text-[#A78BFA]",
    bgFrom: "from-[#A78BFA]",
    bgTo: "to-[#8B5CF6]",
    shadow: "shadow-[0_10px_24px_rgba(167,139,250,0.4)]",
    hoverBorder: "hover:border-[#A78BFA]/50",
    content: (
      <p className="text-[#0A3A47]/85 text-xs sm:text-sm leading-relaxed">
        We may update this Privacy Policy from time to time. The revised
        version will be posted on this page with an updated "Last Updated"
        date. We encourage you to review it periodically to stay informed
        about how we protect your information.
      </p>
    ),
  },
];

/* ============================================================
   PAGE
============================================================ */
const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("collect");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const heroRef = useRef(null);

  const currentSection = SECTIONS.find((s) => s.id === activeSection);
  const CurrentIcon = currentSection?.icon || FaLock;
  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const switchSection = (id) => {
    setActiveSection(id);
    setMobileNavOpen(false);
    const contentTop = document.getElementById("privacy-content-top");
    if (contentTop) {
      const y =
        contentTop.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-18px) translateX(8px); }
        }
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blob 9s ease-in-out infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative mt-[-1px] section-tight overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/src/assets/privacy-img-3.png)" }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C5C]/10 via-[#0A3A47]/25 to-[#06303A]/30" />
        <div className="absolute inset-0 bg-[#0F4C5C]/25" />

        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />

        <div
          ref={heroRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79,195,247,0.15), transparent 45%)`,
          }}
        />

        <div className="absolute -top-32 -right-40 w-[280px] h-[280px] rounded-full bg-[#4FC3F7]/15 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[260px] h-[260px] rounded-full bg-[#FFD54F]/10 blur-3xl" />

        {[...Array(7)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#4FC3F7] opacity-60 animate-float"
            style={{
              left: `${12 + i * 13}%`,
              top: `${18 + (i % 4) * 18}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-28 md:py-32">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/15 backdrop-blur-md border border-[#4FC3F7]/50 rounded-full px-3.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-ping-slow" />
            <span className="text-white text-xs sm:text-sm font-bold">
              Privacy &amp; Security
            </span>
          </div>

          <h1 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-4 [text-shadow:_0_2px_12px_rgba(0,0,0,0.6)]">
            Your Privacy{" "}
            <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
              Matters
            </span>
          </h1>

          <p
            className="text-white/95 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6 font-medium"
            style={{
              textShadow:
                "0 1px 3px rgba(0,0,0,0.85), 0 2px 6px rgba(15,76,92,0.7)",
            }}
          >
            How We Collect, Use, And Protect Your Personal Information.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5">
            <FaSyncAlt className="text-[#FFB300] text-[10px]" />
            <span className="text-white/80 text-[10px] sm:text-xs font-semibold">
              Last Updated: September 2026
            </span>
          </div>
        </div>
      </section>

      {/* ============ CONTENT ============ */}
      <section className="relative bg-gradient-to-b from-[#E1F5FE] via-white to-[#E1F5FE] py-12 sm:py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div
          id="privacy-content-top"
          className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
        >
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* ===== SIDEBAR NAVIGATION — TABS ===== */}
            <aside className="lg:col-span-4 xl:col-span-3">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="lg:hidden w-full flex items-center justify-between gap-3 bg-white rounded-2xl border border-[#4FC3F7]/25 shadow-[0_10px_28px_rgba(15,76,92,0.10)] p-4 mb-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentSection.bgFrom} ${currentSection.bgTo} flex items-center justify-center ${currentSection.shadow}`}>
                    <CurrentIcon className="text-white text-xs" />
                  </span>
                  <div className="text-left">
                    <h3 className="font-extrabold text-[#0F4C5C] text-sm">
                      {currentSection?.title}
                    </h3>
                    <p className="text-[10px] text-[#0A3A47]/60 font-semibold">
                      Section {currentIndex + 1} of {SECTIONS.length}
                    </p>
                  </div>
                </div>
                {mobileNavOpen ? (
                  <FaTimes className="text-[#0F4C5C] text-sm" />
                ) : (
                  <FaBars className="text-[#0F4C5C] text-sm" />
                )}
              </button>

              <div className={`${mobileNavOpen ? "block" : "hidden"} lg:block`}>
                <div className="relative bg-white rounded-2xl border border-[#4FC3F7]/25 shadow-[0_14px_40px_rgba(15,76,92,0.10)] p-5 overflow-hidden">
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

                  <div className="hidden lg:flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_6px_16px_rgba(79,195,247,0.35)]">
                      <FaShieldAlt className="text-white text-xs" />
                    </span>
                    <div>
                      <h3 className="font-extrabold text-[#0F4C5C] text-sm">
                        Contents
                      </h3>
                      <p className="text-[10px] text-[#0A3A47]/60 font-semibold">
                        {SECTIONS.length} Sections
                      </p>
                    </div>
                  </div>

                  <nav className="space-y-1">
                    {SECTIONS.map((section) => {
                      const isActive = activeSection === section.id;
                      const SectionIcon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => switchSection(section.id)}
                          className={`group w-full flex items-center gap-2.5 text-left px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-[#4FC3F7]/20 to-transparent text-[#0F4C5C] border-l-2 border-[#4FC3F7] shadow-[0_4px_12px_rgba(79,195,247,0.12)]"
                              : "text-[#0A3A47]/70 hover:bg-[#E1F5FE] hover:text-[#0F4C5C]"
                          }`}
                        >
                          <span
                            className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
                              isActive
                                ? `bg-gradient-to-br ${section.bgFrom} ${section.bgTo} text-white ${section.shadow}`
                                : `bg-[#E1F5FE] ${section.color}`
                            }`}
                          >
                            <SectionIcon className="text-[10px]" />
                          </span>
                          <span className="flex-1 leading-tight">
                            {section.title}
                          </span>
                          {isActive && (
                            <FaChevronRight className="text-[#4FC3F7] text-[9px]" />
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>

            {/* ===== MAIN CONTENT ===== */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="space-y-5">
                {currentSection && (
                  <div
                    key={currentSection.id}
                    className={`group relative bg-white rounded-2xl border border-[#4FC3F7]/20 ${currentSection.hoverBorder} shadow-[0_8px_28px_rgba(15,76,92,0.06)] hover:shadow-[0_14px_40px_rgba(79,195,247,0.14)] p-5 sm:p-7 transition-all duration-500 overflow-hidden animate-fadeIn`}
                  >
                    <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_4s_linear_infinite]" />

                    <div className="flex items-start gap-4 mb-5">
                      <div className="relative flex-shrink-0">
                        <span className={`absolute inset-0 rounded-xl bg-gradient-to-br ${currentSection.bgFrom} ${currentSection.bgTo} blur-md opacity-50 animate-pulse`} />
                        <span className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${currentSection.bgFrom} ${currentSection.bgTo} flex items-center justify-center ${currentSection.shadow}`}>
                          <CurrentIcon className="text-white text-lg sm:text-xl" />
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-[10px] font-extrabold ${currentSection.color} bg-[#E1F5FE] px-2.5 py-1 rounded-full tracking-wider`}>
                            Section {String(currentIndex + 1).padStart(2, "0")}{" "}
                            / {String(SECTIONS.length).padStart(2, "0")}
                          </span>
                        </div>
                        <h2 className="font-[Plus_Jakarta_Sans] text-xl sm:text-2xl font-extrabold text-[#0F4C5C] leading-tight">
                          {currentSection.title}
                        </h2>
                      </div>
                    </div>

                    <div className="pl-0 sm:pl-[4.5rem] text-[#0A3A47]">
                      {currentSection.content}
                    </div>
                  </div>
                )}

                {/* Prev / Next Navigation */}
                <div className="flex items-center justify-between gap-3">
                  {currentIndex > 0 ? (
                    <button
                      onClick={() =>
                        switchSection(SECTIONS[currentIndex - 1].id)
                      }
                      className="group flex items-center gap-2 bg-white border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 rounded-full px-4 py-2.5 text-xs sm:text-sm font-bold text-[#0F4C5C] hover:text-[#4FC3F7] shadow-[0_6px_18px_rgba(15,76,92,0.06)] hover:shadow-[0_10px_24px_rgba(79,195,247,0.15)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <FaChevronRight className="text-[10px] rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <span className="text-[10px] sm:text-xs font-bold text-[#0A3A47]/50 tracking-wider">
                    {currentIndex + 1} / {SECTIONS.length}
                  </span>

                  {currentIndex < SECTIONS.length - 1 ? (
                    <button
                      onClick={() =>
                        switchSection(SECTIONS[currentIndex + 1].id)
                      }
                      className="group flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] rounded-full px-4 py-2.5 text-xs sm:text-sm font-bold shadow-[0_8px_20px_rgba(79,195,247,0.35)] hover:shadow-[0_12px_28px_rgba(255,213,79,0.5)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <FaChevronRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ) : (
                    <div />
                  )}
                </div>

                {/* ===== CONTACT BOX ===== */}
                <div className="relative bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] rounded-2xl p-6 sm:p-8 overflow-hidden border border-[#4FC3F7]/25 shadow-[0_20px_50px_rgba(15,76,92,0.25)] mt-8">
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#4FC3F7] to-transparent bg-[length:200%_100%] animate-[shimmer_4s_linear_infinite]" />

                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#4FC3F7]/20 blur-3xl animate-blob" />
                  <div
                    className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#FFD54F]/12 blur-3xl animate-blob"
                    style={{ animationDelay: "2s" }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-11 h-11 rounded-xl bg-[#4FC3F7]/20 border border-[#4FC3F7]/40 flex items-center justify-center">
                        <FaEnvelope className="text-[#FFB300] text-base" />
                      </span>
                      <div>
                        <h2 className="font-[Plus_Jakarta_Sans] text-lg sm:text-xl font-extrabold text-white">
                          Questions About Your Privacy?
                        </h2>
                        <p className="text-white/60 text-xs">
                          We're Here To Help
                        </p>
                      </div>
                    </div>

                    <p className="text-white/80 text-sm mb-5 leading-relaxed">
                      If You Have Any Questions About This Privacy Policy Or
                      How We Handle Your Data, Please Reach Out:
                    </p>

                    <div className="grid sm:grid-cols-3 gap-3">
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="group flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur border border-[#FFB300]/30 hover:border-[#FFB300]/60 rounded-xl p-3 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FFB300] to-[#F59E0B] flex items-center justify-center flex-shrink-0 shadow-[0_6px_14px_rgba(255,179,0,0.4)] group-hover:scale-110 transition-transform">
                          <FaEnvelope className="text-white text-xs" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold text-[#FFB300] uppercase tracking-wider">
                            Email
                          </p>
                          <p className="text-xs font-bold text-white group-hover:text-[#FFB300] transition-colors truncate">
                            {COMPANY_INFO.email}
                          </p>
                        </div>
                      </a>

                      <a
                        href={`tel:${COMPANY_INFO.phone}`}
                        className="group flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur border border-[#4FC3F7]/30 hover:border-[#4FC3F7]/60 rounded-xl p-3 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center flex-shrink-0 shadow-[0_6px_14px_rgba(79,195,247,0.4)] group-hover:scale-110 transition-transform">
                          <FaPhone className="text-white text-xs" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold text-[#4FC3F7] uppercase tracking-wider">
                            Phone
                          </p>
                          <p className="text-xs font-bold text-white group-hover:text-[#4FC3F7] transition-colors truncate">
                            {COMPANY_INFO.phone}
                          </p>
                        </div>
                      </a>

                      <div className="flex items-center gap-3 bg-white/10 backdrop-blur border border-[#22C55E]/30 rounded-xl p-3">
                        <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center flex-shrink-0 shadow-[0_6px_14px_rgba(34,197,94,0.4)]">
                          <FaMapMarkerAlt className="text-white text-xs" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold text-[#22C55E] uppercase tracking-wider">
                            Office
                          </p>
                          <p className="text-xs font-bold text-white leading-snug">
                            Pakistan
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ===== RETURN HOME ===== */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-xs sm:text-sm text-[#0A3A47]/60 font-semibold flex items-center gap-2">
                    <FaCheckCircle className="text-[#22C55E]" />
                    Your Privacy Matters To Us.
                  </p>
                  <Link
                    to="/"
                    className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 py-3 rounded-full text-sm font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_16px_38px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                    style={{ animation: "gradientShift 4s ease infinite" }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative">Return Home</span>
                    <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;