import React, { useState, useEffect } from 'react'
import { fetchCertificates } from '../services/api';

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const data = await fetchCertificates();
        setCertificates(data);
      } catch (error) {
        console.error('Error loading certificates:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCertificates();
  }, []);

  if (loading) return <div className="container py-3 text-white">Loading...</div>;

  return (
        <div className="container py-3 py-md-4">
          {/* Certificates */}
          <div className="slide-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="fw-bold mb-2 text-white mb-md-3"><u>Certificates</u></h3>
            {certificates.map((cert, index) => (
              <div 
                key={index} 
                className={`mb-2 mb-md-3 pb-2 pb-md-3 ${index < certificates.length - 1 ? 'border-bottom' : ''}`}
              >
                {/* Title and Date Row */}
                <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-start mb-1">
                  <h6 className="fw-bold mb-0 text-primary large mb-1 mb-md-0">{cert.title}</h6>
                  <span className="text-primary small text-nowrap">{cert.date}</span>
                </div>
                {/* Description */}
                <p className="text-white small mb-0"><i>{cert.description}</i></p>
              </div>
            ))}
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
                font-size: 1.25rem;
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
                font-size: 1.1rem;
              }
              
              .small {
                font-size: 0.875rem;
              }
            }
          `}</style>
        </div>
      );
    }

export default Certificate