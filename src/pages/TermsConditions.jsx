// src/pages/TermsConditions.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { COMPANY_INFO } from "../utilis/constants";
import {
  FaFileContract,
  FaGavel,
  FaUserCheck,
  FaShieldAlt,
  FaGlobe,
  FaArrowRight,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSyncAlt,
  FaCheckCircle,
  FaBriefcase,
  FaHandshake,
  FaPassport,
  FaBan,
  FaCopyright,
  FaBalanceScale,
  FaQuoteLeft,
  FaTimes,
} from "react-icons/fa";

/* ============================================================
   SECTIONS DATA
============================================================ */
const SECTIONS = [
  {
    id: "acceptance",
    number: "01",
    icon: FaCheckCircle,
    title: "Acceptance Of Terms",
    short: "Acceptance",
    color: "text-[#22C55E]",
    bgFrom: "from-[#22C55E]",
    bgTo: "to-[#16A34A]",
    shadow: "shadow-[0_10px_24px_rgba(34,197,94,0.4)]",
    content: (
      <>
        <p className="text-[#0A3A47]/85 text-sm leading-relaxed mb-3">
          Welcome to{" "}
          <strong className="text-[#0F4C5C]">{COMPANY_INFO.fullName}</strong>{" "}
          (referred to as "we", "our", or "us"). By accessing our website,
          submitting your CV, requesting manpower, or using any of our
          recruitment services, you agree to comply with the following terms
          and conditions.
        </p>
        <p className="text-[#0A3A47]/85 text-sm leading-relaxed">
          If you do not agree with any part of these terms, please refrain from
          using our website or services.
        </p>
      </>
    ),
  },
  {
    id: "services",
    number: "02",
    icon: FaBriefcase,
    title: "Scope Of Services",
    short: "Services",
    color: "text-[#4FC3F7]",
    bgFrom: "from-[#4FC3F7]",
    bgTo: "to-[#29B6F6]",
    shadow: "shadow-[0_10px_24px_rgba(79,195,247,0.4)]",
    content: (
      <>
        <p className="text-[#0A3A47]/85 text-sm leading-relaxed mb-4">
          {COMPANY_INFO.fullName} provides overseas manpower recruitment
          services exclusively from Pakistan to international employers. Our
          services include:
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            "Sourcing skilled, semi-skilled, technical, and professional Pakistani workers.",
            "Screening, shortlisting, and coordinating interviews / trade tests.",
            "Assisting with documentation, medical exams, and visa processing.",
            "Coordinating deployment and employer handover at destination.",
            "Supporting employers with manpower demand planning.",
            "Pre-departure orientation and mobilization support.",
          ].map((text) => (
            <div
              key={text}
              className="flex items-start gap-2 text-[#0A3A47]/85 text-xs sm:text-sm bg-[#E1F5FE]/50 border border-[#4FC3F7]/20 rounded-lg p-2.5"
            >
              <FaCheckCircle className="text-[#22C55E] text-[10px] flex-shrink-0 mt-1" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "use",
    number: "03",
    icon: FaUserCheck,
    title: "Acceptable Use Of Services",
    short: "Acceptable Use",
    color: "text-[#8B5CF6]",
    bgFrom: "from-[#8B5CF6]",
    bgTo: "to-[#7C3AED]",
    shadow: "shadow-[0_10px_24px_rgba(139,92,246,0.4)]",
    content: (
      <div className="space-y-2.5">
        {[
          "You will use our services only for lawful purposes related to overseas employment or manpower recruitment.",
          "You will provide accurate, truthful, and complete information in all forms, CVs, and documents.",
          "You will not submit forged, altered, or misleading documents, certificates, or experience letters.",
          "You will not use our platform for fraud, impersonation, or any illegal activity.",
          "You are responsible for maintaining the confidentiality of any account credentials.",
          "You will not attempt to bypass, hack, or disrupt our website or services.",
        ].map((text) => (
          <div
            key={text}
            className="flex items-start gap-3 text-[#0A3A47]/85 text-xs sm:text-sm"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#8B5CF6]/15 flex items-center justify-center mt-0.5 border border-[#8B5CF6]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            </span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "candidate",
    number: "04",
    icon: FaPassport,
    title: "Candidate Responsibilities",
    short: "Candidates",
    color: "text-[#06B6D4]",
    bgFrom: "from-[#06B6D4]",
    bgTo: "to-[#0891B2]",
    shadow: "shadow-[0_10px_24px_rgba(6,182,212,0.4)]",
    content: (
      <>
        <p className="text-[#0A3A47]/85 text-sm leading-relaxed mb-4">
          If you are a Pakistani candidate seeking overseas employment through
          us, you acknowledge and agree that:
        </p>
        <div className="space-y-2.5">
          {[
            "You must meet the qualifications, experience, and eligibility criteria of the specific overseas vacancy.",
            "You must provide a valid passport, CNIC, educational certificates, and experience letters as required.",
            "You will complete medical examinations, trade tests, and police clearance as applicable.",
            "You understand that final selection depends on the employer and is not guaranteed by us.",
            "You understand that visa approval is subject to the relevant government and immigration authorities.",
            "You will not pay or offer any unauthorized payment to any person for job placement.",
          ].map((text) => (
            <div
              key={text}
              className="flex items-start gap-3 text-[#0A3A47]/85 text-xs sm:text-sm"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#06B6D4]/15 flex items-center justify-center mt-0.5 border border-[#06B6D4]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "employer",
    number: "05",
    icon: FaHandshake,
    title: "Employer Responsibilities",
    short: "Employers",
    color: "text-[#FFB300]",
    bgFrom: "from-[#FFB300]",
    bgTo: "to-[#F59E0B]",
    shadow: "shadow-[0_10px_24px_rgba(255,179,0,0.4)]",
    content: (
      <>
        <p className="text-[#0A3A47]/85 text-sm leading-relaxed mb-4">
          If you are an international employer requesting Pakistani manpower
          through us, you acknowledge and agree that:
        </p>
        <div className="space-y-2.5">
          {[
            "You will provide accurate and complete details of your manpower requirements.",
            "You will provide a valid job order and comply with applicable laws of your country and Pakistan.",
            "You will honor the agreed salary, benefits, working hours, and employment terms stated in the demand.",
            "You will not discriminate based on caste, religion, gender, or ethnicity.",
            "You will cooperate with the visa processing, medical, and pre-departure procedures.",
            "You will ensure proper reception and onboarding of deployed workers at the destination.",
          ].map((text) => (
            <div
              key={text}
              className="flex items-start gap-3 text-[#0A3A47]/85 text-xs sm:text-sm"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#FFB300]/15 flex items-center justify-center mt-0.5 border border-[#FFB300]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB300]" />
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "no-guarantee",
    number: "06",
    icon: FaBan,
    title: "No Guarantee Of Employment Or Visa",
    short: "No Guarantee",
    color: "text-[#EF4444]",
    bgFrom: "from-[#EF4444]",
    bgTo: "to-[#DC2626]",
    shadow: "shadow-[0_10px_24px_rgba(239,68,68,0.4)]",
    content: (
      <>
        <div className="flex items-start gap-3 bg-gradient-to-br from-[#FFD54F]/10 to-[#FFD54F]/5 border border-[#FFD54F]/40 rounded-xl p-4 mb-4">
          <FaShieldAlt className="text-[#FFB300] text-lg flex-shrink-0 mt-0.5" />
          <p className="text-[#0A3A47]/90 text-sm leading-relaxed font-medium">
            <strong className="text-[#0F4C5C]">
              {COMPANY_INFO.fullName} does not guarantee
            </strong>{" "}
            employment, selection, visa approval, or deployment.
          </p>
        </div>
        <p className="text-[#0A3A47]/85 text-sm leading-relaxed mb-3">
          The following factors are outside our control:
        </p>
        <div className="space-y-2.5">
          {[
            "The final selection decision always rests with the overseas employer.",
            "Visa approval is subject to the relevant government and immigration authorities.",
            "Medical fitness, trade test results, and background verification affect eligibility.",
            "Candidate availability and job order status may change without notice.",
            "Employers may withdraw or modify their requirements at any time.",
          ].map((text) => (
            <div
              key={text}
              className="flex items-start gap-3 text-[#0A3A47]/85 text-xs sm:text-sm"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#EF4444]/15 flex items-center justify-center mt-0.5 border border-[#EF4444]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "fees",
    number: "07",
    icon: FaShieldAlt,
    title: "Fees & Payments",
    short: "Fees",
    color: "text-[#14B8A6]",
    bgFrom: "from-[#14B8A6]",
    bgTo: "to-[#0D9488]",
    shadow: "shadow-[0_10px_24px_rgba(20,184,166,0.4)]",
    content: (
      <>
        <div className="flex items-start gap-3 bg-gradient-to-br from-[#4FC3F7]/10 to-[#4FC3F7]/5 border border-[#4FC3F7]/40 rounded-xl p-4 mb-4">
          <FaCheckCircle className="text-[#22C55E] text-lg flex-shrink-0 mt-0.5" />
          <p className="text-[#0A3A47]/90 text-sm leading-relaxed font-medium">
            Submitting your CV and using our website is{" "}
            <strong className="text-[#0F4C5C]">completely FREE</strong> for
            candidates.
          </p>
        </div>
        <div className="space-y-2.5">
          {[
            "We never charge candidates for job placement or selection.",
            "Any legitimate government fees (visa, medical, passport) are paid directly to authorities.",
            "Employers may be charged service fees as per the signed recruitment agreement.",
            "All payments are documented with proper receipts and records.",
          ].map((text) => (
            <div
              key={text}
              className="flex items-start gap-3 text-[#0A3A47]/85 text-xs sm:text-sm"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#14B8A6]/15 flex items-center justify-center mt-0.5 border border-[#14B8A6]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "ip",
    number: "08",
    icon: FaCopyright,
    title: "Intellectual Property",
    short: "IP Rights",
    color: "text-[#A78BFA]",
    bgFrom: "from-[#A78BFA]",
    bgTo: "to-[#8B5CF6]",
    shadow: "shadow-[0_10px_24px_rgba(167,139,250,0.4)]",
    content: (
      <p className="text-[#0A3A47]/85 text-sm leading-relaxed">
        All content on this website — including logos, trademarks, text,
        images, graphics, design, and code — is the property of{" "}
        <strong className="text-[#0F4C5C]">{COMPANY_INFO.fullName}</strong>{" "}
        and is protected by applicable copyright and intellectual property
        laws. You may not reproduce, distribute, modify, or create derivative
        works without our prior written consent.
      </p>
    ),
  },
  {
    id: "liability",
    number: "09",
    icon: FaBalanceScale,
    title: "Limitation Of Liability",
    short: "Liability",
    color: "text-[#F97316]",
    bgFrom: "from-[#F97316]",
    bgTo: "to-[#EA580C]",
    shadow: "shadow-[0_10px_24px_rgba(249,115,22,0.4)]",
    content: (
      <p className="text-[#0A3A47]/85 text-sm leading-relaxed">
        {COMPANY_INFO.fullName} is not liable for any direct, indirect,
        incidental, or consequential damages arising from the use of our
        website or services. This includes, but is not limited to, loss of
        data, revenue, opportunity, or employment. We facilitate the
        recruitment process but do not control final employer decisions,
        government approvals, or third-party actions.
      </p>
    ),
  },
  {
    id: "thirdparty",
    number: "10",
    icon: FaGlobe,
    title: "Third-Party Links & Services",
    short: "Third-Party",
    color: "text-[#EC4899]",
    bgFrom: "from-[#EC4899]",
    bgTo: "to-[#DB2777]",
    shadow: "shadow-[0_10px_24px_rgba(236,72,153,0.4)]",
    content: (
      <p className="text-[#0A3A47]/85 text-sm leading-relaxed">
        Our website may contain links to external websites, employer portals,
        or government resources. We are not responsible for the content,
        policies, or practices of those third parties. Any interaction with
        third-party services is at your own discretion and risk.
      </p>
    ),
  },
  {
    id: "law",
    number: "11",
    icon: FaGavel,
    title: "Governing Law & Disputes",
    short: "Governing Law",
    color: "text-[#6366F1]",
    bgFrom: "from-[#6366F1]",
    bgTo: "to-[#4F46E5]",
    shadow: "shadow-[0_10px_24px_rgba(99,102,241,0.4)]",
    content: (
      <p className="text-[#0A3A47]/85 text-sm leading-relaxed">
        These Terms &amp; Conditions are governed by the laws of the Islamic
        Republic of Pakistan. Any disputes arising out of or relating to these
        terms or our services shall be subject to the exclusive jurisdiction
        of the competent courts in Lahore, Pakistan.
      </p>
    ),
  },
  {
    id: "changes",
    number: "12",
    icon: FaSyncAlt,
    title: "Changes To These Terms",
    short: "Changes",
    color: "text-[#06B6D4]",
    bgFrom: "from-[#06B6D4]",
    bgTo: "to-[#0891B2]",
    shadow: "shadow-[0_10px_24px_rgba(6,182,212,0.4)]",
    content: (
      <p className="text-[#0A3A47]/85 text-sm leading-relaxed">
        We reserve the right to update, modify, or replace these Terms &amp;
        Conditions at any time. The revised version will be posted on this
        page with an updated "Last Updated" date. Continued use of our website
        or services after changes constitutes acceptance of the revised terms.
      </p>
    ),
  },
];

/* ============================================================
   PAGE
============================================================ */
const TermsConditions = () => {
  const [activeId, setActiveId] = useState("acceptance");
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(Math.max(scrollPercent, 0), 100));

      let current = "acceptance";
      SECTIONS.forEach((s) => {
        const el = sectionRefs.current[s.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = s.id;
          }
        }
      });
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const activeSection = SECTIONS.find((s) => s.id === activeId) || SECTIONS[0];

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
        .animate-blob { animation: blob 9s ease-in-out infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>

      <div className="relative">
        {/* ============ SIDE PROGRESS BAR ============ */}
        <div className="hidden xl:block absolute left-6 top-0 bottom-0 z-30 pointer-events-none">
          <div className="sticky top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            <span
              className="text-[10px] font-extrabold text-[#0F4C5C] tracking-widest uppercase rotate-180"
              style={{ writingMode: "vertical-rl" }}
            >
              Reading
            </span>
            <div className="relative w-1 h-64 rounded-full bg-[#E1F5FE] overflow-hidden shadow-[0_4px_14px_rgba(79,195,247,0.15)]">
              <div
                className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-[#4FC3F7] to-[#29B6F6] transition-all duration-200 shadow-[0_0_12px_rgba(79,195,247,0.6)]"
                style={{ height: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] font-extrabold text-[#29B6F6] tracking-widest">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* ============ MOBILE FLOATING TOC BUTTON ============ */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-4 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:-translate-y-0.5 transition-all"
        >
          <FaFileContract className="text-sm" />
          <span className="text-xs">Contents</span>
        </button>

        {/* ============ MOBILE SIDE DRAWER ============ */}
        <div
          className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            className="absolute inset-0 bg-[#0F4C5C]/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-5 border-b border-[#4FC3F7]/20">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_6px_16px_rgba(79,195,247,0.35)]">
                  <FaFileContract className="text-white text-xs" />
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
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-full bg-[#E1F5FE] flex items-center justify-center text-[#0F4C5C] hover:bg-[#4FC3F7]/20 transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
            <nav
              className="p-4 space-y-1 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              {SECTIONS.map((section) => {
                const isActive = activeId === section.id;
                const SectionIcon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 text-left px-3 py-3 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#4FC3F7]/20 to-transparent text-[#0F4C5C] border-l-2 border-[#4FC3F7]"
                        : "text-[#0A3A47]/70 hover:bg-[#E1F5FE]"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-all ${
                        isActive
                          ? `bg-gradient-to-br ${section.bgFrom} ${section.bgTo} text-white ${section.shadow}`
                          : `bg-[#E1F5FE] ${section.color}`
                      }`}
                    >
                      <SectionIcon className="text-[10px]" />
                    </span>
                    <span className="flex-1 leading-tight">
                      {section.short}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* ============ HERO ============ */}
        <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-white via-[#E1F5FE] to-white pt-24 lg:pt-32 pb-16">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="absolute top-20 -left-40 w-[420px] h-[420px] bg-[#4FC3F7]/20 blur-3xl animate-blob" />
          <div
            className="absolute bottom-0 -right-40 w-[380px] h-[380px] bg-[#FFD54F]/12 blur-3xl animate-blob"
            style={{ animationDelay: "2s" }}
          />

          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#4FC3F7] opacity-50 animate-float"
              style={{
                left: `${8 + i * 11}%`,
                top: `${18 + (i % 4) * 20}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 mb-5 bg-white/80 backdrop-blur-md border border-[#4FC3F7]/50 rounded-full px-4 py-2 shadow-[0_6px_18px_rgba(79,195,247,0.15)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#4FC3F7] opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4FC3F7]" />
                  </span>
                  <span className="text-[#0F4C5C] text-xs sm:text-sm font-bold tracking-wide">
                    Legal &amp; Terms
                  </span>
                </div>

                <h1 className="font-[Plus_Jakarta_Sans] text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0F4C5C] leading-[1.1] mb-5">
                  Terms &amp;{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                      Conditions
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

                <p className="text-[#0A3A47]/85 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                  Please read these terms carefully before using our website or
                  services. They outline your rights and responsibilities when
                  engaging with{" "}
                  <strong className="text-[#0F4C5C]">
                    {COMPANY_INFO.fullName}
                  </strong>
                  .
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 bg-white border border-[#FFB300]/30 rounded-full px-3.5 py-1.5 shadow-[0_4px_14px_rgba(255,179,0,0.1)]">
                    <FaSyncAlt className="text-[#FFB300] text-[10px]" />
                    <span className="text-[#0F4C5C] text-[10px] sm:text-xs font-bold">
                      Last Updated: September 2026
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5 shadow-[0_4px_14px_rgba(79,195,247,0.1)]">
                    <FaFileContract className="text-[#4FC3F7] text-[10px]" />
                    <span className="text-[#0F4C5C] text-[10px] sm:text-xs font-bold">
                      {SECTIONS.length} Sections
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/30 to-[#FFD54F]/20 blur-3xl rounded-full" />

                  <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#4FC3F7]/25 shadow-[0_20px_50px_rgba(15,76,92,0.15)] overflow-hidden">
                    <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

                    <FaQuoteLeft className="text-[#4FC3F7]/20 text-4xl mb-3" />

                    <p className="text-[#0A3A47] text-sm sm:text-base leading-relaxed italic font-medium mb-5">
                      "Transparency and fairness are the foundation of every
                      relationship we build — with our candidates, our
                      employers, and our community."
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-[#4FC3F7]/20">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_8px_20px_rgba(79,195,247,0.4)]">
                        <FaFileContract className="text-white text-base" />
                      </div>
                      <div>
                        <p className="text-[#0F4C5C] font-extrabold text-sm">
                          {COMPANY_INFO.fullName}
                        </p>
                        <p className="text-[#4FC3F7] text-[10px] font-bold tracking-wide uppercase">
                          Legal Department
                        </p>
                      </div>
                    </div>

                    <span className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#4FC3F7]/10 blur-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ MAIN CONTENT ============ */}
        <section className="relative bg-gradient-to-b from-white via-[#E1F5FE]/40 to-white py-12 sm:py-16 overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden sm:block absolute left-4 sm:left-6 top-16 bottom-16 w-px bg-gradient-to-b from-transparent via-[#4FC3F7]/30 to-transparent" />

            <div className="space-y-4 sm:space-y-6">
              {SECTIONS.map((section) => {
                const Icon = section.icon;
                const isActive = activeId === section.id;

                return (
                  <div
                    key={section.id}
                    ref={(el) => (sectionRefs.current[section.id] = el)}
                    className="relative sm:pl-20 scroll-mt-28"
                  >
                    <div className="hidden sm:flex absolute left-0 top-5 w-12 h-12 items-center justify-center">
                      <span
                        className={`relative w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs transition-all duration-500 ${
                          isActive
                            ? `bg-gradient-to-br ${section.bgFrom} ${section.bgTo} text-white ${section.shadow} scale-110`
                            : `bg-white ${section.color} border-2 border-[#4FC3F7]/30 shadow-[0_4px_14px_rgba(79,195,247,0.15)]`
                        }`}
                      >
                        {section.number}
                      </span>
                      {isActive && (
                        <span className="absolute inset-0 rounded-xl border-2 border-[#4FC3F7] animate-ping opacity-40" />
                      )}
                    </div>

                    <div
                      className={`group relative bg-white rounded-2xl border transition-all duration-500 overflow-hidden ${
                        isActive
                          ? "border-[#4FC3F7]/60 shadow-[0_20px_50px_rgba(79,195,247,0.18)]"
                          : "border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 shadow-[0_8px_28px_rgba(15,76,92,0.06)] hover:shadow-[0_16px_40px_rgba(79,195,247,0.12)]"
                      }`}
                    >
                      <span
                        className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] origin-left transition-transform duration-500 ${
                          isActive
                            ? "scale-x-100 animate-[shimmer_3s_linear_infinite]"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />

                      <div className="sm:hidden flex items-center gap-3 px-5 pt-5 pb-3">
                        <span className={`w-9 h-9 rounded-lg bg-gradient-to-br ${section.bgFrom} ${section.bgTo} text-white flex items-center justify-center font-extrabold text-[10px] ${section.shadow}`}>
                          {section.number}
                        </span>
                        <span className={`text-[10px] font-extrabold ${section.color} tracking-widest uppercase`}>
                          Section {section.number}
                        </span>
                      </div>

                      <div className="p-5 sm:p-6 sm:pl-7">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative flex-shrink-0 hidden sm:block">
                            <span
                              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${section.bgFrom} ${section.bgTo} blur-md transition-opacity duration-500 ${
                                isActive ? "opacity-70" : "opacity-30"
                              }`}
                            />
                            <span className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${section.bgFrom} ${section.bgTo} flex items-center justify-center ${section.shadow}`}>
                              <Icon className="text-white text-base" />
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h2 className="font-[Plus_Jakarta_Sans] text-lg sm:text-xl font-extrabold text-[#0F4C5C] leading-tight">
                              {section.title}
                            </h2>
                          </div>

                          {isActive && (
                            <span className="hidden sm:inline-flex text-[9px] font-extrabold text-white bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] px-2.5 py-1 rounded-full tracking-wider shadow-[0_4px_12px_rgba(79,195,247,0.4)]">
                              READING
                            </span>
                          )}
                        </div>

                        <div>{section.content}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ BOTTOM CTA ============ */}
        <section className="relative py-12 sm:py-16 bg-gradient-to-b from-white to-[#E1F5FE] overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-10 sm:py-12 text-center overflow-hidden border border-[#4FC3F7]/25 shadow-[0_24px_60px_rgba(15,76,92,0.25)]">
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4FC3F7]/25 blur-3xl animate-blob" />
              <div
                className="absolute -bottom-24 -left-20 w-80 h-80 bg-[#FFD54F]/15 blur-3xl animate-blob"
                style={{ animationDelay: "2.5s" }}
              />

              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#4FC3F7] to-transparent bg-[length:200%_100%] animate-[shimmer_4s_linear_infinite]" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5 mb-4">
                  <FaShieldAlt className="text-[#FFB300] text-[10px]" />
                  <span className="text-[#4FC3F7] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                    Need Clarity?
                  </span>
                </div>

                <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                  Questions About These{" "}
                  <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                    Terms?
                  </span>
                </h2>

                <p className="text-white/80 text-sm sm:text-base mb-7 leading-relaxed">
                  If You Have Any Questions About These Terms &amp;
                  Conditions, Please Reach Out To Our Team.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 mb-7">
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
                        Lahore, Pakistan
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/contact"
                    className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 sm:px-8 py-3.5 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base overflow-hidden"
                    style={{ animation: "gradientShift 4s ease infinite" }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative">Contact Us</span>
                    <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 border border-[#4FC3F7]/40 text-[#4FC3F7] px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-[#4FC3F7]/10 hover:border-[#4FC3F7]/70 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                  >
                    Return Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsConditions;