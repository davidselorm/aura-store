export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)' },
  GHS: { code: 'GHS', symbol: 'GH₵', rate: 15.8, label: 'GHS (GH₵)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78, label: 'GBP (£)' },
};

export const PROMO_CODES = {
  'AURA20': { type: 'percent', value: 20, description: '20% off your order' },
  'WELCOME10': { type: 'percent', value: 10, description: '10% off your first order' },
  'FREESHIP': { type: 'shipping', value: 100, description: 'Free standard shipping' },
  'SAVE30': { type: 'fixed', value: 30, description: '$30 off orders over $100' },
};

export const PRODUCTS = [
  {
    id: 'aura-headphone-one',
    name: 'AURA Sonic Pro Wireless Headphones',
    tagline: 'High-fidelity wireless sound with active noise cancellation',
    category: 'Audio',
    price: 249,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 384,
    image: '/images/products/headphones.jpg',
    inStock: true,
    stockCount: 14,
    badge: 'Featured',
    colors: [
      { name: 'Matte Black', hex: '#1a1a1c' },
      { name: 'Silver Gray', hex: '#d1d5db' },
      { name: 'Rose Gold', hex: '#b76e79' }
    ],
    description: 'Comfortable over-ear headphones with rich sound, active noise cancellation, and a long-lasting battery. Perfect for work, travel, and everyday listening.',
    features: [
      'Active noise cancellation with transparency mode',
      'Bluetooth 5.4 for fast and stable connection',
      'Up to 55 hours of battery life on a single charge',
      'Fast charging: 15 minutes gives you 6 hours of playback'
    ],
    specs: {
      'Driver Size': '45mm drivers',
      'Frequency Range': '10Hz – 40,000Hz',
      'Battery Life': 'Up to 55 hours',
      'Weight': '255g',
      'Connectivity': 'Bluetooth 5.4 and 3.5mm cable'
    }
  },
  {
    id: 'aura-keeb-75',
    name: 'AURA Keeb 75 Mechanical Keyboard',
    tagline: 'Compact aluminum mechanical keyboard with smooth linear switches',
    category: 'Keyboards',
    price: 189,
    originalPrice: 229,
    rating: 5.0,
    reviewsCount: 291,
    image: '/images/products/keyboard.jpg',
    inStock: true,
    stockCount: 8,
    badge: 'Popular',
    colors: [
      { name: 'Dark Slate', hex: '#2b2d35' },
      { name: 'Silver', hex: '#c5c8d0' },
      { name: 'Forest Green', hex: '#415343' }
    ],
    description: 'A solid aluminum mechanical keyboard built for smooth typing. Comes with hot-swappable switches, sound dampening foam, and a metal volume knob.',
    features: [
      'Gasket mount design for a quiet and comfortable typing feel',
      'Three connection modes: Wireless USB, Bluetooth, and USB-C cable',
      'Durable PBT keycaps with soft warm backlighting',
      'Hot-swappable switch sockets for easy customization'
    ],
    specs: {
      'Layout': '75% compact (82 keys)',
      'Switches': 'Pre-lubed linear switches',
      'Frame': 'Solid aluminum body',
      'Weight': '1.4 kg',
      'Backlight': 'Warm white / amber backlight'
    }
  },
  {
    id: 'aura-titan-chronos',
    name: 'AURA Chrono Titanium Smartwatch',
    tagline: 'Durable titanium smartwatch with sapphire glass and AMOLED display',
    category: 'Wearables',
    price: 349,
    originalPrice: 399,
    rating: 4.8,
    reviewsCount: 172,
    image: '/images/products/smartwatch.jpg',
    inStock: true,
    stockCount: 5,
    badge: 'Top Pick',
    colors: [
      { name: 'Titanium Gray', hex: '#6b7280' },
      { name: 'Midnight Black', hex: '#111827' }
    ],
    description: 'A sleek smartwatch built from lightweight titanium and scratch-resistant sapphire glass. Tracks your daily activity, heart rate, sleep, and workouts with up to 14 days of battery.',
    features: [
      'Bright 1.43-inch AMOLED screen that is easy to read outdoors',
      'Built-in GPS for accurate walking, running, and cycling',
      'Health tracking: heart rate, blood oxygen, and sleep score',
      'Water resistant up to 50 meters (5 ATM)'
    ],
    specs: {
      'Case Material': 'Grade-5 titanium',
      'Glass': 'Scratch-resistant sapphire crystal',
      'Battery Life': 'Up to 14 days',
      'Water Resistance': '50 meters (5 ATM)',
      'Compatibility': 'iOS and Android'
    }
  },
  {
    id: 'aura-ergoglide-mouse',
    name: 'AURA ErgoGlide Wireless Mouse',
    tagline: 'Comfortable ergonomic mouse with dual-mode metal scroll wheel',
    category: 'Desk Setup',
    price: 99,
    originalPrice: 120,
    rating: 4.9,
    reviewsCount: 512,
    image: '/images/products/mouse.jpg',
    inStock: true,
    stockCount: 22,
    badge: 'Best Seller',
    colors: [
      { name: 'Charcoal', hex: '#1f242e' },
      { name: 'Off White', hex: '#f3f4f6' }
    ],
    description: 'Designed for all-day comfort at your desk. Features a sculpted shape that supports your hand, a fast metal scroll wheel, and quiet click buttons.',
    features: [
      'High-speed metal scroll wheel with smooth and ratchet modes',
      'Precise optical sensor that works on almost any desk surface',
      'Connects to up to 3 computers with easy button switching',
      'Quiet clicks that keep your workspace calm'
    ],
    specs: {
      'Sensor': '26,000 DPI optical sensor',
      'Battery Life': 'Up to 70 days per charge',
      'Weight': '88g',
      'Charging': 'USB-C fast charge'
    }
  },
  {
    id: 'aura-halo-lightbar',
    name: 'AURA Horizon Monitor Light Bar',
    tagline: 'Screen-mounted desk lamp with wireless remote control dial',
    category: 'Desk Setup',
    price: 119,
    originalPrice: 145,
    rating: 4.7,
    reviewsCount: 240,
    image: '/images/products/lightbar.jpg',
    inStock: true,
    stockCount: 19,
    badge: 'Popular',
    colors: [
      { name: 'Space Gray', hex: '#374151' }
    ],
    description: 'Clips directly onto your monitor to light up your desk without casting glare onto your screen. Includes a wireless desktop dial to adjust brightness and warmth.',
    features: [
      'Asymmetric lighting casts light on your desk with zero screen reflection',
      'Wireless desktop knob to control brightness and color temperature',
      'Adjustable warmth from cozy warm white (2700K) to crisp daylight (6500K)',
      'Rear ambient backlight for comfortable evening work'
    ],
    specs: {
      'Color Temperature': '2700K – 6500K adjustable',
      'Color Accuracy': 'Ra97 high CRI',
      'Controller': 'Wireless desktop dial',
      'Mounting': 'Fits flat and curved computer monitors'
    }
  },
  {
    id: 'aura-quanta-charger',
    name: 'AURA Quanta Fast Wireless Charger',
    tagline: '15W magnetic wireless charging pad with aluminum base',
    category: 'Charging',
    price: 65,
    originalPrice: 79,
    rating: 4.9,
    reviewsCount: 165,
    image: '/images/products/charger.jpg',
    inStock: true,
    stockCount: 31,
    badge: 'New',
    colors: [
      { name: 'Dark Gray', hex: '#1e293b' },
      { name: 'Silver White', hex: '#e2e8f0' }
    ],
    description: 'Fast and reliable 15W wireless charging for your phone and earbuds. Made with an aluminum base and durable tempered glass top.',
    features: [
      'Fast 15W Qi2 and MagSafe compatible wireless charging',
      'Built-in heat protection keeps your phone battery healthy',
      'Subtle indicator light that does not disturb your room at night',
      'Includes a durable 1.8m braided USB-C cable'
    ],
    specs: {
      'Max Output': '15W fast charge',
      'Input': 'USB-C fast charge',
      'Materials': 'Aluminum base and tempered glass',
      'Thickness': '6.2mm slim profile'
    }
  }
];

export const CATEGORIES = ['All Products', 'Audio', 'Keyboards', 'Wearables', 'Desk Setup', 'Charging'];
