import mongoose from 'mongoose';

const libraryAndUserRelationshipSchema = new mongoose.Schema({
  library: {
    type: mongoose.Schema.ObjectId,
    ref: 'Library',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const LibraryAndUserRelationship = mongoose.model('LibraryAndUserRelationship', libraryAndUserRelationshipSchema);

export default LibraryAndUserRelationship;
