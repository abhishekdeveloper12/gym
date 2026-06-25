import React, { useState } from 'react';
import { useCartStore } from '../store/store';
import { Link } from 'react-router-dom';
import { FiTrash2, FiTag, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { EmptyCart } from '../components/ui/EmptyState';
import toast from 'react-hot-toast';

function CartPage() {
  const { items, removeItem, updateQuantity, coupon, applyCoupon, removeCoupon } = useCartStore();
  const [couponCode, setCouponCode] = useState('');

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal > 999 ? 0 : 99;

  // Calculate discount
  let discount = 0;
  if (coupon) {
    if (coupon.type === 'percentage') {
      discount = Math.round(subtotal * (coupon.discount / 100));
    } else {
      discount = coupon.discount;
    }
  }

  const total = subtotal + tax + shipping - discount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    const result = applyCoupon(couponCode);
    if (result.success) {
      toast.success(result.message);
      setCouponCode('');
    } else {
      toast.error(result.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero py-12">
        <div className="container-custom">
          <h1 className="text-display mb-8">Shopping Cart</h1>
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container-custom">
        <h1 className="text-display mb-12">Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              {items.map((item, idx) => (
                <motion.div
                  key={item.product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card p-4 flex gap-4"
                >
                  <img
                    src={item.product.images?.[0] || 'https://via.placeholder.com/100'}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-base md:text-lg break-words line-clamp-2">{item.product.name}</h3>
                    <p className="text-titan-gold mt-2 whitespace-nowrap">₹{item.product.price}</p>

                    <div className="flex items-center gap-4 mt-4 flex-wrap">
                      <div className="flex items-center border border-titan-gold/30 rounded">
                        <button
                          onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 hover:bg-titan-gold/10 transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-titan-gold/10 transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200 ml-auto"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">₹{item.product.price * item.quantity}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="card p-6 h-fit sticky top-24">
            <h2 className="text-heading mb-6 text-titan-gold">Order Summary</h2>

            {/* Coupon Section */}
            <div className="mb-6">
              {coupon ? (
                <div className="flex items-center justify-between bg-green-400/10 border border-green-400/30 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FiTag className="text-green-400" />
                    <div>
                      <p className="text-sm font-semibold text-green-400">{coupon.code}</p>
                      <p className="text-xs text-gray-400">
                        {coupon.type === 'percentage' ? `${coupon.discount}% off` : `₹${coupon.discount} off`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 bg-titan-dark border border-titan-gold/20 rounded px-3 py-2 text-white placeholder-gray-500 text-sm"
                  />
                  <button type="submit" className="btn-secondary text-sm px-4">
                    Apply
                  </button>
                </form>
              )}
              <p className="text-xs text-gray-500 mt-2">Try: TITAN10, TITAN20, FLAT500, WELCOME15</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount ({coupon?.code})</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Tax (18%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className={shipping === 0 ? 'text-green-400' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="border-t border-titan-gold/20 pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-titan-gold">₹{total}</span>
              </div>
            </div>

            <Link to="/checkout" className="btn-primary w-full justify-center">
              Proceed to Checkout
            </Link>

            <Link to="/products" className="btn-ghost w-full justify-center mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
