// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook, FaInstagram, FaTiktok, FaTwitter,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaShieldAlt, FaWhatsapp,
  FaGlobe, FaUserTie, FaBriefcase, FaAward
} from 'react-icons/fa';
import { COMPANY_INFO } from '../../utilis/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebook, url: 'https://www.facebook.com/profile.php?id=61592978483330', color: '#1877F2', label: 'Facebook' },
    { icon: FaInstagram, url: 'https://www.instagram.com/ahioep5224/', color: '#E4405F', label: 'Instagram' },
    { icon: FaTiktok, url: 'https://www.tiktok.com/@ahioep.com', color: '#000000', label: 'TikTok' },
    { icon: FaTwitter, url: 'https://x.com/ahioep', color: '#000000', label: 'X (Twitter)' },
  ];

  const quickLinks = [
    ['/', 'Home'],
    ['/about', 'About Us'],
    ['/services', 'Services'],
    ['/process', 'Process'],
    ['/countries', 'Countries'],
    ['/contact', 'Contact'],
  ];

  const serviceLinks = [
    ['/services', 'Manpower Sourcing'],
    ['/services', 'Trade Testing'],
    ['/services', 'Documentation Support'],
    ['/services', 'Overseas Deployment'],
    ['/services', 'Skill Upgrading'],
    ['/services', 'Post-Placement'],
  ];

  return (
    <>
      <footer className="relative bg-[#0F4C5C] text-white overflow-hidden" aria-label="Footer">

        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#29B6F6]" />

        <div className="absolute -top-32 -right-32 w-[280px] h-[280px] rounded-full bg-[#4FC3F7]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[260px] h-[260px] rounded-full bg-[#FFD54F]/8 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/assets/logo.jpeg"
                  alt="Ali Hajveri International - Licensed Overseas Employment Promoter in Pakistan"
                  className="h-16 rounded-2xl w-auto object-contain bg-transparent"
                />
              </div>

              <p className="text-white/75 text-sm leading-relaxed mb-5">
                {COMPANY_INFO.fullName} — Supplying Skilled, Semi-skilled And Unskilled Pakistani Workforce To 25+ Countries Worldwide. Licensed Overseas Employment Promoter In Pakistan.
              </p>

              <div className="inline-flex items-center gap-2 bg-[#4FC3F7]/15 border border-[#4FC3F7]/40 rounded-full px-3 py-1.5 text-xs text-[#4FC3F7] font-bold mb-5">
                <FaShieldAlt className="text-[#4FC3F7]" aria-hidden="true" />
                Licensed &amp; Regulated · #{COMPANY_INFO.license}
              </div>

              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_20px_rgba(255,213,79,0.55)] border-2 border-white hover:border-[#FFD54F] relative overflow-hidden"
                    aria-label={social.label}
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover/social:translate-x-full bg-gradient-to-r from-transparent via-[#FFD54F]/60 to-transparent transition-transform duration-700" />
                    <social.icon
                      size={18}
                      style={{ color: social.color }}
                      className="relative"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="relative font-bold text-white mb-2 text-sm tracking-wider inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 h-0.5 w-8 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] rounded-full" />
              </h3>
              <ul className="space-y-0">
                {quickLinks.map(([path, label]) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="group relative inline-flex items-center gap-2 text-white/75 hover:text-[#FFD54F] transition-colors duration-300 text-sm py-0.5"
                      aria-label={`${label} - Ali Hajveri International`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] group-hover:bg-[#FFD54F] group-hover:scale-150 transition-all duration-300" />
                      <span className="relative font-medium">
                        {label}
                        <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h3 className="relative font-bold text-white mb-2 text-sm tracking-wider inline-block">
                Our Services
                <span className="absolute -bottom-1 left-0 h-0.5 w-8 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] rounded-full" />
              </h3>
              <ul className="space-y-0">
                {serviceLinks.map(([path, label], i) => (
                  <li key={i}>
                    <Link
                      to={path}
                      className="group relative inline-flex items-center gap-2 text-white/75 hover:text-[#FFD54F] transition-colors duration-300 text-sm py-0.5"
                      aria-label={`${label} - Overseas Recruitment Services`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] group-hover:bg-[#FFD54F] group-hover:scale-150 transition-all duration-300" />
                      <span className="relative font-medium">
                        {label}
                        <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get in Touch */}
            <div>
              <h3 className="relative font-bold text-white mb-4 text-sm tracking-wider inline-block">
                Get In Touch
                <span className="absolute -bottom-1 left-0 h-0.5 w-8 bg-gradient-to-r from-[#4FC3F7] to-[#FFD54F] rounded-full" />
              </h3>
              <address className="not-italic">
                <ul className="flex flex-col items-start gap-2">

                  <li className="w-full group flex items-start gap-2.5 bg-white/5 border border-[#22C55E]/20 hover:border-[#22C55E]/50 rounded-xl px-2.5 py-2 transition-all duration-300">
                    <span className="w-7 h-7 rounded-xl bg-[#22C55E] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(34,197,94,0.4)]">
                      <FaMapMarkerAlt className="text-white text-[11px]" aria-hidden="true" />
                    </span>
                    <span className="text-white/75 text-xs leading-relaxed group-hover:text-white transition-colors">
                      {COMPANY_INFO.address}
                    </span>
                  </li>

                  <li>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="flex w-fit items-center gap-2.5 bg-white/5 border border-[#4FC3F7]/20 hover:border-[#4FC3F7]/50 rounded-xl px-2.5 py-2 transition-all duration-300"
                      aria-label="Call Ali Hajveri International"
                    >
                      <span className="w-7 h-7 rounded-xl bg-[#4FC3F7] flex items-center justify-center flex-shrink-0 shadow-[0_6px_14px_rgba(79,195,247,0.4)]">
                        <FaPhone className="text-white text-[11px]" aria-hidden="true" />
                      </span>
                      <span className="text-white/75 text-xs font-medium group-hover:text-[#FFD54F] transition-colors">
                        {COMPANY_INFO.phone}
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="flex w-fit max-w-full items-center gap-2.5 bg-white/5 border border-[#FFB300]/20 hover:border-[#FFB300]/50 rounded-xl px-2.5 py-2 transition-all duration-300"
                      aria-label="Email Ali Hajveri International"
                    >
                      <span className="w-7 h-7 rounded-xl bg-[#FFB300] flex items-center justify-center flex-shrink-0 shadow-[0_6px_14px_rgba(255,179,0,0.4)]">
                        <FaEnvelope className="text-white text-[11px]" aria-hidden="true" />
                      </span>
                      <span className="text-white/75 text-xs font-medium group-hover:text-[#FFD54F] transition-colors truncate">
                        {COMPANY_INFO.email}
                      </span>
                    </a>
                  </li>
                </ul>
              </address>
            </div>
          </div>

          <div className="relative mt-12 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#4FC3F7]/40 to-transparent" />
          </div>

          <div className="bg-[#0A3A47] border border-[#4FC3F7]/20 rounded-xl px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

              <p className="text-sm text-white/60 text-center sm:text-left">
                &copy; {currentYear}{" "}
                <span className="font-bold text-white/90">{COMPANY_INFO.fullName}</span>.
                All Rights Reserved.
              </p>

              <div className="flex items-center gap-4 text-xs font-medium">
                <Link to="/privacy-policy" className="text-white/60 hover:text-[#4FC3F7] transition-colors">
                  Privacy
                </Link>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <Link to="/terms-conditions" className="text-white/60 hover:text-[#4FC3F7] transition-colors">
                  Terms
                </Link>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <Link to="/faq" className="text-white/60 hover:text-[#4FC3F7] transition-colors">
                  FAQ
                </Link>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-white/60 font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD54F] animate-pulse" style={{ animationDelay: '0.3s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#29B6F6] animate-pulse" style={{ animationDelay: '0.6s' }} />
                <span className="ml-1.5">Trusted Worldwide</span>
              </div>
            </div>
          </div>

        </div>
      </footer>

      <a
        href="https://wa.me/923008578764"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-2xl hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
        aria-label="Chat On WhatsApp With Ali Hajveri International"
      >
        <FaWhatsapp size={28} aria-hidden="true" />
      </a>
    </>
  );
};

export default Footer;