import mongoose from 'mongoose';

const reportUserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  reportedUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  issue: {
    label: String,
    reason: String,
  },
  description: String,
});

const ReportUser = mongoose.model('ReportUser', reportUserSchema);
export default ReportUser;
