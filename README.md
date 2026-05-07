# 🛍️ ApexShop — E-Commerce Platform UI

> Built with **React + Vite** | Run with `npm run dev`

## 🚀 Setup & Run

```bash
# Step 1: Install dependencies
npm install

# Step 2: Start dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

## 📁 Project Structure

```
apexshop/
├── index.html               ← Vite entry HTML
├── vite.config.js           ← Vite config
├── package.json
├── src/
│   ├── main.jsx             ← App entry point
│   ├── App.jsx              ← Root component + state
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── CartDrawer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── WishlistPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── CheckoutPage.jsx
│   ├── data/
│   │   └── products.js
│   └── styles/
│       └── globals.css
```

## ✨ Features

| Feature | Details |
|---|---|
| 🏠 Home | Hero banner + 12 products |
| 🔍 Search | Live search by name/desc |
| 🏷️ Filters | Category + Max price |
| ↕️ Sort | Price, Rating, Reviews |
| 🛒 Cart | Slide-in drawer + qty controls |
| ♡ Wishlist | Save/remove products |
| 👤 Profile | Orders history + menu |
| 💳 Checkout | Address + UPI/Card/COD/EMI |
| 🎉 Success | Order confirmation screen |

## 🛠️ Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start dev server (localhost:5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---
Made for learning · ApexShop © 2026
