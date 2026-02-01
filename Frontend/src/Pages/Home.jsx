import React from "react";
import myimg from "../assets/myimg.jpg";

const Home = () => {
  const profileImage = myimg;

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="image-section mb-4 position-relative">
   
        <div
          className="position-absolute"
          style={{
            top: "-20px",
            left: "-20px",
            width: "120px",
            height: "120px",
            borderTop: "3px solid rgba(0, 123, 255, 0.6)",
            borderLeft: "3px solid rgba(0, 123, 255, 0.6)",
            borderRadius: "50%",
            animation: "pulse 3s ease-in-out infinite",
          }}
        />
        <div
          className="position-absolute"
          style={{
            bottom: "-20px",
            right: "-20px",
            width: "120px",
            height: "120px",
            borderBottom: "3px solid rgba(0, 198, 255, 0.6)",
            borderRight: "3px solid rgba(0, 198, 255, 0.6)",
            borderRadius: "50%",
            animation: "pulse 3s ease-in-out infinite 1.5s",
          }}
        />

        <div
          className="position-absolute"
          style={{
            top: "-10px",
            right: "-10px",
            width: "80px",
            height: "80px",
            borderTop: "2px solid rgba(0, 255, 255, 0.4)",
            borderRight: "2px solid rgba(0, 255, 255, 0.4)",
            borderRadius: "50%",
            animation: "rotate 8s linear infinite",
          }}
        />
        <div
          className="position-absolute"
          style={{
            bottom: "-10px",
            left: "-10px",
            width: "80px",
            height: "80px",
            borderBottom: "2px solid rgba(0, 255, 255, 0.4)",
            borderLeft: "2px solid rgba(0, 255, 255, 0.4)",
            borderRadius: "50%",
            animation: "rotate 8s linear infinite reverse",
          }}
        />

        <img
          src={profileImage}
          alt="Raman Maharjan"
          className="rounded-circle"
          style={{
            width: "15rem",
            height: "15rem",
            objectFit: "cover",
            objectPosition: "top",
            border: "4px solid rgba(0, 123, 255, 0.3)",
            boxShadow:
              "0 0 20px rgba(0, 123, 255, 0.4), 0 0 40px rgba(0, 198, 255, 0.3), 0 0 60px rgba(0, 123, 255, 0.2)",
            position: "relative",
            zIndex: 1,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 0 30px rgba(0, 123, 255, 0.6), 0 0 60px rgba(0, 198, 255, 0.5), 0 0 90px rgba(0, 123, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 0 20px rgba(0, 123, 255, 0.4), 0 0 40px rgba(0, 198, 255, 0.3), 0 0 60px rgba(0, 123, 255, 0.2)";
          }}
        />
      </div>

      <div className="intro-section text-center">
        <h1
          className="fw-bold text-white"
          style={{
            textShadow: "0 0 10px rgba(0, 123, 255, 0.5)",
            animation: "fadeInUp 0.8s ease-out",
          }}
        >
          Hello, I'm <span className="text-primary">Raman Maharjan</span>
        </h1>
        <p
          className="lead text-white"
          style={{
            textShadow:
              "0 0 3px rgba(0, 123, 255, 0.6), 0 0 6px rgba(0, 123, 255, 0.5), 0 0 10px rgba(0, 198, 255, 0.4)",
            fontSize: "1.25rem",
            animation: "fadeInUp 0.8s ease-out 0.2s backwards",
          }}
        >
          IT Support <b>.</b> MERN Developer <b>.</b> UI/UX Designer
        </p>

        {/* Social Links */}
        <div
          className="social-links mt-4 d-flex justify-content-center gap-4"
          style={{
            fontSize: "1.1rem",
            animation: "fadeInUp 0.8s ease-out 0.4s backwards",
          }}
        >
          {/* Gmail */}
          <a
            href="mailto:ramanmaharjan159@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            style={socialLinkStyle}
            className="social-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="32"
              height="32"
            >
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2-8 5-8-5h16Zm0 12H4V8l8 5 8-5v10Z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Raman159"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={socialLinkStyle}
            className="social-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="32"
              height="32"
            >
              <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.6-4-1.6a3.15 3.15 0 0 0-1.3-1.7c-1-.7.1-.7.1-.7a2.5 2.5 0 0 1 1.8 1.2 2.6 2.6 0 0 0 3.6 1 2.6 2.6 0 0 1 .8-1.7c-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.3a4.6 4.6 0 0 1 .1-3.3s1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.6 4.6 0 0 1 .1 3.3c.7.9 1.2 2 1.2 3.3 0 4.7-2.8 5.7-5.5 6a3 3 0 0 1 .9 2.3v3.4c0 .3.2.6.8.5A12 12 0 0 0 12 0Z" />
            </svg>
          </a>

           {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/raman-maharjan-513745285/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={socialLinkStyle}
            className="social-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="32"
              height="32"
            >
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM0 24h5V7H0v17Zm7.5-9v9h5v-9c0-3.5-5-3-5 0Z" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .social-link {
          color: rgba(0, 198, 255, 0.8);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .social-link:hover {
          color: #00bfff !important;
          filter: drop-shadow(0 0 8px #00bfff);
          transform: scale(1.2);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

const socialLinkStyle = {
  color: "rgba(0, 198, 255, 0.8)",
  transition: "all 0.3s ease",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export default Home;
