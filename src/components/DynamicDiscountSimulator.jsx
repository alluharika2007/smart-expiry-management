import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Tag, 
  ArrowRight, 
  AlertCircle, 
  TrendingDown, 
  ShoppingBag,
  Sparkles,
  Info
} from 'lucide-react';
import { getSmartRecommendation } from '../data/mockProducts';

export default function DynamicDiscountSimulator() {
  const [selectedProduct, setSelectedProduct] = useState('Amul Taaza Milk (1L)');
  const [basePrice, setBasePrice] = useState(56);
  const [daysLeft, setDaysLeft] = useState(3);
  const [category, setCategory] = useState('Dairy');

  const productsList = [
    { name: 'Amul Taaza Milk (1L)', price: 56, cat: 'Dairy', defaultDays: 2 },
    { name: 'Britannia Wheat Bread (400g)', price: 50, cat: 'Bakery', defaultDays: 1 },
    { name: 'Aashirvaad Chakki Atta (5kg)', price: 245, cat: 'Staples', defaultDays: 6 },
    { name: 'Epigamia Greek Yogurt (90g)', price: 50, cat: 'Dairy', defaultDays: 3 },
    { name: 'Mother Dairy Paneer (200g)', price: 92, cat: 'Dairy', defaultDays: -1 },
    { name: 'Kissan Tomato Ketchup (950g)', price: 145, cat: 'Condiments', defaultDays: 8 },
  ];

  const handleProductChange = (prod) => {
    setSelectedProduct(prod.name);
    setBasePrice(prod.price);
    setCategory(prod.cat);
    setDaysLeft(prod.defaultDays);
  };

  const recommendation = getSmartRecommendation(daysLeft, category);
  const discountedPrice = Math.round(basePrice * (1 - recommendation.percent / 100));
  const savedRevenue = basePrice - (daysLeft < 0 ? basePrice : (basePrice - discountedPrice));

  return (
    <div className="bg-gradient-to-br from-slate-900 to-navy-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-slate-800">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-xs font-semibold text-brand-300 uppercase tracking-wider mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            Interactive AI Algorithm Simulator
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Dynamic Markdown Curve Tester
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Simulate how our algorithm balances days remaining against retail margins to prevent 100% inventory write-offs.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700 text-xs text-slate-300">
          <Info className="w-4 h-4 text-brand-400 flex-shrink-0" />
          <span>Move the slider below to test different shelf-life stages</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Controls: Product Selection & Slider */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Quick Select Preset */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Sample Supermarket SKU
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {productsList.map((p) => (
                <button
                  key={p.name}
                  onClick={() => handleProductChange(p)}
                  className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    selectedProduct === p.name
                      ? 'bg-brand-600/30 border-brand-400 text-white font-semibold'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="truncate">{p.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">₹{p.price} • {p.cat}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Days Slider */}
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/80">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-slate-200">
                Simulated Days Remaining:
              </label>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-bold font-display px-3 py-1 rounded-lg ${
                  daysLeft < 0 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40' 
                    : daysLeft <= 3 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : daysLeft <= 7 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {daysLeft < 0 ? 'Expired (-1d)' : `${daysLeft} Day${daysLeft === 1 ? '' : 's'}`}
                </span>
              </div>
            </div>

            <input
              type="range"
              min="-1"
              max="20"
              value={daysLeft}
              onChange={(e) => setDaysLeft(parseInt(e.target.value))}
              className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500 focus:outline-none"
            />

            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span className="text-red-400 font-semibold">Expired (-1d)</span>
              <span>1d (Critical)</span>
              <span>3d (Fast-Mover)</span>
              <span>7d (Promo)</span>
              <span>15d+ (Safe)</span>
            </div>
          </div>

          {/* Explanation of Strategy */}
          <div className="text-xs text-slate-400 bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-200">Retail Science Insight:</strong> Supermarkets lose 100% of product cost once an item crosses expiry. A structured 20%-50% discount salvages between 50% and 80% of unit cost while delighting value-conscious shoppers in Tier-2/3 cities.
            </p>
          </div>

        </div>

        {/* Right Output: Real-Time AI Decision Card */}
        <div className="lg:col-span-5 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Generated Decision
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${recommendation.badgeColor}`}>
                {recommendation.status}
              </span>
            </div>

            <h4 className="text-xl font-bold text-white mb-1">
              {selectedProduct}
            </h4>
            <div className="text-xs text-slate-400 mb-6">
              Category: {category} • Base MRP: ₹{basePrice}
            </div>

            {/* Price comparison */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Original Price</span>
                <span className="text-2xl font-bold font-display text-slate-300">₹{basePrice}</span>
              </div>

              <div className="bg-brand-950/60 p-3.5 rounded-xl border border-brand-500/40">
                <span className="text-[11px] text-brand-300 block">
                  {daysLeft < 0 ? 'Salvage Value' : 'Smart Markdown Price'}
                </span>
                <span className="text-2xl font-bold font-display text-emerald-400">
                  {daysLeft < 0 ? '₹0' : `₹${discountedPrice}`}
                </span>
                {daysLeft >= 0 && recommendation.percent > 0 && (
                  <span className="text-[11px] text-emerald-300 block font-semibold">
                    ({recommendation.percent}% Off)
                  </span>
                )}
              </div>
            </div>

            {/* Recommended Action */}
            <div className="space-y-2 mb-6">
              <div className="text-xs font-semibold text-slate-300">Recommended Floor Action:</div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-sm font-medium text-brand-300 flex items-center gap-2">
                <Tag className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>{recommendation.discount}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700 text-xs text-slate-400 flex items-center justify-between">
            <span>Floor Task:</span>
            <span className="font-semibold text-white bg-slate-700 px-3 py-1 rounded-lg">
              {recommendation.action}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
