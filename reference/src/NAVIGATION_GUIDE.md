# 🚗 Velorent - Navigation Guide

## How to Switch Between Systems

The Velorent platform now has **two integrated systems**:

### 1️⃣ **Management System** (Owner View)
- Default view when app loads
- Full car rental business management
- Dashboard, fleet management, rentals, customers, calendar

### 2️⃣ **Marketplace** (Public Customer View)
- Modern, mobile-first car rental marketplace
- Browse cars, book rentals, manage bookings

---

## 🔄 Switching Between Systems

### **Desktop Navigation**

#### From Management → Marketplace:
1. Look for the **"View Marketplace"** button in the top-right header
2. Or click the **"View Marketplace"** button in the sidebar (bottom section with "Public" badge)
3. Click to instantly switch to the public marketplace view

#### From Marketplace → Management:
1. Look for the **"Owner Dashboard"** button in the top navigation
2. Click to return to the management system

### **Mobile Navigation**

#### From Management → Marketplace:
1. Tap the **hamburger menu** (☰) icon
2. Scroll to the bottom
3. Tap **"View Marketplace"** (highlighted with blue background and "Public" badge)

#### From Marketplace → Management:
1. Tap the **hamburger menu** (☰) icon  
2. Tap **"Owner Dashboard"** at the top of the menu

---

## 📱 Visual Indicators

### **Management Mode**
- Blue badge in bottom-left: "Management Mode (Owner View)"
- Sidebar with business management tools
- Professional dashboard interface

### **Marketplace Mode**
- Green badge in bottom-left: "Marketplace Mode (Public View)"
- Bottom navigation on mobile
- Consumer-friendly interface

---

## 🎯 Use Cases

### **Owner/Staff:**
1. Start in **Management System**
2. Manage fleet, track rentals, handle customers
3. Switch to **Marketplace** to see public view
4. Preview how cars appear to customers
5. Switch back to **Management** to continue work

### **Testing/Demo:**
1. **Management View**: Show business operations
2. **Marketplace View**: Show customer experience
3. Seamlessly switch to demonstrate both sides

---

## 🔧 Technical Details

### **File Structure:**
```
/App.tsx                    ← Main router (switches between systems)
/ManagementApp.tsx          ← Owner management system
/MarketplaceApp.tsx         ← Public marketplace
/components/...             ← Shared components
```

### **Navigation Props:**
- `ManagementApp` receives: `onSwitchToMarketplace()`
- `MarketplaceApp` receives: `onSwitchToManagement()`

### **State Management:**
- Simple useState in App.tsx
- Switches between "management" and "marketplace"
- Preserves component state during switches

---

## 🚀 Production Deployment

In production, you would typically:

1. **Option A: Separate Subdomains**
   ```
   manage.velorent.my    → ManagementApp (requires login)
   www.velorent.my       → MarketplaceApp (public)
   ```

2. **Option B: Unified App with Auth**
   ```
   velorent.my           → Marketplace (default)
   velorent.my/admin     → Management (auth required)
   ```

3. **Option C: Separate Apps**
   ```
   Different deployments
   Share same backend API and database
   ```

For now, the demo version keeps both in one app for easy testing! 🎉

---

## 💡 Tips

- **Badge indicators** (bottom-left) help identify which mode you're in
- Both systems share the same **Velorent logo** and **blue theme**
- Navigation buttons are **prominently placed** for easy discovery
- **Mobile navigation** is optimized for touch interfaces
- All transitions are **instant** (no loading screens)

---

## 🎨 Design Consistency

Both systems maintain:
- ✅ Same branding (Velorent logo)
- ✅ Same color scheme (blue #004B87)
- ✅ Same UI components (ShadCN)
- ✅ Consistent spacing and typography
- ✅ WCAG compliant colors

This creates a **unified brand experience** across owner and customer interfaces!

---

**Enjoy exploring both systems!** 🚗✨
