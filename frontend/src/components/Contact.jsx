import React, { useState } from 'react';
import { Mail, Phone, Linkedin, MapPin, Send, User, MessageSquare, CheckCircle } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useContact } from '../hooks/useContact';
import { SectionLoader, ErrorMessage } from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

const Contact = () => {
  const { profile, loading: profileLoading, error: profileError } = useProfile();
  const { loading: contactLoading, error: contactError, submitContact } = useContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact(formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Contact form submission failed:', error);
    }
  };

  if (profileLoading) {
    return <SectionLoader message="Loading mission control..." />;
  }

  if (profileError) {
    return <ErrorMessage error={profileError} />;
  }

  if (!profile) {
    return <ErrorMessage error="Profile not found" />;
  }

  return (
    <ErrorBoundary>
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
                    <a href={`mailto:${profile.email}`} className="contact-value">
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <div className="contact-text">
                    <span className="contact-label">Phone</span>
                    <a href={`tel:${profile.phone}`} className="contact-value">
                      {profile.phone}
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <Linkedin className="contact-icon" />
                  <div className="contact-text">
                    <span className="contact-label">LinkedIn</span>
                    <a 
                      href={profile.linkedin} 
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
                    <span className="contact-value">{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {isSubmitted ? (
                <div className="contact-success">
                  <CheckCircle size={48} className="success-icon" />
                  <h3>Message Launched Successfully! 🚀</h3>
                  <p>Your message has been received and is now traveling through the digital cosmos. I'll get back to you soon!</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  {contactError && <ErrorMessage error={contactError} />}
                  
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
                        disabled={contactLoading}
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
                        disabled={contactLoading}
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
                      disabled={contactLoading}
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
                      disabled={contactLoading}
                    />
                  </div>

                  <button type="submit" className="form-submit-btn" disabled={contactLoading}>
                    <Send size={20} />
                    {contactLoading ? 'Launching Message...' : 'Launch Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Contact;