import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Truck, RotateCcw, CreditCard, ArrowRight, Check } from 'lucide-react';

export default function Footer({ onShowToast, onOpenOrders }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    onShowToast(`Subscribed ${email} to Aura Drops!`);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="app-footer">
      {/* Value Proposition Highlights */}
      <div style={{ maxWidth: '1360px', margin: '0 auto 40px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '10px', background: 'rgba(56,189,248,0.1)', borderRadius: '10px', color: '#38bdf8' }}>
            <Truck size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>Fast Global Express</div>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>DHL Express &amp; Local Deliveries</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '10px', background: 'rgba(245,158,11,0.1)', borderRadius: '10px', color: '#f59e0b' }}>
            <RotateCcw size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>30-Day Risk-Free Trial</div>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>No-questions-asked returns</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '10px', background: 'rgba(16,185,129,0.1)', borderRadius: '10px', color: '#10b981' }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>2-Year Comprehensive</div>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Direct hardware replacement</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '10px', background: 'rgba(129,140,248,0.1)', borderRadius: '10px', color: '#818cf8' }}>
            <CreditCard size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>Card &amp; Mobile Money</div>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>MTN MoMo, Telecel &amp; Visa/MC</div>
          </div>
        </div>
      </div>

      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <div className="brand-logo">
            <div className="brand-icon-box">
              <Sparkles size={18} />
            </div>
            <span>AURA</span>
            <span className="brand-tag">STUDIO</span>
          </div>
          <p>
            Architectural hardware and precision instruments designed to elevate your workspace and creative flow.
          </p>
        </div>

        {/* Links 1 */}
        <div className="footer-col">
          <h5>Hardware</h5>
          <ul className="footer-links">
            <li><a href="#catalog-section">ANC Headphones</a></li>
            <li><a href="#catalog-section">Custom Keyboards</a></li>
            <li><a href="#catalog-section">Titanium Chronos</a></li>
            <li><a href="#catalog-section">Ergonomic Mice</a></li>
            <li><a href="#catalog-section">Horizon Lightbars</a></li>
          </ul>
        </div>

        {/* Links 2 */}
        <div className="footer-col">
          <h5>Support &amp; Care</h5>
          <ul className="footer-links">
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenOrders) onOpenOrders();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                  textAlign: 'left',
                }}
              >
                Order Telemetry &amp; Receipts
              </button>
            </li>
            <li><a href="#top">Firmware &amp; VIA Maps</a></li>
            <li><a href="#top">Warranty Claims</a></li>
            <li><a href="#top">Ghana MoMo Support</a></li>
            <li><a href="#top">Sustainability Report</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col">
          <h5>Early Hardware Access</h5>
          <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '14px' }}>
            Join 35,000+ engineers receiving exclusive batch drops and private discounts.
          </p>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
            <input
              id="footer-email-input"
              type="email"
              placeholder="Your email address"
              className="form-input"
              style={{ fontSize: '0.82rem', padding: '9px 12px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              id="footer-subscribe-btn"
              type="submit"
              className="btn-add-cart"
              style={{ padding: '0 14px', borderRadius: '8px' }}
            >
              {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div>&copy; {new Date().getFullYear()} AURA Studio Inc. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#top">Privacy Policy</a>
          <a href="#top">Terms of Service</a>
          <a href="#top">Security Architecture</a>
        </div>
      </div>
    </footer>
  );
}
