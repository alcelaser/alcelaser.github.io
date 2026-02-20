export const personal = {
  name: 'Alberto Maccanico',
  title: 'AI & Management Student | Software Developer',
  email: 'maccanicoalberto@gmail.com',
  phone: 'ask via e-mail',
  location: 'Rome, Italy',
  nationality: 'Italian',
  github: 'https://github.com/alcelaser',
  githubHandle: 'alcelaser',
  summary:
    'University student with international experience and a strong scientific background. ' +
    'Passionate about research, algorithm design, management, and building software that matters. ' +
    'Experienced in both laboratory and software environments across Italy, Belgium, and the Netherlands.',
};

export interface Experience {
  role: string;
  company: string;
  type: string;
  period: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    role: 'Software Developer',
    company: 'Freelance',
    type: 'Freelance',
    period: '2019 – Present',
    bullets: [
      'Full-stack web and mobile projects for various clients',
      'Specialising in Flutter, Vue, TypeScript, and Python',
    ],
  },
  {
    role: 'Software Developer',
    company: 'Inotum L.L.C',
    type: 'Junior Developer',
    period: 'Sept 2023 – Dec 2023',
    bullets: [
      'Worked with Laravel and OpenLLaMA models',
      'Focus on prompt engineering and enterprise software',
    ],
  },
  {
    role: 'Laboratory Assistant',
    company: 'ISF Waterloo',
    type: 'Chemical Lab Technician',
    period: 'Sept 2019 – Oct 2020',
    bullets: [
      'Supported science labs, data collection, and experiment setup',
    ],
  },
];

export interface Education {
  institution: string;
  location: string;
  degree: string;
  period: string;
  details?: string[];
}

export const education: Education[] = [
  {
    institution: 'LUISS Guido Carli University',
    location: 'Rome',
    degree: 'BSc in Artificial Intelligence and Management (in progress)',
    period: 'September 2024 – Present',
  },
  {
    institution: 'Vrije Universiteit Amsterdam',
    location: 'Netherlands',
    degree: 'BSc in Computer Science (Bioinformatics Track – Discontinued)',
    period: 'Sept 2022 – June 2025',
  },
  {
    institution: 'International School of Flanders',
    location: 'Waterloo, Belgium',
    degree: 'A Levels & IGCSEs',
    period: '2017 – 2021',
    details: [
      'A Levels (2021): French (A*), Mathematics (B), Physics (B)',
      'IGCSEs (2019): 9 Subjects incl. Coordinated Sciences, French, English Literature, Business, History',
    ],
  },
  {
    institution: 'SAT',
    location: '',
    degree: 'Scholastic Aptitude Test — 1350/1600 (90th Percentile)',
    period: '',
    details: ['Math: 650 — Reading & Writing: 700'],
  },
  {
    institution: 'ISF Waterloo',
    location: 'Waterloo, Belgium',
    degree: 'High School',
    period: '2017 - 2021',
  },
];

export interface Skill {
  name: string;
  category: 'programming' | 'ai' | 'tools' | 'soft';
}

export const skills: Skill[] = [
  { name: 'Python', category: 'programming' },
  { name: 'C++', category: 'programming' },
  { name: 'Rust', category: 'programming' },
  { name: 'JavaScript', category: 'programming' },
  { name: 'TypeScript', category: 'programming' },
  { name: 'Node.js', category: 'programming' },
  { name: 'Vue', category: 'programming' },
  { name: 'PHP', category: 'programming' },
  { name: 'Laravel', category: 'programming' },
  { name: 'WordPress', category: 'programming' },
  { name: 'HTML/CSS', category: 'programming' },
  { name: 'x86 Assembly', category: 'programming' },
  { name: 'Dart', category: 'programming' },
  { name: 'Flutter', category: 'programming' },
  { name: 'LLM Development', category: 'ai' },
  { name: 'Token Embedding', category: 'ai' },
  { name: 'Ethical Use of AI', category: 'ai' },
  { name: 'Machine Learning', category: 'ai' },
  { name: 'Bioinformatics', category: 'ai' },
  { name: 'Large Language Models', category: 'ai' },
  { name: 'Generative AI', category: 'ai' },
  { name: 'Neural Scaling Laws', category: 'ai' },
  { name: 'Prompt Engineering', category: 'ai' },
  { name: 'LaTeX', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'Scientific Writing', category: 'tools' },
  { name: 'No-Code/Low-Code Platforms', category: 'tools' },
  { name: 'OpenAI API', category: 'tools' },
  { name: 'Teamwork', category: 'soft' },
  { name: 'MUN Vice-Chair', category: 'soft' },
  { name: 'Multilingual', category: 'soft' },
  { name: 'Research', category: 'soft' },
  { name: 'Google Developer Group Guido Carli Press Writer', category: 'soft' },
];

export interface Award {
  title: string;
  issuer: string;
  detail?: string;
}

export const awards: Award[] = [
  {
    title: 'International Certificate of Excellence - Distinction',
    issuer: 'University of Cambridge',
  },
  {
    title: 'Royal Society of Chemistry',
    issuer: 'RSC',
    detail: 'Bronze (S1&2), Silver (S3)',
  },
  {
    title: "Primary's Choice – Science Fair",
    issuer: 'ISF Waterloo',
  },
  {
    title: 'Model United Nations – Speaker',
    issuer: 'Cambridge 2019',
  },
  {
    title: 'Google x LUISS Prompt-a-Thon',
    issuer: 'Google & LUISS',
    detail: 'Participant',
  },
];

export interface Article {
  title: string;
  description: string;
  url?: string;
  publication?: string;
}

export const articles: Article[] = [
  {
    title: 'Vibe Coding',
    description: 'Coding in the modern age.',
    url: '',
    publication: '',
  },
  {
    title: "The Efficient Compute Frontier – AI's Great Filter",
    description:
      'Discusses efficiency in AI development and its potential constraints on future innovation.',
    url: '',
    publication: '',
  },
];

export interface Language {
  name: string;
  level: string;
  detail: string;
  percent: number;
}

export const languages: Language[] = [
  {
    name: 'Italian',
    level: 'Native',
    detail: 'Native speaker',
    percent: 100,
  },
  {
    name: 'English',
    level: 'C2',
    detail: 'IELTS 8.0 (Speaking 9.0)',
    percent: 95,
  },
  {
    name: 'French',
    level: 'C1',
    detail: 'A* A Level (90%-100%)',
    percent: 88,
  },
  {
    name: 'Spanish',
    level: 'B2',
    detail: 'Upper intermediate',
    percent: 65,
  },
  {
    name: 'German',
    level: 'A1',
    detail: 'Work in progress, following a language course',
    percent: 25,
  },
];

export const stats = {
  publicRepos: 7,
  languagesSpoken: 5,
  countriesLived: 3,
  yearsExperience: 6,
};
