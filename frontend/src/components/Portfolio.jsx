import React, { useState, useEffect } from 'react';
import { mockData } from '../mock';
import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ProjectModal from './modals/ProjectModal';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-cyan-400 text-lg font-mono">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Header />
      <Hero data={mockData.personal} />
      <About data={mockData.about} />
      <Skills data={mockData.skills} />
      <Experience data={mockData.experience} />
      <Projects 
        data={mockData.projects} 
        onProjectClick={setSelectedProject}
      />
      <Contact />
      <Footer data={mockData.personal} />
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;