import React, { useState, useMemo, useEffect } from 'react';
import { 
  Navigation, 
  MapPin, 
  Compass, 
  Search, 
  Filter, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Eye, 
  CornerDownRight, 
  Footprints, 
  Radio, 
  Globe, 
  Store,
  ChevronRight,
  ListOrdered,
  Plus,
  Trash2,
  Info
} from 'lucide-react';
import { 
  GRID_COLS, 
  GRID_ROWS, 
  CELL_SCALE_METERS, 
  AVG_WALK_SPEED_MPS, 
  STORE_WAYPOINTS, 
  SHELF_OBSTACLES, 
  findShortestPath, 
  planMultiStopRoute, 
  generateStepDirections 
} from '../utils/navigationGraph';
import { 
  CATEGORIES, 
  AISLE_OPTIONS, 
  STATUS_FILTERS, 
  SUPERMARKET_BRANCHES 
} from '../data/mockProducts';

export default function StoreMapNavigation({ 
  products, 
  selectedProductToNavigate, 
  onClearSelectedProduct,
  onEditLocation 
}) {
  // Navigation State
  const [startPointId, setStartPointId] = useState('entrance');
  const [activeTargetProduct, setActiveTargetProduct] = useState(null);
  const [multiStopMode, setMultiStopMode] = useState(false);
  const [selectedPickList, setSelectedPickList] = useState([]);

  // Search & Filter State for Product Search within Navigation
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAisle, setSelectedAisle] = useState('All Aisles');
  const [selectedBranch, setSelectedBranch] = useState(SUPERMARKET_BRANCHES[0].id);

  // Outdoor GPS State
  const [outdoorGpsStatus, setOutdoorGpsStatus] = useState(null);

  // Set active target when passed from external triggers (e.g. scanner or dashboard)
  useEffect(() => {
    if (selectedProductToNavigate) {
      setActiveTargetProduct(selectedProductToNavigate);
      setMultiStopMode(false);
      // scroll to map section smoothly
      const mapEl = document.getElementById('store-navigation');
      if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedProductToNavigate]);

  // Fallback initial target product if none selected
  useEffect(() => {
    if (!activeTargetProduct && products.length > 0) {
      // Pick Britannia Bread or Amul Milk as initial default
      const defaultProd = products.find(p => p.id === 'PRD-102') || products[0];
      setActiveTargetProduct(defaultProd);
    }
  }, [products, activeTargetProduct]);

  // Current Start Point Object
  const currentStartPoint = useMemo(() => {
    return STORE_WAYPOINTS.find(w => w.id === startPointId) || STORE_WAYPOINTS[0];
  }, [startPointId]);

  // Filtered Products for Search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.shelfCode?.toLowerCase().includes(q) ||
        p.barcode?.includes(q);

      const matchesCategory = 
        selectedCategory === 'All Categories' || p.category === selectedCategory;

      let matchesStatus = true;
      if (selectedStatus === 'expiring') matchesStatus = p.status === 'Expiring Soon';
      else if (selectedStatus === 'expired') matchesStatus = p.status === 'Expired';
      else if (selectedStatus === 'safe') matchesStatus = p.status === 'Safe';

      const matchesAisle = 
        selectedAisle === 'All Aisles' || p.aisle === selectedAisle;

      const matchesBranch = 
        !selectedBranch || p.branchId === selectedBranch;

      return matchesSearch && matchesCategory && matchesStatus && matchesAisle && matchesBranch;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus, selectedAisle, selectedBranch]);

  // Route Calculation (Single Target vs Multi-Stop)
  const routeData = useMemo(() => {
    if (multiStopMode) {
      // Multi-Stop Route
      const targets = selectedPickList.length > 0 
        ? selectedPickList 
        : (activeTargetProduct ? [activeTargetProduct] : []);

      return planMultiStopRoute(currentStartPoint, targets);
    } else {
      // Single Target Route
      if (!activeTargetProduct || !activeTargetProduct.mapCoords) {
        return {
          fullPath: [currentStartPoint],
          totalDistance: 0,
          walkTimeSec: 0,
          steps: ['Select a product to view step-by-step route directions.']
        };
      }

      const path = findShortestPath(
        currentStartPoint.x,
        currentStartPoint.y,
        activeTargetProduct.mapCoords.x,
        activeTargetProduct.mapCoords.y
      );

      const totalDistance = Math.round((path.length - 1) * CELL_SCALE_METERS * 10) / 10;
      const walkTimeSec = Math.round(totalDistance / AVG_WALK_SPEED_MPS);
      const steps = generateStepDirections(path, currentStartPoint, activeTargetProduct);

      return {
        fullPath: path,
        totalDistance,
        walkTimeSec,
        steps
      };
    }
  }, [multiStopMode, currentStartPoint, activeTargetProduct, selectedPickList]);

  // Add/Remove from Pick List
  const togglePickList = (product) => {
    if (selectedPickList.some(p => p.id === product.id)) {
      setSelectedPickList(selectedPickList.filter(p => p.id !== product.id));
    } else {
      setSelectedPickList([...selectedPickList, product]);
    }
  };

  // Outdoor GPS Trigger
  const handleOutdoorGps = () => {
    if (!navigator.geolocation) {
      setOutdoorGpsStatus({
        type: 'error',
        msg: 'Geolocation is not supported by your browser.'
      });
      return;
    }

    setOutdoorGpsStatus({ type: 'loading', msg: 'Acquiring outdoor GPS satellite fix...' });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        // Supermarket Indore branch reference (22.7196, 75.8577)
        setOutdoorGpsStatus({
          type: 'success',
          msg: `GPS Fix acquired (${lat.toFixed(4)}, ${lng.toFixed(4)}). You are outdoor-positioned. Use directions below for outdoor approach to Shiva Supermarket.`,
          mapsUrl: `https://www.google.com/maps/dir/?api=1&destination=22.7196,75.8577`
        });
      },
      (error) => {
        setOutdoorGpsStatus({
          type: 'error',
          msg: 'GPS permission denied or unavailable. Please select your indoor supermarket starting point manually above.'
        });
      },
      { timeout: 8000 }
    );
  };

  return (
    <section id="store-navigation" className="py-20 lg:py-28 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 border border-brand-200 text-xs font-semibold text-brand-800 uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-brand-600" />
              Smart Indoor Navigation & Store Routing
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950 tracking-tight">
              Interactive Supermarket Floor Map & Shelf Router
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Locate any scanned or searched product on our scaled store grid. Calculate the shortest walking path from the entrance or your current aisle using Dijkstra graph routing.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setMultiStopMode(false)}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                !multiStopMode 
                  ? 'bg-white text-navy-900 shadow-sm' 
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-brand-600" />
              <span>Single Product</span>
            </button>

            <button
              onClick={() => {
                setMultiStopMode(true);
                // Pre-populate pick list with near-expiry items if empty
                if (selectedPickList.length === 0) {
                  setSelectedPickList(products.filter(p => p.status === 'Expiring Soon').slice(0, 3));
                }
              }}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                multiStopMode 
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' 
                  : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Multi-Product Clearance Run</span>
              {selectedPickList.length > 0 && (
                <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full">
                  {selectedPickList.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Map Controls & Active Destination Banner */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/90 mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Starting Location Picker */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Your Starting Point:
            </span>
            <select
              value={startPointId}
              onChange={(e) => setStartPointId(e.target.value)}
              className="bg-white border border-slate-300 text-xs sm:text-sm font-semibold text-navy-900 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer shadow-sm"
            >
              {STORE_WAYPOINTS.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>

          {/* Destination Status */}
          <div className="flex items-center gap-3 bg-white p-2 sm:px-4 sm:py-2 rounded-xl border border-slate-200 shadow-sm text-xs">
            <span className="text-slate-500">Destination:</span>
            {multiStopMode ? (
              <span className="font-bold text-brand-700">
                Multi-Stop Clearance Run ({selectedPickList.length} Items Selected)
              </span>
            ) : activeTargetProduct ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-navy-900 truncate max-w-[200px] sm:max-w-xs">
                  {activeTargetProduct.name}
                </span>
                <span className="bg-brand-50 text-brand-700 font-mono text-[10px] px-2 py-0.5 rounded border border-brand-200 font-semibold">
                  {activeTargetProduct.shelfCode}
                </span>
              </div>
            ) : (
              <span className="text-slate-400">None selected</span>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1.5">
              <Footprints className="w-4 h-4 text-brand-600" />
              <span>Distance: <strong>{routeData.totalDistance}m</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Est. Walk: <strong>~{routeData.walkTimeSec}s</strong></span>
            </div>
            <span className="hidden xl:inline text-[11px] text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded">
              Scale: 1.5m / cell
            </span>
          </div>

        </div>

        {/* Main Split: Interactive Floor Plan Map (Left 8 cols) & Navigation Directions Panel (Right 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Interactive Supermarket Floor Map (SVG Canvas) */}
          <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-800 flex flex-col justify-between overflow-hidden relative">
            
            {/* Map Header with Store Branch */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-mono">
                <Store className="w-4 h-4 text-brand-400" />
                <span className="font-bold text-white">SHIVA SUPERMARKET • FLOOR PLAN LAYOUT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-[11px]">Dijkstra BFS Active</span>
              </div>
            </div>

            {/* SVG Visual Store Floor Grid */}
            <div className="relative w-full aspect-[10/7] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center p-2">
              
              <svg 
                viewBox="0 0 1000 700" 
                className="w-full h-full select-none"
              >
                {/* Background Grid Pattern */}
                <defs>
                  <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1e293b" strokeWidth="1" />
                  </pattern>
                  <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>

                <rect width="1000" height="700" fill="#090d16" />
                <rect width="1000" height="700" fill="url(#grid)" />

                {/* Chiller Cold Storage Wall (Top Y:0, X: 100 to 500) */}
                <rect x="100" y="20" width="350" height="70" rx="8" fill="#1e3a5f" stroke="#38bdf8" strokeWidth="2" />
                <text x="275" y="60" fill="#bae6fd" fontSize="14" fontWeight="bold" textAnchor="middle">
                  ❄ CHILLER ZONE (Dairy, Paneer & Milk)
                </text>

                {/* Shelf Island 1: Bakery & Breads (X: 200, Y: 200 to 500) */}
                <rect x="180" y="180" width="60" height="280" rx="6" fill="#422006" stroke="#f59e0b" strokeWidth="2" />
                <text x="210" y="325" fill="#fef3c7" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-90 210 325)">
                  AISLE 1: BAKERY & BREADS
                </text>

                {/* Shelf Island 2: Sauces & Cereals (X: 380, Y: 180 to 460) */}
                <rect x="380" y="180" width="60" height="280" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                <text x="410" y="325" fill="#e0e7ff" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-90 410 325)">
                  AISLE 2: SAUCES & BREAKFAST
                </text>

                {/* Shelf Island 3: Staples & Grains (X: 580, Y: 180 to 460) */}
                <rect x="580" y="180" width="60" height="280" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="610" y="325" fill="#d1fae5" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-90 610 325)">
                  AISLE 3: STAPLES, ATTA & DAL
                </text>

                {/* Shelf Island 4: Snacks & Confectionery (X: 780, Y: 180 to 460) */}
                <rect x="780" y="180" width="60" height="280" rx="6" fill="#581c87" stroke="#c084fc" strokeWidth="2" />
                <text x="810" y="325" fill="#f3e8ff" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(-90 810 325)">
                  AISLE 4: SNACKS & NAMKEEN
                </text>

                {/* Right Wall: Personal Care & Cleaning */}
                <rect x="910" y="100" width="70" height="360" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                <text x="945" y="280" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(-90 945 280)">
                  AISLE 5: PERSONAL CARE
                </text>

                {/* Bottom Front Entrance & Billing */}
                <rect x="80" y="580" width="100" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="130" y="620" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">
                  MAIN ENTRY
                </text>

                <rect x="560" y="580" width="100" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="610" y="620" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                  BILLING #1
                </text>

                <rect x="680" y="580" width="100" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="730" y="620" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                  BILLING #2
                </text>

                <rect x="800" y="580" width="90" height="70" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                <text x="845" y="620" fill="#e0e7ff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  STORE EXIT
                </text>

                {/* Waypoints Marks */}
                {STORE_WAYPOINTS.map((w) => (
                  <circle
                    key={w.id}
                    cx={w.x * 100 + 50}
                    cy={w.y * 100 + 50}
                    r="6"
                    fill={w.id === startPointId ? '#10b981' : '#475569'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                ))}

                {/* Calculated Shortest Route Path */}
                {routeData.fullPath && routeData.fullPath.length > 1 && (
                  <>
                    <polyline
                      points={routeData.fullPath.map(p => `${p.x * 100 + 50},${p.y * 100 + 50}`).join(' ')}
                      fill="none"
                      stroke="url(#routeGrad)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="8 6"
                      className="animate-pulse"
                    />

                    {/* Start Marker Pin */}
                    <circle
                      cx={routeData.fullPath[0].x * 100 + 50}
                      cy={routeData.fullPath[0].y * 100 + 50}
                      r="12"
                      fill="#10b981"
                      stroke="#ffffff"
                      strokeWidth="3"
                    />

                    {/* Destination Marker Pin */}
                    <circle
                      cx={routeData.fullPath[routeData.fullPath.length - 1].x * 100 + 50}
                      cy={routeData.fullPath[routeData.fullPath.length - 1].y * 100 + 50}
                      r="14"
                      fill="#f43f5e"
                      stroke="#ffffff"
                      strokeWidth="3"
                    />
                  </>
                )}

                {/* Multi-Stop Destination Pins */}
                {multiStopMode && selectedPickList.map((p, idx) => (
                  <g key={p.id}>
                    <circle
                      cx={p.mapCoords.x * 100 + 50}
                      cy={p.mapCoords.y * 100 + 50}
                      r="10"
                      fill="#e11d48"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={p.mapCoords.x * 100 + 50}
                      y={p.mapCoords.y * 100 + 54}
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {idx + 1}
                    </text>
                  </g>
                ))}

              </svg>

            </div>

            {/* Map Legend */}
            <div className="pt-3 mt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Start Point
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Product Shelf Destination
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-1 bg-emerald-400 rounded" /> Calculated Walking Route
                </span>
              </div>
              <span>Grid Scale: 1 Grid Unit = 1.5 meters</span>
            </div>

          </div>

          {/* Turn-by-Turn Navigation & Step Directions (Right 4 cols) */}
          <div className="lg:col-span-4 bg-slate-50 rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-navy-950 uppercase tracking-wider flex items-center gap-1.5">
                  <CornerDownRight className="w-4 h-4 text-brand-600" />
                  Turn-by-Turn Directions
                </span>
                <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  {routeData.totalDistance}m (~{routeData.walkTimeSec}s)
                </span>
              </div>

              {/* Active Product Details Box */}
              {!multiStopMode && activeTargetProduct && (
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 mb-4 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-navy-950 truncate">{activeTargetProduct.name}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                      activeTargetProduct.status === 'Expired'
                        ? 'bg-rose-100 text-rose-700 border-rose-200'
                        : activeTargetProduct.status === 'Expiring Soon'
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    }`}>
                      {activeTargetProduct.status}
                    </span>
                  </div>
                  <div className="text-slate-600 text-[11px] space-y-0.5">
                    <div>Location: <strong>{activeTargetProduct.location}</strong></div>
                    <div>Shelf Code: <strong className="font-mono text-brand-700">{activeTargetProduct.shelfCode}</strong></div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onEditLocation(activeTargetProduct)}
                      className="text-[11px] font-semibold text-slate-600 hover:text-brand-700 underline"
                    >
                      Update Shelf Location
                    </button>
                    <span className="text-[11px] font-bold text-slate-700">
                      ₹{activeTargetProduct.unitPrice} • {activeTargetProduct.stockQty} Units
                    </span>
                  </div>
                </div>
              )}

              {/* Multi-Stop Pick List Box */}
              {multiStopMode && (
                <div className="bg-white p-3 rounded-2xl border border-slate-200/80 mb-4 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-navy-900">Clearance Pick List ({selectedPickList.length})</span>
                    <span className="text-[10px] text-slate-500">Shortest Visit Sequence</span>
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {selectedPickList.map((p, idx) => (
                      <div key={p.id} className="flex items-center justify-between p-1.5 rounded bg-slate-50 text-[11px]">
                        <span className="font-semibold text-slate-800 truncate max-w-[160px]">
                          {idx + 1}. {p.name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] text-brand-700">{p.shelfCode}</span>
                          <button
                            onClick={() => togglePickList(p)}
                            className="text-slate-400 hover:text-rose-600 p-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step Directions List */}
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {routeData.steps.map((st, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {sIdx + 1}
                    </div>
                    <span className="leading-snug">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Hardware Positioning Disclaimer Note */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 text-[11px] text-blue-900">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Radio className="w-3.5 h-3.5 text-blue-600" />
                  <span>Indoor Positioning Technology Note</span>
                </div>
                <p className="text-blue-800/90 leading-tight">
                  GPS signals cannot accurately penetrate retail roof structures. For this prototype, starting locations are selected manually above. Automated sub-meter indoor tracking requires BLE Beacons or Wi-Fi RTT hardware installed on store ceilings.
                </p>
                
                <div className="mt-2 pt-2 border-t border-blue-200/60 flex items-center justify-between">
                  <button
                    onClick={handleOutdoorGps}
                    className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                  >
                    <Globe className="w-3 h-3" />
                    <span>Get Outdoor Store GPS</span>
                  </button>
                </div>

                {outdoorGpsStatus && (
                  <div className={`mt-2 p-2 rounded text-[10px] ${
                    outdoorGpsStatus.type === 'error' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {outdoorGpsStatus.msg}
                    {outdoorGpsStatus.mapsUrl && (
                      <a
                        href={outdoorGpsStatus.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block mt-1 font-bold underline"
                      >
                        Open Google Maps Driving Route →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Product Search & Filter Section (Feature 6) */}
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-sm">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold font-display text-navy-950">
                Search Supermarket Inventory by Name, SKU, or Shelf Code
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Quickly locate items on shelves and click "Navigate to Product" to calculate instant walking routes
              </p>
            </div>

            {/* Branch Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Branch:</span>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-white border border-slate-300 text-xs font-medium py-1.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                {SUPERMARKET_BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Inputs & Filter Toolbar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Product name, SKU, or shelf code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Aisle Filter */}
            <div>
              <select
                value={selectedAisle}
                onChange={(e) => setSelectedAisle(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
              >
                {AISLE_OPTIONS.map((a) => (
                  <option key={a.id} value={a.id}>{a.label}</option>
                ))}
              </select>
            </div>

            {/* Expiry Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
              >
                <option value="all">All Expiry Statuses</option>
                <option value="expiring">Expiring Soon (≤ 7 Days)</option>
                <option value="expired">Expired (Action Required)</option>
                <option value="safe">Safe Inventory</option>
              </select>
            </div>

          </div>

          {/* Product Search Results Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-8 text-center text-slate-500 text-xs">
                No products match your search or filter combination.
              </div>
            ) : (
              filteredProducts.map((p) => {
                const isSelected = activeTargetProduct?.id === p.id;
                const inPickList = selectedPickList.some(item => item.id === p.id);

                return (
                  <div
                    key={p.id}
                    className={`bg-white rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                      isSelected 
                        ? 'border-brand-500 shadow-md ring-2 ring-brand-500/20' 
                        : 'border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                          {p.sku}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          p.status === 'Expired'
                            ? 'bg-rose-100 text-rose-700 border-rose-200'
                            : p.status === 'Expiring Soon'
                            ? 'bg-amber-100 text-amber-800 border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}>
                          {p.status}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-navy-900 mb-1">
                        {p.name}
                      </h4>

                      <div className="text-xs text-slate-500 mb-3 space-y-0.5">
                        <div className="flex items-center gap-1 text-[11px]">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{p.location}</span>
                        </div>
                        <div className="text-[11px]">
                          Shelf Code: <strong className="font-mono text-brand-800">{p.shelfCode}</strong>
                        </div>
                        <div className="text-[11px]">
                          Expiry: <strong>{p.expiryDate}</strong> ({p.daysLeft < 0 ? 'Expired' : `${p.daysLeft}d left`})
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      {multiStopMode ? (
                        <button
                          onClick={() => togglePickList(p)}
                          className={`w-full py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                            inPickList
                              ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                              : 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm'
                          }`}
                        >
                          {inPickList ? <Trash2 className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          <span>{inPickList ? 'Remove from Pick List' : 'Add to Pick List'}</span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => onEditLocation(p)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 border border-slate-200"
                          >
                            Edit Location
                          </button>

                          <button
                            onClick={() => {
                              setActiveTargetProduct(p);
                              setMultiStopMode(false);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                              isSelected
                                ? 'bg-brand-700 text-white shadow-sm'
                                : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                            }`}
                          >
                            <Navigation className="w-3 h-3" />
                            <span>{isSelected ? 'Currently Navigating' : 'Navigate to Shelf'}</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
