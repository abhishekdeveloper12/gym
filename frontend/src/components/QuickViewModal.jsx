import React, { useState } from 'react';
import { FiX, FiShoppingCart, FiHeart, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/store';
import { useWishlistStore } from '../store/store';
import LazyImage from './LazyImage';
import toast from 'react-hot-toast';

function QuickViewModal({ product, isOpen, onClose }) {
  const addItem = useCartStore(state => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart!`);
    onClose();
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-titan-dark border border-titan-gold/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-titan-gold/20">
                <h2 className="text-xl font-bold">Quick View</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-titan-gold/10 rounded-lg transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="relative">
                    <LazyImage
                      src={product.images?.[0] || 'https://via.placeholder.com/400'}
                      alt={product.name}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                    {discount > 0 && (
                      <div className="absolute top-4 right-4 bg-titan-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                        {discount}% OFF
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-yellow-400">★</span>
                        <span>{product.rating?.toFixed(1) || '4.5'}</span>
                        <span className="text-gray-400">({product.reviewCount || 100} reviews)</span>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-titan-gold">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>

                    <p className="text-gray-300 text-sm">{product.description}</p>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2">
                      {product.benefits?.slice(0, 3).map((benefit, idx) => (
                        <span key={idx} className="text-xs bg-titan-gold/10 text-titan-gold px-2 py-1 rounded">
                          {benefit}
                        </span>
                      ))}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-titan-gold/30 rounded-lg">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 py-2 hover:bg-titan-gold/10 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 font-semibold">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-4 py-2 hover:bg-titan-gold/10 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddToCart}
                        className="btn-primary flex-1"
                      >
                        <FiShoppingCart /> Add to Cart
                      </button>
                      <button
                        onClick={handleWishlistToggle}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          isInWishlist(product._id)
                            ? 'bg-titan-orange border-titan-orange text-white'
                            : 'border-titan-gold/30 text-gray-400 hover:border-titan-gold hover:text-titan-gold'
                        }`}
                      >
                        <FiHeart />
                      </button>
                    </div>

                    {/* View Full Details */}
                    <button
                      onClick={onClose}
                      className="w-full btn-secondary flex items-center justify-center gap-2"
                    >
                      View Full Details <FiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default QuickViewModal;
