// src/pages/FAQ.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaSearch,
  FaQuestionCircle,
  FaArrowRight,
  FaCheckCircle,
  FaComments,
  FaLightbulb,
  FaHeadset,
} from "react-icons/fa";

/* ============================================================
   FAQ DATA — Every Word Capitalized
============================================================ */
const FAQ_CATEGORIES = [
  {
    id: "general",
    title: "General Questions",
    icon: "01",
    color: "text-[#4FC3F7]",
    bgFrom: "from-[#4FC3F7]",
    bgTo: "to-[#29B6F6]",
    shadow: "shadow-[0_10px_24px_rgba(79,195,247,0.4)]",
    items: [
      {
        q: "What Is Ali Hajveri International (Pvt.) Ltd.?",
        a: "Ali Hajveri International (Pvt.) Ltd. Is A Pakistan-Based Manpower Recruitment Company Specializing In Connecting International Employers With Suitable Pakistani Workers And Professionals.",
      },
      {
        q: "Where Do You Recruit Manpower From?",
        a: "We Recruit Manpower Exclusively From Pakistan. Our Candidates Are Pakistani Nationals Seeking Suitable Overseas Employment Opportunities.",
      },
      {
        q: "Do You Recruit Workers From Other Countries?",
        a: "No. Our Recruitment Network Is Focused On Sourcing And Recruiting Candidates From Pakistan.",
      },
      {
        q: "Who Are Your Services For?",
        a: "Our Services Are Designed For International Employers Looking For Pakistani Manpower And Pakistani Candidates Seeking Overseas Employment Opportunities.",
      },
      {
        q: "What Types Of Manpower Do You Recruit?",
        a: "Depending On Employer Requirements, We Recruit Skilled, Semi-Skilled, Technical, Professional, And General Workers From Pakistan.",
      },
      {
        q: "Which Countries Do You Provide Manpower For?",
        a: "Available Destinations Depend On Current Employer Requirements, Approved Job Orders, And Applicable Recruitment Arrangements. We Provide Pakistani Manpower For Overseas Employment Opportunities Where Vacancies Are Available.",
      },
      {
        q: "Do You Provide Jobs Inside Pakistan?",
        a: "Our Primary Focus Is Overseas Manpower Recruitment And Connecting Pakistani Candidates With International Employment Opportunities.",
      },
    ],
  },
  {
    id: "employers",
    title: "For International Employers",
    icon: "02",
    color: "text-[#22C55E]",
    bgFrom: "from-[#22C55E]",
    bgTo: "to-[#16A34A]",
    shadow: "shadow-[0_10px_24px_rgba(34,197,94,0.4)]",
    items: [
      {
        q: "How Can An International Employer Request Pakistani Manpower?",
        a: "International Employers Can Contact Our Team And Provide Their Manpower Requirements, Including Job Positions, Number Of Workers, Qualifications, Experience, Skills, Salary, And Employment Conditions.",
      },
      {
        q: "Can You Recruit Manpower According To Our Specific Requirements?",
        a: "Yes. We Source And Shortlist Pakistani Candidates According To The Qualifications, Experience, Skills, And Other Criteria Specified By The Employer.",
      },
      {
        q: "Can You Recruit Large Numbers Of Pakistani Workers?",
        a: "Yes. Recruitment Campaigns Can Be Organized According To The Employer's Manpower Requirements, Vacancy Numbers, And Applicable Recruitment Procedures.",
      },
      {
        q: "What Categories Of Workers Can You Recruit?",
        a: "Depending On Available Requirements, We Can Recruit Skilled Workers, Semi-Skilled Workers, General Workers, Technical Workers, Construction Workers, Drivers, Machine Operators, Tradesmen, And Professional Staff.",
      },
      {
        q: "Can You Recruit Technical Workers From Pakistan?",
        a: "Yes. We Can Source Pakistani Technical Workers According To Specific Job Requirements, Including Electricians, Welders, Mechanics, Plumbers, Machine Operators, And Other Skilled Trades.",
      },
      {
        q: "How Do You Source Candidates In Pakistan?",
        a: "Candidates May Be Sourced Through Our Recruitment Network, Candidate Database, Job Advertisements, Recruitment Campaigns, And Other Appropriate Channels Within Pakistan.",
      },
      {
        q: "How Do You Screen Candidates?",
        a: "Candidates Are Screened According To The Employer's Job Requirements, Including Qualifications, Experience, Technical Skills, Certifications, And Other Relevant Criteria.",
      },
      {
        q: "Can Employers Interview Shortlisted Candidates?",
        a: "Yes. Employers Can Interview Shortlisted Pakistani Candidates Through Online Interviews, In-Person Interviews, Recruitment Drives, Or Other Agreed Arrangements.",
      },
      {
        q: "Do You Conduct Trade Tests?",
        a: "Where Required, We Can Coordinate Technical Or Practical Skill Assessments According To The Job Requirements.",
      },
      {
        q: "Can You Recruit Candidates For Urgent Manpower Requirements?",
        a: "We Can Coordinate Recruitment According To The Urgency And Size Of The Requirement, Subject To Candidate Availability And Applicable Procedures.",
      },
      {
        q: "How Do Employers Submit A Manpower Demand?",
        a: "Employers Can Contact Our Team And Provide Details Of Their Manpower Requirement, Including Positions, Quantity, Qualifications, Experience, Salary, Benefits, And Other Employment Conditions.",
      },
    ],
  },
  {
    id: "candidates",
    title: "For Pakistani Candidates",
    icon: "03",
    color: "text-[#FFB300]",
    bgFrom: "from-[#FFB300]",
    bgTo: "to-[#F59E0B]",
    shadow: "shadow-[0_10px_24px_rgba(255,179,0,0.4)]",
    items: [
      {
        q: "Who Can Apply For Overseas Jobs Through Ali Hajveri International?",
        a: "Pakistani Citizens Who Meet The Qualifications, Skills, Experience, And Other Requirements Of An Available Overseas Vacancy Can Apply.",
      },
      {
        q: "Can Pakistani Workers Submit Their CV?",
        a: "Yes. Candidates Can Submit Their CV And Relevant Information For Consideration Against Suitable Vacancies.",
      },
      {
        q: "Do I Need Overseas Work Experience?",
        a: "Not Necessarily. Experience Requirements Depend On The Specific Job. Some Positions Require Previous Experience, While Others May Have Different Eligibility Criteria.",
      },
      {
        q: "Do I Need A Valid Passport?",
        a: "A Valid Passport Is Generally Required For International Travel And Overseas Employment Processing. Passport Requirements May Vary Depending On The Destination And Job.",
      },
      {
        q: "What Documents May Be Required?",
        a: "Depending On The Vacancy, Candidates May Be Asked To Provide Documents Such As: CNIC, Passport, Educational Certificates, Experience Certificates, Professional Certifications, Photographs, Medical Documents, And Other Required Documents.",
      },
      {
        q: "Do Candidates Have To Pass An Interview?",
        a: "Candidates May Need To Pass An Interview Conducted By Our Recruitment Team And/Or The Overseas Employer, Depending On The Vacancy.",
      },
      {
        q: "Are Trade Tests Required?",
        a: "Trade Tests Are Required For Certain Technical And Skilled Positions. The Requirement Depends On The Employer And Nature Of The Job.",
      },
      {
        q: "Is A Medical Examination Required?",
        a: "Where Required By The Destination Country, Employer, Or Applicable Regulations, Selected Candidates Must Complete The Required Medical Examination.",
      },
      {
        q: "Is A Police Clearance Certificate Required?",
        a: "A Police Clearance Certificate May Be Required Depending On The Destination Country, Visa Category, Employer, Or Applicable Regulations.",
      },
      {
        q: "Do I Need To Know A Foreign Language?",
        a: "Language Requirements Depend On The Specific Job And Destination. Candidates Will Be Informed If A Particular Language Is Required.",
      },
    ],
  },
  {
    id: "process",
    title: "Recruitment Process",
    icon: "04",
    color: "text-[#8B5CF6]",
    bgFrom: "from-[#8B5CF6]",
    bgTo: "to-[#7C3AED]",
    shadow: "shadow-[0_10px_24px_rgba(139,92,246,0.4)]",
    items: [
      {
        q: "What Is Your Recruitment Process?",
        a: "Our Recruitment Process Generally Includes: Manpower Requirement → Candidate Sourcing → Screening → Interview/Trade Test → Employer Selection → Documentation → Medical → Visa Processing → Pre-Departure → Deployment.",
      },
      {
        q: "What Happens After A Candidate Is Shortlisted?",
        a: "A Shortlisted Candidate May Proceed To An Employer Interview, Trade Test, Document Verification, Or Other Required Selection Stages.",
      },
      {
        q: "Who Makes The Final Selection?",
        a: "The Final Selection Depends On The Recruitment Arrangement. Where An Employer Interview Is Conducted, The International Employer Makes The Final Selection.",
      },
      {
        q: "What Happens After Final Selection?",
        a: "Selected Candidates Proceed With The Required Documentation, Medical Examination, Visa Processing, And Other Applicable Procedures Before Deployment.",
      },
      {
        q: "Do You Help Candidates Prepare Their Documents?",
        a: "Yes. Our Team Can Guide Selected Candidates Regarding The Documents And Procedures Required For Their Specific Overseas Employment Process.",
      },
      {
        q: "Do You Provide Pre-Departure Guidance?",
        a: "Yes. Selected Candidates May Receive Guidance Regarding Travel, Employment Conditions, Required Documents, Destination-Country Requirements, And Other Relevant Matters.",
      },
    ],
  },
  {
    id: "visa",
    title: "Visa & Deployment",
    icon: "05",
    color: "text-[#06B6D4]",
    bgFrom: "from-[#06B6D4]",
    bgTo: "to-[#0891B2]",
    shadow: "shadow-[0_10px_24px_rgba(6,182,212,0.4)]",
    items: [
      {
        q: "Does Ali Hajveri International Guarantee Visa Approval?",
        a: "No. Visa Approval Is Subject To The Relevant Government And Immigration Authorities And Depends On Fulfillment Of Applicable Requirements.",
      },
      {
        q: "How Long Does The Visa Process Take?",
        a: "Processing Time Varies Depending On The Destination Country, Visa Category, Employer, Documentation, And Applicable Government Procedures.",
      },
      {
        q: "Do You Arrange Travel For Selected Candidates?",
        a: "Travel Arrangements Depend On The Specific Job Order And Recruitment Agreement. Where Applicable, We Coordinate The Mobilization Process With The Relevant Parties.",
      },
      {
        q: "What Happens After The Candidate Reaches The Destination Country?",
        a: "The Candidate Reports To The Designated Employer Or Authorized Representative And Begins Employment According To The Agreed Employment Terms And Applicable Requirements.",
      },
    ],
  },
  {
    id: "trust",
    title: "Trust & Safety",
    icon: "06",
    color: "text-[#EC4899]",
    bgFrom: "from-[#EC4899]",
    bgTo: "to-[#DB2777]",
    shadow: "shadow-[0_10px_24px_rgba(236,72,153,0.4)]",
    items: [
      {
        q: "Are Overseas Jobs Guaranteed?",
        a: "No. Employment Depends On Available Vacancies, Employer Requirements, Candidate Eligibility, Selection, Documentation, Visa Approval, And Applicable Procedures.",
      },
      {
        q: "How Can I Verify An Overseas Job Opportunity?",
        a: "Candidates Should Carefully Review The Vacancy Details And Verify The Recruitment Channel, Job Order, Employment Terms, And Applicable Official Requirements Before Proceeding. Pakistan's Bureau Of Emigration & Overseas Employment Advises Job Seekers To Verify The Validity Of An Overseas Employment Promoter, The Demand, And The Terms And Conditions Before Proceeding.",
      },
    ],
  },
];

