import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import User from '../models/User.js';
import TransformationStory from '../models/TransformationStory.js';
import Athlete from '../models/Athlete.js';
import { hashPassword } from '../utils/auth.js';

dotenv.config();

const PRODUCTS_DATA = [
  // Whey Protein
  {
    name: 'Titan Whey Protein Isolate Premium',
    slug: 'titan-whey-isolate-premium',
    description: 'High-purity whey protein isolate with 25g protein per serving. Third-party tested for purity.',
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    stock: 500,
    sku: 'TWPI001',
    images: ['https://via.placeholder.com/400?text=Whey+Protein+Isolate'],
    category: null,
    rating: 4.8,
    reviewCount: 247,
    benefits: ['Muscle Growth', 'Fast Recovery', 'High Protein Content', 'Low Carbs'],
    ingredients: [
      { name: 'Whey Protein Isolate', quantity: '25', unit: 'g' },
      { name: 'Leucine', quantity: '2.5', unit: 'g' },
      { name: 'Natural Flavoring', quantity: '2', unit: '%' },
    ],
    nutritionalInfo: {
      servingSize: '30g',
      servingsPerContainer: 33,
      calories: 110,
      protein: '25g',
      carbs: '2g',
      fat: '0.5g',
      fiber: '0g',
    },
    usageInstructions: 'Mix 30g (1 scoop) with 150ml water or milk. Consume post-workout or anytime.',
    certifications: ['ISO 9001', 'GMP', 'HACCP'],
    goals: ['Muscle Gain', 'Weight Management'],
    tags: ['Bestseller', 'Premium'],
    isBestseller: true,
    isNewArrival: false,
    isSubscriptionEligible: true,
    subscriptionDiscount: 15,
  },
  {
    name: 'Titan Mass Gainer Extreme',
    slug: 'titan-mass-gainer-extreme',
    description: 'High-calorie mass gainer with 50g protein and complex carbs. Perfect for muscle building.',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    stock: 300,
    sku: 'TMG001',
    images: ['https://via.placeholder.com/400?text=Mass+Gainer'],
    category: null,
    rating: 4.6,
    reviewCount: 189,
    benefits: ['Muscle Growth', 'Calorie Surplus', 'Easy to Digest', 'Rapid Strength Gains'],
    ingredients: [
      { name: 'Whey Protein Concentrate', quantity: '50', unit: 'g' },
      { name: 'Oat Flour', quantity: '75', unit: 'g' },
      { name: 'Maltodextrin', quantity: '30', unit: 'g' },
    ],
    nutritionalInfo: {
      servingSize: '100g',
      servingsPerContainer: 10,
      calories: 380,
      protein: '50g',
      carbs: '45g',
      fat: '2g',
      fiber: '1g',
    },
    usageInstructions: 'Mix 100g with 300ml milk. Best consumed post-workout.',
    certifications: ['GMP', 'HACCP'],
    goals: ['Muscle Gain', 'Strength'],
    tags: ['Popular'],
    isBestseller: true,
    isNewArrival: false,
    isSubscriptionEligible: true,
    subscriptionDiscount: 12,
  },
  {
    name: 'Creatine Monohydrate Pure',
    slug: 'creatine-monohydrate-pure',
    description: '100% pure creatine monohydrate. Micronized for better absorption.',
    price: 599,
    originalPrice: 799,
    discount: 25,
    stock: 800,
    sku: 'TCM001',
    images: ['https://via.placeholder.com/400?text=Creatine'],
    category: null,
    rating: 4.9,
    reviewCount: 512,
    benefits: ['Strength', 'Power Output', 'Muscle Mass', 'Better Performance'],
    ingredients: [
      { name: 'Creatine Monohydrate', quantity: '5', unit: 'g' },
    ],
    nutritionalInfo: {
      servingSize: '5g',
      servingsPerContainer: 100,
      calories: 0,
      protein: '0g',
      carbs: '0g',
      fat: '0g',
      fiber: '0g',
    },
    usageInstructions: 'Mix 5g daily with water or juice. Consume consistently for best results.',
    certifications: ['ISO 9001', 'GMP'],
    goals: ['Strength', 'Performance'],
    tags: ['Bestseller', 'Most Affordable'],
    isBestseller: true,
    isNewArrival: false,
    isSubscriptionEligible: true,
    subscriptionDiscount: 10,
  },
  {
    name: 'Titan Pre-Workout Ignite',
    slug: 'titan-pre-workout-ignite',
    description: 'Explosive energy and pump. Contains 300mg caffeine and citrulline malate.',
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    stock: 250,
    sku: 'TPW001',
    images: ['https://via.placeholder.com/400?text=Pre-Workout'],
    category: null,
    rating: 4.7,
    reviewCount: 423,
    benefits: ['Energy Boost', 'Pump', 'Focus', 'Endurance'],
    ingredients: [
      { name: 'Caffeine Anhydrous', quantity: '300', unit: 'mg' },
      { name: 'Citrulline Malate', quantity: '6', unit: 'g' },
      { name: 'Beta Alanine', quantity: '3.2', unit: 'g' },
    ],
    nutritionalInfo: {
      servingSize: '10g',
      servingsPerContainer: 30,
      calories: 15,
      protein: '0g',
      carbs: '3g',
      fat: '0g',
      fiber: '0g',
    },
    usageInstructions: 'Mix 10g with 200ml water. Consume 20-30 minutes before workout.',
    certifications: ['GMP', 'HACCP'],
    goals: ['Performance', 'Strength'],
    tags: ['Popular'],
    isBestseller: true,
    isNewArrival: false,
    isSubscriptionEligible: true,
    subscriptionDiscount: 10,
  },
  {
    name: 'BCAA 2:1:1 Ratio',
    slug: 'bcaa-ratio',
    description: 'Branched-chain amino acids for recovery and muscle preservation.',
    price: 899,
    originalPrice: 1199,
    discount: 25,
    stock: 400,
    sku: 'TBCAA001',
    images: ['https://via.placeholder.com/400?text=BCAA'],
    category: null,
    rating: 4.5,
    reviewCount: 267,
    benefits: ['Recovery', 'Muscle Preservation', 'Energy', 'Hydration'],
    ingredients: [
      { name: 'L-Leucine', quantity: '2.5', unit: 'g' },
      { name: 'L-Isoleucine', quantity: '1.25', unit: 'g' },
      { name: 'L-Valine', quantity: '1.25', unit: 'g' },
    ],
    nutritionalInfo: {
      servingSize: '5g',
      servingsPerContainer: 40,
      calories: 20,
      protein: '4g',
      carbs: '0g',
      fat: '0g',
      fiber: '0g',
    },
    usageInstructions: 'Mix 5g with 200ml water. Can be consumed during or after workout.',
    certifications: ['GMP'],
    goals: ['Recovery', 'Performance'],
    tags: ['Affordable'],
    isBestseller: false,
    isNewArrival: false,
    isSubscriptionEligible: true,
    subscriptionDiscount: 10,
  },
  {
    name: 'Fish Oil Omega-3',
    slug: 'fish-oil-omega3',
    description: 'Premium fish oil with high EPA and DHA content. Supports joint and heart health.',
    price: 499,
    originalPrice: 699,
    discount: 29,
    stock: 600,
    sku: 'TFO001',
    images: ['https://via.placeholder.com/400?text=Fish+Oil'],
    category: null,
    rating: 4.6,
    reviewCount: 189,
    benefits: ['Joint Health', 'Heart Health', 'Anti-Inflammation', 'Recovery'],
    ingredients: [
      { name: 'Fish Oil', quantity: '1000', unit: 'mg' },
      { name: 'EPA', quantity: '300', unit: 'mg' },
      { name: 'DHA', quantity: '200', unit: 'mg' },
    ],
    nutritionalInfo: {
      servingSize: '1 softgel',
      servingsPerContainer: 60,
      calories: 10,
      protein: '0g',
      carbs: '0g',
      fat: '1g',
      fiber: '0g',
    },
    usageInstructions: 'Take 1 softgel daily with meals.',
    certifications: ['GMP', 'Third-party tested'],
    goals: ['Recovery', 'Health'],
    tags: ['Popular'],
    isBestseller: false,
    isNewArrival: false,
    isSubscriptionEligible: true,
    subscriptionDiscount: 10,
  },
  {
    name: 'Titanium Multivitamin',
    slug: 'titanium-multivitamin',
    description: 'Complete micronutrient support with 25 essential vitamins and minerals.',
    price: 399,
    originalPrice: 599,
    discount: 33,
    stock: 700,
    sku: 'TMV001',
    images: ['https://via.placeholder.com/400?text=Multivitamin'],
    category: null,
    rating: 4.4,
    reviewCount: 145,
    benefits: ['Immunity', 'Energy', 'Metabolism', 'Overall Health'],
    ingredients: [
      { name: 'Vitamin C', quantity: '500', unit: 'mg' },
      { name: 'Vitamin D3', quantity: '2000', unit: 'IU' },
      { name: 'Zinc', quantity: '15', unit: 'mg' },
    ],
    nutritionalInfo: {
      servingSize: '2 tablets',
      servingsPerContainer: 30,
      calories: 5,
      protein: '0g',
      carbs: '1g',
      fat: '0g',
      fiber: '0g',
    },
    usageInstructions: 'Take 2 tablets daily with breakfast.',
    certifications: ['GMP'],
    goals: ['Health', 'Immunity'],
    tags: ['Value for Money'],
    isBestseller: false,
    isNewArrival: false,
    isSubscriptionEligible: true,
    subscriptionDiscount: 10,
  },
  {
    name: 'Casein Protein Night',
    slug: 'casein-protein-night',
    description: 'Slow-releasing casein protein. Perfect for overnight muscle growth and recovery.',
    price: 1699,
    originalPrice: 2299,
    discount: 26,
    stock: 350,
    sku: 'TCS001',
    images: ['https://via.placeholder.com/400?text=Casein+Protein'],
    category: null,
    rating: 4.5,
    reviewCount: 198,
    benefits: ['Night Recovery', 'Sustained Release', 'Muscle Building', 'Sleep Support'],
    ingredients: [
      { name: 'Micellar Casein', quantity: '25', unit: 'g' },
      { name: 'Calcium Caseinate', quantity: '5', unit: 'g' },
    ],
    nutritionalInfo: {
      servingSize: '30g',
      servingsPerContainer: 33,
      calories: 120,
      protein: '25g',
      carbs: '2.5g',
      fat: '1g',
      fiber: '0g',
    },
    usageInstructions: 'Mix 30g with 150ml milk. Best consumed before bedtime.',
    certifications: ['GMP', 'HACCP'],
    goals: ['Recovery', 'Muscle Gain'],
    tags: ['Popular'],
    isBestseller: false,
    isNewArrival: false,
    isSubscriptionEligible: true,
    subscriptionDiscount: 12,
  },
  {
    name: 'Whey Protein Concentrate',
    slug: 'whey-protein-concentrate',
    description: 'Affordable whey protein concentrate with good amino acid profile.',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    stock: 600,
    sku: 'TWC001',
    images: ['https://via.placeholder.com/400?text=Whey+Concentrate'],
    category: null,
    rating: 4.4,
    reviewCount: 312,
    benefits: ['Muscle Growth', 'Cost Effective', 'Good Taste', 'Easy Digestion'],
    ingredients: [
      { name: 'Whey Protein Concentrate', quantity: '20', unit: 'g' },
      { name: 'Carbohydrates', quantity: '3', unit: 'g' },
    ],
    nutritionalInfo: {
      servingSize: '25g',
      servingsPerContainer: 40,
      calories: 100,
      protein: '20g',
      carbs: '3g',
      fat: '1g',
      fiber: '0g',
    },
    usageInstructions: 'Mix 25g with 150ml water or milk.',
    certifications: ['GMP'],
    goals: ['Muscle Gain'],
    tags: ['Budget Friendly'],
    isBestseller: true,
    isNewArrival: false,
    isSubscriptionEligible: true,
    subscriptionDiscount: 12,
  },
  {
    name: 'L-Glutamine Pure',
    slug: 'l-glutamine-pure',
    description: 'Pure L-Glutamine for muscle recovery and gut health.',
    price: 799,
    originalPrice: 1099,
    discount: 27,
    stock: 350,
    sku: 'TGL001',
    images: ['https://via.placeholder.com/400?text=L-Glutamine'],
    category: null,
    rating: 4.5,
    reviewCount: 156,
    benefits: ['Muscle Recovery', 'Gut Health', 'Immune Support', 'Protein Synthesis'],
    ingredients: [
      { name: 'L-Glutamine', quantity: '5', unit: 'g' },
    ],
    nutritionalInfo: {
      servingSize: '5g',
      servingsPerContainer: 50,
      calories: 20,
      protein: '5g',
      carbs: '0g',
      fat: '0g',
      fiber: '0g',
    },
    usageInstructions: 'Mix 5g with water. Can be taken pre, intra, or post workout.',
    certifications: ['GMP'],
    goals: ['Recovery'],
    tags: ['Affordable'],
    isBestseller: false,
    isNewArrival: false,
    isSubscriptionEligible: true,
    subscriptionDiscount: 10,
  },
  {
    name: 'Titanium Energy Bars',
    slug: 'titanium-energy-bars',
    description: 'Premium protein bars with 20g protein and real chocolate. Perfect on-the-go nutrition.',
    price: 599,
    originalPrice: 799,
    discount: 25,
    stock: 1000,
    sku: 'TEB001',
    images: ['https://via.placeholder.com/400?text=Protein+Bars'],
    category: null,
    rating: 4.7,
    reviewCount: 456,
    benefits: ['Convenient', 'High Protein', 'Great Taste', 'Energy Boost'],
    ingredients: [
      { name: 'Whey Protein Isolate', quantity: '20', unit: 'g' },
      { name: 'Dark Chocolate', quantity: '15%', unit: '' },
    ],
    nutritionalInfo: {
      servingSize: '1 bar (65g)',
      servingsPerContainer: 10,
      calories: 240,
      protein: '20g',
      carbs: '22g',
      fat: '5g',
      fiber: '5g',
    },
    usageInstructions: 'Consume anytime for quick protein intake. Perfect post-workout.',
    certifications: ['GMP'],
    goals: ['Muscle Gain', 'Energy'],
    tags: ['Bestseller', 'Convenient'],
    isBestseller: true,
    isNewArrival: false,
    isSubscriptionEligible: false,
  },
  {
    name: 'Peanut Butter All Natural',
    slug: 'peanut-butter-natural',
    description: 'Premium natural peanut butter with 8g protein per serving. No added sugar.',
    price: 349,
    originalPrice: 449,
    discount: 22,
    stock: 500,
    sku: 'TPB001',
    images: ['https://via.placeholder.com/400?text=Peanut+Butter'],
    category: null,
    rating: 4.6,
    reviewCount: 234,
    benefits: ['Natural', 'Good Fats', 'High Protein', 'Energy'],
    ingredients: [
      { name: 'Roasted Peanuts', quantity: '99%', unit: '' },
      { name: 'Salt', quantity: '1%', unit: '' },
    ],
    nutritionalInfo: {
      servingSize: '2 tbsp (32g)',
      servingsPerContainer: 15,
      calories: 180,
      protein: '8g',
      carbs: '6g',
      fat: '16g',
      fiber: '3g',
    },
    usageInstructions: 'Mix with oats, take with toast, or use in protein shakes.',
    certifications: ['Natural'],
    goals: ['Muscle Gain', 'Energy'],
    tags: ['Natural'],
    isBestseller: false,
    isNewArrival: false,
    isSubscriptionEligible: false,
  },
  {
    name: 'Titanium BCAA Pro',
    slug: 'titanium-bcaa-pro',
    description: '10:1:1 ratio BCAA with electrolytes for intense training sessions.',
    price: 1199,
    originalPrice: 1599,
    discount: 25,
    stock: 300,
    sku: 'TBCAAP001',
    images: ['https://via.placeholder.com/400?text=BCAA+Pro'],
    category: null,
    rating: 4.6,
    reviewCount: 289,
    benefits: ['Enhanced Recovery', 'Muscle Preservation', 'Hydration', 'Performance'],
    ingredients: [
      { name: 'L-Leucine', quantity: '5', unit: 'g' },
      { name: 'L-Isoleucine', quantity: '0.5', unit: 'g' },
      { name: 'L-Valine', quantity: '0.5', unit: 'g' },
      { name: 'Electrolytes', quantity: '300', unit: 'mg' },
    ],
    nutritionalInfo: {
      servingSize: '7.5g',
      servingsPerContainer: 40,
      calories: 30,
      protein: '6g',
      carbs: '0.5g',
      fat: '0g',
      fiber: '0g',
    },
    usageInstructions: 'Mix 7.5g with 300ml water. Consume during or post-workout.',
    certifications: ['GMP'],
    goals: ['Recovery', 'Performance'],
    tags: ['Premium'],
    isBestseller: false,
    isNewArrival: true,
    isSubscriptionEligible: true,
    subscriptionDiscount: 12,
  },
  {
    name: 'Collagen Peptides',
    slug: 'collagen-peptides',
    description: 'Premium grass-fed collagen for joint, skin, and hair health.',
    price: 1299,
    originalPrice: 1699,
    discount: 24,
    stock: 400,
    sku: 'TCP001',
    images: ['https://via.placeholder.com/400?text=Collagen+Peptides'],
    category: null,
    rating: 4.5,
    reviewCount: 178,
    benefits: ['Joint Health', 'Skin Health', 'Hair Growth', 'Gut Health'],
    ingredients: [
      { name: 'Hydrolyzed Collagen Type I & III', quantity: '10', unit: 'g' },
      { name: 'Vitamin C', quantity: '50', unit: 'mg' },
    ],
    nutritionalInfo: {
      servingSize: '10g',
      servingsPerContainer: 30,
      calories: 35,
      protein: '9g',
      carbs: '0g',
      fat: '0g',
      fiber: '0g',
    },
    usageInstructions: 'Mix 10g with water, coffee, or juice daily.',
    certifications: ['GMP', 'Grass-fed'],
    goals: ['Health', 'Recovery'],
    tags: ['Premium', 'New'],
    isBestseller: false,
    isNewArrival: true,
    isSubscriptionEligible: true,
    subscriptionDiscount: 12,
  },
  {
    name: 'ZMA Recovery Complex',
    slug: 'zma-recovery-complex',
    description: 'Zinc, Magnesium, and Vitamin B6 for better sleep and hormone optimization.',
    price: 699,
    originalPrice: 899,
    discount: 22,
    stock: 350,
    sku: 'TZMA001',
    images: ['https://via.placeholder.com/400?text=ZMA+Complex'],
    category: null,
    rating: 4.5,
    reviewCount: 234,
    benefits: ['Better Sleep', 'Hormone Balance', 'Recovery', 'Immune Support'],
    ingredients: [
      { name: 'Zinc Monomethionine Aspartate', quantity: '30', unit: 'mg' },
      { name: 'Magnesium Aspartate', quantity: '450', unit: 'mg' },
      { name: 'Vitamin B6', quantity: '10.5', unit: 'mg' },
    ],
    nutritionalInfo: {
      servingSize: '3 capsules',
      servingsPerContainer: 30,
      calories: 2,
      protein: '0g',
      carbs: '0g',
      fat: '0g',
      fiber: '0g',
    },
    usageInstructions: 'Take 3 capsules before bedtime on an empty stomach.',
    certifications: ['GMP'],
    goals: ['Recovery', 'Sleep'],
    tags: ['Popular'],
    isBestseller: false,
    isNewArrival: false,
    isSubscriptionEligible: true,
    subscriptionDiscount: 10,
  },
  {
    name: 'Vegan Protein Blend',
    slug: 'vegan-protein-blend',
    description: 'Plant-based protein with complete amino acids. Perfect for vegans and vegetarians.',
    price: 1799,
    originalPrice: 2399,
    discount: 25,
    stock: 280,
    sku: 'TVP001',
    images: ['https://via.placeholder.com/400?text=Vegan+Protein'],
    category: null,
    rating: 4.4,
    reviewCount: 156,
    benefits: ['Plant-Based', 'Complete Amino Acids', 'Muscle Building', 'Sustainable'],
    ingredients: [
      { name: 'Pea Protein Isolate', quantity: '15', unit: 'g' },
      { name: 'Rice Protein', quantity: '10', unit: 'g' },
    ],
    nutritionalInfo: {
      servingSize: '30g',
      servingsPerContainer: 33,
      calories: 115,
      protein: '25g',
      carbs: '2g',
      fat: '1g',
      fiber: '1g',
    },
    usageInstructions: 'Mix 30g with 150ml plant-based milk or water.',
    certifications: ['Vegan', 'GMP'],
    goals: ['Muscle Gain', 'Vegan'],
    tags: ['Vegan', 'New'],
    isBestseller: false,
    isNewArrival: true,
    isSubscriptionEligible: true,
    subscriptionDiscount: 12,
  },
];

