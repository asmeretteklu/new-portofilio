export const person = {
  name: { first: 'Asmeret', last: 'Teklu' },
  fullName: 'Asmeret Teklu Gebremedhin',
  title: 'Full-Stack Developer · AI Enthusiast · Builder from Tigray',
  tagline: 'Building software that matters',
  location: 'Mekelle, Tigray, Ethiopia',
  email: 'asmeretteklu03@gmail.com',
  github: 'https://github.com/asmeretteklu',
  linkedin: 'https://linkedin.com/in/asmeretteklu',
  site: 'https://asmeret.netlify.app',
  bio: "I build AI for the girls who look like me, and I've shipped real products through blackouts and curfews. Tigray made me resilient. Software is how I show it.",
  photo: '/photo.jpg',
}

export const stats = [
  { id: 'apps', value: '4', label: 'Production Apps', sub: 'Deployed' },
  { id: 'users', value: '500+', label: 'Real people using it', sub: 'Served' },
]

export const projects = [
  {
    id: 'luna',
    name: 'Luna AI',
    accent: 'AI',
    status: 'dev',
    statusLabel: 'In the making 🌙',
    featured: false,
    description: 'Women\'s health & menstrual cycle intelligence app for Ethiopian and African women. Phase-based AI recommendations. Adjusted nutritional AI models for Ethiopian dietary staples like Teff and regional fasting cycles.',
    metrics: [{ value: 'Gemini', label: 'AI Engine' }, { value: 'Africa', label: 'Target Market' }],
    tags: ['React Native', 'Expo', 'Supabase', 'Gemini API', 'Node.js'],
  },
  {
    id: 'keno',
    name: 'Keno Platform',
    accent: 'Platform',
    status: 'live',
    statusLabel: 'Live — Daily Use',
    featured: true,
    description: '5 fully distinct role-based interfaces — TV broadcast, player app, cashier terminal, branch admin, super admin. Solved real-time synchronization lag across 5 interfaces using Socket.io heartbeat signals.',
    metrics: [{ value: '5', label: 'Role Interfaces' }, { value: 'Live', label: 'Production' }],
    tags: ['React', 'Node.js', 'Socket.io', 'MySQL', 'RBAC'],
  },
  {
    id: 'ethiomarket',
    name: 'EthioMarket',
    accent: 'Market',
    status: 'live',
    statusLabel: 'Live',
    featured: false,
    description: 'MERN multi-vendor e-commerce for Ethiopian artisans. Chapa payment gateway, 50+ artisans onboarded.',
    metrics: [{ value: '50+', label: 'Artisans' }],
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Chapa'],
  },
  {
    id: 'registration',
    name: 'Student Registration System',
    accent: 'Registration',
    status: 'live',
    statusLabel: 'Deployed at Microlink',
    featured: true,
    description: 'Replaced manual enrollment at Microlink IT College. Registration time: 7 days → 5 minutes. 100% fee collection automated. Data entry error rate from 12% to near zero. Role-based access with full audit trails.',
    metrics: [{ value: '5 mins', label: 'Enrollment (from 7 days)' }, { value: '0%', label: 'Error Rate' }],
    tags: ['HTML/CSS/JS', 'MySQL', 'Microservices', 'RBAC'],
  },
  {
    id: 'moodnotes',
    name: 'MoodNotes',
    accent: 'Notes',
    status: 'live',
    statusLabel: '2023',
    featured: false,
    description: 'AI emotional wellness platform. TensorFlow.js mood detection at 85% accuracy. Spotify API music recommendations matched to emotional state.',
    metrics: [{ value: '85%', label: 'Model Accuracy' }],
    tags: ['TensorFlow.js', 'Spotify API', 'React'],
  },
  {
    id: 'codecollab',
    name: 'CodeCollab',
    accent: 'Collab',
    status: 'live',
    statusLabel: '2022',
    featured: false,
    description: 'Browser-based collaborative code editor with Socket.io real-time sync and WebRTC video conferencing. Built offline-first synchronization protocols to handle fluctuating internet coverage during Mekelle\'s blackouts.',
    metrics: [{ value: '100+', label: 'Sessions' }],
    tags: ['Socket.io', 'WebRTC', 'Node.js'],
  },
  {
    id: 'unfooler',
    name: 'Unfooler Tracker',
    accent: 'Tracker',
    status: 'dev',
    statusLabel: 'In the making 🌙',
    featured: false,
    description: 'ML anomaly detection system identifying fake followers, bot accounts, and inauthentic engagement patterns at scale on Instagram.',
    metrics: [],
    tags: ['Python', 'ML', 'Anomaly Detection'],
  },
]

