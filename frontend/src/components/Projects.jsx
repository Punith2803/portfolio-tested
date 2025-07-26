import React, { useState } from 'react';
import { Rocket, Code, Zap, Globe, Filter } from 'lucide-react';
import { mockData } from '../mock';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'IoT Healthcare', 'IoT Automation', 'IoT Monitoring', 'IoT Environmental', 'Power Electronics'];
  
  const filteredProjects = selectedCategory === 'All' 
    ? mockData.projects 
    : mockData.projects.filter(project => project.category === selectedCategory);

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
    switch (status.toLowerCase()) {
      case 'completed': return 'status-completed';
      case 'deployed': return 'status-deployed';
      case 'prototype': return 'status-prototype';
      default: return 'status-award';
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Space Missions</h2>
          <p className="section-description">
            Launched projects across the tech galaxy
          </p>
        </div>

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

        <div className="projects-grid">
          {filteredProjects.map((project) => (
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
                  {project.technologies.map((tech, index) => (
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
      </div>
    </section>
  );
};

export default Projects;