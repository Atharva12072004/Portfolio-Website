import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Achievements from '@/components/Achievements';
import VisitCounter from '@/components/VisitCounter';

const Index: React.FC = () => {
  useEffect(() => {
    // Scroll reveal logic
    const revealElements = document.querySelectorAll<HTMLElement>('.reveal');
    const revealOnScroll = () => {
      revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Inject Devicon stylesheet for skills icons
    const link = document.createElement('link');
    link.id = 'devicon-stylesheet';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
    document.head.appendChild(link);

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      document.getElementById('devicon-stylesheet')?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Achievements />
      <Blog />
      <Contact />
    </div>
  );
};

export default Index;
