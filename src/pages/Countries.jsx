import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { COUNTRIES } from "../utilis/constants";
import { FaSearch, FaArrowRight, FaGlobe } from "react-icons/fa";

const Countries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRegion, setActiveRegion] = useState("All");
  const navigate = useNavigate();

  const regions = useMemo(() => {
    const list = COUNTRIES.map((c) => c.region).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, []);

  const filteredCountries = COUNTRIES.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      activeRegion === "All" || country.region === activeRegion;
    return matchesSearch && matchesRegion;
  });

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.15 },
    );
    document
      .querySelectorAll(".country-card")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredCountries]);

  return (
    <div className="min-h-screen bg-white pt-8 overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative py-16 md:py-24 overflow-hidden flex items-center"
        style={{
          backgroundImage: `url('/src/assets/const-2.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2a47]/80 via-[#0f2a47]/60 to-[#c9972a]/30"></div>
        <div className="absolute -top-16 -right-10 w-72 h-72 bg-[#c9972a]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-[#c9972a]/15 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center text-white">
          <div className="flex justify-center mb-4">
            <FaGlobe className="text-5xl text-[#c9972a] drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
            Countries We Recruit For
          </h1>
          <p className="text-gray-100 mt-3 text-base max-w-xl mx-auto drop-shadow-md">
            Explore where we deploy skilled and unskilled manpower worldwide.
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-2xl mx-auto">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full focus:ring-2 focus:ring-[#c9972a] focus:border-transparent outline-none transition-all text-sm text-white placeholder-gray-300"
            />
          </div>

          {/* Region Filters */}
          {regions.length > 1 && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-colors duration-200 ${
                    activeRegion === region
                      ? "bg-[#c9972a] text-white border-[#c9972a]"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Countries Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-sm text-gray-500 mb-6">
          {filteredCountries.length}{" "}
          {filteredCountries.length === 1 ? "country" : "countries"} found
        </p>

        {filteredCountries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No countries found for "{searchTerm}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries.map((country, idx) => (
              <button
                key={country.name}
                onClick={() => navigate(`/country/${country.name}`)}
                className="country-card group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#c9972a]/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 text-left opacity-0 translate-y-10"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                {/* Image container with yellow/gold gradient overlay on hover */}
                <div className="relative h-44 bg-gradient-to-br from-[#fbf6ec] to-[#f5d47a]/30 overflow-hidden">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = "none";
                      // Show fallback flag emoji
                      const parent = e.target.parentNode;
                      const fallback = document.createElement("span");
                      fallback.className =
                        "text-7xl flex items-center justify-center h-full";
                      fallback.textContent = country.flag;
                      parent.appendChild(fallback);
                    }}
                  />
                  {/* Gold gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#c9972a]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-3 right-3 bg-[#c9972a]/10 text-[#c9972a] text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm border border-[#c9972a]/20">
                    {country.region}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#0f2a47] group-hover:text-[#c9972a] transition-colors duration-300">
                    {country.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {country.opportunities || "Various opportunities"}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[#0f2a47] group-hover:gap-2.5 transition-all duration-300">
                    Learn More <FaArrowRight className="text-xs" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-[#0f2a47] to-[#1a3f57] rounded-3xl p-10 text-center text-white shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Don't see your country?
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-6">
            We can deploy workforce to any country with proper legal compliance.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 bg-[#c9972a] hover:bg-[#b8871f] text-white px-7 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Contact Us <FaArrowRight className="text-sm" />
          </button>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .country-card {
          opacity: 0;
          transform: translateY(30px);
        }
        .country-card.animate-fade-up {
          animation: fadeUp 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Countries;
