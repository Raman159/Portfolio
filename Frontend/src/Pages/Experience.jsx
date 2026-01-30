import React, { useState, useEffect } from "react";
import { fetchExperiences } from '../services/api';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await fetchExperiences();
        setExperiences(data);
      } catch (error) {
        console.error('Error loading experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    loadExperiences();
  }, []);

  if (loading) return <div className="container py-3 text-white">Loading...</div>;

  return (
    <div className="container py-3 py-md-4 text-white">
      {/* Header */}
      <div className="text-center mb-4 mb-md-5 slide-in">
        <p className="text-primary fw-bold mb-1 small">Experience</p>
        <h2 className="h3 fw-bold text-white">Work Experience</h2>
      </div>

      {/* Experience List */}
      {experiences.map((exp, index) => (
        <div
          key={index}
          className="slide-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="mb-4 mb-md-5 pb-4 pb-md-5 border-bottom border-secondary">
            <div className="row">
              {/* Left Column */}
              <div className="col-12 col-md-3 mb-3 mb-md-0">
                <div className="mb-2">
                  <span className="badge bg-primary text-white px-3 py-2 small">
                    {exp.duration}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="badge bg-secondary text-white px-3 py-1 small">
                    {exp.type}
                  </span>
                </div>
                <p className="text-light small mb-0" style={{ opacity: 0.9 }}>
                  {exp.location}
                </p>
              </div>

              {/* Right Column */}
              <div className="col-12 col-md-9">
                <h3 className="h4 fw-bold text-white mb-2">
                  {exp.company}
                </h3>
                <h4 className="h5 text-primary mb-3">
                  {exp.position}
                </h4>

                <ul className="list-unstyled mb-0">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="mb-2">
                      <div className="d-flex">
                        <span className="text-primary me-2">•</span>
                        <span
                          className="text-light small"
                          style={{ opacity: 0.9 }}
                        >
                          {item}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Styles */}
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

        @media (max-width: 768px) {
          h2.h3 {
            font-size: 1.5rem;
          }
          h3.h4 {
            font-size: 1.3rem;
          }
          h4.h5 {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 576px) {
          .small {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Experience;