export const skills = [
  { group: 'Frontend', items: ['React.js', 'React Native / Expo', 'TypeScript (ES6+)', 'HTML5 / CSS3', 'Tailwind CSS', 'Framer Motion'] },
  { group: 'Backend & Database', items: ['Node.js / Express', 'RESTful APIs', 'MongoDB / Mongoose', 'MySQL', 'Supabase', 'Firebase'] },
  { group: 'AI & Systems', items: ['TensorFlow.js', 'Python', 'Gemini API', 'Anomaly Detection', 'Socket.io / WebRTC', 'Linux · Git · GitHub'] },
]

export const certifications = [
  { name: 'CS50x — Harvard University', detail: 'Introduction to Computer Science (Online)' },
  { name: 'Diploma in English Language', detail: 'Distinction · Mekelle, 2017', type: 'language' },
  { name: '5 Million Ethiopian Coders', detail: 'AI & Fundamental Programming · 2023' },
  { name: 'UAE 5 Million Coders', detail: 'Advanced Programming Track · In Progress' },
  { name: 'FreeCodeCamp', detail: 'Front End Libraries · JS Algorithms · Python · 2023' },
  { name: 'Google Digital Garage', detail: 'Fundamentals of Digital Marketing · 2023' },
]

export const digitalMarketingCreds = [
  { name: 'Digital Marketing Fundamentals', issuer: 'Google Digital Garage', year: '2023' },
  { name: 'Social Media Marketing', issuer: 'HubSpot Academy', year: '2023' },
  { name: 'Content Marketing', issuer: 'HubSpot Academy', year: '2023' },
]

export const community = [
  { icon: '👩‍💻', title: 'Mentor', org: 'Women in Tech Ethiopia', desc: 'Guiding female developers through bootcamps and career development.' },
  { icon: '🏫', title: 'Volunteer Instructor', org: 'Community Tech Hub, Mekelle', desc: 'Teaching coding to underserved youth — the access I fought for, passed forward.' },
  { icon: '🤝', title: 'Active Member', org: 'Ethiopian Developers Community', desc: 'Open-source collaboration and knowledge sharing across the Ethiopian dev ecosystem.' },
]

