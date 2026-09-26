export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  whatItDoes: string;
  mainFeatures: string[];
  technologies: string[];
  techStackDetails: {
    frontend?: string;
    backend?: string;
    database?: string;
    ai?: string;
    other?: string;
  };
  whyIBuiltIt: string;
  liveDemoUrl: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; icon?: string }[];
}

export const portfolioData = {
  profile: {
    name: "Raunak Kumar",
    firstName: "Raunak",
    lastName: "Kumar",
    eyebrow: "HELLO, I'M",
    subtitle: "Full Stack Developer | CSE Student",
    description:
      "I build modern web applications, explore new technologies and turn ideas into practical digital products.",
    email: "raunak2006@gmail.com",
    location: "Bihta, Bihar",
    country: "India",
    institute: "Netaji Subhas Institute of Polytechnic, Bihta",
    instituteShort: "NSIP Bihta",
    degree: "Diploma in CSE",
    fullDegree: "Diploma in Computer Science & Engineering",
    cgpa: "8.5",
    focus: "Web Development",
    photoUrl: "https://cdn.phototourl.com/member/2026-09-26-03c636ff-811c-41ac-9cff-baf0618d7746.png",
    socials: {
      github: "https://github.com/raunakkchy",
      linkedin: "https://linkedin.com",
      instagram: "https://www.instagram.com/raunakkchy?stkn=MXdoZ2JxZWEwY3llZQ==",
    },
  },

  about: {
    number: "01",
    heading: "About Me",
    bio: "I'm a developer who enjoys creating useful products and learning how technology works under the hood. I like taking an idea from a rough concept to a real, usable application.",
    metadata: [
      { label: "Location", value: "Bihta, Bihar", icon: "map-pin" },
      { label: "Education", value: "Diploma CSE", icon: "graduation-cap" },
      { label: "Focus", value: "Web Development", icon: "code" },
    ],
  },

  skillCategories: [
    {
      title: "Languages",
      skills: [
        { name: "Python" },
        { name: "Java" },
        { name: "C" },
        { name: "JavaScript" },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "React" },
      ],
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "Node.js" },
        { name: "Express.js" },
        { name: "MongoDB" },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "GitHub" },
        { name: "VS Code" },
        { name: "MS Office" },
      ],
    },
  ] as SkillCategory[],

  projectsIntro:
    "I like building projects that solve real problems instead of making projects just for the sake of adding them to my portfolio. These three projects are some of the products I have worked on from idea to a working application.",

  projectsReflection: {
    heading: "What These Projects Say About Me",
    points: [
      {
        project: "NSIT AI Chatbot",
        takeaway: "helped me explore AI-powered applications and conversational UI integration.",
      },
      {
        project: "Simple Hisaab",
        takeaway: "helped me work on a practical utility focused on real-world data and calculations.",
      },
      {
        project: "Placement OS",
        takeaway: "brought together my experience with frontend development, backend development, databases and AI into a larger full-stack product.",
      },
    ],
    closing:
      "My goal is to keep building projects where technology is not just used for demonstration, but actually solves a problem for someone.",
  },

  projects: [
    {
      id: "placement-os",
      number: "01",
      title: "Placement OS",
      tagline: "Your Operating System for Career Readiness",
      category: "AI Career Platform",
      description:
        "Placement OS is an AI-powered career preparation platform that I built to help college students understand where they currently stand and what they should do next to become job-ready.",
      whatItDoes:
        "The platform starts by understanding the student's academic background, branch, skills, skill levels and optional resume. Based on this information, the AI recommends suitable job roles instead of asking the student to manually choose a target role. After the student selects a role, Placement OS analyzes the difference between the student's current skills and the skills required for that role, creating a personalized roadmap. It also includes an AI-powered mock interview experience with scores, detailed feedback, and adaptive roadmaps.",
      mainFeatures: [
        "AI Job Role Recommendation",
        "AI Skill Gap Analysis",
        "Personalized Learning Roadmap",
        "AI Mock Interviews",
        "Interview Feedback",
        "Adaptive Roadmap",
        "Progress Dashboard",
        "Student Profile Management",
        "Resume-based profile analysis",
        "Learning resources",
      ],
      technologies: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Google Gemini API"],
      techStackDetails: {
        frontend: "React, Vite, TypeScript, Tailwind CSS",
        backend: "Node.js, Express.js, TypeScript",
        database: "MongoDB, Mongoose",
        ai: "Google Gemini API",
        other: "React Router, TanStack Query, Recharts, Lucide Icons",
      },
      whyIBuiltIt:
        "I wanted to build something that could actually be useful for students rather than another basic CRUD project. Placement OS combines the things I have been learning — frontend development, backend development, databases and AI — into one complete product.",
      liveDemoUrl: "https://placement-os-g8m3.onrender.com",
    },
    {
      id: "simple-hisaab",
      number: "02",
      title: "Simple Hisaab",
      tagline: "A Simple Way to Manage Lending and Interest",
      category: "Finance Utility",
      description:
        "Simple Hisaab is a digital lending and interest management application that I built to make everyday money tracking easier.",
      whatItDoes:
        "The application allows users to maintain records of people they have lent money to and keep important information together in one place. A record can contain details such as the person's name, mobile number, principal amount, interest rate, due date and payment status. The application calculates amounts based on principal and interest, tracks payments, and provides clean CSV and PDF exports.",
      mainFeatures: [
        "Add lending records",
        "Store person's details",
        "Principal amount tracking",
        "Interest rate tracking",
        "Due-date tracking",
        "Interest calculation",
        "Total amount calculation",
        "Paid/Pending status",
        "Payment tracking",
        "Record management",
        "CSV export",
        "PDF export",
      ],
      technologies: ["React", "Node.js", "Express.js", "MongoDB"],
      techStackDetails: {
        frontend: "React",
        backend: "Node.js / Express.js",
        database: "MongoDB",
      },
      whyIBuiltIt:
        "I wanted to build something based on a problem that people actually face in everyday life. The goal was not to make a complicated finance application. I wanted to keep it simple enough that someone could open it, add a person's details and immediately understand their pending amount.",
      liveDemoUrl: "https://digital-hisaab.vercel.app/",
    },
    {
      id: "nsit-ai-chatbot",
      number: "03",
      title: "NSIT AI Chatbot",
      tagline: "An AI Assistant for College Students",
      category: "AI College Assistant",
      description:
        "NSIT AI Chatbot is an AI-powered college assistant designed to make college-related information easier to access.",
      whatItDoes:
        "Students can interact with the chatbot using normal questions. Instead of searching through multiple pages for basic college information, students can simply ask about college-related topics and receive clear, conversational responses instantly.",
      mainFeatures: [
        "AI-powered chat interface",
        "Natural-language questions",
        "Conversational responses",
        "Student-focused experience",
        "College information assistance",
        "Simple and responsive interface",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Google Gemini API"],
      techStackDetails: {
        frontend: "HTML, CSS, JavaScript",
        other: "Tailwind CSS",
        ai: "Google Gemini API",
      },
      whyIBuiltIt:
        "This was one of my projects where I explored how AI could be used to solve a simple but practical problem. Instead of building another generic chatbot, I focused the idea around a college environment and student information. It also helped me understand how an AI API can be connected to a real user interface and turned into an actual usable application.",
      liveDemoUrl: "https://nsit-ai-chatbot.vercel.app/",
    },
  ] as ProjectItem[],
};
