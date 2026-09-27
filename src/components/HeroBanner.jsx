import React, { useState } from 'react';
import { ArrowRight, Star, ShieldCheck, Zap, Sparkles, Cpu, Volume2, Layers } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function HeroBanner({ onExplore, onQuickView, featuredProduct, currency }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Allow switching between top 4 flagship items
  const activeProduct = PRODUCTS[selectedIdx] || featuredProduct;
  const convertedPrice = Math.round(activeProduct.price * currency.rate);
  const originalPrice = Math.round(activeProduct.originalPrice * currency.rate);

  return (
    <section className="hero-section">
      <div className="hero-card">
        {/* Ambient Aurora Glows */}
        <div className="hero-aurora-glow cyan"></div>
        <div className="hero-aurora-glow indigo"></div>

        {/* Hero Left Content */}
        <div className="hero-left-content">
          <div className="hero-badge-row">
            <span className="hero-tag">
              <Zap size={13} className="hero-tag-icon" />
              <span>Autumn '26 Master Series Drop</span>
            </span>
            <span className="hero-dispatch-indicator">
              <span className="pulse-dot"></span>
              Fast Courier Dispatch Active
            </span>
          </div>

          <h1 className="hero-title">
            Architectural Hardware. <br />
            <span className="hero-title-gradient">Pure Uncompromised Flow.</span>
          </h1>

          <p className="hero-subtitle">
            Precision-milled aerospace aluminum, acoustic dampening chambers, and ultra-low latency telemetry.
            Crafted for engineers, audiophiles, and creators who demand absolute tactile perfection.
          </p>

          {/* Interactive Flagship Spotlight Tabs */}
          <div className="hero-product-switcher">
            <span className="switcher-label">Flagship Spotlight:</span>
            <div className="switcher-pills">
              {PRODUCTS.slice(0, 4).map((p, idx) => (
                <button
                  key={p.id}
                  className={`switcher-pill-btn ${selectedIdx === idx ? 'active' : ''}`}
                  onClick={() => setSelectedIdx(idx)}
                >
                  <span>{p.name.split(' ')[1] || p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div className="hero-actions">
            <button
              id="hero-explore-btn"
              className="btn-hero-primary"
              onClick={onExplore}
            >
              <span>Explore Full Collection</span>
              <ArrowRight size={18} />
            </button>

            <button
              id="hero-quick-view-btn"
              className="btn-hero-secondary"
              onClick={() => onQuickView(activeProduct)}
            >
              <Sparkles size={16} color="#38bdf8" />
              <span>Inspect Specs: {activeProduct.name.split(' ')[1]}</span>
            </button>
          </div>

          {/* High-Tech Trust & Engineering Metrics */}
          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <div className="stat-value-row">
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <h4>4.96 / 5.0</h4>
              </div>
              <p>2,400+ Verified Studio Reviews</p>
            </div>
            <div className="hero-stat-item">
              <div className="stat-value-row">
                <Cpu size={14} color="#38bdf8" />
                <h4>CNC Milled</h4>
              </div>
              <p>Aerospace Grade Titanium &amp; Aluminum</p>
            </div>
            <div className="hero-stat-item">
              <div className="stat-value-row">
                <ShieldCheck size={14} color="#10b981" />
                <h4>24-Month</h4>
              </div>
              <p>Direct Zero-Defect Replacement</p>
            </div>
          </div>
        </div>

        {/* Hero Right Media Showcase */}
        <div className="hero-media-wrapper">
          <div className="hero-media-backdrop"></div>

          <img
            key={activeProduct.id}
            src={activeProduct.image}
            alt={activeProduct.name}
            className="hero-product-img spotlight-animate"
          />

          {/* Floating Live Telemetry Hologram Card */}
          <div className="hero-floating-card">
            <div className="floating-card-header">
              <span className="live-status-pill">
                <span className="pulse-dot"></span>
                In Stock ({activeProduct.stockCount || 12} left)
              </span>
              <div className="floating-rating">
                <Star size={12} fill="#f59e0b" color="#f59e0b" />
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
                <span>Specs</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
