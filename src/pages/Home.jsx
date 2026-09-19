// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import {
  FaUserCheck,
  FaClipboardCheck,
  FaTools,
  FaComments,
  FaFileSignature,
  FaPlaneDeparture,
  FaShieldAlt,
  FaHandshake,
  FaUsers,
  FaHardHat,
  FaArrowRight,
  FaGlobeAsia,
  FaCertificate,
  FaBullseye,
  FaEye,
  FaQuoteLeft,
  FaQuoteRight,
  FaAward,
  FaCheckCircle,
  FaGlobe,
  FaIndustry,
  FaThumbsUp,
} from "react-icons/fa";
import { COMPANY_INFO } from "../utilis/constants";

/* ============================================================
   DATA
============================================================ */
const HERO_ROLES = [
  "Skilled Tradespeople",
  "Technical Staff",
  "Semi-Skilled Workers",
  "General Workforce",
  "Professional Staff",
];

const CLIENT_LOGOS = Array.from({ length: 15 }, (_, i) => ({
  name: `Client ${i + 1}`,
  src: `/src/assets/logos/c-logo-${i + 1}.png`,
}));

const STATS = [
  { icon: FaGlobe, value: "25+", label: "Countries Served", desc: "Middle East, Asia & Beyond", color: "text-[#22C55E]" },
  { icon: FaIndustry, value: "120+", label: "Companies Served", desc: "Across Multiple Industries", color: "text-[#F59E0B]" },
  { icon: FaThumbsUp, value: "98%", label: "Satisfaction Rate", desc: "From Employers & Candidates", color: "text-[#8B5CF6]" },
  { icon: FaUsers, value: "5,000+", label: "Workers Deployed", desc: "Skilled, Semi & General", color: "text-[#29B6F6]" },
];

