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

router.post('/upload-home-image', upload.single('image'), async (req, res) => {
  try {
    console.log('Home image upload request received');
    console.log('File:', req.file);
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    let profile = await Profile.findOne();
    const imageUrl = `/uploads/${req.file.filename}`;
    
    if (profile) {
      profile.homeImage = imageUrl;
      await profile.save();
    } else {
      profile = new Profile({ homeImage: imageUrl, aboutMe: '', technicalSkills: [], softSkills: [] });
      await profile.save();
    }
    
    console.log('Home image saved:', imageUrl);
    res.json({ imageUrl, success: true });
  } catch (error) {
    console.error('Home image upload error:', error);
    res.status(400).json({ message: error.message });
  }
});

router.post('/upload-about-image', upload.single('image'), async (req, res) => {
  try {
    console.log('About image upload request received');
    console.log('File:', req.file);
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    let profile = await Profile.findOne();
    const imageUrl = `/uploads/${req.file.filename}`;
    
    if (profile) {
      profile.aboutImage = imageUrl;
      await profile.save();
    } else {
      profile = new Profile({ aboutImage: imageUrl, aboutMe: '', technicalSkills: [], softSkills: [] });
      await profile.save();
    }
    
    console.log('About image saved:', imageUrl);
    res.json({ imageUrl, success: true });
  } catch (error) {
    console.error('About image upload error:', error);
    res.status(400).json({ message: error.message });
  }
});

export default router;
