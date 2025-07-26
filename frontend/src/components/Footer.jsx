import React from 'react';
import { Rocket, Mail, Linkedin, Phone, Heart } from 'lucide-react';
import { mockData } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo" onClick={scrollToTop}>
              <Rocket className="footer-logo-icon" />
              <span className="footer-logo-text">{mockData.personal.name}</span>
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
                <a href={`mailto:${mockData.personal.email}`} className="footer-social-link">
                  <Mail size={18} />
                  Email
                </a>
                <a href={mockData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <Linkedin size={18} />
                  LinkedIn
                </a>
                <a href={`tel:${mockData.personal.phone}`} className="footer-social-link">
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
              Made with <Heart size={16} className="heart-icon" /> by {mockData.personal.name} • {currentYear}
            </p>
          </div>
          <div className="footer-tech">
            <span>Powered by React & Fast API</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;