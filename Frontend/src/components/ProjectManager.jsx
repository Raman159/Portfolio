import React, { useState } from 'react';

const ProjectManager = ({ projects, onSave, onEdit, onDelete, editingItem, setEditingItem }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = { ...formData, tech: formData.tech?.split(',').map(t => t.trim()) || [] };
    onSave(projectData, editingItem);
    setFormData({});
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item, tech: item.tech?.join(', ') || '' });
    onEdit(item);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-dark p-4 rounded mb-4">
        <h4 className="text-primary mb-3">{editingItem ? 'Edit' : 'Add'} Project</h4>
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Title" 
          value={formData.title || ''} 
          onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
          required 
        />
        <textarea 
          className="form-control mb-2" 
          placeholder="Description" 
          value={formData.description || ''} 
          onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Technologies (comma separated)" 
          value={formData.tech || ''} 
          onChange={(e) => setFormData({ ...formData, tech: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Category" 
          value={formData.category || ''} 
          onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
          required 
        />
        <input 
          type="url" 
          className="form-control mb-2" 
          placeholder="GitHub URL" 
          value={formData.githubUrl || ''} 
          onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} 
        />
        <input 
          type="url" 
          className="form-control mb-2" 
          placeholder="Live URL" 
          value={formData.liveUrl || ''} 
          onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} 
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
        {projects.map(project => (
          <div key={project._id} className="col-md-6 mb-3">
            <div className="bg-dark p-3 rounded border border-primary">
              <h5 className="text-primary">{project.title}</h5>
              <p className="text-light">{project.description}</p>
              <p className="text-light"><strong className="text-light">Tech:</strong> {project.tech?.join(', ')}</p>
              <p className="text-light"><strong className="text-light">Category:</strong> {project.category}</p>
              <div className="mb-2">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-light me-2">
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-light">
                    Live Demo
                  </a>
                )}
              </div>
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(project)}>
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(project._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;