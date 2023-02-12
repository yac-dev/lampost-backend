import mongoose from 'mongoose';

const reportLibrarySchema = new mongoose.Schema({
  library: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
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

const ReportLibrary = mongoose.model('ReportLibrary', reportLibrarySchema);
export default ReportLibrary;
