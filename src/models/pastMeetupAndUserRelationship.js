import mongoose from 'mongoose';

const pastMeetupAndUserRelationshipSchema = new mongoose.Schema({
  pastMeetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  // launcher: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  // },
  // representation: String,
  // impressions: [
  //   {
  //     text: String,
  //     user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  //     createdAt: Date,
  //   },
  // ],
});

const PastMeetupAndUserRelationship = mongoose.model(
  'PastMeetupAndUserRelationship',
  pastMeetupAndUserRelationshipSchema
);

export default PastMeetupAndUserRelationship;
