import React, { useState } from 'react';

const CertificateManager = ({ certificates, onSave, onEdit, onDelete, editingItem, setEditingItem }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, editingItem);
    setFormData({});
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    onEdit(item);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-dark p-4 rounded mb-4">
        <h4 className="text-primary mb-3">{editingItem ? 'Edit' : 'Add'} Certificate</h4>
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Title" 
          value={formData.title || ''} 
          onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Date" 
          value={formData.date || ''} 
          onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
          required 
        />
        <textarea 
          className="form-control mb-2" 
          placeholder="Description" 
          value={formData.description || ''} 
          onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          required 
        />
        <button type="submit" className="btn btn-primary me-2">
          {editingItem ? 'Update' : 'Create'}
        </button>
        {editingItem && (
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => { setEditingItem(null); setFormData({}); }}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="row">
        {certificates.map(cert => (
          <div key={cert._id} className="col-md-6 mb-3">
            <div className="bg-dark p-3 rounded border border-primary">
              <h5 className="text-primary">{cert.title}</h5>
              <p className="text-light">{cert.date}</p>
              <p className="text-light">{cert.description}</p>
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(cert)}>
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(cert._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateManager;