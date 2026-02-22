export const personal = {
  name: 'Alberto Maccanico',
  title: 'Studente di AI & Management | Sviluppatore Software',
  email: 'maccanicoalberto@gmail.com',
  phone: 'richiedi via e-mail',
  location: 'Roma, Italia',
  nationality: 'Italiana',
  github: 'https://github.com/alcelaser',
  githubHandle: 'alcelaser',
  linkedin: 'https://www.linkedin.com/in/alberto-maccanico-16266b30a/',
  summary:
    'Studente universitario con esperienza internazionale e forte background scientifico. ' +
    'Appassionato di ricerca, progettazione di algoritmi, management e di sviluppo software ad alto impatto. ' +
    'Ha maturato esperienza sia in laboratorio che in ambienti software in Italia, Belgio e Paesi Bassi.',
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
    role: 'Sviluppatore Software',
    company: 'Freelance',
    type: 'Freelance',
    period: '2019 – Presente',
    bullets: [
      'Progetti web e mobile full-stack per vari clienti',
      'Specializzato in Flutter, Vue, TypeScript e Python',
    ],
  },
  {
    role: 'Sviluppatore Software',
    company: 'Inotum L.L.C',
    type: 'Sviluppatore Junior',
    period: 'Sett 2023 – Dic 2023',
    bullets: [
      'Esperienza con i modelli Laravel e OpenLLaMA',
      'Focus su prompt engineering e software aziendale',
    ],
  },
  {
    role: 'Assistente di Laboratorio',
    company: 'ISF Waterloo',
    type: 'Tecnico di Laboratorio Chimico',
    period: 'Sett 2019 – Ott 2020',
    bullets: [
      'Supporto a laboratori scientifici, raccolta dati e preparazione di esperimenti',
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
    institution: 'Università LUISS Guido Carli',
    location: 'Roma',
    degree: 'Laurea in Artificial Intelligence and Management (in corso)',
    period: 'Settembre 2024 – Presente',
  },
  {
    institution: 'Vrije Universiteit Amsterdam',
    location: 'Paesi Bassi',
    degree: 'Laurea in Computer Science (Indirizzo Bioinformatica – Interrotta)',
    period: 'Sett 2022 – Giu 2025',
  },
  {
    institution: 'International School of Flanders',
    location: 'Waterloo, Belgio',
    degree: 'A Levels & IGCSEs',
    period: '2017 – 2021',
    details: [
      'A Levels (2021): Francese (A*), Matematica (B), Fisica (B)',
      'IGCSEs (2019): 9 materie tra cui Scienze Coordinate, Francese, Letteratura Inglese, Business, Storia',
    ],
  },
  {
    institution: 'SAT',
    location: '',
    degree: 'Scholastic Aptitude Test — 1350/1600 (90° Percentile)',
    period: '',
    details: ['Matematica: 650 — Lettura e Scrittura: 700'],
  },
  {
    institution: 'ISF Waterloo',
    location: 'Waterloo, Belgio',
    degree: 'Scuola Superiore',
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
  { name: 'Sviluppo LLM', category: 'ai' },
  { name: 'Token Embedding', category: 'ai' },
  { name: 'Uso Etico dell\'AI', category: 'ai' },
  { name: 'Machine Learning', category: 'ai' },
  { name: 'Bioinformatica', category: 'ai' },
  { name: 'Large Language Models', category: 'ai' },
  { name: 'AI Generativa', category: 'ai' },
  { name: 'Neural Scaling Laws', category: 'ai' },
  { name: 'Prompt Engineering', category: 'ai' },
  { name: 'LaTeX', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'Scrittura Scientifica', category: 'tools' },
  { name: 'Piattaforme No-Code/Low-Code', category: 'tools' },
  { name: 'API OpenAI', category: 'tools' },
  { name: 'Teamwork', category: 'soft' },
  { name: 'Vice-Presidente MUN', category: 'soft' },
  { name: 'Multilingue', category: 'soft' },
  { name: 'Ricerca', category: 'soft' },
  { name: 'Redattore per Google Developer Group Guido Carli', category: 'soft' },
];

export interface Award {
  title: string;
  issuer: string;
  detail?: string;
}

export const awards: Award[] = [
  {
    title: 'Certificato Internazionale di Eccellenza - Distinzione',
    issuer: 'Università di Cambridge',
  },
  {
    title: 'Royal Society of Chemistry',
    issuer: 'RSC',
    detail: 'Bronzo (S1&2), Argento (S3)',
  },
  {
    title: "Scelta Primaria – Fiera della Scienza",
    issuer: 'ISF Waterloo',
  },
  {
    title: 'Model United Nations – Oratore',
    issuer: 'Cambridge 2019',
  },
  {
    title: 'Prompt-a-Thon Google x LUISS',
    issuer: 'Google & LUISS',
    detail: 'Partecipante',
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
    description: 'La programmazione nell\'era moderna.',
    url: '',
    publication: '',
  },
  {
    title: "La Frontiera Efficiente del Calcolo – Il Grande Filtro dell'AI",
    description:
      'Discute l\'efficienza nello sviluppo dell\'AI e i suoi potenziali vincoli sull\'innovazione futura.',
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
    name: 'Italiano',
    level: 'C2',
    detail: 'Madrelingua',
    percent: 100,
  },
  {
    name: 'Inglese',
    level: 'C2',
    detail: 'IELTS 8.0 (Speaking 9.0)',
    percent: 95,
  },
  {
    name: 'Francese',
    level: 'C1',
    detail: 'A* A Level (90%-100%)',
    percent: 88,
  },
  {
    name: 'Spagnolo',
    level: 'B2',
    detail: 'Livello Intermedio Superiore',
    percent: 65,
  },
  {
    name: 'Tedesco',
    level: 'A1',
    detail: 'In corso, seguendo un corso di lingua',
    percent: 25,
  },
];

export const stats = {
  publicRepos: 7,
  languagesSpoken: 5,
  countriesLived: 3,
  yearsExperience: 6,
};
