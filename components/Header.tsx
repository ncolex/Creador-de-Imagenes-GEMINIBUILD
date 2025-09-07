
import React from 'react';

export const Header: React.FC = () => (
  <header className="w-full text-center py-6 md:py-10 border-b border-gray-700/50">
    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent bg-clip-text">
      AI Marketing Image Generator
    </h1>
    <p className="text-gray-400 mt-2 text-lg">Create stunning product visuals in seconds</p>
  </header>
);
