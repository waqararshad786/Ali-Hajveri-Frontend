// src/utilis/constants.js

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Process', path: '/process' },
  { name: 'Countries', path: '/countries' },
  { name: 'Contact', path: '/contact' },
];

// src/utilis/constants.js

// src/utilis/constants.js

export const COUNTRIES = [
  { 
    name: 'Saudi Arabia', 
    code: 'SA',
    flag: '🇸🇦',
    region: 'Middle East',
    opportunities: 'Oil & Gas, Infrastructure',
    skilled: 1500,
    unskilled: 1000,
    image: '/src/assets/saudia.png',
    projects: [
      { name: 'NEOM City', image: '/src/assets/projects/sa1.jpg' },
      { name: 'King Abdullah City', image: '/src/assets/projects/sa2.jpg' },
    ]
  },
  { 
    name: 'UAE', 
    code: 'AE',
    flag: '🇦🇪',
    region: 'Middle East',
    opportunities: 'Engineering & Construction',
    skilled: 1200,
    unskilled: 800,
    image: '/src/assets/uae.png',
    projects: [
      { name: 'Burj Khalifa', image: '/src/assets/projects/uae1.jpg' },
      { name: 'Dubai Mall', image: '/src/assets/projects/uae2.jpg' },
    ]
  },
  { 
    name: 'Bahrain', 
    code: 'BH',
    flag: '🇧🇭',
    region: 'Middle East',
    opportunities: 'Construction & Services',
    skilled: 400,
    unskilled: 250,
    image: '/src/assets/bahrain.png',
    projects: [
      { name: 'Bahrain Bay', image: '/src/assets/projects/bh1.jpg' },
      { name: 'King Fahd Causeway', image: '/src/assets/projects/bh2.jpg' },
    ]
  },
  { 
    name: 'Kyrgyzstan', 
    code: 'KG',
    flag: '🇰🇬',
    region: 'Asia',
    opportunities: 'Agriculture & Mining',
    skilled: 300,
    unskilled: 200,
    image: '/src/assets/krygyzstan.png',
    projects: [
       { name: 'Sultan Qaboos Port', image: '/src/assets/projects/om1.jpg' },
      { name: 'Muscat Airport', image: '/src/assets/projects/om2.jpg' },
    ]
  },
  { 
    name: 'Qatar', 
    code: 'QA',
    flag: '🇶🇦',
    region: 'Middle East',
    opportunities: 'Construction, Hospitality',
    skilled: 800,
    unskilled: 600,
    image: '/src/assets/qatar.png',
    projects: [
      { name: 'Lusail Stadium', image: '/src/assets/projects/qa1.jpg' },
      { name: 'The Pearl', image: '/src/assets/projects/qa2.jpg' },
    ]
  },
  { 
    name: 'Oman', 
    code: 'OM',
    flag: '🇴🇲',
    region: 'Middle East',
    opportunities: 'Engineering & Manufacturing',
    skilled: 500,
    unskilled: 300,
    image: '/src/assets/oman.png',
    projects: [
      { name: 'Sultan Qaboos Port', image: '/src/assets/projects/om1.jpg' },
      { name: 'Muscat Airport', image: '/src/assets/projects/om2.jpg' },
    ]
  },
  { 
    name: 'Tajikistan', 
    code: 'TJ',
    flag: '🇹🇯',
    region: 'Asia',
    opportunities: 'Agriculture & Construction',
    skilled: 250,
    unskilled: 200,
    image: '/src/assets/tajikistan.png',
    projects: [
       { name: 'Sultan Qaboos Port', image: '/src/assets/projects/om1.jpg' },
      { name: 'Muscat Airport', image: '/src/assets/projects/om2.jpg' },
    ]
  },
  { 
    name: 'Kazakhstan', 
    code: 'KZ',
    flag: '🇰🇿',
    region: 'Asia',
    opportunities: 'Oil & Gas, Mining',
    skilled: 600,
    unskilled: 400,
    image: '/src/assets/kazakhstan.png',
    projects: [
       { name: 'Sultan Qaboos Port', image: '/src/assets/projects/om1.jpg' },
      { name: 'Muscat Airport', image: '/src/assets/projects/om2.jpg' },
    ]
  },
  { 
    name: 'Romania', 
    code: 'RO',
    flag: '🇷🇴',
    region: 'Europe',
    opportunities: 'IT & Manufacturing',
    skilled: 500,
    unskilled: 300,
    image: '/src/assets/romania.png',
    projects: [
       { name: 'Sultan Qaboos Port', image: '/src/assets/projects/om1.jpg' },
      { name: 'Muscat Airport', image: '/src/assets/projects/om2.jpg' },
    ]
  },
  { 
    name: 'Uzbekistan', 
    code: 'UZ',
    flag: '🇺🇿',
    region: 'Asia',
    opportunities: 'Textiles & Agriculture',
    skilled: 400,
    unskilled: 350,
    image: '/src/assets/uzbekistan.png',
    projects: [
       { name: 'Sultan Qaboos Port', image: '/src/assets/projects/om1.jpg' },
      { name: 'Muscat Airport', image: '/src/assets/projects/om2.jpg' },
    ]
  },
  { 
    name: 'Turkmenistan', 
    code: 'TM',
    flag: '🇹🇲',
    region: 'Asia',
    opportunities: 'Oil & Gas',
    skilled: 300,
    unskilled: 200,
    image: '/src/assets/turkmanistan.png',
    projects: [
       { name: 'Sultan Qaboos Port', image: '/src/assets/projects/om1.jpg' },
      { name: 'Muscat Airport', image: '/src/assets/projects/om2.jpg' },
    ]
  },
  { 
    name: 'China', 
    code: 'CN',
    flag: '🇨🇳',
    region: 'Asia',
    opportunities: 'Manufacturing & Infrastructure',
    skilled: 1200,
    unskilled: 800,
    image: '/src/assets/china.png',
    projects: [
       { name: 'Sultan Qaboos Port', image: '/src/assets/projects/om1.jpg' },
      { name: 'Muscat Airport', image: '/src/assets/projects/om2.jpg' },
    ]
  },
];


