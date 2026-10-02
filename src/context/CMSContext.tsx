import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CMSData,
  ProjectItem,
  SkillItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  AchievementItem,
  ProfileData,
  AboutData,
} from '../types/cms';
import { CMSService, getInitialCMSData } from '../services/cmsService';

interface CMSContextType {
  data: CMSData;
  isLoading: boolean;
  isAuthenticated: boolean;
  toastMessage: { type: 'success' | 'error'; text: string } | null;
  showToast: (type: 'success' | 'error', text: string) => void;
  clearToast: () => void;
  login: (u: string, p: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  saveDataToStorage: (newData: CMSData) => Promise<boolean>;

  // CRUD Operations
  updateProfile: (profile: ProfileData) => Promise<boolean>;
  updateAbout: (about: AboutData) => Promise<boolean>;
  
  // Projects
  addProject: (proj: Omit<ProjectItem, 'id' | 'number'>) => Promise<boolean>;
  updateProject: (proj: ProjectItem) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  togglePublishProject: (id: string) => Promise<boolean>;

  // Skills
  addSkill: (skill: Omit<SkillItem, 'id'>) => Promise<boolean>;
  updateSkill: (skill: SkillItem) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;

  // Experience
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => Promise<boolean>;
  updateExperience: (exp: ExperienceItem) => Promise<boolean>;
  deleteExperience: (id: string) => Promise<boolean>;

  // Education
  addEducation: (edu: Omit<EducationItem, 'id'>) => Promise<boolean>;
  updateEducation: (edu: EducationItem) => Promise<boolean>;
  deleteEducation: (id: string) => Promise<boolean>;

  // Certifications
  addCertification: (cert: Omit<CertificationItem, 'id'>) => Promise<boolean>;
  updateCertification: (cert: CertificationItem) => Promise<boolean>;
  deleteCertification: (id: string) => Promise<boolean>;

  // Achievements
  addAchievement: (ach: Omit<AchievementItem, 'id'>) => Promise<boolean>;
  updateAchievement: (ach: AchievementItem) => Promise<boolean>;
  deleteAchievement: (id: string) => Promise<boolean>;

  // Socials
  updateSocials: (socials: ProfileData['socials']) => Promise<boolean>;

  // Resume
  updateResume: (resumeUrl: string, fileName?: string) => Promise<boolean>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>(getInitialCMSData());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(CMSService.isAuthenticated());
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const clearToast = () => setToastMessage(null);

  useEffect(() => {
    async function initData() {
      setIsLoading(true);
      const loaded = await CMSService.loadData();
      setData(loaded);
      setIsLoading(false);
    }
    initData();
  }, []);

  const login = async (u: string, p: string) => {
    const result = await CMSService.login(u, p);
    if (result.success) {
      setIsAuthenticated(true);
      showToast('success', 'Admin login successful!');
    } else {
      showToast('error', result.message || 'Login failed');
    }
    return result;
  };

  const logout = () => {
    CMSService.logout();
    setIsAuthenticated(false);
    showToast('success', 'Logged out successfully');
  };

  const saveDataToStorage = async (newData: CMSData): Promise<boolean> => {
    setData(newData);
    const success = await CMSService.saveData(newData);
    return success;
  };

  // Profile & About
  const updateProfile = async (profile: ProfileData) => {
    const newData = { ...data, profile };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', 'Profile updated successfully!');
    return ok;
  };

  const updateAbout = async (about: AboutData) => {
    const newData = { ...data, about };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', 'About Section updated successfully!');
    return ok;
  };

  // Projects CRUD
  const addProject = async (proj: Omit<ProjectItem, 'id' | 'number'>) => {
    const newNum = String(data.projects.length + 1).padStart(2, '0');
    const newId = `project-${Date.now()}`;
    const newProject: ProjectItem = {
      ...proj,
      id: newId,
      number: newNum,
      published: proj.published !== undefined ? proj.published : true,
    };
    const newData = { ...data, projects: [newProject, ...data.projects] };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', `Project "${newProject.title}" added successfully!`);
    return ok;
  };

  const updateProject = async (proj: ProjectItem) => {
    const updatedProjects = data.projects.map((p) => (p.id === proj.id ? proj : p));
    const newData = { ...data, projects: updatedProjects };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', `Project "${proj.title}" updated successfully!`);
    return ok;
  };

  const deleteProject = async (id: string) => {
    const projToDelete = data.projects.find((p) => p.id === id);
    const updatedProjects = data.projects.filter((p) => p.id !== id);
    const newData = { ...data, projects: updatedProjects };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', `Project "${projToDelete?.title || id}" deleted.`);
    return ok;
  };

  const togglePublishProject = async (id: string) => {
    const updatedProjects = data.projects.map((p) =>
      p.id === id ? { ...p, published: !p.published } : p
    );
    const proj = updatedProjects.find((p) => p.id === id);
    const newData = { ...data, projects: updatedProjects };
    const ok = await saveDataToStorage(newData);
    if (ok) {
      showToast(
        'success',
        `Project "${proj?.title}" is now ${proj?.published ? 'Published' : 'Draft'}`
      );
    }
    return ok;
  };

  // Skills CRUD
  const addSkill = async (skill: Omit<SkillItem, 'id'>) => {
    const newId = `skill-${Date.now()}`;
    const newSkill: SkillItem = { ...skill, id: newId };
    const updatedSkills = [...data.skills, newSkill];

    // Also update skillCategories
    const existingCat = data.skillCategories.find((c) => c.title === skill.category);
    let updatedCats = [...data.skillCategories];
    if (existingCat) {
      updatedCats = updatedCats.map((c) =>
        c.title === skill.category
          ? { ...c, items: [...c.items, { name: skill.name, tag: skill.tag, id: newId }] }
          : c
      );
    } else {
      updatedCats.push({
        title: skill.category,
        items: [{ name: skill.name, tag: skill.tag, id: newId }],
      });
    }

    const newData = { ...data, skills: updatedSkills, skillCategories: updatedCats };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', `Skill "${skill.name}" added to ${skill.category}!`);
    return ok;
  };

  const updateSkill = async (skill: SkillItem) => {
    const updatedSkills = data.skills.map((s) => (s.id === skill.id ? skill : s));

    // Rebuild categories
    const catMap: Record<string, { name: string; tag?: string; id?: string }[]> = {};
    updatedSkills.forEach((s) => {
      if (!catMap[s.category]) catMap[s.category] = [];
      catMap[s.category].push({ name: s.name, tag: s.tag, id: s.id });
    });

    const updatedCats = Object.keys(catMap).map((title) => ({
      title,
      items: catMap[title],
    }));

    const newData = { ...data, skills: updatedSkills, skillCategories: updatedCats };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', `Skill "${skill.name}" updated!`);
    return ok;
  };

  const deleteSkill = async (id: string) => {
    const skillToDelete = data.skills.find((s) => s.id === id);
    const updatedSkills = data.skills.filter((s) => s.id !== id);

    const catMap: Record<string, { name: string; tag?: string; id?: string }[]> = {};
    updatedSkills.forEach((s) => {
      if (!catMap[s.category]) catMap[s.category] = [];
      catMap[s.category].push({ name: s.name, tag: s.tag, id: s.id });
    });

    const updatedCats = Object.keys(catMap).map((title) => ({
      title,
      items: catMap[title],
    }));

    const newData = { ...data, skills: updatedSkills, skillCategories: updatedCats };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', `Skill "${skillToDelete?.name || id}" removed.`);
    return ok;
  };

  // Experience CRUD
  const addExperience = async (exp: Omit<ExperienceItem, 'id'>) => {
    const newId = `exp-${Date.now()}`;
    const newExp: ExperienceItem = { ...exp, id: newId, published: exp.published ?? true };
    const newData = { ...data, experience: [newExp, ...data.experience] };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', `Experience entry "${exp.role}" added!`);
    return ok;
  };

  const updateExperience = async (exp: ExperienceItem) => {
    const updatedExp = data.experience.map((e) => (e.id === exp.id ? exp : e));
    const newData = { ...data, experience: updatedExp };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', `Experience entry "${exp.role}" updated!`);
    return ok;
  };

  const deleteExperience = async (id: string) => {
    const updatedExp = data.experience.filter((e) => e.id !== id);
    const newData = { ...data, experience: updatedExp };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', 'Experience entry removed.');
    return ok;
  };

  // Education CRUD
  const addEducation = async (edu: Omit<EducationItem, 'id'>) => {
    const newId = `edu-${Date.now()}`;
    const newEdu: EducationItem = { ...edu, id: newId };
    const newData = { ...data, educationTimeline: [...data.educationTimeline, newEdu] };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', `Education entry "${edu.degree}" added!`);
    return ok;
  };

  const updateEducation = async (edu: EducationItem) => {
    const updatedEdu = data.educationTimeline.map((e) => (e.id === edu.id ? edu : e));
    const newData = { ...data, educationTimeline: updatedEdu };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', `Education entry "${edu.degree}" updated!`);
    return ok;
  };

  const deleteEducation = async (id: string) => {
    const updatedEdu = data.educationTimeline.filter((e) => e.id !== id);
    const newData = { ...data, educationTimeline: updatedEdu };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', 'Education entry removed.');
    return ok;
  };

  // Certifications CRUD
  const addCertification = async (cert: Omit<CertificationItem, 'id'>) => {
    const newId = `cert-${Date.now()}`;
    const newCert: CertificationItem = { ...cert, id: newId, published: cert.published ?? true };
    const newData = { ...data, certifications: [newCert, ...data.certifications] };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', `Certification "${cert.title}" added!`);
    return ok;
  };

  const updateCertification = async (cert: CertificationItem) => {
    const updatedCerts = data.certifications.map((c) => (c.id === cert.id ? cert : c));
    const newData = { ...data, certifications: updatedCerts };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', `Certification "${cert.title}" updated!`);
    return ok;
  };

  const deleteCertification = async (id: string) => {
    const updatedCerts = data.certifications.filter((c) => c.id !== id);
    const newData = { ...data, certifications: updatedCerts };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', 'Certification removed.');
    return ok;
  };

  // Achievements CRUD
  const addAchievement = async (ach: Omit<AchievementItem, 'id'>) => {
    const newId = `ach-${Date.now()}`;
    const newAch: AchievementItem = { ...ach, id: newId, published: ach.published ?? true };
    const newData = { ...data, achievements: [newAch, ...data.achievements] };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', 'Achievement added!');
    return ok;
  };

  const updateAchievement = async (ach: AchievementItem) => {
    const updatedAchs = data.achievements.map((a) => (a.id === ach.id ? ach : a));
    const newData = { ...data, achievements: updatedAchs };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', 'Achievement updated!');
    return ok;
  };

  const deleteAchievement = async (id: string) => {
    const updatedAchs = data.achievements.filter((a) => a.id !== id);
    const newData = { ...data, achievements: updatedAchs };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', 'Achievement removed.');
    return ok;
  };

  // Socials
  const updateSocials = async (socials: ProfileData['socials']) => {
    const newData = {
      ...data,
      profile: {
        ...data.profile,
        socials,
      },
    };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', 'Social links updated successfully!');
    return ok;
  };

  // Resume
  const updateResume = async (resumeUrl: string, fileName?: string) => {
    const newData = {
      ...data,
      profile: {
        ...data.profile,
        resumeUrl,
        resumeFileName: fileName || data.profile.resumeFileName || 'Resume.pdf',
      },
    };
    const ok = await saveDataToStorage(newData);
    if (ok) showToast('success', 'Resume configuration updated!');
    return ok;
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        isLoading,
        isAuthenticated,
        toastMessage,
        showToast,
        clearToast,
        login,
        logout,
        saveDataToStorage,
        updateProfile,
        updateAbout,
        addProject,
        updateProject,
        deleteProject,
        togglePublishProject,
        addSkill,
        updateSkill,
        deleteSkill,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addCertification,
        updateCertification,
        deleteCertification,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        updateSocials,
        updateResume,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
