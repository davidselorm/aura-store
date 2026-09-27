import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrdersDrawer from './components/OrdersDrawer';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { PRODUCTS, CURRENCIES } from './data/products';
import { PackageSearch } from 'lucide-react';

export default function App() {
  // Global & Preferences state
  const [currency, setCurrency] = useState(CURRENCIES.USD);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // E-commerce state with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: PRODUCTS[0].id,
              name: PRODUCTS[0].name,
              price: PRODUCTS[0].price,
              image: PRODUCTS[0].image,
              selectedColor: PRODUCTS[0].colors[0],
              quantity: 1,
            },
          ];
    } catch {
      return [
        {
          id: PRODUCTS[0].id,
          name: PRODUCTS[0].name,
          price: PRODUCTS[0].price,
          image: PRODUCTS[0].image,
          selectedColor: PRODUCTS[0].colors[0],
          quantity: 1,
        },
      ];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1]];
    } catch {
      return [PRODUCTS[1]];
    }
  });

  // Orders State with localStorage persistence
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_orders');
      if (saved) return JSON.parse(saved);
      // Realistic starter order so user can immediately test telemetry & receipt
      return [
        {
          id: 'AUR-692104',
          createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
          status: 'In Transit',
          items: [
            {
              id: PRODUCTS[0].id,
              name: PRODUCTS[0].name,
              price: PRODUCTS[0].price,
              image: PRODUCTS[0].image,
              selectedColor: PRODUCTS[0].colors[0],
              quantity: 1,
            },
            {
              id: PRODUCTS[3].id,
              name: PRODUCTS[3].name,
              price: PRODUCTS[3].price,
              image: PRODUCTS[3].image,
              selectedColor: PRODUCTS[3].colors[0],
              quantity: 1,
            },
          ],
          currency: CURRENCIES.USD,
          subtotal: 348,
          discount: 30,
          appliedPromo: { code: 'SAVE30', description: '$30 off orders above $100' },
          shipping: 0,
          tax: 16,
          total: 334,
          shippingInfo: {
            fullName: 'David Selorm',
            email: 'davidselormwalker@gmail.com',
            address: '14 Independence Avenue',
            city: 'Accra',
            country: 'Ghana',
            postalCode: 'GA-102',
          },
          paymentMethod: 'momo',
          trackingNumber: 'DHL-GH-829104',
          estimatedDelivery: 'Tomorrow, by 4:00 PM',
        },
      ];
    } catch {
      return [];
    }
  });

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [toasts, setToasts] = useState([]);

  // LocalStorage synchronizers
  useEffect(() => {
    try {
      localStorage.setItem('aura_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to sync cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to sync wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to sync orders to localStorage', e);
    }
  }, [orders]);

  // Toast Helper
  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Operations
  const handleAddToCart = (product, qty = 1, color = null) => {
    const selectedColor = color || (product.colors && product.colors[0]) || null;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedColor?.name === selectedColor?.name
      );

      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex].quantity += qty;
        return nextCart;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            selectedColor,
            quantity: qty,
          },
        ];
      }
    });

    showToast(`Added ${product.name} to your Bag`);
  };

  const handleUpdateCartQty = (productId, color, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.selectedColor?.name === color?.name) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleRemoveCartItem = (productId, color) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedColor?.name === color?.name)
      )
    );
    showToast('Item removed from Bag');
  };

  // Wishlist Operations
  const handleToggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed from saved favorites`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved ${product.name} to favorites`);
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  // Orders Operations
  const handleOpenOrders = (orderId = null) => {
    setSelectedOrderId(orderId);
    setIsOrdersOpen(true);
  };

  const handleOrderCompleted = (newOrder) => {
    if (newOrder) {
      setOrders((prev) => [newOrder, ...prev]);
    }
    setCart([]);
    setAppliedPromo(null);
    showToast(`Order confirmed! Receipt dispatched to your email.`);
  };

  const handleReorder = (items) => {
    if (!items || items.length === 0) return;
    setCart((prevCart) => {
      const nextCart = [...prevCart];
      items.forEach((newItem) => {
        const idx = nextCart.findIndex(
          (c) => c.id === newItem.id && c.selectedColor?.name === newItem.selectedColor?.name
        );
        if (idx > -1) {
          nextCart[idx].quantity += newItem.quantity || 1;
        } else {
          nextCart.push({ ...newItem });
        }
      });
      return nextCart;
    });
    setIsCartOpen(true);
  };

  const handleLoadDemoOrder = () => {
    const demo = {
      id: `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: 'In Transit',
      items: [
        {
          id: PRODUCTS[1].id,
          name: PRODUCTS[1].name,
          price: PRODUCTS[1].price,
          image: PRODUCTS[1].image,
          selectedColor: PRODUCTS[1].colors[0],
          quantity: 1,
        },
      ],
      currency,
      subtotal: Math.round(PRODUCTS[1].price * currency.rate),
      discount: 0,
      appliedPromo: null,
      shipping: 0,
      tax: Math.round(PRODUCTS[1].price * 0.05 * currency.rate),
      total: Math.round(PRODUCTS[1].price * 1.05 * currency.rate),
      shippingInfo: {
        fullName: 'David Selorm',
        email: 'davidselormwalker@gmail.com',
        address: '14 Independence Avenue',
        city: 'Accra',
        country: 'Ghana',
        postalCode: 'GA-102',
      },
      paymentMethod: 'card',
      trackingNumber: `DHL-GH-${Math.floor(1000000 + Math.random() * 9000000)}`,
      estimatedDelivery: 'Wednesday, Sep 30',
    };
    setOrders((prev) => [demo, ...prev]);
    setSelectedOrderId(demo.id);
    setIsOrdersOpen(true);
    showToast('Sample order loaded into telemetry!');
  };

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (selectedCategory !== 'All Products' && item.category !== selectedCategory) {
        return false;
      }
      if (inStockOnly && !item.inStock) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesTagline = item.tagline.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesTagline && !matchesCategory && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, inStockOnly, searchQuery, sortBy]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleExploreScroll = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="app-container" id="top">
      {/* Top Notification Announcement */}
      <div className="announcement-bar">
        <span className="announcement-badge">Global Launch</span>
        <span>
          Enjoy Free Express Delivery on orders over $150 • MTN MoMo, Telecel Cash &amp; Cards Accepted
        </span>
      </div>

      {/* Navigation Bar */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        ordersCount={orders.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenOrders={() => handleOpenOrders(null)}
      />

      {/* Hero Showcase */}
      <HeroBanner
        onExplore={handleExploreScroll}
        onQuickView={(prod) => setQuickViewProduct(prod)}
        featuredProduct={PRODUCTS[0]}
        currency={currency}
      />

      {/* Category & Filter Bar */}
      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
      />

      {/* Product Catalog Grid */}
      <main className="catalog-section">
        <div className="catalog-header">
          <div className="catalog-title-group">
            <h2>
              <span>{selectedCategory}</span>
              <span className="catalog-count-badge">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </span>
            </h2>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-cart-state" style={{ minHeight: '300px' }}>
            <PackageSearch size={44} color="#64748b" />
            <h4>No products match your criteria</h4>
            <p style={{ fontSize: '0.88rem' }}>
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              className="btn-hero-secondary"
              style={{ marginTop: '16px' }}
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Products');
                setInStockOnly(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(prod) => setQuickViewProduct(prod)}
                onAddToCart={(prod) => handleAddToCart(prod, 1)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onShowToast={showToast}
        onOpenOrders={() => handleOpenOrders(null)}
      />

      {/* Quick View Product Modal */}
      <ProductModal
        key={quickViewProduct?.id || 'empty-modal'}
        product={quickViewProduct}
        currency={currency}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onDirectCheckout={() => {
          setQuickViewProduct(null);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={handleProceedCheckout}
        appliedPromo={appliedPromo}
        setAppliedPromo={setAppliedPromo}
        onShowToast={showToast}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        currency={currency}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={(item) => handleAddToCart(item, 1)}
      />

      {/* Multi-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        currency={currency}
        appliedPromo={appliedPromo}
        onOrderCompleted={handleOrderCompleted}
        onOpenOrders={(orderId) => handleOpenOrders(orderId)}
      />

      {/* Orders & Digital Receipt Drawer */}
      <OrdersDrawer
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        selectedOrderId={selectedOrderId}
        onSelectOrder={(id) => setSelectedOrderId(id)}
        onReorder={handleReorder}
        onLoadDemoOrder={handleLoadDemoOrder}
        onShowToast={showToast}
      />

      {/* Toast Feedback */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
