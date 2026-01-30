import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tech: [{ type: String }],
  category: { type: String, required: true },
  year: { type: String, required: true },
  visitLink: { type: String }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
