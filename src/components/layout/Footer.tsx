import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {currentYear} Ramesh Edirisinghe. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
          <a href="/about" className="hover:text-yellow-500 transition-colors">About</a>
          <a href="/privacy" className="hover:text-yellow-500 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-yellow-500 transition-colors">Terms of Service</a>
          <a href="/contact" className="hover:text-yellow-500 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;