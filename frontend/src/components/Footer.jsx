import React from 'react';
import { Rocket, Mail, Linkedin, Phone, Heart } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import ErrorBoundary from './ErrorBoundary';

const Footer = () => {
  const { profile } = useProfile();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo" onClick={scrollToTop}>
                <Rocket className="footer-logo-icon" />
                <span className="footer-logo-text">{profile?.name || 'Punith N'}</span>
              </div>
              <p className="footer-description">
                Exploring the frontiers of technology and innovation, one project at a time.
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-section-links">
                <h4 className="footer-section-title">Navigation</h4>
                <nav className="footer-nav">
                  <button onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}>
                    About
                  </button>
                  <button onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })}>
                    Experience
                  </button>
                  <button onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
                    Projects
                  </button>
                  <button onClick={() => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' })}>
                    Skills
                  </button>
                </nav>
              </div>

              <div className="footer-section-links">
                <h4 className="footer-section-title">Connect</h4>
                <div className="footer-social">
                  <a href={`mailto:${profile?.email || 'Punithn2803@gmail.com'}`} className="footer-social-link">
                    <Mail size={18} />
                    Email
                  </a>
                  <a href={profile?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                    <Linkedin size={18} />
                    LinkedIn
                  </a>
                  <a href={`tel:${profile?.phone || '+91 7204030445'}`} className="footer-social-link">
                    <Phone size={18} />
                    Phone
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>
                Made with <Heart size={16} className="heart-icon" /> by {profile?.name || 'Punith N'} • {currentYear}
              </p>
            </div>
            <div className="footer-tech">
              <span>Powered by React & FastAPI</span>
            </div>
          </div>
        </div>
      </footer>
    </ErrorBoundary>
  );
};

export default Footer;