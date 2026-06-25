import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { useCartStore } from '../store/store';
import { useWishlistStore } from '../store/store';
import LazyImage from '../components/LazyImage';
import QuickViewModal from '../components/QuickViewModal';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function ProductCard({ product }) {
  const addItem = useCartStore(state => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  return (
    <Link to={`/products/${product._id}`} className="block h-full">
      <motion.div
        whileHover={{ y: -8 }}
        className="product-card overflow-hidden h-full"
        transition={{ duration: 0.2 }}
      >
        {/* Image Container */}
        <div className="relative w-full h-56 bg-gray-100 overflow-hidden group">
          <LazyImage
            src={product.images?.[0] || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-titan-orange text-white px-3 py-1 rounded-full text-sm font-bold">
              {discount}% OFF
            </div>
          )}

          {product.isBestseller && (
            <div className="absolute top-3 left-3 bg-titan-gold text-titan-black px-3 py-1 rounded-full text-xs font-bold">
              Bestseller
            </div>
          )}

          {/* Hover Buttons */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="btn-secondary text-sm"
            >
              <FiEye />
            </button>
            <button
              onClick={handleAddToCart}
              className="btn-primary text-sm"
            >
              <FiShoppingCart /> Add to Cart
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`btn-secondary text-sm ${isInWishlist(product._id) ? 'bg-titan-orange text-white border-titan-orange' : ''}`}
            >
              <FiHeart />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between h-full">
          <div>
            <h3 className="font-semibold line-clamp-2 mb-2 hover:text-titan-gold transition-colors duration-200 break-words text-gray-900">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-yellow-400">★</span>
              <span className="text-sm whitespace-nowrap">{product.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm whitespace-nowrap">({product.reviewCount})</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-lg font-bold text-titan-gold whitespace-nowrap">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through whitespace-nowrap">₹{product.originalPrice}</span>
            )}
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap gap-1 mt-3">
            {product.benefits?.slice(0, 2).map((benefit, idx) => (
              <span key={idx} className="text-xs bg-titan-gold/10 text-titan-gold px-2 py-1 rounded">
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </Link>
  );
}

export default ProductCard;
