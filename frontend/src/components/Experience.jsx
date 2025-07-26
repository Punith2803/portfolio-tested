import React from 'react';
import { Briefcase, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useExperience } from '../hooks/useExperience';
import { SectionLoader, ErrorMessage } from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

const Experience = () => {
  const { experience, loading, error, refetch } = useExperience();

  if (loading) {
    return <SectionLoader message="Loading mission history..." />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  return (
    <ErrorBoundary>
      <section id="experience" className="experience-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Mission History</h2>
            <p className="section-description">
              Space missions and explorations across the tech universe
            </p>
          </div>

          <div className="timeline">
            {experience?.map((exp, index) => (
              <div key={exp.id || index} className="timeline-item">
                <div className="timeline-marker">
                  <Briefcase size={20} />
                </div>
                
                <div className="timeline-content">
                  <div className="experience-header">
                    <div className="experience-title-section">
                      <h3 className="experience-title">{exp.title}</h3>
                      <div className="experience-meta">
                        <span className="company-name">{exp.company}</span>
                        <div className="meta-details">
                          <span className="location">
                            <MapPin size={14} />
                            {exp.location}
                          </span>
                          <span className="duration">
                            <Calendar size={14} />
                            {exp.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="experience-type">
                      {exp.type}
                    </div>
                  </div>

                  <div className="responsibilities">
                    {exp.responsibilities?.map((responsibility, idx) => (
                      <div key={idx} className="responsibility-item">
                        <ArrowRight size={16} />
                        <span>{responsibility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(!experience || experience.length === 0) && !loading && (
            <div className="empty-state">
              <Briefcase size={48} className="empty-icon" />
              <p>No mission history available</p>
            </div>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Experience;