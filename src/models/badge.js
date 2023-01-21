import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  icon: {
    type: String,
    // file nameね。aws上の。
  },
  name: {
    type: String,
  },
  color: {
    type: String,
  },
  type: {
    type: String,
    // tech, food, sports etc
  },
  totalHolders: {
    type: Number,
  },
  creator: {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    createdAt: Date,
  },
  // 各badgeが何色か、その情報も確実に必要。それは、いつでも簡単に変えられるようにすべきね。
  //　っていうか、結局重要なのは、
  // 1, badgeがs3のどのicon画像を使うか
  // 2, badgeの名前
  // 3, badgeの色
  // 4, badgeのtype
  // 5, badgeのcreator（まあ、最初は全部俺になるだろうけど。）badgeを作る上で、userに責任をもたせるようにする。badgeそのものに価値があったりするといいね。「1000人のuserがこのbadgeを持っています」なんていう情報は当たり前。さらなる価値をuserに見せたいね。
  // badgeがまるで、人のようにtimelineを持つこと。これも面白い。誰がいつこのbadgeを作りましたから始まり、誰がいつこのbadgeをaddしました、このmeetupがlaunchされた、あらゆるbadgeに関わることをbadgeに持たせる、これ面白い。
});

badgeSchema.set('toJSON', { virtuals: true });
badgeSchema.set('toObject', { virtuals: true });

badgeSchema.virtual('rolls', {
  ref: 'Roll',
  foreignField: 'badge',
  localField: '_id',
});

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;
