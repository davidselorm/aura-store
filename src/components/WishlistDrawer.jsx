import React, { useEffect } from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  currency,
  onRemoveFromWishlist,
  onMoveToCart,
}) {
  // Handle Escape key to close drawer
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <h3>
            <Heart size={20} color="#f43f5e" fill="#f43f5e" />
            <span>Saved Favorites ({wishlist.length})</span>
          </h3>
          <button id="wishlist-drawer-close-btn" className="drawer-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="empty-cart-state">
            <Heart size={48} color="#f43f5e" />
            <h4>No Saved Items Yet</h4>
            <p style={{ fontSize: '0.85rem' }}>
              Tap the heart icon on any product to save it for later review.
            </p>
            <button
              id="empty-wishlist-shop-btn"
              className="btn-hero-primary"
              style={{ marginTop: '20px' }}
              onClick={onClose}
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="drawer-items-list">
            {wishlist.map((item) => {
              const itemPrice = Math.round(item.price * currency.rate);
              return (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-thumb" />

                  <div className="cart-item-details">
                    <div>
                      <h4 className="cart-item-title">{item.name}</h4>
                      <span className="cart-item-color">{item.category}</span>
                    </div>

                    <div className="cart-item-control-row">
                      <div className="cart-item-price">
                        {currency.symbol}{itemPrice}
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          id={`wishlist-move-to-cart-${item.id}`}
                          className="btn-add-cart"
                          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                          onClick={() => {
                            onMoveToCart(item);
                            onRemoveFromWishlist(item.id);
                          }}
                        >
                          <ShoppingBag size={14} />
                          <span>Move to Bag</span>
                        </button>

                        <button
                          className="cart-item-delete"
                          onClick={() => onRemoveFromWishlist(item.id)}
                          title="Remove from favorites"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
