// src/pages/Services.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardCheck, FaUserCheck, FaFileContract, FaPlaneDeparture,
  FaHeadset, FaGraduationCap, FaArrowRight, FaCheckCircle, FaShip,
  FaHospital, FaUtensils, FaCogs, FaIndustry, FaTruck, FaCar,
  FaSeedling, FaFlask, FaCamera, FaBuilding, FaLaptop, FaChartLine,
  FaPhone, FaGlobeAsia, FaUsers, FaHardHat,
  FaComments, FaShieldAlt, FaCertificate, FaSearch, FaUserTie,
  FaFileSignature, FaStethoscope, FaPassport, FaPlane, FaSyncAlt,
  FaLayerGroup, FaHandshake, FaStar,
} from "react-icons/fa";

/* ============================================================
   DATA
============================================================ */
const CORE_SERVICES = [
  { icon: FaClipboardCheck, title: "Manpower Planning", desc: "Realistic Feasibility Advice On Your Workforce Needs, Including Salary Expectations And Benefits For The Roles You'Re Hiring.", color: "text-[#4FC3F7]" },
  { icon: FaUserCheck, title: "Sourcing & Screening", desc: "Comprehensive Candidate Profiles With Verified Credentials, Sourced From Within Pakistan, With Your Team Involved In Every Selection Decision.", color: "text-[#22C55E]" },
  { icon: FaFileContract, title: "Contract & Documentation", desc: "Full Support During Contract Negotiation, Plus Visa Endorsement And All Required Paperwork.", color: "text-[#FFB300]" },
  { icon: FaPlaneDeparture, title: "Travel & Deployment", desc: "Coordinated Travel Arrangements And Onboarding So Your Workforce Arrives From Pakistan Ready To Work.", color: "text-[#29B6F6]" },
  { icon: FaGraduationCap, title: "Skill Upgrading", desc: "Access To Our Training Institutes To Move Workers From Unskilled To Semi-Skilled To Skilled Before Deployment.", color: "text-[#29B6F6]" },
  { icon: FaHeadset, title: "Post-Placement Support", desc: "Dedicated Case Handling And Follow-Up After Deployment For Both Employer And Worker.", color: "text-[#4FC3F7]" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Requirement Shared", desc: "You Send Us The Role, Trade, Headcount And Destination." },
  { num: "02", title: "Sourced In Pakistan", desc: "Matching Candidates Identified From Our Talent Pool." },
  { num: "03", title: "Screened & Tested", desc: "Profiles Verified And, Where Relevant, Trade-Tested." },
  { num: "04", title: "Interviewed", desc: "You Interview And Approve The Shortlist Directly." },
  { num: "05", title: "Documented", desc: "Contracts, Visas And Travel Paperwork Are Completed." },
  { num: "06", title: "Deployed Overseas", desc: "Workers Travel From Pakistan And Report To Your Site." },
];

const WORKFORCE_CATEGORIES = [
  { level: "Skilled", letter: "S", examples: "Engineers, Technicians, Machine Operators, Supervisors", color: "text-[#4FC3F7]" },
  { level: "Semi-Skilled", letter: "M", examples: "Assemblers, Drivers, Draftsmen, Quality Control Staff", color: "text-[#FFB300]" },
  { level: "Unskilled", letter: "B", examples: "Labourers, Helpers, Loaders, General Workers", color: "text-[#22C55E]" },
];

const INDUSTRIES = [
  { name: "Import / Export", icon: FaShip, img: "/assets/industries/industry-1.png" },
  { name: "Medical & Healthcare", icon: FaHospital, img: "/assets/industries/industry-2.png" },
  { name: "Hotels & Restaurants", icon: FaUtensils, img: "/assets/industries/industry-3.png" },
  { name: "Garments & FMCG", icon: FaCogs, img: "/assets/industries/industry-4.png" },
  { name: "Industrial Automation", icon: FaIndustry, img: "/assets/industries/industry-5.png" },
  { name: "Shipping & Logistics", icon: FaTruck, img: "/assets/industries/industry-6.png" },
  { name: "Automotives", icon: FaCar, img: "/assets/industries/industry-7.png" },
  { name: "Agriculture", icon: FaSeedling, img: "/assets/industries/industry-8.png" },
  { name: "Petrochemical", icon: FaFlask, img: "/assets/industries/industry-9.png" },
  { name: "Security & Surveillance", icon: FaCamera, img: "/assets/industries/industry-10.png" },
  { name: "Construction & Planning", icon: FaBuilding, img: "/assets/industries/industry-11.png" },
  { name: "Computer & IT", icon: FaLaptop, img: "/assets/industries/industry-12.png" },
  { name: "Finance & Accounts", icon: FaChartLine, img: "/assets/industries/industry-13.png" },
  { name: "Telecommunication", icon: FaPhone, img: "/assets/industries/industry-14.png" },
];

const DESTINATION_COUNTRIES = [
  { name: "Tajikistan", flag: "🇹🇯", note: "Infrastructure, Industrial & Technical Roles" },
  { name: "United Arab Emirates", flag: "🇦🇪", note: "Infrastructure, Hospitality & Trades" },
  { name: "Qatar", flag: "🇶🇦", note: "Construction & Facilities Workforce" },
  { name: "Oman", flag: "🇴🇲", note: "Technical & General Manpower" },
  { name: "Kuwait", flag: "🇰🇼", note: "Skilled & Semi-Skilled Trades" },
  { name: "Bahrain", flag: "🇧🇭", note: "General & Professional Staff" },
];

const GALLERY_IMAGES = [
  { src: "/assets/gallery-site.png", alt: "Workers On An Active Construction Site", caption: "On-Site Trades & Construction Manpower" },
  { src: "/assets/gallery-interview.png", alt: "Candidate Interview Session", caption: "Employer Interviews & Assessments" },
  { src: "/assets/gallery-documents.png", alt: "Passport And Travel Documentation", caption: "Documentation & Compliance Support" },
  { src: "/assets/gallery-departure.png", alt: "Workers Departing For Overseas Deployment", caption: "Pre-Departure & Mobilization" },
];

const WHY_CHIPS = [
  { icon: FaGlobeAsia, label: "Sourced Only From Pakistan", color: "text-[#4FC3F7]" },
  { icon: FaUsers, label: "4,500+ Workers Placed", color: "text-[#22C55E]" },
  { icon: FaHardHat, label: "Every Skill Tier Covered", color: "text-[#FFB300]" },
  { icon: FaComments, label: "Direct Employer Involvement", color: "text-[#29B6F6]" },
];

const FAQS = [
  { q: "How Long Does A Typical Placement Take?", a: "Most Roles Are Filled Within 3–6 Weeks From Confirmed Requirement To Visa Processing, Depending On The Destination Country And Skill Level Required." },
  { q: "Do You Handle Visa And Travel Arrangements?", a: "Yes — Our Documentation Team Manages Visa Endorsement, Medical Clearance, And Travel Booking From Pakistan As Part Of Every Placement." },
  { q: "Can Workers Be Upgraded In Skill Level Before Deployment?", a: "Yes, Through Our Associated Training Institutes, We Can Move A Candidate From Unskilled To Semi-Skilled Or Semi-Skilled To Skilled Ahead Of Deployment." },
  { q: "What Happens After The Worker Is Deployed?", a: "We Stay In Contact With Both Employer And Worker For Post-Placement Follow-Up, Resolving Any Issues That Come Up During The Contract Period." },
  { q: "Which Countries Do You Deploy Workers To?", a: "We Currently Place Pakistani Manpower Across Saudi Arabia, The UAE, Qatar, Oman, Kuwait And Bahrain, Based On Active Employer Requirements." },
];

const COMPLIANCE_ITEMS = [
  { icon: FaShieldAlt, title: "Registered & Licensed", desc: "Incorporated Under The Companies Act 2017 With A Valid Overseas Employment Promoter License.", color: "text-[#22C55E]" },
  { icon: FaCertificate, title: "Compliant Processes", desc: "Every Deployment Follows Government-Approved Documentation And Protector Processing.", color: "text-[#FFB300]" },
  { icon: FaFileSignature, title: "Traceable Records", desc: "Full Audit Trail From Employer Demand To Final Workforce Deployment.", color: "text-[#29B6F6]" },
];

const SOURCING_APPROACH = [
  { icon: FaUsers, title: "Existing Candidate Networks", desc: "A Growing Database Of Pre-Screened Pakistani Workers Across Trades.", color: "text-[#4FC3F7]" },
  { icon: FaSearch, title: "Targeted Trade Sourcing", desc: "Candidates Matched By Trade, Experience And Project Requirement.", color: "text-[#22C55E]" },
  { icon: FaLaptop, title: "Digital Campaigns", desc: "Online Job Advertisements And Recruitment Campaigns Across Pakistan.", color: "text-[#FFB300]" },
  { icon: FaComments, title: "Social Media Outreach", desc: "Active Outreach On Major Platforms To Reach Qualified Talent.", color: "text-[#29B6F6]" },
];

const SCREENING_ITEMS = ["Document Submission", "Experience Review", "Qualification Verification", "Job Requirement Matching", "Physical Suitability Assessment", "Preliminary Screening"];
const INTERVIEW_ITEMS = ["Technical Understanding", "Relevant Work Experience", "Communication", "Job Awareness", "Professional Attitude", "Behavioural Suitability", "Readiness For Overseas Employment"];
const TRADE_TEST_AREAS = ["Practical Trade Competency", "Equipment Familiarity", "Tools Handling", "Technical Knowledge", "Worksite Safety Awareness", "Productivity Potential"];

const MEDICAL_DOCUMENT_ITEMS = [
  { icon: FaStethoscope, title: "Medical Coordination", desc: "Scheduling, Follow-Up And Fitness Verification For Every Selected Candidate.", color: "text-[#FFB300]" },
  { icon: FaPassport, title: "Passport & Employment Docs", desc: "Complete Passport, Contract And Employment Documentation Support.", color: "text-[#4FC3F7]" },
  { icon: FaFileContract, title: "Visa Processing", desc: "Coordination For Visa Endorsement And Required Regulatory Paperwork.", color: "text-[#FFB300]" },
  { icon: FaShieldAlt, title: "Protector Of Emigrants", desc: "Protector Formalities Completed As Required By Pakistani Regulations.", color: "text-[#22C55E]" },
  { icon: FaPlane, title: "Travel Arrangements", desc: "Air Ticketing, Travel Scheduling And Batch-Wise Departures Coordinated.", color: "text-[#29B6F6]" },
  { icon: FaLayerGroup, title: "Final Deployment Files", desc: "Organized Candidate Records And Deployment Files Ready For The Employer.", color: "text-[#4FC3F7]" },
];

const POST_DEPLOYMENT = [
  { icon: FaHandshake, title: "Employer & Employee Coordination", desc: "Ongoing Communication Between Both Parties After Deployment.", color: "text-[#22C55E]" },
  { icon: FaUsers, title: "Workforce Follow-Up", desc: "Regular Check-Ins On Workforce Performance And Adjustment.", color: "text-[#4FC3F7]" },
  { icon: FaClipboardCheck, title: "Attendance & Performance", desc: "Coordination Support For Attendance, Productivity And Reporting.", color: "text-[#22C55E]" },
  { icon: FaHeadset, title: "Welfare & Grievance Support", desc: "Employee Welfare, Grievance Handling And Mediation When Needed.", color: "text-[#FFB300]" },
  { icon: FaSyncAlt, title: "Replacement Support", desc: "Replacement Manpower Arranged If Required Within The Contract Period.", color: "text-[#4FC3F7]" },
  { icon: FaPlane, title: "Repatriation Coordination", desc: "End-Of-Contract Repatriation And Travel Support When Applicable.", color: "text-[#29B6F6]" },
];

const BULK_CAPABILITIES = [
  { icon: FaLayerGroup, title: "Multi-Trade Recruitment", desc: "Multiple Trades Sourced At The Same Time For One Project.", color: "text-[#4FC3F7]" },
  { icon: FaUsers, title: "High-Volume Sourcing", desc: "Large Candidate Pools Built Around Required Skills.", color: "text-[#22C55E]" },
  { icon: FaClipboardCheck, title: "Batch-Wise Screening", desc: "Structured Screening, Interviews And Testing In Organized Batches.", color: "text-[#FFB300]" },
  { icon: FaFileSignature, title: "Documentation Tracking", desc: "Each Candidate Tracked Separately Through Documentation And Visa.", color: "text-[#4FC3F7]" },
  { icon: FaPlane, title: "Batch-Wise Deployment", desc: "Coordinated Mobilization Matched To Project Schedules.", color: "text-[#29B6F6]" },
  { icon: FaSyncAlt, title: "Replacement & Additional Support", desc: "Ongoing Support For Replacement And Additional Manpower.", color: "text-[#4FC3F7]" },
];

const WHY_GROUPS = [
  {
    heading: "Licensed & Compliant",
    items: ["Licensed Overseas Recruitment Operation", "Corporate And Structured Approach"],
  },
  {
    heading: "Sourcing & Assessment",
    items: [
      "Multi-Industry Recruitment Capability",
      "Skilled To General Manpower Sourcing",
      "Technical And Trade-Based Assessment",
      "Bulk Recruitment Capability",
    ],
  },
  {
    heading: "Delivery & Support",
    items: [
      "Fast-Track Mobilization Support",
      "Documentation And Deployment Coordination",
      "Post-Deployment Workforce Support",
      "Employer-Focused Communication",
    ],
  },
];

const VALUABLE_CLIENTS = [
  "China Railway No. 5 Engineering Group",
  "China State Construction Engineering Corporation (CSCEC)",
  "China Railway Group (CREC)",
  "China Railway Construction Corporation (CRCC)",
  "China Communications Construction Company (CCCC)",
  "China Energy Engineering Corporation (CEEC)",
  "PowerChina",
  "Shanghai Construction Group (SCG)",
  "China Harbour Engineering Company (CHEC)",
  "SEPCOIII Electric Power Construction",
  "China Machinery Engineering Corporation (CMEC)",
  "China Railway 18th Bureau Group",
  "Hunan Road & Bridge Construction Group",
  "China National Chemical Engineering Group (CNCEC)",
  "China Metallurgical Group Corporation (MCC)",
  "China International Water & Electric Corporation (CWE)",
  "China Railway No. 6 Engineering Group",
  "China Civil Engineering Construction Corporation (CCECC)",
  "Sinohydro",
  "China Railway No. 10 Engineering Group",
  "China CAMC Engineering (CAMC)",
  "China Road And Bridge Corporation (CRBC)",
  "Sinoma CDI",
  "China Gezhouba Group Corporation (CGGC)",
  "China National Machinery Industry Corporation (SINOMACH)",
  "China Railway 20th Bureau Group",
  "China Railway 21st Bureau Group",
];

/* ============================================================
   PAGE
============================================================ */
const Services = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const marqueeIndustries = [...INDUSTRIES, ...INDUSTRIES];
  const marqueeClients = [...VALUABLE_CLIENTS, ...VALUABLE_CLIENTS];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ============ HERO — About-page style: white bg + light blue shade ============ */}
      <section className="relative mt-[-6rem] pt-44 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-white via-[#E1F5FE] to-white">
        {/* soft blue shade blobs */}
        <div className="absolute -top-32 -right-40 w-[280px] sm:w-[380px] md:w-[480px] h-[280px] sm:h-[380px] md:h-[480px] rounded-full bg-[#4FC3F7]/10 blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 -left-40 w-[220px] sm:w-[300px] md:w-[380px] h-[220px] sm:h-[300px] md:h-[380px] rounded-full bg-[#FFD54F]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[180px] sm:w-[220px] md:w-[260px] h-[180px] sm:h-[220px] md:h-[260px] rounded-full bg-[#4FC3F7]/8 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-10 lg:gap-14 items-start">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 bg-white/95 backdrop-blur-sm border border-[#4FC3F7]/40 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-[0_4px_14px_rgba(15,76,92,0.12)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-ping-slow" />
                <p className="text-[#0F4C5C] text-xs sm:text-sm font-bold">
                  What We Offer
                </p>
              </div>

              <h1 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold text-[#0F4C5C] leading-[1.15] mb-4 sm:mb-5">
                Manpower Services Built To Move Workforce From{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                  Pakistan To Your Site
                </span>
              </h1>

              <div className="text-sm sm:text-base md:text-lg text-[#0A3A47] mb-4 min-h-[24px] sm:h-7 font-semibold">
                End-To-End{" "}
                <span className="text-[#29B6F6] font-semibold">
                  Recruitment Solutions
                </span>
              </div>

              <div className="flex justify-center lg:justify-start mb-6 sm:mb-8">
                <div className="max-w-2xl">
                  <p className="text-[#0A3A47] text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                    From Planning Your Workforce To Supporting It After Deployment,
                    We Handle Every Step Of Sourcing Manpower From Pakistan And
                    Placing It With Employers Overseas.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className="btn-shine group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_16px_38px_rgba(79,195,247,0.55)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
                >
                  Request A Quote
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <Link
                  to="/process"
                  className="btn-shine group inline-flex items-center justify-center gap-2 bg-white border-2 border-[#0F4C5C]/30 text-[#0F4C5C] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:border-[#4FC3F7] hover:bg-[#E1F5FE] transition-all duration-300 text-sm sm:text-base"
                >
                  See Our Process
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="relative reveal-up group order-first lg:order-last lg:mt-[52px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/20 to-transparent rounded-3xl rotate-3 scale-[1.02] hidden sm:block" />

              <div className="relative h-[280px] sm:h-[340px] lg:h-[380px] rounded-3xl overflow-hidden border border-[#4FC3F7]/20 shadow-[0_20px_50px_rgba(15,76,92,0.15)]">
                <img
                  src="/assets/const-2.png"
                  alt="Pakistani Workforce Ready For Overseas Deployment"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <span className="img-shine" />
              </div>

              <div className="animate-gentle-float absolute bottom-3 left-3 bg-white rounded-2xl shadow-[0_16px_36px_rgba(15,76,92,0.12)] border border-[#4FC3F7]/25 px-4 py-3 max-w-[170px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#4FC3F7]/12 flex items-center justify-center">
                    <FaCheckCircle className="text-[#22C55E] text-xs" aria-hidden="true" />
                  </span>
                  <p className="text-[#0F4C5C] font-bold text-xs">End-To-End</p>
                </div>
                <p className="text-[#0A3A47] text-xs leading-relaxed">
                  Sourcing To Deployment
                </p>
              </div>

              <div className="animate-gentle-float-slow absolute top-3 right-3 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] rounded-2xl shadow-[0_12px_30px_rgba(79,195,247,0.35)] px-3.5 py-2.5 hidden md:block">
                <p className="text-xs uppercase tracking-wider opacity-90 font-semibold">
                  Trusted By
                </p>
                <p className="text-sm font-extrabold">500+ Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPLIANCE ============ */}
      <section className="section-tight relative bg-[#E1F5FE] overflow-hidden" aria-labelledby="compliance-heading">
        <h2 id="compliance-heading" className="sr-only">Compliance & Credentials</h2>
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {COMPLIANCE_ITEMS.map(({ icon: Icon, title, desc, color }, idx) => (
              <div
                key={title}
                className="group relative bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 reveal-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="w-10 h-10 rounded-xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4FC3F7]/10 transition-colors">
                  <Icon className={`${color} text-base icon-wiggle`} />
                </div>
                <div>
                  <h3 className="font-bold text-[#0F4C5C] text-sm mb-1">
                    {title}
                  </h3>
                  <p className="text-[#0A3A47]/70 text-xs sm:text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CORE SERVICES ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                Our Expertise
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              End-To-End Solutions For Your{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Workforce Needs
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORE_SERVICES.map(({ icon: Icon, title, desc, color }, idx) => (
              <div
                key={title}
                className="group relative bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 reveal-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4FC3F7]/10 transition-colors">
                    <Icon className={`${color} text-base icon-wiggle`} />
                  </div>
                  <h3 className="font-bold text-[#0F4C5C] text-sm sm:text-base leading-tight">
                    {title}
                  </h3>
                </div>
                <p className="text-[#0A3A47]/70 text-xs sm:text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SOURCING APPROACH ============ */}
      <section className="section-tight relative bg-[#E1F5FE] overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                Candidate Sourcing
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              Finding People Who{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Fit The Job
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOURCING_APPROACH.map(({ icon: Icon, title, desc, color }, idx) => (
              <div
                key={title}
                className="group relative bg-white rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 reveal-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#4FC3F7]/12 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4FC3F7]/20 transition-colors">
                    <Icon className={`${color} text-base icon-wiggle`} />
                  </div>
                  <h3 className="font-bold text-[#0F4C5C] text-sm leading-tight">
                    {title}
                  </h3>
                </div>
                <p className="text-[#0A3A47]/70 text-xs sm:text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SCREENING & INTERVIEWS ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                Screening & Interviews
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              Every Candidate Must{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Earn The Shortlist
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="group relative bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl p-5 sm:p-6 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] transition-all duration-300 reveal-up">
              <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F]" />
              <h3 className="font-[Plus_Jakarta_Sans] text-base sm:text-lg font-extrabold text-[#0F4C5C] mb-4 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center">
                  <FaClipboardCheck className="text-[#4FC3F7] text-sm" />
                </span>
                Initial Assessment
              </h3>
              <ul className="space-y-2">
                {SCREENING_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0A3A47]">
                    <FaCheckCircle className="text-[#22C55E] text-[10px] mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="group relative bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl p-5 sm:p-6 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] transition-all duration-300 reveal-up">
              <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F]" />
              <h3 className="font-[Plus_Jakarta_Sans] text-base sm:text-lg font-extrabold text-[#0F4C5C] mb-4 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center">
                  <FaUserTie className="text-[#29B6F6] text-sm" />
                </span>
                Interview Evaluation
              </h3>
              <ul className="space-y-2">
                {INTERVIEW_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0A3A47]">
                    <FaCheckCircle className="text-[#22C55E] text-[10px] mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRADE TESTING ============ */}
      <section className="section-tight relative bg-[#E1F5FE] overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-7 sm:gap-9 items-center">
            <div className="reveal-up">
              <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
                <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                  Trade Testing
                </p>
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-3 leading-tight">
                Skills Should Be Demonstrated,{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                  Not Just Claimed
                </span>
              </h2>

              <p className="text-[#0A3A47] text-sm sm:text-base mb-4 leading-relaxed font-medium">
                For Technical And Skilled Positions, Practical Capability
                Matters. Trade Testing Can Be Coordinated According To The
                Employer'S Job Specifications.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {TRADE_TEST_AREAS.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 transition-colors"
                  >
                    <FaCheckCircle className="text-[#22C55E] text-[10px] flex-shrink-0" />
                    <span className="text-[#0F4C5C] text-xs sm:text-sm font-bold">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="group relative bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl p-5 sm:p-6 border border-[#4FC3F7]/20 shadow-[0_8px_28px_rgba(15,76,92,0.06)] hover:shadow-[0_18px_44px_rgba(79,195,247,0.15)] hover:border-[#4FC3F7]/50 transition-all duration-300 reveal-up">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F]" />
              <div className="w-10 h-10 rounded-xl bg-[#4FC3F7]/12 flex items-center justify-center mb-3">
                <FaHardHat className="text-[#FFB300] text-base icon-wiggle" />
              </div>
              <h3 className="font-[Plus_Jakarta_Sans] text-base sm:text-lg font-extrabold text-[#0F4C5C] mb-3">
                Why It Matters
              </h3>
              <ul className="space-y-2">
                {[
                  "More Reliable Workforce",
                  "Reduced Project Risks",
                  "Better Job Fit",
                  "Higher Productivity",
                  "Confidence In Selection",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0A3A47]">
                    <FaCheckCircle className="text-[#22C55E] text-[10px] mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MEDICAL & DOCUMENTATION ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                Medical & Documentation
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              Ready For The Job.{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Ready For Deployment.
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MEDICAL_DOCUMENT_ITEMS.map(({ icon: Icon, title, desc, color }, idx) => (
              <div
                key={title}
                className="group relative bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 reveal-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4FC3F7]/10 transition-colors">
                    <Icon className={`${color} text-base icon-wiggle`} />
                  </div>
                  <h3 className="font-bold text-[#0F4C5C] text-sm leading-tight">
                    {title}
                  </h3>
                </div>
                <p className="text-[#0A3A47]/70 text-xs sm:text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUR PROCESS ============ */}
      <section className="section-tight relative bg-gradient-to-b from-[#0F4C5C] via-[#0A3A47] to-[#06303A] overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[280px] h-[280px] rounded-full bg-[#4FC3F7]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[260px] h-[260px] rounded-full bg-[#FFD54F]/8 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#4FC3F7] text-xs sm:text-sm font-bold">
                The Process
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              From Your Requirement To A{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Worker On Site
              </span>
            </h2>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-[22px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#4FC3F7]/40 to-transparent line-grow" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-7 gap-x-4 relative">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  key={step.num}
                  className={`relative group reveal-up reveal-up-delay-${(idx % 3) + 1}`}
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] flex items-center justify-center font-extrabold text-xs mb-3 relative z-10 shadow-[0_8px_24px_rgba(79,195,247,0.4)] group-hover:scale-110 transition-transform duration-300">
                    {step.num}
                  </div>
                  <h3 className="text-white font-bold mb-1 text-xs sm:text-sm">
                    {step.title}
                  </h3>
                  <p className="text-white/75 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-10 reveal-up">
            <Link
              to="/process/recruitment"
              className="inline-flex items-center gap-2 font-bold text-[#4FC3F7] hover:text-[#FFD54F] transition-colors text-sm sm:text-base group"
            >
              View Complete Recruitment Process
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WORKFORCE CATEGORIES ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                Skill Levels
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              Workforce{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Categories
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {WORKFORCE_CATEGORIES.map((c, idx) => (
              <div
                key={c.level}
                className="group relative bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 reveal-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center ${c.color} font-extrabold text-sm group-hover:bg-[#4FC3F7]/10 transition-colors`}>
                    {c.letter}
                  </div>
                  <h3 className="text-base font-bold text-[#0F4C5C]">
                    {c.level}
                  </h3>
                </div>
                <p className="text-[#0A3A47]/70 text-xs sm:text-sm leading-relaxed">
                  {c.examples}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BULK & PROJECT MOBILIZATION ============ */}
      <section className="section-tight relative bg-[#E1F5FE] overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                Bulk & Project Mobilization
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              When The Project Needs{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                More Than A Few People
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BULK_CAPABILITIES.map(({ icon: Icon, title, desc, color }, idx) => (
              <div
                key={title}
                className="group relative bg-white rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 reveal-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#4FC3F7]/12 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4FC3F7]/20 transition-colors">
                    <Icon className={`${color} text-base icon-wiggle`} />
                  </div>
                  <h3 className="font-bold text-[#0F4C5C] text-sm leading-tight">
                    {title}
                  </h3>
                </div>
                <p className="text-[#0A3A47]/70 text-xs sm:text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POST-DEPLOYMENT SUPPORT ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                Post-Deployment Support
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              Our Responsibility Doesn'T End At The{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Airport
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POST_DEPLOYMENT.map(({ icon: Icon, title, desc, color }, idx) => (
              <div
                key={title}
                className="group relative bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_32px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 reveal-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4FC3F7]/10 transition-colors">
                    <Icon className={`${color} text-base icon-wiggle`} />
                  </div>
                  <h3 className="font-bold text-[#0F4C5C] text-sm leading-tight">
                    {title}
                  </h3>
                </div>
                <p className="text-[#0A3A47]/70 text-xs sm:text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section className="section-tight relative bg-[#E1F5FE] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-7">
          <div className="text-center reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                Sectors
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              Industries We{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Serve
              </span>
            </h2>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-[#E1F5FE] via-[#E1F5FE]/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-[#E1F5FE] via-[#E1F5FE]/70 to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 animate-marquee-left w-max px-4 py-4">
            {marqueeIndustries.map(({ icon: Icon, name, img }, idx) => (
              <div
                key={`${name}-${idx}`}
                className="flex-shrink-0 w-[262px] bg-white rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(15,76,92,0.06)] border border-[#4FC3F7]/15"
              >
                <div className="h-[300px] overflow-hidden relative">
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C5C]/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 w-6 h-6 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-[10px]">
                    <Icon />
                  </span>
                </div>
                <p className="text-[#0F4C5C] font-bold text-xs sm:text-sm p-3">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[#0A3A47]/70 text-xs mt-4">
          Auto-scrolling — hover to pause
        </p>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-7 sm:gap-9 items-start">
            <div className="reveal-up">
              <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
                <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                  Why Choose Us
                </p>
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] mb-3 leading-tight">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                  Ali Hajveri International
                </span>
              </h2>

              <p className="text-[#0A3A47] text-sm sm:text-base mb-5 leading-relaxed font-medium">
                A Licensed Overseas Recruitment Operation, Corporate And
                Structured Approach, And Multi-Industry Capability — Built On
                One Professional Standard.
              </p>

              <div className="flex flex-wrap gap-2">
                {WHY_CHIPS.map(({ icon: Icon, label, color }) => (
                  <span
                    key={label}
                    className="flex items-center gap-2 bg-gradient-to-b from-white to-[#E1F5FE] border border-[#4FC3F7]/20 px-3 py-1.5 rounded-full text-xs font-bold text-[#0F4C5C]"
                  >
                    <Icon className={`${color} text-xs`} /> {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white via-[#E1F5FE] to-white rounded-2xl p-5 sm:p-6 border border-[#4FC3F7]/20 shadow-[0_8px_28px_rgba(15,76,92,0.06)] reveal-up space-y-4">
              {WHY_GROUPS.map((group) => (
                <div key={group.heading}>
                  <h3 className="font-[Plus_Jakarta_Sans] text-sm sm:text-base font-extrabold text-[#0F4C5C] mb-2 pb-1.5 border-b border-[#4FC3F7]/20">
                    {group.heading}
                  </h3>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[#0A3A47] text-xs sm:text-sm">
                        <FaCheckCircle className="text-[#22C55E] text-[10px] mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ VALUABLE CLIENTS ============ */}
      <section className="section-tight relative bg-[#E1F5FE] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-7">
          <div className="text-center reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <FaStar className="text-[#FFB300] text-xs" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                Trusted Worldwide
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              Our Valuable{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Clients
              </span>
            </h2>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-20 sm:w-32 bg-gradient-to-r from-[#E1F5FE] via-[#E1F5FE]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-20 sm:w-32 bg-gradient-to-l from-[#E1F5FE] via-[#E1F5FE]/80 to-transparent z-10 pointer-events-none" />

          <div className="flex flex-nowrap items-center gap-5 animate-marquee-left-slow w-max py-4 px-4">
            {marqueeClients.map((client, idx) => (
              <div
                key={`${client}-${idx}`}
                className="flex-shrink-0 flex items-center gap-2 bg-white border border-[#4FC3F7]/30 hover:border-[#4FC3F7]/60 px-4 py-2.5 rounded-full shadow-[0_6px_16px_rgba(15,76,92,0.06)] hover:shadow-[0_8px_22px_rgba(79,195,247,0.15)] transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] flex-shrink-0" />
                <span className="text-[#0F4C5C] text-xs sm:text-sm font-bold whitespace-nowrap">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DESTINATION COUNTRIES ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                Destinations
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              From Pakistan To{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                International Markets
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DESTINATION_COUNTRIES.map((c, idx) => (
              <div
                key={c.name}
                className="group bg-gradient-to-b from-white to-[#E1F5FE] rounded-2xl p-4 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_28px_rgba(79,195,247,0.15)] hover:-translate-y-1 transition-all duration-300 text-center reveal-up"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <span className="block text-2xl mb-2">{c.flag}</span>
                <p className="text-[#0F4C5C] font-bold text-xs mb-1">
                  {c.name}
                </p>
                <p className="text-[#0A3A47]/70 text-xs leading-relaxed">
                  {c.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="section-tight relative bg-[#E1F5FE] overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#4FC3F7]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F4C5C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9 reveal-up">
            <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/10 border border-[#4FC3F7]/25 rounded-full px-3.5 py-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
              <p className="text-[#29B6F6] text-xs sm:text-sm font-bold">
                Behind The Process
              </p>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight">
              A Look At Recruitment And{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Deployment In Practice
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, idx) => (
              <Link
                key={img.src}
                to={`/process/recruitment#${img.src.split("/").pop().replace(".png", "")}`}
                className="group reveal-up block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC3F7] focus-visible:ring-offset-2 rounded-2xl"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-[#4FC3F7]/20 shadow-[0_8px_28px_rgba(15,76,92,0.08)]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <span className="img-shine" />
                </div>
                <p className="text-[#0F4C5C] font-bold text-xs sm:text-sm mt-3 flex items-center gap-1.5 group-hover:text-[#29B6F6] transition-colors">
                  {img.caption}
                  <FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section-tight relative bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] rounded-3xl px-6 sm:px-8 py-10 sm:py-12 text-center overflow-hidden border border-[#4FC3F7]/25 shadow-[0_24px_60px_rgba(15,76,92,0.25)] reveal-up">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#4FC3F7]/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-[#FFD54F]/10 blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-gold-pulse" />
                <span className="text-[#4FC3F7] text-xs font-bold tracking-widest uppercase">
                  Ready To Hire
                </span>
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
                Tell Us What{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                  You Need
                </span>
              </h2>

              <p className="text-white/80 text-sm sm:text-base mb-6 leading-relaxed">
                We'Ll Put Together A Manpower Plan Sourced From Pakistan And
                Tailored To Your Project.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className="btn-shine group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 sm:px-8 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.35)] hover:shadow-[0_16px_38px_rgba(79,195,247,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
                >
                  Request A Quote
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 border border-[#4FC3F7]/40 text-[#4FC3F7] px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-[#4FC3F7]/10 hover:border-[#4FC3F7]/70 transition-all duration-300 text-sm sm:text-base"
                >
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .section-tight {
          padding-top: 2rem;
          padding-bottom: 2rem;
        }
        @media (min-width: 640px) {
          .section-tight {
            padding-top: 2.5rem;
            padding-bottom: 2.5rem;
          }
        }

        .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0;
          margin: -1px; overflow: hidden; clip: rect(0,0,0,0);
          white-space: nowrap; border-width: 0;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee-left { animation: marquee-left 40s linear infinite; }
        .animate-marquee-left-slow { animation: marquee-left 85s linear infinite; }

        .animate-marquee-left:hover,
        .animate-marquee-left:focus-within,
        .animate-marquee-left-slow:hover,
        .animate-marquee-left-slow:focus-within {
          animation-play-state: paused;
        }

        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }

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
          .animate-marquee-left, .animate-marquee-left-slow,
          .animate-pulse-slow, .animate-ping-slow, .reveal-up,
          .btn-shine::after, .img-shine::after, .icon-wiggle,
          .animate-gold-pulse, .animate-gentle-float,
          .animate-gentle-float-slow, .line-grow { animation: none !important; }
          .reveal-up { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Services;