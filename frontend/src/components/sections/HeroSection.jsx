import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay, FiCheckCircle, FiZap, FiTrendingUp } from 'react-icons/fi';

function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center overflow-hidden py-16 lg:py-24">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-titan-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-titan-orange/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 bg-titan-gold/10 border border-titan-gold/30 text-titan-gold rounded-full px-5 py-2">
                <span className="text-xs font-bold uppercase tracking-widest">
                  Premium Quality
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-gray-900"
            >
              Fuel Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-titan-gold to-titan-orange">
                Greatness
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Advanced supplements engineered for peak performance. Trusted by athletes who demand excellence.
            </motion.p>

            {/* Features Grid */}
            <motion.div variants={itemVariants} className="mb-10 grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-titan-gold mb-1">99%</div>
                <div className="text-sm text-gray-600">Purity</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-titan-orange mb-1">3X</div>
                <div className="text-sm text-gray-600">Absorption</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1"
              >
                Shop Collection
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:border-gray-400 hover:bg-gray-50">
                <FiPlay className="w-5 h-5" />
                Watch Video
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Product Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-titan-gold/20 to-titan-orange/20 rounded-full blur-2xl" />
                
                <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-6">
                  <div className="text-center">
                    <div className="w-56 h-56 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mb-4 flex items-center justify-center shadow-inner">
                      <span className="text-gray-500 text-xl font-semibold">Product</span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Whey Protein</h3>
                  <p className="text-gray-600 text-sm mb-4">Advanced formula for muscle growth</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-titan-gold">₹2,499</span>
                    <span className="text-gray-400 line-through text-sm">₹3,499</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-titan-orange text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-sm shadow-lg">
                29% OFF
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
