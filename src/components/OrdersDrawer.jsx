import React, { useState, useEffect } from 'react';
import {
  X,
  Package,
  PackageSearch,
  CheckCircle2,
  Truck,
  Printer,
  Copy,
  Check,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  Smartphone,
} from 'lucide-react';

export default function OrdersDrawer({
  isOpen,
  onClose,
  orders,
  onSelectOrder,
  selectedOrderId,
  onReorder,
  onLoadDemoOrder,
  onShowToast,
}) {
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'receipt'

  // Sync activeTab when selectedOrderId changes
  useEffect(() => {
    if (selectedOrderId) {
      setActiveTab('receipt');
    }
  }, [selectedOrderId]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentOrder = orders.find((o) => o.id === selectedOrderId) || orders[0] || null;

  const handleCopyTracking = (tracking) => {
    if (!tracking) return;
    navigator.clipboard?.writeText(tracking);
    setCopiedTracking(true);
    if (onShowToast) onShowToast(`Tracking #${tracking} copied to clipboard`);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div
        className="drawer-panel orders-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {activeTab === 'receipt' && orders.length > 1 && (
              <button
                className="nav-icon-btn"
                style={{ width: '30px', height: '30px', padding: 0 }}
                onClick={() => setActiveTab('all')}
                title="Back to all orders"
              >
                <ArrowLeft size={16} />
              </button>
            )}
            <h3>
              <Package size={20} color="#f5ba42" />
              <span>
                {activeTab === 'receipt' && currentOrder
                  ? `Order #${currentOrder.id}`
                  : `Your Orders (${orders.length})`}
              </span>
            </h3>
          </div>
          <button id="orders-drawer-close-btn" className="drawer-close-btn" onClick={onClose} title="Close orders">
            <X size={18} />
          </button>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="empty-cart-state" style={{ padding: '60px 24px', textAlign: 'center' }}>
            <PackageSearch size={52} color="#64748b" style={{ margin: '0 auto 16px' }} />
            <h4>No Orders Yet</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '340px', margin: '0 auto 20px' }}>
              When you place an order, its delivery status and receipt details will appear here.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="btn-hero-primary" onClick={onClose}>
                Browse Products
              </button>
              {onLoadDemoOrder && (
                <button
                  className="btn-hero-secondary"
                  onClick={onLoadDemoOrder}
                  title="Generate a sample order to test the receipt view"
                >
                  <span>Preview Sample Order</span>
                </button>
              )}
            </div>
          </div>
        ) : activeTab === 'receipt' && currentOrder ? (
          /* ==============================================================
             SINGLE ORDER RECEIPT VIEW
             ============================================================== */
          <div className="receipt-scroll-container">
            {/* Status Banner */}
            <div className="receipt-telemetry-banner">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <span className="telemetry-badge">
                    Delivery Status
                  </span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
                    {currentOrder.status || 'Confirmed'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                    Placed on {formatDate(currentOrder.createdAt)}
                  </div>
                </div>

                <button
                  className="receipt-print-btn"
                  onClick={handlePrint}
                  title="Print receipt or save as PDF"
                >
                  <Printer size={15} />
                  <span>Print Receipt</span>
                </button>
              </div>

              {/* Status Timeline */}
              <div className="status-timeline">
                <div className="timeline-step completed">
                  <div className="step-icon">
                    <CheckCircle2 size={14} />
                  </div>
                  <div className="step-label">Placed</div>
                </div>
                <div className="timeline-connector completed"></div>
                <div className="timeline-step completed">
                  <div className="step-icon">
                    <CheckCircle2 size={14} />
                  </div>
                  <div className="step-label">Processing</div>
                </div>
                <div className="timeline-connector active"></div>
                <div className="timeline-step active">
                  <div className="step-icon">
                    <Truck size={14} />
                  </div>
                  <div className="step-label">Shipped</div>
                </div>
                <div className="timeline-connector"></div>
                <div className="timeline-step">
                  <div className="step-icon">
                    <CheckCircle2 size={14} />
                  </div>
                  <div className="step-label">Delivered</div>
                </div>
              </div>
            </div>

            {/* Courier & Tracking Box */}
            <div className="receipt-courier-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', fontWeight: 700 }}>
                    Tracking Number
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f5ba42', letterSpacing: '0.04em', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{currentOrder.trackingNumber || 'DHL-GH-8392104'}</span>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopyTracking(currentOrder.trackingNumber || 'DHL-GH-8392104')}
                      title="Copy tracking code"
                    >
                      {copiedTracking ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', fontWeight: 700 }}>
                    Estimated Delivery
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                    {currentOrder.estimatedDelivery || 'Within 2-3 business days'}
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Payment Info Grid */}
            <div className="receipt-meta-grid">
              <div className="receipt-meta-card">
                <div className="meta-card-title">Shipping Address</div>
                <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.88rem' }}>
                  {currentOrder.shippingInfo?.fullName || 'Customer'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                  {currentOrder.shippingInfo?.address || '14 Independence Avenue'},{' '}
                  {currentOrder.shippingInfo?.city || 'Accra'},{' '}
                  {currentOrder.shippingInfo?.country || 'Ghana'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                  {currentOrder.shippingInfo?.email}
                </div>
              </div>

              <div className="receipt-meta-card">
                <div className="meta-card-title">Payment Method</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#f8fafc', fontSize: '0.88rem' }}>
                  {currentOrder.paymentMethod === 'momo' ? (
                    <>
                      <Smartphone size={15} color="#f5ba42" />
                      <span>{currentOrder.shippingInfo?.momoNetwork || 'MTN Mobile Money'}</span>
                    </>
                  ) : currentOrder.paymentMethod === 'applepay' ? (
                    <>
                      <span>Apple Pay</span>
                    </>
                  ) : (
                    <>
                      <CreditCard size={15} color="#f5ba42" />
                      <span>Card ending in 8892</span>
                    </>
                  )}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} />
                  <span>Paid successfully</span>
                </div>
              </div>
            </div>

            {/* Purchased Items List */}
            <div className="receipt-items-section">
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', fontWeight: 700, marginBottom: '10px' }}>
                Items Ordered ({currentOrder.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 1})
              </div>

              <div className="receipt-items-list">
                {currentOrder.items?.map((item, idx) => {
                  const unitPrice = Math.round(item.price * (currentOrder.currency?.rate || 1));
                  const itemTotal = unitPrice * (item.quantity || 1);
                  return (
                    <div key={`${item.id}-${idx}`} className="receipt-item-row">
                      <img src={item.image} alt={item.name} className="receipt-item-thumb" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="receipt-item-name">{item.name}</div>
                        {item.selectedColor && (
                          <div style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                            <span
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: item.selectedColor.hex || '#fff',
                                display: 'inline-block',
                              }}
                            />
                            <span>{item.selectedColor.name}</span>
                          </div>
                        )}
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                          Qty: {item.quantity || 1} × {currentOrder.currency?.symbol || '$'}{unitPrice}
                        </div>
                      </div>
                      <div className="receipt-item-total">
                        {currentOrder.currency?.symbol || '$'}{itemTotal}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Financial Breakdown Table */}
            <div className="cart-summary-table" style={{ marginTop: '16px' }}>
              <div className="summary-line">
                <span>Subtotal</span>
                <span>
                  {currentOrder.currency?.symbol || '$'}{currentOrder.subtotal}
                </span>
              </div>
              {currentOrder.discount > 0 && (
                <div className="summary-line discount-text">
                  <span>Promo Discount ({currentOrder.appliedPromo?.code || 'PROMO'})</span>
                  <span>
                    -{currentOrder.currency?.symbol || '$'}{currentOrder.discount}
                  </span>
                </div>
              )}
              <div className="summary-line">
                <span>Shipping</span>
                <span>
                  {currentOrder.shipping === 0
                    ? 'FREE'
                    : `${currentOrder.currency?.symbol || '$'}${currentOrder.shipping}`}
                </span>
              </div>
              <div className="summary-line">
                <span>Estimated Tax (5%)</span>
                <span>
                  {currentOrder.currency?.symbol || '$'}{currentOrder.tax}
                </span>
              </div>
              <div className="summary-line total">
                <span>Total Paid</span>
                <span>
                  {currentOrder.currency?.symbol || '$'}{currentOrder.total}
                </span>
              </div>
            </div>

            {/* Reorder and Back Actions */}
            <div style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                className="btn-checkout-primary"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => {
                  if (onReorder) onReorder(currentOrder.items);
                  if (onShowToast) onShowToast('Items from this order added to your cart!');
                  onClose();
                }}
              >
                <ShoppingBag size={16} />
                <span>Reorder Items</span>
              </button>

              {orders.length > 1 && (
                <button
                  className="btn-hero-secondary"
                  onClick={() => setActiveTab('all')}
                  style={{ padding: '12px 18px' }}
                >
                  <span>All Orders</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* ==============================================================
             ALL ORDERS LIST VIEW
             ============================================================== */
          <div className="orders-list-container">
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '16px' }}>
              A record of your recent orders placed from this browser.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {orders.map((order) => {
                const totalUnits = order.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 1;
                return (
                  <div
                    key={order.id}
                    className="order-card-summary"
                    onClick={() => {
                      if (onSelectOrder) onSelectOrder(order.id);
                      setActiveTab('receipt');
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                          Order #{order.id}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '2px' }}>
                          {formatDate(order.createdAt)}
                        </div>
                      </div>

                      <span
                        className={`status-pill ${
                          order.status === 'Delivered'
                            ? 'delivered'
                            : order.status === 'In Transit' || order.status === 'Shipped'
                            ? 'transit'
                            : 'confirmed'
                        }`}
                      >
                        {order.status || 'Confirmed'}
                      </span>
                    </div>

                    {/* Thumbs preview */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      {order.items?.slice(0, 4).map((it, idx) => (
                        <img
                          key={idx}
                          src={it.image}
                          alt={it.name}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '6px',
                            objectFit: 'cover',
                            background: '#1a2233',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        />
                      ))}
                      {order.items?.length > 4 && (
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '6px',
                            background: 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            color: '#94a3b8',
                            fontWeight: 700,
                          }}
                        >
                          +{order.items.length - 4}
                        </div>
                      )}

                      <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          {totalUnits} {totalUnits === 1 ? 'item' : 'items'}
                        </div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f5ba42' }}>
                          {order.currency?.symbol || '$'}{order.total}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                        Tracking: {order.trackingNumber || 'DHL Express'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#f5ba42', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>View Details</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
