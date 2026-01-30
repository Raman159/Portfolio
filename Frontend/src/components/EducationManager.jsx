import React, { useState } from 'react';

const EducationManager = ({ education, onSave, onEdit, onDelete, editingItem, setEditingItem }) => {
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
        <h4 className="text-primary mb-3">{editingItem ? 'Edit' : 'Add'} Education</h4>
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Institution" 
          value={formData.institution || ''} 
          onChange={(e) => setFormData({ ...formData, institution: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Degree" 
          value={formData.degree || ''} 
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })} 
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
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Grade/CGPA" 
          value={formData.grade || ''} 
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })} 
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
        {education.map(edu => (
          <div key={edu._id} className="col-md-6 mb-3">
            <div className="bg-dark p-3 rounded border border-primary">
              <h5 className="text-primary">{edu.degree}</h5>
              <h6 className="text-light">{edu.institution}</h6>
              <p className="text-light">{edu.duration}</p>
              {edu.grade && <p className="text-light"><strong className="text-light">Grade:</strong> {edu.grade}</p>}
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(edu)}>
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(edu._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationManager;