import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Mock data to seed
MOCK_DATA = {
    "profile": {
        "name": "Punith N",
        "title": "Electronics & Communication Engineering Graduate",
        "subtitle": "IoT Enthusiast | Embedded Systems Developer | Web Application Developer",
        "bio": "Electronics and Communication Engineering graduate (May 2025) exploring the frontiers of IoT, Embedded Systems, and Web Application Development. Driven by curiosity and a desire to use technology to solve real-world problems.",
        "email": "Punithn2803@gmail.com",
        "phone": "+91 7204030445",
        "linkedin": "https://linkedin.com/in/punith-n-429386237",
        "location": "Bengaluru, India",
        "graduationYear": "May 2025",
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    
    "experience": [
        {
            "title": "Web Application Developer Intern",
            "company": "Decisive Analytical Systems Pvt. Ltd.",
            "location": "Bengaluru",
            "duration": "Feb 2025 – Jun 2025",
            "type": "Internship",
            "responsibilities": [
                "Developed backend and frontend modules for resume management platform",
                "Integrated Google Sheets API with PostgreSQL databases",
                "Worked in Agile methodology to deliver features on time"
            ],
            "order": 1,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "IoT Intern",
            "company": "Innovate Intern",
            "location": "Remote",
            "duration": "Sep 2024 – Dec 2024",
            "type": "Internship",
            "responsibilities": [
                "Designed sensor-based embedded systems for real-time monitoring",
                "Programmed microcontrollers using Embedded C and Arduino IDE"
            ],
            "order": 2,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Embedded Systems Intern",
            "company": "CodTech IT Solutions",
            "location": "Remote",
            "duration": "Jun 2024",
            "type": "Internship",
            "responsibilities": [
                "Debugged firmware for embedded devices",
                "Assisted in testing and optimizing sensor-based systems"
            ],
            "order": 3,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ],

    "projects": [
        {
            "title": "Real-Time Heart Monitoring System",
            "description": "ESP32 + MAX30100-based IoT device to monitor heart rate with abnormal pattern detection alerts",
            "technologies": ["ESP32", "MAX30100", "IoT", "C++", "Embedded C"],
            "status": "Award-winning paper presentation at ICRCCT",
            "category": "IoT Healthcare",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Smart Home Automation",
            "description": "Automated control of appliances via IoT dashboard using ESP32 and relays with energy-efficient switching",
            "technologies": ["ESP32", "IoT", "Relay Control", "Dashboard", "Arduino IDE"],
            "status": "Completed",
            "category": "IoT Automation",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Weather Monitoring Station",
            "description": "Cloud-connected sensor station for live temperature & humidity tracking",
            "technologies": ["DHT11", "ESP32", "Cloud Integration", "Real-time Data"],
            "status": "Deployed",
            "category": "IoT Monitoring",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Water Quality Monitoring System",
            "description": "Tracked pH, turbidity, and TDS values for rural water sources with wireless data transmission",
            "technologies": ["pH Sensors", "TDS Sensors", "Wireless Communication", "Dashboard"],
            "status": "Completed",
            "category": "IoT Environmental",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Wireless EV Charging Prototype",
            "description": "Tesla coil-based wireless power transfer system with live status display and auto-alignment logic",
            "technologies": ["Tesla Coil", "Wireless Power Transfer", "LCD Display", "Control Systems"],
            "status": "Prototype",
            "category": "Power Electronics",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ],

    "skills": {
        "technical": [
            {"name": "C/C++", "level": 90},
            {"name": "Embedded C", "level": 85},
            {"name": "Arduino IDE", "level": 90},
            {"name": "ESP32", "level": 85},
            {"name": "IoT Development", "level": 80},
            {"name": "PostgreSQL", "level": 75},
            {"name": "HTML/CSS", "level": 80},
            {"name": "C#", "level": 70}
        ],
        "soft": [
            "Team Management",
            "Leadership",
            "Problem Solving",
            "Analytical Thinking",
            "Communication",
            "Presentation Skills"
        ],
        "updatedAt": datetime.utcnow()
    },

    "certifications": [
        {
            "name": "PEGA Certified System Architect",
            "issuer": "Pega",
            "year": "2023",
            "credential": "System Architect",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "PEGA Certified Senior System Architect", 
            "issuer": "Pega",
            "year": "2023",
            "credential": "Senior System Architect",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "NCC 'B' & 'C' Certificates",
            "issuer": "National Cadet Corps",
            "year": "2023",
            "credential": "Grade A",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "IoT Certification",
            "issuer": "Codtech & Innovate Intern",
            "year": "2024",
            "credential": "Virtual",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "Cybersecurity for Educators",
            "issuer": "Microsoft Philanthropies",
            "year": "2024",
            "credential": "Certified",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "VLSI & Embedded Systems",
            "issuer": "NIELIT",
            "year": "2024",
            "credential": "Certified",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ],

    "achievements": [
        {
            "description": "🥇 Winner – ICRCCT Paper Presentation (Real-Time Heart Rate Monitoring using IoT)",
            "order": 1,
            "createdAt": datetime.utcnow()
        },
        {
            "description": "🎖️ NCC Junior Under Officer",
            "order": 2,
            "createdAt": datetime.utcnow()
        },
        {
            "description": "📘 Completed 6 MOOC courses via VTU Online",
            "order": 3,
            "createdAt": datetime.utcnow()
        },
        {
            "description": "🧭 Volunteered at National-level Jamboree in Trichy",
            "order": 4,
            "createdAt": datetime.utcnow()
        }
    ]
}

async def seed_database():
    """Seed the database with mock data"""
    try:
        print("🌱 Starting database seeding...")
        
        # Clear existing data
        print("🧹 Clearing existing collections...")
        await db.profile.delete_many({})
        await db.experience.delete_many({})
        await db.projects.delete_many({})
        await db.skills.delete_many({})
        await db.certifications.delete_many({})
        await db.achievements.delete_many({})
        await db.contact_messages.delete_many({})
        
        # Insert profile data
        print("👤 Inserting profile data...")
        await db.profile.insert_one(MOCK_DATA["profile"])
        
        # Insert experience data
        print("💼 Inserting experience data...")
        await db.experience.insert_many(MOCK_DATA["experience"])
        
        # Insert projects data
        print("🚀 Inserting projects data...")
        await db.projects.insert_many(MOCK_DATA["projects"])
        
        # Insert skills data
        print("🛠️ Inserting skills data...")
        await db.skills.insert_one(MOCK_DATA["skills"])
        
        # Insert certifications data
        print("🏆 Inserting certifications data...")
        await db.certifications.insert_many(MOCK_DATA["certifications"])
        
        # Insert achievements data
        print("⭐ Inserting achievements data...")
        await db.achievements.insert_many(MOCK_DATA["achievements"])
        
        print("✅ Database seeding completed successfully!")
        
        # Print summary
        profile_count = await db.profile.count_documents({})
        experience_count = await db.experience.count_documents({})
        projects_count = await db.projects.count_documents({})
        skills_count = await db.skills.count_documents({})
        certifications_count = await db.certifications.count_documents({})
        achievements_count = await db.achievements.count_documents({})
        
        print(f"""
📊 Database Summary:
   Profile: {profile_count} record
   Experience: {experience_count} records
   Projects: {projects_count} records
   Skills: {skills_count} record
   Certifications: {certifications_count} records
   Achievements: {achievements_count} records
        """)
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())