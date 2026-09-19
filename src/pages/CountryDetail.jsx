import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COUNTRIES } from '../utilis/constants';
import { FaArrowLeft, FaUsers, FaUserCog, FaUser, FaBuilding } from 'react-icons/fa';

const CountryDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const country = COUNTRIES.find(c => c.name === name);

  if (!country) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0f2a47]">Country not found</h2>
          <button onClick={() => navigate('/countries')} className="mt-4 text-[#c9972a] hover:underline">
            Go back to countries
          </button>
        </div>
      </div>
    );
  }

  const projects = country.projects || [
    // { name: 'Project Alpha', image: 'https://via.placeholder.com/400x300/1a3a5c/ffffff?text=Project+1' },
    // { name: 'Project Beta', image: 'https://via.placeholder.com/400x300/c9a03a/ffffff?text=Project+2' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Back Button & Country Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate('/countries')}
          className="flex items-center gap-2 text-[#0f2a47] hover:text-[#c9972a] transition-colors duration-300 group text-sm mb-4"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Countries</span>
        </button>

        {/* Country header with circular image */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-md border-2 border-[#c9972a]/30 flex-shrink-0 bg-[#fbf6ec]">
            <img
              src={country.image}
              alt={country.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                const parent = e.target.parentNode;
                const fallback = document.createElement('span');
                fallback.className = 'w-full h-full flex items-center justify-center text-3xl';
                fallback.textContent = country.flag || '🌍';
                parent.appendChild(fallback);
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0f2a47]">{country.name}</h1>
            <p className="text-gray-500 text-sm">{country.opportunities}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 overflow-hidden">
          <div className="text-center px-4 py-5">
            <div className="text-2xl text-[#c9972a] flex justify-center mb-1"><FaUsers /></div>
            <div className="text-xl md:text-2xl font-bold text-[#0f2a47]">{country.skilled + country.unskilled}</div>
            <div className="text-xs text-gray-500 mt-0.5">Total Employees</div>
          </div>
          <div className="text-center px-4 py-5">
            <div className="text-2xl text-[#c9972a] flex justify-center mb-1"><FaUserCog /></div>
            <div className="text-xl md:text-2xl font-bold text-[#0f2a47]">{country.skilled}</div>
            <div className="text-xs text-gray-500 mt-0.5">Skilled</div>
          </div>
          <div className="text-center px-4 py-5">
            <div className="text-2xl text-[#c9972a] flex justify-center mb-1"><FaUser /></div>
            <div className="text-xl md:text-2xl font-bold text-[#0f2a47]">{country.unskilled}</div>
            <div className="text-xs text-gray-500 mt-0.5">Unskilled</div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold text-[#0f2a47] mb-5 flex items-center gap-2">
          <FaBuilding className="text-[#c9972a] text-lg" />
          Projects & Photos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="h-40 bg-gray-200 relative">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/400x300/1a3a5c/ffffff?text=Project+Image'}
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#0f2a47] text-sm">{project.name}</h3>
                <p className="text-xs text-gray-500">Deployed {Math.floor(Math.random() * 100) + 20} workers</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CountryDetail;