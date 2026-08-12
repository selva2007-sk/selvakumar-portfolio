// Portfolio Data for SELVAKUMAR S

export interface NavItem {
  id: string;
  label: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  achievements?: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  iconName: string; // Used to match Lucide icons
  category?: "Frontend" | "Backend" | "Database" | "Programming" | "AI" | "Tools";
}

export interface CertificateItem {
  id: string;
  title: string;
  org: string;
  month: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
  credentialUrl: string;
  featured?: boolean;
}

export interface InternshipItem {
  id: string;
  title: string;
  org: string;
  duration: string;
  type: string;
  description: string;
  skills: string[];
  image?: string;
  credentialUrl?: string;
  metrics?: { label: string; value: string }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  impact?: string;
}

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const heroRoles = [
  {
    normal: "",
    highlight: "Full Stack Developer with AI",
  },
  {
    normal: "",
    highlight: "Software Engineer",
  },
  {
    normal: "",
    highlight: "Startup Builder",
  },
];

export const educationList = [
  {
    degree: "B.Tech Information Technology",
    institution: "Mahendra Engineering College",
    duration: "2024 - Present"
  }
];

export const timelineData: TimelineItem[] = [
  {
    year: "2021 - 2022",
    title: "Secondary Schooling (SSLC)",
    subtitle: "Government Higher School",
    description: "Completed secondary education with a strong focus on mathematics and science, laying the foundation for a technical career.",
    skills: ["Mathematics", "Science", "Social Science"]
  },
  {
    year: "2023 - 2024",
    title: "Higher Secondary Education (HSC)",
    subtitle: "Government Higher Secondary School",
    description: "Specialized in Biology and Mathematics. Developed early interests in extra knowledge building and modern science application.",
    skills: ["Biology", "Mathematics"]
  },
  {
    year: "2024 - Present",
    title: "B.Tech Information Technology",
    subtitle: "Mahendra Engineering College",
    description: "Deep diving into Software Development, Web Architectures, and AI. Actively involved in technical clubs, research world, and modern engineering platforms.",
    skills: ["C", "Python", "Data Structures", "Java Learning"]
  },
  {
    year: "07 Jun - 06 July 2026",
    title: "Full Stack Developer Intern",
    subtitle: "Growfinix Services Private Limited",
    description: "Developed secure full-stack web applications using React.js, Node.js, Express.js, MongoDB, and PostgreSQL. Built RESTful APIs, implemented JWT authentication, and completed real-world projects following industry best practices.",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "JavaScript",
      "Tailwind CSS",
      "REST APIs",
      "JWT",
      "bcrypt",
      "GitHub",
      "Postman"
    ]
  },
  {
    year: "Work in Progress",
    title: "I Kept This Private",
    subtitle: "Researching Future Technologies",
    description: "Researching future technologies and exploring a trillionaire-based multi-industry business ecosystem because a brand new era has begun.",
    skills: ["Startup Management", "Product Development", "Business Research"]
  },
  {
    year: "Present Feature",
    title: "Aspiring Full Stack Developer with AI",
    subtitle: "Ongoing Learning",
    description: "Currently mastering advanced Generative AI and deep models while building scalable, safe, and lightning-fast full-stack applications.",
    skills: ["GenAI", "Communication", "Full Stack"]
  }
];

export const aiEngineeringStack = [
  {
    category: "AI Integration & APIs",
    skills: ["OpenAI GPT-4o API", "Google Gemini API", "Prompt Engineering", "Structured Outputs"]
  },
  {
    category: "Vector & RAG Architectures",
    skills: ["Retrieval-Augmented Generation (RAG)", "Embeddings", "Vector Databases (MongoDB Vector Search)", "Semantic Search"]
  },
  {
    category: "AI Agents & Automation",
    skills: ["Autonomous AI Agents", "LangChain Workflows", "Function Calling", "Multi-Agent Systems"]
  }
];

export const skillsData: SkillItem[] = [
  { name: "TypeScript", level: 85, iconName: "JsIcon", category: "Frontend" },
  { name: "React / Next.js", level: 88, iconName: "ReactIcon", category: "Frontend" },
  { name: "Node.js / Express", level: 85, iconName: "NodeIcon", category: "Backend" },
  { name: "PostgreSQL & SQL", level: 80, iconName: "Database", category: "Database" },
  { name: "MongoDB & Vector Search", level: 82, iconName: "MongoIcon", category: "Database" },
  { name: "Python / ML", level: 78, iconName: "PythonIcon", category: "Programming" },
  { name: "REST APIs & JWT", level: 90, iconName: "Server", category: "Backend" },
  { name: "AI / LLM Pipelines", level: 85, iconName: "AiIcon", category: "AI" },
  { name: "C / Data Structures", level: 85, iconName: "CIcon", category: "Programming" },
  { name: "Docker & Cloud Deploy", level: 75, iconName: "Cpu", category: "Tools" },
  { name: "Git & GitHub CI/CD", level: 92, iconName: "GithubIcon", category: "Tools" },
  { name: "Flutter / Mobile", level: 68, iconName: "FlutterIcon", category: "Frontend" },
];

export const certificatesData: CertificateItem[] = [
  {
    id: "cert-growfinix-internship",
    title: "Full Stack Development Internship Certificate",
    org: "Growfinix Services Private Limited",
    month: "JUL",
    year: "2026",
    description: "Validated hands-on production internship developing secure React/Node.js web applications, REST APIs, and database integration.",
    image: "/images/growfinix-offer-letter.jpg",
    tags: ["Full Stack", "React", "Node.js", "Internship"],
    credentialUrl: "/images/growfinix-offer-letter.jpg",
    featured: true
  },
  {
    id: "cert-mongodb-rag",
    title: "Building RAG Apps Using MongoDB",
    org: "MongoDB",
    month: "JUL",
    year: "2026",
    description: "Built production retrieval-augmented generation (RAG) knowledge systems powered by vector embeddings and MongoDB context stores.",
    image: "/images/MangoDB Skill-5.jpg",
    tags: ["RAG", "AI", "MongoDB", "Embeddings"],
    credentialUrl: "https://www.mongodb.com/",
    featured: true
  },
  {
    id: "cert-mongodb-vector-search",
    title: "Building AI-Powered Search with MongoDB Vector Search",
    org: "MongoDB",
    month: "JUL",
    year: "2026",
    description: "Implemented high-performance semantic vector search workflows for intelligent similarity indexing.",
    image: "/images/MangoDB Skill-3.jpg",
    tags: ["AI", "Vector Search", "MongoDB"],
    credentialUrl: "https://www.mongodb.com/",
    featured: true
  },
  {
    id: "cert-mongodb-agents",
    title: "Building AI Agents with MongoDB",
    org: "MongoDB",
    month: "JUL",
    year: "2026",
    description: "Designed context-aware AI agent loops linking LLM tool calls with structured document storage.",
    image: "/images/MangoDB Skill-4.jpg",
    tags: ["AI Agents", "MongoDB", "LLM"],
    credentialUrl: "https://www.mongodb.com/",
    featured: true
  },
  {
    id: "cert-aws-beginners",
    title: "AWS Cloud Infrastructure & Services",
    org: "Great Learning",
    month: "APR",
    year: "2026",
    description: "Mastered cloud fundamentals, EC2 instance deployment, S3 storage buckets, and IAM security controls.",
    image: "/images/Aws.jpg",
    tags: ["AWS", "Cloud", "DevOps"],
    credentialUrl: "https://www.mygreatlearning.com",
    featured: true
  },
  {
    id: "cert-guvi-ai-workshop",
    title: "Generative AI Systems Workshop",
    org: "GUVI × HCL",
    month: "MAR",
    year: "2026",
    description: "Intensive training on Generative AI architectures, prompt optimization, and model fine-tuning fundamentals.",
    image: "/images/AI-workshop.png",
    tags: ["GenAI", "AI", "Prompting"],
    credentialUrl: "http://guvi.in",
    featured: true
  },
  {
    id: "cert-redhat-linux",
    title: "Red Hat Enterprise Linux Fundamentals (RH104)",
    org: "Red Hat",
    month: "SEP",
    year: "2025",
    description: "Practical Linux system administration, bash shell scripting, process management, and network diagnostics.",
    image: "/images/red-hat.jpg",
    tags: ["Linux", "CLI", "System Admin"],
    credentialUrl: "https://www.redhat.com",
    featured: true
  },
  {
    id: "cert-mongodb-strategy",
    title: "AI and Innovation: MongoDB Strategy",
    org: "MongoDB",
    month: "JUL",
    year: "2026",
    description: "Explored how MongoDB powers resilient AI applications with enterprise data scaling strategies.",
    image: "/images/MangoDB Skill-2.jpg",
    tags: ["AI", "MongoDB", "Strategy"],
    credentialUrl: "https://www.mongodb.com/",
    featured: false
  },
  {
    id: "cert-mongodb-basics",
    title: "MongoDB Basics for Engineers",
    org: "MongoDB",
    month: "JUL",
    year: "2026",
    description: "Completed comprehensive training on document databases, indexing techniques, and CRUD pipeline optimization.",
    image: "/images/MangoDB Skill-1.jpg",
    tags: ["MongoDB", "Database", "Basics"],
    credentialUrl: "https://www.mongodb.com/",
    featured: false
  },
  {
    id: "cert-communication",
    title: "Professional Workplace Communication",
    org: "Simplilearn SkillUp",
    month: "MAY",
    year: "2026",
    description: "Strengthened corporate presentation, agile team collaboration, and client-facing technical communication.",
    image: "/images/commu.jpg",
    tags: ["Communication", "Soft Skills"],
    credentialUrl: "https://www.simplilearn.com",
    featured: false
  },
  {
    id: "cert-guvi-ux-webinar",
    title: "User Experience (UX) Architecture",
    org: "GUVI × HCL",
    month: "MAR",
    year: "2026",
    description: "Applied user-centered design methodology, interactive prototyping, and component usability guidelines.",
    image: "/images/UX-web.png",
    tags: ["UX", "Design", "Product"],
    credentialUrl: "http://guvi.in",
    featured: false
  },
  {
    id: "cert-iste-2026",
    title: "ISTE Tamil Nadu Student Convention 2026",
    org: "ISTE Tamil Nadu Section × MEC",
    month: "FEB",
    year: "2026",
    description: "Presented research on emerging full-stack web and AI technologies at regional engineering summit.",
    image: "/images/poster-pre.jpg",
    tags: ["ISTE", "Research", "Convention"],
    credentialUrl: "https://www.isteonline.in",
    featured: false
  },
  {
    id: "cert-nptel-iot",
    title: "NPTEL – Internet of Things & Connected Systems",
    org: "NPTEL - SWAYAM",
    month: "APR",
    year: "2026",
    description: "Completed structured engineering coursework covering IoT protocols, sensors, and gateway networking.",
    image: "/images/nptel.jpg",
    tags: ["IoT", "Embedded", "Protocols"],
    credentialUrl: "https://swayam.gov.in",
    featured: false
  },
  {
    id: "cert-flutter-ai-workshop",
    title: "Mobile App Development with Flutter & AI Integration",
    org: "MEC – IT Department",
    month: "OCT",
    year: "2025",
    description: "Built cross-platform mobile apps featuring real-time Dart state management and AI endpoint connections.",
    image: "/images/Mec-workshop.jpg",
    tags: ["Flutter", "Mobile", "Dart"],
    credentialUrl: "https://www.mahendraec.edu.in",
    featured: false
  },
  {
    id: "cert-guvi-chatgpt",
    title: "Prompt Engineering & ChatGPT Systems",
    org: "GUVI × HCL",
    month: "SEP",
    year: "2025",
    description: "Explored LLM behavior, zero-shot/few-shot prompting strategies, and automated workflow triggers.",
    image: "/images/chatgpt.png",
    tags: ["ChatGPT", "Prompting", "AI"],
    credentialUrl: "/images/chatgpt.png",
    featured: false
  },
  {
    id: "cert-hashgraph-developer",
    title: "Hashgraph Distributed Systems Developer",
    org: "The Hashgraph Association",
    month: "AUG",
    year: "2025",
    description: "Studied consensus algorithms, distributed ledger security, and smart contract primitives.",
    image: "/images/hash-dev.jpg",
    tags: ["Distributed Systems", "Blockchain"],
    credentialUrl: "https://www.hedera.com",
    featured: false
  },
  {
    id: "cert-csc-dca",
    title: "Diploma in Computer Applications (DCA)",
    org: "CSC Computer Software College",
    month: "JUN",
    year: "2024",
    description: "Foundation in computer architecture, database management, and software systems operation.",
    image: "/images/csc.jpeg",
    tags: ["Computer Science", "DCA"],
    credentialUrl: "https://www.csccomputereducation.com",
    featured: false
  }
];

