import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import FunFacts from './components/FunFacts';
import FriendlyTips from './components/FriendlyTips';
import Ticker from './components/Ticker';
import LunaFeature from './components/LunaFeature';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Skills from './components/Skills';
import Community from './components/Community';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LunaChat from './components/LunaChat';
import SplashScreen from './components/SplashScreen';
import SectionDivider from './components/SectionDivider';
import ScrollProgress from './components/ScrollProgress';
import CurrentlyPlaying from './components/CurrentlyPlaying';
import ScrollIndicator from './components/ScrollIndicator';

function App() {
  return (
    <>
      <SplashScreen />
      <ScrollProgress />

      <div className="relative z-10 font-body" style={{ color: 'var(--text)' }}>
        <Nav />
        <main>
          <Hero />
          <SectionDivider />
          <FriendlyTips />
          <SectionDivider />
          <Ticker />
          <SectionDivider />
          <LunaFeature />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Certificates />
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
        <ScrollIndicator />
      </div>
    </>
  );
}

export default App;
