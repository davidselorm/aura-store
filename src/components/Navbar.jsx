import React from 'react';
import { ShoppingBag, Heart, Search, X, Sparkles, Package } from 'lucide-react';
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
        {/* Brand Logo */}
        <a href="#top" className="brand-logo" id="brand-logo-link">
          <div className="brand-icon-box">
            <Sparkles size={20} />
          </div>
          <span>AURA</span>
          <span className="brand-tag">STUDIO</span>
        </a>

        {/* Global Search Bar */}
        <div className="search-wrapper">
          <div className="search-input-box">
            <Search size={17} color="#64748b" />
            <input
              id="product-search-input"
              type="text"
              className="search-input"
              placeholder="Search audio, mechanical keyboards, desk gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                id="clear-search-btn"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="nav-actions">
          {/* Currency Switcher */}
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

          {/* Orders / Telemetry Button */}
          <button
            id="nav-orders-btn"
            className="nav-icon-btn"
            onClick={onOpenOrders}
            title="Orders & Receipts Telemetry"
          >
            <Package size={19} />
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
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="badge-counter">{wishlistCount}</span>
            )}
          </button>

          {/* Cart Drawer Trigger Button */}
          <button
            id="nav-cart-btn"
            className="cart-btn-primary"
            onClick={onOpenCart}
          >
            <ShoppingBag size={18} />
            <span>Bag</span>
            <span className="badge-counter">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
