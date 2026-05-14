import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import LunaFeature from './components/LunaFeature';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Motivation from './components/Motivation';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import ScrollProgress from './components/ScrollProgress';
import CursorTrail from './components/CursorTrail';
import LunaChat from './components/LunaChat';
import FriendlyTips from './components/FriendlyTips';
import BeyondCode from './components/BeyondCode';
import { NoiseOverlay } from './components/NoiseOverlay';
import MatrixBackground from './components/MatrixBackground';
import CurrentlyPlaying from './components/CurrentlyPlaying';
import TerminalModal from './components/TerminalModal';
import SecretVideoModal from './components/SecretVideoModal';
import { useState } from 'react';

function App() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const handleOpenVideo = () => setIsVideoOpen(true);
    window.addEventListener('open-secret-video', handleOpenVideo);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Luna is waiting... 🌙";
      } else {
        document.title = "Asmeret Teklu | Software Engineer";
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener('open-secret-video', handleOpenVideo);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <SplashScreen />
      <ScrollProgress />
      <CursorTrail />
      <LunaChat />
      <CurrentlyPlaying />
      <TerminalModal />
      <SecretVideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

      <div className="relative z-10 font-body bg-transparent selection:bg-[var(--accent-light)] selection:text-[var(--accent)] transition-colors duration-500">
        <MatrixBackground />
        <Nav />
        <main>
          <Hero />
          
          <div className="space-y-32 md:space-y-48 pb-32">
            <Ticker />
            <LunaFeature />
            <FriendlyTips />
            <Projects />
            <Motivation />
            <About />
            <Skills />
            <BeyondCode />
            <Certificates />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

