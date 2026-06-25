import React, { useState } from 'react';
import { FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    // Simulate subscription
    setTimeout(() => {
      toast.success('Thanks for subscribing! Check your email for exclusive offers.');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container-custom max-w-2xl">
        <div className="card p-12 text-center bg-gradient-to-br from-titan-gold/5 to-titan-orange/5">
          <FiMail className="w-16 h-16 mx-auto mb-6 text-titan-gold" />

          <h2 className="text-display mb-4 text-gray-900">Get Exclusive Deals</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and get 15% off your first order, plus exclusive fitness tips and product launches.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-titan-gold"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
