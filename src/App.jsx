import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionWorkflow from './components/SolutionWorkflow';
import FeaturesSection from './components/FeaturesSection';
import InteractiveDashboard from './components/InteractiveDashboard';
import StoreMapNavigation from './components/StoreMapNavigation';
import HowItWorks from './components/HowItWorks';
import BenefitsSection from './components/BenefitsSection';
import TargetCustomers from './components/TargetCustomers';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Modals
import CameraBarcodeScannerModal from './components/CameraBarcodeScannerModal';
import EditLocationModal from './components/EditLocationModal';

// Initial Data
import { INITIAL_PRODUCTS } from './data/mockProducts';

export default function App() {
  // Shared inventory state across scanning, expiry dashboard, and floor map
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Modal & Navigation States
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProductToNavigate, setSelectedProductToNavigate] = useState(null);

  const handleRequestDemo = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = contactSection.querySelector('input');
        if (input) input.focus();
      }, 500);
    }
  };

  const handleNavigateToProduct = (product) => {
    setSelectedProductToNavigate(product);
    const navSection = document.getElementById('store-navigation');
    if (navSection) {
      navSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEditLocation = (product) => {
    setEditingProduct(product);
  };

  const handleSaveLocation = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    // Also update active navigation product if matching
    if (selectedProductToNavigate?.id === updatedProduct.id) {
      setSelectedProductToNavigate(updatedProduct);
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
        <InteractiveDashboard 
          products={products}
          setProducts={setProducts}
          onNavigateToProduct={handleNavigateToProduct}
          onOpenEditLocation={handleOpenEditLocation}
          onOpenScanner={() => setIsScannerOpen(true)}
        />

        {/* Section: Smart Indoor Navigation & Store Floor Map */}
        <StoreMapNavigation 
          products={products}
          selectedProductToNavigate={selectedProductToNavigate}
          onClearSelectedProduct={() => setSelectedProductToNavigate(null)}
          onEditLocation={handleOpenEditLocation}
        />

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

      {/* Global Interactive Scanner Modal (Feature 1) */}
      <CameraBarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        products={products}
        onNavigateToProduct={handleNavigateToProduct}
        onEditLocation={handleOpenEditLocation}
      />

      {/* Global Edit Location Modal (Feature 2) */}
      <EditLocationModal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        product={editingProduct}
        onSave={handleSaveLocation}
      />
    </div>
  );
}
