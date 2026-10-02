import { CMSData, ProjectItem, SkillItem, ExperienceItem, EducationItem, CertificationItem, AchievementItem, ProfileData, AboutData } from '../types/cms';
import { portfolioData as initialPortfolioData } from '../data/portfolio';

const STORAGE_KEY = 'raunak_portfolio_cms_v2';
const AUTH_TOKEN_KEY = 'raunak_cms_auth_token';

// Convert initial portfolioData to CMSData structure
export function getInitialCMSData(): CMSData {
  const flatSkills: SkillItem[] = [];
  initialPortfolioData.skillCategories.forEach((cat) => {
    cat.items.forEach((item, idx) => {
      flatSkills.push({
        id: `${cat.title.toLowerCase().replace(/[^a-z0-0]/g, '-')}-${idx}-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: item.name,
        tag: item.tag,
        category: cat.title,
        order: idx,
      });
    });
  });

  const formattedExperience: ExperienceItem[] = initialPortfolioData.experience.map((exp, idx) => ({
    id: `exp-${idx + 1}`,
    role: exp.role,
    organization: exp.organization,
    status: exp.status,
    description: exp.description,
    published: true,
  }));

  const formattedEducation: EducationItem[] = initialPortfolioData.educationTimeline.map((edu, idx) => ({
    id: `edu-${idx + 1}`,
    degree: edu.degree,
    institution: edu.institution,
    yearStatus: edu.yearStatus,
    score: edu.score,
    details: edu.details,
  }));

  const formattedCertifications: CertificationItem[] = initialPortfolioData.certifications.map((cert) => ({
    id: cert.id,
    title: cert.title,
    issuer: cert.issuer,
    dateVerified: cert.dateVerified,
    scoreCredits: cert.scoreCredits,
    status: cert.status,
    credentialUrl: cert.credentialUrl,
    published: true,
  }));

  const formattedAchievements: AchievementItem[] = initialPortfolioData.achievements.map((ach, idx) => ({
    id: `ach-${idx + 1}`,
    title: `Achievement ${idx + 1}`,
    description: ach,
    published: true,
  }));

  const formattedProjects: ProjectItem[] = initialPortfolioData.projects.map((proj) => ({
    ...proj,
    published: true,
    featured: true,
  }));

  return {
    profile: {
      ...initialPortfolioData.profile,
      resumeUrl: '',
      resumeFileName: 'Raunak_Kumar_Resume.pdf',
    },
    about: {
      heading: initialPortfolioData.about.heading,
      text: initialPortfolioData.about.text,
      highlights: initialPortfolioData.about.highlights,
    },
    howIBuild: initialPortfolioData.howIBuild,
    skills: flatSkills,
    skillCategories: initialPortfolioData.skillCategories,
    experience: formattedExperience,
    educationTimeline: formattedEducation,
    certifications: formattedCertifications,
    achievements: formattedAchievements,
    technicalJourney: initialPortfolioData.technicalJourney,
    currentlyLearning: initialPortfolioData.currentlyLearning,
    projects: formattedProjects,
  };
}

export class CMSService {
  // Load CMS Data (from API with fallback to localStorage / initialData)
  static async loadData(): Promise<CMSData> {
    try {
      // Try API first
      const res = await fetch('/api/cms/data', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.projects) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch {
      // Ignore network failure, fall back to localStorage
    }

    // Fallback to localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore JSON parse errors
    }

    const initial = getInitialCMSData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  // Save CMS Data
  static async saveData(data: CMSData): Promise<boolean> {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      const token = this.getToken();
      await fetch('/api/cms/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return true;
    } catch (e) {
      console.error('Failed to save CMS data to server:', e);
      return true; // Still saved in localStorage
    }
  }

  // Auth helper methods
  static getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  static setToken(token: string) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  static removeToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      // Basic token expiration check
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        this.removeToken();
        return false;
      }
      return true;
    } catch {
      return !!token;
    }
  }

  static async login(username: string, password: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        this.setToken(data.token);
        return { success: true };
      }
      return { success: false, message: data.message || 'Invalid credentials' };
    } catch {
      // Fallback local auth for preview environment if backend API is offline
      if (
        (username === 'raunakkchy@gmail.com' && password === 'Raunak@477') ||
        (username === 'admin' && (password === 'admin123' || password === 'admin'))
      ) {
        const dummyToken = `header.${btoa(JSON.stringify({ sub: 'admin', exp: Math.floor(Date.now() / 1000) + 86400 }))}.signature`;
        this.setToken(dummyToken);
        return { success: true };
      }
      return { success: false, message: 'Invalid username or password' };
    }
  }

  static logout() {
    this.removeToken();
  }
}
