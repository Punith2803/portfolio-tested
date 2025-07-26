# API Contracts & Integration Plan - Space Portfolio

## Overview
This document outlines the API contracts for transforming the space-themed portfolio from mock data to a full-stack application with MongoDB backend.

## Current Mock Data Structure
Located in `/app/frontend/src/mock.js`:
- Personal information (name, title, bio, contact details)
- Experience entries (internships with responsibilities)
- Projects (with technologies and categories)
- Skills (technical with levels, soft skills)
- Certifications
- Achievements

## Backend API Endpoints

### 1. Personal Profile API
```
GET  /api/profile          # Get personal profile information
PUT  /api/profile          # Update personal profile
```

**Model: PersonalProfile**
```javascript
{
  _id: ObjectId,
  name: String,
  title: String,
  subtitle: String,
  bio: String,
  email: String,
  phone: String,
  linkedin: String,
  location: String,
  graduationYear: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Experience API
```
GET  /api/experience       # Get all experience entries
POST /api/experience       # Add new experience
PUT  /api/experience/:id   # Update experience
DELETE /api/experience/:id # Delete experience
```

**Model: Experience**
```javascript
{
  _id: ObjectId,
  title: String,
  company: String,
  location: String,
  duration: String,
  type: String,
  responsibilities: [String],
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Projects API
```
GET  /api/projects         # Get all projects
POST /api/projects         # Add new project
PUT  /api/projects/:id     # Update project
DELETE /api/projects/:id   # Delete project
GET  /api/projects/categories # Get unique project categories
```

**Model: Project**
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  technologies: [String],
  status: String,
  category: String,
  githubUrl: String (optional),
  liveUrl: String (optional),
  imageUrl: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Skills API
```
GET  /api/skills           # Get all skills (technical + soft)
PUT  /api/skills/technical # Update technical skills
PUT  /api/skills/soft      # Update soft skills
```

**Model: Skills**
```javascript
{
  _id: ObjectId,
  technical: [{
    name: String,
    level: Number (0-100)
  }],
  soft: [String],
  updatedAt: Date
}
```

### 5. Certifications API
```
GET  /api/certifications   # Get all certifications
POST /api/certifications   # Add new certification
PUT  /api/certifications/:id # Update certification
DELETE /api/certifications/:id # Delete certification
```

**Model: Certification**
```javascript
{
  _id: ObjectId,
  name: String,
  issuer: String,
  year: String,
  credential: String,
  verificationUrl: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Contact Form API
```
POST /api/contact          # Submit contact form
GET  /api/contact          # Get contact messages (admin)
```

**Model: ContactMessage**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  isRead: Boolean,
  createdAt: Date
}
```

### 7. Achievements API
```
GET  /api/achievements     # Get all achievements
POST /api/achievements     # Add new achievement
PUT  /api/achievements/:id # Update achievement
DELETE /api/achievements/:id # Delete achievement
```

**Model: Achievement**
```javascript
{
  _id: ObjectId,
  description: String,
  order: Number,
  createdAt: Date
}
```

## Frontend Integration Plan

### Data Loading Strategy
1. **App.js**: Load profile data on app initialization
2. **Components**: Each component fetches its own data using custom hooks
3. **Error Handling**: Display fallback UI for loading states and errors
4. **Caching**: Store fetched data in React context to avoid repeated API calls

### Custom Hooks to Create
```javascript
// hooks/useProfile.js
const useProfile = () => {
  // Fetch and manage profile data
}

// hooks/useExperience.js 
const useExperience = () => {
  // Fetch and manage experience data
}

// hooks/useProjects.js
const useProjects = () => {
  // Fetch projects with filtering capabilities
}

// hooks/useSkills.js
const useSkills = () => {
  // Fetch skills data
}

// hooks/useCertifications.js
const useCertifications = () => {
  // Fetch certifications data
}

// hooks/useContact.js
const useContact = () => {
  // Handle contact form submission
}
```

### Component Updates Required

1. **Hero.jsx**: Replace mockData.personal with useProfile() hook
2. **About.jsx**: Replace mockData.personal with useProfile() hook  
3. **Experience.jsx**: Replace mockData.experience with useExperience() hook
4. **Projects.jsx**: Replace mockData.projects with useProjects() hook
5. **Skills.jsx**: Replace mockData.skills with useSkills() hook
6. **Contact.jsx**: Use useContact() hook for form submission
7. **Footer.jsx**: Replace mockData.personal with useProfile() hook

### Error Handling & Loading States
- Add loading spinners for each section
- Add error boundaries for graceful error handling
- Add retry mechanisms for failed API calls
- Add toast notifications for user feedback

### Form Validation
- Contact form: Client-side validation with proper error messages
- Success/error feedback after form submission

## Database Initialization
Create seed data script to populate MongoDB with current mock data as initial content.

## Implementation Order
1. ✅ Frontend with mock data (COMPLETED)
2. 🔄 Backend API development with MongoDB models
3. 🔄 Frontend-backend integration (replace mock data)
4. 🔄 Testing and bug fixes
5. 🔄 Error handling and loading states
6. 🔄 Final testing and optimization

## Notes
- All APIs will have proper error handling and validation
- Contact form will store messages in database (no email integration initially)
- Profile data will be editable through admin endpoints (future enhancement)
- Images for projects can be added later via file upload functionality