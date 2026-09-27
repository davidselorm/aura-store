import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Check, ArrowRight } from 'lucide-react';

export default function ProductModal({
  product,
  currency,
  isOpen,
  onClose,
  onAddToCart,
  onDirectCheckout,
}) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Sync selected color and reset quantity when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || null);
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

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
  if (!isOpen || !product) return null;

  const price = Math.round(product.price * currency.rate);
  const originalPrice = Math.round(product.originalPrice * currency.rate);

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleDirectBuy = () => {
    onAddToCart(product, quantity, selectedColor);
    onDirectCheckout();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button id="modal-close-btn" className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        {/* Left Column: Product Image */}
        <div className="modal-image-col">
          <img
            src={product.image}
            alt={product.name}
            className="modal-product-img"
          />
        </div>

        {/* Right Column: Details & Specs */}
        <div className="modal-info-col">
          <span className="modal-category-tag">{product.category}</span>
          <h2 className="modal-title">{product.name}</h2>

          <div className="modal-price-row">
            <span className="current-price" style={{ fontSize: '1.6rem' }}>
              {currency.symbol}{price}
            </span>
            {originalPrice > price && (
              <span className="original-price" style={{ fontSize: '1rem' }}>
                {currency.symbol}{originalPrice}
              </span>
            )}
            <div className="card-rating" style={{ marginLeft: 'auto' }}>
              <Star size={14} fill="#f59e0b" />
              <span>{product.rating}</span>
              <span className="card-reviews-count">({product.reviewsCount} reviews)</span>
            </div>
          </div>

          <p className="modal-desc">{product.description}</p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="modal-color-select">
              <div className="modal-section-label">
                Color: <span style={{ color: '#fff' }}>{selectedColor?.name}</span>
              </div>
              <div className="color-swatches">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`color-swatch-btn ${selectedColor?.name === color.name ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Feature Highlights */}
          <div className="modal-section-label">Key Highlights</div>
          <ul className="modal-features-list">
            {product.features?.map((f, i) => (
              <li key={i} className="modal-feature-item">
                <span className="modal-feature-bullet">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Specs Table */}
          {product.specs && (
            <div style={{ marginBottom: '24px' }}>
              <div className="modal-section-label">Technical Specifications</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8rem', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key}>
                    <span style={{ color: '#94a3b8' }}>{key}: </span>
                    <strong style={{ color: '#f8fafc' }}>{val}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions & Quantity */}
          <div className="modal-actions-row">
            <div className="qty-control" style={{ height: '46px' }}>
              <button
                className="qty-btn"
                style={{ width: '38px', height: '100%' }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="qty-count" style={{ width: '38px' }}>
                {quantity}
              </span>
              <button
                className="qty-btn"
                style={{ width: '38px', height: '100%' }}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              id="modal-add-to-cart-btn"
              className="btn-hero-primary"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={handleAddToCart}
            >
              {added ? (
                <>
                  <Check size={18} />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            <button
              id="modal-buy-now-btn"
              className="btn-hero-secondary"
              onClick={handleDirectBuy}
            >
              <span>Instant Buy</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