// Sample reviews data
const REVIEWS_NAMES = [
  { name: 'Arjun Kumar', avatar: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Priya Singh', avatar: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Virat Sharma', avatar: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Disha Patel', avatar: 'https://i.pravatar.cc/150?img=4' },
  { name: 'Rohit Verma', avatar: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Neha Gupta', avatar: 'https://i.pravatar.cc/150?img=6' },
  { name: 'Amit Reddy', avatar: 'https://i.pravatar.cc/150?img=7' },
  { name: 'Simran Kaur', avatar: 'https://i.pravatar.cc/150?img=8' },
];

const REVIEW_COMMENTS = [
  'Amazing quality! Noticed results within 3 weeks. Highly recommended!',
  'Best supplement I\'ve tried in years. Worth every rupee!',
  'Fast shipping and great customer service. Product is excellent.',
  'Taste is incredible for a protein powder. Mixes smoothly.',
  'Been using for 2 months, great results with consistent training.',
  'Quality is top-notch. Definitely buying again!',
  'Works as described. No aftertaste. Highly satisfied.',
  'Best value for money in this category. Recommended to all friends.',
  'Lab tested quality is reassuring. Great product!',
  'Consistent results. This is my go-to brand now.',
];

// Transformation stories
const TRANSFORMATION_STORIES = [
  {
    title: 'From 85kg to 72kg - Weight Loss Journey',
    beforeStats: { weight: 85, bodyFat: 28 },
    afterStats: { weight: 72, bodyFat: 12 },
    duration: '6 months',
    story: 'Started my fitness journey with Titan Nutrition supplements. Combined with proper diet and training, I lost 13kg and transformed my physique.',
    productsUsed: ['Whey Protein', 'Pre-Workout', 'BCAA'],
    userName: 'Harshit Sharma',
    results: ['13kg weight loss', '50% body fat reduction', 'Increased energy', 'Improved confidence'],
  },
  {
    title: 'Gained 15kg Muscle Mass - Bulking Success',
    beforeStats: { weight: 70, bodyFat: 16 },
    afterStats: { weight: 85, bodyFat: 14 },
    duration: '8 months',
    story: 'With Titan\'s mass gainer and consistent training, I gained quality muscle mass while maintaining low body fat.',
    productsUsed: ['Mass Gainer', 'Creatine', 'Multivitamin'],
    userName: 'Vikram Singh',
    results: ['15kg muscle gain', 'Improved strength', 'Better recovery', 'Professional physique'],
  },
  {
    title: 'Transformed in 90 Days - Lean Muscle Builder',
    beforeStats: { weight: 78, bodyFat: 22 },
    afterStats: { weight: 81, bodyFat: 10 },
    duration: '3 months',
    story: 'Intensive training with Titan supplements led to incredible physique transformation in just 90 days.',
    productsUsed: ['Whey Isolate', 'Pre-Workout', 'L-Glutamine'],
    userName: 'Pooja Verma',
    results: ['12% body fat reduction', 'Visible abs', 'Increased strength', 'Enhanced confidence'],
  },
];

// Athletes
const ATHLETES_DATA = [
  {
    name: 'Aarav Singh',
    title: 'Professional Bodybuilder',
    description: 'Mr. India 2024 Champion. 10+ years of competitive bodybuilding experience.',
    achievements: ['Mr. India 2024', 'National Champion 2023', 'Commonwealth Games Qualifier'],
    stats: { followers: 450000, engagementRate: 8.5 },
    socialLinks: {
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com',
    },
    testimonial: 'Titan Nutrition is the fuel behind my championship wins. Premium quality, consistent results!',
  },
  {
    name: 'Deepika Sharma',
    title: 'Fitness Influencer & Coach',
    description: 'Certified fitness coach with 500K+ followers. Specializes in women\'s fitness transformation.',
    achievements: ['Certified Personal Trainer', 'Best Female Fitness Influencer 2023', 'Weight Loss Coach'],
    stats: { followers: 520000, engagementRate: 9.2 },
    socialLinks: {
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com',
    },
    testimonial: 'My clients see real results with Titan products. Quality and efficacy are unmatched!',
  },
  {
    name: 'Rohan Menon',
    title: 'CrossFit Champion',
    description: 'National CrossFit competitor. Known for explosive performance and recovery.',
    achievements: ['National CrossFit Champion 2023', 'Asian Games Participant', 'Top 10 International Competitor'],
    stats: { followers: 380000, engagementRate: 7.8 },
    socialLinks: {
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com',
    },
    testimonial: 'Recovery is crucial in CrossFit. Titan\'s BCAA and protein blends are game-changers!',
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});
    await TransformationStory.deleteMany({});
    await Athlete.deleteMany({});

    // Create categories
    const categories = await Category.create([
      {
        name: 'Protein',
        slug: 'protein',
        description: 'High-quality protein powders for muscle building',
        goals: ['Muscle Gain', 'Recovery'],
      },
      {
        name: 'Mass Gainers',
        slug: 'mass-gainers',
        description: 'Calorie-dense formulas for muscle building',
        goals: ['Muscle Gain', 'Strength'],
      },
      {
        name: 'Pre-Workout',
        slug: 'pre-workout',
        description: 'Energy and performance boosters',
        goals: ['Performance', 'Strength'],
      },
      {
        name: 'Recovery',
        slug: 'recovery',
        description: 'Post-workout recovery supplements',
        goals: ['Recovery'],
      },
      {
        name: 'Vitamins & Minerals',
        slug: 'vitamins-minerals',
        description: 'Essential micronutrients for health',
        goals: ['Health', 'Immunity'],
      },
    ]);

    console.log('Categories created:', categories.length);

    // Assign categories to products
    PRODUCTS_DATA[0].category = categories[0]._id; // Whey Isolate -> Protein
    PRODUCTS_DATA[1].category = categories[1]._id; // Mass Gainer -> Mass Gainers
    PRODUCTS_DATA[2].category = categories[0]._id; // Creatine -> Protein
    PRODUCTS_DATA[3].category = categories[2]._id; // Pre-Workout -> Pre-Workout
    PRODUCTS_DATA[4].category = categories[3]._id; // BCAA -> Recovery
    PRODUCTS_DATA[5].category = categories[4]._id; // Fish Oil -> Vitamins
    PRODUCTS_DATA[6].category = categories[4]._id; // Multivitamin -> Vitamins
    PRODUCTS_DATA[7].category = categories[0]._id; // Casein -> Protein
    PRODUCTS_DATA[8].category = categories[0]._id; // Whey Concentrate -> Protein
    PRODUCTS_DATA[9].category = categories[3]._id; // L-Glutamine -> Recovery
    PRODUCTS_DATA[10].category = categories[0]._id; // Protein Bars -> Protein
    PRODUCTS_DATA[11].category = categories[0]._id; // Peanut Butter -> Protein
    PRODUCTS_DATA[12].category = categories[3]._id; // BCAA Pro -> Recovery
    PRODUCTS_DATA[13].category = categories[4]._id; // Collagen -> Vitamins
    PRODUCTS_DATA[14].category = categories[3]._id; // ZMA -> Recovery
    PRODUCTS_DATA[15].category = categories[0]._id; // Vegan Protein -> Protein

    // Create products
    const products = await Product.create(PRODUCTS_DATA);
    console.log('Products created:', products.length);

    // Create demo user
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@titanutrition.com',
      password: await hashPassword('demo123'),
      phone: '+91-9999999999',
    });

    console.log('Demo user created');

    // Create reviews
    let reviewCount = 0;
    for (const product of products) {
      const reviewCount_ = Math.floor(Math.random() * 5) + 3;
      for (let i = 0; i < reviewCount_; i++) {
        const reviewer = REVIEWS_NAMES[Math.floor(Math.random() * REVIEWS_NAMES.length)];
        await Review.create({
          product: product._id,
          user: demoUser._id,
          rating: Math.floor(Math.random() * 2) + 4,
          title: `Great product! ${i + 1}`,
          comment: REVIEW_COMMENTS[Math.floor(Math.random() * REVIEW_COMMENTS.length)],
          verified: true,
        });
        reviewCount++;
      }
    }
    console.log('Reviews created:', reviewCount);

    // Create transformation stories
    await TransformationStory.create(TRANSFORMATION_STORIES);
    console.log('Transformation stories created:', TRANSFORMATION_STORIES.length);

    // Create athletes
    await Athlete.create(ATHLETES_DATA);
    console.log('Athletes created:', ATHLETES_DATA.length);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
