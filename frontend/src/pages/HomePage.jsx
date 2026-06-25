import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/store';
import HeroSection from '../components/sections/HeroSection';
import BestsellersSection from '../components/sections/BestsellersSection';
import TransformationSection from '../components/sections/TransformationSection';
import WhyChooseSection from '../components/sections/WhyChooseSection';
import AthletesSection from '../components/sections/AthletesSection';
import SocialProofSection from '../components/sections/SocialProofSection';
import CommunityFeedSection from '../components/sections/CommunityFeedSection';
import FAQSection from '../components/sections/FAQSection';
import NewsletterSection from '../components/sections/NewsletterSection';

function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      <HeroSection />
      <BestsellersSection />
      <TransformationSection />
      <WhyChooseSection />
      <AthletesSection />
      <SocialProofSection />
      <CommunityFeedSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
}

export default HomePage;
