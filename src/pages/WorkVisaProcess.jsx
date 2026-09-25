// src/pages/WorkVisaProcess.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaDownload,
  FaPassport,
  FaFileSignature,
  FaShieldAlt,
  FaStethoscope,
  FaPlaneDeparture,
  FaCheckCircle,
  FaFire,
  FaChartLine,
  FaHandshake,
  FaClock,
  FaGlobeAsia,
  FaUserCheck,
  FaClipboardCheck,
  FaStamp,
  FaFileAlt,
  FaUniversity,
  FaHeartbeat,
  FaPlus,
  FaMinus,
  FaChevronDown,
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

/* ============================================================
   DATA — 10-STEP WORK VISA PROCESS
============================================================ */
const VISA_STEPS = [
  {
    id: 1,
    num: "01",
    icon: FaClipboardCheck,
    title: "Selection & Final Confirmation",
    short: "Selection",
    desc: "The Overseas Employer Makes The Final Selection Of Candidates Through In-Person Or Video Interviews. Once Selected, Candidates Receive The Job Offer And Employment Terms For Confirmation.",
    bullets: [
      "In-Person Or Video Interviews",
      "Job Offer & Employment Terms",
      "Candidate Confirmation & Acceptance",
      "Final Selection List Prepared",
    ],
    color: "text-[#4FC3F7]",
  },
  {
    id: 2,
    num: "02",
    icon: FaFileAlt,
    title: "Documentation & Verification",
    short: "Documentation",
    desc: "Complete Documentation Of The Selected Candidate Is Collected And Verified — Passport, CNIC, Educational Certificates, Experience Letters, Technical Certificates, And Police Clearance Where Required.",
    bullets: [
      "Passport & CNIC Verification",
      "Educational Certificates & Transcripts",
      "Experience & Technical Certificates",
      "Police Clearance Where Required",
    ],
    color: "text-[#22C55E]",
  },
  {
    id: 3,
    num: "03",
    icon: FaStethoscope,
    title: "Medical Examination",
    short: "Medical",
    desc: "Selected Candidates Undergo Medical Examination At Approved Medical Centers According To The Destination Country's Requirements To Confirm Medical Fitness Before Further Processing.",
    bullets: [
      "GAMCA / Approved Medical Centers",
      "Destination-Country Medical Standards",
      "Fit-For-Work Certification",
      "Medical Fitness Documentation",
    ],
    color: "text-[#EF4444]",
  },
  {
    id: 4,
    num: "04",
    icon: FaFileSignature,
    title: "Employment Contract & FSA",
    short: "Contract & FSA",
    desc: "The Employment / Service Agreement And Foreign Service Agreement (FSA) Are Prepared, Signed, And Registered As Per The Applicable Pakistani Regulations And Destination-Country Requirements.",
    bullets: [
      "Employment / Service Agreement",
      "Foreign Service Agreement (FSA)",
      "Terms & Conditions Registration",
      "Employer & Candidate Signatures",
    ],
    color: "text-[#FFB300]",
  },
  {
    id: 5,
    num: "05",
    icon: FaPassport,
    title: "Work Visa Documentation",
    short: "Visa Docs",
    desc: "Complete Work Visa Documentation Is Coordinated With The Employer Including Visa Application, Employment Contract, Insurance Requirements, And Destination-Specific Documents Required By Immigration Authorities.",
    bullets: [
      "Visa Application Preparation",
      "Employment Contract Submission",
      "Insurance Requirements",
      "Destination-Specific Documents",
    ],
    color: "text-[#8B5CF6]",
  },
  {
    id: 6,
    num: "06",
    icon: FaStamp,
    title: "Visa Submission & Approval",
    short: "Visa Approval",
    desc: "The Visa Application Is Submitted Through The Relevant Authorities In Coordination With The Employer. Approval Is Subject To The Destination Country's Immigration Requirements And Fulfillment Of Applicable Criteria.",
    bullets: [
      "Embassy / Immigration Submission",
      "Coordination With Employer",
      "Approval Tracking & Follow-Up",
      "Visa Stamping & Verification",
    ],
    color: "text-[#06B6D4]",
  },
  {
    id: 7,
    num: "07",
    icon: FaUniversity,
    title: "Protector Of Emigrants Processing",
    short: "Protector",
    desc: "The Case Is Processed Through The Protector Of Emigrants (BEOE) For Overseas Employment Registration, FSA Registration, And Other Statutory Emigration Formalities Required In Pakistan.",
    bullets: [
      "Protector Of Emigrants Registration",
      "BEOE Overseas Employment Processing",
      "FSA Registration & Verification",
      "Statutory Emigration Formalities",
    ],
    color: "text-[#F97316]",
  },
  {
    id: 8,
    num: "08",
    icon: FaShieldAlt,
    title: "Insurance & Government Registrations",
    short: "Insurance",
    desc: "Required Insurance Coverage And Government Registrations Are Completed As Per Applicable Regulations To Ensure Complete Protection And Compliance For The Deployed Worker.",
    bullets: [
      "Worker Insurance Coverage",
      "Government Registrations",
      "Compliance Documentation",
      "Worker Protection & Welfare",
    ],
    color: "text-[#22C55E]",
  },
  {
    id: 9,
    num: "09",
    icon: FaHeartbeat,
    title: "Pre-Departure Orientation",
    short: "Orientation",
    desc: "Workers Receive Briefing On Employment Terms, Job Responsibilities, Employer Policies, Workplace Discipline, Health And Safety Requirements, Destination-Country Laws, And Cultural Awareness.",
    bullets: [
      "Employment Terms & Responsibilities",
      "Employer Policies & Discipline",
      "Health, Safety & Local Laws",
      "Cultural Awareness & Travel Info",
    ],
    color: "text-[#EC4899]",
  },
  {
    id: 10,
    num: "10",
    icon: FaPlaneDeparture,
    title: "Travel & Mobilization",
    short: "Deployment",
    desc: "Once All Formalities Are Completed, Flight Scheduling, Ticket Coordination, Worker Grouping, Departure Schedules, Airport Coordination, And Travel Documentation Checks Are Arranged For Successful Deployment.",
    bullets: [
      "Flight Scheduling & Ticketing",
      "Worker Grouping & Departures",
      "Airport Coordination",
      "Employer Handover At Destination",
    ],
    color: "text-[#A78BFA]",
  },
];

