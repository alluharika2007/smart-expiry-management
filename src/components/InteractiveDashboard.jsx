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
  ArrowUpDown, 
  Tag, 
  Trash2, 
  Check, 
  Store, 
  Sparkles,
  X,
  FileSpreadsheet,
  Layers,
  MapPin,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_PRODUCTS, CATEGORIES, STATUS_FILTERS, calculateDaysLeft } from '../data/mockProducts';
import DynamicDiscountSimulator from './DynamicDiscountSimulator';

export default function InteractiveDashboard() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [toastMessage, setToastMessage] = useState(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [scanningActive, setScanningActive] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Dairy & Chilled',
    brand: '',
    batchNo: `BAT-2026-${Math.floor(100 + Math.random() * 900)}`,
    barcode: `890${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    expiryDate: '2026-11-06',
    stockQty: 20,
    unitPrice: 65,
    location: 'Aisle 1 - Shelf B'
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
      // Search
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.batchNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.barcode.includes(searchQuery);

      // Category
      const matchesCategory = 
        selectedCategory === 'All Categories' || p.category === selectedCategory;

      // Status
      let matchesStatus = true;
      if (selectedStatus === 'expiring') {
        matchesStatus = p.status === 'Expiring Soon';
      } else if (selectedStatus === 'expired') {
        matchesStatus = p.status === 'Expired';
      } else if (selectedStatus === 'safe') {
        matchesStatus = p.status === 'Safe';
      }

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus]);

  // Metrics
  const metrics = useMemo(() => {
    const total = products.length;
    const expiringSoon = products.filter(p => p.status === 'Expiring Soon').length;
    const expired = products.filter(p => p.status === 'Expired').length;
    const safe = products.filter(p => p.status === 'Safe').length;
    
    // Value at risk: items expiring soon or expired
    const valueAtRisk = products
      .filter(p => p.status === 'Expiring Soon' || p.status === 'Expired')
      .reduce((acc, curr) => acc + (curr.stockQty * curr.unitPrice), 0);

    const actioned = products.filter(p => p.actionStatus !== 'Pending').length;

    return { total, expiringSoon, expired, safe, valueAtRisk, actioned };
  }, [products]);

  // Action: Apply Discount
  const handleApplyDiscount = (id) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            actionStatus: 'Discount Applied',
            suggestedDiscount: `${item.suggestedDiscount} (Applied to POS)`
          };
        }
        return item;
      })
    );

    // Subtle celebration confetti
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // fallback
    }

    showToast(`✓ Discount successfully applied and synced with POS checkout!`);
  };

  // Action: Remove / Clear Item
  const handleRemoveItem = (id) => {
    const item = products.find(p => p.id === id);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, actionStatus: 'Removed / Logged' } : p))
    );
    showToast(`✓ ${item?.name || 'Item'} logged for vendor credit & removed from shelf.`);
  };

  // Reset Demo Data
  const handleReset = () => {
    setProducts(INITIAL_PRODUCTS);
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedStatus('all');
    showToast('Demo data restored to initial state.');
  };

  // Handle Add Product Submit
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
      suggestedDiscount = 'Immediate Removal / Write-Off';
    } else if (days <= 7) {
      status = 'Expiring Soon';
      discountPercent = days <= 2 ? 50 : 25;
      suggestedDiscount = `${discountPercent}% Smart Markdown`;
    }

    const createdProduct = {
      id: `PRD-${Math.floor(200 + Math.random() * 800)}`,
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
      location: newProduct.location,
      status: status,
      suggestedDiscount: suggestedDiscount,
      discountPercent: discountPercent,
      actionStatus: 'Pending',
      riskLevel: status === 'Expired' ? 'Expired' : status === 'Expiring Soon' ? 'High' : 'Safe'
    };

    setProducts([createdProduct, ...products]);
    setIsAddModalOpen(false);
    showToast(`✓ New product "${createdProduct.name}" added to expiry monitor!`);

    // Reset form
    setNewProduct({
      name: '',
      category: 'Dairy & Chilled',
      brand: '',
      batchNo: `BAT-2026-${Math.floor(100 + Math.random() * 900)}`,
      barcode: `890${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      expiryDate: '2026-11-06',
      stockQty: 20,
      unitPrice: 65,
      location: 'Aisle 1 - Shelf B'
    });
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID,Name,Category,Batch,Expiry Date,Days Left,Stock,Price,Status,Suggested Action'];
    const rows = filteredProducts.map(p => 
      `"${p.id}","${p.name}","${p.category}","${p.batchNo}","${p.expiryDate}",${p.daysLeft},${p.stockQty},${p.unitPrice},"${p.status}","${p.suggestedDiscount}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SmartExpiry_Audit_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('✓ Supermarket audit report exported successfully as CSV!');
  };

  // Simulate Barcode Scan
  const handleTestBarcodeScan = (barcodeSample) => {
    setScanningActive(true);
    setScannedResult(null);

    setTimeout(() => {
      setScanningActive(false);
      setScannedResult(barcodeSample);
      // Auto filter search to this barcode
      setSearchQuery(barcodeSample.barcode);
      showToast(`✓ Scanned: ${barcodeSample.name} (${barcodeSample.barcode})`);
    }, 900);
  };

  const sampleBarcodes = [
    { name: 'Amul Taaza Milk (1L)', barcode: '8901262010058', status: 'Expiring in 2d' },
    { name: 'Britannia Bread (400g)', barcode: '8901063142217', status: 'Expiring Tomorrow' },
    { name: 'Mother Dairy Paneer (200g)', barcode: '8901648002014', status: 'Expired (-1d)' },
    { name: 'Aashirvaad Atta (5kg)', barcode: '8901725121027', status: 'Expiring in 5d' },
  ];

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
              Interactive Prototype
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950 tracking-tight">
              Live Supermarket Inventory Dashboard
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Experience the actual interface store managers and staff use. Test live filtering, simulated barcode scanning, adding new SKUs, and applying markdowns.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsScannerModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-slate-300 hover:border-brand-500 hover:text-brand-700 text-slate-700 shadow-sm transition-all flex items-center gap-1.5"
            >
              <Scan className="w-4 h-4 text-brand-600" />
              <span>Simulate Barcode Scan</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-600/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Demo Product</span>
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

        {/* Notice of Demo Data */}
        <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span>
              <strong>Demonstration Mode:</strong> Preloaded with representative Indian grocery SKUs (Amul, Britannia, Mother Dairy, Aashirvaad). All actions update this browser session in real-time.
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
            <span className="text-[11px] text-rose-700 font-medium">Pull immediately from shelf</span>
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
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/60 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by product name, brand, barcode, or batch..."
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

            {/* Category Dropdown */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
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
                  <th className="py-3.5 px-4 sm:px-6">Product & Category</th>
                  <th className="py-3.5 px-4">Batch & Location</th>
                  <th className="py-3.5 px-4">Expiry Date & Countdown</th>
                  <th className="py-3.5 px-4">Stock & Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">AI Recommended Action</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Floor Action</th>
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
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium text-[10px]">
                              {p.category}
                            </span>
                            <span>•</span>
                            <span className="font-mono text-[10px]">{p.barcode}</span>
                          </div>
                        </td>

                        {/* Batch & Location */}
                        <td className="py-4 px-4 text-slate-600">
                          <div className="font-mono text-xs font-semibold text-slate-700">
                            {p.batchNo}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{p.location}</span>
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

                        {/* AI Suggested Action */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5">
                            <Tag className={`w-3.5 h-3.5 ${isExpired ? 'text-rose-500' : isExpiringSoon ? 'text-coral-500' : 'text-slate-400'}`} />
                            <span className={`text-xs font-medium ${
                              isExpired 
                                ? 'text-rose-700 font-semibold' 
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
                              {p.actionStatus === 'Removed / Logged' ? 'Cleared' : 'Pull from Shelf'}
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
                              onClick={() => showToast(`Item "${p.name}" is healthy with ${p.daysLeft} days of shelf life.`)}
                              className="text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
                            >
                              View Batch
                            </button>
                          )}
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

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
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
                  Add Demo Supermarket SKU
                </h3>
                <p className="text-xs text-slate-500">
                  Simulate stock inwarding and auto-calculate expiry status
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
                    Rack / Aisle Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chiller Bay 1"
                    value={newProduct.location}
                    onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl"
                  />
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
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/20"
                >
                  Add to Active Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Barcode Scanner Simulator Modal */}
      {isScannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-800 relative">
            <button
              onClick={() => {
                setIsScannerModalOpen(false);
                setScannedResult(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                <Scan className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  Barcode Scanner Simulator
                </h3>
                <p className="text-xs text-slate-400">
                  Test simulated optical EAN-13 scanning on supermarket packages
                </p>
              </div>
            </div>

            {/* Viewfinder View */}
            <div className="relative bg-slate-950 rounded-2xl h-52 border border-slate-800 overflow-hidden flex flex-col items-center justify-center mb-6">
              
              {/* Corner brackets for HUD */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-brand-400 rounded-tl" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-brand-400 rounded-tr" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-brand-400 rounded-bl" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-brand-400 rounded-br" />

              {/* Scanning laser animation */}
              {scanningActive ? (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-scanline" />
              ) : null}

              <div className="text-center px-4">
                {scanningActive ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-4 h-4 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-mono text-brand-300">Decoding EAN-13 Barcode...</span>
                  </div>
                ) : scannedResult ? (
                  <div className="bg-brand-950/80 p-3 rounded-xl border border-brand-500/50">
                    <CheckCircle2 className="w-6 h-6 text-brand-400 mx-auto mb-1" />
                    <div className="text-sm font-bold text-white">{scannedResult.name}</div>
                    <div className="text-xs font-mono text-brand-300">{scannedResult.barcode}</div>
                    <div className="text-[11px] text-amber-300 font-semibold mt-1">{scannedResult.status}</div>
                  </div>
                ) : (
                  <div className="text-slate-400 text-xs">
                    <Scan className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <span>Point at product barcode or click a sample below to trigger</span>
                  </div>
                )}
              </div>
            </div>

            {/* Test Barcode Buttons */}
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                Click to Simulate Scan:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {sampleBarcodes.map((item) => (
                  <button
                    key={item.barcode}
                    onClick={() => handleTestBarcodeScan(item)}
                    disabled={scanningActive}
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all hover:border-brand-500/50"
                  >
                    <div className="text-xs font-semibold text-slate-200 truncate">{item.name}</div>
                    <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between mt-1">
                      <span>{item.barcode}</span>
                      <span className="text-[10px] text-brand-400">{item.status}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Status: Barcode Simulator Ready</span>
              <button
                onClick={() => {
                  setIsScannerModalOpen(false);
                  setScannedResult(null);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium"
              >
                Close Simulator
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
