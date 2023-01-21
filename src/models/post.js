import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  // clientに表示するのはtagだが、backend上ではroll。。。んーーーー。なんか面倒くさいよな。tagとrollの中間に位置する言葉はない？？¥
  // どのような接着剤があるか。考えよう。
  // tag, roll, album
  // 要は、launcherがmeetupをpostする時に、「tag名を決めてください」と問うか、「roll名を決めてください」と問うか。まあ、rool名を決めてくださいは明らかに分からん。「album名を決めてください」も分からん。
  // うん。tag名を決めてくださいでいいかもな。もう。そのmeetupにtag名を付けて、写真はそのままそのtage名でrollに参加もしくはrollが作られる。
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  comments: [
    {
      content: String,
      user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    },
  ],
  medias: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Media',
    },
  ],
  launcher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
  },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
