import React, { useEffect, useRef, useState } from 'react';

const scrollSections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

function SectionTitle({ eyebrow, title, description, align = 'center', justifyDesc = false }) {
  const isLeft = align === 'left';
  return (
    <div className={`section-heading ${isLeft ? 'text-left' : 'text-center'} mb-18 md:mb-22`}>
      <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${isLeft ? 'text-left' : 'text-center'}`}><span className="teks-neon">{title}</span></h2>
      {description && (
        <p className={`section-description text-gray-400 mt-4 max-w-2xl leading-relaxed ${isLeft ? 'mr-auto ml-0 text-left' : 'mx-auto text-center'} ${justifyDesc ? 'text-justify' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}

const fallbackProjects = [
  { id: 1, title: 'QIQO', description: 'Quiz application built for an engaging learning experience with interactive questions and score tracking.', technologies: ['Dart', 'Flutter', 'Firebase'], image: '/uploads/img_686a59896c99a.png', url: 'https://github.com/Zyzero1/quiz-app-flutter' },
  { id: 2, title: 'Platform Logistik Maritim', description: 'Web platform designed for monitoring maritime logistics and cargo distribution across regional ports.', technologies: ['HTML', 'CSS', 'JavaScript'], image: '/uploads/img_685d69b42eef9.png', url: 'https://github.com/Zyzero1/Platform-Logistik-Maritim' },
  { id: 3, title: 'Smart Campus Portal', description: 'Centralized academic portal for university students to track coursework, lab schedules, and announcements.', technologies: ['PHP', 'MySQL', 'Bootstrap'], image: '/uploads/6857d876035dd.png', url: 'https://github.com/Zyzero1' },
  { id: 4, title: 'Sistem Prediksi Data Maritim', description: 'Machine learning data analysis system evaluating port traffic trends and vessel arrival predictability.', technologies: ['Python', 'Pandas', 'Scikit-Learn'], image: '/uploads/6857b80a64b73.png', url: 'https://github.com/Zyzero1' },
  { id: 5, title: 'Interactive Portfolio Web', description: 'High-performance cyberpunk portfolio website with responsive design, glassmorphism, and dynamic animations.', technologies: ['React', 'Vite', 'Tailwind CSS'], image: '/uploads/img_686a59896cbe6.png', url: 'https://github.com/Zyzero1/web-porto-azza-alkausar' },
  { id: 6, title: 'Task & Schedule Planner', description: 'Lightweight mobile application for organizing daily developer sprints, task priorities, and project milestones.', technologies: ['Dart', 'Flutter', 'Hive'], image: '/uploads/img_685a0179bbc9a.png', url: 'https://github.com/Zyzero1' }
];

const defaultAboutBio = 'Informatics Engineering student at Raja Ali Haji Maritime University (UMRAH) specializing in modern software engineering, high-performance web development, and mobile applications. Experienced in architecting end-to-end digital solutions—from responsive user interfaces to integrated backends and maritime AI/Machine Learning data analytics. Dedicated to delivering functional, clean, and user-centric digital experiences.';

const defaultExperiences = [
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

export default function HomePage({ profile, projects, experiences = [], researches = [], educations = [], loading = false, error = '' }) {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [activeAboutTab, setActiveAboutTab] = useState('experience');
  const navRef = useRef(null);
  const socials = [
    ['fa-github', 'GitHub', 'https://github.com/Zyzero1'],
    ['fa-linkedin-in', 'LinkedIn', 'https://www.linkedin.com/in/m-azza-alkausar/'],
    ['fa-instagram', 'Instagram', 'https://www.instagram.com/muhammad.azzaa_/'],
  ];

  useEffect(() => {
    const updateNavWidth = () => {
      if (navRef.current) {
        const width = navRef.current.offsetWidth;
        if (width > 0) {
          document.documentElement.style.setProperty('--header-nav-width', `${width}px`);
        }
      }
    };
    updateNavWidth();
    window.addEventListener('resize', updateNavWidth);
    return () => window.removeEventListener('resize', updateNavWidth);
  }, []);

  useEffect(() => {
    if (showProjectsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showProjectsModal]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowProjectsModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const onMove = (event) => setCursor({ x: event.clientX, y: event.clientY });
    const onScroll = () => {
      const current = scrollSections.find(({ id }) => {
        const element = document.getElementById(id);
        return element && window.scrollY + 150 >= element.offsetTop && window.scrollY + 150 < element.offsetTop + element.offsetHeight;
      });
      if (current) setActiveNav(current.id);
      setShowTopButton(window.scrollY > 600);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveNav(id);
    setMobileMenu(false);
  };
  const hoverProps = { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-neon-blue/20 border-t-neon-blue" />
          <p className="mt-6 text-lg text-gray-300">Memuat halaman portfolio...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Projects', value: `${projects.length}+` },
    { label: 'Tech Skills', value: `${profile.skills.length}+` },
    { label: 'Tools', value: `${profile.tools.length}+` },
  ];

  const projectList = (Array.isArray(projects) && projects.length >= 4)
    ? projects
    : [
        ...(Array.isArray(projects) ? projects : []),
        ...fallbackProjects.filter((fb) => !projects?.some((p) => p.title.toLowerCase() === fb.title.toLowerCase())),
      ];

  const homeProjects = projectList.slice(0, 3);
  const moreProjects = projectList.slice(3, 6);

  const renderProjectCard = (project, index) => {
    const category = project.technologies?.includes('Flutter') || project.technologies?.includes('Dart')
      ? 'MOBILE'
      : project.technologies?.includes('React') || project.technologies?.includes('HTML') || project.technologies?.includes('HTML/CSS')
      ? 'WEB'
      : project.technologies?.includes('Python') || project.technologies?.includes('C++')
      ? 'AI/ML'
      : 'PROJECT';

    return (
      <article
        className="project-card group"
        key={project.id || `${project.title}-${index}`}
        onClick={() => {
          if (project.url) window.open(project.url, '_blank', 'noopener,noreferrer');
        }}
        role={project.url ? 'button' : undefined}
        tabIndex={project.url ? 0 : undefined}
        {...hoverProps}
      >
        {/* Top Cover Image */}
        <div className="project-img-wrapper">
          <img src={project.image} alt={project.title} />
        </div>

        {/* Card Content Area */}
        <div className="project-card-content flex-1 flex flex-col justify-between text-left">
          <div>
            {/* Top Row: Category Pill on Left, Persistent External Link Icon on Right */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="project-cat-badge">
                {category}
              </span>
              <span className="project-link-icon p-0.5 ml-auto flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </div>

            {/* Bold Project Title */}
            <h3 className="project-title text-left text-lg md:text-xl font-bold mt-2.5 mb-2.5 leading-snug block group-hover:text-neon-blue transition-colors">
              {project.title}
            </h3>

            {/* 3-line Clamped Description with ellipsis */}
            <p className="project-desc-clamp text-left text-gray-400 text-xs md:text-sm mb-4 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills at the Bottom */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies?.map((tech) => (
              <span className="project-tech-chip text-[0.7rem] px-2 py-1" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="font-sans text-gray-200 min-h-screen">
      <div className={`cursor hidden md:block ${hovered ? 'expand' : ''}`} style={{ left: cursor.x, top: cursor.y }} />
      <div className={`cursor-follower hidden md:block ${hovered ? 'expand-follower' : ''}`} style={{ left: cursor.x, top: cursor.y }} />

      <header className="home-header fixed inset-x-0 top-0 z-50 bg-dark-950/90 backdrop-blur-xl border-b border-white/25">
        <div className="site-container">
          <div className="home-header-row flex items-center justify-between py-2.5">
            <button onClick={() => scrollTo('home')} className="shrink-0 flex items-center justify-start cursor-pointer" aria-label="Logo AZ - Go to Home">
              <img
                src="/logo-AZ.png"
                alt="Logo Azza Al Kausar"
                className="nav-brand-logo"
              />
            </button>

            <nav ref={navRef} className="home-nav items-center gap-8 lg:gap-10">
              {scrollSections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`nav-link text-sm text-white hover:text-neon-blue ${activeNav === id ? 'active text-neon-blue' : ''}`}
                  {...hoverProps}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-5">
              {/* Icon GitHub & LinkedIn digeser ke kiri (sebelum Contact Me) */}
              <div className="header-social-group flex items-center gap-3.5">
                <a
                  href="https://github.com/Zyzero1"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                  className="header-social-link"
                  {...hoverProps}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/m-azza-alkausar/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                  className="header-social-link"
                  {...hoverProps}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              </div>

              <button onClick={() => scrollTo('contact')} className="home-nav-cta btn-neon py-2! px-5! text-sm hidden md:inline-flex items-center" {...hoverProps}>
                Contact Me
              </button>

              <button
                className="home-menu-button text-white text-2xl leading-none"
                onClick={() => setMobileMenu((open) => !open)}
                aria-label="Open menu"
                aria-expanded={mobileMenu}
              >
                {mobileMenu ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {mobileMenu && (
            <nav className="home-mobile-nav pb-4 grid gap-1 border-t border-neon-blue/10 pt-4">
              {scrollSections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`text-left ${activeNav === id ? 'text-neon-blue' : 'text-white'}`}
                >
                  {label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {error && (
        <div className="site-container pt-24 md:pt-28">
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{error}</div>
        </div>
      )}

      <main>
        {/* HERO — fills the viewport under the header */}
        <section id="home" className="relative grid-bg overflow-hidden scroll-mt-20 flex flex-col min-h-screen pt-28 md:pt-32">
          <div className="site-container relative z-10 flex-1 grid md:grid-cols-2 gap-10 lg:gap-16 items-center pt-4 md:pt-8 pb-12">
            <div className="min-w-0">
              {/* Role pill badge with pulsing dot */}
              <div className="hero-role-badge inline-flex items-center gap-3 px-5 py-2 rounded-full mb-4">
                <span className="hero-status-dot" />
                <span className="text-sm md:text-base font-semibold tracking-wider uppercase text-neon-blue">
                  {profile.role}
                </span>
              </div>

              {/* Massive Name Display */}
              <h1 className="mt-1 mb-4">
                <span className="hero-title-name text-white">
                  {profile.name.includes('Al Kausar') ? (
                    <>
                      {profile.name.replace('Al Kausar', '').trim()}{' '}
                      <span className="teks-neon">Al Kausar</span>
                    </>
                  ) : (
                    <span className="teks-neon">{profile.name}</span>
                  )}
                </span>
              </h1>

              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-6 leading-relaxed">{profile.bio}</p>

              {/* Action Buttons */}
              <div className="hero-actions flex flex-wrap gap-4">
                <button onClick={() => scrollTo('contact')} className="hero-contact-button" {...hoverProps}>
                  <i className="fa-solid fa-envelope" />Contact Me
                </button>
                <button onClick={() => scrollTo('projects')} className="hero-project-button" {...hoverProps}>
                  <i className="fa-solid fa-folder-open" />View Projects
                </button>
              </div>

              {/* Stats Counters (Static, no hover/animation) */}
              <div className="hero-stats grid grid-cols-3 gap-3.5 max-w-md">
                {stats.map((stat) => (
                  <div className="kartu-transparan stat-card rounded-xl px-3 py-3 min-h-[76px] flex flex-col justify-center items-center text-center" key={stat.label}>
                    <p className="text-xl md:text-2xl font-bold text-neon-pink leading-none">{stat.value}</p>
                    <p className="text-gray-400 text-[0.65rem] md:text-[0.72rem] mt-1.5 uppercase tracking-wider leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="flex gap-4">
                {socials.map(([icon, label, url]) => (
                  <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label} className="social-icon" {...hoverProps}>
                    <i className={`fab ${icon}`} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="relative">
                {/* Premium card photo frame */}
                <div className="profile-card-frame">
                  <img src={profile.image} alt={profile.name} className="profile-card-img" />
                  <div className="profile-card-overlay" />
                </div>

                {/* Floating skill badges */}
                {profile.skills[0] && (
                  <span className="floating kartu-transparan absolute -left-10 top-10 px-4 py-2 rounded-xl text-sm hidden sm:flex items-center gap-2" style={{ animationDelay: '.6s' }}>
                    <i className="fa-solid fa-bolt text-neon-blue" />{profile.skills[0][0]}
                  </span>
                )}
                {profile.skills[1] && (
                  <span className="floating kartu-transparan absolute -right-8 bottom-16 px-4 py-2 rounded-xl text-sm hidden sm:flex items-center gap-2" style={{ animationDelay: '1.2s' }}>
                    <i className="fa-solid fa-code text-neon-purple" />{profile.skills[1][0]}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button onClick={() => scrollTo('about')} className="mx-auto mb-8 flex flex-col items-center gap-2 text-gray-500 hover:text-neon-blue transition-colors" aria-label="Scroll down">
            <span className="text-xs uppercase tracking-[.3em]">Scroll</span>
            <i className="fa-solid fa-chevron-down animate-bounce" />
          </button>
        </section>

        <section id="about" className="homepage-section py-20 md:py-24 bg-dark-900/50 scroll-mt-20">
          <div className="site-container">
            <SectionTitle
              eyebrow="Profile & Background"
              title="About Me"
              description="Perjalanan profesional, rekam jejak akademik, dan riset teknologi yang saya kembangkan."
            />

            {/* ── Side-by-Side Samping Kiri Kanan: 1 Baris 2 Kolom (Kiri Kurus 35% & Kanan Lebar 65%) ── */}
            <div className="about-side-by-side-grid">

              {/* ── SISI KIRI: Box Biography (Lebih Kurus & Ramping) ── */}
              <div className="kartu-transparan rounded-2xl p-6 md:p-7 flex flex-col justify-between relative overflow-hidden h-full">
                <div>
                  {/* Top Badge (Dinaikkan, Lebih Lega & Sudut Lebih Tumpul) */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-neon-blue/20">
                    <span
                      className="text-[11px] font-mono font-bold px-4 py-2 rounded-xl tracking-wider"
                      style={{
                        color: '#00f0ff',
                        background: 'rgba(0, 240, 255, 0.12)',
                        border: '1px solid #00f0ff',
                        boxShadow: '0 0 12px rgba(0, 240, 255, 0.25)'
                      }}
                    >
                      Biography
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {profile.availability || 'Available for Work'}
                    </span>
                  </div>

                  {/* Name, Role & Bio (Satu Container Flex dengan Gap Presisi Tanpa mb) */}
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex flex-col gap-1">
                      <h3
                        className="font-bold text-white tracking-tight text-left leading-tight"
                        style={{ fontSize: 'clamp(22px, 3vw, 22px)' }}
                      >
                        {profile.name}
                      </h3>
                      <p className="text-xs md:text-sm font-semibold text-neon-blue text-left tracking-wide">
                        {profile.role || 'Full-Stack & Mobile Developer'}
                      </p>
                    </div>

                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed text-left">
                      {profile.aboutBio || defaultAboutBio}
                    </p>
                  </div>

                  {/* Contact Info Pills */}
                  <div className="flex flex-col gap-2.5 mb-5 pt-3.5 border-t border-neon-blue/15 text-xs text-gray-300">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md bg-neon-blue/10 flex items-center justify-center text-neon-blue shrink-0 text-xs">
                        <i className="fa-solid fa-location-dot" />
                      </div>
                      <span className="text-[11px] truncate">{profile.location || 'Tanjung Balai Karimun, Indonesia'}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md bg-neon-blue/10 flex items-center justify-center text-neon-blue shrink-0 text-xs">
                        <i className="fa-solid fa-envelope" />
                      </div>
                      <span className="font-mono text-[11px] text-gray-200 truncate">{profile.email || 'azza.alkausar@gmail.com'}</span>
                    </div>
                  </div>
                </div>

                {/* Actions: Download CV & LinkedIn (Diturunkan Sedikit dengan Spacing Lebih Lapang) */}
                <div className="flex flex-col gap-2.5 pt-6 border-t border-neon-blue/15 mt-6">
                  <a
                    href={profile.cvUrl || profile.cv_url || '/uploads/img_686a5952b576b.jpg'}
                    target="_blank"
                    rel="noreferrer"
                    download={profile.cvUrl || profile.cv_url ? true : `CV_${(profile.name || 'Muhammad_Azza_Al_Kausar').replace(/\s+/g, '_')}.pdf`}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    style={{
                      background: '#00f0ff',
                      color: '#050b17',
                      boxShadow: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#00d8e6';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#00f0ff';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <i className="fa-solid fa-file-arrow-down text-sm" style={{ color: '#050b17' }} />
                    <span style={{ color: '#050b17' }}>Download CV (PDF)</span>
                  </a>

                  <a
                    href={profile.linkedin || 'https://www.linkedin.com/in/m-azza-alkausar/'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#06101e]/80 hover:bg-[#08172c] text-white font-semibold text-xs md:text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    style={{
                      border: '1.5px solid #00f0ff',
                      boxShadow: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#00d8e6';
                      e.currentTarget.style.color = '#00f0ff';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#00f0ff';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <i className="fa-brands fa-linkedin text-neon-blue text-sm" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* ── SISI KANAN: Box Interactive Journey / Experience (Jauh Lebih Lebar) ── */}
              <div className="kartu-transparan rounded-2xl p-6 md:p-8 lg:p-9 flex flex-col justify-between h-full">
                {/* Interactive Navigation Tabs */}
                <div
                  className="flex flex-wrap items-center justify-between gap-3 mb-7 pb-4 border-b transition-colors duration-300"
                  style={{
                    borderColor: activeAboutTab === 'experience'
                      ? 'rgba(0, 240, 255, 0.25)'
                      : activeAboutTab === 'research'
                      ? 'rgba(167, 139, 250, 0.25)'
                      : 'rgba(244, 114, 182, 0.25)'
                  }}
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    {[
                      { id: 'experience', label: 'Experience', icon: 'fa-solid fa-briefcase', color: '#00f0ff' },
                      { id: 'research',   label: 'Research',   icon: 'fa-solid fa-flask-vial', color: '#a78bfa' },
                      { id: 'education',  label: 'Education',  icon: 'fa-solid fa-graduation-cap', color: '#f472b6' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveAboutTab(tab.id)}
                        className={`about-tab-btn ${activeAboutTab === tab.id ? 'active' : ''}`}
                        style={activeAboutTab === tab.id ? { borderColor: tab.color, color: tab.color, boxShadow: `0 0 14px ${tab.color}35` } : {}}
                      >
                        <i className={tab.icon} style={{ color: activeAboutTab === tab.id ? tab.color : 'inherit' }} />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  <span
                    className="text-[11px] font-mono font-bold px-4 py-2 rounded-lg tracking-wider hidden sm:inline-block"
                    style={{
                      color: activeAboutTab === 'experience' ? '#00f0ff' : activeAboutTab === 'research' ? '#a78bfa' : '#f472b6',
                      background: activeAboutTab === 'experience' ? 'rgba(0, 240, 255, 0.12)' : activeAboutTab === 'research' ? 'rgba(167, 139, 250, 0.12)' : 'rgba(244, 114, 182, 0.12)',
                      border: `1px solid ${activeAboutTab === 'experience' ? '#00f0ff' : activeAboutTab === 'research' ? '#a78bfa' : '#f472b6'}`,
                      boxShadow: `0 0 10px ${activeAboutTab === 'experience' ? 'rgba(0, 240, 255, 0.25)' : activeAboutTab === 'research' ? 'rgba(167, 139, 250, 0.25)' : 'rgba(244, 114, 182, 0.25)'}`
                    }}
                  >
                    {activeAboutTab === 'experience' ? 'Track Record' : activeAboutTab === 'research' ? 'Research Log' : 'Academic'}
                  </span>
                </div>

                {/* Tab Content Display Area with Smooth Scrollbar if long */}
                <div className="custom-about-scroll overflow-y-auto max-h-[600px] pr-2 flex flex-col gap-6">

                  {/* 1. PROFESSIONAL EXPERIENCE */}
                  {activeAboutTab === 'experience' && (
                    <div className="flex flex-col gap-5 animate-fadeIn text-left">
                      {(experiences && experiences.length > 0 ? experiences : defaultExperiences).map((item, idx) => (
                        <div key={item.id || idx} className="about-timeline-card border-l-[3.5px] border-neon-blue text-left shadow-lg shadow-neon-blue/5">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2.5 text-left">
                            <h4 className="text-base font-bold text-white flex flex-wrap items-center gap-2.5 text-left justify-start">
                              <span className="text-left">{item.title}</span>
                              {item.badge && (
                                <span className="text-[11px] font-mono px-3 py-1 rounded-md bg-neon-blue/10 text-neon-blue border border-neon-blue shrink-0 font-semibold tracking-wide">
                                  {item.badge}
                                </span>
                              )}
                            </h4>
                            <span className="text-xs font-mono font-semibold shrink-0 text-left sm:text-right text-neon-blue">
                              {item.period}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-neon-blue/90 mb-3.5 flex items-center gap-2 text-left justify-start">
                            <i className="fa-solid fa-building text-neon-blue text-xs shrink-0" />
                            <span className="text-left">{item.company}</span>
                          </p>
                          <ul className="text-xs text-gray-300 space-y-2.5 list-disc list-inside leading-relaxed text-left">
                            {(Array.isArray(item.description) ? item.description : String(item.description || '').split('\n').filter(Boolean)).map((desc, dIdx) => (
                              <li key={dIdx} className="text-left">{desc}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 2. RESEARCH & PUBLICATIONS */}
                  {activeAboutTab === 'research' && (
                    <div className="flex flex-col gap-5 animate-fadeIn text-left">
                      {(researches && researches.length > 0 ? researches : defaultResearches).map((item, idx) => (
                        <div key={item.id || idx} className="about-timeline-card border-l-[3.5px] border-neon-purple text-left shadow-lg shadow-neon-purple/5">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2.5 text-left">
                            <h4 className="text-base font-bold text-white flex flex-wrap items-center gap-2.5 text-left justify-start">
                              <span className="text-left">{item.title}</span>
                              {item.badge && (
                                <span className="text-[11px] font-mono px-3 py-1 rounded-md bg-neon-purple/10 text-neon-purple border border-neon-purple shrink-0 font-semibold tracking-wide">
                                  {item.badge}
                                </span>
                              )}
                            </h4>
                            <span className="text-xs font-mono font-semibold shrink-0 text-left sm:text-right text-neon-purple">
                              {item.period}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-neon-purple/90 mb-3.5 flex items-center gap-2 text-left justify-start">
                            <i className="fa-solid fa-microchip text-neon-purple text-xs shrink-0" />
                            <span className="text-left">{item.institution || item.company}</span>
                          </p>
                          <ul className="text-xs text-gray-300 space-y-2.5 list-disc list-inside leading-relaxed text-left">
                            {(Array.isArray(item.description) ? item.description : String(item.description || '').split('\n').filter(Boolean)).map((desc, dIdx) => (
                              <li key={dIdx} className="text-left">{desc}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 3. FORMAL EDUCATION */}
                  {activeAboutTab === 'education' && (
                    <div className="flex flex-col gap-5 animate-fadeIn text-left">
                      {(educations && educations.length > 0 ? educations : defaultEducations).map((item, idx) => (
                        <div key={item.id || idx} className="about-timeline-card border-l-[3.5px] border-neon-pink text-left shadow-lg shadow-neon-pink/5">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2.5 text-left">
                            <h4 className="text-base font-bold text-white flex flex-wrap items-center gap-2.5 text-left justify-start">
                              <span className="text-left">{item.title}</span>
                              {item.badge && (
                                <span className="text-[11px] font-mono px-3 py-1 rounded-md bg-neon-pink/10 text-neon-pink border border-neon-pink shrink-0 font-semibold tracking-wide">
                                  {item.badge}
                                </span>
                              )}
                            </h4>
                            <span className="text-xs font-mono font-semibold shrink-0 text-left sm:text-right text-neon-pink">
                              {item.period}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-neon-pink/90 mb-3.5 flex items-center gap-2 text-left justify-start">
                            <i className="fa-solid fa-university text-neon-pink text-xs shrink-0" />
                            <span className="text-left">{item.institution || item.company}</span>
                          </p>
                          <p className="text-xs text-gray-300 leading-relaxed text-left">
                            {Array.isArray(item.description) ? item.description.join(' ') : item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* Bottom Status Footer */}
                <div
                  className="pt-5 mt-7 border-t flex items-center justify-between text-xs text-gray-400 transition-colors duration-300"
                  style={{
                    borderColor: activeAboutTab === 'experience'
                      ? 'rgba(0, 240, 255, 0.2)'
                      : activeAboutTab === 'research'
                      ? 'rgba(167, 139, 250, 0.2)'
                      : 'rgba(244, 114, 182, 0.2)'
                  }}
                >
                  <span className="flex items-center gap-2">
                    <i
                      className="fa-solid fa-circle-check transition-colors duration-300"
                      style={{
                        color: activeAboutTab === 'experience' ? '#00f0ff' : activeAboutTab === 'research' ? '#a78bfa' : '#f472b6'
                      }}
                    />
                    <span>Verified Academic &amp; Experience Track</span>
                  </span>
                  <span
                    className="font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors duration-300"
                    style={{
                      color: activeAboutTab === 'experience' ? '#00f0ff' : activeAboutTab === 'research' ? '#a78bfa' : '#f472b6'
                    }}
                  >
                    {activeAboutTab.toUpperCase()} OVERVIEW
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="skills" className="homepage-section py-20 md:py-24 scroll-mt-20">
          <div className="site-container">
            <SectionTitle eyebrow="Capabilities" title="Technical Proficiency" description="Tools and skills I use to turn ideas into useful digital products." />

            {/* ── 2 Atas 2 Bawah Grid Layout ── */}
            <div className="skills-2x2-container flex flex-col gap-8">

              {/* ── TOP ROW: 2 Box (Pentagon Chart & Language Proficiency) ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Box 1: Pentagon Radar Chart (Synchronized with Languages) */}
                <div className="kartu-transparan rounded-2xl p-7 md:p-9 flex flex-col items-center justify-between">
                  <div className="w-full flex items-center justify-end mb-6 pb-4 border-b border-neon-blue/20">
                    <span
                      className="text-[11px] font-mono font-bold px-4 py-2 rounded-lg tracking-wider"
                      style={{
                        color: '#00f0ff',
                        background: 'rgba(0, 240, 255, 0.12)',
                        border: '1px solid #00f0ff',
                        boxShadow: '0 0 10px rgba(0, 240, 255, 0.25)'
                      }}
                    >
                      Language Metrics
                    </span>
                  </div>

                  <div className="radar-chart-wrapper relative flex items-center justify-center my-auto py-4">
                    <svg viewBox="0 0 300 300" className="radar-svg" width="270" height="270">
                      {/* Grid rings */}
                      {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
                        <polygon
                          key={i}
                          className="radar-grid-ring"
                          points={[0,1,2,3,4].map(j => {
                            const angle = (Math.PI * 2 * j) / 5 - Math.PI / 2;
                            return `${150 + 105 * r * Math.cos(angle)},${150 + 105 * r * Math.sin(angle)}`;
                          }).join(' ')}
                          fill="none" stroke="rgba(0,240,255,0.18)" strokeWidth="1"
                          style={{ animationDelay: `${0.05 + i * 0.06}s` }}
                        />
                      ))}
                      {/* Spokes with subtle neon cyan color */}
                      {[0,1,2,3,4].map(j => {
                        const angle = (Math.PI * 2 * j) / 5 - Math.PI / 2;
                        return <line key={j} x1="150" y1="150" x2={150 + 105 * Math.cos(angle)} y2={150 + 105 * Math.sin(angle)} stroke="rgba(0,240,255,0.22)" strokeWidth="1" strokeDasharray="3 3" />;
                      })}
                      {/* Data polygon matching language percentages: HTML/CSS (90%), JS (80%), PHP (80%), Python (67%), Dart (60%) */}
                      {(() => {
                        const langData = [
                          { name: 'HTML / CSS', pct: 0.90, color: '#E34F26' },
                          { name: 'JavaScript', pct: 0.80, color: '#F7DF1E' },
                          { name: 'PHP',        pct: 0.80, color: '#777BB4' },
                          { name: 'Python',     pct: 0.67, color: '#3776AB' },
                          { name: 'Dart',       pct: 0.60, color: '#0175C2' },
                        ];
                        const pts = langData.map((item, j) => {
                          const angle = (Math.PI * 2 * j) / 5 - Math.PI / 2;
                          return `${150 + 105 * item.pct * Math.cos(angle)},${150 + 105 * item.pct * Math.sin(angle)}`;
                        }).join(' ');
                        return (
                          <>
                            <polygon points={pts} fill="rgba(0,240,255,0.12)" stroke="#00f0ff" strokeWidth="2" className="radar-polygon" />
                            {langData.map((item, j) => {
                              const angle = (Math.PI * 2 * j) / 5 - Math.PI / 2;
                              return (
                                <circle
                                  key={j}
                                  cx={150 + 105 * item.pct * Math.cos(angle)}
                                  cy={150 + 105 * item.pct * Math.sin(angle)}
                                  r="5.5"
                                  fill={item.color}
                                  className="radar-dot"
                                  style={{ '--dot-delay': `${1.3 + j * 0.12}s`, filter: `drop-shadow(0 0 7px ${item.color})` }}
                                />
                              );
                            })}
                          </>
                        );
                      })()}
                      {/* Axis labels with matching custom brand colors (no plain white) */}
                      {[
                        { label: 'HTML / CSS', x: 150, y: 24,  anchor: 'middle', col: '#E34F26', pct: '90%' },
                        { label: 'JavaScript', x: 272, y: 114, anchor: 'start',  col: '#F7DF1E', pct: '80%' },
                        { label: 'PHP',        x: 236, y: 260, anchor: 'start',  col: '#777BB4', pct: '80%' },
                        { label: 'Python',     x: 64,  y: 260, anchor: 'end',    col: '#3776AB', pct: '67%' },
                        { label: 'Dart',       x: 28,  y: 114, anchor: 'end',    col: '#0175C2', pct: '60%' },
                      ].map((item, i) => (
                        <text key={i} x={item.x} y={item.y} textAnchor={item.anchor} dominantBaseline="middle"
                          fill={item.col} fontSize="11" fontFamily="Outfit, sans-serif" fontWeight="700"
                          style={{ filter: `drop-shadow(0 0 8px ${item.col}55)` }}>
                          {item.label}
                        </text>
                      ))}
                    </svg>
                    <div className="radar-center-glow" />
                  </div>

                  {/* Synchronized Language Badges (Border line sesuai warna indikatornya, sudut tumpul proporsional) */}
                  <div className="w-full flex flex-wrap justify-center gap-2.5 pt-4 mt-3 border-t border-neon-blue/20">
                    {[
                      { name: 'HTML/CSS', pct: 90, color: '#E34F26' },
                      { name: 'JavaScript', pct: 80, color: '#F7DF1E' },
                      { name: 'PHP', pct: 80, color: '#777BB4' },
                      { name: 'Python', pct: 67, color: '#3776AB' },
                      { name: 'Dart', pct: 60, color: '#0175C2' },
                    ].map((d) => (
                      <span
                        key={d.name}
                        className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-dark-950/85 text-xs transition-transform hover:scale-105"
                        style={{
                          border: `1px solid ${d.color}75`,
                          boxShadow: `0 0 8px ${d.color}25`
                        }}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
                        <span className="text-[11px] font-medium text-gray-200">{d.name}</span>
                        <span className="text-[11px] font-mono font-bold" style={{ color: d.color }}>{d.pct}%</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Box 2: Language Proficiency */}
                <div className="kartu-transparan rounded-2xl p-7 md:p-9 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-neon-purple/20">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-neon-purple/15 flex items-center justify-center text-neon-purple text-sm shadow-[0_0_12px_rgba(167,139,250,0.25)]">
                        <i className="fa-solid fa-code" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-neon-purple/90">Language Proficiency</span>
                    </div>
                    <span
                      className="text-[11px] font-mono font-bold px-4 py-2 rounded-lg tracking-wider"
                      style={{
                        color: '#a78bfa',
                        background: 'rgba(167, 139, 250, 0.12)',
                        border: '1px solid #a78bfa',
                        boxShadow: '0 0 10px rgba(167, 139, 250, 0.25)'
                      }}
                    >
                      Core Stack
                    </span>
                  </div>

                  <div className="flex flex-col gap-5 flex-1 justify-center my-2">
                    {[
                      { skill: 'HTML / CSS',  level: 90, color: '#E34F26', icon: 'fa-brands fa-html5' },
                      { skill: 'JavaScript',  level: 80, color: '#F7DF1E', icon: 'fa-brands fa-js' },
                      { skill: 'PHP',         level: 80, color: '#777BB4', icon: 'fa-brands fa-php' },
                      { skill: 'Python',      level: 67, color: '#3776AB', icon: 'fa-brands fa-python' },
                      { skill: 'Dart',        level: 60, color: '#0175C2', icon: 'fa-solid fa-mobile-screen' },
                    ].map((s) => (
                      <div key={s.skill} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2.5">
                            <i className={`${s.icon} text-base transition-transform group-hover:scale-110`} style={{ color: s.color }} />
                            <span className="text-xs font-semibold text-gray-200 tracking-wide">{s.skill}</span>
                          </div>
                          <span
                            className="text-xs font-bold font-mono px-2 py-0.5 rounded"
                            style={{
                              color: s.color,
                              background: `${s.color}15`,
                              border: `1px solid ${s.color}50`
                            }}
                          >
                            {s.level}%
                          </span>
                        </div>
                        <div
                          className="skill-bar-track h-2.5 bg-dark-950/90 rounded-full overflow-hidden p-0.5"
                          style={{ border: `1px solid ${s.color}30` }}
                        >
                          <div
                            className="skill-bar-fill h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${s.level}%`,
                              background: `linear-gradient(90deg, ${s.color}70, ${s.color})`,
                              boxShadow: `0 0 10px ${s.color}40`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 mt-2 border-t border-neon-purple/20 flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] text-gray-400">Actively practicing & refining code</span>
                    </span>
                    <span className="text-[11px] font-mono text-neon-blue">5 Languages</span>
                  </div>
                </div>

              </div>

              {/* ── LANTAI 2: Box Technologies & Frameworks (Full Width) ── */}
              <div className="w-full kartu-transparan rounded-2xl p-7 md:p-9">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-neon-blue/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neon-blue/15 flex items-center justify-center text-neon-blue text-sm shadow-[0_0_12px_rgba(0,240,255,0.25)]">
                      <i className="fa-solid fa-layer-group" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-neon-blue/90">Technologies & Frameworks</span>
                  </div>
                  <span
                    className="text-[11px] font-mono font-bold px-4 py-2 rounded-lg tracking-wider"
                    style={{
                      color: '#00f0ff',
                      background: 'rgba(0, 240, 255, 0.12)',
                      border: '1px solid #00f0ff',
                      boxShadow: '0 0 10px rgba(0, 240, 255, 0.25)'
                    }}
                  >
                    15 Stack Items
                  </span>
                </div>

                {/* Subgroups Container */}
                <div className="flex flex-col gap-6">
                  {/* Subgroup 1: Programming & Markup */}
                  <div className="p-5 md:p-6 rounded-xl bg-dark-950/40">
                    <p className="text-[11px] font-bold text-neon-blue uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_8px_#00f0ff]" />
                      <span>Programming & Markup</span>
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { name: 'HTML5',      icon: 'fa-brands fa-html5',    color: '#E34F26' },
                        { name: 'CSS3',       icon: 'fa-brands fa-css3-alt', color: '#1572B6' },
                        { name: 'JavaScript', icon: 'fa-brands fa-js',       color: '#F7DF1E' },
                        { name: 'PHP',        icon: 'fa-brands fa-php',      color: '#777BB4' },
                        { name: 'Python',     icon: 'fa-brands fa-python',   color: '#3776AB' },
                        { name: 'Dart', color: '#0175C2', customIcon: (
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                            <path d="M4.1 12.8L12.5 4.4H18.8L7.8 15.4Z" fill="#00D2B8"/>
                            <path d="M12.5 4.4L4.1 12.8L8.6 20.6H18.8Z" fill="#01579B"/>
                            <path d="M7.8 15.4L8.6 20.6H19.9L18.8 4.4Z" fill="#29B6F2"/>
                          </svg>
                        )},
                        { name: 'C++', color: '#659AD2', customIcon: <span className="w-4 h-4 text-[9px] font-black bg-[#00599c]/35 rounded flex items-center justify-center text-[#659ad2]">C++</span> },
                      ].map((t) => (
                        <div key={t.name} className="tech-badge" style={{ '--tech-color': t.color }}>
                          {t.customIcon ? t.customIcon : <i className={`${t.icon} text-base`} style={{ color: t.color }} />}
                          <span className="text-xs font-semibold">{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subgroup 2: Frameworks, Libraries & Database */}
                  <div className="p-5 md:p-6 rounded-xl bg-dark-950/40">
                    <p className="text-[11px] font-bold text-neon-purple uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_8px_#a78bfa]" />
                      <span>Frameworks, Libraries & Database</span>
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { name: 'Flutter', color: '#54C5F8', customIcon: (
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                            <path d="M14.3 2L4 12.3L7.2 15.5L20.7 2Z" fill="#42A5F5"/>
                            <path d="M14.3 12.3L9 17.6L12.2 20.8L20.7 12.3Z" fill="#0288D1"/>
                            <path d="M9 17.6L12.2 14.4L15.4 17.6L12.2 20.8Z" fill="#01579B"/>
                          </svg>
                        )},
                        { name: 'React',       icon: 'fa-brands fa-react',     color: '#61DAFB' },
                        { name: 'Laravel',     icon: 'fa-brands fa-laravel',   color: '#FF2D20' },
                        { name: 'Bootstrap',   icon: 'fa-brands fa-bootstrap', color: '#7952B3' },
                        { name: 'MySQL',       icon: 'fa-solid fa-database',   color: '#4479A1' },
                        { name: 'Firebase',    icon: 'fa-solid fa-fire',       color: '#FFA611' },
                        { name: 'Android SDK', icon: 'fa-brands fa-android',   color: '#3DDC84' },
                        { name: 'Tailwind',    icon: 'fa-solid fa-wind',       color: '#38BDF8' },
                      ].map((t) => (
                        <div key={t.name} className="tech-badge" style={{ '--tech-color': t.color }}>
                          {t.customIcon ? t.customIcon : <i className={`${t.icon} text-base`} style={{ color: t.color }} />}
                          <span className="text-xs font-semibold">{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── LANTAI 3: Box Tools & Workflow (Full Width, Panjang Sama dengan Lantai 2) ── */}
              <div className="w-full kartu-transparan rounded-2xl p-7 md:p-9">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-neon-pink/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neon-pink/15 flex items-center justify-center text-neon-pink text-sm shadow-[0_0_12px_rgba(244,114,182,0.25)]">
                      <i className="fa-solid fa-toolbox" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-neon-pink/90">Tools & Workflow</span>
                  </div>
                  <span
                    className="text-[11px] font-mono font-bold px-4 py-2 rounded-lg tracking-wider"
                    style={{
                      color: '#f472b6',
                      background: 'rgba(244, 114, 182, 0.12)',
                      border: '1px solid #f472b6',
                      boxShadow: '0 0 10px rgba(244, 114, 182, 0.25)'
                    }}
                  >
                    Daily Stack
                  </span>
                </div>

                {/* Grid 6 Tool Cards di Desktop (2 baris di mobile, 3 di tablet, 6 di desktop) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                  {[
                    { name: 'Figma',      sub: 'UI/UX Design',      icon: 'fa-brands fa-figma',      color: '#F24E1E' },
                    { name: 'VS Code',    sub: 'Code Editor',       icon: 'fa-solid fa-code',         color: '#007ACC' },
                    { name: 'Git',        sub: 'Version Control',   icon: 'fa-brands fa-git-alt',     color: '#F54D27' },
                    { name: 'GitHub',     sub: 'Code Hosting',      icon: 'fa-brands fa-github',      color: '#6e5494' },
                    { name: 'Postman',    sub: 'API Testing',       icon: 'fa-solid fa-paper-plane',  color: '#FF6C37' },
                    { name: 'MS Office',  sub: 'Docs & Data',       icon: 'fa-solid fa-file-lines',   color: '#D83B01' },
                  ].map((tool) => (
                    <div key={tool.name} className="tool-detail-card" style={{ '--tool-color': tool.color }}>
                      <div
                        className="tool-icon-box"
                        style={{ background: `${tool.color}18`, color: tool.color }}
                      >
                        <i className={`${tool.icon} text-lg`} />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <h5 className="text-xs font-bold text-white truncate text-left">{tool.name}</h5>
                        <p className="text-[10px] text-gray-400 truncate mt-0.5 text-left">{tool.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── LANTAI 4: Box Interpersonal Skills (Berdiri Sendiri Sebagai Lantai Khusus, Full Width) ── */}
              <div className="w-full kartu-transparan rounded-2xl p-7 md:p-9">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-500/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 text-sm shadow-[0_0_12px_rgba(52,211,153,0.25)]">
                      <i className="fa-solid fa-users-gear" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400/90">Interpersonal Skills</span>
                  </div>
                  <span
                    className="text-[11px] font-mono font-bold px-4 py-2 rounded-lg tracking-wider"
                    style={{
                      color: '#34d399',
                      background: 'rgba(52, 211, 153, 0.12)',
                      border: '1px solid #34d399',
                      boxShadow: '0 0 10px rgba(52, 211, 153, 0.25)'
                    }}
                  >
                    Key Strengths
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {[
                    { name: 'Problem Solving',     sub: 'Analytical & Creative',     icon: 'fa-solid fa-lightbulb',        color: '#00f0ff' },
                    { name: 'Team Collaboration',  sub: 'Cross-functional Synergy', icon: 'fa-solid fa-people-group',      color: '#a78bfa' },
                    { name: 'Effective Communication', sub: 'Clear & Articulate',    icon: 'fa-solid fa-comments',          color: '#f472b6' },
                    { name: 'Adaptive & Agile',    sub: 'Quick Continuous Learner',  icon: 'fa-solid fa-bolt',              color: '#34d399' },
                  ].map((skill) => (
                    <div key={skill.name} className="tool-detail-card" style={{ '--tool-color': skill.color }}>
                      <div
                        className="tool-icon-box"
                        style={{ background: `${skill.color}18`, color: skill.color }}
                      >
                        <i className={`${skill.icon} text-lg`} />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <h5 className="text-xs font-bold text-white truncate text-left">{skill.name}</h5>
                        <p className="text-[10px] text-gray-400 truncate mt-0.5 text-left">{skill.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>


        <section id="projects" className="homepage-section py-20 md:py-24 bg-dark-900/50 scroll-mt-20">
          <div className="site-container">
            <SectionTitle eyebrow="Selected work" title="Featured Projects" description="Koleksi proyek pilihan yang pernah saya rancang dan kembangkan, menggabungkan fungsionalitas dan desain modern." />
            
            <div className="flex flex-wrap justify-center gap-6 mx-auto">
              {homeProjects.map((project, index) => renderProjectCard(project, index))}
            </div>

            {/* See More Projects Button */}
            <div className="see-more-wrapper flex justify-center mt-14 md:mt-16 w-full">
              <button
                type="button"
                onClick={() => setShowProjectsModal(true)}
                className="see-more-projects-btn"
                {...hoverProps}
              >
                <span>See More</span>
                <i className="fa-solid fa-arrow-right text-xs" />
              </button>
            </div>
          </div>
        </section>


        <section id="contact" className="homepage-section py-20 md:py-24 scroll-mt-20">
          <div className="site-container">
            <SectionTitle eyebrow="Let's connect" title="Contact Me" description="Punya proyek menarik, kolaborasi, atau sekadar ingin berdiskusi? Jangan ragu untuk menghubungi saya!" />

            <div className="contact-cards-grid">
              {/* Card 1: Direct Email */}
              <div className="contact-card flex flex-col items-center text-center justify-between p-8">
                <div className="flex flex-col items-center text-center w-full">
                  <div className="contact-icon-box blue mx-auto">
                    <i className="fa-solid fa-envelope" />
                  </div>
                  <span className="contact-category-pill blue">
                    Direct Email
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Let's Talk</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-xs mx-auto">
                    Kirim pesan langsung ke email saya untuk tawaran kerja sama atau proyek.
                  </p>
                </div>
                <a
                  href="mailto:mazza050901@gmail.com"
                  className="contact-social-item w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 group transition-all"
                  {...hoverProps}
                >
                  <span className="text-sm font-medium text-gray-200 group-hover:text-neon-blue transition-colors">azza.alkausar@gmail.com</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs text-neon-blue" />
                </a>
              </div>

              {/* Card 2: Location & Availability */}
              <div className="contact-card flex flex-col items-center text-center justify-between p-8">
                <div className="flex flex-col items-center text-center w-full">
                  <div className="contact-icon-box purple mx-auto">
                    <i className="fa-solid fa-location-dot" />
                  </div>
                  <span className="contact-category-pill purple">
                    Location
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Base Location</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-xs mx-auto">
                    {profile.location || 'Tanjung Balai Karimun, Indonesia'}
                  </p>
                </div>
              </div>

              {/* Card 3: Social Networks */}
              <div className="contact-card flex flex-col items-center text-center justify-between p-8">
                <div className="flex flex-col items-center text-center w-full">
                  <div className="contact-icon-box pink mx-auto">
                    <i className="fa-solid fa-share-nodes" />
                  </div>
                  <span className="contact-category-pill pink">
                    Social Media
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Connect Online</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-xs mx-auto">
                    Temukan dan terhubung dengan profil saya di media sosial:
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 w-full">
                  {socials.map(([icon, label, url]) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      title={label}
                      className="contact-social-item flex-1 py-3.5 rounded-xl flex items-center justify-center group transition-all"
                      {...hoverProps}
                    >
                      <i className={`fab ${icon} text-lg text-gray-300 group-hover:text-neon-pink transition-colors`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neon-blue/10 bg-dark-900/40">
        <div className="site-container">
          <div className="home-header-row footer-row py-8">
            <button onClick={() => scrollTo('home')} className="shrink-0 flex items-center justify-start cursor-pointer" aria-label="Logo AZ - Back to Top">
              <img
                src="/logo-AZ.png"
                alt="Logo Azza Al Kausar"
                className="nav-brand-logo footer-logo"
              />
            </button>
            <div className="footer-center flex items-center justify-center">
              <p className="footer-copyright-text">
                <span>Designed &amp; Built with</span>
                <span className="footer-lightning-icon">⚡</span>
                <span>by</span>
                <span className="footer-copyright-name">
                  <span className="teks-neon font-bold">Muhammad Azza Al Kausar</span>
                </span>
                <span className="footer-copyright-divider">·</span>
                <span className="footer-copyright-year">© {new Date().getFullYear()}</span>
              </p>
            </div>
            <div className="footer-social-wrapper flex items-center">
              <div className="footer-social-group flex items-center gap-3.5">
                <a
                  href="https://github.com/Zyzero1"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                  className="header-social-link footer-social-link"
                  {...hoverProps}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/m-azza-alkausar/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                  className="header-social-link footer-social-link"
                  {...hoverProps}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/muhammad.azzaa_/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram Profile"
                  title="Instagram Profile"
                  className="header-social-link footer-social-link footer-social-link-instagram"
                  {...hoverProps}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showTopButton && (
        <button
          onClick={() => scrollTo('home')}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-linear-to-r from-neon-blue to-neon-purple text-white flex items-center justify-center shadow-xl shadow-neon-blue/30 hover:scale-110 transition-transform"
        >
          <i className="fa-solid fa-arrow-up text-lg" />
        </button>
      )}
      {/* Full-Window Other Projects Modal Popup */}
      {showProjectsModal && (
        <div
          className="projects-modal-overlay fixed inset-0 z-50 overflow-y-auto bg-[#050b17]/96 backdrop-blur-2xl flex flex-col justify-start items-center pt-28 md:pt-36 pb-20 md:pb-24 px-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Top-Right Refined Close Button */}
          <button
            type="button"
            onClick={() => setShowProjectsModal(false)}
            className="modal-close-btn fixed top-6 right-6 md:top-8 md:right-10 z-50 flex items-center justify-center cursor-pointer"
            aria-label="Tutup popup"
            {...hoverProps}
          >
            <i className="fa-solid fa-xmark text-xl" />
          </button>

          {/* Centered Content: SectionTitle and 3 Project Boxes */}
          <div className="site-container modal-project-container max-w-7xl mx-auto w-full flex flex-col items-center">
            <SectionTitle
              title="Other Projects"
              description="Koleksi proyek pilihan lainnya yang pernah saya rancang dan kembangkan, menggabungkan fungsionalitas dan desain modern."
            />

            <div className="flex flex-wrap justify-center gap-6 mx-auto w-full">
              {moreProjects.map((project, index) => renderProjectCard(project, index + 3))}
            </div>

            {/* Back Button below Project Boxes */}
            <div className="modal-back-wrapper flex justify-center mt-12 md:mt-16 w-full">
              <button
                type="button"
                onClick={() => setShowProjectsModal(false)}
                className="see-more-projects-btn"
                {...hoverProps}
              >
                <i className="fa-solid fa-arrow-left text-xs" />
                <span>Back</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}