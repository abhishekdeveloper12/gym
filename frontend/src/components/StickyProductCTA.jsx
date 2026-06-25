import React from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

function StickyProductCTA({ product, onAddToCart, onWishlistToggle, isInWishlist, price, originalPrice }) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-titan-dark/95 border-t border-titan-gold/20 backdrop-blur-lg z-40 py-4 px-4"
      style={{ WebkitBackdropFilter: 'blur(12px)', backdropFilter: 'blur(12px)' }}
    >
      <div className="container-custom flex items-center justify-between gap-4">
        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-titan-gold">₹{price}</span>
          {originalPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">₹{originalPrice}</span>
              {discount > 0 && (
                <span className="text-xs bg-titan-orange text-white px-2 py-1 rounded font-semibold">
                  {discount}% OFF
                </span>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onWishlistToggle}
            className={`p-3 rounded-lg border-2 transition-all ${
              isInWishlist
                ? 'bg-titan-orange border-titan-orange text-white'
                : 'border-titan-gold/30 text-gray-400 hover:border-titan-gold hover:text-titan-gold'
            }`}
          >
            <FiHeart className="w-5 h-5" />
          </button>
          <button
            onClick={onAddToCart}
            className="btn-primary flex items-center gap-2 px-6 py-3"
          >
            <FiShoppingCart />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default StickyProductCTA;
