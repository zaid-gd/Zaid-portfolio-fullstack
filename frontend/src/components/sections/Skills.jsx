import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { Video, Gamepad2, Cpu, ChevronRight } from 'lucide-react';

const iconMap = {
  Video: Video,
  Gamepad2: Gamepad2,
  Cpu: Cpu
};

const Skills = ({ data }) => {
  return (
    <section id="skills" className="py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Technical </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                Skills
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(data).map(([skillName, skillData], index) => {
              const IconComponent = iconMap[skillData.icon];
              
              return (
                <Card 
                  key={skillName} 
                  className="bg-slate-800/50 border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg">
                        <IconComponent className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {skillName}
                      </h3>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Proficiency</span>
                        <span className="text-sm font-medium text-cyan-400">
                          {skillData.level}%
                        </span>
                      </div>
                      <Progress 
                        value={skillData.level} 
                        className="h-2 bg-slate-700"
                      />
                    </div>

                    <div className="space-y-2">
                      {skillData.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2 text-sm text-gray-300">
                          <ChevronRight className="w-3 h-3 text-green-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                          {index === 0 ? 'Professional' : index === 1 ? 'Learning' : 'Emerging'}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          index === 0 ? 'bg-green-400' : 
                          index === 1 ? 'bg-yellow-400' : 
                          'bg-purple-400'
                        }`}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;