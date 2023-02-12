import mongoose from 'mongoose';

const userBlockingRelationshipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  blocking: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const UserBlockingRelationship = mongoose.model('UserBlockingRelationship', userBlockingRelationshipSchema);
export default UserBlockingRelationship;
