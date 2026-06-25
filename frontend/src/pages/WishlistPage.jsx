import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useWishlistStore } from '../store/store';
import { useCartStore } from '../store/store';
import { EmptyWishlist } from '../components/ui/EmptyState';
import LazyImage from '../components/LazyImage';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (product) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemove = (productId) => {
    removeItem(productId);
    toast.success('Removed from wishlist');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero py-12">
        <div className="container-custom">
          <h1 className="text-display mb-8">My Wishlist</h1>
          <EmptyWishlist />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container-custom">
        <h1 className="text-display mb-8">My Wishlist ({items.length})</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="card overflow-hidden"
            >
              <Link to={`/products/${item._id}`}>
                <div className="relative w-full h-56 bg-titan-dark overflow-hidden group">
                  <LazyImage
                    src={item.images?.[0] || 'https://via.placeholder.com/300'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/products/${item._id}`}>
                  <h3 className="font-semibold line-clamp-2 mb-2 hover:text-titan-gold transition-colors duration-200">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold text-titan-gold">₹{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="btn-primary flex-1 text-sm justify-center"
                  >
                    <FiShoppingCart /> Add
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn-secondary text-sm px-3"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
