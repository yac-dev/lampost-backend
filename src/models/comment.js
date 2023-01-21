import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  content: String, // これはstringか、画像やら動画見たいなbinary dataか。まあ、なんでもあり。
  replyTo: {
    // commentのidが入ることになる。
    type: mongoose.Schema.ObjectId,
    ref: 'Comment',
  },
  createdAt: {
    type: Date,
  },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
