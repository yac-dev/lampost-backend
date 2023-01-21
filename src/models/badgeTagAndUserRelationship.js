import mongoose from 'mongoose';

// これはあくまで、badgeのpageでtagをpressしたらそのuserたちを全部fetchしてくるためにする。
const badgeTagAndUserRelationshipSchema = new mongoose.Schema({
  badgeTag: {
    type: mongoose.Schema.ObjectId,
    ref: 'BadgeTag',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const BadgeTagAndUserRelationship = mongoose.model('BadgeTagAndUserRelationship', badgeTagAndUserRelationshipSchema);
export default BadgeTagAndUserRelationship;
