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
  const [justAdded, setJustAdded] = useState(false);

  const price = Math.round(product.price * currency.rate);
  const originalPrice = Math.round(product.originalPrice * currency.rate);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="product-card" id={`product-card-${product.id}`}>
      {/* Top Image Box */}
      <div className="card-image-box" onClick={() => onQuickView(product)}>
        {product.badge && <span className="card-badge">{product.badge}</span>}

        <button
          id={`wishlist-btn-${product.id}`}
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? '#f43f5e' : 'none'} />
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
            <span>Quick Specs &amp; Details</span>
          </button>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="card-content">
        <div className="card-meta-row">
          <span className="card-category">{product.category}</span>
          <div className="card-rating">
            <Star size={13} fill="#f59e0b" />
            <span>{product.rating}</span>
            <span className="card-reviews-count">({product.reviewsCount})</span>
          </div>
        </div>

        <h3 className="card-title" onClick={() => onQuickView(product)} style={{ cursor: 'pointer' }}>
          {product.name}
        </h3>

        <p className="card-tagline">{product.tagline}</p>

        {/* Card Footer with Price and Add to Bag */}
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
                <Check size={16} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={15} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
