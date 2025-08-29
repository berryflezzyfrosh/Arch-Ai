import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import DreamVisualizer from './components/DreamVisualizer';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #0ea5e9'
          }
        }}
      />
      <Header />
      <Hero />
      <Features />
      <DreamVisualizer />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;