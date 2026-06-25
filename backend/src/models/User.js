import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: String,
  avatar: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  addresses: [{
    type: {
      type: String,
      enum: ['home', 'work', 'other'],
      default: 'home',
    },
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
    isDefault: Boolean,
  }],
  loyaltyPoints: {
    type: Number,
    default: 0,
  },
  subscriptions: [{
    productId: mongoose.Schema.Types.ObjectId,
    frequency: String,
    nextDelivery: Date,
    active: Boolean,
  }],
  preferences: {
    newsletter: { type: Boolean, default: false },
    notifications: { type: Boolean, default: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);
