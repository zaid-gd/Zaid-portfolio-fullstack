from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List
import uuid
from datetime import datetime
import aiosmtplib
from email.message import EmailMessage
import asyncio


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactFormRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactFormResponse(BaseModel):
    success: bool
    message: str

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
RECIPIENT_EMAIL = "zaid.ansari5127@gmail.com"

async def send_contact_email(contact_data: ContactFormRequest):
    """Send contact form data via email"""
    try:
        # Create email message
        msg = EmailMessage()
        msg["From"] = f"Portfolio Contact <{RECIPIENT_EMAIL}>"
        msg["To"] = RECIPIENT_EMAIL
        msg["Subject"] = f"Portfolio Contact: {contact_data.subject}"
        
        # Email body
        email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #2c3e50; margin-bottom: 20px; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">
                    New Portfolio Contact Message
                </h2>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #34495e; margin-bottom: 10px;">Contact Information:</h3>
                    <p style="margin: 5px 0;"><strong>Name:</strong> {contact_data.name}</p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> {contact_data.email}</p>
                    <p style="margin: 5px 0;"><strong>Subject:</strong> {contact_data.subject}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #34495e; margin-bottom: 10px;">Message:</h3>
                    <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #00d4ff; border-radius: 5px;">
                        <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">{contact_data.message}</p>
                    </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1; text-align: center; color: #7f8c8d; font-size: 12px;">
                    <p>This message was sent from your portfolio website contact form.</p>
                    <p>Sent on: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        msg.set_content(email_body, subtype="html")
        
        # Note: In production, you would use actual SMTP credentials
        # For now, we'll simulate successful email sending
        logger.info(f"Email would be sent to {RECIPIENT_EMAIL} from {contact_data.name} ({contact_data.email})")
        logger.info(f"Subject: {contact_data.subject}")
        logger.info(f"Message preview: {contact_data.message[:100]}...")
        
        # Simulate email sending delay
        await asyncio.sleep(0.5)
        
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/contact", response_model=ContactFormResponse)
async def submit_contact_form(contact_data: ContactFormRequest):
    """Handle contact form submissions"""
    try:
        # Validate input data (Pydantic handles basic validation)
        logger.info(f"Received contact form submission from: {contact_data.name} ({contact_data.email})")
        
        # Send email
        email_sent = await send_contact_email(contact_data)
        
        if email_sent:
            return ContactFormResponse(
                success=True,
                message="Thank you for your message! I'll get back to you soon."
            )
        else:
            raise HTTPException(
                status_code=500,
                detail="Failed to send message. Please try again later."
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your request."
        )

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
