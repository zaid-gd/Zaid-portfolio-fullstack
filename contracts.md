# Portfolio Website API Contracts

## Overview
This document outlines the API contracts for Zaid Ali Ansari's portfolio website. The backend handles contact form submissions by sending emails directly without storing any user data.

## API Endpoints

### 1. Contact Form Submission
**Endpoint:** `POST /api/contact`

**Purpose:** Send contact form data via email to zaid.ansari5127@gmail.com

**Request Body:**
```json
{
  "name": "string (required, min 2 chars)",
  "email": "string (required, valid email format)",
  "subject": "string (required, min 3 chars)",
  "message": "string (required, min 10 chars)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "details": "Specific error details"
}
```

**Validation Rules:**
- Name: Required, minimum 2 characters
- Email: Required, valid email format
- Subject: Required, minimum 3 characters
- Message: Required, minimum 10 characters

## Frontend Integration

### Current Mock Implementation
- Contact form uses mock submission with local state management
- Form validation handled in frontend
- Success/error messages shown via toast notifications

### Backend Integration Changes Required
1. Update Contact.jsx to call actual API endpoint
2. Replace mock submission logic with axios API call
3. Handle loading states during API requests
4. Update error handling for backend responses

### Files to Modify
- `/app/frontend/src/components/sections/Contact.jsx`
- Remove mock submission logic
- Add API endpoint calls
- Update form submission handling

## Backend Implementation

### Dependencies Required
- `nodemailer` for email sending
- Email service configuration (Gmail SMTP)
- Input validation middleware
- CORS configuration

### Email Configuration
- SMTP server: Gmail
- Recipient: zaid.ansari5127@gmail.com
- Email format: HTML template with form data
- Error handling for failed deliveries

### Security Considerations
- Rate limiting for contact form submissions
- Input sanitization
- CORS restrictions
- No data persistence (as requested)

## Future Enhancements (Manual Addition)

### Potential Features to Add Later
1. **Resume Download**
   - Endpoint: `GET /api/resume/download`
   - File serving capability

2. **Blog/Articles System**
   - CRUD operations for blog posts
   - Database integration
   - Admin authentication

3. **Project Gallery Management**
   - Dynamic project management
   - Image uploads
   - Content management system

4. **Analytics Integration**
   - Visitor tracking
   - Contact form analytics
   - Performance metrics

5. **Newsletter Subscription**
   - Email list management
   - Automated email campaigns

### Implementation Notes
- All future features should maintain the existing design system
- Database integration can be added later without affecting current functionality
- Authentication system will be needed for admin features
- File upload capabilities for project images and resume updates

## Testing Requirements

### Backend Testing
- Contact form submission with valid data
- Email delivery confirmation
- Input validation testing
- Error handling verification
- Rate limiting functionality

### Frontend Integration Testing
- Form submission flow
- Loading states
- Success/error message display
- Form validation sync with backend
- Mobile responsiveness of form interactions

## Deployment Considerations
- Environment variables for email configuration
- SMTP credentials security
- Production email settings
- Error logging and monitoring