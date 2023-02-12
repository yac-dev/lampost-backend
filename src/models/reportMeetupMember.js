import mongoose from 'mongoose';

const reportMeetupMemberSchema = new mongoose.Schema({
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
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
  useful: Boolean,
});

const ReportMeetupMember = mongoose.model('ReportMeetupMember', reportMeetupMemberSchema);
export default ReportMeetupMember;
