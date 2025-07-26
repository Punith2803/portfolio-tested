from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime

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

# Models
class PersonalProfile(BaseModel):
    name: str
    title: str
    subtitle: str
    bio: str
    email: str
    phone: str
    linkedin: str
    location: str
    graduationYear: str

class PersonalProfileResponse(PersonalProfile):
    id: str = Field(alias="_id")
    createdAt: datetime
    updatedAt: datetime

class Experience(BaseModel):
    title: str
    company: str
    location: str
    duration: str
    type: str
    responsibilities: List[str]
    order: int = 0

class ExperienceResponse(Experience):
    id: str = Field(alias="_id")
    createdAt: datetime
    updatedAt: datetime

class Project(BaseModel):
    title: str
    description: str
    technologies: List[str]
    status: str
    category: str
    githubUrl: Optional[str] = None
    liveUrl: Optional[str] = None
    imageUrl: Optional[str] = None

class ProjectResponse(Project):
    id: str = Field(alias="_id")
    createdAt: datetime
    updatedAt: datetime

class TechnicalSkill(BaseModel):
    name: str
    level: int

class Skills(BaseModel):
    technical: List[TechnicalSkill]
    soft: List[str]

class SkillsResponse(Skills):
    id: str = Field(alias="_id")
    updatedAt: datetime

class Certification(BaseModel):
    name: str
    issuer: str
    year: str
    credential: str
    verificationUrl: Optional[str] = None

class CertificationResponse(Certification):
    id: str = Field(alias="_id")
    createdAt: datetime
    updatedAt: datetime

class Achievement(BaseModel):
    description: str
    order: int = 0

class AchievementResponse(Achievement):
    id: str = Field(alias="_id")
    createdAt: datetime

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ContactMessageResponse(ContactMessage):
    id: str = Field(alias="_id")
    isRead: bool
    createdAt: datetime

# API Routes

# Profile endpoints
@api_router.get("/profile", response_model=PersonalProfileResponse)
async def get_profile():
    profile = await db.profile.find_one()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    profile["_id"] = str(profile["_id"])
    return profile

@api_router.put("/profile", response_model=PersonalProfileResponse)
async def update_profile(profile: PersonalProfile):
    profile_dict = profile.dict()
    profile_dict["updatedAt"] = datetime.utcnow()
    
    result = await db.profile.update_one(
        {},
        {"$set": profile_dict, "$setOnInsert": {"createdAt": datetime.utcnow()}},
        upsert=True
    )
    
    updated_profile = await db.profile.find_one()
    updated_profile["_id"] = str(updated_profile["_id"])
    return updated_profile

# Experience endpoints
@api_router.get("/experience", response_model=List[ExperienceResponse])
async def get_experience():
    experiences = await db.experience.find().sort("order", 1).to_list(100)
    for exp in experiences:
        exp["_id"] = str(exp["_id"])
    return experiences

@api_router.post("/experience", response_model=ExperienceResponse)
async def create_experience(experience: Experience):
    exp_dict = experience.dict()
    exp_dict["createdAt"] = datetime.utcnow()
    exp_dict["updatedAt"] = datetime.utcnow()
    
    result = await db.experience.insert_one(exp_dict)
    created_exp = await db.experience.find_one({"_id": result.inserted_id})
    created_exp["_id"] = str(created_exp["_id"])
    return created_exp

# Projects endpoints
@api_router.get("/projects", response_model=List[ProjectResponse])
async def get_projects():
    projects = await db.projects.find().sort("createdAt", -1).to_list(100)
    for project in projects:
        project["_id"] = str(project["_id"])
    return projects

@api_router.post("/projects", response_model=ProjectResponse)
async def create_project(project: Project):
    project_dict = project.dict()
    project_dict["createdAt"] = datetime.utcnow()
    project_dict["updatedAt"] = datetime.utcnow()
    
    result = await db.projects.insert_one(project_dict)
    created_project = await db.projects.find_one({"_id": result.inserted_id})
    created_project["_id"] = str(created_project["_id"])
    return created_project

@api_router.get("/projects/categories")
async def get_project_categories():
    categories = await db.projects.distinct("category")
    return {"categories": categories}

# Skills endpoints
@api_router.get("/skills", response_model=SkillsResponse)
async def get_skills():
    skills = await db.skills.find_one()
    if not skills:
        raise HTTPException(status_code=404, detail="Skills not found")
    skills["_id"] = str(skills["_id"])
    return skills

@api_router.put("/skills", response_model=SkillsResponse)
async def update_skills(skills: Skills):
    skills_dict = skills.dict()
    skills_dict["updatedAt"] = datetime.utcnow()
    
    result = await db.skills.update_one(
        {},
        {"$set": skills_dict},
        upsert=True
    )
    
    updated_skills = await db.skills.find_one()
    updated_skills["_id"] = str(updated_skills["_id"])
    return updated_skills

# Certifications endpoints
@api_router.get("/certifications", response_model=List[CertificationResponse])
async def get_certifications():
    certifications = await db.certifications.find().sort("year", -1).to_list(100)
    for cert in certifications:
        cert["_id"] = str(cert["_id"])
    return certifications

@api_router.post("/certifications", response_model=CertificationResponse)
async def create_certification(certification: Certification):
    cert_dict = certification.dict()
    cert_dict["createdAt"] = datetime.utcnow()
    cert_dict["updatedAt"] = datetime.utcnow()
    
    result = await db.certifications.insert_one(cert_dict)
    created_cert = await db.certifications.find_one({"_id": result.inserted_id})
    created_cert["_id"] = str(created_cert["_id"])
    return created_cert

# Achievements endpoints
@api_router.get("/achievements", response_model=List[AchievementResponse])
async def get_achievements():
    achievements = await db.achievements.find().sort("order", 1).to_list(100)
    for achievement in achievements:
        achievement["_id"] = str(achievement["_id"])
    return achievements

@api_router.post("/achievements", response_model=AchievementResponse)
async def create_achievement(achievement: Achievement):
    achievement_dict = achievement.dict()
    achievement_dict["createdAt"] = datetime.utcnow()
    
    result = await db.achievements.insert_one(achievement_dict)
    created_achievement = await db.achievements.find_one({"_id": result.inserted_id})
    created_achievement["_id"] = str(created_achievement["_id"])
    return created_achievement

# Contact endpoints
@api_router.post("/contact", response_model=ContactMessageResponse)
async def submit_contact(contact: ContactMessage):
    contact_dict = contact.dict()
    contact_dict["isRead"] = False
    contact_dict["createdAt"] = datetime.utcnow()
    
    result = await db.contact_messages.insert_one(contact_dict)
    created_message = await db.contact_messages.find_one({"_id": result.inserted_id})
    created_message["_id"] = str(created_message["_id"])
    return created_message

@api_router.get("/contact", response_model=List[ContactMessageResponse])
async def get_contact_messages():
    messages = await db.contact_messages.find().sort("createdAt", -1).to_list(100)
    for message in messages:
        message["_id"] = str(message["_id"])
    return messages

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
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
