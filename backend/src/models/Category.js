import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  image: String,
  icon: String,
  goals: [String], // e.g., 'Muscle Gain', 'Weight Loss', 'Recovery'
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Category', categorySchema);
