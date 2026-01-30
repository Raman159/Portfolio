import React from 'react';

const Education = () => {
  const educationData = [
    {
      degree: "Secondary Education Examination (SEE)",
      institution: "Meridian International School, Baluwatar",
      duration: "2020",
      gpa: "3.40"
    },
    {
      degree: "+2 in Management with Computers",
      institution: "Bhanubhakta Memorial College, Panipokhari",
      duration: "2020 - 2022",
      gpa: "3.03"
    },
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "Lord Buddha Education Foundation , Maitidevi",
      duration: "2022 - 2025",
      gpa: "3.50"
    }
  ];

  return (
    <div className="container py-3 py-md-4 text-white">
      {/* Header */}
      <div className="mb-3 mb-md-4 slide-in text-center">
        <p className="text-primary fw-bold mb-1 small">Education</p>
        <h2 className="h3 fw-bold text-white"><u>Academic Background</u></h2>
      </div>

      {/* Education List */}
      <div className="slide-in" style={{ animationDelay: "0.1s" }}>
        {educationData.map((edu, index) => (
          <div 
            key={index} 
            className={`mb-3 mb-md-4 pb-3 pb-md-4 ${index < educationData.length - 1 ? 'border-bottom border-secondary' : ''}`}
          >
            {/* Degree and Duration in one row */}
            <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-start mb-2">
              <h4 className="h5 fw-bold text-white mb-1 mb-md-0">{edu.degree}</h4>
              <span className="text-primary small">{edu.duration}</span>
            </div>
            
            {/* Institution */}
            <p className="text-light mb-2 small">{edu.institution}</p>
            
            {/* GPA */}
            <div className="d-flex align-items-center">
              <span className="text-primary fw-bold">GPA: {edu.gpa}</span>
            </div>
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
          h2.h3 {
            font-size: 1.5rem;
          }
          
          h4.h5 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Education;