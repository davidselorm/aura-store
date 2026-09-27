import React from 'react';
import { ShoppingBag, Heart, Search, X, Package } from 'lucide-react';
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
          <div className="brand-emblem-wrapper">
            <img
              src="/aura-logo.jpg"
              alt="AURA Store"
              className="brand-emblem-img"
            />
          </div>
          <div className="brand-text-group">
            <div className="brand-name-row">
              <span className="brand-name-title">AURA</span>
              <span className="brand-edition-badge">STORE</span>
            </div>
            <span className="brand-subtext">TECH &amp; ACCESSORIES</span>
          </div>
        </a>

        {/* Search Bar */}
        <div className="search-wrapper">
          <div className="search-input-box">
            <Search size={16} color="#94a3b8" />
            <input
              id="product-search-input"
              type="text"
              className="search-input"
              placeholder="Search products (e.g. headphones, keyboard, mouse)..."
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

        {/* Actions */}
        <div className="nav-actions">
          {/* Currency Switcher */}
          <div className="currency-selector-wrap">
            <select
              id="currency-select"
              className="currency-select-box"
              value={currency.code}
              onChange={(e) => setCurrency(CURRENCIES[e.target.value])}
              title="Select currency"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="desktop-actions-group">
            {/* Orders Button */}
            <button
              id="nav-orders-btn"
              className="nav-icon-btn"
              onClick={onOpenOrders}
              title="Your Orders"
            >
              <Package size={18} />
              {ordersCount > 0 && (
                <span className="badge-counter green">{ordersCount}</span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              id="nav-wishlist-btn"
              className="nav-icon-btn"
              onClick={onOpenWishlist}
              title="Saved Items"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="badge-counter amber">{wishlistCount}</span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              className="cart-btn-primary"
              onClick={onOpenCart}
              title="Shopping Cart"
            >
              <ShoppingBag size={17} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="badge-counter">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
