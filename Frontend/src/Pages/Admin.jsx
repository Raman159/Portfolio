import React, { useState, useEffect } from 'react';
import { fetchCertificates, createCertificate, updateCertificate, deleteCertificate, fetchProjects, createProject, updateProject, deleteProject, fetchExperiences, createExperience, updateExperience, deleteExperience, fetchEducation, createEducation, updateEducation, deleteEducation, fetchProfile, updateProfile, adminLogin, changePassword, createAdmin } from '../services/api';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
  const [activeTab, setActiveTab] = useState('certificates');
  const [certificates, setCertificates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [profile, setProfile] = useState({ aboutMe: '', technicalSkills: [], softSkills: [] });
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('adminLoggedIn');
    if (loggedIn) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn) loadData();
  }, [activeTab, isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await adminLogin(loginData.username, loginData.password);
      if (result.success) {
        setIsLoggedIn(true);
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminUsername', loginData.username);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.message.includes('Invalid credentials')) {
        const shouldCreateAdmin = window.confirm('Admin not found. Create admin with these credentials?');
        if (shouldCreateAdmin) {
          try {
            const result = await createAdmin(loginData.username, loginData.password);
            if (result.success) {
              alert('Admin created successfully. Please login again.');
            } else {
              alert('Failed to create admin: ' + result.message);
            }
          } catch (createError) {
            alert('Failed to create admin');
          }
        }
      } else {
        alert('Login failed: ' + error.message);
      }
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const username = sessionStorage.getItem('adminUsername');
      const result = await changePassword(username, passwordData.oldPassword, passwordData.newPassword);
      if (result.success) {
        alert('Password changed successfully');
        setShowPasswordChange(false);
        setPasswordData({ oldPassword: '', newPassword: '' });
      } else {
        alert('Invalid old password');
      }
    } catch (error) {
      alert('Password change failed');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUsername');
  };

  const loadData = async () => {
    try {
      if (activeTab === 'certificates') {
        const data = await fetchCertificates();
        setCertificates(data);
      } else if (activeTab === 'projects') {
        const data = await fetchProjects();
        setProjects(data);
      } else if (activeTab === 'experiences') {
        const data = await fetchExperiences();
        setExperiences(data);
      } else if (activeTab === 'education') {
        const data = await fetchEducation();
        setEducation(data);
      } else if (activeTab === 'profile') {
        const data = await fetchProfile();
        setProfile(data);
        setFormData({ aboutMe: data.aboutMe, technicalSkills: data.technicalSkills?.join(', ') || '', softSkills: data.softSkills?.join(', ') || '' });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'certificates') {
        if (editingItem) {
          await updateCertificate(editingItem._id, formData);
        } else {
          await createCertificate(formData);
        }
      } else if (activeTab === 'projects') {
        const projectData = { ...formData, tech: formData.tech?.split(',').map(t => t.trim()) || [] };
        if (editingItem) {
          await updateProject(editingItem._id, projectData);
        } else {
          await createProject(projectData);
        }
      } else if (activeTab === 'experiences') {
        const expData = { ...formData, description: formData.description?.split('\n').filter(d => d.trim()) || [] };
        if (editingItem) {
          await updateExperience(editingItem._id, expData);
        } else {
          await createExperience(expData);
        }
      } else if (activeTab === 'education') {
        if (editingItem) {
          await updateEducation(editingItem._id, formData);
        } else {
          await createEducation(formData);
        }
      } else if (activeTab === 'profile') {
        const profileData = { 
          aboutMe: formData.aboutMe,
          technicalSkills: formData.technicalSkills?.split(',').map(s => s.trim()) || [],
          softSkills: formData.softSkills?.split(',').map(s => s.trim()) || []
        };
        await updateProfile(profileData);
        alert('Profile updated successfully');
      }
      setFormData({});
      setEditingItem(null);
      loadData();
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    if (activeTab === 'projects') {
      setFormData({ ...item, tech: item.tech?.join(', ') || '' });
    } else if (activeTab === 'experiences') {
      setFormData({ ...item, description: item.description?.join('\n') || '' });
    } else {
      setFormData(item);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      if (activeTab === 'certificates') await deleteCertificate(id);
      else if (activeTab === 'projects') await deleteProject(id);
      else if (activeTab === 'experiences') await deleteExperience(id);
      else if (activeTab === 'education') await deleteEducation(id);
      loadData();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="bg-dark p-4 rounded border border-primary">
              <h3 className="text-primary text-center mb-4">Admin Login</h3>
              <form onSubmit={handleLogin}>
                <input type="text" className="form-control mb-3" placeholder="Username" value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} required />
                <input type="password" className="form-control mb-3" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderForm = () => {
    if (activeTab === 'certificates') {
      return (
        <div className="mb-4 mb-md-5">
          <div className="bg-dark border border-primary rounded p-3 p-md-4">
            <h4 className="text-primary mb-3">{editingItem ? 'Edit' : 'Add'} Certificate</h4>
            <form onSubmit={handleSubmit}>
              <input type="text" className="form-control mb-2" placeholder="Title" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              <input type="text" className="form-control mb-2" placeholder="Date" value={formData.date || ''} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
              <textarea className="form-control mb-3" placeholder="Description" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              <button type="submit" className="btn btn-primary me-2">{editingItem ? 'Update' : 'Create'}</button>
              {editingItem && <button type="button" className="btn btn-secondary" onClick={() => { setEditingItem(null); setFormData({}); }}>Cancel</button>}
            </form>
          </div>
        </div>
      );
    } else if (activeTab === 'projects') {
      return (
        <div className="mb-4 mb-md-5">
          <div className="bg-dark border border-primary rounded p-3 p-md-4">
            <h4 className="text-primary mb-3">{editingItem ? 'Edit' : 'Add'} Project</h4>
            <form onSubmit={handleSubmit}>
              <input type="text" className="form-control mb-2" placeholder="Title" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              <textarea className="form-control mb-2" placeholder="Description" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              <input type="text" className="form-control mb-2" placeholder="Technologies (comma separated)" value={formData.tech || ''} onChange={(e) => setFormData({ ...formData, tech: e.target.value })} required />
              <input type="text" className="form-control mb-2" placeholder="Category" value={formData.category || ''} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
              <input type="text" className="form-control mb-2" placeholder="Year" value={formData.year || ''} onChange={(e) => setFormData({ ...formData, year: e.target.value })} required />
              <input type="url" className="form-control mb-3" placeholder="Visit Link (optional)" value={formData.visitLink || ''} onChange={(e) => setFormData({ ...formData, visitLink: e.target.value })} />
              <button type="submit" className="btn btn-primary me-2">{editingItem ? 'Update' : 'Create'}</button>
              {editingItem && <button type="button" className="btn btn-secondary" onClick={() => { setEditingItem(null); setFormData({}); }}>Cancel</button>}
            </form>
          </div>
        </div>
      );
    } else if (activeTab === 'experiences') {
      return (
        <div className="mb-4 mb-md-5">
          <div className="bg-dark border border-primary rounded p-3 p-md-4">
            <h4 className="text-primary mb-3">{editingItem ? 'Edit' : 'Add'} Experience</h4>
            <form onSubmit={handleSubmit}>
              <input type="text" className="form-control mb-2" placeholder="Company" value={formData.company || ''} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required />
              <input type="text" className="form-control mb-2" placeholder="Position" value={formData.position || ''} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required />
              <input type="text" className="form-control mb-2" placeholder="Duration" value={formData.duration || ''} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required />
              <textarea className="form-control mb-2" placeholder="Description (one per line)" rows="4" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              <input type="text" className="form-control mb-2" placeholder="Location" value={formData.location || ''} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
              <input type="text" className="form-control mb-3" placeholder="Type" value={formData.type || ''} onChange={(e) => setFormData({ ...formData, type: e.target.value })} required />
              <button type="submit" className="btn btn-primary me-2">{editingItem ? 'Update' : 'Create'}</button>
              {editingItem && <button type="button" className="btn btn-secondary" onClick={() => { setEditingItem(null); setFormData({}); }}>Cancel</button>}
            </form>
          </div>
        </div>
      );
    } else if (activeTab === 'education') {
      return (
        <div className="mb-4 mb-md-5">
          <div className="bg-dark border border-primary rounded p-3 p-md-4">
            <h4 className="text-primary mb-3">{editingItem ? 'Edit' : 'Add'} Education</h4>
            <form onSubmit={handleSubmit}>
              <input type="text" className="form-control mb-2" placeholder="Degree" value={formData.degree || ''} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} required />
              <input type="text" className="form-control mb-2" placeholder="Institution" value={formData.institution || ''} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} required />
              <input type="text" className="form-control mb-2" placeholder="Duration" value={formData.duration || ''} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required />
              <textarea className="form-control mb-3" placeholder="Description" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              <button type="submit" className="btn btn-primary me-2">{editingItem ? 'Update' : 'Create'}</button>
              {editingItem && <button type="button" className="btn btn-secondary" onClick={() => { setEditingItem(null); setFormData({}); }}>Cancel</button>}
            </form>
          </div>
        </div>
      );
    } else if (activeTab === 'profile') {
      return (
        <div className="mb-4 mb-md-5">
          <div className="bg-dark border border-primary rounded p-3 p-md-4">
            <h4 className="text-primary mb-3">Edit Profile</h4>
            <form onSubmit={handleSubmit}>
              <textarea className="form-control mb-2" placeholder="About Me" rows="4" value={formData.aboutMe || ''} onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })} required />
              <input type="text" className="form-control mb-2" placeholder="Technical Skills (comma separated)" value={formData.technicalSkills || ''} onChange={(e) => setFormData({ ...formData, technicalSkills: e.target.value })} required />
              <input type="text" className="form-control mb-3" placeholder="Soft Skills (comma separated)" value={formData.softSkills || ''} onChange={(e) => setFormData({ ...formData, softSkills: e.target.value })} required />
              <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
          </div>
        </div>
      );
    }
  };

  const renderList = () => {
    const data = activeTab === 'certificates' ? certificates : activeTab === 'projects' ? projects : activeTab === 'experiences' ? experiences : education;
    if (activeTab === 'profile') return null;
    return (
      <div className="slide-in" style={{ animationDelay: "0.3s" }}>
        <h5 className="fw-bold mb-2 text-white mb-md-3"><u>Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</u></h5>
        {data.map((item, index) => (
          <div 
            key={item._id} 
            className={`mb-2 mb-md-3 pb-2 pb-md-3 ${index < data.length - 1 ? 'border-bottom' : ''}`}
          >
            <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-start mb-1">
              <h6 className="fw-bold mb-0 text-primary large mb-1 mb-md-0">{item.title || item.company || item.degree}</h6>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-warning" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
            {activeTab === 'certificates' && <span className="text-primary small text-nowrap d-block mb-1">{item.date}</span>}
            {activeTab === 'projects' && <span className="text-primary small d-block mb-1">{item.category} - {item.year}</span>}
            {activeTab === 'experiences' && <span className="text-primary small d-block mb-1">{item.position} - {item.duration}</span>}
            {activeTab === 'education' && <span className="text-primary small d-block mb-1">{item.institution} - {item.duration}</span>}
            <p className="text-white small mb-0"><i>{item.description?.[0] || item.description}</i></p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container py-3 py-md-4 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4 mb-md-5">
        <div>
          <p className="text-primary fw-bold mb-1 small">Admin</p>
          <h2 className="h3 fw-bold text-white">Content Management</h2>
        </div>
        <div>
          <button className="btn btn-warning btn-sm me-2" onClick={() => setShowPasswordChange(!showPasswordChange)}>Change Password</button>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      
      {showPasswordChange && (
        <div className="slide-in mb-4 mb-md-5">
          <div className="bg-dark border border-warning rounded p-3 p-md-4">
            <h4 className="text-warning mb-3">Change Password</h4>
            <form onSubmit={handlePasswordChange}>
              <input type="password" className="form-control mb-2" placeholder="Old Password" value={passwordData.oldPassword} onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })} required />
              <input type="password" className="form-control mb-2" placeholder="New Password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} required />
              <button type="submit" className="btn btn-warning me-2">Update Password</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowPasswordChange(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <div className="slide-in mb-4 mb-md-5" style={{ animationDelay: "0.1s" }}>
        <div className="bg-dark border border-primary rounded p-3 p-md-4">
          <ul className="nav nav-pills justify-content-center mb-0">
            <li className="nav-item me-2">
              <button className={`nav-link ${activeTab === 'certificates' ? 'active' : ''}`} onClick={() => setActiveTab('certificates')}>Certificates</button>
            </li>
            <li className="nav-item me-2">
              <button className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Projects</button>
            </li>
            <li className="nav-item me-2">
              <button className={`nav-link ${activeTab === 'experiences' ? 'active' : ''}`} onClick={() => setActiveTab('experiences')}>Experiences</button>
            </li>
            <li className="nav-item me-2">
              <button className={`nav-link ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>Education</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profile</button>
            </li>
          </ul>
        </div>
      </div>

      <div className="slide-in" style={{ animationDelay: "0.2s" }}>
        {renderForm()}
        {renderList()}
      </div>

      <style jsx="true">{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .slide-in {
          animation: slideIn 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .nav-pills .nav-link {
          background: transparent;
          border: 1px solid rgba(0, 123, 255, 0.3);
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.5rem;
        }
        
        .nav-pills .nav-link:hover {
          background: rgba(0, 123, 255, 0.1);
          color: rgba(0, 198, 255, 1);
        }
        
        .nav-pills .nav-link.active {
          background: rgba(0, 123, 255, 0.8);
          color: white;
          border-color: rgba(0, 123, 255, 0.8);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .container {
            padding-left: 15px;
            padding-right: 15px;
          }
          
          h2.h3 {
            font-size: 1.5rem;
          }
          
          .nav-pills {
            flex-direction: column;
          }
          
          .nav-pills .nav-item {
            margin-right: 0 !important;
            margin-bottom: 0.5rem;
          }
        }
        
        @media (max-width: 576px) {
          .container {
            padding-left: 10px;
            padding-right: 10px;
          }
          
          h2.h3 {
            font-size: 1.3rem;
          }
          
          .small {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;