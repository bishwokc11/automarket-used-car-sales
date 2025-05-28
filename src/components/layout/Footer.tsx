import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8" />
              <span className="text-xl font-bold">AutoMarket</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Your trusted destination for finding the perfect used car at the best price.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-300 hover:text-white">Browse Cars</Link>
              </li>
              <li>
                <Link to="/compare" className="text-gray-300 hover:text-white">Compare Vehicles</Link>
              </li>
              <li>
                <Link to="/calculator" className="text-gray-300 hover:text-white">Financial Calculator</Link>
              </li>
              <li>
                <Link to="/assistant" className="text-gray-300 hover:text-white">AI Assistant</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Car Buying Guide</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Financing Options</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Vehicle History</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Customer Reviews</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Dealership Ratings</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p>123 Auto Lane</p>
              <p>Car City, CS 12345</p>
              <p className="mt-3">info@automarket.com</p>
              <p>(555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <p className="text-sm text-gray-300 text-center">
            &copy; {new Date().getFullYear()} AutoMarket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;