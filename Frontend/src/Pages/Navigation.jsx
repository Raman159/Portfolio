import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4 py-3 shadow-sm position-relative mb-2">
        {/* Animated border bottom */}
        <div 
          className="position-absolute bottom-0 start-0 w-100"
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 123, 255, 0.6), rgba(0, 198, 255, 0.6), transparent)',
            animation: 'shimmer 3s ease-in-out infinite'
          }}
        />
        
        <div className="container-fluid" style={{ maxWidth: '1400px' }}>
          <button
            className="navbar-toggler border-0 mb-1"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              boxShadow: 'none',
              outline: 'none'
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-3">
              <li className="nav-item">
                <Link
                  className={`nav-link custom-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  to="/"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link custom-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                  to="/about"
                  onClick={() => setIsOpen(false)}
                >
                  About Me
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link custom-nav-link ${location.pathname === '/education' ? 'active' : ''}`}
                  to="/education"
                  onClick={() => setIsOpen(false)}
                >
                  Education
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link custom-nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
                  to="/projects"
                  onClick={() => setIsOpen(false)}
                >
                  Projects
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className={`nav-link custom-nav-link ${location.pathname === '/blogs' ? 'active' : ''}`}
                  to="/blogs"
                  onClick={() => setIsOpen(false)}
                >
                  Blogs
                </Link>
              </li> */}
              <li className="nav-item">
                <Link
                  className={`nav-link custom-nav-link ${location.pathname === '/experience' ? 'active' : ''}`}
                  to="/experience"
                  onClick={() => setIsOpen(false)}
                >
                  Experience
                </Link>
              </li>
            </ul>

            {/* Right side - CV Download Button */}
            <a
              href="/raman-CV.pdf"
              download="raman-CV.pdf"
              className="btn btn-outline-light rounded-pill px-4 fw-semibold cv-btn position-relative overflow-hidden"
            >
              <span className="cv-btn-text position-relative" style={{ zIndex: 2 }}>
                Download CV
              </span>
              <span className="cv-btn-bg position-absolute top-0 start-0 w-100 h-100"></span>
            </a>
          </div>
        </div>
      </nav>

      <style>{`
        /* Custom Nav Link Styles */
        .custom-nav-link {
          position: relative;
          color: rgba(255, 255, 255, 0.75) !important;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem !important;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        /* Hover state */
        .custom-nav-link:hover {
          color: rgba(0, 198, 255, 1) !important;
          transform: translateY(-2px);
        }

        /* Animated underline on hover */
        .custom-nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, rgba(0, 123, 255, 0.8), rgba(0, 198, 255, 0.8));
          transform: translateX(-50%);
          transition: width 0.3s ease;
          border-radius: 2px;
        }

        .custom-nav-link:hover::before {
          width: 80%;
        }

        /* Active state */
        .custom-nav-link.active {
          color: rgba(0, 198, 255, 1) !important;
          text-shadow: 0 0 10px rgba(0, 198, 255, 0.5);
        }

        .custom-nav-link.active::before {
          width: 80%;
        }

        .custom-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: rgba(0, 198, 255, 0.8);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(0, 198, 255, 0.6);
          animation: pulse-dot 2s ease-in-out infinite;
        }

        /* CV Button Styles */
        .cv-btn {
          border: 2px solid rgba(0, 123, 255, 0.6) !important;
          color: white !important;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .cv-btn-bg {
          background: linear-gradient(90deg, rgba(0, 123, 255, 0.2), rgba(0, 198, 255, 0.2));
          transform: translateX(-100%);
          transition: transform 0.4s ease;
          z-index: 1;
        }

        .cv-btn:hover {
          border-color: rgba(0, 198, 255, 1) !important;
          box-shadow: 0 0 20px rgba(0, 123, 255, 0.5), 0 0 40px rgba(0, 198, 255, 0.3);
          transform: translateY(-2px);
        }

        .cv-btn:hover .cv-btn-bg {
          transform: translateX(0);
        }

        .cv-btn:hover .cv-btn-text {
          color: black;
        }

        .cv-btn:active {
          transform: translateY(0);
        }

        /* Navbar border animation */
        @keyframes shimmer {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        /* Active dot pulse animation */
        @keyframes pulse-dot {
          0%, 100% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translateX(-50%) scale(1.3);
          }
        }

        /* Mobile responsive adjustments */
        @media (max-width: 991px) {
          .custom-nav-link {
            padding: 0.75rem 1rem !important;
            border-left: 3px solid transparent;
          }

          .custom-nav-link.active {
            border-left-color: rgba(0, 198, 255, 0.8);
            background: rgba(0, 123, 255, 0.1);
          }

          .custom-nav-link::before {
            display: none;
          }

          .custom-nav-link.active::after {
            display: none;
          }

          .cv-btn {
            margin-top: 1rem;
            width: 100%;
          }

          /* Sliding animation for navbar collapse on mobile */
          .navbar-collapse {
            display: block !important;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
          }

          .navbar-collapse.show {
            max-height: 500px; /* Adjust based on content height */
          }
        }

        /* Smooth navbar toggler animation */
        .navbar-toggler:focus {
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25) !important;
        }
      `}</style>
    </>
  );
};

export default Navigation;