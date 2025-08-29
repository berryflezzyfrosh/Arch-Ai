import React, { useState } from 'react';
import { Sparkles, Shuffle, Wand2, Trash2, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';

const DreamVisualizer = () => {
  const [dreamInput, setDreamInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDream, setGeneratedDream] = useState('');

  const dreamExamples = [
    'A floating crystal palace with rainbow bridges',
    'Underwater city with bioluminescent towers',
    'Sky castle made of clouds and starlight',
    'Tree house city in an enchanted forest',
    'Futuristic pyramid with holographic walls',
    'Ice palace with aurora borealis ceiling'
  ];

  const generateDream = async () => {
    if (!dreamInput.trim()) {
      toast.error('Please describe your architectural dream first!');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGeneratedDream(`✨ Generating: "${dreamInput}"\n\n🏗️ AI Analysis Complete!\n\n📐 Architectural Elements Detected:\n• Structural Framework: Advanced\n• Material Composition: Innovative\n• Lighting Systems: Dynamic\n• Environmental Integration: Seamless\n\n🎨 Visual Rendering: 95% Complete\n\n🔮 Dream Feasibility Score: 9.2/10`);
    setIsGenerating(false);
    toast.success('Dream visualization generated!');
  };

  const randomDream = () => {
    const randomExample = dreamExamples[Math.floor(Math.random() * dreamExamples.length)];
    setDreamInput(randomExample);
    toast.success('Random dream inspiration loaded!');
  };

  const enhanceDream = () => {
    if (!dreamInput.trim()) {
      toast.error('Please enter a dream description first!');
      return;
    }
    
    const enhancements = [
      'with holographic elements',
      'featuring quantum architecture',
      'incorporating bio-luminescent materials',
      'with gravity-defying structures',
      'enhanced with AI-responsive environments',
      'featuring interdimensional portals'
    ];
    
    const enhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    setDreamInput(prev => `${prev} ${enhancement}`);
    toast.success('Dream enhanced with AI creativity!');
  };

  const clearVisualization = () => {
    setDreamInput('');
    setGeneratedDream('');
    toast.success('Visualization cleared!');
  };

  return (
    <section id="visualizer" className="py-24 bg-gradient-to-br from-slate-900 to-indigo-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Dream Visualizer Interface
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Describe your architectural vision and watch our AI transform it into reality
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-cyan-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Animated Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl animate-pulse"></div>
          
          <div className="relative z-10">
            {/* Dream Input */}
            <div className="mb-8">
              <textarea
                value={dreamInput}
                onChange={(e) => setDreamInput(e.target.value)}
                placeholder="Describe your architectural dream... (e.g., 'A floating crystal palace with rainbow bridges')"
                className="w-full h-32 p-6 bg-slate-900/80 border border-cyan-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={generateDream}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                <span>{isGenerating ? 'Generating...' : 'Generate Dream'}</span>
              </button>

              <button
                onClick={randomDream}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <Shuffle className="w-5 h-5" />
                <span>Random Dream</span>
              </button>

              <button
                onClick={enhanceDream}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25"
              >
                <Wand2 className="w-5 h-5" />
                <span>Enhance</span>
              </button>

              <button
                onClick={clearVisualization}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25"
              >
                <Trash2 className="w-5 h-5" />
                <span>Clear</span>
              </button>
            </div>

            {/* Visualization Area */}
            <div className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-8 min-h-[400px] relative overflow-hidden">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                    <Building2 className="absolute inset-0 m-auto w-6 h-6 text-cyan-400" />
                  </div>
                  <p className="mt-4 text-cyan-400 font-semibold animate-pulse">
                    Processing your dream...
                  </p>
                </div>
              ) : generatedDream ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-xl font-bold text-cyan-400">Dream Analysis Complete</h3>
                  </div>
                  <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed bg-slate-800/50 p-6 rounded-xl border border-cyan-500/20">
                    {generatedDream}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Building2 className="w-16 h-16 text-gray-500 mb-4 animate-pulse" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    Your architectural dreams will appear here
                  </h3>
                  <p className="text-gray-500">
                    Enter a description above and click Generate Dream
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamVisualizer;