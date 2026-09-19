// src/pages/OurTeam.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaLinkedinIn,
  FaEnvelope,
  FaUsers,
  FaAward,
  FaGlobeAsia,
  FaHandshake,
} from "react-icons/fa";

const TEAM_MEMBERS = [
  { name: "Muhammad Ahmad", designation: "Chief Executive Officer", img: "/src/assets/our-team/img-1.png" },
  { name: "Fatima Khan", designation: "Director Operations", img: "/src/assets/our-team/img-2.png" },
  { name: "Ali Hassan", designation: "Head Of Recruitment", img: "/src/assets/our-team/img-8.png" },
  { name: "Ayesha Siddiqui", designation: "HR Manager", img: "/src/assets/our-team/img-9.png" },
  { name: "Usman Tariq", designation: "Overseas Employment Manager", img: "/src/assets/our-team/img-10.png" },
  { name: "Zainab Malik", designation: "Client Relations Manager", img: "/src/assets/our-team/img-6.png" },
  { name: "Bilal Ahmed", designation: "Visa Processing Officer", img: "/src/assets/our-team/img-.png" },
  { name: "Hira Sheikh", designation: "Documentation Specialist", img: "/src/assets/our-team/img-13.png" },
  { name: "Kamran Yousaf", designation: "Trade Test Coordinator", img: "/src/assets/our-team/img-.png" },
  { name: "Sana Riaz", designation: "Compliance Officer", img: "/src/assets/our-team/img-.png" },
  { name: "Imran Ali", designation: "Marketing Manager", img: "/src/assets/our-team/img-.png"},
  { name: "Nadia Iqbal", designation: "Accounts Manager", img: "/src/assets/our-team/img-.png" },
  { name: "Faisal Mehmood", designation: "IT Support Specialist", img: "/src/assets/our-team/img-.png" },
  { name: "Maryam Nawaz", designation: "Candidate Support Officer", img: "/src/assets/our-team/img-.png" },
  { name: "Shahid Bhatti", designation: "Business Development Manager", img: "/src/assets/our-team/img-x.png"},
];