const STATS = [
  { icon: FaClock, value: "4–8", label: "Weeks Average", color: "text-[#FFB300]" },
  { icon: FaShieldAlt, value: "100%", label: "Compliant", color: "text-[#22C55E]" },
  { icon: FaGlobeAsia, value: "25+", label: "Countries", color: "text-[#4FC3F7]" },
  { icon: FaCheckCircle, value: "100%", label: "Transparent", color: "text-[#8B5CF6]" },
];

const HERO_CHIPS = [
  { icon: FaShieldAlt, text: "100% Compliant", color: "text-[#22C55E]" },
  { icon: FaGlobeAsia, text: "25+ Countries", color: "text-[#4FC3F7]" },
  { icon: FaCheckCircle, text: "BEOE Registered", color: "text-[#FFB300]" },
];

const DOCUMENTS = [
  "Valid Passport (Minimum 6 Months Validity)",
  "CNIC / Identity Documents",
  "Educational Certificates & Transcripts",
  "Experience Letters From Previous Employers",
  "Technical / Professional Certificates",
  "Police Clearance Certificate (Where Required)",
  "Medical Fitness Certificate",
  "Passport-Size Photographs (As Per Spec)",
  "Employment Contract & FSA",
  "Destination-Specific Documents",
];

const WHY_PROCESS_WORKS = [
  { icon: FaShieldAlt, title: "Full Compliance", desc: "BEOE Registered And Fully Compliant With Pakistani Emigration Regulations.", color: "text-[#22C55E]" },
  { icon: FaUserCheck, title: "Verified Employers", desc: "Only Working With Licensed Overseas Employers With Valid Job Orders.", color: "text-[#4FC3F7]" },
  { icon: FaClock, title: "Time-Bound", desc: "Structured 4–8 Week Visa Processing With Regular Status Updates.", color: "text-[#FFB300]" },
  { icon: FaGlobeAsia, title: "Global Reach", desc: "Work Visa Processing For 25+ Countries Across The World.", color: "text-[#8B5CF6]" },
];

