// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt, FaHandshake, FaUsers, FaMapMarkerAlt, FaCertificate,
  FaTrophy, FaArrowRight, FaCheckCircle, FaBalanceScale, FaFileContract,
  FaLandmark, FaGavel, FaClipboardCheck, FaUserShield, FaAward, FaHeart,
  FaBullseye, FaEye, FaIdCard, FaBuilding, FaSearch, FaUserCheck,
  FaQuoteLeft, FaQuoteRight, FaGlobe,
} from "react-icons/fa";
import { COMPANY_INFO } from "../utilis/constants";

/* ============================================================
   DATA
============================================================ */
const CORPORATE_FACTS = [
  { icon: FaBuilding, label: "Company Name", value: "Ali Hajveri International (Private) Limited", color: "text-[#4FC3F7]" },
  { icon: FaIdCard, label: "Nature Of Business", value: "Human Resource Recruitment & Workforce Solutions", color: "text-[#22C55E]" },
  { icon: FaLandmark, label: "Corporate Status", value: "Private Limited Company", color: "text-[#FFB300]" },
  { icon: FaMapMarkerAlt, label: "Registered Office", value: "Office No. 1, 2nd Floor, Hajveri Plaza, Main Rajbah Road, Near Quaid-E-Azam Interchange, Dera Gujran, Lahore, Pakistan", color: "text-[#8B5CF6]" },
];

const CORE_VALUES = [
  { icon: FaBalanceScale, title: "Integrity" },
  { icon: FaAward, title: "Professionalism" },
  { icon: FaGavel, title: "Compliance" },
  { icon: FaClipboardCheck, title: "Quality Selection" },
  { icon: FaUserShield, title: "Responsibility" },
  { icon: FaHandshake, title: "Employer Commitment" },
  { icon: FaHeart, title: "Candidate Welfare" },
];

const SKILL_STEPS = [
  { from: "Un-Skilled", to: "Semi-Skilled" },
  { from: "Semi-Skilled", to: "Skilled" },
];

const TRAINING_CITIES = ["Lahore", "Karachi", "Islamabad", "Faisalabad", "Multan", "Peshawar"];

const STAT_CHIPS = [
  { icon: FaTrophy, label: "15+ Years Experience", color: "text-[#FFB300]" },
  { icon: FaUsers, label: "4,500+ Workers Placed", color: "text-[#4FC3F7]" },
  { icon: FaMapMarkerAlt, label: "25+ Countries", color: "text-[#22C55E]" },
];

const TRUST_ITEMS = [
  { icon: FaShieldAlt, title: "Government Licensed", desc: "Registered Overseas Employment Promoter Under Government Of Pakistan.", color: "text-[#FFB300]" },
  { icon: FaClipboardCheck, title: "Structured Process", desc: "Documented Screening, Testing, And Deployment At Every Stage.", color: "text-[#22C55E]" },
  { icon: FaUserCheck, title: "Screened Candidates", desc: "Every Candidate Verified Against Employer Requirements.", color: "text-[#4FC3F7]" },
  { icon: FaHandshake, title: "Long-Term Partners", desc: "Built On Repeat Business And Lasting Employer Relationships.", color: "text-[#A78BFA]" },
];

const LICENSE_STEPS = [
  { num: "01", title: "Open Beoe Website", desc: "Visit The Official Bureau Of Emigration & Overseas Employment Portal." },
  { num: "02", title: "Find 'Verify Oep License'", desc: "Locate The License Verification Section On The Portal." },
  { num: "03", title: "Enter Our License Number", desc: `Enter License #${COMPANY_INFO.license} In The Search Field.` },
  { num: "04", title: "Confirm Our Details", desc: "Verify Our Company Name, Address, And Active Status Appear." },
];

const SOURCING_STEPS = [
  { icon: FaSearch, title: "Requirement Analysis", desc: "We Understand The Role, Trade, Qualifications, And Headcount Required.", color: "text-[#4FC3F7]" },
  { icon: FaUsers, title: "Candidate Sourcing", desc: "We Source From Our Database, Network, And Campaigns Across Pakistan.", color: "text-[#22C55E]" },
  { icon: FaClipboardCheck, title: "Screening & Shortlisting", desc: "Profiles Checked Against Experience, Certifications, And Job Brief.", color: "text-[#FFB300]" },
  { icon: FaUserCheck, title: "Testing & Interview", desc: "Trade Tests And Employer Interviews Coordinated Where Required.", color: "text-[#A78BFA]" },
];

