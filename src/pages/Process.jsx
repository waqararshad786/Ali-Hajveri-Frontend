// src/pages/Process.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaUsers,
  FaUserCheck,
  FaClipboardCheck,
  FaFileSignature,
  FaPassport,
  FaPlaneDeparture,
  FaShieldAlt,
  FaAward,
  FaGlobe,
  FaClock,
  FaCheckCircle,
  FaFire,
  FaChartLine,
  FaGlobeAsia,
  FaHandshake,
  FaLayerGroup,
  FaSearch,
  FaStethoscope,
  FaCertificate,
  FaBalanceScale,
  FaHeart,
  FaBullseye,
  FaSyncAlt,
} from "react-icons/fa";

/* ============================================================
   DATA — 3 MAIN PROCESS PAGES
============================================================ */
const PROCESS_PAGES = [
  {
    id: "recruitment",
    path: "/process/recruitment",
    icon: FaUsers,
    title: "Recruitment Process",
    short: "Recruitment",
    tagline: "8-Step Journey",
    duration: "8–10 Weeks",
    desc: "Our Complete Recruitment Journey — From Manpower Requirement To Final Selection, Documentation, And Medical Clearance.",
    highlights: [
      "Manpower Requirement & Consultation",
      "Candidate Sourcing From Across Pakistan",
      "Screening, Interviews & Trade Tests",
      "Documentation, Medical & Selection",
    ],
    color: "cyan",
  },
  {
    id: "work-visa",
    path: "/process/work-visa",
    icon: FaPassport,
    title: "Work Visa Process",
    short: "Work Visa",
    tagline: "10-Step Journey",
    duration: "4–8 Weeks",
    desc: "The Complete Work Visa Journey — From Selection To Deployment, Covering Contracts, Visa Submission, Protector Processing, And Travel.",
    highlights: [
      "Selection & Final Confirmation",
      "Employment Contract & FSA Registration",
      "Work Visa Submission & Approval",
      "Protector Of Emigrants Processing",
    ],
    color: "yellow",
  },
  {
    id: "quality-policy",
    path: "/process/quality-policy",
    icon: FaAward,
    title: "Quality Policy",
    short: "Quality Policy",
    tagline: "6 Core Objectives",
    duration: "Continuous",
    desc: "Our Commitment To Excellence — Compliance, Transparency, And Ethical Practices At Every Stage Of The Recruitment And Deployment Cycle.",
    highlights: [
      "Accuracy, Precision & Compliance",
      "Professional Excellence & Training",
      "Candidate Welfare & Employer Satisfaction",
      "Continuous Process Improvement",
    ],
    color: "cyan",
  },
];

const OVERVIEW_STATS = [
  { icon: FaLayerGroup, value: "3", label: "Core Processes", color: "text-[#4FC3F7]" },
  { icon: FaClock, value: "8–10", label: "Weeks Average", color: "text-[#FFB300]" },
  { icon: FaShieldAlt, value: "100%", label: "Compliance", color: "text-[#22C55E]" },
  { icon: FaGlobe, value: "25+", label: "Countries", color: "text-[#8B5CF6]" },
];

const HERO_CHIPS = [
  { icon: FaShieldAlt, text: "100% Transparent", color: "text-[#22C55E]" },
  { icon: FaGlobeAsia, text: "25+ Countries", color: "text-[#4FC3F7]" },
  { icon: FaCheckCircle, text: "Fully Compliant", color: "text-[#FFB300]" },
];

const PROCESS_OVERVIEW = [
  {
    icon: FaSearch,
    title: "Sourcing",
    desc: "Candidate Identification Across Pakistan.",
    page: "recruitment",
    color: "text-[#4FC3F7]",
  },
  {
    icon: FaUserCheck,
    title: "Screening",
    desc: "Profiles Verified Against Employer Brief.",
    page: "recruitment",
    color: "text-[#22C55E]",
  },
  {
    icon: FaClipboardCheck,
    title: "Trade Testing",
    desc: "Practical Assessment For Skilled Trades.",
    page: "recruitment",
    color: "text-[#FFB300]",
  },
  {
    icon: FaFileSignature,
    title: "Documentation",
    desc: "Contracts, FSA & Regulatory Processing.",
    page: "work-visa",
    color: "text-[#8B5CF6]",
  },
  {
    icon: FaStethoscope,
    title: "Medical",
    desc: "Fitness Verification At Approved Centers.",
    page: "work-visa",
    color: "text-[#EF4444]",
  },
  {
    icon: FaPassport,
    title: "Visa & Protector",
    desc: "Work Visa, Emigration & Protector Formalities.",
    page: "work-visa",
    color: "text-[#06B6D4]",
  },
  {
    icon: FaPlaneDeparture,
    title: "Deployment",
    desc: "Batch-Wise Travel & Overseas Mobilization.",
    page: "work-visa",
    color: "text-[#EC4899]",
  },
  {
    icon: FaShieldAlt,
    title: "Post-Deployment",
    desc: "Ongoing Coordination & Workforce Support.",
    page: "quality-policy",
    color: "text-[#14B8A6]",
  },
];

const WHY_THREE_PROCESSES = [
  {
    icon: FaUsers,
    title: "Clear Separation",
    desc: "Recruitment, Visa, And Quality Are Distinct Processes — So You Always Know Where You Are In The Journey.",
    color: "text-[#4FC3F7]",
  },
  {
    icon: FaBalanceScale,
    title: "Full Compliance",
    desc: "Each Process Follows BEOE Regulations And Destination-Country Requirements Step By Step.",
    color: "text-[#22C55E]",
  },
  {
    icon: FaHandshake,
    title: "Total Transparency",
    desc: "Employers And Candidates Both See The Same Process — No Hidden Steps, No Surprises.",
    color: "text-[#FFB300]",
  },
  {
    icon: FaHeart,
    title: "Candidate Welfare",
    desc: "Every Process Is Designed To Protect Worker Rights And Ensure Fair Treatment.",
    color: "text-[#EC4899]",
  },
  {
    icon: FaBullseye,
    title: "Quality Assured",
    desc: "The Quality Policy Applies Across All Processes — Ensuring Consistent Excellence.",
    color: "text-[#A78BFA]",
  },
  {
    icon: FaSyncAlt,
    title: "Continuous Improvement",
    desc: "Each Process Is Reviewed And Improved Based On Feedback And Industry Changes.",
    color: "text-[#06B6D4]",
  },
];

