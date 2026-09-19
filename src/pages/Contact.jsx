import React, { useState } from 'react';
import { COMPANY_INFO } from '../utilis/constants';
import { loadJobs } from "../data/jobsData";
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, 
  FaUser, FaFacebook, FaInstagram, FaTwitter, 
  FaPaperPlane 
} from 'react-icons/fa';
import { sendContactMessage } from '../services/contactService';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Exact office address
  const officeAddress = 'Office No. 1, 2nd Floor, Hajveri Plaza, Main Rajbah Road, Near Quaid-e-Azam Interchange, Dera Gujran, Lahore, Pakistan';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const result = await sendContactMessage(form);
      setSubmitStatus({ 
        type: 'success', 
        message: result.message || 'Thank you! We will get back to you soon.' 
      });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to send message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    { icon: <FaMapMarkerAlt />, label: 'Address', value: officeAddress, color: 'text-[#22C55E]' },
    { icon: <FaPhone />, label: 'Phone', value: COMPANY_INFO.phone, color: 'text-[#4FC3F7]' },
    { icon: <FaEnvelope />, label: 'Email', value: COMPANY_INFO.email, color: 'text-[#FFB300]' },
    { icon: <FaClock />, label: 'Hours', value: 'Mon-Sat: 9:00 AM - 6:00 PM', color: 'text-[#8B5CF6]' },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, color: 'hover:bg-blue-600', link: 'https://www.facebook.com/ahioep' },
    { icon: <FaInstagram />, color: 'hover:bg-pink-600', link: 'https://www.instagram.com/ahioep3/' },
    { icon: <FaTwitter />, color: 'hover:bg-sky-500', link: 'https://x.com/ahioep' },
  ];

  // Encode the exact address
  const encodedAddress = encodeURIComponent(officeAddress);

  // Embed map — exact location, higher zoom to focus only on our office
  const mapEmbedSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=m&z=17&output=embed&iwloc=near`;

  // Open in new tab
  const mapOpenLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#4FC3F7]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0F4C5C]/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="text-center mb-6 animate-[fadeUp_0.6s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F4C5C] mb-1">
            Get in <span className="text-[#4FC3F7]">Touch</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Let's discuss your manpower requirements
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Form Card */}
          <div className="md:flex-[3] bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-white/50 animate-[fadeUp_0.8s_ease-out]">
            <h2 className="text-lg font-bold text-[#0F4C5C] mb-4 flex items-center gap-2">
              <FaPaperPlane className="text-[#4FC3F7] text-sm" />
              Send a Message
            </h2>

            {submitStatus.message && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <FaUser className="absolute left-3 top-2.5 text-[#4FC3F7] text-sm" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4FC3F7] focus:border-transparent outline-none transition-all bg-white/70"
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-2.5 text-[#FFB300] text-sm" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4FC3F7] focus:border-transparent outline-none transition-all bg-white/70"
                />
              </div>
              <div className="relative">
                <FaPhone className="absolute left-3 top-2.5 text-[#22C55E] text-sm" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4FC3F7] focus:border-transparent outline-none transition-all bg-white/70"
                />
              </div>
              <div className="relative">
                <FaPaperPlane className="absolute left-3 top-2.5 text-[#8B5CF6] text-sm" />
                <textarea
                  name="message"
                  placeholder="Tell us about your requirements..."
                  rows="3"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4FC3F7] focus:border-transparent outline-none transition-all bg-white/70 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#4FC3F7] hover:bg-[#29B6F6] shadow-md hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="md:flex-[2] bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl border border-white/50 animate-[fadeUp_1s_ease-out] flex flex-col">
            <h2 className="text-lg font-bold text-[#0F4C5C] mb-3">Get in Touch</h2>
            <div className="space-y-2 flex-1">
              {contactDetails.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 bg-gray-50/80 rounded-lg transition-all hover:bg-[#E1F5FE] group">
                  <div className={`${item.color} text-base mt-0.5 transition-transform group-hover:scale-110`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm text-gray-700 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Connect with us</p>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-sm transition-all duration-300 hover:text-white ${social.color} hover:scale-110 hover:shadow-md`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8 animate-[fadeUp_1.2s_ease-out]">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/50 transition-all hover:shadow-xl">
            {/* Clickable map wrapper */}
            <a
              href={mapOpenLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full cursor-pointer group"
              style={{ paddingBottom: '30%', height: 0 }}
              title="Click to open in Google Maps"
            >
              <iframe
                src={mapEmbedSrc}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-transparent group-hover:bg-[#0F4C5C]/20 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#0F4C5C] text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-[0_8px_24px_rgba(15,76,92,0.25)] flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#22C55E]" />
                  Open in Google Maps
                </span>
              </div>
            </a>
            <div className="p-2 text-center text-xs text-gray-500">
              <FaMapMarkerAlt className="inline-block text-[#22C55E] mr-1" />
              {officeAddress}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-\\[fadeUp_0\\.6s_ease-out\\] { animation: fadeUp 0.6s ease-out forwards; }
        .animate-\\[fadeUp_0\\.8s_ease-out\\] { animation: fadeUp 0.8s ease-out forwards; }
        .animate-\\[fadeUp_1s_ease-out\\] { animation: fadeUp 1s ease-out forwards; }
        .animate-\\[fadeUp_1\\.2s_ease-out\\] { animation: fadeUp 1.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Contact;