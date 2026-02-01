import React, { useState, useEffect } from 'react';
import { 
  fetchCertificates, createCertificate, updateCertificate, deleteCertificate,
  fetchProjects, createProject, updateProject, deleteProject,
  fetchExperiences, createExperience, updateExperience, deleteExperience,
  fetchEducation, createEducation, updateEducation, deleteEducation,
  fetchProfile, updateProfile, adminLogin, changePassword,
  uploadHomeImage, uploadAboutImage
} from '../services/api';

import AdminLogin from '../components/AdminLogin';
import AdminHeader from '../components/AdminHeader';
import CertificateManager from '../components/CertificateManager';
import ProjectManager from '../components/ProjectManager';
import ExperienceManager from '../components/ExperienceManager';
import EducationManager from '../components/EducationManager';
import ProfileManager from '../components/ProfileManager';

import PasswordChange from '../components/PasswordChange';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [activeTab, setActiveTab] = useState('certificates');
  const [certificates, setCertificates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [profile, setProfile] = useState({ aboutMe: '', technicalSkills: [], softSkills: [], homeImage: '', aboutImage: '' });

  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('adminLoggedIn');
    if (loggedIn) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
      
      // Set up session timeout
      const handleVisibilityChange = () => {
        if (document.hidden) {
          setTimeout(() => {
            if (document.hidden) {
              handleLogout();
              alert('Session timed out due to inactivity');
            }
          }, 300000); // 5 minutes
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [activeTab, isLoggedIn]);

  const handleLogin = async (loginData) => {
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
      alert('Login failed');
    }
  };

  const handlePasswordChange = async (passwordData) => {
    try {
      const username = sessionStorage.getItem('adminUsername');
      const result = await changePassword(username, passwordData.oldPassword, passwordData.newPassword);
      if (result.success) {
        alert('Password changed successfully');
        setShowPasswordChange(false);
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
      } else if (activeTab === 'profileImage') {
        const data = await fetchProfile();
        setProfile(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSave = async (formData, editingItem, imageType) => {
    try {
      if (activeTab === 'certificates') {
        if (editingItem) {
          await updateCertificate(editingItem._id, formData);
        } else {
          await createCertificate(formData);
        }
      } else if (activeTab === 'projects') {
        if (editingItem) {
          await updateProject(editingItem._id, formData);
        } else {
          await createProject(formData);
        }
      } else if (activeTab === 'experiences') {
        if (editingItem) {
          await updateExperience(editingItem._id, formData);
        } else {
          await createExperience(formData);
        }
      } else if (activeTab === 'education') {
        if (editingItem) {
          await updateEducation(editingItem._id, formData);
        } else {
          await createEducation(formData);
        }
      } else if (activeTab === 'profile') {
        await updateProfile(formData);
        alert('Profile updated successfully');
      }
      loadData();
    } catch (error) {
      console.error('Error saving:', error);
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
    return <AdminLogin onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'certificates':
        return (
          <CertificateManager
            certificates={certificates}
            onSave={handleSave}
            onEdit={() => {}}
            onDelete={handleDelete}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        );
      case 'projects':
        return (
          <ProjectManager
            projects={projects}
            onSave={handleSave}
            onEdit={() => {}}
            onDelete={handleDelete}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        );
      case 'experiences':
        return (
          <ExperienceManager
            experiences={experiences}
            onSave={handleSave}
            onEdit={() => {}}
            onDelete={handleDelete}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        );
      case 'education':
        return (
          <EducationManager
            education={education}
            onSave={handleSave}
            onEdit={() => {}}
            onDelete={handleDelete}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        );
      case 'profile':
        return (
          <ProfileManager
            profile={profile}
            onSave={handleSave}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="container py-5">
      <AdminHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        onPasswordChange={() => setShowPasswordChange(true)}
      />
      
      {renderContent()}
      
      {showPasswordChange && (
        <PasswordChange
          onPasswordChange={handlePasswordChange}
          onClose={() => setShowPasswordChange(false)}
        />
      )}
    </div>
  );
};

export default Admin;