import { useEffect } from 'react';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import LunaFeature from './components/LunaFeature';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Skills from './components/Skills';
import Community from './components/Community';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LunaChat from './components/LunaChat';
import SplashScreen from './components/SplashScreen';
import SectionDivider from './components/SectionDivider';
import CurrentlyPlaying from './components/CurrentlyPlaying';
import ScrollProgress from './components/ScrollProgress';

// SETUP INSTRUCTIONS for Deployment:
// 1. Drop your photo as public/photo.jpg
// 2. Set VITE_GEMINI_API_KEY inside your .env file or deployment variables.
// 3. run `npm run build`
// 4. Drag `dist/` to Netlify.

function App() {
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <SplashScreen />
      <ScrollProgress />

      {/* Hide custom cursor on very small touch devices */}
      <div className="hidden md:block">
        <Cursor />
      </div>

      <div className="relative z-10 font-body" style={{ color: 'var(--text)' }}>
        <Nav />
        <main>
          <Hero />
          <Ticker />
          <SectionDivider />
          <LunaFeature />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Testimonials />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Community />
          <SectionDivider />
          <Contact />
        </main>
        <Footer />
        <LunaChat />
        <CurrentlyPlaying />
      </div>
    </>
  );
}

export default App;
