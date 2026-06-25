import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/store';
import { orderAPI } from '../api/api';
import { useAuthStore } from '../store/store';
import { FiTag, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, clear, coupon, removeCoupon } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
      name: user?.name || '',
      phone: '',
    },
    billingAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
      name: user?.name || '',
      phone: '',
    },
    paymentMethod: 'upi',
  });

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      await orderAPI.createOrder({
        ...formData,
      });

      clear();
      toast.success('Order placed successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-hero py-12">
        <div className="container-custom text-center">
          <h1 className="text-display mb-6">Please Login to Continue</h1>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container-custom">
        <h1 className="text-display mb-12">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6">
          {/* Shipping Address */}
          <div className="md:col-span-2 space-y-6">
            <div className="card p-6">
              <h2 className="text-heading mb-6 text-titan-gold">Shipping Address</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.shippingAddress.name}
                  onChange={(e) => handleInputChange(e, 'shippingAddress')}
                  className="w-full bg-titan-dark border border-titan-gold/20 rounded px-4 py-2 text-white placeholder-gray-500"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  name="phone"
                  value={formData.shippingAddress.phone}
                  onChange={(e) => handleInputChange(e, 'shippingAddress')}
                  className="w-full bg-titan-dark border border-titan-gold/20 rounded px-4 py-2 text-white placeholder-gray-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  name="street"
                  value={formData.shippingAddress.street}
                  onChange={(e) => handleInputChange(e, 'shippingAddress')}
                  className="w-full bg-titan-dark border border-titan-gold/20 rounded px-4 py-2 text-white placeholder-gray-500"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formData.shippingAddress.city}
                    onChange={(e) => handleInputChange(e, 'shippingAddress')}
                    className="w-full bg-titan-dark border border-titan-gold/20 rounded px-4 py-2 text-white placeholder-gray-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    value={formData.shippingAddress.state}
                    onChange={(e) => handleInputChange(e, 'shippingAddress')}
                    className="w-full bg-titan-dark border border-titan-gold/20 rounded px-4 py-2 text-white placeholder-gray-500"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Pincode"
                  name="pincode"
                  value={formData.shippingAddress.pincode}
                  onChange={(e) => handleInputChange(e, 'shippingAddress')}
                  className="w-full bg-titan-dark border border-titan-gold/20 rounded px-4 py-2 text-white placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="card p-6">
              <h2 className="text-heading mb-6 text-titan-gold">Payment Method</h2>
              <div className="space-y-3">
                {['upi', 'debit_card', 'credit_card', 'net_banking'].map(method => (
                  <label key={method} className="flex items-center gap-3 cursor-pointer p-3 border border-titan-gold/20 rounded hover:bg-titan-gold/5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    />
                    <span className="capitalize">{method.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="card p-6 h-fit sticky top-24">
            <h2 className="text-heading mb-6 text-titan-gold">Order Summary</h2>

            {/* Applied Coupon */}
            {coupon && (
              <div className="flex items-center justify-between bg-green-400/10 border border-green-400/30 rounded-lg px-4 py-3 mb-6">
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
            )}

            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map(item => (
                <div key={item.product._id} className="flex justify-between text-sm pb-2 border-b border-titan-gold/10">
                  <span className="text-gray-400">{item.product.name} x{item.quantity}</span>
                  <span>₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 border-t border-titan-gold/20 pt-3">
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
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-2xl text-titan-gold">₹{total}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Complete Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;
