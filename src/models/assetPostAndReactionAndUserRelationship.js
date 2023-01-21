import mongoose from 'mongoose';

const assetPostAndReactionAndUserRelationshipSchema = new mongoose.Schema({
  assetPost: {
    type: mongoose.Schema.ObjectId,
    ref: 'AssetPost',
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

const AssetPostAndReactionAndUser = mongoose.model(
  'AssetPostAndReactionAndUser',
  assetPostAndReactionAndUserRelationshipSchema
);

export default AssetPostAndReactionAndUser;
