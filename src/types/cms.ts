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
  featured?: boolean;
  published?: boolean;
  year?: string;
  imageUrl?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  tag?: string;
  category: string;
  level?: string;
  order?: number;
}

export interface SkillCategory {
  title: string;
  items: { name: string; tag?: string; id?: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  status: string;
  startDate?: string;
  endDate?: string;
  description: string;
  responsibilities?: string[];
  technologies?: string[];
  certificateUrl?: string;
  published?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  yearStatus: string;
  score: string;
  details?: string;
  startYear?: string;
  endYear?: string;
  cgpaPercentage?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  dateVerified?: string;
  scoreCredits?: string;
  status: string;
  credentialUrl?: string;
  imageUrl?: string;
  published?: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  date?: string;
  description: string;
  link?: string;
  published?: boolean;
}

export interface ProfileData {
  name: string;
  shortName: string;
  eyebrow: string;
  headline: string;
  supportingText: string;
  personalStatement: string;
  tagline: string;
  phone: string;
  email: string;
  location: string;
  institute: string;
  degree: string;
  semesterStatus: string;
  cgpa: string;
  photoUrl: string;
  resumeUrl?: string;
  resumeFileName?: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    phone: string;
    x: string;
    instagram: string;
  };
}

export interface AboutData {
  heading: string;
  text: string;
  careerGoal?: string;
  currentFocus?: string;
  developerJourney?: string;
  highlights: { label: string; value: string }[];
}

export interface HowIBuildItem {
  step: string;
  title: string;
  description: string;
}

export interface CMSData {
  profile: ProfileData;
  about: AboutData;
  howIBuild: HowIBuildItem[];
  skills: SkillItem[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  educationTimeline: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  technicalJourney: { stage: string; name: string; desc: string }[];
  currentlyLearning: string[];
  projects: ProjectItem[];
}