const CERTIFICATIONS = [
  { icon: FaAward, title: "Govt. Licensed Recruiter", desc: "Recognized Overseas Employment Promoter — Government Of Pakistan.", badge: "License #" + (COMPANY_INFO?.license || "XXXX"), color: "text-[#FFB300]" },
  { icon: FaCertificate, title: "ISO Certified Process", desc: "Structured Recruitment Workflow Aligned With International Standards.", badge: "ISO 9001", color: "text-[#22C55E]" },
  { icon: FaShieldAlt, title: "Compliance Verified", desc: "Every Deployment Follows Legal Documentation & Verification Stages.", badge: "Verified", color: "text-[#6366F1]" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Requirement", desc: "Employer Shares Role, Trade & Headcount.", icon: FaClipboardCheck },
  { num: "02", title: "Sourcing", desc: "Candidates Identified From Across Pakistan.", icon: FaUserCheck },
  { num: "03", title: "Screening", desc: "Profiles Checked Against Job Brief.", icon: FaTools },
  { num: "04", title: "Interview", desc: "Employer Interviews Shortlisted Candidates.", icon: FaComments },
  { num: "05", title: "Documentation", desc: "Contracts, Medicals And Clearances.", icon: FaFileSignature },
  { num: "06", title: "Deployment", desc: "Travel And Overseas Mobilization.", icon: FaPlaneDeparture },
];

const SERVICES = [
  { icon: FaUserCheck, title: "Manpower Sourcing", desc: "Suitable Pakistani Candidates Matched To Each Employer's Requirement.", color: "text-[#4FC3F7]" },
  { icon: FaClipboardCheck, title: "Candidate Screening", desc: "Reviewed Against Qualifications, Experience And Skill Level.", color: "text-[#22C55E]" },
  { icon: FaTools, title: "Trade & Skill Testing", desc: "Practical Testing Arranged For Technical And Skilled Trades.", color: "text-[#F59E0B]" },
  { icon: FaComments, title: "Employer Interviews", desc: "Direct Coordination Between Employers And Candidates.", color: "text-[#8B5CF6]" },
  { icon: FaFileSignature, title: "Documentation Support", desc: "Step-By-Step Guidance Through Required Paperwork.", color: "text-[#EC4899]" },
  { icon: FaPlaneDeparture, title: "Deployment Support", desc: "Involvement From Confirmation Through Overseas Mobilization.", color: "text-[#06B6D4]" },
];

const WHY_ITEMS = [
  { icon: FaGlobeAsia, title: "Sourced Only From Pakistan", desc: "One Talent Pool, Deeply Understood.", color: "text-[#4FC3F7]" },
  { icon: FaClipboardCheck, title: "A Process, Not A Favor", desc: "Same Staged Route From Requirement To Deployment.", color: "text-[#22C55E]" },
  { icon: FaShieldAlt, title: "Screened Against Your Brief", desc: "Measured Against What The Employer Actually Asked For.", color: "text-[#FFB300]" },
  { icon: FaHardHat, title: "Every Skill Tier Covered", desc: "Skilled, Semi-Skilled, Technical, General & Professional.", color: "text-[#F97316]" },
  { icon: FaComments, title: "Nobody Left Waiting", desc: "Both Sides Hear From Us At Every Stage.", color: "text-[#A78BFA]" },
  { icon: FaHandshake, title: "Present Through Mobilization", desc: "Involvement Doesn't Stop At Selection.", color: "text-[#14B8A6]" },
];

/* ============================================================
   COUNTER
============================================================ */
const Counter = ({ value, duration = 1800 }) => {
  const [count, setCount] = useState(null);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const hasRun = useRef(false);

  const parseValue = (val) => {
    const str = String(val);
    const match = str.match(/^([\d,]+)(.*)$/);
    if (!match) return { number: 0, suffix: str, formatted: str };
    const number = parseInt(match[1].replace(/,/g, ""), 10);
    const suffix = match[2] || "";
    return { number, suffix, formatted: number.toLocaleString() + suffix };
  };

  const { number: target, suffix, formatted } = parseValue(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasRun.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          observer.disconnect();
          setStarted(true);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime;
    let raf;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setCount(target);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  const display = count === null ? formatted : `${count.toLocaleString()}${suffix}`;

  return (
    <span ref={ref} className="tabular-nums inline-block text-center" style={{ minWidth: `${formatted.length}ch` }}>
      {display}
    </span>
  );
};

/* ============================================================
   HOME
============================================================ */
const Home = () => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isProcessExpanded, setIsProcessExpanded] = useState(false);

  useEffect(() => {
    const current = HERO_ROLES[roleIndex];
    let timeout;
    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 90);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1600);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 45);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative mt-[-2rem] pt-44 sm:pt-28 md:pt-32 lg:pt-36 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-white via-[#E1F5FE] to-white">
        <div className="absolute -top-32 -right-40 w-[280px] sm:w-[380px] md:w-[480px] h-[280px] sm:h-[380px] md:h-[480px] rounded-full bg-[#4FC3F7]/10 blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 -left-40 w-[220px] sm:w-[300px] md:w-[380px] h-[220px] sm:h-[300px] md:h-[380px] rounded-full bg-[#FFD54F]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[180px] sm:w-[220px] md:w-[260px] h-[180px] sm:h-[220px] md:h-[260px] rounded-full bg-[#4FC3F7]/8 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 bg-white/95 backdrop-blur-sm border border-[#4FC3F7]/40 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-[0_4px_14px_rgba(15,76,92,0.12)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-ping-slow" />
                <span className="text-[#0F4C5C] text-xs sm:text-sm font-bold">Manpower Recruitment From Pakistan</span>
              </div>

              <h1 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold text-[#0F4C5C] leading-[1.15] mb-4 sm:mb-5">
                Connecting Pakistani Talent With{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                  Global Opportunities
                </span>
              </h1>

              <div className="text-base sm:text-lg md:text-xl text-[#0F4C5C] mb-4 min-h-[28px] sm:h-8 font-bold">
                Placing <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent font-bold">{displayText}</span>
                <span className="text-[#0F4C5C] animate-pulse font-bold">|</span>
              </div>

              <div className="flex justify-center lg:justify-start mb-6 sm:mb-8">
                <div className="max-w-2xl">
                  <p className="text-[#0A3A47] text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                    We Connect International Employers With Skilled, Semi-Skilled, Professional And General Manpower From Pakistan Through A Structured, Professionally Managed Recruitment Process.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10">
                <Link
                  to="/contact"
                  className="btn-shine group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_16px_38px_rgba(79,195,247,0.55)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
                >
                  Request Manpower <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/process"
                  className="btn-shine inline-flex items-center justify-center gap-2 bg-white border-2 border-[#0F4C5C]/30 text-[#0F4C5C] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:border-[#4FC3F7] hover:bg-[#E1F5FE] transition-all duration-300 text-sm sm:text-base"
                >
                  Explore Our Process
                </Link>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 md:gap-14">
                {[
                  { value: "5000+", label: "Workers Placed" },
                  { value: "50+", label: "Global Employers" },
                  { value: "10+", label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F4C5C] tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm text-[#0F4C5C] font-bold tracking-wide uppercase mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative reveal-up group order-first lg:order-last">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/20 to-transparent rounded-2xl sm:rounded-3xl rotate-3 scale-[1.02] hidden sm:block" />

              <div className="relative h-[280px] sm:h-[340px] lg:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#4FC3F7]/20 shadow-[0_20px_50px_rgba(15,76,92,0.15)]">
                <img
                  src="/src/assets/hero-4-image.png"
                  alt="Pakistani Workforce Ready For Overseas Deployment"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <span className="img-shine" />
              </div>

              <div className="animate-gentle-float absolute -bottom-4 sm:-bottom-5 -left-4 sm:-left-5 bg-white rounded-2xl shadow-[0_16px_36px_rgba(15,76,92,0.12)] border border-[#4FC3F7]/25 px-4 py-3 max-w-[170px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#4FC3F7]/12 flex items-center justify-center">
                    <FaCheckCircle className="text-[#22C55E] text-xs" />
                  </span>
                  <p className="text-[#0F4C5C] font-bold text-xs">End-To-End</p>
                </div>
                <p className="text-[#0A3A47] text-[10px] leading-relaxed">
                  Sourcing To Deployment
                </p>
              </div>

              <div className="animate-gentle-float-slow absolute top-4 -right-3 sm:top-5 sm:-right-4 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] rounded-xl shadow-[0_12px_30px_rgba(79,195,247,0.35)] px-3.5 py-2.5 hidden md:block">
                <p className="text-[10px] uppercase tracking-wider opacity-90 font-semibold">
                  Trusted By
                </p>
                <p className="text-sm font-extrabold">500+ Clients</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-12 sm:mt-16">
          <div className="bg-white pt-6 sm:pt-8 pb-6 sm:pb-8 border-t border-[#4FC3F7]/15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-5">
              <p className="text-center text-[#0F4C5C] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                Trusted By Employers Worldwide
              </p>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 h-full w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />
              <div className="flex flex-nowrap items-center gap-8 sm:gap-12 animate-marquee-left w-max">
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
                  <div
                    key={`${logo.name}-${idx}`}
                    className="flex-shrink-0 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS STRIP ============ */}
      <section className="section-tight relative bg-white overflow-hidden -mt-[15px]">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold tracking-wide uppercase">Our Impact</p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C]">
              Our Recruitment <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">Impact In Numbers</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {STATS.map(({ icon: Icon, value, label, desc, color }, idx) => (
              <div key={label} className="group relative bg-white rounded-2xl p-4 sm:p-5 text-center shadow-[0_6px_20px_rgba(15,76,92,0.06)] hover:shadow-[0_14px_34px_rgba(79,195,247,0.18)] hover:-translate-y-1.5 transition-all duration-500 border border-[#4FC3F7]/15 hover:border-[#4FC3F7]/50 reveal-up overflow-hidden" style={{ animationDelay: `${idx * 0.1}s` }}>
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <span className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#4FC3F7]/0 group-hover:bg-[#4FC3F7]/10 blur-2xl transition-all duration-500" />
                <div className="relative w-10 sm:w-12 h-10 sm:h-12 mx-auto rounded-xl bg-[#4FC3F7]/10 flex items-center justify-center mb-3 group-hover:bg-[#4FC3F7]/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className={`${color} text-base sm:text-xl icon-wiggle`} />
                </div>
                <p className="relative font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-1 flex items-center justify-center">
                  <Counter value={value} duration={2000} />
                </p>
                <p className="relative text-[#0A3A47] font-bold text-xs sm:text-sm mb-1">{label}</p>
                <p className="relative text-[#0A3A47]/70 text-[10px] sm:text-xs leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ISO CERTIFIED ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-3">
              ISO Certified & <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">Recruiting Agency</span>
            </h2>
            <p className="text-[#0A3A47] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2 font-medium">
              Every Placement Is Handled Under A Government-Recognized License And A Compliant, Structured Recruitment Process.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-7 sm:gap-9 items-stretch">
            <div className="order-2 lg:order-1 reveal-up">
              <div className="h-full max-h-[315px] sm:max-h-[360px] lg:max-h-[420px] overflow-y-auto bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl border border-[#4FC3F7]/20 shadow-[0_8px_28px_rgba(15,76,92,0.06)] p-5 sm:p-7 no-scrollbar">
                <h3 className="font-[Plus_Jakarta_Sans] text-xl sm:text-2xl font-extrabold text-[#0F4C5C] mb-4">Reliable Manpower Solutions</h3>
                <p className="text-[#0A3A47] text-sm sm:text-base leading-relaxed mb-4">
                  At Ali Hajveri International Private Limited, We Provide Reliable And Qualified Manpower Solutions To Meet The Workforce Requirements Of Businesses And Projects In Pakistan And International Markets. Our Focus Is On Connecting Employers With Capable Professionals, Skilled Workers And Semi-Skilled Workforce According To Their Specific Requirements.
                </p>
                <p className="text-[#0A3A47] text-sm sm:text-base leading-relaxed mb-4">
                  We Provide Manpower For Construction And Engineering Projects, Including Engineers, Supervisors, Technicians, Electricians, Welders, Fabricators, Masons, Steel Fixers, Equipment Operators And Other Skilled And Semi-Skilled Workers. Along With Construction, We Also Support Manpower Requirements In Oil & Gas, Electrical, Mechanical, IT & Telecom, Infrastructure, Manufacturing And Other Technical Fields.
                </p>
                <p className="text-[#0A3A47] text-sm sm:text-base leading-relaxed">
                  Our Recruitment Approach Is Focused On Understanding The Client's Requirements, Sourcing Suitable Candidates And Providing Workforce That Matches The Required Skills, Experience And Project Needs.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative reveal-up group">
              <div className="h-full max-h-[315px] sm:max-h-[360px] lg:max-h-[420px] rounded-2xl overflow-hidden border border-[#4FC3F7]/20 shadow-[0_8px_28px_rgba(15,76,92,0.08)] relative">
                <img src="/src/assets/licensed-img.png" alt="ISO Certified & Licensed Recruitment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" onError={(e) => { e.target.style.display = "none"; }} />
                <span className="img-shine" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LICENSED & CERTIFIED ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <Link to="/legal-status" className="inline-block group">
              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-3 group-hover:text-[#4FC3F7] transition-colors duration-300">
                Licensed & <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">Certified Recruitment</span>
              </h2>
            </Link>
            <p className="text-[#0A3A47] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2 font-medium">
              Every Placement Is Handled Under A Government-Recognized License And A Compliant, Structured Recruitment Process.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-7 sm:gap-9 items-stretch">
            <div className="relative reveal-up group">
              <div className="h-full max-h-[315px] sm:max-h-[360px] lg:max-h-[420px] rounded-2xl overflow-hidden border border-[#4FC3F7]/20 shadow-[0_8px_28px_rgba(15,76,92,0.08)] relative">
                <img src="/src/assets/skilled-unskilled-img.png" alt="Licensed Recruitment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" onError={(e) => { e.target.style.display = "none"; }} />
                <span className="img-shine" />
              </div>
            </div>

            <div className="reveal-up">
              <div className="h-full max-h-[315px] sm:max-h-[360px] lg:max-h-[420px] overflow-y-auto bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl border border-[#4FC3F7]/20 shadow-[0_8px_28px_rgba(15,76,92,0.06)] p-5 sm:p-7 no-scrollbar">
                <h3 className="font-[Plus_Jakarta_Sans] text-xl sm:text-2xl font-extrabold text-[#0F4C5C] mb-4">
                  Hire Qualified Pakistani Manpower Through A <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">Trusted Recruitment Partner</span>
                </h3>
                <p className="text-[#0A3A47] text-sm sm:text-base leading-relaxed mb-4">
                  To Hire Reliable Pakistani Manpower, <span className="font-semibold text-[#0F4C5C]">Ali Hajveri International</span> Is A Trusted Manpower Recruitment Company Providing Skilled, Semi-Skilled, And Unskilled Workforce To Overseas Employers.
                </p>
                <p className="text-[#0A3A47] text-sm sm:text-base leading-relaxed">
                  With Our Professional Recruitment And Headhunting Expertise, We Simplify The Hiring Process For International Companies. We Specialize In Sourcing Qualified Pakistani Manpower Across Various Industries, Along With Executive-Level Recruitment Tailored To Our Clients' Specific Needs.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-7 sm:mt-9">
            {CERTIFICATIONS.map(({ icon: Icon, title, desc, badge, color }, idx) => (
              <div key={title} className="group relative bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl p-5 sm:p-6 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 reveal-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center group-hover:bg-[#4FC3F7]/10 transition-colors">
                    <Icon className={`${color} text-xl sm:text-2xl icon-wiggle`} />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#0A3A47] bg-[#FFD54F]/30 px-2 sm:px-3 py-1 rounded-full">{badge}</span>
                </div>
                <h3 className="font-bold text-[#0F4C5C] mb-2 text-base sm:text-lg">{title}</h3>
                <p className="text-[#0A3A47]/80 text-xs sm:text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RECRUITMENT PROCESS ============ */}
      <section className="section-tight bg-gradient-to-b from-[#0F4C5C] via-[#0A3A47] to-[#06303A] relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-[#4FC3F7]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] rounded-full bg-[#FFD54F]/8 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 reveal-up">
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
              From Requirement To <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">Deployment</span>
            </h2>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2">
              A Clear, Six-Stage Recruitment Route Followed For Every Employer — Regardless Of Trade, Quantity Or Destination.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-[26px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#4FC3F7]/40 to-transparent line-grow" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-7 sm:gap-y-10 gap-x-4 sm:gap-x-5 relative">
              {PROCESS_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className={`relative group reveal-up reveal-up-delay-${(idx % 3) + 1}`}>
                    <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] flex items-center justify-center font-bold text-sm mb-4 relative z-10 shadow-[0_8px_24px_rgba(79,195,247,0.4)] group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-base sm:text-lg icon-wiggle" />
                    </div>
                    <span className="text-[#4FC3F7] text-[10px] sm:text-xs font-bold block mb-1 tracking-wider">STEP {step.num}</span>
                    <h4 className="text-white font-bold mb-1.5 text-sm sm:text-base">{step.title}</h4>
                    <p className="text-white/75 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 sm:mt-12 max-w-4xl mx-auto">
            <div className={`text-white/85 text-sm sm:text-base leading-relaxed transition-all duration-500 ease-in-out overflow-hidden ${isProcessExpanded ? "max-h-[600px]" : "max-h-[72px]"}`}>
              <p className="mb-4">Our Comprehensive Recruitment Process Helps Us Identify And Select The Most Suitable Candidates For Our Clients. We Carefully Evaluate Each Position And Understand Its Specific Requirements Before Beginning The Recruitment Process.</p>
              <p className="mb-4">We Thoroughly Review Job Responsibilities, Required Skills, And Working Conditions To Ensure The Right Candidates Are Selected For Every Role. This Allows Us To Focus On The Qualities And Experience That Best Match Our Clients' Needs.</p>
              <p>Based On These Requirements, We Conduct An Initial Screening Of Candidates, Followed By Interviews And Background Verification To Ensure Reliability, Suitability, And Professionalism.</p>
            </div>

            <div className="mt-3">
              <button onClick={() => setIsProcessExpanded(!isProcessExpanded)} className="inline-flex items-center gap-2 text-[#4FC3F7] hover:text-[#FFD54F] font-bold text-sm sm:text-base transition-colors duration-200 group">
                {isProcessExpanded ? (<>Read Less <FaArrowRight className="text-xs rotate-[-90deg] group-hover:-translate-y-1 transition-transform" /></>) : (<>Read More <FaArrowRight className="text-xs rotate-90 group-hover:translate-y-1 transition-transform" /></>)}
              </button>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <Link to="/process/recruitment" className="inline-flex items-center gap-2 font-bold text-[#4FC3F7] hover:text-[#FFD54F] transition-colors text-sm sm:text-base group">
              View Complete Recruitment Process <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ RECRUITMENT SERVICES ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-7 sm:gap-9 items-center">
            <div className="reveal-up">
              <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
                <p className="text-[#29B6F6] text-xs sm:text-sm font-bold tracking-wide uppercase">Recruitment Services</p>
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-4 leading-tight">
                Complete Manpower <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">Recruitment</span> Services
              </h2>

              <p className="text-[#0A3A47] text-sm sm:text-base mb-5 leading-relaxed font-medium">
                From Candidate Sourcing And Trade Testing To Documentation And Overseas Deployment — Every Step Handled By Our Team.
              </p>

              <div className="grid sm:grid-cols-2 gap-3.5">
                {SERVICES.map(({ icon: Icon, title, desc, color }, idx) => (
                  <div key={title} className="group relative bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl p-4 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 reveal-up" style={{ animationDelay: `${idx * 0.08}s` }}>
                    <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                    <div className="w-9 h-9 rounded-xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center mb-2.5 group-hover:bg-[#4FC3F7]/10 transition-colors">
                      <Icon className={`${color} text-sm icon-wiggle`} />
                    </div>
                    <h3 className="font-bold text-[#0F4C5C] text-xs sm:text-sm mb-1.5">{title}</h3>
                    <p className="text-[#0A3A47]/80 text-[11px] sm:text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <Link to="/services" className="btn-shine group inline-flex items-center gap-2 font-bold text-white text-sm sm:text-base bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] px-5 py-3 rounded-xl shadow-[0_10px_26px_rgba(79,195,247,0.3)] hover:shadow-[0_14px_34px_rgba(79,195,247,0.4)] hover:-translate-y-0.5 transition-all duration-300 mt-5">
                Explore All Services <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            <div className="relative order-first lg:order-last reveal-up group">
              <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden">
                <img src="/src/assets/const-2.png" alt="Recruitment Services In Action" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" onError={(e) => { e.target.style.display = "none"; }} />
                <span className="img-shine" />
              </div>

              <div className="animate-gentle-float absolute -bottom-4 sm:-bottom-5 -left-4 sm:-left-5 bg-white rounded-2xl shadow-[0_16px_36px_rgba(15,76,92,0.12)] border border-[#4FC3F7]/25 px-4 py-3 max-w-[170px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#4FC3F7]/12 flex items-center justify-center"><FaCheckCircle className="text-[#22C55E] text-xs" /></span>
                  <p className="text-[#0F4C5C] font-bold text-xs">End-To-End</p>
                </div>
                <p className="text-[#0A3A47] text-[10px] leading-relaxed">From Sourcing To Overseas Deployment</p>
              </div>

              <div className="animate-gentle-float-slow absolute top-4 -right-3 sm:top-5 sm:-right-4 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] rounded-xl shadow-[0_12px_30px_rgba(79,195,247,0.35)] px-3.5 py-2.5 hidden md:block">
                <p className="text-[10px] uppercase tracking-wider opacity-90 font-semibold">Trusted By</p>
                <p className="text-sm font-extrabold">500+ Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MANPOWER SUPPLY ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white via-[#E1F5FE] to-white rounded-2xl sm:rounded-3xl border border-[#4FC3F7]/20 shadow-[0_8px_28px_rgba(15,76,92,0.06)] p-5 sm:p-6 md:p-8 reveal-up">
            <div className="grid lg:grid-cols-2 gap-7 sm:gap-9 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
                  <p className="text-[#29B6F6] text-xs sm:text-sm font-bold tracking-wide uppercase">What We Supply</p>
                </div>

                <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-3 leading-tight">
                  Manpower For Every <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">Tier</span> Of Your Workforce
                </h2>

                <p className="text-[#0A3A47] text-sm sm:text-base mb-3 leading-relaxed font-medium">
                  Our Company Supplies Pakistani Manpower To International Employers Across The Middle East, Asia And Beyond. We Cover All Three Workforce Tiers — Skilled, Semi-Skilled And Unskilled — So Employers Can Build Complete Teams Through A Single Recruitment Partner.
                </p>
                <p className="text-[#0A3A47]/90 text-sm sm:text-base mb-5 leading-relaxed">
                  Whether You Need Certified Tradespeople For Infrastructure Projects, Semi-Skilled Helpers For Facility Operations, Or General Labour For Site Work, Our Team Coordinates Sourcing, Screening, Testing, Documentation And Deployment End To End.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { icon: FaHardHat, title: "Skilled", desc: "Certified Trades", color: "text-[#F97316]" },
                    { icon: FaTools, title: "Semi-Skilled", desc: "Site Experience", color: "text-[#FFB300]" },
                    { icon: FaUsers, title: "Unskilled", desc: "General Labour", color: "text-[#4FC3F7]" },
                  ].map(({ icon: Icon, title, desc, color }) => (
                    <div key={title} className="group relative bg-gradient-to-b from-white to-[#E1F5FE] rounded-xl p-3 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_28px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 text-center">
                      <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                      <div className="w-9 h-9 mx-auto mb-2 rounded-xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center group-hover:bg-[#4FC3F7]/10 transition-colors">
                        <Icon className={`${color} text-base icon-wiggle`} />
                      </div>
                      <p className="font-bold text-[#0F4C5C] text-xs">{title}</p>
                      <p className="text-[#0A3A47]/75 text-[10px]">{desc}</p>
                    </div>
                  ))}
                </div>

                <Link to="/contact" className="btn-shine group inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 py-2.5 rounded-full font-bold shadow-[0_10px_24px_rgba(79,195,247,0.3)] hover:shadow-[0_14px_32px_rgba(79,195,247,0.4)] hover:-translate-y-0.5 transition-all duration-300 text-sm">
                  Request A Quote <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              <div className="relative order-first lg:order-last group">
                <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden">
                  <img src="/src/assets/home-image.png" alt="Pakistani Manpower Ready For Deployment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" onError={(e) => { e.target.style.display = "none"; }} />
                  <span className="img-shine" />
                </div>

                <div className="animate-gentle-float absolute top-4 left-4 bg-white/95 backdrop-blur rounded-full px-3 py-1.5 shadow-[0_8px_20px_rgba(15,76,92,0.12)] border border-[#4FC3F7]/25">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
                    <span className="text-[#0F4C5C] text-[10px] sm:text-xs font-bold">Ready To Deploy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="section-tight relative bg-gradient-to-b from-[#0F4C5C] via-[#0A3A47] to-[#06303A] overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#4FC3F7]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFD54F]/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5 mb-4 reveal-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
            <p className="text-[#4FC3F7] text-xs sm:text-sm font-bold tracking-wide uppercase">Why Choose Us</p>
          </div>

          <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-8 sm:mb-10 leading-tight reveal-up">
            Why Choose <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">Ali Hajveri International?</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-12 gap-y-6 sm:gap-y-8">
            {WHY_ITEMS.map(({ icon: Icon, title, desc, color }, idx) => (
              <div key={title} className="group relative flex gap-4 sm:gap-5 reveal-up" style={{ animationDelay: `${idx * 0.08}s` }}>
                <div className="relative w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-white/5 border border-[#4FC3F7]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4FC3F7]/15 group-hover:border-[#4FC3F7]/60 group-hover:shadow-[0_8px_22px_rgba(79,195,247,0.25)] transition-all duration-300">
                  <Icon className={`${color} text-base sm:text-lg group-hover:scale-110 icon-wiggle transition-transform duration-300`} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1.5 text-sm sm:text-base group-hover:text-[#FFD54F] transition-colors duration-300">{title}</h3>
                  <p className="text-white/75 text-xs sm:text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 reveal-up">
            <Link to="/services" className="btn-shine group inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 sm:px-7 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.35)] hover:shadow-[0_16px_38px_rgba(79,195,247,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base">
              Our Services <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ LICENSE & CEO ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* ===== LICENSE CARD ===== */}
            <div className="relative group reveal-up">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/20 to-transparent rounded-2xl sm:rounded-3xl rotate-2 scale-[1.01] hidden sm:block" />
              <div className="relative bg-gradient-to-br from-white via-[#E1F5FE] to-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_12px_36px_rgba(15,76,92,0.08)] border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_18px_44px_rgba(79,195,247,0.15)] transition-all duration-300 h-full flex flex-col items-center justify-between overflow-hidden">
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F]" />

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-full px-3 py-1.5 shadow-[0_8px_20px_rgba(15,76,92,0.10)] border border-[#4FC3F7]/25 flex items-center gap-1.5 z-10">
                  <FaCheckCircle className="text-[#22C55E] text-xs" />
                  <span className="text-[#0F4C5C] text-[10px] font-bold tracking-wide">
                    Verified
                  </span>
                </div>

                {/* License Image */}
                <div className="relative w-full flex-1 flex items-center justify-center py-3 sm:py-4">
                  <div className="absolute inset-0 bg-[#4FC3F7]/5 blur-2xl rounded-full" />
                  <img
                    src="/src/assets/license-1.png"
                    alt="Overseas Employment License"
                    className="relative w-[80%] max-h-[260px] sm:max-h-[340px] object-contain rounded-xl drop-shadow-[0_12px_28px_rgba(15,76,92,0.15)] group-hover:scale-[1.02] transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>

                {/* ===== FULL LICENSE DETAILS ===== */}
                <div className="w-full mt-3 border-t border-[#4FC3F7]/20 pt-4">
                  <div className="text-center mb-3">
                    <p className="text-[10px] sm:text-[11px] font-bold text-[#0A3A47]/60 uppercase tracking-widest mb-1">
                      License No.
                    </p>
                    <p className="text-[#29B6F6] font-extrabold text-sm sm:text-base tracking-wide">
                      OP&HRD/5224/LHR/2026
                    </p>
                  </div>

                  <div className="space-y-2 max-w-xs mx-auto">
                    <div className="flex items-center gap-2.5">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#4FC3F7]" />
                      <p className="text-[#0A3A47]/85 text-[11px] sm:text-xs font-semibold leading-snug">
                        Bureau Of Immigration &amp; Overseas Employment (BEOE)
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#4FC3F7]" />
                      <p className="text-[#0A3A47]/85 text-[11px] sm:text-xs font-semibold leading-snug">
                        Ministry Of Overseas Pakistanis &amp; Human Resource
                        Development
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#4FC3F7]" />
                      <p className="text-[#0A3A47]/85 text-[11px] sm:text-xs font-semibold leading-snug">
                        Government Of Pakistan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== CEO MESSAGE CARD ===== */}
            <div className="relative bg-gradient-to-br from-white via-[#E1F5FE] to-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_12px_36px_rgba(15,76,92,0.08)] border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/40 hover:shadow-[0_18px_44px_rgba(79,195,247,0.12)] transition-all duration-300 flex flex-col overflow-hidden reveal-up">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F]" />

              <div className="flex items-center gap-4 sm:gap-5 mb-4">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] p-[3px]">
                    <div className="w-full h-full rounded-full bg-white" />
                  </div>
                  <img
                    src="/src/assets/ceo.jpeg"
                    alt="CEO"
                    className="relative w-14 sm:w-16 h-14 sm:h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(15,76,92,0.15)]">
                    <FaCheckCircle className="text-[#22C55E] text-xs" />
                  </span>
                </div>
                <div>
                  <h3 className="font-[Plus_Jakarta_Sans] text-lg font-extrabold text-[#0F4C5C]">
                    Muhammad Ijaz
                  </h3>
                  <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                    Chief Executive Officer
                  </p>
                  <p className="text-[#0A3A47]/75 text-[10px] sm:text-xs">
                    Ali Hajveri International Pvt Ltd
                  </p>
                </div>
              </div>

              {/* No scroll — full text visible */}
              <div className="relative flex-1">
                <FaQuoteLeft className="text-[#4FC3F7]/20 text-3xl sm:text-4xl absolute -top-2 -left-2" />
                <div className="pl-6 sm:pl-8 pr-3 sm:pr-4">
                  <p className="text-[#0A3A47] leading-relaxed text-xs sm:text-sm mb-3 italic font-medium">
                    "I Would Like To Take This Opportunity To Extend My Good Wishes
                    To Our Esteemed Employers And Job Seekers Who Have Helped Us To
                    Become A Leading Man Power Recruitment Firm. It Has Become A
                    Cherished Name Among Job Seekers As Well As Foreign Employers."
                  </p>
                  <p className="text-[#0A3A47]/90 leading-relaxed text-xs sm:text-sm mb-3">
                    At Ali Hajveri International, There Is A Simple Philosophy At
                    Work; That Clients' Growth And Success Is Ultimately Our Growth
                    And Success. So We Are Always In Search Of Opportunities That
                    Will Make Our Valuable Clients Succeed.
                  </p>
                  <p className="text-[#0A3A47]/90 leading-relaxed text-xs sm:text-sm mb-3">
                    We Will Be Very Happy To Respond To Any Query Regarding Any
                    Information For Recruiting Workers From Pakistan. We Will
                    Continue To Provide Competent Manpower To Our Valuable Employers
                    To Their Entire Satisfaction. I Personally Assure You That Your
                    Requirements Will Be Looked After In The Best Possible Manner.
                  </p>
                  <p className="text-[#0A3A47]/90 leading-relaxed text-xs sm:text-sm">
                    I Am Also Grateful To All Mighty Allah And All My Team Members,
                    Because Without Them This Feat Would Not Have Been Possible.
                  </p>
                </div>
                <FaQuoteRight className="text-[#4FC3F7]/20 text-3xl sm:text-4xl absolute -bottom-2 -right-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RECRUITMENT SERVICES FOR INTERNATIONAL COUNTRIES ============ */}
      <section className="section-tight relative bg-[#E1F5FE] overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold tracking-wide uppercase">Global Reach</p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              Recruitment Services For <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">International Countries</span>
            </h2>
            <p className="text-[#0A3A47] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2 font-medium mt-2">
              Trusted Manpower Partner For Employers Across Gulf, Asia And Beyond.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-7 sm:gap-9 items-stretch">
            <div className="reveal-up order-2 lg:order-1">
              <div className="h-full max-h-[260px] sm:max-h-[300px] lg:max-h-[340px] overflow-y-auto no-scrollbar bg-gradient-to-b from-white via-[#E1F5FE] to-white rounded-2xl sm:rounded-3xl border border-[#4FC3F7]/20 shadow-[0_8px_28px_rgba(15,76,92,0.06)] hover:shadow-[0_18px_44px_rgba(79,195,247,0.12)] hover:border-[#4FC3F7]/40 transition-all duration-300 p-5 sm:p-6 relative">
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F]" />
                <p className="text-[#0A3A47] text-sm sm:text-base leading-relaxed mb-4">
                  Proudly, <span className="font-semibold text-[#0F4C5C]">Ali Hajveri International (Private) Limited</span> Provides Professional Manpower Recruitment And HR Consultancy Services To Employers Across International Markets. We Specialize In Sourcing Skilled, Semi-Skilled And Unskilled Pakistani Manpower For A Wide Range Of Industries And Job Categories Across Gulf, Asian And Other Countries.
                </p>
                <p className="text-[#0A3A47] text-sm sm:text-base leading-relaxed mb-4">
                  Over The Years, We Have Successfully Assisted Overseas Employers In Recruiting Pakistani Workers For Various Sectors, Including Construction, Engineering, Manufacturing, Security, Hospitality, Technical Trades And General Labor. Our Recent Recruitment Activities Include Successful Manpower Placements For Clients In <span className="font-semibold text-[#29B6F6]">China, Tajikistan And Kyrgyzstan</span>, While Continuing To Expand Our Services Across Other International Markets.
                </p>
                <p className="text-[#0A3A47] text-sm sm:text-base leading-relaxed">
                  With A Dedicated Recruitment Team And A Growing Network Of Qualified Candidates, Ali Hajveri International (Private) Limited Is Committed To Providing Reliable And Efficient Manpower Solutions To Overseas Employers.
                </p>

                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-[#4FC3F7]/20">
                  {["Tajikistan", "Kyrgyzstan", "Gulf Countries", "Asia"].map((country) => (
                    <span key={country} className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#0F4C5C] bg-[#4FC3F7]/12 border border-[#4FC3F7]/25 px-2.5 py-1 rounded-full">
                      <span className="w-1 h-1 rounded-full bg-[#4FC3F7]" />
                      {country}
                    </span>
                  ))}
                </div>

                <Link to="/contact" className="btn-shine group inline-flex items-center gap-2 mt-5 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold shadow-[0_10px_24px_rgba(79,195,247,0.3)] hover:shadow-[0_14px_32px_rgba(79,195,247,0.4)] hover:-translate-y-0.5 transition-all duration-300 text-sm">
                  Request Manpower <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 reveal-up group">
              <div className="relative h-full max-h-[260px] sm:max-h-[300px] lg:max-h-[340px] min-h-[220px] rounded-2xl sm:rounded-3xl overflow-hidden">
                <img src="/src/assets/map-img-2.png" alt="International Recruitment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" onError={(e) => { e.target.style.display = "none"; }} />
                <span className="img-shine" />
              </div>

              <div className="animate-gentle-float absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 bg-white rounded-2xl shadow-[0_16px_36px_rgba(15,76,92,0.12)] border border-[#4FC3F7]/25 px-3.5 py-2.5 max-w-[160px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-[#4FC3F7]/12 flex items-center justify-center">
                    <FaGlobe className="text-[#22C55E] text-[10px]" />
                  </span>
                  <p className="text-[#0F4C5C] font-bold text-[11px] sm:text-xs">Global Reach</p>
                </div>
                <p className="text-[#0A3A47] text-[9px] sm:text-[10px] leading-relaxed">Serving Employers Worldwide</p>
              </div>

              <div className="animate-gentle-float-slow absolute top-3 -right-2 sm:top-4 sm:-right-3 bg-gradient-to-r from-[#FFD54F] to-[#FFC107] text-[#0F4C5C] rounded-xl shadow-[0_12px_30px_rgba(255,213,79,0.35)] px-3 py-2 hidden md:block">
                <p className="text-[9px] uppercase tracking-wider opacity-90 font-semibold">Placing In</p>
                <p className="text-xs font-extrabold">25+ Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MISSION & VISION ============ */}
      <section className="section-tight relative bg-[#E1F5FE] overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold tracking-wide uppercase">Our Purpose</p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              Mission & <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">Vision</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            <div className="group relative bg-gradient-to-br from-white via-[#E1F5FE] to-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 shadow-[0_8px_28px_rgba(15,76,92,0.06)] hover:shadow-[0_18px_44px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden reveal-up">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center mb-4 group-hover:bg-[#4FC3F7]/10 transition-colors">
                <FaBullseye className="text-[#22C55E] text-xl sm:text-2xl group-hover:scale-110 icon-wiggle transition-transform duration-300" />
              </div>
              <h3 className="font-[Plus_Jakarta_Sans] text-xl sm:text-2xl font-extrabold text-[#0F4C5C] mb-3">Our Mission</h3>
              <p className="text-[#0A3A47] text-sm sm:text-base leading-relaxed">
                To Deliver Dependable Overseas Recruitment Solutions That Help Employers Build Productive Teams, While Creating Meaningful International Career Opportunities For Pakistani Talent.
              </p>
            </div>

            <div className="group relative bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-white hover:shadow-[0_20px_48px_rgba(15,76,92,0.35)] hover:-translate-y-1 transition-all duration-300 overflow-hidden reveal-up reveal-up-delay-1">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#4FC3F7]/20 blur-3xl" />
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F]" />
              <div className="relative w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 flex items-center justify-center mb-4 group-hover:bg-[#4FC3F7]/25 transition-colors">
                <FaEye className="text-[#FFB300] text-xl sm:text-2xl group-hover:scale-110 icon-wiggle transition-transform duration-300" />
              </div>
              <h3 className="relative font-[Plus_Jakarta_Sans] text-xl sm:text-2xl font-extrabold mb-3">
                Our <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">Vision</span>
              </h3>
              <p className="relative text-white/85 text-sm sm:text-base leading-relaxed">
                To Become A Trusted International Manpower Partner Known For Quality Recruitment, Responsible Deployment And Long-Term Employer Relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EMPLOYER CTA ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-8 sm:py-10 text-center overflow-hidden border border-[#4FC3F7]/25 shadow-[0_24px_60px_rgba(15,76,92,0.25)] reveal-up">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#4FC3F7]/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-[#FFD54F]/10 blur-3xl" />

            <div className="absolute top-6 left-6 grid grid-cols-4 gap-1.5 opacity-30 hidden sm:grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7]" />
              ))}
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
                <span className="text-[#4FC3F7] text-[10px] sm:text-xs font-bold tracking-widest uppercase">Ready To Hire</span>
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
                Looking For Reliable <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">Manpower From Pakistan?</span>
              </h2>

              <p className="text-white/80 text-sm sm:text-base mb-6 leading-relaxed">
                Share Your Workforce Requirements With Our Recruitment Team And Let Us Help You Connect With Suitable Pakistani Candidates.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/contact" className="btn-shine group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 sm:px-8 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.35)] hover:shadow-[0_16px_38px_rgba(79,195,247,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base">
                  Request Manpower <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link to="/contact" className="btn-shine inline-flex items-center justify-center gap-2 border border-[#4FC3F7]/40 text-[#4FC3F7] px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-[#4FC3F7]/10 hover:border-[#4FC3F7]/70 transition-all duration-300 text-sm sm:text-base">
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL SECTION ============ */}
      <section className="relative mb-5 section-tight bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: "url(/src/assets/footer.png)", backgroundColor: "#0F4C5C" }}>
        <div className="absolute inset-0 bg-[#0F4C5C]/70" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#4FC3F7]/12 blur-3xl animate-float-slow" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#FFD54F]/10 blur-3xl animate-float-slower" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#4FC3F7]/6 blur-3xl animate-pulse-slow" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 animate-fade-up">
            The Right People. <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">The Right Opportunities.</span>
          </h2>

          <p className="text-white/80 mb-7 sm:mb-8 leading-relaxed text-sm sm:text-base animate-fade-up-delayed">
            From Manpower Requirements To Successful Deployment, {COMPANY_INFO?.fullName || "Ali Hajveri International"} Works To Connect International Employers With Suitable Manpower From Pakistan Through A Professional And Structured Recruitment Process.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-up-delayed-2">
            <Link to="/contact" className="btn-shine group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:shadow-[0_16px_36px_rgba(79,195,247,0.5)] shadow-[0_12px_28px_rgba(79,195,247,0.35)] hover:-translate-y-1 transform transition-all duration-300 text-sm sm:text-base">
              Request Manpower <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:bg-white hover:text-[#0F4C5C] hover:border-white transition-all duration-300 hover:-translate-y-1 transform text-sm sm:text-base">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .section-tight {
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
        @media (min-width: 640px) {
          .section-tight {
            padding-top: 3.5rem;
            padding-bottom: 3.5rem;
          }
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee-left { animation: marquee-left 40s linear infinite; }
        .animate-marquee-left:hover { animation-play-state: paused; }

        @keyframes float-slow { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(20px, -20px) scale(1.1); } 66% { transform: translate(-10px, 15px) scale(0.9); } }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }

        @keyframes float-slower { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-25px, 25px) scale(1.15); } }
        .animate-float-slower { animation: float-slower 16s ease-in-out infinite; }

        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }

        @keyframes fade-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fade-up 0.8s ease-out forwards; }
        .animate-fade-up-delayed { animation: fade-up 0.8s ease-out 0.3s forwards; opacity: 0; }
        .animate-fade-up-delayed-2 { animation: fade-up 0.8s ease-out 0.6s forwards; opacity: 0; }

        @keyframes ping-slow { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.6); opacity: 0.5; } }
        .animate-ping-slow { animation: ping-slow 2s ease-in-out infinite; }

        @keyframes reveal-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .reveal-up { animation: reveal-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .reveal-up-delay-1 { animation-delay: 0.1s; }
        .reveal-up-delay-2 { animation-delay: 0.2s; }
        .reveal-up-delay-3 { animation-delay: 0.3s; }

        @keyframes shine { 0% { transform: translateX(-120%) skewX(-20deg); } 100% { transform: translateX(220%) skewX(-20deg); } }
        .btn-shine { position: relative; overflow: hidden; isolation: isolate; }
        .btn-shine::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent); transform: translateX(-120%) skewX(-20deg); pointer-events: none; z-index: 1; }
        .btn-shine:hover::after { animation: shine 0.9s ease-out; }

        .img-shine { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 2; }
        .img-shine::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent); transform: translateX(-120%) skewX(-20deg); }
        .group:hover .img-shine::after { animation: shine 1s ease-out; }

        @keyframes icon-wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-6deg); } 75% { transform: rotate(6deg); } }
        .group:hover .icon-wiggle { animation: icon-wiggle 0.5s ease-in-out; }

        @keyframes gold-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(79,195,247,0.45); } 70% { box-shadow: 0 0 0 10px rgba(79,195,247,0); } }
        .animate-gold-pulse { animation: gold-pulse 2s cubic-bezier(0.66, 0, 0, 1) infinite; }

        @keyframes gentle-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .animate-gentle-float { animation: gentle-float 5s ease-in-out infinite; }
        .animate-gentle-float-slow { animation: gentle-float 7s ease-in-out infinite; }

        @keyframes line-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .line-grow { transform-origin: left; animation: line-grow 1.2s ease-out both; }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left, .animate-float-slow, .animate-float-slower,
          .animate-pulse-slow, .animate-fade-up, .animate-fade-up-delayed,
          .animate-fade-up-delayed-2, .animate-ping-slow, .reveal-up,
          .btn-shine::after, .img-shine::after, .icon-wiggle,
          .animate-gold-pulse, .animate-gentle-float,
          .animate-gentle-float-slow, .line-grow { animation: none !important; }
          .animate-fade-up, .animate-fade-up-delayed, .animate-fade-up-delayed-2, .reveal-up { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </>
  );
};

export default Home;