/* ============================================================
   FAQ ITEM
============================================================ */
const FAQItem = ({ q, a, isOpen, onToggle, index, color, bgFrom, bgTo, shadow }) => (
  <div
    className={`group relative rounded-2xl border transition-all duration-500 overflow-hidden ${
      isOpen
        ? "border-[#4FC3F7]/60 bg-gradient-to-b from-[#E1F5FE] via-white to-white shadow-[0_18px_45px_rgba(79,195,247,0.22)] -translate-y-0.5"
        : "border-[#4FC3F7]/20 bg-white hover:border-[#4FC3F7]/50 hover:shadow-[0_12px_30px_rgba(15,76,92,0.10)] hover:-translate-y-0.5"
    }`}
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    {/* Top shimmer accent */}
    <span
      className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] origin-left transition-transform duration-500 ${
        isOpen
          ? "scale-x-100 animate-[shimmer_3s_linear_infinite]"
          : "scale-x-0 group-hover:scale-x-100"
      }`}
    />

    {/* Left side accent when open */}
    <span
      className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b ${bgFrom} ${bgTo} transition-transform duration-500 origin-top ${
        isOpen ? "scale-y-100" : "scale-y-0"
      }`}
    />

    <button
      onClick={onToggle}
      className="relative w-full flex items-start justify-between gap-4 text-left p-4 sm:p-5"
      aria-expanded={isOpen}
    >
      <div className="flex items-start gap-3 flex-1">
        {/* Icon with glow when open */}
        <span className="relative flex-shrink-0">
          {isOpen && (
            <span className={`absolute inset-0 rounded-lg bg-gradient-to-br ${bgFrom} ${bgTo} blur-md opacity-60 animate-pulse`} />
          )}
          <span
            className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? `bg-gradient-to-br ${bgFrom} ${bgTo} text-white scale-110 ${shadow}`
                : `bg-[#E1F5FE] ${color} group-hover:scale-105`
            }`}
          >
            <FaQuestionCircle className="text-[11px] sm:text-xs" />
          </span>
        </span>
        <h3
          className={`font-bold text-sm sm:text-base leading-snug transition-colors duration-300 pt-0.5 ${
            isOpen
              ? "text-[#0F4C5C]"
              : "text-[#0F4C5C] group-hover:text-[#29B6F6]"
          }`}
        >
          {q}
        </h3>
      </div>

      {/* Chevron with rotation */}
      <span
        className={`relative flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
          isOpen
            ? `bg-gradient-to-br ${bgFrom} ${bgTo} text-white rotate-180 ${shadow}`
            : "bg-[#E1F5FE] text-[#0F4C5C] group-hover:bg-[#4FC3F7]/15 group-hover:text-[#29B6F6]"
        }`}
      >
        <FaChevronDown className="text-[10px] sm:text-xs" />
      </span>
    </button>

    {/* Answer area with smooth expansion */}
    <div
      className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
        isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pl-[3.5rem] sm:pl-[4rem]">
        <div className="relative border-t border-[#4FC3F7]/25 pt-3">
          {/* Small dot on the border */}
          <span className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-[#4FC3F7] shadow-[0_0_8px_rgba(79,195,247,0.8)]" />
          <p className="text-[#0A3A47] text-xs sm:text-sm leading-relaxed">
            {a}
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================
   PAGE
============================================================ */
const Faq = () => {
  const [openItem, setOpenItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const toggle = (id) => setOpenItem(openItem === id ? null : id);

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

  const searchTerm = search.trim().toLowerCase();

  const filteredCategories = FAQ_CATEGORIES.map((cat) => {
    const items = cat.items.filter((item) => {
      if (!searchTerm) return true;
      const q = item.q.toLowerCase();
      const a = item.a.toLowerCase();
      const searchWords = searchTerm.split(/\s+/);
      return searchWords.some((word) => q.includes(word) || a.includes(word));
    });
    return { ...cat, items };
  }).filter((cat) => {
    if (activeCategory !== "all" && cat.id !== activeCategory) return false;
    return cat.items.length > 0;
  });

  const totalResults = filteredCategories.reduce(
    (sum, c) => sum + c.items.length,
    0
  );

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
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blob 9s ease-in-out infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div
          ref={heroRef}
          className="relative w-full h-[500px] sm:h-[480px] overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(/src/assets/faq-hero-img.png)",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C5C]/10 via-[#0A3A47]/25 to-[#06303A]/30" />
          <div className="absolute inset-0 bg-[#0F4C5C]/25" />

          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />

          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
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

          <div className="relative z-10 h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex items-center justify-center">
            <div className="w-full pt-12 sm:pt-16">
              <div className="inline-flex items-center gap-2 mb-4 bg-white/15 backdrop-blur-md border border-[#4FC3F7]/50 rounded-full px-3.5 py-1.5 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-ping-slow" />
                <span className="text-white text-xs sm:text-sm font-bold">
                  Support Center
                </span>
              </div>

              <h1 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-4 [text-shadow:_0_2px_12px_rgba(0,0,0,0.6)]">
                Frequently Asked{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                    Questions
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,4 Q25,0 50,4 T100,4"
                      stroke="#4FC3F7"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p
                className="text-white/95 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6 font-medium"
                style={{
                  textShadow:
                    "0 1px 3px rgba(0,0,0,0.85), 0 2px 6px rgba(15,76,92,0.7)",
                }}
              >
                Everything You Need To Know About Our Manpower Recruitment
                Services For International Employers And Pakistani Candidates.
              </p>

              <div className="max-w-xl mx-auto">
                <div className="relative group/search">
                  <span className="absolute inset-0 rounded-full bg-[#4FC3F7]/30 blur-xl opacity-0 group-focus-within/search:opacity-100 transition-opacity duration-500" />
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4FC3F7] text-sm z-10" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Questions... (Visa, Medical, Documents)"
                    className="relative w-full bg-white/95 backdrop-blur rounded-full pl-11 pr-4 py-3.5 text-sm text-[#0F4C5C] placeholder-[#0A3A47]/50 font-medium focus:outline-none focus:ring-2 focus:ring-[#4FC3F7]/60 shadow-[0_12px_30px_rgba(0,0,0,0.3)] transition-all duration-300"
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <span className="text-white/70 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                    Popular:
                  </span>
                  {[
                    "Visa",
                    "Medical",
                    "Passport",
                    "Documents",
                    "Trade Test",
                    "Interview",
                    "Deployment",
                  ].map((kw) => {
                    const isActive =
                      search.trim().toLowerCase() === kw.toLowerCase();
                    return (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => {
                          setSearch(isActive ? "" : kw);
                          setActiveCategory("all");
                        }}
                        className={`text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full border backdrop-blur transition-all duration-300 hover:scale-105 cursor-pointer ${
                          isActive
                            ? "bg-[#4FC3F7] text-[#0F4C5C] border-[#4FC3F7] shadow-[0_6px_16px_rgba(79,195,247,0.4)] scale-105"
                            : "text-white bg-white/15 hover:bg-[#4FC3F7] hover:text-[#0F4C5C] border-white/25 hover:border-[#4FC3F7]"
                        }`}
                      >
                        {kw}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORY TABS ============ */}
      <section className="relative bg-[#E1F5FE] border-b border-[#4FC3F7]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={`group relative px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 overflow-hidden ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] shadow-[0_10px_24px_rgba(79,195,247,0.4)] scale-105"
                  : "bg-white text-[#0F4C5C] border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 hover:text-[#29B6F6] hover:scale-105"
              }`}
            >
              <span className="relative z-10">All Questions</span>
              {activeCategory === "all" && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              )}
            </button>
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 overflow-hidden ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] shadow-[0_10px_24px_rgba(79,195,247,0.4)] scale-105"
                    : "bg-white text-[#0F4C5C] border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 hover:text-[#29B6F6] hover:scale-105"
                }`}
              >
                <span className="relative z-10">{cat.title}</span>
                {activeCategory === cat.id && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                )}
              </button>
            ))}
          </div>

          {search && (
            <p className="text-center mt-4 text-xs sm:text-sm font-semibold text-[#0A3A47]/70 animate-slideUp">
              Found{" "}
              <span className="text-[#29B6F6] font-extrabold">
                {totalResults}
              </span>{" "}
              {totalResults === 1 ? "Result" : "Results"} For "{search}"
            </p>
          )}
        </div>
      </section>

      {/* ============ FAQ LIST ============ */}
      <section className="relative bg-[#E1F5FE] py-10 sm:py-14 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-[#4FC3F7]/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#0F4C5C]/6 blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {totalResults === 0 ? (
            <div className="text-center py-16 animate-slideUp">
              <div className="relative w-20 h-20 mx-auto mb-5">
                <span className="absolute inset-0 rounded-full bg-[#4FC3F7]/20 animate-ping" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#4FC3F7]/20 to-[#29B6F6]/20 flex items-center justify-center border-2 border-[#4FC3F7]/30">
                  <FaSearch className="text-[#FFB300] text-2xl" />
                </div>
              </div>
              <h3 className="font-bold text-[#0F4C5C] text-lg mb-2">
                No Results Found
              </h3>
              <p className="text-[#0A3A47]/70 text-sm mb-5">
                Try A Different Search Term Or Category.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#29B6F6] hover:text-[#0F4C5C] border border-[#4FC3F7]/40 hover:border-[#4FC3F7]/80 px-4 py-2 rounded-full transition-all duration-300"
              >
                Reset Filters
                <FaArrowRight className="text-[10px]" />
              </button>
            </div>
          ) : (
            <div className="space-y-10 sm:space-y-12">
              {filteredCategories.map((cat, catIdx) => (
                <div
                  key={cat.id}
                  className="animate-slideUp"
                  style={{ animationDelay: `${catIdx * 0.08}s` }}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="relative flex-shrink-0">
                      <span className={`absolute inset-0 rounded-xl bg-gradient-to-br ${cat.bgFrom} ${cat.bgTo} blur-md opacity-50 animate-pulse`} />
                      <span className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${cat.bgFrom} ${cat.bgTo} text-white flex items-center justify-center font-extrabold text-xs sm:text-sm ${cat.shadow}`}>
                        {cat.icon}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-[Plus_Jakarta_Sans] text-lg sm:text-xl font-extrabold text-[#0F4C5C]">
                        {cat.title}
                      </h2>
                      <p className="text-[#0A3A47]/60 text-[10px] sm:text-xs font-semibold flex items-center gap-1.5">
                        <span className={`w-1 h-1 rounded-full ${cat.color.replace("text-", "bg-")}`} />
                        {cat.items.length}{" "}
                        {cat.items.length === 1 ? "Question" : "Questions"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {cat.items.map((item, idx) => {
                      const id = `${cat.id}-${idx}`;
                      return (
                        <FAQItem
                          key={id}
                          q={item.q}
                          a={item.a}
                          isOpen={openItem === id}
                          onToggle={() => toggle(id)}
                          index={idx}
                          color={cat.color}
                          bgFrom={cat.bgFrom}
                          bgTo={cat.bgTo}
                          shadow={cat.shadow}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Still have questions? mini CTA */}
          {totalResults > 0 && (
            <div className="mt-14 relative bg-gradient-to-br from-white to-[#E1F5FE] rounded-2xl border border-[#4FC3F7]/25 p-6 sm:p-8 text-center overflow-hidden animate-slideUp">
              <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center group hover:bg-[#4FC3F7]/10 transition-all duration-300 hover:scale-110 hover:rotate-6">
                <FaHeadset className="text-[#8B5CF6] text-xl" />
              </div>

              <h3 className="font-[Plus_Jakarta_Sans] text-xl sm:text-2xl font-extrabold text-[#0F4C5C] mb-2">
                Still Have Questions?
              </h3>
              <p className="text-[#0A3A47]/75 text-sm sm:text-base max-w-md mx-auto mb-5">
                Can't Find The Answer You're Looking For? Our Team Is Here To
                Help You.
              </p>
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 sm:px-8 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_40px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-sm overflow-hidden"
                style={{ animation: "gradientShift 4s ease infinite" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <FaComments className="relative text-xs" />
                <span className="relative">Contact Our Team</span>
                <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ============ CTA / FOCUS ============ */}
      <section className="relative py-12 sm:py-16 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-10 sm:py-12 text-center overflow-hidden border border-[#4FC3F7]/25 shadow-[0_24px_60px_rgba(15,76,92,0.25)] group/cta">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4FC3F7]/25 blur-3xl animate-blob" />
            <div
              className="absolute -bottom-24 -left-20 w-80 h-80 bg-[#FFD54F]/15 blur-3xl animate-blob"
              style={{ animationDelay: "2.5s" }}
            />

            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#4FC3F7] to-transparent bg-[length:200%_100%] animate-[shimmer_4s_linear_infinite]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5 mb-4 backdrop-blur">
                <FaLightbulb className="text-[#FFB300] text-[10px]" />
                <span className="text-[#4FC3F7] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                  Our Recruitment Focus
                </span>
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                Recruiting Pakistani Talent For{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                  International Opportunities
                </span>
              </h2>

              <p className="text-white/80 text-sm sm:text-base mb-6 leading-relaxed">
                We Connect International Employers With Suitable Manpower From
                Pakistan, Providing A Structured Recruitment Process Covering
                Candidate Sourcing, Screening, Selection, Documentation, And
                Overseas Deployment Support.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-7">
                {[
                  "Candidate Sourcing",
                  "Screening",
                  "Selection",
                  "Documentation",
                  "Deployment Support",
                ].map((step, i) => (
                  <span
                    key={step}
                    className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#4FC3F7] bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 px-3 py-1.5 rounded-full hover:bg-[#4FC3F7]/25 hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <FaCheckCircle className="text-[#22C55E] text-[10px]" />
                    {step}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 sm:px-8 py-3.5 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base overflow-hidden"
                  style={{ animation: "gradientShift 4s ease infinite" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Contact Our Team</span>
                  <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 border border-[#4FC3F7]/40 text-[#4FC3F7] px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-[#4FC3F7]/10 hover:border-[#4FC3F7]/70 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
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

export default Faq;