const OurTeam = () => {
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
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 0.75; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
        .animate-ping-slow { animation: pingSlow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .title-case { text-transform: capitalize; }
      `}</style>

      {/* ================= HERO ================= */}
      <section className="relative min-h-[265px] flex items-center justify-center pt-8 sm:pt-14 pb-6 sm:pb-6 overflow-hidden bg-gradient-to-b from-white via-[#E1F5FE] to-white !mt-0">
        <div className="absolute -top-32 -right-40 w-[280px] sm:w-[380px] md:w-[480px] h-[280px] sm:h-[380px] md:h-[480px] rounded-full bg-[#4FC3F7]/10 blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 -left-40 w-[220px] sm:w-[300px] md:w-[380px] h-[220px] sm:h-[300px] md:h-[380px] rounded-full bg-[#FFD54F]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[180px] sm:w-[220px] md:w-[260px] h-[180px] sm:h-[220px] md:h-[260px] rounded-full bg-[#4FC3F7]/8 blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3 bg-white/95 backdrop-blur-sm border border-[#4FC3F7]/40 rounded-full px-3.5 py-1.5 shadow-[0_4px_14px_rgba(15,76,92,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-ping-slow" />
            <span className="text-[#0F4C5C] text-[11px] sm:text-xs font-bold uppercase tracking-wider title-case">
              Our People
            </span>
          </div>

          <h1 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-[#0F4C5C] leading-[1.15] mb-3 title-case">
            Meet The Experts Behind{" "}
            <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
              Every Successful Placement
            </span>
          </h1>

          <p className="text-[#0A3A47] text-xs sm:text-sm md:text-base leading-relaxed font-medium max-w-2xl mx-auto title-case">
            A Dedicated Team Of Recruitment Specialists, Compliance Officers,
            And Overseas Employment Experts — Working Together To Connect
            Pakistani Talent With Trusted Employers Worldwide.
          </p>
        </div>
      </section>

      {/* ================= TEAM GRID ================= */}
      <section className="relative bg-white py-12 sm:py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={`${member.name}-${idx}`}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/60 shadow-[0_6px_20px_rgba(15,76,92,0.06)] hover:shadow-[0_18px_40px_rgba(79,195,247,0.20)] hover:-translate-y-2 transition-all duration-500 animate-fadeIn"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* ================= IMAGE ================= */}
                <div className="relative h-[240px] sm:h-[260px] lg:h-[280px] overflow-hidden bg-[#E1F5FE]">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = `
                        <div class="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-[#E1F5FE] to-white">
                          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#29B6F6] flex items-center justify-center shadow-lg">
                            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                            </svg>
                          </div>
                        </div>
                      `;
                    }}
                  />

                  {/* Light white shade on hover */}
                  <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Social Icons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      aria-label={`${member.name} LinkedIn`}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0F4C5C] hover:bg-[#4FC3F7] hover:text-white transition-colors shadow-lg"
                    >
                      <FaLinkedinIn className="text-sm" />
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      aria-label={`Email ${member.name}`}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0F4C5C] hover:bg-[#4FC3F7] hover:text-white transition-colors shadow-lg"
                    >
                      <FaEnvelope className="text-sm" />
                    </a>
                  </div>
                </div>

                {/* ================= INFO ================= */}
                <div className="p-3.5 sm:p-4 text-center bg-white">
                  <h3 className="font-[Plus_Jakarta_Sans] text-sm sm:text-base font-extrabold text-[#0F4C5C] leading-tight mb-1 truncate title-case">
                    {member.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-bold text-[#29B6F6] uppercase tracking-wider leading-tight title-case">
                    {member.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY OUR TEAM ================= */}
      <section className="relative bg-gradient-to-b from-white to-[#E1F5FE]/40 py-14 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-extrabold tracking-[0.3em] uppercase mb-2 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite] title-case">
              Our Strength
            </p>

            <h2 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-black text-[#0F4C5C] leading-tight tracking-tight mb-3 title-case">
              Driven By{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Experience & Integrity
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: FaUsers, title: "Expert Team", desc: "Skilled Professionals With Years Of Recruitment Experience.", gradient: "from-[#4FC3F7] to-[#29B6F6]" },
              { icon: FaAward, title: "Certified Process", desc: "ISO 9001:2015 Certified Recruitment Operations.", gradient: "from-[#FFD54F] to-[#FFB300]" },
              { icon: FaGlobeAsia, title: "Global Network", desc: "Strong Employer Connections Across GCC And East Asia.", gradient: "from-[#29B6F6] to-[#4FC3F7]" },
              { icon: FaHandshake, title: "Trusted Support", desc: "End-To-End Guidance For Employers And Candidates.", gradient: "from-[#0F4C5C] to-[#0A3A47]" },
            ].map(({ icon: Icon, title, desc, gradient }, idx) => (
              <div
                key={title}
                className="group relative bg-white rounded-2xl p-5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/60 hover:shadow-[0_20px_45px_rgba(79,195,247,0.15)] hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-fadeIn"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md`}>
                  <Icon className="text-white text-sm" />
                </div>

                <h3 className="font-[Plus_Jakarta_Sans] text-sm font-extrabold text-[#0F4C5C] mb-1.5 leading-tight title-case">
                  {title}
                </h3>

                <p className="text-[11px] text-[#0A3A47]/75 leading-relaxed title-case">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative bg-white py-14 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-extrabold tracking-[0.3em] uppercase mb-3 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite] title-case">
            Let's Work Together
          </p>

          <h2 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl font-black text-[#0F4C5C] leading-[1.05] tracking-tight mb-5 max-w-2xl mx-auto title-case">
            Ready To Build Your Global Workforce?
          </h2>

          <p className="text-[#0A3A47]/70 text-sm max-w-lg mx-auto mb-7 leading-relaxed title-case">
            Our Team Is Ready To Help You Find The Right Talent From Pakistan.
            Reach Out And Let's Get Started.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-7 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 shadow-[0_12px_25px_rgba(79,195,247,0.35)] hover:shadow-[0_16px_35px_rgba(255,213,79,0.5)] overflow-hidden"
              style={{ animation: "gradientShift 4s ease infinite" }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative title-case">Contact Our Team</span>
              <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/process"
              className="inline-flex items-center gap-2 border border-[#4FC3F7]/40 text-[#0F4C5C] px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-[#E1F5FE] hover:border-[#4FC3F7]/70 transition-all duration-300 title-case"
            >
              Our Process
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurTeam;