// Mock data for Punith N's space-themed portfolio
export const mockData = {
  personal: {
    name: "Punith N",
    title: "Electronics & Communication Engineering Student",
    subtitle: "IoT Enthusiast | Embedded Systems Developer | Web Application Developer",
    bio: "Passionate Electronics and Communication Engineering student exploring the frontiers of IoT, Embedded Systems, and Web Application Development. Driven by curiosity and a desire to use technology to solve real-world problems.",
    email: "Punithn2803@gmail.com",
    phone: "+91 7204030445",
    linkedin: "https://linkedin.com/in/punith-n-429386237",
    location: "Bengaluru, India",
    graduationYear: "2025"
  },
  
  experience: [
    {
      id: 1,
      title: "Web Application Developer Intern",
      company: "Decisive Analytical Systems Pvt. Ltd.",
      location: "Bengaluru",
      duration: "Feb 2025 – Jun 2025",
      type: "Internship",
      responsibilities: [
        "Developed backend and frontend modules for resume management platform",
        "Integrated Google Sheets API with PostgreSQL databases",
        "Worked in Agile methodology to deliver features on time"
      ]
    },
    {
      id: 2,
      title: "IoT Intern",
      company: "Innovate Intern",
      location: "Remote",
      duration: "Sep 2024 – Dec 2024",
      type: "Internship",
      responsibilities: [
        "Designed sensor-based embedded systems for real-time monitoring",
        "Programmed microcontrollers using Embedded C and Arduino IDE"
      ]
    },
    {
      id: 3,
      title: "Embedded Systems Intern",
      company: "CodTech IT Solutions",
      location: "Remote",
      duration: "Jun 2024",
      type: "Internship",
      responsibilities: [
        "Debugged firmware for embedded devices",
        "Assisted in testing and optimizing sensor-based systems"
      ]
    }
  ],

  projects: [
    {
      id: 1,
      title: "Real-Time Heart Monitoring System",
      description: "ESP32 + MAX30100-based IoT device to monitor heart rate with abnormal pattern detection alerts",
      technologies: ["ESP32", "MAX30100", "IoT", "C++", "Embedded C"],
      status: "Award-winning paper presentation at ICRCCT",
      category: "IoT Healthcare"
    },
    {
      id: 2,
      title: "Smart Home Automation",
      description: "Automated control of appliances via IoT dashboard using ESP32 and relays with energy-efficient switching",
      technologies: ["ESP32", "IoT", "Relay Control", "Dashboard", "Arduino IDE"],
      status: "Completed",
      category: "IoT Automation"
    },
    {
      id: 3,
      title: "Weather Monitoring Station",
      description: "Cloud-connected sensor station for live temperature & humidity tracking",
      technologies: ["DHT11", "ESP32", "Cloud Integration", "Real-time Data"],
      status: "Deployed",
      category: "IoT Monitoring"
    },
    {
      id: 4,
      title: "Water Quality Monitoring System",
      description: "Tracked pH, turbidity, and TDS values for rural water sources with wireless data transmission",
      technologies: ["pH Sensors", "TDS Sensors", "Wireless Communication", "Dashboard"],
      status: "Completed",
      category: "IoT Environmental"
    },
    {
      id: 5,
      title: "Wireless EV Charging Prototype",
      description: "Tesla coil-based wireless power transfer system with live status display and auto-alignment logic",
      technologies: ["Tesla Coil", "Wireless Power Transfer", "LCD Display", "Control Systems"],
      status: "Prototype",
      category: "Power Electronics"
    }
  ],

  skills: {
    technical: [
      { name: "C/C++", level: 90 },
      { name: "Embedded C", level: 85 },
      { name: "Arduino IDE", level: 90 },
      { name: "ESP32", level: 85 },
      { name: "IoT Development", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "HTML/CSS", level: 80 },
      { name: "C#", level: 70 }
    ],
    soft: [
      "Team Management",
      "Leadership",
      "Problem Solving",
      "Analytical Thinking",
      "Communication",
      "Presentation Skills"
    ]
  },

  certifications: [
    {
      name: "PEGA Certified System Architect",
      issuer: "Pega",
      year: "2023",
      credential: "System Architect"
    },
    {
      name: "PEGA Certified Senior System Architect", 
      issuer: "Pega",
      year: "2023",
      credential: "Senior System Architect"
    },
    {
      name: "NCC 'B' & 'C' Certificates",
      issuer: "National Cadet Corps",
      year: "2023",
      credential: "Grade A"
    },
    {
      name: "IoT Certification",
      issuer: "Codtech & Innovate Intern",
      year: "2024",
      credential: "Virtual"
    },
    {
      name: "Cybersecurity for Educators",
      issuer: "Microsoft Philanthropies",
      year: "2024",
      credential: "Certified"
    },
    {
      name: "VLSI & Embedded Systems",
      issuer: "NIELIT",
      year: "2024",
      credential: "Certified"
    }
  ],

  achievements: [
    "🥇 Winner – ICRCCT Paper Presentation (Real-Time Heart Rate Monitoring using IoT)",
    "🎖️ NCC Junior Under Officer",
    "📘 Completed 6 MOOC courses via VTU Online",
    "🧭 Volunteered at National-level Jamboree in Trichy"
  ]
};