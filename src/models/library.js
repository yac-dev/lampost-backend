import mongoose from 'mongoose';

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  badges: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Badge',
    },
  ],
  description: String,
  launcher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  thumbnail: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
  },
  color: String,
  totalAssets: Number,
  totalMembers: Number,
  rate: Number,
  createdAt: Date,
  // rolls: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'Roll',
  //   },
  // ],
});

// このlibraryに紐づくalbumがいくともある感じになる。
// rolls [{type: roll schema, ref: 'roll'}] ってこと。
librarySchema.set('toJSON', { virtuals: true });
librarySchema.set('toObject', { virtuals: true });

// librarySchema.virtual('members', {
//   ref: 'User',
//   foreignField: 'libraries',
//   localField: '_id'
// })

const Library = mongoose.model('Library', librarySchema);
export default Library;
