import React from 'react';
import { Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';

const Footer = ({ data }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-cyan-400/20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="text-3xl font-bold mb-4">
                <span className="text-white">Zaid</span>
                <span className="text-cyan-400">.dev</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Video Editor & Game Developer passionate about creating engaging digital experiences 
                through visual storytelling and interactive design.
              </p>
              <div className="flex space-x-4">
                <a 
                  href={`https://${data.linkedin}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 hover:bg-cyan-400 text-gray-400 hover:text-black rounded-lg transition-all duration-200"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href={`https://${data.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 hover:bg-cyan-400 text-gray-400 hover:text-black rounded-lg transition-all duration-200"
                >
                  <Github size={20} />
                </a>
                <a 
                  href={`mailto:${data.email}`}
                  className="p-2 bg-slate-800 hover:bg-cyan-400 text-gray-400 hover:text-black rounded-lg transition-all duration-200"
                >
                  <Mail size={20} />
                </a>
                <a 
                  href={`tel:${data.phone}`}
                  className="p-2 bg-slate-800 hover:bg-cyan-400 text-gray-400 hover:text-black rounded-lg transition-all duration-200"
                >
                  <Phone size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        const element = document.getElementById(item.toLowerCase());
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">{data.location}</p>
                <p className="text-gray-400">{data.email}</p>
                <p className="text-gray-400">{data.phone}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-cyan-400/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Zaid Ali Ansari. All rights reserved.
            </p>
            
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;