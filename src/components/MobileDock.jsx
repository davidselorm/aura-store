import React from 'react';
import { Compass, Heart, Package, ShoppingBag } from 'lucide-react';

export default function MobileDock({
  cartCount,
  wishlistCount,
  ordersCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  onExplore,
}) {
  return (
    <nav className="mobile-cyber-dock" aria-label="Mobile Navigation Dock">
      <div className="mobile-dock-inner">
        {/* Explore / Catalog Tab */}
        <button
          className="dock-item"
          onClick={onExplore}
          title="Explore Hardware Catalog"
        >
          <div className="dock-icon-wrap">
            <Compass size={20} />
          </div>
          <span className="dock-label">Studio</span>
        </button>

        {/* Wishlist Tab */}
        <button
          className="dock-item"
          onClick={onOpenWishlist}
          title="Saved Favorites"
        >
          <div className="dock-icon-wrap">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="dock-badge">{wishlistCount}</span>
            )}
          </div>
          <span className="dock-label">Favorites</span>
        </button>

        {/* Orders & Telemetry Tab */}
        <button
          className="dock-item"
          onClick={onOpenOrders}
          title="Telemetry & Receipts"
        >
          <div className="dock-icon-wrap">
            <Package size={20} />
            {ordersCount > 0 && (
              <span className="dock-badge green">{ordersCount}</span>
            )}
          </div>
          <span className="dock-label">Telemetry</span>
        </button>

        {/* Shopping Bag Tab */}
        <button
          className="dock-item primary-bag"
          onClick={onOpenCart}
          title="Shopping Bag"
        >
          <div className="dock-icon-wrap">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="dock-badge amber">{cartCount}</span>
            )}
          </div>
          <span className="dock-label">Bag</span>
        </button>
      </div>
    </nav>
  );
}
