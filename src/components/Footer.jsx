import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, ArrowRight, Check, Sparkles, Smartphone, Globe } from 'lucide-react';

export default function Footer({ onShowToast, onOpenOrders }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    if (onShowToast) onShowToast(`Subscribed ${email} to Aura Batch Drops!`);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="app-footer">
      {/* Value Proposition Highlights */}
      <div className="footer-values-grid">
        <div className="footer-value-card">
          <div className="footer-value-icon cyan">
            <Truck size={22} />
          </div>
          <div>
            <div className="footer-value-title">Fast Global Dispatch</div>
            <div className="footer-value-desc">DHL Express Worldwide &amp; Local Deliveries</div>
          </div>
        </div>

        <div className="footer-value-card">
          <div className="footer-value-icon amber">
            <RotateCcw size={22} />
          </div>
          <div>
            <div className="footer-value-title">30-Day Studio Trial</div>
            <div className="footer-value-desc">Risk-free audition in your workspace</div>
          </div>
        </div>

        <div className="footer-value-card">
          <div className="footer-value-icon emerald">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="footer-value-title">2-Year Zero-Defect</div>
            <div className="footer-value-desc">Direct hardware replacement warranty</div>
          </div>
        </div>

        <div className="footer-value-card">
          <div className="footer-value-icon violet">
            <Smartphone size={22} />
          </div>
          <div>
            <div className="footer-value-title">Mobile Money &amp; Cards</div>
            <div className="footer-value-desc">MTN MoMo, Telecel Cash &amp; Visa/MC</div>
          </div>
        </div>
      </div>

      <div className="footer-inner">
        {/* Brand & Mission */}
        <div className="footer-brand">
          <div className="brand-logo" style={{ marginBottom: '16px' }}>
            <div className="brand-emblem-wrapper" style={{ width: '36px', height: '36px' }}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="footerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
                <circle cx="20" cy="20" r="18" fill="#0f172a" stroke="url(#footerGlow)" strokeWidth="1.5" />
                <polygon points="20,7 31,13.5 31,26.5 20,33 9,26.5 9,13.5" stroke="url(#footerGlow)" strokeWidth="1.4" fill="rgba(56, 189, 248, 0.08)" />
                <polygon points="20,14 26,20 20,26 14,20" stroke="url(#footerGlow)" strokeWidth="1.2" fill="rgba(0, 240, 255, 0.25)" />
                <circle cx="20" cy="20" r="2" fill="#ffffff" />
              </svg>
            </div>
            <div className="brand-text-group">
              <div className="brand-name-row">
                <span className="brand-name-title" style={{ fontSize: '1.2rem' }}>AURA</span>
                <span className="brand-edition-badge">STUDIO</span>
              </div>
              <span className="brand-subtext">PRECISION HARDWARE LABS</span>
            </div>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: '1.65', maxWidth: '380px', marginBottom: '20px' }}>
            Architectural desktop hardware, lossless spatial acoustics, and milled instruments crafted for the deep state of creative flow.
          </p>

          <div className="telemetry-status-badge">
            <span className="pulse-dot"></span>
            <span>Global Systems: Operational &amp; Dispatching</span>
          </div>
        </div>

        {/* Links 1: Hardware Catalog */}
        <div className="footer-col">
          <h5>Hardware Portfolio</h5>
          <ul className="footer-links">
            <li><a href="#catalog-section">Sonic Pro ANC Headphones</a></li>
            <li><a href="#catalog-section">Keeb 75 Custom Mechanical</a></li>
            <li><a href="#catalog-section">TITANUS Chrono Sapphire</a></li>
            <li><a href="#catalog-section">ErgoGlide Precision Mouse</a></li>
            <li><a href="#catalog-section">Halo Horizon Light Bar</a></li>
            <li><a href="#catalog-section">Quanta Qi2 Glass Pad</a></li>
          </ul>
        </div>

        {/* Links 2: Telemetry & Support */}
        <div className="footer-col">
          <h5>Customer Telemetry</h5>
          <ul className="footer-links">
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenOrders) onOpenOrders();
                }}
                className="footer-interactive-link"
              >
                Track Orders &amp; Receipts
              </button>
            </li>
            <li><a href="#top">Firmware &amp; VIA Keymaps</a></li>
            <li><a href="#top">Zero-Defect Hardware Warranty</a></li>
            <li><a href="#top">Ghana MoMo &amp; DHL Help</a></li>
            <li><a href="#top">Aerospace Material Specs</a></li>
          </ul>
        </div>

        {/* Column 3: Batch Drop Access */}
        <div className="footer-col">
          <h5>Early Drop Access</h5>
          <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '14px', lineHeight: '1.5' }}>
            Join 35,000+ creators and engineers receiving limited prototype runs and batch releases.
          </p>
          <form onSubmit={handleSubscribe} className="footer-newsletter-form">
            <input
              id="footer-email-input"
              type="email"
              placeholder="Enter developer / studio email"
              className="footer-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              id="footer-subscribe-btn"
              type="submit"
              className="footer-subscribe-btn"
              title="Join Batch Drops"
            >
              {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
            </button>
          </form>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '8px' }}>
            No spam. Direct hardware telemetry and drop notifications only.
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div>
          &copy; {new Date().getFullYear()} AURA Studio Inc. All rights reserved. Milled &amp; engineered for creators worldwide.
        </div>
        <div className="footer-bottom-links">
          <a href="#top">Privacy Shield</a>
          <span>•</span>
          <a href="#top">Terms of Telemetry</a>
          <span>•</span>
          <a href="#top">Environmental Impact</a>
        </div>
      </div>
    </footer>
  );
}
