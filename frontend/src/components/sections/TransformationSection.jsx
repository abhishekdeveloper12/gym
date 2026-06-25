import React from 'react';
import { motion } from 'framer-motion';

function TransformationSection() {
  const stories = [
    {
      name: 'Harshit Sharma',
      beforeStats: '85kg, 28% BF',
      afterStats: '72kg, 12% BF',
      duration: '6 months',
      result: '13kg Weight Loss',
      beforeImage: 'https://via.placeholder.com/300?text=Before',
      afterImage: 'https://via.placeholder.com/300?text=After',
    },
    {
      name: 'Vikram Singh',
      beforeStats: '70kg, 16% BF',
      afterStats: '85kg, 14% BF',
      duration: '8 months',
      result: '15kg Muscle Gain',
      beforeImage: 'https://via.placeholder.com/300?text=Before',
      afterImage: 'https://via.placeholder.com/300?text=After',
    },
    {
      name: 'Pooja Verma',
      beforeStats: '78kg, 22% BF',
      afterStats: '81kg, 10% BF',
      duration: '3 months',
      result: '12% Body Fat Loss',
      beforeImage: 'https://via.placeholder.com/300?text=Before',
      afterImage: 'https://via.placeholder.com/300?text=After',
    },
  ];

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-display mb-4 text-gray-900">Real Transformations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See the incredible results our community achieves with dedication and Titan products
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="card overflow-hidden"
            >
              <div className="flex gap-2 mb-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Before</p>
                  <img
                    src={story.beforeImage}
                    alt="Before"
                    className="w-full h-48 object-cover rounded"
                  />
                  <p className="text-xs text-gray-600 mt-1">{story.beforeStats}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">After</p>
                  <img
                    src={story.afterImage}
                    alt="After"
                    className="w-full h-48 object-cover rounded"
                  />
                  <p className="text-xs text-titan-gold mt-1">{story.afterStats}</p>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-900">{story.name}</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">{story.duration}</span>
                  <span className="text-titan-gold font-semibold">{story.result}</span>
                </div>
                <button className="btn-secondary w-full text-sm">
                  Read Story
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TransformationSection;
