import React, { useEffect, useState } from 'react';
import { Rocket, Star, Satellite, Globe } from 'lucide-react';
import { mockData } from '../mock';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="stars-background">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`star star-${i % 3 + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-greeting">
            <Globe className="greeting-icon" />
            <span>Hello from the cosmos</span>
          </div>
          
          <h1 className="hero-title">
            I'm <span className="name-highlight">{mockData.personal.name}</span>
          </h1>
          
          <h2 className="hero-subtitle">
            {mockData.personal.title}
          </h2>
          
          <p className="hero-description">
            {mockData.personal.subtitle}
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <Rocket className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{mockData.projects.length}+</span>
                <span className="stat-label">Projects Launched</span>
              </div>
            </div>
            <div className="stat-item">
              <Satellite className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{mockData.experience.length}</span>
                <span className="stat-label">Mission Experience</span>
              </div>
            </div>
            <div className="stat-item">
              <Star className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{mockData.certifications.length}+</span>
                <span className="stat-label">Certifications</span>
              </div>
            </div>
          </div>

          <div className="hero-actions">
            <button onClick={scrollToProjects} className="btn-primary">
              <Rocket size={20} />
              Explore Projects
            </button>
            <button onClick={scrollToContact} className="btn-secondary">
              <Satellite size={20} />
              Contact Mission Control
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-elements">
            <div 
              className="floating-rocket"
              style={{
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
              }}
            >
              <Rocket size={60} />
            </div>
            <div 
              className="floating-satellite"
              style={{
                transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
              }}
            >
              <Satellite size={40} />
            </div>
            <div 
              className="floating-globe"
              style={{
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
              }}
            >
              <Globe size={50} />
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;