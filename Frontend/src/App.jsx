import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './Pages/Navigation.jsx'
import Home from './Pages/Home.jsx'
import bgImage from './assets/bg.jpg'
import AboutMe from './Pages/AboutMe.jsx'
import Education from './Pages/Education.jsx'
import Projects from './Pages/Projects.jsx'
import Experience from './Pages/Experience.jsx'
import Admin from './Pages/Admin.jsx'

const App = () => {
  return (
    <div
      className="position-relative"
      style={{ minHeight: '100vh', overflow: 'hidden' }}
      // onContextMenu={(e) => e.preventDefault()}
    >
      {/* Background image grayscale */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)',
          zIndex: 0,
        }}
      />

      {/* Dark transparent overlay to improve text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',  // 50% black overlay
          zIndex: 1,
        }}
      />

      {/* Content above overlays */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/education" element={<Education />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
