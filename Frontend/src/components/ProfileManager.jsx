import React, { useState, useEffect } from 'react';

const ProfileManager = ({ profile, onSave }) => {
  const [formData, setFormData] = useState({
    aboutMe: '',
    technicalSkills: '',
    softSkills: ''
  });

  useEffect(() => {
    setFormData({
      aboutMe: profile.aboutMe || '',
      technicalSkills: profile.technicalSkills?.join(', ') || '',
      softSkills: profile.softSkills?.join(', ') || ''
    });
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      aboutMe: formData.aboutMe,
      technicalSkills: formData.technicalSkills?.split(',').map(s => s.trim()) || [],
      softSkills: formData.softSkills?.split(',').map(s => s.trim()) || []
    };
    onSave(profileData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-dark p-4 rounded mb-4">
        <h4 className="text-primary mb-3">Update Profile</h4>
        <div className="mb-3">
          <label className="form-label text-light">About Me</label>
          <textarea 
            className="form-control" 
            rows="5"
            value={formData.aboutMe} 
            onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-light">Technical Skills (comma separated)</label>
          <textarea 
            className="form-control" 
            rows="3"
            value={formData.technicalSkills} 
            onChange={(e) => setFormData({ ...formData, technicalSkills: e.target.value })} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-light">Soft Skills (comma separated)</label>
          <textarea 
            className="form-control" 
            rows="3"
            value={formData.softSkills} 
            onChange={(e) => setFormData({ ...formData, softSkills: e.target.value })} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>

      <div className="bg-dark p-4 rounded">
        <h5 className="text-primary">Current Profile</h5>
        <div className="mb-3">
          <h6 className="text-light">About Me:</h6>
          <p className="text-light">{profile.aboutMe}</p>
        </div>
        <div className="mb-3">
          <h6 className="text-light">Technical Skills:</h6>
          <p className="text-light">{profile.technicalSkills?.join(', ')}</p>
        </div>
        <div className="mb-3">
          <h6 className="text-light">Soft Skills:</h6>
          <p className="text-light">{profile.softSkills?.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;