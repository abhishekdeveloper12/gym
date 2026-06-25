import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard = () => (
  <div className="card p-0 overflow-hidden">
    <div className="w-full h-56 bg-titan-dark/50 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-6 bg-titan-dark/50 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-titan-dark/50 rounded animate-pulse w-1/2" />
      <div className="h-5 bg-titan-dark/50 rounded animate-pulse w-1/3" />
    </div>
  </div>
);

export const SkeletonProductCard = () => (
  <div className="product-card overflow-hidden">
    <div className="relative w-full h-56 bg-titan-dark/50 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-6 bg-titan-dark/50 rounded animate-pulse w-3/4" />
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 bg-titan-dark/50 rounded animate-pulse" />
        <div className="h-4 bg-titan-dark/50 rounded animate-pulse w-12" />
      </div>
      <div className="h-5 bg-titan-dark/50 rounded animate-pulse w-1/3" />
      <div className="flex gap-2">
        <div className="h-6 bg-titan-dark/50 rounded animate-pulse w-16" />
        <div className="h-6 bg-titan-dark/50 rounded animate-pulse w-16" />
      </div>
    </div>
  </div>
);

export const SkeletonText = ({ className = '', lines = 1 }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, idx) => (
      <div
        key={idx}
        className="h-4 bg-titan-dark/50 rounded animate-pulse"
        style={{ width: idx === lines - 1 ? '60%' : '100%' }}
      />
    ))}
  </div>
);

export const SkeletonButton = ({ className = '' }) => (
  <div className={`h-12 bg-titan-dark/50 rounded animate-pulse ${className}`} />
);

export const SkeletonAvatar = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };
  return <div className={`${sizes[size]} rounded-full bg-titan-dark/50 animate-pulse`} />;
};

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="space-y-3">
    <div className="h-10 bg-titan-dark/50 rounded animate-pulse" />
    {Array.from({ length: rows }).map((_, idx) => (
      <div key={idx} className="h-12 bg-titan-dark/50 rounded animate-pulse" />
    ))}
  </div>
);

export const SkeletonStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {Array.from({ length: 4 }).map((_, idx) => (
      <div key={idx} className="card p-6 space-y-3">
        <div className="h-4 bg-titan-dark/50 rounded animate-pulse w-1/2" />
        <div className="h-10 bg-titan-dark/50 rounded animate-pulse w-2/3" />
      </div>
    ))}
  </div>
);

export const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  return (
    <div className={`flex items-center justify-center`}>
      <motion.div
        className={`${sizes[size]} border-2 border-titan-gold border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default { SkeletonCard, SkeletonProductCard, SkeletonText, SkeletonButton, SkeletonAvatar, SkeletonTable, SkeletonStats, LoadingSpinner };
