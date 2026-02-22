import * as cvEn from '../data/cv';
import * as cvIt from '../data/cv_it';
import * as cvFr from '../data/cv_fr';

export const languages = {
    en: 'English',
    it: 'Italiano',
    fr: 'Français',
};

export const defaultLang = 'en';

export function getCV(lang: string) {
    if (lang === 'it') return cvIt;
    if (lang === 'fr') return cvFr;
    return cvEn;
}

const ui: Record<string, Record<string, string>> = {
    en: {
        'nav.about': 'About',
        'nav.experience': 'Experience',
        'nav.education': 'Education',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.awards': 'Awards',
        'nav.articles': 'My Articles',
        'nav.contact': 'Contact',
        'nav.blog': 'My Articles',
        'hero.projects': 'Projects',
        'hero.readBlog': 'My Articles',
        'hero.contact': 'Contact',
        'hero.scroll': 'scroll',
        'hero.phrases': '["AI & Management Student","Software Developer","Research Enthusiast","Prompt Engineer","Full-Stack Builder"]',
        'about.title': 'About Me',
        'about.desc1': 'Currently pursuing a <span class="text-accent-blue">BSc in Artificial Intelligence and Management</span> at LUISS Guido Carli University in Rome. Previously studied Computer Science at Vrije Universiteit Amsterdam. Experienced with enterprise LLM development, scientific research, and full-stack web applications.',
        'about.stat.repos': 'Public Repos',
        'about.stat.langs': 'Languages',
        'about.stat.countries': 'Countries',
        'about.stat.exp': 'Years Exp.',
        'section.experience': 'Experience',
        'section.education': 'Education',
        'section.projects': 'Projects',
        'section.projects.desc': 'Open-source work fetched live from',
        'section.projects.fallback': 'Projects could not be loaded. Visit',
        'section.skills': 'Skills',
        'section.skills.cat.programming': 'Programming & Frameworks',
        'section.skills.cat.ai': 'AI & Research',
        'section.skills.cat.tools': 'Tools & Writing',
        'section.skills.cat.soft': 'Soft Skills',
        'section.languages': 'Languages',
        'section.awards': 'Awards & Achievements',
        'section.articles': 'My Articles',
        'section.articles.viewAll': 'View all',
        'section.contact': 'Get in Touch',
        'section.contact.desc': 'Interested in collaborating or have a question? Feel free to reach out.',
        'blog.title': 'Articles & Thoughts',
        'blog.back': 'Back to Home'
    },
    it: {
        'nav.about': 'Su di me',
        'nav.experience': 'Esperienza',
        'nav.education': 'Istruzione',
        'nav.projects': 'Progetti',
        'nav.skills': 'Competenze',
        'nav.awards': 'Premi',
        'nav.articles': 'I Miei Articoli',
        'nav.contact': 'Contatti',
        'nav.blog': 'I Miei Articoli',
        'hero.projects': 'Progetti',
        'hero.readBlog': 'I Miei Articoli',
        'hero.contact': 'Contatti',
        'hero.scroll': 'scorri',
        'hero.phrases': '["Studente di AI & Management","Sviluppatore Software","Appassionato di Ricerca","Prompt Engineer","Sviluppatore Full-Stack"]',
        'about.title': 'Su di me',
        'about.desc1': 'Attualmente sto conseguendo una <span class="text-accent-blue">Laurea in Intelligenza Artificiale e Management</span> presso l\'Università LUISS Guido Carli di Roma. In precedenza ho studiato Informatica alla Vrije Universiteit Amsterdam. Esperienza con sviluppo LLM aziendali, ricerca scientifica e applicazioni web full-stack.',
        'about.stat.repos': 'Repo Pubbliche',
        'about.stat.langs': 'Lingue',
        'about.stat.countries': 'Paesi',
        'about.stat.exp': 'Anni Esp.',
        'section.experience': 'Esperienza',
        'section.education': 'Istruzione',
        'section.projects': 'Progetti',
        'section.projects.desc': 'Lavori open-source recuperati live da',
        'section.projects.fallback': 'Impossibile caricare i progetti. Visita',
        'section.skills': 'Competenze',
        'section.skills.cat.programming': 'Programmazione & Framework',
        'section.skills.cat.ai': 'AI & Ricerca',
        'section.skills.cat.tools': 'Strumenti & Scrittura',
        'section.skills.cat.soft': 'Soft Skills',
        'section.languages': 'Lingue',
        'section.awards': 'Premi e Riconoscimenti',
        'section.articles': 'I Miei Articoli',
        'section.articles.viewAll': 'Vedi tutti',
        'section.contact': 'Contattami',
        'section.contact.desc': 'Interessato a collaborare o hai una domanda? Non esitare a contattarmi.',
        'blog.title': 'Articoli e Pubblicazioni',
        'blog.back': 'Torna alla Home'
    },
    fr: {
        'nav.about': 'À propos',
        'nav.experience': 'Expérience',
        'nav.education': 'Éducation',
        'nav.projects': 'Projets',
        'nav.skills': 'Compétences',
        'nav.awards': 'Prix',
        'nav.articles': 'Mes Articles',
        'nav.contact': 'Contact',
        'nav.blog': 'Mes Articles',
        'hero.projects': 'Projets',
        'hero.readBlog': 'Mes Articles',
        'hero.contact': 'Contact',
        'hero.scroll': 'défiler',
        'hero.phrases': '["Étudiant en IA & Management","Développeur Logiciel","Passionné de Recherche","Prompt Engineer","Développeur Full-Stack"]',
        'about.title': 'À propos de moi',
        'about.desc1': 'Je prépare actuellement une <span class="text-accent-blue">Licence en IA et Management</span> à l\'Université LUISS Guido Carli de Rome. J\'ai précédemment étudié l\'Informatique à la Vrije Universiteit Amsterdam. Expérience en développement d\'entreprise LLM, recherche scientifique et applications web full-stack.',
        'about.stat.repos': 'Dépôts Publics',
        'about.stat.langs': 'Langues',
        'about.stat.countries': 'Pays',
        'about.stat.exp': 'Années d\'Exp.',
        'section.experience': 'Expérience',
        'section.education': 'Éducation',
        'section.projects': 'Projets',
        'section.projects.desc': 'Travaux open-source récupérés en direct de',
        'section.projects.fallback': 'Impossible de charger les projets. Visitez',
        'section.skills': 'Compétences',
        'section.skills.cat.programming': 'Programmation & Frameworks',
        'section.skills.cat.ai': 'IA & Recherche',
        'section.skills.cat.tools': 'Outils & Écriture',
        'section.skills.cat.soft': 'Compétences Sociales',
        'section.languages': 'Langues',
        'section.awards': 'Prix et Réalisations',
        'section.articles': 'Mes Articles',
        'section.articles.viewAll': 'Voir tout',
        'section.contact': 'Contactez-moi',
        'section.contact.desc': 'Intéressé à collaborer ou vous avez une question? N\'hésitez pas à me contacter.',
        'blog.title': 'Articles et Publications',
        'blog.back': 'Retour à l\'accueil'
    }
};

export function useTranslations(lang: string) {
    return function t(key: string) {
        return ui[lang]?.[key] || ui[defaultLang][key] || key;
    };
}
