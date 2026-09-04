export const defaultSkillsData = {
  languages: [
    { name: 'HTML / CSS', level: 90, color: '#E34F26', icon: 'fa-brands fa-html5' },
    { name: 'JavaScript', level: 80, color: '#F7DF1E', icon: 'fa-brands fa-js' },
    { name: 'PHP', level: 80, color: '#777BB4', icon: 'fa-brands fa-php' },
    { name: 'Python', level: 67, color: '#3776AB', icon: 'fa-brands fa-python' },
    { name: 'Dart', level: 60, color: '#0175C2', icon: 'fa-solid fa-mobile-screen', isDart: true }
  ],
  programmingMarkup: [
    { name: 'HTML5', icon: 'fa-brands fa-html5', color: '#E34F26' },
    { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: '#1572B6' },
    { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#F7DF1E' },
    { name: 'PHP', icon: 'fa-brands fa-php', color: '#777BB4' },
    { name: 'Python', icon: 'fa-brands fa-python', color: '#3776AB' },
    { name: 'Dart', icon: 'fa-solid fa-mobile-screen', color: '#0175C2', isDart: true },
    { name: 'C++', icon: 'fa-solid fa-code', color: '#659AD2', isCpp: true }
  ],
  frameworksDb: [
    { name: 'Flutter', icon: 'fa-solid fa-mobile-screen', color: '#54C5F8', isFlutter: true },
    { name: 'React', icon: 'fa-brands fa-react', color: '#61DAFB' },
    { name: 'Laravel', icon: 'fa-brands fa-laravel', color: '#FF2D20' },
    { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap', color: '#7952B3' },
    { name: 'MySQL', icon: 'fa-solid fa-database', color: '#4479A1' },
    { name: 'Firebase', icon: 'fa-solid fa-fire', color: '#FFA611' },
    { name: 'Android SDK', icon: 'fa-brands fa-android', color: '#3DDC84' },
    { name: 'Tailwind', icon: 'fa-solid fa-wind', color: '#38BDF8' }
  ],
  workflowTools: [
    { name: 'Figma', sub: 'UI/UX Design', icon: 'fa-brands fa-figma', color: '#F24E1E' },
    { name: 'VS Code', sub: 'Code Editor', icon: 'fa-solid fa-code', color: '#007ACC' },
    { name: 'Git', sub: 'Version Control', icon: 'fa-brands fa-git-alt', color: '#F54D27' },
    { name: 'GitHub', sub: 'Code Hosting', icon: 'fa-brands fa-github', color: '#6e5494' },
    { name: 'Postman', sub: 'API Testing', icon: 'fa-solid fa-paper-plane', color: '#FF6C37' },
    { name: 'MS Office', sub: 'Docs & Data', icon: 'fa-solid fa-file-lines', color: '#D83B01' }
  ],
  interpersonalSkills: [
    { name: 'Problem Solving', sub: 'Analytical & Creative', icon: 'fa-solid fa-lightbulb', color: '#00f0ff' },
    { name: 'Team Collaboration', sub: 'Cross-functional Synergy', icon: 'fa-solid fa-people-group', color: '#a78bfa' },
    { name: 'Effective Communication', sub: 'Clear & Articulate', icon: 'fa-solid fa-comments', color: '#f472b6' },
    { name: 'Adaptive & Agile', sub: 'Quick Continuous Learner', icon: 'fa-solid fa-bolt', color: '#34d399' }
  ]
};

const knownTechMetadata = {
  'html': { color: '#E34F26', icon: 'fa-brands fa-html5' },
  'html5': { color: '#E34F26', icon: 'fa-brands fa-html5' },
  'css': { color: '#1572B6', icon: 'fa-brands fa-css3-alt' },
  'css3': { color: '#1572B6', icon: 'fa-brands fa-css3-alt' },
  'html/css': { color: '#E34F26', icon: 'fa-brands fa-html5' },
  'html / css': { color: '#E34F26', icon: 'fa-brands fa-html5' },
  'javascript': { color: '#F7DF1E', icon: 'fa-brands fa-js' },
  'js': { color: '#F7DF1E', icon: 'fa-brands fa-js' },
  'typescript': { color: '#3178C6', icon: 'fa-brands fa-js' },
  'ts': { color: '#3178C6', icon: 'fa-brands fa-js' },
  'php': { color: '#777BB4', icon: 'fa-brands fa-php' },
  'python': { color: '#3776AB', icon: 'fa-brands fa-python' },
  'dart': { color: '#0175C2', icon: 'fa-solid fa-mobile-screen', isDart: true },
  'c': { color: '#A8B9CC', icon: 'fa-solid fa-c', isC: true },
  'c++': { color: '#659AD2', icon: 'fa-solid fa-code', isCpp: true },
  'cpp': { color: '#659AD2', icon: 'fa-solid fa-code', isCpp: true },
  'flutter': { color: '#54C5F8', icon: 'fa-solid fa-mobile-screen', isFlutter: true },
  'react': { color: '#61DAFB', icon: 'fa-brands fa-react' },
  'laravel': { color: '#FF2D20', icon: 'fa-brands fa-laravel' },
  'vue': { color: '#42B883', icon: 'fa-brands fa-vuejs' },
  'node': { color: '#68A063', icon: 'fa-brands fa-node-js' },
  'nodejs': { color: '#68A063', icon: 'fa-brands fa-node-js' },
  'bootstrap': { color: '#7952B3', icon: 'fa-brands fa-bootstrap' },
  'mysql': { color: '#4479A1', icon: 'fa-solid fa-database' },
  'firebase': { color: '#FFA611', icon: 'fa-solid fa-fire' },
  'android': { color: '#3DDC84', icon: 'fa-brands fa-android' },
  'android sdk': { color: '#3DDC84', icon: 'fa-brands fa-android' },
  'tailwind': { color: '#38BDF8', icon: 'fa-solid fa-wind' },
  'tailwind css': { color: '#38BDF8', icon: 'fa-solid fa-wind' },
  'git': { color: '#F54D27', icon: 'fa-brands fa-git-alt' },
  'github': { color: '#6e5494', icon: 'fa-brands fa-github' },
  'figma': { color: '#F24E1E', icon: 'fa-brands fa-figma' },
  'docker': { color: '#2496ED', icon: 'fa-brands fa-docker' },
  'vs code': { color: '#007ACC', icon: 'fa-solid fa-code' },
  'vscode': { color: '#007ACC', icon: 'fa-solid fa-code' },
  'postman': { color: '#FF6C37', icon: 'fa-solid fa-paper-plane' },
  'office': { color: '#D83B01', icon: 'fa-solid fa-file-lines' },
  'ms office': { color: '#D83B01', icon: 'fa-solid fa-file-lines' },
  'flask': { color: '#00f0ff', icon: 'fa-solid fa-flask' },
  'blade': { color: '#FF2D20', icon: 'fa-brands fa-laravel' },
  'laravel blade': { color: '#FF2D20', icon: 'fa-brands fa-laravel' },
};

export function lookupTechMeta(name, fallbackColor = '#00f0ff', fallbackIcon = 'fa-solid fa-code') {
  if (!name) return { color: fallbackColor, icon: fallbackIcon };
  const key = String(name).trim().toLowerCase();
  return knownTechMetadata[key] || { color: fallbackColor, icon: fallbackIcon };
}

/**
 * Parses and merges raw profile skills/tools/soft_skills from Supabase or localStorage
 * into a full structured skillsData object.
 */
export function parseSkillsData(rawSkills, rawTools, rawSoftSkills) {
  let result = { ...defaultSkillsData };

  // Case 1: If rawSkills is an object with full properties
  if (rawSkills && typeof rawSkills === 'object' && !Array.isArray(rawSkills)) {
    return {
      languages: Array.isArray(rawSkills.languages) && rawSkills.languages.length > 0
        ? rawSkills.languages
        : defaultSkillsData.languages,
      programmingMarkup: Array.isArray(rawSkills.programmingMarkup) && rawSkills.programmingMarkup.length > 0
        ? rawSkills.programmingMarkup
        : defaultSkillsData.programmingMarkup,
      frameworksDb: Array.isArray(rawSkills.frameworksDb) && rawSkills.frameworksDb.length > 0
        ? rawSkills.frameworksDb
        : defaultSkillsData.frameworksDb,
      workflowTools: Array.isArray(rawSkills.workflowTools) && rawSkills.workflowTools.length > 0
        ? rawSkills.workflowTools
        : defaultSkillsData.workflowTools,
      interpersonalSkills: Array.isArray(rawSkills.interpersonalSkills) && rawSkills.interpersonalSkills.length > 0
        ? rawSkills.interpersonalSkills
        : defaultSkillsData.interpersonalSkills
    };
  }

  // Case 2: If rawSkills is an array of [name, level] (Supabase default format)
  if (Array.isArray(rawSkills) && rawSkills.length > 0) {
    // Check if it's array of arrays or array of objects
    if (Array.isArray(rawSkills[0])) {
      result.languages = rawSkills.map(([name, level]) => {
        const meta = lookupTechMeta(name);
        return {
          name,
          level: Number(level) || 75,
          color: meta.color,
          icon: meta.icon,
          isDart: meta.isDart || false,
          isCpp: meta.isCpp || false
        };
      });
    } else if (typeof rawSkills[0] === 'object' && rawSkills[0] !== null) {
      result.languages = rawSkills.map((item) => {
        const meta = lookupTechMeta(item.name || item.skill);
        return {
          name: item.name || item.skill,
          level: Number(item.level ?? item.proficiency ?? 75),
          color: item.color || meta.color,
          icon: item.icon || meta.icon,
          isDart: item.isDart || meta.isDart || false,
          isCpp: item.isCpp || meta.isCpp || false
        };
      });
    }
  }

  // Parse rawTools if available
  if (Array.isArray(rawTools) && rawTools.length > 0) {
    // Map string tools or object tools
    const tools = rawTools.map((t) => {
      if (typeof t === 'string') {
        const meta = lookupTechMeta(t, '#f472b6', 'fa-solid fa-toolbox');
        return {
          name: t,
          sub: 'Workflow Tool',
          color: meta.color,
          icon: meta.icon
        };
      }
      return t;
    });
    // Merge or keep workflowTools
    if (tools.length > 0) {
      result.workflowTools = tools;
    }
  }

  // Parse rawSoftSkills if available
  if (Array.isArray(rawSoftSkills) && rawSoftSkills.length > 0) {
    const soft = rawSoftSkills.map((s, idx) => {
      if (typeof s === 'string') {
        const defaultColors = ['#00f0ff', '#a78bfa', '#f472b6', '#34d399'];
        const defaultIcons = ['fa-solid fa-lightbulb', 'fa-solid fa-people-group', 'fa-solid fa-comments', 'fa-solid fa-bolt'];
        return {
          name: s,
          sub: 'Core Strength',
          color: defaultColors[idx % defaultColors.length],
          icon: defaultIcons[idx % defaultIcons.length]
        };
      }
      return s;
    });
    if (soft.length > 0) {
      result.interpersonalSkills = soft;
    }
  }

  return result;
}
