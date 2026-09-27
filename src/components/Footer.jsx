import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, ArrowRight, Check } from 'lucide-react';

export default function Footer({ onShowToast, onOpenOrders }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    if (onShowToast) onShowToast(`Subscribed ${email} to our newsletter!`);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="app-footer">
      {/* Value Proposition Highlights */}
      <div className="footer-values-grid">
        <div className="footer-value-card">
          <div className="footer-value-icon amber">
            <Truck size={22} />
          </div>
          <div>
            <div className="footer-value-title">Fast Delivery</div>
            <div className="footer-value-desc">Fast shipping worldwide &amp; locally</div>
          </div>
        </div>

        <div className="footer-value-card">
          <div className="footer-value-icon amber">
            <RotateCcw size={22} />
          </div>
          <div>
            <div className="footer-value-title">30-Day Returns</div>
            <div className="footer-value-desc">Hassle-free money-back guarantee</div>
          </div>
        </div>

        <div className="footer-value-card">
          <div className="footer-value-icon amber">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="footer-value-title">2-Year Warranty</div>
            <div className="footer-value-desc">Full hardware replacement coverage</div>
          </div>
        </div>

        <div className="footer-value-card">
          <div className="footer-value-icon amber">
            <CreditCard size={22} />
          </div>
          <div>
            <div className="footer-value-title">Secure Payments</div>
            <div className="footer-value-desc">Cards and Mobile Money accepted</div>
          </div>
        </div>
      </div>

      <div className="footer-inner">
        {/* Brand & Mission */}
        <div className="footer-brand">
          <div className="brand-logo" style={{ marginBottom: '16px' }}>
            <div className="brand-emblem-wrapper" style={{ width: '40px', height: '40px' }}>
              <img
                src="/aura-logo.jpg"
                alt="AURA Store"
                className="brand-emblem-img"
              />
            </div>
            <div className="brand-text-group">
              <div className="brand-name-row">
                <span className="brand-name-title" style={{ fontSize: '1.25rem' }}>AURA</span>
                <span className="brand-edition-badge">STORE</span>
              </div>
              <span className="brand-subtext">TECH &amp; ACCESSORIES</span>
            </div>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: '1.65', maxWidth: '380px', marginBottom: '20px' }}>
            Well-crafted audio, custom mechanical keyboards, and desk gear designed for everyday focus and reliability.
          </p>

          <div className="telemetry-status-badge">
            <span>Fast dispatch • Orders shipped daily</span>
          </div>
        </div>

        {/* Links 1: Products */}
        <div className="footer-col">
          <h5>Products</h5>
          <ul className="footer-links">
            <li><a href="#catalog-section">Wireless Headphones</a></li>
            <li><a href="#catalog-section">Mechanical Keyboards</a></li>
            <li><a href="#catalog-section">Titanium Smartwatch</a></li>
            <li><a href="#catalog-section">Ergonomic Mouse</a></li>
            <li><a href="#catalog-section">Monitor Light Bar</a></li>
            <li><a href="#catalog-section">Fast Wireless Charger</a></li>
          </ul>
        </div>

        {/* Links 2: Support */}
        <div className="footer-col">
          <h5>Customer Support</h5>
          <ul className="footer-links">
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenOrders) onOpenOrders();
                }}
                className="footer-interactive-link"
              >
                Track Your Orders
              </button>
            </li>
            <li><a href="#top">Warranty &amp; Returns</a></li>
            <li><a href="#top">Shipping Information</a></li>
            <li><a href="#top">Payment Methods &amp; MoMo</a></li>
            <li><a href="#top">Contact Support</a></li>
          </ul>
        </div>

        {/* Column 3: Newsletter */}
        <div className="footer-col">
          <h5>Newsletter</h5>
          <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '14px', lineHeight: '1.5' }}>
            Subscribe to get updates on new products, discounts, and releases.
          </p>
          <form onSubmit={handleSubscribe} className="footer-newsletter-form">
            <input
              id="footer-email-input"
              type="email"
              placeholder="Enter your email"
              className="footer-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              id="footer-subscribe-btn"
              type="submit"
              className="footer-subscribe-btn"
              title="Subscribe"
            >
              {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
            </button>
          </form>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '8px' }}>
            No spam. You can unsubscribe at any time.
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div>
          &copy; {new Date().getFullYear()} AURA Store. All rights reserved.
        </div>
        <div className="footer-bottom-links">
          <a href="#top">Privacy Policy</a>
          <span>•</span>
          <a href="#top">Terms of Service</a>
          <span>•</span>
          <a href="#top">Shipping &amp; Returns</a>
        </div>
      </div>
    </footer>
  );
}
