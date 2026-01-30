import React, { useState } from 'react';

const PasswordChange = ({ onPasswordChange, onClose }) => {
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onPasswordChange(passwordData);
    setPasswordData({ oldPassword: '', newPassword: '' });
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content bg-dark">
          <div className="modal-header border-secondary">
            <h5 className="modal-title text-primary">Change Password</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Old Password" 
                  value={passwordData.oldPassword} 
                  onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })} 
                  required 
                />
              </div>
              <div className="mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="New Password" 
                  value={passwordData.newPassword} 
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} 
                  required 
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;