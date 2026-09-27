import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
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
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [toasts, setToasts] = useState([]);

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
            quantity: qty
          }
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

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All Products' && item.category !== selectedCategory) {
        return false;
      }
      // In stock filter
      if (inStockOnly && !item.inStock) {
        return false;
      }
      // Search Query
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

  const handleOrderCompleted = () => {
    setCart([]);
    showToast('Payment successful! Your order has been placed.');
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
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
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
      <Footer onShowToast={showToast} />

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
      />

      {/* Toast Feedback */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
