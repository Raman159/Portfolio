import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model('Education', educationSchema);
