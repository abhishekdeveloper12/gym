import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

function WhyChooseSection() {
  const reasons = [
    {
      title: 'Lab Tested',
      description: 'Every batch is third-party tested for purity and potency',
      icon: '🔬',
    },
    {
      title: '100% Natural',
      description: 'No artificial additives, fillers, or banned substances',
      icon: '🌿',
    },
    {
      title: 'Best Pricing',
      description: 'Premium quality at competitive prices without compromising',
      icon: '💰',
    },
    {
      title: 'Fast Delivery',
      description: 'Quick shipping across India with tracking',
      icon: '🚚',
    },
    {
      title: 'Expert Support',
      description: 'Personalized nutrition guidance from certified experts',
      icon: '👨‍⚕️',
    },
    {
      title: 'Satisfaction Guaranteed',
      description: '30-day money-back guarantee on all products',
      icon: '✨',
    },
  ];

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-display mb-4 text-gray-900">Why Choose Titan Nutrition</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to premium quality, transparency, and customer success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-subheading mb-2 text-titan-gold">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;
