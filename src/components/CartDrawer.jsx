import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { PROMO_CODES } from '../data/products';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout,
  appliedPromo,
  setAppliedPromo,
  onShowToast,
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  // Handle Escape key to close drawer
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

  // Calculations
  const FREE_SHIPPING_THRESHOLD_USD = 150;
  const rawSubtotalUSD = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = Math.round(rawSubtotalUSD * currency.rate);

  // Free shipping progress
  const progressPercent = Math.min(100, Math.round((rawSubtotalUSD / FREE_SHIPPING_THRESHOLD_USD) * 100));
  const diffUSD = Math.max(0, FREE_SHIPPING_THRESHOLD_USD - rawSubtotalUSD);
  const diffConverted = Math.round(diffUSD * currency.rate);

  // Discount calculation
  let discountUSD = 0;
  let isFreeShipping = rawSubtotalUSD >= FREE_SHIPPING_THRESHOLD_USD;

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
  const shipping = isFreeShipping || cart.length === 0 ? 0 : Math.round(15 * currency.rate);
  const tax = cart.length === 0 ? 0 : Math.round((rawSubtotalUSD - discountUSD) * 0.05 * currency.rate);
  const total = Math.max(0, subtotal - discount + shipping + tax);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, ...PROMO_CODES[code] });
      setPromoError('');
      onShowToast(`Promo applied: ${PROMO_CODES[code].description}`);
    } else {
      setPromoError('Invalid code. Try "AURA20" or "WELCOME10"');
    }
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <h3>
            <ShoppingBag size={20} color="#f5ba42" />
            <span>Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
          </h3>
          <button id="cart-drawer-close-btn" className="drawer-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="shipping-progress-box">
          <div className="shipping-text">
            {isFreeShipping ? (
              <span style={{ color: '#34d399', fontWeight: 600 }}>
                🎉 You've unlocked Free Express Shipping!
              </span>
            ) : (
              <span>
                Add <strong>{currency.symbol}{diffConverted}</strong> more for Free Shipping
              </span>
            )}
            <span>{progressPercent}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* Cart Items List */}
        {cart.length === 0 ? (
          <div className="empty-cart-state">
            <ShoppingBag size={48} />
            <h4>Your Bag is Empty</h4>
            <p style={{ fontSize: '0.85rem' }}>
              Explore our new hardware collection and find your flow.
            </p>
            <button
              id="empty-cart-shop-btn"
              className="btn-hero-primary"
              style={{ marginTop: '20px' }}
              onClick={onClose}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="drawer-items-list">
            {cart.map((item) => {
              const itemPrice = Math.round(item.price * currency.rate);
              return (
                <div key={`${item.id}-${item.selectedColor?.name || 'default'}`} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-thumb" />

                  <div className="cart-item-details">
                    <div>
                      <h4 className="cart-item-title">{item.name}</h4>
                      {item.selectedColor && (
                        <span className="cart-item-color">Color: {item.selectedColor.name}</span>
                      )}
                    </div>

                    <div className="cart-item-control-row">
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, item.selectedColor, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="qty-count">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, item.selectedColor, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-price">
                        {currency.symbol}{itemPrice * item.quantity}
                      </div>

                      <button
                        className="cart-item-delete"
                        onClick={() => onRemoveItem(item.id, item.selectedColor)}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer & Checkout Trigger */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="promo-input-row">
              <input
                id="cart-promo-input"
                type="text"
                placeholder='Enter "AURA20" or "WELCOME10"'
                className="promo-input"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
              />
              <button id="cart-apply-promo-btn" type="submit" className="promo-apply-btn">
                Apply
              </button>
            </form>
            {promoError && (
              <p style={{ color: '#f43f5e', fontSize: '0.75rem', marginBottom: '8px' }}>
                {promoError}
              </p>
            )}
            {appliedPromo && (
              <p style={{ color: '#10b981', fontSize: '0.78rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} /> Code {appliedPromo.code} applied ({appliedPromo.description})
              </p>
            )}

            {/* Summary Breakdown */}
            <div className="cart-summary-table">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{currency.symbol}{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="summary-line discount-text">
                  <span>Promo Discount</span>
                  <span>-{currency.symbol}{discount}</span>
                </div>
              )}
              <div className="summary-line">
                <span>Estimated Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `${currency.symbol}${shipping}`}</span>
              </div>
              <div className="summary-line">
                <span>Estimated Tax (5%)</span>
                <span>{currency.symbol}{tax}</span>
              </div>
              <div className="summary-line total">
                <span>Total Due</span>
                <span>{currency.symbol}{total}</span>
              </div>
            </div>

            <button
              id="drawer-proceed-checkout-btn"
              className="btn-checkout-primary"
              onClick={onProceedCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
