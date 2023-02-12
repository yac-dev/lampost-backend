import mongoose from 'mongoose';

const reportAssetSchema = new mongoose.Schema({
  asset: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  issue: {
    label: String,
    reason: String,
  },
  description: String,
});

const ReportAsset = mongoose.model('ReportAsset', reportAssetSchema);
export default ReportAsset;
