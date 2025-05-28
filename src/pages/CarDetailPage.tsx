import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Activity, Fuel, Check, Heart, Phone, Mail, ArrowLeft, Plus, Minus, Star } from 'lucide-react';
import { mockCars } from '../data/mockCars';
import { CarListing } from '../types/car';
import { useComparison } from '../contexts/ComparisonContext';

const CarDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarListing | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const { addCarToCompare, removeCarFromCompare, isCarInComparison } = useComparison();
  
  useEffect(() => {
    if (id) {
      const foundCar = mockCars.find(c => c.id === id);
      if (foundCar) {
        setCar(foundCar);
      }
    }
  }, [id]);

  if (!car) {
    return (
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Car not found</h2>
          <Link to="/listings" className="text-blue-900 hover:underline">
            Back to listings
          </Link>
        </div>
      </div>
    );
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const handleCompareToggle = () => {
    if (isCarInComparison(car.id)) {
      removeCarFromCompare(car.id);
    } else {
      addCarToCompare(car);
    }
  };

  const isInComparison = isCarInComparison(car.id);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link 
            to="/listings" 
            className="inline-flex items-center text-blue-900 hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to listings
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="h-64 md:h-96 lg:h-auto">
              <img 
                src={car.imageUrl} 
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {car.year} {car.make} {car.model}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span>{car.dealership.name} | {car.dealership.location}</span>
                  </div>
                </div>
                <button
                  className="bg-white text-gray-500 hover:text-red-500 p-2 rounded-full border border-gray-200"
                >
                  <Heart size={20} />
                </button>
              </div>
              
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-blue-900 mb-1">
                  {formatPrice(car.price)}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2 text-blue-900" />
                  <div>
                    <div className="text-sm text-gray-600">Year</div>
                    <div className="font-medium">{car.year}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Activity size={18} className="mr-2 text-blue-900" />
                  <div>
                    <div className="text-sm text-gray-600">Mileage</div>
                    <div className="font-medium">{formatMileage(car.mileage)} mi</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Fuel size={18} className="mr-2 text-blue-900" />
                  <div>
                    <div className="text-sm text-gray-600">Fuel</div>
                    <div className="font-medium">{car.fuelType}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Check size={18} className="mr-2 text-blue-900" />
                  <div>
                    <div className="text-sm text-gray-600">Transmission</div>
                    <div className="font-medium">{car.transmission}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                <button 
                  className="bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 rounded-md font-medium transition-colors"
                  onClick={() => setShowPhoneNumber(!showPhoneNumber)}
                >
                  <Phone size={18} className="inline-block mr-2" />
                  {showPhoneNumber ? car.dealership.contactPhone : 'Show Phone Number'}
                </button>
                
                <button 
                  className="border border-blue-900 text-blue-900 hover:bg-blue-50 py-3 px-6 rounded-md font-medium transition-colors"
                  onClick={handleCompareToggle}
                >
                  {isInComparison ? (
                    <>
                      <Minus size={18} className="inline-block mr-2" />
                      Remove from Compare
                    </>
                  ) : (
                    <>
                      <Plus size={18} className="inline-block mr-2" />
                      Add to Compare
                    </>
                  )}
                </button>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center">
                  <div className="mr-2">
                    <div className="flex items-center text-amber-500">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} className="text-gray-300" stroke="currentColor" />
                    </div>
                  </div>
                  <div className="text-gray-700">
                    Dealership rated {car.dealership.rating}/5 based on reviews
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                className={`px-6 py-4 font-medium text-sm border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm border-b-2 ${
                  activeTab === 'features'
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm border-b-2 ${
                  activeTab === 'dealership'
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('dealership')}
              >
                Dealership
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Vehicle Details</h3>
                <p className="text-gray-700 mb-6">
                  {car.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li className="flex justify-between">
                        <span className="text-gray-500">Make:</span>
                        <span>{car.make}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Model:</span>
                        <span>{car.model}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Year:</span>
                        <span>{car.year}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Body Style:</span>
                        <span>{car.bodyType}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">VIN:</span>
                        <span>{car.vin}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Performance & Specs</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li className="flex justify-between">
                        <span className="text-gray-500">Engine:</span>
                        <span>{car.engine}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Transmission:</span>
                        <span>{car.transmission}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Fuel Type:</span>
                        <span>{car.fuelType}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Mileage:</span>
                        <span>{formatMileage(car.mileage)} mi</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Appearance</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li className="flex justify-between">
                        <span className="text-gray-500">Exterior Color:</span>
                        <span>{car.exteriorColor}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Interior Color:</span>
                        <span>{car.interiorColor}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Vehicle Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center py-2">
                      <Check size={18} className="mr-2 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'dealership' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Dealership Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{car.dealership.name}</h4>
                    <p className="flex items-center text-gray-700 mb-2">
                      <MapPin size={18} className="mr-2 text-blue-900" />
                      {car.dealership.location}
                    </p>
                    <div className="flex items-center text-amber-500 mb-4">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} className="text-gray-300" stroke="currentColor" />
                      <span className="ml-2 text-gray-700">{car.dealership.rating}/5</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Phone size={18} className="mr-2 text-blue-900" />
                        <a href={`tel:${car.dealership.contactPhone}`} className="text-blue-900 hover:underline">
                          {car.dealership.contactPhone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail size={18} className="mr-2 text-blue-900" />
                        <a href={`mailto:${car.dealership.contactEmail}`} className="text-blue-900 hover:underline">
                          {car.dealership.contactEmail}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Contact Dealership</h4>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={3}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="I'm interested in this vehicle..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-md font-medium transition-colors"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Similar Vehicles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockCars
              .filter(c => c.id !== car.id && c.bodyType === car.bodyType)
              .slice(0, 3)
              .map(similarCar => (
                <Link 
                  key={similarCar.id} 
                  to={`/listings/${similarCar.id}`}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  <img 
                    src={similarCar.imageUrl} 
                    alt={`${similarCar.year} ${similarCar.make} ${similarCar.model}`}
                    className="w-20 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {similarCar.year} {similarCar.make} {similarCar.model}
                    </h4>
                    <p className="text-blue-900 font-medium">
                      {formatPrice(similarCar.price)}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;