import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  AlertCircle, 
  Sparkles,
  Store,
  Clock,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    storeName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    storeType: 'Small Supermarket (1-3 Checkout Counters)',
    estimatedSkus: '1,000 - 3,000 SKUs',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.storeName.trim()) {
      errs.storeName = 'Store or supermarket name is required';
    }
    if (!formData.contactName.trim()) {
      errs.contactName = 'Contact person name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Contact phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit Indian phone number';
    }
    if (!formData.city.trim()) {
      errs.city = 'City or town name is required';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    setSubmittedData({ ...formData });

    // Store in demo localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('smartexpiry_demo_requests') || '[]');
      existing.push({
        ...formData,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('smartexpiry_demo_requests', JSON.stringify(existing));

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Localstorage fallback
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setFormData({
      storeName: '',
      contactName: '',
      email: '',
      phone: '',
      city: '',
      storeType: 'Small Supermarket (1-3 Checkout Counters)',
      estimatedSkus: '1,000 - 3,000 SKUs',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50 to-emerald-50/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 border border-brand-200 text-xs font-semibold text-brand-800 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Get Started
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-navy-950 tracking-tight leading-tight">
            Make Your Inventory Smarter. <br className="hidden sm:inline" />
            Reduce Avoidable Waste.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Discover a simpler way to manage product expiry dates and keep your supermarket inventory under control.
          </p>
        </div>

        {/* Contact Form & Information Split Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Context & Consultation details */}
          <div className="lg:col-span-5 bg-gradient-to-br from-navy-900 via-slate-900 to-navy-950 text-white p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-xs font-semibold text-brand-300 mb-6">
                <Store className="w-3.5 h-3.5" />
                <span>Supermarket Pilot Program</span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Schedule a 1-on-1 Store Walkthrough
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Whether you run a 1-counter neighborhood mart or a 5-store departmental chain in Tier-2/3 cities, we will configure a demo tailored to your exact SKU categories.
              </p>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-brand-400">
                    ✓
                  </div>
                  <span>Free 14-day assisted pilot for qualified grocery stores.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-brand-400">
                    ✓
                  </div>
                  <span>Compatibility check with your existing barcode hardware.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-brand-400">
                    ✓
                  </div>
                  <span>Zero disruption to live billing or cashier operations.</span>
                </div>
              </div>
            </div>

            {/* Note regarding academic demo environment */}
            <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Academic Entrepreneurship Project</span>
              </div>
              <span>Developed for real-world retail incubation & college startup evaluation.</span>
            </div>
          </div>

          {/* Right Column: Interactive Form or Success State */}
          <div className="lg:col-span-7 p-8 sm:p-10 bg-white">
            
            {isSubmitted ? (
              <div className="h-full flex flex-col justify-center items-center text-center py-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold font-display text-navy-950 mb-2">
                  Demo Request Recorded!
                </h3>

                <p className="text-sm text-slate-600 max-w-md mb-6">
                  Thank you, <strong className="text-navy-900">{submittedData?.contactName}</strong>. Your request for <strong className="text-navy-900">{submittedData?.storeName}</strong> ({submittedData?.city}) has been recorded in the local demo session.
                </p>

                {/* Submitted Summary Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left w-full max-w-md text-xs space-y-1.5 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Store Format:</span>
                    <span className="font-semibold text-navy-900">{submittedData?.storeType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email:</span>
                    <span className="font-semibold text-navy-900">{submittedData?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone:</span>
                    <span className="font-semibold text-navy-900">+91 {submittedData?.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated SKUs:</span>
                    <span className="font-semibold text-navy-900">{submittedData?.estimatedSkus}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs text-left max-w-md mb-6">
                  <span className="font-semibold block mb-0.5">Note on Prototype System:</span>
                  This demo website operates in demonstration mode. In a live production deployment, this submission connects directly to the store onboarding pipeline.
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Store Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Supermarket / Store Name *
                    </label>
                    <div className="relative">
                      <Store className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Shiva Daily Mart"
                        value={formData.storeName}
                        onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                          errors.storeName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-brand-500'
                        }`}
                      />
                    </div>
                    {errors.storeName && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.storeName}</p>
                    )}
                  </div>

                  {/* Contact Person Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Store Manager / Owner *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Rajesh Sharma"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                          errors.contactName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-brand-500'
                        }`}
                      />
                    </div>
                    {errors.contactName && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.contactName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="rajesh@shivasmart.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                          errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-brand-500'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Contact Phone (10-Digit) *
                    </label>
                    <div className="relative">
                      <span className="text-xs font-semibold text-slate-500 absolute left-3 top-1/2 -translate-y-1/2">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength="10"
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full pl-11 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                          errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-brand-500'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / Location *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Surat, Indore, Lucknow"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                          errors.city ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-brand-500'
                        }`}
                      />
                    </div>
                    {errors.city && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* Store Type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Store Type
                    </label>
                    <select
                      value={formData.storeType}
                      onChange={(e) => setFormData({ ...formData, storeType: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    >
                      <option value="Local Grocery Store (1 Counter)">Local Grocery / Kirana (1 Counter)</option>
                      <option value="Small Supermarket (1-3 Checkout Counters)">Small Supermarket (1-3 Counters)</option>
                      <option value="Medium Retail Chain (3-10 Stores)">Medium Retail Chain (3-10 Stores)</option>
                      <option value="Departmental Store">Departmental Store</option>
                    </select>
                  </div>
                </div>

                {/* Message / Specific Needs */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Specific Expiry / Inventory Challenges (Optional)
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Tell us about the product categories you have the most trouble tracking (e.g. dairy, bread, packaged snacks)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-700 hover:to-emerald-700 shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/35 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request a Free Supermarket Demo</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    No spam guarantee. Demo requests are stored securely in browser session storage.
                  </p>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
