import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || { aboutMe: '', technicalSkills: [], softSkills: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      profile.aboutMe = req.body.aboutMe;
      profile.technicalSkills = req.body.technicalSkills;
      profile.softSkills = req.body.softSkills;
      await profile.save();
    } else {
      profile = new Profile(req.body);
      await profile.save();
    }
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



export default router;
