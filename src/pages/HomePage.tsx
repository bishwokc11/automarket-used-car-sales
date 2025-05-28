import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BarChart2, Calculator, MessageCircle, ArrowRight } from 'lucide-react';
import SearchForm from '../components/search/SearchForm';
import FeaturedCars from '../components/cars/FeaturedCars';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-r from-blue-900 to-blue-700 pt-24 pb-32 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay"
        }}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-75"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Find Your Perfect Used Car
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Compare prices, features, and dealerships to make the best decision for your next vehicle purchase.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose AutoMarket
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-8 text-center transition-transform duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center bg-blue-900 text-white rounded-full w-16 h-16 mb-6">
                <BarChart2 size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compare Deals</h3>
              <p className="text-gray-600">
                Compare prices and features between different dealerships to find the best value for your money.
              </p>
              <Link to="/compare" className="inline-flex items-center text-blue-900 font-medium mt-4 hover:underline">
                Start comparing <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-8 text-center transition-transform duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center bg-emerald-700 text-white rounded-full w-16 h-16 mb-6">
                <Calculator size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Financial Calculator</h3>
              <p className="text-gray-600">
                Calculate monthly payments, interest rates, and determine what you can afford.
              </p>
              <Link to="/calculator" className="inline-flex items-center text-emerald-700 font-medium mt-4 hover:underline">
                Calculate now <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-8 text-center transition-transform duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center bg-amber-600 text-white rounded-full w-16 h-16 mb-6">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Assistant</h3>
              <p className="text-gray-600">
                Get instant answers to your car-related questions from our AI-powered assistant.
              </p>
              <Link to="/assistant" className="inline-flex items-center text-amber-600 font-medium mt-4 hover:underline">
                Ask now <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
            <Link 
              to="/listings" 
              className="inline-flex items-center text-blue-900 font-medium hover:underline"
            >
              View all listings <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <FeaturedCars />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next Car?</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Browse our extensive inventory of quality used cars from trusted dealerships.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/listings"
              className="bg-white text-blue-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full shadow-lg transition-colors"
            >
              Browse Listings
            </Link>
            <Link
              to="/calculator"
              className="bg-transparent hover:bg-blue-800 border-2 border-white font-semibold py-3 px-8 rounded-full shadow-lg transition-colors"
            >
              Use Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;