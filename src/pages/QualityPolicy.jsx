// src/pages/QualityPolicy.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaArrowRight,
  FaDownload,
  FaAward,
  FaCheckCircle,
  FaShieldAlt,
  FaUsers,
  FaHandshake,
  FaFire,
  FaChartLine,
  FaGlobeAsia,
  FaClipboardCheck,
  FaCertificate,
  FaBullseye,
  FaBalanceScale,
  FaHeart,
  FaSyncAlt,
  FaUserTie,
  FaRegStar,
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

/* Shared action classes */
const SECONDARY_ACTION =
  "inline-flex items-center justify-center gap-2 bg-white border-2 border-[#0F4C5C]/30 " +
  "text-[#0F4C5C] px-6 py-3.5 rounded-full font-bold " +
  "hover:bg-[#0F4C5C] hover:text-white hover:border-[#0F4C5C] " +
  "hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base " +
  "shadow-[0_8px_24px_rgba(15,76,92,0.1)]";

const PRIMARY_ACTION =
  "group relative inline-flex items-center justify-center gap-2 " +
  "bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] " +
  "text-[#0F4C5C] px-6 sm:px-8 py-3.5 rounded-full font-bold " +
  "shadow-[0_12px_30px_rgba(79,195,247,0.4)] " +
  "hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 " +
  "transition-all duration-300 text-sm sm:text-base overflow-hidden";

