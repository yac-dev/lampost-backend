import mongoose from 'mongoose';

const badgeAndUserRelationshipSchema = new mongoose.Schema({
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  link: {
    type: String,
  },
  // badgeTags: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'BadgeTag',
  //   },
  // ], // 別にidで持つ必要もない。ここに、20000document入ることもないからね。
  badgeTags: [{ type: mongoose.Schema.ObjectId, ref: 'BadgeTag' }],
  createdAt: Date,
});

const BadgeAndUserRelationship = mongoose.model('BadgeAndUserRelationship', badgeAndUserRelationshipSchema);
export default BadgeAndUserRelationship;
