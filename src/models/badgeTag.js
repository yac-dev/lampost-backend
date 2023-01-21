import mongoose from 'mongoose';

const badgeTagSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 20,
  },
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
  totalHolders: Number,
});

// badgeとuser relationship
// {badge: badgeId, user: userId} // badge側でuserを全部取ってこないといけないしな。
// user { badges: [{badge: badgeId, url: 'https://', tags: [tagId1, tagId2, tagId3]}, {}]}

const BadgeTag = mongoose.model('BadgeTag', badgeTagSchema);
export default BadgeTag;
