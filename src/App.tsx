import React from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Events } from './components/Events';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <Events />
    </div>
  );
}