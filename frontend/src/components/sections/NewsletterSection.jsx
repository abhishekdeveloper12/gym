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
    <section className="py-20 bg-titan-dark/50">
      <div className="container-custom max-w-2xl">
        <div className="card p-12 text-center bg-gradient-to-br from-titan-gold/10 to-titan-orange/10">
          <FiMail className="w-16 h-16 mx-auto mb-6 text-titan-gold" />

          <h2 className="text-display mb-4">Get Exclusive Deals</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and get 15% off your first order, plus exclusive fitness tips and product launches.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-titan-black border border-titan-gold/20 rounded px-4 py-3 text-white placeholder-gray-500"
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

          <p className="text-xs text-gray-400 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
