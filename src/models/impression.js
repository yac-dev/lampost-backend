import mongoose from 'mongoose';

const impressionSchema = mongoose.Schema({
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  content: String, // これはstringか、画像やら動画見たいなbinary dataか。まあ、なんでもあり。
  // reply: {
  //   // commentのidが入ることになる。
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Comment',
  // },　impressionに対して、replyはなしかね。memberだけが書けるコメント欄っていう感じになるからね。
  tip: {
    // 金のfieldって、、、、分からないな。。。
    type: Number,
  },
  createdAt: {
    type: Date,
  },
});

const Impression = mongoose.model('Impression', impressionSchema);
export default Impression;
