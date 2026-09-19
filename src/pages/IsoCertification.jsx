// src/pages/IsoCertification.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHandshake,
  FaCheckCircle,
  FaGlobeAsia,
  FaClipboardCheck,
  FaCertificate,
} from "react-icons/fa";

const IsoCertification = () => {
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 0.75; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
        .animate-ping-slow { animation: pingSlow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-gentle-float { animation: gentleFloat 4s ease-in-out infinite; }
        .animate-gentle-float-slow { animation: gentleFloat 5.5s ease-in-out infinite; }

        .img-shine {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: inherit;
        }
        .img-shine::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, 0.55) 50%,
            rgba(255, 255, 255, 0) 60%,
            transparent 100%
          );
          transform: rotate(8deg);
          animation: shineSweep 4.5s ease-in-out infinite;
        }
        @keyframes shineSweep {
          0% { left: -75%; opacity: 0; }
          20% { opacity: 1; }
          50% { left: 125%; opacity: 1; }
          51% { opacity: 0; }
          100% { left: 125%; opacity: 0; }
        }

        .btn-shine {
          position: relative;
          overflow: hidden;
        }
        .btn-shine::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.55),
            transparent
          );
          transition: left 0.7s ease;
        }
        .btn-shine:hover::before { left: 100%; }

        .reveal-up { animation: fadeIn 0.8s ease-out forwards; }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative mt-[-2rem] pt-44 sm:pt-28 md:pt-32 lg:pt-36 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-white via-[#E1F5FE] to-white">
        <div className="absolute -top-32 -right-40 w-[280px] sm:w-[380px] md:w-[480px] h-[280px] sm:h-[380px] md:h-[480px] rounded-full bg-[#4FC3F7]/10 blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 -left-40 w-[220px] sm:w-[300px] md:w-[380px] h-[220px] sm:h-[300px] md:h-[380px] rounded-full bg-[#FFD54F]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[180px] sm:w-[220px] md:w-[260px] h-[180px] sm:h-[220px] md:h-[260px] rounded-full bg-[#4FC3F7]/8 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-stretch">
            {/* ============ LEFT: TEXT (HOME HERO STYLE) ============ */}
            <div className="text-center lg:text-left animate-fadeIn">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 bg-white/95 backdrop-blur-sm border border-[#4FC3F7]/40 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-[0_4px_14px_rgba(15,76,92,0.12)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-ping-slow" />
                <span className="text-[#0F4C5C] text-xs sm:text-sm font-bold">
                  Internationally Certified
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold text-[#0F4C5C] leading-[1.15] mb-4 sm:mb-5">
                ISO Certified{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                  Third-Party Recruiter
                </span>
              </h1>

              {/* Sub-headline */}
              <div className="text-base sm:text-lg md:text-xl text-[#0F4C5C] mb-4 min-h-[28px] sm:h-8 font-bold">
                Trusted by{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent font-bold">
                  Global Employers
                </span>
                <span className="text-[#0F4C5C] animate-pulse font-bold">|</span>
              </div>

              {/* Paragraph */}
              <div className="flex justify-center lg:justify-start mb-8">
                <div className="max-w-2xl">
                  <p className="text-[#0A3A47] text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                    <span className="font-bold text-[#0F4C5C]">
                      Ali Hajveri International (Private) Limited
                    </span>{" "}
                    holds ISO certification as a licensed manpower recruitment
                    agency in Pakistan. Our certification for manpower
                    management reflects our commitment to internationally
                    recognized recruitment standards. ISO-certified agencies
                    are verified through rigorous independent audits — ensuring
                    legitimacy, credibility, and accountability in every
                    operation.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10">
                <Link
                  to="/contact"
                  className="btn-shine group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_16px_38px_rgba(79,195,247,0.55)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
                >
                  Verify Our Certifications{" "}
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/legal-status/govt-license"
                  className="btn-shine inline-flex items-center justify-center gap-2 bg-white border-2 border-[#0F4C5C]/30 text-[#0F4C5C] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:border-[#4FC3F7] hover:bg-[#E1F5FE] transition-all duration-300 text-sm sm:text-base"
                >
                  Government License
                  <FaExternalLinkAlt className="text-xs" />
                </Link>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 md:gap-14">
                {[
                  { value: "04", label: "ISO Standards" },
                  { value: "100%", label: "Compliance" },
                  { value: "Global", label: "Recognition" },
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

            {/* ============ RIGHT: IMAGE ============ */}
            <div className="relative reveal-up group order-first lg:order-last">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FC3F7]/20 to-transparent rounded-2xl sm:rounded-3xl rotate-3 scale-[1.02] hidden sm:block" />

              <div className="relative h-[280px] sm:h-[340px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#4FC3F7]/20 shadow-[0_20px_50px_rgba(15,76,92,0.15)]">
                <img
                  src="/src/assets/licensed-img.png"
                  alt="ISO 9001:2015 Licensed Certificate — Ali Hajveri International (Private) Limited"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <span className="img-shine" />
              </div>

              {/* Floating badge bottom-left */}
              <div className="animate-gentle-float absolute -bottom-4 sm:-bottom-5 -left-4 sm:-left-5 bg-white rounded-2xl shadow-[0_16px_36px_rgba(15,76,92,0.12)] border border-[#4FC3F7]/25 px-4 py-3 max-w-[170px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#4FC3F7]/12 flex items-center justify-center">
                    <FaCheckCircle className="text-[#29B6F6] text-xs" />
                  </span>
                  <p className="text-[#0F4C5C] font-bold text-xs">Verified</p>
                </div>
                <p className="text-[#0A3A47] text-[10px] leading-relaxed">
                  DAS Pakistan Audited
                </p>
              </div>

              {/* Floating badge top-right */}
              <div className="animate-gentle-float-slow absolute top-4 -right-3 sm:top-5 sm:-right-4 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] rounded-xl shadow-[0_12px_30px_rgba(79,195,247,0.35)] px-3.5 py-2.5 hidden md:block">
                <p className="text-[10px] uppercase tracking-wider opacity-90 font-semibold">
                  Scope
                </p>
                <p className="text-sm font-extrabold">GCC · East Asia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CERTIFIED FOR YOUR PROTECTION ============ */}
      <section className="relative bg-white py-14 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.3em] uppercase mb-2 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
              Why ISO Matters
            </p>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-black text-[#0F4C5C] leading-tight tracking-tight mb-3">
              Certified For{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Your Protection
              </span>
            </h2>
            <p className="text-sm text-[#0A3A47]/70 max-w-xl mx-auto">
              International ISO certification gives our clients and candidates
              complete confidence in our processes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: FaShieldAlt,
                title: "Quality Assured",
                desc: "Consistent, reliable recruitment processes every time.",
                gradient: "from-[#4FC3F7] to-[#29B6F6]",
              },
              {
                icon: FaClipboardCheck,
                title: "Audited Annually",
                desc: "Regular third-party audits ensure we stay compliant.",
                gradient: "from-[#FFD54F] to-[#FFB300]",
              },
              {
                icon: FaGlobeAsia,
                title: "Global Recognition",
                desc: "ISO standards recognized in 160+ countries worldwide.",
                gradient: "from-[#29B6F6] to-[#4FC3F7]",
              },
              {
                icon: FaHandshake,
                title: "Trusted Partner",
                desc: "Employers and workers trust certified organizations.",
                gradient: "from-[#0F4C5C] to-[#0A3A47]",
              },
            ].map(({ icon: Icon, title, desc, gradient }, idx) => (
              <div
                key={title}
                className="group relative bg-gradient-to-b from-[#E1F5FE] to-white rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/60 hover:shadow-[0_20px_45px_rgba(79,195,247,0.15)] hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-fadeIn"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md`}
                >
                  <Icon className="text-white text-sm" />
                </div>
                <h3 className="font-[Plus_Jakarta_Sans] text-sm font-extrabold text-[#0F4C5C] mb-1.5 leading-tight">
                  {title}
                </h3>
                <p className="text-[11px] text-[#0A3A47]/75 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CERTIFIED EXCELLENCE ============ */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A]" />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #4FC3F7 0, #4FC3F7 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#4FC3F7]/20 blur-3xl animate-float" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#FFD54F]/15 blur-3xl animate-float" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <FaCertificate className="text-[#4FC3F7] text-3xl" />
          </div>

          <p className="text-[10px] font-extrabold tracking-[0.3em] uppercase mb-3 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
            Certified Excellence
          </p>

          <h3 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight max-w-3xl mx-auto mb-6">
            Internationally Recognized.{" "}
            <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#29B6F6] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
              Locally Trusted.
            </span>
          </h3>

          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mt-8 pt-6 border-t border-white/10">
            {["ISO 9001", "ISO 14001", "ISO 45001", "ISO 37001"].map(
              (code) => (
                <span
                  key={code}
                  className="text-[11px] font-bold text-white/70 uppercase tracking-widest flex items-center gap-2"
                >
                  <FaCheckCircle className="text-[#4FC3F7] text-[10px]" />
                  {code}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ============ OUR COMMITMENT (CTA) ============ */}
      <section className="relative bg-white py-14 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-extrabold tracking-[0.3em] uppercase mb-3 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
            Our Commitment
          </p>
          <h2 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl font-black text-[#0F4C5C] leading-[1.05] tracking-tight mb-5 max-w-2xl mx-auto">
            Excellence Through International Standards
          </h2>
          <p className="text-[#0A3A47]/70 text-sm max-w-lg mx-auto mb-7 leading-relaxed">
            Our ISO certifications represent our unwavering commitment to
            quality, safety, ethics, and environmental responsibility.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-7 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 shadow-[0_12px_25px_rgba(79,195,247,0.35)] hover:shadow-[0_16px_35px_rgba(255,213,79,0.5)] overflow-hidden"
              style={{ animation: "gradientShift 4s ease infinite" }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Contact Us</span>
              <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/legal-status/govt-license"
              className="inline-flex items-center gap-2 border border-[#4FC3F7]/40 text-[#0F4C5C] px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-[#E1F5FE] hover:border-[#4FC3F7]/70 transition-all duration-300"
            >
              Government License
              <FaExternalLinkAlt className="text-[9px]" />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-5 mt-8 pt-6 border-t border-[#4FC3F7]/15 text-[10px] text-[#0A3A47]/60 font-semibold">
            <span className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-[#29B6F6]" />
              Lahore, Pakistan
            </span>
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-[#FFD54F]" />
              Mon–Sat · 9AM – 6PM
            </span>
            <span className="flex items-center gap-1.5">
              <FaHandshake className="text-[#4FC3F7]" />
              Walk-Ins Welcome
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default IsoCertification;