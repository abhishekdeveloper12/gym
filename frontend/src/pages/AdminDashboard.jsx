import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import { adminAPI } from '../api/api';
import { SkeletonStats, SkeletonTable } from '../components/ui/SkeletonLoader';
import { FiTrendingUp, FiUsers, FiShoppingBag, FiPackage, FiDollarSign, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, ordersRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getOrders(),
      ]);
      setStats(statsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-gradient-hero py-12">
        <div className="container-custom">
          <h1 className="text-display mb-12">Admin Dashboard</h1>
          <SkeletonStats />
          <div className="card p-6 mt-12">
            <h2 className="text-heading mb-6">Recent Orders</h2>
            <SkeletonTable rows={5} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container-custom">
        <h1 className="text-display mb-12">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Revenue', value: `₹${stats.totalRevenue?.toLocaleString() || 0}`, icon: FiDollarSign, color: 'text-titan-gold', bg: 'bg-titan-gold/10' },
            { label: 'Total Orders', value: stats.totalOrders || 0, icon: FiShoppingBag, color: 'text-titan-orange', bg: 'bg-titan-orange/10' },
            { label: 'Total Users', value: stats.totalUsers || 0, icon: FiUsers, color: 'text-titan-gold', bg: 'bg-titan-gold/10' },
            { label: 'Total Products', value: stats.totalProducts || 0, icon: FiPackage, color: 'text-titan-gold', bg: 'bg-titan-gold/10' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card p-6 hover:border-titan-gold/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                  className={`text-2xl font-bold ${stat.color}`}
                >
                  {stat.value}
                </motion.div>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-heading">Recent Orders</h2>
            <button className="btn-secondary text-sm">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-titan-gold/20">
                <tr>
                  <th className="text-left py-3 px-4 text-titan-gold">Order ID</th>
                  <th className="text-left py-3 px-4 text-titan-gold">Customer</th>
                  <th className="text-left py-3 px-4 text-titan-gold">Total</th>
                  <th className="text-left py-3 px-4 text-titan-gold">Status</th>
                  <th className="text-left py-3 px-4 text-titan-gold">Date</th>
                  <th className="text-left py-3 px-4 text-titan-gold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order, idx) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-titan-gold/10 hover:bg-titan-gold/5 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold">#{order.orderNumber}</td>
                    <td className="py-3 px-4">{order.user?.name || 'N/A'}</td>
                    <td className="py-3 px-4 text-titan-gold font-semibold">₹{order.total}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.orderStatus === 'delivered'
                          ? 'bg-green-400/20 text-green-400'
                          : order.orderStatus === 'shipped'
                          ? 'bg-blue-400/20 text-blue-400'
                          : 'bg-yellow-400/20 text-yellow-400'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-titan-gold/10 rounded transition-colors">
                          <FiEye className="text-titan-gold" />
                        </button>
                        <button className="p-2 hover:bg-titan-gold/10 rounded transition-colors">
                          <FiEdit className="text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
