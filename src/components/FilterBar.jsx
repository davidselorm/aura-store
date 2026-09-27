import React from 'react';
import { CATEGORIES } from '../data/products';
import { Headphones, Keyboard, Watch, Mouse, Sparkles, SlidersHorizontal, Check } from 'lucide-react';

const CATEGORY_ICONS = {
  'All Products': <Sparkles size={14} />,
  'Audio': <Headphones size={14} />,
  'Keyboards': <Keyboard size={14} />,
  'Wearables': <Watch size={14} />,
  'Desk Setup': <Mouse size={14} />,
  'Charging': <Sparkles size={14} />,
};

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  inStockOnly,
  setInStockOnly,
}) {
  return (
    <section className="filters-section" id="catalog-section">
      <div className="filters-bar">
        {/* Category Segmented Pills */}
        <div className="categories-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`category-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span className="cat-icon">{CATEGORY_ICONS[cat] || null}</span>
              <span>{cat}</span>
              {selectedCategory === cat && <span className="cat-active-dot"></span>}
            </button>
          ))}
        </div>

        {/* Filter & Sort Controls */}
        <div className="filter-tools">
          <label className={`instock-switch ${inStockOnly ? 'active' : ''}`}>
            <input
              id="instock-filter-checkbox"
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <span className="switch-track">
              <span className="switch-thumb"></span>
            </span>
            <span className="switch-label">Ready to Ship</span>
          </label>

          <div className="sort-select-wrap">
            <SlidersHorizontal size={14} color="#64748b" className="sort-icon" />
            <select
              id="sort-by-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
