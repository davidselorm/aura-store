import React from 'react';
import { ShoppingBag, Heart, Search, X, Package, SlidersHorizontal } from 'lucide-react';
import { CURRENCIES } from '../data/products';

export default function Navbar({
  currency,
  setCurrency,
  searchQuery,
  setSearchQuery,
  cartCount,
  wishlistCount,
  ordersCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
}) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo with New Optical Prism Emblem */}
        <a href="#top" className="brand-logo" id="brand-logo-link">
          <div className="brand-emblem-wrapper">
            <svg
              className="brand-svg-prism"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="navGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="18" fill="rgba(14, 22, 38, 0.9)" stroke="url(#navGlow)" strokeWidth="1.5" />
              <polygon
                points="20,7 31,13.5 31,26.5 20,33 9,26.5 9,13.5"
                stroke="url(#navGlow)"
                strokeWidth="1.4"
                fill="rgba(56, 189, 248, 0.08)"
              />
              <line x1="20" y1="7" x2="20" y2="33" stroke="url(#navGlow)" strokeWidth="1.2" />
              <line x1="9" y1="13.5" x2="31" y2="26.5" stroke="url(#navGlow)" strokeWidth="1" opacity="0.8" />
              <line x1="9" y1="26.5" x2="31" y2="13.5" stroke="url(#navGlow)" strokeWidth="1" opacity="0.8" />
              <polygon points="20,14 26,20 20,26 14,20" stroke="url(#navGlow)" strokeWidth="1.2" fill="rgba(0, 240, 255, 0.25)" />
              <circle cx="20" cy="20" r="2.2" fill="#ffffff" />
            </svg>
          </div>
          <div className="brand-text-group">
            <div className="brand-name-row">
              <span className="brand-name-title">AURA</span>
              <span className="brand-edition-badge">PRO '26</span>
            </div>
            <span className="brand-subtext">HARDWARE LABS</span>
          </div>
        </a>

        {/* Global Search Bar */}
        <div className="search-wrapper">
          <div className="search-input-box">
            <Search size={16} color="#64748b" />
            <input
              id="product-search-input"
              type="text"
              className="search-input"
              placeholder="Search audio, custom mechanical keyboards, desk instruments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <button
                id="clear-search-btn"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                <X size={15} />
              </button>
            ) : (
              <span className="search-shortcut-hint">ESC / /</span>
            )}
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="nav-actions">
          {/* Currency Switcher */}
          <div className="currency-selector-wrap">
            <select
              id="currency-select"
              className="currency-select-box"
              value={currency.code}
              onChange={(e) => setCurrency(CURRENCIES[e.target.value])}
              title="Change Currency"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Orders / Telemetry Button */}
          <button
            id="nav-orders-btn"
            className="nav-icon-btn"
            onClick={onOpenOrders}
            title="Telemetry &amp; Digital Receipts"
          >
            <Package size={18} />
            {ordersCount > 0 && (
              <span className="badge-counter" style={{ background: '#0284c7' }}>
                {ordersCount}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            id="nav-wishlist-btn"
            className="nav-icon-btn"
            onClick={onOpenWishlist}
            title="Saved Favorites"
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="badge-counter">{wishlistCount}</span>
            )}
          </button>

          {/* Cart Drawer Trigger Button */}
          <button
            id="nav-cart-btn"
            className="cart-btn-primary"
            onClick={onOpenCart}
            title="View Bag"
          >
            <ShoppingBag size={17} />
            <span>Bag</span>
            {cartCount > 0 && (
              <span className="badge-counter">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
