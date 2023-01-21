import mongoose from 'mongoose';

const launcherAndPatronRelationshipSchema = new mongoose.Schema({
  launcher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  patron: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const LauncherAndPatronRelationship = mongoose.model(
  'LauncherAndPatronRelationship',
  launcherAndPatronRelationshipSchema
);
export default LauncherAndPatronRelationship;
