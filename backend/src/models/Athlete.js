import mongoose from 'mongoose';

const athleteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: String,
  description: String,
  image: String,
  achievements: [String],
  stats: {
    followers: Number,
    engagementRate: Number,
  },
  socialLinks: {
    instagram: String,
    youtube: String,
    twitter: String,
  },
  featuredProducts: [mongoose.Schema.Types.ObjectId],
  testimonial: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Athlete', athleteSchema);
