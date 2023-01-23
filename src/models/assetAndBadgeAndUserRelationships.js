import mongoose from 'mongoose';

const assetAndBadgeAndUserRelationshipSchema = new mongoose.Schema({
  asset: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
  },
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
});

const AssetAndBadgeAndUserRelationship = mongoose.model(
  'AssetAndBadgeAndUserRelationship',
  assetAndBadgeAndUserRelationshipSchema
);
export default AssetAndBadgeAndUserRelationship;
