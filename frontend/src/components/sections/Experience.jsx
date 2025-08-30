import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, MapPin, Building, ChevronRight } from 'lucide-react';

const Experience = ({ data }) => {
  return (
    <section id="experience" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Professional </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                Experience
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto"></div>
          </div>

          <div className="space-y-8">
            {data.map((job, index) => (
              <Card 
                key={job.id} 
                className="bg-slate-800/50 border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Left Column - Job Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-cyan-400 mb-2">{job.title}</h3>
                        <div className="flex items-center space-x-2 text-gray-300 mb-2">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{job.duration}</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="border-green-400 text-green-400"
                        >
                          {job.type}
                        </Badge>
                      </div>
                    </div>

                    {/* Right Column - Description & Achievements */}
                    <div className="md:col-span-2 space-y-6">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {job.description}
                      </p>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <span className="text-green-400 mr-2">●</span>
                          Key Achievements
                        </h4>
                        <div className="space-y-3">
                          {job.achievements.map((achievement, achievementIndex) => (
                            <div key={achievementIndex} className="flex items-start space-x-3">
                              <ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                              <span className="text-gray-300">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <span className="text-purple-400 mr-2">●</span>
                          Technologies & Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech, techIndex) => (
                            <Badge 
                              key={techIndex}
                              variant="outline"
                              className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Indicator */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 hidden md:block">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full"></div>
                    <div className="w-0.5 h-full bg-gradient-to-b from-cyan-400 to-green-400 absolute left-1/2 transform -translate-x-1/2 top-3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Timeline Line for mobile */}
          <div className="relative md:hidden">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-green-400"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;