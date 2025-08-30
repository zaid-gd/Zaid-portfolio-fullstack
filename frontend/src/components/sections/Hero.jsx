import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/button';

const Hero = ({ data }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = ["Video Editor", "Game Developer", "Content Creator", "Digital Artist"];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, titles]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-green-400/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Hi, I'm </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                {data.name.split(' ')[0]}
              </span>
            </h1>
            
            <div className="text-2xl md:text-4xl font-light mb-8 h-16 flex items-center justify-center">
              <span className="text-gray-300">I'm a </span>
              <span className="text-cyan-400 ml-2 font-mono">
                {text}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={scrollToAbout}
              className="bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:from-cyan-300 hover:to-green-300 font-semibold px-8 py-3 text-lg"
            >
              Explore My Work
            </Button>
            <Button 
              variant="outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold px-8 py-3 text-lg"
            >
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            <a 
              href={`https://${data.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href={`https://${data.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              <Github size={24} />
            </a>
            <a 
              href={`mailto:${data.email}`}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              <Mail size={24} />
            </a>
            <a 
              href={`tel:${data.phone}`}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              <Phone size={24} />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={scrollToAbout}
            className="text-cyan-400 hover:text-white transition-colors duration-200 animate-bounce"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;