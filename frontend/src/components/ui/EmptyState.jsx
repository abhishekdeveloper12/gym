import React from 'react';
import { FiShoppingBag, FiHeart, FiSearch, FiInbox, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const EmptyCart = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-titan-gold/10 mb-6">
      <FiShoppingBag className="w-12 h-12 text-titan-gold" />
    </div>
    <h2 className="text-2xl font-bold mb-3">Your Cart is Empty</h2>
    <p className="text-gray-400 mb-8 max-w-md mx-auto">
      Add some premium products to get started on your fitness journey!
    </p>
    <Link to="/products" className="btn-primary inline-flex items-center gap-2">
      Explore Products <FiArrowRight />
    </Link>
  </motion.div>
);

export const EmptyWishlist = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-titan-orange/10 mb-6">
      <FiHeart className="w-12 h-12 text-titan-orange" />
    </div>
    <h2 className="text-2xl font-bold mb-3">Your Wishlist is Empty</h2>
    <p className="text-gray-400 mb-8 max-w-md mx-auto">
      Save your favorite products for later. Start browsing now!
    </p>
    <Link to="/products" className="btn-primary inline-flex items-center gap-2">
      Browse Products <FiArrowRight />
    </Link>
  </motion.div>
);

export const EmptyProducts = ({ message = 'No products found' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-titan-gold/10 mb-6">
      <FiSearch className="w-12 h-12 text-titan-gold" />
    </div>
    <h2 className="text-2xl font-bold mb-3">{message}</h2>
    <p className="text-gray-400 mb-8 max-w-md mx-auto">
      Try adjusting your filters or search for something else.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="btn-secondary inline-flex items-center gap-2"
    >
      Clear Filters
    </button>
  </motion.div>
);

export const EmptyOrders = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-titan-gold/10 mb-6">
      <FiInbox className="w-12 h-12 text-titan-gold" />
    </div>
    <h2 className="text-2xl font-bold mb-3">No Orders Yet</h2>
    <p className="text-gray-400 mb-8 max-w-md mx-auto">
      You haven't placed any orders yet. Start shopping to see your order history here.
    </p>
    <Link to="/products" className="btn-primary inline-flex items-center gap-2">
      Start Shopping <FiArrowRight />
    </Link>
  </motion.div>
);

export const EmptyReviews = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-12"
  >
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-titan-gold/10 mb-4">
      <FiHeart className="w-8 h-8 text-titan-gold" />
    </div>
    <h3 className="text-xl font-bold mb-2">No Reviews Yet</h3>
    <p className="text-gray-400 text-sm">
      Be the first to review this product!
    </p>
  </motion.div>
);

export const EmptyState = ({ icon: Icon, title, description, action, actionText }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-titan-gold/10 mb-6">
      <Icon className="w-12 h-12 text-titan-gold" />
    </div>
    <h2 className="text-2xl font-bold mb-3">{title}</h2>
    <p className="text-gray-400 mb-8 max-w-md mx-auto">{description}</p>
    {action && (
      <button onClick={action} className="btn-primary inline-flex items-center gap-2">
        {actionText} <FiArrowRight />
      </button>
    )}
  </motion.div>
);

export default {
  EmptyCart,
  EmptyWishlist,
  EmptyProducts,
  EmptyOrders,
  EmptyReviews,
  EmptyState,
};
