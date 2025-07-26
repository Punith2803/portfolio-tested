import React from 'react';
import { User, MapPin, Calendar, Star } from 'lucide-react';
import { mockData } from '../mock';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">About Mission Commander</h2>
          <p className="section-description">
            Exploring the cosmos of technology and innovation
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <div className="about-intro">
              <User className="intro-icon" />
              <div className="intro-content">
                <h3>Mission Profile</h3>
                <p>{mockData.personal.bio}</p>
              </div>
            </div>

            <div className="about-details">
              <div className="detail-item">
                <MapPin className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Base Location</span>
                  <span className="detail-value">{mockData.personal.location}</span>
                </div>
              </div>
              
              <div className="detail-item">
                <Calendar className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Graduation Year</span>
                  <span className="detail-value">{mockData.personal.graduationYear}</span>
                </div>
              </div>
              
              <div className="detail-item">
                <Star className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Current Mission</span>
                  <span className="detail-value">{mockData.personal.title}</span>
                </div>
              </div>
            </div>

            <div className="achievements-preview">
              <h4>Key Achievements</h4>
              <div className="achievements-list">
                {mockData.achievements.slice(0, 3).map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <span className="achievement-text">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className="orbital-system">
              <div className="center-planet">
                <User size={40} />
              </div>
              <div className="orbit orbit-1">
                <div className="satellite">
                  <Star size={20} />
                </div>
              </div>
              <div className="orbit orbit-2">
                <div className="satellite">
                  <MapPin size={18} />
                </div>
              </div>
              <div className="orbit orbit-3">
                <div className="satellite">
                  <Calendar size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;