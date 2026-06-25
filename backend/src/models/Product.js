import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: Number,
  discount: Number,
  stock: {
    type: Number,
    default: 0,
  },
  sku: {
    type: String,
    unique: true,
  },
  images: [String],
  video: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  benefits: [String],
  ingredients: [{
    name: String,
    quantity: String,
    unit: String,
  }],
  nutritionalInfo: {
    servingSize: String,
    servingsPerContainer: Number,
    calories: Number,
    protein: String,
    carbs: String,
    fat: String,
    fiber: String,
  },
  usageInstructions: String,
  labReports: [String],
  certifications: [String],
  goals: [String],
  tags: [String],
  isBestseller: Boolean,
  isNewArrival: Boolean,
  isSubscriptionEligible: Boolean,
  subscriptionDiscount: Number,
  relatedProducts: [mongoose.Schema.Types.ObjectId],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Product', productSchema);
