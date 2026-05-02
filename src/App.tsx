// ============================================================
// App.tsx
// Root application component for the Klanvision website.
// Manages the initial loading screen and renders the full
// page layout: Navbar → Sections → Footer → Floating buttons.
// ============================================================

import './index.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Section Components ───────────────────────────────────────
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StrategicServices from './components/StrategicServices';
import ServicesSection from './components/ServicesSection';
import WhyPartner from './components/WhyPartner';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import BlogSection from './components/BlogSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import FAQPage from './components/FAQPage';
import RefundPolicyPage from './components/RefundPolicyPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import ServicePolicyPage from './components/ServicePolicyPage';
import TermsPage from './components/TermsPage';
import ConsultationPage from './components/ConsultationPage';
import ManagedServicesPage from './components/ManagedServicesPage';
import CybersecurityPage from './components/CybersecurityPage';
import WebDevelopmentPage from './components/WebDevelopmentPage';
import MobileAppPage from './components/MobileAppPage';
import CloudServicesPage from './components/CloudServicesPage';
import UpgradeMigrationPage from './components/UpgradeMigrationPage';
import APIIntegrationPage from './components/APIIntegrationPage';
import { MessageCircle } from 'lucide-react';

// ── Loader Component ─────────────────────────────────────────
// Full-screen branded splash screen displayed for 2.4 seconds
// on first load. Fades out with a slight scale-up exit animation.
function Loader() {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}    // smooth exit when app is ready
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'white',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 20,
      }}
    >
      {/* Animated brand icon – rotating gradient square with "K" letter */}
      <motion.div
        animate={{ rotate: [0, 180, 360], scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 70, height: 70, borderRadius: 18,
          background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(79,70,229,0.4)',
        }}
      >
        <span style={{ color: 'white', fontWeight: 900, fontFamily: 'sans-serif', fontSize: 36 }}>K</span>
      </motion.div>

      {/* Brand name with pulsing opacity */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: 28 }}
        className="gradient-text"
      >
        KLANVISION
      </motion.div>

      {/* Shimmer progress bar */}
      <div style={{ width: 240, height: 4, background: '#F3F4F6', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ height: '100%', width: '60%', background: 'linear-gradient(90deg, #FF6B35, #7C3AED)', borderRadius: 2 }}
        />
      </div>

      {/* Tagline shown during loading */}
      <p style={{ color: '#9CA3AF', fontSize: 14, fontFamily: 'sans-serif' }}>Transforming Ideas into Digital Reality...</p>
    </motion.div>
  );
}

// ── App Component ────────────────────────────────────────────
// Controls app-level state: shows Loader for 2.4s,
// then fades in the full site content.
function App() {
  const [loading, setLoading] = useState(true);

  // Hide loader after 2400ms on initial mount
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(t);   // cleanup on unmount
  }, []);

  // Simple routing for FAQ and Refund Policy pages
  if (window.location.pathname === '/faq') {
    return <FAQPage />;
  }
  if (window.location.pathname === '/refund-policy') {
    return <RefundPolicyPage />;
  }
  if (window.location.pathname === '/privacy-policy') {
    return <PrivacyPolicyPage />;
  }
  if (window.location.pathname === '/service-policy') {
    return <ServicePolicyPage />;
  }
  if (window.location.pathname === '/terms') {
    return <TermsPage />;
  }
  if (window.location.pathname === '/it-consultation') {
    return <ConsultationPage />;
  }
  if (window.location.pathname === '/managed-services') {
    return <ManagedServicesPage />;
  }
  if (window.location.pathname === '/cybersecurity') {
    return <CybersecurityPage />;
  }
  if (window.location.pathname === '/web-development') {
    return <WebDevelopmentPage />;
  }
  if (window.location.pathname === '/mobile-app') {
    return <MobileAppPage />;
  }
  if (window.location.pathname === '/cloud-services') {
    return <CloudServicesPage />;
  }
  if (window.location.pathname === '/upgrade-migration') {
    return <UpgradeMigrationPage />;
  }
  if (window.location.pathname === '/api-integration') {
    return <APIIntegrationPage />;
  }

  return (
    <>
      {/* AnimatePresence handles the fade-out exit animation of Loader */}
      <AnimatePresence mode="wait">
        {loading && <Loader />}
      </AnimatePresence>

      {/* Main site content – fades in after loader exits */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Fixed navigation bar at the top */}
          <Navbar />

          {/* Page sections in scroll order */}
          <main>
            <Hero />                  {/* Full-screen hero with heading, CTA, and image */}
            <StrategicServices />     {/* 8-card digital services overview grid */}
            <ServicesSection />       {/* Detailed 8-card service offerings */}
            <WhyPartner />            {/* Reasons to partner + animated stats + CTA banner */}
            <PortfolioSection />      {/* Filterable project portfolio grid */}
            <TestimonialsSection />   {/* Client testimonials + trust badges */}
            <BlogSection />           {/* 6 blog article cards */}
            <AboutSection />          {/* Company info, milestones, and highlights */}
            <ContactSection />        {/* Contact form + info card + support image */}
          </main>

          {/* Site footer with brand, links, legal, and contact info */}
          <Footer />

          {/* AI Chat Assistant – floating button bottom-right */}
          <AIAssistant />

          {/* Floating WhatsApp Button – with jiggle animation */}
          <div style={{ position: 'fixed', bottom: 125, right: 30, zIndex: 2000 }}>
            <motion.a
              href="https://wa.me/919380202408"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                rotate: [0, -10, 10, -10, 10, 0] // jiggle effect
              }}
              transition={{ 
                scale: { duration: 0.5 },
                rotate: { duration: 0.5, repeat: Infinity, repeatDelay: 3 } 
              }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 60, height: 60, borderRadius: '50%',
                background: '#25D366', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
                cursor: 'pointer', position: 'relative'
              }}
            >
              <MessageCircle size={32} />
              
              {/* Notification Badge */}
              <div style={{ position: 'absolute', top: 2, right: 2, width: 14, height: 14, background: '#EF4444', borderRadius: '50%', border: '2px solid white' }} />

              {/* Pulsing ring around WhatsApp button */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '2px solid #25D366' }}
              />
            </motion.a>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default App;
