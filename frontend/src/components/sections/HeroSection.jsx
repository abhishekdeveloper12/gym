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
    <section className="relative min-h-screen bg-white flex items-center overflow-hidden py-12 lg:py-20">
      {/* Light Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white" />

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 bg-black text-white rounded-full px-4 py-2">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Introducing
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-black"
            >
              World's FIRST & FINEST{' '}
              <span className="text-black">
                Creatine Nano 400
              </span>
            </motion.h1>

            {/* Benefits */}
            <motion.div variants={itemVariants} className="mb-8 space-y-3">
              <div className="flex items-center gap-3">
                <FiCheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700 font-medium">2X More Absorption</span>
              </div>
              <div className="flex items-center gap-3">
                <FiZap className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700 font-medium">2X Finer Particles</span>
              </div>
              <div className="flex items-center gap-3">
                <FiTrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Faster ATP Refill</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
              >
                Shop Now
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 lg:p-12">
              {/* Product Image Placeholder */}
              <div className="aspect-square flex items-center justify-center bg-white rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-lg font-semibold">Product Image</span>
                  </div>
                  <p className="text-gray-600 text-sm">Creatine Nano 400</p>
                </div>
              </div>
              
              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                <div className="w-8 h-2 bg-black rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
