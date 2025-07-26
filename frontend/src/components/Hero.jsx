import React, { useEffect, useState } from 'react';
import { Rocket, Star, Satellite, Globe } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useExperience } from '../hooks/useExperience';
import { useProjects } from '../hooks/useProjects';
import { useCertifications } from '../hooks/useCertifications';
import { SectionLoader, ErrorMessage } from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { profile, loading: profileLoading, error: profileError } = useProfile();
  const { experience, loading: expLoading } = useExperience();
  const { projects, loading: projectsLoading } = useProjects();
  const { certifications, loading: certsLoading } = useCertifications();

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

  if (profileLoading) {
    return <SectionLoader message="Loading space commander profile..." />;
  }

  if (profileError) {
    return <ErrorMessage error={profileError} />;
  }

  if (!profile) {
    return <ErrorMessage error="Profile not found" />;
  }

  return (
    <ErrorBoundary>
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
              I'm <span className="name-highlight">{profile.name}</span>
            </h1>
            
            <h2 className="hero-subtitle">
              {profile.title}
            </h2>
            
            <p className="hero-description">
              {profile.subtitle}
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <Rocket className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-number">
                    {projectsLoading ? '...' : projects?.length || 0}+
                  </span>
                  <span className="stat-label">Projects Launched</span>
                </div>
              </div>
              <div className="stat-item">
                <Satellite className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-number">
                    {expLoading ? '...' : experience?.length || 0}
                  </span>
                  <span className="stat-label">Mission Experience</span>
                </div>
              </div>
              <div className="stat-item">
                <Star className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-number">
                    {certsLoading ? '...' : certifications?.length || 0}+
                  </span>
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
    </ErrorBoundary>
  );
};

export default Hero;