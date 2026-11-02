# SmartExpiry — Smart Expiry Management System

> **Retail Technology & AI-Assisted Inventory Optimization for Supermarkets in Tier-2 and Tier-3 Cities**  
> *Academic Entrepreneurship & Retail Tech Innovation Project*

---

## 📌 Executive Summary

**SmartExpiry** is a modern SaaS platform designed to solve one of the most persistent operational bottlenecks in physical grocery retail: **unmanaged product expiry and preventable food waste**. 

Small and medium-sized supermarkets in Tier-2 and Tier-3 cities in India handle thousands of fast-moving consumer goods (dairy, bakery, staples, snacks, and condiments) every day. Relying on manual shelf checks and physical notepads leads to missed expiry dates, damaged customer trust, and heavy monthly inventory write-offs. 

SmartExpiry digitizes the shelf-life lifecycle through:
1. **Barcode-based inwarding** to log product batches and expiration dates in seconds.
2. **Automated continuous expiry monitoring** with proactive morning staff action alerts.
3. **AI-assisted dynamic markdown recommendations** (15% to 50%) that clear near-expiry inventory before spoilage occurs.
4. **Zero expensive hardware lock-in**, running directly on existing counter PCs, barcode scanners, and mobile devices.

---

## 🚀 Live Demo & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Run Locally
```bash
# Clone or navigate to the project directory
cd quick_mart

# Install dependencies (if not already installed)
npm install

# Start the Vite development server
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in any modern web browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🌐 Deploying to Vercel (Get a Live HTTPS URL)

This project is pre-configured with `vercel.json` for seamless deployment.

### Option A: Deploy via Vercel CLI (Fastest - 2 Minutes)
1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. In the project root directory, run:
   ```bash
   vercel
   ```
3. Follow the quick terminal prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your personal account
   - Link to existing project? **No**
   - Project name? **smartexpiry** (or press Enter)
   - In which directory is your code located? **./**
   - Want to modify settings? **No**
4. Deploy to production:
   ```bash
   vercel --prod
   ```
5. You will instantly receive a public HTTPS URL (e.g. `https://smartexpiry.vercel.app`) to share with faculty and mentors.

### Option B: Deploy via GitHub & Vercel Web Dashboard
1. Initialize a git repository and commit the project:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of SmartExpiry startup platform"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. Go to [vercel.com](https://vercel.com/) and log in with GitHub.
5. Click **"Add New"** → **"Project"** → Select your repository.
6. The framework preset will automatically detect **Vite**.
7. Click **"Deploy"**. Your live HTTPS website will be ready in under 60 seconds!

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with Vite 8
- **Styling**: Tailwind CSS 3.4 (with custom emerald, dark navy, and coral palette)
- **Typography**: Google Fonts (*Outfit* for headings, *Plus Jakarta Sans* for UI elements)
- **Icons**: Lucide React
- **Micro-Interactions**: Canvas-Confetti & CSS keyframe animations
- **Session Persistence**: Browser `localStorage` for demo requests and audit logs
- **Data Export**: Native client-side CSV generator

---

## 📊 Website Architecture & Sections

