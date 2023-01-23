import mongoose from 'mongoose';

const assetAndReactionAndUserRelationshipSchema = new mongoose.Schema({
  asset: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
  },
  reaction: {
    type: mongoose.Schema.ObjectId,
    ref: 'Reaction',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
});

const AssetAndReactionAndUser = mongoose.model('AssetAndReactionAndUser', assetAndReactionAndUserRelationshipSchema);

export default AssetAndReactionAndUser;
