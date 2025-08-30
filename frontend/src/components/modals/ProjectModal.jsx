import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { X, Calendar, ExternalLink, Github, ChevronRight } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ongoing': return 'border-green-400 text-green-400 bg-green-400/10';
      case 'In Progress': return 'border-yellow-400 text-yellow-400 bg-yellow-400/10';
      case 'Completed': return 'border-blue-400 text-blue-400 bg-blue-400/10';
      default: return 'border-gray-400 text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-cyan-400/30 text-white">
        <DialogHeader className="relative">
          <DialogClose className="absolute right-0 top-0 p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </DialogClose>
          
          <div className="pr-10">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className="border-purple-400/50 text-purple-400">
                {project.category}
              </Badge>
              <Badge 
                variant="outline" 
                className={getStatusColor(project.status)}
              >
                {project.status}
              </Badge>
            </div>
            <DialogTitle className="text-3xl font-bold text-white mb-2">
              {project.title}
            </DialogTitle>
            <div className="flex items-center text-sm text-gray-400">
              <Calendar className="w-4 h-4 mr-2" />
              {project.timeline}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          </div>

          {/* Project Description */}
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">About This Project</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {project.longDescription}
            </p>
            <p className="text-gray-400">
              {project.description}
            </p>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">Technologies & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge 
                  key={index}
                  variant="outline"
                  className="border-green-400/50 text-green-400 bg-green-400/5 hover:bg-green-400/10"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">Key Features & Achievements</h3>
            <div className="space-y-2">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <ChevronRight className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Stats/Info */}
          <div className="grid md:grid-cols-3 gap-4 p-6 bg-slate-800/50 rounded-lg border border-cyan-400/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">
                {project.category === 'Video Production' ? '50+' : 
                 project.category === 'Game Development' ? '3+' : '1'}
              </div>
              <div className="text-sm text-gray-400">
                {project.category === 'Video Production' ? 'Videos Created' : 
                 project.category === 'Game Development' ? 'Features Built' : 'Website Built'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {project.technologies.length}
              </div>
              <div className="text-sm text-gray-400">Technologies Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {project.timeline.includes('2024') ? '2024' : 'Ongoing'}
              </div>
              <div className="text-sm text-gray-400">Project Year</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-700">
            {project.category === 'Web Development' && (
              <Button 
                className="bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:from-cyan-300 hover:to-green-300 font-semibold"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live Site
              </Button>
            )}
            
            {project.category === 'Video Production' && (
              <Button 
                className="bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:from-cyan-300 hover:to-green-300 font-semibold"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Watch Portfolio
              </Button>
            )}

            {project.category === 'Game Development' && (
              <Button 
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black"
              >
                <Github className="w-4 h-4 mr-2" />
                View Progress
              </Button>
            )}

            <Button 
              variant="outline"
              onClick={onClose}
              className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;