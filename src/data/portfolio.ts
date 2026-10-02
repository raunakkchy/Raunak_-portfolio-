export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  technologies: string[];
  liveDemoUrl: string;
  githubUrl?: string;
  whatItDoes?: string;
  mainFeatures?: string[];
  myContribution?: string[];
  contributionSummary?: string;
  shapeClass?: string;
  problem?: string;
  approach?: string;
  developmentChallenges?: string;
  solution?: string;
  whatILearned?: string;
}

export interface SkillCategory {
  title: string;
  items: { name: string; tag?: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  yearStatus: string;
  score: string;
  details?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  dateVerified?: string;
  scoreCredits?: string;
  status: string;
  credentialUrl?: string;
}

export const portfolioData = {
  profile: {
    name: "Raunak Kumar",
    shortName: "Raunak",
    eyebrow: "Hi, I'm Raunak Kumar.",
    headline: "Full-Stack Developer building real-world web applications with AI.",
    supportingText:
      "I build practical web applications that solve real problems, combining modern web technologies, backend development, databases, and AI.",
    personalStatement: "Learn. Build. Deploy. Improve.",
    tagline: "Better Tools. Bigger Dreams.",
    phone: "+91 8797407497",
    email: "raunakkchy@gmail.com",
    location: "Patna, Bihar, India",
    institute: "Netaji Subhas Institute of Polytechnic, Bihta",
    degree: "Diploma in Computer Science & Engineering (CSE)",
    semesterStatus: "5th Semester / 3rd Year",
    cgpa: "8.5 / 10",
    photoUrl: "https://cdn.phototourl.com/member/2026-09-26-03c636ff-811c-41ac-9cff-baf0618d7746.png",
    socials: {
      github: "https://github.com/raunakkchy",
      linkedin: "https://linkedin.com",
      email: "mailto:raunakkchy@gmail.com",
      phone: "tel:+918797407497",
      x: "https://x.com",
      instagram: "https://www.instagram.com/raunakkchy?stkn=MXdoZ2JxZWEwY3llZQ==",
    },
  },

  about: {
    heading: "About Me",
    text: "I'm a Diploma Computer Science Engineering student focused on web development, software development, and AI-powered applications. I enjoy turning ideas into working products and learning new technologies through hands-on projects.",
    highlights: [
      { label: "Academic Standing", value: "Diploma CSE · NSIP Bihta (CGPA 8.5 / 10)" },
      { label: "Current Status", value: "5th Semester / 3rd Year" },
      { label: "Core Focus", value: "Web Dev · Full-Stack · AI Applications" },
      { label: "Location", value: "Patna, Bihar, India" },
    ],
  },

  howIBuild: [
    {
      step: "Step 01",
      title: "Understand",
      description: "Understand the problem before writing code.",
    },
    {
      step: "Step 02",
      title: "Build",
      description: "Turn the idea into a working product.",
    },
    {
      step: "Step 03",
      title: "Test",
      description: "Find bugs, edge cases and usability problems.",
    },
    {
      step: "Step 04",
      title: "Improve",
      description: "Keep refining the product based on what I learn.",
    },
  ],

  skillCategories: [
    {
      title: "Programming Languages",
      items: [
        { name: "Python", tag: "Used in Projects" },
        { name: "Java", tag: "Used in Projects" },
        { name: "C", tag: "Used in Projects" },
        { name: "JavaScript", tag: "Used in Projects" },
      ],
    },
    {
      title: "Web Technologies",
      items: [
        { name: "HTML5", tag: "Used in Projects" },
        { name: "CSS3", tag: "Used in Projects" },
        { name: "React.js", tag: "Used in Projects" },
        { name: "Tailwind CSS", tag: "Used in Projects" },
        { name: "TypeScript", tag: "Used in Projects" },
        { name: "Vite", tag: "Used in Projects" },
      ],
    },
    {
      title: "Backend Development",
      items: [
        { name: "Node.js", tag: "Used in Projects" },
        { name: "Express.js", tag: "Used in Projects" },
        { name: "REST APIs", tag: "Used in Projects" },
      ],
    },
    {
      title: "Databases",
      items: [
        { name: "SQL", tag: "Used in Projects" },
        { name: "MongoDB", tag: "Used in Projects" },
      ],
    },
    {
      title: "Tools & AI",
      items: [
        { name: "GitHub", tag: "Used in Projects" },
        { name: "Visual Studio Code", tag: "Used in Projects" },
        { name: "MS Office", tag: "Tools" },
        { name: "Gemini API", tag: "Used in Projects" },
      ],
    },
  ] as SkillCategory[],

  experience: [
    {
      role: "Web Development Intern",
      organization: "NIELIT Patna",
      status: "Completed Internship",
      description:
        "Completed a Web Development internship at NIELIT Patna with practical exposure to web development and project-based learning.",
    },
  ],

  educationTimeline: [
    {
      degree: "Diploma in Computer Science Engineering (CSE)",
      institution: "Netaji Subhas Institute of Polytechnic, Bihta",
      yearStatus: "5th Semester / 3rd Year",
      score: "CGPA: 8.5 / 10",
      details: "Focusing on core CSE fundamentals, web development, software engineering, and database systems.",
    },
    {
      degree: "Intermediate (12th Grade)",
      institution: "RB College, Dalsinghsarai",
      yearStatus: "Completed",
      score: "Score: 57%",
      details: "Higher Secondary Education under Bihar School Examination Board.",
    },
    {
      degree: "Matriculation (10th Grade)",
      institution: "+2 Sarvodaya High School, Chand Chaur, Mathurapur",
      yearStatus: "Completed",
      score: "Score: 60%",
      details: "Secondary School Examination under Bihar School Examination Board.",
    },
  ] as EducationItem[],

  certifications: [
    {
      id: "iitb-python",
      title: "Python 3.4.3 Training",
      issuer: "Spoken Tutorial / EduPyramids / SINE, IIT Bombay",
      dateVerified: "24 February 2026",
      scoreCredits: "Score: 75.00% · Credits: 4",
      status: "Verified Certificate",
    },
    {
      id: "cisco-cpp",
      title: "C++ Essentials 1",
      issuer: "Cisco Networking Academy (offered through NSIP Bihta)",
      dateVerified: "17 March 2025",
      scoreCredits: "Official Course Certificate",
      status: "Verified Certificate",
    },
    {
      id: "web-dev-cert",
      title: "Web Development Certification",
      issuer: "NIELIT Patna / Spoken Tutorial Program",
      status: "Verified Program",
    },
    {
      id: "ai-ml-fundamentals",
      title: "AI & Machine Learning Fundamentals",
      issuer: "Self-Guided & Project Application",
      status: "Verified Skill",
    },
    {
      id: "python-essentials",
      title: "Python Essentials",
      issuer: "Spoken Tutorial Certification Program",
      status: "Verified Certificate",
    },
  ] as CertificationItem[],

  achievements: [
    "Maintained an academic CGPA of 8.5 / 10 in Diploma Computer Science Engineering.",
    "Built and deployed full-stack and AI-powered web applications from scratch.",
    "Completed technical certification programs from IIT Bombay (Spoken Tutorial) and Cisco Networking Academy.",
    "Completed a practical Web Development internship at NIELIT Patna.",
  ],

  technicalJourney: [
    { stage: "01", name: "Programming Fundamentals", desc: "Started with C, Java, and Python problem solving." },
    { stage: "02", name: "Web Development Basics", desc: "Mastered semantic HTML5, CSS3 layouts, and vanilla JS." },
    { stage: "03", name: "Frontend Development", desc: "Built interactive web UIs using React.js, Tailwind CSS & Vite." },
    { stage: "04", name: "Backend Development", desc: "Designed RESTful APIs using Node.js and Express.js." },
    { stage: "05", name: "Database Systems", desc: "Structured relational (SQL) and document (MongoDB) databases." },
    { stage: "06", name: "AI Integration", desc: "Integrated Google Gemini AI for smart recommendations and Q&A." },
    { stage: "07", name: "Full-Stack Applications", desc: "Combined frontend, backend, database, and AI into cohesive systems." },
    { stage: "08", name: "Real-World Deployment", desc: "Deployed live products on Vercel and Render for actual use." },
  ],

  currentlyLearning: [
    "C++ & Data Structures",
    "Advanced Full-Stack Engineering",
    "AI Application Architecture",
    "Advanced Database Concepts",
    "Modern Web Technologies",
  ],

  projects: [
    {
      id: "placement-os",
      number: "01",
      title: "Placement OS",
      subtitle: "Your Operating System for Career Readiness",
      category: "AI Career Platform",
      description:
        "An AI-powered career readiness platform designed to help college students understand suitable job roles, identify skill gaps, follow personalized learning roadmaps, and prepare through AI-powered mock interviews.",
      technologies: ["React", "Vite", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Gemini API"],
      liveDemoUrl: "https://placement-os-g8m3.onrender.com",
      githubUrl: "https://github.com/raunakkchy",
      shapeClass: "droplet-shape-card-1",
      whatItDoes:
        "The platform analyzes the student's academic background, branch, skills, and resume. Based on this, Gemini AI recommends suitable job roles, identifies live skill gaps, generates adaptive learning roadmaps, and conducts interactive mock interviews with actionable scoring.",
      mainFeatures: [
        "AI Job Role Recommendation",
        "AI Skill Gap Analysis",
        "Personalized Learning Roadmap",
        "Real-Time AI Mock Interview",
        "Adaptive Roadmap Updates",
        "Progress Dashboard",
      ],
      problem: "College students often struggle to identify exact industry skill gaps and lack accessible tools for real-time mock interview practice.",
      approach: "Engineered a unified student journey combining a multi-step onboarding flow, automated skill evaluation, dynamic roadmap updates, and Gemini AI-driven mock interviews.",
      developmentChallenges: "Structuring clean prompt contexts for Gemini AI to deliver consistent, structured evaluation criteria without hallucinated scores.",
      solution: "Created strict server-side JSON schema response constraints for Gemini AI and integrated a robust MongoDB data persistence layer.",
      whatILearned: "Deepened my knowledge in server-side AI integration, state management in React, MongoDB schema design, and full-stack deployment on Render.",
      myContribution: [
        "Designed and developed Placement OS as a full-stack product from scratch, handling UI/UX, frontend, backend APIs, database models, and Gemini AI integrations.",
      ],
      contributionSummary:
        "Handled architecture, frontend, backend, database, Gemini AI integration, UI/UX, and cloud deployment.",
    },
    {
      id: "college-complaint-portal",
      number: "02",
      title: "College Complaint Portal",
      subtitle: "Online Complaint Management System",
      category: "Full Stack Portal",
      description:
        "A full-stack web application for submitting, managing, and tracking college complaints digitally for students and administrators.",
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      liveDemoUrl: "https://github.com/raunakkchy",
      githubUrl: "https://github.com/raunakkchy",
      shapeClass: "droplet-shape-card-2",
      whatItDoes:
        "Digital complaint submission and tracking system for students with real-time status updates, admin resolution portal, category tags, and photo attachment previews.",
      mainFeatures: [
        "Student Complaint Submission",
        "Category & Priority Tagging",
        "Photo Upload & Attachment Preview",
        "Admin Portal & Resolution Workflow",
        "Real-Time Status Tracking",
        "Responsive Student Dashboard",
      ],
      problem: "Paper-based complaint forms in college campuses lead to delayed resolutions, misplaced complaints, and lack of tracking transparency.",
      approach: "Built a digitized complaint lifecycle from student submission through admin review and resolution status updating.",
      developmentChallenges: "Managing image attachment previews and role-based views for students vs administrators.",
      solution: "Implemented secure backend REST endpoints and responsive status badges.",
      whatILearned: "Gained full-stack experience in RESTful architecture, complaint management workflows, and MongoDB queries.",
      myContribution: [
        "Developed full-stack complaint portal with student reporting, admin review dashboard, and status updates.",
      ],
      contributionSummary:
        "Handled frontend UI, Express API routes, status workflows, and database integration.",
    },
    {
      id: "simple-hisaab",
      number: "03",
      title: "Simple Hisaab",
      subtitle: "Digital Lending & Interest Management",
      category: "Finance Utility",
      description:
        "A web application designed to replace manual notebooks for tracking money lent to multiple people, interest rates, due dates and payment status.",
      technologies: ["React", "Node.js", "Express.js", "MongoDB"],
      liveDemoUrl: "https://digital-hisaab.vercel.app/",
      githubUrl: "https://github.com/raunakkchy",
      shapeClass: "droplet-shape-card-3",
      whatItDoes:
        "Replaces messy manual paper diaries with a secure digital ledger. Users manage debtors, track principal amounts, automate monthly interest calculations, monitor due dates and payment statuses, and export clean reports.",
      mainFeatures: [
        "Person Management",
        "Principal Amount Tracking",
        "Interest Rate Tracking",
        "Due Date Tracking",
        "Total Amount Calculation",
        "Paid / Pending Settlement Status",
        "Partial Payment Support",
        "CSV & PDF Export Support",
        "Cloud-Based Account Access",
      ],
      problem: "Manual paper diaries for lending tracking are prone to math errors, misplaced notes, lost payment dates, and difficulty computing monthly interest.",
      approach: "Built a structured financial calculation engine linked to MongoDB persistence with clean PDF/CSV export routines.",
      developmentChallenges: "Ensuring exact interest computation for varied time intervals and partial settlements.",
      solution: "Implemented authoritatively calculated backend financial functions with real-time UI previews.",
      whatILearned: "Mastered tabular financial UIs, client/server calculations, export generators, and cloud database queries.",
      myContribution: [
        "Designed and developed Simple Hisaab to solve personal lending tracking issues, building the full interface, ledger logic, authentication, and report exports.",
      ],
      contributionSummary:
        "Handled concept, UI/UX, frontend, backend logic, calculations, database, and Vercel deployment.",
    },
    {
      id: "nsit-ai-chatbot",
      number: "04",
      title: "NSIT AI Chatbot",
      subtitle: "AI Assistant for College Students",
      category: "AI College Assistant",
      description:
        "An AI-powered college assistant that allows students to ask questions in natural language and receive college-related information through a conversational interface.",
      technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Gemini API"],
      liveDemoUrl: "https://nsit-ai-chatbot.vercel.app/",
      githubUrl: "https://github.com/raunakkchy",
      shapeClass: "droplet-shape-card-1",
      whatItDoes:
        "Allows college students to ask everyday questions in plain language regarding exam dates, syllabus, practical schedules, and department notices without hunting through clunky portals.",
      mainFeatures: [
        "AI-Powered Chat Interface",
        "Natural-Language Question Answering",
        "Conversational Student Responses",
        "College Information Retrieval",
        "Lightweight, Responsive Experience",
      ],
      problem: "Students frequently miss crucial academic notices or syllabus details buried deep inside scattered web portals.",
      approach: "Created a conversational AI widget grounded in college information prompts.",
      developmentChallenges: "Handling API token latency gracefully to keep chat interactions snappy and fluid.",
      solution: "Optimized frontend async fetch cycles and designed clean typing indicators.",
      whatILearned: "Gained early hands-on experience with Gemini API integration, prompt engineering, and vanilla JS DOM performance.",
      myContribution: [
        "Designed and developed the NSIT AI Chatbot, creating the UI, conversational flow, Gemini API integration, and responsive layout.",
      ],
      contributionSummary:
        "Handled concept, UI/UX, frontend development, chatbot logic, Gemini API integration, and deployment.",
    },
  ] as ProjectItem[],
};
