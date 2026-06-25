import React, { useState, useEffect } from 'react';
import { FiFilter, FiChevronDown } from 'react-icons/fi';
import { productAPI } from '../api/api';
import ProductCard from '../components/ProductCard';
import { SkeletonProductCard } from '../components/ui/SkeletonLoader';
import { EmptyProducts } from '../components/ui/EmptyState';
import toast from 'react-hot-toast';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    goal: '',
    search: '',
    sort: 'newest',
    page: 1,
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll(filters);
      setProducts(response.data.products);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container-custom">
        <h1 className="text-display mb-8 text-center">Our Products</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {/* Filters */}
          <div className="md:col-span-1">
            <div className="card p-6 space-y-6">
              <h3 className="text-heading text-titan-gold">Filters</h3>

              <div>
                <label className="block text-sm font-semibold mb-2">Sort By</label>
                <select
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="w-full bg-titan-dark border border-titan-gold/20 rounded px-3 py-2 text-white"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Goal</label>
                <select
                  name="goal"
                  value={filters.goal}
                  onChange={handleFilterChange}
                  className="w-full bg-titan-dark border border-titan-gold/20 rounded px-3 py-2 text-white"
                >
                  <option value="">All Goals</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Strength">Strength</option>
                  <option value="Recovery">Recovery</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Search</label>
                <input
                  type="text"
                  name="search"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="w-full bg-titan-dark border border-titan-gold/20 rounded px-3 py-2 text-white placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <SkeletonProductCard key={idx} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyProducts />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
