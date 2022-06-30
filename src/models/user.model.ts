import mongoose from 'mongoose';

const addressTypes = ['home', 'work', 'other'];

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, message: 'Name is required' },
  address: String,
  addressType: {
    type: String,
    required: true,
    enum: addressTypes
  },
  createdOn: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

export const User = mongoose.model('User', userSchema);
