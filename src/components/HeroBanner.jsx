import React, { useState } from 'react';
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function HeroBanner({ onExplore, onQuickView, featuredProduct, currency }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeProduct = PRODUCTS[selectedIdx] || featuredProduct;
  const convertedPrice = Math.round(activeProduct.price * currency.rate);
  const originalPrice = Math.round(activeProduct.originalPrice * currency.rate);

  const CATEGORY_TABS = [
    { label: 'Headphones', productIdx: 0 },
    { label: 'Keyboard', productIdx: 1 },
    { label: 'Smartwatch', productIdx: 2 },
    { label: 'Wireless Mouse', productIdx: 3 },
  ];

  return (
    <section className="hero-section">
      <div className="hero-card">
        {/* Left Column: Simple & Clear Copy */}
        <div className="hero-left-content">
          <div className="hero-badge-row">
            <span className="hero-tag">
              <span>New Arrivals 2026</span>
            </span>
            <span className="hero-dispatch-indicator">
              Free shipping on orders over $150
            </span>
          </div>

          <h1 className="hero-title">
            Simple, reliable tech <br />
            <span className="hero-title-gradient">built for daily work.</span>
          </h1>

          <p className="hero-subtitle">
            Thoughtfully engineered headphones, keyboards, and desk accessories. Clean design, durable materials, and everyday comfort.
          </p>

          {/* Product selector tabs */}
          <div className="hero-product-switcher">
            <div className="switcher-pills">
              {CATEGORY_TABS.map((item) => (
                <button
                  key={item.label}
                  className={`switcher-pill-btn ${selectedIdx === item.productIdx ? 'active' : ''}`}
                  onClick={() => setSelectedIdx(item.productIdx)}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="hero-actions">
            <button
              id="hero-explore-btn"
              className="btn-hero-primary"
              onClick={onExplore}
            >
              <span>Shop All Products</span>
              <ArrowRight size={16} />
            </button>

            <button
              id="hero-quick-view-btn"
              className="btn-hero-secondary"
              onClick={() => onQuickView(activeProduct)}
            >
              <span>View Product Details</span>
            </button>
          </div>

          {/* Key store benefits */}
          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <div className="stat-value-row">
                <Truck size={14} color="#f5ba42" />
                <h4>Fast Delivery</h4>
              </div>
              <p>Express global &amp; local dispatch</p>
            </div>
            <div className="hero-stat-item">
              <div className="stat-value-row">
                <RotateCcw size={14} color="#f5ba42" />
                <h4>30-Day Returns</h4>
              </div>
              <p>Simple and hassle-free returns</p>
            </div>
            <div className="hero-stat-item">
              <div className="stat-value-row">
                <ShieldCheck size={14} color="#10b981" />
                <h4>2-Year Warranty</h4>
              </div>
              <p>Direct repair or replacement</p>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Product Showcase */}
        <div className="hero-media-wrapper">
          <div className="hero-product-stage">
            <img
              key={activeProduct.id}
              src={activeProduct.image}
              alt={activeProduct.name}
              className="hero-product-img"
            />
          </div>

          {/* Simple Product Info Card */}
          <div className="hero-floating-card">
            <div className="floating-card-header">
              <span className="live-status-pill">
                In Stock ({activeProduct.stockCount} units available)
              </span>
              <div className="floating-rating">
                <Star size={12} fill="#f5ba42" color="#f5ba42" />
                <span>{activeProduct.rating}</span>
              </div>
            </div>

            <div className="floating-product-title">
              {activeProduct.name}
            </div>

            <div className="floating-product-tagline">
              {activeProduct.tagline}
            </div>

            <div className="floating-footer">
              <div className="floating-price-wrap">
                <span className="floating-price">
                  {currency.symbol}{convertedPrice}
                </span>
                {originalPrice > convertedPrice && (
                  <span className="floating-orig-price">
                    {currency.symbol}{originalPrice}
                  </span>
                )}
              </div>

              <button
                className="btn-inspect-pill"
                onClick={() => onQuickView(activeProduct)}
              >
                <span>Quick View</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
