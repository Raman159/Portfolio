import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginData);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="bg-dark p-4 rounded border border-primary">
            <h3 className="text-primary text-center mb-4">Admin Login</h3>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                className="form-control mb-3" 
                placeholder="Username" 
                value={loginData.username} 
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} 
                required 
              />
              <input 
                type="password" 
                className="form-control mb-3" 
                placeholder="Password" 
                value={loginData.password} 
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} 
                required 
              />
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;