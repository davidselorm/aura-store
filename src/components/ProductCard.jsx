import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingBag, Check } from 'lucide-react';

export default function ProductCard({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [justAdded, setJustAdded] = useState(false);

  const price = Math.round(product.price * currency.rate);
  const originalPrice = Math.round(product.originalPrice * currency.rate);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product, 1, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  // Get primary spec highlight if available
  const topSpecKey = product.specs ? Object.keys(product.specs)[0] : null;
  const topSpecVal = topSpecKey ? product.specs[topSpecKey] : null;

  return (
    <article className="product-card" id={`product-card-${product.id}`}>
      {/* Top Image Box */}
      <div className="card-image-box" onClick={() => onQuickView(product)}>
        {product.badge && (
          <span className="card-badge">
            <span>{product.badge}</span>
          </span>
        )}

        <button
          id={`wishlist-btn-${product.id}`}
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          title={isWishlisted ? 'Remove from saved' : 'Save for later'}
        >
          <Heart size={16} fill={isWishlisted ? '#f43f5e' : 'none'} color={isWishlisted ? '#f43f5e' : '#94a3b8'} />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />

        {/* Hover Quick View Trigger */}
        <div className="card-quick-overlay">
          <button
            id={`quick-view-btn-${product.id}`}
            className="btn-quick-view"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
          >
            <Eye size={15} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="card-content">
        <div className="card-meta-row">
          <span className="card-category">{product.category}</span>
          <div className="card-rating">
            <Star size={13} fill="#f5ba42" color="#f5ba42" />
            <span>{product.rating}</span>
            <span className="card-reviews-count">({product.reviewsCount})</span>
          </div>
        </div>

        <h3
          className="card-title"
          onClick={() => onQuickView(product)}
          style={{ cursor: 'pointer' }}
        >
          {product.name}
        </h3>

        <p className="card-tagline">{product.tagline}</p>

        {/* Color swatches & Key Spec Tag */}
        <div className="card-swatches-spec-row">
          {product.colors && product.colors.length > 0 && (
            <div className="card-color-swatches" onClick={(e) => e.stopPropagation()}>
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={`card-color-dot ${selectedColor?.name === color.name ? 'active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                />
              ))}
            </div>
          )}

          {topSpecVal && (
            <span className="card-spec-pill" title={`${topSpecKey}: ${topSpecVal}`}>
              {topSpecVal}
            </span>
          )}
        </div>

        {/* Card Footer with Price and Add to Cart */}
        <div className="card-footer">
          <div className="price-group">
            <div className="current-price">
              {currency.symbol}{price}
            </div>
            {originalPrice > price && (
              <span className="original-price">
                {currency.symbol}{originalPrice}
              </span>
            )}
          </div>

          <button
            id={`add-to-cart-btn-${product.id}`}
            className={`btn-add-cart ${justAdded ? 'added' : ''}`}
            onClick={handleAdd}
            disabled={!product.inStock}
          >
            {justAdded ? (
              <>
                <Check size={14} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
