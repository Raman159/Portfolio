import React, { useState, useEffect } from 'react';
import myimg2 from '../assets/myimg2.jpg';
import { fetchProfile } from '../services/api';
const API_BASE_URL = import.meta.env.VITE_API_URL;


const Info = () => {
  const [age, setAge] = useState(null);
  const [profile, setProfile] = useState({ aboutMe: '', technicalSkills: [], softSkills: [] });
  const [profileImage, setProfileImage] = useState(myimg2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const birthDate = new Date('2004-01-26');
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);

    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile();
        setProfile(profileData);
        if (profileData.aboutImage) {
          if (profileData.aboutImage) {
  setProfileImage(`${API_BASE_URL}${profileData.aboutImage}`);
}

        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const personalInfo = [
    { label: "Name", value: "Raman Maharjan" },
    { label: "Age", value: age ? `${age} Years` : "N/A" },
    { label: "Country", value: "Nepal" },
    { label: "Address", value: "Baluwatar, Kathmandu" },
    { label: "Phone", value: "+977-9810208544" },
    { label: "Email", value: "ramanmaharjan159@gmail.com" }
  ];

  if (loading) return <div className="container py-3 text-white">Loading...</div>;

  return (
    <div className="container py-4 py-md-5">
      
      {/* Image + About + Skills */}
      <div className="row mb-4 mb-md-5 slide-in">
        
        {/* Image */}
        <div className="col-12 col-md-5 col-lg-4 mb-4 mb-md-0">
          <div className="d-flex justify-content-center justify-content-md-start">
            <img 
              src={profileImage} 
              alt="Raman Maharjan"
              className="img-fluid rounded border border-primary shadow"
              style={{ 
                objectFit: "cover",
                objectPosition: "center 10%",
                width: "100%",
                maxWidth: "350px",
                height: "auto",
                aspectRatio: "3/4"
              }}
            />
          </div>
        </div>

        {/* About + Skills */}
        <div className="col-12 col-md-7 col-lg-8 ps-md-4">
          
          <p className="text-primary fw-bold mb-1 small">Discover</p>
          <h2 className="h3 text-white fw-bold mb-3">About Me</h2>
            <p className="text-white mb-4">
            {profile.aboutMe || 'Loading...'}
          </p>
          
          <h4 className="h5 fw-bold text-white mb-3">Personal Information</h4>
          
          <div className="row g-3 g-md-4 mb-4">
            {personalInfo.map((info, index) => (
              <div className="col-12 col-sm-6" key={index}>
                <div className="d-flex align-items-start">
                  <span className="fw-bold text-primary me-2 h6" style={{ minWidth: "80px" }}>
                    {info.label}:
                  </span>
                  <span className="text-white h6">{info.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Social Links - Smaller Icons */}
          <div className="social-section mt-4">
              <h4 className='text-white fw-bold mb-3'>Connect With Me</h4>
            <div className="d-flex align-items-center gap-3">
              
              {/* Gmail */}
              <a
                href="mailto:ramanmaharjan159@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link d-flex align-items-center justify-content-center"
                aria-label="Email"
                style={{
                  width: '36px',
                  height: '36px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="text-primary"
                >
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2-8 5-8-5h16Zm0 12H4V8l8 5 8-5v10Z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Raman159"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link d-flex align-items-center justify-content-center"
                aria-label="GitHub"
                style={{
                  width: '36px',
                  height: '36px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="text-primary"
                >
                  <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.6-4-1.6a3.15 3.15 0 0 0-1.3-1.7c-1-.7.1-.7.1-.7a2.5 2.5 0 0 1 1.8 1.2 2.6 2.6 0 0 0 3.6 1 2.6 2.6 0 0 1 .8-1.7c-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.3a4.6 4.6 0 0 1 .1-3.3s1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.6 4.6 0 0 1 .1 3.3c.7.9 1.2 2 1.2 3.3 0 4.7-2.8 5.7-5.5 6a3 3 0 0 1 .9 2.3v3.4c0 .3.2.6.8.5A12 12 0 0 0 12 0Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/raman-maharjan-513745285/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link d-flex align-items-center justify-content-center"
                aria-label="LinkedIn"
                style={{
                  width: '36px',
                  height: '36px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="text-primary"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM0 24h5V7H0v17Zm7.5-9v9h5v-9c0-3.5-5-3-5 0Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/ramn.n96/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link d-flex align-items-center justify-content-center"
                aria-label="Instagram"
                style={{
                  width: '36px',
                  height: '36px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="text-primary"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="slide-in" style={{ animationDelay: "0.1s" }}>
        <div className="row">
          {/* Technical Skills */}
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <h5 className="text-primary fw-bold mb-3">Technical Skills</h5>
            <div className="d-flex flex-wrap gap-2">
              {profile.technicalSkills?.map((skill, index) => (
                <span key={index} className="badge bg-primary text-white px-3 py-2">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {/* Soft Skills */}
          <div className="col-12 col-md-6">
            <h5 className="text-primary fw-bold mb-3">Soft Skills</h5>
            <div className="d-flex flex-wrap gap-2">
              {profile.softSkills?.map((skill, index) => (
                <span key={index} className="badge bg-secondary text-white px-3 py-2">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
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

        /* Social icon hover animation */
        .social-link:hover {
          transform: translateY(-2px) !important;
        }

        .social-link svg {
          transition: transform 0.2s ease;
        }

        .social-link:hover svg {
          transform: scale(1.1);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .social-section .d-flex {
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Info;