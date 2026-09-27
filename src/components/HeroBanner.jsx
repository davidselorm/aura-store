import React from 'react';
import { ArrowRight, Star, Zap } from 'lucide-react';

export default function HeroBanner({ onExplore, onQuickView, featuredProduct, currency }) {
  const convertedPrice = Math.round(featuredProduct.price * currency.rate);

  return (
    <section className="hero-section">
      <div className="hero-card">
        <div className="hero-glow-element"></div>

        {/* Hero Left Content */}
        <div className="hero-left-content">
          <div className="hero-tag">
            <Zap size={14} />
            <span>Autumn 2026 Hardware Drop</span>
          </div>

          <h1 className="hero-title">
            Sound Reimagined. <br />
            Workspace Refined.
          </h1>

          <p className="hero-subtitle">
            Milled aluminum craftsmanship, acoustic isolation, and ultra-low latency telemetry.
            Designed for creators who build in the deep state of flow.
          </p>

          <div className="hero-actions">
            <button
              id="hero-explore-btn"
              className="btn-hero-primary"
              onClick={onExplore}
            >
              <span>Explore Collection</span>
              <ArrowRight size={18} />
            </button>

            <button
              id="hero-quick-view-btn"
              className="btn-hero-secondary"
              onClick={() => onQuickView(featuredProduct)}
            >
              <span>Spotlight: {featuredProduct.name.split(' ')[1]}</span>
            </button>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <h4>4.9 / 5.0</h4>
              <p>1,200+ Verified Reviews</p>
            </div>
            <div className="hero-stat-item">
              <h4>Global Express</h4>
              <p>Delivery via DHL &amp; Local MoMo</p>
            </div>
            <div className="hero-stat-item">
              <h4>24-Month</h4>
              <p>Hardware Zero-Defect Warranty</p>
            </div>
          </div>
        </div>

        {/* Hero Right Media */}
        <div className="hero-media-wrapper">
          <img
            src={featuredProduct.image}
            alt={featuredProduct.name}
            className="hero-product-img"
          />

          <div className="hero-floating-card">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.8rem', fontWeight: 'bold' }}>
                <Star size={13} fill="#f59e0b" />
                <span>4.9</span>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff' }}>
                {featuredProduct.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '800' }}>
                {currency.symbol}{convertedPrice}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
