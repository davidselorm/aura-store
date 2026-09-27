import React, { useState } from 'react';
import { ArrowRight, Star, ShieldCheck, Zap, Sparkles, Cpu, Disc3 } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function HeroBanner({ onExplore, onQuickView, featuredProduct, currency }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeProduct = PRODUCTS[selectedIdx] || featuredProduct;
  const convertedPrice = Math.round(activeProduct.price * currency.rate);
  const originalPrice = Math.round(activeProduct.originalPrice * currency.rate);

  const FLAGSHIPS = [
    { label: '01 • Audio', productIdx: 0, tag: '48dB Lossless ANC' },
    { label: '02 • Custom Keyboards', productIdx: 1, tag: 'Gasket Milled Brass' },
    { label: '03 • Horology', productIdx: 2, tag: 'Sapphire & Grade-5 Ti' },
    { label: '04 • Ergonomics', productIdx: 3, tag: '26K DPI MagSpeed' },
  ];

  return (
    <section className="hero-section">
      <div className="hero-card">
        {/* Bioluminescent Warm Amber & Liquid Platinum Orbs */}
        <div className="hero-aurora-glow gold"></div>
        <div className="hero-aurora-glow emerald"></div>

        {/* Hero Left Content */}
        <div className="hero-left-content">
          <div className="hero-badge-row">
            <span className="hero-tag">
              <Sparkles size={13} className="hero-tag-icon" />
              <span>AURA ATELIER • AUTUMN 2026</span>
            </span>
            <span className="hero-dispatch-indicator">
              <span className="pulse-dot"></span>
              Live Dispatch Active • Global Express
            </span>
          </div>

          <h1 className="hero-title">
            Milled From Silence. <br />
            <span className="hero-title-gradient">Engineered For The Few.</span>
          </h1>

          <p className="hero-subtitle">
            Monolithic grade-5 titanium chassis, acoustically dampening poron isolation, and low-latency telemetry.
            Designed strictly for creators who operate in uninterrupted creative flow.
          </p>

          {/* Interactive Flagship Channels */}
          <div className="hero-product-switcher">
            <div className="switcher-pills">
              {FLAGSHIPS.map((item, idx) => (
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

          {/* CTA Actions */}
          <div className="hero-actions">
            <button
              id="hero-explore-btn"
              className="btn-hero-primary"
              onClick={onExplore}
            >
              <span>Explore The Atelier</span>
              <ArrowRight size={17} />
            </button>

            <button
              id="hero-quick-view-btn"
              className="btn-hero-secondary"
              onClick={() => onQuickView(activeProduct)}
            >
              <Disc3 size={16} color="#f5ba42" />
              <span>Inspect {activeProduct.name.split(' ')[1]}</span>
            </button>
          </div>

          {/* Precision Engineering Specs */}
          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <div className="stat-value-row">
                <Star size={13} fill="#f5ba42" color="#f5ba42" />
                <h4>4.98 / 5.0</h4>
              </div>
              <p>2,800+ Verified Studio Auditions</p>
            </div>
            <div className="hero-stat-item">
              <div className="stat-value-row">
                <Cpu size={13} color="#f5ba42" />
                <h4>Grade-5 Titanium</h4>
              </div>
              <p>6063 Solid Milled Chassis</p>
            </div>
            <div className="hero-stat-item">
              <div className="stat-value-row">
                <ShieldCheck size={13} color="#10e793" />
                <h4>2-Year Care</h4>
              </div>
              <p>Zero-Defect Hardware Guarantee</p>
            </div>
          </div>
        </div>

        {/* Hero Right Media Column */}
        <div className="hero-media-wrapper">
          <div className="hero-media-backdrop"></div>

          <div className="hero-product-stage">
            <img
              key={activeProduct.id}
              src={activeProduct.image}
              alt={activeProduct.name}
              className="hero-product-img spotlight-animate"
            />
          </div>

          {/* Floating Hardware Telemetry Hologram */}
          <div className="hero-floating-card">
            <div className="floating-card-header">
              <span className="live-status-pill">
                <span className="pulse-dot"></span>
                In Stock ({activeProduct.stockCount || 8} units left)
              </span>
              <div className="floating-rating">
                <Star size={11} fill="#f5ba42" color="#f5ba42" />
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
                <span>Full Specs</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
