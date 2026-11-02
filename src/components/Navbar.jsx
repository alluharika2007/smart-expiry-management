import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles, 
  BarChart3, 
  Bell, 
  Store,
  PhoneCall
} from 'lucide-react';

export default function Navbar({ onRequestDemo }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Problem', href: '#problem' },
    { name: 'Our Solution', href: '#solution' },
    { name: 'Features', href: '#features' },
    { name: 'Live Dashboard', href: '#dashboard', highlight: true },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Target Stores', href: '#target-customers' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5' 
          : 'bg-white/80 backdrop-blur-sm py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <a 
            href="#hero" 
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-display font-bold text-navy-900 tracking-tight">
                  Smart<span className="text-brand-600">Expiry</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Retail AI
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                Inventory & Expiry Control
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  link.highlight 
                    ? 'text-brand-700 bg-brand-50 hover:bg-brand-100 font-semibold flex items-center gap-1' 
                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
                }`}
              >
                {link.highlight && <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>}
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#dashboard"
              onClick={(e) => handleLinkClick(e, '#dashboard')}
              className="text-xs font-semibold px-3 py-2 text-slate-700 hover:text-brand-700 transition-colors flex items-center gap-1"
            >
              <BarChart3 className="w-3.5 h-3.5 text-brand-600" />
              Demo Data
            </a>

            <button
              onClick={onRequestDemo}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-700 hover:to-emerald-700 shadow-md shadow-brand-600/20 hover:shadow-lg hover:shadow-brand-600/30 transition-all transform active:scale-95"
            >
              <span>Request a Demo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onRequestDemo}
              className="text-xs font-semibold bg-brand-600 text-white px-3 py-1.5 rounded-lg shadow-sm"
            >
              Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-navy-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  link.highlight 
                    ? 'text-brand-700 bg-brand-50 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                {link.highlight && (
                  <span className="text-[10px] uppercase font-bold bg-brand-600 text-white px-2 py-0.5 rounded-full">
                    Interactive
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestDemo();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Schedule Free Store Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