| Section | Component | Description |
| :--- | :--- | :--- |
| **Navigation** | `Navbar.jsx` | Sticky glassmorphism header with logo, navigation links, and "Request a Demo" CTA. |
| **Hero Section** | `Hero.jsx` | High-converting headline (*"Never Miss an Expiry Date Again."*), dual CTAs, and a high-fidelity interactive dashboard preview mockup. |
| **Problem We Solve** | `ProblemSection.jsx` | 4 cards analyzing manual checking, customer dissatisfaction, unnoticed near-expiry stock, and food waste, plus a "Traditional vs. SmartExpiry" comparison. |
| **Our Solution** | `SolutionWorkflow.jsx` | 6-stage visual lifecycle: Inwarding → Digitization → Tracking → Alerts → Dynamic Markdown → Shelf Action. |
| **Key Features** | `FeaturesSection.jsx` | 8 capability cards with honest badges distinguishing live demo features from roadmap capabilities. |
| **Live Supermarket Dashboard** | `InteractiveDashboard.jsx` | Fully functional demo with realistic Indian supermarket SKUs, physical shelf codes, aisle filters, branch selector, real-time search, discount triggers, and CSV export. |
| **QR & Barcode Camera Scanner** | `CameraBarcodeScannerModal.jsx` | Camera-based scanner using `html5-qrcode` to scan product packages, fallback manual entry, quick test codes, unknown code error handling, and direct "Navigate to Product" trigger. |
| **Smart Indoor Floor Navigation** | `StoreMapNavigation.jsx` | Interactive SVG supermarket floor plan with BFS/Dijkstra shortest path calculation, turn-by-turn directions, walking distance & time estimation, and multi-product clearance route planning. |
| **Product Location Tracking** | `EditLocationModal.jsx` | Authorized staff tool to record and update branch, department, aisle, rack, shelf number, and shelf level with dynamic shelf codes. |
| **AI Strategy Tester** | `DynamicDiscountSimulator.jsx` | Real-time interactive slider demonstrating how the dynamic markdown curve balances shelf life against retail margin (never selling expired goods). |
| **How It Works** | `HowItWorks.jsx` | Clean 3-step process flow with step diagram connectors. |
| **Benefits for Retailers** | `BenefitsSection.jsx` | 6 grounded operational benefits without fabricated claims or false statistics. |
| **Target Customers** | `TargetCustomers.jsx` | Focused breakdown for Tier-2 & Tier-3 retail (Kirana stores, Standalone Supermarkets, Regional Chains). |
| **Request a Demo** | `ContactSection.jsx` | Interactive consultation request form with client-side validation, Indian phone format checks, and instant confirmation feedback. |
| **Footer** | `Footer.jsx` | Startup identity, mission, project attribution, and contact details. |

---

## 🧭 Indoor Positioning vs Outdoor GPS (Technical Transparency)

- **Indoor Positioning Reality**: Satellite GPS signals cannot reliably penetrate concrete supermarket ceilings. In this initial prototype, starting positions (Main Entrance, Billing Counter, Customer Service Desk, or specific Aisles) are chosen manually by the user or staff. Automated sub-meter indoor positioning in production requires ceiling-mounted **BLE Beacons (Bluetooth Low Energy)** or **Wi-Fi RTT (802.11mc)** hardware.
- **Outdoor GPS**: An optional outdoor GPS module is provided with user browser permission to locate the user relative to the supermarket branch and provide driving/walking directions via Google Maps.

---

## 🎓 Entrepreneurship Project Presentation Guide

When presenting to faculty, mentors, or potential retail pilot partners:
1. **Camera & QR/Barcode Scanning**: Click **"Camera Barcode / QR Scanner"**, demonstrate the optical viewfinder, click a sample product code (e.g., Amul Milk or Britannia Bread), view its instant retrieved record, and click **"Navigate to Product on Store Map"**.
2. **Interactive Floor Map & Dijkstra Routing**:
   - Show the highlighted green route on the floor map.
   - Change your starting point from "Main Entrance" to "Billing Counter #1" or "Chiller Zone" and watch the route recalculate instantly.
   - Point out the calibrated map scale (*1 Grid Cell = 1.5 meters*), walking distance in meters, and estimated time.
3. **Multi-Product Clearance Run**: Toggle to **"Multi-Product Clearance Run"** to show how floor staff can generate an optimized multi-stop collection route to pull near-expiry items across different aisles in a single efficient run.
4. **Physical Shelf Location Management**: Click **"Edit Location"** on any product to demonstrate how authorized staff can change aisles, racks, and shelf levels with automatically generated shelf codes (e.g. `CZ-B1-S2`, `A1-RA-S2`).
5. **Safety Compliance**: Show that expired items (e.g. Mother Dairy Paneer) are strictly locked from sale with clear "DO NOT SELL" instructions, safeguarding customer safety.
