import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import { userAPI, orderAPI } from '../api/api';
import { FiAward, FiShoppingBag, FiHeart, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab, user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getOrders();
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-display">My Dashboard</h1>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 text-center hover:border-titan-gold/50 transition-all"
          >
            <div className="w-12 h-12 mx-auto mb-3 bg-titan-gold/10 rounded-full flex items-center justify-center">
              <FiAward className="w-6 h-6 text-titan-gold" />
            </div>
            <p className="text-gray-400 mb-2">Loyalty Points</p>
            <p className="text-3xl font-bold text-titan-gold">{user.loyaltyPoints || 0}</p>
            <p className="text-xs text-gray-500 mt-1">₹{user.loyaltyPoints * 0.1} value</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6 text-center hover:border-titan-gold/50 transition-all"
          >
            <div className="w-12 h-12 mx-auto mb-3 bg-titan-orange/10 rounded-full flex items-center justify-center">
              <FiShoppingBag className="w-6 h-6 text-titan-orange" />
            </div>
            <p className="text-gray-400 mb-2">Total Orders</p>
            <p className="text-3xl font-bold text-titan-orange">{orders.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6 text-center hover:border-titan-gold/50 transition-all"
          >
            <div className="w-12 h-12 mx-auto mb-3 bg-titan-gold/10 rounded-full flex items-center justify-center">
              <FiHeart className="w-6 h-6 text-titan-gold" />
            </div>
            <p className="text-gray-400 mb-2">Wishlist Items</p>
            <p className="text-3xl font-bold text-titan-gold">0</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 text-center hover:border-titan-gold/50 transition-all"
          >
            <div className="w-12 h-12 mx-auto mb-3 bg-titan-gold/10 rounded-full flex items-center justify-center">
              <FiMapPin className="w-6 h-6 text-titan-gold" />
            </div>
            <p className="text-gray-400 mb-2">Saved Addresses</p>
            <p className="text-3xl font-bold text-titan-gold">1</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="flex border-b border-titan-gold/20">
            {['orders', 'profile', 'wishlist'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 font-semibold text-center capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-titan-gold text-titan-gold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-heading mb-6">Your Orders</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order._id} className="border border-titan-gold/20 rounded p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">Order #{order.orderNumber}</p>
                            <p className="text-sm text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-titan-gold">₹{order.total}</p>
                            <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                              order.orderStatus === 'delivered'
                                ? 'bg-green-400/20 text-green-400'
                                : order.orderStatus === 'shipped'
                                ? 'bg-blue-400/20 text-blue-400'
                                : 'bg-yellow-400/20 text-yellow-400'
                            }`}>
                              {order.orderStatus}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4">
                          {order.items.map(item => (
                            <p key={item._id} className="text-sm text-gray-400">
                              {item.product?.name} x {item.quantity}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No orders yet</p>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-heading mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <p className="text-gray-300">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <p className="text-gray-300">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-heading mb-6">Wishlist</h2>
                <p className="text-gray-400">Your wishlist is empty</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
