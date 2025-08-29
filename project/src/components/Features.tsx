import React from 'react';
import { Brain, Building, Star, Palette, Zap, Italic as Crystal } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Dream Analysis',
      description: 'Our advanced AI interprets your architectural dreams and converts them into detailed blueprints and 3D models with unprecedented accuracy.'
    },
    {
      icon: Building,
      title: 'Holographic Visualization',
      description: 'Experience your dream buildings in stunning holographic detail with our revolutionary visualization technology that brings imagination to life.'
    },
    {
      icon: Star,
      title: 'Reality Synthesis',
      description: 'Bridge the gap between dreams and reality with our patented Reality Synthesis engine that ensures your visions are architecturally sound.'
    },
    {
      icon: Palette,
      title: 'Infinite Creativity',
      description: 'No limits to your imagination. Create impossible structures, floating cities, and architectural marvels that defy conventional physics.'
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Watch your dreams materialize in real-time with our quantum-powered processing that generates complex structures in seconds.'
    },
    {
      icon: Crystal,
      title: 'Future Prediction',
      description: 'Our AI predicts how your dream architecture will evolve and adapt to future needs, ensuring timeless design relevance.'
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Revolutionary Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the cutting-edge technology that powers our dream architecture platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-500 hover:transform hover:scale-105"
            >
              {/* Animated Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              <div className="relative z-10">
                <div className="mb-6">
                  <feature.icon className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Scan Line Effect */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;