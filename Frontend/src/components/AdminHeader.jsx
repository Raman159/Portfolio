import React from 'react';

const AdminHeader = ({ activeTab, setActiveTab, onLogout, onPasswordChange }) => {
  const tabs = [
    { id: 'certificates', label: 'Certificates' },
    { id: 'projects', label: 'Projects' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'education', label: 'Education' },
    { id: 'profile', label: 'Profile' }
  ];

  return (
    <div className="bg-dark p-3 mb-4 rounded">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-primary mb-0">Admin Dashboard</h2>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={onPasswordChange}>
            Change Password
          </button>
          <button className="btn btn-outline-danger" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="mt-3">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`btn me-2 ${activeTab === tab.id ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminHeader;