// src/data/jobsData.js
// Shared jobs storage using localStorage (frontend-only demo)
// In production, replace with Firebase / API calls

const STORAGE_KEY = "ahioep_jobs";

const DEFAULT_JOBS = [
  {
    id: 1,
    title: "Senior Electrician",
    company: "Al Faris Contracting LLC",
    location: "Dubai, UAE",
    country: "UAE",
    type: "Full Time",
    category: "Technical",
    salary: "AED 2,500 – 3,500",
    experience: "3–5 years",
    education: "Diploma / ITI",
    posted: "2 days ago",
    urgent: true,
    featured: true,
    tags: ["Electrical", "Wiring", "Maintenance"],
    description:
      "We are looking for experienced electricians for a large-scale construction project in Dubai.",
    requirements: [
      "3–5 years of relevant experience",
      "Valid ITI / Diploma in Electrical",
      "Knowledge of wiring, panels, and maintenance",
      "Willingness to relocate to UAE",
    ],
  },
  {
    id: 2,
    title: "Structural Welder (6G)",
    company: "Saudi Aramco Contractor",
    location: "Dammam, Saudi Arabia",
    country: "Saudi Arabia",
    type: "Full Time",
    category: "Technical",
    salary: "SAR 2,200 – 3,000",
    experience: "5+ years",
    education: "Matric / ITI",
    posted: "5 days ago",
    urgent: true,
    featured: false,
    tags: ["Welding", "6G", "Fabrication"],
    description:
      "Hiring 6G certified welders for oil & gas structural fabrication work in Saudi Arabia.",
    requirements: [
      "6G welding certification",
      "5+ years of structural welding experience",
      "Experience with oil & gas projects preferred",
      "Must pass trade test",
    ],
  },
  {
    id: 3,
    title: "Heavy Vehicle Driver",
    company: "Qatar Logistics Co.",
    location: "Doha, Qatar",
    country: "Qatar",
    type: "Full Time",
    category: "General",
    salary: "QAR 2,000 – 2,800",
    experience: "3–5 years",
    education: "Matric",
    posted: "1 week ago",
    urgent: false,
    featured: false,
    tags: ["LTV", "HTV", "Gulf License"],
    description:
      "Looking for experienced heavy vehicle drivers with valid Gulf licenses for Qatar operations.",
    requirements: [
      "Valid HTV / LTV Gulf driving license",
      "3–5 years of heavy vehicle driving experience",
      "Good knowledge of Gulf roads",
      "Clean driving record",
    ],
  },
];

/* ============================================================
   LOAD / SAVE / RESET
============================================================ */
export const loadJobs = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn("Failed to load jobs:", e);
  }
  return DEFAULT_JOBS;
};

export const saveJobs = (jobs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    window.dispatchEvent(new Event("jobsUpdated"));
  } catch (e) {
    console.warn("Failed to save jobs:", e);
  }
};

export const resetJobs = () => {
  saveJobs(DEFAULT_JOBS);
  return DEFAULT_JOBS;
};