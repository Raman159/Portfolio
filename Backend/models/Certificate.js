import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);
