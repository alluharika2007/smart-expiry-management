import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Scan, 
  Download, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Tag, 
  Trash2, 
  Store, 
  Sparkles,
  X,
  Layers,
  MapPin,
  Calendar,
  Navigation,
  Edit3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  INITIAL_PRODUCTS, 
  CATEGORIES, 
  STATUS_FILTERS, 
  AISLE_OPTIONS, 
  SUPERMARKET_BRANCHES,
  calculateDaysLeft, 
  generateShelfCode, 
  getCoordinatesForAisle 
} from '../data/mockProducts';
import DynamicDiscountSimulator from './DynamicDiscountSimulator';

export default function InteractiveDashboard({ 
  products = INITIAL_PRODUCTS, 
  setProducts,
  onNavigateToProduct,
  onOpenEditLocation,
  onOpenScanner
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAisle, setSelectedAisle] = useState('All Aisles');
  const [selectedBranch, setSelectedBranch] = useState(SUPERMARKET_BRANCHES[0].id);
  const [toastMessage, setToastMessage] = useState(null);

  // Add Product modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state with full location fields
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Dairy & Chilled',
    brand: '',
    batchNo: `BAT-2026-${Math.floor(100 + Math.random() * 900)}`,
    barcode: `890${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    expiryDate: '2026-11-06',
    stockQty: 20,
    unitPrice: 65,
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Dairy & Cold Storage',
    aisle: 'Aisle 1',
    rack: 'Rack A',
    shelfNumber: 'Shelf 2',
    shelfLevel: 'Eye Level'
  });

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.batchNo.toLowerCase().includes(q) ||
        p.barcode.includes(q) ||
        p.shelfCode?.toLowerCase().includes(q);

      const matchesCategory = 
        selectedCategory === 'All Categories' || p.category === selectedCategory;

      let matchesStatus = true;
      if (selectedStatus === 'expiring') {
        matchesStatus = p.status === 'Expiring Soon';
      } else if (selectedStatus === 'expired') {
        matchesStatus = p.status === 'Expired';
      } else if (selectedStatus === 'safe') {
        matchesStatus = p.status === 'Safe';
      }

      const matchesAisle = 
        selectedAisle === 'All Aisles' || p.aisle === selectedAisle;

      const matchesBranch = 
        !selectedBranch || p.branchId === selectedBranch;

      return matchesSearch && matchesCategory && matchesStatus && matchesAisle && matchesBranch;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus, selectedAisle, selectedBranch]);

  // Metrics
  const metrics = useMemo(() => {
    const total = products.length;
    const expiringSoon = products.filter(p => p.status === 'Expiring Soon').length;
    const expired = products.filter(p => p.status === 'Expired').length;
    const safe = products.filter(p => p.status === 'Safe').length;
    
    const valueAtRisk = products
      .filter(p => p.status === 'Expiring Soon' || p.status === 'Expired')
      .reduce((acc, curr) => acc + (curr.stockQty * curr.unitPrice), 0);

    const actioned = products.filter(p => p.actionStatus !== 'Pending').length;

    return { total, expiringSoon, expired, safe, valueAtRisk, actioned };
  }, [products]);

  // Action: Apply Discount
  const handleApplyDiscount = (id) => {
    if (!setProducts) return;
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            actionStatus: 'Discount Applied',
            suggestedDiscount: `${item.suggestedDiscount} (Synced with POS)`
          };
        }
        return item;
      })
    );

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    showToast(`✓ Discount markdown successfully synced with POS checkout!`);
  };

  // Action: Remove / Clear Item
  const handleRemoveItem = (id) => {
    if (!setProducts) return;
    const item = products.find(p => p.id === id);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, actionStatus: 'Removed / Logged' } : p))
    );
    showToast(`✓ ${item?.name || 'Expired stock'} logged for vendor credit & removed from shelf.`);
  };

  // Reset Demo Data
  const handleReset = () => {
    if (setProducts) setProducts(INITIAL_PRODUCTS);
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedStatus('all');
    setSelectedAisle('All Aisles');
    showToast('Demo data restored to initial state.');
  };

  // Handle Add Product Submit with full location
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.expiryDate) {
      alert('Please fill in product name and expiry date');
      return;
    }

    const days = calculateDaysLeft(newProduct.expiryDate);
    let status = 'Safe';
    let suggestedDiscount = 'Regular Retail Price (0%)';
    let discountPercent = 0;

    if (days < 0) {
      status = 'Expired';
      suggestedDiscount = 'DO NOT SELL: Immediate Shelf Pull & Vendor Credit Return';
    } else if (days <= 7) {
      status = 'Expiring Soon';
      discountPercent = days <= 2 ? 50 : 25;
      suggestedDiscount = `${discountPercent}% Smart Markdown (Front Display)`;
    }

    const sCode = generateShelfCode(newProduct.aisle, newProduct.rack, newProduct.shelfNumber);
    const coords = getCoordinatesForAisle(newProduct.aisle);
    const skuCode = `SKU-${newProduct.name.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const createdProduct = {
      id: `PRD-${Math.floor(200 + Math.random() * 800)}`,
      sku: skuCode,
      qrCode: `QR-${skuCode}`,
      name: newProduct.name,
      category: newProduct.category,
      brand: newProduct.brand || 'Custom Brand',
      barcode: newProduct.barcode,
      batchNo: newProduct.batchNo,
      mfgDate: '2026-10-15',
      expiryDate: newProduct.expiryDate,
      daysLeft: days,
      stockQty: parseInt(newProduct.stockQty) || 10,
      unitPrice: parseInt(newProduct.unitPrice) || 50,
      status: status,
      suggestedDiscount: suggestedDiscount,
      discountPercent: discountPercent,
      actionStatus: 'Pending',
      riskLevel: status === 'Expired' ? 'Expired' : status === 'Expiring Soon' ? 'High' : 'Safe',
      // Location
      branchId: newProduct.branchId,
      branchName: newProduct.branchName,
      department: newProduct.department,
      aisle: newProduct.aisle,
      aisleNumber: newProduct.aisle,
      rack: newProduct.rack,
      shelfNumber: newProduct.shelfNumber,
      shelfLevel: newProduct.shelfLevel,
      shelfCode: sCode,
      location: `${newProduct.aisle} • ${newProduct.rack} • ${newProduct.shelfNumber} (${newProduct.shelfLevel})`,
      mapCoords: coords
    };

    if (setProducts) {
      setProducts([createdProduct, ...products]);
    }
    setIsAddModalOpen(false);
    showToast(`✓ New product "${createdProduct.name}" logged at shelf ${sCode}!`);
  };

  // Export CSV with full location data
  const handleExportCSV = () => {
    const headers = ['ID,SKU,Name,Category,Batch,Shelf Code,Aisle,Rack,Shelf Level,Expiry Date,Days Left,Stock,Price,Status,Suggested Action'];
    const rows = filteredProducts.map(p => 
      `"${p.id}","${p.sku || ''}","${p.name}","${p.category}","${p.batchNo}","${p.shelfCode || ''}","${p.aisle}","${p.rack}","${p.shelfLevel}","${p.expiryDate}",${p.daysLeft},${p.stockQty},${p.unitPrice},"${p.status}","${p.suggestedDiscount}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SmartExpiry_Full_Audit_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('✓ Supermarket audit with shelf locations exported as CSV!');
  };

  return (
    <section id="dashboard" className="py-20 lg:py-28 bg-slate-100/70 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-xs font-semibold text-emerald-900 uppercase tracking-wider mb-3">
              <Store className="w-3.5 h-3.5 text-emerald-700" />
              Integrated Supermarket Central
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950 tracking-tight">
              Live Supermarket Inventory & Shelf Control
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Monitor batch aging, shelf locations, and markdown recommendations. Connect directly to camera barcode scanning and indoor floor navigation.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenScanner}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white border border-slate-300 hover:border-brand-500 hover:text-brand-700 text-slate-700 shadow-sm transition-all flex items-center gap-1.5"
            >
              <Scan className="w-4 h-4 text-brand-600" />
              <span>Camera Barcode / QR Scanner</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-600/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Supermarket SKU</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="p-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm transition-all"
              title="Export CSV Audit"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm transition-all"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Demo Mode Notice */}
        <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span>
              <strong>Demonstration Mode:</strong> Physical shelf locations, EAN-13 barcodes, and floor routing are fully synchronized with our indoor navigation engine.
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono text-emerald-700">
            Anchor Date: 02 Nov 2026
          </span>
        </div>

        {/* KPI Metrics Summary Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium block">Total Monitored SKUs</span>
            <div className="text-2xl font-display font-bold text-navy-950 mt-1">
              {metrics.total}
            </div>
            <span className="text-[11px] text-slate-500">Across 6 store categories</span>
          </div>

          <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-800 font-semibold block">Expiring Soon (≤7d)</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-display font-bold text-amber-950 mt-1">
              {metrics.expiringSoon} Batches
            </div>
            <span className="text-[11px] text-amber-700 font-medium">Eligible for AI markdown</span>
          </div>

          <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-rose-800 font-semibold block">Expired Products</span>
              <ShieldAlert className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl font-display font-bold text-rose-950 mt-1">
              {metrics.expired} Batches
            </div>
            <span className="text-[11px] text-rose-700 font-medium">DO NOT SELL • Pull out</span>
          </div>

          <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 shadow-sm">
            <span className="text-xs text-emerald-800 font-semibold block">Safe Shelf Life (&gt;7d)</span>
            <div className="text-2xl font-display font-bold text-emerald-950 mt-1">
              {metrics.safe}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">Healthy inventory velocity</span>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium block">Stock Value at Risk</span>
            <div className="text-2xl font-display font-bold text-navy-900 mt-1">
              ₹{metrics.valueAtRisk.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">
              {metrics.actioned} items actioned
            </span>
          </div>

        </div>

        {/* Dashboard Main Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden mb-12">
          
          {/* Table Toolbar */}
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/60 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by product, SKU, barcode, or shelf code (e.g. A1, CZ-B1)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                value={selectedAisle}
                onChange={(e) => setSelectedAisle(e.target.value)}
                className="bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
              >
                {AISLE_OPTIONS.map((a) => (
                  <option key={a.id} value={a.id}>{a.label}</option>
                ))}
              </select>

              {/* Status Pills */}
              <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl">
                {STATUS_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedStatus(f.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedStatus === f.id
                        ? 'bg-white text-navy-900 shadow-sm'
                        : 'text-slate-600 hover:text-navy-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Table View */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Product & SKU</th>
                  <th className="py-3.5 px-4">Shelf Location & Code</th>
                  <th className="py-3.5 px-4">Expiry Date & Countdown</th>
                  <th className="py-3.5 px-4">Stock & Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">AI Recommended Action</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Floor Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-normal">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertTriangle className="w-8 h-8 text-amber-500" />
                        <span className="font-semibold text-slate-700">No products match your filter criteria</span>
                        <button
                          onClick={handleReset}
                          className="text-xs text-brand-600 font-semibold hover:underline mt-1"
                        >
                          Clear filters & reset
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => {
                    const isExpired = p.status === 'Expired';
                    const isExpiringSoon = p.status === 'Expiring Soon';

                    return (
                      <tr
                        key={p.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          p.actionStatus === 'Discount Applied'
                            ? 'bg-emerald-50/20'
                            : isExpired
                            ? 'bg-rose-50/25'
                            : ''
                        }`}
                      >
                        {/* Product Info */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="font-semibold text-navy-900">
                            {p.name}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span className="font-mono text-[10px] font-bold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200">
                              {p.sku}
                            </span>
                            <span>•</span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium text-[10px]">
                              {p.category}
                            </span>
                          </div>
                        </td>

                        {/* Shelf Location & Code */}
                        <td className="py-4 px-4 text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs font-bold text-brand-800 bg-brand-50 px-2 py-0.5 rounded border border-brand-300">
                              {p.shelfCode}
                            </span>
                            <button
                              onClick={() => onOpenEditLocation(p)}
                              className="text-slate-400 hover:text-brand-600 p-1"
                              title="Update Product Shelf Location"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            <span className="truncate max-w-[180px]">{p.location}</span>
                          </div>
                        </td>

                        {/* Expiry Date & Countdown */}
                        <td className="py-4 px-4">
                          <div className="font-semibold text-slate-800 text-xs sm:text-sm">
                            {p.expiryDate}
                          </div>
                          <div className="mt-1">
                            {isExpired ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                                <ShieldAlert className="w-3 h-3" />
                                {Math.abs(p.daysLeft)} Day(s) Overdue
                              </span>
                            ) : isExpiringSoon ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                                <Clock className="w-3 h-3 text-amber-600" />
                                {p.daysLeft} Day{p.daysLeft === 1 ? '' : 's'} Remaining
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                {p.daysLeft} Days Safe
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Stock & Unit Price */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-navy-900">
                            {p.stockQty} Units
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            ₹{p.unitPrice} / unit
                          </div>
                        </td>

                        {/* Status Label */}
                        <td className="py-4 px-4">
                          {isExpired ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-300">
                              Expired
                            </span>
                          ) : isExpiringSoon ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                              Expiring Soon
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              Safe
                            </span>
                          )}
                        </td>

                        {/* AI Suggested Action (Never sell expired items!) */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5">
                            <Tag className={`w-3.5 h-3.5 ${isExpired ? 'text-rose-500' : isExpiringSoon ? 'text-coral-500' : 'text-slate-400'}`} />
                            <span className={`text-xs font-medium ${
                              isExpired 
                                ? 'text-rose-700 font-bold' 
                                : isExpiringSoon 
                                ? 'text-coral-600 font-semibold' 
                                : 'text-slate-600'
                            }`}>
                              {p.suggestedDiscount}
                            </span>
                          </div>
                          {p.actionStatus !== 'Pending' && (
                            <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              ✓ {p.actionStatus}
                            </span>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-4 sm:px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            
                            {/* Navigate to Product Button */}
                            <button
                              type="button"
                              onClick={() => onNavigateToProduct(p)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 flex items-center gap-1 transition-colors"
                              title="View and navigate to product on store map"
                            >
                              <Navigation className="w-3 h-3 text-brand-600" />
                              <span className="hidden sm:inline">Navigate</span>
                            </button>

                            {/* Discount / Pull Action */}
                            {isExpired ? (
                              <button
                                onClick={() => handleRemoveItem(p.id)}
                                disabled={p.actionStatus === 'Removed / Logged'}
                                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                                  p.actionStatus === 'Removed / Logged'
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm'
                                }`}
                              >
                                {p.actionStatus === 'Removed / Logged' ? 'Cleared' : 'Pull Shelf'}
                              </button>
                            ) : isExpiringSoon ? (
                              <button
                                onClick={() => handleApplyDiscount(p.id)}
                                disabled={p.actionStatus === 'Discount Applied'}
                                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                                  p.actionStatus === 'Discount Applied'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                                }`}
                              >
                                {p.actionStatus === 'Discount Applied' ? '✓ Discounted' : 'Apply Discount'}
                              </button>
                            ) : (
                              <button
                                onClick={() => onOpenEditLocation(p)}
                                className="text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
                              >
                                Relocate
                              </button>
                            )}

                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
            <span>Showing {filteredProducts.length} of {products.length} registered supermarket products</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Safe ({metrics.safe})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Expiring Soon ({metrics.expiringSoon})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Expired ({metrics.expired})
              </span>
            </div>
          </div>

        </div>

        {/* Embedded Interactive AI Discount Simulator Component */}
        <DynamicDiscountSimulator />

      </div>

      {/* Add Product Modal with Full Location Fields */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-950 font-display">
                  Add Supermarket SKU & Location
                </h3>
                <p className="text-xs text-slate-500">
                  Register product, assign shelf code, and connect to indoor floor plan
                </p>
              </div>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Name & Packaging *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amul Salted Butter (100g)"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  >
                    {CATEGORIES.filter(c => c !== 'All Categories').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Brand / Manufacturer
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amul, Nestlé"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newProduct.expiryDate}
                    onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Stock Quantity (Units)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newProduct.stockQty}
                    onChange={(e) => setNewProduct({ ...newProduct, stockQty: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Unit Price (₹ INR)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newProduct.unitPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, unitPrice: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Aisle / Zone *
                  </label>
                  <select
                    value={newProduct.aisle}
                    onChange={(e) => setNewProduct({ ...newProduct, aisle: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  >
                    {AISLE_OPTIONS.filter(a => a.id !== 'All Aisles').map((a) => (
                      <option key={a.id} value={a.id}>{a.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rack / Bay ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rack A"
                    value={newProduct.rack}
                    onChange={(e) => setNewProduct({ ...newProduct, rack: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Shelf & Level
                  </label>
                  <select
                    value={newProduct.shelfLevel}
                    onChange={(e) => setNewProduct({ ...newProduct, shelfLevel: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  >
                    <option value="Eye Level">Eye Level (Prime)</option>
                    <option value="Top Level">Top Level</option>
                    <option value="Bottom Level">Bottom Level</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/20"
                >
                  Add SKU & Connect to Floor Map
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
