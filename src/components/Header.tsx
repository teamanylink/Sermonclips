import React from 'react';
import { Menu, Upload } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold text-white">SermonShare</h1>
          <div className="hidden md:flex space-x-6 text-white">
            <a href="#" className="hover:text-gray-200">Home</a>
            <a href="#" className="hover:text-gray-200">Features</a>
            <a href="#" className="hover:text-gray-200">Pricing</a>
            <a href="#" className="hover:text-gray-200">How It Works</a>
            <a href="#" className="hover:text-gray-200">Contact</a>
          </div>
          <Menu className="md:hidden text-white w-6 h-6" />
        </nav>
        
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Share Sermons With Ease and Impact
          </h2>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold flex items-center mx-auto hover:opacity-90 transition-opacity">
            <Upload className="w-5 h-5 mr-2" />
            Upload Your First Clip
          </button>
        </div>
      </div>
    </header>
  );
}