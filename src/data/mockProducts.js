// Realistic Indian Supermarket Demo Inventory Data
export const INITIAL_PRODUCTS = [
  {
    id: 'PRD-101',
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
    location: 'Chiller Bay 1 - Rack A',
    status: 'Expiring Soon',
    suggestedDiscount: '35% Fast-Mover Markdown',
    discountPercent: 35,
    actionStatus: 'Pending',
    riskLevel: 'High'
  },
  {
    id: 'PRD-102',
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
    location: 'Front Bread Shelf - Row 2',
    status: 'Expiring Soon',
    suggestedDiscount: '50% Clearance Offer',
    discountPercent: 50,
    actionStatus: 'Pending',
    riskLevel: 'Critical'
  },
  {
    id: 'PRD-103',
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
    location: 'Dairy Chiller - Shelf B',
    status: 'Expired',
    suggestedDiscount: 'Immediate Removal / Write-Off',
    discountPercent: 0,
    actionStatus: 'Pending',
    riskLevel: 'Expired'
  },
  {
    id: 'PRD-104',
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
    location: 'Chiller Bay 2 - Top',
    status: 'Expiring Soon',
    suggestedDiscount: '30% Clearance Bundle',
    discountPercent: 30,
    actionStatus: 'Pending',
    riskLevel: 'High'
  },
  {
    id: 'PRD-105',
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
    location: 'Aisle 3 - Pallet 2',
    status: 'Expiring Soon',
    suggestedDiscount: '20% Weekend Promo',
    discountPercent: 20,
    actionStatus: 'Pending',
    riskLevel: 'Medium'
  },
  {
    id: 'PRD-106',
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
    location: 'Aisle 2 - Shelf 3',
    status: 'Expiring Soon',
    suggestedDiscount: '15% Volume Discount',
    discountPercent: 15,
    actionStatus: 'Pending',
    riskLevel: 'Medium'
  },
  {
    id: 'PRD-107',
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
    location: 'Aisle 4 - Shelf 1',
    status: 'Safe',
    suggestedDiscount: 'Regular Retail Price (0%)',
    discountPercent: 0,
    actionStatus: 'Pending',
    riskLevel: 'Safe'
  },
  {
    id: 'PRD-108',
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
    location: 'Aisle 3 - Shelf 4',
    status: 'Safe',
    suggestedDiscount: 'Regular Retail Price (0%)',
    discountPercent: 0,
    actionStatus: 'Pending',
    riskLevel: 'Safe'
  },
  {
    id: 'PRD-109',
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
    location: 'Aisle 3 - Oil Stack',
    status: 'Safe',
    suggestedDiscount: 'Regular Retail Price (0%)',
    discountPercent: 0,
    actionStatus: 'Pending',
    riskLevel: 'Safe'
  },
  {
    id: 'PRD-110',
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
    location: 'Front Counter Display',
    status: 'Expiring Soon',
    suggestedDiscount: '25% Sweet Treat Offer',
    discountPercent: 25,
    actionStatus: 'Pending',
    riskLevel: 'High'
  },
  {
    id: 'PRD-111',
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
    location: 'Bread Counter 1',
    status: 'Expiring Soon',
    suggestedDiscount: '35% Markdown',
    discountPercent: 35,
    actionStatus: 'Pending',
    riskLevel: 'High'
  },
  {
    id: 'PRD-112',
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
    location: 'Aisle 5 - Shelf 2',
    status: 'Safe',
    suggestedDiscount: 'Regular Retail Price (0%)',
    discountPercent: 0,
    actionStatus: 'Pending',
    riskLevel: 'Safe'
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

export function getSmartRecommendation(daysLeft, category) {
  if (daysLeft < 0) {
    return {
      status: 'Expired',
      discount: 'Immediate Removal / Safe Disposal',
      percent: 0,
      badgeColor: 'bg-red-100 text-red-700 border-red-200',
      action: 'Remove from Shelf'
    };
  }
  if (daysLeft <= 2) {
    return {
      status: 'Expiring Soon',
      discount: '50% Flash Clearance',
      percent: 50,
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
      action: 'Apply 50% Off'
    };
  }
  if (daysLeft <= 4) {
    return {
      status: 'Expiring Soon',
      discount: '35% Fast-Mover Markdown',
      percent: 35,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      action: 'Apply 35% Off'
    };
  }
  if (daysLeft <= 7) {
    return {
      status: 'Expiring Soon',
      discount: '20% Promotional Deal',
      percent: 20,
      badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      action: 'Apply 20% Off'
    };
  }
  if (daysLeft <= 15) {
    return {
      status: 'Safe',
      discount: '10% Early Incentive',
      percent: 10,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      action: 'Monitor Shelf'
    };
  }
  return {
    status: 'Safe',
    discount: 'Full Price (No Discount)',
    percent: 0,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    action: 'Safe Rotation'
  };
}