const PREMIER_PARTNERS = [
  { name: "Partner 1", src: "/src/assets/logos/c-logo-1.png" },
  { name: "Partner 2", src: "/src/assets/logos/c-logo-2.png" },
  { name: "Partner 3", src: "/src/assets/logos/c-logo-3.png" },
  { name: "Partner 4", src: "/src/assets/logos/c-logo-4.png" },
  { name: "Partner 5", src: "/src/assets/logos/c-logo-5.png" },
  { name: "Partner 6", src: "/src/assets/logos/c-logo-6.png" },
  { name: "Partner 7", src: "/src/assets/logos/c-logo-7.png" },
  { name: "Partner 8", src: "/src/assets/logos/c-logo-8.png" },
];

const SERVED_COUNTRIES = [
  { name: "Saudi Arabia", flag: "🇸🇦", img: "/src/assets/countries/saudia.png" },
  { name: "Bahrain", flag: "🇧🇭", img: "/src/assets/countries/bahrain.png" },
  { name: "China", flag: "🇨🇳", img: "/src/assets/countries/china.png" },
  { name: "Kazakhstan", flag: "🇰🇿", img: "/src/assets/countries/kazakhstan.png" },
  { name: "Kyrgyzstan", flag: "🇰🇬", img: "/src/assets/countries/krygyzstan.png" },
  { name: "Oman", flag: "🇴🇲", img: "/src/assets/countries/oman.png" },
  { name: "Qatar", flag: "🇶🇦", img: "/src/assets/countries/qatar.png" },
  { name: "Romania", flag: "🇷🇴", img: "/src/assets/countries/romania.png" },
  { name: "Tajikistan", flag: "🇹🇯", img: "/src/assets/countries/tajikistan.png" },
  { name: "Turkmenistan", flag: "🇹🇲", img: "/src/assets/countries/turkmanistan.png" },
  { name: "Uae", flag: "🇦🇪", img: "/src/assets/countries/uae.png" },
  { name: "Uzbekistan", flag: "🇺🇿", img: "/src/assets/countries/uzbekistan.png" },
];

