#!/usr/bin/env python3
"""
Backend API Testing Script
Tests all backend API endpoints to ensure they're working properly.
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
    # If REACT_APP_BACKEND_URL is empty (for relative URLs), use base_url from environment
    BACKEND_URL = os.getenv('base_url')
    if not BACKEND_URL:
        print("❌ ERROR: Neither REACT_APP_BACKEND_URL nor base_url found in environment")
        sys.exit(1)
    print(f"ℹ️  Using base_url since REACT_APP_BACKEND_URL is empty (relative URL setup): {BACKEND_URL}")

API_BASE_URL = f"{BACKEND_URL}/api"

print(f"🔍 Testing Backend API at: {API_BASE_URL}")
print("=" * 60)

def test_hello_world():
    """Test GET /api/ endpoint"""
    print("\n📋 Testing GET /api/ (Hello World)")
    try:
        response = requests.get(f"{API_BASE_URL}/", timeout=10)
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and data["message"] == "Hello World":
                print("   ✅ PASS: Hello World endpoint working correctly")
                return True
            else:
                print("   ❌ FAIL: Unexpected response format")
                return False
        else:
            print(f"   ❌ FAIL: Expected 200, got {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"   ❌ FAIL: Request failed - {str(e)}")
        return False
    except Exception as e:
        print(f"   ❌ FAIL: Unexpected error - {str(e)}")
        return False

def test_create_status_check():
    """Test POST /api/status endpoint"""
    print("\n📋 Testing POST /api/status (Create Status Check)")
    
    test_data = {
        "client_name": "TestClient_API_Check"
    }
    
    try:
        response = requests.post(
            f"{API_BASE_URL}/status", 
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["id", "client_name", "timestamp"]
            
            if all(field in data for field in required_fields):
                if data["client_name"] == test_data["client_name"]:
                    print("   ✅ PASS: Status check created successfully")
                    return True, data["id"]
                else:
                    print("   ❌ FAIL: Client name mismatch")
                    return False, None
            else:
                print(f"   ❌ FAIL: Missing required fields. Expected: {required_fields}")
                return False, None
        else:
            print(f"   ❌ FAIL: Expected 200, got {response.status_code}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"   ❌ FAIL: Request failed - {str(e)}")
        return False, None
    except Exception as e:
        print(f"   ❌ FAIL: Unexpected error - {str(e)}")
        return False, None

def test_get_status_checks():
    """Test GET /api/status endpoint"""
    print("\n📋 Testing GET /api/status (Get All Status Checks)")
    
    try:
        response = requests.get(f"{API_BASE_URL}/status", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Response: Found {len(data)} status checks")
            
            if isinstance(data, list):
                # Check if we have at least one status check (from our create test)
                if len(data) > 0:
                    # Verify structure of first item
                    first_item = data[0]
                    required_fields = ["id", "client_name", "timestamp"]
                    
                    if all(field in first_item for field in required_fields):
                        print("   ✅ PASS: Status checks retrieved successfully")
                        return True
                    else:
                        print(f"   ❌ FAIL: Status check missing required fields: {required_fields}")
                        return False
                else:
                    print("   ⚠️  WARNING: No status checks found, but endpoint is working")
                    return True
            else:
                print("   ❌ FAIL: Response is not a list")
                return False
        else:
            print(f"   ❌ FAIL: Expected 200, got {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"   ❌ FAIL: Request failed - {str(e)}")
        return False
    except Exception as e:
        print(f"   ❌ FAIL: Unexpected error - {str(e)}")
        return False

def run_all_tests():
    """Run all backend API tests"""
    print("🚀 Starting Backend API Tests")
    print(f"⏰ Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    results = {}
    
    # Test 1: Hello World endpoint
    results['hello_world'] = test_hello_world()
    
    # Test 2: Create status check
    results['create_status'], created_id = test_create_status_check()
    
    # Test 3: Get all status checks
    results['get_status'] = test_get_status_checks()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    total_tests = len(results)
    passed_tests = sum(1 for result in results.values() if result)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"   {test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\n🎯 Overall Result: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 ALL TESTS PASSED! Backend API is working correctly.")
        return True
    else:
        print("⚠️  SOME TESTS FAILED! Check the details above.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)