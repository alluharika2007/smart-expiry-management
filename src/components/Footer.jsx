import React from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Heart,
  Store,
  Layers,
  ArrowUp
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-display font-bold text-white tracking-tight">
                Smart<span className="text-brand-500">Expiry</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Smart Expiry Management System is a retail technology initiative dedicated to helping small and medium-sized supermarkets in Tier-2 and Tier-3 cities eliminate product expiry losses, prevent food waste, and safeguard customer trust.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-brand-950 text-brand-300 border border-brand-800">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                Incubation & Entrepreneurship Project
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#hero" className="hover:text-brand-400 transition-colors">Home Overview</a>
              </li>
              <li>
                <a href="#problem" className="hover:text-brand-400 transition-colors">Problem We Solve</a>
              </li>
              <li>
                <a href="#solution" className="hover:text-brand-400 transition-colors">Our 6-Step Solution</a>
              </li>
              <li>
                <a href="#features" className="hover:text-brand-400 transition-colors">Key Features & Badges</a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-brand-400 transition-colors text-brand-300 font-semibold">
                  Interactive Live Dashboard
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-brand-400 transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-brand-400 transition-colors">Supermarket Benefits</a>
              </li>
            </ul>
          </div>

          {/* Product & Innovation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Focus Verticals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#target-customers" className="hover:text-brand-400 transition-colors">Tier-2 & Tier-3 Kiranas</a>
              </li>
              <li>
                <a href="#target-customers" className="hover:text-brand-400 transition-colors">Standalone Supermarkets</a>
              </li>
              <li>
                <a href="#target-customers" className="hover:text-brand-400 transition-colors">Dairy & Cold Storage</a>
              </li>
              <li>
                <a href="#target-customers" className="hover:text-brand-400 transition-colors">Regional Retail Chains</a>
              </li>
              <li>
                <a href="#features" className="hover:text-brand-400 transition-colors">AI Dynamic Markdown Curve</a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-brand-400 transition-colors">Barcode Scan Simulator</a>
              </li>
            </ul>
          </div>

          {/* Contact & Incubation Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Contact & Project Info
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>support@smartexpiry.in</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>Center for Innovation & Entrepreneurship, Campus Tech Incubation Park</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-brand-400" />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} SmartExpiry Management System. All rights reserved.
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Built with precision for College Entrepreneurship & Retail Tech Evaluation</span>
          </div>

          <div className="text-[11px] text-slate-500">
            Designed for Indian Tier-2 & Tier-3 Supermarket Modernization
          </div>
        </div>

      </div>
    </footer>
  );
}
