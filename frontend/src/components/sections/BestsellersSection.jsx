import React, { useState, useEffect } from 'react';
import { productAPI } from '../../api/api';
import ProductCard from '../ProductCard';
import { SkeletonProductCard } from '../ui/SkeletonLoader';
import { motion } from 'framer-motion';

function BestsellersSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBestsellers();
  }, []);

  const fetchBestsellers = async () => {
    try {
      const response = await productAPI.getAll({ limit: 8 });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-display mb-4">Bestseller Collection</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our most loved products chosen by thousands of fitness enthusiasts
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <SkeletonProductCard key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, idx) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default BestsellersSection;
