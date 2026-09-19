// src/pages/GovtLicense.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaShieldAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaSyncAlt,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHandshake,
  FaSearchPlus,
} from "react-icons/fa";

const GovtLicense = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const documents = [
    {
      id: 1,
      authority: "SECP",
      title: "Certificate Of Incorporation",
      image: "/src/assets/certificates/certificate-of-incorporation.png",
    },
    {
      id: 2,
      authority: "FBR",
      title: "Tax Registration Certificate",
      image: "/src/assets/certificates/fbr.png",
    },
    {
      id: 3,
      authority: "FBR",
      title: "Taxpayer Registration Certificate",
      image: "/src/assets/certificates/tax-payer-regetration.png",
    },
    {
      id: 4,
      authority: "BEOE",
      title: "Overseas Employment Promoter License",
      imageFront: "/src/assets/license-1.png",
      imageBack: "/src/assets/certificates/license-bg.png",
      isLicense: true,
    },
  ];

  const openModal = (index) => {
    setActiveIndex(index);
    setFlipped(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFlipped(false);
  };

  const nextDoc = () => {
    setActiveIndex((prev) => (prev + 1) % documents.length);
    setFlipped(false);
  };

  const prevDoc = () => {
    setActiveIndex(
      (prev) => (prev - 1 + documents.length) % documents.length
    );
    setFlipped(false);
  };

  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextDoc();
      if (e.key === "ArrowLeft") prevDoc();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const active = documents[activeIndex];

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
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
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-modalIn { animation: modalIn 0.3s ease-out forwards; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-blob { animation: blob 9s ease-in-out infinite; }

        /* Cross-fade for license */
        .crossfade-front,
        .crossfade-back {
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .crossfade-back {
          opacity: 0;
          transform: scale(0.98);
        }
        .crossfade-wrap:hover .crossfade-front {
          opacity: 0;
          transform: scale(0.98);
        }
        .crossfade-wrap:hover .crossfade-back {
          opacity: 1;
          transform: scale(1);
        }

        /* Modal flip */
        .modal-flip {
          perspective: 1600px;
          width: 100%;
          height: 100%;
        }
        .modal-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .modal-flip-inner.flipped {
          transform: rotateY(180deg);
        }
        .modal-flip-front, .modal-flip-back {
          position: absolute;
          inset: 0;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-flip-back { transform: rotateY(180deg); }

        /* Card hover */
        .doc-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .doc-card:hover {
          transform: translateY(-6px);
        }
        .doc-card:hover .doc-img {
          transform: scale(1.04);
        }
        .doc-img {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Shine effect */
        .shine-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 1s ease;
          pointer-events: none;
        }
        .doc-card:hover .shine-effect {
          transform: translateX(100%);
        }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative bg-white pt-20 pb-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0F4C5C 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute top-20 -left-40 w-[380px] h-[380px] bg-[#4FC3F7]/20 blur-3xl animate-blob" />
        <div
          className="absolute bottom-0 -right-40 w-[360px] h-[360px] bg-[#FFD54F]/15 blur-3xl animate-blob"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[10px] font-extrabold tracking-[0.4em] uppercase mb-3 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
              Legal Status · Government Of Pakistan
            </p>
            <h1 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl font-black text-[#0F4C5C] leading-[1.05] tracking-tight mb-4">
              Registered. Licensed.{" "}
              <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#29B6F6] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Accountable.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-[#0A3A47]/70 leading-relaxed max-w-md mx-auto">
              Click Any Document To View Full Size
            </p>
          </div>
        </div>
      </section>

      {/* ============ DOCUMENTS GRID ============ */}
      <section className="relative bg-gradient-to-b from-white to-[#E1F5FE]/40 py-8 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {documents.map((doc, idx) => {
              const isLic = doc.isLicense;

              return (
                <button
                  key={doc.id}
                  onClick={() => openModal(idx)}
                  className="doc-card group relative w-full cursor-zoom-in block animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  {/* Glow */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#4FC3F7]/20 to-[#FFD54F]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {isLic ? (
                    /* ===== LICENSE — CROSS-FADE ===== */
                    <div className="crossfade-wrap relative w-full rounded-2xl overflow-hidden bg-white shadow-[0_10px_30px_rgba(15,76,92,0.10)] group-hover:shadow-[0_20px_45px_rgba(79,195,247,0.25)] transition-shadow duration-500">
                      {/* Front — defines size */}
                      <div className="relative w-full flex items-center justify-center p-3">
                        <img
                          src={doc.imageFront}
                          alt="License Front"
                          className="doc-img w-full h-auto max-h-[240px] object-contain"
                          onError={(e) => {
                            e.target.parentElement.innerHTML =
                              '<div class="p-8 text-center text-[#0A3A47]/40 text-[10px]">license-1.png</div>';
                          }}
                        />
                      </div>

                      {/* Back overlay */}
                      <div className="crossfade-back absolute inset-0 flex items-center justify-center p-3 bg-white">
                        <img
                          src={doc.imageBack}
                          alt="License Back"
                          className="w-full h-auto max-h-[240px] object-contain"
                          onError={(e) => {
                            e.target.parentElement.innerHTML =
                              '<div class="p-8 text-center text-[#0A3A47]/40 text-[10px]">license-bg.png</div>';
                          }}
                        />
                      </div>

                      {/* Shine */}
                      <span className="shine-effect" />

                      {/* Front badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] text-[9px] font-extrabold uppercase tracking-widest rounded-full shadow-md transition-opacity duration-300 group-hover:opacity-0">
                        Front
                      </span>

                      {/* Back badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-[#0F4C5C] text-[9px] font-extrabold uppercase tracking-widest rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Back
                      </span>

                      {/* Hint */}
                      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/95 backdrop-blur border border-[#4FC3F7]/40 rounded-full text-[9px] font-bold text-[#0F4C5C] whitespace-nowrap shadow-md flex items-center gap-1 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                        <FaSyncAlt className="text-[8px] text-[#29B6F6]" />
                        Hover For Back
                      </span>

                      {/* Zoom icon */}
                      <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/95 backdrop-blur border border-[#4FC3F7]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-sm">
                        <FaSearchPlus className="text-[#29B6F6] text-[10px]" />
                      </span>
                    </div>
                  ) : (
                    /* ===== OTHER DOCUMENTS ===== */
                    <div className="relative w-full rounded-2xl overflow-hidden bg-white shadow-[0_10px_30px_rgba(15,76,92,0.10)] group-hover:shadow-[0_20px_45px_rgba(79,195,247,0.25)] transition-shadow duration-500">
                      <div className="flex items-center justify-center p-3">
                        <img
                          src={doc.image}
                          alt={doc.title}
                          className="doc-img w-full h-auto max-h-[240px] object-contain"
                          onError={(e) => {
                            e.target.parentElement.innerHTML = `<div class="p-8 text-center text-[#0A3A47]/40 text-[10px]">${doc.image.split("/").pop()}</div>`;
                          }}
                        />
                      </div>

                      {/* Shine */}
                      <span className="shine-effect" />

                      {/* Zoom icon */}
                      <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/95 backdrop-blur border border-[#4FC3F7]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-sm">
                        <FaSearchPlus className="text-[#29B6F6] text-[10px]" />
                      </span>
                    </div>
                  )}

                  {/* Label below */}
                  <div className="mt-3 text-center">
                    <p className="text-[9px] font-extrabold tracking-[0.2em] uppercase mb-0.5 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                      {doc.authority}
                    </p>
                    <p className="text-[11px] font-bold text-[#0F4C5C] leading-tight">
                      {doc.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
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

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-center mb-10">
            <div className="md:col-span-2">
              <p className="text-[10px] font-extrabold tracking-[0.3em] uppercase mb-3 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                Government Verified
              </p>
              <h3 className="font-[Plus_Jakarta_Sans] text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
                All Documents Issued And Regulated By The{" "}
                <span className="bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#29B6F6] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                  Government Of Pakistan
                </span>
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-[#4FC3F7]/15 border border-[#4FC3F7]/30 flex items-center justify-center flex-shrink-0">
                <FaShieldAlt className="text-[#4FC3F7] text-xl" />
              </span>
              <p className="text-white/70 text-xs leading-relaxed">
                Verifiable Anytime Through Official Government Channels.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "SECP", full: "Securities & Exchange Commission" },
              { name: "FBR", full: "Federal Board Of Revenue" },
              { name: "BEOE", full: "Bureau Of Emigration" },
              { name: "OP&HRD", full: "Overseas Pakistanis Division" },
            ].map((a) => (
              <div key={a.name} className="text-center md:text-left">
                <p className="font-[Plus_Jakarta_Sans] text-xl font-black mb-1 tracking-tight bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] bg-clip-text text-transparent">
                  {a.name}
                </p>
                <p className="text-[9px] text-white/60 font-semibold uppercase tracking-wider leading-tight">
                  {a.full}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative bg-white py-14 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-extrabold tracking-[0.3em] uppercase mb-3 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
            Verify Our Credentials
          </p>
          <h2 className="font-[Plus_Jakarta_Sans] text-3xl sm:text-4xl md:text-5xl font-black text-[#0F4C5C] leading-[1.05] tracking-tight mb-5 max-w-2xl mx-auto">
            Want To Inspect Our Documents?
          </h2>
          <p className="text-[#0A3A47]/70 text-sm max-w-lg mx-auto mb-7 leading-relaxed">
            Visit Our Office Or Contact Our Team — We're Happy To Provide
            Copies Or Verification Of Any Document You Need.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#4FC3F7] via-[#29B6F6] to-[#4FC3F7] bg-[length:200%_100%] text-[#0F4C5C] px-7 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 shadow-[0_12px_25px_rgba(79,195,247,0.35)] hover:shadow-[0_16px_35px_rgba(255,213,79,0.5)] overflow-hidden"
              style={{ animation: "gradientShift 4s ease infinite" }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Schedule A Visit</span>
              <FaArrowRight className="relative text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-[#4FC3F7]/40 text-[#0F4C5C] px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-[#E1F5FE] hover:border-[#4FC3F7]/70 transition-all duration-300"
            >
              About Us
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

      {/* ============ MODAL ============ */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 animate-modalIn"
          style={{
            background:
              "linear-gradient(135deg, rgba(6, 48, 58, 0.96), rgba(15, 76, 92, 0.96))",
          }}
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-[#4FC3F7]/30 backdrop-blur-md border border-[#4FC3F7]/40 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-10"
          >
            <FaTimes className="text-sm" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevDoc();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#4FC3F7]/30 backdrop-blur-md border border-[#4FC3F7]/40 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-10"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextDoc();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#4FC3F7]/30 backdrop-blur-md border border-[#4FC3F7]/40 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-10"
          >
            <FaChevronRight className="text-sm" />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <p className="text-[10px] font-extrabold tracking-[0.3em] uppercase mb-1 bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#4FC3F7] bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientShift_4s_ease_infinite]">
                Document {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(documents.length).padStart(2, "0")}
              </p>
              <h3 className="font-[Plus_Jakarta_Sans] text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight">
                {active.title}
              </h3>

              {active.isLicense && (
                <button
                  onClick={() => setFlipped(!flipped)}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] hover:from-[#FFD54F] hover:to-[#FFB300] text-[#0F4C5C] text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 shadow-[0_8px_20px_rgba(79,195,247,0.4)] hover:scale-105"
                >
                  <FaSyncAlt
                    className={`text-[9px] transition-transform duration-500 ${
                      flipped ? "rotate-180" : ""
                    }`}
                  />
                  Show {flipped ? "Front" : "Back"} Side
                </button>
              )}
            </div>

            <div className="relative flex-1 rounded-2xl overflow-hidden bg-white shadow-[0_30px_80px_rgba(0,0,0,0.4)] min-h-[60vh]">
              {active.isLicense ? (
                <div className="modal-flip">
                  <div className={`modal-flip-inner ${flipped ? "flipped" : ""}`}>
                    <div className="modal-flip-front">
                      <img
                        src={active.imageFront}
                        alt="Front"
                        className="max-w-full max-h-full object-contain p-4 sm:p-6"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-[#0F4C5C] text-[9px] font-extrabold uppercase tracking-widest rounded-full">
                        Front
                      </span>
                    </div>
                    <div className="modal-flip-back">
                      <img
                        src={active.imageBack}
                        alt="Back"
                        className="max-w-full max-h-full object-contain p-4 sm:p-6"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-[#0F4C5C] text-[9px] font-extrabold uppercase tracking-widest rounded-full">
                        Back
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>

            <p className="text-center text-[10px] text-white/50 font-semibold mt-3 tracking-wider uppercase">
              Use ← → To Navigate · ESC To Close
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default GovtLicense;