export const internshipsData: InternshipItem[] = [
  {
    id: "intern-1",
    title: "Full Stack Developer Intern",
    org: "Growfinix Services Private Limited",
    duration: "07 Jun - 06 July 2026",
    type: "Production Internship",
    description: "Architected secure full-stack web applications using React.js, Node.js, Express.js, MongoDB, and PostgreSQL. Built RESTful APIs with JWT authentication, managed schema migrations, and optimized production workflows.",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "TypeScript",
      "REST APIs",
      "JWT",
      "bcrypt",
      "GitHub",
      "Postman"
    ],
    image: "/images/growfinix-internship-certificate.jpg",
    credentialUrl: "https://growfinix.in/verify/certificate",
  }
];

export const selfProjects: ProjectItem[] = [
  {
    id: "self-p1",
    title: "Habit Tracker App – Daily Productivity & Goal Manager",
    description: "Developed a clean and responsive habit tracking application that helps users build positive daily routines, monitor progress, maintain streaks, and improve personal productivity through an intuitive task and goal management system.",
    tech: [
      "React",
      "Vite",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js"
    ],
    image: "/images/Self-habit.png",
    githubUrl: "https://github.com/selva2007-sk/habit-tracker-app",
    liveUrl: "#",
    impact: "Improves daily productivity by enabling consistent habit tracking, progress visualization, and long-term routine building through a lightweight full-stack web application."
  },
  {
    id: "self-p2",
    title: "Smart AI Assistant – Intelligent Chat & Productivity Platform",
    description: "Developed a modern AI-powered assistant platform that provides real-time conversational support, intelligent response generation, multilingual interaction, and productivity-focused automation through a responsive full-stack web application.",
    tech: [
      "React",
      "Vite",
      "JavaScript",
      "Node.js",
      "Express.js",
      "Tailwind CSS"
    ],
    image: "/images/Self-smartai.png",
    githubUrl: "https://github.com/selva2007-sk/smart-ai-assistant",
    liveUrl: "#",
    impact: "Enables AI-powered chat assistance, quick information retrieval, and scalable automation workflows with a lightweight and responsive full-stack architecture."
  },
  /*
  {
    id: "self-p3",
    title: "Biometric Student Attendance & Analytics System",
    description: "Built an automated biometric student attendance platform featuring real-time check-ins, automated leave approvals, and analytical attendance reports.",
    tech: ["React", "TypeScript", "Firebase", "Node.js", "Tailwind CSS", "REST API"],
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&q=80",
    githubUrl: "https://github.com/selva2105sk",
    liveUrl: "#",
    impact: "Automated student attendance tracking reducing manual register entry time by 90% for institution departments."
  },
  {
    id: "self-p4",
    title: "HabitFlow – Smart Productivity & Habit Tracker",
    description: "Designed a student productivity platform with visual streak algorithms, calendar logging, and interactive metrics charts to track habit consistency.",
    tech: ["React", "TypeScript", "Tailwind CSS", "SQLite", "Lucide React"],
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=600&q=80",
    githubUrl: "https://github.com/selva2007-sk/habit-tracker-app",
    liveUrl: "#",
    impact: "Visual streak algorithm and local database synchronization supporting 100% offline data retention."
  },
  {
    id: "self-p5",
    title: "The Food Planet Portal",
    description: "A full-stack gourmet food ordering portal featuring real-time cart state management, dynamic menu updates, and automated order confirmation.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    githubUrl: "https://github.com/selva2105sk",
    liveUrl: "#",
    impact: "Seamless interactive e-commerce cart management with instantaneous price calculation and item customization."
  }
  */
];

export const teamProjects: ProjectItem[] = [
  {
    id: "team-p1",
    title: "Crackers Supermarket – Online Fireworks Shopping Platform",
    description:
      "A responsive e-commerce web application for browsing, managing, and purchasing crackers online with secure product handling and easy order management.",
    tech: [
      "Python",
      "Flask",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Firebase",
      "SQLite"
    ],
    image: "/images/Team-cracker.png",
    githubUrl: "https://github.com/selva2007-sk/crackers-supermarket",
    liveUrl: "#",
    impact:
      "Built a functional online crackers supermarket platform with responsive UI, real-time product management, and lightweight database integration for efficient customer shopping experience."
  },
  {
    id: "team-p2",
    title: "ScholarAxis – Campus Management App",
    description: "A modern campus management application designed to streamline student records, attendance tracking, academic management, communication, and administrative workflows through a centralized digital platform.",
    tech: [
      "React.js",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js"
    ],
    image: "/images/Team-scholar.jpeg",
    githubUrl: "https://github.com/selva2007-sk/ScholarAxis-Campus-Management-App",
    liveUrl: "#",
    impact: "Improves campus administration efficiency by digitizing academic and student management processes, reducing manual workload, and enabling faster access to institutional information."
  },
  {
    id: "team-p3",
    title: "TumourTracker-AI – Brain Tumor Detection System",
    description: "An AI-powered medical image analysis platform that assists in detecting and analyzing brain tumors from MRI scans using deep learning techniques and an interactive web interface for diagnostic support.",
    tech: [
      "Python",
      "TensorFlow",
      "React.js",
      "Node.js",
      "Tailwind CSS",
      "FastAPI"
    ],
    image: "/images/Team-AItum.jpeg",
    githubUrl: "https://github.com/selva2007-sk/TumourTracker-AI",
    liveUrl: "#",
    impact: "Provides automated MRI scan analysis and tumor detection support, helping improve diagnostic efficiency and reducing manual screening effort."
  },
  {
    id: "team-p4",
    title: "QR Scam Detector – AI-Based QR Security Scanner",
    description: "A web-based security application that analyzes QR codes to identify phishing links, malicious URLs, fake payment requests, and other scam-related threats before users access them.",
    tech: [
      "React.js",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js"
    ],
    image: "/images/Team-scan.jpeg",
    githubUrl: "https://github.com/selva2007-sk/qr-scam-detector",
    liveUrl: "#",
    impact: "Enhances user cybersecurity awareness by detecting suspicious QR code content, reducing the risk of phishing attacks, fraudulent payments, and malicious website access."
  },
  {
    id: "team-p5",
    title: "YOGSHALA – Mobile Yoga Training App",
    description: "A mobile-friendly yoga training application designed to help users practice guided yoga sessions, follow workout routines, track daily wellness activities, and improve overall fitness through an interactive and accessible interface.",
    tech: [
      "React.js",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js"
    ],
    image: "/images/Team-yoga.jpeg",
    githubUrl: "https://github.com/selva2007-sk/yogshala-mobile-app",
    liveUrl: "#",
    impact: "Provides an accessible digital wellness experience by enabling users to follow structured yoga routines, maintain fitness consistency, and practice healthy habits anytime through a mobile application."
  },
  {
    id: "team-p6",
    title: "AI Skin Cancer Detector",
    description: "An AI-powered skin lesion analysis application that assists in identifying potential skin cancer conditions from uploaded images using deep learning and computer vision techniques for early awareness and screening support.",
    tech: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "React.js",
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    image: "/images/Team-skincancer.jpeg",
    githubUrl: "https://github.com/selva2007-sk/ai-skin-cancer-detector",
    liveUrl: "#",
    impact: "Provides fast preliminary skin lesion analysis through AI-based image classification, helping improve accessibility to early-stage skin health assessment and digital healthcare support."
  },
  {
    id: "team-p7",
    title: "AI Skin Analysis Platform",
    description: "An intelligent web-based skin analysis platform that uses AI-driven image processing techniques to analyze skin conditions, provide visual assessments, and generate helpful insights for skincare awareness and early screening support.",
    tech: [
      "React.js",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js"
    ],
    image: "/images/Team-skinanaliys.jpeg",
    githubUrl: "https://github.com/selva2007-sk/ai-skin-analysis-platform",
    liveUrl: "#",
    impact: "Enhances skin condition awareness by providing fast AI-assisted image analysis, improving accessibility to preliminary skincare assessment and digital health insights."
  }
];
