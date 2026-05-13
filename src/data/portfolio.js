export const person = {
  name: { first: 'Asmeret', last: 'Teklu' },
  fullName: 'Asmeret Teklu Gebremedhin',
  title: 'Software Engineer',
  tagline: 'I write code to solve real-world problems and tell stories. ✦',
  location: 'Mekelle, Tigray, Ethiopia',
  email: 'asmeretteklu03@gmail.com',
  phone: '+251 930 679 039',
  github: 'https://github.com/asmeretteklu',
  linkedin: 'https://linkedin.com/in/asmeretteklu',
  bio: "Forged in resilience, engineered for impact. ✍️ My journey began with handwritten notes during internet blackouts—a testament to a conviction that technology isn't just code, but a lifeline. 🕯️ Today, I architect production-grade systems, from real-time lottery infrastructures to AI-driven health ecosystems for women across Africa. 🌍 I build with the intent to solve structural problems, proving that exceptional software can emerge from the toughest constraints. ✨",
};

export const stats = [
  { id: 'apps', value: '4', label: 'Production Systems', sub: 'Built & Deployed' },
  { id: 'users', value: '800+', label: 'Total Users Served', sub: 'Keno (500+), Microlink (300+)' },
  { id: 'gpa', value: '3.74', label: 'GPA', sub: 'Great Distinction' },
];

export const projects = [
  {
    id: 'keno',
    name: 'Keno Lottery Platform',
    accent: 'Full-Stack',
    status: 'live',
    statusLabel: 'Live and running',
    featured: true,
    description: 'I built this entire lottery management system from scratch. It handles real-time draws and live results without the page ever refreshing. It has different dashboards for admins, cashiers, agents, and players to keep everything secure and organized.',
    metrics: [
      { value: '5', label: 'Different roles' },
      { value: 'Live', label: 'Status' }
    ],
    tags: ['React', 'Node.js', 'Socket.io', 'MySQL', 'RBAC'],
    github: 'https://github.com/asmeretteklu/keno-system',
    demo: 'https://asmeret-keno.vercel.app', // Example demo link
  },
  {
    id: 'luna',
    name: 'Luna — Women\'s Health App',
    accent: 'AI & Health',
    status: 'dev',
    statusLabel: 'Building right now',
    featured: true,
    description: 'A passion project of mine. It\'s a cycle tracking app specifically designed for Ethiopian and African women. I\'m integrating the Gemini AI to provide health guidance based on local diets, and making sure it supports both Amharic and English natively.',
    metrics: [
      { value: 'Gemini', label: 'AI Powered' },
      { value: 'Bilingual', label: 'Amharic & English' }
    ],
    tags: ['React Native', 'Expo', 'Supabase', 'Gemini API'],
    github: 'https://github.com/asmeretteklu/luna-health',
    demo: 'https://github.com/asmeretteklu/luna-health',
  },
  {
    id: 'registration',
    name: 'Microlink Registration System',
    accent: 'Automation',
    status: 'live',
    statusLabel: 'Used by Microlink students',
    featured: true,
    description: 'I noticed students at Microlink IT College were waiting up to 7 days just to register and pay fees. I built a system that automated the whole process, cutting the time down to about 5 minutes per student.',
    metrics: [
      { value: '99%', label: 'Faster registration' },
      { value: 'Microlink', label: 'Used at' }
    ],
    tags: ['HTML/CSS/JS', 'MySQL', 'PHP'],
    github: 'https://github.com/asmeretteklu/microlink-registration',
    demo: 'https://github.com/asmeretteklu/microlink-registration',
  },
];

export const skills = [
  { 
    group: 'Programming Languages', 
    items: ['JavaScript', 'TypeScript', 'Node.js', 'Python', 'C++'] 
  },
  { 
    group: 'Frontend & Mobile', 
    items: ['React', 'React Native', 'Expo', 'HTML/CSS', 'Tailwind CSS'] 
  },
  { 
    group: 'Backend & Databases', 
    items: ['Express.js', 'MySQL', 'Supabase', 'Socket.io', 'REST APIs'] 
  },
  { 
    group: 'Tools & Extras', 
    items: ['Gemini API', 'Git & GitHub', 'System Architecture', 'SEO'] 
  },
];

export const certifications = [
  { name: 'Data Analysis Fundamentals', detail: 'Udacity (5 Million Ethiopian Coders Initiative)' },
  { name: 'Programming Fundamentals', detail: 'Udacity (5 Million Ethiopian Coders Initiative)' },
  { name: 'Legacy Full Stack', detail: 'freeCodeCamp' },
  { name: 'Scientific Computing with Python', detail: 'freeCodeCamp' },
  { name: 'CS50x — Intro to Computer Science', detail: 'Harvard University' },
];

export const academicTimeline = [
  { year: 'Year 1', semester: 'Sem 1', gpa: '3.70' },
  { year: 'Year 2', semester: 'Sem 2', gpa: '3.93' },
  { year: 'Year 3', semester: 'Sem 1', gpa: '3.82' },
  { year: 'Final Year', semester: 'Sem 1', gpa: '3.96' },
  { year: 'Graduation', semester: 'Aug 2025', gpa: '3.74', distinction: 'Great Distinction' },
];

export const community = [
  { 
    title: 'Mentor', 
    org: 'Women in Tech Ethiopia', 
    desc: 'Guiding female developers through bootcamps and career development.' 
  },
  { 
    title: 'Volunteer Instructor', 
    org: 'Community Tech Hub, Mekelle', 
    desc: 'Teaching coding skills to underserved youth in Mekelle.' 
  },
  { 
    title: 'Active Member', 
    org: 'Ethiopian Developers Community', 
    desc: 'Open-source collaboration and knowledge sharing.' 
  },
];

export const businessImpact = [
  { metric: '40%', label: 'Search Visibility', sub: 'Technical SEO' },
  { metric: '60%', label: 'Organic Reach', sub: 'Startup Growth' },
  { metric: '75%', label: 'Engagement', sub: 'Social Strategy' },
];

export const testimonials = [
  {
    author: 'Amanuel Belachew Beyene',
    role: 'Cyber Security Analyst, INSA Ethiopia',
    text: 'A highly competent engineer with the analytical depth to solve complex structural problems.',
    context: 'Professional Reference',
  }
];

export const tickerItems = [
  'Software Engineer ✦', 'Building Luna AI ✦', 'Full Stack Developer ✦', 'Based in Mekelle ✦', 'Open to Collaborations ✦'
];

export const lunaSystemPrompt = "You are Luna, a friendly AI assistant built by Asmeret Teklu. You know everything about Asmeret's work, including the Keno platform, her student registration system, and her latest project (also named Luna) which focuses on women's health. You answer questions about her skills, projects, and professional background with a touch of warmth and intelligence.";

export const starterQuestions = [
  "Tell me about Asmeret's Keno platform",
  "What is the Luna health project?",
  "Tell me about her work at Microlink",
  "What are her core technical skills?"
];

