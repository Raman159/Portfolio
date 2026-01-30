import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../services/api';

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjectsData(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) return <div className="container py-3 text-white">Loading...</div>;

  // Get unique categories for filtering
  const categories = ["All", ...new Set(projectsData.map(project => project.category))];

  return (
    <div className="container py-3 py-md-4 text-white">

      
      {/* Header */}
      <div className="text-center mb-4 mb-md-5 slide-in">
        <p className="text-primary fw-bold mb-1 small">Projects</p>
        <h2 className="h3 fw-bold text-white">My Work Portfolio</h2>
      </div>

 <div className="slide-in mt-4 mt-md-5 mb-5" style={{ animationDelay: "0.2s" }}>
        <div className="bg-dark border border-primary rounded p-3 p-md-4">
          <div className="row align-items-center">
            <div className="col-md-8 mb-3 mb-md-0">
              <h5 className="h6 fw-bold text-primary mb-2">Project Statistics</h5>
              <p className="text-light small mb-0">
                <span className="fw-bold">{projectsData.length} projects</span> completed across various technologies including 
                React, Java, .NET, Python, R, and MERN stack.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="slide-in" style={{ animationDelay: "0.1s" }}>
        <div className="row g-3 g-md-4">
          {projectsData.map((project, index) => (
            <div className="col-12 col-md-6" key={index}>
              <div className="bg-dark border border-secondary rounded p-3 h-100">
                {/* Project Header */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h4 className="h5 fw-bold text-white mb-0">{project.title}</h4>
                  <span className="text-primary small">{project.year}</span>
                </div>
                
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="badge bg-primary text-white px-2 py-1 small">
                    {project.category}
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-light small mb-3" style={{ opacity: 0.9 }}>
                  {project.description}
                </p>
                
                {/* Technology Stack */}
                <div className="mt-auto">
                  <h6 className="text-primary small fw-bold mb-2">Technologies Used:</h6>
                  <div className="d-flex flex-wrap gap-1 mb-3">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="badge bg-secondary text-white px-2 py-1 small"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.visitLink && (
                    <a href={project.visitLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      Visit Project
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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
        
        /* Project card hover effect */
        .bg-dark {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .bg-dark:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 123, 255, 0.1);
          border-color: rgba(0, 123, 255, 0.3) !important;
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
          
          h4.h5 {
            font-size: 1.1rem;
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
          
          h4.h5 {
            font-size: 1rem;
          }
          
          .small {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;