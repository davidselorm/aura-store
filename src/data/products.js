export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)' },
  GHS: { code: 'GHS', symbol: 'GH₵', rate: 15.8, label: 'GHS (GH₵)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78, label: 'GBP (£)' },
};

export const PROMO_CODES = {
  'AURA20': { type: 'percent', value: 20, description: '20% off entire cart' },
  'WELCOME10': { type: 'percent', value: 10, description: '10% welcome discount' },
  'FREESHIP': { type: 'shipping', value: 100, description: 'Free Express Shipping' },
  'SAVE30': { type: 'fixed', value: 30, description: '$30 off orders above $100' },
};

export const PRODUCTS = [
  {
    id: 'aura-headphone-one',
    name: 'AURA Sonic Pro ANC Headphones',
    tagline: 'Lossless Spatial Audio & Hybrid Active Noise Cancellation',
    category: 'Audio',
    price: 249,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 384,
    image: '/images/products/headphones.jpg',
    inStock: true,
    stockCount: 14,
    badge: 'Flagship Drop',
    colors: [
      { name: 'Matte Obsidian', hex: '#1a1a1c' },
      { name: 'Lunar Platinum', hex: '#d1d5db' },
      { name: 'Rose Gold Accent', hex: '#b76e79' }
    ],
    description: 'Engineered for audiophiles and high-focus creators. Custom 45mm neodymium drivers, dual micro-processors for real-time 48dB noise reduction, and an ultra-plush memory foam seal for all-day comfort.',
    features: [
      'Adaptive Hybrid ANC up to 48dB with transparency pass-through',
      'Ultra-low latency Bluetooth 5.4 with aptX HD lossless streaming',
      'Up to 55 hours playback with ANC off (42 hours with ANC on)',
      '15-minute quick charge delivers 6 hours of continuous listening'
    ],
    specs: {
      'Driver Size': '45mm Custom Neodymium',
      'Frequency Response': '10Hz – 40,000Hz',
      'Battery Life': '55 Hours',
      'Weight': '255g',
      'Microphones': '6 MEMS Beamforming Array'
    }
  },
  {
    id: 'aura-keeb-75',
    name: 'AURA Keeb 75 Custom Mechanical Keyboard',
    tagline: 'Gasket-Mounted CNC Aluminum Chassis with Brass Rotary Encoder',
    category: 'Keyboards',
    price: 189,
    originalPrice: 229,
    rating: 5.0,
    reviewsCount: 291,
    image: '/images/products/keyboard.jpg',
    inStock: true,
    stockCount: 8,
    badge: 'Community Favorite',
    colors: [
      { name: 'Graphite Slate', hex: '#2b2d35' },
      { name: 'Anodized Silver', hex: '#c5c8d0' },
      { name: 'Forest Matcha', hex: '#415343' }
    ],
    description: 'Precision milled from a single block of aerospace aluminum. Features factory-lubed custom linear switches, hot-swappable PCB, poron dampening foam, and a weighted brass knob for volume and media scrub.',
    features: [
      'Gasket-mounted acoustic dampening for deep, satisfying thock',
      'Tri-mode connectivity: 2.4GHz Ultra-Fast, Bluetooth 5.2, USB-C',
      'Double-shot PBT cherry profile keycaps with amber underglow',
      'Hot-swappable 5-pin switches with VIA/QMK reprogrammable firmware'
    ],
    specs: {
      'Layout': '75% Compact (82 Keys)',
      'Switches': 'Aura Linear Cream (Factory Lubed)',
      'Plate Material': 'FR4 / Brass Hybrid',
      'Weight': '1.42 kg',
      'Backlight': 'Warm Amber / Per-key RGB'
    }
  },
  {
    id: 'aura-titan-chronos',
    name: 'TITANUS Chrono Sapphire Smartwatch',
    tagline: 'Milled Titanium Case with Curved Sapphire Glass OLED Display',
    category: 'Wearables',
    price: 349,
    originalPrice: 399,
    rating: 4.8,
    reviewsCount: 172,
    image: '/images/products/smartwatch.jpg',
    inStock: true,
    stockCount: 5,
    badge: 'Limited Edition',
    colors: [
      { name: 'Brushed Titanium', hex: '#6b7280' },
      { name: 'Midnight DLC', hex: '#111827' }
    ],
    description: 'A seamless blend of classical horology and modern telemetry. Housed in grade-5 titanium with a sapphire crystal touch face, continuous health biometrics, and a 14-day battery reserve.',
    features: [
      'Always-on 1.43-inch 1,000 nit high-density AMOLED display',
      'Multi-band dual-frequency GNSS GPS with offline topographic maps',
      'Advanced biometric tracking: ECG, SpO2, Heart Rate Variability & Sleep Score',
      '50m Water Resistance (5 ATM) for swimming and open-water navigation'
    ],
    specs: {
      'Case Material': 'Grade-5 Aerospace Titanium',
      'Glass': 'Scratch-Proof Curved Sapphire',
      'Battery Life': 'Up to 14 Days Normal Usage',
      'Sensors': 'Optical PPG, Bioimpedance, Compass, Barometer',
      'Connectivity': 'Bluetooth 5.3 BLE & NFC Contactless Pay'
    }
  },
  {
    id: 'aura-ergoglide-mouse',
    name: 'AURA ErgoGlide Precision Wireless Mouse',
    tagline: 'Contoured Sculpted Grip with Machined Aluminum Free-Spin Wheel',
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
      { name: 'Matte Charcoal', hex: '#1f242e' },
      { name: 'Chalk White', hex: '#f3f4f6' }
    ],
    description: 'Crafted for designers, developers, and power users. Hand-sculpted ergonomic profile reduces wrist strain by 35%. Dual scroll modes with infinite inertia spin and hyper-accurate 26,000 DPI optical sensor.',
    features: [
      'Machined aluminum MagSpeed scroll wheel with silent ratchet mode',
      'PixArt 26K DPI optical sensor that tracks flawlessly even on glass',
      'Seamless Multi-Device switching across 3 laptops/desktops with Flow',
      'Silent tactile mechanical switches rated for 70 million clicks'
    ],
    specs: {
      'Sensor': 'PixArt PAW3395 (26,000 DPI)',
      'Battery Life': 'Up to 70 Days per charge',
      'Weight': '88g Balanced',
      'Charging': 'USB-C Fast Charging (1 min = 3 hours use)'
    }
  },
  {
    id: 'aura-halo-lightbar',
    name: 'AURA Halo Horizon Monitor Light Bar',
    tagline: 'Asymmetric Zero-Glare Screen Glow with Ambient Wall Halo Backlight',
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
      { name: 'Anodized Space Gray', hex: '#374151' }
    ],
    description: 'Eliminates monitor reflection and reduces evening eye fatigue. Patented 45-degree asymmetric optical design casts light exclusively on your desk surface, while the rear RGB ambient halo casts soft back-illumination.',
    features: [
      'Dual light sources: Front focused reading light + Rear ambient mood halo',
      'Wireless 2.4G puck controller with stepless dial for brightness and color temp',
      'Stepless color temperature adjustment from warm 2700K to daylight 6500K',
      'CRI ≥ 97 for faithful color reproduction and graphic fidelity'
    ],
    specs: {
      'Color Temp': '2700K – 6500K Tunable',
      'Color Rendering': 'Ra97 High CRI',
      'Controller': 'Wireless Desktop Rotary Puck',
      'Compatibility': 'Flat & Curved Monitors (0.5cm - 4.5cm thickness)'
    }
  },
  {
    id: 'aura-quanta-charger',
    name: 'QUANTA Glass Qi2 Wireless Fast Pad',
    tagline: 'Milled Aluminum Base with Tempered Glass & Pulse Cyan Status Halo',
    category: 'Charging',
    price: 65,
    originalPrice: 79,
    rating: 4.9,
    reviewsCount: 165,
    image: '/images/products/charger.jpg',
    inStock: true,
    stockCount: 31,
    badge: 'New Release',
    colors: [
      { name: 'Gunmetal Glass', hex: '#1e293b' },
      { name: 'Silver Frost', hex: '#e2e8f0' }
    ],
    description: 'Next-generation Qi2 wireless standard delivering a guaranteed 15W high-efficiency inductive charge without heat throttling. Features a frosted crystal top surface and gentle status breathing ring.',
    features: [
      'Official Qi2 certified 15W magnetic rapid wireless power delivery',
      'Internal whisper-quiet thermal dissipation fins prevent battery heat degradation',
      'Intelligent Foreign Object Detection (FOD) with auto power cutoff',
      'Includes premium braided 1.8m Kevlar reinforced USB-C to C cable'
    ],
    specs: {
      'Max Output': '15W Fast Charge (Qi2 & MagSafe)',
      'Input': '9V/2.22A, 12V/1.67A Type-C',
      'Materials': 'CNC Aluminum & Tempered Ion-Glass',
      'Thickness': 'Only 6.2mm ultra-slim profile'
    }
  }
];

export const CATEGORIES = ['All Products', 'Audio', 'Keyboards', 'Wearables', 'Desk Setup', 'Charging'];
