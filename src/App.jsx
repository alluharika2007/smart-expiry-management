import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionWorkflow from './components/SolutionWorkflow';
import FeaturesSection from './components/FeaturesSection';
import InteractiveDashboard from './components/InteractiveDashboard';
import HowItWorks from './components/HowItWorks';
import BenefitsSection from './components/BenefitsSection';
import TargetCustomers from './components/TargetCustomers';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const handleRequestDemo = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Focus on first input after a short delay
      setTimeout(() => {
        const input = contactSection.querySelector('input');
        if (input) input.focus();
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-navy-800 font-sans selection:bg-brand-100 selection:text-brand-900">
      {/* Navigation */}
      <Navbar onRequestDemo={handleRequestDemo} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Section B: Hero Section */}
        <Hero onRequestDemo={handleRequestDemo} />

        {/* Section C: Problem We Solve */}
        <ProblemSection />

        {/* Section D: Our Solution (6-step workflow) */}
        <SolutionWorkflow />

        {/* Section E: Key Features */}
        <FeaturesSection />

        {/* Section F: Interactive Dashboard Preview & Simulator */}
        <InteractiveDashboard />

        {/* Section G: How It Works (3-step visual) */}
        <HowItWorks />

        {/* Section H: Benefits for Supermarkets */}
        <BenefitsSection />

        {/* Section I: Target Customers (Tier-2 & Tier-3 Cities) */}
        <TargetCustomers />

        {/* Section J: Call to Action & Contact / Demo Request Form */}
        <ContactSection />
      </main>

      {/* Section K: Footer */}
      <Footer />
    </div>
  );
}
