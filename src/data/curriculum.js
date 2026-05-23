// CodePath curriculum — 50 ALPA lessons across 5 tracks
// CS50x rigor + DataCamp ALPA loop + Duolingo gamification
// Each lesson: assess → learn → practice → apply → assessFinal + goDeeper + resources

import { csfLessons } from './csf-track.js';
import { fwLessons } from './fw-track.js';
import { beLessons } from './be-track.js';
import { doLessons } from './do-track.js';
import { sdLessons } from './sd-track.js';

export const levels = [
  { name: 'Beginner', minXP: 0, maxXP: 500, color: '#4ECDC4' },
  { name: 'Intermediate', minXP: 500, maxXP: 2000, color: '#FFE66D' },
  { name: 'Advanced', minXP: 2000, maxXP: 5000, color: '#FF6B6B' },
  { name: 'Plena', minXP: 5000, maxXP: Infinity, color: '#A8E6CF' },
];

export const badges = [
  { id: 'csf-master', trackId: 'cs-fundamentals', name: 'CS Fundamentals Master', icon: '🧠', description: 'Completed all 10 CS Fundamentals lessons — Big O, recursion, data structures' },
  { id: 'fw-wizard', trackId: 'frontend-web', name: 'Frontend Wizard', icon: '🎨', description: 'Completed all 10 Frontend & Web lessons — DOM, CSS, async JS' },
  { id: 'be-builder', trackId: 'backend-apis', name: 'Backend Builder', icon: '⚙️', description: 'Completed all 10 Backend & APIs lessons — SQL, REST, auth' },
  { id: 'do-engineer', trackId: 'devops-infrastructure', name: 'DevOps Engineer', icon: '🚀', description: 'Completed all 10 DevOps lessons — Git, Docker, CI/CD' },
  { id: 'sd-architect', trackId: 'system-design', name: 'Systems Architect', icon: '🏗️', description: 'Completed all 10 System Design lessons — scaling, caching, microservices' },
];

export const tracks = [
  {
    id: 'cs-fundamentals',
    title: 'CS Fundamentals',
    icon: '🧠',
    color: '#00D4FF',
    description: "Harvard CS50 rigor — the WHY behind everything. Elly's priority track.",
    lessons: csfLessons,
  },
  {
    id: 'frontend-web',
    title: 'Frontend & Web',
    icon: '🎨',
    color: '#FF6B6B',
    description: 'HTML, CSS, JavaScript, DOM, async, React thinking — the visible web.',
    lessons: fwLessons,
  },
  {
    id: 'backend-apis',
    title: 'Backend & APIs',
    icon: '⚙️',
    color: '#4ECDC4',
    description: 'Variables, loops, functions, SQL, JOINs, HTTP, auth — what runs on the server.',
    lessons: beLessons,
  },
  {
    id: 'devops-infrastructure',
    title: 'DevOps & Infrastructure',
    icon: '🚀',
    color: '#FFE66D',
    description: 'CLI, Git, Docker, CI/CD, deployment — getting code to production.',
    lessons: doLessons,
  },
  {
    id: 'system-design',
    title: 'System Design',
    icon: '🏗️',
    color: '#A8E6CF',
    description: 'Client-server, scaling, caching, microservices — architecting for scale.',
    lessons: sdLessons,
  },
];
