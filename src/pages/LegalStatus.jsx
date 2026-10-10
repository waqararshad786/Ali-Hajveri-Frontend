// src/pages/LegalStatus.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaArrowRight,
  FaShieldAlt,
  FaFileContract,
  FaLandmark,
  FaCertificate,
  FaStamp,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaAward,
  FaHandshake,
  FaGlobeAsia,
} from "react-icons/fa";

const LegalStatus = () => {
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setHeroMouse({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const legalItems = [
    {
      id: 1,
      code: "SECP",
      title: "Certificate Of Incorporation",
      subtitle: "Securities & Exchange Commission",
      link: "/legal-status/govt-license",
      icon: FaLandmark,
      accent: "from-[#4FC3F7] to-[#29B6F6]",
    },
    {
      id: 2,
      code: "FBR",
      title: "Tax Registration",
      subtitle: "Federal Board Of Revenue",
      link: "/legal-status/govt-license",
      icon: FaFileContract,
      accent: "from-[#FFD54F] to-[#FFB300]",
    },
    {
      id: 3,
      code: "BEOE",
      title: "OEP License",
      subtitle: "Bureau Of Emigration",
      link: "/legal-status/govt-license",
      icon: FaStamp,
      accent: "from-[#29B6F6] to-[#4FC3F7]",
    },
    {
      id: 4,
      code: "ISO",
      title: "ISO Certifications",
      subtitle: "International Standards",
      link: "/legal-status/iso-certification",
      icon: FaAward,
      accent: "from-[#0F4C5C] to-[#0A3A47]",
    },
  ];

  return (
    <>
      {/* ============ SEO META TAGS ============ */}
      <Helmet>
        <title>Legal Status | Licensed Overseas Employment Promoter | Ali Hajveri</title>
        <meta
          name="description"
          content="Legal status of Ali Hajveri International (Pvt.) Limited - SECP incorporated, FBR registered, BEOE licensed overseas employment promoter with OEP License #5224, and ISO certified recruitment processes."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ahioep.com/legal-status" />
        <meta property="og:title" content="Legal Status | Licensed Overseas Employment Promoter | Ali Hajveri" />
        <meta property="og:description" content="Government registrations, OEP license, and international certifications that authorize our overseas recruitment operations in Pakistan." />
        <meta property="og:url" content="https://ahioep.com/legal-status" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ============ SEO CONTENT (Visually Hidden, Sirf Google Ke Liye) ============ */}
      <div className="sr-only" aria-hidden="true">
        <h1>Legal Status Of Ali Hajveri International - Licensed Overseas Employment Promoter In Pakistan</h1>
        <p>
          Ali Hajveri International (Pvt.) Limited Is A Fully Registered,
          Licensed, And Certified Overseas Employment Promoter In Pakistan. Our
          Legal Status Includes Government Registrations, An Active Overseas
          Employment Promoter License, And International Certifications That
          Authorize Our Operations In Pakistan And Abroad.
        </p>

        <h2>SECP Certificate Of Incorporation</h2>
        <p>
          Ali Hajveri International (Pvt.) Limited Is Incorporated Under The
          Companies Act 2017 With The Securities And Exchange Commission Of
          Pakistan (SECP). Our Corporate Registration Confirms Our Legal
          Existence As A Private Limited Company Authorized To Conduct
          Business In Pakistan.
        </p>

        <h2>FBR Tax Registration</h2>
        <p>
          We Are Registered With The Federal Board Of Revenue (FBR) As A
          Tax-Compliant Business Entity. Our Active Tax Registration Confirms
          Our Commitment To Financial Transparency And Legal Compliance.
        </p>

        <h2>BEOE Overseas Employment Promoter License</h2>
        <p>
          Ali Hajveri International Holds A Valid Overseas Employment Promoter
          (OEP) License Number OP&HRD/5224/LHR/2026 Issued By The Bureau Of
          Emigration And Overseas Employment (BEOE), Ministry Of Overseas
          Pakistanis And Human Resource Development, Government Of Pakistan.
          This License Authorizes Us To Recruit Pakistani Workers For Overseas
          Employment And Is Independently Verifiable On The Official BEOE
          Portal.
        </p>

        <h2>ISO Certifications</h2>
        <p>
          We Maintain ISO Certified Recruitment Processes Aligned With
          International Standards. Our Quality Management System Ensures
          Consistent Excellence In Every Stage Of The Recruitment And
          Deployment Cycle.
        </p>

        <h2>Why Legal Status Matters</h2>
        <p>
          Choosing A Legally Registered And Licensed Overseas Employment
          Promoter Is Critical For Both International Employers And Pakistani
          Candidates. A Valid OEP License Confirms That The Promoter Is
          Authorized By The Government Of Pakistan To Recruit Workers For
          Overseas Employment. It Also Provides Legal Protection To Workers
          And Ensures Proper Documentation And Compliance.
        </p>

        <h2>How To Verify Our Legal Status</h2>
        <p>
          International Employers And Candidates Can Independently Verify Our
          Legal Status By Checking Our OEP License Number 5224 On The Official
          BEOE Portal. Our Corporate Registration Can Be Verified Through SECP
          Records, And Our Tax Registration Is Publicly Available Through FBR.
        </p>

        <h2>Our Commitment To Legal Compliance</h2>
        <ul>
          <li>Full Compliance With BEOE Regulations And Pakistani Laws</li>
          <li>Complete Documentation For Every Deployed Worker</li>
          <li>Proper Protector Of Emigrants Formalities</li>
          <li>Foreign Service Agreement Registration</li>
          <li>Transparent Financial Practices</li>
          <li>Ethical Recruitment Standards</li>
        </ul>

        <h2>Contact Ali Hajveri International</h2>
        <p>
          For More Information About Our Legal Status Or To Verify Our
          Credentials, Contact Ali Hajveri International (Pvt.) Limited.
          Website: ahioep.com | Email: ahioep.com@gmail.com | Phone: +92 300
          8578764
        </p>

        <h2>Internal Links</h2>
        <nav>
          <Link to="/legal-status/govt-license">Government License</Link>
          <Link to="/legal-status/iso-certification">ISO Certification</Link>
          <Link to="/about">About Us</Link>
          <Link to="/process/quality-policy">Quality Policy</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/faq">FAQ</Link>
        </nav>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
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
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .animate-fadeIn { animation: fadeIn 0.7s ease-out forwards; }
        .animate-blob { animation: blob 10s ease-in-out infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-rotateSlow { animation: rotateSlow 25s linear infinite; }
        .animate-pulseRing { animation: pulseRing 2.5s ease-out infinite; }

        .shine-btn {
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 1s ease;
        }
        .group:hover .shine-btn {
          transform: translateX(100%);
        }

        .legal-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .legal-card:hover {
          transform: translateY(-6px);
        }
        .legal-card:hover .legal-icon {
          transform: scale(1.15) rotate(-8deg);
        }
        .legal-icon {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A]">
        <div
          ref={heroRef}
          className="relative w-full min-h-[480px] overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#4FC3F7 1px, transparent 1px), linear-gradient(90deg, #4FC3F7 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at ${heroMouse.x}px ${heroMouse.y}px, rgba(79,195,247,0.20), transparent 45%)`,
            }}
          />

          <div className="absolute -top-32 -right-40 w-[400px] h-[400px] bg-[#4FC3F7]/25 blur-3xl animate-blob" />
          <div
            className="absolute bottom-0 -left-40 w-[360px] h-[360px] bg-[#FFD54F]/15 blur-3xl animate-blob"
            style={{ animationDelay: "2s" }}
          />

          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full opacity-60 animate-float"
              style={{
                left: `${8 + i * 11}%`,
                top: `${15 + (i % 4) * 20}%`,
                background:
                  i % 3 === 0
                    ? "#4FC3F7"
                    : i % 3 === 1
                    ? "#FFD54F"
                    : "#29B6F6",
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left animate-fadeIn">
                <div className="inline-flex items-center gap-2 mb-5 bg-white/15 backdrop-blur-md border border-[#4FC3F7]/50 rounded-full px-3.5 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#4FC3F7] opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4FC3F7]" />
                  </span>
                  <span className="text-white text-xs sm:text-sm font-bold tracking-wide">
                    Government Verified · Fully Licensed
                  </span>
                </div>

                <h1 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.15] tracking-tight mb-4 [text-shadow:_0_2px_15px_rgba(0,0,0,0.5)]">
                  Legal{" "}
                  <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                    Status
                  </span>
                </h1>

                <p
                  className="text-white/85 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium mb-6"
                  style={{
                    textShadow:
                      "0 1px 3px rgba(0,0,0,0.85), 0 2px 6px rgba(15,76,92,0.7)",
                  }}
                >
                  Every Registration, License, And Certification That Gives Us
                  The Legal Right To Serve Pakistan's Workforce.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a
                    href="#legal-section"
                    className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-6 py-3 rounded-full font-bold shadow-[0_12px_30px_rgba(79,195,247,0.4)] hover:shadow-[0_18px_42px_rgba(255,213,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base overflow-hidden"
                    style={{ animation: "gradientShift 4s ease infinite" }}
                  >
                    <span className="shine-btn" />
                    <span className="relative">View Documents</span>
                    <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-[#0F4C5C] hover:border-white transition-all duration-300 text-sm sm:text-base backdrop-blur-md"
                  >
                    <FaHandshake className="text-sm" aria-hidden="true" />
                    Verify With Us
                  </Link>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[110%] h-[110%] rounded-full border border-[#4FC3F7]/20 animate-rotateSlow" />
                    <div
                      className="absolute w-[120%] h-[120%] rounded-full border border-dashed border-[#FFD54F]/20 animate-rotateSlow"
                      style={{ animationDirection: "reverse" }}
                    />
                  </div>

                  <div className="absolute -inset-8 bg-gradient-to-br from-[#4FC3F7]/30 via-[#FFD54F]/20 to-[#29B6F6]/30 blur-3xl rounded-full opacity-60" />

                  <div className="relative animate-float">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#4FC3F7] via-[#FFD54F] to-[#29B6F6] opacity-50 blur-md" />

                    <div className="relative rounded-2xl overflow-hidden border-2 border-white/40 bg-white shadow-[0_30px_70px_rgba(15,76,92,0.3)]">
                      <img
                        src="/src/assets/legal-status.png"
                        alt="Legal Status Documents Of Ali Hajveri International - Licensed Overseas Employment Promoter In Pakistan"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          e.target.parentElement.innerHTML = `
                            <div class="w-full aspect-[4/5] bg-gradient-to-br from-[#0F4C5C] via-[#0A3A47] to-[#06303A] flex items-center justify-center relative overflow-hidden rounded-2xl">
                              <div class="absolute inset-0 opacity-10" style="background-image: repeating-linear-gradient(45deg, #4FC3F7 0, #4FC3F7 1px, transparent 0, transparent 50%); background-size: 20px 20px;"></div>
                              <div class="relative text-center p-6">
                                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] mx-auto flex items-center justify-center mb-3 shadow-2xl">
                                  <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                                </div>
                                <p class="text-lg font-black text-white mb-1">Legally Verified</p>
                                <p class="text-xs text-white/70 tracking-wide mb-4">Government Of Pakistan</p>
                                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20">
                                  <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                  <span class="text-xs font-bold text-white">OP&HRD/5224/LHR/2026</span>
                                </div>
                              </div>
                            </div>
                          `;
                        }}
                      />
                    </div>

                    <div className="absolute -top-3 -left-3 px-3 py-1.5 bg-white rounded-xl shadow-lg border border-[#4FC3F7]/20 flex items-center gap-2 animate-float" style={{ animationDelay: "0.5s" }}>
                      <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center">
                        <FaShieldAlt className="text-white text-[10px]" aria-hidden="true" />
                      </span>
                      <div className="leading-tight">
                        <p className="text-[8px] sm:text-[9px] font-bold text-[#0A3A47]/50">
                          Status
                        </p>
                        <p className="text-[11px] sm:text-xs font-black text-[#0F4C5C]">
                          100% Verified
                        </p>
                      </div>
                    </div>

                    <div className="absolute -bottom-3 -right-3 px-3 py-1.5 bg-white rounded-xl shadow-lg border border-[#FFD54F]/30 flex items-center gap-2 animate-float" style={{ animationDelay: "1.5s" }}>
                      <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#FFD54F] to-[#FFB300] flex items-center justify-center">
                        <FaCertificate className="text-white text-[10px]" aria-hidden="true" />
                      </span>
                      <div className="leading-tight">
                        <p className="text-[8px] sm:text-[9px] font-bold text-[#0A3A47]/50">
                          Certifications
                        </p>
                        <p className="text-[11px] sm:text-xs font-black text-[#0F4C5C]">
                          04 Active
                        </p>
                      </div>
                    </div>
                  </div>

                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-2 border-[#4FC3F7]/30 animate-pulseRing pointer-events-none" />
                  <span
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-2 border-[#FFD54F]/20 animate-pulseRing pointer-events-none"
                    style={{ animationDelay: "1.25s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2 — Cards Grid ============ */}
      <section
        id="legal-section"
        className="relative py-8 sm:py-10 bg-gradient-to-b from-white via-[#E1F5FE]/60 to-white overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute top-20 -left-40 w-[380px] h-[380px] bg-[#4FC3F7]/10 blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-[340px] h-[340px] bg-[#FFD54F]/8 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7 sm:mb-9">
            <div className="inline-flex items-center gap-2 mb-3 bg-white border border-[#4FC3F7]/30 rounded-full px-3.5 py-1.5 shadow-[0_4px_14px_rgba(79,195,247,0.1)]">
              <FaShieldAlt className="text-[#4FC3F7] text-xs" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-extrabold tracking-wide bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Our Credentials
              </span>
            </div>
            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F4C5C] leading-tight tracking-tight mb-3">
              Registered.{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#29B6F6] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Licensed.
              </span>{" "}
              Accountable.
            </h2>
            <p className="text-sm sm:text-base text-[#0A3A47]/70 max-w-xl mx-auto leading-relaxed font-medium">
              Government Registrations And International Certifications That
              Authorize Our Operations In Pakistan And Abroad.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {legalItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.link}
                  className="legal-card group relative bg-white rounded-2xl p-5 border-2 border-[#4FC3F7]/25 hover:border-[#4FC3F7]/70 shadow-[0_10px_30px_rgba(15,76,92,0.10)] hover:shadow-[0_22px_50px_rgba(79,195,247,0.22)] overflow-hidden animate-fadeIn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4FC3F7] focus-visible:ring-offset-2"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                  <div
                    className={`legal-icon w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center mb-4 shadow-[0_8px_20px_rgba(79,195,247,0.3)]`}
                  >
                    <Icon className="text-white text-base" aria-hidden="true" />
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-xs sm:text-sm font-extrabold tracking-wide bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                      {item.code}
                    </span>
                    <FaCheckCircle className="text-green-500 text-xs" aria-hidden="true" />
                  </div>

                  <h3 className="text-sm font-extrabold text-[#0F4C5C] leading-tight mb-1.5 group-hover:text-[#4FC3F7] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#0A3A47]/60 font-semibold leading-snug mb-4">
                    {item.subtitle}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4FC3F7] opacity-80 group-hover:opacity-100 transition-all">
                    <span>View Details</span>
                    <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-7 sm:mt-9 text-center">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 border-2 border-[#0F4C5C]/30 text-[#0F4C5C] px-7 py-3 rounded-full font-bold text-sm sm:text-base hover:bg-[#0F4C5C] hover:text-white hover:border-[#0F4C5C] hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Verify With Our Team</span>
              <FaExternalLinkAlt className="text-xs group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalStatus;