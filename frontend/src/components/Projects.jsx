import React, { useState } from 'react';
import { Rocket, Code, Zap, Globe, Filter } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { SectionLoader, ErrorMessage } from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

const Projects = () => {
  const { projects, categories, loading, error, refetch } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects?.filter(project => project.category === selectedCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'IoT Healthcare': return <Zap size={16} />;
      case 'IoT Automation': return <Globe size={16} />;
      case 'IoT Monitoring': return <Code size={16} />;
      case 'IoT Environmental': return <Rocket size={16} />;
      case 'Power Electronics': return <Zap size={16} />;
      default: return <Rocket size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'status-completed';
      case 'deployed': return 'status-deployed';
      case 'prototype': return 'status-prototype';
      default: return 'status-award';
    }
  };

  if (loading) {
    return <SectionLoader message="Loading space missions..." />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  return (
    <ErrorBoundary>
      <section id="projects" className="projects-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Space Missions</h2>
            <p className="section-description">
              Launched projects across the tech galaxy
            </p>
          </div>

          {categories && categories.length > 1 && (
            <div className="project-filters">
              <Filter size={20} />
              <div className="filter-buttons">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="projects-grid">
            {filteredProjects?.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <div className="project-icon">
                    {getCategoryIcon(project.category)}
                  </div>
                  <div className={`project-status ${getStatusColor(project.status)}`}>
                    {project.status}
                  </div>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-category">
                    <span className="category-label">{project.category}</span>
                  </div>

                  <div className="project-technologies">
                    {project.technologies?.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-footer">
                  <button className="project-btn">
                    <Rocket size={16} />
                    View Mission
                  </button>
                </div>
              </div>
            ))}
          </div>

          {(!filteredProjects || filteredProjects.length === 0) && !loading && (
            <div className="empty-state">
              <Rocket size={48} className="empty-icon" />
              <p>No missions found for the selected category</p>
            </div>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Projects;