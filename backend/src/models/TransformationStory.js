import mongoose from 'mongoose';

const transformationStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  beforeImage: String,
  afterImage: String,
  beforeStats: {
    weight: Number,
    bodyFat: Number,
  },
  afterStats: {
    weight: Number,
    bodyFat: Number,
  },
  duration: String,
  story: String,
  productsUsed: [String],
  userName: String,
  userImage: String,
  results: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('TransformationStory', transformationStorySchema);
