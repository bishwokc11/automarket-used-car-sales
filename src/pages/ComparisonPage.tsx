import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useComparison } from '../contexts/ComparisonContext';
import { CarListing } from '../types/car';

const ComparisonPage = () => {
  const navigate = useNavigate();
  const { carsToCompare, removeCarFromCompare, clearComparison } = useComparison();
  const [comparisonMode, setComparisonMode] = useState<'car' | 'dealership'>('car');

  if (carsToCompare.length === 0) {
    return (
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle size={64} className="mx-auto text-blue-900 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Cars to Compare</h2>
          <p className="text-gray-600 mb-6">
            You haven't added any vehicles to compare yet. Browse our listings and add vehicles to start comparing.
          </p>
          <button
            onClick={() => navigate('/listings')}
            className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Browse Listings
          </button>
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

  const getHighlightClass = (values: any[], property: keyof CarListing, isHigherBetter: boolean = true) => {
    if (values.length < 2) return '';
    
    const numericValues = values.map(v => typeof v === 'number' ? v : 0);
    const bestValue = isHigherBetter ? Math.max(...numericValues) : Math.min(...numericValues);
    
    return (index: number) => {
      if (typeof values[index] !== 'number') return '';
      return values[index] === bestValue ? 'bg-green-50 font-semibold text-green-800' : '';
    };
  };

  const getLowestPriceClass = (cars: CarListing[]) => {
    if (cars.length < 2) return () => '';
    
    const prices = cars.map(car => car.price);
    const lowestPrice = Math.min(...prices);
    
    return (index: number) => {
      return cars[index].price === lowestPrice ? 'bg-green-50 font-semibold text-green-800' : '';
    };
  };

  const getLowestMileageClass = (cars: CarListing[]) => {
    if (cars.length < 2) return () => '';
    
    const mileages = cars.map(car => car.mileage);
    const lowestMileage = Math.min(...mileages);
    
    return (index: number) => {
      return cars[index].mileage === lowestMileage ? 'bg-green-50 font-semibold text-green-800' : '';
    };
  };

  const getHighestRatingClass = (cars: CarListing[]) => {
    if (cars.length < 2) return () => '';
    
    const ratings = cars.map(car => car.dealership.rating);
    const highestRating = Math.max(...ratings);
    
    return (index: number) => {
      return cars[index].dealership.rating === highestRating ? 'bg-green-50 font-semibold text-green-800' : '';
    };
  };

  const lowestPriceClass = getLowestPriceClass(carsToCompare);
  const lowestMileageClass = getLowestMileageClass(carsToCompare);
  const highestRatingClass = getHighestRatingClass(carsToCompare);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Vehicles</h1>
            <p className="text-gray-600">
              {carsToCompare.length} {carsToCompare.length === 1 ? 'vehicle' : 'vehicles'} selected for comparison
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                  comparisonMode === 'car'
                    ? 'bg-blue-900 text-white border-blue-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setComparisonMode('car')}
              >
                Compare Cars
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                  comparisonMode === 'dealership'
                    ? 'bg-blue-900 text-white border-blue-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setComparisonMode('dealership')}
              >
                Compare Dealerships
              </button>
            </div>
            
            <button
              onClick={clearComparison}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50"
            >
              <Trash2 size={16} className="mr-2" />
              Clear All
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                    {comparisonMode === 'car' ? 'Vehicle Details' : 'Dealership Details'}
                  </th>
                  {carsToCompare.map((car, index) => (
                    <th key={car.id} className="px-6 py-3 text-center relative">
                      <img 
                        src={car.imageUrl} 
                        alt={`${car.year} ${car.make} ${car.model}`}
                        className="w-full h-32 object-cover mb-2 rounded"
                      />
                      <h3 className="text-base font-medium text-gray-900">
                        {car.year} {car.make} {car.model}
                      </h3>
                      <button
                        onClick={() => removeCarFromCompare(car.id)}
                        className="absolute top-2 right-2 bg-white text-gray-500 hover:text-red-500 p-1 rounded-full shadow-md"
                      >
                        <XCircle size={20} />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Car Comparison Mode */}
                {comparisonMode === 'car' && (
                  <>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Price</td>
                      {carsToCompare.map((car, index) => (
                        <td key={`${car.id}-price`} className={`px-6 py-4 text-sm text-center ${lowestPriceClass(index)}`}>
                          {formatPrice(car.price)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Mileage</td>
                      {carsToCompare.map((car, index) => (
                        <td key={`${car.id}-mileage`} className={`px-6 py-4 text-sm text-center ${lowestMileageClass(index)}`}>
                          {formatMileage(car.mileage)} mi
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Year</td>
                      {carsToCompare.map((car) => (
                        <td key={`${car.id}-year`} className="px-6 py-4 text-sm text-center">
                          {car.year}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Engine</td>
                      {carsToCompare.map((car) => (
                        <td key={`${car.id}-engine`} className="px-6 py-4 text-sm text-center">
                          {car.engine}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Transmission</td>
                      {carsToCompare.map((car) => (
                        <td key={`${car.id}-transmission`} className="px-6 py-4 text-sm text-center">
                          {car.transmission}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Fuel Type</td>
                      {carsToCompare.map((car) => (
                        <td key={`${car.id}-fuel`} className="px-6 py-4 text-sm text-center">
                          {car.fuelType}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Body Style</td>
                      {carsToCompare.map((car) => (
                        <td key={`${car.id}-body`} className="px-6 py-4 text-sm text-center">
                          {car.bodyType}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Exterior Color</td>
                      {carsToCompare.map((car) => (
                        <td key={`${car.id}-ext-color`} className="px-6 py-4 text-sm text-center">
                          {car.exteriorColor}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Interior Color</td>
                      {carsToCompare.map((car) => (
                        <td key={`${car.id}-int-color`} className="px-6 py-4 text-sm text-center">
                          {car.interiorColor}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Features</td>
                      {carsToCompare.map((car) => (
                        <td key={`${car.id}-features`} className="px-6 py-4 text-sm text-center">
                          <ul className="text-left">
                            {car.features.slice(0, 6).map((feature, i) => (
                              <li key={i} className="flex items-start mb-1">
                                <CheckCircle size={14} className="text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                            {car.features.length > 6 && (
                              <li className="text-blue-900">+ {car.features.length - 6} more</li>
                            )}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  </>
                )}
                
                {/* Dealership Comparison Mode */}
                {comparisonMode === 'dealership' && (
                  <>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Dealership Name</td>
                      {carsToCompare.map((car) => (
                        <td key={`${car.id}-dealer-name`} className="px-6 py-4 text-sm text-center">
                          {car.dealership.name}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Location</td>
                      {carsToCompare.map((car) => (
                        <td key={`${car.id}-location`} className="px-6 py-4 text-sm text-center">
                          {car.dealership.location}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Rating</td>
                      {carsToCompare.map((car, index) => (
                        <td key={`${car.id}-rating`} className={`px-6 py-4 text-sm text-center ${highestRatingClass(index)}`}>
                          <div className="flex items-center justify-center">
                            <span className="text-amber-500 mr-1">★</span>
                            {car.dealership.rating}/5
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Contact Phone</td>
                      {carsToCompare.map((car) => (
                        <td key={`${car.id}-phone`} className="px-6 py-4 text-sm text-center">
                          <a href={`tel:${car.dealership.contactPhone}`} className="text-blue-900 hover:underline">
                            {car.dealership.contactPhone}
                          </a>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Contact Email</td>
                      {carsToCompare.map((car) => (
                        <td key={`${car.id}-email`} className="px-6 py-4 text-sm text-center">
                          <a href={`mailto:${car.dealership.contactEmail}`} className="text-blue-900 hover:underline">
                            {car.dealership.contactEmail}
                          </a>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Available Car</td>
                      {carsToCompare.map((car) => (
                        <td key={`${car.id}-car-info`} className="px-6 py-4 text-sm text-center">
                          <div className="font-medium">{car.year} {car.make} {car.model}</div>
                          <div className="text-blue-900 font-semibold mt-1">{formatPrice(car.price)}</div>
                          <div className="text-gray-500 mt-1">{formatMileage(car.mileage)} mi</div>
                        </td>
                      ))}
                    </tr>
                  </>
                )}
                
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Action</td>
                  {carsToCompare.map((car) => (
                    <td key={`${car.id}-action`} className="px-6 py-4 text-sm text-center">
                      <button
                        onClick={() => navigate(`/listings/${car.id}`)}
                        className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;