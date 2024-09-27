import React from 'react';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-700 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="mb-2">We'd love to see you on social media</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Instagram size={24} />
              <Facebook size={24} />
              <Twitter size={24} />
              <Youtube size={24} />
            </div>
          </div>
          <div className="flex space-x-12">
            <div>
              <h3 className="font-semibold mb-2">General</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline">About us</a></li>
                <li><a href="#" className="hover:underline">Reviews</a></li>
                <li><a href="#" className="hover:underline">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Activities</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline">Health & Wellness</a></li>
                <li><a href="#" className="hover:underline">Cooking</a></li>
                <li><a href="#" className="hover:underline">Art & Crafts</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-transparent border border-white rounded-full px-4 py-1 hover:bg-white hover:text-green-700 transition-colors">
            Help
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;