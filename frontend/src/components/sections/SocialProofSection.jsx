import React from 'react';
import { motion } from 'framer-motion';

function SocialProofSection() {
  const reviews = [
    {
      name: 'Arjun Kumar',
      rating: 5,
      comment: 'Amazing quality! Noticed results within 3 weeks. Highly recommended!',
      product: 'Whey Protein Isolate',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      name: 'Priya Singh',
      rating: 5,
      comment: 'Best supplement I\'ve tried in years. Worth every rupee!',
      product: 'Mass Gainer',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      name: 'Virat Sharma',
      rating: 5,
      comment: 'Fast shipping and great customer service. Product is excellent.',
      product: 'Pre-Workout Ignite',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      name: 'Disha Patel',
      rating: 5,
      comment: 'Taste is incredible for a protein powder. Mixes smoothly.',
      product: 'Casein Protein Night',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
  ];

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-display mb-4">What Our Customers Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've achieved their fitness goals
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">{review.name}</p>
                  <p className="text-xs text-yellow-400">★★★★★</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-3">{review.comment}</p>
              <p className="text-xs text-titan-gold font-semibold">{review.product}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProofSection;
