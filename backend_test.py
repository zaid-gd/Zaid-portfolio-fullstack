#!/usr/bin/env python3
"""
Backend API Testing for Portfolio Website
Tests the contact form API functionality and server health
"""

import requests
import json
import sys
from typing import Dict, Any

# Get backend URL from environment
BACKEND_URL = "https://zaid-portfolio.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.backend_url = BACKEND_URL
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, details: str):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details
        })
    
    def test_server_health(self):
        """Test GET /api/ endpoint for basic server health"""
        try:
            response = requests.get(f"{self.backend_url}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and data["message"] == "Hello World":
                    self.log_test("Server Health Check", True, f"Server is running. Response: {data}")
                    return True
                else:
                    self.log_test("Server Health Check", False, f"Unexpected response format: {data}")
                    return False
            else:
                self.log_test("Server Health Check", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Server Health Check", False, f"Connection error: {str(e)}")
            return False
    
    def test_contact_form_valid(self):
        """Test POST /api/contact with valid contact form data"""
        valid_data = {
            "name": "John Doe",
            "email": "john@example.com", 
            "subject": "Portfolio Inquiry",
            "message": "Hi Zaid, I saw your portfolio and would like to collaborate on a project. Your work is impressive!"
        }
        
        try:
            response = requests.post(
                f"{self.backend_url}/contact",
                json=valid_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") == True and "message" in data:
                    self.log_test("Valid Contact Form", True, f"Contact form accepted. Response: {data}")
                    return True
                else:
                    self.log_test("Valid Contact Form", False, f"Invalid response format: {data}")
                    return False
            else:
                self.log_test("Valid Contact Form", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Valid Contact Form", False, f"Connection error: {str(e)}")
            return False
    
    def test_contact_form_invalid_email(self):
        """Test with invalid email format"""
        invalid_data = {
            "name": "John",
            "email": "invalid-email",
            "subject": "Test",
            "message": "Test message for invalid email validation"
        }
        
        try:
            response = requests.post(
                f"{self.backend_url}/contact",
                json=invalid_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test("Invalid Email Validation", True, f"Correctly rejected invalid email: {response.status_code}")
                return True
            else:
                self.log_test("Invalid Email Validation", False, f"Expected 422, got {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Invalid Email Validation", False, f"Connection error: {str(e)}")
            return False
    
    def test_contact_form_missing_fields(self):
        """Test with missing required fields"""
        incomplete_data = {
            "name": "John",
            "email": "john@example.com"
            # Missing subject and message
        }
        
        try:
            response = requests.post(
                f"{self.backend_url}/contact",
                json=incomplete_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test("Missing Fields Validation", True, f"Correctly rejected missing fields: {response.status_code}")
                return True
            else:
                self.log_test("Missing Fields Validation", False, f"Expected 422, got {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Missing Fields Validation", False, f"Connection error: {str(e)}")
            return False
    
    def test_contact_form_short_message(self):
        """Test with message that's too short"""
        short_message_data = {
            "name": "John",
            "email": "john@example.com",
            "subject": "Test",
            "message": "Hi"  # Too short (min 10 chars required)
        }
        
        try:
            response = requests.post(
                f"{self.backend_url}/contact",
                json=short_message_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test("Short Message Validation", True, f"Correctly rejected short message: {response.status_code}")
                return True
            else:
                self.log_test("Short Message Validation", False, f"Expected 422, got {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Short Message Validation", False, f"Connection error: {str(e)}")
            return False
    
    def test_contact_form_long_fields(self):
        """Test with fields that exceed maximum length"""
        long_data = {
            "name": "A" * 101,  # Max 100 chars
            "email": "john@example.com",
            "subject": "B" * 201,  # Max 200 chars  
            "message": "C" * 2001  # Max 2000 chars
        }
        
        try:
            response = requests.post(
                f"{self.backend_url}/contact",
                json=long_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test("Long Fields Validation", True, f"Correctly rejected long fields: {response.status_code}")
                return True
            else:
                self.log_test("Long Fields Validation", False, f"Expected 422, got {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Long Fields Validation", False, f"Connection error: {str(e)}")
            return False
    
    def test_cors_configuration(self):
        """Test CORS configuration by checking headers"""
        try:
            # Make a GET request with Origin header to check CORS
            response = requests.get(
                f"{self.backend_url}/",
                headers={"Origin": "https://example.com"},
                timeout=10
            )
            
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Credentials': response.headers.get('Access-Control-Allow-Credentials')
            }
            
            if cors_headers['Access-Control-Allow-Origin']:
                self.log_test("CORS Configuration", True, f"CORS headers present: {cors_headers}")
                return True
            else:
                self.log_test("CORS Configuration", False, f"Missing CORS headers: {cors_headers}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("CORS Configuration", False, f"Connection error: {str(e)}")
            return False
    
    def test_empty_request_body(self):
        """Test with completely empty request body"""
        try:
            response = requests.post(
                f"{self.backend_url}/contact",
                json={},
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test("Empty Request Body", True, f"Correctly rejected empty body: {response.status_code}")
                return True
            else:
                self.log_test("Empty Request Body", False, f"Expected 422, got {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Empty Request Body", False, f"Connection error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 60)
        print("PORTFOLIO WEBSITE BACKEND API TESTING")
        print("=" * 60)
        print(f"Testing backend at: {self.backend_url}")
        print()
        
        # Test server health first
        server_healthy = self.test_server_health()
        
        if not server_healthy:
            print("\n❌ Server is not responding. Skipping remaining tests.")
            return False
        
        print("\n--- Contact Form API Tests ---")
        
        # Test valid contact form
        self.test_contact_form_valid()
        
        # Test validation scenarios
        self.test_contact_form_invalid_email()
        self.test_contact_form_missing_fields()
        self.test_contact_form_short_message()
        self.test_contact_form_long_fields()
        self.test_empty_request_body()
        
        # Test CORS
        print("\n--- Server Configuration Tests ---")
        self.test_cors_configuration()
        
        # Summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"Tests Passed: {passed}/{total}")
        
        if passed == total:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed. Check details above.")
            return False

def main():
    """Main test execution"""
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()