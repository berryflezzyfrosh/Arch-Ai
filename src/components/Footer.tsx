import React from 'react';
import { Bot, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-cyan-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Bot className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              DreamArch
            </span>
          </div>
          
          <p className="text-gray-400 mb-2">
            &copy; 2025 DreamArch Technologies. Transforming dreams into architectural reality.
          </p>
          
          <p className="text-sm text-gray-500 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>• Patent Pending • Quantum-Powered • AI-Enhanced</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;