export const personal = {
  name: 'Alberto Maccanico',
  title: 'Étudiant en IA & Management | Développeur Logiciel',
  email: 'maccanicoalberto@gmail.com',
  phone: 'demande par e-mail',
  location: 'Rome, Italie',
  nationality: 'Italienne',
  github: 'https://github.com/alcelaser',
  githubHandle: 'alcelaser',
  linkedin: 'https://www.linkedin.com/in/alberto-maccanico-16266b30a/',
  summary:
    'Étudiant universitaire avec une expérience internationale et une forte formation scientifique. ' +
    'Passionné par la recherche, la conception d\'algorithmes, le management et le développement de logiciels qui comptent. ' +
    'Expérience dans des environnements de laboratoire et de développement de logiciels en Italie, en Belgique et aux Pays-Bas.',
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
    role: 'Développeur Logiciel',
    company: 'Freelance',
    type: 'Freelance',
    period: '2019 – Présent',
    bullets: [
      'Projets web et mobiles full-stack pour divers clients',
      'Spécialisation en Flutter, Vue, TypeScript et Python',
    ],
  },
  {
    role: 'Développeur Logiciel',
    company: 'Inotum L.L.C',
    type: 'Développeur Junior',
    period: 'Sept 2023 – Déc 2023',
    bullets: [
      'Travail avec les modèles Laravel et OpenLLaMA',
      'Concentration sur le prompt engineering et les logiciels d\'entreprise',
    ],
  },
  {
    role: 'Assistant de Laboratoire',
    company: 'ISF Waterloo',
    type: 'Technicien de Laboratoire Chimique',
    period: 'Sept 2019 – Oct 2020',
    bullets: [
      'Soutien aux laboratoires scientifiques, collecte de données et préparation d\'expériences',
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
    institution: 'Université LUISS Guido Carli',
    location: 'Rome',
    degree: 'Licence en Intelligence Artificielle et Management (en cours)',
    period: 'Septembre 2024 – Présent',
  },
  {
    institution: 'Vrije Universiteit Amsterdam',
    location: 'Pays-Bas',
    degree: 'Licence en Informatique (Filière Bioinformatique – Interrompu)',
    period: 'Sept 2022 – Juin 2025',
  },
  {
    institution: 'International School of Flanders',
    location: 'Waterloo, Belgique',
    degree: 'A Levels & IGCSEs',
    period: '2017 – 2021',
    details: [
      'A Levels (2021): Français (A*), Mathématiques (B), Physique (B)',
      'IGCSEs (2019): 9 matières dont Sciences Coordonnées, Français, Littérature Anglaise, Commerce, Histoire',
    ],
  },
  {
    institution: 'SAT',
    location: '',
    degree: 'Scholastic Aptitude Test — 1350/1600 (90e Centile)',
    period: '',
    details: ['Mathématiques: 650 — Lecture et Écriture: 700'],
  },
  {
    institution: 'ISF Waterloo',
    location: 'Waterloo, Belgique',
    degree: 'Lycée',
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
  { name: 'Développement LLM', category: 'ai' },
  { name: 'Token Embedding', category: 'ai' },
  { name: 'Utilisation Éthique de l\'IA', category: 'ai' },
  { name: 'Machine Learning', category: 'ai' },
  { name: 'Bioinformatique', category: 'ai' },
  { name: 'Large Language Models', category: 'ai' },
  { name: 'IA Générative', category: 'ai' },
  { name: 'Neural Scaling Laws', category: 'ai' },
  { name: 'Prompt Engineering', category: 'ai' },
  { name: 'LaTeX', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'Rédaction Scientifique', category: 'tools' },
  { name: 'Plateformes No-Code/Low-Code', category: 'tools' },
  { name: 'API OpenAI', category: 'tools' },
  { name: 'Travail d\'équipe', category: 'soft' },
  { name: 'Vice-Président MUN', category: 'soft' },
  { name: 'Multilingue', category: 'soft' },
  { name: 'Recherche', category: 'soft' },
  { name: 'Rédacteur pour Google Developer Group Guido Carli', category: 'soft' },
];

export interface Award {
  title: string;
  issuer: string;
  detail?: string;
}

export const awards: Award[] = [
  {
    title: 'Certificat International d\'Excellence - Distinction',
    issuer: 'Université de Cambridge',
  },
  {
    title: 'Royal Society of Chemistry',
    issuer: 'RSC',
    detail: 'Bronze (S1&2), Argent (S3)',
  },
  {
    title: "Choix Primaire – Foire Scientifique",
    issuer: 'ISF Waterloo',
  },
  {
    title: 'Model United Nations – Orateur',
    issuer: 'Cambridge 2019',
  },
  {
    title: 'Prompt-a-Thon Google x LUISS',
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
    description: 'La programmation à l\'ère moderne.',
    url: '',
    publication: '',
  },
  {
    title: "La Frontière de Calcul Efficace – Le Grand Filtre de l'IA",
    description:
      'Examine l\'efficacité dans le développement de l\'IA et ses contraintes potentielles sur l\'innovation future.',
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
    name: 'Italien',
    level: 'C2',
    detail: 'Langue maternelle',
    percent: 100,
  },
  {
    name: 'Anglais',
    level: 'C2',
    detail: 'IELTS 8.0 (Speaking 9.0)',
    percent: 95,
  },
  {
    name: 'Français',
    level: 'C1',
    detail: 'A* A Level (90%-100%)',
    percent: 88,
  },
  {
    name: 'Espagnol',
    level: 'B2',
    detail: 'Intermédiaire supérieur',
    percent: 65,
  },
  {
    name: 'Allemand',
    level: 'A1',
    detail: 'En cours, suit un cours de langue',
    percent: 25,
  },
];

export const stats = {
  publicRepos: 7,
  languagesSpoken: 5,
  countriesLived: 3,
  yearsExperience: 6,
};
