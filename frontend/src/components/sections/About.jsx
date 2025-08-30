import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

const About = ({ data }) => {
  return (
    <section id="about" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">About </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                {data.description}
              </p>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Key Highlights</h3>
                <div className="grid gap-3">
                  {data.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-cyan-400/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Current Focus</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Video Production</span>
                      <Badge variant="outline" className="border-green-400 text-green-400">
                        Active
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Game Development</span>
                      <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                        Learning
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">AI Technologies</span>
                      <Badge variant="outline" className="border-purple-400 text-purple-400">
                        Exploring
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-400/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Education</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white">Higher Secondary Education</p>
                      <p className="text-sm text-gray-400">Commerce Stream • Expected 2026</p>
                    </div>
                    <div>
                      <p className="font-medium text-white">10th Standard</p>
                      <p className="text-sm text-gray-400">73.60% • Maharashtra State Board</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;