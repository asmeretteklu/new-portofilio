import { useEffect } from 'react';
import StarField from './components/StarField';
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
import NoiseOverlay from './components/NoiseOverlay';
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
  // Prevent double scrolling issues occasionally seen with hidden cursors
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* CMD-01: Loading Splash Screen */}
      <SplashScreen />
      <ScrollProgress />

      <NoiseOverlay />
      <StarField />
      
      {/* Hide custom cursor on very small touch devices since it's redundant/buggy */}
      <div className="hidden md:block">
        <Cursor />
      </div>

      <div className="relative z-10 font-ui text-paper selection:bg-gold selection:text-ink">
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

        {/* CMD-12: Currently Playing Easter Egg */}
        <CurrentlyPlaying />
      </div>
    </>
  );
}

export default App;
