import React, { useState } from 'react';

const ExperienceManager = ({ experiences, onSave, onEdit, onDelete, editingItem, setEditingItem }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const expData = { ...formData, description: formData.description?.split('\n').filter(d => d.trim()) || [] };
    onSave(expData, editingItem);
    setFormData({});
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item, description: item.description?.join('\n') || '' });
    onEdit(item);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-dark p-4 rounded mb-4">
        <h4 className="text-primary mb-3">{editingItem ? 'Edit' : 'Add'} Experience</h4>
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Company" 
          value={formData.company || ''} 
          onChange={(e) => setFormData({ ...formData, company: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Role" 
          value={formData.role || ''} 
          onChange={(e) => setFormData({ ...formData, role: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Duration" 
          value={formData.duration || ''} 
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })} 
          required 
        />
        <textarea 
          className="form-control mb-2" 
          placeholder="Description (one per line)" 
          rows="4"
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
        {experiences.map(exp => (
          <div key={exp._id} className="col-md-6 mb-3">
            <div className="bg-dark p-3 rounded border border-primary">
              <h5 className="text-primary">{exp.role}</h5>
              <h6 className="text-light">{exp.company}</h6>
              <p className="text-light">{exp.duration}</p>
              <ul className="text-light">
                {exp.description?.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(exp)}>
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(exp._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceManager;