// src/pages/RecruitmentProcess.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { COMPANY_INFO } from "../utilis/constants";
import {
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaClipboardCheck,
  FaUserCheck,
  FaFileSignature,
  FaStethoscope,
  FaPassport,
  FaPlaneDeparture,
  FaHandshake,
  FaFileAlt,
  FaBriefcase,
  FaGlobe,
  FaShieldAlt,
  FaClock,
  FaComments,
  FaSearch,
  FaAward,
  FaChevronDown,
  FaChartLine,
  FaLayerGroup,
  FaGlobeAsia,
  FaFire,
  FaDownload,
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

/* ============================================================
   PROCESS STEPS DATA
============================================================ */
const PROCESS_STEPS = [
  {
    step: "01",
    num: "01",
    icon: FaComments,
    title: "Manpower Requirement",
    short: "Requirement",
    duration: "Day 1",
    desc: "The Overseas Employer Contacts Us With A Detailed Manpower Demand Including Job Positions, Number Of Workers, Qualifications, Experience, Salary, And Employment Conditions.",
    bullets: [
      "Job Positions & Number Of Workers",
      "Qualification & Experience Criteria",
      "Salary & Benefits Structure",
      "Contract Duration & Working Hours",
    ],
    color: "text-[#4FC3F7]",
  },
  {
    step: "02",
    num: "02",
    icon: FaSearch,
    title: "Candidate Sourcing",
    short: "Sourcing",
    duration: "Week 1–2",
    desc: "We Source Suitable Pakistani Candidates Through Our Recruitment Network, Candidate Database, Job Advertisements, And Recruitment Campaigns Within Pakistan.",
    bullets: [
      "Internal Candidate Database Search",
      "Targeted Job Advertisements",
      "Regional Recruitment Campaigns",
      "Referral Networks Across Pakistan",
    ],
    color: "text-[#22C55E]",
  },
  {
    step: "03",
    num: "03",
    icon: FaClipboardCheck,
    title: "Screening",
    short: "Screening",
    duration: "Week 2–3",
    desc: "Candidates Are Screened According To The Employer's Specific Requirements Including Qualifications, Experience, Technical Skills, And Certifications.",
    bullets: [
      "CV & Document Verification",
      "Experience & Skill Assessment",
      "Qualification Validation",
      "Pre-Interview Shortlisting",
    ],
    color: "text-[#FFB300]",
  },
  {
    step: "04",
    num: "04",
    icon: FaUserCheck,
    title: "Interview & Trade Test",
    short: "Interview",
    duration: "Week 3–4",
    desc: "Shortlisted Candidates Appear For Employer Interviews (Online Or In-Person) And Technical / Practical Trade Tests Where Required By The Job.",
    bullets: [
      "Online Or In-Person Interviews",
      "Technical & Practical Trade Tests",
      "Skill-Based Assessments",
      "Final Candidate Selection",
    ],
    color: "text-[#A78BFA]",
  },
  {
    step: "05",
    num: "05",
    icon: FaFileSignature,
    title: "Documentation",
    short: "Documentation",
    duration: "Week 4–5",
    desc: "Selected Candidates Complete Required Documentation Including Passport, Educational Certificates, Experience Letters, And Other Applicable Documents.",
    bullets: [
      "Passport & CNIC Copies",
      "Educational Certificates",
      "Experience Letters",
      "Police Clearance Certificate",
    ],
    color: "text-[#8B5CF6]",
  },
  {
    step: "06",
    num: "06",
    icon: FaStethoscope,
    title: "Medical Examination",
    short: "Medical",
    duration: "Week 5",
    desc: "Candidates Undergo Medical Examinations At Approved Medical Centers As Required By The Destination Country, Employer, Or Applicable Regulations.",
    bullets: [
      "GAMCA / Approved Medical Center",
      "Fit-For-Work Certification",
      "Health Clearance Documentation",
      "Compliance With Destination Rules",
    ],
    color: "text-[#EF4444]",
  },
  {
    step: "07",
    num: "07",
    icon: FaPassport,
    title: "Visa Processing",
    short: "Visa",
    duration: "Week 5–8",
    desc: "Visa Applications Are Processed Through The Relevant Government And Immigration Authorities In Coordination With The Employer And Applicable Procedures.",
    bullets: [
      "Employer Visa Documentation",
      "Embassy / Immigration Submission",
      "Visa Stamping & Verification",
      "Government Compliance Checks",
    ],
    color: "text-[#06B6D4]",
  },
  {
    step: "08",
    num: "08",
    icon: FaPlaneDeparture,
    title: "Pre-Departure & Deployment",
    short: "Deployment",
    duration: "Week 8–10",
    desc: "Selected Candidates Receive Pre-Departure Orientation And Are Deployed To The Destination Country, With Support Throughout The Mobilization Process.",
    bullets: [
      "Pre-Departure Orientation",
      "Travel Arrangements",
      "Airport Coordination",
      "Employer Handover At Destination",
    ],
    color: "text-[#EC4899]",
  },
];

const STATS = [
  { icon: FaClock, value: "8–10", label: "Weeks Average", color: "text-[#FFB300]" },
  { icon: FaFileAlt, value: "8", label: "Clear Steps", color: "text-[#4FC3F7]" },
  { icon: FaShieldAlt, value: "100%", label: "Compliance", color: "text-[#22C55E]" },
  { icon: FaGlobe, value: "25+", label: "Countries", color: "text-[#8B5CF6]" },
];

const HERO_CHIPS = [
  { icon: FaClock, text: "8–10 Weeks", color: "text-[#FFB300]" },
  { icon: FaShieldAlt, text: "100% Compliant", color: "text-[#22C55E]" },
  { icon: FaGlobe, text: "25+ Countries", color: "text-[#4FC3F7]" },
];

const WHY_PROCESS_WORKS = [
  { icon: FaShieldAlt, title: "Full Legal Compliance", desc: "Every Step Follows Pakistan's Bureau Of Emigration & Overseas Employment (BEOE) Regulations.", color: "text-[#22C55E]" },
  { icon: FaHandshake, title: "Verified Employers Only", desc: "We Only Work With Licensed And Verified Overseas Employers With Valid Job Orders.", color: "text-[#FFB300]" },
  { icon: FaUsers, title: "Candidate-First Approach", desc: "We Guide Candidates Through Every Stage With Transparency, Honesty, And Support.", color: "text-[#4FC3F7]" },
  { icon: FaClock, title: "Time-Bound Execution", desc: "A Structured 8–10 Week Process That Keeps Both Employers And Candidates Informed.", color: "text-[#F97316]" },
  { icon: FaBriefcase, title: "Trade-Tested Talent", desc: "Technical And Practical Skill Assessments Ensure The Right Candidate For The Right Job.", color: "text-[#8B5CF6]" },
  { icon: FaGlobe, title: "Global Deployment", desc: "Successfully Deployed Pakistani Talent To 18+ Countries Across The Middle East, Asia, And Europe.", color: "text-[#06B6D4]" },
];

/* ============================================================
   PAGE
============================================================ */
const RecruitmentProcess = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [openStep, setOpenStep] = useState(null);
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

  const toggleStep = (id) => {
    setOpenStep((prev) => (prev === id ? null : id));
  };

  /* ---------- PDF DOWNLOAD ---------- */
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 16;
    let y = margin;

    doc.setFontSize(18);
    doc.setTextColor("#0F4C5C");
    doc.text("Our Recruitment Process", pageWidth / 2, y, { align: "center" });
    y += 7;
    doc.setFontSize(10);
    doc.setTextColor("#666");
    doc.text(
      "Ali Hajveri International (Pvt.) Ltd. — Overseas Employment Promoter",
      pageWidth / 2,
      y,
      { align: "center" }
    );
    y += 5;
    doc.setFontSize(9);
    doc.setTextColor("#29B6F6");
    doc.text(`License # ${COMPANY_INFO?.license || "OP&HRD/5224/LHR/2026"}`, pageWidth / 2, y, {
      align: "center",
    });
    y += 7;
    doc.setDrawColor("#4FC3F7");
    doc.line(margin, y, pageWidth - margin, y);
    y += 9;

    PROCESS_STEPS.forEach((step, index) => {
      if (y > 250) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(13);
      doc.setTextColor("#29B6F6");
      doc.setFont("helvetica", "bold");
      doc.text(`${step.num} — ${step.title} (${step.duration})`, margin, y);
      y += 6;

      doc.setFontSize(10);
      doc.setTextColor("#333");
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(step.desc, pageWidth - 2 * margin);
      doc.text(lines, margin, y);
      y += lines.length * 4.5 + 3;

      doc.setFontSize(9);
      doc.setTextColor("#555");
      step.bullets.forEach((b) => {
        if (y > 270) {
          doc.addPage();
          y = margin;
        }
        doc.text(`• ${b}`, margin + 3, y);
        y += 4.5;
      });
      y += 4;

      if (index < PROCESS_STEPS.length - 1) {
        doc.setDrawColor("#e5e7eb");
        doc.line(margin, y, pageWidth - margin, y);
        y += 5;
      }
    });

    doc.setFontSize(9);
    doc.setTextColor("#999");
    const footerText = `Generated on ${new Date().toLocaleDateString()} – © ${new Date().getFullYear()} AHIOEP`;
    doc.text(
      footerText,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 8,
      { align: "center" }
    );

    doc.save("AHIOEP_Recruitment_Process.pdf");
  };

  /* ---------- MARQUEE DATA ---------- */
  const marqueeSteps = [...PROCESS_STEPS, ...PROCESS_STEPS];

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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-blob { animation: blob 9s ease-in-out infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-marquee-left { animation: marquee-left 40s linear infinite; }
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
                Our Recruitment{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                    Process
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
                A Structured, Transparent, And Fully Compliant Path From
                Manpower Requirement To Overseas Deployment — Covering Every
                Stage With Precision, Integrity, And Care.
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
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm overflow-hidden"
                  style={{ animation: "gradientShift 4s ease infinite" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Request Manpower</span>
                  <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={downloadPDF}
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#0F4C5C]/30 text-[#0F4C5C] px-6 py-3 rounded-full font-bold hover:bg-[#0F4C5C] hover:text-white hover:border-[#0F4C5C] hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm shadow-[0_8px_24px_rgba(15,76,92,0.1)]"
                >
                  <FaDownload className="text-xs" />
                  Download PDF
                </button>
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
                    {STATS.map((s, idx) => {
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
            {marqueeSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <a
                  key={`${step.step}-${idx}`}
                  href={`#step-${step.step}`}
                  className="group flex-shrink-0 flex items-center gap-2.5 bg-[#E1F5FE]/60 hover:bg-[#E1F5FE] border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 rounded-full pl-2 pr-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(79,195,247,0.15)]"
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(79,195,247,0.3)] group-hover:scale-110 transition-transform">
                    {step.num}
                  </span>
                  <Icon className={`${step.color} text-[10px] flex-shrink-0`} />
                  <span className="text-[11px] sm:text-xs font-bold text-[#0F4C5C] whitespace-nowrap">
                    {step.short}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ DETAILED STEPS — ACCORDION ============ */}
      <section
        id="steps"
        className="relative py-8 sm:py-10 bg-gradient-to-b from-white via-[#E1F5FE]/40 to-white overflow-hidden"
      >
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 mb-2.5 bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5">
              <FaFire className="text-[#F97316] text-[10px]" />
              <span className="text-[#0F4C5C] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                8-Step Roadmap
              </span>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-2.5 leading-tight">
              Every Step,{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Clearly Mapped
              </span>
            </h2>
            <p className="text-[#0A3A47]/75 text-xs sm:text-sm max-w-2xl mx-auto">
              Click Any Step To See The Full Details — From Initial Manpower
              Requirement To Final Overseas Deployment.
            </p>
          </div>

          <div className="space-y-3">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isOpen = openStep === step.step;
              return (
                <div
                  key={step.step}
                  id={`step-${step.step}`}
                  className={`group relative scroll-mt-24 animate-slideUp rounded-2xl overflow-hidden border transition-all duration-500 ${
                    isOpen
                      ? "border-[#4FC3F7]/60 bg-white shadow-[0_18px_45px_rgba(79,195,247,0.18)]"
                      : "border-[#4FC3F7]/20 bg-white/90 hover:border-[#4FC3F7]/50 hover:shadow-[0_10px_30px_rgba(79,195,247,0.10)]"
                  }`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] origin-left transition-transform duration-500 ${
                      isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => toggleStep(step.step)}
                    className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-4.5 text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-extrabold text-[11px] sm:text-xs text-white shadow-[0_6px_16px_rgba(79,195,247,0.35)] transition-all duration-500 bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] ${
                        isOpen ? "scale-110" : ""
                      }`}
                    >
                      {step.num}
                    </span>

                    <span
                      className={`hidden sm:flex flex-shrink-0 w-10 h-10 rounded-xl items-center justify-center transition-all duration-500 ${
                        isOpen
                          ? "bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] text-white rotate-6"
                          : "bg-gradient-to-br from-[#4FC3F7]/15 to-[#29B6F6]/15 group-hover:from-[#4FC3F7] group-hover:to-[#29B6F6] group-hover:text-white group-hover:rotate-6"
                      }`}
                    >
                      <Icon className={`text-sm ${!isOpen ? step.color : "text-white"}`} />
                    </span>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-[Plus_Jakarta_Sans] text-sm sm:text-base md:text-lg font-extrabold leading-tight transition-colors duration-300 ${
                          isOpen ? "text-[#29B6F6]" : "text-[#0F4C5C] group-hover:text-[#29B6F6]"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#0A3A47]/55 mt-0.5">
                        <FaClock className="text-[9px] text-[#FFB300]" />
                        {step.duration}
                      </span>
                    </div>

                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isOpen
                          ? "bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] text-white rotate-180"
                          : "bg-[#E1F5FE] text-[#29B6F6] group-hover:bg-[#4FC3F7]/20"
                      }`}
                    >
                      <FaChevronDown className="text-[10px]" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`px-4 sm:px-5 pb-4 sm:pb-5 pl-[64px] sm:pl-[84px] transition-all duration-500 ${
                          isOpen ? "animate-fadeIn" : ""
                        }`}
                      >
                        <p className="text-[#0A3A47]/85 text-[11px] sm:text-xs leading-relaxed mb-3">
                          {step.desc}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                          {step.bullets.map((b) => (
                            <div
                              key={b}
                              className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-[#0A3A47]/80"
                            >
                              <FaCheckCircle className="text-[#22C55E] text-[8px] mt-1 flex-shrink-0" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WHY OUR PROCESS WORKS ============ */}
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
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 mb-2.5 bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5">
              <FaShieldAlt className="text-[#22C55E] text-[10px]" />
              <span className="text-[#0F4C5C] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                Why Our Process Works
              </span>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-2.5 leading-tight">
              Built On Compliance &{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Trust
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_PROCESS_WORKS.map(({ icon: Icon, title, desc, color }, idx) => (
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
                <FaUsers className="text-[#FFB300] text-lg" />
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
                Ready To Start The{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                  Process?
                </span>
              </h2>

              <p className="text-white/80 text-xs sm:text-sm mb-5 leading-relaxed">
                Whether You're An Employer Looking For Skilled Pakistani
                Manpower Or A Candidate Seeking Overseas Opportunities — We're
                Here To Help.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 sm:px-8 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm overflow-hidden"
                  style={{ animation: "gradientShift 4s ease infinite" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Request Manpower</span>
                  <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/submit-cv"
                  className="inline-flex items-center justify-center gap-2 border border-[#4FC3F7]/40 text-[#4FC3F7] px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-[#4FC3F7]/10 hover:border-[#4FC3F7]/70 hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
                >
                  Submit Your CV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecruitmentProcess;