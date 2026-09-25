// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/common/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import { AuthProvider } from "./context/AuthContext";

/* ============================================================
   PUBLIC PAGES
============================================================ */
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Process from "./pages/Process";
import Countries from "./pages/Countries";
import CountryDetail from "./pages/CountryDetail";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Faq from "./pages/Faq";
import Careers from "./pages/Careers";
import OurTeam from "./pages/OurTeam";
import SubmitCV from "./pages/SubmitCV";
import RecruitmentProcess from "./pages/RecruitmentProcess";
import WorkVisaProcess from "./pages/WorkVisaProcess";
import QualityPolicy from "./pages/QualityPolicy";
import LegalStatus from "./pages/LegalStatus";
import GovtLicense from "./pages/GovtLicense";
import IsoCertification from "./pages/IsoCertification";
import ApplyJob from "./pages/ApplyJob";

/* ============================================================
   ADMIN PAGES
============================================================ */
import AdminLogin from "./pages/AdminLogin";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import AdminResetPassword from "./pages/AdminResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import AdminJobs from "./pages/AdminJobs";
import AdminApplications from "./pages/AdminApplications";
import AdminJobApplications from "./pages/AdminJobApplications"; // ✅ NAYA
import AdminMessages from "./pages/AdminMessages";
import AdminProfile from "./pages/AdminProfile";

function App() {
  return (
    <AuthProvider>
      <div>
        <ScrollToTop />
        <Routes>
          {/* ============ PUBLIC ROUTES (With Navbar + Footer) ============ */}
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/process" element={<Process />} />
                  <Route path="/countries" element={<Countries />} />
                  <Route path="/country/:name" element={<CountryDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route
                    path="/terms-conditions"
                    element={<TermsConditions />}
                  />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/submit-cv" element={<SubmitCV />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/our-team" element={<OurTeam />} />

                  {/* Process Sub-Pages */}
                  <Route
                    path="/process/recruitment"
                    element={<RecruitmentProcess />}
                  />
                  <Route
                    path="/process/work-visa"
                    element={<WorkVisaProcess />}
                  />
                  <Route
                    path="/process/quality-policy"
                    element={<QualityPolicy />}
                  />

                  {/* Legal Status Sub-Pages */}
                  <Route path="/legal-status" element={<LegalStatus />} />
                  <Route
                    path="/legal-status/govt-license"
                    element={<GovtLicense />}
                  />
                  <Route
                    path="/legal-status/iso-certification"
                    element={<IsoCertification />}
                  />

                  {/* Apply Job */}
                  <Route path="/apply/:id" element={<ApplyJob />} />
                </Routes>
              </Layout>
            }
          />

          {/* ============ ADMIN AUTH (No Navbar / Footer) ============ */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/forgot-password"
            element={<AdminForgotPassword />}
          />
          <Route
            path="/admin/reset-password/:token"
            element={<AdminResetPassword />}
          />

          {/* ============ ADMIN PROTECTED (Sidebar Only, No Navbar / Footer) ============ */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route
              path="job-applications"
              element={<AdminJobApplications />}
            />{" "}
            {/* ✅ NAYA */}
            <Route path="messages" element={<AdminMessages />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
