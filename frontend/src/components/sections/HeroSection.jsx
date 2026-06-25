import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay, FiAward, FiShield, FiTrendingUp } from 'react-icons/fi';

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
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden py-20">
      {/* Premium Dark Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-titan-black via-[#0d1229] to-titan-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-titan-black/80 via-transparent to-transparent" />
        
        {/* Subtle Light Effect - Top Right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-titan-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Subtle Light Effect - Bottom Left */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-titan-orange/3 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Content */}
      <div className="container-custom relative z-10 text-center max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <span className="w-1.5 h-1.5 bg-titan-gold rounded-full" />
              <span className="text-titan-gold text-xs font-medium uppercase tracking-[0.2em]">
                Elite Performance Nutrition
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight text-white tracking-tight"
          >
            Forge Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-titan-gold via-[#f4d03f] to-titan-gold">
              Legacy
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Scientifically formulated supplements trusted by elite athletes worldwide.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/products"
              className="group relative overflow-hidden bg-gradient-to-r from-titan-gold via-[#f4d03f] to-titan-gold text-titan-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-titan-gold/20 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Collection
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button className="flex items-center justify-center gap-2 group px-8 py-4 rounded-lg bg-transparent border border-white/20 text-white font-medium text-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300">
              <FiPlay className="w-4 h-4" />
              <span>Watch Story</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