/* ============================================================
   PAGE
============================================================ */
const WorkVisaProcess = () => {
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
    doc.text("Work Visa Process", pageWidth / 2, y, { align: "center" });
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
    doc.text("License # OP&HRD/5224/LHR/2026", pageWidth / 2, y, {
      align: "center",
    });
    y += 7;
    doc.setDrawColor("#4FC3F7");
    doc.line(margin, y, pageWidth - margin, y);
    y += 9;

    VISA_STEPS.forEach((step, index) => {
      if (y > 250) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(13);
      doc.setTextColor("#29B6F6");
      doc.setFont("helvetica", "bold");
      doc.text(`${step.num} — ${step.title}`, margin, y);
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

      if (index < VISA_STEPS.length - 1) {
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

    doc.save("AHIOEP_Work_Visa_Process.pdf");
  };

  /* ---------- MARQUEE DATA ---------- */
  const marqueeSteps = [...VISA_STEPS, ...VISA_STEPS];

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
        .animate-marquee-left { animation: marquee-left 45s linear infinite; }
        {/* .animate-marquee-left:hover { animation-play-state: paused; } */}
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
                  License # OP&HRD/5224/LHR/2026
                </span>
              </div>

              <h1 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F4C5C] leading-[1.12] mb-4">
                Complete{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                    Work Visa
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
                </span>{" "}
                Process
              </h1>

              <p className="text-[#0A3A47]/85 text-sm sm:text-base leading-relaxed mb-5 max-w-xl lg:max-w-2xl mx-auto lg:mx-0 font-medium">
                From Selection To Deployment — A Complete, Compliant, And
                Transparent Work Visa Processing Journey As Per Pakistani
                Regulations And Destination-Country Requirements.
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
                  href="#steps"
                  className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm overflow-hidden"
                  style={{ animation: "gradientShift 4s ease infinite" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">View Process</span>
                  <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
                </a>
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
                        Visa Processing
                      </p>
                      <p className="text-[#29B6F6] text-[10px] font-bold tracking-wide uppercase">
                        At A Glance
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
                  key={`${step.id}-${idx}`}
                  href={`#visa-step-${step.id}`}
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
                Step-By-Step Visa Journey
              </span>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-2.5 leading-tight">
              From Selection To{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Deployment
              </span>
            </h2>
            <p className="text-[#0A3A47]/75 text-xs sm:text-sm max-w-2xl mx-auto">
              Click Any Step To See The Full Details — From Initial Selection
              To Final Overseas Deployment.
            </p>
          </div>

          <div className="space-y-3">
            {VISA_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isOpen = openStep === step.id;
              return (
                <div
                  key={step.id}
                  id={`visa-step-${step.id}`}
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
                    onClick={() => toggleStep(step.id)}
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

                    <h3
                      className={`flex-1 font-[Plus_Jakarta_Sans] text-sm sm:text-base md:text-lg font-extrabold leading-tight transition-colors duration-300 ${
                        isOpen ? "text-[#29B6F6]" : "text-[#0F4C5C] group-hover:text-[#29B6F6]"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* +/- toggle */}
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isOpen
                          ? "bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] text-white"
                          : "bg-[#E1F5FE] text-[#29B6F6] group-hover:bg-[#4FC3F7]/20"
                      }`}
                    >
                      {isOpen ? (
                        <FaMinus className="text-[10px]" />
                      ) : (
                        <FaPlus className="text-[10px]" />
                      )}
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

      {/* ============ DOCUMENTS CHECKLIST ============ */}
      <section className="relative py-8 sm:py-10 bg-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 mb-2.5 bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5">
              <FaClipboardCheck className="text-[#FFB300] text-[10px]" />
              <span className="text-[#0F4C5C] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                Required Documents
              </span>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-2.5 leading-tight">
              Documents{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Checklist
              </span>
            </h2>
            <p className="text-[#0A3A47]/75 text-xs sm:text-sm max-w-2xl mx-auto">
              Ensure These Documents Are Ready For Smooth Visa Processing.
            </p>
          </div>

          <div className="relative bg-white rounded-2xl border border-[#4FC3F7]/25 p-5 sm:p-7 shadow-[0_14px_40px_rgba(15,76,92,0.08)] overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

            <div className="grid sm:grid-cols-2 gap-2.5">
              {DOCUMENTS.map((doc, idx) => (
                <div
                  key={doc}
                  className="group flex items-start gap-3 p-3 rounded-xl bg-[#E1F5FE]/40 hover:bg-[#E1F5FE] border border-[#4FC3F7]/15 hover:border-[#4FC3F7]/50 transition-all duration-300 animate-slideUp"
                  style={{ animationDelay: `${idx * 0.04}s` }}
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-[0_4px_10px_rgba(34,197,94,0.3)] group-hover:scale-110 transition-transform">
                    <FaCheckCircle className="text-white text-xs" />
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#0A3A47]/90 leading-snug">
                    {doc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="relative py-8 sm:py-10 bg-gradient-to-b from-white to-[#E1F5FE] overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 mb-2.5 bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5">
              <FaHandshake className="text-[#FFB300] text-[10px]" />
              <span className="text-[#0F4C5C] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                Why Process With Us
              </span>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-2.5 leading-tight">
              A Visa Process You Can{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Trust
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_PROCESS_WORKS.map(({ icon: Icon, title, desc, color }, idx) => (
              <div
                key={title}
                className="group relative bg-white rounded-2xl p-4.5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/60 hover:shadow-[0_20px_45px_rgba(79,195,247,0.15)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden animate-slideUp"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                <div className="w-11 h-11 rounded-xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center text-lg mb-3 group-hover:bg-[#4FC3F7]/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className={`${color}`} />
                </div>
                <h3 className="font-[Plus_Jakarta_Sans] text-sm sm:text-base font-extrabold text-[#0F4C5C] mb-1.5 leading-tight">
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

      {/* ============ DOWNLOAD CTA ============ */}
      <section className="relative py-7 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white border border-[#4FC3F7]/25 rounded-2xl sm:rounded-3xl px-5 sm:px-7 py-5 shadow-[0_20px_50px_rgba(15,76,92,0.10)] overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <span className="hidden sm:flex w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex-shrink-0 items-center justify-center shadow-[0_10px_24px_rgba(79,195,247,0.4)]">
                  <FaDownload className="text-white text-base" />
                </span>
                <div>
                  <h3 className="font-[Plus_Jakarta_Sans] text-sm sm:text-base font-extrabold text-[#0F4C5C]">
                    Want This Process On Paper?
                  </h3>
                  <p className="text-[#0A3A47]/75 text-[11px] sm:text-xs mt-0.5">
                    Download The Complete Work Visa Process As A PDF.
                  </p>
                </div>
              </div>
              <button
                onClick={downloadPDF}
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-5 py-2.5 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm overflow-hidden whitespace-nowrap"
                style={{ animation: "gradientShift 4s ease infinite" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <FaDownload className="relative text-xs" />
                <span className="relative">Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-8 sm:py-10 bg-[#E1F5FE] overflow-hidden">
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
                <FaPassport className="text-[#FFB300] text-lg" />
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
                Ready To Start Your{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                  Work Visa?
                </span>
              </h2>

              <p className="text-white/80 text-xs sm:text-sm mb-5 leading-relaxed">
                Submit Your CV Today And Our Team Will Guide You Through Every
                Step Of The Work Visa Process.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/submit-cv"
                  className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 sm:px-8 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm overflow-hidden"
                  style={{ animation: "gradientShift 4s ease infinite" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Submit Your CV</span>
                  <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-[#4FC3F7]/40 text-[#4FC3F7] px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-[#4FC3F7]/10 hover:border-[#4FC3F7]/70 hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkVisaProcess;