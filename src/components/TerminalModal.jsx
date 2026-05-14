import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';
import { person, projects } from '../data/portfolio';

const TerminalModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { type: 'system', content: 'Asmeret OS Terminal [Version 2.0.1]' },
    { type: 'system', content: 'Type "help" to see available commands. Press Esc to exit.' }
  ]);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key === 'k') || e.key === '`') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleToggle = () => setIsOpen(prev => !prev);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-terminal', handleToggle);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-terminal', handleToggle);
    };
  }, [isOpen]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, { type: 'user', content: `guest@asmeret:~$ ${input}` }];
    const cmd = input.trim().toLowerCase();

    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'system', content: `Available commands:
  who_is_she     → The person behind the code
  story          → How I got here
  mission        → What I'm building and why  
  projects       → Production systems I've shipped
  skills         → My technical stack
  fun_facts      → Things you won't find on my CV
  philosophy     → How I think about software
  contact        → Let's talk
  why            → The reason I build
  clear          → Clear terminal
  exit           → Close terminal` });
        break;
      case 'who_is_she':
        newHistory.push({ type: 'success', content: `Name:      Asmeret Teklu Gebremedhin
Role:      Software Engineer & Builder
Location:  Mekelle, Tigray, Ethiopia (GMT+3)
Status:    Building Luna AI. Applying for MSc in Italy.
GPA:       3.74/4.0 — Great Distinction, Top of Cohort
Graduated: August 2025, BSc Software Engineering
Focus:     Full-stack systems + AI integration
Known for: Shipping real products under impossible conditions` });
        break;
      case 'story':
        newHistory.push({ type: 'system', content: `I chose Software Engineering before I owned a computer.
That's not a metaphor. I literally did not have a device.

I studied in Mekelle, Tigray — a region that went through
one of the deadliest wars in the world from 2020 to 2022.
No electricity. No internet. Some days, not enough food.
I studied from handwritten notes and printed materials.
I kept going.

In Grade 12, our examination results were manipulated
by political interests. Our scores were altered.
I didn't get the public university place I had earned.
So I found a private college and chose Software Engineering again.
Same dream. Different door.

When the Pretoria Agreement ended the war in November 2022
and things slowly reopened — I went straight back to my work.

I graduated August 2025. GPA 3.74. Top of my cohort.
Then I built a lottery management system. Then a women's
health AI. Then I started applying for Master's degrees in Italy.

I don't have a dramatic ending to this story yet.
I'm still writing it.` });
        break;
      case 'mission':
        newHistory.push({ type: 'system', content: `Software should make life easier for the people
who need it most — not just the people who can
already afford the expensive version.

I build for:
  → Ethiopian women ignored by global health tech (Luna AI)
  → Students waiting 7 days to register for class (5 minutes now)
  → Communities with slow internet and power cuts (offline-first)
  → People who deserve good software but rarely get it

Long term: I want to build data-driven systems that address
real structural problems across Africa — healthcare access,
agricultural intelligence, financial inclusion.

Currently: applying for MSc Computer Science in Italy
to get the depth I need to build smarter, not just faster.` });
        break;
      case 'projects':
        newHistory.push({ type: 'system', content: `[1] Keno Lottery Management Platform
    Stack:  React · Node.js · Socket.io · MySQL · RBAC
    Status: LIVE in production
    What:   5 role-based interfaces (admin, cashier, agent,
            viewer, player) with real-time draw results.
            Results update live — no page refresh.
    Built:  From scratch. By myself. Still running.

[2] Luna AI — Women's Health App
    Stack:  React Native · Expo · Supabase · Gemini API
    Status: Private alpha testing
    What:   Menstrual cycle intelligence for Ethiopian
            and African women. Mood detection. Phase-based
            health guidance. Bilingual: Amharic + English.
            Built by someone who is one of the women it serves.

[3] Microlink Registration System
    Stack:  HTML/CSS/JS · MySQL · PHP
    Status: LIVE at Microlink IT College
    What:   Reduced student registration from 7 days to 5 minutes.
            That's not an improvement. That's a transformation.

[4] EthioMarket
    Stack:  React · Node.js · MySQL
    Status: Live
    What:   E-commerce platform for Ethiopian artisans.
            Getting handmade work in front of people who
            will actually pay for it.

Type a project number for more details.` });
        break;
      case 'skills':
        newHistory.push({ type: 'system', content: `Languages:    JavaScript · TypeScript · Python · C++
Frontend:     React · React Native · Expo · Tailwind CSS
Backend:      Node.js · Express.js · REST APIs · Socket.io
Databases:    MySQL · Supabase
AI/APIs:      Gemini API · AI integration · Prompt engineering
Tools:        Git · GitHub · System Architecture · SEO
Mobile:       Offline-first sync · Bilingual UI

Currently learning: Machine learning · Data systems
                    (hence the Master's applications)

Honest about gaps: I am a builder, not a theoretician.
I know how to ship. I am learning how to go deeper.` });
        break;
      case 'fun_facts':
        newHistory.push({ type: 'system', content: `→ I debug by talking to myself out loud. It works every time.
→ I named my app Luna because she works even in the dark.
→ I write better code after Ethiopian coffee. Always.
→ I studied computer science before I owned a computer.
→ I mentor young women in tech in Mekelle.
   Because if I had had someone like that — things would
   have been different. So I became that person.
→ Tigrinya is my mother tongue. Amharic is my city language.
   English is how I talk to the world.
→ My GPA went UP during the war. Make of that what you will.` });
        break;
      case 'philosophy':
        newHistory.push({ type: 'system', content: `Good software is not just clean code.
It's code that understands the person using it.

I build for:
  → Slow connections, not fast ones
  → Users who speak Amharic and Tigrinya, not just English
  → People solving real problems, not demo problems
  → Contexts where failure is not a learning opportunity —
    it's someone's actual life

I believe constraints make better engineers.
I have had plenty of constraints.` });
        break;
      case 'contact':
        newHistory.push({ type: 'system', content: `Email:     asmeretteklu03@gmail.com
GitHub:    github.com/asmeretteklu
LinkedIn:  linkedin.com/in/asmeretteklu
Location:  Mekelle, Tigray, Ethiopia (GMT+3)
Status:    Open to collaborations, opportunities,
           and conversations worth having.

Response time: Usually within 24 hours.
Preferred:     Email for professional inquiries.
               GitHub for code conversations.

I read every message. I reply to all of them.` });
        break;
      case 'why':
        newHistory.push({ type: 'system', content: `I build because technology in my region has historically
been something that happened to us — not something built
by us, for us, in our languages, for our conditions.

Luna AI exists because no one built it for Ethiopian women.
The registration system exists because students were
waiting 7 days for something that should take 5 minutes.
The Keno platform exists because someone needed it to work
in real time and asked if I could do it.

I could. I did.

The Master's degree exists because I want to build
smarter solutions to harder problems — and I need
deeper tools to do that properly.

That is why.` });
        break;
      case 'sudo':
        newHistory.push({ type: 'error', content: 'Nice try. This incident will be reported.' });
        break;
      case 'matrix':
        newHistory.push({ type: 'success', content: 'Wake up, Neo... \nThe Matrix has you... \nFollow the white rabbit. 🐇' });
        break;
      case 'unlocked':
      case 'journey':
        newHistory.push({ type: 'success', content: 'AUTHENTICATING... \nACCESS GRANTED. \nLaunching visual transmission... ✦' });
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('open-secret-video'));
        }, 1000);
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        setInput('');
        return;
      default:
        newHistory.push({ type: 'error', content: `bash: ${cmd}: command not found` });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[9999] w-full sm:w-[550px] sm:max-w-[calc(100vw-48px)] h-[60vh] sm:h-[400px] bg-[var(--term-bg)] border-t sm:border border-[var(--border)] rounded-t-2xl sm:rounded-xl shadow-[0_-10px_50px_rgba(0,0,0,0.3)] sm:shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden font-mono text-xs sm:text-sm transition-colors duration-500"
        >
          {/* Header */}
          <div className="bg-[var(--term-header)] p-4 sm:p-3 flex items-center justify-between border-b border-[var(--border)] select-none cursor-move">
            <div className="flex items-center gap-3 text-[var(--term-accent)]">
              <Terminal size={14} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Engineer_Terminal</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#888] hover:text-[var(--accent)] transition-colors p-1"
            >
              <X size={14} />
            </button>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-5 overflow-y-auto text-[var(--term-text)]">
            {history.map((log, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={i} 
                className={`mb-2 whitespace-pre-wrap leading-relaxed ${
                  log.type === 'error' ? 'text-red-500' : 
                  log.type === 'user' ? 'opacity-90' : 
                  log.type === 'success' ? 'text-[var(--term-accent)] font-bold' :
                  'opacity-60'
                }`}
              >
                {log.content}
              </motion.div>
            ))}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleCommand} className="p-5 pt-0 flex gap-3 text-[var(--term-text)]">
            <span className="shrink-0 text-[var(--term-prompt)] font-bold">guest@asmeret:~$</span>
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[var(--term-text)] font-mono placeholder:opacity-30"
              placeholder="Type a command..."
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="none"
              inputMode="text"
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalModal;
