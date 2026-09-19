// src/pages/Careers.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaUsers,
  FaArrowRight,
  FaSearch,
  FaCheckCircle,
  FaBuilding,
  FaGraduationCap,
  FaShieldAlt,
  FaTimes,
  FaStar,
  FaFire,
  FaLayerGroup,
  FaFilter,
  FaGlobe,
  FaSlidersH,
  FaHandshake,
} from "react-icons/fa";
import { jobsApi } from "../api/api";

/* ============================================================
   JOB CARD
============================================================ */
const JobCard = ({ job, index, saved, onSave }) => (
  <div
    className="group relative bg-white rounded-2xl border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_55px_rgba(79,195,247,0.20)] overflow-hidden animate-slideUp"
    style={{ animationDelay: `${index * 0.06}s` }}
  >
    <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#29B6F6] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

    <div className="absolute top-5 right-5 flex gap-1.5 z-10">
      {job.featured && (
        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-[#0F4C5C] text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-[0_6px_14px_rgba(255,213,79,0.45)]">
          <FaStar className="text-[8px]" />
          Featured
        </span>
      )}
      {job.urgent && (
        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-[0_6px_14px_rgba(239,68,68,0.45)] animate-pulse">
          <FaFire className="text-[8px]" />
          Urgent
        </span>
      )}
    </div>

    <button
      onClick={(e) => {
        e.preventDefault();
        onSave(job._id || job.id);
      }}
      className={`absolute bottom-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 border ${
        saved
          ? "bg-[#FFB300] text-white border-[#FFB300]"
          : "bg-white text-[#0A3A47]/40 border-[#4FC3F7]/25 hover:text-[#FFB300] hover:border-[#FFB300]"
      }`}
      aria-label="Save Job"
    >
      <FaStar className="text-xs" />
    </button>

    <div className="p-6 pt-8">
      <div className="flex items-start gap-4 mb-5">
        <div className="relative flex-shrink-0">
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
          <span className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0F4C5C] to-[#0A3A47] text-white flex items-center justify-center shadow-[0_10px_24px_rgba(15,76,92,0.3)] group-hover:from-[#4FC3F7] group-hover:to-[#29B6F6] group-hover:scale-110 transition-all duration-500">
            <FaBriefcase className="text-lg" />
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-[Plus_Jakarta_Sans] font-extrabold text-[#0F4C5C] text-base sm:text-lg leading-tight mb-1.5 group-hover:text-[#29B6F6] transition-colors duration-300">
            {job.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#0A3A47]/70 font-semibold flex items-center gap-1.5 truncate">
            <FaBuilding className="text-[10px] text-[#22C55E] flex-shrink-0" />
            {job.company}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-5">
        <div className="flex items-center gap-2 text-[11px] text-[#0A3A47]/75 font-semibold bg-[#E1F5FE]/50 rounded-lg p-2.5">
          <FaMapMarkerAlt className="text-[#22C55E] text-[10px] flex-shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#0A3A47]/75 font-semibold bg-[#E1F5FE]/50 rounded-lg p-2.5">
          <FaClock className="text-[#FFB300] text-[10px] flex-shrink-0" />
          <span className="truncate">{job.type}</span>
        </div>
      </div>

      <div className="relative mb-5">
        <div className="h-px bg-gradient-to-r from-transparent via-[#4FC3F7]/25 to-transparent" />
      </div>

      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <FaMoneyBillWave className="text-[#22C55E] text-[10px]" />
            <span className="text-[9px] font-bold text-[#0A3A47]/50 uppercase tracking-widest">
              Salary
            </span>
          </div>
          <p className="text-sm font-extrabold bg-gradient-to-r from-[#0F4C5C] to-[#29B6F6] bg-clip-text text-transparent">
            {job.salary}
          </p>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1.5 mb-0.5 justify-end">
            <FaGraduationCap className="text-[#8B5CF6] text-[10px]" />
            <span className="text-[9px] font-bold text-[#0A3A47]/50 uppercase tracking-widest">
              Experience
            </span>
          </div>
          <p className="text-sm font-extrabold text-[#0F4C5C]">
            {job.experience}
          </p>
        </div>
      </div>

      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {job.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold text-[#0F4C5C] bg-[#E1F5FE] border border-[#4FC3F7]/30 px-2.5 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-[#4FC3F7]/15">
        <span className="text-[10px] text-[#0A3A47]/50 font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          {job.posted || "Recently"}
        </span>

        <Link
          to={`/apply/${job._id || job.id}`}
          className="group/btn relative inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0F4C5C] bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] px-4 py-2 rounded-full shadow-[0_8px_18px_rgba(79,195,247,0.35)] hover:shadow-[0_12px_28px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
          <span className="relative">Apply Now</span>
          <FaArrowRight className="relative text-[9px] group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  </div>
);

/* ============================================================
   PAGE
============================================================ */
const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCountry, setActiveCountry] = useState("all");
  const [savedJobs, setSavedJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await jobsApi.getAll();
        setJobs(data.jobs || []);
      } catch (err) {
        console.error("Failed To Load Jobs:", err);
        setError(err.message || "Failed To Load Jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
    const handleUpdate = () => fetchJobs();
    window.addEventListener("jobsUpdated", handleUpdate);
    return () => window.removeEventListener("jobsUpdated", handleUpdate);
  }, []);

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

  const toggleSave = (id) => {
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const CATEGORIES = [
    "all",
    ...Array.from(new Set(jobs.map((j) => j.category).filter(Boolean))),
  ];

  const COUNTRIES = [
    "all",
    ...Array.from(new Set(jobs.map((j) => j.country).filter(Boolean))),
  ];

  const filteredJobs = jobs.filter((job) => {
    const term = search.trim().toLowerCase();
    const matchesSearch =
      !term ||
      job.title?.toLowerCase().includes(term) ||
      job.company?.toLowerCase().includes(term) ||
      job.location?.toLowerCase().includes(term) ||
      (job.tags && job.tags.some((t) => t.toLowerCase().includes(term)));
    const matchesCategory =
      activeCategory === "all" || job.category === activeCategory;
    const matchesCountry =
      activeCountry === "all" || job.country === activeCountry;
    return matchesSearch && matchesCategory && matchesCountry;
  });

  const clearAll = () => {
    setSearch("");
    setActiveCategory("all");
    setActiveCountry("all");
  };

  const hasActiveFilters =
    search || activeCategory !== "all" || activeCountry !== "all";

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
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-blob { animation: blob 9s ease-in-out infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
        .animate-rotateSlow { animation: rotateSlow 30s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A]"
      >
        <div className="relative w-full h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/src/assets/find-jobs-2.png')" }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C5C]/10 via-[#0A3A47]/25 to-[#06303A]/30" />
          <div className="absolute inset-0 bg-[#0F4C5C]/25" />

          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(#4FC3F7 1px, transparent 1px), linear-gradient(90deg, #4FC3F7 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79,195,247,0.20), transparent 45%)`,
            }}
          />

          <div className="absolute -top-32 -right-40 w-[280px] h-[280px] rounded-full bg-[#4FC3F7]/15 blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-[260px] h-[260px] rounded-full bg-[#FFD54F]/10 blur-3xl" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-[400px] h-[400px] rounded-full border border-dashed border-[#4FC3F7]/10 animate-rotateSlow" />
          </div>

          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: "4px",
                height: "4px",
                left: `${5 + i * 10}%`,
                top: `${20 + (i % 4) * 20}%`,
                background:
                  i % 3 === 0
                    ? "#4FC3F7"
                    : i % 3 === 1
                    ? "#FFD54F"
                    : "#29B6F6",
                animationDelay: `${i * 0.3}s`,
                opacity: 0.7,
              }}
            />
          ))}

          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />

          <div className="relative z-10 h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 mb-4 bg-white/15 backdrop-blur-md border border-[#4FC3F7]/50 rounded-full px-3.5 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              <span className="text-white text-[10px] sm:text-xs font-bold tracking-wide uppercase">
                {jobs.length} Live {jobs.length === 1 ? "Position" : "Positions"} · Updated Daily
              </span>
            </div>

            <h1 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.05] tracking-tight mb-4 [text-shadow:_0_2px_12px_rgba(0,0,0,0.6)]">
              Your Next{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#29B6F6] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Chapter
              </span>{" "}
              Starts Here
            </h1>

            <p
              className="text-white/95 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-medium"
              style={{
                textShadow:
                  "0 1px 3px rgba(0,0,0,0.85), 0 2px 6px rgba(15,76,92,0.7)",
              }}
            >
              Explore Verified Overseas Opportunities From Trusted
              International Employers. Transparent Process. No Hidden Fees.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FILTER + JOB LIST ============ */}
      <section className="relative bg-gradient-to-b from-white via-[#E1F5FE]/40 to-white py-10 sm:py-14 overflow-hidden">
        <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-[#4FC3F7]/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#0F4C5C]/5 blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group/search">
              <span className="absolute inset-0 rounded-full bg-[#4FC3F7]/40 blur-xl opacity-0 group-focus-within/search:opacity-100 transition-opacity duration-500" />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4FC3F7] text-sm z-10" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Jobs By Title, Company, Location, Or Skill..."
                className="relative w-full bg-white border border-[#4FC3F7]/25 rounded-full pl-11 pr-24 py-3.5 text-sm text-[#0F4C5C] placeholder-[#0A3A47]/50 font-medium focus:outline-none focus:ring-2 focus:ring-[#4FC3F7]/60 focus:border-[#4FC3F7] shadow-[0_10px_30px_rgba(15,76,92,0.10)] transition-all duration-300"
              />
              {search ? (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#E1F5FE] hover:bg-[#4FC3F7]/20 flex items-center justify-center transition-colors"
                >
                  <FaTimes className="text-[10px] text-[#0F4C5C]" />
                </button>
              ) : (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] text-xs font-extrabold shadow-[0_6px_16px_rgba(79,195,247,0.4)] pointer-events-none">
                  Search
                </span>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
            {/* ===== SIDEBAR — Filters ===== */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-24">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden w-full flex items-center justify-between bg-white border border-[#4FC3F7]/25 rounded-2xl p-4 mb-4 shadow-[0_8px_24px_rgba(15,76,92,0.06)]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center">
                      <FaSlidersH className="text-white text-xs" />
                    </span>
                    <span className="text-sm font-bold text-[#0F4C5C]">
                      Filters
                    </span>
                    {hasActiveFilters && (
                      <span className="text-[9px] font-extrabold text-white bg-[#4FC3F7] px-1.5 py-0.5 rounded-full">
                        {filteredJobs.length}
                      </span>
                    )}
                  </div>
                  <FaTimes
                    className={`text-[#0F4C5C] text-xs transition-transform ${
                      showFilters ? "" : "rotate-45"
                    }`}
                  />
                </button>

                <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
                  <div className="relative bg-white rounded-2xl border border-[#4FC3F7]/25 p-5 shadow-[0_14px_40px_rgba(15,76,92,0.08)] overflow-hidden">
                    <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

                    <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-[#4FC3F7]/15">
                      <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-[0_6px_14px_rgba(79,195,247,0.35)]">
                        <FaFilter className="text-white text-xs" />
                      </span>
                      <div>
                        <p className="text-sm font-extrabold text-[#0F4C5C]">
                          Filters
                        </p>
                        <p className="text-[10px] text-[#0A3A47]/60 font-semibold">
                          {filteredJobs.length} Results
                        </p>
                      </div>
                    </div>

                    <div className="mb-5">
                      <p className="text-[10px] font-extrabold text-[#0A3A47]/60 uppercase tracking-widest mb-2.5">
                        Category
                      </p>
                      <div className="space-y-1.5">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`group w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                              activeCategory === cat
                                ? "bg-gradient-to-r from-[#4FC3F7]/20 to-transparent text-[#0F4C5C] border-l-2 border-[#4FC3F7]"
                                : "text-[#0A3A47]/70 hover:bg-[#E1F5FE] hover:text-[#0F4C5C]"
                            }`}
                          >
                            <span className="capitalize">
                              {cat === "all" ? "All Categories" : cat}
                            </span>
                            <span
                              className={`text-[10px] font-extrabold ${
                                activeCategory === cat
                                  ? "text-[#4FC3F7]"
                                  : "text-[#0A3A47]/40"
                              }`}
                            >
                              {cat === "all"
                                ? jobs.length
                                : jobs.filter((j) => j.category === cat)
                                    .length}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-5">
                      <p className="text-[10px] font-extrabold text-[#0A3A47]/60 uppercase tracking-widest mb-2.5">
                        Country
                      </p>
                      <div className="space-y-1.5">
                        {COUNTRIES.map((c) => (
                          <button
                            key={c}
                            onClick={() => setActiveCountry(c)}
                            className={`group w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                              activeCountry === c
                                ? "bg-gradient-to-r from-[#4FC3F7]/20 to-transparent text-[#0F4C5C] border-l-2 border-[#4FC3F7]"
                                : "text-[#0A3A47]/70 hover:bg-[#E1F5FE] hover:text-[#0F4C5C]"
                            }`}
                          >
                            <span className="capitalize">
                              {c === "all" ? "All Countries" : c}
                            </span>
                            <span
                              className={`text-[10px] font-extrabold ${
                                activeCountry === c
                                  ? "text-[#4FC3F7]"
                                  : "text-[#0A3A47]/40"
                              }`}
                            >
                              {c === "all"
                                ? jobs.length
                                : jobs.filter((j) => j.country === c).length}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {hasActiveFilters && (
                      <button
                        onClick={clearAll}
                        className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-2 rounded-lg transition-all duration-300"
                      >
                        <FaTimes className="text-[10px]" />
                        Clear All Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* ===== MAIN — Jobs Grid ===== */}
            <div className="lg:col-span-9">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-12 h-12 rounded-full border-4 border-[#4FC3F7]/30 border-t-[#4FC3F7] animate-spin" />
                  <p className="mt-4 text-sm text-[#0A3A47]/70 font-semibold">
                    Loading Jobs...
                  </p>
                </div>
              ) : error ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#4FC3F7]/20">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                    <FaTimes className="text-red-500 text-xl" />
                  </div>
                  <h3 className="font-bold text-[#0F4C5C] text-lg mb-2">
                    Failed To Load Jobs
                  </h3>
                  <p className="text-[#0A3A47]/70 text-sm mb-5">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#29B6F6] border border-[#4FC3F7]/40 hover:border-[#4FC3F7]/80 px-4 py-2 rounded-full"
                  >
                    Try Again
                  </button>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#4FC3F7]/20 animate-slideUp">
                  <div className="relative w-20 h-20 mx-auto mb-5">
                    <span className="absolute inset-0 rounded-full bg-[#4FC3F7]/20 animate-ping" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#4FC3F7]/20 to-[#29B6F6]/20 flex items-center justify-center border-2 border-[#4FC3F7]/30">
                      <FaLayerGroup className="text-[#4FC3F7] text-2xl" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#0F4C5C] text-lg mb-2">
                    No Jobs Posted Yet
                  </h3>
                  <p className="text-[#0A3A47]/70 text-sm mb-5">
                    Check Back Soon Or Submit Your CV To Be Notified.
                  </p>
                  <Link
                    to="/submit-cv"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#29B6F6] hover:text-[#0F4C5C] border border-[#4FC3F7]/40 hover:border-[#4FC3F7]/80 px-4 py-2 rounded-full transition-all"
                  >
                    Submit Your CV
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#4FC3F7]/20 animate-slideUp">
                  <div className="relative w-20 h-20 mx-auto mb-5">
                    <span className="absolute inset-0 rounded-full bg-[#4FC3F7]/20 animate-ping" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#4FC3F7]/20 to-[#29B6F6]/20 flex items-center justify-center border-2 border-[#4FC3F7]/30">
                      <FaSearch className="text-[#FFB300] text-2xl" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#0F4C5C] text-lg mb-2">
                    No Jobs Found
                  </h3>
                  <p className="text-[#0A3A47]/70 text-sm mb-5">
                    Try A Different Search Term Or Filter.
                  </p>
                  <button
                    onClick={clearAll}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#29B6F6] hover:text-[#0F4C5C] border border-[#4FC3F7]/40 hover:border-[#4FC3F7]/80 px-4 py-2 rounded-full transition-all"
                  >
                    <FaTimes className="text-[10px]" />
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-xs sm:text-sm font-bold text-[#0A3A47]/70">
                      Showing{" "}
                      <span className="text-[#29B6F6] font-extrabold">
                        {filteredJobs.length}
                      </span>{" "}
                      {filteredJobs.length === 1 ? "Job" : "Jobs"}
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearAll}
                        className="text-[10px] font-bold text-[#29B6F6] hover:text-[#0F4C5C] uppercase tracking-widest"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    {filteredJobs.map((job, idx) => (
                      <JobCard
                        key={job._id || job.id}
                        job={job}
                        index={idx}
                        saved={savedJobs.includes(job._id || job.id)}
                        onSave={toggleSave}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative py-12 sm:py-16 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-10 sm:py-14 text-center overflow-hidden border border-[#4FC3F7]/25 shadow-[0_24px_60px_rgba(15,76,92,0.25)]">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4FC3F7]/25 blur-3xl animate-blob" />
            <div
              className="absolute -bottom-24 -left-20 w-80 h-80 bg-[#FFD54F]/15 blur-3xl animate-blob"
              style={{ animationDelay: "2.5s" }}
            />

            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#4FC3F7] to-transparent bg-[length:200%_100%] animate-[shimmer_4s_linear_infinite]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 flex items-center justify-center">
                <FaUsers className="text-[#FFB300] text-2xl" />
              </div>

              <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                Don't See The Right Fit?{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                  Submit Your CV
                </span>
              </h2>

              <p className="text-white/80 text-sm sm:text-base mb-7 leading-relaxed">
                New Opportunities Arrive Every Week. Send Us Your CV And Our
                Team Will Contact You The Moment A Matching Vacancy Becomes
                Available.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/submit-cv"
                  className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 sm:px-8 py-3.5 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base overflow-hidden"
                  style={{ animation: "gradientShift 4s ease infinite" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Submit Your CV</span>
                  <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-[#4FC3F7]/40 text-[#4FC3F7] px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-[#4FC3F7]/10 hover:border-[#4FC3F7]/70 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                >
                  Talk To Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;