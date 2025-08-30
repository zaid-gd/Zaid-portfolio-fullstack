import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ExternalLink, Eye, Calendar, ArrowRight } from 'lucide-react';

const Projects = ({ data, onProjectClick }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(data.map(project => project.category))];

  const filteredProjects = filter === 'All' 
    ? data 
    : data.filter(project => project.category === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ongoing': return 'border-green-400 text-green-400';
      case 'In Progress': return 'border-yellow-400 text-yellow-400';
      case 'Completed': return 'border-blue-400 text-blue-400';
      default: return 'border-gray-400 text-gray-400';
    }
  };

  return (
    <section id="projects" className="py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Featured </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8"></div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  onClick={() => setFilter(category)}
                  className={`
                    ${filter === category 
                      ? 'bg-gradient-to-r from-cyan-400 to-green-400 text-black' 
                      : 'border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10'
                    }
                    transition-all duration-200
                  `}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id}
                className="bg-slate-800/50 border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 group overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button
                        onClick={() => onProjectClick(project)}
                        className="w-full bg-cyan-400 text-black hover:bg-cyan-300 font-medium"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`absolute top-4 right-4 ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-purple-400/50 text-purple-400">
                      {project.category}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.timeline}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        variant="outline"
                        className="text-xs border-green-400/50 text-green-400"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-400/50 text-gray-400">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <Button
                    onClick={() => onProjectClick(project)}
                    variant="ghost"
                    className="w-full text-cyan-400 hover:text-white hover:bg-cyan-400/10 justify-between"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No projects found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;