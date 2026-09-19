// src/components/common/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

const MAIN_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  {
    name: "Process",
    path: "/process",
    children: [
      { name: "Recruitment Process", path: "/process/recruitment" },
      { name: "Work Visa Process", path: "/process/work-visa" },
      { name: "Quality Policy", path: "/process/quality-policy" },
    ],
  },
  {
    name: "Legal Status",
    path: "/legal-status",
    children: [
      { name: "Govt License", path: "/legal-status/govt-license" },
      { name: "ISO Certification", path: "/legal-status/iso-certification" },
      // { name: "Certification", path: "/legal-status/certification" },
    ],
  },
  {
    name: "Contact",
    path: "/contact",
    children: [
      { name: "Our Team", path: "/our-team" },
      { name: "Career", path: "/submit-cv" }, // 👈 Career now goes to Submit CV
      { name: "FAQ", path: "/faq" },
    ],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        bg-gradient-to-r from-[#BFE7F5] via-white to-[#BFE7F5]
        transition-all duration-300
        ${
          scrolled
            ? "shadow-[0_8px_30px_rgba(15,76,92,0.15)]"
            : "shadow-[0_1px_0_rgba(79,195,247,0.25)]"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* ---- LEFT: Logo ---- */}
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0 group"
            onClick={closeMenu}
          >
            <img
              src="/src/assets/logo-2.png"
              alt="AHIOEP Logo"
              className="h-14 sm:h-12 lg:h-14 w-auto object-contain bg-transparent transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* ---- CENTER: Main nav ---- */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-1">
            {MAIN_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-1 px-3 xl:px-4 py-2 text-sm font-bold rounded-full transition-all duration-200 overflow-hidden ${
                        isActive
                          ? "text-[#0F4C5C] bg-white/80 shadow-[0_4px_14px_rgba(15,76,92,0.15)]"
                          : "text-[#0F4C5C] hover:text-white hover:bg-[#0F4C5C]/10"
                      }`
                    }
                  >
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 bg-gradient-to-r from-[#FFD54F] to-white rounded-full transition-all duration-300" />
                    {link.name}
                    <FaChevronDown
                      className={`text-[10px] transition-transform duration-200 ${
                        openDropdown === link.name ? "rotate-180" : ""
                      }`}
                    />
                  </NavLink>

                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      openDropdown === link.name
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-1"
                    }`}
                  >
                    <div
                      className="
                        min-w-[240px]
                        bg-white
                        rounded-xl
                        border border-[#4FC3F7]/30
                        shadow-[0_12px_40px_rgba(15,76,92,0.15),0_2px_6px_rgba(15,76,92,0.08)]
                        py-2 overflow-hidden
                        relative
                      "
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4FC3F7] via-[#FFD54F] to-[#29B6F6]" />

                      {link.children.map((child, idx) => (
                        <React.Fragment key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              `group relative block px-4 py-2.5 text-sm font-bold transition-all duration-150 ${
                                isActive
                                  ? "bg-gradient-to-r from-[#E1F5FE] to-transparent text-[#0F4C5C]"
                                  : "text-[#0A3A47] hover:bg-gradient-to-r hover:from-[#E1F5FE] hover:to-transparent hover:text-[#0F4C5C] hover:pl-5"
                              }`
                            }
                          >
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-[3px] bg-gradient-to-b from-[#4FC3F7] to-[#FFD54F] rounded-r-full transition-all duration-200 group-hover:h-5" />
                            {child.name}
                          </NavLink>
                          {idx < link.children.length - 1 && (
                            <div className="mx-3 h-px bg-gradient-to-r from-transparent via-[#4FC3F7]/30 to-transparent" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `group relative px-3 xl:px-4 py-2 text-sm font-bold rounded-full transition-all duration-200 overflow-hidden ${
                      isActive
                        ? "text-[#0F4C5C] bg-white/80 shadow-[0_4px_14px_rgba(15,76,92,0.15)]"
                        : "text-[#0F4C5C] hover:text-white hover:bg-[#0F4C5C]/10"
                    }`
                  }
                >
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 bg-gradient-to-r from-[#FFD54F] to-white rounded-full transition-all duration-300" />
                  {link.name}
                </NavLink>
              )
            )}
          </div>

          {/* ---- RIGHT: CTA links ---- */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <NavLink
              to="/submit-cv"
              className={({ isActive }) =>
                `group relative px-4 py-2 text-sm font-bold rounded-full border-2 transition-all duration-200 overflow-hidden ${
                  isActive
                    ? "bg-white text-[#0F4C5C] border-white"
                    : "border-[#0F4C5C]/60 text-[#0F4C5C] hover:bg-white hover:text-[#0F4C5C] hover:border-white"
                }`
              }
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-[#FFD54F]/50 to-transparent transition-transform duration-700" />
              <span className="relative">Submit CV</span>
            </NavLink>
            <NavLink
              to="/careers"
              className={({ isActive }) =>
                `group relative px-4 py-2 text-sm font-bold rounded-full transition-all duration-200 shadow-[0_6px_16px_rgba(15,76,92,0.30)] hover:shadow-[0_8px_20px_rgba(255,213,79,0.55)] hover:-translate-y-0.5 overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-[#0F4C5C] to-[#0A3A47] text-white"
                    : "bg-gradient-to-r from-[#0F4C5C] to-[#0A3A47] text-white"
                }`
              }
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-[#FFD54F]/60 to-transparent transition-transform duration-700" />
              <span className="relative">Find Jobs</span>
            </NavLink>
          </div>

          {/* ---- Mobile toggle ---- */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-[#0F4C5C] text-2xl focus:outline-none p-2 rounded-full hover:bg-white/40 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Multi-color bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0F4C5C] via-[#FFD54F] to-[#0F4C5C]" />

      {/* ---- Mobile menu ---- */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isOpen
            ? "max-h-[80vh] opacity-100 overflow-y-auto"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-[#BFE7F5] via-white to-[#BFE7F5] border-t border-[#4FC3F7]/30 py-3 px-4 shadow-[0_12px_30px_rgba(15,76,92,0.10)]">
          <div className="flex flex-col gap-1">
            {MAIN_LINKS.map((link) => (
              <div key={link.path}>
                {link.children ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.name ? null : link.name
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold rounded-lg text-[#0F4C5C] hover:text-white hover:bg-[#0F4C5C]/10 transition-colors"
                    >
                      {link.name}
                      <FaChevronDown
                        className={`text-xs transition-transform duration-200 ${
                          openDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-[max-height] duration-300 ${
                        openDropdown === link.name ? "max-h-60" : "max-h-0"
                      }`}
                    >
                      <div className="pl-4 flex flex-col">
                        {link.children.map((child, idx) => (
                          <React.Fragment key={child.path}>
                            <NavLink
                              to={child.path}
                              onClick={closeMenu}
                              className={({ isActive }) =>
                                `px-4 py-2.5 text-sm font-bold rounded-lg transition-colors ${
                                  isActive
                                    ? "bg-white/80 text-[#0F4C5C]"
                                    : "text-[#0F4C5C] hover:bg-white/60"
                                }`
                              }
                            >
                              {child.name}
                            </NavLink>
                            {idx < link.children.length - 1 && (
                              <div className="mx-3 h-px bg-gradient-to-r from-transparent via-[#0F4C5C]/30 to-transparent" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={link.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                        isActive
                          ? "bg-white/80 text-[#0F4C5C]"
                          : "text-[#0F4C5C] hover:bg-white/60"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )}
              </div>
            ))}

            <div className="mt-3 flex flex-col gap-2">
              <NavLink
                to="/submit-cv"
                onClick={closeMenu}
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-bold rounded-lg border-2 border-[#0F4C5C] text-[#0F4C5C] hover:bg-white transition-all"
              >
                Submit CV
              </NavLink>
              <NavLink
                to="/careers"
                onClick={closeMenu}
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-bold rounded-lg bg-gradient-to-r from-[#0F4C5C] to-[#0A3A47] text-white shadow-[0_6px_16px_rgba(15,76,92,0.35)] hover:shadow-[0_8px_20px_rgba(255,213,79,0.45)] transition-all"
              >
                Find Jobs
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;