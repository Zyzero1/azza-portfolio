import React, { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import { isSupabaseConfigured, supabase } from './lib/supabase';
import { uploadPortfolioFile, uploadPortfolioImage } from './lib/storage';
import { defaultSkillsData, lookupTechMeta, parseSkillsData } from './data/skillsDefaults';

const defaultAboutBio = 'Informatics Engineering student at Raja Ali Haji Maritime University (UMRAH) specializing in modern software engineering, high-performance web development, and mobile applications. Experienced in architecting end-to-end digital solutions—from responsive user interfaces to integrated backends and maritime AI/Machine Learning data analytics. Dedicated to delivering functional, clean, and user-centric digital experiences.';

const experiencesDefault = [
  {
    id: 1,
    title: 'Frontend & Mobile Developer',
    badge: 'Active',
    period: '2023 - Present',
    company: 'Independent & Project-based Development · Riau Islands, Indonesia',
    description: [
      'Architecting and building responsive mobile applications with Flutter (Dart) and Firebase with efficient state management.',
      'Developing modern high-performance single-page web applications (SPA) using React, Vite, and Tailwind CSS.',
      'Optimizing UI rendering performance, component accessibility, and seamless RESTful API backend integrations.'
    ]
  },
  {
    id: 2,
    title: 'Full-Stack Web Developer (Academic & Port Projects)',
    badge: '',
    period: '2024 - 2025',
    company: 'Maritime Logistics Platform & Smart Portal System',
    description: [
      'Designed relational MySQL database schemas for managing maritime port logistics and vessel schedules.',
      'Engineered backend services with PHP and Laravel handling secure authentication and role-based data distribution.',
      'Applied clean code principles, modular software architecture, and Git/GitHub version control workflows.'
    ]
  }
];

const defaultResearches = [
  {
    id: 1,
    title: 'Maritime Traffic Data Analysis & Prediction',
    badge: 'AI & ML',
    period: '2024 - 2025',
    institution: 'Independent Research in Maritime Informatics · UMRAH',
    description: [
      'Developed predictive models for cargo vessel arrival patterns utilizing Python (Pandas, NumPy, Scikit-Learn).',
      'Conducted data preprocessing, feature engineering, and regression model accuracy evaluations to optimize archipelagic port management.',
      'Visualized historical vessel traffic trends into interactive analytical dashboards for port authorities and operations.'
    ]
  },
  {
    id: 2,
    title: 'Comparative Study on Flutter State Management',
    badge: 'Benchmark',
    period: '2024',
    institution: 'Mobile Architecture & Performance Benchmark',
    description: [
      'Analyzed memory consumption efficiency and widget rendering latencies between Provider, BLoC, and Riverpod.',
      'Formulated scalable architectural guidelines for mid-to-large scale cross-platform mobile app development.'
    ]
  }
];

const defaultEducations = [
  {
    id: 1,
    title: 'Bachelor of Informatics Engineering',
    badge: 'Undergraduate',
    period: '2022 - Present',
    institution: 'Universitas Maritim Raja Ali Haji (UMRAH) · Tanjungpinang, Indonesia',
    description: 'Pursuing an in-depth curriculum in software engineering, data structures & algorithms, relational database systems, object-oriented programming (OOP), artificial intelligence, and applied maritime informatics architecture. Actively honing hands-on engineering skills through university lab projects and independent software initiatives.'
  },
  {
    id: 2,
    title: 'Senior High School (Natural Sciences)',
    badge: 'High School',
    period: '2018 - 2021',
    institution: 'SMAN 04 Karimun · Tanjung Balai Karimun, Indonesia',
    description: 'Focused on Mathematics and Natural Sciences (MIPA), building a solid foundation in analytical thinking, algorithmic problem solving, and student council leadership.'
  }
];

const profileDefault = {
  name: 'Muhammad Azza Al Kausar',
  role: 'Front-End and Back-End Developer',
  tagline: 'Crafting Digital Experiences & Innovative Solutions',
  bio: 'Informatics Engineering student passionate about developing practical software solutions that combine clean design with functional technology.',
  aboutBio: defaultAboutBio,
  availability: 'Available for Work',
  email: 'azza.alkausar@gmail.com',
  linkedin: 'https://www.linkedin.com/in/m-azza-alkausar/',
  cvUrl: '/uploads/img_686a5952b576b.jpg',
  location: 'Tanjung Balai Karimun, Indonesia',
  education: 'Informatics Engineering · UMRAH',
  experience: 'Class Representative Council Chair · SMAN 04 Karimun',
  image: '/uploads/img_686a5952b576b.jpg',
  skills: [['HTML/CSS', 90], ['JavaScript', 80], ['PHP', 80], ['Python', 67], ['Dart', 60], ['C++', 50]],
  tools: ['Git', 'Docker', 'Flutter', 'Figma'],
  softSkills: ['Teamwork', 'Problem solving']
};
const projectsDefault = [
  { id: 1, title: 'QIQO', description: 'Quiz application built for an engaging learning experience with interactive questions and score tracking.', technologies: ['Dart', 'Flutter', 'Firebase'], image: '/uploads/img_686a59896c99a.png', url: 'https://github.com/Zyzero1/quiz-app-flutter' },
  { id: 2, title: 'Platform Logistik Maritim', description: 'Web platform designed for monitoring maritime logistics and cargo distribution across regional ports.', technologies: ['HTML', 'CSS', 'JavaScript'], image: '/uploads/img_685d69b42eef9.png', url: 'https://github.com/Zyzero1/Platform-Logistik-Maritim' },
  { id: 3, title: 'Smart Campus Portal', description: 'Centralized academic portal for university students to track coursework, lab schedules, and announcements.', technologies: ['PHP', 'MySQL', 'Bootstrap'], image: '/uploads/6857d876035dd.png', url: 'https://github.com/Zyzero1' },
  { id: 4, title: 'Sistem Prediksi Data Maritim', description: 'Machine learning data analysis system evaluating port traffic trends and vessel arrival predictability.', technologies: ['Python', 'Pandas', 'Scikit-Learn'], image: '/uploads/6857b80a64b73.png', url: 'https://github.com/Zyzero1' },
  { id: 5, title: 'Interactive Portfolio Web', description: 'High-performance cyberpunk portfolio website with responsive design, glassmorphism, and dynamic animations.', technologies: ['React', 'Vite', 'Tailwind CSS'], image: '/uploads/img_686a59896cbe6.png', url: 'https://github.com/Zyzero1/web-porto-azza-alkausar' },
  { id: 6, title: 'Task & Schedule Planner', description: 'Lightweight mobile application for organizing daily developer sprints, task priorities, and project milestones.', technologies: ['Dart', 'Flutter', 'Hive'], image: '/uploads/img_685a0179bbc9a.png', url: 'https://github.com/Zyzero1' }
];
const articlesDefault = [{ id: 1, title: 'Membangun Pengalaman Digital yang Fungsional', category: 'Development', date: '2025-06-18', excerpt: 'Catatan tentang cara menyatukan desain bersih, performa, dan kebutuhan pengguna.', content: 'Produk yang baik dimulai dari pemahaman masalah. Dari sana, desain dan teknologi bekerja bersama.' }];

function useStored(key, fallback) { const [value, setValue] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } }); useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]); return [value, setValue]; }
function useData() {
  const [profile, setProfile] = useStored('portfolio_profile', profileDefault);
  const [projects, setProjects] = useStored('portfolio_projects', projectsDefault);
  const [articles, setArticles] = useStored('portfolio_articles', articlesDefault);
  const [experiences, setExperiences] = useStored('portfolio_experiences', experiencesDefault);
  const [researches, setResearches] = useStored('portfolio_researches', defaultResearches);
  const [educations, setEducations] = useStored('portfolio_educations', defaultEducations);
  const [skillsData, setSkillsData] = useStored('portfolio_skills_data', defaultSkillsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let active = true;

    Promise.allSettled([
      supabase.from('profiles').select('*').limit(1).maybeSingle(),
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('articles').select('*').eq('published', true).order('date', { ascending: false })
    ])
      .then(([profileResult, projectsResult, articlesResult]) => {
        if (!active) return;

        if (profileResult.status === 'fulfilled' && profileResult.value.data) {
          const p = profileResult.value.data;
          let expFromProfile = null;
          if (p.experience) {
            try {
              const parsed = JSON.parse(p.experience);
              if (Array.isArray(parsed) && parsed.length > 0) expFromProfile = parsed;
            } catch {}
          }
          if (p.education && typeof p.education === 'string' && p.education.startsWith('[')) {
            try {
              const parsedEdu = JSON.parse(p.education);
              if (Array.isArray(parsedEdu) && parsedEdu.length > 0) setEducations(parsedEdu);
            } catch {}
          }
          setProfile({
            ...p,
            aboutBio: p.about_bio || p.aboutBio || defaultAboutBio,
            availability: p.availability || profileDefault.availability,
            email: p.email || profileDefault.email,
            linkedin: p.linkedin || profileDefault.linkedin,
            cvUrl: p.cv_url || p.cvUrl || profileDefault.cvUrl,
            softSkills: p.soft_skills || profileDefault.softSkills,
          });
          if (expFromProfile) {
            setExperiences(expFromProfile);
          }
          if (p.skills || p.tools || p.soft_skills) {
            try {
              const parsedSkills = parseSkillsData(p.skills, p.tools, p.soft_skills);
              setSkillsData(parsedSkills);
            } catch (sErr) {
              console.warn('Failed to parse skills from profile:', sErr);
            }
          }
        }

        if (projectsResult.status === 'fulfilled' && projectsResult.value.data?.length) {
          let loaded = projectsResult.value.data.map((item) => {
            let techs = [];
            if (Array.isArray(item.technologies)) {
              techs = item.technologies;
            } else if (typeof item.technologies === 'string') {
              try {
                const parsed = JSON.parse(item.technologies);
                techs = Array.isArray(parsed) ? parsed : item.technologies.split(',').map((s) => s.trim()).filter(Boolean);
              } catch {
                techs = item.technologies.split(',').map((s) => s.trim()).filter(Boolean);
              }
            }
            return {
              ...item,
              technologies: techs,
              description: item.description || '',
              image: item.image || '',
              url: item.url || '',
              sort_order: item.sort_order !== undefined ? item.sort_order : null
            };
          });

          // Sort by sort_order if available, otherwise check localStorage order
          const hasSortOrder = loaded.some((p) => p.sort_order !== null && p.sort_order !== undefined);
          if (hasSortOrder) {
            loaded.sort((a, b) => (a.sort_order ?? 9999) - (b.sort_order ?? 9999));
          } else {
            try {
              const savedOrder = JSON.parse(localStorage.getItem('portfolio_projects_order') || '[]');
              if (Array.isArray(savedOrder) && savedOrder.length > 0) {
                loaded.sort((a, b) => {
                  const idxA = savedOrder.indexOf(a.id);
                  const idxB = savedOrder.indexOf(b.id);
                  if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                  if (idxA !== -1) return -1;
                  if (idxB !== -1) return 1;
                  return 0;
                });
              }
            } catch {}
          }

          setProjects(loaded);
        }

        if (articlesResult.status === 'fulfilled' && articlesResult.value.data?.length) {
          setArticles(articlesResult.value.data);
        }

        setError('');
      })
      .catch((loadError) => {
        if (!active) return;
        console.error('Supabase load failed', loadError);
        setError('Gagal memuat data dari Supabase. Gunakan data lokal sementara.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [setProfile, setProjects, setArticles, setExperiences, setEducations, setSkillsData]);

  return { profile, setProfile, projects, setProjects, articles, setArticles, experiences, setExperiences, researches, setResearches, educations, setEducations, skillsData, setSkillsData, loading, error };
}
function Login() { const [error, setError] = useState(''); const [loading, setLoading] = useState(false); const navigate = useNavigate(); const submit = async (event) => { event.preventDefault(); if (!isSupabaseConfigured) return setError('Supabase belum terkonfigurasi.'); const form = new FormData(event.currentTarget); setLoading(true); const { error: authError } = await supabase.auth.signInWithPassword({ email: String(form.get('email')), password: String(form.get('password')) }); setLoading(false); if (authError) return setError(authError.message); navigate('/admin'); }; return <div className="min-h-screen flex items-center justify-center px-4"><form onSubmit={submit} className="kartu-transparan rounded-xl p-8 w-full max-w-md"><Link to="/" className="text-neon-blue">← Kembali</Link><h1 className="text-3xl font-bold mt-8 mb-8">Admin Portfolio</h1><div className="space-y-4"><input name="email" type="email" required className="form-field" placeholder="Email admin" /><input name="password" type="password" required className="form-field" placeholder="Password" /><button disabled={loading} className="btn-neon w-full">{loading ? 'Memeriksa...' : 'Masuk'}</button>{error && <p className="text-red-300">{error}</p>}</div></form></div>; }
function Field({ label, value, onChange, area = false, type = 'text', placeholder = '' }) { const Tag = area ? 'textarea' : 'input'; return <label className="grid gap-2 text-sm"><span className="text-gray-300">{label}</span><Tag className="form-field" placeholder={placeholder} rows={area ? 5 : undefined} type={area ? undefined : type} value={value ?? ''} onChange={(event) => onChange(event.target.value)} /></label>; }
function Admin({ data }) {
  const [tab, setTab] = useState('overview');
  const [notice, setNotice] = useState('');
  const [profileFile, setProfileFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [projectFile, setProjectFile] = useState(null);
  const [project, setProject] = useState({ title: '', description: '', technologies: '', image: '', url: '' });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [experienceItem, setExperienceItem] = useState({ title: '', company: '', period: '', badge: '', description: '' });
  const [editingExpId, setEditingExpId] = useState(null);
  const [savingExp, setSavingExp] = useState(false);

  const [researchItem, setResearchItem] = useState({ title: '', institution: '', period: '', badge: '', description: '' });
  const [editingResearchId, setEditingResearchId] = useState(null);
  const [savingResearch, setSavingResearch] = useState(false);

  const [educationItem, setEducationItem] = useState({ title: '', institution: '', period: '', badge: '', description: '' });
  const [editingEducationId, setEditingEducationId] = useState(null);
  const [savingEducation, setSavingEducation] = useState(false);

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingProject, setSavingProject] = useState(false);
  const [savingSkills, setSavingSkills] = useState(false);

  const saveSkillsData = async () => {
    try {
      setSavingSkills(true);
      data.setSkillsData({ ...data.skillsData });

      if (isSupabaseConfigured) {
        const payload = {
          skills: data.skillsData,
          tools: data.skillsData.workflowTools?.map((t) => t.name) || [],
          soft_skills: data.skillsData.interpersonalSkills?.map((s) => s.name) || [],
          updated_at: new Date().toISOString()
        };

        const { error } = await supabase
          .from('profiles')
          .update(payload)
          .not('id', 'is', null);

        if (error) throw error;
      }

      setNotice('Technical Proficiency berhasil disimpan ke Supabase!');
    } catch (err) {
      console.error('Error saving skills:', err);
      setNotice(`Gagal menyimpan skills: ${err.message}`);
    } finally {
      setSavingSkills(false);
    }
  };

  const updateLanguage = (index, field, value) => {
    const list = [...(data.skillsData?.languages || defaultSkillsData.languages)];
    list[index] = { ...list[index], [field]: value };
    data.setSkillsData({ ...data.skillsData, languages: list });
  };

  const addLanguage = () => {
    const list = data.skillsData?.languages || defaultSkillsData.languages;
    const newLang = {
      name: 'New Language',
      level: 75,
      color: '#00f0ff',
      icon: 'fa-solid fa-code'
    };
    data.setSkillsData({
      ...data.skillsData,
      languages: [...list, newLang]
    });
  };

  const removeLanguage = (index) => {
    const list = data.skillsData?.languages || defaultSkillsData.languages;
    if (list.length <= 3) {
      alert('Minimal dibutuhkan 3 bahasa untuk visualisasi radar chart.');
      return;
    }
    const updated = list.filter((_, i) => i !== index);
    data.setSkillsData({ ...data.skillsData, languages: updated });
  };

  const updateProgrammingMarkup = (index, field, value) => {
    const list = [...(data.skillsData?.programmingMarkup || defaultSkillsData.programmingMarkup)];
    list[index] = { ...list[index], [field]: value };
    data.setSkillsData({ ...data.skillsData, programmingMarkup: list });
  };

  const addProgrammingMarkup = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.techName.value.trim();
    const customIcon = form.techIcon?.value.trim();
    const color = form.techColor.value;
    if (!name) return;
    const meta = lookupTechMeta(name, color);
    const item = {
      name,
      color: color || meta.color,
      icon: customIcon || meta.icon || 'fa-solid fa-code',
      isDart: meta.isDart,
      isCpp: meta.isCpp
    };
    data.setSkillsData({
      ...data.skillsData,
      programmingMarkup: [...(data.skillsData?.programmingMarkup || defaultSkillsData.programmingMarkup), item]
    });
    form.reset();
  };

  const removeProgrammingMarkup = (index) => {
    const list = data.skillsData?.programmingMarkup || defaultSkillsData.programmingMarkup;
    const updated = list.filter((_, i) => i !== index);
    data.setSkillsData({ ...data.skillsData, programmingMarkup: updated });
  };

  const updateFrameworkDb = (index, field, value) => {
    const list = [...(data.skillsData?.frameworksDb || defaultSkillsData.frameworksDb)];
    list[index] = { ...list[index], [field]: value };
    data.setSkillsData({ ...data.skillsData, frameworksDb: list });
  };

  const addFrameworkDb = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.fwName.value.trim();
    const customIcon = form.fwIcon?.value.trim();
    const color = form.fwColor.value;
    if (!name) return;
    const meta = lookupTechMeta(name, color);
    const item = {
      name,
      color: color || meta.color,
      icon: customIcon || meta.icon || 'fa-solid fa-layer-group',
      isFlutter: meta.isFlutter
    };
    data.setSkillsData({
      ...data.skillsData,
      frameworksDb: [...(data.skillsData?.frameworksDb || defaultSkillsData.frameworksDb), item]
    });
    form.reset();
  };

  const removeFrameworkDb = (index) => {
    const list = data.skillsData?.frameworksDb || defaultSkillsData.frameworksDb;
    const updated = list.filter((_, i) => i !== index);
    data.setSkillsData({ ...data.skillsData, frameworksDb: updated });
  };

  const updateWorkflowTool = (index, field, value) => {
    const list = [...(data.skillsData?.workflowTools || defaultSkillsData.workflowTools)];
    list[index] = { ...list[index], [field]: value };
    data.setSkillsData({ ...data.skillsData, workflowTools: list });
  };

  const addWorkflowTool = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.toolName.value.trim();
    const sub = form.toolSub.value.trim() || 'Daily Tool';
    const customIcon = form.toolIcon?.value.trim();
    const color = form.toolColor.value;
    if (!name) return;
    const meta = lookupTechMeta(name, color);
    const item = {
      name,
      sub,
      color: color || meta.color,
      icon: customIcon || meta.icon || 'fa-solid fa-toolbox'
    };
    data.setSkillsData({
      ...data.skillsData,
      workflowTools: [...(data.skillsData?.workflowTools || defaultSkillsData.workflowTools), item]
    });
    form.reset();
  };

  const removeWorkflowTool = (index) => {
    const list = data.skillsData?.workflowTools || defaultSkillsData.workflowTools;
    const updated = list.filter((_, i) => i !== index);
    data.setSkillsData({ ...data.skillsData, workflowTools: updated });
  };

  const updateInterpersonalSkill = (index, field, value) => {
    const list = [...(data.skillsData?.interpersonalSkills || defaultSkillsData.interpersonalSkills)];
    list[index] = { ...list[index], [field]: value };
    data.setSkillsData({ ...data.skillsData, interpersonalSkills: list });
  };

  const addInterpersonalSkill = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.softName.value.trim();
    const sub = form.softSub.value.trim() || 'Key Strength';
    const customIcon = form.softIcon?.value.trim() || 'fa-solid fa-bolt';
    const color = form.softColor.value;
    if (!name) return;
    const item = { name, sub, color, icon: customIcon };
    data.setSkillsData({
      ...data.skillsData,
      interpersonalSkills: [...(data.skillsData?.interpersonalSkills || defaultSkillsData.interpersonalSkills), item]
    });
    form.reset();
  };

  const removeInterpersonalSkill = (index) => {
    const list = data.skillsData?.interpersonalSkills || defaultSkillsData.interpersonalSkills;
    const updated = list.filter((_, i) => i !== index);
    data.setSkillsData({ ...data.skillsData, interpersonalSkills: updated });
  };

  const resetProjectForm = () => {
    setProject({ title: '', description: '', technologies: '', image: '', url: '' });
    setProjectFile(null);
    setEditingProjectId(null);
  };

  const resetExpForm = () => {
    setExperienceItem({ title: '', company: '', period: '', badge: '', description: '' });
    setEditingExpId(null);
  };

  const handleEditExp = (item) => {
    setEditingExpId(item.id);
    setExperienceItem({
      title: item.title || '',
      company: item.company || '',
      period: item.period || '',
      badge: item.badge || '',
      description: Array.isArray(item.description) ? item.description.join('\n') : (item.description || '')
    });
    setTab('experiences');
  };

  const saveExperience = async (e) => {
    e.preventDefault();
    try {
      setSavingExp(true);
      const descLines = experienceItem.description.split('\n').map(s => s.trim()).filter(Boolean);
      const payload = {
        title: experienceItem.title,
        company: experienceItem.company,
        period: experienceItem.period,
        badge: experienceItem.badge,
        description: descLines
      };

      let updatedList;
      if (editingExpId) {
        updatedList = data.experiences.map(item => item.id === editingExpId ? { ...item, ...payload } : item);
      } else {
        const newId = Date.now();
        updatedList = [{ id: newId, ...payload }, ...data.experiences];
      }

      data.setExperiences(updatedList);

      if (isSupabaseConfigured) {
        try {
          await supabase.from('profiles').update({
            experience: JSON.stringify(updatedList),
            updated_at: new Date().toISOString()
          }).not('id', 'is', null);
        } catch (syncErr) {
          console.warn('profiles.experience sync err:', syncErr);
        }
      }

      setNotice(editingExpId ? 'Experience berhasil diperbarui di Supabase.' : 'Experience berhasil ditambahkan ke Supabase.');
      resetExpForm();
    } catch (err) {
      setNotice(`Error: ${err.message}`);
    } finally {
      setSavingExp(false);
    }
  };

  const removeExperience = async (id) => {
    try {
      const updatedList = data.experiences.filter(item => item.id !== id);
      data.setExperiences(updatedList);

      if (isSupabaseConfigured) {
        try {
          await supabase.from('profiles').update({
            experience: JSON.stringify(updatedList),
            updated_at: new Date().toISOString()
          }).not('id', 'is', null);
        } catch {}
      }
      setNotice('Experience berhasil dihapus.');
    } catch (err) {
      setNotice(`Error: ${err.message}`);
    }
  };

  const resetResearchForm = () => {
    setResearchItem({ title: '', institution: '', period: '', badge: '', description: '' });
    setEditingResearchId(null);
  };

  const handleEditResearch = (item) => {
    setEditingResearchId(item.id);
    setResearchItem({
      title: item.title || '',
      institution: item.institution || item.company || '',
      period: item.period || '',
      badge: item.badge || '',
      description: Array.isArray(item.description) ? item.description.join('\n') : (item.description || '')
    });
    setTab('research');
  };

  const saveResearch = async (e) => {
    e.preventDefault();
    try {
      setSavingResearch(true);
      const descLines = researchItem.description.split('\n').map(s => s.trim()).filter(Boolean);
      const payload = {
        title: researchItem.title,
        institution: researchItem.institution,
        period: researchItem.period,
        badge: researchItem.badge,
        description: descLines
      };

      let updatedList;
      if (editingResearchId) {
        updatedList = data.researches.map(item => item.id === editingResearchId ? { ...item, ...payload } : item);
      } else {
        const newId = Date.now();
        updatedList = [{ id: newId, ...payload }, ...data.researches];
      }

      data.setResearches(updatedList);
      setNotice(editingResearchId ? 'Data riset berhasil diperbarui.' : 'Data riset baru berhasil ditambahkan.');
      resetResearchForm();
    } catch (err) {
      setNotice(`Error: ${err.message}`);
    } finally {
      setSavingResearch(false);
    }
  };

  const removeResearch = (id) => {
    const updatedList = data.researches.filter(item => item.id !== id);
    data.setResearches(updatedList);
    setNotice('Data riset berhasil dihapus.');
  };

  const resetEducationForm = () => {
    setEducationItem({ title: '', institution: '', period: '', badge: '', description: '' });
    setEditingEducationId(null);
  };

  const handleEditEducation = (item) => {
    setEditingEducationId(item.id);
    setEducationItem({
      title: item.title || '',
      institution: item.institution || item.company || '',
      period: item.period || '',
      badge: item.badge || '',
      description: Array.isArray(item.description) ? item.description.join(' ') : (item.description || '')
    });
    setTab('education');
  };

  const saveEducation = async (e) => {
    e.preventDefault();
    try {
      setSavingEducation(true);
      const payload = {
        title: educationItem.title,
        institution: educationItem.institution,
        period: educationItem.period,
        badge: educationItem.badge,
        description: educationItem.description
      };

      let updatedList;
      if (editingEducationId) {
        updatedList = data.educations.map(item => item.id === editingEducationId ? { ...item, ...payload } : item);
      } else {
        const newId = Date.now();
        updatedList = [{ id: newId, ...payload }, ...data.educations];
      }

      data.setEducations(updatedList);

      if (isSupabaseConfigured) {
        try {
          await supabase.from('profiles').update({
            education: JSON.stringify(updatedList),
            updated_at: new Date().toISOString()
          }).not('id', 'is', null);
        } catch (syncErr) {
          console.warn('profiles.education sync error:', syncErr);
        }
      }

      setNotice(editingEducationId ? 'Pendidikan berhasil diperbarui di Supabase.' : 'Pendidikan baru berhasil ditambahkan ke Supabase.');
      resetEducationForm();
    } catch (err) {
      setNotice(`Error: ${err.message}`);
    } finally {
      setSavingEducation(false);
    }
  };

  const removeEducation = async (id) => {
    const updatedList = data.educations.filter(item => item.id !== id);
    data.setEducations(updatedList);
    if (isSupabaseConfigured) {
      try {
        await supabase.from('profiles').update({
          education: JSON.stringify(updatedList),
          updated_at: new Date().toISOString()
        }).not('id', 'is', null);
      } catch {}
    }
    setNotice('Data pendidikan berhasil dihapus.');
  };

  const saveProfile = async () => {
    try {
      setSavingProfile(true);
      let cvUrl = data.profile.cvUrl || data.profile.cv_url || '';
      if (cvFile) {
        cvUrl = await uploadPortfolioFile(cvFile, 'cv');
      }
      let profileImageUrl = data.profile.image || '';
      if (profileFile) {
        profileImageUrl = await uploadPortfolioImage(profileFile, 'profile');
      }

      // Base columns that are guaranteed to exist in Supabase profiles table
      const basePayload = {
        name: data.profile.name,
        role: data.profile.role,
        tagline: data.profile.tagline,
        bio: data.profile.bio,
        location: data.profile.location,
        education: data.profile.education,
        experience: typeof data.profile.experience === 'string' && !data.profile.experience.startsWith('[')
          ? data.profile.experience
          : JSON.stringify(data.experiences),
        skills: data.skillsData,
        tools: data.skillsData?.workflowTools?.map((t) => t.name) || [],
        soft_skills: data.skillsData?.interpersonalSkills?.map((s) => s.name) || data.profile.softSkills,
        updated_at: new Date().toISOString()
      };
      if (profileImageUrl) basePayload.image = profileImageUrl;

      // Extended optional columns (if added via SQL editor in Supabase)
      const fullPayload = {
        ...basePayload,
        ...(data.profile.aboutBio ? { about_bio: data.profile.aboutBio } : {}),
        ...(data.profile.availability ? { availability: data.profile.availability } : {}),
        ...(data.profile.email ? { email: data.profile.email } : {}),
        ...(data.profile.linkedin ? { linkedin: data.profile.linkedin } : {}),
        ...(cvUrl ? { cv_url: cvUrl } : {})
      };

      let saved;
      let error;

      // Step 1: Try updating with all extended columns
      ({ data: saved, error } = await supabase.from('profiles').update(fullPayload).not('id', 'is', null).select().maybeSingle());

      // Step 2: If any optional column is missing in Supabase schema cache, gracefully update with base columns
      if (error && (error.code === 'PGRST204' || error.message?.includes('column of \'profiles\''))) {
        console.warn('Supabase optional columns missing in database schema, saving core fields to cloud and biography to local cache:', error.message);
        ({ data: saved, error } = await supabase.from('profiles').update(basePayload).not('id', 'is', null).select().maybeSingle());
      }
      if (error) throw error;

      // Step 3: Always update local state & localStorage so UI immediately reflects everything
      data.setProfile({
        ...data.profile,
        ...(saved || basePayload),
        aboutBio: data.profile.aboutBio,
        availability: data.profile.availability,
        email: data.profile.email,
        linkedin: data.profile.linkedin,
        cvUrl: cvUrl || data.profile.cvUrl,
        softSkills: saved?.soft_skills || basePayload.soft_skills
      });
      setNotice('Profile & Biography berhasil disimpan!');
      setCvFile(null);
      setProfileFile(null);
    } catch (error) {
      setNotice(`Gagal menyimpan: ${error.message}`);
    } finally {
      setSavingProfile(false);
    }
  };

  const addProject = async (event) => {
    event.preventDefault();
    if (!project.title?.trim()) return setNotice('Judul project wajib diisi.');
    try {
      setSavingProject(true);
      const image = projectFile ? await uploadPortfolioImage(projectFile, 'projects') : project.image || '';
      const techArray = typeof project.technologies === 'string'
        ? project.technologies.split(',').map((item) => item.trim()).filter(Boolean)
        : (Array.isArray(project.technologies) ? project.technologies : []);

      const payload = {
        title: project.title.trim(),
        description: project.description?.trim() || '',
        technologies: techArray,
        image,
        url: project.url?.trim() || '',
      };

      let saved = null;
      let cloudSync = false;

      if (supabase) {
        try {
          if (editingProjectId && typeof editingProjectId === 'string' && editingProjectId.includes('-')) {
            const { data: res, error } = await supabase.from('projects').update(payload).eq('id', editingProjectId).select().single();
            if (!error && res) { saved = res; cloudSync = true; }
          } else if (!editingProjectId) {
            const { data: res, error } = await supabase.from('projects').insert(payload).select().single();
            if (!error && res) { saved = res; cloudSync = true; }
          }
        } catch (err) {
          console.warn('Supabase project cloud sync notice:', err.message);
        }
      }

      const finalItem = saved ? {
        ...saved,
        technologies: Array.isArray(saved.technologies) ? saved.technologies : techArray
      } : {
        id: editingProjectId || Date.now(),
        ...payload,
        created_at: new Date().toISOString()
      };

      if (editingProjectId) {
        data.setProjects(data.projects.map((p) => (p.id === editingProjectId ? finalItem : p)));
        setNotice(cloudSync ? 'Project berhasil diperbarui dan tersimpan di Supabase!' : 'Project berhasil diperbarui!');
      } else {
        data.setProjects([finalItem, ...data.projects]);
        setNotice(cloudSync ? 'Project baru berhasil ditambahkan ke Supabase!' : 'Project baru berhasil ditambahkan!');
      }

      resetProjectForm();
    } catch (error) {
      setNotice(`Gagal menyimpan: ${error.message}`);
    } finally {
      setSavingProject(false);
    }
  };

  const removeProject = async (id) => {
    if (!window.confirm('Yakin ingin menghapus project ini?')) return;
    if (supabase && typeof id === 'string' && id.includes('-')) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    }
    data.setProjects(data.projects.filter((item) => item.id !== id));
    setNotice('Project berhasil dihapus.');
    if (editingProjectId === id) resetProjectForm();
  };

  const handleEditProject = (item) => {
    setEditingProjectId(item.id);
    setProject({
      title: item.title || '',
      description: item.description || '',
      technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : '',
      image: item.image || '',
      url: item.url || '',
    });
    setProjectFile(null);
    setTab('projects');
  };

  const reorderProject = async (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= data.projects.length || fromIndex === toIndex) return;
    const updated = [...data.projects];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);

    data.setProjects(updated);
    try {
      localStorage.setItem('portfolio_projects_order', JSON.stringify(updated.map((p) => p.id)));
    } catch {}

    setNotice(`Project "${movedItem.title}" berhasil dipindahkan ke urutan #${toIndex + 1}.`);

    if (supabase) {
      try {
        await Promise.all(
          updated.map((p, idx) => {
            if (typeof p.id === 'string' && p.id.includes('-')) {
              return supabase.from('projects').update({ sort_order: idx }).eq('id', p.id);
            }
            return Promise.resolve();
          })
        );
      } catch (err) {
        console.warn('Supabase sort_order sync notice:', err.message);
      }
    }
  };

  const logout = async () => { await supabase.auth.signOut(); window.location.href = '/admin/login'; };
  return (
    <div className="admin-shell min-h-screen">
      <header className="border-b border-neon-blue/10 bg-dark-950/80">
        <div className="page-container flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/admin" className="text-xl font-bold teks-neon">AZZA ADMIN</Link>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link to="/" className="text-gray-400 hover:text-neon-blue">Lihat website</Link>
            <button className="btn-muted" onClick={logout}>Keluar</button>
          </div>
        </div>
      </header>
      <main className="page-container pt-8 pb-72 md:pb-96" style={{ paddingBottom: '150px' }}>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Dashboard Admin</h1>
          <p className="text-gray-400 mt-2">Kelola profil, biography, experiences, project, dan artikel secara dinamis terhubung Supabase.</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {['overview', 'profile', 'skills', 'experiences', 'research', 'education', 'projects', 'articles'].map((item) => (
            <button type="button" className={tab === item ? 'btn-neon' : 'btn-muted'} onClick={() => setTab(item)} key={item}>
              {item === 'skills' ? 'Skills & Tech' : item === 'experiences' ? 'Experiences' : item === 'research' ? 'Research' : item === 'education' ? 'Education' : item}
            </button>
          ))}
        </div>
        {notice && <div className="toast" onClick={() => setNotice('')}>{notice}</div>}
        
        {tab === 'overview' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              ['Profile & Bio', 'profile', 'Ready'],
              ['Skills & Tech', 'skills', `${data.skillsData?.languages?.length || 5} Langs`],
              ['Experiences', 'experiences', data.experiences?.length || 0],
              ['Research', 'research', data.researches?.length || 0],
              ['Education', 'education', data.educations?.length || 0],
              ['Projects', 'projects', data.projects?.length || 0],
              ['Articles', 'articles', data.articles?.length || 0]
            ].map(([title, target, val]) => (
              <div className="admin-panel rounded-xl p-5" key={title}>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-xs">{title}</p>
                  <span className="status-pill text-[10px]">{val}</span>
                </div>
                <p className="text-xl font-bold mt-4 truncate">{val}</p>
                <button type="button" className="text-neon-blue text-xs mt-4 inline-flex items-center hover:underline" onClick={() => setTab(target)}>
                  Kelola <span className="ml-1">→</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'profile' && (
          <section className="admin-panel rounded-xl p-6 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-semibold">Edit Profil & Konten Biography</h2>
                <p className="text-xs text-gray-400 mt-1">Semua konten biography di halaman utama dapat diedit secara dinamis dan tersinkron ke Supabase.</p>
              </div>
              <span className="status-pill">Live Supabase</span>
            </div>

            {/* Bagian 1: Identitas Profil */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-neon-blue mb-4">1. Identitas & Hero Banner</h3>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  ['name', 'Nama Lengkap'],
                  ['role', 'Role (Jabatan)'],
                  ['tagline', 'Tagline Hero'],
                  ['location', 'Lokasi'],
                  ['education', 'Pendidikan']
                ].map(([key, label]) => (
                  <Field key={key} label={label} value={data.profile[key]} onChange={(value) => data.setProfile({ ...data.profile, [key]: value })} />
                ))}
                <Field label="Bio Singkat (Hero Banner)" area value={data.profile.bio} onChange={(value) => data.setProfile({ ...data.profile, bio: value })} />
              </div>
            </div>

            {/* Bagian 2: Konten Box Biography (About Me) */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">2. Konten Box Biography (About Me)</h3>
              <div className="grid md:grid-cols-2 gap-5">
                <Field
                  label="Status Ketersediaan / Badge (e.g. Available for Work)"
                  value={data.profile.availability || ''}
                  placeholder="Available for Work"
                  onChange={(value) => data.setProfile({ ...data.profile, availability: value })}
                />
                <Field
                  label="Email Kontak (Ditampilkan di Box Biography)"
                  value={data.profile.email || ''}
                  placeholder="azza.alkausar@gmail.com"
                  onChange={(value) => data.setProfile({ ...data.profile, email: value })}
                />
                <Field
                  label="LinkedIn Profile URL (Tombol Connect on LinkedIn)"
                  value={data.profile.linkedin || ''}
                  placeholder="https://www.linkedin.com/in/..."
                  onChange={(value) => data.setProfile({ ...data.profile, linkedin: value })}
                />
                <Field
                  label="CV URL (Link Download CV)"
                  value={data.profile.cvUrl || data.profile.cv_url || ''}
                  placeholder="/uploads/... atau https://..."
                  onChange={(value) => data.setProfile({ ...data.profile, cvUrl: value })}
                />
              </div>

              <div className="mt-5">
                <Field
                  label="Deskripsi Lengkap Biography (About Me Section - English)"
                  area
                  placeholder="Write your comprehensive professional English biography here..."
                  value={data.profile.aboutBio ?? ''}
                  onChange={(value) => data.setProfile({ ...data.profile, aboutBio: value })}
                />
              </div>
            </div>

            {/* Upload Files & Submit */}
            <div className="border-t border-white/10 pt-6 flex flex-wrap gap-6 items-end justify-between">
              <div className="flex flex-wrap gap-6">
                <label className="grid gap-2 text-sm">
                  <span>Ganti Foto Profil</span>
                  <input className="form-field" type="file" accept="image/*" onChange={(event) => setProfileFile(event.target.files[0])} />
                </label>
                <label className="grid gap-2 text-sm">
                  <span>Upload File CV Baru (PDF / Gambar)</span>
                  <input
                    className="form-field"
                    type="file"
                    accept=".pdf,application/pdf,image/*"
                    onChange={(event) => setCvFile(event.target.files?.[0] || null)}
                  />
                  {cvFile && (
                    <span className="text-xs text-emerald-400 font-mono">
                      File siap: {cvFile.name} ({(cvFile.size / 1024).toFixed(0)} KB)
                    </span>
                  )}
                </label>
              </div>

              <button className="btn-neon px-6 py-3" disabled={savingProfile} onClick={saveProfile}>
                {savingProfile ? 'Menyimpan ke Supabase...' : 'Simpan Profile & Biography'}
              </button>
            </div>
          </section>
        )}

        {tab === 'skills' && (
          <section className="space-y-8 animate-fadeIn">
            {/* Top action bar */}
            <div className="admin-panel rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                  <i className="fa-solid fa-code text-neon-blue text-xl" />
                  <span>Kelola Technical Proficiency</span>
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Atur Radar Chart, Core Stack Languages, Stack Badges, Daily Tools, dan Interpersonal Skills tersinkron ke Supabase.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Kembalikan semua technical proficiency ke nilai default awal?')) {
                      data.setSkillsData(defaultSkillsData);
                    }
                  }}
                  className="btn-muted text-xs px-3 py-2"
                >
                  Reset Default
                </button>
                <button
                  type="button"
                  disabled={savingSkills}
                  onClick={saveSkillsData}
                  className="btn-neon px-5 py-2.5 text-xs font-bold flex items-center gap-2"
                >
                  <i className="fa-solid fa-cloud-arrow-up text-xs" />
                  <span>{savingSkills ? 'Menyimpan...' : 'Simpan Technical Proficiency'}</span>
                </button>
              </div>
            </div>

            {/* 1. Core Languages (Radar Chart & Proficiency Bars) */}
            <div className="admin-panel rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-bold text-neon-blue flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_8px_#00f0ff]" />
                    <span>1. Core Languages (Radar Chart &amp; Language Proficiency)</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Bahasa utama yang ditampilkan di Pentagon Radar Chart dan Core Stack Progress Bar.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="btn-neon text-xs px-3 py-1.5 flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-plus text-[10px]" />
                  <span>Tambah Bahasa</span>
                </button>
              </div>

              <div className="grid gap-3.5">
                {(data.skillsData?.languages || defaultSkillsData.languages).map((lang, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-dark-950/60 border border-white/5 flex flex-col md:flex-row items-start md:items-center gap-4">
                    {/* Color picker & Name */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <input
                        type="color"
                        value={lang.color || '#00f0ff'}
                        onChange={(e) => updateLanguage(idx, 'color', e.target.value)}
                        className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0 p-0 shrink-0"
                        title="Pilih warna neon/brand"
                      />
                      <input
                        type="text"
                        value={lang.name}
                        placeholder="Nama Bahasa"
                        onChange={(e) => updateLanguage(idx, 'name', e.target.value)}
                        className="form-field flex-1 md:w-44 text-sm font-semibold"
                      />
                    </div>

                    {/* Level slider & percentage */}
                    <div className="flex items-center gap-3 flex-1 w-full">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={lang.level}
                        onChange={(e) => updateLanguage(idx, 'level', Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                      <span
                        className="font-mono text-xs font-bold px-2.5 py-1 rounded w-16 text-center shrink-0"
                        style={{
                          color: lang.color || '#00f0ff',
                          background: `${lang.color || '#00f0ff'}15`,
                          border: `1px solid ${lang.color || '#00f0ff'}40`
                        }}
                      >
                        {lang.level}%
                      </span>
                    </div>

                    {/* Icon class input with live preview */}
                    <div className="flex items-center gap-2 w-full md:w-56">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                        style={{
                          background: `${lang.color || '#00f0ff'}18`,
                          borderColor: `${lang.color || '#00f0ff'}50`,
                          color: lang.color || '#00f0ff'
                        }}
                        title="Live Icon Preview"
                      >
                        <i className={`${lang.icon || 'fa-solid fa-code'} text-xs`} />
                      </div>
                      <input
                        type="text"
                        value={lang.icon || ''}
                        placeholder="Icon FontAwesome class"
                        onChange={(e) => updateLanguage(idx, 'icon', e.target.value)}
                        className="form-field text-xs font-mono flex-1"
                        title="Contoh: fa-brands fa-js atau fa-solid fa-code"
                      />
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => removeLanguage(idx)}
                      disabled={(data.skillsData?.languages || defaultSkillsData.languages).length <= 3}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title={(data.skillsData?.languages || defaultSkillsData.languages).length <= 3 ? 'Minimal butuh 3 bahasa untuk radar chart' : 'Hapus bahasa'}
                    >
                      <i className="fa-solid fa-trash-can text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Technologies & Frameworks */}
            <div className="admin-panel rounded-xl p-6 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-neon-blue flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_8px_#00f0ff]" />
                  <span>2. Technologies &amp; Frameworks</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Daftar stack badge yang ditampilkan pada Box Technologies &amp; Frameworks. Semua kolom dapat diedit langsung (warna, nama, &amp; icon).
                </p>
              </div>

              {/* Subgroup 1: Programming & Markup */}
              <div className="p-5 rounded-xl bg-dark-950/40 border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-neon-blue">A. Programming &amp; Markup</p>
                  <span className="text-xs font-mono text-gray-400">{(data.skillsData?.programmingMarkup || defaultSkillsData.programmingMarkup).length} items</span>
                </div>

                {/* Editable Items List */}
                <div className="grid gap-2.5">
                  {(data.skillsData?.programmingMarkup || defaultSkillsData.programmingMarkup).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-dark-950/70 border border-white/10 flex flex-wrap items-center gap-3 transition-colors hover:border-white/20"
                    >
                      {/* Live Icon & Color preview */}
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                        style={{
                          background: `${item.color || '#00f0ff'}18`,
                          borderColor: `${item.color || '#00f0ff'}50`,
                          color: item.color || '#00f0ff'
                        }}
                        title="Live Icon Preview"
                      >
                        <i className={`${item.icon || 'fa-solid fa-code'} text-xs`} />
                      </div>

                      {/* Color picker */}
                      <input
                        type="color"
                        value={item.color || '#00f0ff'}
                        onChange={(e) => updateProgrammingMarkup(idx, 'color', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0 shrink-0"
                        title="Pilih warna neon/brand"
                      />

                      {/* Name input */}
                      <input
                        type="text"
                        value={item.name}
                        placeholder="Nama Stack"
                        onChange={(e) => updateProgrammingMarkup(idx, 'name', e.target.value)}
                        className="form-field text-xs font-semibold flex-1 min-w-[120px]"
                      />

                      {/* Icon class input */}
                      <input
                        type="text"
                        value={item.icon || ''}
                        placeholder="Icon class (e.g. fa-brands fa-html5)"
                        onChange={(e) => updateProgrammingMarkup(idx, 'icon', e.target.value)}
                        className="form-field text-xs font-mono flex-1 min-w-[150px]"
                        title="Class FontAwesome (e.g. fa-brands fa-html5, fa-brands fa-python)"
                      />

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => removeProgrammingMarkup(idx)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                        title="Hapus stack ini"
                      >
                        <i className="fa-solid fa-trash-can text-xs" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form quick add */}
                <form onSubmit={addProgrammingMarkup} className="p-3.5 rounded-xl bg-dark-950/50 border border-white/10 flex flex-wrap gap-2.5 items-center">
                  <input
                    type="text"
                    name="techName"
                    placeholder="Nama Stack baru (e.g. TypeScript)"
                    required
                    className="form-field text-xs flex-1 min-w-[130px]"
                  />
                  <input
                    type="text"
                    name="techIcon"
                    placeholder="Icon class (e.g. fa-brands fa-js)"
                    className="form-field text-xs font-mono flex-1 min-w-[150px]"
                    title="Opsional: masukkan icon fontawesome, jika kosong otomatis dideteksi"
                  />
                  <input
                    type="color"
                    name="techColor"
                    defaultValue="#00f0ff"
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0 self-center shrink-0"
                    title="Pilih warna"
                  />
                  <button type="submit" className="btn-neon text-xs px-3.5 py-2 shrink-0">
                    + Tambah Programming &amp; Markup
                  </button>
                </form>
              </div>

              {/* Subgroup 2: Frameworks, Libraries & Database */}
              <div className="p-5 rounded-xl bg-dark-950/40 border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-neon-purple">B. Frameworks, Libraries &amp; Database</p>
                  <span className="text-xs font-mono text-gray-400">{(data.skillsData?.frameworksDb || defaultSkillsData.frameworksDb).length} items</span>
                </div>

                {/* Editable Items List */}
                <div className="grid gap-2.5">
                  {(data.skillsData?.frameworksDb || defaultSkillsData.frameworksDb).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-dark-950/70 border border-white/10 flex flex-wrap items-center gap-3 transition-colors hover:border-white/20"
                    >
                      {/* Live Icon & Color preview */}
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                        style={{
                          background: `${item.color || '#a78bfa'}18`,
                          borderColor: `${item.color || '#a78bfa'}50`,
                          color: item.color || '#a78bfa'
                        }}
                        title="Live Icon Preview"
                      >
                        <i className={`${item.icon || 'fa-solid fa-layer-group'} text-xs`} />
                      </div>

                      {/* Color picker */}
                      <input
                        type="color"
                        value={item.color || '#a78bfa'}
                        onChange={(e) => updateFrameworkDb(idx, 'color', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0 shrink-0"
                        title="Pilih warna brand"
                      />

                      {/* Name input */}
                      <input
                        type="text"
                        value={item.name}
                        placeholder="Nama Framework / DB"
                        onChange={(e) => updateFrameworkDb(idx, 'name', e.target.value)}
                        className="form-field text-xs font-semibold flex-1 min-w-[120px]"
                      />

                      {/* Icon class input */}
                      <input
                        type="text"
                        value={item.icon || ''}
                        placeholder="Icon class (e.g. fa-brands fa-react)"
                        onChange={(e) => updateFrameworkDb(idx, 'icon', e.target.value)}
                        className="form-field text-xs font-mono flex-1 min-w-[150px]"
                        title="Class FontAwesome (e.g. fa-brands fa-react, fa-solid fa-database)"
                      />

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => removeFrameworkDb(idx)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                        title="Hapus framework ini"
                      >
                        <i className="fa-solid fa-trash-can text-xs" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form quick add */}
                <form onSubmit={addFrameworkDb} className="p-3.5 rounded-xl bg-dark-950/50 border border-white/10 flex flex-wrap gap-2.5 items-center">
                  <input
                    type="text"
                    name="fwName"
                    placeholder="Nama Framework/DB (e.g. Next.js / PostgreSQL)"
                    required
                    className="form-field text-xs flex-1 min-w-[130px]"
                  />
                  <input
                    type="text"
                    name="fwIcon"
                    placeholder="Icon class (e.g. fa-brands fa-react)"
                    className="form-field text-xs font-mono flex-1 min-w-[150px]"
                    title="Opsional: masukkan icon fontawesome, jika kosong otomatis dideteksi"
                  />
                  <input
                    type="color"
                    name="fwColor"
                    defaultValue="#a78bfa"
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0 self-center shrink-0"
                    title="Pilih warna"
                  />
                  <button type="submit" className="btn-neon text-xs px-3.5 py-2 shrink-0">
                    + Tambah Framework &amp; DB
                  </button>
                </form>
              </div>
            </div>

            {/* 3. Tools & Workflow (Daily Stack) */}
            <div className="admin-panel rounded-xl p-6 space-y-5">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-neon-pink flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_8px_#f472b6]" />
                  <span>3. Tools &amp; Workflow (Daily Stack)</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Tool harian pendukung produktivitas dan alur kerja pengembangan software. Semua kolom dapat diedit langsung.
                </p>
              </div>

              {/* Editable Tools Grid */}
              <div className="grid md:grid-cols-2 gap-3.5">
                {(data.skillsData?.workflowTools || defaultSkillsData.workflowTools).map((tool, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-dark-950/70 border border-white/10 flex flex-col gap-3 transition-colors hover:border-white/20">
                    {/* Top Row: Preview, Color, Name, Delete */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
                        style={{
                          background: `${tool.color || '#f472b6'}20`,
                          borderColor: `${tool.color || '#f472b6'}50`,
                          color: tool.color || '#f472b6'
                        }}
                        title="Live Icon Preview"
                      >
                        <i className={`${tool.icon || 'fa-solid fa-toolbox'} text-sm`} />
                      </div>
                      <input
                        type="color"
                        value={tool.color || '#f472b6'}
                        onChange={(e) => updateWorkflowTool(idx, 'color', e.target.value)}
                        className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0 p-0 shrink-0"
                        title="Pilih warna tool"
                      />
                      <input
                        type="text"
                        value={tool.name}
                        placeholder="Nama Tool (e.g. Figma)"
                        onChange={(e) => updateWorkflowTool(idx, 'name', e.target.value)}
                        className="form-field text-xs font-bold flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeWorkflowTool(idx)}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                        title="Hapus tool"
                      >
                        <i className="fa-solid fa-trash-can text-xs" />
                      </button>
                    </div>

                    {/* Bottom Row: Sub/Role & Icon Class */}
                    <div className="grid sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={tool.sub || ''}
                        placeholder="Kategori / Peran (e.g. UI/UX Design)"
                        onChange={(e) => updateWorkflowTool(idx, 'sub', e.target.value)}
                        className="form-field text-xs text-gray-300"
                      />
                      <input
                        type="text"
                        value={tool.icon || ''}
                        placeholder="Icon class (e.g. fa-brands fa-figma)"
                        onChange={(e) => updateWorkflowTool(idx, 'icon', e.target.value)}
                        className="form-field text-xs font-mono text-gray-300"
                        title="Class FontAwesome (e.g. fa-brands fa-figma, fa-brands fa-docker)"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Form Tambah Tool Baru */}
              <form onSubmit={addWorkflowTool} className="p-4 rounded-xl bg-dark-950/50 border border-white/10 flex flex-wrap gap-3 items-center">
                <input
                  type="text"
                  name="toolName"
                  placeholder="Nama Tool (e.g. Docker)"
                  required
                  className="form-field text-xs flex-1 min-w-[120px]"
                />
                <input
                  type="text"
                  name="toolSub"
                  placeholder="Kategori / Peran (e.g. Containerization)"
                  required
                  className="form-field text-xs flex-1 min-w-[140px]"
                />
                <input
                  type="text"
                  name="toolIcon"
                  placeholder="Icon class (e.g. fa-brands fa-docker)"
                  className="form-field text-xs font-mono flex-1 min-w-[150px]"
                  title="Class FontAwesome icon"
                />
                <input
                  type="color"
                  name="toolColor"
                  defaultValue="#f472b6"
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0 shrink-0"
                  title="Pilih warna"
                />
                <button type="submit" className="btn-neon text-xs px-4 py-2 shrink-0">
                  + Tambah Tool
                </button>
              </form>
            </div>

            {/* 4. Interpersonal Skills (Key Strengths) */}
            <div className="admin-panel rounded-xl p-6 space-y-5">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span>4. Interpersonal Skills (Key Strengths)</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Keahlian non-teknis, karakter kolaborasi, dan daya adaptasi profesional. Semua kolom dapat diedit langsung termasuk icon (e.g. fa-solid fa-bolt).
                </p>
              </div>

              {/* Editable Interpersonal Skills Grid */}
              <div className="grid md:grid-cols-2 gap-3.5">
                {(data.skillsData?.interpersonalSkills || defaultSkillsData.interpersonalSkills).map((skill, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-dark-950/70 border border-white/10 flex flex-col gap-3 transition-colors hover:border-white/20">
                    {/* Top Row: Preview, Color, Name, Delete */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
                        style={{
                          background: `${skill.color || '#34d399'}20`,
                          borderColor: `${skill.color || '#34d399'}50`,
                          color: skill.color || '#34d399'
                        }}
                        title="Live Icon Preview"
                      >
                        <i className={`${skill.icon || 'fa-solid fa-bolt'} text-sm`} />
                      </div>
                      <input
                        type="color"
                        value={skill.color || '#34d399'}
                        onChange={(e) => updateInterpersonalSkill(idx, 'color', e.target.value)}
                        className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0 p-0 shrink-0"
                        title="Pilih warna soft skill"
                      />
                      <input
                        type="text"
                        value={skill.name}
                        placeholder="Nama Skill (e.g. Adaptive & Agile)"
                        onChange={(e) => updateInterpersonalSkill(idx, 'name', e.target.value)}
                        className="form-field text-xs font-bold flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeInterpersonalSkill(idx)}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                        title="Hapus soft skill"
                      >
                        <i className="fa-solid fa-trash-can text-xs" />
                      </button>
                    </div>

                    {/* Bottom Row: Sub/Description & Icon class (e.g. fa-solid fa-bolt) */}
                    <div className="grid sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={skill.sub || ''}
                        placeholder="Deskripsi Singkat (e.g. Quick Continuous Learner)"
                        onChange={(e) => updateInterpersonalSkill(idx, 'sub', e.target.value)}
                        className="form-field text-xs text-gray-300"
                      />
                      <input
                        type="text"
                        value={skill.icon || ''}
                        placeholder="Icon class (e.g. fa-solid fa-bolt)"
                        onChange={(e) => updateInterpersonalSkill(idx, 'icon', e.target.value)}
                        className="form-field text-xs font-mono text-gray-300"
                        title="Class FontAwesome icon (e.g. fa-solid fa-bolt, fa-solid fa-lightbulb)"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Form Tambah Interpersonal Skill */}
              <form onSubmit={addInterpersonalSkill} className="p-4 rounded-xl bg-dark-950/50 border border-white/10 flex flex-wrap gap-3 items-center">
                <input
                  type="text"
                  name="softName"
                  placeholder="Keahlian (e.g. Adaptive & Agile)"
                  required
                  className="form-field text-xs flex-1 min-w-[130px]"
                />
                <input
                  type="text"
                  name="softSub"
                  placeholder="Deskripsi Singkat (e.g. Quick Continuous Learner)"
                  required
                  className="form-field text-xs flex-1 min-w-[150px]"
                />
                <input
                  type="text"
                  name="softIcon"
                  defaultValue="fa-solid fa-bolt"
                  placeholder="Icon class (e.g. fa-solid fa-bolt)"
                  required
                  className="form-field text-xs font-mono flex-1 min-w-[140px]"
                  title="Masukkan class FontAwesome seperti fa-solid fa-bolt"
                />
                <input
                  type="color"
                  name="softColor"
                  defaultValue="#34d399"
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0 shrink-0"
                  title="Pilih warna"
                />
                <button type="submit" className="btn-neon text-xs px-4 py-2 shrink-0">
                  + Tambah Soft Skill
                </button>
              </form>
            </div>

            {/* Bottom Save bar */}
            <div className="admin-panel rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-400">
                Pastikan menekan tombol simpan agar seluruh modifikasi tersinkronisasi ke database Supabase dan live website.
              </span>
              <button
                type="button"
                disabled={savingSkills}
                onClick={saveSkillsData}
                className="btn-neon px-6 py-3 text-sm font-bold flex items-center gap-2"
              >
                <i className="fa-solid fa-cloud-arrow-up text-sm" />
                <span>{savingSkills ? 'Menyimpan...' : 'Simpan Technical Proficiency'}</span>
              </button>
            </div>
          </section>
        )}

        {tab === 'experiences' && (
          <section className="grid lg:grid-cols-2 gap-8">
            <form onSubmit={saveExperience} className="admin-panel rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold">{editingExpId ? 'Edit Experience' : 'Tambah Experience Baru'}</h2>
              <Field
                label="Posisi / Jabatan (e.g. Frontend & Mobile Developer)"
                value={experienceItem.title}
                onChange={(value) => setExperienceItem({ ...experienceItem, title: value })}
              />
              <Field
                label="Perusahaan / Proyek / Lokasi (e.g. Independent · Kepulauan Riau)"
                value={experienceItem.company}
                onChange={(value) => setExperienceItem({ ...experienceItem, company: value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Periode (e.g. 2023 - Present)"
                  value={experienceItem.period}
                  onChange={(value) => setExperienceItem({ ...experienceItem, period: value })}
                />
                <Field
                  label="Badge Opsional (e.g. Active)"
                  placeholder="Active / Selesai / Kosong"
                  value={experienceItem.badge}
                  onChange={(value) => setExperienceItem({ ...experienceItem, badge: value })}
                />
              </div>
              <Field
                label="Deskripsi / Poin Pekerjaan (Satu baris = satu poin bullet)"
                area
                placeholder="Contoh:&#10;Architecting and building responsive mobile apps using Flutter...&#10;Developing modern SPA with React..."
                value={experienceItem.description}
                onChange={(value) => setExperienceItem({ ...experienceItem, description: value })}
              />
              <div className="flex gap-3 justify-end pt-2">
                {editingExpId && (
                  <button type="button" className="btn-muted" onClick={resetExpForm}>
                    Batal
                  </button>
                )}
                <button type="submit" className="btn-neon" disabled={savingExp}>
                  {savingExp ? 'Menyimpan...' : (editingExpId ? 'Update Experience' : 'Tambah Experience')}
                </button>
              </div>
            </form>

            <div className="admin-panel rounded-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-semibold">Daftar Experience</h2>
                <span className="status-pill">{data.experiences?.length || 0} Items</span>
              </div>
              <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
                {data.experiences && data.experiences.length > 0 ? (
                  data.experiences.map((item) => (
                    <div className="border border-white/10 rounded-xl p-4 bg-dark-950/50" key={item.id}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-sm">{item.title}</h4>
                            {item.badge && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neon-blue mt-0.5">{item.company}</p>
                          <span className="text-[11px] text-gray-400 font-mono block mt-1">{item.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleEditExp(item)}
                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 bg-neon-blue/15 text-neon-blue border border-neon-blue/30 hover:bg-neon-blue hover:text-dark-950 transition-all cursor-pointer shadow-xs active:scale-95"
                            title="Edit data ini"
                          >
                            <i className="fa-solid fa-pen-to-square text-[10px]" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => removeExperience(item.id)}
                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
                            title="Hapus data ini"
                          >
                            <i className="fa-solid fa-trash-can text-[10px]" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                      <ul className="text-xs text-gray-300 list-disc list-inside mt-2 space-y-1">
                        {(Array.isArray(item.description) ? item.description : String(item.description || '').split('\n').filter(Boolean)).map((d, dIdx) => (
                          <li key={dIdx} className="truncate">{d}</li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">Belum ada data experience.</p>
                )}
              </div>
            </div>
          </section>
        )}

        {tab === 'research' && (
          <section className="grid lg:grid-cols-2 gap-8">
            <form onSubmit={saveResearch} className="admin-panel rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold">{editingResearchId ? 'Edit Riset / Publikasi' : 'Tambah Riset Baru'}</h2>
              <Field
                label="Judul Riset / Topik (e.g. Maritime Traffic Data Analysis & Prediction)"
                value={researchItem.title}
                onChange={(value) => setResearchItem({ ...researchItem, title: value })}
              />
              <Field
                label="Institusi / Lab / Publikasi (e.g. Independent Research in Maritime Informatics · UMRAH)"
                value={researchItem.institution}
                onChange={(value) => setResearchItem({ ...researchItem, institution: value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Periode (e.g. 2024 - 2025)"
                  value={researchItem.period}
                  onChange={(value) => setResearchItem({ ...researchItem, period: value })}
                />
                <Field
                  label="Badge Kategori (e.g. AI & ML / Benchmark)"
                  placeholder="AI & ML / Publication"
                  value={researchItem.badge}
                  onChange={(value) => setResearchItem({ ...researchItem, badge: value })}
                />
              </div>
              <Field
                label="Poin-Poin Riset (Satu baris = satu poin bullet)"
                area
                placeholder="Contoh:&#10;Developed predictive models for cargo vessel arrival patterns...&#10;Conducted data preprocessing and feature engineering..."
                value={researchItem.description}
                onChange={(value) => setResearchItem({ ...researchItem, description: value })}
              />
              <div className="flex gap-3 justify-end pt-2">
                {editingResearchId && (
                  <button type="button" className="btn-muted" onClick={resetResearchForm}>
                    Batal
                  </button>
                )}
                <button type="submit" className="btn-neon" disabled={savingResearch}>
                  {savingResearch ? 'Menyimpan...' : (editingResearchId ? 'Update Riset' : 'Tambah Riset')}
                </button>
              </div>
            </form>

            <div className="admin-panel rounded-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-semibold">Daftar Riset &amp; Publikasi</h2>
                <span className="status-pill">{data.researches?.length || 0} Items</span>
              </div>
              <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
                {data.researches && data.researches.length > 0 ? (
                  data.researches.map((item) => (
                    <div className="border border-white/10 rounded-xl p-4 bg-dark-950/50" key={item.id}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-sm">{item.title}</h4>
                            {item.badge && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neon-purple/15 text-neon-purple border border-neon-purple/30">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neon-purple mt-0.5">{item.institution}</p>
                          <span className="text-[11px] text-gray-400 font-mono block mt-1">{item.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleEditResearch(item)}
                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 bg-neon-purple/15 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
                            title="Edit riset ini"
                          >
                            <i className="fa-solid fa-pen-to-square text-[10px]" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => removeResearch(item.id)}
                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
                            title="Hapus riset ini"
                          >
                            <i className="fa-solid fa-trash-can text-[10px]" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                      <ul className="text-xs text-gray-300 list-disc list-inside mt-2 space-y-1">
                        {(Array.isArray(item.description) ? item.description : String(item.description || '').split('\n').filter(Boolean)).map((d, dIdx) => (
                          <li key={dIdx} className="truncate">{d}</li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">Belum ada data riset.</p>
                )}
              </div>
            </div>
          </section>
        )}

        {tab === 'education' && (
          <section className="grid lg:grid-cols-2 gap-8">
            <form onSubmit={saveEducation} className="admin-panel rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold">{editingEducationId ? 'Edit Pendidikan' : 'Tambah Pendidikan Baru'}</h2>
              <Field
                label="Jenjang / Gelar / Jurusan (e.g. Bachelor of Informatics Engineering)"
                value={educationItem.title}
                onChange={(value) => setEducationItem({ ...educationItem, title: value })}
              />
              <Field
                label="Institusi / Universitas / Sekolah (e.g. Universitas Maritim Raja Ali Haji (UMRAH))"
                value={educationItem.institution}
                onChange={(value) => setEducationItem({ ...educationItem, institution: value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Periode (e.g. 2022 - Present)"
                  value={educationItem.period}
                  onChange={(value) => setEducationItem({ ...educationItem, period: value })}
                />
                <Field
                  label="Badge (e.g. Undergraduate / High School)"
                  placeholder="Undergraduate"
                  value={educationItem.badge}
                  onChange={(value) => setEducationItem({ ...educationItem, badge: value })}
                />
              </div>
              <Field
                label="Deskripsi / Fokus Akademik"
                area
                placeholder="Tuliskan fokus kurikulum, pencapaian akademik, atau organisasi sekolah..."
                value={educationItem.description}
                onChange={(value) => setEducationItem({ ...educationItem, description: value })}
              />
              <div className="flex gap-3 justify-end pt-2">
                {editingEducationId && (
                  <button type="button" className="btn-muted" onClick={resetEducationForm}>
                    Batal
                  </button>
                )}
                <button type="submit" className="btn-neon" disabled={savingEducation}>
                  {savingEducation ? 'Menyimpan...' : (editingEducationId ? 'Update Pendidikan' : 'Tambah Pendidikan')}
                </button>
              </div>
            </form>

            <div className="admin-panel rounded-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-semibold">Daftar Pendidikan</h2>
                <span className="status-pill">{data.educations?.length || 0} Items</span>
              </div>
              <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
                {data.educations && data.educations.length > 0 ? (
                  data.educations.map((item) => (
                    <div className="border border-white/10 rounded-xl p-4 bg-dark-950/50" key={item.id}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white text-sm">{item.title}</h4>
                            {item.badge && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neon-pink/10 text-neon-pink border border-neon-pink/20">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neon-pink mt-0.5">{item.institution}</p>
                          <span className="text-[11px] text-gray-400 font-mono block mt-1">{item.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleEditEducation(item)}
                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 bg-neon-pink/15 text-neon-pink border border-neon-pink/30 hover:bg-neon-pink hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
                            title="Edit data ini"
                          >
                            <i className="fa-solid fa-pen-to-square text-[10px]" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => removeEducation(item.id)}
                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
                            title="Hapus data ini"
                          >
                            <i className="fa-solid fa-trash-can text-[10px]" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-300 mt-2 line-clamp-3 leading-relaxed">
                        {Array.isArray(item.description) ? item.description.join(' ') : item.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">Belum ada data pendidikan.</p>
                )}
              </div>
            </div>
          </section>
        )}

        {tab === 'projects' && (
          <section className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            <form onSubmit={addProject} className="admin-panel rounded-xl p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  {editingProjectId ? 'Edit Project' : 'Tambah Project Baru'}
                </h2>
                {editingProjectId && (
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-neon-blue/20 text-neon-blue border border-neon-blue font-bold animate-pulse">
                    MODE EDIT
                  </span>
                )}
              </div>

              {editingProjectId && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-neon-blue/10 border border-neon-blue/30 text-xs text-neon-blue">
                  <span className="flex items-center gap-2 truncate">
                    <i className="fa-solid fa-pen-to-square shrink-0" />
                    <span className="truncate">Mengubah: <strong>{project.title || 'Project'}</strong></span>
                  </span>
                  <button
                    type="button"
                    onClick={resetProjectForm}
                    className="shrink-0 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                  >
                    Batal Edit
                  </button>
                </div>
              )}

              <Field
                label="Judul Project (e.g. QIQO Quiz App / Sistem Prediksi)"
                placeholder="Judul Project"
                value={project.title}
                onChange={(value) => setProject({ ...project, title: value })}
              />
              <Field
                label="Deskripsi Lengkap Project"
                area
                placeholder="Jelaskan fitur, kegunaan, dan keunggulan project..."
                value={project.description}
                onChange={(value) => setProject({ ...project, description: value })}
              />
              <Field
                label="Teknologi / Stack (Pisahkan dengan koma, e.g. Flutter, Dart, Firebase)"
                placeholder="React, Vite, Tailwind CSS"
                value={project.technologies}
                onChange={(value) => setProject({ ...project, technologies: value })}
              />
              <Field
                label="URL Project / Demo / GitHub (Opsional)"
                placeholder="https://github.com/Zyzero1/nama-project"
                value={project.url}
                onChange={(value) => setProject({ ...project, url: value })}
              />
              
              <div className="grid gap-2 text-sm pt-1">
                <span className="text-gray-300 font-medium">Gambar Cover Project</span>
                <input
                  className="form-field text-xs"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setProjectFile(event.target.files?.[0] || null)}
                />
                <Field
                  label="Atau masukkan URL Gambar langsung (Opsional)"
                  placeholder="/uploads/nama-gambar.png atau https://..."
                  value={project.image}
                  onChange={(value) => setProject({ ...project, image: value })}
                />
              </div>

              {(projectFile || project.image) && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-dark-950/60 border border-neon-blue/20">
                  <img
                    src={projectFile ? URL.createObjectURL(projectFile) : project.image}
                    alt={project.title || 'Preview cover'}
                    className="w-20 h-14 object-cover rounded-md border border-white/10"
                  />
                  <div className="text-xs min-w-0">
                    <p className="text-white font-semibold truncate">{projectFile ? `File baru: ${projectFile.name}` : 'Cover aktif'}</p>
                    <p className="text-gray-400 text-[11px] mt-0.5">Preview tampilan kartu project</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-end pt-2">
                {editingProjectId && (
                  <button type="button" className="btn-muted flex items-center gap-1.5" onClick={resetProjectForm}>
                    <i className="fa-solid fa-xmark text-xs" />
                    <span>Batal</span>
                  </button>
                )}
                <button type="submit" className="btn-neon flex items-center gap-2" disabled={savingProject}>
                  <i className="fa-solid fa-check text-xs" />
                  <span>{savingProject ? 'Menyimpan...' : (editingProjectId ? 'Update Project' : 'Tambah Project')}</span>
                </button>
              </div>
            </form>

            <div className="admin-panel rounded-xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-semibold">Daftar Project Anda</h2>
                  <p className="text-xs text-gray-400 mt-1">Kelola portofolio project yang ditampilkan ke publik</p>
                </div>
                <span className="status-pill text-xs font-semibold px-3 py-1">{data.projects?.length || 0} Projects</span>
              </div>

              {/* Box Project List with Generous Gap */}
              <div className="flex flex-col gap-6 max-h-[660px] overflow-y-auto pr-2">
                {data.projects && data.projects.length > 0 ? (
                  data.projects.map((item, index) => (
                    <div
                      className={`border rounded-2xl p-5 md:p-6 bg-dark-950/70 flex flex-col gap-5 transition-all duration-300 shadow-lg ${
                        editingProjectId === item.id
                          ? 'border-cyan-400 bg-gradient-to-b from-cyan-950/30 to-dark-950/90 shadow-[0_0_25px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/60'
                          : 'border-white/15 hover:border-cyan-500/40 hover:shadow-cyan-500/5'
                      }`}
                      key={item.id}
                    >
                      {/* Top Bar inside Card: Order Position Badge & Reorder Controls */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-white/10">
                        {/* Position Badge */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-xs ${
                              index < 3
                                ? 'bg-amber-400/15 text-amber-300 border border-amber-400/40 shadow-[0_0_10px_rgba(251,191,36,0.15)]'
                                : 'bg-white/10 text-gray-300 border border-white/15'
                            }`}
                          >
                            <span>{index < 3 ? '⭐' : '📁'}</span>
                            <span>Posisi #{index + 1}</span>
                            <span className="text-[10px] font-medium opacity-80 pl-1 border-l border-white/20">
                              {index < 3 ? 'Featured (Beranda)' : 'See More (Modal)'}
                            </span>
                          </span>
                        </div>

                        {/* Reorder Tools: Step Up/Down Buttons + Dropdown to Direct Jump */}
                        <div className="flex items-center gap-2 ml-auto">
                          {/* Step Up / Down Buttons */}
                          <div className="flex items-center bg-dark-900 border border-white/15 rounded-xl p-1 gap-1 shadow-inner">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => reorderProject(index, index - 1)}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold text-gray-300 hover:text-cyan-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                              title="Geser naik ke posisi sebelumnya"
                            >
                              <i className="fa-solid fa-arrow-up text-[10px] text-cyan-400" />
                              <span className="hidden sm:inline">Naik</span>
                            </button>
                            <button
                              type="button"
                              disabled={index === data.projects.length - 1}
                              onClick={() => reorderProject(index, index + 1)}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold text-gray-300 hover:text-cyan-300 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                              title="Geser turun ke posisi berikutnya"
                            >
                              <i className="fa-solid fa-arrow-down text-[10px] text-cyan-400" />
                              <span className="hidden sm:inline">Turun</span>
                            </button>
                          </div>

                          {/* Direct Position Selector */}
                          <div className="flex items-center gap-1.5 bg-dark-900 border border-cyan-500/30 rounded-xl px-2.5 py-1">
                            <label htmlFor={`pos-select-${item.id}`} className="text-[11px] text-gray-400">Pindah ke:</label>
                            <select
                              id={`pos-select-${item.id}`}
                              value={index}
                              onChange={(e) => reorderProject(index, parseInt(e.target.value, 10))}
                              className="bg-transparent text-cyan-300 text-xs font-bold font-mono outline-none cursor-pointer hover:text-cyan-200"
                              title="Pilih langsung urutan ke berapa"
                            >
                              {data.projects.map((_, pIdx) => (
                                <option key={pIdx} value={pIdx} className="bg-dark-950 text-white font-sans">
                                  Urutan #{pIdx + 1} {pIdx < 3 ? '⭐ (Beranda)' : '📁 (Modal)'}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      {/* Top Row: Cover Thumbnail + Information */}
                      <div className="flex gap-4 md:gap-5 items-start min-w-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-22 h-18 md:w-28 md:h-22 rounded-xl object-cover border border-white/15 shrink-0 bg-dark-900 shadow-md"
                          />
                        ) : (
                          <div className="w-22 h-18 md:w-28 md:h-22 rounded-xl bg-dark-900 border border-white/15 flex items-center justify-center shrink-0 text-cyan-400/60 shadow-md">
                            <i className="fa-solid fa-folder-open text-2xl" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-white text-base md:text-lg truncate tracking-tight">{item.title}</h4>
                            {editingProjectId === item.id && (
                              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-400 text-dark-950 font-black shrink-0 shadow-sm animate-pulse">
                                SEDANG DIEDIT
                              </span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-gray-300 mt-1.5 line-clamp-2 leading-relaxed">{item.description}</p>
                          
                          {/* Tech Stack Chips */}
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {(Array.isArray(item.technologies) ? item.technologies : []).map((tech) => (
                              <span key={tech} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Bar: Clear & Spacious */}
                      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-900/80 border border-white/10 text-xs text-gray-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-all truncate max-w-[220px]"
                            title={item.url}
                          >
                            <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-cyan-400" />
                            <span className="truncate">{item.url}</span>
                          </a>
                        ) : (
                          <span className="text-xs text-gray-500 italic flex items-center gap-1.5">
                            <i className="fa-solid fa-link-slash text-[11px]" />
                            <span>Tanpa URL publik</span>
                          </span>
                        )}

                        {/* Distinct, High-Contrast Action Buttons */}
                        <div className="flex items-center gap-2.5 ml-auto">
                          {/* Tombol Edit (Cyan Neon Pill) */}
                          <button
                            type="button"
                            onClick={() => handleEditProject(item)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 shadow-md ${
                              editingProjectId === item.id
                                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-dark-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.6)] ring-2 ring-cyan-300'
                                : 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-400/60 hover:from-cyan-400 hover:to-blue-500 hover:text-dark-950 hover:border-cyan-300 hover:shadow-[0_0_18px_rgba(6,182,212,0.5)]'
                            }`}
                            title="Edit data project ini"
                          >
                            <i className="fa-solid fa-pen-to-square text-xs" />
                            <span>{editingProjectId === item.id ? 'Sedang Diedit' : 'Edit'}</span>
                          </button>

                          {/* Tombol Hapus (Vibrant Red Pill) */}
                          <button
                            type="button"
                            onClick={() => removeProject(item.id)}
                            className="px-4 py-2 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 bg-gradient-to-r from-rose-500/20 via-red-500/20 to-rose-500/20 text-rose-300 border border-rose-500/60 hover:from-rose-500 hover:to-red-600 hover:text-white hover:border-rose-400 hover:shadow-[0_0_18px_rgba(244,63,94,0.6)] transition-all duration-200 cursor-pointer active:scale-95 shadow-md"
                            title="Hapus project ini"
                          >
                            <i className="fa-solid fa-trash-can text-xs" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-400 border border-dashed border-white/10 rounded-2xl">
                    <i className="fa-solid fa-folder-plus text-3xl text-gray-600 mb-2 block" />
                    <p className="text-sm">Belum ada project yang ditambahkan.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {tab === 'articles' && (
          <section className="admin-panel rounded-xl p-6">
            <h2 className="text-2xl font-semibold">Artikel</h2>
            <p className="text-gray-400 mt-3">Pengelolaan artikel akan disambungkan pada tahap berikutnya.</p>
          </section>
        )}
      </main>
    </div>
  );
}
function AdminGate({ data }) { const [session, setSession] = useState(null); const [loading, setLoading] = useState(true); useEffect(() => { let active = true; if (!supabase) return setLoading(false); supabase.auth.getSession().then(({ data: result }) => { if (active) { setSession(result.session); setLoading(false); } }); const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession)); return () => { active = false; listener.subscription.unsubscribe(); }; }, []); if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Memeriksa sesi...</div>; return session ? <Admin data={data} /> : <Navigate to="/admin/login" replace />; }
function App() { const data = useData(); return <Routes><Route path="/" element={<HomePage profile={data.profile} projects={data.projects} articles={data.articles} experiences={data.experiences} researches={data.researches} educations={data.educations} skillsData={data.skillsData} loading={data.loading} error={data.error} />} /><Route path="/admin/login" element={<Login />} /><Route path="/admin" element={<AdminGate data={data} />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>; }
export default App;
