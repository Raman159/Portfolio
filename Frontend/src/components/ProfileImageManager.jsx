import React, { useState } from 'react';

const ProfileImageManager = ({ profile, onSave }) => {
  const [homeImageFile, setHomeImageFile] = useState(null);
  const [aboutImageFile, setAboutImageFile] = useState(null);
  const [homePreview, setHomePreview] = useState(null);
  const [aboutPreview, setAboutPreview] = useState(null);

  const handleHomeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHomeImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setHomePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAboutImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAboutImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setAboutPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleHomeSubmit = (e) => {
    e.preventDefault();
    if (homeImageFile) {
      const formData = new FormData();
      formData.append('image', homeImageFile);
      onSave(formData, null, 'home');
      setHomeImageFile(null);
      setHomePreview(null);
    }
  };

  const handleAboutSubmit = (e) => {
    e.preventDefault();
    if (aboutImageFile) {
      const formData = new FormData();
      formData.append('image', aboutImageFile);
      onSave(formData, null, 'about');
      setAboutImageFile(null);
      setAboutPreview(null);
    }
  };

  return (
    <div>
      {/* Home Image Upload */}
      <form onSubmit={handleHomeSubmit} className="bg-dark p-4 rounded mb-4">
        <h4 className="text-primary mb-3">Update Home Page Image</h4>
        <div className="mb-3">
          <input 
            type="file" 
            className="form-control" 
            accept="image/*"
            onChange={handleHomeImageChange}
            required 
          />
        </div>
        {homePreview && (
          <div className="mb-3">
            <img src={homePreview} alt="Preview" className="img-thumbnail" style={{width: '150px', height: '150px', objectFit: 'cover'}} />
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={!homeImageFile}>
          Update Home Image
        </button>
      </form>

      {/* About Image Upload */}
      <form onSubmit={handleAboutSubmit} className="bg-dark p-4 rounded mb-4">
        <h4 className="text-primary mb-3">Update About Page Image</h4>
        <div className="mb-3">
          <input 
            type="file" 
            className="form-control" 
            accept="image/*"
            onChange={handleAboutImageChange}
            required 
          />
        </div>
        {aboutPreview && (
          <div className="mb-3">
            <img src={aboutPreview} alt="Preview" className="img-thumbnail" style={{width: '150px', height: '150px', objectFit: 'cover'}} />
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={!aboutImageFile}>
          Update About Image
        </button>
      </form>

      {/* Current Images */}
      <div className="bg-dark p-4 rounded">
        <h5 className="text-primary mb-3">Current Images</h5>
        <div className="row">
          <div className="col-md-6">
            <h6 className="text-light">Home Image:</h6>
            {profile?.homeImage ? (
              <img src={`http://localhost:5000${profile.homeImage}`} alt="Home" className="img-thumbnail" style={{width: '150px', height: '150px', objectFit: 'cover'}} />
            ) : (
              <p className="text-light">No home image uploaded</p>
            )}
          </div>
          <div className="col-md-6">
            <h6 className="text-light">About Image:</h6>
            {profile?.aboutImage ? (
              <img src={`http://localhost:5000${profile.aboutImage}`} alt="About" className="img-thumbnail" style={{width: '150px', height: '150px', objectFit: 'cover'}} />
            ) : (
              <p className="text-light">No about image uploaded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageManager;