import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car, BarChart2, Calculator, MessageCircle } from 'lucide-react';
import { useComparison } from '../../contexts/ComparisonContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { carsToCompare } = useComparison();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navigation = [
    { name: 'Home', path: '/', icon: <Car size={20} /> },
    { name: 'Listings', path: '/listings', icon: <Car size={20} /> },
    { name: 'Compare', path: '/compare', icon: <BarChart2 size={20} /> },
    { name: 'Calculator', path: '/calculator', icon: <Calculator size={20} /> },
    { name: 'AI Assistant', path: '/assistant', icon: <MessageCircle size={20} /> },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-900" />
            <span className="text-xl font-bold text-blue-900">AutoMarket</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-900 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.path === '/compare' && carsToCompare.length > 0 && (
                  <span className="ml-1 bg-blue-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {carsToCompare.length}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-900 focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-blue-900 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
                }`}
                onClick={closeMenu}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.path === '/compare' && carsToCompare.length > 0 && (
                  <span className="ml-1 bg-blue-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {carsToCompare.length}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;