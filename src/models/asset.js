import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  // s3のlink先をこれに
  data: {
    type: String,
  },
  type: {
    type: String,
    // enums [photo or video]
  },
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  badges: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Badge',
    },
  ],
  place: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: [Number],
    name: String,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  badges: [
    {
      badge: {
        type: mongoose.Schema.ObjectId,
        ref: 'Badge',
      },
      totalCounts: Number,
    },
  ],
  taggedPeople: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: Date,
});

const Asset = mongoose.model('Asset', assetSchema);
export default Asset;
