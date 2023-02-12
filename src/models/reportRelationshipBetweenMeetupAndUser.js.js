import mongoose from 'mongoose';

const reportRelationshipBetweenMeetupAndUserSchema = new mongoose.Schema({
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  issue: {
    label: String,
    reason: String,
  },
  description: String,
});

const ReportRelationshipBetweenMeetupAndUser = mongoose.model(
  'ReportRelationshipBetweenMeetupAndUser',
  reportRelationshipBetweenMeetupAndUserSchema
);
export default ReportRelationshipBetweenMeetupAndUser;
