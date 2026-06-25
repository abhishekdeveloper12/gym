import React from 'react';
import { motion } from 'framer-motion';

function AthletesSection() {
  const athletes = [
    {
      name: 'Aarav Singh',
      title: 'Mr. India 2024 Champion',
      description: '10+ years competitive bodybuilding',
      image: 'https://via.placeholder.com/200?text=Athlete1',
      achievement: '450K Followers',
    },
    {
      name: 'Deepika Sharma',
      title: 'Fitness Influencer & Coach',
      description: 'Women\'s fitness transformation specialist',
      image: 'https://via.placeholder.com/200?text=Athlete2',
      achievement: '520K Followers',
    },
    {
      name: 'Rohan Menon',
      title: 'CrossFit Champion',
      description: 'National competitor & sports enthusiast',
      image: 'https://via.placeholder.com/200?text=Athlete3',
      achievement: '380K Followers',
    },
  ];

  return (
    <section className="py-20 bg-titan-dark/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-display mb-4">Featured Athletes</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Meet the champions who trust Titan Nutrition for their fitness journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {athletes.map((athlete, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              <img
                src={athlete.image}
                alt={athlete.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-subheading mb-1">{athlete.name}</h3>
              <p className="text-titan-gold font-semibold mb-2">{athlete.title}</p>
              <p className="text-sm text-gray-400 mb-4">{athlete.description}</p>
              <div className="flex justify-center items-center gap-2">
                <span className="text-xs text-gray-500">●</span>
                <span className="text-sm text-titan-gold">{athlete.achievement}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AthletesSection;
