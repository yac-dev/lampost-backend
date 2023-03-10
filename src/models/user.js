import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: [true, 'This email has already been taken.'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Enrollment number must be at least 12 characters long'],
    // validate: {
    //   validator: function (val) {
    //     return val.length >= 12 || val.length === 0;
    //   },
    //   message: () => `Enrollment number must be at least 12 characters long`,
    // },
  },
  photo: {
    type: String,
  },
  pushToken: {
    type: String,
  },
  ongoingMeetup: {
    meetup: {
      type: mongoose.Schema.ObjectId,
      ref: 'Meetup',
    },
    state: false,
  },
  // 4つまでで。
  topBadges: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Badge',
    },
    // 4つまで
  ],
  upcomingMeetups: [
    {
      meetup: {
        type: mongoose.Schema.ObjectId,
        ref: 'Meetup',
      },
      viewedChatsLastTime: Date,
    },
  ],
  leadership: {
    total: Number,
    teamManagement: Number,
    communication: Number,
    creativity: Number,
    courage: Number,
    integrity: Number,
  },
  patrons: {
    type: Number,
  },
  assets: {
    type: Number,
  },
  logs: {
    type: Number,
  },
  createdAt: {
    type: Date,
  },
});

function arrayLimit(val) {
  return val.length <= 3;
}

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

userSchema.methods.isPasswordCorrect = async (enteredPassword, actualPassword) => {
  return await bcrypt.compare(enteredPassword, actualPassword);
};

// virtualで、subscribersを用意しないといかんな。

// userSchema.virtual('joinedMeetups', {
//   ref: 'Meetup',
//   foreignField: 'users',
//   localField: '_id',
// });

// userSchema.virtual('meetups', {
//   ref: 'Meetup',
//   foreignField: 'host',
//   localField: '_id',
// });

// userSchema.virtual('meetups', {
//   ref: 'Meetup',
//   foreignField: 'attendees',
//   localField: '_id',
// });

const User = mongoose.model('User', userSchema);
export default User;
