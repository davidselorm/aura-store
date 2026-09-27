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
    <nav className="mobile-dock" aria-label="Mobile Navigation">
      <div className="mobile-dock-inner">
        {/* Shop / Catalog Tab */}
        <button
          className="dock-item"
          onClick={onExplore}
          title="Browse Products"
        >
          <div className="dock-icon-wrap">
            <Compass size={20} />
          </div>
          <span className="dock-label">Shop</span>
        </button>

        {/* Saved Items Tab */}
        <button
          className="dock-item"
          onClick={onOpenWishlist}
          title="Saved Items"
        >
          <div className="dock-icon-wrap">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="dock-badge">{wishlistCount}</span>
            )}
          </div>
          <span className="dock-label">Saved</span>
        </button>

        {/* Orders Tab */}
        <button
          className="dock-item"
          onClick={onOpenOrders}
          title="Your Orders"
        >
          <div className="dock-icon-wrap">
            <Package size={20} />
            {ordersCount > 0 && (
              <span className="dock-badge green">{ordersCount}</span>
            )}
          </div>
          <span className="dock-label">Orders</span>
        </button>

        {/* Shopping Cart Tab */}
        <button
          className="dock-item primary-bag"
          onClick={onOpenCart}
          title="Shopping Cart"
        >
          <div className="dock-icon-wrap">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="dock-badge amber">{cartCount}</span>
            )}
          </div>
          <span className="dock-label">Cart</span>
        </button>
      </div>
    </nav>
  );
}