const QualityPolicy = () => {
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

  const qualityObjectives = [
    {
      id: 1,
      icon: <FaBullseye />,
      title: "Accuracy & Precision",
      desc: "Ensuring All Documentation, Contracts, And Visa Processes Meet The Highest Standards Of Accuracy And Comply Fully With Pakistani Emigration Regulations And Destination-Country Requirements.",
      color: "text-[#4FC3F7]",
    },
    {
      id: 2,
      icon: <FaUserTie />,
      title: "Professional Excellence",
      desc: "Maintaining Professional Excellence Through Continuous Staff Training, Updated Knowledge Of International Employment Laws, And Adoption Of Best Recruitment Practices.",
      color: "text-[#8B5CF6]",
    },
    {
      id: 3,
      icon: <FaHeart />,
      title: "Candidate Welfare",
      desc: "Prioritizing The Welfare, Safety, And Rights Of Pakistani Workers — Ensuring Fair Treatment, Transparent Processes, And Complete Support Throughout Their Overseas Journey.",
      color: "text-[#EC4899]",
    },
    {
      id: 4,
      icon: <FaHandshake />,
      title: "Employer Satisfaction",
      desc: "Delivering Suitable, Qualified, And Verified Manpower That Meets Employer Requirements, With Consistent Follow-Up And Post-Deployment Coordination.",
      color: "text-[#FFB300]",
    },
    {
      id: 5,
      icon: <FaBalanceScale />,
      title: "Legal Compliance",
      desc: "Full Adherence To The Bureau Of Emigration & Overseas Employment (BEOE) Regulations, Foreign Service Agreement Requirements, And All Applicable Pakistani Laws.",
      color: "text-[#22C55E]",
    },
    {
      id: 6,
      icon: <FaSyncAlt />,
      title: "Continuous Improvement",
      desc: "Regularly Reviewing And Improving Our Recruitment Processes, Based On Feedback, Industry Changes, And Evolving Global Manpower Demands.",
      color: "text-[#06B6D4]",
    },
  ];

  const qualityStandards = [
    {
      icon: FaShieldAlt,
      title: "BEOE Registered",
      desc: "Officially Registered Overseas Employment Promoter With The Government Of Pakistan.",
      color: "text-[#22C55E]",
    },
    {
      icon: FaCertificate,
      title: "Fully Licensed",
      desc: "Valid Overseas Employment License OP&HRD/5224/LHR/2026 Issued By The Ministry.",
      color: "text-[#FFB300]",
    },
    {
      icon: FaClipboardCheck,
      title: "Documented Process",
      desc: "Every Recruitment Stage Follows A Documented, Auditable Process.",
      color: "text-[#4FC3F7]",
    },
    {
      icon: FaGlobeAsia,
      title: "International Standards",
      desc: "Compliance With International Manpower Recruitment Best Practices.",
      color: "text-[#8B5CF6]",
    },
  ];

  const commitments = [
    "We Will Only Engage With Licensed And Verified Overseas Employers.",
    "We Will Never Charge Candidates For Job Placement Or Selection.",
    "We Will Provide Accurate And Truthful Information To All Parties.",
    "We Will Maintain Complete Transparency In Fees And Processes.",
    "We Will Protect The Confidentiality Of Candidate And Employer Data.",
    "We Will Comply Fully With The Laws Of Pakistan And Destination Countries.",
    "We Will Ensure Trade-Tested, Qualified Candidates For Every Job.",
    "We Will Support Workers Throughout Their Overseas Employment Journey.",
  ];

  const stats = [
    { icon: <FaAward />, number: "100%", label: "Compliance", color: "text-[#FFB300]" },
    { icon: <FaCheckCircle />, number: "5,000+", label: "Placed", color: "text-[#22C55E]" },
    { icon: <FaGlobeAsia />, number: "25+", label: "Countries", color: "text-[#4FC3F7]" },
    { icon: <FaRegStar />, number: "100%", label: "Satisfaction", color: "text-[#8B5CF6]" },
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 16;
    let y = margin;

    doc.setFontSize(20);
    doc.setTextColor("#0F4C5C");
    doc.text("Quality Policy", pageWidth / 2, y, { align: "center" });
    y += 8;
    doc.setFontSize(11);
    doc.setTextColor("#666");
    doc.text("Ali Hajveri International (Pvt.) Ltd.", pageWidth / 2, y, {
      align: "center",
    });
    y += 5;
    doc.setFontSize(10);
    doc.setTextColor("#29B6F6");
    doc.text("License # OP&HRD/5224/LHR/2026", pageWidth / 2, y, {
      align: "center",
    });
    y += 7;
    doc.setDrawColor("#4FC3F7");
    doc.line(margin, y, pageWidth - margin, y);
    y += 9;

    doc.setFontSize(12);
    doc.setTextColor("#0F4C5C");
    doc.setFont("helvetica", "bold");
    doc.text("Our Commitment", margin, y);
    y += 7;

    doc.setFontSize(10);
    doc.setTextColor("#333");
    doc.setFont("helvetica", "normal");
    const intro =
      "Ali Hajveri International (Pvt.) Ltd. is committed to providing high-quality overseas manpower recruitment services from Pakistan. We maintain the highest standards of professionalism, transparency, and compliance with all applicable regulations.";
    const introLines = doc.splitTextToSize(intro, pageWidth - 2 * margin);
    doc.text(introLines, margin, y);
    y += introLines.length * 5 + 8;

    doc.setFontSize(12);
    doc.setTextColor("#0F4C5C");
    doc.setFont("helvetica", "bold");
    doc.text("Quality Objectives", margin, y);
    y += 7;

    qualityObjectives.forEach((obj) => {
      doc.setFontSize(11);
      doc.setTextColor("#29B6F6");
      doc.setFont("helvetica", "bold");
      doc.text(`${obj.id}. ${obj.title}`, margin, y);
      y += 5;

      doc.setFontSize(10);
      doc.setTextColor("#333");
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(obj.desc, pageWidth - 2 * margin);
      doc.text(lines, margin, y);
      y += lines.length * 5 + 4;

      if (y > 270) {
        doc.addPage();
        y = margin;
      }
    });

    doc.setFontSize(12);
    doc.setTextColor("#0F4C5C");
    doc.setFont("helvetica", "bold");
    doc.text("Our Commitments", margin, y);
    y += 7;

    doc.setFontSize(10);
    doc.setTextColor("#333");
    doc.setFont("helvetica", "normal");
    commitments.forEach((commitment) => {
      const lines = doc.splitTextToSize(`• ${commitment}`, pageWidth - 2 * margin);
      doc.text(lines, margin, y);
      y += lines.length * 5 + 2;

      if (y > 270) {
        doc.addPage();
        y = margin;
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

    doc.save("AHIOEP_Quality_Policy.pdf");
  };

  return (
    <>
      {/* ============ SEO META TAGS ============ */}
      <Helmet>
        <title>Quality Policy | Overseas Recruitment Compliance | Ali Hajveri International</title>
        <meta
          name="description"
          content="Quality policy of Ali Hajveri International (Pvt.) Limited - BEOE registered overseas employment promoter in Pakistan committed to accuracy, compliance, candidate welfare, and continuous improvement in overseas recruitment."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ahioep.com/process/quality-policy" />
        <meta property="og:title" content="Quality Policy | Overseas Recruitment Compliance | Ali Hajveri" />
        <meta property="og:description" content="Our quality policy ensures compliance, transparency, and excellence in every stage of overseas manpower recruitment from Pakistan." />
        <meta property="og:url" content="https://ahioep.com/process/quality-policy" />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* ============ SEO CONTENT (Visually Hidden, Sirf Google Ke Liye) ============ */}
      <div className="sr-only" aria-hidden="true">
        <h1>Quality Policy - Overseas Recruitment Compliance By Ali Hajveri International</h1>
        <p>
          Ali Hajveri International (Pvt.) Limited Is Committed To Providing
          High-Quality Overseas Manpower Recruitment Services From Pakistan. As
          A BEOE Registered Overseas Employment Promoter With License Number
          OP&HRD/5224/LHR/2026, We Maintain The Highest Standards Of
          Professionalism, Transparency, And Compliance With All Applicable
          Regulations.
        </p>
        <p>
          Our Quality Policy Ensures That Every Recruitment Transaction Protects
          Both International Employers And Pakistani Candidates. We Focus On
          Continuous Improvement, Candidate Welfare, Verified Employer
          Partnerships, And Complete Adherence To The Rules And Regulations Of
          The Bureau Of Emigration And Overseas Employment (BEOE), Government
          Of Pakistan.
        </p>

        <h2>Our Six Core Quality Objectives</h2>
        <p>
          Our Quality Policy Is Built On Six Core Objectives That Define Our
          Approach To Quality And Excellence In Overseas Recruitment.
        </p>
        <ul>
          <li>Accuracy And Precision In Every Documentation, Contract, And Visa Process</li>
          <li>Professional Excellence Through Continuous Staff Training And Updated Knowledge</li>
          <li>Candidate Welfare With Fair Treatment And Transparent Processes</li>
          <li>Employer Satisfaction Through Verified And Qualified Manpower</li>
          <li>Legal Compliance With BEOE Regulations And Pakistani Laws</li>
          <li>Continuous Improvement Based On Feedback And Industry Changes</li>
        </ul>

        <h2>Quality Standards We Maintain</h2>
        <p>
          We Are Officially Registered As An Overseas Employment Promoter With
          The Government Of Pakistan. Our Valid Overseas Employment License
          OP&HRD/5224/LHR/2026 Is Issued By The Ministry Of Overseas Pakistanis
          And Human Resource Development. Every Recruitment Stage Follows A
          Documented, Auditable Process, And We Comply With International
          Manpower Recruitment Best Practices.
        </p>

        <h2>Our Commitments To Employers And Candidates</h2>
        <ul>
          <li>We Will Only Engage With Licensed And Verified Overseas Employers</li>
          <li>We Will Never Charge Candidates For Job Placement Or Selection</li>
          <li>We Will Provide Accurate And Truthful Information To All Parties</li>
          <li>We Will Maintain Complete Transparency In Fees And Processes</li>
          <li>We Will Protect The Confidentiality Of Candidate And Employer Data</li>
          <li>We Will Comply Fully With The Laws Of Pakistan And Destination Countries</li>
          <li>We Will Ensure Trade-Tested, Qualified Candidates For Every Job</li>
          <li>We Will Support Workers Throughout Their Overseas Employment Journey</li>
        </ul>

        <h2>Why Quality Matters In Overseas Recruitment</h2>
        <p>
          Overseas Recruitment Involves Complex Legal, Financial, And Human
          Considerations. Poor Quality Recruitment Practices Can Lead To
          Disputes, Legal Issues, Financial Losses, And Mistreatment Of Workers.
          Our Quality Policy Ensures That Every Step Of The Recruitment Process
          Is Handled Professionally, Ethically, And In Full Compliance With
          Applicable Regulations.
        </p>

        <h2>Legal Compliance And BEOE Registration</h2>
        <p>
          Ali Hajveri International Is Fully Compliant With The Rules And
          Regulations Of The Bureau Of Emigration And Overseas Employment
          (BEOE), Ministry Of Overseas Pakistanis And Human Resource
          Development, Government Of Pakistan. We Complete All Required
          Protector Of Emigrants Formalities, Foreign Service Agreement
          Registration, And Emigration Clearance For Every Deployed Worker.
        </p>

        <h2>Candidate Welfare And Protection</h2>
        <p>
          We Prioritize The Welfare, Safety, And Rights Of Pakistani Workers
          Throughout Their Overseas Employment Journey. From Pre-Departure
          Orientation To Post-Deployment Support, We Ensure Every Candidate
          Receives Fair Treatment, Accurate Information About Employment Terms,
          And Access To Grievance Resolution Services.
        </p>

        <h2>Employer Satisfaction Through Quality Placement</h2>
        <p>
          We Deliver Suitable, Qualified, And Verified Manpower That Meets
          Employer Requirements. Our Trade Testing, Skill Assessments, And
          Documentation Verification Ensure That Employers Receive Workers Who
          Can Perform The Required Job Effectively And Reliably.
        </p>

        <h2>Continuous Improvement In Our Recruitment Process</h2>
        <p>
          We Regularly Review And Improve Our Recruitment Processes Based On
          Feedback From Employers And Candidates, Industry Changes, And Evolving
          Global Manpower Demands. This Commitment To Continuous Improvement
          Ensures Our Services Remain Effective, Compliant, And Competitive.
        </p>

        <h2>Contact Ali Hajveri International</h2>
        <p>
          For More Information About Our Quality Policy Or To Discuss Your
          Overseas Recruitment Needs, Contact Ali Hajveri International (Pvt.)
          Limited. Website: ahioep.com | Email: ahioep.com@gmail.com | Phone:
          +92 300 8578764
        </p>

        <h2>Internal Links</h2>
        <nav>
          <Link to="/process">Process Overview</Link>
          <Link to="/process/recruitment">Recruitment Process</Link>
          <Link to="/process/work-visa">Work Visa Process</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/about">About Us</Link>
          <Link to="/legal-status">Legal Status</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/faq">FAQ</Link>
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
        .animate-blob { animation: blob 9s ease-in-out infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
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
      <section className="relative mt-[-50px] overflow-hidden bg-gradient-to-br from-white via-[#E1F5FE] to-white pt-20 lg:pt-24 pb-8">
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
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4 bg-white/80 backdrop-blur-md border border-[#4FC3F7]/50 rounded-full px-4 py-2 shadow-[0_6px_18px_rgba(79,195,247,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#4FC3F7] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4FC3F7]" />
                </span>
                <span className="text-[#0F4C5C] text-xs sm:text-sm font-bold tracking-wide">
                  License # OP&HRD/5224/LHR/2026
                </span>
              </div>

              <h1 className="font-[Plus_Jakarta_Sans] text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0F4C5C] leading-[1.1] mb-4">
                Our Quality{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                    Policy
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

              <p className="text-[#0A3A47]/85 text-sm sm:text-base md:text-lg leading-relaxed mb-5 max-w-xl lg:max-w-2xl mx-auto lg:mx-0 font-medium">
                A Commitment To Excellence, Compliance, And Transparency In
                Every Stage Of Overseas Manpower Recruitment From Pakistan.
              </p>

              <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start mb-5">
                {[
                  { icon: FaShieldAlt, text: "Fully Compliant", color: "text-[#22C55E]" },
                  { icon: FaCertificate, text: "Licensed OEP", color: "text-[#FFB300]" },
                  { icon: FaCheckCircle, text: "Audited Process", color: "text-[#4FC3F7]" },
                ].map(({ icon: Icon, text, color }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#0F4C5C] bg-gradient-to-r from-white to-[#E1F5FE] border-2 border-[#4FC3F7]/50 px-4 py-2 rounded-full shadow-[0_8px_22px_rgba(79,195,247,0.18)] hover:border-[#4FC3F7] hover:scale-105 transition-all duration-300"
                  >
                    <Icon className={`${color} text-sm`} aria-hidden="true" />
                    {text}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href="#objectives"
                  className={PRIMARY_ACTION}
                  style={{ animation: "gradientShift 4s ease infinite" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Our Objectives</span>
                  <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
                <button onClick={downloadPDF} className={SECONDARY_ACTION}>
                  <FaDownload className="text-sm" aria-hidden="true" />
                  Download PDF
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/40 to-[#FFD54F]/20 blur-3xl rounded-full" />

                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-[#4FC3F7]/30 shadow-[0_24px_60px_rgba(15,76,92,0.25)] overflow-hidden">
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_8px_20px_rgba(79,195,247,0.4)]">
                      <FaAward className="text-white text-sm" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[#0F4C5C] font-extrabold text-sm sm:text-base">
                        Quality Metrics
                      </p>
                      <p className="text-[#0F4C5C]/70 text-xs font-bold tracking-wide">
                        Our Performance
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((s, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-gradient-to-br from-[#E1F5FE] to-white border border-[#4FC3F7]/20 p-4 hover:border-[#4FC3F7]/50 transition-all duration-300"
                      >
                        <div className={`${s.color} text-lg mb-1.5`}>
                          {s.icon}
                        </div>
                        <p className="text-xl font-extrabold text-[#0F4C5C] leading-none mb-0.5">
                          {s.number}
                        </p>
                        <p className="text-xs font-bold text-[#0A3A47]/70">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ POLICY STATEMENT ============ */}
      <section className="relative py-10 sm:py-12 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#E1F5FE] via-white to-[#E1F5FE] rounded-2xl p-6 sm:p-8 border border-[#4FC3F7]/25 shadow-[0_14px_40px_rgba(15,76,92,0.08)] overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

            <div className="flex items-center gap-3 mb-4">
              <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_8px_20px_rgba(79,195,247,0.4)]">
                <FaBullseye className="text-white text-base" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[#4FC3F7] text-xs font-bold tracking-wide">
                  Our Commitment
                </p>
                <h2 className="font-[Plus_Jakarta_Sans] text-xl sm:text-2xl font-extrabold text-[#0F4C5C] leading-tight">
                  Quality Policy Statement
                </h2>
              </div>
            </div>

            <p className="text-[#0A3A47]/85 leading-relaxed text-sm sm:text-base mb-4">
              <strong className="text-[#0F4C5C]">
                Ali Hajveri International (Pvt.) Ltd.
              </strong>{" "}
              Is Committed To Providing High-Quality Overseas Manpower
              Recruitment Services From Pakistan. We Maintain The Highest
              Standards Of Professionalism, Transparency, And Compliance With
              All Applicable Regulations — Ensuring Both International
              Employers And Pakistani Candidates Receive Ethical, Reliable,
              And Compliant Recruitment Services.
            </p>

            <p className="text-[#0A3A47]/85 leading-relaxed text-sm sm:text-base">
              Our Quality Management Approach Focuses On Continuous
              Improvement, Candidate Welfare, Verified Employer Partnerships,
              And Complete Adherence To The Rules And Regulations Of The
              Bureau Of Emigration & Overseas Employment (BEOE), Government Of
              Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* ============ QUALITY OBJECTIVES ============ */}
      <section
        id="objectives"
        className="relative py-10 sm:py-12 bg-gradient-to-b from-white via-[#E1F5FE]/40 to-white overflow-hidden"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-8">
            <div className="inline-flex items-center gap-2 mb-2.5 pl-3 border-l-2 border-[#4FC3F7]">
              <FaFire className="text-[#FFB300] text-xs" aria-hidden="true" />
              <span className="text-[#0F4C5C] text-xs sm:text-sm font-bold tracking-wide">
                Quality Objectives
              </span>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-2 leading-tight">
              Our Core Quality{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Objectives
              </span>
            </h2>
            <p className="text-[#0A3A47]/75 text-sm sm:text-base max-w-2xl">
              Six Pillars That Define Our Approach To Quality And Excellence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {qualityObjectives.map((obj, idx) => (
              <div
                key={obj.id}
                className="group relative bg-white rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/60 hover:shadow-[0_20px_45px_rgba(79,195,247,0.15)] hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-slideUp"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                <span className="absolute top-2 right-4 text-5xl sm:text-6xl font-black text-[#4FC3F7]/8 group-hover:text-[#4FC3F7]/15 transition-colors duration-500 select-none pointer-events-none">
                  {String(obj.id).padStart(2, "0")}
                </span>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center text-xl mb-3 group-hover:bg-[#4FC3F7]/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <span className={obj.color}>{obj.icon}</span>
                  </div>
                  <h3 className="font-[Plus_Jakarta_Sans] text-lg font-extrabold text-[#0F4C5C] mb-1.5 leading-tight">
                    {obj.title}
                  </h3>
                  <p className="text-[#0A3A47]/80 text-xs sm:text-sm leading-relaxed">
                    {obj.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUALITY STANDARDS ============ */}
      <section className="relative py-10 sm:py-12 bg-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-8">
            <div className="inline-flex items-center gap-2 mb-2.5 pl-3 border-l-2 border-[#4FC3F7]">
              <FaCertificate className="text-[#FFB300] text-xs" aria-hidden="true" />
              <span className="text-[#0F4C5C] text-xs sm:text-sm font-bold tracking-wide">
                Our Standards
              </span>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-2 leading-tight">
              Quality{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Standards              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {qualityStandards.map(({ icon: Icon, title, desc, color }, idx) => (
              <div
                key={title}
                className="group relative bg-gradient-to-b from-[#E1F5FE] to-white rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/60 hover:shadow-[0_20px_45px_rgba(79,195,247,0.15)] hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-slideUp"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                <div className="w-12 h-12 rounded-2xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center text-xl mb-3 group-hover:bg-[#4FC3F7]/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className={`${color}`} aria-hidden="true" />
                </div>
                <h3 className="font-[Plus_Jakarta_Sans] text-base font-extrabold text-[#0F4C5C] mb-1.5 leading-tight">
                  {title}
                </h3>
                <p className="text-[#0A3A47]/80 text-xs sm:text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUR COMMITMENTS ============ */}
      <section className="relative py-10 sm:py-12 bg-gradient-to-b from-white to-[#E1F5FE] overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-8">
            <div className="inline-flex items-center gap-2 mb-2.5 pl-3 border-l-2 border-[#4FC3F7]">
              <FaHandshake className="text-[#FFB300] text-xs" aria-hidden="true" />
              <span className="text-[#0F4C5C] text-xs sm:text-sm font-bold tracking-wide">
                Our Commitments
              </span>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-2 leading-tight">
              What We{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Promise
              </span>
            </h2>
            <p className="text-[#0A3A47]/75 text-sm sm:text-base max-w-2xl">
              Our Ongoing Commitment To Quality, Ethics, And Excellence.
            </p>
          </div>

          <div className="relative bg-white rounded-2xl border border-[#4FC3F7]/25 p-5 sm:p-7 shadow-[0_14px_40px_rgba(15,76,92,0.08)] overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

            <div className="grid sm:grid-cols-2 gap-2.5">
              {commitments.map((commitment, idx) => (
                <div
                  key={commitment}
                  className="group flex items-start gap-3 p-3 rounded-xl bg-[#E1F5FE]/40 hover:bg-[#E1F5FE] border border-[#4FC3F7]/15 hover:border-[#4FC3F7]/50 transition-all duration-300 animate-slideUp"
                  style={{ animationDelay: `${idx * 0.04}s` }}
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-[0_4px_10px_rgba(34,197,94,0.3)] group-hover:scale-110 transition-transform">
                    <FaCheckCircle className="text-white text-xs" aria-hidden="true" />
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#0A3A47]/90 leading-snug">
                    {commitment}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ DOWNLOAD CTA ============ */}
      <section className="relative py-8 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white border border-[#4FC3F7]/25 rounded-2xl px-5 sm:px-7 py-6 shadow-[0_20px_50px_rgba(15,76,92,0.10)] overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 sm:justify-center text-center sm:text-left">
              <div className="flex items-center gap-3">
                <span className="hidden sm:flex w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex-shrink-0 items-center justify-center shadow-[0_10px_24px_rgba(79,195,247,0.4)]">
                  <FaDownload className="text-white text-lg" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-[Plus_Jakarta_Sans] text-base sm:text-lg font-extrabold text-[#0F4C5C]">
                    Want The Full Policy?
                  </h3>
                  <p className="text-[#0A3A47]/75 text-xs sm:text-sm mt-0.5">
                    Download Our Complete Quality Policy As A PDF Document.
                  </p>
                </div>
              </div>
              <button onClick={downloadPDF} className={SECONDARY_ACTION}>
                <FaDownload className="text-sm" aria-hidden="true" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-10 sm:py-12 bg-[#E1F5FE] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] rounded-2xl px-6 sm:px-8 py-8 sm:py-10 text-center overflow-hidden border border-[#4FC3F7]/25 shadow-[0_24px_60px_rgba(15,76,92,0.25)]">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4FC3F7]/25 blur-3xl animate-blob" />
            <div
              className="absolute -bottom-24 -left-20 w-80 h-80 bg-[#FFD54F]/15 blur-3xl animate-blob"
              style={{ animationDelay: "2.5s" }}
            />

            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#4FC3F7] to-transparent bg-[length:200%_100%] animate-[shimmer_4s_linear_infinite]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 flex items-center justify-center">
                <FaAward className="text-[#FFB300] text-xl" aria-hidden="true" />
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
                Experience Quality You Can{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                  Trust
                </span>
              </h2>

              <p className="text-white/80 text-sm sm:text-base mb-6 leading-relaxed">
                Partner With Ali Hajveri International And Experience A
                Recruitment Process Built On Quality, Transparency, And
                Complete Regulatory Compliance.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className={PRIMARY_ACTION}
                  style={{ animation: "gradientShift 4s ease infinite" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Contact Our Team</span>
                  <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <Link
                  to="/process/recruitment"
                  className="group inline-flex items-center justify-center gap-2 border border-[#4FC3F7]/40 text-[#4FC3F7] px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-[#4FC3F7]/10 hover:border-[#4FC3F7]/70 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                >
                  <span>Recruitment Process</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QualityPolicy;