export const SERVICES_DATA = [
  {
    icon: "👷",
    title: "Skilled Manpower",
    desc: "Certified engineers, technicians, welders, electricians, and machine operators.",
  },
  {
    icon: "🧑‍🌾",
    title: "Unskilled Workforce",
    desc: "Reliable general labour, helpers, cleaners, and assistants for various industries.",
  },
  {
    icon: "🏗️",
    title: "Engineering Solutions",
    desc: "Civil, mechanical, electrical, and project management expertise for large-scale projects.",
  },
  {
    icon: "🌍",
    title: "Global Recruitment",
    desc: "End-to-end recruitment, visa processing, medicals, and deployment to 25+ countries.",
  },
  {
    icon: "📋",
    title: "Visa & Documentation",
    desc: "Complete visa processing, work permits, insurance, and legal compliance.",
  },
  {
    icon: "🎓",
    title: "Skill Development",
    desc: "Training programs to upgrade workers from unskilled to semi-skilled and skilled levels.",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Requirement Analysis",
    desc: "Understand your workforce needs, skills, and project timeline.",
    icon: "📋",
  },
  {
    step: "02",
    title: "Candidate Sourcing",
    desc: "We source qualified candidates from our extensive database and targeted recruitment.",
    icon: "🔍",
  },
  {
    step: "03",
    title: "Screening & Selection",
    desc: "Rigorous screening including interviews, skill tests, and background verification.",
    icon: "✅",
  },
  {
    step: "04",
    title: "Visa & Documentation",
    desc: "Complete visa processing, medicals, insurance, and all necessary paperwork.",
    icon: "📄",
  },
  {
    step: "05",
    title: "Deployment",
    desc: "Safe and timely deployment with pre-departure orientation and travel arrangements.",
    icon: "✈️",
  },
  {
    step: "06",
    title: "Post-Placement Support",
    desc: "Ongoing support and follow-up to ensure smooth integration and satisfaction.",
    icon: "🤝",
  },
];

export const JOB_CATEGORIES = [
  "Construction",
  "Manufacturing",
  "Transportation",
  "Engineering",
  "Oil & Gas",
  "Technicians",
  "Machine Operators",
  "Cooks",
  "Agriculture",
  "Sales & Marketing",
  "Healthcare",
  "IT & Telecom",
];

export const COMPANY_INFO = {
  name: "AHIOEP",
  fullName: "Ali Hajveri International (Pvt.) Ltd.",
  established: "2006",
  license: "OP&HRD/5224/LHR/2026",
  address: "Office No. 1, 2nd Floor, Hajveri Plaza, Main Rajbah Road, Near Quaid-e-Azam Interchange, Dera Gujran, Lahore, Pakistan",
  phone: "+92",          // ← updated with full phone number
  email: "ahioep.com@gmail.com",
  emergencyPhone: "+92", // ← updated with full emergency number
};


// const INDUSTRIES = [
//   { name: 'Construction & Infrastructure', image: '/src/assets/industries/construction.jpg', desc: 'Site labour, masons, steel fixers and supervisory staff.' },
//   { name: 'Engineering & Technical', image: '/src/assets/industries/engineering.jpg', desc: 'Technicians and engineers across mechanical and electrical trades.' },
//   { name: 'Manufacturing & Industrial', image: '/src/assets/industries/manufacturing.jpg', desc: 'Production floor, machine operation and quality roles.' },
//   { name: 'Transport & Logistics', image: '/src/assets/industries/transport.jpg', desc: 'Drivers, warehouse and logistics support staff.' },
//   { name: 'Hospitality', image: '/src/assets/industries/hospitality.jpg', desc: 'Kitchen, housekeeping and front-of-house personnel.' },
//   { name: 'Skilled Trades', image: '/src/assets/industries/trades.jpg', desc: 'Electricians, plumbers, welders and other certified trades.' },
//   { name: 'General Workforce', image: '/src/assets/industries/general.jpg', desc: 'General labour for a wide range of site requirements.' },
//   { name: 'Professional Staff', image: '/src/assets/industries/professional.jpg', desc: 'Administrative, technical and supervisory professionals.' },
// ];