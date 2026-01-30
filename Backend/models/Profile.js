import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  aboutMe: { type: String, required: true },
  technicalSkills: [{ type: String }],
  softSkills: [{ type: String }],
  homeImage: { type: String },
  aboutImage: { type: String }
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
