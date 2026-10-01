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
    <span
      className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] origin-left transition-transform duration-500 ${
        isOpen
          ? "scale-x-100 animate-[shimmer_3s_linear_infinite]"
          : "scale-x-0 group-hover:scale-x-100"
      }`}
    />

    <span
      className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b ${bgFrom} ${bgTo} transition-transform duration-500 origin-top ${
        isOpen ? "scale-y-100" : "scale-y-0"
      }`}
    />

    <button
      onClick={onToggle}
      className="relative w-full flex items-start justify-between gap-3 text-left p-3.5 sm:p-4"
      aria-expanded={isOpen}
    >
      <div className="flex items-start gap-2.5 flex-1">
        <span className="relative flex-shrink-0">
          {isOpen && (
            <span className={`absolute inset-0 rounded-lg bg-gradient-to-br ${bgFrom} ${bgTo} blur-md opacity-60 animate-pulse`} />
          )}
          <span
            className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
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

      <span
        className={`relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
          isOpen
            ? `bg-gradient-to-br ${bgFrom} ${bgTo} text-white rotate-180 ${shadow}`
            : "bg-[#E1F5FE] text-[#0F4C5C] group-hover:bg-[#4FC3F7]/15 group-hover:text-[#29B6F6]"
        }`}
      >
        <FaChevronDown className="text-[10px] sm:text-xs" />
      </span>
    </button>

    <div
      className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
        isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pl-[3.25rem] sm:pl-[3.75rem]">
        <div className="relative border-t border-[#4FC3F7]/25 pt-2.5">
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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0% { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(220%) skewX(-20deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.5; }
        }
        .animate-blob { animation: blob 9s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-gentle-float { animation: gentle-float 5s ease-in-out infinite; }
        .animate-gentle-float-slow { animation: gentle-float 7s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 2s ease-in-out infinite; }

        .btn-shine { position: relative; overflow: hidden; isolation: isolate; }
        .btn-shine::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent); transform: translateX(-120%) skewX(-20deg); pointer-events: none; z-index: 1; }
        .btn-shine:hover::after { animation: shine 0.9s ease-out; }

        .img-shine { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 2; }
        .img-shine::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent); transform: translateX(-120%) skewX(-20deg); }
        .group:hover .img-shine::after { animation: shine 1s ease-out; }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative mt-[-5rem] pt-40 sm:pt-24 md:pt-28 lg:pt-32 pb-6 sm:pb-10 overflow-hidden bg-gradient-to-b from-white via-[#E1F5FE] to-white">
        <div className="absolute -top-32 -right-40 w-[280px] sm:w-[380px] md:w-[480px] h-[280px] sm:h-[380px] md:h-[480px] rounded-full bg-[#4FC3F7]/10 blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 -left-40 w-[220px] sm:w-[300px] md:w-[380px] h-[220px] sm:h-[300px] md:h-[380px] rounded-full bg-[#FFD54F]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[180px] sm:w-[220px] md:w-[260px] h-[180px] sm:h-[220px] md:h-[260px] rounded-full bg-[#4FC3F7]/8 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">

            {/* LEFT: Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-3 bg-white/95 backdrop-blur-sm border border-[#4FC3F7]/40 rounded-full px-3 sm:px-4 py-1.5 shadow-[0_4px_14px_rgba(15,76,92,0.12)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#4FC3F7] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4FC3F7]" />
                </span>
                <span className="text-[#0F4C5C] text-xs sm:text-sm font-bold tracking-wide">
                  Support Center
                </span>
              </div>

              <h1 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold text-[#0F4C5C] leading-[1.15] mb-3">
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
                      stroke="#FFD54F"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <div className="text-base sm:text-lg md:text-xl text-[#0F4C5C] mb-3 min-h-[28px] sm:h-7 font-bold">
                Answers To{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent font-bold">
                  Common Questions
                </span>
                <span className="text-[#0F4C5C] animate-pulse font-bold">|</span>
              </div>

              <div className="flex justify-center lg:justify-start mb-4">
                <div className="max-w-2xl">
                  <p className="text-[#0A3A47] text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                    Everything You Need To Know About Our Manpower Recruitment
                    Services For International Employers And Pakistani Candidates.
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="max-w-xl mb-4 mx-auto lg:mx-0">
                <div className="relative group/search">
                  <span className="absolute inset-0 rounded-full bg-[#4FC3F7]/30 blur-xl opacity-0 group-focus-within/search:opacity-100 transition-opacity duration-500" />
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4FC3F7] text-sm z-10" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Questions... (Visa, Medical, Documents)"
                    className="relative w-full bg-white/95 backdrop-blur rounded-full pl-11 pr-4 py-3 text-sm text-[#0F4C5C] placeholder-[#0A3A47]/50 font-medium focus:outline-none focus:ring-2 focus:ring-[#4FC3F7]/60 shadow-[0_12px_30px_rgba(15,76,92,0.15)] border border-[#4FC3F7]/25 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Popular */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-5">
                <span className="text-[#0A3A47]/60 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                  Popular:
                </span>
                {["Visa", "Medical", "Passport", "Documents", "Trade Test", "Interview", "Deployment"].map((kw) => {
                  const isActive = search.trim().toLowerCase() === kw.toLowerCase();
                  return (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => {
                        setSearch(isActive ? "" : kw);
                        setActiveCategory("all");
                      }}
                      className={`text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full border transition-all duration-300 hover:scale-105 cursor-pointer ${
                        isActive
                          ? "bg-[#4FC3F7] text-[#0F4C5C] border-[#4FC3F7] shadow-[0_6px_16px_rgba(79,195,247,0.4)] scale-105"
                          : "text-[#0F4C5C] bg-white border-[#4FC3F7]/30 hover:bg-[#4FC3F7] hover:text-[#0F4C5C] hover:border-[#4FC3F7]"
                      }`}
                    >
                      {kw}
                    </button>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-5">
                <a
                  href="#faq-list"
                  className="btn-shine group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 sm:px-8 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_16px_38px_rgba(79,195,247,0.55)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
                >
                  Browse FAQs
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  to="/contact"
                  className="btn-shine inline-flex items-center justify-center gap-2 bg-white border-2 border-[#0F4C5C]/30 text-[#0F4C5C] px-6 sm:px-8 py-3 rounded-full font-bold hover:border-[#4FC3F7] hover:bg-[#E1F5FE] transition-all duration-300 text-sm sm:text-base"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            {/* RIGHT: Image */}
            <div className="relative reveal-up group order-first lg:order-last lg:mt-12">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/20 to-transparent rounded-2xl sm:rounded-3xl rotate-3 scale-[1.02] hidden sm:block" />

              <div className="relative h-[280px] sm:h-[340px] lg:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#4FC3F7]/20 shadow-[0_20px_50px_rgba(15,76,92,0.15)]">
                <img
                  src="/assets/faq-hero-img.png"
                  alt="FAQ Support"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <span className="img-shine" />
              </div>

              <div className="animate-gentle-float absolute -bottom-4 sm:-bottom-5 -left-4 sm:-left-5 bg-white rounded-2xl shadow-[0_16px_36px_rgba(15,76,92,0.12)] border border-[#4FC3F7]/25 px-4 py-3 max-w-[170px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#4FC3F7]/12 flex items-center justify-center">
                    <FaHeadset className="text-[#22C55E] text-xs" />
                  </span>
                  <p className="text-[#0F4C5C] font-bold text-xs">24/7 Support</p>
                </div>
                <p className="text-[#0A3A47] text-[10px] leading-relaxed">
                  Always Here To Help
                </p>
              </div>

              <div className="animate-gentle-float-slow absolute top-4 -right-3 sm:top-5 sm:-right-4 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] rounded-xl shadow-[0_12px_30px_rgba(79,195,247,0.35)] px-3.5 py-2.5 hidden md:block">
                <p className="text-[10px] uppercase tracking-wider opacity-90 font-semibold">
                  Quick
                </p>
                <p className="text-sm font-extrabold">Answers</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ CATEGORY TABS ============ */}
      <section className="relative bg-[#E1F5FE] border-b border-[#4FC3F7]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`group relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 overflow-hidden ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] shadow-[0_10px_24px_rgba(79,195,247,0.4)] scale-105"
                  : "bg-white text-[#0F4C5C] border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 hover:text-[#29B6F6] hover:scale-105"
              }`}
            >
              <span className="relative z-10">All Questions</span>
            </button>
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 overflow-hidden ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] shadow-[0_10px_24px_rgba(79,195,247,0.4)] scale-105"
                    : "bg-white text-[#0F4C5C] border border-[#4FC3F7]/25 hover:border-[#4FC3F7]/60 hover:text-[#29B6F6] hover:scale-105"
                }`}
              >
                <span className="relative z-10">{cat.title}</span>
              </button>
            ))}
          </div>

          {search && (
            <p className="text-center mt-3 text-xs sm:text-sm font-semibold text-[#0A3A47]/70 animate-slideUp">
              Found{" "}
              <span className="text-[#29B6F6] font-extrabold">{totalResults}</span>{" "}
              {totalResults === 1 ? "Result" : "Results"} For "{search}"
            </p>
          )}
        </div>
      </section>

      {/* ============ FAQ LIST ============ */}
      <section
        id="faq-list"
        className="relative bg-[#E1F5FE] py-7 sm:py-10 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-[#4FC3F7]/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#0F4C5C]/6 blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {totalResults === 0 ? (
            <div className="text-center py-14 animate-slideUp">
              <div className="relative w-20 h-20 mx-auto mb-4">
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
            <div className="space-y-7 sm:space-y-9">
              {filteredCategories.map((cat, catIdx) => (
                <div
                  key={cat.id}
                  className="animate-slideUp"
                  style={{ animationDelay: `${catIdx * 0.08}s` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative flex-shrink-0">
                      <span className={`absolute inset-0 rounded-xl bg-gradient-to-br ${cat.bgFrom} ${cat.bgTo} blur-md opacity-50 animate-pulse`} />
                      <span className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${cat.bgFrom} ${cat.bgTo} text-white flex items-center justify-center font-extrabold text-xs sm:text-sm ${cat.shadow}`}>
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

                  <div className="space-y-2.5">
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

          {totalResults > 0 && (
            <div className="mt-10 relative bg-gradient-to-br from-white to-[#E1F5FE] rounded-2xl border border-[#4FC3F7]/25 p-5 sm:p-6 text-center overflow-hidden animate-slideUp">
              <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-white shadow-[0_6px_18px_rgba(15,76,92,0.08)] flex items-center justify-center group hover:bg-[#4FC3F7]/10 transition-all duration-300 hover:scale-110 hover:rotate-6">
                <FaHeadset className="text-[#8B5CF6] text-lg" />
              </div>

              <h3 className="font-[Plus_Jakarta_Sans] text-lg sm:text-xl font-extrabold text-[#0F4C5C] mb-2">
                Still Have Questions?
              </h3>
              <p className="text-[#0A3A47]/75 text-sm sm:text-base max-w-md mx-auto mb-4">
                Can't Find The Answer You're Looking For? Our Team Is Here To Help You.
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

      {/* ============ CTA ============ */}
      <section className="relative py-10 sm:py-12 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-8 sm:py-10 text-center overflow-hidden border border-[#4FC3F7]/25 shadow-[0_24px_60px_rgba(15,76,92,0.25)] group/cta">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4FC3F7]/25 blur-3xl animate-blob" />
            <div
              className="absolute -bottom-24 -left-20 w-80 h-80 bg-[#FFD54F]/15 blur-3xl animate-blob"
              style={{ animationDelay: "2.5s" }}
            />

            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#4FC3F7] to-transparent bg-[length:200%_100%] animate-[shimmer_4s_linear_infinite]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5 mb-3 backdrop-blur">
                <FaLightbulb className="text-[#FFB300] text-xs" />
                <span className="text-[#4FC3F7] text-xs sm:text-sm font-bold tracking-widest uppercase">
                  Our Recruitment Focus
                </span>
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                Recruiting Pakistani Talent For{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                  International Opportunities
                </span>
              </h2>

              <p className="text-white/80 text-sm sm:text-base mb-5 leading-relaxed">
                We Connect International Employers With Suitable Manpower From
                Pakistan, Providing A Structured Recruitment Process Covering
                Candidate Sourcing, Screening, Selection, Documentation, And
                Overseas Deployment Support.
              </p>

              <div className="flex flex-wrap justify-center gap-2.5 mb-6">
                {["Candidate Sourcing", "Screening", "Selection", "Documentation", "Deployment Support"].map((step, i) => (
                  <span
                    key={step}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4FC3F7] bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 px-3 py-1.5 rounded-full hover:bg-[#4FC3F7]/25 hover:scale-105 transition-all duration-300"
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
                  className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 sm:px-8 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base overflow-hidden"
                  style={{ animation: "gradientShift 4s ease infinite" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Contact Our Team</span>
                  <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 border border-[#4FC3F7]/40 text-[#4FC3F7] px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-[#4FC3F7]/10 hover:border-[#4FC3F7]/70 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
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