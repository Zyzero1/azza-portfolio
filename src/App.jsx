import React, { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import { isSupabaseConfigured, supabase } from './lib/supabase';
import { uploadPortfolioFile, uploadPortfolioImage } from './lib/storage';

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
      supabase.from('articles').select('*').eq('published', true).order('date', { ascending: false }),
      supabase.from('experiences').select('*').order('created_at', { ascending: false })
    ])
      .then(([profileResult, projectsResult, articlesResult, expResult]) => {
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
        }

        if (expResult.status === 'fulfilled' && expResult.value.data?.length) {
          setExperiences(expResult.value.data.map((item) => ({
            ...item,
            description: Array.isArray(item.description)
              ? item.description
              : (typeof item.description === 'string' ? item.description.split('\n').filter(Boolean) : [])
          })));
        }

        if (projectsResult.status === 'fulfilled' && projectsResult.value.data?.length) {
          setProjects(projectsResult.value.data.map((item) => ({
            ...item,
            technologies: Array.isArray(item.technologies) ? item.technologies : [],
            description: item.description || ''
          })));
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
  }, [setProfile, setProjects, setArticles, setExperiences, setEducations]);

  return { profile, setProfile, projects, setProjects, articles, setArticles, experiences, setExperiences, researches, setResearches, educations, setEducations, loading, error };
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
          if (editingExpId && typeof editingExpId === 'string' && editingExpId.length > 20) {
            await supabase.from('experiences').update(payload).eq('id', editingExpId);
          } else if (!editingExpId) {
            await supabase.from('experiences').insert(payload);
          }
        } catch (err) {
          console.warn('experiences table insert fallback:', err);
        }

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
          await supabase.from('experiences').delete().eq('id', id);
        } catch {}
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
        soft_skills: data.profile.softSkills,
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
    try {
      setSavingProject(true);
      const image = projectFile ? await uploadPortfolioImage(projectFile, 'projects') : project.image || '';
      const payload = {
        title: project.title,
        description: project.description,
        technologies: project.technologies.split(',').map((item) => item.trim()).filter(Boolean),
        image,
        url: project.url,
      };

      let saved;
      let error;

      if (editingProjectId) {
        ({ data: saved, error } = await supabase.from('projects').update(payload).eq('id', editingProjectId).select().single());
        if (error) throw error;
        data.setProjects(data.projects.map((item) => (item.id === editingProjectId ? saved : item)));
        setNotice('Project berhasil diperbarui.');
      } else {
        ({ data: saved, error } = await supabase.from('projects').insert(payload).select().single());
        if (error) throw error;
        data.setProjects([saved, ...data.projects]);
        setNotice('Project ditambahkan.');
      }

      resetProjectForm();
    } catch (error) {
      setNotice(error.message);
    } finally {
      setSavingProject(false);
    }
  };

  const removeProject = async (id) => { const { error } = await supabase.from('projects').delete().eq('id', id); if (error) return setNotice(error.message); data.setProjects(data.projects.filter((item) => item.id !== id)); setNotice('Project dihapus.'); };

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
      <main className="page-container py-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Dashboard Admin</h1>
          <p className="text-gray-400 mt-2">Kelola profil, biography, experiences, project, dan artikel secara dinamis terhubung Supabase.</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {['overview', 'profile', 'experiences', 'research', 'education', 'projects', 'articles'].map((item) => (
            <button type="button" className={tab === item ? 'btn-neon' : 'btn-muted'} onClick={() => setTab(item)} key={item}>
              {item === 'experiences' ? 'Experiences' : item === 'research' ? 'Research' : item === 'education' ? 'Education' : item}
            </button>
          ))}
        </div>
        {notice && <div className="toast" onClick={() => setNotice('')}>{notice}</div>}
        
        {tab === 'overview' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              ['Profile & Bio', 'profile', 'Ready'],
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
                <p className="text-2xl font-bold mt-4">{val}</p>
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
                        <div className="flex gap-2 shrink-0">
                          <button type="button" className="text-xs text-neon-blue hover:underline" onClick={() => handleEditExp(item)}>
                            Edit
                          </button>
                          <button type="button" className="text-xs text-red-300 hover:underline" onClick={() => removeExperience(item.id)}>
                            Hapus
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
                        <div className="flex gap-2 shrink-0">
                          <button type="button" className="text-xs text-neon-purple hover:underline" onClick={() => handleEditResearch(item)}>
                            Edit
                          </button>
                          <button type="button" className="text-xs text-red-300 hover:underline" onClick={() => removeResearch(item.id)}>
                            Hapus
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
                        <div className="flex gap-2 shrink-0">
                          <button type="button" className="text-xs text-neon-pink hover:underline" onClick={() => handleEditEducation(item)}>
                            Edit
                          </button>
                          <button type="button" className="text-xs text-red-300 hover:underline" onClick={() => removeEducation(item.id)}>
                            Hapus
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
          <section className="grid lg:grid-cols-2 gap-8">
            <form onSubmit={addProject} className="admin-panel rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-semibold">{editingProjectId ? 'Edit Project' : 'Tambah Project'}</h2>
              <Field label="Judul" value={project.title} onChange={(value) => setProject({ ...project, title: value })} />
              <Field label="Deskripsi" area value={project.description} onChange={(value) => setProject({ ...project, description: value })} />
              <Field label="Teknologi, pisahkan koma" value={project.technologies} onChange={(value) => setProject({ ...project, technologies: value })} />
              <Field label="URL gambar opsional" value={project.image} onChange={(value) => setProject({ ...project, image: value })} />
              <Field label="URL project" value={project.url} onChange={(value) => setProject({ ...project, url: value })} />
              <label className="grid gap-2 text-sm">
                <span>Upload gambar project</span>
                <input className="form-field" type="file" accept="image/*" onChange={(event) => setProjectFile(event.target.files?.[0] || null)} />
              </label>
              {project.image && !projectFile && (
                <img src={project.image} alt={project.title || 'Preview project'} className="w-28 h-28 object-cover rounded-lg border border-neon-blue/10" />
              )}
              {projectFile && <p className="text-sm text-green-300">File baru siap diupload: {projectFile.name}</p>}
              <div className="flex gap-3 justify-end">
                <button type="button" className="btn-muted" onClick={resetProjectForm} hidden={!editingProjectId}>Batal</button>
                <button type="submit" className="btn-neon" disabled={savingProject}>
                  {savingProject ? (editingProjectId ? 'Menyimpan...' : 'Menambahkan...') : (editingProjectId ? 'Update Project' : 'Tambah Project')}
                </button>
              </div>
            </form>
            <div className="admin-panel rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-5">Project Anda</h2>
              {data.projects.map((item) => (
                <div className="flex justify-between border-t border-white/10 py-4 gap-4" key={item.id}>
                  <div className="min-w-0">
                    <span className="block font-medium truncate">{item.title}</span>
                    <span className="text-xs text-gray-400 block mt-1">
                      {Array.isArray(item.technologies) ? item.technologies.join(', ') : 'Tanpa teknologi'}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" className="text-neon-blue" onClick={() => handleEditProject(item)}>Edit</button>
                    <button type="button" className="text-red-300" onClick={() => removeProject(item.id)}>Hapus</button>
                  </div>
                </div>
              ))}
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
function App() { const data = useData(); return <Routes><Route path="/" element={<HomePage profile={data.profile} projects={data.projects} articles={data.articles} experiences={data.experiences} researches={data.researches} educations={data.educations} loading={data.loading} error={data.error} />} /><Route path="/admin/login" element={<Login />} /><Route path="/admin" element={<AdminGate data={data} />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>; }
export default App;
