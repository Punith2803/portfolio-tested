#!/usr/bin/env python3
"""
Backend API Testing Suite for Space-themed Portfolio
Tests all backend endpoints for proper functionality and data integrity
"""

import requests
import json
import sys
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    print("❌ REACT_APP_BACKEND_URL not found in environment")
    sys.exit(1)

API_BASE = f"{BACKEND_URL}/api"

class PortfolioAPITester:
    def __init__(self):
        self.results = {
            'passed': 0,
            'failed': 0,
            'errors': []
        }
        
    def log_result(self, test_name, success, message=""):
        if success:
            print(f"✅ {test_name}")
            self.results['passed'] += 1
        else:
            print(f"❌ {test_name}: {message}")
            self.results['failed'] += 1
            self.results['errors'].append(f"{test_name}: {message}")
    
    def test_get_profile(self):
        """Test GET /api/profile endpoint"""
        try:
            response = requests.get(f"{API_BASE}/profile", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['name', 'title', 'subtitle', 'bio', 'email', 'phone', 'linkedin', 'location', 'graduationYear']
                
                missing_fields = [field for field in required_fields if field not in data]
                if missing_fields:
                    self.log_result("GET /api/profile", False, f"Missing fields: {missing_fields}")
                else:
                    # Check if this looks like Punith N's portfolio data
                    if 'punith' in data.get('name', '').lower() or 'punith' in data.get('email', '').lower():
                        self.log_result("GET /api/profile", True, f"Profile data retrieved for {data.get('name')}")
                    else:
                        self.log_result("GET /api/profile", True, f"Profile data retrieved for {data.get('name', 'Unknown')}")
            elif response.status_code == 404:
                self.log_result("GET /api/profile", False, "Profile not found - database may not be seeded")
            else:
                self.log_result("GET /api/profile", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("GET /api/profile", False, f"Request failed: {str(e)}")
    
    def test_get_experience(self):
        """Test GET /api/experience endpoint"""
        try:
            response = requests.get(f"{API_BASE}/experience", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) > 0:
                        # Check structure of first experience entry
                        exp = data[0]
                        required_fields = ['title', 'company', 'location', 'duration', 'type', 'responsibilities']
                        missing_fields = [field for field in required_fields if field not in exp]
                        
                        if missing_fields:
                            self.log_result("GET /api/experience", False, f"Missing fields in experience: {missing_fields}")
                        else:
                            self.log_result("GET /api/experience", True, f"Retrieved {len(data)} experience entries")
                    else:
                        self.log_result("GET /api/experience", True, "Experience endpoint working (empty list)")
                else:
                    self.log_result("GET /api/experience", False, "Response is not a list")
            else:
                self.log_result("GET /api/experience", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("GET /api/experience", False, f"Request failed: {str(e)}")
    
    def test_get_projects(self):
        """Test GET /api/projects endpoint"""
        try:
            response = requests.get(f"{API_BASE}/projects", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) > 0:
                        # Check structure of first project
                        project = data[0]
                        required_fields = ['title', 'description', 'technologies', 'status', 'category']
                        missing_fields = [field for field in required_fields if field not in project]
                        
                        if missing_fields:
                            self.log_result("GET /api/projects", False, f"Missing fields in project: {missing_fields}")
                        else:
                            self.log_result("GET /api/projects", True, f"Retrieved {len(data)} projects")
                    else:
                        self.log_result("GET /api/projects", True, "Projects endpoint working (empty list)")
                else:
                    self.log_result("GET /api/projects", False, "Response is not a list")
            else:
                self.log_result("GET /api/projects", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("GET /api/projects", False, f"Request failed: {str(e)}")
    
    def test_get_project_categories(self):
        """Test GET /api/projects/categories endpoint"""
        try:
            response = requests.get(f"{API_BASE}/projects/categories", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if 'categories' in data and isinstance(data['categories'], list):
                    self.log_result("GET /api/projects/categories", True, f"Retrieved {len(data['categories'])} categories")
                else:
                    self.log_result("GET /api/projects/categories", False, "Invalid response structure")
            else:
                self.log_result("GET /api/projects/categories", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("GET /api/projects/categories", False, f"Request failed: {str(e)}")
    
    def test_get_skills(self):
        """Test GET /api/skills endpoint"""
        try:
            response = requests.get(f"{API_BASE}/skills", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['technical', 'soft']
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_result("GET /api/skills", False, f"Missing fields: {missing_fields}")
                else:
                    # Check technical skills structure
                    if isinstance(data['technical'], list) and isinstance(data['soft'], list):
                        self.log_result("GET /api/skills", True, f"Skills data retrieved (Technical: {len(data['technical'])}, Soft: {len(data['soft'])})")
                    else:
                        self.log_result("GET /api/skills", False, "Invalid skills data structure")
            elif response.status_code == 404:
                self.log_result("GET /api/skills", False, "Skills not found - database may not be seeded")
            else:
                self.log_result("GET /api/skills", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("GET /api/skills", False, f"Request failed: {str(e)}")
    
    def test_get_certifications(self):
        """Test GET /api/certifications endpoint"""
        try:
            response = requests.get(f"{API_BASE}/certifications", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) > 0:
                        # Check structure of first certification
                        cert = data[0]
                        required_fields = ['name', 'issuer', 'year', 'credential']
                        missing_fields = [field for field in required_fields if field not in cert]
                        
                        if missing_fields:
                            self.log_result("GET /api/certifications", False, f"Missing fields in certification: {missing_fields}")
                        else:
                            self.log_result("GET /api/certifications", True, f"Retrieved {len(data)} certifications")
                    else:
                        self.log_result("GET /api/certifications", True, "Certifications endpoint working (empty list)")
                else:
                    self.log_result("GET /api/certifications", False, "Response is not a list")
            else:
                self.log_result("GET /api/certifications", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("GET /api/certifications", False, f"Request failed: {str(e)}")
    
    def test_get_achievements(self):
        """Test GET /api/achievements endpoint"""
        try:
            response = requests.get(f"{API_BASE}/achievements", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) > 0:
                        # Check structure of first achievement
                        achievement = data[0]
                        if 'description' in achievement:
                            self.log_result("GET /api/achievements", True, f"Retrieved {len(data)} achievements")
                        else:
                            self.log_result("GET /api/achievements", False, "Missing description field in achievement")
                    else:
                        self.log_result("GET /api/achievements", True, "Achievements endpoint working (empty list)")
                else:
                    self.log_result("GET /api/achievements", False, "Response is not a list")
            else:
                self.log_result("GET /api/achievements", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("GET /api/achievements", False, f"Request failed: {str(e)}")
    
    def test_post_contact(self):
        """Test POST /api/contact endpoint"""
        try:
            # Test data for contact form
            contact_data = {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "subject": "Portfolio Inquiry",
                "message": "Hello, I'm interested in your work and would like to discuss potential opportunities."
            }
            
            response = requests.post(
                f"{API_BASE}/contact", 
                json=contact_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['name', 'email', 'subject', 'message', 'isRead', 'createdAt']
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_result("POST /api/contact", False, f"Missing fields in response: {missing_fields}")
                else:
                    # Verify the data was stored correctly
                    if (data['name'] == contact_data['name'] and 
                        data['email'] == contact_data['email'] and
                        data['isRead'] == False):
                        self.log_result("POST /api/contact", True, "Contact form submission successful")
                    else:
                        self.log_result("POST /api/contact", False, "Contact data not stored correctly")
            else:
                self.log_result("POST /api/contact", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("POST /api/contact", False, f"Request failed: {str(e)}")
    
    def test_contact_form_validation(self):
        """Test POST /api/contact with invalid data"""
        try:
            # Test with missing required fields
            invalid_data = {
                "name": "John Doe",
                "email": "invalid-email"  # Missing subject and message
            }
            
            response = requests.post(
                f"{API_BASE}/contact", 
                json=invalid_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_result("POST /api/contact (validation)", True, "Validation working correctly")
            elif response.status_code == 200:
                self.log_result("POST /api/contact (validation)", False, "Validation not working - accepted invalid data")
            else:
                self.log_result("POST /api/contact (validation)", False, f"Unexpected status code: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("POST /api/contact (validation)", False, f"Request failed: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print(f"🚀 Starting Backend API Tests for Space-themed Portfolio")
        print(f"📡 Testing against: {API_BASE}")
        print("=" * 60)
        
        # Test all GET endpoints
        self.test_get_profile()
        self.test_get_experience()
        self.test_get_projects()
        self.test_get_project_categories()
        self.test_get_skills()
        self.test_get_certifications()
        self.test_get_achievements()
        
        # Test POST endpoints
        self.test_post_contact()
        self.test_contact_form_validation()
        
        # Print summary
        print("=" * 60)
        print(f"📊 Test Results Summary:")
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        print(f"📈 Success Rate: {(self.results['passed'] / (self.results['passed'] + self.results['failed']) * 100):.1f}%")
        
        if self.results['errors']:
            print("\n🔍 Failed Tests Details:")
            for error in self.results['errors']:
                print(f"  • {error}")
        
        return self.results['failed'] == 0

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All backend API tests passed!")
        sys.exit(0)
    else:
        print(f"\n⚠️  {tester.results['failed']} test(s) failed. Check the details above.")
        sys.exit(1)