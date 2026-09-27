import React, { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, CheckCircle2, Lock, Sparkles, ArrowRight, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  currency,
  appliedPromo,
  onOrderCompleted,
  onOpenOrders,
}) {
  const [step, setStep] = useState('shipping'); // 'shipping' | 'payment' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'momo' | 'applepay'
  const [orderId, setOrderId] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    fullName: 'David Selorm',
    email: 'davidselormwalker@gmail.com',
    address: '14 Independence Avenue',
    city: 'Accra',
    country: 'Ghana',
    postalCode: 'GA-102',
    cardNumber: '4532 •••• •••• 8892',
    cardExp: '12/28',
    cardCvc: '432',
    momoNetwork: 'MTN MoMo',
    momoPhone: '024 123 4567',
  });

  // Handle Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Hook rules require all hooks to run before early returns
  if (!isOpen) return null;

  // Calculate pricing
  const rawSubtotalUSD = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = Math.round(rawSubtotalUSD * currency.rate);

  let discountUSD = 0;
  let isFreeShipping = rawSubtotalUSD >= 150;

  if (appliedPromo) {
    if (appliedPromo.type === 'percent') {
      discountUSD = (rawSubtotalUSD * appliedPromo.value) / 100;
    } else if (appliedPromo.type === 'fixed') {
      discountUSD = Math.min(rawSubtotalUSD, appliedPromo.value);
    } else if (appliedPromo.type === 'shipping') {
      isFreeShipping = true;
    }
  }

  const discount = Math.round(discountUSD * currency.rate);
  const shipping = isFreeShipping ? 0 : Math.round(15 * currency.rate);
  const tax = Math.round((rawSubtotalUSD - discountUSD) * 0.05 * currency.rate);
  const total = Math.max(0, subtotal - discount + shipping + tax);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    const generatedId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingCode = `DHL-GH-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const newOrder = {
      id: generatedId,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      items: [...cart],
      currency: { ...currency },
      subtotal,
      discount,
      appliedPromo: appliedPromo ? { ...appliedPromo } : null,
      shipping,
      tax,
      total,
      shippingInfo: { ...formData },
      paymentMethod,
      trackingNumber: trackingCode,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
    };

    setOrderId(generatedId);
    setStep('success');

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#0284c7', '#f59e0b', '#10b981', '#ffffff']
      });
    } catch (err) {
      console.log('Confetti effect:', err);
    }

    onOrderCompleted(newOrder);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="checkout-modal-content" onClick={(e) => e.stopPropagation()}>
        <button id="checkout-close-btn" className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        {/* Step Indicators */}
        {step !== 'success' && (
          <div className="checkout-step-indicator">
            <div className={`step-item ${step === 'shipping' ? 'active' : ''}`}>
              <span className="step-num">1</span>
              <span>Delivery Details</span>
            </div>
            <span style={{ color: '#475569' }}>—</span>
            <div className={`step-item ${step === 'payment' ? 'active' : ''}`}>
              <span className="step-num">2</span>
              <span>Secure Payment</span>
            </div>
          </div>
        )}

        {/* Step 1: Shipping Form */}
        {step === 'shipping' && (
          <form onSubmit={handleProceedToPayment}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Shipping Information</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px' }}>
              Where should we dispatch your hardware?
            </p>

            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">Full Name</label>
                <input
                  id="checkout-name"
                  type="text"
                  name="fullName"
                  required
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Email Address for Dispatch Tracking</label>
                <input
                  id="checkout-email"
                  type="email"
                  name="email"
                  required
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Delivery Street Address</label>
                <input
                  id="checkout-address"
                  type="text"
                  name="address"
                  required
                  className="form-input"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">City / Region</label>
                <input
                  id="checkout-city"
                  type="text"
                  name="city"
                  required
                  className="form-input"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Country</label>
                <select
                  id="checkout-country"
                  name="country"
                  className="form-input"
                  value={formData.country}
                  onChange={handleInputChange}
                  style={{ background: '#0e121b' }}
                >
                  <option value="Ghana">Ghana</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                id="checkout-to-payment-btn"
                type="submit"
                className="btn-checkout-primary"
                style={{ width: 'auto', padding: '12px 28px' }}
              >
                <span>Continue to Payment ({currency.symbol}{total})</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Form */}
        {step === 'payment' && (
          <form onSubmit={handleCompleteOrder}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.3rem' }}>Select Payment Method</h3>
              <button
                type="button"
                onClick={() => setStep('shipping')}
                style={{ color: '#f5ba42', fontSize: '0.82rem' }}
              >
                ← Edit Address
              </button>
            </div>

            {/* Payment Method Tabs */}
            <div className="payment-method-selector">
              <div
                id="paymethod-card-btn"
                className={`payment-method-card ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={20} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Credit Card</div>
              </div>

              <div
                id="paymethod-momo-btn"
                className={`payment-method-card ${paymentMethod === 'momo' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('momo')}
              >
                <Smartphone size={20} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Mobile Money</div>
              </div>

              <div
                id="paymethod-instant-btn"
                className={`payment-method-card ${paymentMethod === 'applepay' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('applepay')}
              >
                <Sparkles size={20} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Instant Pay</div>
              </div>
            </div>

            {/* Method Details */}
            {paymentMethod === 'card' && (
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className="form-input"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="text"
                    name="cardExp"
                    className="form-input"
                    value={formData.cardExp}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">CVC / CVV</label>
                  <input
                    type="password"
                    name="cardCvc"
                    className="form-input"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'momo' && (
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">Network Provider</label>
                  <select
                    name="momoNetwork"
                    className="form-input"
                    value={formData.momoNetwork}
                    onChange={handleInputChange}
                    style={{ background: '#0e121b' }}
                  >
                    <option value="MTN MoMo">MTN Mobile Money (Ghana)</option>
                    <option value="Telecel Cash">Telecel Cash</option>
                    <option value="AT Money">AT Money</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Mobile Money Wallet Number</label>
                  <input
                    type="tel"
                    name="momoPhone"
                    className="form-input"
                    value={formData.momoPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <p style={{ gridColumn: 'span 2', fontSize: '0.78rem', color: '#94a3b8' }}>
                  A prompt will be sent to your phone to authorize the transaction of {currency.symbol}{total}.
                </p>
              </div>
            )}

            {paymentMethod === 'applepay' && (
              <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: '0.9rem', color: '#f8fafc', marginBottom: '8px' }}>
                  Biometric 1-Click Checkout
                </p>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Use Touch ID, Face ID, or Google Pay credentials on your device.
                </p>
              </div>
            )}

            {/* Total summary before payment */}
            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#94a3b8', marginBottom: '6px' }}>
                <span>Total Items ({cart.length})</span>
                <span>{currency.symbol}{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                <span>Final Amount Charged</span>
                <span style={{ color: '#f5ba42' }}>{currency.symbol}{total}</span>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#64748b' }}>
                <Lock size={14} />
                <span>256-Bit SSL Encrypted Transaction</span>
              </div>

              <button
                id="checkout-submit-order-btn"
                type="submit"
                className="btn-checkout-primary"
                style={{ width: 'auto', padding: '12px 28px' }}
              >
                <span>Authorize &amp; Pay {currency.symbol}{total}</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Order Completed / Success */}
        {step === 'success' && (
          <div className="order-success-view">
            <div className="success-icon-badge">
              <CheckCircle2 size={36} />
            </div>

            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Order Confirmed!</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '18px' }}>
              Thank you, <strong>{formData.fullName}</strong>. Your payment was authorized.
            </p>

            <div style={{ background: 'rgba(245, 186, 66, 0.12)', border: '1px solid rgba(245, 186, 66, 0.35)', padding: '16px', borderRadius: '12px', maxWidth: '380px', margin: '0 auto 24px' }}>
              <div style={{ fontSize: '0.75rem', color: '#f5ba42', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                Order Reference Code
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', letterSpacing: '0.05em', marginTop: '4px' }}>
                {orderId}
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '420px', margin: '0 auto 24px' }}>
              A confirmation receipt and courier tracking link have been dispatched to{' '}
              <strong style={{ color: '#fff' }}>{formData.email}</strong>.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                id="success-view-receipt-btn"
                className="btn-hero-secondary"
                style={{ padding: '12px 24px' }}
                onClick={() => {
                  onClose();
                  if (onOpenOrders) onOpenOrders(orderId);
                }}
              >
                <FileText size={16} />
                <span>View Digital Receipt</span>
              </button>
              <button
                id="success-done-btn"
                className="btn-hero-primary"
                style={{ padding: '12px 28px' }}
                onClick={onClose}
              >
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
