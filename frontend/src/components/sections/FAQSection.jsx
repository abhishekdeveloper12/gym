import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Are your products lab-tested?',
      answer: 'Yes, every batch of our products is third-party tested for purity, potency, and safety. We maintain the highest quality standards.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'We typically deliver within 3-5 business days across India. Orders can be tracked in real-time.',
    },
    {
      question: 'Do you offer a money-back guarantee?',
      answer: 'Yes, we offer a 30-day money-back guarantee on all products. If you\'re not satisfied, we\'ll refund you.',
    },
    {
      question: 'What\'s the best time to consume protein?',
      answer: 'Post-workout is ideal for maximum muscle recovery. However, consuming protein anytime during the day helps meet your daily protein requirements.',
    },
    {
      question: 'Are these products suitable for vegetarians?',
      answer: 'We offer both vegetarian and non-vegetarian products. Check individual product descriptions for suitability.',
    },
    {
      question: 'Can I mix products?',
      answer: 'Yes, our products are designed to work together. Consult our nutrition experts for personalized recommendations.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-hero">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-display mb-4 text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Find answers to common questions about our products
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 flex justify-between items-center gap-4 hover:bg-titan-gold/5 transition-colors duration-200"
              >
                <h3 className="text-subheading text-left break-words text-gray-900">{faq.question}</h3>
                <FiChevronDown
                  className={`transition-transform duration-200 flex-shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`}
                />
              </button>

              {openIndex === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-titan-gold/20 px-6 py-4"
                >
                  <p className="text-gray-700 break-words">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
