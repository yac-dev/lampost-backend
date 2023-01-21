import mongoose from 'mongoose';

const AssetAndUserRelationshipSchema = new mongoose.Schema({
  asset: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
});

const AssetAndUserRelationship = mongoose.model('AssetAndUserRelationship', AssetAndUserRelationshipSchema);
export default AssetAndUserRelationship;
