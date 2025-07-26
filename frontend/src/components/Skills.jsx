import React from 'react';
import { Code, Cpu, Database, Award, Star, Zap } from 'lucide-react';
import { useSkills } from '../hooks/useSkills';
import { useCertifications } from '../hooks/useCertifications';
import { SectionLoader, ErrorMessage } from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

const Skills = () => {
  const { skills, loading: skillsLoading, error: skillsError, refetch: refetchSkills } = useSkills();
  const { certifications, loading: certsLoading, error: certsError, refetch: refetchCerts } = useCertifications();

  const getSkillIcon = (skillName) => {
    if (skillName?.toLowerCase().includes('c++') || skillName?.toLowerCase().includes('c#')) {
      return <Code size={20} />;
    } else if (skillName?.toLowerCase().includes('esp32') || skillName?.toLowerCase().includes('iot')) {
      return <Cpu size={20} />;
    } else if (skillName?.toLowerCase().includes('sql')) {
      return <Database size={20} />;
    } else {
      return <Zap size={20} />;
    }
  };

  if (skillsLoading || certsLoading) {
    return <SectionLoader message="Loading mission capabilities..." />;
  }

  return (
    <ErrorBoundary>
      <section id="skills" className="skills-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Mission Capabilities</h2>
            <p className="section-description">
              Technical arsenal for conquering the digital frontier
            </p>
          </div>

          <div className="skills-content">
            <div className="technical-skills">
              <h3 className="skills-category-title">
                <Code size={24} />
                Technical Skills
              </h3>
              {skillsError ? (
                <ErrorMessage error={skillsError} onRetry={refetchSkills} />
              ) : (
                <div className="skills-grid">
                  {skills?.technical?.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-header">
                        <div className="skill-name-wrapper">
                          {getSkillIcon(skill.name)}
                          <span className="skill-name">{skill.name}</span>
                        </div>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="soft-skills">
              <h3 className="skills-category-title">
                <Star size={24} />
                Soft Skills
              </h3>
              {skillsError ? (
                <ErrorMessage error={skillsError} onRetry={refetchSkills} />
              ) : (
                <div className="soft-skills-grid">
                  {skills?.soft?.map((skill, index) => (
                    <div key={index} className="soft-skill-item">
                      <Star size={16} />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="certifications-section">
            <h3 className="skills-category-title">
              <Award size={24} />
              Certifications & Achievements
            </h3>
            {certsError ? (
              <ErrorMessage error={certsError} onRetry={refetchCerts} />
            ) : (
              <div className="certifications-grid">
                {certifications?.map((cert, index) => (
                  <div key={cert.id || index} className="certification-card">
                    <div className="cert-header">
                      <Award className="cert-icon" />
                      <div className="cert-year">{cert.year}</div>
                    </div>
                    <div className="cert-content">
                      <h4 className="cert-name">{cert.name}</h4>
                      <p className="cert-issuer">{cert.issuer}</p>
                      <span className="cert-credential">{cert.credential}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(!skills?.technical || skills.technical.length === 0) && !skillsLoading && (
              <div className="empty-state">
                <Code size={48} className="empty-icon" />
                <p>No technical skills available</p>
              </div>
            )}

            {(!certifications || certifications.length === 0) && !certsLoading && (
              <div className="empty-state">
                <Award size={48} className="empty-icon" />
                <p>No certifications available</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Skills;