/* ============================================================
   PAGE
============================================================ */
const About = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ============ 1. HERO ============ */}
      <section className="relative mt-[17px] section-tight overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/src/assets/about-hero-img.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C5C]/10 via-[#0A3A47]/25 to-[#06303A]/30" />
        <div className="absolute inset-0 bg-[#0F4C5C]/25" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />

        <div className="absolute -top-32 -right-40 w-[280px] h-[280px] rounded-full bg-[#4FC3F7]/15 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[260px] h-[260px] rounded-full bg-[#FFD54F]/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/15 backdrop-blur-md border border-[#4FC3F7]/50 rounded-full px-3.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-ping-slow" />
            <span className="text-white text-xs sm:text-sm font-bold">
              Oep Since {COMPANY_INFO.established}
            </span>
          </div>

          <h1 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-4 [text-shadow:_0_2px_12px_rgba(0,0,0,0.6)]">
            Built On A Formal And{" "}
            <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
              Compliant Foundation
            </span>
          </h1>

          <p
            className="text-white/95 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6 font-medium"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.85), 0 2px 6px rgba(15,76,92,0.7)" }}
          >
            {COMPANY_INFO.fullName} Combines Corporate Registration, Overseas
            Employment Authorization And A Structured Recruitment Process Into
            One Accountable Organization.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="btn-shine group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 sm:px-7 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_16px_38px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
            >
              Request Manpower
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/process"
              className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-md border-2 border-white/70 text-white px-6 sm:px-7 py-3 rounded-full font-bold hover:bg-white hover:text-[#0F4C5C] transition-all duration-300 text-sm sm:text-base"
            >
              Explore Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 2. WHO WE ARE ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div className="relative reveal-up group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/20 to-transparent rounded-2xl sm:rounded-3xl rotate-3 scale-[1.02] hidden sm:block" />
              <div className="relative h-[280px] sm:h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#4FC3F7]/20 shadow-[0_20px_50px_rgba(15,76,92,0.15)]">
                <img
                  src="/src/assets/about.png"
                  alt="Ali Hajveri International Team"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <span className="img-shine" />
              </div>
            </div>

            <div className="reveal-up">
              <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
                <p className="text-[#29B6F6] text-xs sm:text-sm font-bold tracking-wide uppercase">
                  Who We Are
                </p>
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-3 leading-tight">
                A Structured Recruitment{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                  Organization
                </span>
              </h2>

              <p className="text-[#0A3A47] text-sm sm:text-base mb-3 leading-relaxed font-medium">
                {COMPANY_INFO.fullName} Is An Overseas Manpower Recruitment
                Company Built To Connect International Employers With Capable
                Pakistani Professionals, Technicians And Workforce.
              </p>
              <p className="text-[#0A3A47]/90 text-sm sm:text-base mb-4 leading-relaxed">
                From A Single Specialist Requirement To Large Project
                Mobilization, We Manage Recruitment With Structured Screening,
                Technical Evaluation, Documentation And Deployment Support.
              </p>

              <div className="flex flex-wrap gap-2">
                {STAT_CHIPS.map(({ icon: Icon, label, color }) => (
                  <span
                    key={label}
                    className="flex items-center gap-2 bg-gradient-to-b from-white to-[#E1F5FE] border border-[#4FC3F7]/20 px-3 py-1.5 rounded-full text-xs font-bold text-[#0F4C5C]"
                  >
                    <Icon className={`${color} text-xs`} /> {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. WHY OTHER COMPANIES TRUST US ============ */}
      <section className="section-tight relative bg-gradient-to-b from-[#0F4C5C] via-[#0A3A47] to-[#06303A] overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[280px] h-[280px] rounded-full bg-[#4FC3F7]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[260px] h-[260px] rounded-full bg-[#FFD54F]/8 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#4FC3F7] text-xs sm:text-sm font-bold tracking-wide uppercase">
                Trusted Worldwide
              </p>
            </div>

            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
              Why Other Companies{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Trust Us
              </span>
            </h2>

            <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Every Placement Is Delivered Through A Structured, Compliant, And
              Transparent Recruitment Process.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {TRUST_ITEMS.map(({ icon: Icon, title, desc, color }, idx) => (
              <div
                key={title}
                className="group relative bg-white/5 backdrop-blur border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 rounded-2xl p-5 transition-all duration-300 hover:bg-white/10 reveal-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 flex items-center justify-center mb-3 group-hover:bg-[#4FC3F7]/25 transition-colors">
                  <Icon className={`${color} text-base icon-wiggle`} />
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base mb-1.5 group-hover:text-[#FFD54F] transition-colors">
                  {title}
                </h3>
                <p className="text-white/75 text-xs sm:text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. CORPORATE IDENTITY ============ */}
      <section className="section-tight relative bg-[#E1F5FE] overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold tracking-wide uppercase">
                Corporate Identity
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              The Organization Behind The{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Recruitment
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {CORPORATE_FACTS.map(({ icon: Icon, label, value, color }, idx) => (
              <div
                key={label}
                className="group relative bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 reveal-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="w-10 h-10 rounded-xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4FC3F7]/10 transition-colors">
                  <Icon className={`${color} text-base icon-wiggle`} />
                </div>
                <div>
                  <p className="text-[#29B6F6] text-[10px] sm:text-xs font-bold mb-1 uppercase tracking-wide">
                    {label}
                  </p>
                  <p className="text-[#0F4C5C] font-bold text-sm leading-snug">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* License Card */}
          <div className="mt-6 flex items-center justify-center reveal-up">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0F4C5C] to-[#0A3A47] border border-[#4FC3F7]/40 px-5 py-3 rounded-2xl shadow-[0_12px_30px_rgba(15,76,92,0.25)]">
              <FaCertificate className="text-[#FFB300] text-xl flex-shrink-0" />
              <div>
                <p className="font-bold text-white text-xs sm:text-sm">
                  Overseas Employment License #{COMPANY_INFO.license}
                </p>
                <p className="text-[#FFD54F] text-[10px] sm:text-xs">
                  Issued By Government Of Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. HOW TO CHECK OUR LICENSE ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <FaShieldAlt className="text-[#22C55E] text-xs" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold tracking-wide uppercase">
                Verify Our License
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              How To Check Our{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                License Number
              </span>
            </h2>
            <p className="text-[#0A3A47] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2 font-medium mt-2">
              Verify Our Oep License On The Official Beoe Portal In 4 Simple Steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LICENSE_STEPS.map((step, idx) => (
              <div
                key={step.num}
                className="group relative bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 reveal-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] flex items-center justify-center font-extrabold text-xs shadow-[0_8px_20px_rgba(79,195,247,0.35)] mb-3">
                  {step.num}
                </div>
                <h3 className="font-bold text-[#0F4C5C] text-xs sm:text-sm mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[#0A3A47]/80 text-[11px] sm:text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. CANDIDATE SOURCING ============ */}
      <section className="section-tight relative bg-[#E1F5FE] overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold tracking-wide uppercase">
                Candidate Sourcing
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              How We Find The{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Right People
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOURCING_STEPS.map(({ icon: Icon, title, desc, color }, idx) => (
              <div
                key={title}
                className="group relative bg-white rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 reveal-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <div className="w-10 h-10 rounded-xl bg-[#4FC3F7]/12 flex items-center justify-center mb-3 group-hover:bg-[#4FC3F7]/20 transition-colors">
                  <Icon className={`${color} text-base icon-wiggle`} />
                </div>
                <h3 className="font-bold text-[#0F4C5C] text-xs sm:text-sm mb-1.5">
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

      {/* ============ 7. OUR PREMIER PARTNERS ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold tracking-wide uppercase">
                Our Premier Partners
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              Trusted By Employers{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PREMIER_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="group flex items-center justify-center bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 p-5 h-[90px] sm:h-[110px] transition-all duration-300 hover:shadow-[0_14px_34px_rgba(79,195,247,0.15)] hover:-translate-y-1"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 8. COUNTRIES WE SERVED — MARQUEE ============ */}
      <section className="section-tight relative bg-[#E1F5FE] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-7">
          <div className="text-center reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold tracking-wide uppercase">
                Global Reach
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              Countries We{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Served
              </span>
            </h2>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-[#E1F5FE] to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-[#E1F5FE] to-transparent z-10" />

          <div className="flex flex-nowrap items-center gap-5 animate-marquee-left w-max py-4">
            {[...SERVED_COUNTRIES, ...SERVED_COUNTRIES].map((country, idx) => (
              <div key={`${country.name}-${idx}`} className="flex-shrink-0 flex flex-col items-center gap-2 group">
                <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden border-2 border-[#4FC3F7]/30 group-hover:border-[#FFD54F]/70 bg-white shadow-[0_8px_24px_rgba(15,76,92,0.08)] group-hover:shadow-[0_14px_34px_rgba(79,195,247,0.25)] group-hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                  <img
                    src={country.img}
                    alt={country.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `<span class="text-4xl">${country.flag}</span>`;
                    }}
                  />
                </div>
                <span className="text-[#0F4C5C] text-[11px] sm:text-xs font-bold whitespace-nowrap group-hover:text-[#29B6F6] transition-colors duration-300">
                  {country.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 9. LICENSE & CEO ============ */}
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

      {/* ============ 10. GENERAL DIRECTOR MESSAGE ============ */}
      <section className="section-tight relative bg-[#E1F5FE] overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Message */}
            <div className="md:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 relative overflow-hidden order-2 md:order-1 border border-[#4FC3F7]/20 shadow-[0_8px_28px_rgba(15,76,92,0.06)] reveal-up">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F]" />
              <FaQuoteLeft className="text-[#4FC3F7]/20 text-4xl absolute top-4 left-4" />
              <div className="relative pt-6">
                <p className="text-[#29B6F6] text-xs sm:text-sm font-bold tracking-wide uppercase mb-2">
                  A Few Words From General Director Muhammad Bilal
                </p>
                <h2 className="font-[Plus_Jakarta_Sans] text-lg sm:text-2xl font-extrabold text-[#0F4C5C] mb-3 leading-tight">
                  Committed To{" "}
                  <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                    Excellence
                  </span>
                </h2>
                <p className="text-[#0A3A47] leading-relaxed text-xs sm:text-sm mb-3 italic font-medium">
                  "Most Agencies Will Tell You What You Want To Hear, But We Are A
                  Little Different. We Believe In{" "}
                  <span className="text-[#29B6F6] font-extrabold not-italic">
                    EXCELLENCE
                  </span>
                  ! We Are Doing Our Job With Professionalism And Dedication."
                </p>
                <p className="text-[#0A3A47]/90 leading-relaxed text-xs sm:text-sm">
                  At Ali Hajveri International, We Have The Know-How And Expertise,
                  The Right Tools And Proven Practices, And Access To A Huge Source
                  Of Job Seekers To Make Sure That You Get The Right Candidate For
                  Your Opening.
                </p>
              </div>
              <FaQuoteRight className="text-[#4FC3F7]/20 text-4xl absolute bottom-4 right-4" />
            </div>

            {/* Photo - Muhammad Bilal */}
            <div className="md:col-span-1 order-1 md:order-2 reveal-up group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/20 to-transparent rounded-2xl sm:rounded-3xl -rotate-3 scale-[1.02] hidden sm:block" />
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#4FC3F7]/20 shadow-[0_14px_40px_rgba(15,76,92,0.12)]">
                <img
                  src="/src/assets/licensed-img.png"
                  alt="Muhammad Bilal - General Director"
                  className="w-full h-[260px] sm:h-[320px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <span className="img-shine" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 11. WE DON'T JUST RECRUIT ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-7 sm:gap-9 items-center">
            <div className="reveal-up">
              <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
                <p className="text-[#29B6F6] text-xs sm:text-sm font-bold tracking-wide uppercase">
                  Skill Development
                </p>
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-3 leading-tight">
                We Don'T Just Recruit — We{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                  Develop Talent
                </span>
              </h2>

              <p className="text-[#0A3A47] text-sm sm:text-base mb-4 leading-relaxed font-medium">
                Through Our Associated Technical Training Institutes In Cities
                Across Pakistan, We Upgrade Workers Step By Step Before
                They'Re Deployed For Overseas Recruitment.
              </p>

              <div className="space-y-2.5">
                {SKILL_STEPS.map((step) => (
                  <div
                    key={step.from}
                    className="flex items-center gap-3 bg-gradient-to-b from-white to-[#E1F5FE] p-3 rounded-xl border border-[#4FC3F7]/20"
                  >
                    <span className="font-bold text-[#0A3A47] text-xs sm:text-sm">
                      {step.from}
                    </span>
                    <FaArrowRight className="text-[#29B6F6] flex-shrink-0 text-xs" />
                    <span className="font-bold text-[#0F4C5C] text-xs sm:text-sm">
                      {step.to}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-3 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] p-3 rounded-xl shadow-[0_10px_26px_rgba(79,195,247,0.3)]">
                  <FaCheckCircle className="text-[#22C55E] flex-shrink-0 text-base" />
                  <span className="text-[#0F4C5C] text-xs sm:text-sm font-bold">
                    Deployed For Overseas Recruitment As Per Employer Standards
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white via-[#E1F5FE] to-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#4FC3F7]/20 shadow-[0_8px_28px_rgba(15,76,92,0.06)] reveal-up">
              <h3 className="font-[Plus_Jakarta_Sans] text-base sm:text-lg font-extrabold text-[#0F4C5C] mb-1">
                Our Training Network
              </h3>
              <p className="text-[#0A3A47]/70 text-xs sm:text-sm mb-4 font-medium">
                Associated Institutes In:
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {TRAINING_CITIES.map((city) => (
                  <div
                    key={city}
                    className="bg-white p-3 rounded-xl text-center text-xs sm:text-sm font-bold text-[#0F4C5C] border border-[#4FC3F7]/15 hover:border-[#4FC3F7]/50 hover:text-[#29B6F6] transition-all duration-300"
                  >
                    {city}
                  </div>
                ))}
              </div>
            </div>
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

        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-left:hover {
          animation-play-state: paused;
        }

        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.5; }
        }
        .animate-ping-slow { animation: ping-slow 2s ease-in-out infinite; }

        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reveal-up {
          animation: reveal-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes shine {
          0%   { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(220%)  skewX(-20deg); }
        }
        .btn-shine {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .btn-shine::after {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: translateX(-120%) skewX(-20deg);
          pointer-events: none;
          z-index: 1;
        }
        .btn-shine:hover::after {
          animation: shine 0.9s ease-out;
        }

        .img-shine {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 2;
        }
        .img-shine::after {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
          transform: translateX(-120%) skewX(-20deg);
        }
        .group:hover .img-shine::after {
          animation: shine 1s ease-out;
        }

        @keyframes icon-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25%      { transform: rotate(-6deg); }
          75%      { transform: rotate(6deg); }
        }
        .group:hover .icon-wiggle {
          animation: icon-wiggle 0.5s ease-in-out;
        }

        @keyframes gold-pulse {
          0%, 100% { box-shadow: 0 0 0 0   rgba(79,195,247,0.45); }
          70%      { box-shadow: 0 0 0 10px rgba(79,195,247,0);    }
        }
        .animate-gold-pulse {
          animation: gold-pulse 2s cubic-bezier(0.66, 0, 0, 1) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left, .animate-ping-slow, .reveal-up,
          .btn-shine::after, .img-shine::after, .icon-wiggle,
          .animate-gold-pulse {
            animation: none !important;
          }
          .reveal-up {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;