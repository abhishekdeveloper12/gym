import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api/api';
import { useAuthStore } from '../store/store';
import toast from 'react-hot-toast';

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await authAPI.login(formData);
      login(response.data.token, response.data.user);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center py-12">
      <div className="card p-8 w-full max-w-md">
        <h1 className="text-heading mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-8">Login to your Titan account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-titan-dark border border-titan-gold/20 rounded px-4 py-2 text-white placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-titan-dark border border-titan-gold/20 rounded px-4 py-2 text-white placeholder-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-titan-gold hover:text-titan-orange">
              Register
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Demo Account:</p>
          <p className="text-xs text-gray-500">Email: demo@titanutrition.com</p>
          <p className="text-xs text-gray-500">Password: demo123</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