export const lunaSystemPrompt = `You are Luna — the warm, smart AI assistant living inside Asmeret Teklu Gebremedhin's portfolio. You know everything about her and answer questions concisely in 2-3 sentences maximum.

WHO ASMERET IS:
Full name: Asmeret Teklu Gebremedhin
From: Mekelle, Tigray, Ethiopia
Role: Full-Stack Developer, System Architect, AI Enthusiast, Technical Project Lead
Education: BSc Software Engineering, Microlink IT College, 2025
GPA 3.74/4.0 — Great Distinction
Top of cohort, Major Area GPA 3.80
Semester high of 3.96 in final year
Maintained through years of conflict in Tigray

CERTIFICATIONS:
- CS50x Harvard University — Introduction to Computer Science
- 5 Million Ethiopian Coders — AI & Fundamental Programming, 2023
- UAE 5 Million Coders — Advanced Track, In Progress
- FreeCodeCamp — Web Design, JavaScript, Python, Front End Libraries, 2022-2023
- Google Digital Garage — Digital Marketing, 2023
- Diploma in English Language — Distinction, 2017

PROJECTS:
- Luna AI (almost complete) — menstrual cycle intelligence app for Ethiopian/African women. React Native, Expo, Supabase, Gemini API. Four-phase guidance, AI mood detector, smart reminders, bilingual English/Amharic support
- Keno Platform — 5 role interfaces, Socket.io real-time, live in production
- EthioMarket — MERN, 50+ artisans, local payment integration
- Student Registration System — 99% time reduction, deployed at Microlink College
- MoodNotes — TensorFlow.js 85% accuracy, Spotify integration
- CodeCollab — WebRTC + Socket.io, 100+ sessions, built during conflict
- Unfooler Tracker — ML bot detection

SKILLS: React, React Native, Node.js, TypeScript, Python, TensorFlow.js, Gemini API, Supabase, MySQL, MongoDB, Socket.io, WebRTC, Tailwind, System Architecture, Project Leadership, RBAC, Microservices, Git, Linux

COMMUNITY:
- Mentor at Women in Tech Ethiopia
- Volunteer coding teacher in Mekelle
- Ethiopian Developers Community member

CONTACT:
Email: asmeretteklu03@gmail.com
GitHub: github.com/asmeretteklu
LinkedIn: linkedin.com/in/asmeretteklu
Site: asmeret.netlify.app

PROFESSOR QUOTES:
Mulu Ftsum: "The kind of graduate who will make use of every opportunity she is given."
Amanuel Kebede: "Technically solid, self-directed, and she ships real work."
Gebreslassie Etsay: "Has the analytical depth and intellectual independence that research demands."

LANGUAGES: Tigrigna (native), English (fluent, Distinction diploma), Amharic (professional)

TONE RULES:
- Warm, confident, sisterly
- 2-3 sentences max per reply
- Never make up information
- If unknown: "Asmeret hasn't briefed me on that yet — reach out directly at asmeretteklu03@gmail.com!"
`

export const starterQuestions = [
  "✦ What has she actually built?",
  "🌙 Tell me about Luna AI",
  "💛 What makes her different?",
  "📩 How do I work with her?",
]

export const tickerItems = [
  'React', 'Node.js', 'React Native', 'TypeScript', 'Python',
  'Gemini API', 'TensorFlow.js', 'Supabase', 'Socket.io', 'WebRTC',
  'MySQL', 'MongoDB', 'Tailwind CSS', 'Framer Motion', 'Linux', 'Express',
]

export const testimonials = [
  {
    author: 'Mulu Ftsum MSc',
    role: 'Final Year Project Advisor',
    text: 'The kind of graduate who will make use of every opportunity I am given.',
    context: 'Supervised my final year capstone project and was consistently impressed by my initiative and technical depth.',
  },
  {
    author: 'Amanuel Kebede MSc',
    role: 'Computer Networks Lecturer',
    text: 'Technically solid, self-directed, and I ship real work.',
    context: 'Observed my ability to independently research and implement complex networking solutions beyond the curriculum.',
  },
  {
    author: 'Gebreslassie Etsay MSc',
    role: 'Database Lecturer',
    text: 'Has the analytical depth and intellectual independence that research demands.',
    context: 'Recommended me for graduate study based on my exceptional database design work and research aptitude.',
  }
];

export const academicTimeline = [
  { year: 'Year 1', semester: 'Sem 1', gpa: '3.70' },
  { year: 'Year 1', semester: 'Sem 2', gpa: '3.93' },
  { year: 'Year 2', semester: 'Sem 1', gpa: '3.82' },
  { year: 'Year 5', semester: 'Sem 1', gpa: '3.96' },
  { year: 'Year 5', semester: 'Sem 2', gpa: '3.86' },
  { year: 'Final', semester: 'Graduation', gpa: '3.74', distinction: 'Cumulative GPA' },
];

export const businessImpact = [
  { metric: '60%', label: 'Organic Reach YoY', sub: 'Tech Startups' },
  { metric: '75%', label: 'Social Engagement', sub: 'Audience Growth' },
  { metric: 'Data', label: 'Google Analytics', sub: 'Dashboards Built' },
];
