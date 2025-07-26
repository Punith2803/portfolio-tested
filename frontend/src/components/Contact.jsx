import React, { useState } from 'react';
import { Mail, Phone, Linkedin, MapPin, Send, User, MessageSquare } from 'lucide-react';
import { mockData } from '../mock';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    console.log('Contact form submitted:', formData);
    alert('Message sent! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Mission Control</h2>
          <p className="section-description">
            Ready for collaboration? Let's connect across the digital universe
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-info-title">Get In Touch</h3>
            <p className="contact-info-description">
              Whether you have a project idea, collaboration opportunity, or just want to say hello, 
              I'm always excited to connect with fellow space explorers!
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <Mail className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">Email</span>
                  <a href={`mailto:${mockData.personal.email}`} className="contact-value">
                    {mockData.personal.email}
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <Phone className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">Phone</span>
                  <a href={`tel:${mockData.personal.phone}`} className="contact-value">
                    {mockData.personal.phone}
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <Linkedin className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">LinkedIn</span>
                  <a 
                    href={mockData.personal.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-value"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">{mockData.personal.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <User size={16} />
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <Mail size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  <MessageSquare size={16} />
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  <MessageSquare size={16} />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Tell me about your project or idea..."
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className="form-submit-btn">
                <Send size={20} />
                Launch Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;