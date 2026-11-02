import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  X, 
  Save, 
  CheckCircle2, 
  Building2, 
  Layers, 
  Tag, 
  Store,
  Compass
} from 'lucide-react';
import { 
  SUPERMARKET_BRANCHES, 
  DEPARTMENTS, 
  AISLE_OPTIONS, 
  generateShelfCode,
  getCoordinatesForAisle 
} from '../data/mockProducts';

export default function EditLocationModal({ isOpen, onClose, product, onSave }) {
  const [formData, setFormData] = useState({
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Dairy & Cold Storage',
    aisle: 'Chiller Zone',
    rack: 'Bay 1',
    shelfNumber: 'Shelf 2',
    shelfLevel: 'Eye Level'
  });

  useEffect(() => {
    if (product) {
      setFormData({
        branchId: product.branchId || 'BR-01',
        branchName: product.branchName || 'Shiva Supermarket - Central Indore (Main Branch)',
        department: product.department || 'Dairy & Cold Storage',
        aisle: product.aisle || 'Chiller Zone',
        rack: product.rack || 'Rack A',
        shelfNumber: product.shelfNumber || 'Shelf 2',
        shelfLevel: product.shelfLevel || 'Eye Level'
      });
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const currentShelfCode = generateShelfCode(formData.aisle, formData.rack, formData.shelfNumber);

  const handleBranchChange = (e) => {
    const bId = e.target.value;
    const branch = SUPERMARKET_BRANCHES.find(b => b.id === bId);
    setFormData({
      ...formData,
      branchId: bId,
      branchName: branch ? branch.name : formData.branchName
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const coords = getCoordinatesForAisle(formData.aisle);
    const updated = {
      ...product,
      ...formData,
      shelfCode: currentShelfCode,
      location: `${formData.aisle} • ${formData.rack} • ${formData.shelfNumber} (${formData.shelfLevel})`,
      mapCoords: coords
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-950 font-display">
                Update Physical Shelf Location
              </h3>
              <p className="text-xs text-slate-500">
                Authorized staff inventory relocation control
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Product Info Banner */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 mb-5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-navy-900">{product.name}</span>
            <span className="font-mono text-[11px] text-slate-500">{product.sku}</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Current: {product.location || 'Unassigned'}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Branch */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Supermarket Branch
            </label>
            <select
              value={formData.branchId}
              onChange={handleBranchChange}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {SUPERMARKET_BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Store Department
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Aisle & Rack */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Aisle Number / Zone
              </label>
              <select
                value={formData.aisle}
                onChange={(e) => setFormData({ ...formData, aisle: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                {AISLE_OPTIONS.filter(a => a.id !== 'All Aisles').map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rack / Bay ID
              </label>
              <input
                type="text"
                required
                value={formData.rack}
                onChange={(e) => setFormData({ ...formData, rack: e.target.value })}
                placeholder="e.g. Rack A or Bay 2"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Shelf Number & Level */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shelf Number
              </label>
              <select
                value={formData.shelfNumber}
                onChange={(e) => setFormData({ ...formData, shelfNumber: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="Shelf 1">Shelf 1 (Bottom Tier)</option>
                <option value="Shelf 2">Shelf 2 (Middle Tier)</option>
                <option value="Shelf 3">Shelf 3 (Upper Tier)</option>
                <option value="Shelf 4">Shelf 4 (Top Tier)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shelf Level
              </label>
              <select
                value={formData.shelfLevel}
                onChange={(e) => setFormData({ ...formData, shelfLevel: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="Eye Level">Eye Level (Prime Visibility)</option>
                <option value="Top Level">Top Level</option>
                <option value="Bottom Level">Bottom Level</option>
              </select>
            </div>
          </div>

          {/* Live Generated Shelf Code Pill */}
          <div className="p-3 bg-brand-50 rounded-xl border border-brand-200 flex items-center justify-between text-xs">
            <span className="text-brand-800 font-medium">Generated Shelf Code:</span>
            <span className="font-mono font-bold text-brand-900 bg-white px-2.5 py-1 rounded-md border border-brand-300">
              {currentShelfCode}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/20 flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Map Location</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
