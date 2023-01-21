import mongoose from 'mongoose';

const assetPostSchema = new mongoose.Schema({
  caption: {
    type: String,
  },
  assets: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Asset',
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  library: {
    type: mongoose.Schema.ObjectId,
    ref: 'Library',
  },
  topEmojis: [String], //だいたい10個かな。そんで、and more的に出す感じ。
  createdAt: Date,
});

const AssetPost = mongoose.model('AssetPost', assetPostSchema);
export default AssetPost;