/* ============================================================
   PAGE
============================================================ */
const Process = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

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
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-blob { animation: blob 9s ease-in-out infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
        .animate-marquee-left { animation: marquee-left 45s linear infinite; }
        .animate-marquee-left:hover { animation-play-state: paused; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#E1F5FE] to-white pt-20 lg:pt-24 pb-8">
        <div
          ref={heroRef}
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute top-20 -left-40 w-[400px] h-[400px] bg-[#4FC3F7]/20 blur-3xl animate-blob" />
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
          <div className="grid lg:grid-cols-12 gap-7 sm:gap-8 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4 bg-white/80 backdrop-blur-md border border-[#4FC3F7]/50 rounded-full px-3.5 py-2 shadow-[0_6px_18px_rgba(79,195,247,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#4FC3F7] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4FC3F7]" />
                </span>
                <span className="text-[#0F4C5C] text-[11px] sm:text-xs font-bold tracking-wide">
                  How We Work
                </span>
              </div>

              <h1 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F4C5C] leading-[1.12] mb-4">
                Our Complete{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                    Process Framework
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

              <p className="text-[#0A3A47]/85 text-sm sm:text-base leading-relaxed mb-5 max-w-xl lg:max-w-2xl mx-auto lg:mx-0 font-medium">
                Three Interconnected Processes That Take Overseas Recruitment
                From Initial Manpower Requirement To Successful Deployment —
                With Compliance, Transparency, And Care At Every Stage.
              </p>

              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-5">
                {HERO_CHIPS.map(({ icon: Icon, text, color }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#0F4C5C] bg-white border border-[#4FC3F7]/30 px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(79,195,247,0.08)] hover:border-[#4FC3F7]/70 hover:scale-105 transition-all duration-300"
                  >
                    <Icon className={`${color} text-[10px]`} />
                    {text}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href="#processes"
                  className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm overflow-hidden"
                  style={{ animation: "gradientShift 4s ease infinite" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Explore Processes</span>
                  <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#0F4C5C]/30 text-[#0F4C5C] px-6 py-3 rounded-full font-bold hover:bg-[#0F4C5C] hover:text-white hover:border-[#0F4C5C] hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm shadow-[0_8px_24px_rgba(15,76,92,0.1)]"
                >
                  Request Manpower
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/40 to-[#FFD54F]/20 blur-3xl rounded-full" />

                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-[#4FC3F7]/30 shadow-[0_24px_60px_rgba(15,76,92,0.25)] overflow-hidden">
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_8px_20px_rgba(79,195,247,0.4)]">
                      <FaChartLine className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="text-[#0F4C5C] font-extrabold text-sm">
                        Process At A Glance
                      </p>
                      <p className="text-[#29B6F6] text-[10px] font-bold tracking-wide uppercase">
                        Proven Results
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {OVERVIEW_STATS.map((s, idx) => {
                      const Icon = s.icon;
                      return (
                        <div
                          key={idx}
                          className="rounded-xl bg-gradient-to-br from-[#E1F5FE] to-white border border-[#4FC3F7]/20 p-3 hover:border-[#4FC3F7]/50 transition-all duration-300"
                        >
                          <div className={`${s.color} text-sm mb-1`}>
                            <Icon />
                          </div>
                          <p className="text-xl font-extrabold text-[#0F4C5C] leading-none mb-0.5">
                            {s.value}
                          </p>
                          <p className="text-[10px] font-bold text-[#0A3A47]/60 uppercase tracking-wide">
                            {s.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STEP PREVIEW — MARQUEE ROW ============ */}
      <section className="relative py-4 bg-white border-y border-[#4FC3F7]/15 overflow-hidden">
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex flex-nowrap items-center gap-3 animate-marquee-left w-max py-1">
            {[...PROCESS_OVERVIEW, ...PROCESS_OVERVIEW].map((item, idx) => {
              const Icon = item.icon;
              return (
                <span
                  key={`${item.title}-${idx}`}
                  className="group flex-shrink-0 flex items-center gap-2.5 bg-[#E1F5FE]/60 hover:bg-[#E1F5FE] border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 rounded-full pl-2 pr-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(79,195,247,0.15)]"
                >
                  <span className="w-6 h-6 rounded-full bg-white shadow-[0_4px_10px_rgba(79,195,247,0.15)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className={`${item.color} text-[10px]`} />
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-[#0F4C5C] whitespace-nowrap">
                    {item.title}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 3 MAIN PROCESS CARDS ============ */}
      <section
        id="processes"
        className="relative py-8 sm:py-10 bg-gradient-to-b from-white via-[#E1F5FE]/40 to-white overflow-hidden"
      >
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2.5 bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5">
              <FaFire className="text-[#F97316] text-[10px]" />
              <span className="text-[#0F4C5C] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                Our Core Processes
              </span>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-2.5 leading-tight">
              Three Processes,{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                One Complete Journey
              </span>
            </h2>
            <p className="text-[#0A3A47]/75 text-xs sm:text-sm max-w-2xl mx-auto">
              Click On Any Process Below To Explore Its Full Step-By-Step
              Details.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {PROCESS_PAGES.map((proc, idx) => {
              const Icon = proc.icon;
              const isCyan = proc.color === "cyan";
              return (
                <Link
                  key={proc.id}
                  to={proc.path}
                  className={`group relative animate-slideUp rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 ${
                    isCyan
                      ? "border-[#4FC3F7]/25 hover:border-[#4FC3F7]/70 bg-gradient-to-br from-white via-[#E1F5FE]/40 to-white hover:shadow-[0_28px_60px_rgba(79,195,247,0.22)]"
                      : "border-[#FFD54F]/30 hover:border-[#FFD54F]/70 bg-gradient-to-br from-white via-[#FFF8E1]/40 to-white hover:shadow-[0_28px_60px_rgba(255,213,79,0.22)]"
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-1 ${
                      isCyan
                        ? "bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7]"
                        : "bg-gradient-to-r from-[#FFD54F] via-[#4FC3F7] to-[#FFD54F]"
                    } bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]`}
                  />

                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between mb-5">
                      <div className="relative">
                        <span
                          className={`absolute inset-0 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500 ${
                            isCyan
                              ? "bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6]"
                              : "bg-gradient-to-br from-[#FFD54F] to-[#FFC107]"
                          }`}
                        />
                        <span
                          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_10px_24px_rgba(15,76,92,0.15)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${
                            isCyan
                              ? "bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6]"
                              : "bg-gradient-to-br from-[#FFD54F] to-[#FFC107]"
                          }`}
                        >
                          <Icon className="text-white text-xl" />
                        </span>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          isCyan
                            ? "bg-[#4FC3F7]/15 text-[#29B6F6] border border-[#4FC3F7]/30"
                            : "bg-[#FFD54F]/25 text-[#B7791F] border border-[#FFD54F]/50"
                        }`}
                      >
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {proc.tagline}
                      </span>
                    </div>

                    <h3 className="font-[Plus_Jakarta_Sans] text-xl sm:text-2xl font-extrabold text-[#0F4C5C] mb-2 leading-tight group-hover:text-[#29B6F6] transition-colors duration-300">
                      {proc.title}
                    </h3>

                    <div className="flex items-center gap-1.5 mb-3">
                      <FaClock className="text-[#FFB300] text-[10px]" />
                      <span className="text-[10px] font-bold text-[#0A3A47]/60 uppercase tracking-wide">
                        {proc.duration}
                      </span>
                    </div>

                    <p className="text-[#0A3A47]/80 text-xs sm:text-sm leading-relaxed mb-5">
                      {proc.desc}
                    </p>

                    <div className="space-y-2 mb-5">
                      {proc.highlights.map((h) => (
                        <div
                          key={h}
                          className="flex items-start gap-2 text-[11px] sm:text-xs text-[#0A3A47]/85"
                        >
                          <FaCheckCircle
                            className={`text-[9px] mt-1 flex-shrink-0 ${
                              isCyan ? "text-[#22C55E]" : "text-[#22C55E]"
                            }`}
                          />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div
                      className={`inline-flex items-center gap-2 text-xs font-extrabold px-4 py-2 rounded-full transition-all duration-300 ${
                        isCyan
                          ? "text-[#0F4C5C] bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] shadow-[0_8px_18px_rgba(79,195,247,0.35)] group-hover:shadow-[0_12px_28px_rgba(255,213,79,0.5)]"
                          : "text-[#0F4C5C] bg-gradient-to-r from-[#FFD54F] to-[#FFC107] shadow-[0_8px_18px_rgba(255,213,79,0.4)] group-hover:shadow-[0_12px_28px_rgba(79,195,247,0.5)]"
                      }`}
                    >
                      <span>Explore Process</span>
                      <FaArrowRight className="text-[9px] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WHY THESE 3 PROCESSES ============ */}
      <section className="relative py-8 sm:py-10 bg-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2.5 bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5">
              <FaShieldAlt className="text-[#22C55E] text-[10px]" />
              <span className="text-[#0F4C5C] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                Why Three Processes
              </span>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-2.5 leading-tight">
              Built On{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Clarity & Structure
              </span>
            </h2>
            <p className="text-[#0A3A47]/75 text-xs sm:text-sm max-w-2xl mx-auto">
              Each Process Has A Clear Purpose — Together They Form A Complete,
              Compliant, And Transparent Overseas Recruitment System.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_THREE_PROCESSES.map(({ icon: Icon, title, desc, color }, idx) => (
              <div
                key={title}
                className="group relative bg-gradient-to-b from-[#E1F5FE] to-white rounded-2xl p-4.5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/60 hover:shadow-[0_20px_45px_rgba(79,195,247,0.15)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden animate-slideUp"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                <div className="w-10 h-10 rounded-xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center mb-3 group-hover:bg-[#4FC3F7]/10 transition-colors">
                  <Icon className={`${color} text-base`} />
                </div>
                <h3 className="font-[Plus_Jakarta_Sans] text-sm sm:text-base font-extrabold text-[#0F4C5C] mb-1.5">
                  {title}
                </h3>
                <p className="text-[#0A3A47]/80 text-[11px] sm:text-xs leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-8 sm:py-10 bg-gradient-to-b from-[#E1F5FE] to-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-7 sm:py-9 text-center overflow-hidden border border-[#4FC3F7]/25 shadow-[0_24px_60px_rgba(15,76,92,0.25)]">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4FC3F7]/25 blur-3xl animate-blob" />
            <div
              className="absolute -bottom-24 -left-20 w-80 h-80 bg-[#FFD54F]/15 blur-3xl animate-blob"
              style={{ animationDelay: "2.5s" }}
            />

            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#4FC3F7] to-transparent bg-[length:200%_100%] animate-[shimmer_4s_linear_infinite]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-12 h-12 mx-auto mb-3.5 rounded-2xl bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 flex items-center justify-center">
                <FaHandshake className="text-[#FFB300] text-lg" />
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
                Ready To Start Your{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                  Recruitment Journey?
                </span>
              </h2>

              <p className="text-white/80 text-xs sm:text-sm mb-5 leading-relaxed">
                Explore Each Process In Detail — Or Contact Our Team To Discuss
                Your Specific Manpower Requirements And Get A Customized Plan.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 sm:px-8 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm overflow-hidden"
                  style={{ animation: "gradientShift 4s ease infinite" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Contact Us</span>
                  <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 border border-[#4FC3F7]/40 text-[#4FC3F7] px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-[#4FC3F7]/10 hover:border-[#4FC3F7]/70 hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Process;