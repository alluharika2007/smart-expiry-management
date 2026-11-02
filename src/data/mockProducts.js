// Realistic Indian Supermarket Demo Inventory Data with Full Location Tracking
export const SUPERMARKET_BRANCHES = [
  { id: 'BR-01', name: 'Shiva Supermarket - Central Indore (Main Branch)', city: 'Indore', state: 'Madhya Pradesh', address: 'Plot 42, MG Road, Indore' },
  { id: 'BR-02', name: 'Shiva Supermarket - Surat Ring Road Branch', city: 'Surat', state: 'Gujarat', address: 'Shop 12-16, VIP Ring Road, Vesu, Surat' }
];

export const DEPARTMENTS = [
  'Dairy & Cold Storage',
  'Bakery & Breads',
  'Staples & Grains',
  'Snacks & Confectionery',
  'Sauces, Spreads & Condiments',
  'Personal Care & Hygiene'
];

export const AISLE_OPTIONS = [
  { id: 'All Aisles', label: 'All Aisles' },
  { id: 'Chiller Zone', label: 'Chiller Zone (Cold Storage)', code: 'CZ', x: 2, y: 0 },
  { id: 'Aisle 1', label: 'Aisle 1 (Bakery & Breads)', code: 'A1', x: 2, y: 4 },
  { id: 'Aisle 2', label: 'Aisle 2 (Sauces, Spreads & Cereals)', code: 'A2', x: 4, y: 2 },
  { id: 'Aisle 3', label: 'Aisle 3 (Staples, Flours & Dal)', code: 'A3', x: 6, y: 4 },
  { id: 'Aisle 4', label: 'Aisle 4 (Snacks & Namkeen)', code: 'A4', x: 8, y: 2 },
  { id: 'Aisle 5', label: 'Aisle 5 (Personal & Home Care)', code: 'A5', x: 9, y: 2 }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'PRD-101',
    sku: 'SKU-AML-101',
    qrCode: 'QR-AML-101',
    name: 'Amul Taaza Homogenised Toned Milk (1L)',
    category: 'Dairy & Chilled',
    brand: 'Amul',
    barcode: '8901262010058',
    batchNo: 'BAT-2026-084',
    mfgDate: '2026-10-28',
    expiryDate: '2026-11-04',
    daysLeft: 2,
    stockQty: 24,
    unitPrice: 56,
    status: 'Expiring Soon',
    suggestedDiscount: '35% Fast-Mover Markdown',
    discountPercent: 35,
    actionStatus: 'Pending',
    riskLevel: 'High',
    // Physical Location Details
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Dairy & Cold Storage',
    aisle: 'Chiller Zone',
    aisleNumber: 'Chiller-01',
    rack: 'Bay 1',
    shelfNumber: 'Shelf 2',
    shelfLevel: 'Eye Level',
    shelfCode: 'CZ-B1-S2',
    location: 'Chiller Zone • Bay 1 • Shelf 2 (Eye Level)',
    mapCoords: { x: 2, y: 0 }
  },
  {
    id: 'PRD-102',
    sku: 'SKU-BRT-102',
    qrCode: 'QR-BRT-102',
    name: 'Britannia 100% Whole Wheat Bread (400g)',
    category: 'Bakery & Breads',
    brand: 'Britannia',
    barcode: '8901063142217',
    batchNo: 'BAT-2026-091',
    mfgDate: '2026-10-29',
    expiryDate: '2026-11-03',
    daysLeft: 1,
    stockQty: 18,
    unitPrice: 50,
    status: 'Expiring Soon',
    suggestedDiscount: '50% Clearance Offer',
    discountPercent: 50,
    actionStatus: 'Pending',
    riskLevel: 'Critical',
    // Physical Location Details
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Bakery & Breads',
    aisle: 'Aisle 1',
    aisleNumber: 'Aisle-01',
    rack: 'Rack A',
    shelfNumber: 'Shelf 2',
    shelfLevel: 'Eye Level',
    shelfCode: 'A1-RA-S2',
    location: 'Aisle 1 • Rack A • Shelf 2 (Eye Level)',
    mapCoords: { x: 2, y: 4 }
  },
  {
    id: 'PRD-103',
    sku: 'SKU-MDR-103',
    qrCode: 'QR-MDR-103',
    name: 'Mother Dairy Classic Malai Paneer (200g)',
    category: 'Dairy & Chilled',
    brand: 'Mother Dairy',
    barcode: '8901648002014',
    batchNo: 'BAT-2026-072',
    mfgDate: '2026-10-15',
    expiryDate: '2026-11-01',
    daysLeft: -1,
    stockQty: 8,
    unitPrice: 92,
    status: 'Expired',
    suggestedDiscount: 'Immediate Removal / Write-Off (Do NOT Sell)',
    discountPercent: 0,
    actionStatus: 'Pending',
    riskLevel: 'Expired',
    // Physical Location Details
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Dairy & Cold Storage',
    aisle: 'Chiller Zone',
    aisleNumber: 'Chiller-01',
    rack: 'Bay 2',
    shelfNumber: 'Shelf 1',
    shelfLevel: 'Bottom Level',
    shelfCode: 'CZ-B2-S1',
    location: 'Chiller Zone • Bay 2 • Shelf 1 (Bottom Level)',
    mapCoords: { x: 1, y: 0 }
  },
  {
    id: 'PRD-104',
    sku: 'SKU-EPG-104',
    qrCode: 'QR-EPG-104',
    name: 'Epigamia Greek Yogurt Strawberry (90g)',
    category: 'Dairy & Chilled',
    brand: 'Epigamia',
    barcode: '8906073120198',
    batchNo: 'BAT-2026-110',
    mfgDate: '2026-10-22',
    expiryDate: '2026-11-05',
    daysLeft: 3,
    stockQty: 15,
    unitPrice: 50,
    status: 'Expiring Soon',
    suggestedDiscount: '30% Clearance Bundle',
    discountPercent: 30,
    actionStatus: 'Pending',
    riskLevel: 'High',
    // Physical Location Details
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Dairy & Cold Storage',
    aisle: 'Chiller Zone',
    aisleNumber: 'Chiller-01',
    rack: 'Bay 3',
    shelfNumber: 'Shelf 3',
    shelfLevel: 'Top Level',
    shelfCode: 'CZ-B3-S3',
    location: 'Chiller Zone • Bay 3 • Shelf 3 (Top Level)',
    mapCoords: { x: 3, y: 0 }
  },
  {
    id: 'PRD-105',
    sku: 'SKU-ASH-105',
    qrCode: 'QR-ASH-105',
    name: 'Aashirvaad Shudh Chakki Atta (5kg)',
    category: 'Staples & Grains',
    brand: 'Aashirvaad',
    barcode: '8901725121027',
    batchNo: 'BAT-2026-044',
    mfgDate: '2026-08-10',
    expiryDate: '2026-11-07',
    daysLeft: 5,
    stockQty: 12,
    unitPrice: 245,
    status: 'Expiring Soon',
    suggestedDiscount: '20% Weekend Promo',
    discountPercent: 20,
    actionStatus: 'Pending',
    riskLevel: 'Medium',
    // Physical Location Details
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Staples & Grains',
    aisle: 'Aisle 3',
    aisleNumber: 'Aisle-03',
    rack: 'Pallet 2',
    shelfNumber: 'Shelf 1',
    shelfLevel: 'Bottom Level',
    shelfCode: 'A3-P2-S1',
    location: 'Aisle 3 • Pallet 2 • Shelf 1 (Bottom Level)',
    mapCoords: { x: 6, y: 4 }
  },
  {
    id: 'PRD-106',
    sku: 'SKU-KIS-106',
    qrCode: 'QR-KIS-106',
    name: 'Kissan Fresh Tomato Ketchup Bottle (950g)',
    category: 'Sauces & Spreads',
    brand: 'Kissan',
    barcode: '8901030382912',
    batchNo: 'BAT-2026-015',
    mfgDate: '2026-02-12',
    expiryDate: '2026-11-10',
    daysLeft: 8,
    stockQty: 22,
    unitPrice: 145,
    status: 'Expiring Soon',
    suggestedDiscount: '15% Volume Discount',
    discountPercent: 15,
    actionStatus: 'Pending',
    riskLevel: 'Medium',
    // Physical Location Details
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Sauces, Spreads & Condiments',
    aisle: 'Aisle 2',
    aisleNumber: 'Aisle-02',
    rack: 'Rack B',
    shelfNumber: 'Shelf 3',
    shelfLevel: 'Top Level',
    shelfCode: 'A2-RB-S3',
    location: 'Aisle 2 • Rack B • Shelf 3 (Top Level)',
    mapCoords: { x: 4, y: 2 }
  },
  {
    id: 'PRD-107',
    sku: 'SKU-HLD-107',
    qrCode: 'QR-HLD-107',
    name: "Haldiram's Nagpur Aloo Bhujia (400g)",
    category: 'Snacks & Namkeen',
    brand: "Haldiram's",
    barcode: '8904063200155',
    batchNo: 'BAT-2026-189',
    mfgDate: '2026-08-01',
    expiryDate: '2026-11-20',
    daysLeft: 18,
    stockQty: 40,
    unitPrice: 110,
    status: 'Safe',
    suggestedDiscount: 'Regular Retail Price (0%)',
    discountPercent: 0,
    actionStatus: 'Pending',
    riskLevel: 'Safe',
    // Physical Location Details
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Snacks & Confectionery',
    aisle: 'Aisle 4',
    aisleNumber: 'Aisle-04',
    rack: 'Rack A',
    shelfNumber: 'Shelf 2',
    shelfLevel: 'Eye Level',
    shelfCode: 'A4-RA-S2',
    location: 'Aisle 4 • Rack A • Shelf 2 (Eye Level)',
    mapCoords: { x: 8, y: 2 }
  },
  {
    id: 'PRD-108',
    sku: 'SKU-TAT-108',
    qrCode: 'QR-TAT-108',
    name: 'Tata Sampann Unpolished Toor Dal (1kg)',
    category: 'Staples & Grains',
    brand: 'Tata Sampann',
    barcode: '8901058852312',
    batchNo: 'BAT-2026-202',
    mfgDate: '2026-09-15',
    expiryDate: '2027-03-15',
    daysLeft: 133,
    stockQty: 60,
    unitPrice: 185,
    status: 'Safe',
    suggestedDiscount: 'Regular Retail Price (0%)',
    discountPercent: 0,
    actionStatus: 'Pending',
    riskLevel: 'Safe',
    // Physical Location Details
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Staples & Grains',
    aisle: 'Aisle 3',
    aisleNumber: 'Aisle-03',
    rack: 'Rack C',
    shelfNumber: 'Shelf 2',
    shelfLevel: 'Eye Level',
    shelfCode: 'A3-RC-S2',
    location: 'Aisle 3 • Rack C • Shelf 2 (Eye Level)',
    mapCoords: { x: 6, y: 2 }
  },
  {
    id: 'PRD-109',
    sku: 'SKU-FRT-109',
    qrCode: 'QR-FRT-109',
    name: 'Fortune Sunlite Refined Sunflower Oil (1L Pouch)',
    category: 'Staples & Grains',
    brand: 'Fortune',
    barcode: '8906007280145',
    batchNo: 'BAT-2026-150',
    mfgDate: '2026-08-20',
    expiryDate: '2027-02-20',
    daysLeft: 110,
    stockQty: 50,
    unitPrice: 155,
    status: 'Safe',
    suggestedDiscount: 'Regular Retail Price (0%)',
    discountPercent: 0,
    actionStatus: 'Pending',
    riskLevel: 'Safe',
    // Physical Location Details
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Staples & Grains',
    aisle: 'Aisle 3',
    aisleNumber: 'Aisle-03',
    rack: 'Pallet 3',
    shelfNumber: 'Shelf 1',
    shelfLevel: 'Bottom Level',
    shelfCode: 'A3-P3-S1',
    location: 'Aisle 3 • Pallet 3 • Shelf 1 (Bottom Level)',
    mapCoords: { x: 6, y: 4 }
  },
  {
    id: 'PRD-110',
    sku: 'SKU-CDB-110',
    qrCode: 'QR-CDB-110',
    name: 'Cadbury Dairy Milk Silk Chocolate (150g)',
    category: 'Snacks & Namkeen',
    brand: 'Cadbury',
    barcode: '7622201443210',
    batchNo: 'BAT-2026-098',
    mfgDate: '2026-05-10',
    expiryDate: '2026-11-06',
    daysLeft: 4,
    stockQty: 25,
    unitPrice: 175,
    status: 'Expiring Soon',
    suggestedDiscount: '25% Sweet Treat Offer',
    discountPercent: 25,
    actionStatus: 'Pending',
    riskLevel: 'High',
    // Physical Location Details
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Snacks & Confectionery',
    aisle: 'Aisle 4',
    aisleNumber: 'Aisle-04',
    rack: 'Front Counter Display',
    shelfNumber: 'Shelf 2',
    shelfLevel: 'Eye Level',
    shelfCode: 'A4-FC-S2',
    location: 'Aisle 4 • Front Counter Display • Shelf 2 (Eye Level)',
    mapCoords: { x: 8, y: 4 }
  },
  {
    id: 'PRD-111',
    sku: 'SKU-HRV-111',
    qrCode: 'QR-HRV-111',
    name: 'Harvest Gold Bombay Sandwich Bread (400g)',
    category: 'Bakery & Breads',
    brand: 'Harvest Gold',
    barcode: '8906004920088',
    batchNo: 'BAT-2026-114',
    mfgDate: '2026-10-30',
    expiryDate: '2026-11-04',
    daysLeft: 2,
    stockQty: 14,
    unitPrice: 48,
    status: 'Expiring Soon',
    suggestedDiscount: '35% Markdown',
    discountPercent: 35,
    actionStatus: 'Pending',
    riskLevel: 'High',
    // Physical Location Details
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Bakery & Breads',
    aisle: 'Aisle 1',
    aisleNumber: 'Aisle-01',
    rack: 'Rack B',
    shelfNumber: 'Shelf 1',
    shelfLevel: 'Eye Level',
    shelfCode: 'A1-RB-S1',
    location: 'Aisle 1 • Rack B • Shelf 1 (Eye Level)',
    mapCoords: { x: 2, y: 2 }
  },
  {
    id: 'PRD-112',
    sku: 'SKU-DTL-112',
    qrCode: 'QR-DTL-112',
    name: 'Dettol Original Liquid Handwash Refill (1500ml)',
    category: 'Household & Care',
    brand: 'Dettol',
    barcode: '8901396123987',
    batchNo: 'BAT-2026-029',
    mfgDate: '2026-06-01',
    expiryDate: '2028-05-31',
    daysLeft: 575,
    stockQty: 30,
    unitPrice: 199,
    status: 'Safe',
    suggestedDiscount: 'Regular Retail Price (0%)',
    discountPercent: 0,
    actionStatus: 'Pending',
    riskLevel: 'Safe',
    // Physical Location Details
    branchId: 'BR-01',
    branchName: 'Shiva Supermarket - Central Indore (Main Branch)',
    department: 'Personal Care & Hygiene',
    aisle: 'Aisle 5',
    aisleNumber: 'Aisle-05',
    rack: 'Rack A',
    shelfNumber: 'Shelf 3',
    shelfLevel: 'Top Level',
    shelfCode: 'A5-RA-S3',
    location: 'Aisle 5 • Rack A • Shelf 3 (Top Level)',
    mapCoords: { x: 9, y: 2 }
  }
];

