import React from 'react';
import { CATEGORIES } from '../data/products';

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
        {/* Category Pills */}
        <div className="categories-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`category-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter & Sort Controls */}
        <div className="filter-tools">
          <label className="instock-toggle-label">
            <input
              id="instock-filter-checkbox"
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <span>In-Stock Only</span>
          </label>

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
    </section>
  );
}