export const CATEGORIES = [
  'All Categories',
  'Dairy & Chilled',
  'Bakery & Breads',
  'Staples & Grains',
  'Snacks & Namkeen',
  'Sauces & Spreads',
  'Household & Care'
];

export const STATUS_FILTERS = [
  { id: 'all', label: 'All Items' },
  { id: 'expiring', label: 'Expiring Soon (≤ 7 Days)', color: 'amber' },
  { id: 'expired', label: 'Expired (Action Required)', color: 'red' },
  { id: 'safe', label: 'Safe Inventory (> 7 Days)', color: 'emerald' },
];

export function calculateDaysLeft(expiryDateStr) {
  const today = new Date('2026-11-02'); // Fixed anchor relative to context
  const expiry = new Date(expiryDateStr);
  const diffTime = expiry - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Generates dynamic shelf code from aisle, rack, shelf
export function generateShelfCode(aisle, rack, shelf) {
  const aCode = aisle.includes('Chiller') ? 'CZ' : aisle.replace(/\D/g, '') ? `A${aisle.replace(/\D/g, '')}` : 'A1';
  const rCode = rack.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase() || 'R1';
  const sCode = shelf.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase() || 'S1';
  return `${aCode}-${rCode}-${sCode}`;
}

// Maps shelf aisle to approximate grid coordinates
export function getCoordinatesForAisle(aisle) {
  const found = AISLE_OPTIONS.find(a => a.id === aisle);
  if (found && found.x !== undefined) {
    return { x: found.x, y: found.y };
  }
  return { x: 2, y: 3 };
}

// Safety-First Recommendation Engine (NEVER recommends selling expired stock!)
export function getSmartRecommendation(daysLeft, category) {
  if (daysLeft < 0) {
    return {
      status: 'Expired',
      discount: 'DO NOT SELL: Immediate Shelf Pull & Vendor Credit Return',
      percent: 0,
      badgeColor: 'bg-red-100 text-red-700 border-red-200',
      action: 'Remove from Shelf Immediately',
      safetyLock: true
    };
  }
  if (daysLeft <= 2) {
    return {
      status: 'Expiring Soon',
      discount: '50% Flash Markdown (Relocate to Front Clearance Bin)',
      percent: 50,
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
      action: 'Apply 50% Off & Front Display',
      safetyLock: false
    };
  }
  if (daysLeft <= 4) {
    return {
      status: 'Expiring Soon',
      discount: '35% Fast-Mover Markdown',
      percent: 35,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      action: 'Apply 35% Off',
      safetyLock: false
    };
  }
  if (daysLeft <= 7) {
    return {
      status: 'Expiring Soon',
      discount: '20% Promotional Deal',
      percent: 20,
      badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      action: 'Apply 20% Off',
      safetyLock: false
    };
  }
  if (daysLeft <= 15) {
    return {
      status: 'Safe',
      discount: '10% Early Incentive',
      percent: 10,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      action: 'Monitor Shelf Rotation',
      safetyLock: false
    };
  }
  return {
    status: 'Safe',
    discount: 'Full Price (No Discount Needed)',
    percent: 0,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    action: 'Safe Rotation (FIFO)',
    safetyLock: false
  };
}
